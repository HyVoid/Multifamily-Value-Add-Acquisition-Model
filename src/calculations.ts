import { AppState, MonthFlow, YearFlow, UnitType } from './types';

// Helper for standard financial PV (Present Value)
export function calculatePV(ratePerPeriod: number, numPeriods: number, payment: number): number {
  if (ratePerPeriod === 0) return payment * numPeriods;
  return payment * (1 - Math.pow(1 + ratePerPeriod, -numPeriods)) / ratePerPeriod;
}

// Fail-safe IRR (Internal Rate of Return) solver
export function calculateIRR(cashFlows: number[], guess = 0.1): number {
  if (cashFlows.length === 0) return 0;
  
  // Check if there is at least one negative and one positive cash flow
  const hasNegative = cashFlows.some(val => val < 0);
  const hasPositive = cashFlows.some(val => val > 0);
  if (!hasNegative || !hasPositive) return 0;

  const maxIterations = 200;
  const precision = 1e-8;
  let r = guess;

  for (let i = 0; i < maxIterations; i++) {
    let npv = 0;
    let dnpv = 0;
    for (let t = 0; t < cashFlows.length; t++) {
      const discount = Math.pow(1 + r, t);
      npv += cashFlows[t] / discount;
      dnpv -= t * cashFlows[t] / (discount * (1 + r));
    }
    
    if (Math.abs(dnpv) < 1e-15) break;
    
    const nextR = r - npv / dnpv;
    if (Math.abs(nextR - r) < precision) {
      // Validate that r makes sense (no crazy values)
      if (isNaN(nextR) || !isFinite(nextR)) break;
      return nextR * 100; // Return as percentage
    }
    r = nextR;
  }

  // Systematic scan fallback if Newton-Raphson does not converge
  let bestRate = 0;
  let minNpv = Infinity;
  for (let rate = -0.95; rate <= 3.0; rate += 0.001) {
    let npv = 0;
    for (let t = 0; t < cashFlows.length; t++) {
      npv += cashFlows[t] / Math.pow(1 + rate, t);
    }
    const absNpv = Math.abs(npv);
    if (absNpv < minNpv) {
      minNpv = absNpv;
      bestRate = rate;
    }
  }
  
  return bestRate * 100;
}

// Solver for standard PMT
export function calculatePMT(ratePerPeriod: number, numPeriods: number, principal: number): number {
  if (ratePerPeriod === 0) return principal / numPeriods;
  return (principal * ratePerPeriod) / (1 - Math.pow(1 + ratePerPeriod, -numPeriods));
}

// Main calculation engine
export function runFinancialCalculations(state: AppState) {
  const { controlPanel, rentRoll, operations, renovationSchedule, debtSizing, exitValuation } = state;
  const totalUnits = rentRoll.length;

  // 1. Calculate project cost & renovation Capex
  const totalRenovationCapex = Object.values(renovationSchedule).reduce((sum, item) => {
    return sum + (item.totalUnitsToRenovate * item.renovationCostPerUnit);
  }, 0);

  const closingCostsAmt = (controlPanel.purchasePrice * controlPanel.closingCostsPct) / 100;
  const totalProjectCost = controlPanel.purchasePrice + closingCostsAmt + totalRenovationCapex;

  // 2. Pre-calculate month-by-month renovation status for each unit type
  // This tracks: which units are unrenovated, in-renovation (vacant), or completed.
  const renovationMapByMonth = new Map<number, {
    completed: Record<UnitType, number>;
    inProgress: Record<UnitType, number>;
    starting: Record<UnitType, number>;
  }>();

  for (let m = 1; m <= 120; m++) {
    renovationMapByMonth.set(m, {
      completed: { Studio: 0, '1BR': 0, '2BR': 0, '3BR': 0 },
      inProgress: { Studio: 0, '1BR': 0, '2BR': 0, '3BR': 0 },
      starting: { Studio: 0, '1BR': 0, '2BR': 0, '3BR': 0 },
    });
  }

  // Distribute renovations over time based on start month, max per month, and duration
  const unitTypes: UnitType[] = ['Studio', '1BR', '2BR', '3BR'];
  unitTypes.forEach(type => {
    const sched = renovationSchedule[type];
    const totalToRenovate = Math.min(sched.totalUnitsToRenovate, rentRoll.filter(u => u.unitType === type).length);
    const startM = sched.renovationStartMonth;
    const maxPerM = sched.maxRenovationPerMonth;
    const duration = sched.renovationDurationMths;

    // Distribute each of the "totalToRenovate" units
    for (let uIdx = 0; uIdx < totalToRenovate; uIdx++) {
      // e.g. if startMonth is 2, max per month is 2, duration is 1:
      // unit 0, 1 starts at month 2, ends at month 3 (completed in month 3)
      // unit 2, 3 starts at month 3, ends at month 4
      const startOffset = Math.floor(uIdx / maxPerM);
      const unitStartMonth = startM + startOffset;
      const unitEndMonth = unitStartMonth + duration;

      for (let m = 1; m <= 120; m++) {
        const stats = renovationMapByMonth.get(m)!;
        if (m === unitStartMonth) {
          stats.starting[type]++;
        }
        if (m >= unitStartMonth && m < unitEndMonth) {
          stats.inProgress[type]++;
        }
        if (m >= unitEndMonth) {
          stats.completed[type]++;
        }
      }
    }
  });

  // 3. Pre-calculate Year 1 NOI to run the Debt Sizing Engine
  // We run an initial pass of the GPR, Vacancy, EGI, and OPEX for Year 1 to compute Year 1 NOI.
  let year1Noi = 0;
  const tempMonthlyNois: number[] = [];

  for (let m = 1; m <= 12; m++) {
    const rentGrowthFactor = 1.0; // Year 1 has no market rent growth compounding yet
    
    // GPR Unimproved
    let gprUnimproved = 0;
    let gprValueAddUplift = 0;

    rentRoll.forEach(unit => {
      let baseMarketRent = 0;
      if (unit.unitType === 'Studio') baseMarketRent = operations.baselineMarketRentStudio;
      else if (unit.unitType === '1BR') baseMarketRent = operations.baselineMarketRent1BR;
      else if (unit.unitType === '2BR') baseMarketRent = operations.baselineMarketRent2BR;
      else if (unit.unitType === '3BR') baseMarketRent = operations.baselineMarketRent3BR;

      gprUnimproved += baseMarketRent * rentGrowthFactor;
    });

    // Value-Add Uplifts
    const stats = renovationMapByMonth.get(m)!;
    unitTypes.forEach(type => {
      const completedUnits = stats.completed[type];
      const uplift = renovationSchedule[type].rentUpliftPerUnit;
      gprValueAddUplift += completedUnits * uplift * rentGrowthFactor;
    });

    const gprTotal = gprUnimproved + gprValueAddUplift;

    // Loss to Lease
    let lossToLease = 0;
    rentRoll.forEach(unit => {
      let baseMarketRent = 0;
      if (unit.unitType === 'Studio') baseMarketRent = operations.baselineMarketRentStudio;
      else if (unit.unitType === '1BR') baseMarketRent = operations.baselineMarketRent1BR;
      else if (unit.unitType === '2BR') baseMarketRent = operations.baselineMarketRent2BR;
      else if (unit.unitType === '3BR') baseMarketRent = operations.baselineMarketRent3BR;

      let unitMarketRent = baseMarketRent * rentGrowthFactor;
      
      // Add uplift if completed for this specific unit's type (approximated on index)
      // For precise loss to lease, if month <= leaseEndMonth, it pays actual contract rent.
      if (m <= unit.leaseEndMonth) {
        lossToLease += Math.max(0, unitMarketRent - unit.currentActualRent);
      }
    });

    // Vacancy
    // Units currently undergoing renovation are 100% vacant (loss of full market rent)
    let renovationVacancyAmt = 0;
    unitTypes.forEach(type => {
      const inProgressUnits = stats.inProgress[type];
      let baseMarketRent = 0;
      if (type === 'Studio') baseMarketRent = operations.baselineMarketRentStudio;
      else if (type === '1BR') baseMarketRent = operations.baselineMarketRent1BR;
      else if (type === '2BR') baseMarketRent = operations.baselineMarketRent2BR;
      else if (type === '3BR') baseMarketRent = operations.baselineMarketRent3BR;

      renovationVacancyAmt += inProgressUnits * baseMarketRent * rentGrowthFactor;
    });

    const standardVacancyLoss = (gprTotal - renovationVacancyAmt) * (operations.physicalVacancyPct / 100);
    const totalVacancyLoss = standardVacancyLoss + renovationVacancyAmt;
    const concessionsBadDebt = gprTotal * (operations.concessionsBadDebtPct / 100);

    const netRentalIncome = gprTotal - lossToLease - totalVacancyLoss - concessionsBadDebt;
    const otherIncome = totalUnits * operations.otherIncomePerUnit;
    const egi = netRentalIncome + otherIncome;

    // OPEX Year 1 (no inflation yet)
    const monthlyPropertyTax = operations.opexPropertyTax / 12;
    const monthlyInsurance = operations.opexInsurance / 12;
    const monthlyPropertyMgmt = egi * (operations.opexPropertyMgmtPct / 100);
    const monthlyMaintUtilities = operations.opexMaintUtilities / 12;
    const totalOpex = monthlyPropertyTax + monthlyInsurance + monthlyPropertyMgmt + monthlyMaintUtilities;
    
    const noi = egi - totalOpex;
    tempMonthlyNois.push(noi);
    year1Noi += noi;
  }

  // 4. Run Debt Sizing constraints
  const ltvSizedLoan = (controlPanel.purchasePrice * debtSizing.maxLtvPct) / 100;
  const ltcSizedLoan = (totalProjectCost * debtSizing.maxLtcPct) / 100;

  // DSCR loan amount:
  // PV of maximum supported monthly debt service
  const maxMonthlyDebtService = year1Noi / debtSizing.minDscrRequired / 12;
  const dscrSizedLoan = calculatePV(
    (debtSizing.interestRate / 100) / 12,
    debtSizing.amortizationYrs * 12,
    maxMonthlyDebtService
  );

  // Debt Yield loan amount:
  const dySizedLoan = year1Noi / (debtSizing.minDebtYieldPct / 100);

  // Final Loan Amount is the minimum of the four constraints
  const finalLoanAmount = Math.min(ltvSizedLoan, ltcSizedLoan, dscrSizedLoan, dySizedLoan);

  // Debt Service PMT
  const monthlyAmortizingPmt = calculatePMT(
    (debtSizing.interestRate / 100) / 12,
    debtSizing.amortizationYrs * 12,
    finalLoanAmount
  );

  // 5. Run full 120-Month detailed Cash Flow Engine
  const monthlyFlows: MonthFlow[] = [];
  let currentLoanBalance = finalLoanAmount;

  for (let m = 1; m <= 120; m++) {
    const yearIdx = Math.ceil(m / 12);
    
    // Rent growth factor
    let rentGrowthFactor = 1.0;
    if (yearIdx === 2) {
      rentGrowthFactor = 1 + (controlPanel.rentGrowthY1 / 100);
    } else if (yearIdx > 2) {
      rentGrowthFactor = (1 + (controlPanel.rentGrowthY1 / 100)) * 
        Math.pow(1 + (controlPanel.rentGrowthY2Plus / 100), yearIdx - 2);
    }

    // Opex inflation factor
    const opexInflationFactor = Math.pow(1 + (controlPanel.inflationOpex / 100), yearIdx - 1);

    // GPR Unimproved
    let gprUnimproved = 0;
    let gprValueAddUplift = 0;

    rentRoll.forEach(unit => {
      let baseMarketRent = 0;
      if (unit.unitType === 'Studio') baseMarketRent = operations.baselineMarketRentStudio;
      else if (unit.unitType === '1BR') baseMarketRent = operations.baselineMarketRent1BR;
      else if (unit.unitType === '2BR') baseMarketRent = operations.baselineMarketRent2BR;
      else if (unit.unitType === '3BR') baseMarketRent = operations.baselineMarketRent3BR;

      gprUnimproved += baseMarketRent * rentGrowthFactor;
    });

    // Value-Add Uplifts
    const stats = renovationMapByMonth.get(m)!;
    unitTypes.forEach(type => {
      const completedUnits = stats.completed[type];
      const uplift = renovationSchedule[type].rentUpliftPerUnit;
      gprValueAddUplift += completedUnits * uplift * rentGrowthFactor;
    });

    const gprTotal = gprUnimproved + gprValueAddUplift;

    // Loss to Lease
    let lossToLease = 0;
    rentRoll.forEach(unit => {
      let baseMarketRent = 0;
      if (unit.unitType === 'Studio') baseMarketRent = operations.baselineMarketRentStudio;
      else if (unit.unitType === '1BR') baseMarketRent = operations.baselineMarketRent1BR;
      else if (unit.unitType === '2BR') baseMarketRent = operations.baselineMarketRent2BR;
      else if (unit.unitType === '3BR') baseMarketRent = operations.baselineMarketRent3BR;

      let unitMarketRent = baseMarketRent * rentGrowthFactor;
      
      // If the unit has been renovated, its market rent also has the uplift
      // Let's approximate the uplift rollover per unit
      const unitRenovationSched = renovationSchedule[unit.unitType];
      const unitStartM = unitRenovationSched.renovationStartMonth;
      const unitDuration = unitRenovationSched.renovationDurationMths;
      // Index of unit of this type
      const sameTypeUnits = rentRoll.filter(u => u.unitType === unit.unitType);
      const unitIdxOfType = sameTypeUnits.findIndex(u => u.id === unit.id);
      
      let isCompletedForThisUnit = false;
      let isInProgressForThisUnit = false;
      
      if (unitIdxOfType !== -1 && unitIdxOfType < unitRenovationSched.totalUnitsToRenovate) {
        const sameTypeMaxPerM = unitRenovationSched.maxRenovationPerMonth;
        const offset = Math.floor(unitIdxOfType / sameTypeMaxPerM);
        const startM_thisUnit = unitStartM + offset;
        const endM_thisUnit = startM_thisUnit + unitDuration;

        if (m >= endM_thisUnit) {
          isCompletedForThisUnit = true;
        } else if (m >= startM_thisUnit && m < endM_thisUnit) {
          isInProgressForThisUnit = true;
        }
      }

      if (isCompletedForThisUnit) {
        unitMarketRent += unitRenovationSched.rentUpliftPerUnit * rentGrowthFactor;
      }

      // If unit is in lease, we lose the difference (Loss to lease)
      if (m <= unit.leaseEndMonth) {
        lossToLease += Math.max(0, unitMarketRent - unit.currentActualRent);
      }
    });

    // Vacancy
    let renovationVacancyAmt = 0;
    unitTypes.forEach(type => {
      const inProgressUnits = stats.inProgress[type];
      let baseMarketRent = 0;
      if (type === 'Studio') baseMarketRent = operations.baselineMarketRentStudio;
      else if (type === '1BR') baseMarketRent = operations.baselineMarketRent1BR;
      else if (type === '2BR') baseMarketRent = operations.baselineMarketRent2BR;
      else if (type === '3BR') baseMarketRent = operations.baselineMarketRent3BR;

      renovationVacancyAmt += inProgressUnits * baseMarketRent * rentGrowthFactor;
    });

    const standardVacancyLoss = (gprTotal - renovationVacancyAmt) * (operations.physicalVacancyPct / 100);
    const totalVacancyLoss = standardVacancyLoss + renovationVacancyAmt;
    const concessionsBadDebt = gprTotal * (operations.concessionsBadDebtPct / 100);

    const netRentalIncome = gprTotal - lossToLease - totalVacancyLoss - concessionsBadDebt;
    const otherIncome = totalUnits * operations.otherIncomePerUnit;
    const egi = netRentalIncome + otherIncome;

    // OPEX (inflated)
    const monthlyPropertyTax = (operations.opexPropertyTax * opexInflationFactor) / 12;
    const monthlyInsurance = (operations.opexInsurance * opexInflationFactor) / 12;
    const monthlyPropertyMgmt = egi * (operations.opexPropertyMgmtPct / 100);
    const monthlyMaintUtilities = (operations.opexMaintUtilities * opexInflationFactor) / 12;
    const totalOpex = monthlyPropertyTax + monthlyInsurance + monthlyPropertyMgmt + monthlyMaintUtilities;

    const noi = egi - totalOpex;

    // Renovation Capex
    let renovationCapex = 0;
    unitTypes.forEach(type => {
      const startingUnits = stats.starting[type];
      const cost = renovationSchedule[type].renovationCostPerUnit;
      renovationCapex += startingUnits * cost;
    });

    const unleveredCashFlow = noi - renovationCapex;

    // Debt Service
    let debtService = 0;
    let principalPaid = 0;
    let interestPaid = 0;

    const rate = (debtSizing.interestRate / 100) / 12;

    if (m <= debtSizing.interestOnlyMths) {
      interestPaid = currentLoanBalance * rate;
      debtService = interestPaid;
      principalPaid = 0;
    } else {
      debtService = monthlyAmortizingPmt;
      interestPaid = currentLoanBalance * rate;
      principalPaid = Math.max(0, debtService - interestPaid);
    }

    currentLoanBalance = Math.max(0, currentLoanBalance - principalPaid);
    const leveredCashFlow = unleveredCashFlow - debtService;

    monthlyFlows.push({
      month: m,
      year: yearIdx,
      gprUnimproved,
      gprValueAddUplift,
      gprTotal,
      lossToLeaseLoss: lossToLease,
      vacancyLoss: totalVacancyLoss,
      concessionsBadDebt,
      netRentalIncome,
      otherIncome,
      egi,
      opexPropertyTax: monthlyPropertyTax,
      opexInsurance: monthlyInsurance,
      opexPropertyMgmt: monthlyPropertyMgmt,
      opexMaintUtilities: monthlyMaintUtilities,
      totalOpex,
      noi,
      renovationCapex,
      unleveredCashFlow,
      debtService,
      leveredCashFlow,
      endingLoanBalance: currentLoanBalance
    });
  }

  // 6. Annualized Flows for Equity Returns
  const yearsArray: YearFlow[] = [];
  const holdYrs = controlPanel.holdPeriodYrs;

  for (let y = 1; y <= holdYrs; y++) {
    const months = monthlyFlows.filter(f => f.year === y);
    const unleveredSum = months.reduce((sum, f) => sum + f.unleveredCashFlow, 0);
    const leveredSum = months.reduce((sum, f) => sum + f.leveredCashFlow, 0);
    const noiSum = months.reduce((sum, f) => sum + f.noi, 0);
    
    // Total Initial Equity is: PurchasePrice + ClosingCosts - FinalLoanAmount
    const totalInitialEquity = controlPanel.purchasePrice + closingCostsAmt - finalLoanAmount;
    const cashOnCash = totalInitialEquity > 0 ? (leveredSum / totalInitialEquity) * 100 : 0;

    yearsArray.push({
      year: y,
      unleveredCashFlow: unleveredSum,
      leveredCashFlow: leveredSum,
      cashOnCash,
      noi: noiSum
    });
  }

  // 7. Exit Valuation
  const exitMonth = holdYrs * 12;
  
  // Forward 12M NOI: Months exitMonth+1 to exitMonth+12
  const forwardMonths = monthlyFlows.slice(exitMonth, exitMonth + 12);
  const forward12mNoi = forwardMonths.reduce((sum, f) => sum + f.noi, 0);

  const grossSaleValue = forward12mNoi / (controlPanel.exitCapRate / 100);
  const sellingCostsAmt = (grossSaleValue * exitValuation.sellingCostsPct) / 100;
  const outstandingLoanBal = monthlyFlows[exitMonth - 1]?.endingLoanBalance || 0;
  const netSaleProceeds = grossSaleValue - sellingCostsAmt - outstandingLoanBal;

  // 8. Equity Returns Series
  const totalInitialCost = controlPanel.purchasePrice + closingCostsAmt;
  const totalInitialEquity = totalInitialCost - finalLoanAmount;

  // Unlevered cash flows series: Year 0 to Year Hold
  const unleveredSeries: number[] = [-totalInitialCost];
  // Levered cash flows series: Year 0 to Year Hold
  const leveredSeries: number[] = [-totalInitialEquity];

  for (let y = 1; y <= holdYrs; y++) {
    const yrFlow = yearsArray[y - 1];
    if (y < holdYrs) {
      unleveredSeries.push(yrFlow.unleveredCashFlow);
      leveredSeries.push(yrFlow.leveredCashFlow);
    } else {
      // Year of disposal
      unleveredSeries.push(yrFlow.unleveredCashFlow + grossSaleValue - sellingCostsAmt);
      leveredSeries.push(yrFlow.leveredCashFlow + netSaleProceeds);
    }
  }

  const unleveredIrr = calculateIRR(unleveredSeries);
  const leveredIrr = calculateIRR(leveredSeries);

  const unleveredMultiple = totalInitialCost > 0 
    ? unleveredSeries.filter(v => v > 0).reduce((sum, v) => sum + v, 0) / totalInitialCost
    : 0;

  const leveredMultiple = totalInitialEquity > 0 
    ? leveredSeries.filter(v => v > 0).reduce((sum, v) => sum + v, 0) / totalInitialEquity
    : 0;

  // Yield on Cost (YOC): Stabilized NOI / Total Project Cost
  // We can look at Year 3 or Year 4 NOI (stabilized after renovation schedule ends)
  // Let's use the NOI of Year holdYrs (or the Forward 12M NOI)
  const stabilizedNoi = forward12mNoi;
  const yieldOnCost = totalProjectCost > 0 ? (stabilizedNoi / totalProjectCost) * 100 : 0;

  // Year 1 Yield (Y1 NOI / Acquisition Cost)
  const acquisitionYield = controlPanel.purchasePrice > 0 ? (year1Noi / controlPanel.purchasePrice) * 100 : 0;

  // 9. Generate Sensitivity Matrices
  // Matrix 1: Rent Uplift (y-axis: uplift modifier from -50% to +50%) vs Exit Cap Rate (x-axis: cap rate from exitCapRate-1.0% to exitCapRate+1.0%)
  const rentUpliftMultipliers = [0.6, 0.8, 1.0, 1.2, 1.4]; // multipliers for uplifts
  const exitCapRates = [
    controlPanel.exitCapRate - 0.5,
    controlPanel.exitCapRate - 0.25,
    controlPanel.exitCapRate,
    controlPanel.exitCapRate + 0.25,
    controlPanel.exitCapRate + 0.5,
  ];

  const sensitivityMatrix1 = rentUpliftMultipliers.map(upliftMult => {
    return exitCapRates.map(cap => {
      // Create a temporary cloned state and re-run exit calculations
      const tempState = JSON.parse(JSON.stringify(state)) as AppState;
      tempState.controlPanel.exitCapRate = cap;
      
      // Scale uplifts
      unitTypes.forEach(t => {
        tempState.renovationSchedule[t].rentUpliftPerUnit *= upliftMult;
      });

      const tempResults = runFinancialCalculationsInternal(tempState);
      return {
        upliftPercent: Math.round((upliftMult - 1.0) * 100),
        exitCap: cap,
        leveredIrr: tempResults.leveredIrr,
        leveredMultiple: tempResults.leveredMultiple,
      };
    });
  });

  // Matrix 2: Purchase Price (y-axis: purchasePrice * modifier) vs Exit Cap Rate (x-axis)
  const priceMultipliers = [0.9, 0.95, 1.0, 1.05, 1.1];
  const sensitivityMatrix2 = priceMultipliers.map(priceMult => {
    return exitCapRates.map(cap => {
      const tempState = JSON.parse(JSON.stringify(state)) as AppState;
      tempState.controlPanel.exitCapRate = cap;
      tempState.controlPanel.purchasePrice *= priceMult;

      const tempResults = runFinancialCalculationsInternal(tempState);
      return {
        pricePercent: Math.round((priceMult - 1.0) * 100),
        priceValue: tempState.controlPanel.purchasePrice,
        exitCap: cap,
        leveredIrr: tempResults.leveredIrr,
        leveredMultiple: tempResults.leveredMultiple,
      };
    });
  });

  return {
    closingCostsAmt,
    totalRenovationCapex,
    totalProjectCost,
    year1Noi,
    ltvSizedLoan,
    ltcSizedLoan,
    dscrSizedLoan,
    dySizedLoan,
    finalLoanAmount,
    monthlyAmortizingPmt,
    monthlyFlows,
    yearsArray,
    forward12mNoi,
    grossSaleValue,
    sellingCostsAmt,
    outstandingLoanBal,
    netSaleProceeds,
    unleveredIrr,
    leveredIrr,
    unleveredMultiple,
    leveredMultiple,
    yieldOnCost,
    acquisitionYield,
    totalInitialEquity,
    unleveredSeries,
    leveredSeries,
    sensitivityMatrix1,
    sensitivityMatrix2,
    exitCapRate: controlPanel.exitCapRate
  };
}

// Minimal internal helper to avoid infinite recursion
function runFinancialCalculationsInternal(state: AppState) {
  const { controlPanel, rentRoll, operations, renovationSchedule, debtSizing, exitValuation } = state;
  const totalUnits = rentRoll.length;
  const totalRenovationCapex = Object.values(renovationSchedule).reduce((sum, item) => sum + (item.totalUnitsToRenovate * item.renovationCostPerUnit), 0);
  const closingCostsAmt = (controlPanel.purchasePrice * controlPanel.closingCostsPct) / 100;
  const totalProjectCost = controlPanel.purchasePrice + closingCostsAmt + totalRenovationCapex;

  const renovationMapByMonth = new Map<number, { completed: Record<UnitType, number>; inProgress: Record<UnitType, number> }>();
  for (let m = 1; m <= 120; m++) {
    renovationMapByMonth.set(m, {
      completed: { Studio: 0, '1BR': 0, '2BR': 0, '3BR': 0 },
      inProgress: { Studio: 0, '1BR': 0, '2BR': 0, '3BR': 0 },
    });
  }

  const unitTypes: UnitType[] = ['Studio', '1BR', '2BR', '3BR'];
  unitTypes.forEach(type => {
    const sched = renovationSchedule[type];
    const totalToRenovate = Math.min(sched.totalUnitsToRenovate, rentRoll.filter(u => u.unitType === type).length);
    const startM = sched.renovationStartMonth;
    const maxPerM = sched.maxRenovationPerMonth;
    const duration = sched.renovationDurationMths;

    for (let uIdx = 0; uIdx < totalToRenovate; uIdx++) {
      const startOffset = Math.floor(uIdx / maxPerM);
      const unitStartMonth = startM + startOffset;
      const unitEndMonth = unitStartMonth + duration;

      for (let m = 1; m <= 120; m++) {
        const stats = renovationMapByMonth.get(m)!;
        if (m >= unitStartMonth && m < unitEndMonth) stats.inProgress[type]++;
        if (m >= unitEndMonth) stats.completed[type]++;
      }
    }
  });

  let year1Noi = 0;
  for (let m = 1; m <= 12; m++) {
    let gprUnimproved = 0;
    let gprValueAddUplift = 0;
    rentRoll.forEach(unit => {
      let baseMarketRent = 0;
      if (unit.unitType === 'Studio') baseMarketRent = operations.baselineMarketRentStudio;
      else if (unit.unitType === '1BR') baseMarketRent = operations.baselineMarketRent1BR;
      else if (unit.unitType === '2BR') baseMarketRent = operations.baselineMarketRent2BR;
      else if (unit.unitType === '3BR') baseMarketRent = operations.baselineMarketRent3BR;
      gprUnimproved += baseMarketRent;
    });

    const stats = renovationMapByMonth.get(m)!;
    unitTypes.forEach(type => {
      gprValueAddUplift += stats.completed[type] * renovationSchedule[type].rentUpliftPerUnit;
    });

    const gprTotal = gprUnimproved + gprValueAddUplift;
    let lossToLease = 0;
    rentRoll.forEach(unit => {
      let baseMarketRent = 0;
      if (unit.unitType === 'Studio') baseMarketRent = operations.baselineMarketRentStudio;
      else if (unit.unitType === '1BR') baseMarketRent = operations.baselineMarketRent1BR;
      else if (unit.unitType === '2BR') baseMarketRent = operations.baselineMarketRent2BR;
      else if (unit.unitType === '3BR') baseMarketRent = operations.baselineMarketRent3BR;

      if (m <= unit.leaseEndMonth) {
        lossToLease += Math.max(0, baseMarketRent - unit.currentActualRent);
      }
    });

    let renovationVacancyAmt = 0;
    unitTypes.forEach(type => {
      let baseMarketRent = 0;
      if (type === 'Studio') baseMarketRent = operations.baselineMarketRentStudio;
      else if (type === '1BR') baseMarketRent = operations.baselineMarketRent1BR;
      else if (type === '2BR') baseMarketRent = operations.baselineMarketRent2BR;
      else if (type === '3BR') baseMarketRent = operations.baselineMarketRent3BR;
      renovationVacancyAmt += stats.inProgress[type] * baseMarketRent;
    });

    const totalVacancyLoss = (gprTotal - renovationVacancyAmt) * (operations.physicalVacancyPct / 100) + renovationVacancyAmt;
    const concessionsBadDebt = gprTotal * (operations.concessionsBadDebtPct / 100);
    const netRentalIncome = gprTotal - lossToLease - totalVacancyLoss - concessionsBadDebt;
    const egi = netRentalIncome + (totalUnits * operations.otherIncomePerUnit);

    const totalOpex = (operations.opexPropertyTax / 12) + (operations.opexInsurance / 12) + (egi * (operations.opexPropertyMgmtPct / 100)) + (operations.opexMaintUtilities / 12);
    year1Noi += (egi - totalOpex);
  }

  const finalLoanAmount = Math.min(
    (controlPanel.purchasePrice * debtSizing.maxLtvPct) / 100,
    (totalProjectCost * debtSizing.maxLtcPct) / 100,
    calculatePV((debtSizing.interestRate / 100) / 12, debtSizing.amortizationYrs * 12, year1Noi / debtSizing.minDscrRequired / 12),
    year1Noi / (debtSizing.minDebtYieldPct / 100)
  );

  const monthlyAmortizingPmt = calculatePMT((debtSizing.interestRate / 100) / 12, debtSizing.amortizationYrs * 12, finalLoanAmount);

  const monthlyFlows: { unleveredCashFlow: number; leveredCashFlow: number; endingLoanBalance: number; noi: number; year: number }[] = [];
  let currentLoanBalance = finalLoanAmount;

  for (let m = 1; m <= 120; m++) {
    const yearIdx = Math.ceil(m / 12);
    let rentGrowthFactor = 1.0;
    if (yearIdx === 2) rentGrowthFactor = 1 + (controlPanel.rentGrowthY1 / 100);
    else if (yearIdx > 2) rentGrowthFactor = (1 + (controlPanel.rentGrowthY1 / 100)) * Math.pow(1 + (controlPanel.rentGrowthY2Plus / 100), yearIdx - 2);

    const opexInflationFactor = Math.pow(1 + (controlPanel.inflationOpex / 100), yearIdx - 1);

    let gprUnimproved = 0;
    let gprValueAddUplift = 0;

    rentRoll.forEach(unit => {
      let baseMarketRent = 0;
      if (unit.unitType === 'Studio') baseMarketRent = operations.baselineMarketRentStudio;
      else if (unit.unitType === '1BR') baseMarketRent = operations.baselineMarketRent1BR;
      else if (unit.unitType === '2BR') baseMarketRent = operations.baselineMarketRent2BR;
      else if (unit.unitType === '3BR') baseMarketRent = operations.baselineMarketRent3BR;
      gprUnimproved += baseMarketRent * rentGrowthFactor;
    });

    const stats = renovationMapByMonth.get(m)!;
    unitTypes.forEach(type => {
      gprValueAddUplift += stats.completed[type] * renovationSchedule[type].rentUpliftPerUnit * rentGrowthFactor;
    });

    const gprTotal = gprUnimproved + gprValueAddUplift;
    let lossToLease = 0;
    rentRoll.forEach(unit => {
      let baseMarketRent = 0;
      if (unit.unitType === 'Studio') baseMarketRent = operations.baselineMarketRentStudio;
      else if (unit.unitType === '1BR') baseMarketRent = operations.baselineMarketRent1BR;
      else if (unit.unitType === '2BR') baseMarketRent = operations.baselineMarketRent2BR;
      else if (unit.unitType === '3BR') baseMarketRent = operations.baselineMarketRent3BR;

      let unitMarketRent = baseMarketRent * rentGrowthFactor;
      const unitRenovationSched = renovationSchedule[unit.unitType];
      const sameTypeUnits = rentRoll.filter(u => u.unitType === unit.unitType);
      const unitIdxOfType = sameTypeUnits.findIndex(u => u.id === unit.id);
      
      let isCompletedForThisUnit = false;
      if (unitIdxOfType !== -1 && unitIdxOfType < unitRenovationSched.totalUnitsToRenovate) {
        const startM_thisUnit = unitRenovationSched.renovationStartMonth + Math.floor(unitIdxOfType / unitRenovationSched.maxRenovationPerMonth);
        if (m >= startM_thisUnit + unitRenovationSched.renovationDurationMths) isCompletedForThisUnit = true;
      }

      if (isCompletedForThisUnit) unitMarketRent += unitRenovationSched.rentUpliftPerUnit * rentGrowthFactor;
      if (m <= unit.leaseEndMonth) lossToLease += Math.max(0, unitMarketRent - unit.currentActualRent);
    });

    let renovationVacancyAmt = 0;
    unitTypes.forEach(type => {
      let baseMarketRent = 0;
      if (type === 'Studio') baseMarketRent = operations.baselineMarketRentStudio;
      else if (type === '1BR') baseMarketRent = operations.baselineMarketRent1BR;
      else if (type === '2BR') baseMarketRent = operations.baselineMarketRent2BR;
      else if (type === '3BR') baseMarketRent = operations.baselineMarketRent3BR;
      renovationVacancyAmt += stats.inProgress[type] * baseMarketRent * rentGrowthFactor;
    });

    const totalVacancyLoss = (gprTotal - renovationVacancyAmt) * (operations.physicalVacancyPct / 100) + renovationVacancyAmt;
    const concessionsBadDebt = gprTotal * (operations.concessionsBadDebtPct / 100);
    const netRentalIncome = gprTotal - lossToLease - totalVacancyLoss - concessionsBadDebt;
    const egi = netRentalIncome + (totalUnits * operations.otherIncomePerUnit);

    const totalOpex = ((operations.opexPropertyTax * opexInflationFactor) / 12) + ((operations.opexInsurance * opexInflationFactor) / 12) + (egi * (operations.opexPropertyMgmtPct / 100)) + ((operations.opexMaintUtilities * opexInflationFactor) / 12);
    const noi = egi - totalOpex;

    let renovationCapex = 0;
    unitTypes.forEach(type => {
      // Approximate starting unit count
      const startM = renovationSchedule[type].renovationStartMonth;
      const sameTypeUnits = rentRoll.filter(u => u.unitType === type);
      const limit = Math.min(renovationSchedule[type].totalUnitsToRenovate, sameTypeUnits.length);
      for (let uIdx = 0; uIdx < limit; uIdx++) {
        const uStart = startM + Math.floor(uIdx / renovationSchedule[type].maxRenovationPerMonth);
        if (m === uStart) renovationCapex += renovationSchedule[type].renovationCostPerUnit;
      }
    });

    const unleveredCashFlow = noi - renovationCapex;
    let debtService = 0;
    if (m <= debtSizing.interestOnlyMths) {
      debtService = currentLoanBalance * ((debtSizing.interestRate / 100) / 12);
    } else {
      debtService = monthlyAmortizingPmt;
    }
    const principalPaid = Math.max(0, debtService - (currentLoanBalance * ((debtSizing.interestRate / 100) / 12)));
    currentLoanBalance = Math.max(0, currentLoanBalance - principalPaid);

    monthlyFlows.push({
      unleveredCashFlow,
      leveredCashFlow: unleveredCashFlow - debtService,
      endingLoanBalance: currentLoanBalance,
      noi,
      year: yearIdx
    });
  }

  const exitMonth = controlPanel.holdPeriodYrs * 12;
  const forwardMonths = monthlyFlows.slice(exitMonth, exitMonth + 12);
  const forward12mNoi = forwardMonths.reduce((sum, f) => sum + f.noi, 0);
  const grossSaleValue = forward12mNoi / (controlPanel.exitCapRate / 100);
  const sellingCostsAmt = (grossSaleValue * exitValuation.sellingCostsPct) / 100;
  const outstandingLoanBal = monthlyFlows[exitMonth - 1]?.endingLoanBalance || 0;
  const netSaleProceeds = grossSaleValue - sellingCostsAmt - outstandingLoanBal;

  const unleveredSeries: number[] = [-totalProjectCost];
  const leveredSeries: number[] = [-(totalProjectCost - finalLoanAmount)];

  for (let y = 1; y <= controlPanel.holdPeriodYrs; y++) {
    const months = monthlyFlows.filter(f => f.year === y);
    const uSum = months.reduce((sum, f) => sum + f.unleveredCashFlow, 0);
    const lSum = months.reduce((sum, f) => sum + f.leveredCashFlow, 0);
    if (y < controlPanel.holdPeriodYrs) {
      unleveredSeries.push(uSum);
      leveredSeries.push(lSum);
    } else {
      unleveredSeries.push(uSum + grossSaleValue - sellingCostsAmt);
      leveredSeries.push(lSum + netSaleProceeds);
    }
  }

  const leveredIrr = calculateIRR(leveredSeries);
  const leveredMultiple = (totalProjectCost - finalLoanAmount) > 0 
    ? leveredSeries.filter(v => v > 0).reduce((sum, v) => sum + v, 0) / (totalProjectCost - finalLoanAmount)
    : 0;

  return { leveredIrr, leveredMultiple };
}

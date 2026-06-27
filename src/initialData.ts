import { AppState, RentRollItem } from './types';

// Generate 24 realistic apartments for our rent roll baseline
export const generateDefaultRentRoll = (): RentRollItem[] => {
  const units: RentRollItem[] = [];
  const types: ('Studio' | '1BR' | '2BR' | '3BR')[] = ['Studio', '1BR', '2BR', '3BR'];
  
  // Create 24 units
  for (let i = 1; i <= 24; i++) {
    const floor = Math.ceil(i / 6);
    const numInFloor = i - (floor - 1) * 6;
    const unitNumber = `${floor}0${numInFloor}`;
    
    // Distribute types
    let unitType: 'Studio' | '1BR' | '2BR' | '3BR' = '1BR';
    let squareFeet = 650;
    let currentActualRent = 1350;
    
    if (i % 4 === 1) {
      unitType = 'Studio';
      squareFeet = 450;
      currentActualRent = 1100;
    } else if (i % 4 === 2) {
      unitType = '1BR';
      squareFeet = 650;
      currentActualRent = 1350;
    } else if (i % 4 === 3) {
      unitType = '2BR';
      squareFeet = 850;
      currentActualRent = 1650;
    } else {
      unitType = '3BR';
      squareFeet = 1100;
      currentActualRent = 1950;
    }

    // Assign varying lease end months (1 to 12)
    const leaseEndMonth = (i % 12) + 1;
    
    // Initial renovated status (maybe 2 items are already renovated initially)
    const isRenovatedInitial = i === 1 || i === 13;

    units.push({
      id: `unit-${i}`,
      unitNumber,
      unitType,
      squareFeet,
      currentActualRent: isRenovatedInitial ? currentActualRent + 150 : currentActualRent,
      leaseEndMonth,
      isRenovatedInitial
    });
  }
  
  return units;
};

export const getInitialState = (): AppState => ({
  controlPanel: {
    projectName: "Oakwood Park Value-Add",
    purchasePrice: 12500000,
    closingCostsPct: 2.5,
    holdPeriodYrs: 5,
    exitCapRate: 5.25,
    rentGrowthY1: 3.0,
    rentGrowthY2Plus: 3.5,
    inflationOpex: 3.0
  },
  rentRoll: generateDefaultRentRoll(),
  operations: {
    baselineMarketRentStudio: 1250,
    baselineMarketRent1BR: 1500,
    baselineMarketRent2BR: 1850,
    baselineMarketRent3BR: 2200,
    physicalVacancyPct: 5.0,
    concessionsBadDebtPct: 2.0,
    otherIncomePerUnit: 45,
    opexPropertyTax: 120000,
    opexInsurance: 30000,
    opexPropertyMgmtPct: 4.0,
    opexMaintUtilities: 90000
  },
  renovationSchedule: {
    Studio: {
      unitType: 'Studio',
      totalUnitsToRenovate: 6, // 6 total studios
      renovationCostPerUnit: 8000,
      rentUpliftPerUnit: 150,
      renovationStartMonth: 2,
      maxRenovationPerMonth: 2,
      renovationDurationMths: 1
    },
    '1BR': {
      unitType: '1BR',
      totalUnitsToRenovate: 6,
      renovationCostPerUnit: 10000,
      rentUpliftPerUnit: 200,
      renovationStartMonth: 3,
      maxRenovationPerMonth: 2,
      renovationDurationMths: 1
    },
    '2BR': {
      unitType: '2BR',
      totalUnitsToRenovate: 6,
      renovationCostPerUnit: 12000,
      rentUpliftPerUnit: 250,
      renovationStartMonth: 4,
      maxRenovationPerMonth: 2,
      renovationDurationMths: 1
    },
    '3BR': {
      unitType: '3BR',
      totalUnitsToRenovate: 6,
      renovationCostPerUnit: 15000,
      rentUpliftPerUnit: 300,
      renovationStartMonth: 6,
      maxRenovationPerMonth: 1,
      renovationDurationMths: 1
    }
  },
  debtSizing: {
    maxLtvPct: 70.0,
    maxLtcPct: 75.0,
    minDscrRequired: 1.25,
    minDebtYieldPct: 8.5,
    interestRate: 6.25,
    amortizationYrs: 30,
    interestOnlyMths: 12
  },
  exitValuation: {
    sellingCostsPct: 2.0
  }
});
export const PRESETS = [
  {
    name: "Standard Value-Add (Oakwood Park)",
    state: getInitialState()
  },
  {
    name: "Conservative High Interest Case",
    state: (() => {
      const s = getInitialState();
      s.controlPanel.projectName = "Conservative High Rate Case";
      s.controlPanel.exitCapRate = 5.75;
      s.debtSizing.interestRate = 7.5;
      s.debtSizing.maxLtvPct = 65.0;
      return s;
    })()
  },
  {
    name: "Aggressive Luxury Renovations",
    state: (() => {
      const s = getInitialState();
      s.controlPanel.projectName = "Metro Crest Premium Renovations";
      s.controlPanel.purchasePrice = 15000000;
      s.renovationSchedule.Studio.renovationCostPerUnit = 12000;
      s.renovationSchedule.Studio.rentUpliftPerUnit = 250;
      s.renovationSchedule['1BR'].renovationCostPerUnit = 15000;
      s.renovationSchedule['1BR'].rentUpliftPerUnit = 350;
      s.renovationSchedule['2BR'].renovationCostPerUnit = 18000;
      s.renovationSchedule['2BR'].rentUpliftPerUnit = 420;
      s.renovationSchedule['3BR'].renovationCostPerUnit = 22000;
      s.renovationSchedule['3BR'].rentUpliftPerUnit = 500;
      return s;
    })()
  }
];

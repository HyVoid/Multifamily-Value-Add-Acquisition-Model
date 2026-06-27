export interface ControlPanel {
  projectName: string;
  purchasePrice: number;
  closingCostsPct: number;
  holdPeriodYrs: number;
  exitCapRate: number;
  rentGrowthY1: number;
  rentGrowthY2Plus: number;
  inflationOpex: number;
}

export type UnitType = 'Studio' | '1BR' | '2BR' | '3BR';

export interface RentRollItem {
  id: string;
  unitNumber: string;
  unitType: UnitType;
  squareFeet: number;
  currentActualRent: number;
  leaseEndMonth: number;
  isRenovatedInitial: boolean;
}

export interface OperationsAssumptions {
  baselineMarketRentStudio: number;
  baselineMarketRent1BR: number;
  baselineMarketRent2BR: number;
  baselineMarketRent3BR: number;
  physicalVacancyPct: number;
  concessionsBadDebtPct: number;
  otherIncomePerUnit: number;
  opexPropertyTax: number;
  opexInsurance: number;
  opexPropertyMgmtPct: number;
  opexMaintUtilities: number;
}

export interface RenovationScheduleItem {
  unitType: UnitType;
  totalUnitsToRenovate: number;
  renovationCostPerUnit: number;
  rentUpliftPerUnit: number;
  renovationStartMonth: number;
  maxRenovationPerMonth: number;
  renovationDurationMths: number;
}

export interface DebtSizing {
  maxLtvPct: number;
  maxLtcPct: number;
  minDscrRequired: number;
  minDebtYieldPct: number;
  interestRate: number;
  amortizationYrs: number;
  interestOnlyMths: number;
}

export interface ExitValuationAssumptions {
  sellingCostsPct: number;
}

export interface AppState {
  controlPanel: ControlPanel;
  rentRoll: RentRollItem[];
  operations: OperationsAssumptions;
  renovationSchedule: {
    Studio: RenovationScheduleItem;
    '1BR': RenovationScheduleItem;
    '2BR': RenovationScheduleItem;
    '3BR': RenovationScheduleItem;
  };
  debtSizing: DebtSizing;
  exitValuation: ExitValuationAssumptions;
}

export interface MonthFlow {
  month: number;
  year: number;
  gprUnimproved: number;
  gprValueAddUplift: number;
  gprTotal: number;
  lossToLeaseLoss: number;
  vacancyLoss: number;
  concessionsBadDebt: number;
  netRentalIncome: number;
  otherIncome: number;
  egi: number;
  opexPropertyTax: number;
  opexInsurance: number;
  opexPropertyMgmt: number;
  opexMaintUtilities: number;
  totalOpex: number;
  noi: number;
  renovationCapex: number;
  unleveredCashFlow: number;
  debtService: number;
  leveredCashFlow: number;
  endingLoanBalance: number;
}

export interface YearFlow {
  year: number;
  unleveredCashFlow: number;
  leveredCashFlow: number;
  cashOnCash: number;
  noi: number;
}

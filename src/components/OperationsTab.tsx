import React from 'react';
import { OperationsAssumptions } from '../types';

interface OperationsTabProps {
  operations: OperationsAssumptions;
  onChange: (updated: Partial<OperationsAssumptions>) => void;
  totalUnits: number;
}

export const OperationsTab: React.FC<OperationsTabProps> = ({
  operations,
  onChange,
  totalUnits,
}) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleFieldChange = (field: keyof OperationsAssumptions, value: string) => {
    onChange({ [field]: parseFloat(value) || 0 });
  };

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Header */}
      <div>
        <h2 className="font-heading font-extrabold text-[#051C2C] text-2xl tracking-[-0.02em]">
          Sheet 3: Operations Assumptions & Expenses
        </h2>
        <p className="text-[#888888] text-xs mt-1">
          Configure baseline market rents, non-rental dynamic income, vacant allowances, and Year 1 baseline OPEX structures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card Left: Revenue Assumptions */}
        <div className="bg-white rounded-[14px] bold-card p-6 space-y-5">
          <h3 className="font-heading font-bold text-lg text-[#051C2C] tracking-tight pb-2 border-b border-[#E8E8E6]">
            Market Rents & Revenue Baseline
          </h3>

          {/* Market rents by type */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-sans font-bold text-[#888888] uppercase tracking-wider">
              Initial Market Rents (Monthly Baseline)
            </h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-sans font-semibold text-[#051C2C]">Studio Market Rent ($)</label>
                <input
                  type="number"
                  value={operations.baselineMarketRentStudio}
                  onChange={(e) => handleFieldChange('baselineMarketRentStudio', e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded-md text-xs font-bold font-mono outline-none focus:ring-1 focus:ring-[#2251FF]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-sans font-semibold text-[#051C2C]">1BR Market Rent ($)</label>
                <input
                  type="number"
                  value={operations.baselineMarketRent1BR}
                  onChange={(e) => handleFieldChange('baselineMarketRent1BR', e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded-md text-xs font-bold font-mono outline-none focus:ring-1 focus:ring-[#2251FF]"
                />
              </div>
              <div className="grid grid-cols-1 space-y-1">
                <label className="text-[11px] font-sans font-semibold text-[#051C2C]">2BR Market Rent ($)</label>
                <input
                  type="number"
                  value={operations.baselineMarketRent2BR}
                  onChange={(e) => handleFieldChange('baselineMarketRent2BR', e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded-md text-xs font-bold font-mono outline-none focus:ring-1 focus:ring-[#2251FF]"
                />
              </div>
              <div className="grid grid-cols-1 space-y-1">
                <label className="text-[11px] font-sans font-semibold text-[#051C2C]">3BR Market Rent ($)</label>
                <input
                  type="number"
                  value={operations.baselineMarketRent3BR}
                  onChange={(e) => handleFieldChange('baselineMarketRent3BR', e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded-md text-xs font-bold font-mono outline-none focus:ring-1 focus:ring-[#2251FF]"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-[#E8E8E6] pt-4 space-y-4">
            <h4 className="text-[10px] font-sans font-bold text-[#888888] uppercase tracking-wider">
              Vacancy, Loss-to-Lease & Bad Debt Allowances
            </h4>

            {/* Vacancy and concessions */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-sans font-semibold text-[#051C2C]">Vacancy Loss (%)</label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={operations.physicalVacancyPct}
                    onChange={(e) => handleFieldChange('physicalVacancyPct', e.target.value)}
                    className="w-full pr-7 pl-3 py-1.5 bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded-md text-xs font-bold font-mono outline-none focus:ring-1 focus:ring-[#2251FF]"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-[#888888] font-bold">%</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-sans font-semibold text-[#051C2C]">Concessions/Bad Debt (%)</label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={operations.concessionsBadDebtPct}
                    onChange={(e) => handleFieldChange('concessionsBadDebtPct', e.target.value)}
                    className="w-full pr-7 pl-3 py-1.5 bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded-md text-xs font-bold font-mono outline-none focus:ring-1 focus:ring-[#2251FF]"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-[#888888] font-bold">%</span>
                </div>
              </div>
            </div>

            {/* Other Income */}
            <div className="space-y-1">
              <label className="text-[11px] font-sans font-semibold text-[#051C2C]">
                Other Income Per Unit (Laundry, Parking, etc.) ($/month)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-xs text-[#888888] font-bold font-mono">$</span>
                <input
                  type="number"
                  value={operations.otherIncomePerUnit}
                  onChange={(e) => handleFieldChange('otherIncomePerUnit', e.target.value)}
                  className="w-full pl-7 pr-3 py-1.5 bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded-md text-xs font-bold font-mono outline-none focus:ring-1 focus:ring-[#2251FF]"
                />
              </div>
              <p className="text-[11px] text-[#888888] font-mono">
                Total monthly other income: {formatCurrency(totalUnits * operations.otherIncomePerUnit)}
              </p>
            </div>
          </div>
        </div>

        {/* Card Right: Expense (OPEX) Assumptions */}
        <div className="bg-white rounded-[14px] bold-card p-6 space-y-5">
          <h3 className="font-heading font-bold text-lg text-[#051C2C] tracking-tight pb-2 border-b border-[#E8E8E6]">
            Year 1 Operating Expenses (Annual OPEX)
          </h3>

          {/* Tax */}
          <div className="space-y-1">
            <label className="text-[11px] font-sans font-semibold text-[#051C2C]">Property Taxes (Annual Year 1) ($)</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-xs text-[#888888] font-bold font-mono">$</span>
              <input
                type="number"
                value={operations.opexPropertyTax}
                onChange={(e) => handleFieldChange('opexPropertyTax', e.target.value)}
                className="w-full pl-7 pr-3 py-1.5 bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded-md text-xs font-bold font-mono outline-none focus:ring-1 focus:ring-[#2251FF]"
              />
            </div>
            <p className="text-[11px] text-[#888888] font-mono">
              Monthly: {formatCurrency(operations.opexPropertyTax / 12)}
            </p>
          </div>

          {/* Insurance */}
          <div className="space-y-1">
            <label className="text-[11px] font-sans font-semibold text-[#051C2C]">Property Insurance (Annual Year 1) ($)</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-xs text-[#888888] font-bold font-mono">$</span>
              <input
                type="number"
                value={operations.opexInsurance}
                onChange={(e) => handleFieldChange('opexInsurance', e.target.value)}
                className="w-full pl-7 pr-3 py-1.5 bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded-md text-xs font-bold font-mono outline-none focus:ring-1 focus:ring-[#2251FF]"
              />
            </div>
            <p className="text-[11px] text-[#888888] font-mono">
              Monthly: {formatCurrency(operations.opexInsurance / 12)}
            </p>
          </div>

          {/* Maint & Utilities */}
          <div className="space-y-1">
            <label className="text-[11px] font-sans font-semibold text-[#051C2C]">Maintenance & Utilities (Annual Year 1) ($)</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-xs text-[#888888] font-bold font-mono">$</span>
              <input
                type="number"
                value={operations.opexMaintUtilities}
                onChange={(e) => handleFieldChange('opexMaintUtilities', e.target.value)}
                className="w-full pl-7 pr-3 py-1.5 bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded-md text-xs font-bold font-mono outline-none focus:ring-1 focus:ring-[#2251FF]"
              />
            </div>
            <p className="text-[11px] text-[#888888] font-mono">
              Monthly: {formatCurrency(operations.opexMaintUtilities / 12)}
            </p>
          </div>

          {/* Prop Management */}
          <div className="space-y-1">
            <label className="text-[11px] font-sans font-semibold text-[#051C2C]">Property Management Fee (% of EGI)</label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={operations.opexPropertyMgmtPct}
                onChange={(e) => handleFieldChange('opexPropertyMgmtPct', e.target.value)}
                className="w-full pr-7 pl-3 py-1.5 bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded-md text-xs font-bold font-mono outline-none focus:ring-1 focus:ring-[#2251FF]"
              />
              <span className="absolute right-3 top-2.5 text-xs text-[#888888] font-bold">%</span>
            </div>
            <p className="text-[11px] text-[#888888]">
              Calculated dynamically against monthly Effective Gross Income (EGI).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

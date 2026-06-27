import React from 'react';
import { DebtSizing } from '../types';
import { ShieldCheck, AlertCircle, Info } from 'lucide-react';

interface DebtSizingTabProps {
  debtSizing: DebtSizing;
  onChange: (updated: Partial<DebtSizing>) => void;
  results: {
    ltvSizedLoan: number;
    ltcSizedLoan: number;
    dscrSizedLoan: number;
    dySizedLoan: number;
    finalLoanAmount: number;
    year1Noi: number;
    totalProjectCost: number;
    purchasePrice: number;
  };
}

export const DebtSizingTab: React.FC<DebtSizingTabProps> = ({
  debtSizing,
  onChange,
  results,
}) => {
  const {
    ltvSizedLoan,
    ltcSizedLoan,
    dscrSizedLoan,
    dySizedLoan,
    finalLoanAmount,
    year1Noi,
    totalProjectCost,
    purchasePrice,
  } = results;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleFieldChange = (field: keyof DebtSizing, value: string) => {
    onChange({ [field]: parseFloat(value) || 0 });
  };

  // Determine the binding constraint(s) (which constraint matches the final loan amount)
  const isLtvBinding = Math.abs(ltvSizedLoan - finalLoanAmount) < 1;
  const isLtcBinding = Math.abs(ltcSizedLoan - finalLoanAmount) < 1;
  const isDscrBinding = Math.abs(dscrSizedLoan - finalLoanAmount) < 1;
  const isDyBinding = Math.abs(dySizedLoan - finalLoanAmount) < 1;

  const getBindingLabel = () => {
    if (isLtvBinding) return 'Loan-to-Value (LTV) Constraint';
    if (isLtcBinding) return 'Loan-to-Cost (LTC) Constraint';
    if (isDscrBinding) return 'Debt Service Coverage Ratio (DSCR) Constraint';
    if (isDyBinding) return 'Debt Yield (DY) Constraint';
    return 'None';
  };

  const constraintsList = [
    { name: 'Max Loan-to-Value (LTV)', value: ltvSizedLoan, binding: isLtvBinding, param: `${debtSizing.maxLtvPct}% of Purchase` },
    { name: 'Max Loan-to-Cost (LTC)', value: ltcSizedLoan, binding: isLtcBinding, param: `${debtSizing.maxLtcPct}% of Total Cost` },
    { name: 'Min DSCR Sizing', value: dscrSizedLoan, binding: isDscrBinding, param: `${debtSizing.minDscrRequired}x Year 1 NOI` },
    { name: 'Min Debt Yield Sizing', value: dySizedLoan, binding: isDyBinding, param: `${debtSizing.minDebtYieldPct}% Yield Base` },
  ];

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Header */}
      <div>
        <h2 className="font-heading font-extrabold text-[#051C2C] text-2xl tracking-[-0.02em]">
          Sheet 5: Debt Sizing & Sizing Constraints Engine
        </h2>
        <p className="text-[#888888] text-xs mt-1">
          Perform institutional-grade lender underwriting. The system applies a quadruple-min check across LTV, LTC, DSCR, and Debt Yield to solve for the maximum qualified loan balance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Editable Parameters */}
        <div className="bg-white rounded-[14px] bold-card p-6 space-y-4 lg:col-span-1">
          <h3 className="font-heading font-bold text-lg text-[#051C2C] tracking-tight pb-2 border-b border-[#E8E8E6]">
            Lender Guidelines
          </h3>

          {/* LTV */}
          <div className="space-y-1">
            <label className="text-[11px] font-sans font-semibold text-[#051C2C]">Max LTV Ratio (%)</label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={debtSizing.maxLtvPct}
                onChange={(e) => handleFieldChange('maxLtvPct', e.target.value)}
                className="w-full pr-7 pl-3 py-1.5 bg-[#FFFDE7] text-[#051C2C] font-bold font-mono border border-[#E8E8E6] roundedoutline-none focus:bg-white"
              />
              <span className="absolute right-3 top-2.5 text-xs text-[#888888] font-bold">%</span>
            </div>
          </div>

          {/* LTC */}
          <div className="space-y-1">
            <label className="text-[11px] font-sans font-semibold text-[#051C2C]">Max LTC Ratio (%)</label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={debtSizing.maxLtcPct}
                onChange={(e) => handleFieldChange('maxLtcPct', e.target.value)}
                className="w-full pr-7 pl-3 py-1.5 bg-[#FFFDE7] text-[#051C2C] font-bold font-mono border border-[#E8E8E6] roundedoutline-none focus:bg-white"
              />
              <span className="absolute right-3 top-2.5 text-xs text-[#888888] font-bold">%</span>
            </div>
          </div>

          {/* DSCR */}
          <div className="space-y-1">
            <label className="text-[11px] font-sans font-semibold text-[#051C2C]">Min Required DSCR (x)</label>
            <input
              type="number"
              step="0.05"
              value={debtSizing.minDscrRequired}
              onChange={(e) => handleFieldChange('minDscrRequired', e.target.value)}
              className="w-full px-3 py-1.5 bg-[#FFFDE7] text-[#051C2C] font-bold font-mono border border-[#E8E8E6] roundedoutline-none focus:bg-white"
            />
          </div>

          {/* Debt Yield */}
          <div className="space-y-1">
            <label className="text-[11px] font-sans font-semibold text-[#051C2C]">Min Required Debt Yield (%)</label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={debtSizing.minDebtYieldPct}
                onChange={(e) => handleFieldChange('minDebtYieldPct', e.target.value)}
                className="w-full pr-7 pl-3 py-1.5 bg-[#FFFDE7] text-[#051C2C] font-bold font-mono border border-[#E8E8E6] roundedoutline-none focus:bg-white"
              />
              <span className="absolute right-3 top-2.5 text-xs text-[#888888] font-bold">%</span>
            </div>
          </div>

          <h3 className="font-heading font-bold text-base text-[#051C2C] tracking-tight pt-3 border-t border-[#E8E8E6] pb-2">
            Debt Pricing & Terms
          </h3>

          {/* Interest Rate */}
          <div className="space-y-1">
            <label className="text-[11px] font-sans font-semibold text-[#051C2C]">Annual Interest Rate (%)</label>
            <div className="relative">
              <input
                type="number"
                step="0.01"
                value={debtSizing.interestRate}
                onChange={(e) => handleFieldChange('interestRate', e.target.value)}
                className="w-full pr-7 pl-3 py-1.5 bg-[#FFFDE7] text-[#051C2C] font-bold font-mono border border-[#E8E8E6] roundedoutline-none focus:bg-white"
              />
              <span className="absolute right-3 top-2.5 text-xs text-[#888888] font-bold">%</span>
            </div>
          </div>

          {/* Amortization years */}
          <div className="space-y-1">
            <label className="text-[11px] font-sans font-semibold text-[#051C2C]">Amortization Term (Years)</label>
            <input
              type="number"
              value={debtSizing.amortizationYrs}
              onChange={(e) => handleFieldChange('amortizationYrs', e.target.value)}
              className="w-full px-3 py-1.5 bg-[#FFFDE7] text-[#051C2C] font-bold font-mono border border-[#E8E8E6] roundedoutline-none focus:bg-white"
            />
          </div>

          {/* IO months */}
          <div className="space-y-1">
            <label className="text-[11px] font-sans font-semibold text-[#051C2C]">Interest-Only Period (Months)</label>
            <input
              type="number"
              value={debtSizing.interestOnlyMths}
              onChange={(e) => handleFieldChange('interestOnlyMths', e.target.value)}
              className="w-full px-3 py-1.5 bg-[#FFFDE7] text-[#051C2C] font-bold font-mono border border-[#E8E8E6] roundedoutline-none focus:bg-white"
            />
          </div>
        </div>

        {/* Right Column: Calculations & Comparison */}
        <div className="lg:col-span-2 space-y-6">
          {/* Sizing Comparison List */}
          <div className="bg-white rounded-[14px] bold-card p-6">
            <h3 className="font-heading font-bold text-lg text-[#051C2C] tracking-tight pb-3 border-b border-[#E8E8E6]">
              Quadruple Underwriting Comparison
            </h3>

            <div className="mt-4 space-y-4">
              {constraintsList.map((constraint, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-lg border transition-all flex items-center justify-between ${
                    constraint.binding
                      ? 'bg-[#2251FF]/5 border-[#2251FF] shadow-sm scale-[1.01]'
                      : 'bg-[#F5F5F2]/50 border-[#E8E8E6]'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-xs font-sans font-bold text-[#051C2C]">
                      {constraint.name}
                    </span>
                    <span className="block text-[10px] text-[#888888] font-mono">
                      Target parameter: {constraint.param}
                    </span>
                  </div>
                  <div className="text-right flex items-center space-x-3">
                    <div className="font-mono text-xs font-extrabold text-[#051C2C]">
                      {formatCurrency(constraint.value)}
                    </div>
                    {constraint.binding && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#2251FF]/10 text-[#2251FF] uppercase tracking-wider">
                        Binding Constraint
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Binding insight block */}
          <div className="p-5 rounded-xl bg-[rgba(34,81,255,0.04)] border-l-4 border-[#2251FF] text-[#051C2C] shadow-sm">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 mt-0.5 text-[#2251FF] flex-shrink-0" />
              <div>
                <h4 className="font-sans font-bold text-[14px]">Binding Underwriting Insight</h4>
                <p className="text-xs text-[#051C2C]/85 mt-1 leading-relaxed">
                  The maximum qualified loan amount is constrained by the <strong className="font-bold">{getBindingLabel()}</strong>, which establishes a baseline borrowing capacity of <strong className="text-[#2251FF] font-extrabold">{formatCurrency(finalLoanAmount)}</strong>.
                  This represents a leverage ratio of <strong>{((finalLoanAmount / purchasePrice) * 100).toFixed(1)}% LTV</strong> relative to the purchase price, and <strong>{((finalLoanAmount / totalProjectCost) * 100).toFixed(1)}% LTC</strong> relative to the total project underwriting cost.
                </p>
              </div>
            </div>
          </div>

          {/* Sizing Overview Details */}
          <div className="bg-white rounded-[14px] bold-card p-5">
            <h4 className="font-heading font-bold text-[#051C2C] text-sm tracking-tight pb-2 border-b border-[#E8E8E6] mb-3">
              Sized Debt Operations Overview
            </h4>
            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="space-y-1">
                <span className="text-[#888888] font-sans">Underwritten Year 1 NOI:</span>
                <strong className="block text-[#051C2C]">{formatCurrency(year1Noi)}</strong>
              </div>
              <div className="space-y-1">
                <span className="text-[#888888] font-sans">Interest Only Monthly Payment:</span>
                <strong className="block text-[#051C2C]">{formatCurrency(finalLoanAmount * (debtSizing.interestRate / 100) / 12)}</strong>
              </div>
              <div className="space-y-1 pt-2 border-t border-dashed border-[#E8E8E6]">
                <span className="text-[#888888] font-sans">Amortizing Monthly Debt Service:</span>
                <strong className="block text-[#2251FF] font-bold">{formatCurrency(results.monthlyAmortizingPmt)}</strong>
              </div>
              <div className="space-y-1 pt-2 border-t border-dashed border-[#E8E8E6]">
                <span className="text-[#888888] font-sans">Projected Year 2 DSCR Ratio:</span>
                <strong className="block text-[#051C2C]">
                  {(year1Noi > 0 && results.monthlyAmortizingPmt > 0) ? (year1Noi / (results.monthlyAmortizingPmt * 12)).toFixed(2) : '1.25'}x
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { ExitValuationAssumptions } from '../types';
import { DollarSign, Landmark, Info } from 'lucide-react';

interface ExitValuationTabProps {
  exitValuation: ExitValuationAssumptions;
  onChange: (updated: Partial<ExitValuationAssumptions>) => void;
  results: {
    forward12mNoi: number;
    exitCapRate: number;
    grossSaleValue: number;
    sellingCostsAmt: number;
    outstandingLoanBal: number;
    netSaleProceeds: number;
    holdPeriodYrs: number;
  };
}

export const ExitValuationTab: React.FC<ExitValuationTabProps> = ({
  exitValuation,
  onChange,
  results,
}) => {
  const {
    forward12mNoi,
    exitCapRate,
    grossSaleValue,
    sellingCostsAmt,
    outstandingLoanBal,
    netSaleProceeds,
    holdPeriodYrs,
  } = results;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleFieldChange = (field: keyof ExitValuationAssumptions, value: string) => {
    onChange({ [field]: parseFloat(value) || 0 });
  };

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Header */}
      <div>
        <h2 className="font-heading font-extrabold text-[#051C2C] text-2xl tracking-[-0.02em]">
          Sheet 7: Exit Valuation & Disposal Proceeds
        </h2>
        <p className="text-[#888888] text-xs mt-1">
          Model the project sale at the end of the Year {holdPeriodYrs} hold term. Capitalizes the forward 12-month stabilized NOI to establish the terminal exit price.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Parameters & Inputs */}
        <div className="bg-white rounded-[14px] bold-card p-6 space-y-5">
          <h3 className="font-heading font-bold text-lg text-[#051C2C] tracking-tight pb-2 border-b border-[#E8E8E6]">
            Disposal Parameters
          </h3>

          {/* Selling Costs */}
          <div className="space-y-1">
            <label className="text-[11px] font-sans font-semibold text-[#051C2C]">Selling transaction costs / brokerage fee (%)</label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={exitValuation.sellingCostsPct}
                onChange={(e) => handleFieldChange('sellingCostsPct', e.target.value)}
                className="w-full pr-7 pl-3 py-1.5 bg-[#FFFDE7] text-[#051C2C] font-bold font-mono border border-[#E8E8E6] rounded outline-none focus:bg-white"
              />
              <span className="absolute right-3 top-2.5 text-xs text-[#888888] font-bold">%</span>
            </div>
            <p className="text-[11px] text-[#888888]">
              Estimated fees, marketing, transfer taxes, and closing charges at exit.
            </p>
          </div>

          <div className="border-t border-[#E8E8E6] pt-4 space-y-3 text-xs font-mono">
            <div className="flex justify-between items-center">
              <span className="text-[#888888] font-sans">Exit Capitalization Rate:</span>
              <strong className="text-[#051C2C] font-bold">{exitCapRate.toFixed(2)}%</strong>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#888888] font-sans">Forward 12M Pro-Forma NOI:</span>
              <strong className="text-[#051C2C] font-bold">{formatCurrency(forward12mNoi)}</strong>
            </div>
            <p className="text-[11px] text-[#888888] font-sans pt-1 border-t border-dashed border-[#E8E8E6]">
              Pro-Forma NOI represents Year {holdPeriodYrs + 1} operating revenues minus expenses.
            </p>
          </div>
        </div>

        {/* Output: Sale proceeds waterfall */}
        <div className="bg-white rounded-[14px] bold-card p-6 space-y-5">
          <h3 className="font-heading font-bold text-lg text-[#051C2C] tracking-tight pb-2 border-b border-[#E8E8E6] flex items-center justify-between">
            <span>Sale Net Proceeds Waterfall</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#2251FF]/10 text-[#2251FF] uppercase tracking-wider">
              Year {holdPeriodYrs} Exit
            </span>
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#888888] font-sans font-semibold">Gross Sale Valuation</span>
              <span className="text-base text-[#051C2C] font-extrabold font-mono">{formatCurrency(grossSaleValue)}</span>
            </div>

            <div className="flex justify-between items-center text-xs text-[#051C2C]">
              <span className="text-[#888888] font-sans font-semibold">Less: Brokerage & Selling Fees ({exitValuation.sellingCostsPct}%)</span>
              <span className="font-bold font-mono text-[#888888]">-{formatCurrency(sellingCostsAmt)}</span>
            </div>

            <div className="flex justify-between items-center text-xs text-[#051C2C]">
              <span className="text-[#888888] font-sans font-semibold">Less: Remaining Loan Principal Repayment</span>
              <span className="font-bold font-mono text-[#888888]">-{formatCurrency(outstandingLoanBal)}</span>
            </div>

            <div className="flex justify-between items-center text-xs pt-3 border-t-2 border-[#051C2C]/10">
              <span className="text-[#051C2C] font-extrabold">Net Cash Proceeds to Equity Partners</span>
              <span className="text-xl text-[#2251FF] font-black font-mono">{formatCurrency(netSaleProceeds)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Disposal Insight */}
      <div className="p-5 rounded-xl bg-[rgba(34,81,255,0.04)] border-l-4 border-[#2251FF] text-[#051C2C] shadow-sm">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 mt-0.5 text-[#2251FF] flex-shrink-0" />
          <div>
            <h4 className="font-sans font-bold text-[14px]">Terminal Appreciation Analysis</h4>
            <p className="text-xs text-[#051C2C]/85 mt-1 leading-relaxed">
              At capitalization rate of <strong className="font-bold">{exitCapRate.toFixed(2)}%</strong>, the asset delivers gross terminal value of <strong className="font-bold">{formatCurrency(grossSaleValue)}</strong>.
              After fully liquidating outstanding senior mortgage debt of <strong className="font-bold">{formatCurrency(outstandingLoanBal)}</strong>, the transaction returns <strong className="text-[#2251FF] font-extrabold">{formatCurrency(netSaleProceeds)}</strong> in clean equity proceeds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

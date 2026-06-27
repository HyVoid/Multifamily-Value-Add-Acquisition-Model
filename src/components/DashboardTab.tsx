import React from 'react';
import { TrendingUp, ArrowUpRight, DollarSign, Key, Percent, FileText, Info } from 'lucide-react';

interface DashboardProps {
  data: {
    closingCostsAmt: number;
    totalRenovationCapex: number;
    totalProjectCost: number;
    year1Noi: number;
    finalLoanAmount: number;
    unleveredIrr: number;
    leveredIrr: number;
    unleveredMultiple: number;
    leveredMultiple: number;
    yieldOnCost: number;
    acquisitionYield: number;
    totalInitialEquity: number;
    forward12mNoi: number;
    grossSaleValue: number;
    sensitivityMatrix1: any[][];
    sensitivityMatrix2: any[][];
    exitCapRate: number;
  };
  projectName: string;
}

export const DashboardTab: React.FC<DashboardProps> = ({ data, projectName }) => {
  const {
    closingCostsAmt,
    totalRenovationCapex,
    totalProjectCost,
    year1Noi,
    finalLoanAmount,
    unleveredIrr,
    leveredIrr,
    unleveredMultiple,
    leveredMultiple,
    yieldOnCost,
    acquisitionYield,
    totalInitialEquity,
    forward12mNoi,
    grossSaleValue,
    sensitivityMatrix1,
    sensitivityMatrix2,
    exitCapRate,
  } = data;

  const exitCapRates = sensitivityMatrix1[0] ? sensitivityMatrix1[0].map((cell: any) => cell.exitCap) : [];

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const formatPercent = (val: number) => {
    return `${val.toFixed(2)}%`;
  };

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-[#E8E8E6]">
        <div>
          <h1 className="font-heading font-extrabold text-[#051C2C] text-3xl md:text-4xl tracking-[-0.03em] leading-tight">
            {projectName || 'Multifamily Acquisition Dashboard'}
          </h1>
          <p className="text-[#888888] text-sm mt-1">
            Real-time financial dashboard and decision support for Value-Add underwriting.
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#2251FF]/10 text-[#2251FF] uppercase tracking-wider">
            Stabilized YOC: {formatPercent(yieldOnCost)}
          </span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#051C2C]/10 text-[#051C2C] uppercase tracking-wider">
            Underwritten Case
          </span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Levered IRR */}
        <div className="bg-white rounded-[14px] p-6 bold-card transition-all duration-300 hover:translate-y-[-2px] relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[4px] bg-[#2251FF]" />
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[#888888] text-[11px] font-bold uppercase tracking-wider font-sans">
                Levered IRR
              </p>
              <h3 className="serif text-[#2251FF] text-3xl md:text-4xl tracking-[-0.03em] mt-2 font-bold leading-none">
                {formatPercent(leveredIrr)}
              </h3>
              <p className="text-[11px] text-[#888888] mt-2 flex items-center">
                Unlevered: {formatPercent(unleveredIrr)}
              </p>
            </div>
            <div className="p-2 bg-[#2251FF]/5 rounded-lg text-[#2251FF] group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Card 2: Equity Multiple */}
        <div className="bg-white rounded-[14px] p-6 bold-card transition-all duration-300 hover:translate-y-[-2px] relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[4px] bg-[#2251FF]" />
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[#888888] text-[11px] font-bold uppercase tracking-wider font-sans">
                Equity Multiple (MoIC)
              </p>
              <h3 className="serif text-[#051C2C] text-3xl md:text-4xl tracking-[-0.03em] mt-2 font-bold leading-none">
                {leveredMultiple.toFixed(2)}x
              </h3>
              <p className="text-[11px] text-[#888888] mt-2">
                Unlevered Multiple: {unleveredMultiple.toFixed(2)}x
              </p>
            </div>
            <div className="p-2 bg-[#051C2C]/5 rounded-lg text-[#051C2C] group-hover:scale-110 transition-transform">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Card 3: Total Capex */}
        <div className="bg-white rounded-[14px] p-6 bold-card transition-all duration-300 hover:translate-y-[-2px] relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[4px] bg-[#2251FF]" />
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[#888888] text-[11px] font-bold uppercase tracking-wider font-sans">
                Renovation Capex
              </p>
              <h3 className="serif text-[#051C2C] text-3xl md:text-4xl tracking-[-0.03em] mt-2 font-bold leading-none">
                {formatCurrency(totalRenovationCapex)}
              </h3>
              <p className="text-[11px] text-[#888888] mt-2">
                Total Budgeted Capex
              </p>
            </div>
            <div className="p-2 bg-[#051C2C]/5 rounded-lg text-[#051C2C] group-hover:scale-110 transition-transform">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Card 4: Yield on Cost */}
        <div className="bg-white rounded-[14px] p-6 bold-card transition-all duration-300 hover:translate-y-[-2px] relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[4px] bg-[#2251FF]" />
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[#888888] text-[11px] font-bold uppercase tracking-wider font-sans">
                Yield on Cost (YOC)
              </p>
              <h3 className="serif text-[#051C2C] text-3xl md:text-4xl tracking-[-0.03em] mt-2 font-bold leading-none">
                {formatPercent(yieldOnCost)}
              </h3>
              <p className="text-[11px] text-[#888888] mt-2">
                Entry Cap Rate: {formatPercent(acquisitionYield)}
              </p>
            </div>
            <div className="p-2 bg-[#051C2C]/5 rounded-lg text-[#051C2C] group-hover:scale-110 transition-transform">
              <Percent className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Insight Section */}
      <div className="p-5 rounded-xl bg-[rgba(34,81,255,0.04)] border-l-4 border-[#2251FF] text-[#051C2C] shadow-sm animate-fade-up">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 mt-0.5 text-[#2251FF] flex-shrink-0" />
          <div>
            <h4 className="font-sans font-bold text-[14px]">Underwriting & Value-Add Strategy Insight</h4>
            <p className="text-xs text-[#051C2C]/85 mt-1 leading-relaxed">
              This business model unlocks premium value by executing unit renovations and rolling out expired rents to market level.
              The total acquisition of <strong className="font-bold">{formatCurrency(data.totalProjectCost - totalRenovationCapex - closingCostsAmt)}</strong> with closing costs of <strong>{formatCurrency(closingCostsAmt)}</strong> and total renovation capex of <strong>{formatCurrency(totalRenovationCapex)}</strong> establishes a total capital base of <strong>{formatCurrency(totalProjectCost)}</strong>.
              With a levered IRR of <strong className="text-[#2251FF] font-bold">{formatPercent(leveredIrr)}</strong> and an equity multiple of <strong className="font-bold">{leveredMultiple.toFixed(2)}x</strong>, this transaction meets standard institutional value-add investment parameters.
            </p>
          </div>
        </div>
      </div>

      {/* Primary Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Deal Summary Card */}
        <div className="bg-white rounded-[14px] bold-card p-6 lg:col-span-1">
          <h3 className="font-heading font-bold text-lg text-[#051C2C] tracking-tight pb-3 border-b border-[#E8E8E6] flex items-center justify-between">
            <span>Transaction Metrics</span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#888888]">
              Baseline
            </span>
          </h3>
          <div className="mt-4 space-y-3.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#888888] font-medium">Purchase Price</span>
              <span className="text-[#051C2C] font-bold font-mono">
                {formatCurrency(data.totalProjectCost - totalRenovationCapex - closingCostsAmt)}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#888888] font-medium">Closing Costs</span>
              <span className="text-[#051C2C] font-semibold font-mono">
                {formatCurrency(closingCostsAmt)}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#888888] font-medium">Renovation Budget</span>
              <span className="text-[#051C2C] font-semibold font-mono">
                {formatCurrency(totalRenovationCapex)}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs pt-2 border-t border-dashed border-[#E8E8E6]">
              <span className="text-[#051C2C] font-bold">Total Project Cost</span>
              <span className="text-[#2251FF] font-extrabold font-mono text-[14px]">
                {formatCurrency(totalProjectCost)}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs pt-1">
              <span className="text-[#888888] font-medium">Sized Loan Amount</span>
              <span className="text-[#051C2C] font-bold font-mono">
                {formatCurrency(finalLoanAmount)}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#888888] font-medium">LTV / LTC Ratio</span>
              <span className="text-[#051C2C] font-semibold font-mono">
                {((finalLoanAmount / (data.totalProjectCost - totalRenovationCapex - closingCostsAmt)) * 100).toFixed(1)}% / {((finalLoanAmount / totalProjectCost) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between items-center text-xs pt-2 border-t border-dashed border-[#E8E8E6]">
              <span className="text-[#051C2C] font-bold">Required Equity Input</span>
              <span className="text-[#051C2C] font-extrabold font-mono">
                {formatCurrency(totalInitialEquity)}
              </span>
            </div>
          </div>
        </div>

        {/* Operating & Valuation Summary */}
        <div className="bg-white rounded-[14px] bold-card p-6 lg:col-span-2">
          <h3 className="font-heading font-bold text-lg text-[#051C2C] tracking-tight pb-3 border-b border-[#E8E8E6] flex items-center justify-between">
            <span>Operating & Valuation Projection Summary</span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#888888]">
              Forward Looking
            </span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#888888] font-medium">Year 1 Net Operating Income (NOI)</span>
                <span className="text-[#051C2C] font-semibold font-mono">{formatCurrency(year1Noi)}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#888888] font-medium">Exit Year Forward 12M NOI</span>
                <span className="text-[#051C2C] font-semibold font-mono">{formatCurrency(forward12mNoi)}</span>
              </div>
              <div className="flex justify-between items-center text-xs pt-2 border-t border-[#E8E8E6]">
                <span className="text-[#051C2C] font-bold">Exit Valuation (Capitalized)</span>
                <span className="text-[#2251FF] font-extrabold font-mono">{formatCurrency(grossSaleValue)}</span>
              </div>
            </div>

            {/* Quick interactive gauge */}
            <div className="bg-[#F5F5F2] rounded-lg p-4 flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-[#888888] font-bold uppercase tracking-wider block">
                  Capital Appreciation Gain
                </span>
                <span className="text-lg font-heading font-extrabold text-[#051C2C] mt-1 block">
                  {formatCurrency(grossSaleValue - (data.totalProjectCost - totalRenovationCapex - closingCostsAmt))}
                </span>
              </div>
              <div className="w-full bg-[#E8E8E6] rounded-full h-1.5 mt-2 overflow-hidden">
                <div
                  className="bg-[#2251FF] h-1.5 rounded-full"
                  style={{ width: `${Math.min(100, Math.max(10, ((grossSaleValue / totalProjectCost) - 1.0) * 100))}%` }}
                />
              </div>
              <span className="text-[10px] text-[#888888] mt-1">
                Value increased by {(((grossSaleValue / (data.totalProjectCost - totalRenovationCapex - closingCostsAmt)) - 1.0) * 100).toFixed(1)}% over holding period.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sensitivity Matrices Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sensitivity Matrix 1: Rent Uplift vs Exit Cap Rate */}
        <div className="bg-white rounded-[14px] bold-card p-6">
          <div className="pb-3 border-b border-[#E8E8E6] mb-4">
            <h4 className="font-heading font-bold text-base text-[#051C2C] tracking-tight">
              Sensitivity: Levered IRR (%)
            </h4>
            <p className="text-[11px] text-[#888888] mt-0.5">
              Impact of Rent Uplift multiplier (Y-axis) vs. Exit Cap Rate (X-axis)
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[12px] font-mono text-center">
              <thead>
                <tr>
                  <th className="p-2 text-left font-sans text-[10px] font-bold text-[#888888] uppercase tracking-wider">
                    Rent Uplift
                  </th>
                  {exitCapRates.map((rate, i) => (
                    <th key={i} className="p-2 bg-[#F5F5F2] font-semibold text-[#051C2C] border-b-2 border-[#E8E8E6]">
                      {rate.toFixed(2)}%
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sensitivityMatrix1.map((row, rowIdx) => {
                  const modifierPercent = row[0].upliftPercent;
                  const modifierLabel = modifierPercent === 0 ? 'Baseline (100%)' : `${modifierPercent > 0 ? '+' : ''}${modifierPercent}%`;
                  return (
                    <tr key={rowIdx} className="hover:bg-[#F5F5F2]/40 transition-colors">
                      <td className="p-2 text-left font-sans font-bold text-[#051C2C] bg-[#F5F5F2] border-r border-[#E8E8E6]">
                        {modifierLabel}
                      </td>
                      {row.map((cell, cellIdx) => {
                        const isBaseline = modifierPercent === 0 && cell.exitCap === exitCapRate;
                        return (
                          <td
                            key={cellIdx}
                            className={`p-2.5 border-b border-r border-[#E8E8E6] transition-all duration-150 hover:scale-[1.04] hover:brightness-105 cursor-default ${
                              isBaseline
                                ? 'bg-[#2251FF] text-white font-bold shadow-sm rounded-sm'
                                : 'text-[#051C2C]'
                            }`}
                          >
                            {cell.leveredIrr.toFixed(2)}%
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-2.5 flex items-center justify-end space-x-4 text-[10px] text-[#888888] font-sans">
            <span className="flex items-center">
              <span className="w-2.5 h-2.5 bg-[#2251FF] rounded-sm mr-1.5 inline-block" />
              Underwritten Target Baseline
            </span>
          </div>
        </div>

        {/* Sensitivity Matrix 2: Purchase Price vs Exit Cap Rate */}
        <div className="bg-white rounded-[14px] bold-card p-6">
          <div className="pb-3 border-b border-[#E8E8E6] mb-4">
            <h4 className="font-heading font-bold text-base text-[#051C2C] tracking-tight">
              Sensitivity: Equity Multiple (MoIC)
            </h4>
            <p className="text-[11px] text-[#888888] mt-0.5">
              Impact of Purchase Price modifier (Y-axis) vs. Exit Cap Rate (X-axis)
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[12px] font-mono text-center">
              <thead>
                <tr>
                  <th className="p-2 text-left font-sans text-[10px] font-bold text-[#888888] uppercase tracking-wider">
                    Purchase Price
                  </th>
                  {exitCapRates.map((rate, i) => (
                    <th key={i} className="p-2 bg-[#F5F5F2] font-semibold text-[#051C2C] border-b-2 border-[#E8E8E6]">
                      {rate.toFixed(2)}%
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sensitivityMatrix2.map((row, rowIdx) => {
                  const priceModifier = row[0].pricePercent;
                  const priceModifierLabel = priceModifier === 0 ? 'Baseline (100%)' : `${priceModifier > 0 ? '+' : ''}${priceModifier}%`;
                  return (
                    <tr key={rowIdx} className="hover:bg-[#F5F5F2]/40 transition-colors">
                      <td className="p-2 text-left font-sans font-bold text-[#051C2C] bg-[#F5F5F2] border-r border-[#E8E8E6]">
                        {priceModifierLabel}
                      </td>
                      {row.map((cell, cellIdx) => {
                        const isBaseline = priceModifier === 0 && cell.exitCap === exitCapRate;
                        return (
                          <td
                            key={cellIdx}
                            className={`p-2.5 border-b border-r border-[#E8E8E6] transition-all duration-150 hover:scale-[1.04] hover:brightness-105 cursor-default ${
                              isBaseline
                                ? 'bg-[#2251FF] text-white font-bold shadow-sm rounded-sm'
                                : 'text-[#051C2C]'
                            }`}
                          >
                            {cell.leveredMultiple.toFixed(2)}x
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-2.5 flex items-center justify-end space-x-4 text-[10px] text-[#888888] font-sans">
            <span className="flex items-center">
              <span className="w-2.5 h-2.5 bg-[#2251FF] rounded-sm mr-1.5 inline-block" />
              Underwritten Target Baseline
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

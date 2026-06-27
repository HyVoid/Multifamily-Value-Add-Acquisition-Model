import React from 'react';
import { YearFlow } from '../types';
import { Award, Percent, DollarSign, Calendar } from 'lucide-react';

interface EquityReturnsTabProps {
  years: YearFlow[];
  data: {
    totalInitialEquity: number;
    unleveredIrr: number;
    leveredIrr: number;
    unleveredMultiple: number;
    leveredMultiple: number;
    unleveredSeries: number[];
    leveredSeries: number[];
    grossSaleValue: number;
    sellingCostsAmt: number;
    outstandingLoanBal: number;
    netSaleProceeds: number;
    totalProjectCost: number;
  };
}

export const EquityReturnsTab: React.FC<EquityReturnsTabProps> = ({
  years,
  data,
}) => {
  const {
    totalInitialEquity,
    unleveredIrr,
    leveredIrr,
    unleveredMultiple,
    leveredMultiple,
    unleveredSeries,
    leveredSeries,
    grossSaleValue,
    sellingCostsAmt,
    outstandingLoanBal,
    netSaleProceeds,
    totalProjectCost,
  } = data;

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
      {/* Header */}
      <div>
        <h2 className="font-heading font-extrabold text-[#051C2C] text-2xl tracking-[-0.02em]">
          Sheet 8: Equity Returns & Investor Performance
        </h2>
        <p className="text-[#888888] text-xs mt-1">
          Review the levered and unlevered cash flow waterfalls, annual cash-on-cash distributions, internal rates of return (IRR), and equity multiples.
        </p>
      </div>

      {/* Hero Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Levered IRR */}
        <div className="bg-white rounded-[14px] bold-card p-6 border-l-4 border-[#2251FF]">
          <span className="text-[#888888] text-[10px] font-sans font-bold uppercase tracking-wider block">
            Levered IRR (Target)
          </span>
          <h3 className="serif text-[#2251FF] text-3xl tracking-tight mt-1.5 font-bold">
            {formatPercent(leveredIrr)}
          </h3>
          <span className="text-[10px] text-[#888888] block mt-1 font-sans">
            Unlevered IRR: {formatPercent(unleveredIrr)}
          </span>
        </div>

        {/* Equity Multiple */}
        <div className="bg-white rounded-[14px] bold-card p-6 border-l-4 border-[#051C2C]">
          <span className="text-[#888888] text-[10px] font-sans font-bold uppercase tracking-wider block">
            Equity Multiple (MoIC)
          </span>
          <h3 className="serif text-[#051C2C] text-3xl tracking-tight mt-1.5 font-bold">
            {leveredMultiple.toFixed(2)}x
          </h3>
          <span className="text-[10px] text-[#888888] block mt-1 font-sans">
            Unlevered Multiple: {unleveredMultiple.toFixed(2)}x
          </span>
        </div>

        {/* Required Sponsor Equity */}
        <div className="bg-white rounded-[14px] bold-card p-6 border-l-4 border-[#051C2C]">
          <span className="text-[#888888] text-[10px] font-sans font-bold uppercase tracking-wider block">
            Sponsor Equity Input
          </span>
          <h3 className="serif text-[#051C2C] text-3xl tracking-tight mt-1.5 font-bold">
            {formatCurrency(totalInitialEquity)}
          </h3>
          <span className="text-[10px] text-[#888888] block mt-1 font-sans">
            Total project leverage: {((totalProjectCost - totalInitialEquity) / totalProjectCost * 100).toFixed(1)}% LTC
          </span>
        </div>

        {/* Stabilized COC */}
        <div className="bg-white rounded-[14px] bold-card p-6 border-l-4 border-[#051C2C]">
          <span className="text-[#888888] text-[10px] font-sans font-bold uppercase tracking-wider block">
            Avg Cash-on-Cash Return
          </span>
          <h3 className="serif text-[#051C2C] text-3xl tracking-tight mt-1.5 font-bold">
            {(years.reduce((sum, y) => sum + y.cashOnCash, 0) / years.length).toFixed(2)}%
          </h3>
          <span className="text-[10px] text-[#888888] block mt-1 font-sans">
            Stabilized Year Peak: {formatPercent(Math.max(...years.map(y => y.cashOnCash)))}
          </span>
        </div>
      </div>

      {/* Waterfall spreadsheet */}
      <div className="bg-white rounded-[14px] bold-card border border-[#E8E8E6] overflow-hidden">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-[#051C2C]/5 text-[#051C2C]">
            <tr className="border-b-2 border-[#051C2C]/10">
              <th className="p-3 text-[11px] font-sans font-bold uppercase tracking-wider">
                Year
              </th>
              <th className="p-3 text-[11px] font-sans font-bold uppercase tracking-wider text-right">
                Unlevered Operations ($)
              </th>
              <th className="p-3 text-[11px] font-sans font-bold uppercase tracking-wider text-right">
                Unlevered Exit Net ($)
              </th>
              <th className="p-3 text-[11px] font-sans font-bold uppercase tracking-wider text-right font-bold">
                Unlevered Cash Flow ($)
              </th>
              <th className="p-3 text-[11px] font-sans font-bold uppercase tracking-wider text-right">
                Levered Operations ($)
              </th>
              <th className="p-3 text-[11px] font-sans font-bold uppercase tracking-wider text-right">
                Levered Exit Net ($)
              </th>
              <th className="p-3 text-[11px] font-sans font-bold uppercase tracking-wider text-right font-bold text-[#051C2C]">
                Levered Cash Flow ($)
              </th>
              <th className="p-3 text-[11px] font-sans font-bold uppercase tracking-wider text-right font-extrabold text-[#2251FF] bg-[#2251FF]/5">
                Cash-On-Cash (CoC)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8E8E6]">
            {/* Year 0 Row */}
            <tr className="hover:bg-[#F5F5F2]/40 text-right font-medium">
              <td className="p-3 text-left font-sans font-bold text-[#051C2C] bg-[#F5F5F2] border-r border-[#E8E8E6]">
                Year 0 (Acquisition)
              </td>
              <td className="p-3 text-[#888888]">-</td>
              <td className="p-3 text-[#888888]">-</td>
              <td className="p-3 text-[#D32F2F] font-bold">
                -{formatCurrency(totalProjectCost)}
              </td>
              <td className="p-3 text-[#888888]">-</td>
              <td className="p-3 text-[#888888]">-</td>
              <td className="p-3 text-[#D32F2F] font-bold">
                -{formatCurrency(totalInitialEquity)}
              </td>
              <td className="p-3 font-semibold text-[#888888] bg-[#2251FF]/5">-</td>
            </tr>

            {/* Hold Years Rows */}
            {years.map((yr, idx) => {
              const isExitYear = yr.year === years.length;
              const unlExit = isExitYear ? grossSaleValue - sellingCostsAmt : 0;
              const levExit = isExitYear ? netSaleProceeds : 0;

              return (
                <tr key={yr.year} className="hover:bg-[#F5F5F2]/40 text-right transition-colors">
                  <td className="p-3 text-left font-sans font-bold text-[#051C2C] bg-[#F5F5F2] border-r border-[#E8E8E6]">
                    Year {yr.year}
                  </td>
                  <td className="p-3 text-[#051C2C]">{formatCurrency(yr.unleveredCashFlow)}</td>
                  <td className="p-3 text-[#2251FF] font-semibold">
                    {unlExit > 0 ? `+${formatCurrency(unlExit)}` : '-'}
                  </td>
                  <td className="p-3 font-bold text-[#051C2C]">
                    {formatCurrency(unleveredSeries[idx + 1])}
                  </td>
                  <td className="p-3 text-[#051C2C]">{formatCurrency(yr.leveredCashFlow)}</td>
                  <td className="p-3 text-[#2251FF] font-semibold">
                    {levExit > 0 ? `+${formatCurrency(levExit)}` : '-'}
                  </td>
                  <td className="p-3 font-bold text-[#051C2C]">
                    {formatCurrency(leveredSeries[idx + 1])}
                  </td>
                  <td className="p-3 font-extrabold text-[#2251FF] bg-[#2251FF]/5">
                    {formatPercent(yr.cashOnCash)}
                  </td>
                </tr>
              );
            })}
          </tbody>

          {/* Sums and Returns */}
          <tfoot className="bg-[#051C2C]/5 font-bold text-right text-[#051C2C]">
            <tr>
              <td className="p-3 text-left uppercase tracking-wider border-r border-[#E8E8E6]">
                IRR & MULTIPLES
              </td>
              <td colSpan={2} className="p-3 text-right text-[11px] font-sans text-[#888888] font-normal uppercase">
                Unlevered Performance:
              </td>
              <td className="p-3 text-left font-sans">
                <span className="block text-[#051C2C] font-extrabold text-xs">
                  IRR: {formatPercent(unleveredIrr)}
                </span>
                <span className="block text-[#888888] font-semibold text-[10px]">
                  Multiple: {unleveredMultiple.toFixed(2)}x
                </span>
              </td>
              <td colSpan={2} className="p-3 text-right text-[11px] font-sans text-[#888888] font-normal uppercase">
                Levered Performance:
              </td>
              <td className="p-3 text-left font-sans">
                <span className="block text-[#2251FF] font-extrabold text-xs">
                  IRR: {formatPercent(leveredIrr)}
                </span>
                <span className="block text-[#888888] font-semibold text-[10px]">
                  Multiple: {leveredMultiple.toFixed(2)}x
                </span>
              </td>
              <td className="p-3 text-base text-[#2251FF] font-extrabold bg-[#2251FF]/5">
                {(years.reduce((sum, y) => sum + y.cashOnCash, 0) / years.length).toFixed(2)}% Avg
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

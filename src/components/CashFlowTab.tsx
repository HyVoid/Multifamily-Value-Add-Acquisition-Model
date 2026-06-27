import React, { useState } from 'react';
import { MonthFlow } from '../types';
import { Calendar, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';

interface CashFlowTabProps {
  flows: MonthFlow[];
  holdPeriodYrs: number;
}

export const CashFlowTab: React.FC<CashFlowTabProps> = ({ flows, holdPeriodYrs }) => {
  const [selectedYear, setSelectedYear] = useState<number | 'All'>(1);
  const [searchTerm, setSearchTerm] = useState('');

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Filter flows
  const filteredFlows = flows.filter((flow) => {
    const matchesYear = selectedYear === 'All' || flow.year === selectedYear;
    const matchesSearch = searchTerm === '' || `month ${flow.month}`.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesYear && matchesSearch;
  });

  // Calculate annual sums for the visible subset
  const totalGprTotal = filteredFlows.reduce((sum, f) => sum + f.gprTotal, 0);
  const totalL2l = filteredFlows.reduce((sum, f) => sum + f.lossToLeaseLoss, 0);
  const totalVacancy = filteredFlows.reduce((sum, f) => sum + f.vacancyLoss, 0);
  const totalConcessions = filteredFlows.reduce((sum, f) => sum + f.concessionsBadDebt, 0);
  const totalEgi = filteredFlows.reduce((sum, f) => sum + f.egi, 0);
  const totalOpex = filteredFlows.reduce((sum, f) => sum + f.totalOpex, 0);
  const totalNoi = filteredFlows.reduce((sum, f) => sum + f.noi, 0);
  const totalCapex = filteredFlows.reduce((sum, f) => sum + f.renovationCapex, 0);
  const totalUnlevered = filteredFlows.reduce((sum, f) => sum + f.unleveredCashFlow, 0);
  const totalDebtService = filteredFlows.reduce((sum, f) => sum + f.debtService, 0);
  const totalLevered = filteredFlows.reduce((sum, f) => sum + f.leveredCashFlow, 0);

  // Generate SVG Chart points (EGI vs NOI over 120 months)
  // We'll map values to fits
  const chartHeight = 120;
  const chartWidth = 500;
  const maxVal = Math.max(...flows.map((f) => f.egi), 1);
  const minVal = Math.min(...flows.map((f) => f.leveredCashFlow), 0);
  const rangeVal = maxVal - minVal;

  const getSvgCoordinates = (index: number, value: number) => {
    const x = (index / (flows.length - 1)) * chartWidth;
    const y = chartHeight - ((value - minVal) / rangeVal) * chartHeight;
    return `${x},${y}`;
  };

  const egiPoints = flows.map((f, i) => getSvgCoordinates(i, f.egi)).join(' ');
  const noiPoints = flows.map((f, i) => getSvgCoordinates(i, f.noi)).join(' ');
  const leveredPoints = flows.map((f, i) => getSvgCoordinates(i, f.leveredCashFlow)).join(' ');

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-extrabold text-[#051C2C] text-2xl tracking-[-0.02em]">
            Sheet 6: 120-Month detailed Projections
          </h2>
          <p className="text-[#888888] text-xs mt-1">
            Browse the full 10-year monthly operations. The table recalculates with zero latency whenever core assumptions shift.
          </p>
        </div>
        
        {/* Navigation Selector */}
        <div className="flex flex-wrap items-center gap-2">
          {/* All Years vs Year Selectors */}
          <button
            onClick={() => setSelectedYear('All')}
            className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider cursor-pointer ${
              selectedYear === 'All'
                ? 'bg-[#051C2C] text-white'
                : 'bg-white text-[#051C2C] border border-[#E8E8E6] hover:bg-[#F5F5F2]'
            }`}
          >
            All Years
          </button>
          {Array.from({ length: holdPeriodYrs }, (_, i) => i + 1).map((yr) => (
            <button
              key={yr}
              onClick={() => setSelectedYear(yr)}
              className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider cursor-pointer ${
                selectedYear === yr
                  ? 'bg-[#2251FF] text-white'
                  : 'bg-white text-[#051C2C] border border-[#E8E8E6] hover:bg-[#F5F5F2]'
              }`}
            >
              Year {yr}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Charts Area */}
      <div className="bg-white rounded-[14px] bold-card p-6">
        <h3 className="font-heading font-bold text-sm text-[#051C2C] tracking-tight pb-2 border-b border-[#E8E8E6] flex items-center justify-between">
          <span>Operating Trend Curve: EGI vs NOI vs Cash Flow</span>
          <span className="text-[10px] font-mono font-semibold uppercase text-[#888888]">
            Full 120 Months Projection
          </span>
        </h3>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          {/* SVG Line Chart */}
          <div className="md:col-span-3 h-[140px] relative">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full overflow-visible">
              {/* Grid Lines */}
              <line x1="0" y1={chartHeight / 2} x2={chartWidth} y2={chartHeight / 2} stroke="#E8E8E6" strokeDasharray="3,3" />
              <line x1="0" y1={chartHeight} x2={chartWidth} y2={chartHeight} stroke="#E8E8E6" />

              {/* Area Under Levered Cash Flow */}
              <polyline
                fill="rgba(34,81,255,0.04)"
                stroke="none"
                points={`0,${chartHeight} ${leveredPoints} ${chartWidth},${chartHeight}`}
              />

              {/* Curve Lines */}
              <polyline fill="none" stroke="#2251FF" strokeWidth="2" points={egiPoints} />
              <polyline fill="none" stroke="#051C2C" strokeWidth="2" points={noiPoints} />
              <polyline fill="none" stroke="#2251FF" strokeWidth="1.5" strokeDasharray="3,3" points={leveredPoints} />
            </svg>
          </div>

          {/* Chart Legend */}
          <div className="md:col-span-1 space-y-3.5 text-xs">
            <div className="flex items-center space-x-2">
              <span className="w-3.5 h-0.5 bg-[#2251FF] inline-block" />
              <div>
                <span className="text-[#888888] font-medium block">Effective Gross Income (EGI)</span>
                <strong className="text-[#051C2C] font-semibold font-mono">
                  Peak: {formatCurrency(Math.max(...flows.map(f => f.egi)))}/mo
                </strong>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3.5 h-0.5 bg-[#051C2C] inline-block" />
              <div>
                <span className="text-[#888888] font-medium block">Net Operating Income (NOI)</span>
                <strong className="text-[#051C2C] font-semibold font-mono">
                  Peak: {formatCurrency(Math.max(...flows.map(f => f.noi)))}/mo
                </strong>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3.5 h-0.5 bg-[#2251FF] border-b border-dashed inline-block" />
              <div>
                <span className="text-[#888888] font-medium block">Levered Cash Flow (post-DS)</span>
                <strong className="text-[#2251FF] font-semibold font-mono">
                  {formatCurrency(flows[flows.length - 1].leveredCashFlow)}/mo
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spreadsheet grid */}
      <div className="bg-white rounded-[14px] bold-card border border-[#E8E8E6] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#051C2C]/5 text-[#051C2C]">
              <tr className="border-b-2 border-[#051C2C]/10">
                <th className="p-2.5 text-[11px] font-sans font-bold uppercase tracking-wider text-center border-r border-[#E8E8E6]">
                  Month
                </th>
                <th className="p-2.5 text-[11px] font-sans font-bold uppercase tracking-wider text-center">
                  Year
                </th>
                <th className="p-2.5 text-[11px] font-sans font-bold uppercase tracking-wider text-right">
                  GPR Unimproved
                </th>
                <th className="p-2.5 text-[11px] font-sans font-bold uppercase tracking-wider text-right">
                  GPR Uplift
                </th>
                <th className="p-2.5 text-[11px] font-sans font-bold uppercase tracking-wider text-right font-bold text-[#051C2C]">
                  GPR Total
                </th>
                <th className="p-2.5 text-[11px] font-sans font-bold uppercase tracking-wider text-right">
                  Loss-to-Lease
                </th>
                <th className="p-2.5 text-[11px] font-sans font-bold uppercase tracking-wider text-right">
                  Vacancy Loss
                </th>
                <th className="p-2.5 text-[11px] font-sans font-bold uppercase tracking-wider text-right text-[#888888]">
                  Bad Debt / Conc.
                </th>
                <th className="p-2.5 text-[11px] font-sans font-bold uppercase tracking-wider text-right font-bold">
                  EGI
                </th>
                <th className="p-2.5 text-[11px] font-sans font-bold uppercase tracking-wider text-right">
                  Total OPEX
                </th>
                <th className="p-2.5 text-[11px] font-sans font-bold uppercase tracking-wider text-right font-extrabold text-[#2251FF] bg-[#2251FF]/5">
                  NOI
                </th>
                <th className="p-2.5 text-[11px] font-sans font-bold uppercase tracking-wider text-right">
                  Renovation Capex
                </th>
                <th className="p-2.5 text-[11px] font-sans font-bold uppercase tracking-wider text-right font-bold text-[#051C2C]">
                  Unlevered CF
                </th>
                <th className="p-2.5 text-[11px] font-sans font-bold uppercase tracking-wider text-right">
                  Debt Service
                </th>
                <th className="p-2.5 text-[11px] font-sans font-bold uppercase tracking-wider text-right font-extrabold text-[#2251FF] bg-[#2251FF]/5">
                  Levered CF
                </th>
                <th className="p-2.5 text-[11px] font-sans font-bold uppercase tracking-wider text-right">
                  Ending Debt Bal
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E6]">
              {filteredFlows.map((flow) => (
                <tr
                  key={flow.month}
                  className="hover:bg-[#F5F5F2]/40 text-right transition-colors"
                >
                  <td className="p-2.5 text-center font-bold text-[#051C2C] bg-[#F5F5F2] border-r border-[#E8E8E6]">
                    M{flow.month}
                  </td>
                  <td className="p-2.5 text-center text-[#888888] font-bold">
                    Y{flow.year}
                  </td>
                  <td className="p-2.5 text-[#888888]">{formatCurrency(flow.gprUnimproved)}</td>
                  <td className="p-2.5 text-[#2251FF] font-semibold">+{formatCurrency(flow.gprValueAddUplift)}</td>
                  <td className="p-2.5 font-bold text-[#051C2C]">{formatCurrency(flow.gprTotal)}</td>
                  <td className={`p-2.5 font-semibold ${flow.lossToLeaseLoss > 0 ? 'text-[#051C2C]' : 'text-[#888888]'}`}>
                    -{formatCurrency(flow.lossToLeaseLoss)}
                  </td>
                  <td className="p-2.5 text-[#888888]">-{formatCurrency(flow.vacancyLoss)}</td>
                  <td className="p-2.5 text-[#888888]">-{formatCurrency(flow.concessionsBadDebt)}</td>
                  <td className="p-2.5 font-bold text-[#051C2C]">{formatCurrency(flow.egi)}</td>
                  <td className="p-2.5 text-[#888888]">{formatCurrency(flow.totalOpex)}</td>
                  <td className="p-2.5 font-bold text-[#2251FF] bg-[#2251FF]/5">{formatCurrency(flow.noi)}</td>
                  <td className={`p-2.5 font-semibold ${flow.renovationCapex > 0 ? 'text-[#051C2C]' : 'text-[#888888]'}`}>
                    {flow.renovationCapex > 0 ? formatCurrency(flow.renovationCapex) : '-'}
                  </td>
                  <td className="p-2.5 font-bold text-[#051C2C]">{formatCurrency(flow.unleveredCashFlow)}</td>
                  <td className="p-2.5 text-[#888888]">{formatCurrency(flow.debtService)}</td>
                  <td className="p-2.5 font-bold text-[#2251FF] bg-[#2251FF]/5">{formatCurrency(flow.leveredCashFlow)}</td>
                  <td className="p-2.5 text-[#888888]">{formatCurrency(flow.endingLoanBalance)}</td>
                </tr>
              ))}
            </tbody>

            {/* Summation Row */}
            <tfoot className="bg-[#051C2C]/5 font-bold text-right text-[#051C2C]">
              <tr>
                <td colSpan={2} className="p-2.5 text-center uppercase tracking-wider border-r border-[#E8E8E6]">
                  SUM TOTALS
                </td>
                <td className="p-2.5 text-[#888888] font-normal">Recalculated</td>
                <td className="p-2.5 text-[#888888] font-normal">Dynamic</td>
                <td className="p-2.5">{formatCurrency(totalGprTotal)}</td>
                <td className="p-2.5 text-[#888888] font-semibold">-{formatCurrency(totalL2l)}</td>
                <td className="p-2.5 text-[#888888] font-semibold">-{formatCurrency(totalVacancy)}</td>
                <td className="p-2.5 text-[#888888] font-normal">-{formatCurrency(totalConcessions)}</td>
                <td className="p-2.5 text-base font-extrabold">{formatCurrency(totalEgi)}</td>
                <td className="p-2.5 text-[#888888] font-semibold">{formatCurrency(totalOpex)}</td>
                <td className="p-2.5 text-base text-[#2251FF] font-extrabold bg-[#2251FF]/5">{formatCurrency(totalNoi)}</td>
                <td className="p-2.5">{formatCurrency(totalCapex)}</td>
                <td className="p-2.5">{formatCurrency(totalUnlevered)}</td>
                <td className="p-2.5 text-[#888888]">{formatCurrency(totalDebtService)}</td>
                <td className="p-2.5 text-base text-[#2251FF] font-extrabold bg-[#2251FF]/5">{formatCurrency(totalLevered)}</td>
                <td className="p-2.5 text-[#888888] font-normal">Active Balance</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

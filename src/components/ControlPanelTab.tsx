import React from 'react';
import { ControlPanel } from '../types';

interface ControlPanelProps {
  controlPanel: ControlPanel;
  onChange: (updated: Partial<ControlPanel>) => void;
  calculatedClosingCosts: number;
}

export const ControlPanelTab: React.FC<ControlPanelProps> = ({
  controlPanel,
  onChange,
  calculatedClosingCosts,
}) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleInputChange = (field: keyof ControlPanel, val: any) => {
    if (field === 'projectName') {
      onChange({ [field]: val });
    } else {
      onChange({ [field]: parseFloat(val) || 0 });
    }
  };

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Tab Header */}
      <div>
        <h2 className="font-heading font-extrabold text-[#051C2C] text-2xl tracking-[-0.02em]">
          Sheet 1: Control Panel & Global Assumptions
        </h2>
        <p className="text-[#888888] text-xs mt-1 font-sans">
          Configure the primary transactional parameters, purchase valuations, opex escalators, and holdings term.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card Left: Acquisition Parameters */}
        <div className="bg-white rounded-[14px] bold-card p-6 space-y-5">
          <h3 className="font-heading font-bold text-lg text-[#051C2C] tracking-tight pb-2 border-b border-[#E8E8E6]">
            Deal & Structure Setup
          </h3>

          {/* Project Name */}
          <div className="space-y-1">
            <label className="text-[10px] font-sans font-bold text-[#888888] uppercase tracking-wider block">
              Project Name
            </label>
            <input
              type="text"
              value={controlPanel.projectName}
              onChange={(e) => handleInputChange('projectName', e.target.value)}
              className="w-full px-3 py-2 bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded-md text-xs font-semibold focus:ring-1 focus:ring-[#2251FF] outline-none"
            />
          </div>

          {/* Purchase Price */}
          <div className="space-y-1">
            <label className="text-[10px] font-sans font-bold text-[#888888] uppercase tracking-wider block">
              Purchase Price ($)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs text-[#888888] font-bold font-mono">
                $
              </span>
              <input
                type="number"
                value={controlPanel.purchasePrice}
                onChange={(e) => handleInputChange('purchasePrice', e.target.value)}
                className="w-full pl-7 pr-3 py-2 bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded-md text-xs font-bold font-mono focus:ring-1 focus:ring-[#2251FF] outline-none"
              />
            </div>
            <p className="text-[11px] text-[#888888] font-mono">
              Formatted: {formatCurrency(controlPanel.purchasePrice)}
            </p>
          </div>

          {/* Closing Costs */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-sans font-bold text-[#888888] uppercase tracking-wider block">
                Closing Costs (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.05"
                  value={controlPanel.closingCostsPct}
                  onChange={(e) => handleInputChange('closingCostsPct', e.target.value)}
                  className="w-full pr-7 pl-3 py-2 bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded-md text-xs font-bold font-mono focus:ring-1 focus:ring-[#2251FF] outline-none"
                />
                <span className="absolute right-3 top-2.5 text-xs text-[#888888] font-bold">
                  %
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-sans font-bold text-[#888888] uppercase tracking-wider block">
                Calculated Costs ($)
              </label>
              <div className="px-3 py-2 bg-[#F5F5F2] text-[#051C2C] border border-[#E8E8E6] rounded-md text-xs font-bold font-mono">
                {formatCurrency(calculatedClosingCosts)}
              </div>
            </div>
          </div>

          {/* Holding Term */}
          <div className="space-y-1">
            <label className="text-[10px] font-sans font-bold text-[#888888] uppercase tracking-wider block">
              Investment Hold Period (Years)
            </label>
            <select
              value={controlPanel.holdPeriodYrs}
              onChange={(e) => handleInputChange('holdPeriodYrs', e.target.value)}
              className="w-full px-3 py-2 bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded-md text-xs font-bold focus:ring-1 focus:ring-[#2251FF] outline-none cursor-pointer"
            >
              {[3, 4, 5, 6, 7, 8, 9, 10].map((yr) => (
                <option key={yr} value={yr}>
                  {yr} Years Hold Term
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Card Right: Market & Escalation Parameters */}
        <div className="bg-white rounded-[14px] bold-card p-6 space-y-5">
          <h3 className="font-heading font-bold text-lg text-[#051C2C] tracking-tight pb-2 border-b border-[#E8E8E6]">
            Market Escalations & Disposal Rates
          </h3>

          {/* Exit Cap Rate */}
          <div className="space-y-1">
            <label className="text-[10px] font-sans font-bold text-[#888888] uppercase tracking-wider block">
              Disposal Capitalization Rate (%)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.05"
                value={controlPanel.exitCapRate}
                onChange={(e) => handleInputChange('exitCapRate', e.target.value)}
                className="w-full pr-7 pl-3 py-2 bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded-md text-xs font-bold font-mono focus:ring-1 focus:ring-[#2251FF] outline-none"
              />
              <span className="absolute right-3 top-2.5 text-xs text-[#888888] font-bold">
                %
              </span>
            </div>
            <p className="text-[11px] text-[#888888]">
              Used to capitalize Year Hold + 1 forward 12-month net operating income (NOI) at exit.
            </p>
          </div>

          {/* Rent Growth Year 1 */}
          <div className="space-y-1">
            <label className="text-[10px] font-sans font-bold text-[#888888] uppercase tracking-wider block">
              Market Rent Growth (Year 1)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.05"
                value={controlPanel.rentGrowthY1}
                onChange={(e) => handleInputChange('rentGrowthY1', e.target.value)}
                className="w-full pr-7 pl-3 py-2 bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded-md text-xs font-bold font-mono focus:ring-1 focus:ring-[#2251FF] outline-none"
              />
              <span className="absolute right-3 top-2.5 text-xs text-[#888888] font-bold">
                %
              </span>
            </div>
          </div>

          {/* Rent Growth Year 2+ */}
          <div className="space-y-1">
            <label className="text-[10px] font-sans font-bold text-[#888888] uppercase tracking-wider block">
              Market Rent Growth (Year 2+)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.05"
                value={controlPanel.rentGrowthY2Plus}
                onChange={(e) => handleInputChange('rentGrowthY2Plus', e.target.value)}
                className="w-full pr-7 pl-3 py-2 bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded-md text-xs font-bold font-mono focus:ring-1 focus:ring-[#2251FF] outline-none"
              />
              <span className="absolute right-3 top-2.5 text-xs text-[#888888] font-bold">
                %
              </span>
            </div>
          </div>

          {/* Inflation Opex */}
          <div className="space-y-1">
            <label className="text-[10px] font-sans font-bold text-[#888888] uppercase tracking-wider block">
              Annual Operating Expense Inflation Rate (%)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.05"
                value={controlPanel.inflationOpex}
                onChange={(e) => handleInputChange('inflationOpex', e.target.value)}
                className="w-full pr-7 pl-3 py-2 bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded-md text-xs font-bold font-mono focus:ring-1 focus:ring-[#2251FF] outline-none"
              />
              <span className="absolute right-3 top-2.5 text-xs text-[#888888] font-bold">
                %
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

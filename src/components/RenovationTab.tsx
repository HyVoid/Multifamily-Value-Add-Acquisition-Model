import React from 'react';
import { RenovationScheduleItem, UnitType } from '../types';
import { Hammer, Info } from 'lucide-react';

interface RenovationTabProps {
  schedule: Record<UnitType, RenovationScheduleItem>;
  rentRoll: { unitType: UnitType }[];
  onChange: (type: UnitType, updated: Partial<RenovationScheduleItem>) => void;
}

export const RenovationTab: React.FC<RenovationTabProps> = ({
  schedule,
  rentRoll,
  onChange,
}) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const getAvailableCount = (type: UnitType) => {
    return rentRoll.filter((u) => u.unitType === type).length;
  };

  const handleFieldChange = (type: UnitType, field: keyof RenovationScheduleItem, value: string) => {
    onChange(type, { [field]: parseFloat(value) || 0 });
  };

  const unitTypes: UnitType[] = ['Studio', '1BR', '2BR', '3BR'];

  // Calculate overall totals
  const totalCapexSum = unitTypes.reduce((sum, type) => {
    const item = schedule[type];
    return sum + (item.totalUnitsToRenovate * item.renovationCostPerUnit);
  }, 0);

  const totalMonthlyUpliftSum = unitTypes.reduce((sum, type) => {
    const item = schedule[type];
    return sum + (item.totalUnitsToRenovate * item.rentUpliftPerUnit);
  }, 0);

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Header */}
      <div>
        <h2 className="font-heading font-extrabold text-[#051C2C] text-2xl tracking-[-0.02em]">
          Sheet 4: Renovation Schedule & Capital Expenditures (Capex)
        </h2>
        <p className="text-[#888888] text-xs mt-1">
          Specify renovation speeds, unitary hard costs, start times, and rent uplifts to generate the Value-Add roll-out.
        </p>
      </div>

      {/* Summary Banner */}
      <div className="p-5 rounded-xl bg-[rgba(34,81,255,0.04)] border-l-4 border-[#2251FF] text-[#051C2C] shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-start space-x-3">
          <Hammer className="w-5 h-5 mt-0.5 text-[#2251FF]" />
          <div>
            <h4 className="font-sans font-bold text-[14px]">Value-Add Construction Summary</h4>
            <p className="text-xs text-[#051C2C]/80 mt-0.5">
              These renovations create immediate asset appreciation and drive long-term yield.
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-6 font-mono text-xs sm:text-right">
          <div>
            <span className="text-[#888888] font-sans font-medium block">Total Renovation Budget</span>
            <strong className="text-lg font-heading text-[#051C2C] font-extrabold">{formatCurrency(totalCapexSum)}</strong>
          </div>
          <div>
            <span className="text-[#888888] font-sans font-medium block">Total Potential Monthly Lift</span>
            <strong className="text-lg font-heading text-[#2251FF] font-extrabold">{formatCurrency(totalMonthlyUpliftSum)}</strong>
          </div>
        </div>
      </div>

      {/* Schedule Table */}
      <div className="bg-white rounded-[14px] bold-card overflow-hidden border border-[#E8E8E6]">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#051C2C]/5 text-[#051C2C]">
            <tr>
              <th className="p-3 border-b-2 border-[#051C2C]/10 text-[11px] font-sans font-bold uppercase tracking-wider">
                Unit Type
              </th>
              <th className="p-3 border-b-2 border-[#051C2C]/10 text-[11px] font-sans font-bold uppercase tracking-wider text-center">
                Total Available Units
              </th>
              <th className="p-3 border-b-2 border-[#051C2C]/10 text-[11px] font-sans font-bold uppercase tracking-wider">
                Units To Renovate
              </th>
              <th className="p-3 border-b-2 border-[#051C2C]/10 text-[11px] font-sans font-bold uppercase tracking-wider">
                Cost Per Unit ($)
              </th>
              <th className="p-3 border-b-2 border-[#051C2C]/10 text-[11px] font-sans font-bold uppercase tracking-wider">
                Monthly Rent Uplift ($)
              </th>
              <th className="p-3 border-b-2 border-[#051C2C]/10 text-[11px] font-sans font-bold uppercase tracking-wider">
                Start Month
              </th>
              <th className="p-3 border-b-2 border-[#051C2C]/10 text-[11px] font-sans font-bold uppercase tracking-wider">
                Max Units / Month
              </th>
              <th className="p-3 border-b-2 border-[#051C2C]/10 text-[11px] font-sans font-bold uppercase tracking-wider">
                Duration (Months)
              </th>
              <th className="p-3 border-b-2 border-[#051C2C]/10 text-[11px] font-sans font-bold uppercase tracking-wider">
                Total Capex Budget ($)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8E8E6]">
            {unitTypes.map((type) => {
              const item = schedule[type];
              const available = getAvailableCount(type);
              const totalCapex = item.totalUnitsToRenovate * item.renovationCostPerUnit;

              return (
                <tr
                  key={type}
                  className="hover:bg-[#F5F5F2]/40 transition-all duration-150"
                >
                  {/* Type */}
                  <td className="p-3 font-bold text-[#051C2C] font-sans">
                    {type}
                  </td>

                  {/* Available count */}
                  <td className="p-3 text-center text-[#888888] font-bold font-mono">
                    {available} Units
                  </td>

                  {/* Units to Renovate */}
                  <td className="p-3">
                    <input
                      type="number"
                      max={available}
                      value={item.totalUnitsToRenovate}
                      onChange={(e) => handleFieldChange(type, 'totalUnitsToRenovate', e.target.value)}
                      className="w-20 px-2 py-1 bg-[#FFFDE7] text-[#051C2C] font-bold font-mono border border-[#E8E8E6] rounded outline-none focus:bg-white text-right"
                    />
                  </td>

                  {/* Cost per unit */}
                  <td className="p-3">
                    <div className="relative">
                      <span className="absolute left-2 top-1.5 text-[10px] text-[#888888] font-bold font-mono">$</span>
                      <input
                        type="number"
                        value={item.renovationCostPerUnit}
                        onChange={(e) => handleFieldChange(type, 'renovationCostPerUnit', e.target.value)}
                        className="w-24 pl-5 pr-2 py-1 bg-[#FFFDE7] text-[#051C2C] font-bold font-mono border border-[#E8E8E6] rounded outline-none focus:bg-white text-right"
                      />
                    </div>
                  </td>

                  {/* Rent Uplift */}
                  <td className="p-3">
                    <div className="relative">
                      <span className="absolute left-2 top-1.5 text-[10px] text-[#888888] font-bold font-mono">$</span>
                      <input
                        type="number"
                        value={item.rentUpliftPerUnit}
                        onChange={(e) => handleFieldChange(type, 'rentUpliftPerUnit', e.target.value)}
                        className="w-20 pl-5 pr-2 py-1 bg-[#FFFDE7] text-[#051C2C] font-bold font-mono border border-[#E8E8E6] rounded outline-none focus:bg-white text-right"
                      />
                    </div>
                  </td>

                  {/* Start Month */}
                  <td className="p-3">
                    <select
                      value={item.renovationStartMonth}
                      onChange={(e) => handleFieldChange(type, 'renovationStartMonth', e.target.value)}
                      className="px-2 py-1 bg-[#FFFDE7] text-[#051C2C] font-bold font-mono border border-[#E8E8E6] rounded outline-none focus:bg-white cursor-pointer"
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                        <option key={m} value={m}>
                          Month {m}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* Max Per Month */}
                  <td className="p-3">
                    <input
                      type="number"
                      value={item.maxRenovationPerMonth}
                      onChange={(e) => handleFieldChange(type, 'maxRenovationPerMonth', e.target.value)}
                      className="w-16 px-2 py-1 bg-[#FFFDE7] text-[#051C2C] font-bold font-mono border border-[#E8E8E6] rounded outline-none focus:bg-white text-right"
                    />
                  </td>

                  {/* Duration */}
                  <td className="p-3">
                    <input
                      type="number"
                      value={item.renovationDurationMths}
                      onChange={(e) => handleFieldChange(type, 'renovationDurationMths', e.target.value)}
                      className="w-16 px-2 py-1 bg-[#FFFDE7] text-[#051C2C] font-bold font-mono border border-[#E8E8E6] rounded outline-none focus:bg-white text-right"
                    />
                  </td>

                  {/* Total Capex for Type */}
                  <td className="p-3 font-bold font-mono text-[#051C2C]">
                    {formatCurrency(totalCapex)}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className="bg-[#051C2C]/5 font-bold text-[#051C2C]">
            <tr>
              <td colSpan={2} className="p-3">TOTAL VALUES</td>
              <td className="p-3 text-[#888888] font-normal">
                {unitTypes.reduce((sum, t) => sum + schedule[t].totalUnitsToRenovate, 0)} Units Scheduled
              </td>
              <td colSpan={5} className="p-3 text-right">Grand Total Capex:</td>
              <td className="p-3 font-mono text-base text-[#2251FF] font-extrabold">
                {formatCurrency(totalCapexSum)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Visual Gantt timeline preview */}
      <div className="bg-white rounded-xl p-6 shadow-[0_2px_4px_rgba(5,28,44,0.04),0_8px_24px_rgba(5,28,44,0.08)]">
        <h4 className="font-heading font-bold text-[#051C2C] text-sm tracking-tight pb-2 border-b border-[#E8E8E6]">
          Upgrade Campaign Pipeline Gantt Preview
        </h4>
        <div className="mt-4 space-y-4">
          {unitTypes.map((type) => {
            const item = schedule[type];
            const start = item.renovationStartMonth;
            // total months is ceil(totalUnits / maxPerMonth) * duration
            const durationTotal = Math.ceil(item.totalUnitsToRenovate / item.maxRenovationPerMonth) * item.renovationDurationMths;
            const end = start + durationTotal;
            
            return (
              <div key={type} className="flex items-center text-xs">
                <span className="w-16 font-bold text-[#051C2C]">{type}</span>
                <div className="flex-1 bg-[#F5F5F2] h-6 rounded overflow-hidden relative border border-[#E8E8E6]">
                  {/* Timeline segment */}
                  {durationTotal > 0 && (
                    <div
                      className="absolute bg-[#2251FF] h-full text-[10px] text-white flex items-center justify-center font-bold font-mono rounded shadow-inner"
                      style={{
                        left: `${((start - 1) / 24) * 100}%`,
                        width: `${(durationTotal / 24) * 100}%`,
                        minWidth: '24px',
                      }}
                    >
                      M{start}-M{end - 1}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-3.5 flex justify-between text-[10px] text-[#888888] font-mono pl-16">
          <span>Month 1</span>
          <span>Month 6</span>
          <span>Month 12</span>
          <span>Month 18</span>
          <span>Month 24</span>
        </div>
      </div>
    </div>
  );
};

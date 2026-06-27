import React, { useState } from 'react';
import { Plus, Trash2, Search, Info } from 'lucide-react';
import { RentRollItem, UnitType } from '../types';

interface RentRollTabProps {
  rentRoll: RentRollItem[];
  operations: {
    baselineMarketRentStudio: number;
    baselineMarketRent1BR: number;
    baselineMarketRent2BR: number;
    baselineMarketRent3BR: number;
  };
  onChange: (updated: RentRollItem[]) => void;
}

export const RentRollTab: React.FC<RentRollTabProps> = ({
  rentRoll,
  operations,
  onChange,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('All');

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const getBaselineMarketRent = (type: UnitType) => {
    if (type === 'Studio') return operations.baselineMarketRentStudio;
    if (type === '1BR') return operations.baselineMarketRent1BR;
    if (type === '2BR') return operations.baselineMarketRent2BR;
    return operations.baselineMarketRent3BR;
  };

  const handleFieldChange = (id: string, field: keyof RentRollItem, value: any) => {
    const updated = rentRoll.map((unit) => {
      if (unit.id === id) {
        if (field === 'isRenovatedInitial') {
          return { ...unit, [field]: value === 'true' };
        } else if (field === 'squareFeet' || field === 'currentActualRent' || field === 'leaseEndMonth') {
          return { ...unit, [field]: parseFloat(value) || 0 };
        } else {
          return { ...unit, [field]: value };
        }
      }
      return unit;
    });
    onChange(updated);
  };

  const handleDeleteUnit = (id: string) => {
    const updated = rentRoll.filter((unit) => unit.id !== id);
    onChange(updated);
  };

  const handleAddUnit = () => {
    const nextNum = rentRoll.length + 1;
    const newUnit: RentRollItem = {
      id: `unit-new-${Date.now()}`,
      unitNumber: `${Math.ceil(nextNum / 6)}0${(nextNum % 6) + 1}`,
      unitType: '1BR',
      squareFeet: 650,
      currentActualRent: 1350,
      leaseEndMonth: 12,
      isRenovatedInitial: false,
    };
    onChange([...rentRoll, newUnit]);
  };

  // Filter rent roll
  const filteredRentRoll = rentRoll.filter((unit) => {
    const matchesSearch = unit.unitNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'All' || unit.unitType === filterType;
    return matchesSearch && matchesFilter;
  });

  // Calculate totals and averages
  const totalUnits = filteredRentRoll.length;
  const totalSF = filteredRentRoll.reduce((sum, u) => sum + u.squareFeet, 0);
  const avgSF = totalUnits > 0 ? totalSF / totalUnits : 0;
  const totalActualRent = filteredRentRoll.reduce((sum, u) => sum + u.currentActualRent, 0);
  const avgActualRent = totalUnits > 0 ? totalActualRent / totalUnits : 0;

  const totalMarketRent = filteredRentRoll.reduce((sum, u) => sum + getBaselineMarketRent(u.unitType), 0);
  const avgMarketRent = totalUnits > 0 ? totalMarketRent / totalUnits : 0;

  const totalLossToLease = filteredRentRoll.reduce((sum, u) => {
    const market = getBaselineMarketRent(u.unitType);
    return sum + Math.max(0, market - u.currentActualRent);
  }, 0);

  // Maximum value for inline data bar calculations
  const maxActualRent = Math.max(...rentRoll.map((u) => u.currentActualRent), 1);
  const maxSF = Math.max(...rentRoll.map((u) => u.squareFeet), 1);

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-extrabold text-[#051C2C] text-2xl tracking-[-0.02em]">
            Sheet 2: Unit Rent Roll Input
          </h2>
          <p className="text-[#888888] text-xs mt-1">
            Maintain high-resolution lease profiles and model dynamic Loss-to-Lease amortization paths.
          </p>
        </div>
        <button
          onClick={handleAddUnit}
          className="inline-flex items-center px-4 py-2 bg-[#2251FF] hover:bg-[#2251FF]/90 text-white rounded-lg text-xs font-semibold shadow-md hover:translate-y-[-1px] transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Add New Apartment Unit
        </button>
      </div>

      {/* Filters and summary stats bar */}
      <div className="bg-white rounded-[14px] bold-card p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-2 text-[#888888] w-4 h-4" />
            <input
              type="text"
              placeholder="Search unit number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 w-44 bg-[#F5F5F2] hover:bg-white text-xs text-[#051C2C] border border-[#E8E8E6] rounded-md outline-none focus:ring-1 focus:ring-[#2251FF]"
            />
          </div>

          {/* Unit Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-2.5 py-1.5 bg-[#F5F5F2] hover:bg-white border border-[#E8E8E6] text-xs font-semibold text-[#051C2C] rounded-md outline-none cursor-pointer"
          >
            <option value="All">All Types</option>
            <option value="Studio">Studio</option>
            <option value="1BR">1BR</option>
            <option value="2BR">2BR</option>
            <option value="3BR">3BR</option>
          </select>
        </div>

        {/* Quick summary numbers */}
        <div className="flex items-center space-x-6 text-xs text-[#051C2C]">
          <div>
            <span className="text-[#888888] font-medium block">Total Units</span>
            <strong className="font-bold">{totalUnits}</strong>
          </div>
          <div>
            <span className="text-[#888888] font-medium block">Total Area (SF)</span>
            <strong className="font-bold">{totalSF.toLocaleString()} SF</strong>
          </div>
          <div>
            <span className="text-[#888888] font-medium block">Avg Actual Rent</span>
            <strong className="font-bold">{formatCurrency(avgActualRent)}</strong>
          </div>
          <div>
            <span className="text-[#888888] font-medium block">Total L2L Leakage</span>
            <strong className="text-[#051C2C] font-bold">{formatCurrency(totalLossToLease)}</strong>
          </div>
        </div>
      </div>

      {/* Spreadsheet Container */}
      <div className="bg-white rounded-[14px] bold-card overflow-hidden border border-[#E8E8E6]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#051C2C]/5 text-[#051C2C] font-semibold">
              <tr>
                <th className="p-3 border-b-2 border-[#051C2C]/10 text-[11px] font-sans font-bold uppercase tracking-wider">
                  Unit #
                </th>
                <th className="p-3 border-b-2 border-[#051C2C]/10 text-[11px] font-sans font-bold uppercase tracking-wider">
                  Unit Type
                </th>
                <th className="p-3 border-b-2 border-[#051C2C]/10 text-[11px] font-sans font-bold uppercase tracking-wider">
                  Area (SF)
                </th>
                <th className="p-3 border-b-2 border-[#051C2C]/10 text-[11px] font-sans font-bold uppercase tracking-wider">
                  Current Actual Rent ($)
                </th>
                <th className="p-3 border-b-2 border-[#051C2C]/10 text-[11px] font-sans font-bold uppercase tracking-wider">
                  Initial Market Rent ($)
                </th>
                <th className="p-3 border-b-2 border-[#051C2C]/10 text-[11px] font-sans font-bold uppercase tracking-wider">
                  Contract L2L ($)
                </th>
                <th className="p-3 border-b-2 border-[#051C2C]/10 text-[11px] font-sans font-bold uppercase tracking-wider">
                  Lease End Month
                </th>
                <th className="p-3 border-b-2 border-[#051C2C]/10 text-[11px] font-sans font-bold uppercase tracking-wider text-center">
                  Initially Upgraded?
                </th>
                <th className="p-3 border-b-2 border-[#051C2C]/10 text-center text-[11px] font-sans font-bold uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E6]">
              {filteredRentRoll.map((unit) => {
                const baseMarket = getBaselineMarketRent(unit.unitType);
                const l2l = Math.max(0, baseMarket - unit.currentActualRent);
                
                // Percent calculations for custom inline data bars
                const actualRentPercent = Math.min(100, (unit.currentActualRent / maxActualRent) * 100);
                const sfPercent = Math.min(100, (unit.squareFeet / maxSF) * 100);

                return (
                  <tr
                    key={unit.id}
                    className="hover:bg-[#F5F5F2]/30 transition-all duration-150"
                  >
                    {/* Unit Number input */}
                    <td className="p-3">
                      <input
                        type="text"
                        value={unit.unitNumber}
                        onChange={(e) => handleFieldChange(unit.id, 'unitNumber', e.target.value)}
                        className="w-16 px-1.5 py-1 bg-[#FFFDE7] text-[#051C2C] font-semibold border border-transparent rounded hover:border-[#E8E8E6] focus:bg-white text-xs text-center outline-none"
                      />
                    </td>

                    {/* Unit Type select */}
                    <td className="p-3">
                      <select
                        value={unit.unitType}
                        onChange={(e) => handleFieldChange(unit.id, 'unitType', e.target.value)}
                        className="px-1.5 py-1 bg-[#FFFDE7] text-[#051C2C] font-semibold border border-transparent rounded hover:border-[#E8E8E6] focus:bg-white text-xs outline-none cursor-pointer"
                      >
                        <option value="Studio">Studio</option>
                        <option value="1BR">1BR</option>
                        <option value="2BR">2BR</option>
                        <option value="3BR">3BR</option>
                      </select>
                    </td>

                    {/* SF input + Data Bar */}
                    <td className="p-3 w-40">
                      <div className="flex flex-col space-y-1">
                        <input
                          type="number"
                          value={unit.squareFeet}
                          onChange={(e) => handleFieldChange(unit.id, 'squareFeet', e.target.value)}
                          className="w-20 px-1.5 py-1 bg-[#FFFDE7] text-[#051C2C] font-mono border border-transparent rounded hover:border-[#E8E8E6] focus:bg-white text-xs text-right outline-none"
                        />
                        {/* Inline Data Bar */}
                        <div className="w-24 bg-[#051C2C]/10 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-[#2251FF] h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${sfPercent}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Actual rent input + Data Bar */}
                    <td className="p-3 w-44">
                      <div className="flex flex-col space-y-1">
                        <div className="relative inline-block">
                          <span className="absolute left-1.5 top-1.5 text-[10px] font-semibold text-[#888888] font-mono">
                            $
                          </span>
                          <input
                            type="number"
                            value={unit.currentActualRent}
                            onChange={(e) => handleFieldChange(unit.id, 'currentActualRent', e.target.value)}
                            className="w-24 pl-5 pr-1.5 py-1 bg-[#FFFDE7] text-[#051C2C] font-bold font-mono border border-transparent rounded hover:border-[#E8E8E6] focus:bg-white text-xs text-right outline-none"
                          />
                        </div>
                        {/* Inline Data Bar */}
                        <div className="w-28 bg-[#051C2C]/10 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-[#2251FF] h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${actualRentPercent}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Market Rent read-only */}
                    <td className="p-3 font-semibold font-mono text-[#888888]">
                      {formatCurrency(baseMarket)}
                    </td>

                    {/* L2L read-only */}
                    <td className={`p-3 font-bold font-mono ${l2l > 0 ? 'text-[#051C2C]' : 'text-[#888888]'}`}>
                      {formatCurrency(l2l)}
                    </td>

                    {/* Lease End Month */}
                    <td className="p-3">
                      <select
                        value={unit.leaseEndMonth}
                        onChange={(e) => handleFieldChange(unit.id, 'leaseEndMonth', e.target.value)}
                        className="px-1.5 py-1 bg-[#FFFDE7] text-[#051C2C] font-bold font-mono border border-transparent rounded hover:border-[#E8E8E6] focus:bg-white text-xs outline-none cursor-pointer"
                      >
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                          <option key={m} value={m}>
                            Month {m}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Initially Renovated */}
                    <td className="p-3 text-center">
                      <select
                        value={unit.isRenovatedInitial ? 'true' : 'false'}
                        onChange={(e) => handleFieldChange(unit.id, 'isRenovatedInitial', e.target.value)}
                        className="px-2 py-1 bg-[#FFFDE7] text-[#051C2C] border border-transparent rounded hover:border-[#E8E8E6] focus:bg-white text-xs font-semibold outline-none cursor-pointer"
                      >
                        <option value="false">NO</option>
                        <option value="true">YES</option>
                      </select>
                    </td>

                    {/* Delete button */}
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleDeleteUnit(unit.id)}
                        className="p-1.5 hover:bg-red-50 text-[#D32F2F] rounded transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>

            {/* Excel style sum summary row */}
            <tfoot className="bg-[#051C2C]/5 font-bold text-[#051C2C]">
              <tr>
                <td className="p-3 uppercase tracking-wider">TOTAL / AVG</td>
                <td className="p-3 font-sans text-[11px] text-[#888888] font-normal uppercase">
                  {totalUnits} Units
                </td>
                <td className="p-3 font-mono">
                  {totalSF.toLocaleString()} SF
                  <span className="block text-[10px] text-[#888888] font-normal">
                    Avg: {Math.round(avgSF)} SF
                  </span>
                </td>
                <td className="p-3 font-mono">
                  {formatCurrency(totalActualRent)}
                  <span className="block text-[10px] text-[#888888] font-normal">
                    Avg: {formatCurrency(avgActualRent)}
                  </span>
                </td>
                <td className="p-3 font-mono text-[#888888]">
                  {formatCurrency(totalMarketRent)}
                  <span className="block text-[10px] text-[10px] text-[#888888] font-normal">
                    Avg: {formatCurrency(avgMarketRent)}
                  </span>
                </td>
                <td className="p-3 font-mono text-[#051C2C]">
                  {formatCurrency(totalLossToLease)}
                </td>
                <td colSpan={3} className="p-3 text-right text-[10px] text-[#888888] font-sans font-normal">
                  Values propagate in real time
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

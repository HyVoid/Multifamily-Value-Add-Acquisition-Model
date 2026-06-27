import React, { useRef } from 'react';
import { RefreshCw, Download, Upload, Info } from 'lucide-react';
import { AppState } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  lastSaved: string;
  onExport: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
  onSelectPreset: (idx: number) => void;
  presets: { name: string; state: AppState }[];
  projectName: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  lastSaved,
  onExport,
  onImport,
  onReset,
  onSelectPreset,
  presets,
  projectName
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'control', label: 'Control Panel' },
    { id: 'rentroll', label: 'Rent Roll' },
    { id: 'operations', label: 'Assumptions' },
    { id: 'renovation', label: 'Renovation' },
    { id: 'debt', label: 'Debt Engine' },
    { id: 'cashflow', label: 'Cash Flow' },
    { id: 'exit', label: 'Exit & Valuation' },
    { id: 'returns', label: 'Equity Returns' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full h-[56px] bg-white border-b border-[#E8E8E6] shadow-[0_1px_3px_rgba(5,28,44,0.06)] px-6 flex items-center justify-between">
      {/* Brand Section */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center w-8 h-8 bg-[#051C2C] rounded-md text-white font-heading font-bold text-lg">
          M
        </div>
        <div>
          <span className="font-heading font-bold text-[#051C2C] text-sm md:text-base leading-none tracking-tight block">
            Multifamily SaaS
          </span>
          <span className="text-[10px] text-[#888888] font-medium tracking-wider uppercase">
            Value-Add Model
          </span>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="hidden lg:flex items-center space-x-1 h-full">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`px-3 h-full flex items-center justify-center text-[12px] font-sans font-semibold uppercase tracking-[0.06em] border-b-2 transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'border-[#2251FF] text-[#051C2C] font-bold'
                  : 'border-transparent text-[#888888] hover:text-[#051C2C] hover:border-[#E8E8E6]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Controls Section */}
      <div className="flex items-center space-x-2 md:space-x-3">
        {/* Preset Selector */}
        <div className="relative group hidden sm:block">
          <select
            onChange={(e) => onSelectPreset(Number(e.target.value))}
            className="text-[11px] font-medium px-2.5 py-1.5 bg-[#F5F5F2] border border-[#E8E8E6] rounded-md text-[#051C2C] outline-none hover:bg-white cursor-pointer transition-colors"
            defaultValue="0"
          >
            {presets.map((preset, i) => (
              <option key={i} value={i}>
                {preset.name}
              </option>
            ))}
          </select>
        </div>

        {/* Saved status */}
        <div className="hidden md:flex flex-col items-end text-right">
          <span className="text-[10px] text-[#888888] font-medium uppercase tracking-wider">
            Auto-Saved
          </span>
          <span className="text-[11px] font-mono text-[#051C2C] font-medium">
            {lastSaved || 'Saving...'}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-1">
          {/* Backup Export */}
          <button
            onClick={onExport}
            title="Export Backup JSON"
            className="p-1.5 hover:bg-[#F5F5F2] text-[#051C2C] rounded transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Backup Import */}
          <button
            onClick={() => fileInputRef.current?.click()}
            title="Import Backup JSON"
            className="p-1.5 hover:bg-[#F5F5F2] text-[#051C2C] rounded transition-colors cursor-pointer"
          >
            <Upload className="w-4 h-4" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={onImport}
            accept=".json"
            className="hidden"
          />

          {/* Reset button */}
          <button
            onClick={onReset}
            title="Reset to Baseline"
            className="p-1.5 hover:bg-red-50 text-[#D32F2F] rounded transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </nav>
  );
};

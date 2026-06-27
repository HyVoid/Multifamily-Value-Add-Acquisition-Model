import React, { useState, useEffect } from 'react';
import { AppState, MonthFlow } from './types';
import { getInitialState, PRESETS } from './initialData';
import { runFinancialCalculations } from './calculations';

// Components
import { Navbar } from './components/Navbar';
import { DashboardTab } from './components/DashboardTab';
import { ControlPanelTab } from './components/ControlPanelTab';
import { RentRollTab } from './components/RentRollTab';
import { OperationsTab } from './components/OperationsTab';
import { RenovationTab } from './components/RenovationTab';
import { DebtSizingTab } from './components/DebtSizingTab';
import { CashFlowTab } from './components/CashFlowTab';
import { ExitValuationTab } from './components/ExitValuationTab';
import { EquityReturnsTab } from './components/EquityReturnsTab';

const LOCAL_STORAGE_KEY = 'multifamily_acquisition_model_state';

export default function App() {
  const [state, setState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error reading localStorage', e);
    }
    return getInitialState();
  });

  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [lastSaved, setLastSaved] = useState<string>('');

  // Auto-save mechanism on state changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
      const now = new Date();
      setLastSaved(now.toLocaleTimeString());
    } catch (e) {
      console.error('Error writing to localStorage', e);
    }
  }, [state]);

  // Handle preset switching
  const handleSelectPreset = (idx: number) => {
    if (PRESETS[idx]) {
      // Create a deep copy to avoid reference sharing
      setState(JSON.parse(JSON.stringify(PRESETS[idx].state)));
    }
  };

  // Export state to JSON backup file
  const handleExportBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${state.controlPanel.projectName.toLowerCase().replace(/\s+/g, '_')}_backup.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import state from JSON backup file
  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed && parsed.controlPanel && parsed.rentRoll) {
            setState(parsed);
          } else {
            alert("Invalid backup file structure. Please upload a valid Multifamily Acquisition Model state file.");
          }
        } catch (err) {
          alert("Failed to parse JSON file.");
        }
      };
    }
  };

  // Reset to default baseline data
  const handleResetData = () => {
    if (window.confirm("Are you sure you want to reset all custom inputs to standard baseline data?")) {
      setState(getInitialState());
    }
  };

  // Run all formulas dynamically and instantly in real-time
  const calculatedResults = runFinancialCalculations(state);

  return (
    <div className="min-h-screen bg-[#F5F5F2] text-[#1A1A2E] font-sans selection:bg-[#2251FF]/20 flex flex-col">
      {/* SaaS Navigation Chrome */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        lastSaved={lastSaved}
        onExport={handleExportBackup}
        onImport={handleImportBackup}
        onReset={handleResetData}
        onSelectPreset={handleSelectPreset}
        presets={PRESETS}
        projectName={state.controlPanel.projectName}
      />

      {/* Main Content Stage */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-6 md:px-10 py-10">
        <div className="bg-transparent">
          {/* Tab Views with dynamic fade-up and transitions */}
          {currentTab === 'dashboard' && (
            <DashboardTab data={calculatedResults} projectName={state.controlPanel.projectName} />
          )}

          {currentTab === 'control' && (
            <ControlPanelTab
              controlPanel={state.controlPanel}
              onChange={(updated) =>
                setState((prev) => ({
                  ...prev,
                  controlPanel: { ...prev.controlPanel, ...updated },
                }))
              }
              calculatedClosingCosts={calculatedResults.closingCostsAmt}
            />
          )}

          {currentTab === 'rentroll' && (
            <RentRollTab
              rentRoll={state.rentRoll}
              operations={state.operations}
              onChange={(updated) =>
                setState((prev) => ({
                  ...prev,
                  rentRoll: updated,
                }))
              }
            />
          )}

          {currentTab === 'operations' && (
            <OperationsTab
              operations={state.operations}
              onChange={(updated) =>
                setState((prev) => ({
                  ...prev,
                  operations: { ...prev.operations, ...updated },
                }))
              }
              totalUnits={state.rentRoll.length}
            />
          )}

          {currentTab === 'renovation' && (
            <RenovationTab
              schedule={state.renovationSchedule}
              rentRoll={state.rentRoll}
              onChange={(type, updated) =>
                setState((prev) => ({
                  ...prev,
                  renovationSchedule: {
                    ...prev.renovationSchedule,
                    [type]: { ...prev.renovationSchedule[type], ...updated },
                  },
                }))
              }
            />
          )}

          {currentTab === 'debt' && (
            <DebtSizingTab
              debtSizing={state.debtSizing}
              onChange={(updated) =>
                setState((prev) => ({
                  ...prev,
                  debtSizing: { ...prev.debtSizing, ...updated },
                }))
              }
              results={{
                ltvSizedLoan: calculatedResults.ltvSizedLoan,
                ltcSizedLoan: calculatedResults.ltcSizedLoan,
                dscrSizedLoan: calculatedResults.dscrSizedLoan,
                dySizedLoan: calculatedResults.dySizedLoan,
                finalLoanAmount: calculatedResults.finalLoanAmount,
                year1Noi: calculatedResults.year1Noi,
                totalProjectCost: calculatedResults.totalProjectCost,
                purchasePrice: state.controlPanel.purchasePrice,
              }}
            />
          )}

          {currentTab === 'cashflow' && (
            <CashFlowTab
              flows={calculatedResults.monthlyFlows}
              holdPeriodYrs={state.controlPanel.holdPeriodYrs}
            />
          )}

          {currentTab === 'exit' && (
            <ExitValuationTab
              exitValuation={state.exitValuation}
              onChange={(updated) =>
                setState((prev) => ({
                  ...prev,
                  exitValuation: { ...prev.exitValuation, ...updated },
                }))
              }
              results={{
                forward12mNoi: calculatedResults.forward12mNoi,
                exitCapRate: state.controlPanel.exitCapRate,
                grossSaleValue: calculatedResults.grossSaleValue,
                sellingCostsAmt: calculatedResults.sellingCostsAmt,
                outstandingLoanBal: calculatedResults.outstandingLoanBal,
                netSaleProceeds: calculatedResults.netSaleProceeds,
                holdPeriodYrs: state.controlPanel.holdPeriodYrs,
              }}
            />
          )}

          {currentTab === 'returns' && (
            <EquityReturnsTab
              years={calculatedResults.yearsArray}
              data={{
                totalInitialEquity: calculatedResults.totalInitialEquity,
                unleveredIrr: calculatedResults.unleveredIrr,
                leveredIrr: calculatedResults.leveredIrr,
                unleveredMultiple: calculatedResults.unleveredMultiple,
                leveredMultiple: calculatedResults.leveredMultiple,
                unleveredSeries: calculatedResults.unleveredSeries,
                leveredSeries: calculatedResults.leveredSeries,
                grossSaleValue: calculatedResults.grossSaleValue,
                sellingCostsAmt: calculatedResults.sellingCostsAmt,
                outstandingLoanBal: calculatedResults.outstandingLoanBal,
                netSaleProceeds: calculatedResults.netSaleProceeds,
                totalProjectCost: calculatedResults.totalProjectCost,
              }}
            />
          )}
        </div>
      </main>

      {/* Institutional Footer */}
      <footer className="py-6 border-t border-[#E8E8E6] text-center text-[11px] text-[#888888] font-medium tracking-wide uppercase bg-white">
        &copy; {new Date().getFullYear()} Oakwood Real Estate Partners &bull; Multifamily Value-Add Underwriting System
      </footer>
    </div>
  );
}

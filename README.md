# Multifamily Value-Add Acquisition Underwriting & Equity Return Model

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-green.svg)
![Tool](https://img.shields.io/badge/Tool-Real%20Estate%20Decision%20Support-orange.svg)

**Analyze whether a multifamily value-add acquisition actually creates equity value — using a free, no-install browser tool or a fully auditable Excel underwriting model.**

> **No signup. No installation. Free.**
> **🌐 Open in Browser** → HTML live demo
> **📥 Download Excel** → Excel workbook release

---

# ## Screenshots

### Browser Version

<!-- screenshot: browser version -->

*Interactive acquisition underwriting interface showing acquisition assumptions, renovation pacing, debt constraints, and projected equity returns.*

### Excel Version

<!-- screenshot: excel version -->

*Institutional-style underwriting workbook with unit-level rent roll modeling, debt sizing engine, monthly cash flow forecasts, and investment committee outputs.*

---

# ## What It Helps You Track

* Acquisition price versus stabilized value creation potential — before capital is committed.
* Existing lease underpricing versus achievable market rent after repositioning.
* Renovation spending pace versus realized NOI growth over time.
* Debt capacity constraints under LTV, LTC, DSCR, and Debt Yield simultaneously.
* Monthly cash flow volatility during renovation and lease turnover periods.
* Exit valuation sensitivity under changing cap rates, rents, and operating assumptions.

---

# ## Why I Built This

Most multifamily acquisition models answer the wrong question.

They calculate returns after assuming the acquisition already makes sense.

In actual value-add acquisitions, the primary analytical failure occurs much earlier: investors underestimate how much value creation depends on timing, lease rollover mechanics, lender constraints, and renovation execution sequencing. A spreadsheet showing a 20% IRR can still represent a poor investment if the underlying assumptions are internally inconsistent. 

I built this model after repeatedly seeing three recurring mistakes:

* assuming all units can achieve market rent immediately,
* sizing debt using only LTV while ignoring lender NOI constraints,
* calculating exit values without considering forward NOI timing.  

For example:

| Scenario              | Traditional Model             | This Model                         |
| --------------------- | ----------------------------- | ---------------------------------- |
| Purchase Price        | $18.0M                        | $18.0M                             |
| Projected Levered IRR | 18.7%                         | 12.4%                              |
| Assumption            | Immediate rent mark-to-market | Lease expiration timing modeled    |
| Debt Sizing           | 70% LTV                       | Minimum of LTV/LTC/DSCR/Debt Yield |
| Renovation            | Instant                       | Phased over 24 months              |

The investment thesis changed completely.

This workbook is therefore not simply an underwriting template. It is a productized reasoning framework designed to force explicit modeling of the assumptions that usually remain hidden during acquisition decisions.

---

# ## Common Multifamily Acquisition Problems This Solves

| Problem                       | Without This Tool                                | With This Tool                                                   |
| ----------------------------- | ------------------------------------------------ | ---------------------------------------------------------------- |
| Overestimating rent growth    | Assumes all units reach market rents immediately | Models lease expiration and rent release timing                  |
| Incorrect debt sizing         | Uses only LTV constraints                        | Applies institutional four-constraint underwriting               |
| Ignoring renovation friction  | Assumes instant stabilization                    | Models monthly renovation throughput limits                      |
| Mispricing exit values        | Uses trailing NOI                                | Uses forward 12-month NOI methodology                            |
| Underestimating capital needs | Renovation costs tracked separately              | Integrates acquisition, capex, and financing                     |
| Misreading equity returns     | Focuses only on IRR                              | Calculates IRR, MoIC, CoC, and capital efficiency simultaneously |

---

# ## Who This Is For

This tool is designed for:

* Multifamily acquisition analysts.
* Small and mid-sized real estate investment firms.
* Independent sponsors and syndicators.
* Value-add apartment investors.
* Real estate private equity underwriting teams.
* Financial modelers building acquisition cases.

This tool is not designed for:

* Property management operations.
* Enterprise ERP replacement.
* Construction project management software.
* Portfolio accounting systems.

No spreadsheet expertise is required. Open the browser version and begin underwriting immediately, or use the Excel version for full auditability and customization.

---

# ## About

I build lightweight decision-support tools for situations where there are too many moving parts to reliably hold inside one person's head.

The central question behind every model is simple:

> **What information needs to exist in one place to make the next decision confidently?**

This multifamily acquisition model is one example of that approach: converting institutional underwriting logic into a reusable analytical framework that can be executed using either a browser or Excel.

---

# ## Technical Details

<details>
<summary>For technical reviewers, Excel practitioners, and collaborators</summary>

---

### Workbook Architecture

The model follows a strict three-layer architecture. 

```text
INPUT LAYER
│
├── Sheet 1  Control Panel
├── Sheet 2  Rent Roll Input
└── Sheet 3  Operations Assumptions
            │
            ▼
CALCULATION LAYER
│
├── Sheet 4  Renovation Schedule
├── Sheet 5  Debt Sizing Engine
├── Sheet 6  Monthly Cash Flow
└── Sheet 7  Exit Valuation
            │
            ▼
OUTPUT LAYER
│
├── Sheet 8  Equity Returns
└── Sheet 9  Dashboard
```

| Layer       | Function                                       |
| ----------- | ---------------------------------------------- |
| Input       | Acquisition assumptions and operational inputs |
| Calculation | Cash flow engine and lender underwriting       |
| Validation  | Constraint checking and scenario testing       |
| Output      | Investment committee decision support          |

---

### Three Traps That Catch Even Experienced Multifamily Investors

#### Trap 1: Assuming Market Rent Equals Achievable Rent

A decision was made to acquire an asset based on a 22% projected IRR.

The model assumed all units would achieve market rent immediately.

| Incorrect Assumption         | Actual Situation                      |
| ---------------------------- | ------------------------------------- |
| 120 units instantly repriced | 82 units locked under existing leases |
| NOI growth immediate         | NOI growth delayed by 18 months       |

Result:

```text
Projected IRR: 22.1%
Actual IRR:    13.4%
```

The reasoning fails because lease expiration timing determines the speed of value realization, not market rent surveys.

Correct approach:

* Model lease expiration month.
* Model loss-to-lease release schedule.
* Model renovation turnover timing.

<details>
<summary>Formula logic</summary>

```excel
Loss_to_Lease =
Current_Market_Rent
-
Current_Actual_Rent

Released Monthly
according to Lease_End_Month
```

</details>

---

#### Trap 2: Sizing Debt Using Only LTV

A lender term sheet indicated 75% leverage.

The acquisition model used:

```text
Loan Amount =
Purchase Price × LTV
```

However:

| Constraint | Maximum Loan |
| ---------- | ------------ |
| LTV        | $15.0M       |
| LTC        | $14.4M       |
| DSCR       | $12.8M       |
| Debt Yield | $11.9M       |

Actual financing capacity:

```text
Final Loan = $11.9M
```

The reasoning fails because institutional lenders use the minimum of multiple underwriting constraints simultaneously. 

<details>
<summary>Formula logic</summary>

```excel
=MIN(
LTV_Sized_Loan,
LTC_Sized_Loan,
DSCR_Sized_Loan,
DY_Sized_Loan
)
```

</details>

---

#### Trap 3: Using Trailing NOI for Exit Valuation

An investor valued exit proceeds using Year 5 NOI.

However, buyers price based on forward stabilized income.

| Method       | Exit Value |
| ------------ | ---------- |
| Trailing NOI | $31.2M     |
| Forward NOI  | $28.1M     |

This overestimated equity returns by nearly 15%.

Correct approach:

```text
Exit Value
=
Forward 12 Month NOI
/
Exit Cap Rate
```

<details>
<summary>Formula logic</summary>

```excel
Gross_Sale_Value =
Forward_12M_NOI
/
Exit_Cap_Rate
```

</details>

---

### Example Scenario

Assume:

| Variable          | Value       |
| ----------------- | ----------- |
| Units             | 96          |
| Purchase Price    | $18,000,000 |
| Renovation Budget | $1,920,000  |
| Average Rent Lift | $225/month  |
| Exit Cap Rate     | 5.75%       |
| Hold Period       | 5 years     |

Intermediate calculations:

```text
Acquisition Cost      $18.0M
Total Project Cost    $20.3M
Maximum Debt          $12.2M
Initial Equity        $8.1M

Year 1 NOI            $1.18M
Year 5 NOI            $1.94M

Forward NOI           $2.05M
Exit Value            $35.6M
```

Investment outputs:

| Metric          | Result |
| --------------- | ------ |
| Levered IRR     | 15.8%  |
| Equity Multiple | 2.12x  |
| Average CoC     | 9.7%   |
| Yield on Cost   | 9.5%   |

Decision implication:

The acquisition is attractive only if renovation execution remains below 30 months and exit cap rates remain below 6.0%.

---

### Formula Reference

<details>
<summary>Debt Sizing</summary>

```excel
Final_Loan =
MIN(
LTV,
LTC,
DSCR,
DebtYield
)
```

</details>

<details>
<summary>Monthly NOI</summary>

```excel
NOI =
EGI
-
Operating Expenses
```

</details>

<details>
<summary>Exit Value</summary>

```excel
Exit_Value =
Forward_NOI
/
Exit_Cap_Rate
```

</details>

<details>
<summary>Equity Returns</summary>

```excel
Levered_IRR =
XIRR(
Levered_Cashflows,
Dates
)
```

</details>

---

### Validation Rules

| Field                     | Rule        | Error Behavior     |
| ------------------------- | ----------- | ------------------ |
| Purchase Price            | >0          | Hard stop          |
| Hold Period               | 1–10 years  | Validation error   |
| Exit Cap Rate             | > Entry Cap | Warning            |
| LTV                       | ≤75%        | Warning            |
| DSCR                      | ≥1.20x      | Constraint failure |
| Debt Yield                | ≥8%         | Constraint failure |
| Equity                    | >0          | Hard stop          |
| Monthly DSCR              | ≥1.05x      | Covenant alert     |
| Annual NPV reconciliation | Exact match | Audit failure      |

</details>

---

# ## Other Tools in This Series

* **Inventory Planning & Replenishment Engine** — reorder timing, working capital, and stockout risk analysis.
* **Logistics Operations Control Tower** — cross-entity shipment and customs workflow visibility.
* **Business Budget Variance Analyzer** — operational budget tracking and decision support.
* **Service Operations Performance Console** — field workforce productivity and profitability analysis.

More tools available via GitHub profile and release library.

---

# ## License

This project is licensed under the **Apache License 2.0**.

You are free to use, modify, distribute, and adapt this model under the terms of the Apache License 2.0. 

# Multifamily Value-Add Acquisition Underwriting & Equity Return Model

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-green.svg)
![Tool](https://img.shields.io/badge/Tool-Decision%20Support-orange.svg)

**Evaluate whether a multifamily value-add acquisition actually creates equity value — using a free, no-install browser tool or a fully auditable Excel underwriting model.**

> **No signup. No installation. Free.**
>
> 🌐 **Open in Browser** → HTML live demo
>
> 📥 **Download Excel** → Excel workbook release
>
> Available in both **browser** and **Excel** formats for immediate analysis and full model transparency.

---

## Screenshots

### Browser Version

<!-- screenshot: browser version -->

*Interactive acquisition underwriting interface showing acquisition assumptions, renovation execution pacing, debt constraints, and projected investor returns.*

### Excel Version

<!-- screenshot: excel version -->

*Institutional-style underwriting workbook with unit-level rent rolls, lender underwriting logic, monthly cash flow forecasting, and investment committee outputs.*

---

## What It Helps You Track

* Acquisition price versus achievable stabilized value creation.
* Existing lease underpricing versus realizable market rent upside.
* Renovation spending pace versus actual NOI growth realization.
* Debt capacity constraints across lender underwriting standards.
* Monthly operating cash flow volatility during repositioning periods.
* Exit valuation sensitivity under changing market assumptions.

---

## Why I Built This

Most multifamily acquisition models produce answers before validating whether the underlying assumptions are operationally achievable.

In practice, value-add acquisitions fail less often because of incorrect formulas and more often because of incorrect reasoning.

The most common analytical failures include:

* assuming all units can immediately achieve market rent,
* sizing debt based solely on LTV while ignoring lender cash flow constraints,
* treating renovation execution as instantaneous,
* valuing exits using trailing rather than forward NOI,
* assuming operational improvements occur without timing friction.  

I built this model after repeatedly observing situations where investment committees approved acquisitions based on internally inconsistent assumptions that were difficult to detect inside conventional underwriting spreadsheets.

Consider a simplified example:

|                        | Traditional Model |                   This Model |
| ---------------------- | ----------------: | ---------------------------: |
| Purchase Price         |            $18.0M |                       $18.0M |
| Projected Levered IRR  |             19.2% |                        12.8% |
| Rent Growth Assumption |         Immediate |                 Lease-driven |
| Debt Sizing            |           75% LTV | Four-constraint underwriting |
| Renovation Period      |           Instant |             24-month rollout |
| Exit Valuation         |      Trailing NOI |                  Forward NOI |

The investment itself did not change.

Only the quality of the analytical framework changed.

This workbook therefore functions as a productized reasoning system rather than a traditional financial model. Its purpose is not merely to calculate returns, but to expose the assumptions that determine whether those returns are achievable.

---

## Common Multifamily Acquisition Problems This Solves

| Problem                             | Without This Tool                         | With This Tool                                          |
| ----------------------------------- | ----------------------------------------- | ------------------------------------------------------- |
| Lease rollover timing ignored       | Rent growth appears immediate             | Rent release follows actual lease expirations           |
| Debt sized using LTV only           | Equity requirements understated           | Institutional lender constraints modeled simultaneously |
| Renovation execution oversimplified | Stabilization occurs unrealistically fast | Monthly renovation throughput constraints enforced      |
| Exit valuation miscalculated        | Exit proceeds overstated                  | Forward NOI capitalization methodology applied          |
| Capital requirements underestimated | Mid-project equity gaps emerge            | Full acquisition, capex, and financing costs integrated |
| Returns evaluated using IRR alone   | Risk-adjusted performance obscured        | IRR, MoIC, CoC, and Yield-on-Cost evaluated together    |

---

## Who This Is For

This tool is designed for:

* Multifamily acquisition analysts.
* Independent sponsors.
* Real estate private equity teams.
* Apartment syndicators.
* Small and mid-sized investment firms.
* Financial modelers underwriting value-add transactions.

This tool is not designed for:

* Property management operations.
* Enterprise accounting systems.
* Construction management platforms.
* Portfolio administration software.
* ERP replacement projects.

No spreadsheet expertise is required. Open the browser version and begin underwriting immediately, or use the Excel version for full auditability, customization, and institutional review workflows.

---

## About

I build lightweight analytical tools for situations where there are too many moving parts to reliably manage through intuition alone.

The question underlying every tool is straightforward:

> **What information needs to exist in one place to make the next decision confidently?**

This multifamily acquisition model represents one example of that approach: transforming institutional underwriting practices into a reusable decision-support framework that remains transparent, auditable, and operationally practical.

---

## Technical Details

<details>
<summary>For technical reviewers, Excel practitioners, and collaborators</summary>

---

### Workbook Architecture

The workbook follows a strict three-layer modeling architecture separating assumptions, calculations, and decision outputs. 

```text
INPUT LAYER
│
├── Sheet 1   Control Panel
├── Sheet 2   Rent Roll Input
└── Sheet 3   Operations Assumptions
              │
              ▼
CALCULATION LAYER
│
├── Sheet 4   Renovation Schedule
├── Sheet 5   Debt Sizing Engine
├── Sheet 6   Monthly Cash Flow Engine
└── Sheet 7   Exit Valuation
              │
              ▼
OUTPUT LAYER
│
├── Sheet 8   Equity Returns
└── Sheet 9   Dashboard
```

| Sheet          | Function                                      |
| -------------- | --------------------------------------------- |
| Control Panel  | Acquisition assumptions and market parameters |
| Rent Roll      | Unit-level lease and rent baseline            |
| Operations     | Vacancy, expenses, and operating assumptions  |
| Renovation     | Value-add execution schedule                  |
| Debt Engine    | Institutional underwriting constraints        |
| Cash Flow      | Monthly operating and financing forecasts     |
| Exit           | Disposition valuation analysis                |
| Equity Returns | Investor return calculations                  |
| Dashboard      | Decision support visualization                |

---

### Three Traps That Catch Even Experienced Multifamily Investors

#### Trap 1: Market Rent Is Not Achievable Rent

A value-add acquisition was approved because market surveys suggested a 28% rent upside.

However, the existing lease structure delayed realization of that upside by nearly two years.

| Assumption               | Original Model | Corrected Model |
| ------------------------ | -------------: | --------------: |
| Units                    |            120 |             120 |
| Immediate Mark-to-Market |            Yes |              No |
| Average Lease Remaining  |        Ignored |       14 months |
| Levered IRR              |          20.8% |           13.9% |

The analytical error occurs because market rent and realizable rent are not equivalent variables.

The correct approach is to model:

* lease expiration schedules,
* loss-to-lease release timing,
* renovation downtime,
* post-renovation stabilization.

<details>
<summary>Formula logic</summary>

```excel
Loss_to_Lease =
Current_Market_Rent
-
Current_Actual_Rent

Released according to:
Lease_End_Month
```

</details>

---

#### Trap 2: LTV Does Not Determine Borrowing Capacity

A sponsor assumed financing availability at 75% LTV.

The lender ultimately approved financing based on Debt Yield constraints.

| Constraint | Maximum Loan |
| ---------- | -----------: |
| LTV        |       $15.0M |
| LTC        |       $14.2M |
| DSCR       |       $12.7M |
| Debt Yield |       $11.8M |

Final loan amount:

```text
$11.8M
```

The analytical failure occurs because lenders evaluate multiple risk constraints simultaneously.

The correct approach is to apply the minimum supported loan amount across all underwriting metrics. 

<details>
<summary>Formula logic</summary>

```excel
Final_Loan_Amount =
MIN(
LTV_Sized_Loan,
LTC_Sized_Loan,
DSCR_Sized_Loan,
Debt_Yield_Sized_Loan
)
```

</details>

---

#### Trap 3: Exit Values Depend On Future Income

An underwriting model calculated exit proceeds using Year-5 trailing NOI.

Institutional buyers priced the asset using forward stabilized income.

| Method       | Exit Value |
| ------------ | ---------: |
| Trailing NOI |     $33.1M |
| Forward NOI  |     $28.4M |

This difference reduced projected equity returns by over 400 basis points.

The analytical failure occurs because asset pricing reflects expected future income rather than historical income.

The corrected methodology capitalizes forward twelve-month NOI projections. 

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

Consider a 96-unit value-add acquisition.

#### Acquisition

| Input             |       Value |
| ----------------- | ----------: |
| Purchase Price    | $18,000,000 |
| Closing Costs     |        2.0% |
| Renovation Budget |  $1,920,000 |
| Hold Period       |     5 years |
| Exit Cap Rate     |       5.75% |

#### Operations

| Input                |  Value |
| -------------------- | -----: |
| Current Average Rent | $1,250 |
| Market Rent          | $1,520 |
| Renovation Premium   |   $225 |
| Vacancy              |   5.0% |
| Bad Debt             |   1.5% |

#### Financing

| Constraint | Result |
| ---------- | -----: |
| LTV        | $13.5M |
| LTC        | $14.1M |
| DSCR       | $12.3M |
| Debt Yield | $11.9M |

Final debt amount:

```text
$11.9M
```

#### Investment Results

| Metric               | Result |
| -------------------- | -----: |
| Year-1 NOI           | $1.18M |
| Stabilized NOI       | $2.04M |
| Exit Value           | $35.5M |
| Levered IRR          |  15.6% |
| Equity Multiple      |  2.09x |
| Average Cash-on-Cash |   9.4% |
| Yield-on-Cost        |   9.3% |

#### Decision Interpretation

The acquisition remains attractive only if:

* renovation duration remains below 30 months,
* exit cap rates remain below 6.00%,
* rent premiums exceed $175/unit/month,
* lender debt yield requirements remain below 9.0%.

---

### Formula Reference

<details>
<summary>Debt Sizing Engine</summary>

```excel
LTV_Loan =
Purchase_Price * Max_LTV

LTC_Loan =
Project_Cost * Max_LTC

DSCR_Loan =
PV(
Interest_Rate/12,
Amortization_Months,
NOI/DSCR/12
)

Debt_Yield_Loan =
NOI / Debt_Yield

Final_Loan =
MIN(
LTV,
LTC,
DSCR,
Debt_Yield
)
```

</details>

<details>
<summary>Renovation Engine</summary>

```excel
Cumulative_Renovated_Units =
MIN(
Total_Units,
(Timeline-Start_Month)
*
Monthly_Capacity
)
```

</details>

<details>
<summary>Cash Flow Engine</summary>

```excel
EGI =
Rental_Income
-
Vacancy
-
Bad_Debt
+
Other_Income

NOI =
EGI
-
Operating_Expenses
```

</details>

<details>
<summary>Exit Valuation</summary>

```excel
Exit_Value =
Forward_12M_NOI
/
Exit_Cap_Rate

Net_Sale_Proceeds =
Exit_Value
-
Selling_Costs
-
Loan_Balance
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

MoIC =
Positive_Cashflows
/
Initial_Equity
```

</details>

---

### Validation Rules

| Field              | Rule          | Error Behavior     |
| ------------------ | ------------- | ------------------ |
| Purchase Price     | > 0           | Hard stop          |
| Hold Period        | 1–10 years    | Validation error   |
| Exit Cap Rate      | ≥ Entry Cap   | Warning            |
| Maximum LTV        | ≤ 75%         | Warning            |
| Minimum DSCR       | ≥ 1.20x       | Constraint failure |
| Debt Yield         | ≥ 8.00%       | Constraint failure |
| Equity Requirement | > 0           | Hard stop          |
| Monthly DSCR       | ≥ 1.05x       | Covenant warning   |
| Renovation Units   | ≤ Total Units | Validation error   |
| NPV Reconciliation | Exact match   | Audit failure      |

</details>

---

## Other Tools in This Series

* **Inventory Planning & Replenishment Engine** — inventory positioning, stockout risk, and working capital optimization.
* **Logistics Operations Control Tower** — cross-entity shipment visibility and customs workflow management.
* **Business Budget Variance Analyzer** — operational budgeting and profitability analysis.
* **Service Operations Performance Console** — workforce productivity and service profitability management.

---

## License

This project is licensed under the **Apache License 2.0**.

You are free to use, modify, distribute, and adapt this project under the terms of the Apache License 2.0. 

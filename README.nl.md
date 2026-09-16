[ 🌐 عربي ](README.ar.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# Multifamily Value-Add Acquisition Underwriting & Equity Return Model

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-green.svg)
![Tool](https://img.shields.io/badge/Tool-Decision%20Support-orange.svg)

**Beoordeel of een value-add overname van een multifamily-object daadwerkelijk aandeelhouderswaarde creëert — met een gratis browsertool zonder installatie of een volledig controleerbaar Excel-underwritingmodel.**

**Geen aanmelding. Geen installatie. Gratis in uw browser.**

Probeer de browserversie gratis. Hebt u de Excel-versie nodig, dan kunt u die kopen met een garantie van 30 dagen, zonder vragen geld terug.
>
> 🌐 **Openen in browser** → [HTML live demo](https://hyvoid.github.io/Multifamily-Value-Add-Acquisition-Model/)
>
> 📥 **Excel downloaden**
>
> [excel template purchase](https://www.theseusworkshop.com/l/hmkjuu?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=multifamily-value-add)
> 
> Beschikbaar in zowel **browser-** als **Excel**-formaat voor directe analyse en volledige transparantie van het model.

---

## Wat het u helpt bij te houden

* Aankoopprijs versus haalbare waardecreatie na stabilisatie.
* Onderprijsstelling van bestaande huurovereenkomsten versus realiseerbaar opwaarts potentieel in markthuur.
* Tempo van renovatie-uitgaven versus daadwerkelijke realisatie van NOI-groei.
* Beperkingen van de schuldcapaciteit volgens de underwritingnormen van kredietverstrekkers.
* Volatiliteit van de maandelijkse operationele cashflow tijdens herpositioneringsperiodes.
* Sensitiviteit van de exitwaardering onder veranderende marktaannames.

---

## Waarom ik dit heb gebouwd

De meeste modellen voor multifamily-overnames produceren antwoorden voordat ze valideren of de onderliggende aannames operationeel haalbaar zijn.

In de praktijk mislukken value-add overnames minder vaak door onjuiste formules en vaker door onjuiste redeneringen.

De meest voorkomende analytische fouten zijn:

* aannemen dat alle units onmiddellijk markthuur kunnen realiseren,
* schuld bepalen op basis van alleen LTV en daarbij de cashflowbeperkingen van de kredietverstrekker negeren,
* de uitvoering van renovaties als onmiddellijk behandelen,
* exits waarderen op basis van trailing in plaats van forward NOI,
* aannemen dat operationele verbeteringen zonder timingfrictie plaatsvinden.  

Ik heb dit model gebouwd na herhaaldelijk situaties te hebben gezien waarin investeringscommissies overnames goedkeurden op basis van intern inconsistente aannames die moeilijk te detecteren waren in conventionele underwriting-spreadsheets.

Beschouw een vereenvoudigd voorbeeld:

|                        | Traditional Model |                   This Model |
| ---------------------- | ----------------: | ---------------------------: |
| Purchase Price         |            $18.0M |                       $18.0M |
| Projected Levered IRR  |             19.2% |                        12.8% |
| Rent Growth Assumption |         Immediate |                 Lease-driven |
| Debt Sizing            |           75% LTV | Four-constraint underwriting |
| Renovation Period      |           Instant |             24-month rollout |
| Exit Valuation         |      Trailing NOI |                  Forward NOI |

De investering zelf is niet veranderd.

Alleen de kwaliteit van het analytische kader is veranderd.

Deze werkmap functioneert daarom als een geproductiseerd redeneersysteem in plaats van een traditioneel financieel model. Het doel is niet alleen om rendementen te berekenen, maar om de aannames bloot te leggen die bepalen of die rendementen haalbaar zijn.

---

## Veelvoorkomende problemen bij multifamily-overnames die dit oplost

| Problem                             | Without This Tool                         | With This Tool                                          |
| ----------------------------------- | ----------------------------------------- | ------------------------------------------------------- |
| Lease rollover timing ignored       | Rent growth appears immediate             | Rent release follows actual lease expirations           |
| Debt sized using LTV only           | Equity requirements understated           | Institutional lender constraints modeled simultaneously |
| Renovation execution oversimplified | Stabilization occurs unrealistically fast | Monthly renovation throughput constraints enforced      |
| Exit valuation miscalculated        | Exit proceeds overstated                  | Forward NOI capitalization methodology applied          |
| Capital requirements underestimated | Mid-project equity gaps emerge            | Full acquisition, capex, and financing costs integrated |
| Returns evaluated using IRR alone   | Risk-adjusted performance obscured        | IRR, MoIC, CoC, and Yield-on-Cost evaluated together    |

---

## Voor wie dit bedoeld is

Deze tool is ontworpen voor:

* Analisten multifamily-overnames.
* Onafhankelijke sponsors.
* Teams in private equity voor vastgoed.
* Syndicators van appartementsgebouwen.
* Kleine en middelgrote investeringsmaatschappijen.
* Financiële modelleurs die value-add transacties underwriten.

Deze tool is niet ontworpen voor:

* Operationeel beheer van onroerend goed.
* Enterprise boekhoudsystemen.
* Platforms voor bouwmanagement.
* Software voor portefeuillebeheer.
* ERP-vervangingsprojecten.

Er is geen spreadsheetexpertise nodig. Open de browserversie en begin meteen met underwriten, of gebruik de Excel-versie voor volledige controleerbaarheid, maatwerk en institutionele reviewworkflows.

---

## Over

Ik bouw lichtgewicht analytische tools voor situaties waarin te veel bewegende delen zijn om betrouwbaar op intuïtie te kunnen vertrouwen.

De vraag die aan elke tool ten grondslag ligt, is eenvoudig:

> **Welke informatie moet op één plek bestaan om de volgende beslissing met vertrouwen te kunnen nemen?**

Dit multifamily-overnamemodel is één voorbeeld van die aanpak: het omzetten van institutionele underwritingpraktijken in een herbruikbaar kader voor beslissingsondersteuning dat transparant, controleerbaar en operationeel praktisch blijft.

---

## Technische details

<details>
<summary>Voor technische reviewers, Excel-professionals en samenwerkingspartners</summary>

---

### Werkmaparchitectuur

De werkmap volgt een strikte architectuur met drie modelleerlagen die aannames, berekeningen en beslissingsoutputs scheiden. 

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

### Drie valkuilen die zelfs ervaren multifamily-investeerders treffen

#### Valkuil 1: markthuur is geen haalbare huur

Een value-add overname werd goedgekeurd omdat marktonderzoeken een huurpotentieel van 28% suggereerden.

De bestaande huurovereenkomstenstructuur vertraagde de realisatie van dat potentieel echter met bijna twee jaar.

| Assumption               | Original Model | Corrected Model |
| ------------------------ | -------------: | --------------: |
| Units                    |            120 |             120 |
| Immediate Mark-to-Market |            Yes |              No |
| Average Lease Remaining  |        Ignored |       14 months |
| Levered IRR              |          20.8% |           13.9% |

De analytische fout ontstaat doordat markthuur en realiseerbare huur geen gelijkwaardige variabelen zijn.

De juiste aanpak is om te modelleren:

* schema's voor het aflopen van huurovereenkomsten,
* timing van het vrijgeven van loss-to-lease,
* stilstand tijdens renovatie,
* stabilisatie na renovatie.

<details>
<summary>Formulelogica</summary>

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

#### Valkuil 2: LTV bepaalt niet de leencapaciteit

Een sponsor ging uit van financieringsmogelijkheid tegen 75% LTV.

De kredietverstrekker keurde de financiering uiteindelijk goed op basis van Debt Yield-beperkingen.

| Constraint | Maximum Loan |
| ---------- | -----------: |
| LTV        |       $15.0M |
| LTC        |       $14.2M |
| DSCR       |       $12.7M |
| Debt Yield |       $11.8M |

Uiteindelijk geleend bedrag:

```text
$11.8M
```

De analytische fout ontstaat doordat kredietverstrekkers meerdere risicobeperkingen tegelijkertijd beoordelen.

De juiste aanpak is om het minimaal ondersteunde leenbedrag over alle underwritingmaatstaven toe te passen. 

<details>
<summary>Formulelogica</summary>

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

#### Valkuil 3: exitwaarden zijn afhankelijk van toekomstige inkomsten

Een underwritingmodel berekende de exitopbrengst op basis van trailing NOI van jaar 5.

Institutionele kopers prijsden het actief op basis van forward gestabiliseerde inkomsten.

| Method       | Exit Value |
| ------------ | ---------: |
| Trailing NOI |     $33.1M |
| Forward NOI  |     $28.4M |

Dit verschil verlaagde de geprojecteerde rendementen op eigen vermogen met meer dan 400 basispunten.

De analytische fout ontstaat doordat de prijsstelling van een actief de verwachte toekomstige inkomsten weerspiegelt en niet de historische inkomsten.

De gecorrigeerde methodologie kapitaliseert de forward NOI-prognoses voor de komende twaalf maanden. 

<details>
<summary>Formulelogica</summary>

```excel
Gross_Sale_Value =
Forward_12M_NOI
/
Exit_Cap_Rate
```

</details>

---

### Voorbeeldscenario

Beschouw een value-add overname van 96 units.

#### Overname

| Input             |       Value |
| ----------------- | ----------: |
| Purchase Price    | $18,000,000 |
| Closing Costs     |        2.0% |
| Renovation Budget |  $1,920,000 |
| Hold Period       |     5 years |
| Exit Cap Rate     |       5.75% |

#### Operatie

| Input                |  Value |
| -------------------- | -----: |
| Current Average Rent | $1,250 |
| Market Rent          | $1,520 |
| Renovation Premium   |   $225 |
| Vacancy              |   5.0% |
| Bad Debt             |   1.5% |

#### Financiering

| Constraint | Result |
| ---------- | -----: |
| LTV        | $13.5M |
| LTC        | $14.1M |
| DSCR       | $12.3M |
| Debt Yield | $11.9M |

Uiteindelijk schuldbedrag:

```text
$11.9M
```

#### Investeringsresultaten

| Metric               | Result |
| -------------------- | -----: |
| Year-1 NOI           | $1.18M |
| Stabilized NOI       | $2.04M |
| Exit Value           | $35.5M |
| Levered IRR          |  15.6% |
| Equity Multiple      |  2.09x |
| Average Cash-on-Cash |   9.4% |
| Yield-on-Cost        |   9.3% |

#### Interpretatie van de beslissing

De overname blijft alleen aantrekkelijk als:

* de renovatieduur onder 30 maanden blijft,
* de exit cap rates onder 6,00% blijven,
* de huurpremies meer dan $175/unit/maand bedragen,
* de Debt Yield-vereisten van de kredietverstrekker onder 9,0% blijven.

---

### Formulereferentie

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

### Validatieregels

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

## Andere tools in deze serie

* **Inventory Planning & Replenishment Engine** — voorraadpositionering, risico op voorraadtekorten en optimalisatie van werkkapitaal.
* **Logistics Operations Control Tower** — zichtbaarheid op zendingen over meerdere entiteiten en beheer van douaneprocessen.
* **Business Budget Variance Analyzer** — operationele budgettering en analyse van winstgevendheid.
* **Service Operations Performance Console** — productiviteit van medewerkers en beheer van servicewinstgevendheid.

---

## Licentie

Dit project is gelicentieerd onder de **Apache License 2.0**.

U bent vrij om dit project te gebruiken, te wijzigen, te distribueren en aan te passen onder de voorwaarden van de Apache License 2.0. 

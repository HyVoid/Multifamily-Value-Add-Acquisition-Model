[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# Modèle d'underwriting d'acquisition multifamiliale value-add & de rendement des capitaux propres

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-green.svg)
![Tool](https://img.shields.io/badge/Tool-Decision%20Support-orange.svg)

**Évaluez si une acquisition multifamiliale value-add crée réellement de la valeur en capital — à l'aide d'un outil navigateur gratuit, sans installation, ou d'un modèle d'underwriting Excel entièrement auditable.**

**Aucune inscription. Aucune installation. Gratuit dans votre navigateur.**

Essayez gratuitement la version navigateur. Si vous avez besoin de la version Excel, vous pouvez l'acheter avec une garantie de remboursement de 30 jours, sans poser de questions.
>
> 🌐 **Ouvrir dans le navigateur** → [démo HTML en direct](https://hyvoid.github.io/Multifamily-Value-Add-Acquisition-Model/)
>
> 📥 **Télécharger Excel**
>
> [achat du modèle Excel](https://www.theseusworkshop.com/l/hmkjuu?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=multifamily-value-add)
> 
> Disponible aux formats **navigateur** et **Excel** pour une analyse immédiate et une transparence totale du modèle.

---

## Ce que cet outil vous aide à suivre

* Prix d'acquisition versus création de valeur stabilisée réalisable.
* Sous-location existante versus potentiel de loyer de marché réalisable.
* Rythme des dépenses de rénovation versus réalisation effective de la croissance du NOI.
* Contraintes de capacité d'endettement face aux normes d'underwriting des prêteurs.
* Volatilité mensuelle des flux de trésorerie d'exploitation pendant les périodes de repositionnement.
* Sensibilité de la valorisation de sortie selon l'évolution des hypothèses de marché.

---

## Pourquoi j'ai conçu cet outil

La plupart des modèles d'acquisition multifamiliale produisent des réponses avant de valider si les hypothèses sous-jacentes sont opérationnellement réalisables.

En pratique, les acquisitions value-add échouent moins souvent à cause de formules incorrectes que de raisonnements incorrects.

Les échecs analytiques les plus courants incluent :

* supposer que tous les logements peuvent immédiatement atteindre le loyer de marché,
* dimensionner la dette uniquement sur le LTV en ignorant les contraintes de flux de trésorerie des prêteurs,
* traiter l'exécution des rénovations comme instantanée,
* valoriser les sorties avec le NOI traînant plutôt que le NOI prospectif,
* supposer que les améliorations opérationnelles se produisent sans frottement temporel.  

J'ai conçu ce modèle après avoir observé à plusieurs reprises des situations où des comités d'investissement approuvaient des acquisitions sur la base d'hypothèses incohérentes en interne, difficiles à détecter dans des tableurs d'underwriting conventionnels.

Considérez un exemple simplifié :

|                        | Modèle traditionnel |                   Ce modèle |
| ---------------------- | ----------------: | ---------------------------: |
| Prix d'achat         |            $18.0M |                       $18.0M |
| TIR à effet de levier projeté  |             19.2% |                        12.8% |
| Hypothèse de croissance des loyers |         Immédiat |                 Piloté par les baux |
| Dimensionnement de la dette            |           75% LTV | Underwriting à quatre contraintes |
| Durée des rénovations      |           Instantané |             Déploiement sur 24 mois |
| Valorisation de sortie         |      NOI traînant |                  NOI prospectif |

L'investissement lui-même n'a pas changé.

Seule la qualité du cadre analytique a changé.

Ce classeur fonctionne donc comme un système d'analyse produit plutôt que comme un modèle financier traditionnel. Son objectif n'est pas seulement de calculer des rendements, mais d'exposer les hypothèses qui déterminent si ces rendements sont réalisables.

---

## Problèmes courants d'acquisition multifamiliale que cet outil résout

| Problème                             | Sans cet outil                         | Avec cet outil                                          |
| ----------------------------------- | ----------------------------------------- | ------------------------------------------------------- |
| Calendrier de roulement des baux ignoré       | La croissance des loyers semble immédiate             | La libération des loyers suit les expirations réelles des baux           |
| Dette dimensionnée sur le LTV seul           | Besoins en capitaux propres sous-estimés           | Contraintes des prêteurs institutionnels modélisées simultanément |
| Exécution des rénovations trop simplifiée | La stabilisation survient à une vitesse irréaliste | Contraintes de débit mensuel de rénovation appliquées      |
| Valorisation de sortie mal calculée        | Produits de sortie surestimés                  | Méthodologie de capitalisation du NOI prospectif appliquée          |
| Besoins en capital sous-estimés | Des lacunes en capitaux propres apparaissent en cours de projet | Coûts complets d'acquisition, de capex et de financement intégrés |
| Rendements évalués avec le seul TIR   | La performance ajustée au risque est masquée          | TIR, MoIC, CoC et Yield-on-Cost évalués ensemble    |

---

## À qui cela s'adresse

Cet outil est conçu pour :

* Les analystes en acquisition multifamiliale.
* Les sponsors indépendants.
* Les équipes de capital-investissement immobilier.
* Les syndicats d'appartements.
* Les petites et moyennes firmes d'investissement.
* Les modélisateurs financiers qui underwritent des transactions value-add.

Cet outil n'est pas conçu pour :

* Les opérations de gestion immobilière.
* Les systèmes comptables d'entreprise.
* Les plateformes de gestion de chantier.
* Les logiciels d'administration de portefeuille.
* Les projets de remplacement d'ERP.

Aucune expertise en tableur n'est requise. Ouvrez la version navigateur et commencez immédiatement à underwriter, ou utilisez la version Excel pour une auditabilité complète, la personnalisation et les workflows de revue institutionnelle.

---

## À propos

Je conçois des outils d'analyse légers pour les situations où trop de variables sont en mouvement pour être gérées de façon fiable par la seule intuition.

La question sous-jacente à chaque outil est simple :

> **Quelles informations doivent être réunies en un seul endroit pour prendre la prochaine décision en confiance ?**

Ce modèle d'acquisition multifamiliale est un exemple de cette approche : transformer les pratiques d'underwriting institutionnelles en un cadre d'aide à la décision réutilisable qui reste transparent, auditable et opérationnellement pratique.

---

## Détails techniques

<details>
<summary>Pour les réviseurs techniques, les praticiens d'Excel et les collaborateurs</summary>

---

### Architecture du classeur

Le classeur suit une architecture de modélisation stricte à trois couches, séparant les hypothèses, les calculs et les sorties de décision. 

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

| Feuille          | Fonction                                      |
| -------------- | --------------------------------------------- |
| Control Panel  | Hypothèses d'acquisition et paramètres de marché |
| Rent Roll      | Référence de bail et de loyer au niveau du logement            |
| Operations     | Vacance, dépenses et hypothèses d'exploitation  |
| Renovation     | Calendrier d'exécution de la création de valeur                  |
| Debt Engine    | Contraintes d'underwriting institutionnelles        |
| Cash Flow      | Prévisions mensuelles d'exploitation et de financement     |
| Exit           | Analyse de la valorisation de disposition                |
| Equity Returns | Calculs de rendement pour les investisseurs                  |
| Dashboard      | Visualisation d'aide à la décision                |

---

### Trois pièges qui surprennent même les investisseurs multifamiliaux expérimentés

#### Piège 1 : le loyer de marché n'est pas le loyer réalisable

Une acquisition value-add a été approuvée parce que des études de marché suggéraient un potentiel de loyer de 28 %.

Cependant, la structure de baux existante a retardé la réalisation de ce potentiel de près de deux ans.

| Hypothèse               | Modèle original | Modèle corrigé |
| ------------------------ | -------------: | --------------: |
| Logements                    |            120 |             120 |
| Ajustement immédiat au marché |            Oui |              Non |
| Durée moyenne restante des baux  |        Ignorée |       14 mois |
| TIR à effet de levier              |          20.8% |           13.9% |

L'erreur analytique survient parce que le loyer de marché et le loyer réalisable ne sont pas des variables équivalentes.

L'approche correcte consiste à modéliser :

* les calendriers d'expiration des baux,
* le calendrier de libération du manque à gagner (loss-to-lease),
* les temps d'arrêt liés à la rénovation,
* la stabilisation post-rénovation.

<details>
<summary>Logique des formules</summary>

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

#### Piège 2 : le LTV ne détermine pas la capacité d'emprunt

Un sponsor a supposé une disponibilité de financement à 75 % de LTV.

Le prêteur a finalement approuvé le financement sur la base de contraintes de rendement de la dette (Debt Yield).

| Contrainte | Prêt maximum |
| ---------- | -----------: |
| LTV        |       $15.0M |
| LTC        |       $14.2M |
| DSCR       |       $12.7M |
| Debt Yield |       $11.8M |

Montant final du prêt :

```text
$11.8M
```

L'échec analytique survient parce que les prêteurs évaluent simultanément plusieurs contraintes de risque.

L'approche correcte consiste à appliquer le montant de prêt minimum pris en charge sur l'ensemble des métriques d'underwriting. 

<details>
<summary>Logique des formules</summary>

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

#### Piège 3 : les valeurs de sortie dépendent des revenus futurs

Un modèle d'underwriting a calculé les produits de sortie avec le NOI traînant de l'année 5.

Les acheteurs institutionnels ont évalué l'actif sur la base du revenu stabilisé prospectif.

| Méthode       | Valeur de sortie |
| ------------ | ---------: |
| NOI traînant |     $33.1M |
| NOI prospectif  |     $28.4M |

Cet écart a réduit les rendements projetés des capitaux propres de plus de 400 points de base.

L'échec analytique survient parce que la fixation du prix d'un actif reflète les revenus futurs attendus plutôt que les revenus historiques.

La méthodologie corrigée capitalise les projections de NOI prospectif sur douze mois. 

<details>
<summary>Logique des formules</summary>

```excel
Gross_Sale_Value =
Forward_12M_NOI
/
Exit_Cap_Rate
```

</details>

---

### Exemple de scénario

Considérez une acquisition value-add de 96 logements.

#### Acquisition

| Entrée             |       Valeur |
| ----------------- | ----------: |
| Prix d'achat    | $18,000,000 |
| Frais de closing     |        2.0% |
| Budget de rénovation |  $1,920,000 |
| Durée de détention       |     5 ans |
| Taux de capitalisation de sortie     |       5.75% |

#### Exploitation

| Entrée                |  Valeur |
| -------------------- | -----: |
| Loyer moyen actuel | $1,250 |
| Loyer de marché          | $1,520 |
| Prime de rénovation   |   $225 |
| Vacance              |   5.0% |
| Créances irrécupérables         |   1.5% |

#### Financement

| Contrainte | Résultat |
| ---------- | -----: |
| LTV        | $13.5M |
| LTC        | $14.1M |
| DSCR       | $12.3M |
| Debt Yield | $11.9M |

Montant final de la dette :

```text
$11.9M
```

#### Résultats d'investissement

| Métrique               | Résultat |
| -------------------- | -----: |
| NOI année 1           | $1.18M |
| NOI stabilisé       | $2.04M |
| Valeur de sortie           | $35.5M |
| TIR à effet de levier          |  15.6% |
| Multiple des capitaux propres (Equity Multiple)      |  2.09x |
| Cash-on-Cash moyen |   9.4% |
| Yield-on-Cost        |   9.3% |

#### Interprétation de la décision

L'acquisition reste attractive uniquement si :

* la durée des rénovations reste inférieure à 30 mois,
* les taux de capitalisation de sortie restent inférieurs à 6,00 %,
* les primes de loyer dépassent $175/logement/mois,
* les exigences de rendement de la dette des prêteurs restent inférieures à 9,0 %.

---

### Référence des formules

<details>
<summary>Moteur de dimensionnement de la dette</summary>

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
<summary>Moteur de rénovation</summary>

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
<summary>Moteur de flux de trésorerie</summary>

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
<summary>Valorisation de sortie</summary>

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
<summary>Rendements des capitaux propres</summary>

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

### Règles de validation

| Champ              | Règle          | Comportement en cas d'erreur     |
| ------------------ | ------------- | ------------------ |
| Prix d'achat     | > 0           | Arrêt dur          |
| Durée de détention        | 1–10 ans    | Erreur de validation   |
| Taux de capitalisation de sortie      | ≥ Taux d'entrée   | Avertissement            |
| LTV maximum        | ≤ 75%         | Avertissement            |
| DSCR minimal       | ≥ 1.20x       | Échec de contrainte |
| Debt Yield         | ≥ 8.00%       | Échec de contrainte |
| Exigence en capitaux propres | > 0           | Arrêt dur          |
| DSCR mensuel       | ≥ 1.05x       | Avertissement de covenant   |
| Logements à rénover   | ≤ Total des logements | Erreur de validation   |
| Rapprochement VAN | Correspondance exacte   | Échec d'audit      |

</details>

---

## Autres outils de cette série

* **Inventory Planning & Replenishment Engine** — positionnement des stocks, risque de rupture et optimisation du fonds de roulement.
* **Logistics Operations Control Tower** — visibilité des expéditions multi-entités et gestion des workflows douaniers.
* **Business Budget Variance Analyzer** — budgétisation opérationnelle et analyse de rentabilité.
* **Service Operations Performance Console** — productivité de la main-d'œuvre et gestion de la rentabilité des services.

---

## Licence

Ce projet est sous licence **Apache License 2.0**.

Vous êtes libre d'utiliser, de modifier, de distribuer et d'adapter ce projet selon les termes de la licence Apache 2.0. 

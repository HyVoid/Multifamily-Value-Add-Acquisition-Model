[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# Modèle Excel d'underwriting d'acquisition multifamiliale value-add & de rendement des capitaux propres
<img width="1363" height="790" alt="image" src="https://github.com/user-attachments/assets/a2b639c7-9dfa-45b9-b751-363ed19291f3" />

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-green.svg)
![Tool](https://img.shields.io/badge/Tool-Decision%20Support-orange.svg)

**Évaluez les investissements immobiliers commerciaux (CRE) et déterminez si une acquisition multifamiliale value-add génère réellement de la valeur pour les capitaux propres. Ce modèle institutionnel d'underwriting au format double fonctionne à la fois comme calculateur immobilier gratuit dans le navigateur, sans installation, et comme modèle pro forma Excel entièrement auditable.**

**Aucune inscription. Aucune installation. Présélection de transactions gratuite dans votre navigateur.**

Réalisez votre analyse initiale d'investissement multifamilial via l'application web. Lorsque vous êtes prêt à présenter au comité d'investissement ou à syndiquer auprès de Limited Partners (LPs), passez à la version Excel déverrouillée avec une garantie de remboursement de 30 jours sans questions.

> 🌐 **Lancez la présélection initiale de la transaction** → [Calculateur multifamilial d'underwriting gratuit dans le navigateur](https://hyvoid.github.io/Multifamily-Value-Add-Acquisition-Model/)
>
> 📥 **Télécharger pour une personnalisation complète** → [Télécharger le modèle Excel institutionnel d'underwriting multifamilial](https://www.theseusworkshop.com/l/hmkjuu?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=multifamily-value-add)
> 
> Disponible en formats **navigateur** et **Excel** pour une analyse immédiate des flux de trésorerie et une transparence totale du modèle financier.

---

## Analyse de transactions multifamiliales : Points de douleur vs. Solutions du modèle

La plupart des investisseurs immobiliers découvrent les erreurs critiques seulement après la clôture. Voici comment ce logiciel d'underwriting associe les pièges courants de syndication à des solutions analytiques structurées :

| Point de douleur d'investissement (Ce qui tourne mal) | Solution institutionnelle (Ce que ce modèle calcule) |
| :--- | :--- |
| **Payer trop cher les actifs multifamiliaux** | **Prix d'acquisition vs. valeur stabilisée** : Calcule l'écart réel à l'aide de taux de capitalisation (Cap Rates) prospectifs et du résultat d'exploitation net (NOI) projeté. |
| **Projections de rent roll irréalistes** | **Loss-to-Lease & potentiel de loyer de marché** : Met en correspondance les échéanciers de renouvellement des baux existants avec le loyer de marché réalisable par pied carré (PSF). |
| **Épuisement du budget CapEx** | **Rythme de rénovation value-add** : Suit l'absorption mensuelle des dépenses en capital (CapEx) par rapport à la croissance du NOI réellement réalisée pendant la phase de repositionnement des unités. |
| **Échec aux tests de résistance des prêteurs** | **Dimensionnement et contraintes de la dette senior** : Dimensionne la capacité de dette senior selon les seuils de LTV, DSCR et Debt Yield pour correspondre aux normes d'underwriting des agences (Fannie Mae/Freddie Mac). |
| **Surprises de flux de trésorerie négatifs** | **Volatilité du flux de trésorerie d'exploitation** : Prévoit les déficits d'exploitation mensuels et les besoins de financement en capitaux propres aux pics, pendant les périodes intensives de rénovation des unités. |
| **Stratégie de sortie / reversion à l'aveugle** | **Sensibilité de la valorisation de sortie** : Réalise la modélisation de cession en utilisant le NOI prospectif de 12 mois plutôt que les historiques T12, capturant la véritable valeur de marché stabilisée. |

---

## Pourquoi j'ai créé cet outil d'underwriting immobilier commercial

La plupart des modèles pro forma immobiliers commerciaux produisent des réponses de TRI élevées avant de valider si les hypothèses sous-jacentes de gestion immobilière sont opérationnellement réalisables.

En pratique, les acquisitions d'appartements value-add échouent moins souvent à cause de formules Excel incorrectes qu'à cause d'un raisonnement incorrect sur les cycles de marché et l'absorption des locataires.

Les erreurs analytiques les plus courantes dans le private equity immobilier comprennent :
- Supposer que 100 % des unités peuvent atteindre immédiatement les primes de loyer du marché, en ignorant les baux existants.
- Dimensionner la dette d'acquisition uniquement sur le Loan-to-Value (LTV) en ignorant les contraintes de Debt Service Coverage Ratio (DSCR) du prêteur.
- Considérer l'exécution de la rénovation intérieure comme instantanée, plutôt que comme un déploiement mensuel par phases.
- Valoriser le prix de sortie en utilisant le NOI historique T12, ce qui pénalise sévèrement les opérations récemment stabilisées du sponsor.
- Supposer que les améliorations opérationnelles (comme la réduction des ratios de charges) se produisent sans friction temporelle.

J'ai créé ce modèle immobilier commercial après avoir observé à plusieurs reprises des situations où des comités d'investissement approuvaient des syndications multifamiliales fondées sur des hypothèses internement incohérentes, soigneusement dissimulées dans des feuilles de calcul d'underwriting conventionnelles et enflées.

Considérez une comparaison simplifiée d'acquisition multifamiliale :

| Hypothèse d'underwriting clé | Pro forma standard du courtier | Modèle Excel institutionnel value-add |
| :--- | ---: | ---: |
| **Prix d'acquisition de l'actif** | $18,000,000 | $18,000,000 |
| **Projection de TRI levé sponsor/LP** | 19.2% | 12.8% |
| **Atteinte de la prime de loyer** | Augmentation immédiate de 100 % | Liée au calendrier réel d'expiration des baux |
| **Dimensionnement du prêt senior** | 75 % LTV uniquement | Contraint par LTV, DSCR & Debt Yield |
| **Rotation des unités CapEx** | Mise à niveau instantanée | Déploiement de rénovation échelonné sur 24 mois |
| **Cap rate de sortie / reversion** | Basé sur le NOI historique T12 | Basé sur le NOI stabilisé prospectif de 12 mois |

L'actif immobilier physique n'a pas changé. Seule la qualité du cadre d'analyse financière a changé.

Ce classeur fonctionne comme un système de raisonnement produit pour les acquisitions immobilières. Son objectif principal n'est pas seulement de calculer les rendements Cash-on-Cash et les multiples de capitaux propres, mais d'exposer les hypothèses opérationnelles cachées qui déterminent si ces rendements sont réellement réalisables.

---

## Logiciels et modèles d'underwriting pour les professionnels de l'immobilier

Ce modèle financier est spécialement conçu pour les sponsors de transactions et les analystes qui ont besoin de calculs fiables, prêts à être présentés.

**Qui utilise exactement ce modèle immobilier ?**
- **Les analystes Real Estate Private Equity (REPE)** ayant besoin d'un *modèle Excel d'acquisition multifamiliale* transparent pour soumettre à des tests de résistance les rendements GP/LP.
- **Les syndicateurs multifamiliaux** cherchant un *logiciel d'analyse de transactions* fiable pour inspirer confiance à leurs Limited Partners (LPs).
- **Les sponsors indépendants et General Partners (GPs)** recherchant un *modèle immobilier value-add* léger pour une présélection initiale rapide du marché.
- **Les responsables d'acquisitions** tentant de remplacer d'anciennes *feuilles de calcul pro forma immobilières commerciales* défectueuses.
- **Les modélisateurs financiers** évaluant des *rénovations d'appartements de classe B et C* nécessitant un suivi précis des flux de trésorerie mensuels.

*(Remarque : Il s'agit d'un outil d'analyse d'investissement. Il n'est pas conçu pour remplacer les logiciels de gestion immobilière (comme Yardi ou AppFolio), les systèmes comptables d'entreprise ou les plateformes de gestion de construction.)*

Aucune expertise avancée en modélisation financière ni en Excel VBA n'est requise.

---

## 🚀 Tutoriel d'underwriting rapide : De la présélection à l'exportation Excel

Arrêtez de perdre du temps à construire des tableaux d'amortissement à partir de zéro. Suivez ce flux de travail précis pour évaluer votre prochain dossier d'offre multifamilial (OM) en quelques minutes :

### Étape 1 : Saisir les hypothèses d'actif et de financement (La présélection)
Ouvrez le [calculateur web gratuit](https://hyvoid.github.io/Multifamily-Value-Add-Acquisition-Model/). Saisissez le prix demandé par le courtier, le résultat d'exploitation net T12 actuel et vos conditions de financement cibles (taux d'intérêt, période d'amortissement). L'outil signale instantanément votre montant d'emprunt maximal.

### Étape 2 : Modéliser le calendrier de rénovation value-add (Les opérations)
Saisissez votre budget CapEx par unité et les primes de loyer cibles après rénovation. Définissez le rythme mensuel de rénovation (p. ex. 4 unités par mois). Observez le modèle calculer automatiquement l'hémorragie du « loss to lease » et le déficit d'exploitation pendant la construction.

### Étape 3 : Analyser le stack de capital et les rendements (Le résultat)
Examinez les indicateurs de performance ajustés au risque. Le tableau de bord calculera simultanément votre TRI levé (taux de rendement interne), le MoIC (multiple sur le capital investi), le rendement Cash-on-Cash et le Yield-on-Cost à la stabilisation.

### Étape 4 : Télécharger pour le comité et la syndication (Appel à l'action)
Un outil web est idéal pour une décision go/no-go en 5 minutes. Mais pour conclure une transaction, vous devez partager vos calculs, ajuster les structures de waterfall et enregistrer des scénarios.

**Prêt à faire l'underwriting de votre pipeline de transactions en cours ?** Évitez les frais SaaS mensuels et soyez propriétaire de vos données. Téléchargez la feuille de calcul déverrouillée aux formules transparentes pour l'utiliser sur un nombre illimité d'acquisitions futures.

👉 [**Télécharger le modèle Excel d'underwriting multifamilial déverrouillé**](https://www.theseusworkshop.com/l/hmkjuu?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=multifamily-value-add)

---

## À propos

Je crée des outils analytiques légers et des modèles financiers pour les situations où il y a trop de variables en mouvement pour être gérées de manière fiable par la seule intuition.

La question qui sous-tend chaque modèle immobilier que je crée est simple :

> **Quelles informations doivent exister en un seul endroit pour prendre la prochaine décision d'investissement en toute confiance ?**

Ce modèle d'acquisition multifamiliale value-add incarne exactement cette philosophie : transformer les pratiques institutionnelles complexes d'underwriting immobilier commercial (CRE) en un cadre d'aide à la décision réutilisable et prêt pour le bureau, qui reste transparent, auditable et opérationnellement pratique.

---

## Détails techniques

<details>
<summary>Pour les réviseurs techniques, praticiens Excel et collaborateurs</summary>

---

### Architecture du classeur

Le classeur suit une architecture de modélisation stricte en trois couches, séparant les hypothèses, les calculs et les résultats de décision.

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

| Feuille        | Fonction                                       |
| -------------- | ---------------------------------------------- |
| Control Panel  | Hypothèses d'acquisition et paramètres de marché |
| Rent Roll      | Base des baux et loyers par unité              |
| Operations     | Vacance, charges et hypothèses d'exploitation  |
| Renovation     | Calendrier d'exécution value-add               |
| Debt Engine    | Contraintes d'underwriting institutionnel      |
| Cash Flow      | Prévisions d'exploitation et de financement mensuelles |
| Exit           | Analyse de valorisation de cession             |
| Equity Returns | Calculs de rendement pour les investisseurs    |
| Dashboard      | Visualisation d'aide à la décision             |

---

### Trois pièges qui attrapent même les investisseurs multifamiliaux expérimentés

#### Piège 1 : Le loyer de marché n'est pas le loyer réalisable

Une acquisition value-add a été approuvée parce que les études de marché suggéraient un potentiel de loyer de 28 %.

Cependant, la structure des baux existants a retardé la réalisation de ce potentiel de près de deux ans.

| Hypothèse                        | Modèle original | Modèle corrigé |
| -------------------------------- | --------------: | --------------: |
| Unités                           |             120 |             120 |
| Mark-to-market immédiat          |             Oui |             Non |
| Durée moyenne restante des baux  |         Ignorée |        14 mois  |
| TRI levé                         |           20.8% |           13.9% |

L'erreur analytique survient parce que le loyer de marché et le loyer réalisable ne sont pas des variables équivalentes.

La bonne approche consiste à modéliser :

* les échéanciers d'expiration des baux,
* le calendrier de libération du loss-to-lease,
* les temps d'arrêt de rénovation,
* la stabilisation après rénovation.

<details>
<summary>Logique de la formule</summary>

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

#### Piège 2 : Le LTV ne détermine pas la capacité d'emprunt

Un sponsor a supposé un financement disponible à 75 % de LTV.

Le prêteur a finalement approuvé le financement sur la base de contraintes de Debt Yield.

| Contrainte | Prêt maximal |
| ----------- | -----------: |
| LTV         |      $15.0M  |
| LTC         |      $14.2M  |
| DSCR        |      $12.7M  |
| Debt Yield  |      $11.8M  |

Montant final du prêt :

```text
$11.8M
```

L'erreur analytique survient parce que les prêteurs évaluent simultanément plusieurs contraintes de risque.

La bonne approche consiste à retenir le montant de prêt minimal supporté parmi toutes les métriques d'underwriting.

<details>
<summary>Logique de la formule</summary>

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

#### Piège 3 : Les valeurs de sortie dépendent des revenus futurs

Un modèle d'underwriting a calculé les produits de sortie en utilisant le NOI historique de l'année 5.

Les acheteurs institutionnels ont valorisé l'actif en utilisant le revenu stabilisé prospectif.

| Méthode        | Valeur de sortie |
| -------------- | ---------------: |
| NOI historique |          $33.1M  |
| NOI prospectif |          $28.4M  |

Cette différence a réduit les rendements projetés des capitaux propres de plus de 400 points de base.

L'erreur analytique survient parce que la valorisation d'actifs reflète le revenu futur attendu plutôt que le revenu historique.

La méthodologie corrigée capitalise les projections prospectives de NOI sur douze mois.

<details>
<summary>Logique de la formule</summary>

```excel
Gross_Sale_Value =
Forward_12M_NOI
/
Exit_Cap_Rate
```

</details>

---

### Exemple de scénario

Considérez une acquisition value-add de 96 unités.

#### Acquisition

| Donnée                  |       Valeur |
| ----------------------- | -----------: |
| Prix d'achat            | $18,000,000  |
| Frais de clôture        |        2.0%  |
| Budget de rénovation    | $1,920,000   |
| Période de détention    |     5 ans    |
| Cap rate de sortie      |      5.75%   |

#### Exploitation

| Donnée                          |  Valeur |
| ------------------------------- | ------: |
| Loyer moyen actuel              |  $1,250 |
| Loyer de marché                 |  $1,520 |
| Prime de rénovation             |    $225 |
| Vacance                         |   5.0%  |
| Créances douteuses (Bad Debt)   |   1.5%  |

#### Financement

| Contrainte | Résultat |
| ----------- | -------: |
| LTV         |   $13.5M |
| LTC         |   $14.1M |
| DSCR        |   $12.3M |
| Debt Yield  |   $11.9M |

Montant final de la dette :

```text
$11.9M
```

#### Résultats de l'investissement

| Indicateur                   | Résultat |
| ---------------------------- | --------: |
| NOI Année 1                  |   $1.18M  |
| NOI stabilisé                |   $2.04M  |
| Valeur de sortie             |   $35.5M  |
| TRI levé                     |   15.6%   |
| Multiple de capitaux propres |   2.09x   |
| Cash-on-Cash moyen           |    9.4%   |
| Yield-on-Cost                |    9.3%   |

#### Interprétation de la décision

L'acquisition reste attrayante uniquement si :

* la durée de rénovation reste inférieure à 30 mois,
* les cap rates de sortie restent inférieurs à 6.00 %,
* les primes de loyer dépassent 175 $ par unité/mois,
* les exigences de debt yield du prêteur restent inférieures à 9.0 %.

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

| Champ                       | Règle               | Comportement en cas d'erreur |
| ---------------------------- | ------------------- | ---------------------------- |
| Prix d'achat                 | > 0                 | Arrêt strict                 |
| Période de détention         | 1–10 ans            | Erreur de validation         |
| Cap rate de sortie           | ≥ Cap d'entrée      | Avertissement                |
| LTV maximal                  | ≤ 75 %              | Avertissement                |
| DSCR minimal                 | ≥ 1.20x             | Échec de contrainte          |
| Debt Yield                   | ≥ 8.00%             | Échec de contrainte          |
| Besoin en capitaux propres   | > 0                 | Arrêt strict                 |
| DSCR mensuel                 | ≥ 1.05x             | Avertissement de covenant    |
| Unités en rénovation         | ≤ Nombre total d'unités | Erreur de validation     |
| Réconciliation de la VAN     | Correspondance exacte | Échec d'audit             |

</details>

---

## La logique métier et la méthodologie

Dans son essence, ce modèle d'underwriting immobilier commercial déplace l'attention analytique des *hypothèses statiques* vers *l'exécution opérationnelle dynamique*. Il résout des problèmes complexes d'acquisition multifamiliale en appliquant des méthodologies de niveau institutionnel aux calculs de syndication du quotidien :

### 1. Rent roll dynamique et renouvellement des baux (Résoudre le sophisme du « revenu instantané »)
* **Le problème métier :** Les pro forma traditionnels supposent souvent que les loyers passent au niveau du marché dès le jour 1. Cela gonfle artificiellement les rendements Cash-on-Cash de l'année 1 et masque les déficits d'exploitation précoces.
* **La méthodologie :** Le modèle emploie un **calendrier échelonné de renouvellement des baux**. Il cartographie les expirations des baux existants et applique les primes de loyer cibles (capture du loss-to-lease) uniquement au fur et à mesure que les unités se libèrent naturellement. Cela produit une prévision réaliste du revenu locatif net fondée sur les mouvements réels des locataires plutôt que sur des moyennes théoriques.

### 2. Absorption du CapEx et temps d'arrêt des unités (Résoudre le risque de déficit de capitaux propres)
* **Le problème métier :** Les General Partners (GPs) et syndicateurs sous-estiment fréquemment le fonds de roulement nécessaire pour couvrir les coûts fixes de la propriété pendant que les unités restent vacantes durant la phase de construction value-add.
* **La méthodologie :** Un **moteur de rythme de rénovation mois par mois**. En définissant le nombre maximal d'unités rénovées par mois et le temps d'arrêt moyen par unité, le modèle calcule le calendrier exact des tirages de CapEx et la perte de vacance économique qui en résulte. Cela dimensionne avec précision la levée totale de capitaux propres nécessaire pour couvrir les creux de trésorerie en cours de projet.

### 3. Dimensionnement de la dette à contraintes multiples (Résoudre le refus du prêteur)
* **Le problème métier :** Dimensionner un prêt d'acquisition strictement sur le Loan-to-Value (LTV) ignore la manière dont les prêteurs des agences (Fannie Mae / Freddie Mac) ou les fonds de dette relais évaluent réellement le risque.
* **La méthodologie :** Le modèle utilise un **moteur de dette à quatre contraintes**. Il calcule simultanément le montant d'emprunt maximal admissible selon le LTV, le DSCR minimal (Debt Service Coverage Ratio), le Debt Yield minimal et les seuils de Loan-to-Cost (LTC). Le modèle limite automatiquement votre levier à la métrique la plus conservatrice, garantissant que votre structure de capital projetée soit réellement finançable dans le monde réel.

### 4. Valorisation de sortie prospective (Résoudre la sous-évaluation de la reversion)
* **Le problème métier :** Vendre une résidence récemment repositionnée sur la base de son revenu historique T12 (12 derniers mois) décote sévèrement le sweat equity et la valeur créée par les rénovations du sponsor.
* **La méthodologie :** **Capitalisation du NOI prospectif**. Le modèle calcule la valeur terminale de sortie (prix de cession) en appliquant le cap rate de sortie aux *futurs* 12 mois de résultat d'exploitation net (NOI) stabilisé. Cette méthodologie reflète fidèlement la véritable valeur de marché de l'actif repositionné, garantissant que votre TRI levé LP et vos multiples de capitaux propres soient correctement crédités de l'effort de stabilisation.

---

## Autres outils de cette série

* **Inventory Planning & Replenishment Engine** — positionnement des stocks, risque de rupture et optimisation du fonds de roulement.
* **Logistics Operations Control Tower** — visibilité des expéditions entre entités et gestion des flux douaniers.
* **Business Budget Variance Analyzer** — budgétisation opérationnelle et analyse de rentabilité.
* **Service Operations Performance Console** — productivité de la main-d'œuvre et gestion de la rentabilité des services.

---

## Licence

Ce projet est sous licence **Apache 2.0**.

Vous êtes libre d'utiliser, modifier, distribuer et adapter ce projet selon les termes de la licence Apache 2.0.

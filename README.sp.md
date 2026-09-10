[ 🌐 عربي ](README.ar.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# Modelo de Adquisición Multifamiliar de Creación de Valor (value-add), Suscripción de Riesgos (underwriting) y Retorno de Capital

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-green.svg)
![Tool](https://img.shields.io/badge/Tool-Decision%20Support-orange.svg)

**Evalúe si una adquisición multifamiliar de creación de valor (value-add) realmente genera valor de capital — utilizando una herramienta gratuita en el navegador sin instalación o un modelo de suscripción de riesgos (underwriting) de Excel totalmente auditable.**

**Sin registro. Sin instalación. Gratis en su navegador.**

Pruebe la versión para navegador de forma gratuita. Si necesita la versión de Excel, puede comprarla con una garantía de devolución de dinero de 30 días sin preguntas.
>
> 🌐 **Abrir en el Navegador** → [demostración en vivo en HTML](https://hyvoid.github.io/Multifamily-Value-Add-Acquisition-Model/)
>
> 📥 **Descargar Excel**
>
> [compra de plantilla Excel](https://www.theseusworkshop.com/l/hmkjuu?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=multifamily-value-add)
> 
> Disponible en formatos **navegador** y **Excel** para análisis inmediato y transparencia total del modelo.

---

## Qué Le Ayuda a Seguir

* Precio de adquisición frente a la creación de valor estabilizada alcanzable.
* Subvaluación de arrendamientos existentes frente al potencial de renta de mercado realizable.
* Ritmo de gasto en renovación frente a la realización real del crecimiento del NOI (ingreso neto operativo).
* Restricciones de capacidad de deuda según los estándares de suscripción de riesgos (underwriting) del prestamista.
* Volatilidad del flujo de efectivo operativo mensual durante los periodos de reposicionamiento.
* Sensibilidad de la valoración de salida ante el cambio de supuestos de mercado.

---

## Por Qué Lo Construí

La mayoría de los modelos de adquisición multifamiliar producen respuestas antes de validar si los supuestos subyacentes son operativamente alcanzables.

En la práctica, las adquisiciones de creación de valor (value-add) fracasan menos por fórmulas incorrectas y más por un razonamiento incorrecto.

Las fallas analíticas más comunes incluyen:

* suponer que todas las unidades pueden alcanzar la renta de mercado de inmediato,
* dimensionar la deuda basándose únicamente en el LTV mientras se ignoran las restricciones de flujo de efectivo del prestamista,
* tratar la ejecución de la renovación como instantánea,
* valorar las salidas utilizando el NOI (ingreso neto operativo) histórico en lugar del prospectivo,
* suponer que las mejoras operativas ocurren sin fricción de tiempo.

Construí este modelo tras observar repetidamente situaciones en las que los comités de inversión aprobaron adquisiciones basadas en supuestos internamente inconsistentes que eran difíciles de detectar dentro de las hojas de cálculo convencionales de suscripción de riesgos (underwriting).

Considere un ejemplo simplificado:

|                        | Modelo Tradicional |                   Este Modelo |
| ---------------------- | ----------------: | ---------------------------: |
| Precio de Compra      |            $18.0M |                       $18.0M |
| TIR Apalancada Proyectada |             19.2% |                        12.8% |
| Supuesto de Crecimiento de Renta |         Inmediato |                 Basado en arrendamientos |
| Dimensionamiento de Deuda |           75% LTV | Suscripción de riesgos (underwriting) de cuatro restricciones |
| Periodo de Renovación |           Instantáneo |              Despliegue de 24 meses |
| Valoración de Salida  |      NOI histórico |                  NOI prospectivo |

La inversión en sí no cambió.

Solo cambió la calidad del marco analítico.

Este libro de Excel funciona por tanto como un sistema de razonamiento productizado en lugar de un modelo financiero tradicional. Su propósito no es meramente calcular rendimientos, sino exponer los supuestos que determinan si esos rendimientos son alcanzables.

---

## Problemas Comunes de Adquisición Multifamiliar que Este Modelo Resuelve

| Problema | Sin Esta Herramienta | Con Esta Herramienta |
| ----------------------------------- | ----------------------------------------- | ------------------------------------------------------- |
| Tiempo de renovación de arrendamientos ignorado | El crecimiento de renta parece inmediato | La liberación de renta sigue las expiraciones reales de arrendamientos |
| Deuda dimensionada usando solo LTV | Requisitos de capital subestimados | Restricciones de prestamista institucional modeladas simultáneamente |
| Ejecución de renovación sobre simplificada | La estabilización ocurre de forma poco realista rápida | Restricciones mensuales de capacidad de renovación aplicadas |
| Valoración de salida mal calculada | Los ingresos de salida sobreestimados | Metodología de capitalización de NOI prospectivo aplicada |
| Requisitos de capital subestimados | Surgen brechas de capital a mitad del proyecto | Costos completos de adquisición, capex y financiamiento integrados |
| Rendimientos evaluados usando solo IRR | El rendimiento ajustado por riesgo se oscurece | IRR, MoIC, CoC y Yield-on-Cost evaluados en conjunto |

---

## Para Quién Es Esto

Esta herramienta está diseñada para:

* Analistas de adquisición multifamiliar.
* Patrocinadores independientes.
* Equipos de capital privado inmobiliario.
* Sindicadores de apartamentos.
* Firmas de inversión pequeñas y medianas.
* Modeladores financieros que suscriben transacciones de creación de valor (value-add).

Esta herramienta no está diseñada para:

* Operaciones de administración de propiedades.
* Sistemas contables empresariales.
* Plataformas de gestión de construcción.
* Software de administración de cartera.
* Proyectos de reemplazo de ERP.

No se requiere experiencia en hojas de cálculo. Abra la versión para navegador y comience la suscripción de riesgos (underwriting) de inmediato, o utilice la versión de Excel para total auditabilidad, personalización y flujos de trabajo de revisión institucional.

---

## Acerca De

Construyo herramientas analíticas ligeras para situaciones donde hay demasiadas partes móviles para gestionar de forma fiable solo mediante la intuición.

La pregunta subyacente a cada herramienta es sencilla:

> **¿Qué información debe existir en un solo lugar para tomar la siguiente decisión con confianza?**

Este modelo de adquisición multifamiliar representa un ejemplo de ese enfoque: transformar las prácticas institucionales de suscripción de riesgos (underwriting) en un marco de apoyo a la decisión reutilizable que sigue siendo transparente, auditable y operativamente práctico.

---

## Detalles Técnicos

<details>
<summary>Para revisores técnicos, practicantes de Excel y colaboradores</summary>

---

### Arquitectura del Libro de Excel

El libro de Excel sigue una arquitectura de modelado estricta de tres capas que separa supuestos, cálculos y salidas de decisión.

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

| Hoja          | Función                                      |
| -------------- | --------------------------------------------- |
| Control Panel  | Supuestos de adquisición y parámetros de mercado |
| Rent Roll      | Línea base de arrendamiento y renta a nivel de unidad |
| Operations     | Vacancia, gastos y supuestos operativos |
| Renovation     | Cronograma de ejecución de creación de valor (value-add) |
| Debt Engine    | Restricciones institucionales de suscripción de riesgos (underwriting) |
| Cash Flow      | Pronósticos operativos y de financiamiento mensuales |
| Exit           | Análisis de valoración de disposición |
| Equity Returns | Cálculos de rendimiento para inversionistas |
| Dashboard      | Visualización de apoyo a la decisión |

---

### Tres Trampas que Atrapan incluso a Inversionistas Multifamiliares Experimentados

#### Trampa 1: La Renta de Mercado No Es la Renta Alcanzable

Una adquisición de creación de valor (value-add) fue aprobada porque los estudios de mercado sugerían un potencial de renta del 28%.

Sin embargo, la estructura de arrendamiento existente retrasó la realización de ese potencial por casi dos años.

| Supuesto               | Modelo Original | Modelo Corregido |
| ------------------------ | -------------: | --------------: |
| Unidades                    |            120 |             120 |
| Marcado al Mercado Inmediato |            Sí |              No |
| Arrendamiento Promedio Restante  |        Ignorado |       14 meses |
| TIR Apalancada              |          20.8% |           13.9% |

El error analítico ocurre porque la renta de mercado y la renta realizable no son variables equivalentes.

El enfoque correcto es modelar:

* calendarios de expiración de arrendamientos,
* tiempo de liberación de la pérdida por arrendamiento (loss-to-lease),
* tiempo de inactividad por renovación,
* estabilización posterior a la renovación.

<details>
<summary>Lógica de la fórmula</summary>

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

#### Trampa 2: El LTV No Determina la Capacidad de Endeudamiento

Un patrocinador asumió disponibilidad de financiamiento al 75% LTV.

El prestamista finalmente aprobó el financiamiento basado en restricciones de Yield de Deuda (Debt Yield).

| Restricción | Préstamo Máximo |
| ---------- | -----------: |
| LTV        |       $15.0M |
| LTC        |       $14.2M |
| DSCR       |       $12.7M |
| Debt Yield |       $11.8M |

Monto final del préstamo:

```text
$11.8M
```

La falla analítica ocurre porque los prestamistas evalúan múltiples restricciones de riesgo simultáneamente.

El enfoque correcto es aplicar el monto de préstamo soportado mínimo en todas las métricas de suscripción de riesgos (underwriting).

<details>
<summary>Lógica de la fórmula</summary>

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

#### Trampa 3: Los Valores de Salida Dependen de los Ingresos Futuros

Un modelo de suscripción de riesgos (underwriting) calculó los ingresos de salida utilizando el NOI (ingreso neto operativo) histórico del Año 5.

Los compradores institucionales valoraron el activo utilizando ingresos prospectivos estabilizados.

| Método       | Valor de Salida |
| ------------ | ---------: |
| Trailing NOI |     $33.1M |
| Forward NOI  |     $28.4M |

Esta diferencia redujo los rendimientos de capital proyectados en más de 400 puntos básicos.

La falla analítica ocurre porque la valoración de activos refleja ingresos futuros esperados en lugar de ingresos históricos.

La metodología corregida capitaliza proyecciones de NOI (ingreso neto operativo) prospectivas a doce meses.

<details>
<summary>Lógica de la fórmula</summary>

```excel
Gross_Sale_Value =
Forward_12M_NOI
/
Exit_Cap_Rate
```

</details>

---

### Escenario de Ejemplo

Considere una adquisición de creación de valor (value-add) de 96 unidades.

#### Adquisición

| Entrada             |       Valor |
| ----------------- | ----------: |
| Precio de Compra    | $18,000,000 |
| Costos de Cierre     |        2.0% |
| Presupuesto de Renovación |  $1,920,000 |
| Periodo de Mantenimiento (Hold)       |     5 años |
| Tasa de Capitalización de Salida (cap rate) |       5.75% |

#### Operaciones

| Entrada                |  Valor |
| -------------------- | -----: |
| Renta Promedio Actual | $1,250 |
| Renta de Mercado          | $1,520 |
| Prima de Renovación   |   $225 |
| Vacancia              |   5.0% |
| Deuda Incobrable     |   1.5% |

#### Financiamiento

| Restricción | Resultado |
| ---------- | -----: |
| LTV        | $13.5M |
| LTC        | $14.1M |
| DSCR       | $12.3M |
| Debt Yield | $11.9M |

Monto final de la deuda:

```text
$11.9M
```

#### Resultados de Inversión

| Métrica               | Resultado |
| -------------------- | -----: |
| NOI Año 1           | $1.18M |
| NOI Estabilizado       | $2.04M |
| Valor de Salida           | $35.5M |
| TIR Apalancada          |  15.6% |
| Múltiplo de Capital (Equity Multiple)      |  2.09x |
| Cash-on-Cash Promedio |   9.4% |
| Yield-on-Cost        |   9.3% |

#### Interpretación de la Decisión

La adquisición sigue siendo atractiva solo si:

* la duración de la renovación se mantiene por debajo de 30 meses,
* las tasas de capitalización (cap rate) de salida se mantienen por debajo de 6.00%,
* las primas de renta superan $175/unidad/mes,
* los requisitos de yield de deuda del prestamista se mantienen por debajo de 9.0%.

---

### Referencia de Fórmulas

<details>
<summary>Motor de Dimensionamiento de Deuda</summary>

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
<summary>Motor de Renovación</summary>

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
<summary>Motor de Flujo de Efectivo</summary>

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
<summary>Valoración de Salida</summary>

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
<summary>Rendimientos de Capital</summary>

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

### Reglas de Validación

| Campo              | Regla          | Comportamiento de Error     |
| ------------------ | ------------- | ------------------ |
| Precio de Compra     | > 0           | Parada dura          |
| Periodo de Mantenimiento        | 1–10 años    | Error de validación   |
| Tasa de Capitalización de Salida | ≥ Entry Cap   | Advertencia            |
| LTV Máximo        | ≤ 75%         | Advertencia          |
| DSCR Mínimo       | ≥ 1.20x       | Fallo de restricción |
| Yield de Deuda         | ≥ 8.00%       | Fallo de restricción |
| Requisito de Capital | > 0           | Parada dura          |
| DSCR Mensual      | ≥ 1.05x       | Advertencia de pacto   |
| Unidades de Renovación   | ≤ Total Units | Error de validación   |
| Conciliación NPV | Exact match   | Fallo de auditoría      |

</details>

---

## Otras Herramientas de Esta Serie

* **Motor de Planificación y Reposición de Inventario** — posicionamiento de inventario, riesgo de falta de stock y optimización de capital de trabajo.
* **Torre de Control de Operaciones Logísticas** — visibilidad de envíos entre entidades y gestión de flujos de trabajo aduaneros.
* **Analizador de Variación de Presupuesto Empresarial** — presupuestación operativa y análisis de rentabilidad.
* **Consola de Rendimiento de Operaciones de Servicio** — productividad de la fuerza laboral y gestión de rentabilidad del servicio.

---

## Licencia

Este proyecto está licenciado bajo la **Licencia Apache 2.0**.

Usted es libre de usar, modificar, distribuir y adaptar este proyecto bajo los términos de la Licencia Apache 2.0.
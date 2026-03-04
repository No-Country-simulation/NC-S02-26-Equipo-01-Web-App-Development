# TaxServices  
## Multi-Channel Tracking & Attribution Engine

TaxServices es una **All-in-One Solution** de *Incorporation, Tax y Bookkeeping en USA*.  

Este repositorio forma parte del sistema que potencia nuestro ecommerce, compuesto por:

- Un **Frontend SPA moderno**
- Un **Backend de atribución multicanal en tiempo real**

El objetivo principal es **medir con precisión las conversiones pagadas vía Stripe** y sincronizarlas en tiempo real con:

- Google Ads (Offline Conversions)
- Meta (Conversions API – CAPI)
- Pipedrive CRM
- PostgreSQL (Neon)

Esto permite optimizar campañas de adquisición y mejorar el **ROAS** mediante atribución confiable y resiliente.

---

# 🏗 Arquitectura General

## Patrón Backend: Event-Driven Middleware
Stripe → Webhook → Orquestador → Integraciones desacopladas
El backend actúa como un **motor de orquestación**, procesando eventos financieros y propagándolos hacia múltiples plataformas externas.

---

# 🧠 Principios de Resiliencia (SRE)

- **Aislamiento de fallos**  
  Cada integración (Google, Meta, CRM) se ejecuta de forma independiente.

- **Persistencia atómica**  
  La venta siempre se registra en PostgreSQL aunque una API externa falle.

- **Idempotencia por `session_id`**  
  Prevención de duplicados ante reintentos de webhook.

- **Observabilidad estructurada**  
  Logging con prefijos:
  - `[SRE MONITOR]`
  - `[SRE SUCCESS]`
  - `[SRE DEBUG]`
  - `[SRE ERROR]`

---

# 🖥 Frontend (Ecommerce SPA)

El frontend está construido con:

- **React 19**
- **React Router 7**
- **@tanstack/react-query v5**
- **TailwindCSS v4**
- **Framer Motion v12 (LazyMotion optimizado)**
- **Vite 7**
- **TypeScript 5.9**

## Características técnicas

- SPA optimizada para performance
- Animaciones desacopladas mediante `LazyMotion`
- Manejo de estado asíncrono con React Query
- Navegación con scroll controlado por hash
- Optimización de bundle size
- SEO técnico compatible con campañas Ads

El frontend captura metadata publicitaria (`gclid`, `fbclid`, campaign, source) y la envía a Stripe para que sea recuperada luego por el backend vía webhook.

# TaxServices  
<p align="center">
  <img src="/demo_tax.gif" alt="TaxServices" width="600" />
</p>

## Multi-Channel Tracking & Attribution Engine

TaxServices es una **All-in-One Solution** para *Incorporation, Tax y Bookkeeping en Estados Unidos*.

Este repositorio contiene el **backend del motor de tracking y atribución multicanal** que potencia nuestro ecommerce.

El sistema completo está compuesto por:

- Un **Frontend SPA** que gestiona el flujo de compra y checkout.
- Un **Backend de atribución multicanal en tiempo real**, encargado de procesar conversiones y sincronizarlas con múltiples plataformas externas.

El objetivo principal es **medir con precisión las conversiones generadas vía Stripe** y propagarlas en tiempo real hacia las herramientas de marketing y ventas.

### Integraciones principales

- **Google Ads** – Offline Conversion Tracking  
- **Meta Ads** – Conversions API (CAPI)  
- **Pipedrive CRM** – Registro de ventas y leads  
- **PostgreSQL (Neon)** – Persistencia de eventos y transacciones  

Esto permite optimizar campañas de adquisición y mejorar el **ROAS (Return on Ad Spend)** mediante un sistema de atribución confiable y resiliente.

<br><br>

# 🏗 Arquitectura General

## Patrón Backend: Webhook-Driven Orchestration

El backend funciona como un **middleware de orquestación**, encargado de procesar eventos financieros provenientes de Stripe y distribuirlos hacia distintos sistemas externos.

```
Users -> Stripe -> Webhook Endpoint -> Event Processor -> 

Idempotency Layer (session_id) -> Transaction Store (PostgreSQL)
                                    │
                                    ▼
                                  Async Marketing Workers
                                    ├── Google Ads
                                    ├── Meta CAPI
                                    └── CRM (Pipedrive)
```

Flujo general:

1. El usuario completa el **checkout en Stripe**.
2. Stripe envía eventos mediante **Webhooks** (`checkout.session.completed`, `charge.succeeded`, etc.).
3. El backend procesa el evento y lo **normaliza internamente**.
4. El evento se **propaga hacia múltiples integraciones** (Google Ads, Meta, CRM).
5. La transacción se **persiste en PostgreSQL** para auditoría y trazabilidad.

<br><br>

# 🧠 Principios de Resiliencia (SRE)

### Aislamiento de fallos
Cada integración externa (Google, Meta, CRM) se ejecuta de forma **desacoplada**, evitando que la caída de una API afecte el resto del flujo.

### Persistencia garantizada
La conversión siempre se registra en **PostgreSQL** incluso si alguna integración externa falla.

### Idempotencia por `session_id`
Los eventos se procesan de forma **idempotente**, previniendo duplicados ante reintentos automáticos de Stripe Webhooks.


<br>

---

### **Frontend**

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=fff)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![React Query](https://img.shields.io/badge/React%20Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=fff)

![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)

![HTML](https://img.shields.io/badge/HTML-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-639?style=for-the-badge&logo=css&logoColor=fff)

## Características técnicas

- SPA optimizada para performance
- Animaciones desacopladas mediante `LazyMotion`
- Manejo de estado asíncrono con React Query
- Navegación con scroll controlado por hash
- Optimización de bundle size
- SEO técnico compatible con campañas Ads

### **Backend**

![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=fff)

![Google Cloud](https://img.shields.io/badge/Google%20Cloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-5851DD?style=for-the-badge&logo=stripe&logoColor=fff)

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=fff)

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

<br><br>

# 👥 Equipo de Desarrollo

<table>

<tr>

<td align="center" width="250" style="border:1px solid #ccc; padding:10px;">

<img src="https://avatars.githubusercontent.com/u/177051836?v=4" width="120"/><br>

<b>Matias Martinez</b><br><br>

<img src="https://img.shields.io/badge/Backend_Developer-0A66C2?style=for-the-badge&logo=java&logoColor=white"/><br><br>

<a href="https://github.com/ingmarma">
<img src="https://img.shields.io/badge/GitHub-Profile-181717?style=for-the-badge&logo=github"/>
</a>

<a href="https://www.linkedin.com/in/">
<img src="https://img.shields.io/badge/LinkedIn-Profile-0A66C2?style=for-the-badge&logo=linkedin"/>
</a>

</td>

<td align="center" width="250" style="border:1px solid #ccc; padding:10px;">

<img src="https://ca.slack-edge.com/T02KS88FB0E-U06PVMSJU95-60f01e3082ff-512" width="120"/><br>

<b>Miguel Chavez</b><br><br>

<img src="https://img.shields.io/badge/Fullstack-0A66C2?style=for-the-badge&logo=springboot&logoColor=white"/><br><br>

<a href="https://github.com/MiguelAChavez">
<img src="https://img.shields.io/badge/GitHub-Profile-181717?style=for-the-badge&logo=github"/>
</a>

<a href="https://www.linkedin.com/in/miguelangelchavez-">
<img src="https://img.shields.io/badge/LinkedIn-Profile-0A66C2?style=for-the-badge&logo=linkedin"/>
</a>

</td>

<td align="center" width="250" style="border:1px solid #ccc; padding:10px;">

<img src="https://avatars.githubusercontent.com/u/243418632?v=4" width="120"/><br>

<b>Katherine Cespedes</b><br><br>

<img src="https://img.shields.io/badge/Product_Owner-56347C?style=for-the-badge"/><br><br>

<a href="https://github.com/katherineict1502">
<img src="https://img.shields.io/badge/GitHub-Profile-181717?style=for-the-badge&logo=github"/>
</a>

<a href="https://www.linkedin.com/in/">
<img src="https://img.shields.io/badge/LinkedIn-Profile-0A66C2?style=for-the-badge&logo=linkedin"/>
</a>

</td>

</tr>


<tr>

<td align="center" width="250" style="border:1px solid #ccc; padding:10px;">

<img src="https://avatars.githubusercontent.com/u/127356688?v=4" width="120"/><br>

<b>Andrés López</b><br><br>

<img src="https://img.shields.io/badge/QA_Engineer-FF6B6B?style=for-the-badge&logo=testinglibrary&logoColor=white"/><br><br>

<a href="https://github.com/Lopezandres07">
<img src="https://img.shields.io/badge/GitHub-Profile-181717?style=for-the-badge&logo=github"/>
</a>

<a href="https://www.linkedin.com/in/">
<img src="https://img.shields.io/badge/LinkedIn-Profile-0A66C2?style=for-the-badge&logo=linkedin"/>
</a>

</td>


<td align="center" width="250" style="border:1px solid #ccc; padding:10px;">

<img src="https://lh3.googleusercontent.com/a/ACg8ocKLNbLkmsdBfvPrMzeo_6au6N_EJRhk-SS65OTY5-Z2AGsbBqBf=s96-c" width="120"/><br>

<b>Larry Gonzalez</b>

<img src="https://img.shields.io/badge/UX_UI_Designer-FF69B4?style=for-the-badge&logo=figma&logoColor=white"/><br><br>

<a href="https://www.linkedin.com/in/">
<img src="https://img.shields.io/badge/LinkedIn-Profile-0A66C2?style=for-the-badge&logo=linkedin"/>
</a>

</td>

<td align="center" width="250" style="border:1px solid #ccc; padding:10px;">
<!-- <img src="https://img.shields.io/badge/-grey?style=for-the-badge"/>-->
</td>

</tr>

</table>
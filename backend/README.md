🚀 Multi-Channel Tracking & Attribution Engine (Backend)
Este servicio es un motor de orquestación de alto rendimiento diseñado para la atribución de conversiones en tiempo real. Actúa como un middleware crítico que procesa eventos financieros de Stripe y los propaga hacia Google Ads, Meta CAPI, Pipedrive CRM y PostgreSQL (Neon).

✅ Hitos de Trazabilidad Cumplidos (8/8)
Hemos implementado con éxito los 8 requisitos de arquitectura solicitados para el MVP:

Persistencia en Neon: Esquema relacional extendido para analítica.

Mapeo de Metadata: Captura de gclid, campaign, source y product_id.

Trazabilidad de Sesión: Almacenamiento del session_id de Stripe para reconciliación de datos.

Ingesta de Webhooks: Procesamiento robusto del evento checkout.session.completed.

Sincronización CRM: Creación automática de deals en Pipedrive.

Meta CAPI: Envío de eventos de servidor con hashing de datos.

Google Ads Offline: Pipeline de subida de conversiones vía gRPC.

Data Seeding: Generador de datos históricos para dashboards de Grafana.

🏗️ Arquitectura y Resiliencia
El sistema implementa patrones de SRE (Site Reliability Engineering) para garantizar la integridad de la data:

Aislamiento de Fallos: Bloques de ejecución independientes. Si falla Meta CAPI, Neon y Pipedrive siguen recibiendo la información.

Persistencia Atómica: Uso de Spring Data JPA para asegurar que cada venta se registre con su metadata publicitaria completa.

Limpieza de Binarios: Pipeline de despliegue basado en mvn clean install para garantizar la ejecución de código fresco.

🔌 Especificaciones de la API
📥 Webhook de Stripe
POST /api/v1/webhooks/stripe

Auth: Stripe-Signature.

Metadata Requerida: gclid, campaign, source, product_id.

🛠️ Herramientas de Administración
GET /api/v1/admin/seed?days=30

Función: Puebla la base de datos con datos sintéticos para pruebas de carga y visualización en Grafana.

Parámetros: days (Cantidad de días históricos a simular).

🛠️ Detalle de Integraciones
🐘 PostgreSQL (Neon.tech)
Utilizamos Neon como base de datos serverless para el almacenamiento de StripeEventRecord. El esquema soporta:

Traceability: session_id y created_at para análisis de embudos.

Marketing Data: Columnas específicas para atribución (GCLID/FBCLID).

🎯 Google Ads & Meta CAPI
Google Ads: Integración mediante el SDK v21 para UploadClickConversions.

Meta: Envío de eventos vía Conversions API (CAPI) para mitigar bloqueos de cookies de terceros.

⚙️ Configuración y Despliegue
Requisitos
Java 21 (LTS)

Stripe CLI (Para pruebas locales)

Neon Database URL

Instalación y Ejecución
Para asegurar que los cambios en los modelos y servicios se apliquen correctamente:

PowerShell
mvn clean install
mvn spring-boot:run
Pruebas de Integración (Stripe CLI)
Para simular una venta real con trazabilidad completa:

PowerShell
./stripe trigger checkout.session.completed `
  --override checkout_session:metadata.gclid="TEST_GCLID" `
  --override checkout_session:metadata.campaign="LANZAMIENTO_2026"
📈 Observabilidad
El sistema utiliza prefijos de logs para monitoreo rápido:

[SRE MONITOR]: Entrada de señales externas.

[SRE SUCCESS]: Confirmación de persistencia y envíos a APIs.

[SRE DEBUG]: Trazabilidad interna de variables.
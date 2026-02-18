# 🚀 Multi-Channel Tracking & Attribution Engine (Backend)
Este servicio es un motor de orquestación de alto rendimiento diseñado para la atribución de conversiones en tiempo real. Actúa como un middleware crítico que procesa eventos financieros de Stripe y los propaga hacia Google Ads, Meta CAPI y Pipedrive CRM.

#🏗️ Arquitectura y Patrones de Diseño
El sistema se basa en un patrón de Orquestación de Servicios con un fuerte enfoque en la Resiliencia (SRE):

Aislamiento de Fallos (Fault Isolation): Implementamos bloques try-catch independientes para cada integración. Si una API externa (ej. Pipedrive) experimenta latencia o 5xx, el flujo principal no se bloquea, garantizando la entrega de datos a los demás destinos.

Desacoplamiento: El uso de servicios especializados (GoogleAdsService, MetaCapiService) permite que la lógica de negocio del Webhook sea agnóstica a las implementaciones de bajo nivel de cada proveedor.

Seguridad Criptográfica: Validación de integridad de datos mediante el SDK oficial de Stripe (Webhook.constructEvent), asegurando que solo los eventos firmados por Stripe sean procesados.

# 🔌 Especificaciones de la API (Endpoints)
📥 Webhook de Stripe
POST /api/v1/webhooks/stripe

Recibe y procesa eventos asíncronos del ciclo de vida de pagos.

Auth: Validación vía Stripe-Signature.

Payload: JSON crudo (deserializado de forma segura).

Eventos Target: checkout.session.completed y charge.succeeded.

🧪 Requisito para Frontend (Metadata Schema)
Para una atribución exitosa, el objeto de sesión de Stripe debe contener el siguiente esquema en sus metadatos:

JSON
{
  "metadata": {
    "gclid": "string",     // Google Click ID capturado de URL
    "fbp": "string",       // Facebook Browser ID (cookie _fbp)
    "fbc": "string",       // Facebook Click ID (cookie _fbc)
    "source_url": "string" // URL donde se originó la conversión
  }
}
🛠️ Detalle de Integraciones Técnicas
🎯 Google Ads (Offline Conversions)
Mecanismo: Conversiones Offline vía gRPC/SDK de Google Ads.

Servicio: ConversionUploadService.

Lógica: Transforma el gclid y el monto de la transacción en un objeto ClickConversion. Soporta el envío de valores de conversión dinámicos y códigos de moneda configurables.

🎯 Meta Conversions API (CAPI)
Mecanismo: API de servidor (REST) para mitigar la pérdida de datos por AdBlockers y cambios de privacidad (iOS 14+).

Implementación: Uso de WebClient para comunicación no bloqueante.

Data Hashing: Procesamiento de PII (Personally Identifiable Information) antes del envío.

🎯 Pipedrive CRM
Mecanismo: Sincronización automática de ventas.

Acción: Generación de un nuevo "Deal" asignado al cliente, con el valor de la transacción y etiquetas de seguimiento.

⚙️ Configuración y Despliegue
Requisitos Previos
Java 21 (LTS)

Maven 3.9+

Google Ads Developer Token

Variables de Entorno Clave
Configurar en src/main/resources/application.properties o mediante variables de entorno:

Properties
# Google Ads
google.ads.customerId=123-456-7890
google.ads.developerToken=${ADS_DEV_TOKEN}

# Stripe
stripe.webhook.secret=whsec_...

# CRM & Meta
pipedrive.api.token=${PIPEDRIVE_TOKEN}
meta.access.token=${META_TOKEN}
📈 Observabilidad (SRE)
El backend está configurado con logging detallado para trazabilidad:

[SRE MONITOR]: Seguimiento de la entrada de eventos.

[SRE DEBUG]: Detalle del procesamiento y extracción de datos.

[SRE ERROR]: Captura de excepciones con stacktrace para debugging rápido en producción.

# 🗺️ Roadmap de Evolución Técnica
Para la fase de escalado (Scale-up) del proyecto, se proponen las siguientes mejoras arquitectónicas:

# 🟢 Fase 1: Resiliencia Avanzada y Manejo de Errores
Implementación de Idempotencia: Evitar el procesamiento duplicado de eventos de Stripe mediante un registro de Event-ID en una base de datos distribuida (Redis).

Colas de Mensajería (RabbitMQ/Kafka): Desacoplar el Webhook de los servicios de integración. El Webhook solo recibirá y encolará el mensaje, y un worker procesará las llamadas a las APIs externas de forma asíncrona.

Estrategias de Retry (Spring Retry): Configurar reintentos automáticos con Exponential Backoff para errores transitorios (503/504) en las APIs de Google y Meta.

# 🟡 Fase 2: Observabilidad y Monitoreo (SRE Stack)
Métricas con Micrometer/Prometheus: Exponer métricas de latencia de las APIs externas y tasas de éxito/error de conversiones.

Tracing Distribuido (Zipkin/Jaeger): Rastrear el flujo de una venta desde que entra el Webhook hasta que impacta en los 3 servicios externos para identificar cuellos de botella.

Dashboard de Control (Grafana): Visualización en tiempo real de las conversiones atribuidas vs. fallidas.

# 🔴 Fase 3: Seguridad y Escalabilidad
Secrets Management: Migrar las API Keys del application.properties a un gestor de secretos seguro (AWS Secrets Manager o HashiCorp Vault).

Caching de Atribución (Redis): Almacenar mapeos temporales de User-Session a GCLID para reducir la carga en la base de datos principal durante picos de tráfico.

Containerización (Docker/K8s): Dockerizar el microservicio para despliegues elásticos y orquestación en la nube.

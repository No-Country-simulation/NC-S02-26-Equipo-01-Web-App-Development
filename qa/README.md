    Objetivo General

Construir un ecommerce demo funcional que permita atraer tráfico desde Google Ads y Meta Ads, simular un proceso de compra y medir correctamente las conversiones para validar el flujo completo de adquisición y venta.

Objetivos específicos

- Crear un ecommerce demo funcional
- Implementar Google Ads y Meta Ads
- Configurar eventos de conversión
- Registrar ventas/leads en Pipedrive (Opcional)
- Validar el conteo correcto de conversiones

🧱 ETAPA 1 – Ecommerce demo
🟢 HU 1 – Landing principal

Historia

Como usuario quiero acceder a una landing clara sobre los servicios de incorporation, tax y bookkeeping para entender rápidamente la propuesta de valor

Criterios de aceptación

- La landing explica los servicios ofrecidos ✅
- Existe un CTA visible (Comprar / Contactar) ✅
- La página carga correctamente en desktop y mobile ✅

🟢 HU 2 – Selección de servicio (demo)

Historia

Como usuario quiero seleccionar un servicio desde el ecommerce demo para iniciar el proceso de compra

Criterios de aceptación

- El usuario puede elegir al menos un servicio ✅
- El precio se muestra de forma clara ✅
- Existe un botón para continuar al checkout ✅

🟢 HU 3 – Checkout demo

Historia

Como usuario quiero completar un checkout demo para simular una compra del servicio

Criterios de aceptación

- El checkout solicita información básica ✅
- Existe una acción clara de “Finalizar compra” ✅
- El flujo no genera errores bloqueantes ✅

🧱 ETAPA 2 – Registro de conversión y CRM
🟢 HU 4 – Registro de compra en Pipedrive (Confirmar)

Historia

Como equipo comercial quiero que cada compra demo se registre en Pipedrive para simular el seguimiento del cliente

Criterios de aceptación

- Cada compra genera un registro en Pipedrive
- El registro contiene:
- Servicio seleccionado
- Datos básicos del usuario

El estado inicial es “Venta creada”

🧱 ETAPA 3 – Implementación Google Ads
🟢 HU 5 – Configuración de conversiones Google Ads

Historia

Como equipo de marketing quiero registrar una conversión cuando un usuario finaliza la compra demo para medir el rendimiento de Google Ads

Criterios de aceptación

- Existe un evento de conversión definido
- El evento se dispara solo al completar el flujo
- Google Ads recibe correctamente la conversión

🧱 ETAPA 4 – Implementación Meta Ads
🟢 HU 6 – Evento Purchase en Meta Ads

Historia

Como equipo de marketing quiero registrar el evento “Purchase” en Meta Ads para optimizar campañas publicitarias

Criterios de aceptación

- El pixel de Meta está correctamente instalado
- El evento Purchase se dispara al finalizar la compra demo
- No se registran eventos duplicados

🧱 ETAPA 5 – Validación y control
🟡 HU 7 – Validación del conteo de conversiones

Historia

Como Product Owner quiero validar que las conversiones se registran correctamente para asegurar la confiabilidad del demo

Criterios de aceptación

- Se puede verificar el evento en Google y Meta
- Se valida que cada conversión corresponde a una acción real
- No se detectan conversiones falsas o incompletas

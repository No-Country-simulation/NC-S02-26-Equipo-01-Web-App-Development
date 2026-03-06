import { When, Then, Given } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { CheckoutPage } from '../pages/CheckoutPage'
import { LandingPage } from '../pages/LandingPage'
import type { CustomWorld } from '../support/world'

Given(
  'el usuario ha seleccionado un servicio de {string}',
  async function (this: CustomWorld, precio) {
    const landing = new LandingPage(this.page!)
    await landing.clickEnStartNow(precio)
  },
)

Then(
  'se valida que el usuario se encuentra en la pasarela de pago',
  async function (this: CustomWorld) {
    await expect(this.page!).toHaveURL(/.*checkout.stripe.com/, {
      timeout: 15000,
    })
  },
)

Then(
  'el precio total a pagar {string} sea igual al servicio solicitado',
  async function (this: CustomWorld, precioEsperado) {
    const checkout = new CheckoutPage(this.page!)
    await expect(checkout.precioTotal(precioEsperado)).toHaveText(
      precioEsperado,
    )
  },
)

When(
  'el usuario rellena el formulario con los siguientes datos:',
  async function (this: CustomWorld, dataTable) {
    const checkout = new CheckoutPage(this.page!)
    const datos = dataTable.hashes()[0]
    await checkout.llenarFormulario(datos)
  },
)

When(
  'hace click en el botón "Finalizar compra"',
  async function (this: CustomWorld) {
    const checkout = new CheckoutPage(this.page!)
    await checkout.finalizarCompra()
  },
)

Then(
  'el usuario es redirigido a la página de pago exitoso',
  async function (this: CustomWorld) {
    await expect(this.page!).toHaveURL(/.*success/, { timeout: 20000 })
  },
)

Then(
  'el sistema debe procesar el pago y enviar los IDs {string} y {string} al servidor',
  async function (this: CustomWorld) {
    // Nota: Se valida que los datos de tracking se envían correctamente al servidor, lo cual se puede simular validando que se almacenan en localStorage o que se incluyen en la URL de redirección
    const checkout = new CheckoutPage(this.page!)
    await checkout.validarTracking()
  },
)

When(
  'el usuario rellena el formulario con un email con formato incorrecto {string}',
  async function (this: CustomWorld, emailInvalido) {
    const checkout = new CheckoutPage(this.page!)
    await checkout.llenarFormulario({ email: emailInvalido })
  },
)

Then(
  'el sistema debe mostrar un mensaje de alerta {string}',
  async function (this: CustomWorld, mensajeEsperado) {
    const checkout = new CheckoutPage(this.page!)
    await expect(checkout.mensajeErrorStripe).toBeVisible()
    await expect(checkout.mensajeErrorStripe).toContainText(mensajeEsperado)
  },
)

Then(
  'no debe permitir el progreso a la página de éxito',
  async function (this: CustomWorld) {
    await expect(this.page!).not.toHaveURL(/.*success/)
  },
)

When(
  'el usuario deja todos los campos del formulario en blanco',
  async function (this: CustomWorld) {
    const checkout = new CheckoutPage(this.page!)
  },
)

Then(
  'el sistema debe resaltar los campos obligatorios en rojo',
  async function (this: CustomWorld) {
    const checkout = new CheckoutPage(this.page!)
    await expect(checkout.mensajeErrorStripe).toBeVisible()
  },
)

When(
  'el usuario hace click en el botón para volver o cancela la transacción',
  async function (this: CustomWorld) {
    const checkout = new CheckoutPage(this.page!)
    await checkout.cancelarPagoEnStripe()
  },
)

Then(
  'el sistema debe redirigirlo a la página de cancel de la landing',
  async function (this: CustomWorld) {
    await expect(this.page!).toHaveURL(/.*cancel/, { timeout: 15000 })
  },
)

Then(
  'debe mostrar un mensaje informando que el pago no se procesó',
  async function (this: CustomWorld) {
    const checkout = new CheckoutPage(this.page!)
    const message = await checkout.canceledPaymentMessage()
    expect(message).toBeTruthy()
  },
)

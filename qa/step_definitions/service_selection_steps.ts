import { When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { LandingPage } from '../pages/LandingPage'
import type { CustomWorld } from '../support/world'

When(
  'el usuario navega hasta la sección de planes',
  async function (this: CustomWorld) {
    const landing = new LandingPage(this.page!)
    await landing.seccionPlanes.scrollIntoViewIfNeeded()
  },
)

Then(
  'se deben visualizar los precios de los servicios',
  async function (this: CustomWorld) {
    const landing = new LandingPage(this.page!)
    const card = landing.obtenerPrecioPlan('499')
    await expect(card).toBeVisible()
  },
)

When(
  'el usuario hace click en el botón "Start Now" del plan {string}',
  async function (this: CustomWorld, precio) {
    const landing = new LandingPage(this.page!)
    await landing.clickEnStartNow(precio)
  },
)

Then(
  'el usuario es redirigido a la página de pago',
  async function (this: CustomWorld) {
    await expect(this.page!).toHaveURL(/.*checkout/)
  },
)

When(
  'el usuario visualiza un plan sin precio definido',
  async function (this: CustomWorld) {
    const landing = new LandingPage(this.page!)
    const selectorSinPrecio = landing.obtenerPrecioPlan('')
    const cantidad = await selectorSinPrecio.count()
    if (cantidad === 0) {
      throw new Error(
        '❌ TEST FALLIDO: Se esperaba encontrar al menos un plan sin precio para probar la validación, pero todos los planes tienen precio en el frontend.',
      )
    }
    if (cantidad > 1) {
      console.warn(
        `⚠️ Advertencia: Se encontraron ${cantidad} elementos. Validando solo el primero...`,
      )
    }
    await expect(selectorSinPrecio.first()).toBeVisible()
  },
)

When('intenta hacer click en "Start Now"', async function (this: CustomWorld) {
  const landing = new LandingPage(this.page!)
  await landing.clickEnStartNow('')
})

Then(
  'el sistema debe bloquear la redirección al checkout',
  async function (this: CustomWorld) {
    await expect(this.page!).not.toHaveURL(/.*checkout/)
  },
)

Then(
  'debe mostrar un aviso de {string}',
  async function (this: CustomWorld, mensaje) {
    const landing = new LandingPage(this.page!)
    await expect(landing.mensajeErrorPrecio).toBeVisible()
    await expect(landing.mensajeErrorPrecio).toHaveText(mensaje)
  },
)

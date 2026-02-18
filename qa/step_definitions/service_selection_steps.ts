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
    await expect(landing.obtenerPrecioPlan('$499')).toContainText('$')
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
    await expect(landing.obtenerPrecioPlan('')).toHaveText('')
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

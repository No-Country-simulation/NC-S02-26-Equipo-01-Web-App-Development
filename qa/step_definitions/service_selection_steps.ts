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
    const card = landing.obtenerPrecioPlan('899')
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
  'el usuario es redirigido a la pasarela de pago',
  async function (this: CustomWorld) {
    await expect(this.page!).toHaveURL(/.*checkout.stripe.com/, {
      timeout: 15000,
    })
  },
)

import { When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { LandingPage } from '../pages/LandingPage'
import type { CustomWorld } from '../support/world'

When(
  'el usuario visualiza las opciones del menú',
  async function (this: CustomWorld) {
    const landing = new LandingPage(this.page!)
    await expect(landing.menuNavegacion).toBeVisible()
  },
)

When(
  'el usuario hace click en la opción "Services" del menú',
  async function (this: CustomWorld) {
    const landing = new LandingPage(this.page!)
    await landing.clickEnServices()
  },
)

Then(
  'se deben visualizar los detalles de {string}, {string} y {string}',
  async function (this: CustomWorld, s1: string, s2: string, s3: string) {
    const landing = new LandingPage(this.page!)
    const servicios = [s1, s2, s3]

    for (const nombre of servicios) {
      const card = landing.obtenerCardServicio(nombre)
      const count = await card.count()
      if (count === 0) {
        throw new Error(
          `Se esperaba ver la card del servicio "${nombre}" pero no existe en el DOM`,
        )
      }
      await expect(card).toHaveCount(1)
      await expect(card).toBeVisible()
    }
  },
)

Then(
  'no se visualizan los servicios {string}, {string} y {string}',
  async function (this: CustomWorld, s1: string, s2: string, s3: string) {
    const landing = new LandingPage(this.page!)
    const servicios = [s1, s2, s3]

    for (const nombre of servicios) {
      const card = landing.obtenerCardServicio(nombre)
      const count = await card.count()
      if (count === 0) {
        continue
      }
      await expect(card).not.toBeVisible()
    }
  },
)

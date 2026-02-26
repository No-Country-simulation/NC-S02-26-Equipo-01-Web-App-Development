import { When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { LandingPage } from '../pages/LandingPage'
import type { CustomWorld } from '../support/world'
import { devices } from '@playwright/test'

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
          `❌ Advertencia: Se esperaba ver la card del servicio "${nombre}" pero no existe en el DOM`,
        )
      }
      await expect(card).toHaveCount(1)
      await expect(card).toBeVisible()
    }
  },
)

When(
  'el usuario accede desde un dispositivo {string}',
  async function (this: CustomWorld, dispositivo: string) {
    await this.page!.setViewportSize(devices[dispositivo].viewport)
    // Navegamos de nuevo para que el CSS cargue el modo móvil
    await this.page!.goto(
      process.env.FRONTEND_URL || 'https://taxservices.vercel.app/',
    )
  },
)

When(
  'el usuario hace click en el menú hamburguesa',
  async function (this: CustomWorld) {
    const landing = new LandingPage(this.page!)
    await landing.abrirMenuMovil()
  },
)

Then(
  'los servicios deben estar apilados verticalmente y ser legibles',
  async function (this: CustomWorld) {
    const landing = new LandingPage(this.page!)
    const services = await landing.verificarDisposicionVertical()

    expect(
      services,
      '❌ Advertencia: Los servicios no están correctamente alineados en vertical',
    ).toBe(true)
  },
)

import { Given } from '@cucumber/cucumber'
import { BasePage } from '../pages/BasePage'
import type { CustomWorld } from '../support/world'
import { expect } from 'playwright/test'

Given(
  'que el usuario navega a la landing principal con {string}',
  async function (this: CustomWorld, query) {
    const localBase =
      process.env.FRONTEND_URL || 'https://taxservices.vercel.app/'
    await this.page!.goto(`${localBase}${query}`)
    console.log(`🚀 Navegando a: ${localBase}${query}`)
  },
)

Given(
  'los datos de tráfico se almacenan correctamente en el sistema',
  async function (this: CustomWorld) {
    const basePage = new BasePage(this.page!)
    const { localGclid, localFbclid } = await basePage.validarTracking()

    const url = new URL(this.page!.url())
    const gclidEsperado = url.searchParams.get('gclid')
    const fbclidEsperado = url.searchParams.get('fbclid')

    expect(localGclid).toBe(gclidEsperado)
    expect(localFbclid).toBe(fbclidEsperado)
  },
)

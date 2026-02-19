import { Given } from '@cucumber/cucumber'
import { BasePage } from '../pages/BasePage'
import type { CustomWorld } from '../support/world'
import path from 'path'

Given(
  'que el usuario navega a la landing principal con {string}',
  async function (this: CustomWorld, query) {
    const localBase = process.env.LOCAL_BASE_URL || 'http://localhost:5173/'
    await this.page!.goto(`${localBase}${query}`)
    console.log(`🚀 Navegando a: ${localBase}${query}`)
  },
)

Given(
  'los datos de tráfico se almacenan correctamente en el sistema',
  async function (this: CustomWorld) {
    const basePage = new BasePage(this.page!)
    await basePage.validarTracking('g_123', 'f_456')
  },
)

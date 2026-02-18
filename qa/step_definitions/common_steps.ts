import { Given } from '@cucumber/cucumber'
import { BasePage } from '../pages/BasePage'
import type { CustomWorld } from '../support/world'
import path from 'path'

Given(
  'que el usuario navega a la landing principal con {string}',
  async function (this: CustomWorld, query) {
    // Soporte para mocks servidos por HTTP local (MOCK_BASE_URL) o fallback a file://
    const mockBase = process.env.MOCK_BASE_URL

    if (mockBase) {
      // Esperamos que MOCK_BASE_URL incluya el path al recurso (por ejemplo: http://localhost:3000/landing.html)
      await this.page!.goto(`${mockBase}${query}`)
    } else {
      // Fallback: abrir el HTML local directamente
      const rutaArchivo = path.resolve(__dirname, '../mocks/landing.html')
      await this.page!.goto(`file://${rutaArchivo}${query}`)
    }
  },
)

Given(
  'los datos de tráfico se almacenan correctamente en el sistema',
  async function (this: CustomWorld) {
    const basePage = new BasePage(this.page!)
    await basePage.validarTracking('g_123', 'f_456')
  },
)

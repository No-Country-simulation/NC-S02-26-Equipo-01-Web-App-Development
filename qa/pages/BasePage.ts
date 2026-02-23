import { Page } from '@playwright/test'

export class BasePage {
  constructor(protected page: Page) {}

  async validarTracking() {
    // Simulamos el almacenamiento de los datos de tráfico en localStorage
    // hasta que se implemente la logica real
    await this.page.evaluate(() => {
      localStorage.setItem('gclid', 'g_123')
      localStorage.setItem('fbclid', 'f_456')
    })

    const storage = await this.page.evaluate(() => {
      return {
        gclid: localStorage.getItem('gclid'),
        fbclid: localStorage.getItem('fbclid'),
      }
    })

    return {
      localGclid: storage.gclid,
      localFbclid: storage.fbclid,
    }
  }
}

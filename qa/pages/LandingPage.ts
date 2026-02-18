import { BasePage } from './BasePage'

export class LandingPage extends BasePage {
  private navMenu = this.page.locator('[data-testid="main-nav"]')
  private btnServices = this.page.locator('[data-testid="nav-services"]')
  private planesSection = this.page.locator('[data-testid="pricing-section"]')
  private priceErrorMessage = this.page.locator('[data-testid="price-error"]')

  get menuNavegacion() {
    return this.navMenu
  }

  async clickEnServices() {
    await this.btnServices.click()
  }

  obtenerCardServicio(nombreServicio: string) {
    return this.page.locator(
      `[data-testid="services-section"]:has-text("${nombreServicio}")`,
    )
  }

  get seccionPlanes() {
    return this.planesSection
  }

  obtenerPrecioPlan(monto: string) {
    if (monto === '') {
      return this.page
        .locator('[data-testid="price-amount"]')
        .filter({ hasText: /^$/ })
    }
    return this.page.locator(
      `[data-testid="price-amount"]:has-text("${monto}")`,
    )
  }

  async clickEnStartNow(precio: string) {
    // Usamos un Regex para que la coincidencia sea exacta.
    // Si precio es "$499", buscará exactamente "$499".
    // Si precio es "", buscará una card que tenga un elemento con texto vacío.

    const card = this.page.locator('[data-testid="plan-card"]').filter({
      has: this.page.locator('[data-testid="price-amount"]', {
        hasText: precio === '' ? /^$/ : precio,
      }),
    })

    // Ahora 'card' es única, y podemos hacer click en su botón
    await card.locator('[data-testid="btn-start"]').click()
  }

  get mensajeErrorPrecio() {
    return this.priceErrorMessage
  }
}

import { BasePage } from './BasePage'

export class LandingPage extends BasePage {
  private readonly navMenu = this.page.locator('[data-testid="app-navbar"]')
  private readonly btnServices = this.page.locator(
    '[data-testid="nav-link-services"]',
  )
  private readonly servicesSection = this.page.locator(
    '[data-testid="app-section-everything-business"]',
  )
  private readonly pricingSection = this.page.locator(
    '[data-testid="app-section-simple-pricing"]',
  )
  private readonly priceErrorMessage = this.page.locator(
    '[data-testid="price-error"]',
  )
  private readonly buttonPricingLocator = this.page.locator(
    '[data-testid^="app-button-pricing-"]',
  )

  get menuNavegacion() {
    return this.navMenu
  }

  async clickEnServices() {
    await this.btnServices.click()
  }

  obtenerCardServicio(nombreServicio: string) {
    return this.servicesSection.filter({ hasText: nombreServicio })
  }

  get seccionPlanes() {
    return this.pricingSection
  }

  obtenerPrecioPlan(monto: string) {
    const cards = this.pricingSection.locator(
      'div[data-testid^="app-card-pricing-"]',
    )
    if (monto === '') {
      return cards.filter({ hasNotText: /[0-9]/ })
    }
    return cards.filter({ hasText: new RegExp(monto) })
  }

  async clickEnStartNow(precio: string) {
    const card =
      precio === ''
        ? this.pricingSection
            .locator('div[data-testid^="app-card-pricing-"]')
            .filter({ hasNotText: '' })
        : this.obtenerPrecioPlan(precio)

    const btnByTestId = card.locator(this.buttonPricingLocator)
    await card.first().waitFor()

    if ((await btnByTestId.count()) > 0) {
      await btnByTestId.first().click()
    } else {
      await card.locator('button:has-text("Start Now")').first().click()
    }
  }

  get mensajeErrorPrecio() {
    return this.priceErrorMessage
  }
}

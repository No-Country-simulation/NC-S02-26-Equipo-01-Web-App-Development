import { BasePage } from './BasePage'

export class LandingPage extends BasePage {
  private readonly navMenu = this.page.locator('[data-testid="app-navbar"]')
  private readonly servicesBtn = this.page.locator(
    '[data-testid="nav-link-services"], [data-testid="nav-link-services-mobile"]',
  )
  private readonly hamburgerBtn = this.page.locator(
    '[data-testid="nav-toggle"]',
  )
  private readonly servicesSection = this.page.locator(
    '[data-testid="app-section-everything-business"]',
  )
  private readonly cardsServicios = this.servicesSection.locator(
    'div[data-testid^="app-card-service-"]',
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
    await this.servicesBtn.filter({ visible: true }).first().click()
  }

  obtenerCardServicio(nombreServicio: string) {
    return this.servicesSection.filter({ hasText: nombreServicio })
  }

  get seccionPlanes() {
    return this.pricingSection
  }

  async abrirMenuMovil() {
    if (await this.hamburgerBtn.isVisible()) {
      await this.hamburgerBtn.click()
    }
  }

  async verificarDisposicionVertical(): Promise<boolean> {
    const cards = this.cardsServicios.filter({ visible: true })
    const count = await cards.count()

    if (count === 0) throw new Error('No se detectaron servicios visibles')

    for (let i = 0; i < count - 1; i++) {
      const box1 = await cards.nth(i).boundingBox()
      const box2 = await cards.nth(i + 1).boundingBox()

      if (box1 && box2) {
        // Verificamos disposición vertical:
        // El inicio del siguiente debe ser mayor o igual al final del anterior
        if (box2.y < box1.y + box1.height / 2) {
          console.error(`Fallo de layout entre servicio ${i} y ${i + 1}`)
          return false
        }
      }
    }
    return true // Todo en orden
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

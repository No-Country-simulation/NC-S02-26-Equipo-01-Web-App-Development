import { BasePage } from './BasePage'

export class CheckoutPage extends BasePage {
  private inputEmail = this.page.locator('input#email')
  private inputName = this.page.locator('input#billingName')
  private stripeErrorMessage = this.page.locator(
    '[data-qa="EmptyFieldError"], [role="alert"]',
  )

  private stripeTotalAmount = this.page.locator('#ProductSummary-totalAmount')

  private inputCardNumber = this.page.locator(
    '#cardNumber, input[name="cardnumber"]',
  )
  private inputCardExpiry = this.page.locator(
    '#cardExpiry, input[name="exp-date"]',
  )
  private inputCardCvc = this.page.locator('#cardCvc, input[name="cvc"]')
  private btnSubscribe = this.page.locator(
    'button[data-testid="hosted-payment-submit-button"]',
  )
  private btnBack = this.page.locator('[data-testid="business-link"]')
  private titleCanceled = this.page.locator('h1', {
    hasText: 'Payment Canceled',
  })

  get precioTotal() {
    return this.stripeTotalAmount
  }
  get mensajeErrorStripe() {
    return this.stripeErrorMessage
  }

  async cancelarPagoEnStripe() {
    await this.btnBack.waitFor({ state: 'visible', timeout: 10000 })
    await this.btnBack.click()
  }

  async canceledPaymentMessage() {
    await this.titleCanceled.waitFor({ state: 'visible', timeout: 5000 })
    return await this.titleCanceled.isVisible()
  }

  async llenarFormulario(datos: any) {
    await this.inputEmail.waitFor({ state: 'visible' })

    if (datos.email) await this.inputEmail.fill(datos.email)
    if (datos.name) await this.inputName.fill(datos.name)

    if (datos.card_number) {
      await this.inputCardNumber.click()
      await this.inputCardNumber.pressSequentially(datos.card_number, {
        delay: 50,
      })
    }

    if (datos.expiry) await this.inputCardExpiry.fill(datos.expiry)
    if (datos.cvc) await this.inputCardCvc.fill(datos.cvc)
  }

  async finalizarCompra() {
    await this.btnSubscribe.click()
  }
}

import { BasePage } from './BasePage'

export class CheckoutPage extends BasePage {
  private inputEmail = this.page.locator('#email')
  private inputName = this.page.locator('#billingName')
  private btnSubscribe = this.page.locator(
    'button:has-text("Finalizar compra"), button:has-text("Subscribe"), [data-testid="btn-finalizar"], [data-testid="btn-subscribe"]',
  )
  private stripeTotalAmount = this.page.locator(
    '.Checkout-totalAmount, [data-testid="total-amount-text"]',
  )

  // Selector del IFRAME de Stripe (el contenedor)
  private stripeFrame = this.page.frameLocator(
    'iframe[title*="Secure card payment input frame"]',
  )
  private stripeErrorMessage = this.page.locator(
    '#error-message, .ErrorMessage, [role="alert"]',
  )

  // Selectores DENTRO del iframe
  private inputCardNumber = this.stripeFrame.locator('#cardNumber')
  private inputCardExpiry = this.stripeFrame.locator('#cardExpiry')
  private inputCardCvc = this.stripeFrame.locator('#cardCvc')

  get precioTotal() {
    return this.stripeTotalAmount
  }

  async llenarFormulario(datos: any) {
    if (datos.email) await this.inputEmail.fill(datos.email)
    if (datos.name) await this.inputName.fill(datos.name)

    // Nota: Stripe a veces requiere que escribas los números con un pequeño delay
    if (datos.card_number) await this.inputCardNumber.fill(datos.card_number)
    if (datos.expiry) await this.inputCardExpiry.fill(datos.expiry)
    if (datos.cvc) await this.inputCardCvc.fill(datos.cvc)
  }

  async campoTieneError(nombreCampo: 'number' | 'expiry' | 'cvc') {
    const selector = {
      number: '#cardNumber',
      expiry: '#cardExpiry',
      cvc: '#cardCvc',
    }[nombreCampo]

    const input = this.stripeFrame.locator(selector)
    // Nota: stripe suele usar clases como ".StripeElement--invalid" o atributos aria
    return await input.getAttribute('class')
  }

  get mensajeErrorStripe() {
    return this.stripeErrorMessage
  }

  async finalizarCompra() {
    await this.btnSubscribe.click()
  }
}

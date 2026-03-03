import {
  Before,
  After,
  Status,
  BeforeAll,
  AfterAll,
  setDefaultTimeout,
} from '@cucumber/cucumber'
import { chromium, Browser } from 'playwright'
import { CustomWorld } from './world'

let browser: Browser

BeforeAll(async function () {
  browser = await chromium.launch({
    headless: true,
    args: [
      '--disable-blink-features=AutomationControlled', // disable-blink-features ayuda a que el navegador no se auto-identifique como controlado.
      '--disable-notifications', // Bloquea los popups de notificaciones de Chrome
      '--disable-geolocation', // Bloquea peticiones de ubicación
      '--disable-web-security', // Apaga el bloqueo CORS tradicional
      '--disable-features=IsolateOrigins,site-per-process,BlockInsecurePrivateNetworkRequests', // Apaga el bloqueo de "Internet público hacia Localhost"
    ],
  })
})

setDefaultTimeout(40 * 1000) // Aumentamos un poco por la carga pesada de Stripe

Before(async function (this: CustomWorld) {
  // Configuramos un User-Agent humano y localización de Chile.
  this.context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 720 },
    locale: 'es-CL',
    timezoneId: 'America/Santiago',
    // Si Vercel o Stripe piden algo, Playwright dice "Sí" automáticamente
    permissions: [
      'notifications',
      'geolocation',
      'clipboard-read',
      'clipboard-write',
    ],
  })

  // Script de Stealth para eliminar la propiedad 'webdriver'.
  // Esto es vital para que Stripe no bloquee la generación de la sesión.
  await this.context.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', {
      get: () => undefined,
    })
  })

  this.page = await this.context.newPage()
})

After(async function (this: CustomWorld, scenario: any) {
  if (scenario.result?.status === Status.FAILED) {
    if (this.page) {
      const screenshot = await this.page.screenshot()
      this.attach(screenshot, 'image/png')
    }
  }

  if (this.page) await this.page.close()
  if (this.context) await this.context.close()
})

AfterAll(async function () {
  await browser.close()
})

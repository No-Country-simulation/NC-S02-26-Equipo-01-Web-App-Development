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
  // Se ejecuta una sola vez al iniciar toda la suite
  browser = await chromium.launch({ headless: true })
})

setDefaultTimeout(30 * 1000) // Aumentamos el timeout por defecto a 30 segundos para evitar fallos por tiempos de espera cortos

Before(async function (this: CustomWorld) {
  // Crea un contexto limpio para cada escenario (limpia cookies/cache)
  this.context = await browser.newContext()
  this.page = await this.context.newPage()
})

After(async function (this: CustomWorld, scenario: any) {
  // Lógica de Soporte: Si el test falla, adjuntamos evidencia al reporte
  if (scenario.result?.status === Status.FAILED) {
    if (this.page) {
      const screenshot = await this.page.screenshot()
      this.attach(screenshot, 'image/png')
    }
  }

  // Cerramos para liberar memoria
  if (this.page) await this.page.close()
  if (this.context) await this.context.close()
})

AfterAll(async function () {
  await browser.close()
})

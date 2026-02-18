import { Page, expect } from '@playwright/test'

export class BasePage {
  constructor(protected page: Page) {}

  async validarTracking(gclid: string, fbclid: string) {
    const localGclid = await this.page.evaluate(() =>
      localStorage.getItem('gclid'),
    )
    const localFbclid = await this.page.evaluate(() =>
      localStorage.getItem('fbclid'),
    )
    expect(localGclid).toBe(gclid)
    expect(localFbclid).toBe(fbclid)
  }
}

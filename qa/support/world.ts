import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber'
import type { BrowserContext, Page } from 'playwright'

export interface CustomWorld extends World {
  context?: BrowserContext
  page?: Page
}

export class MyWorld extends World implements CustomWorld {
  constructor(options: IWorldOptions) {
    super(options)
  }
}

setWorldConstructor(MyWorld)

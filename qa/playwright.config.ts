import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true, // Ejecuta tests en paralelo para ganar velocidad
  retries: 2, // Si un test falla (por ejemplo, por red), lo intenta 2 veces más
  reporter: [['html'], ['junit', { outputFile: 'reports/results.xml' }]],
  use: {
    baseURL: 'https://tu-landing-legal.com', // URL base para los goto()
    trace: 'on-first-retry', // Graba un video/traza si el test falla al primer intento
    screenshot: 'only-on-failure', // Captura pantalla solo si falla
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})

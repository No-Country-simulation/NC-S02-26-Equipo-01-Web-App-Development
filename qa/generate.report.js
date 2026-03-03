const reporter = require('cucumber-html-reporter')
const fs = require('fs')
const path = require('path')

const reportDir = path.join(__dirname, 'reports')
const jsonFile = path.join(reportDir, 'cucumber_report.json')
const htmlFile = path.join(reportDir, 'cucumber_report.html')

// Si el reporte HTML viejo existe, lo borramos
if (fs.existsSync(htmlFile)) {
  try {
    fs.unlinkSync(htmlFile)
    console.log(
      '>>> [QA INFO] Reporte antiguo eliminado para evitar duplicados.',
    )
  } catch (err) {
    console.error('>>> [QA WARN] No se pudo borrar el reporte anterior:', err)
  }
}

// Verificación del JSON (Materia prima)
if (!fs.existsSync(jsonFile)) {
  console.error(`\n❌ ERROR: No se encontró el archivo JSON en: ${jsonFile}`)
  process.exit(1)
}

const options = {
  theme: 'bootstrap',
  jsonFile: jsonFile,
  output: htmlFile, // Siempre usará el mismo nombre, sobrescribiendo el puntero
  reportSuiteAsScenarios: true,
  launchReport: true, // Esto lo abrirá automáticamente en tu Chrome
  metadata: {
    'App Version': '1.0.0',
    'Test Environment': 'STAGING',
    'Browser': 'Chrome',
    'Platform': 'Windows 11',
  },
}

reporter.generate(options)

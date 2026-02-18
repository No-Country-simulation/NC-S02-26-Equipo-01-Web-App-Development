module.exports = {
  default: {
    formatOptions: { snippetInterface: 'async-await' },
    paths: ['features/*.feature'],
    require: ['step_definitions/**/*.ts', 'support/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: [
      'progress-bar',
      'json:reports/cucumber-report.json',
      'html:cucumber-report.html',
      'junit:reports/junit_report.xml',
    ],
  },
}

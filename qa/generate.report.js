import { generate } from 'cucumber-html-reporter'

const options = {
  theme: 'bootstrap',
  jsonFile: 'reports/cucumber_report.json',
  output: 'reports/cucumber_report.html',
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: {
    'App Version': '1.0.0',
    'Test Environment': 'STAGING',
    'Browser': 'Chrome',
    'Platform': 'Windows 11',
  },
}

generate(options)

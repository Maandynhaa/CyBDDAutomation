import { defineConfig } from 'cypress'
import createBundler from '@bahmutov/cypress-esbuild-preprocessor'
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor'
import createEsbuildPlugin from '@badeball/cypress-cucumber-preprocessor/esbuild'
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {

  require('cypress-terminal-report/src/installLogsPrinter')(on);

  await addCucumberPreprocessorPlugin(on, config)

  on(
    'file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    })
  )
  allureWriter(on, config);

  
  return config
}


export default defineConfig({
  e2e: {
    specPattern: '**/*.feature',
    setupNodeEvents,
    env: {
      allureReuseAfterSpec: true,
    },
  },
})
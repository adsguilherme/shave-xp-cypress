const { defineConfig } = require("cypress")

const { removeUser } = require('./cypress/support/tasks/database')

require('dotenv/config')

module.exports = defineConfig({
  e2e: {
    watchForFileChanges: false,
    env : { 
      requestMode : true,
      snapshotOnly: true
    },  
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
      on('task', {
        removeUser
      })

      return Object.assign({}, config, {
        env: {
          app_web_url: process.env.APP_WEB_URL,
          app_api_url: process.env.APP_API_URL,
          auth_api_helper_url: process.env.APP_API_HELPER_URL,
        }
      })
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
    baseUrl: process.env.APP_WEB_URL
  },
})

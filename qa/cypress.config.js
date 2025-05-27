const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl:'https://software-testing-project-o55d.vercel.app/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

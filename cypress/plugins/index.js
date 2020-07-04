/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const XLSX = require('xlsx');
const fs = require('fs');
/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('task',{
    writeFile(filePath, content) {
      console.log('abc');
       fs.writeFile(filePath,
        content, function (err) {
          if (err) {
            console.log(err);
          } else {
            return null;
          }
        })
        return null
    },
    readFile(filename) {
      if (fs.existsSync(filename)) {
        return XLSX.readFile(filename)
      }
      return 'no file:' + filename;
    }
  })
}

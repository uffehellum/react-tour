var getBabelRelayPlugin = require('babel-relay-plugin') // require.resolve('babel-plugin-relay') //
var schemaData = require('./data/schema.json').data
module.exports = getBabelRelayPlugin(schemaData, {
    abortOnError: true
})

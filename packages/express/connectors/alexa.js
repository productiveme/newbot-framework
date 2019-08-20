const alexa = require("alexa-app")
const _ = require('lodash')
const Session = require('newbot-formats/session/alexa')
const output = require('../output')

module.exports = function ({
    app,
    settings,
    converse
}) {
    const isProd = process.env.NODE_ENV == 'production'
    const alexaApp = new alexa.app(settings.path || 'alexa')

    alexaApp.express({
        expressApp: app,
        checkCert: isProd
    })

    const exec = (req, res) => {
        const session = new Session(req, res)
        const { userId } = req.data.session
        const text = req.slot('any')
        const _converse = global.converse || converse
        return _converse.exec(text, userId, output(session, settings))
    }

    alexaApp.launch(exec)
    alexaApp.intent('AMAZON.StopIntent', exec)
    alexaApp.intent("NewBotIntent", exec)
}
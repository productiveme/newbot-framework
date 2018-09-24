const LANGS_ID = ['fr_FR', 'en_EN']

class Utils {
    
    _is(session, platform) {
        const { source } = session.message
        return source === platform
    }
    
    isFacebook(session) {
        return this._is(session, 'facebook') || this._is(session, 'messenger')
    }

    isViber(session) {
        return this._is(session, 'viber')
    }

    isSlack(session) {
        return this._is(session, 'slack')
    }

    isTelegram(session) {
        return this._is(session, 'telegram')
    }

    isLine(session) {
        return this._is(session, 'line')
    }

    isBottender(session) {
        return session.message.agent === 'bottender'
    }

    isBotBuilder(session) {
        return session.message.agent === 'botbuilder'
    }

    isBotBuilderFacebook(session) {
        return this.isFacebook(session) && this.isBotBuilder(session)
    }

    /* Botrender */
    isBottenderViber(session) {
        return this.isViber(session) && this.isBottender(session)
    }

    isBottenderFacebook(session) {
        return this.isFacebook(session) && this.isBottender(session)
    }

    isBottenderSlack(session) {
        return this.isSlack(session) && this.isBottender(session)
    }

    isBottenderTelegram(session) {
        return this.isTelegram(session) && this.isBottender(session)
    }

    isBottenderLine(session) {
        return this.isLine(session) && this.isBottender(session)
    }
    /** */

    isWebSite(session) {
        return session.message.source === 'website'
    }

    getByLang(prop, user) {
        const lang = user.getLang()
        if (prop && lang) {
            if (prop[lang]) {
                return prop[lang]
            }
            else if (prop[this.defaultLanguage]) {
                return prop[this.defaultLanguage]
            }
            else {
                const [lang] = Object.keys(prop)
                if (LANGS_ID.indexOf(lang) != -1) {
                    return prop[lang]
                }
            }
        }
        return prop
    }

    toByLang(obj, user) {
        for (let prop in obj) {
            obj[prop] = this.getByLang(obj[prop], user)
        }
        return obj
    }
}

module.exports = new Utils()
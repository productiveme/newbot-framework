const builder = require('botbuilder')
const Utils = require('../utils')
const { heroCard } = require('./hero-card')

function buttons(session, text, buttons, user) {
    const card = heroCard(session, {
        buttons
    }, user)

    if (Utils.isWebSite(session)) {
        return {
            text,
            buttons
        }
    }

    const facebook = {
        attachment: {
            type: 'template',
            payload: {
                template_type: 'button',
                text,
                buttons: card.buttons
            }
        }
    }

    if (Utils.isBotBuilderFacebook(session)) {
        return new builder.Message(session)
            .sourceEvent({
                facebook
            })
    }
    else if (Utils.isFacebook(session)) {
        return facebook
    }

    return new builder.Message(session)
        .text(text)
        .addAttachment(card)
}

module.exports = {
    buttons,
    format(converse) {
        converse.format('buttons', (text, [_buttons], { session }, user) => {
            return buttons(session, text, _buttons, user)
        })        
    }
}
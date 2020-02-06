const assert = require('assert')
const { ConverseTesting } = require('../../index')
const { train } = require('../../packages/train')
const { LangFr } = require('@nlpjs/lang-fr');

describe('Test Native NLP', () => {
    let converse, user

    async function code(str, options = {}) {
        converse = new ConverseTesting({
            code: str,
            ...options
        })
        const model = await train(converse, [LangFr])
        await converse.setModelNlp(model, [LangFr])
        user = converse.createUser()
    }

    it('Test native NLP', async () => {
       await code(`
            @Intent('hello', [
                'hello',
                'yo'
            ])
            hello() {
                > Hey
            }
        `)
        return user
            .prompt('hello', testing => {
                const output = testing.output()
                assert.equal(output.length, 1)
                assert.equal(output[0], 'Hey')
            })
            .end()
    })

    it('Other language', async () => {
        await code(`
             @Intent('hello', {
                 fr: [
                     'bonjour',
                     'nous allons manger'
                 ]
             })
             hello() {
                 > Hey
             }
         `)
         return user
             .prompt('je mange', testing => {
                 const output = testing.output()
                 assert.equal(output.length, 1)
                 assert.equal(output[0], 'Hey')
             })
             .end()
     })

     it('Other language, identifier', async () => {
        await code(`
             @Intent('hello', [
                '#hello'
             ])
             hello() {
                 > Hey
             }
         `, {
            languages: {
                packages: {
                    fr_FR: [
                        {
                            'hello': 'Hello World'
                        }
                    ]
                }
            }
         })
         return user
             .prompt('world', testing => {
                 const output = testing.output()
                 assert.equal(output.length, 1)
                 assert.equal(output[0], 'Hey')
             })
             .end()
     })

     it('Child skill', async () => {
        await code('', {
             skills: {
                 child: {
                     code: `
                        @Intent('hello', [
                            'hello',
                            'yo'
                        ])
                        hello() {
                            > Hey
                        }
                     `
                 }
             }
         })
         return user
             .prompt('hello', testing => {
                 const output = testing.output()
                 assert.equal(output.length, 1)
                 assert.equal(output[0], 'Hey')
             })
             .end()
     })

     it('Not intent found', async () => {
        await code(`
             @Event('start')
             start() {
                 > Hey
             }
         `)
         return user
             .prompt('hello', testing => {
                 const output = testing.output()
                 assert.equal(output.length, 1)
                 assert.equal(output[0], 'Hey')
             })
             .end()
     })

})
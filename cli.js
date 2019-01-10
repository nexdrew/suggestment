#!/usr/bin/env node

const basicStyle = require('sywac-style-basic')
const chalk = basicStyle.chalk

const cli = require('sywac')
  .style(basicStyle)
  .outputSettings({ maxWidth: 69 })
  .preface(null, chalk.white.underline('Query Google’s suggestion engine given a keyword'))
  .positional('<keyword>', { paramsDesc: 'The keyword for which to find suggestions' })
  .string('-c, --client <string>', {
    desc: 'Specify the client query param (try youtube)',
    defaultValue: 'heirloom-hp'
  })
  .string('-l, --lang <code>', {
    desc: 'Specify the hl query param for language code',
    defaultValue: 'en'
  })
  .boolean('-t, --terse', {
    desc: 'Do not color the output'
  })
  .help('-h, --help', { implicitCommand: false })
  .version('-v, --version', { implicitCommand: false })

module.exports = cli

if (require.main === module) {
  let terse
  cli.parseAndExit().then(argv => {
    terse = argv.terse
    argv.hl = argv.lang
    return require('./index')(argv.keyword, argv)
  }).then(suggestions => {
    for (const s of suggestions) {
      console.log(terse ? s : chalk.magenta(s))
    }
  }).catch(err => {
    console.error(err)
    process.exitCode = 1
  })
}

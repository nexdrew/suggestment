const got = require('got')
const { CookieJar } = require('tough-cookie')
const he = require('he')

const cookieJar = new CookieJar()
const urlBase = 'https://clients1.google.com/complete/search'
const resRegex = /^window\.google\.ac\.h\((.*)\)$/
const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
let reqId = 0

module.exports = async function suggestment (keyword, opts) {
  keyword = String(keyword) || ''
  opts = opts || {}

  if (typeof opts.client === 'undefined') opts.client = 'heirloom-hp'
  if (typeof opts.hl === 'undefined') opts.hl = 'en'
  if (typeof opts.cp === 'undefined') opts.cp = keyword.length

  const qs = {
    client: opts.client,
    hl: opts.hl,
    gs_rn: 0,
    gs_ri: opts.client,
    cp: opts.cp,
    gs_id: (reqId++),
    q: keyword
  }
  if (opts.client === 'youtube') qs.ds = 'yt'

  // this may throw/reject
  const response = await got(urlBase, {
    cookieJar,
    query: qs,
    headers: { 'User-Agent': userAgent }
  })

  let body = response.body
  if (typeof body === 'string') {
    let m = resRegex.exec(body)
    body = m ? JSON.parse(m[1]) : [] // this may throw/reject
  }

  if (Array.isArray(body) && body.length) {
    let suggestions = body[1].map(item => {
      return he.decode(stripTags(item[0]))
    })
    return suggestions
  }

  return []
}

let stripTagsRegex = /<\/?[^>]+>/g
function stripTags (s) {
  return String(s).replace(stripTagsRegex, '')
}

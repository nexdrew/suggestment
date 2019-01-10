# suggestment

> A minimal, "modern", Node-only version of suggestion

[![Build Status](https://travis-ci.org/nexdrew/suggestment.svg?branch=master)](https://travis-ci.org/nexdrew/suggestment)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Query Google’s suggestion engine given a keyword

## API Install and Usage

```console
$ npm i --save suggestment
```

```js
const suggestment = require('suggestment')

// returns a Promise that resolves to an array of strings
suggestment('keyword').then(suggestions => console.log(suggestions))
/*
[ 'keyword planner',
  'keywords everywhere',
  'keywords',
  'keyword research',
  'keyword finder',
  'keyword generator',
  'keyword research tool',
  'keywords everywhere chrome',
  'keyword cipher',
  'keyword search volume' ]
*/

const opts = {
  client: 'youtube', // default is 'heirloom-hp'
  hl: 'zh-CN'        // default is 'en'
}
suggestment('包', opts).then(suggestions => console.log(suggestions))
/*
[ '包子',
  '包子的做法大全',
  '包子皇帝',
  '包子45杀',
  '包容',
  '包青天之七侠五义',
  '包青天粤语',
  '包饺子',
  '包饺子手法',
  '包包子' ]
*/
```

## CLI Install and Usage

```console
$ npm i -g suggestment
```

```console
$ suggestment keyword
keyword planner
keywords everywhere
keywords
keyword research
keyword finder
keyword generator
keyword research tool
keywords everywhere chrome
keyword cipher
keyword search volume
```

```console
$ suggestment keyword --client youtube
keyword research
keyword research bangla tutorial
keyword research 2018
keywords everywhere
keywords for youtube videos
keyword planner
keyword kenneth
keywords
keyword planner 2018
keyword driven framework in selenium webdriver
```

```console
$ suggestment 包 -l zh-CN
包子
包青天
包贝尔
包头
包
包容 英文
包菜
包豪斯
包法利夫人
包宝宝
```

```console
$ suggestment --help
```

## Related

The logic for this package is based on [suggestion](https://github.com/eugeneware/suggestion) by Eugene Ware.

## License

ISC © Contributors
BSD-3-Clause © Eugene Ware

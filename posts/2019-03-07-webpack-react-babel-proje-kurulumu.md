---
title: React + Webpack 4 + Babel 7 proje kurulumu
description: React single page app kurulumu
slug: webpack-react-babel-proje-kurulumu
date: Mar 07, 2019
---

REACT, Webpack, Babel PROJECT SETUP

Merhaba sevgili JS sevenler 😜 Bugün React ile geliştirme yapabilmek için bir front-end proje kurulumu yapacağız. Projemizde amacımız front-end geliştirme araçlarını kullanarak tüm konfigürasyonun elimizde olduğu bir yapı oluşturmak. Başlamadan önce neleri öğreneceğimize bir değinelim:

- Basit bir Node JS projesi oluşturma
- Webpack kurulumu
- Babel kurulumu
- React kurulumu
- Çıktımızı bir HTML sayfasına yazdırmak.

Şimdi hazırsak kuruluma geçelim.

Öncelikle cihazımızda güncel **Node JS** ve **npm** paket yükleyicisinin olduğundan emin olalım 🤔

Best friendlerimizden olan terminali açıyoruz. Bir klasör oluşturup içeri dalmakla başlıyoruz işe;

```js
mkdir myproject
cd myproject
```

Bir de, _yazdığımız React kodlarının bulunduğu_ `src` isimli bir alt dizin oluşturuyorum.

```js
mkdir src
```

Şimdi bir node js projesi başlatabiliriz. Bunun için aşağıdaki komutu giriyorum.
_'-y' kullanarak bana soracağı soruların hepsine evet diyerek geçiyorum._
Dilerseniz siz kullanmayıp bu soruları cevaplayabilirsiniz.😒

```js
npm init -y
```

Şimdi ilk paketlerimizi yüklemeye hazırız.

## Webpack Kurulumu

Webpack front-end geliştiricileri için vazgeçilmez paketlerden bir tanesi. En büyük amaçlarından **biri** _yazdığımız kodları (js, css veya türevleri) tarayıcımızın anlayacağı kodlara çevirip bize sunması._
İster React yazıyor olur ister başka bir library veya framework, Webpack’i kullanmak geliştirme açısından size büyük avantaj sağlayacaktır.

Aşağıdaki komutumla `Webpack` ve `Webpack-cli` paketlerini yükleyerek Webpack’i projeme dahil ediyorum.

```js
yarn add Webpack Webpack-cli —d
```

Daha sonra `package.json` dosyamıza aşağıdaki kod bloğunu ekliyorum.

```js
"scripts": {
	"dev": "Webpack --watch --mode=development --config Webpack.config.js",
	"prod": "Webpack --mode=production --config Webpack.config.js"
}
```

Webpack’i yükledik. Fakat onun için ufak bir kurulum yapmamız gerekecek. Bu işleme diğer gerekli paketlerimizi de yükledikten sonra devam edeceğiz.
Oluşturulan package.json dosyasını kontrol ederek işlemin başarılı olduğunu görebilirsiniz.

Sonraki adım olarak uygulamamızın çıktısı için bir klasör oluşturmak.
Proje dizinimizde şu komutları giriyorum:

```js
mkdir dist
cd dist
```

Klasörü oluşturduktan sonra geliştirme sürecinde uygulamamızı izleyebileceğimiz bir HTML dosyası oluşturup js çıktımızı içine import ediyoruz.

```js
touch index.html
```

Html dosyamızı aşağıdaki kod satırları ile doldurabiliriz:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width= , initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>React Webpack Babel Project Setup :d</title>
  </head>
  <body>
    <div id="app"></div>

    <script src="./js/main.js"></script>
  </body>
</html>
```

Burada `body` tagı içerisindeki `app` id'sine sahip div bizim için önemli. Yazdığımız react kodunu bu div içerisine gömeceğiz.

Son olarak ana dizine dönmeyi unutmayalım :p

```js
cd ..
```

## Babel Kurulumu

React bileşenlerini (component) yazarken çoğunlukla javascriptin ES6 standardı ve üstünü kullanıyoruz. Fakat sorun şu ki internet tarayıcılarımız bu standartlar ile yazılmış kodların tamamını anlamakta zorlanıyor. Babel ise tam bu noktada bizim büyük bir ihtiyacımızı karşılıyor. Yazdığımız React kodunu tarayıcıların anlayacağı dile çeviriyor. Bunu yapmak için Babel'i Webpack vasıtası ile kullanacağız.

Bunun için önce gerekli Babel paketlerimizi yükleyelim:

```js
npm install @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
```

Şimdi Webpack kurulumuna geçmeden önce ufak bir Babel kurulumu yapacağız. Proje dizinimizde `.babelrc` isimli bir dosya yaratalım.

```js
touch.babelrc
```

Ve içerisine, Babel'in onları kullanması için, indirdiğimiz paketleri atayalım.

```js
{
	"presets": [
		"@babel/preset-env",
		"@babel/preset-react"
	]
}
```

Şimdi hazırsak basit bir Webpack kurulumu ile devam ediyoruuz :d

```js
touch webpack.config.js
```

Ve başlıyoruz içini doldurmaya:

```js
const path = require('path')

module.exports = {
  context: __dirname,
  entry: {
    main: './src/index'
  },
  output: {
    path: path.resolve('./dist/js/'),
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.jsx|js?$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  }
}
```

Kurulumumuz tamam. Biraz son aşamada ne yaptığımızdan bahsedeyim. Önce entry objesi içinde ana .js dosyamızın yolunu verdik. Webpack burada entry olarak verdiğim dosyanın çıktısını output objesi içinde verdiğim yola, yani önceden oluşturduğum `dist` dosyasının içine yazacak.

Bu yazma işleminden önce `transpilling` dediğimiz ES6'dan ES5'e çevirme işini nasıl yapıyor? Tabiki `module` objesi içinde tanımladığım `rules` ile. Burada Webpack'e `.jsx` veya `js` uzantılı dosyaları `babel-loader` paketi ile transpile etmesini söylüyoruz.

Şimdiye kadar gayet güzel gidiyoruz. Webpack ve Babel kurulumu tamam. Peki ne kaldı geriye? Tabiki adam gibi adamlardan React. Canım React :d

Hemen yüklüyoruz serii:

```js
npm install react react-dom --save-dev
```

daha sonra

```js
cd src && touch index.js
```

komutu ile basit bir js dosyası oluşturarak React kodumu yazmaya başlıyoruz.

```js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class Index extends Component {
  render() {
    return <div>Whats up my niggas!</div>
  }
}

ReactDOM.render(<Index />, document.getElementById('app'))
```

Evveeet sayın dostlarım, hazırsak ilk komutumuzu çalıştırarak çıktımızı alalım ve tarayıcımızda sonucu görelim. Bunun için tek yapmamız gereken

```js
npm run dev
```

komutunu çalıştırıp html dosyamızı tarayıcımızda açmak.

Dikkat ederseniz Webpack index.js dosyasını dönüştürdükten sonra dist/js yoluna main.js isminde çıktısını yazdı. Temel amacımıza ulaşmış olduk.

Bu yazımızda Webpack'in Babel ile işbirliği yaparak React'ı nasıl compile ettiğini ve nasıl çıktı alabildiğimizi gördük. Elbette bize sağladığı yararlar bunlar ile bitmiyor. Sayısız kullanım şekli mevcut. Daha etkili bir geliştirme ortamı için gerekli plugin ve kodlama örnekleri görebileceğimiz sonraki yazım için takipte kalın :) Sevgiler ✋

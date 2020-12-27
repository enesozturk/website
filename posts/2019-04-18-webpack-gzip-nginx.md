---
title: Webpack Gzip Nginx
description: Webpack ile Gzip sıkıştırması ve Nginx server üzerinde sunmak
slug: webpack-gzip-nginx
date: Apr 18, 2019
---

![webpack-gzip-nginx](https://cdn-images-1.medium.com/max/800/1*L3daQ61HYcBYkhV9b5-8bw.png)

# Webpack ile Gzip sıkıştırması ve Nginx server üzerinde sunmak

Merhaba, bu makalede geliştirdiğimiz Webpack kullanarak javascript projesini nasıl sıkıştıracağımızı ve sıkıştırdığımız bu dosyayı Nginx sunucu üzerinde nasıl sunacağımızı göreceğiz.

Öncelikle geliştirme tarafında Webpack’e gerekli pluginleri ekleyerek başlıyorum. Ben sıkıştırma işlemi için iki farklı plugin kullandım. **UglifyJSPlugin** ve **CompressionPlugin**. UglifyJs almış olduğu js dosylarını herhangi bir encoding yapmadan sıkıştırıyor. Ben 3MB’lik dosyaları ~800KB’ye kadar düşürdüğünü gördüm. Compression plugin ise almış olduğu js dosyalarını encoding işlemi yaparak ekstra bir sıkıştırma yapıyor. Fakat çıktı olarak .gzip uzantılı bir dosya üretiyor. Tahmin edersiniz ki bu dosyayı tarayıcımızın okuyabilmesi için decode edilmesi gerekli. **Ve dolayısı ile web sitemizin bir sunucu üzerinde koşuyor olması gerekli.**

Gerekli ayarları yapmaya başlayalım.

Sıkıştırma işlemini yapmak için `uglifyjs-webpack-plugin` ve `compression-webpack-plugin` paketlerini projeye eklememiz gerekli.

```js
yarn add compression-webpack-plugin uglifyjs-webpack-plugin -D
```

Sıkıştırma için gerekli Webpack ayarları:

Ayarlarımızı yaptıktan sonra projeyi `production` modda çalıştırın.

```js
    yarn run prod // "prod": "webpack --mode=production --config webpack.config.js"
```

Bundle dosyalarımızın içine aynı isimli .js ve `.js.gz` uzantılı bir dosyalar
olacak. Bunlar bizim sıkıştırılmış dosyamız. **İki dosyayı da sunucumuza
yüklememiz gerekli. **Fakat Html dosyamıza script dosyamızı eklerden** sadece
.js uzantılı dosyayı ekleyeceğiz.** Yani:

```html
<script type="text/javascript" src="static/bundles/main.bundle.js.gz"></script>
//Yanlış

<script type="text/javascript" src="static/bundles/main.bundle.js"></script>
//Doğru
```

Benim örneğimde toplamda**~2.5MB**’lik bir bundle dosyasını **Uglify JS ile
~600KB’ye** kadar,** compression-webpack-plugin ile ~170KB**’ye kadar indirmiş
oldum.

> ÖNEMLİ: Sıkıştırmış olduğumuz dosyayı kullanabilmeniz için projenizin bir sunucu
> üzerinde servis edilmesi gerekli. Yani .gz uzantılı dosyayı bir .html sayfasına
> kaynak olarak eklerseniz istediğiniz sonucu alamayacaksınız.

Benim örneğimde bu proje Nginx server üzerinde servis ediliyor. Fakat gzip dosyamız için gerekli ayarları **nginx.conf** dosyası içerisinde belirtmemiz gerekli. nginx’in kurulu olduğu dizine gidip (/etc/nginx) aşağıdaki komutla düzenleme işlemini yapıyorum.

```js
    nano ./ngnix.conf
```

Yorum satırı halinde duran gzip ayarlarını aşağıdaki şekilde düzeltelim.

Kaydedip çıktıktan sonra server’i yeniden başlatın.

```js
    services nginx restart
```

İşlem tamam.

Hepsi bu kadar. Siteyi açtığımda Console’da Network sekmesine gelip indirilen dosyayı görebilirsiniz.

172 KB, harika mı ne 😋

![bundled-size](https://cdn-images-1.medium.com/max/800/1*l-ZlwXLmYl1GgXXWfPbQnw.png)

Okuduğunuz için teşekkürler. Sevgilerle..

**Kaynaklar:**

- https://medium.com/tag/javascript?source=post
- https://medium.com/tag/gzip?source=post
- https://medium.com/tag/webpack?source=post
- https://medium.com/tag/nginx?source=post
- https://medium.com/tag/compress?source=post

### [Enes Ozturk](https://medium.com/@enes.ozturk)

Paragliding Pilot - Software Developer

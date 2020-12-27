---
title: Github Pages ve Jekyll ile blog kurmak
description: İlk blog post hakkında
slug: github-pages-ve-jekyll-ile-blog-kurmak
date: Aug 24, 2016
---

Merhabalar <i class="fa fa-hand-paper-o" aria-hidden="true"></i>. Bugün sizlere Github Pages ve Jekyll'den bahsedip bu ikisi ile basitçe nasıl bir blog oluşturulduğundan bahsetmek istiyorum.

## Github Pages nedir?

Github tüm kullanıcılarına kişisel, organizasyon veya proje sayfaları için Github Depoları(Repositories) üzerinden
yönetilen hosting sağlıyor. Ücretsiz bir kullanımı var. Biz kendimize kişisel site(blog) kuracağız.

#### Github Pages kurulumu

Github ile blog oluşturmak için yeni bir _depo_ oluşturun ve ismini **_`kullanıcıisminiz.github.io`_**
olarak ayarlayın. Şimdilik deponuzun içine **`index.html`** dosyası ekleyip içine basitçe **`<h1>Merhaba Dünya!</h1>`**
yazarak deneme için dosyamızı depomuza işleyelim(commit).

![create-index](/blog/createindex.jpg)

Sitemiz tamam. Adres çubuğuna
**`kullanıcıisminiz.github.io`** yazarak sitenizi açın. Sayfada

> Merhaba Dünya!

çıktısını gördüyseniz başarılı bir kurulum yapmış bulunuyorsunuz.
Gihub Pages'i anladıydanız biraz Jekyll'den bahsedelim.

## Jekyll nedir?

_Jekyll_, basit, blog odaklı, static site oluşturucudur. `Ruby` ile yazılmıştır. Github Pages tarafından desteklenen bir mekanizmadır.
Jekyll bizim için gerekli bütün site şablon dosyalarını otomatik olarak oluşturuyor.
`Markdown` sözdizimini destekler. Yani biz içeriğimizi Markdown formatıyla yazarız, Jekyll bizim için bunları `html` formatına çevirir.

## Başlamadan önce

### Windows üzerinde mi çalışıyorsunuz?

Eğer sizde Windows işletim sistemi kullanıyorsanız biraz zahmet olacak ama Jekyll kullanmak için birkaç program kurmamız gerekmekte.
Jekyll Ruby ile yazılmış bir dil olduğu için öncelikle bilgisayarımıza [Ruby](http://rubyinstaller.org/downloads/)'i kurmamız gerekiyor.

Yukarıda verilen linkten sisteminize uygun olanı indirin ve kurulumu yapın. Kurulum sırasında `Add Ruby executables to your PATH` kutusunun işaretli olduğunda emin olun.

Jekyll raw kaynak kodlu birkaç `dependency` dediğimiz pakete sahip olduğu için ve bunları uygun bir şekilde yürütebilmesi için
Development Kit'e ihtiyacımız var. Aynı linkten Development Kit'i indirebilirsiniz.(Biraz aşağıda)

Sisteminize uygun DevKit'i indirdikten sonra dosyaları biryere çıkartın.
`C:\RubyDevKit` tavsiye ederim.Şimdi DevKit'i başlatmak ve Ruby ile bağlamamız gerekiyor.
Terminali açarak.

```
cd C:\RubyDevKit
```

komutu ile ilgili dosyaya girin.

```
ruby dk.rb init
```

komutu ile Ruby kurulumunu otomatik
algılayacak ilgili yapı(configuration) dosyalarımız oluşturulacak. Daha sonra

```
ruby dk.rb install
```

ile oluşturulan dosya ile DevKit Ruby yüklemesine bağlanacak.
Ruby için hepsi bu kadar. Artık Ruby Gem adlı paket sistemine sahibiz. Bu sistem Node.js'in npm paket yöneticisi gibi. Gerekli paketleri `gem` komutu ile yükleyeceğiz.

Terminali açarak

```
gem install jekyll
```

diyerek jekyll bilgisayarımız global olarak kuruyoruz. Artık Jekyll ile site oluşturabiliriz.

Biz bu yazıda sıfırdan bir Jekyll sitesi değilde var olan bir Jekyll temasını Github üzerinde Fork'işlemi ile
koplayayıp kullanacağız. Bu şekilde fazlasıyla zaman kazanırız.

## Bir Jekyll projesi Fork'la

10 binden fazla Fork'u olan [Jekyll-now](https://github.com/barryclark/jekyll-now) adlı projeyi Github profiliniz üzerinden forklayın.

Daha sonra _`Settings`_ kısmından deponun ismini _`kullaniciisminiz.github.io`_ yapın.

Şimdi gerekli dosyaları değiştirmek için depoyu local makinemize, kendi bilgisayarımıza klonlamamız lazım. Ben Github Dekstop kullanıyorum.

Github programımıza açtıktan sonra, sol üst köşeden <i class="fa fa-plus" aria-hidden="true"></i>
işaretine daha sonra `clone`'a tıklayarak yeni bir depo oluşturuyoruz. Dosya yolunu seçtikten sonra tamam diyerek dosyaları
bilgisayarınıza kopyalayın.

Clone işlemi bittikten sonra bir text editör ile clone dosyamızı açın. Ben Visual Studio Code kullanıyorum. Git işlemlerini de
terminal veya Github Desktop kullanmadan halledebiliyorum.

`_config.yml` dosyasını açın. Bu en önemli dosyalardan biri. İçerisindeki `name, description, urls vs..` gibi değişkenler var.
Bunun içerisindeki bazı değişkenleri kendinize göre değiştirin.

Şimdilik karakter sorunu yaşamamak için `_config.yml` dosyamıza `encoding: utf-8` kodumu da ekliyorum ve kaydediyorum.

Şimdi `http://kullaniciisminiz.github.io` adresine giderek sitenize göz atabilirsiniz.

#### Not

Dosyalarınız üzerinde çalışırken bilgisayarınıza kopyaladığınız depo üzerinde değişikler yapacağız fakat bunları her defasında Github'a işlemek bizi biraz uğraştıracak.
Bununla sürekli uğraşmamak için terminalde dosyamızın olduğu yere gidiyoruz.

```
cd C:\Users\EnesPc\Documents\GitHub\oztrkeness.github.io
```

burada `jekyll` komutu ile önce dosyalarımızı build ediyoruz.

```
jekyll build
```

Daha sonra

```
jekyll serve
```

diyoruz. Artık dosyalarımı `localhost:4000` üzerinde servis ediliyor. Bu adrese giderek yaptığınız değişiklikleri Github'a atmadan önce görebilirsiniz.
Fakat bunun aksine

```
jekyll serve --watch
```

komutunu tavsiye ederim. Bu komut yaptığımız değişiklikleri serve komutunun durdurup başlatmamıza gerek kalmadan görmemizi sağlıyor.
Yaptığımız değişiklikleri kaydettikten sonra tek yapmamız gereken sayfayı yenilemek.

## Dosyalara göz atalım

Aşağıda Jekyll site yapımız var inceleyerek daha fazla bilgi edinebilirsiniz.

```
/Users/barryclark/Code/jekyll-now
├─ CNAME # Kendi domain adresimizi içerir (Varsa)
├─ _config.yml #Jekyll'in yapı dosyaları
├─ _includes #Şablon dosyalarında kullanılacak kod parçaları
│  ├─ analytics.html
│  └─ disqus.html
├─ _layouts
│  ├─ default.html # Ana şablon. <head>, <navigation>, <footer> gibi tagları içerir
│  ├─ page.html # Static sayfa düzeni
│  └─ post.html # Postlarımızın sayfa düzeni
├─ _posts # Postarımızın bulunduğu klasör
│  └─ 2014-3-3-Hello-World.md
├─ _site # Jekyll sitemizi inşa ettikten sonra HTML'e çevrilen dosyalarımız burada tutulur ve bize sunulur.
│  ├─ CNAME
│  ├─ LICENSE
│  ├─ about.html
│  ├─ feed.xml
│  ├─ index.html
│  ├─ sitemap.xml
│  └─ style.css
├─ about.md # Static 'Hakkında' sayfamız.
├─ feed.xml
├─ images # Resimlerimizin bulunduğu klasör.
│  ├── first-post.jpg
├─ index.html #Anasayfa düzeni
├─ scss # The Sass style sheets for my website
│  ├─ _highlights.scss
│  ├─ _reset.scss
│  ├─ _variables.scss
│  └─ style.scss
└── sitemap.xml
```

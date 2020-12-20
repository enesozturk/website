---
title: OneSignal in, Firebase out.
description: OneSignal in, Firebase out.
slug: onesignal-in-firebase-out
date: Apr 26, 2020
---

# OneSignal in, Firebase out.

OneSignal in, Firebase out.

> Öncelikle burada söyleyeceklerim Firebase’in kendisi ile ilgili değil, **react-native-firebase** (RNF) paketiyle ilgili. Dolayısı ile benim karşılaştığım hatalarla sizin de karşılaşacağınızın garantisi yok. Ya da var bence. Neyse.

Merhaba, bir süredir React Native ile geliştirdiğim projede **Push Notifications** özelliği üzerinde çalışıyorum. Aslında bu konuyu çok önceden çözdüğümü sanmıştım. Her şey proje production’a çıktığında yaşadığım sıkıntılarla başladı. react-native-firebase paketini kullanarak geliştirdiğim projede bildirimlerin bazı cihazlarda çalışmaması, ön plan (foreground), arkaplan (background), kapalı (quit) durumlarında bildirim verisinin istenilen şekilde handle edilememesi çok ciddi bir problem oldu. Zira bildirim içerisinde gelen veriyi, bildirime tıkladıktan sonra uygulama açıldığında kullanamayacaksam (yönlendirme, modal açılması veya herhangi bir aksiyon) bildirim özelliğini kullanmamızın bir anlamı yok sanırım.

## Ön plan, arkaplan ve kapalı durumları nelerdir?

Bir bildirimi ele alırken, uygulamanız o anda üç farklı durumda olabilir.

- **Ön plan (foreground)**: Telefonunuzda uygulamanız açık ve ekranda onu görüyorken ki durum.
- **Arkaplan (background)**: Telefonunuzda uygulama açık, fakat arkaplanda çalışıyor. Başka bir uygulamadasınız veya anasayfadasınız.
- **Kapalı (quit)**: Uygulama ölü durumda, ne ön planda ne de arkaplanda çalışıyor.

Bunları bilmekte fayda var. Gelen bildirimi açtıktan sonra bazı durumlarda farklı fonksiyonlar tetikleniyor. Ne yapmak istediğinize bağlı farklı bir tasarım geliştirmeniz gerekebilir. Kurulum sırasında yazdığım kodlarda açıklama satırları ile hangisinin hangi fonksiyonda verildiğini kısa da olsa anlattım.

## Yaşadığım sorunlar nelerdi?

Aslında sorun daha kod yazmadan başlıyor. **Kaynak eksikliği**. RNF’nin dökümanını okuduktan sonra kesinlikle bir eksiklik hissediyorsunuz. Girişeceğiniz iş size hiç güven vermiyor. rnfirebase.io üzerinden paylaştıkları dökümanı takip edip kurulumu yaptıktan ve Firebase konsolu üzerinden gerekli ayarlamaları yaptıktan sonra bildirimleri kullanmaya başlıyorsunuz. Fakat bu yaptıklarınız size hiç bir şey katmıyor. Sadece bildirim almak için gerekli kurulumu yaptınız.

Ben de kurulumları yaptıktan sonra platform bazlı sorunlar yaşadım. Android tarafta, bildirim geliyor fakat yukarıdan popup şeklinde kendini göstermiyor. Yalnızca üstteki durum çubuğunda uygulama ikonu görüyorsunuz. Bildirime tıkladıktan sonra bildirim mesajının detaylarını yakalayamıyorsunuz. Çoğu senaryoda bildirime tıkladıktan sonra uygulama içerisinde bir yönlendirme yapılması gerekir. Yönlendirme için gerekli veriyi yakalayamıyorsanız bildirimin bir anlamı kalmıyor. 🤷🏻‍♂️ RNF’de ‘bildirim’ (notification) ve ‘veri’ (data) mesajı farklı kavramlar ve her ikisinde farklı fonksiyonlar tetikleniyor. Bunları yönetmek zorlaşıyor. Bu tarz sıkıntılar sizi **react-native-push-notifications (RNPN) **gibi farklı kütüphaneleri kurmaya zorluyor. Fazladan uğraştığınız yetmedi bu sefer her iki paket birbirine bağlı kullanmaya başladınız. Ama sorunlar bitti mi bitmedi.. Bildirim mesajı gönderirseniz hem RNF paketi paketinden hem de RNPN paketinden bildirim alıyorsunuz. Bingo. Bir taşla iki kuş. (!) Bunu engellemek için bildirim türünde değil veri türünde mesaj göndermeniz gerekiyormuş vs vs. Bitti mi? Tabiki bitmedi. Ama daha fazla detaya girmeyeceğim. Şayet bu sorunları bir kısmı RNF ile ilgili iken, bir kısmı ise benim yaptığım kurulumun tasarımı ile ilgili olabilir. Sonuç olarak ne yeterli bilgi sahibi oldum ne de istediğim çıktıyı alabildim.

Bir süre uğraştıktan sonra duyduğum ama hiç kullanmadığım bir diğer bildirim alternatifiniz olan **OneSignal** denemeye karar verdim. Her şey hiç tahmin etmediğim kadar kolay oldu.

## OneSignal

Diğer tarafta OneSignal ise mükemmele yakın [dökümanları](https://documentation.onesignal.com/docs) ile size bir bildirimi tüm detayları ile (ikonu, başlığı, alt başlığı, resimi, sesleri, aksiyon butonları vs. vs.) anlatıyor. Tüm bunlar üzerinde dilediğiniz gibi düzenleme yapmanıza olanak sağlıyor. Hangi teknoloji ile çalışacaksanız (iOS, Android, React Native, Flutter, Unity, Ionic vs.) her biri çok güzel anlatılmış durumda. Bunlarla beraber yalnızca mobil bildirimler için değil, Web Notification için dilediğiniz web uygulamasında kurulum yapabilirsiniz, e-mail servisi olarak kullanabilirsiniz. CMS, CRM, Analiz uygulamalarınıza entegre ederek kullanabilirsiniz. [bkz](https://documentation.onesignal.com/docs/integrations)

Push Notification işlemlerine başlamadan önce OneSignal’ın dökümanlarını hatim etmekte fayda var. [Burada](https://documentation.onesignal.com/docs/push-notification-guide) bir bildirim hakkında tüm detayları çok güzel ve çok detaylı anlatmışlar. Sayfadaki tabloda verilen linklerin her birine uğrayarak (ya da sol tarafdaki menüden) okumanızı tavsiye ederim. Zira bildirimin özelleştirilmesi, sesler, linkler (farklı uygulama veya sitelere yönlendirmeler), ikonlar gibi detaylar hakkında daha fazla bildi sahibi olabilirsiniz.

OneSignal’i projemizde kullanmadan önce [buradan](https://documentation.onesignal.com/docs/dashboard) yönetim paneli (dashboard) hakkında ilgili dökümanları okumanızda fayda var. Panel üzerinden bir uygulama oluşturmanız, gerekirse (ki muhtemelen gerekicektir) uygulamanız için segment ve grup oluşturmanız gerekicek. Daha sonra kuruluma geçebilirsiniz.

En basit haliyle hem OneSignal hem de React Native tarafında bir kurulum yapalım.

### OneSignal App oluşturulması

OneSignal’e üye olup giriş yaptıktan sonra [app.onesignal.com](https://app.onesignal.com) adresine gidip yeni bir **New App/Website** oluşturma butonuna basın. Çıkan ekranda uygulama isminizi girip platform seçin. Ben şimdilik Android kurulumu ile başlayacağım.

Daha sonra çıkan modal ekranında sizden **Firebase Server Key** ve **Firebase Server ID** istiyor. Firebase üzerinde oluşturduğumuz Cloud Messaging uygulamasının ayarlarına giderek bunları alabilirsiniz (Firebase konsolunda uygulamayı seçtikten sonra **Ayarlar > Cloud Messaging sekmesi**).\*\* **Bunları OneSignal kurulum penceresinde girdikten sonra ileri diyin. Gelen ekranda **target SDK** olarak **React Native**’i seçin. Bize bir **App ID** veriyor. Bunu aşağıda kurulumu yaparken kullanacağız. **Bu ekranı kapatmayın.\*\* Şimdi React Native kurulumuna geçelim.

## React Native için kurulum

Önce aşağıdaki komutla OneSignal’ın Javascript paketini projemize dahil edelim.

```js
    yarn add react-native-onesignal
```

Daha sonra AndroidManifest.xml dosyasında .MainActivity ismine sahip <activity/> tag’ine android:launchMode="singleTop" özelliğini ekliyoruz.

```html
<iframe
  src="https://medium.com/media/af8a926d51a626f374ffd1ccb608f794"
  frameborder="0"
></iframe>
```

Burada ben kendi projemin Android Manifest dosyasını bazı detayları çıkartarak paylaştım. Şayet Splash Screen kullanıyorsanız. Ayarlarınızın buradaki gibi olması gerekebilir.

Daha sonra android/app/build.gradle dosyasının **en başına **aşağıdaki kod parçasını ekliyorsunuz.

```html
<iframe
  src="https://medium.com/media/4e11ee4d08db447a6518bbd0281faed8"
  frameborder="0"
></iframe>
```

Daha sonra bu sefer android/build.gradle dosyasında android taginin içerisinde compileSdkVersion vebuildToolsVersion numaralarının 26'dan yüksek olduğundan emin olun.

Android için tüm kurulum bu kadar 🙃

> iOS için RNF’den farklı olarak bir kaç kurulum daha gerekiyor. Şimdiye kadar ki adımlar ve iOS işlemleri için [bu linki](https://documentation.onesignal.com/docs/react-native-sdk-setup) inceleyebilirsiniz.

Daha sonra Javascript tarafta eklememiz gereken kodlara bakalım ve kurulumu bitirelim.

Benim uygulamamda App.js içerisinde stateless bir component var. Dolayısı ile aşağıdaki gibi bir tanımlama yaptım.

```js
<iframe src="https://medium.com/media/f10168f13e01332c583e80ad38fe5044" frameborder=0></iframe>
```

Bu kurulumu yapıp uygulamamızı çalıştırdıktan sonra OneSignal telefonunuzun bilgilerini kendisi çekip database’ine kaydediyor. Panel üzerinden bildirim göndermek için ekstra bir kurulum yapmanıza gerek yok. Güzel tarafı da şu; eğer yanlış bir kurulum yaptıysanız size nerede yanlışlık yaptığınızı gösteriyor. Kayıtlı telefonları görmek farklı bir pencerede yine [\*\*Dashboard](https://app.onesignal.com) > Uygulamanız > Audience > All Users\*\* kısmına gidebilirsiniz.

![](https://cdn-images-1.medium.com/max/2162/1*70bPVcViqnHJ91bqrIbaIw.png)

Telefonunuz başarılı bir şekilde kayıt edildiyse sol tarafta tik göreceksiniz. Eğer bir sorun varsa çarpı işaretiyle size hatayı söylüyor. Hatanın üzerine geldiğinizde daha detaylı bilgiye sahip olabilir ve çözebilirsiniz.

Bildirim gönderme işlemine geçmeden önce kullanıcılar kısmında herhangi bir kullanıcıyı test kullanıcısı olarak eklemek için sol tarafındaki Options butonuna basarak **Add to Test Users**’ı seçin. Bir **isim** girip **Add** butonuna basın. Şimdi bu kullanıcıya test bildirimi gönderebiliriz.

Şimdi OneSignal uygulama kurulum penceresine geri dönelim ve modal penceresinde **Check Subscribed Users** butonuna tıklayarak kurulumumuzun başarılı olduğunu doğrulayıp bitirelim. Aynı şekilde burada da kurulum sırasında yaşadığını hatayı görebilirsiniz.

![OneSignal uygulama kurulumu, son adım](https://cdn-images-1.medium.com/max/2000/1*7bktjPg2CLBhCwVn7A_vBw.png)_OneSignal uygulama kurulumu, son adım_

Kurulum başarı ise ilk bildirimleri göndererek OneSignal’i test edebiliriz. 🥳

Şimdi [\*\*Dashboard](https://app.onesignal.com) > Uygulamanız > Messages **sayfasına gelerek **New Push** butonuna tıklıyorum. New Message ekranında bildirim başlığı ve içerik mesajını girdikten sonra sağdaki telefonun altındaki **Send to Test Device** butonuna tıklayın. Çıkan modal penceresinde **hedef cihazı/cihazlar**ı seçerek **Send\*\* butonuna basın ve gönderin.

Bildirim geldi.

![](https://cdn-images-1.medium.com/max/2000/1*1HuXtK2G3RtEM8UdJmZFJg.png)

Üzerine tıkladıktan sonra onOpened fonksiyonu çalıştı ve ekrana alert mesajı ile bildirim mesajını gösterdi.

![](https://cdn-images-1.medium.com/max/2000/1*QupMdtzOy5cFQHI71Pr4qQ.png)

Basitçe OneSignal’in React Native ile kurulumu bu kadar. [Buradan](https://documentation.onesignal.com/docs/mobile-sdk-setup) diğer SDK’lar ile nasıl kurulum yapıldığını. [Buradan](https://documentation.onesignal.com/docs/push-notification-guide) bildirimin nasıl özelleştirileceğini öğrenebilirsiniz. OneSignal kullanmasanız bile bu dökümanlar ile bildirimler hakkında epey bilgi sahibi olmak mümkün.

Şimdilik bu kadar. Okuduğunuz için teşekkür ederim. Herkese iyi günler.

> #EvdeKalın😊

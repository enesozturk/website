---
title: React Native ile Single Sign On Kimlik Doğrulama
description: Bu yazıda React Native uygulamamızda Single Sign On ile kimlik doğrulamanın nasıl kullanılabileceğinden bahsettim.
slug: react-native-ile-single-sign-on-kimlik-dogrulama
date: July 03, 2021
---

![React Native SSO](/blog/sso-cover.png)

Bu yazıda React Native uygulamamızda kimlik doğrulama yaparken web dünyasında sıklıkla kullandığımız Single Sign On yönteminin nasıl uygulanabileceğinden bahsedeceğim.

## Single Sign On

Kısaca bahsetmek gerekirse Single Sign On, üçüncü taraf siteler (sağlayıcı demek daha doğru olabilir) üzerinden giriş yapma yöntemidir. Bir web sitesine Google, Microsoft, Github ile giriş yap gibi örneklerini şimdiye kadar zaten kullandık.

Yine çok detaya inmeden bu yöntemin nasıl çalıştığına dair biraz bahsetmekte fayda var. Web sitenize bir sağlayıcı ile giriş yapma eklediniz. Bu Google olsun. Google ile giriş yap butonuna tıkladınız. Google’ın giriş yapma penceresi pop-up şeklinde açıldı. Biz aslında bu pencereyi açarken URL üzerinden bazı bilgiler gönderiyoruz. Bunlardan biri redirect URL. Buraya Google hesabımızla giriş yaptıktan sonra bu pencere bizi redirect URL’i bildiği için web sitemize geri yönlendirdi ve beraberinde bazı bilgiler de verdi. Bunlar kimlik doğrulama bilgileri. Biz de web sitemize gönderilen bu veriyi işleyip içerisinden access token gibi değerleri alıp kimlik doğrulama için kullanıyoruz. Bu şekilde üçüncü taraf sağlayıcılardan sadece veri alarak kimlik doğrulama işlemi yapmış olduk.

React Native tarafında bu akışı sağlayabilmek için kullanıcı `X ile Giriş Yap` butonuna tıkladığında bir browser açıp, onu ilgili URL’e yönlendireceğiz. Daha sonra kullanıcı ilgili sağlayıcı ile giriş yaptıktan sonra browser bizi bazı parametreler ile uygulamamıza geri yönlendirmeli. Bu akışı sağlamak içinse Deep Link’leri kullanacağız. Böylelikle access token’ı aldıktan sonra kullanıcıyı farklı bir sayfaya yönlendirebilelim.

## Kurulum

Kullanıcıyı uygulama dışına çıkarmadan karşısına browser açıp işlemleri orada yaptırmak için [react-native-inappbrowser](https://github.com/proyecto26/react-native-inappbrowser) paketini kullanacağız. Bu paket de ayrıca SSO için gerekli iyileştirmeler yapılmış ve bize kullanabileceğimiz fonksiyonlar sağlıyor.

```js
yarn add react-native-inappbrowser
```

Daha sonrasında aşağıdaki komut ile iOS tarafında ilgili Pod’un kurulmasını tamamlayıp geri dönelim:

```js
cd ios && pod install && cd ..
```

Android tarafta ise tekrar build almaktan başka bir şey yapmamıza gerek yok:

```js
npx react-native run-android
```

Şimdi diğer önemli kurulumları yapıp, sonrasında bu browser tarafına geri döneceğiz.

## Deep Link

Deeplink’e daha önce aşina değilseniz şöyle aktarabilirim; nasıl bir web sitesini açmak için domain’ini giriyoruz ve browser bizi o siteye yönlendiriyorsa, bir mobil uygulamayı da ona ait bir deep link ile açabiliyoruz. Birisi size bir Hepsiburada ürün linki attı ve siz de ona tıkladığınızda telefonunuz Hepsiburada uygulamasını açtı ve o ürüne yönlendirdi. Bunu sağlayan yapı deep link’ler.

React Native’de deep link kurulumunu yapmak için kendi dökümanlarındaki adımları izleyerek uygulamanıza deep link kurulumunu yapabilirsiniz:
Burada dikkat etmeniz gereken nokta, deep link için belirlediğiniz şemanın ne olduğu, çünkü bunu kullanacağız. Ben aşağıda, şemayı **com.yourawesomeapp** olarak belirlemişim gibi ilerledim.

## React Navigation v5 ve Deep Link Kurulumu

React Native uygulaması yazıyorsanız çok yüksek ihtimalle kullandığınız yönlendirme çözümü [React Navigation](https://reactnavigation.org)’dur. Burada ben de onu kullandığım için kurulumu React Navigation v5'e göre yapacağım.

Yukarıdaki yapıda anlattığım gibi Single Sign On sağlayıcısı kimlik doğrulamayı yaptıktan bir redirect URL’e yönleniyordu. Bizim akışta da bu URL bir deep link olacak ve React Navigation yapısı üzerinde belirli bir sayfaya yönlendirmek istiyorsak onu bir alt sayfaya gitmesini isteyeceğiz. Bu alt sayfanın bizim istediğimiz bir ekran ile eşleşmesi için aşağıdaki gibi bir ayarlama yapacağız:

<script src="https://gist.github.com/enesozturk/f17a7179ffc1b72274fac1c5c1e04563.js"></script>

Burada **linking** objesi içerisinde prefixes dizisinde, React Navigation'un algılayacağı link'leri veriyoruz. Biz sadece deep link'imizi verdik. **config** objesi içerisinde de screens altında Hangi sayfanın hangi alt URL ile eşleşeceğini belirttik. Yani **_com.yourawesomeapp://sso-callback_** olan bir deep link'e tıkladığımızda **SingleSignOnCallback** isimli sayfaya yönlenmesini sağlamış olduk.

## In App Browser

En başta kurduğumuz in app browser paketinin kullanımı ile devam edelim. Yapacağımız şey şu: kullanıcıyı browser açıp bir sağlayıcıya yönlendireceğiz. Orada giriş yaptıktan sonra gelen response'u handle edeceğiz.

Ben bu yapı için bir hook oluşturup buradaki iş akışlarını istediğim yerde kolay kullanabilir hale getirmeye çalıştım:

<script src="https://gist.github.com/enesozturk/6ac47988307453265f7def82b66e1fc1.js"></script>

Üzerinden geçmek gerekirse, **useSingleSignOn** hook'u içerisinde ilk önce **getDeepLink** fonksiyonu ile parametre olarak verdiğim path ile bir deep link oluşturduk. Burada iOS tarafında deep link'i encode etmek gerektiği için bu yardımcı fonksiyon oluşturdum. Daha sonra URL'imizi oluşturduk. Burada önemli olan detay en sondaki **redirect_uri** verisi. Buraya oluşturduğumuz deep link'i veriyoruz.

> Bu URL yapısı, AWS Cognito servisinin gerektirdiği bir yapı. Ben Cognito kullandığım için böyle bir URL çıktı fakat muhtemelen farklı sağlayıcılarda farklı yapı gerekecektir.

Daha sonra InAppBrowser'ın **openAuth** fonksiyonu ile url ve deepLink verilerini parametre olarak geçip son parametrede de bazı browser ayarlamaları sağlıyoruz.

Açılan browser içinde giriş yapma bilgilerimizi girdikten sonra response verisinin durumu **success** ise ve içerisinde **url** varsa **Linking** sınıfının **openURL** fonksiyonu ile uygulamamızı o url'e yönlendiriyoruz. Bu bizim yukarıda oluşturduğumuz url ile aynı fakat sonunda bazı parametreler içeriyor. Örnek bir response aşağıdaki gibi:

```js
com.yourawesomeapp://sso-callback#access_token=psKGn235hWurnDXeev1351sYsNTPv_3a9235tPQXLyKAH7G4BHSm3g&id_token=-3qvd4LloidiXxd2DE2dvcjcmq5na3bfM6A8lbXqrUueUMO3jzXzqdA&token_type=Bearer&expires_in=3600
```

Bilgileri ayrıştıracak olursak deep link'imizden sonra `#` ile `access_token`, `id_token`, `token_type` gibi bilgiler döndü. Ben sadece **getSSORedirectUrl** fonksiyonu ile bu #'ı soru işaretine çevirdim ki bunları navigation parametresi olarak kullanabileyim.

useSingleSignOn hook'undan dönen openAuth fonksiyonunu aşağıdaki gibi kullanıyorum:

```js
const { openAuth } = useSingleSignOn(organization);

<Button
  onPress={openAuth}
  type="secondary"
  textId="screens.signIn.buttons.withSSO"
/>
```

Sonrasında ekranda benden bir izin sitedi. Devam dedikten sonra karşılaştığım ekranlar aşağıdaki gibi:

![React Native SSO Screens](/blog/sso.png)

Böylelikle ben bu URL'i kullanarak openURL ile yönlendirdiğimde beni **SingleSignOnCallback** ekranına yönlendirecek. Bu sayfa içerisinde de navigation parametresi olarak bu verileri çekip kullanabilirsiniz. Ben ekstra bir doğrulama yapan API endpoint'ine gönderdiğim için aşağıdaki gibi bir yapı oluşturdum. Kullanıcı doğrulandıktan sonra geri giderek callback sayfasını kapattım.

<script src="https://gist.github.com/enesozturk/1bb9c20b60da566fe20c79d2b26ef2e0.js"></script>

## Sonuç

Böylelikle üçüncü taraf bir kimlik doğrulama sağlayıcısını web'de olduğu gibi React Native uygulamasında sağlamış olduk. Senaryo uygulamaya göre farklılık gösterebilir. Benim kurduğum yapıda Deep link kurulumu, React Navigation ayarlaması, In app browser paketi gibi detaylar bir kaç denemeden sonra istediğim gibi çalıştı ve yardımcı olabileceğini düşündüğüm için paylaşmak istedim. Okuduğunuz için teşekkür ederim.

Ayrıca genel akış planlaması için [Mert Köseoğlu](https://twitter.com/mksglu)'na teşekkürler 🤙🏽

## Kaynaklar

- https://reactnative.dev/docs/linking
- https://reactnavigation.org/docs/deep-linking/
- https://github.com/proyecto26/react-native-inappbrowser
- https://github.com/proyecto26/react-native-inappbrowser/blob/develop/example/android/app/src/main/AndroidManifest.xml#L23
- https://developer.android.com/training/app-links/deep-linking#adding-filters
- https://www.appsflyer.com/resources/everything-marketer-needs-to-know-deep-linking/deep-linking-basics/
- https://www.onelogin.com/learn/how-single-sign-on-works

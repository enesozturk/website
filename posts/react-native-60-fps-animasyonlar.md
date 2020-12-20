---
title: React Native ile 60 FPS Animasyonlar
description: React Native Reanimated’e Giriş
slug: react-native-ile-60-fps-animasyonlar
date: Aug 20, 2020
---

> React Native Reanimated’e Giriş

React Native ile mobil uygulama geliştirirken daha iyi kullanıcı deneyimi sağlamak için mutlaka animasyon tasarlamanız ve kodlamanız gerekmiştir. React Native, geliştiricilere animasyonlarını tasarlaması için iki temel API sağlıyor. Bunlar Animated ve Gesture API. Bu iki API ile çok farklı animasyonları tasarlayabiliyor olsak da, dilediğimiz fonksiyonelliği yüksek performanslı sağlamak her zaman mümkün olmuyor. Bunun sebebi, React Native’in ve bu API’ların mimarisinin getirdiği bazı kısıtlamalar.

Bu yazının temel amacı olan **React Native Reanimated** kütüphanesi ise bu kısıtlamaları farklı bir bakış açısı ile çözüyor ve size dilediğiniz animasyonu **60 FPS** gibi bir performansla yürütmenizi sağlıyor. Reanimated’e giriş yapmadan önce Animated API’den biraz bahsetmek istiyorum.

## Animated API

Bildiğiniz gibi React Native ile animasyonlar hazırlamak için React Native’in bize sunduğu **Animated API**’ı kullanıyoruz. Sahip olduğu timing, spring, add, multipy.. gibi fonksiyonları ile yürütmek istediğimiz animasyonu hazırlamamıza ve bir View’ı anime etmemize olanak sağlıyor.

Fakat Animated API bazı kısıtlamalar ile beraber geliyor. Aşağıdaki görsel React Native mimarisinin basitleştirilmiş bir diagramı. İki thread’imiz var. Native kodun yürütüldüğü UI Thread (Main Thread) ve React kodumuzun yürütüldüğü JS Thread. Bu Thread’ler birbirleri ile asenkron olarak JSON mesajı alıp vererek haberleşiyorlar. Buna React Native Asynchronous Bridge (Asenkron Köprü) diyoruz. Animasyonlarımızın saniyede 60 kare ile çalışmasını istiyorsak **bir animasyon karesini** hesaplamak için yaklaşık olarak 16 milisaniyemiz var. UI ve JS Thread’leri arasındaki iletişim asenkron olarak gerçekleştiği için sonraki karenin 16 ms içerisinde hesaplanacağının garantisini veremiyoruz.

![](https://cdn-images-1.medium.com/max/2224/1*GDtQy2DPGUoNZCAHZpqDNg.png)

Eğer [requestAnimateionFrame’i](https://reactnative.dev/docs/animations#requestanimationframe) (JS ile hazırlanan animasyonlarda sonraki kareyi hesaplamak için kullanılan, saniyede 60 çağrı yapmaya çalışan bir fonksiyon) kullanarak Javascript ile animasyon yürütmeyi denersek , özellikle düşük seviyeli Android cihazlarda veya Javascript Thread’inde animasyonumuzun hesaplanacağı sırada, API istekleri, dosya sistemi veya herhangi input/output gibi işlemler yürütülüyorsa animasyonlarımızın 16 ms içerisinde hesaplanamaması çok olası.

Küçük bir örnekle bunları gerçekleyebiliriz. Üzerine dokunarak sayfada herhangi bir yere taşıyabildiğimiz bir topun olduğu aşağıdaki örneğe bakalım. Burada yorum satırında ise JS Thread’ini meşgul edecek setInterval tanımladım. Normalde topu istediğimiz gibi hareket ettirebiliyorken, yorum satırını kaldırdığımda JS Thread’inin meşgul olması bir gecikmeye sebep oluyor ve dokunma etkileşimime çok geç cevap alıyorum. Dolayısı ile kötü bir kullanıcı deneyimi ortaya çıkıyor.

![](https://cdn-images-1.medium.com/max/2484/1*5L1itaAhjMy_x3alUq3CxQ.png)

### useNativeDriver

Animated API’na, aralarında Reanimated kütüphanesinin yaratıcılarından, eski Facebook çalışanı [Krzysztof Magiera](https://twitter.com/kzzzf)’nın da katkıları ile [**useNativeDriver** özelliği gelmişti](https://reactnative.dev/blog/2017/02/14/using-native-driver-for-animated). Bu özellik, oluşturmak istediğiniz animasyonları daha başlamadan native tarafa gönderir ve her karenin köprü üstünden geçmesine gerek kalmadan native kodun UI Thread’da çalışmasını sağlar. Böylelikle JS Thread’i başka bir işlemden ötürü meşgul olsa bile animasyon düzgün bir şekilde çalışacaktır.

Fakat yine de performanslı ve çok çeşitli animasyonlar hazırlamak için useNativeDriver yeterli değil. useNativeDriver yalnızca **transform** ve **opacity** gibi non-[layout](https://reactnative.dev/docs/layout-props) özellikleri anime edebiliyor. Dokunma etkileşimlerini (Gestures) anime ederken de, React Native’in built-in dokunmatik sistemi olan JS Responder’in yapısı sebebi ile dokunma etkileşimleri konusunda bazı kısıtlamalara sahip.

Peki bu problemleri nasıl çözeceğiz? Burada devreye, temelde bu problemleri çözmek amacıyla ortaya çıkmış olan, **React Native Reanimated** kütüphanesi giriyor.

## React Native Reanimated

React Native Reanimated, Animated API’a göre daha fazla esneklik ve kontrol sağlayan, performanslı animasyonlar hazırlamanıza imkan veren bir React Native animasyon kütüphanesi.

Reanimated, animasyonlarımızı Javascript Thread’inde imperative şekilde yürütmek yerine, onları JavaScript tarafında declarative bir şekilde hazırlamamızı istiyor. Böylelikle gerekli animasyon için tanımladığımız tüm işlemler veya dokunma (gesture) etkileşimlerini UI Thread’de hesaplayıp çalıştırıyor. Yani useNativeDriver gibi bir özelliğe gerek kalmadan varsayılan olarak tüm işlemleri native tarafta gerçekleştiriyor.

Aşağıdaki tablonun sol tarafında bizim şimdiye kadar JavaScript (React) dünyasında kullandığımız fonksiyon/operatör/koşullar bulunuyor. Sağ tarafta bulunanlar ise onların UI Thread’de yürütülmesini sağlayacak, Reanimated’in sağladığı karşılıkları. Sol taraftaki ifadelerin hepsi JavaScript Thread’inde yürütülürken sağ taraftakiler ise UI Thread’de hesaplanıp/yürütülecek. Reanimated ile animasyonlar hazırlarken sağ taraftaki fonksiyonları kullanacağız.

![](https://cdn-images-1.medium.com/max/2110/1*uFzCX-mD8L3Ze50ZeQxRlg.png)

### Reanimated 2

> React Native Reanimated ekibi yakın zamanda major değişiklikler ile v2'yi duyurdular. Geliştirilen bir çok paketin hali hazırda v1'i kullanması sebebiyle bu yazı serisinin ilk bölümlerinde v1'e odaklanacağım. Performans iyileştirmelerinin yanında kod yazma kolaylığı açısından da farklılıklara sahip olan v2'ye sonraki yazılarımda giriş yapacağım. Bu yazı da ise aktardığım teorik bilgilerden sonra v1'in sağladığı fonksiyonlar ile örneklere başlayacağım.

### Örnek Uygulama

Şimdi basit bir örnek ile Reanimated’in sağladığı fonksiyonları kullanmış ve görmüş olalım. Örneğimizde ekrandaki bir component’in opacity değerini anime ederek fade in/fade out animasyonu hazırlayacağız.

Kullanacağımız Reanimated bileşen ve fonksiyonları aşağıdaki gibi import edelim.

![Reanimated’in sağladığı fonksiyon ve bileşenleri import ettiğimiz kod bloğu](https://cdn-images-1.medium.com/max/2428/1*Z02qZj8hoIGHNxQma8_qbg.png)_Reanimated’in sağladığı fonksiyon ve bileşenleri import ettiğimiz kod bloğu_

> Buradaki fonksiyonların sayısı fazla gözükmesi göz korkutsa da hepsinin anlaşılması ve kullanılması oldukça kolay.

### Animasyonun kodlanması

Şimdi animasyonumuz için gerekli kodları yazmaya başlayalım. Öncelikle anime etmek için basit bir Card ve aksiyon almak için CardToggleButton bileşenlerini tasarladım. Bunları import ederek ana bileşenimde kullanacağım. Sonuçta aşağıdaki gibi bir bileşen oluşturduk;

![](https://cdn-images-1.medium.com/max/2150/1*cToOkEFXyPqXWb-gpZzZ3Q.png)

Şimdi return ifadesinden önce gerekli değişkenlerini tanımlayarak animasyonumuzu hazırlayalım.

Anime edeceğimiz opacity özelliği için **startAnimation** adında Animated Value değişkeni oluşturdum. Daha sonra animasyonun neresinde olduğumuzu bilmek için ihtiyacımız olacak **clock** nesnesini oluşturdum. Daha sonra animasyonumuzun süresini belirlediğimiz duration değişkenini oluşturdum. Burada 1 saniyelik bir animasyon için 1000 değerini kullandım.

```js
const startAnimation = new Value(0)
const clock = new Clock()
const duration = 1000
```

Devamında animasyonun ne zaman başladığını takip edebilmek için kullanacağım **startTime** ve **endTime** değişkenlerini oluşturuyorum. Böylelikle animasyonun ne zaman bitmesi gerektiğini bileceğim. Burada dikkat ederseniz artı (+) operatörü yerine **add() **fonksiyonunu kullandım. Çünkü animasyon süresi boyunca hesaplanacak tüm işlemlerin UI Thread’de gerçekleşmesini hedefliyoruz.

```js
const startTime = new Value(0)
const endTime = add(startTime, duration)
```

Şimdi animasyonun başlangıç ve bitiş değerlerini Animated Value olarak oluşturuyorum. Böylelikle toggle işlemini gerçekleştirmesi için opacity değerini terslemek için hangi değerden başlayıp hangi değere gitmem gerektiğini biliyor olacağım. Kart gözüküyorsa başlangıç değerimiz 1 olur ve biz 0'a gideriz. Kart gözükmüyorsa başlangıç değerimiz 0 olur ve biz 1'a gideriz.

```js
const from = new Value(1)
const to = new Value(0)
```

Şimdi opacity değişkenini oluşturacağız. Burada **clock** değişkeninin değeri ile opacity değerini **interpolate** edeceğiz. Burada yapmamız gereken [interpolate fonksiyonu](https://docs.swmansion.com/react-native-reanimated/docs/nodes/interpolate/)na ilk parametre ile clock değişkenini vermek ve ikinci parametrede bir obje içerisinde gerekli giriş ve çıkış aralıklarını vermek. Giriş değeri olarak başlangıç zamanından bitiş zamanına kadar olan aralığı verdik. Animasyon 1 saniye süreceği için giriş aralığı 1000 oldu. Çıkış değeri olarak ise 0'dan 1'e olduğunu belirttik. extrapolate değeri ile de başlangıç ve bitiş değerlerinin belirttiğimiz değerlerin dışına taşmasını engellemek için **CLAMP** seçeneğini kullandık.

```js
const opacity = interpolate(clock, {
  inputRange: [startTime, endTime],
  outputRange: [from, to],
  extrapolate: Extrapolate.CLAMP
})
```

Şimdi useCode hook’unu kullanarak bu animasyon node’larının değerlerini güncelleyecek kod bloklarını hazırlayacağız. Burada koşul içerisinde startAnimation 1'e eşit ise yani animasyon tetiklenmişse, yürütülecek kod bloğu içerisinde şu işlemleri yaptık;

- Saati başlattık.
- opacity değerini başlangıç çıktı değerine (from) atadık, böylelikle animasyonun ortasında tekrar butona bastığımızda o anki durumdan tersi yönde animasyona devam edecek.
- Bitiş çıktı değerini (varmak istediğimiz değeri) belirledik
- Sayacın şu anki değerini başlangıç zamanına atadık.
- startAnimation değerini 0 yaparak tekrar tetiklenebilecek edebilecek duruma getirdik.

useCode’un ikinci parametresi olarak ise bağımlılıkları girdik. Yani bu bağımlılıklardan biri değiştiğinde üstteki kod bloğu tekrar çalıştırılacak.

```js
useCode(
  () => [
    cond(eq(startAnimation, 1), [
      startClock(clock),
      set(from, opacity),
      set(to, not(to)),
      set(startTime, clock),
      set(startAnimation, 0)
    ])
  ],
  [clock, from, startAnimation, startTime, to]
)
```

Farkettiyseniz kod bloğunda if, ==, ;, setState, gibi ifadeler yerine tamamen Reanimated’in sağladığı fonksiyonları kullanarak ifadelerimizi tanımladık.

Son olarak Anime etmek istediğimiz View’ı aşağıdaki gibi güncelliyoruz. Butona aksiyon olarak startAnimation değerini 1'e çekerek tanımladığımız bloğun yürütülmesini sağlıyoruz.

```js
return (
  <View>
    <Animated.View style={{ opacity }}>
      <Card />
    </Animated.View>
    <CardToggleButton
      onPress={() => {
        startAnimation.setValue(1)
      }}
    />
  </View>
)
```

Çıktı olarak aşağıdaki gibi bir sonuç elde ettik.

![](https://cdn-images-1.medium.com/max/2000/1*kSfIefkFtVp9f2cC5EzcXg.png)

![Geliştirdiğimiz bileşenin son hali ve çıktısı](https://cdn-images-1.medium.com/max/2000/1*IqMLh7DOLTbBlEqkvNTD9Q.gif)_Geliştirdiğimiz bileşenin son hali ve çıktısı_

Hazırladığımız animasyon basit olmasına rağmen bu kadar kod bloğuna sahip olması biraz göz korkutabiliyor. Fakat Reanimated’in Native performans sağlamak için bize sunduğu fonksiyonların çoğunu görmek adına güzel bir örnek oldu. Böyle bir animasyon için tek yol bu olmadığı gibi bu haliyle bazı eksiklikleri içeriyor. Bu örnek ve diğer geliştireceğim örnekler için aşağıdaki repoyu kullanacağım:

[**enesozturk/react-native-reanimated-workshop**](https://github.com/enesozturk/react-native-reanimated-workshop)

Umarım Reanimated’e giriş için faydalı bir yazı olmuştur. Bundan sonraki yazılarda Reanimated 2'ye giriş yapmayı ve onun üzerinden örnekler ile devam etmeyi düşünüyorum. Herkese mutlu kodlamalar 🥳

Kaynaklar:

- [https://docs.swmansion.com/react-native-reanimated/](https://docs.swmansion.com/react-native-reanimated/)
- [https://reactnative.dev/docs/animated](https://reactnative.dev/docs/animated)
- [https://reactnative.dev/blog/2017/02/14/using-native-driver-for-animated](https://reactnative.dev/blog/2017/02/14/using-native-driver-for-animated)
- [https://www.youtube.com/watch?v=kdq4z2708VM](https://www.youtube.com/watch?v=kdq4z2708VM)
- [https://start-react-native.dev/](https://start-react-native.dev/)
- [https://www.freecodecamp.org/news/how-react-native-animations-work/](https://www.freecodecamp.org/news/how-react-native-animations-work/)

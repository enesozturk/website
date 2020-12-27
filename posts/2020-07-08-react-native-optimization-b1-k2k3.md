---
title: React Native Uygulamamı Nasıl Optimize Ederim? [B1:K2-3]
description: Belli amaçlar için üretilmiş bileşenleri kullanın
slug: react-native-optimization-b1-k2k3
date: Jul 8, 2020
---

## 2. Belli amaçlar için üretilmiş bileşenleri kullanın

> Kullanıcı deneyimi ve performansı arttırmak için dedicated yüksek görevli bileşenleri nasıl kullanacağınızı bulun.

### Sorun: React Native’in sunmuş olduğu high order bileşenlerin farklında değilsiniz

React Native’de her şey bileşenlerden oluşur. Bileşen hiyerarşisinde Text, View, TextInput gibi ilkel (primitive) bileşenler bulunur. Uygulama geliştirirken, onu küçük bloklara böleriz. Bunun için ilken bileşenleri kullanırız. Örnek olarak bir Giriş Yap sayfasında girdi almak için peş peşe TextInput’lar, butonlar için Touchable bileşenler kullanırız. Bu gayet doğru bir yaklaşımdır.

React Native bize belli amaçlar için üretilmiş üst düzey (high order) bileşenler sunar. Bunların farkında olmamak veya kullanmamak performans sorunlarına yol açabilir.

### Veri büyüdükçe özel bileşenleri kullanmamak performans ve kullanıcı deneyiminizi etkileyecektir.

Eğer özel bileşenleri kullanmıyorsanız, uygulamanı production’ çıktığında performans iyileştirmeleri yapmaktan ve risk azaltılmış kullanıcı deneyiminden uzaklaşmış olursunuz. Özel bileşenler daha kapsamlıdır ve mobil senaryoların çoğunu kapsayacak geniş API'lere sahiptir.

### Çözüm: Her zaman özel bileşenleri kullanın. [Örnek: Listeler için FlatList]

Bir liste oluşturmanın en hızlı ve en kötü yolu ScrollView içinde View primitive bileşenlerini render etmektir. Bu, data büyüdüğü zaman sizi bir soruna sürükler. Büyük veri setleri, sonsuz kaydırma, bellek yönetimi, FlatList bileşenin arkasında hali hazırda ele alınmış konulardır.

5000’tane veriyi render eden bir listeyi ScrollView/View ve FlatList yöntemleri ile ayrı ayrı ele aldığınızda farklı gözlemleyebilirsiniz. ScrollView/View yöntemi sağlıklı bir şekilde scroll (kaydırma) etmeye bilir bile.

**Sonuç olarak, FlatList arkaplanda ScrollView ve View bileşenlerini kullanıyor. Peki fark nedir?**

FlatList, çok fazla deneyimsel ve gelişmiş JavaScript hesaplamalarına sahiptir ve böylelikle fazladan render’ları en aza indirger. Bununla beraber verilerinizi ekranda gösterirken har zaman kaydırma deneyimini 60 FPS’te sağlar.

Sadece FlatList kullanmak bazı durumlarda yeterli değildir. FlatList’in performans iyileştirmesi ekranda gösterilmeyen veririnin render edilmemesi üzerine dayalıdır. Bu işlemin en masraflı kısmı yerleşim hesaplamasıdır. FlatList bizin yerleşiminizi ölçer ve kaydırma alanı için ne kadar alan atanacağını hesaplar.

### Yararları: Uygulamanız daha hızlı çalışır. Karmaşık veri yapılarını görüntüler ve daha fazla iyileştirme için size olanak sağlar.

Özel bileşenler sağolsun ki, uygulamanız her zaman ne kadar hızlı olabilirse o kadar hızlı çalışacaktır. React Native sayesinde otomatik olarak performans iyileştirmesini yapmış oluyorsunuz. Sonraki gelişmeler için bu bileşenleri takip etmeyi unutmayın.

Aynı zamanda FlatList ile sabit bölüm başlığı, kaydırarak yenileme gibi bazı genel arayüz tasarımlarını da uygulamış oluyorsunuz.

## 3. Harici kütüphane seçerken iki kez düşünün

> Hangi JavaScript kütüphanesi ile çalışacağınızı bilmek uygulamalarınızın hızını ve performansını arttırmanızı sağlayabilir.

### Sorun: İçinde tam olarak ne olduğunu bilmediğiniz paketleri seçiyorsunuz

Genellikle, sıfırdan React Native bileşenleri geliştirmek yerine bize işimizi kolaylaştıracak yardımcı JavaScript kütüphaneleri kullanırız. JavaScript ekosistemi böyle bir geliştirmeye teşvik eder ve uygulama yapısını küçük ve tekrar kullanılabilir modüllere bölmenizi sağlar.

Böyle bir ekosistem çok fazla avantajı olduğu gibi ciddi dezavantajlara da sahiptir. Bunlardan biri, geliştiricilerin çok fazla kütüphaneden hangisini seçmekte zorluk çekmesi. Bir kütüphaneyi projeniz için seçerken, genellikle kütüphanenin sağlıklı olduğunu, bakımının yapıldığını anlamak için Github’daki yıldız, issue katılımcı vs PR sayılarına bakarlar. Gözden kaçırdıkları nokta şudur ki kütüphanenin boyutu, sağladığı özellik sayısı ve kullandığı harici başka kütüphaneler de göz artı edilmemelidir. Bir diğer düştükleri yanılgı da şudur ki, React Native tamamen JavaScript’ten oluştuğunu düşünmek. Bu yüzden web uygulamalarında kullandıkları kısıtlamalar ve egzersizler ile çalışıyorlar. Fakat, mobil geliştirme temelde farklıdır ve kendi kuralları vardır.

### Karmaşık kütüphaneler uygulama hızına zarar verir

Full native uygulamadan farklı olarak React Native uygulaması JavaScript bundle’ı içerir vs bunu bellekte tutar. Daha sonra bu JavaScript Virtual Machine üzerinde ayrıştırılır (parse) ve çalıştırılır. JavaScript kod boyutu performans için önemli bir noktadır.

### Çözüm: Daha seçici olun ve küçük özelleştirilmiş kütüphaneler kullanın.

Bu sorunların üstesinden gelmenin en kolay yolu projeyi önceden yaplandırmak ve doğru stratejiyi kullanmaktır.

Eğer karmaşık bir kütüphane kullanacaksanız, o kütüphanenin sizin işinizi görecek daha küçük hali olup olmadığına bakın.

Bir örnek verelim: En genel işlemlerden biri tarihler üzerindeki değişiklik yapmaktır. Diyelim ki geçen süreyi hesaplayacaksınız. Bunun için Moment JS (67.9 Kb) kullanmak yerine daha küçük boyutlu Day JS (2 Kb)’i kullanabilirsiniz.

```jsx
// moment.js
import moment from ‘moment’
const date = moment(“12-25-1995”, “MM-DD-YYYY”);

// day.js
import dayjs from ‘dayjs’
const date = dayjs(“12-25-1995”, “MM-DD-YYYY”);
```

Eğer başka bir alternatifiniz yoksa, kütüphanenin yalnızca bir parçasını yükleyebiliyor olduğunuza bakın.

```jsx
// Tüm lodash kütüphanesini import etmiş olduk
import { map } from ‘lodash’;
const square = x => x * x; map([4, 8], square);

// Yalnızca ilgili fonksiyonu eklemiş olduk
import map from ‘lodash/map’;
const square = x => x * x; map([4, 8], square);
```

### Faydaları: Uygulamanız daha hızlı yüklenir

Daha hızlı başlatma süresi, daha pürüzsüz etkileşimler, genel görünüm ve his, uygulamanızı diğerlerinin arasından sıyrılmasını sağlar.

[Akamia’nın şu raporuna](https://www.akamai.com/us/en/multimedia/documents/report/akamai-state-of-online-retail-performance-2017-holiday.pdf) göre mobil yükleme sürelerinde yalnızca bir saniyelik bir gecikme geri dönüş oranlarınızı %20 düşürebilir.

Bu yüzden, doğru kütüphane seçiminin önemini göz ardı etmemelisiniz. Üçüncü taraf bileşenlerde daha seçici olmak ilk başta önemsiz gelebilir. Ama kaydedilen tüm milisaniyeler zaman içinde önemli kazanımlar sağlayacaktır.

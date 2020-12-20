---
title: React Native Uygulamamı Nasıl Optimize Ederim? [B1:K5]
description: Native ile JavaScript arasındaki dengeyi sağlayın
slug: react-native-uygulamami-nasil-optimize-ederim-b1-k5
date: Jul 12, 2020
---

## 5. Native ile JavaScript arasındaki dengeyi sağlayın

> Hızlı çalışan ve kolay geliştirilen uygulamalar için native ve JavaScript arasındaki dengeyi bulun

### Sorun: Native modüller ile çalışırken, native ve JavaScript arasındaki çizgiyi yanlış yere çiziyorsunuz

React Native ile çalışırken çoğunlukla JavaScript geliştirmesi yapıyorsunuz. Ancak native code yazmanızı gerektirecek bazı durumlar olacak. Örneğin, React Native desteği olmayan üçüncü parti bir SDK ile çalışıyorsunuz. Bu durumda native modül oluşturup bunu React Native için çıktısını almalısınız.

React Native, köprü (bridge) adı verilen, JavaScript ve Native taraf arasında iki yönlü iletişim yapan bir soyutlama üzerine kuruludur. Bu iletim eş zamanlı değildir (asynchronous). Bu, iletişimde bir çağrı yapan kişinin sonuçlarının gelmesini beklerken, JavaScript’in hala çalışmakta olduğunu ve başka bir görev için hazır olabileceği anlamına gelir.

Köprüye gelen JavaScript çağrılarının sayısı belli değildir ve uygulamanızda yaptığınız etkileşimleri sayısına bağlı olarak zaman içinde değişebilir. Ek olarak, her bir çağrı zaman alır. Çünkü JavaScript argümanlarının bu iki bölge tarafından anlaşılabilen bir format olan JSON’a çevrilmesi gerekir.

Örneğin, köprü bir veriyi işlerken meşgul olduğunda, başka bir çağrıyı bloklaması ve bekletmesi gerekecektir. Eğer bu bu etkileşim dokunma (gesture) ve animasyon işlemleri ile ilgiliyse, muhtemelen frame düşüşü yaşarsınız. Bazı kütüphaneler başka işler gerçekleşirken, animasyonlar sırasında bu frame kaybını önlemek için tasarlanmıştır. Bu yüzden köprü iletişimini etkili ve hızlı tasarlamak önemlidir.

### Köprü üzerindeki fazla trafik başka işler için daha az alana sebep olur

Köprü üzerindeki fazla trafik demek, React Native’in aynı anda transfer etmek istediği diğer önemli şeyler için daha az alan demektir. Sonuç olarak uygulamanız dokunmatik ve diğer etkileşimlere cevap vermemeye başlar.

### Çözüm: JavaScript tarafında doğru sayıda soyutlama yapın

Native bir modül geliştirirken, çağrıyı hemen native tarafa iletmek ve gerisini orada halletmek iyidir. Fakat doğru argüman setini sağlamamak, doğru argümanların sağlanıp sağlanmadığını kontrol etmek için tüm köprü üzerinde git gel yapmak gibi bazı istenmeyen durumlar olabilir.

Çağrıyı Native modüllere iletmekten başka bir şey yapmayan bir JavaScript modülünü inceleyelim.

```jsx
import { NativeModules } from 'react-native'
const { ToastExample } = NativeModules

export const show = (message, duration) => {
  ToastExample.show(message, duration)
}
```

Eksik bir parametre gönderme durumunda muhtemelen native modül exception (istisna) fırlatacaktır. React Native’in mevcut sürümü JavaScript parametrelerinin ve native kodunuz için gereken parametrelerin senkronize olmasını sağlamak için bir soyutlama sağlamaz. Çağrınız JSON’a dönüştürülür, Native tarafa iletilir ve çalıştırılır.

Bu işlem, çalışması için doğru argümanların hepsini vermesek bile bir sorun çıkartmadan çalışacaktır. Hata, çağrı native tarafta işlendiğinde ve native modül istisna fırlattığında gelecektir.

Böyle bir senaryoda, önceden kontrol etmediğiniz bir hatanın fırlatılmasını bekleyerek vakit kaybedeceksiniz.

```jsx
import { NativeModules } from 'react-native'
const { ToastExample } = NativeModules

export const show = (message, duration) => {
  if (typeof message !== 'string' || message.length > 100) {
    throw new Error('Invalid Toast content!')
  }
  if (!Number.isInteger(duration) || duration > 20000) {
    throw new Error('Invalid Toast duration!')
  }
  ToastExample.show(message, duration)
}
```

Üstteki kod yalnızca native modüle bağlı değildir. Her React Native temel bileşeninin, native tarafta eşdeğeri vardır ve prop’ları her defasında köprü üzerinden geçer ve yeni bir render’lama gerçekleşir. Bu Native metodların JavaScript argümanları ile işlenmesi gibidir.

Bunu daha iyi bir açıdan incelemek için React Native’de stillendirme örneğine bakalım.

```jsx
import * as React from 'react'
import { View } from 'react-native'

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{
            backgroundColor: 'coral',
            width: 200,
            height: 200
          }}
        />
      </View>
    )
  }
}
```

Bir bileşeni stillendirmenin en kolay yolu ona stil objesi vermektir. Eğer dinamik stil değişkenleri ile çalışmıyorsanız bu bir anti-patterndir.

```jsx
import * as React from 'react'
import { View, StyleSheet } from 'react-native'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.caontainer}>
        <View style={styles.box} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    backgroundColor: 'coral',
    width: 200,
    height: 200
  }
})
```

React Native, stilleri köprü üzerinden geçirmek için çoğunlukla StyleSheet API’sini kullanır. Bu API stillerinizi işler ve köprü üzerinden yalnızca bir defa geçtiklerinden emin olur. Çalışmaanı boyunca, Stil prop’unu Native taraftaki önbelleğe (cache) alınmış stil ile değiştirir.

Sonuç olarak React Native’e, arayüzü güncellemek için her defasında büyük nesne dizileri göndermek yerine, köprü, bu işlemleri çok daha kolay işler ve transfer eder.

### Yararları: Kod daha hızlı ve sürdürülebilir

Şu anda performans sorunları ile karşılaşıyorsanız, bu gibi alıştırmaları native tarafta uygulamak iyi olabilir. Bu yalnızca hız kazandırmaz aynı zamanda iyi bir kullanıcı deneyimi sağlar.

Köprü üzerindeki trafiğin akışını doğru noktada tutmak uygulama performansına önemli bir katkıda bulunacaktır. Burada gördüğünüz gibi, bazı teknikler zaten React Native içerisinde, performansı düşünmemeniz için kullanılıyor. Bunların farkında olmak, yüksek yük altında bile daha iyi uygulamalar üretmenizi sağlayacaktır.

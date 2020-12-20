---
title: React Native Uygulamamı Nasıl Optimize Ederim? [B1:K4]
description: Her zaman mobile platform için hazırlanmış kütüphaneleri kullanın
slug: react-native-uygulamami-nasil-optimize-ederim-b1-k4
date: Jul 10, 2020
---

## Her zaman mobile platform için hazırlanmış kütüphaneleri kullanın

> Performansa ve kullanıcı deneyimine ödün vermeden mobil cihazlar için tasarlanmış kütüphaneleri kullanın

### Sorun: Mobil odaklı optimize edilmemiş web kütüphaneleri kullanıyorsunuz

React Native web uygulaması geliştirir gibi bir fonksiyonelliğe sahip olsa da, aynı geliştirme ortamında olmadığınızı unutmayın. Mobil geliştirmenin kendi kuralları, uygulamaları ve sınırları vardır.

Örneğin, web uygulaması ile çalışırken, CPU kaynaklarının ne kadar ayrılması gerektiğini düşünmeyiz. Bunun dışında çoğu web uygulaması internete bağlı ve güçlü bataryası olan cihazlar üzerinde çalışır (bilgisayarlar).

### Optimize edilmemiş kütüphaneler fazla batarya tüketimine ve uygulamanızın yavaşlamasına sebep olur. Mobil işletim sistemi uygulamanızın yapabileceklerini kısıtlayabili\*\*

Eğer kullanacağınız kütüphane network işlemleri yapıyorsa, real-time mesajlaşma sağlıyorsa veya ileri seviye grafikler render ediyorsa, mobil odaklı geliştirilmiş bir kütüphaneyi kullanmanız tavsiye edilir. Sebebi basit; bu kütüphaneler tarayıcı yetenek ve sınırlarını göz önüne alınarak web için geliştirildi.

### Çözüm: Kütüphanenizin mobil odaklı, platform bazlı versiyonunu kullanın

Firebase örneğini ele alalım. Firebase web ve mobile için SDK’lar içerir. Her SDK Realtime Database özelliğini destekler.

React Native sağolsun, bir sorun yaşamadan Firebase’in web versiyonunu kullanabilirsiniz. Fakat bunu yapmamalısınız. Aşağıdaki örnek bir sorun olmadan çalışabilir, fakat mobile odaklı geliştirilmiş kütüphane ile aynı performansı sağlamaz.

```jsx
import database from ‘firebase/database’;

database() .ref(‘/users/123’) .on(‘value’, snapshot => {
	console.log(‘User data: ‘, snapshot.val());
});
```

Bir de aynı kütüphanenin mobil için geliştirilmiş SDK’sını kullanalım;

```jsx
import database from ‘@react-native-firebase/database’;

database() .ref(‘/users/123’) .on(‘value’, snapshot => {
	console.log(‘User data: ‘, snapshot.val());
});
```

Burada gördüğünüz gibi, çok küçük bir değişimle önemli bir fark yarattık.

### Faydaları: Batarya ömrüne zarar vermeden en hızlı ve performanslı desteği sağladık

Basit şeyler ve maksimum yeniden kullanılabilirlik için kütüphanenin web versiyonunu kullanabilirsiniz. Bu, tarayıcıda harcadığınız az çaba ile aynı özelliklere erişmenizi sağlar.

Ama ileri seviye durumlar için React Native’i mobile SDK ile konuşturabilir ve native fonksiyonellikle genişletebilirsiniz. Böyle bir seçenek performans ve kullanıcı deneyiminde ödün vermeden bir çok platformda aynı anda daha hızlı özellikler oluşturmanıza olanak tanır.

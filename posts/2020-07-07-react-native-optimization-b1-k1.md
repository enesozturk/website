---
title: React Native Uygulamamı Nasıl Optimize Ederim? [B1:K1]
description: UI Re-render'lara dikkat edin
slug: react-native-uygulamami-nasil-optimize-ederim-b1-k1
date: Jul 7, 2020
---

> Bu not, The Ultimate Guide to React Native Optimization kitabından çevrilmiş notları içermektedir.

React Native, oluşturduğunuz arayüz bileşenlerini, çalışmaanı’nda platforma özel native bileşenlere dönüştürür. Tüm bileşenler size aynı performans ve esnekliği sağlar. Altta yatan bu API ile doğrudan çalışmak yerine siz arayüze odaklanırsınız.

React Native declarative bir kütüphanedir ve rendering işlemini kendisi çözer. Yani uygulamanın ne zaman render edileceğini siz düşünmezsiniz. Sizin işiniz arayüz bileşenlerini oluşturmaktır.

Ancak bu, React Native ile geliştirdiğiniz uygulamanızın aynı hız ve kullanıcı deneyimine sahip olacağı anlamına gelmez. iOS ve Android API çağrılarının performansı hakkında endişelenmemenize gerek olmasa da, bileşenlerinizi nasıl kullandığınız bir fark yaratır.

## 1. UI Re-renderlara dikkat edin

> State işlemlerinin sayısını optimize edin, [Pure](https://www.google.com/search?client=opera&q=pure+components&sourceid=opera&ie=UTF-8&oe=UTF-8) ve [Memoized](https://www.google.com/search?client=opera&q=memoized+components&sourceid=opera&ie=UTF-8&oe=UTF-8) bileşenleri kullanarak uygulamanızı daha az kaynak ihtiyacı ile daha hızlı hale getirin.

Uygulamanın render edilmesi React Native’in sorumluluğundadır. React, bileşenlerinizin (component) üzerindeki değişiklikleri izler, birbiri ile karşılaştırır ve mimarisi gereği bileşenleri yalnızca gerektiğinde tekrar render eder.

Bir bileşen, içinde bulunduğu ebeveyn bileşen tekrar render edildiğinde veya prop’ları değiştiğinde tekrar render edilir.

### Sorun: Gereksiz state güncellemeleri fazladan render döngülerine sebep olur

Yalnızca gerektiğinde ve en az sayıda değişimi izlese de çok fazla state operasyonu performans sorunlarına yol açar. Özellikle düşük performanslı telefonlarda.

### Çözüm: State işlemlerinin sayısını optimize edin ve Pure ve Memoized bileşenleri gerektiği gibi kullanın

Uygulamanızın gereksiz render döngüsüne sokmanın çok fazla yolu vardır. Bu bölümde iki farklı senaryoya değineceğiz. **Controlled Bileşen** ve **Global State**.

### Controlled vs Uncontrolled Bileşenler

Neredeyse her React Native uygulamasında TextInput bileşeni bulunur ve içinde bulunduğu bileşenin state’i ile kontrol edilir. Aşağıdaki gibi;

```jsx
import React, { Component } from ‘react’;
import { TextInput } from ‘react-native’;

export default function UselessTextInput() {
	const [value, onChangeText] = React.useState(‘Text’);

	return (
    <TextInput
        style={{ height: 40, borderColor: ‘gray’, borderWidth: 1 }}
        onChangeText={text => onChangeText(text)}
        value={value}
        />
    );
}
```

Ancak yavaş çalışan cihazlarda ve kullanıcının çok hızlı yazdığını farz ettiğimiz durumlarda arayüz güncelleme problemleri ortaya çıkabilir. Bunun sebebi **React Native’in asenkron yapısıdır.**

Bu senkronizasyon probleminin çözümlerinden biri, value özelliğini (prop) TextInput’tan kaldırmaktır. Sonuç olarak veri tek yönlü akış sağlacaktır. Native taraftan JavaScript tarafına.

```jsx
import React, { Component, useState } from ‘react’;
import { Text, TextInput, View } from ‘react-native’;

export default function PizzaTranslator() {
    const [text, setText] = useState(‘’);

    return (
        <View style={{padding: 10}}>
					<TextInput
            style={{height: 40}}
            placeholder=”Type here to translate!”
            onChangeText={text => setText(text)}
						defaultValue={text}
	        />
        <Text style={{padding: 10, fontSize: 42}}>
            {text.split(‘ ‘).map((word) => word && ‘ ’).join(‘ ‘)}
        </Text>
  </View>
  );
}
```

Bu [videoda](https://youtu.be/83ffAY-CmL4?t=1483) bahsedildiği gibi, bu yönetim bazı durumlarda tek başına yeterli değildir. Örneğin input validation veya masking yaptığınızda, hala kullanıcının girdiği ve güncellediği veriyi kontrol etmeniz gerekebilir. React Native takımı bu sınırlamanın farkında olup aktif olarak bu ve benzeri problemleri çözecek yeni bir mimari üzerinde çalışmaktadır.

### Global State

Bir diğer genel performans sorunlarından biri, bileşenlerin global state’e nasıl bağlandığı ile ilgili. En kötü senaryo, yalnıca TextInput veya CheckBox gibi bir bileşenin state’inin değişmesi ile tüm uygulamanın state’inin değişmesi olabilir. Bunun sebebi kötü bir state management tasarımıdır.

Redux, Overmind.js gibi temel amacı state management olan ve bu iş için optimize edilmiş kütüphaneler kullanmanızı öneriyoruz.

Öncelikle, state management kütüphaneniz bileşenlerinizi yalnızca onları ilgilendiren veriler değiştiğinde güncellemeli. Bu Redux’taki **connect** fonksiyonunun temel görevidir.

Daha sonra, eğer bileşenleriniz state’inizde tuttuğunuz veriden farklı biçime sahip bir veriyi kullanıyorsa, gereği olmayan bir re-render işlemi gerçekleşebilir. Bu durumdan kaçınmak için bir seçici fonksiyon oluşturabilirsiniz.

```jsx
import { createSelector } from ‘reselect’

const getVisibilityFilter = (state) => state.visibilityFilter
const getTodos = (state) => state.todos

const getVisibleTodos = createSelector(
    [ getVisibilityFilter, getTodos ],
    (visibilityFilter, todos) => {
        switch (visibilityFilter) { case ‘SHOW_ALL’:
        return todos
        case ‘SHOW_COMPLETED’:
        return todos.filter(t => t.completed) case ‘SHOW_ACTIVE’:
        return todos.filter(t => !t.completed)
        }
    }
)

const mapStateToProps = (state) => { return {
   todos: getVisibleTodos(state)
 }
}

const VisibleTodoList = connect(mapStateToProps,null)(TodoList)

export default VisibleTodoList
```

Genel bir kötü performans uygulaması, state management kütüphanesini, React Context ile kendiniz yazacağınız bir Global State ile değiştirilebileceğinizi düşünmenizdir. Bu, başta işinizi görebilir ve kullanacağınız harici kütüphanenin kod yükünü barındırmayacağı için mantıklı gelebilir. **Ama gerekli** **optimizasyon (memoization) yapılmamış bu mekanizma büyük performans sorunlarına yol açacaktır.** Sonuçta muhtemelen Redux gibi bir kütüphane ile state’inizi tekrar tasarlayacaksınız.

Ayrıca uygulamanızı tekli bileşen seviyesine kadar optimize edebilirsiniz. Normal bileşen yerine Pure bileşeni memo wrapper ile kullanmak sizi çok fazla re-render’dan kurtarabilir.

### Faydaları: Az kaynak ihtiyacı, daha hızlı uygulamalar

Uygulama performansını sürekli düşünmelisiniz. Ama iyileştirme işlemini en baştan yapmaya çalışmayın. Çünkü buna gerek yok. Olmayan problemleri çözmeye çalışırken vakit kaybedebilirsiniz.

Zor çözüme sahip performans sorunları, kötü bir state management tasarımından kaynaklanmaktadır. İyi tasarlamış olduğunuza dikkat edin.

Tüm bu adımları göz önünde bulundurduğunuzda, uygulamanız daha az kaynak ihtiyacı ve az operasyonla işini yapacaktır. Nihayetinde, bu daha az batarya kullanımı, daha tatmin edici ve etkili kullanıcı arayüzlerine vesile olacaktır.

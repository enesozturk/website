---
title: React Native Uygulamamı Nasıl Optimize Ederim? [B1:K6]
description: Ne olursa olsun 60 FPS animasyonlar hazırlayın
slug: react-native-optimization-b1-k6
date: Jul 16, 2020
---

# Ne olursa olsun 60 FPS animasyonlar hazırlayın

> Düzgün animasyonlar ve dokunma bazlı arayüzler geliştirken 60 fps’e ulaşmak için native çözümler kullanın.

### Sorun: JS bazla animasyonlar köprü trafiğini meşgul eder ve uygulamanın yavaşlamasına sebep olur.

Mobil kullanıcılar, pürüzsüz, iyi tasarlanmış, etkileşimlerine iyi dönüş sağlayan arayüzlere alıştırlar. Web’i ele aldığınızda ilk başta düşüneceğiniz şeylerden biri bu olmayabilir ama mobil için öyle. Sonuç olarak, uygulamalar, bir çok yerinde, arkada başka bir işlem çalışmasına rağmen çalışan animasyonlar yürütmek zorundadır.

Önceki bölümden bildiğimiz gibi, köprü üzerinden geçireceğimiz bilgi sayısı kısıtlı. Bu trafikte dahili olarak öncelik belirleyicisi yok. Yani, hem iş hem de animasyonları beraber yürütecek fonksiyonların tasarımı size kalmış durumda. Örneğin iOS’ta yerleşik API’ler uygun önceliğe sahip olacak şekilde planlama yapar ve böylelikle iyi performans sunar.

React Native’de işler biraz daha farklı. Eğer animasyonlarınızı baştan aşağı önceden düşünmezseniz ve bu iş için doğru araçları kullanmazsanız, frame (kare) düşüşleri ile çok yakında karşılaşacaksınız.

### Yavaş animasyonlar uygulama hakkındaki görüşleri etkiler ve bitmemiş görünmesine sebep olur.

Mobil kullanıcılar animasyonları her zaman pürüzsüz ve eğlenceli çalışan, kaliteli gözüken uygulamaları severler. Bu deneyimi yaratan temel bir parçadır.

### Çözüm: Mümkünse, native ve doğru animasyonları kullanın

**Bir kerelik animasyonlar**

Native sürücü kullanımı animasyon performansını yükseltmek için en kolay yollardan biridir. Fakat, native sürücü ile beraber kullanılabilen stil özellikleri sınırlıdır. Native sürücüyü, dönüşümler (transformations), görünürlük (opacity) gibi değerler için kullanılır fakat renk, yükseklik gibi değerler ile kullanılamaz. Bunlar animasyonları hepsi için yeterli değildir. Çünkü genellikler bir şeyleri göstermek/gizlemek, konumunu değiştirmek istiyorsunuz.

```jsx
const fadeAnim = useRef(new Animated.Value(0)).current

const fadeIn = () => {
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true // enables native driver
  }).start()
}

// [...]

;<Animated.View style={{ opacity: fadeAnim }} />
```

Daha karmaşık durumlar için React Native Reanimated kütüphanesini kullanabilirsiniz. Bu paket temel Animated kütüphanesini low-level fonksiyonlarını barındırdığı gibi, ayrıca tüm stil özelliklerinin native sürücü ile kullanmanızı sağlıyor. Ancak, yükseklik, renk gibi değerleri anime etmek sorun olmamasına rağmen, dönüşüm, görünürlük gibi animasyonlar GPU destekli çalıştığı için yine de bir nebze daha hızlı çalışacaktır. Ama normal kullanıcılar bu farkı anlamayacaklardır.

**Dokunma temelli animasyonlar**

Animasyonlar ile en çok yapılmak istenen şey onu dokunma ile kontrol etmektir. Kullanıcılar için bu, arayüzün en eğlenceli kısmıdır. Güçlü bir his oluşturur ve uygulamayı pürüzsüz ve esnek hissettirir. React Native dokunma ile native güdümlü animasyonları beraber yürütmeye geldiğinde çok kısıtlıdır.

Daha karmaşık durumlar için bir diğer harika kütüphane React Native Gesture Handler’dır. Bu kütüphane dokunma etkinliklerini native olarak çözer. Onu Animated ile beraber kullanarak basit bir kaydırmalı element oluşturabilirsiniz. Fakat yinede JS callback’lerine ihtiyaç duyar. Tabiki bunun da bir çaresi var.

Dokunma bazlı animasyonlar için en güçlü çözüm, React Native Reanimated ve React Native Gesture Handler kütüphanelerinin beraber kullanılmasıdır. Bu paketler beraber kullanılmak için tasarlanmıştır ve karmaşık dokunmatik animasyonları native tarafta hesaplamak için olanak sağlar. Buradaki tek sınır sizin yapabileceklerinizdir.

```jsx
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import runSpring from './runSpring'
const {
  set,
  cond,
  eq,
  add,
  multiply,
  lessThan,
  stopClock,
  sub,
  defined,
  Value,
  Clock,
  event
} = Animated

class Snappable extends Component {
  constructor(props) {
    super(props)

    const TOSS_SEC = 0.2
    const dragX = new Value(0)
    const state = new Value(-1)
    const dragVX = new Value(0)

    this._onGestureEvent = event([
      { nativeEvent: { translationX: dragX, velocityX: dragVX, state: state } }
    ])

    const transX = new Value()
    const prevDragX = new Value(0)

    const clock = new Clock()

    const snapPoint = cond(
      lessThan(add(transX, multiply(TOSS_SEC, dragVX)), 0),
      -100,
      100
    )

    this._transX = cond(
      eq(state, State.ACTIVE),
      [
        stopClock(clock),
        set(transX, add(transX, sub(dragX, prevDragX))),
        set(prevDragX, dragX),
        transX
      ],
      [
        set(prevDragX, 0),
        set(
          transX,
          cond(defined(transX), runSpring(clock, transX, dragVX, snapPoint), 0)
        )
      ]
    )
  }
  render() {
    const { children, ...rest } = this.props
    return (
      <PanGestureHandler
        {...rest}
        maxPointers={1}
        minDist={10}
        onGestureEvent={this._onGestureEvent}
        onHandlerStateChange={this._onGestureEvent}
      >
        <Animated.View style={{ transform: [{ translateX: this._transX }] }}>
          {children}
        </Animated.View>
      </PanGestureHandler>
    )
  }
}

export default class Example extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Snappable>
          <View style={styles.box} />
        </Snappable>
      </View>
    )
  }
}

const BOX_SIZE = 100

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  box: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderColor: '#F5FCFF',
    alignSelf: 'center',
    backgroundColor: 'plum',
    margin: BOX_SIZE / 2
  }
})
```

Dokunma etkinliklerini low-level’da ele almak kolay olmayabilir. Ama neyse ki, CallbackNodes (Animated.Value)’u kullanan ve işleyen 3. parti kütüphaneler var. Değer aralığı genellikle 0-1 arasındadır. Fakat bunu enterpolasyon işlemi ile genişletebilirsiniz. CallbackNode’u kullanan güzel örneklerden biri react-native-bottom-sheet ve react-native-tab-view kütüphaneleridir.

```jsx
import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Animated from 'react-native-reanimated'
import BottomSheet from 'reanimated-bottom-sheet'
import Lorem from './Lorem'
const { Value, interpolate } = Animated
export default class Example extends React.Component {
  gestureCallbackNode = new Value(0)
  contentPos = this.gestureCallbackNode
  renderHeader = name => (
    <View
      style={{
        width: '100%',
        backgroundColor: 'lightgrey',
        height: 40,
        borderWidth: 2
      }}
    >
      <Text style={{ textAlign: 'center', fontSize: 20, padding: 5 }}>
        Drag me
      </Text>{' '}
    </View>
  )
  renderInner = () => (
    <View style={{ backgroundColor: 'lightblue' }}>
      {' '}
      <Animated.View
        style={{
          opacity: interpolate(this.contentPos, {
            inputRange: [0, 1],
            outputRange: [1, 0]
          }),
          transform: [
            {
              translateY: interpolate(this.contentPos, {
                inputRange: [0, 1],
                outputRange: [0, 100]
              })
            }
          ]
        }}
      >
        <Lorem />
        <Lorem />{' '}
      </Animated.View>{' '}
    </View>
  )

  render() {
    return (
      <View style={styles.container}>
        {' '}
        <BottomSheet
          callbackNode={this.gestureCallbackNode}
          snapPoints={[50, 400]}
          initialSnap={1}
          renderHeader={this.renderHeader}
          renderContent={this.renderInner}
        />{' '}
      </View>
    )
  }
}
const IMAGE_SIZE = 200
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
```

### JavaScript işlemlerinize düşük öncelik verin

Animasyon uygulamasını (implementation) tamamiyle kontrol etmek her zaman mümkün olmayabilir. Örneğin, React Navigation, React Native Gesture Handler ve Animated birleşimini kullanıyor ki buna rağmen çalışmaanı’nda JavaScript kontrolüne ihtiyaç var. .......

```jsx
import React, { useState, useRef } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Button,
  Animated,
  InteractionManager,
  Platform
} from 'react-native'
import Constants from 'expo-constants'
const ExpensiveTaskStates = {
  notStared: 'not started',
  scheduled: 'scheduled',
  done: 'done'
}
export default function App() {
  const animationValue = useRef(new Animated.Value(100))
  const [animationState, setAnimationState] = useState(false)
  const [expensiveTaskState, setExpensiveTaskState] = useState(
    ExpensiveTaskStates.notStared
  )
  const startAnimationAndSchedlueExpensiveTask = () => {
    Animated.timing(animationValue.current, {
      duration: 2000,
      toValue: animationState ? 100 : 300,
      useNativeDriver: false
    }).start(() => {
      setAnimationState(!animationState)
    })
    setExpensiveTaskState(ExpensiveTaskStates.scheduled)
    InteractionManager.runAfterInteractions(() => {
      setExpensiveTaskState(ExpensiveTaskStates.done)
    })
  }
  return (
    <View style={styles.container}>
      {' '}
      {Platform.OS === 'web' ? (
        <Text style={{ textAlign: 'center' }}>
          !InteractionManager works only on native platforms. Open example on
          iOS or Android!
        </Text>
      ) : (
        <>
          <Button
            title="Start animation and schedule expensive task"
            onPress={startAnimationAndSchedlueExpensiveTask}
          />{' '}
          <Animated.View
            style={[styles.box, { width: animationValue.current }]}
          >
            <Text>Animated box</Text>{' '}
          </Animated.View>
          <Text style={styles.paragraph}>
            Expensive task status:{' '}
            <Text style={{ fontWeight: 'bold' }}>{expensiveTaskState}</Text>{' '}
          </Text>
        </>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    paddingTop: Constants.statusBarHeight,
    padding: 8
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center'
  },
  box: {
    backgroundColor: 'coral',
    marginVertical: 20,
    height: 50
  }
})
```

Bu React Native kodu, çalışan bir animasyon bittikten sonra herhangi bir kodun çalışmasını sağlıyor. Pratikte, asıl arayüzün render olmasını beklerken bir placeholder gösterebilirsiniz. JavaScript animasyonlarınızı daha pürüzsüz yapacak ve diğer işlemlerin onu bölmesini engelleyecektir. Pürüzsüz olması genellikle harika bir deneyim için yeterlidir.

### Yararları: 60 FPS’te dokunmatik ve pürüzsüz animasyonların keyfini çıkartın

React Native’de animasyonlar üretmenin tek doğru bir yolu yok. Ekosistem farklı yaklaşımlara sahip çok farklı kütüphaneler ile dolu. Bu bölümdeki düşünceler sadece pürüzsüz arayüz üretmeniz için önerilerimiz. Daha önemli olan şey, her şeyi baştan aşağı kafanızda resmetmeniz ve ihtiyacınız için doğru seçimi yapmanız. JavaScript bazlı animasyonların da iyi çalışacağı durumlar olduğu gibi sadece native animasyonlar ile pürüzsüz yapabileceğiniz durumlar olacaktır.

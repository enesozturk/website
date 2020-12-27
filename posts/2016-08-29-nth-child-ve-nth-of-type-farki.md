---
title: nth-child ile nth-of-type arasındaki fark nedir?
description: nth-child ve :nth-of-type seçicileri
slug: nth-child-ve-nth-of-type-secicileri
date: Aug 27, 2016
---

Merhabalar, CSS'te benim biraz kafamı karıştıran konu olan _nth-child_ ve _nth-of-type_ seçicilerinden bahsetmek istiyorum.

İki seçici bazı durumlarda aynı rakam ile aynı elementleri seçselerde aslında farklı şeyler olduğundan her zaman aynı sonucu vermezler.

`nth-child` : Bu seçici ile **_aynı düzeydeki_ elementlerden index numarasına göre seçim yaparız.** (_0'dan başlamaz dikkat!_)
Başına bir tag ismi koymaz isek `body` tagı içerisindeki tüm _parent_ elementler arasından seçim yapar.
Tag ismi koyar isek o tag'ler arasından seçim yapar. Hemen bir örnek verelim.

`:nth-of-type`: Bu seçici ise _türe_ göre seçim yapar. :nth-child'ın aksine başında tag bulundurmaz isek, **aynı düzeydeki _değil_, aynı türdeki tüm elementler arasında seçim yapar.**

```html
<div class="container">
  <ul class="list-group">
    <li class="list-group-item">Apple</li>
    <li class="list-group-item">Orange</li>
    <li class="list-group-item">Banana</li>
    <li class="list-group-item">Kiwi</li>
  </ul>
  <p>Hello!</p>
  <p>My name is</p>
  <p>Enes</p>
  <ul class="list-group">
    <li class="list-group-item">A</li>
    <li class="list-group-item">B</li>
    <li class="list-group-item">C</li>
    <li class="list-group-item">D</li>
  </ul>
</div>
```

Mesela böyle bir yapımız var. Burada _parent_ elementimiz _.container_'dır

```
:nth-child(2){
   background:red;
}
```

En genelde _parent_ olarak sadece `.container` class'ına sahip div olduğu için ve biz de `2` indexi seçtiğimiz için onu(.container) atlar(çünkü divimiz 1. indextedir), **_body_ tagini bulur**, onu kırmızı yapar. Tüm ekran kırmızı olur.

Bazı durumlarda bu yöntem kullanılabilir fakat. Çoğu kez hataya yol açar. Mesela şimdi parantez içindeki sayıyı bir bir arttırmayı deneyin. Bu sefer 3'ten sonra _<li>_ taglarına geçmeye başladı. Yani işler biraz karıştı.

## :nth-of-type Kullanımı

```
:nth-of-type(2){
   background:red;
}
```

Bu sefer `:nth-of-type` kullandık. Yine tag kullanmadık. Çıktı olarak ise tüm elementlerin 2.sini ele aldı.(<p>,<li>,<ul>)

<pre class="codepen" data-height="470" data-type="css" data-href="XKvVyW" data-user="oztrkeness" data-safe="true"> <code> </code> </pre>
<script src="https://codepen.io/assets/embed/ei.js"> </script>

## CSS Seçiciler Oyunu

CSS'de yeni iseniz ve seçicilerde kendinizi basit alıştırmalarla geliştirmek istiyorum derseniz [CSS Diner](http://flukeout.github.io/) adındaki bu güzel oyunu oynayabilirsiniz.

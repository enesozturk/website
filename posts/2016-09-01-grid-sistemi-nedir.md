---
title: Grid sistemi nedir? Nasıl yazılır?
description: Grid sistemi nasıl yazılır?
slug: grid-sistemi-nedir
date: Sep 01, 2016
---

Merhabalar, bugün Bootstrap, Skeleton gibi frameworklerden alışık olduğumuz grid sistemini kendimiz yazmaya çalışacağız. Öncelikle biraz Grid sistminden bahsedelim.

# Grid Sistem Nedir?

Basit bir tanımla başlayacak olalım. Bir Grid sistemi içeriklerin yatayda ve dikeyde düzenli biçime sokulması için oluşturulan yapıdır.

Yararları olarak, üretkenliği arttırmak, çok yönlü olması, düzenli sayfalar için ideal olmaları söylenebilir.

Grid sistemleri iki ana bileşenden oluşur. _rows_ ve _columns_. Yani satır ve sütunlar. Column elementleri Row elementlerine yerleştirilerek kullanılır.Sütunlar ise son yapıyı oluşturur ve ana içeriği bulundurur.
Bazı grid sistemleri ek olarak _container_ içerebilir. Bkz. `Bootstrap`.

Şimdi Başlayalım.

## Box Model'i Resetlemek

Box model dediğimiz yapı grid sistemi için önemlidir. Web tarayıcılar, width ve height özelliği atanan elementler için padding ve border değerleri kendiliğinden içermezler. Bu da responsive bir tasarım için iyi bir şey değildir. Fakat bunu `box-sizing` özelliğinin `border-box`' seçeneği ile hem row hemde column için düzeltebiliriz.

```
.row,.column{
   box-sizin: border-box;
}
```

Şimdi sütunlarımızın genişlik yüzdelerini ayarlayabiliriz. Bu farklı ekran genişliklerinde sütunları otomatik olarak ölçeklendirmeye yarıyor.

# Float'ları Temizlemek

Grid sistemi sütunları satırları içerisinde yatay olarak sıralayacak. Bu yüzden bizde olası bir kötü görüntüyü ve bozukluğu önlemek için satırlar üzerinde bir temizlik işlemi yapmamız gerekecek. Bu işleme `Clearfix` deniyor.

```
.row:before, .row:after {
    content: "";
    display: table;
}

.row:after {
    clear: both;
}
```

Burada row elementimizden sonra nasıl bir biçimlendirme gerçekleşeceğini belirtiyoruz. Yani yukarıda da görebileceğiniz gibi `content:"";` ile öncesinde ve sonrasında birşey olmayacağını belirttik. Bu işlem row'un uzatılmasını ve column'ların içine yerleşmesini sağlayacak.

# Sütunları Tanımlama

Sütunlar için, stilimizi iki farklı parçada tanımlıyoruz: _ortak stil_ ve _genişlikler_.
Öncelikle ortak stilimizi yazalım:

```
.column{
   position:relative;
   float:left;
}

```

Sütunlar içerisinde _absolute_ pozisyona sahip içerik barındırabilmesi için _relative_ olarak tanımlandı. Ve daha sonra sola yasladık, ki elementimiz başlamaz ise _display:block_ özelliği alınabilsin.

# <a name="bosluk"></a>Boşlukları oluşturma

Daha kolay okunabilirlik ve estetik için boşlukları oluşturup kullanacağız.

```
.column + .column{
   margin-left:1.6%;
}
```

# Sütun Genişlikleri Hesaplama

Hesaplamaya başlamadan önce, her bir satır için en fazla sütun sayısını saptamamız gerekiyor. En popüler seçim ise
12'dir. Çünkü 1,2,3,4 ve 6'ya bölünebilir. Bu seçim çok farklı kombinasyonları içerebilir.

Her satır için neden en fazla 12 sütun olacağını anlamak önemli. Ne kadar sütun istediğimize bağlı olmaksızın her bir satır için gerekli miktarı tamamlamak gerekiyor. Örnek verecek olursak 4 tane eşit sütun istiyoruz. Bu durumda her biri 3'lü yer kaplayan 4 adet span kullanırız (4x3=12). 12'yi aşan sonuçlar sonraki satırda gösterilir.

Bir sütunun maximum kalınlığını biliyoruz. Şimdi tekli bir sütunun genişliğini hesaplamamız gerekiyor. Bunun için aşağıdaki formulü kullanıyoruz.

`tk = (100 - (g*(g-1)))/ms`

- tk = tekli kolon
- g = genişlik (1.6%)
- mc = maksimum sütun (12)

İşlemi yaptıktan sonra tekli bir sütunun genişliğini `6.86666666667%` olarak hesaplıyoruz. Burdan sonra bu sayı ile diğer sütunların genişliğini hesaplayabiliriz.

`sg = (tsg*sm)+(m*(sm-1))`

- sg = sütun genişliği
- tsg = tekli sütun genişliği (6.86666666667%);
- sütun mesafesi (ne kadar yer kaplayacağı) (1-12)
- m = margin (1.6%) (fazlalık payı-boşluk)

Her sütun için formülü uyguladığımızda aşağıdaki değerler ile karşılaşacağız.

```
.column-1 {
   width: 6.86666666667%;
}

.column-2 {
   width: 15.3333333333%;
}

.column-3 {
   width: 23.8%;
}

.column-4 {
   width: 32.2666666667%;
}

.column-5 {
   width: 40.7333333333%;
}

.column-6 {
   width: 49.2%;
}

.column-7 {
   width: 57.6666666667%;
}

.column-8 {
   width: 66.1333333333%;
}

.column-9 {
   width: 74.6%;
}

.column-10 {
   width: 83.0666666667%;
}

.column-11 {
   width: 91.5333333333%;
}

.column-12 {
   width: 100%;
}
```

## Mobil Telefonlar İçin İyileştirme

Grid sisteminin responsive olmasında şimdiye kadar sorun yok. Akıllı telefonlar gibi küçük ekranlı aygıtlar için sütunların genişliği içeriğin okunaklığını koruması için otomatik olarak ayarlanmalıdır. Media sorguları bu noktada bize yardımcı oluyor:

```
@media only screen and (max-width: 550px) {
    .column-1,
    .column-2,
    .column-3,
    .column-4,
    .column-5,
    .column-6,
    .column-7,
    .column-8,
    .column-9,
    .column-10,
    .column-11,
    .column-12 {
        width: auto;
        float: none;
    }

    .column + .column {
        margin-left: 0;
    }
}
```

Burada ekranın 550px'den daha küçük olan aygıtları için her sütunun ekranın tamamını kullanacak şekilde ayarladık.
Artık burada [boşluklar](#bosluk) işimize yaramayacak. O yüzden onları `margin-left: 0px` ile sıfırladık.

# Kullanalım

CSS ayarlarımızı yaptıktan sonra HTML yazarak grid sistemimizi kullanabiliriz.

```
<div class="row">
    <div class="column column-4"></div>
    <div class="column column-4"></div>
    <div class="column column-4"></div>
</div>

<div class="row">
    <div class="column column-2"></div>
    <div class="column column-4"></div>
    <div class="column column-4"></div>
    <div class="column column-2"></div>
</div>
```

Aşağıdan kodlarımızın çıktısını inceleyebilir, ekleme, düzenleme yapabilirsiniz.
Okuduğunuz için teşekkür ederim, paylaşıp destek olabilirsiniz.

<pre class="codepen" data-height="470" data-type="css" data-href="QEZOOp" data-user="oztrkeness" data-safe="true"> <code> </code> </pre>
<script src="https://codepen.io/assets/embed/ei.js"> </script>

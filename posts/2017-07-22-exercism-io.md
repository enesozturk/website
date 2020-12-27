---
title: Exercism.io
description: Exercism.io Nedir? Kurulum ve kullanımı
slug: exercism-io
date: Jul 22, 2017
---

![Exercism](/blog/exercism.png)

Merhabalar, epeydir birşeyler yazmadığımı farkettim. Bende oturup arasıra göz atıp **Python** dili ile problemlerini çözmeye uğraştığım [Exercism](http://www.exercism.io)'den bahsedeyim dedim.

### Exercism.io Nedir?

Adından da anlaşılacağı üzere bir egzersiz yapma sitesi. İçerisinde şuan 37 ve yakında gelecek olan 20 farklı _programlama dili_ - _freamework_ - _tool_'un egzersizleri [bulunmakta](http://exercism.io/languages). Tabiki benzeri bir dolu site veya uygulama vardır. Fakat gerek çeşitliliği, gerek *test güdümlü yazılım*a alıştırması gerekse de komut satırı ile kullanılıyor olması sebebiyle bu içlerinde en çok hoşuma giden oldu.

## Kullanımı

Exercism'e başlamak için Github hesabımızla giriş yapıyoruz.(Galiba sadece öyle giriliyor) Daha sonra komut satırı uygulamasını yüklememiz gerekiyor. [Buradan](http://exercism.io/clients/cli) işletim sisteminize uygun olanı indirip veya komut satırınız üzerinden kurun. Devamında yapılandırma işlemi yapmamız gerekiyor. Bunun için [buradan](http://exercism.io/account/key) hesabınız için atanmış olan key ile komut satırına

```
exercism configure --key={size verilen key}
```

komutunu girerek yapılandırma işlemini tamamlayın.

Bu adımlar bittikten sonra egzersizleri _fetch_ etmeye başlayabilirsiniz.

Örneğin ben [Python](http://exercism.io/languages/python/exercises) egzersizleri sayfasından [ilk egzersizi](http://exercism.io/exercises/python/hello-world/readme) fetch ediyorum.

```
exercism fetch python hello-world
```

almış olduğumuz dosyaların içerisinden çözülmesi istenen _problemin bulunduğu dosya_, yazdığımız fonksiyona ait _test_ dosyası ve bir adet _README_ dosyası geliyor. Dosyayı kullanıdığımız text editörde açıyoruz. (Ben [VS Code](https://code.visualstudio.com/) kullanıyorum). Önce istenen problemi okuyup daha sonra yazmaya başlayabilirsiniz.

Yazdıktan sonra konudumuzu test etmek için komut satırında test dosyamızı çalıştırıyoruz;

```
py hello_world_test.py
```

Eğer çözümümüz doğru ise OK alıyoruz. Yanlışlık varsa kaç tane ve hangi fonksiyonlarda hata verdiğini gösteriyor.

Çözümü tamamladıktan sonra submit etmek için komut satırında problemin bulunduğu klasöre gelip

```
exercism submit hello_world.py
```

komutunu veriyoruz. Submit işleminden sonra komut satırında bize bir link veriliyor. Bu linkten çözümümüz hakkındaki detayları görebilir, diğer insanların çözümlerine ulaşabilirsiniz.

Okuduğunuz için teşekkür ederim. Sevgiler.

---
title: MVC Notları - Loosely Coupled Kavramı
description: Loosely Coupled Kavramı ve Interfaceler
slug: loosely-coupled-kavrami
date: Mar 08, 2017
---

### Loosely Coupled (Geniş Bağlı) Bileşen Oluşturmak

Merhabalar. Loosely Coupled kavramını kendi çapımda örnek vererek anlatmaya çalışacağım.

Uygulama geliştirirken elimizden geldiğince
bağımsız bileşen yazmak ve bileşenlerin birbiri ile olan bağlılığını en aza indirgemek isteriz. Çünkü böylesi bir sistem esnek bir sistem olur ve aynı zamanda yönetmesi kolay olur. Özellikle büyük bir proje yazıyorsak altından kalkması çok daha kolaylaşır diyebiliriz.

En ideal çözüm de, tüm bileşenlerin diğerlerinden habersiz olması ve soyut interfaceler ile uygulamanın farklı alanlarında kullanılması. İşte bu yöntem `loosely coupled` olarak biliniyor. Ayrıca uygulama için test yazma ve düzenleme işlemlerini kolaylaştırıyor.

Basit bir örnek vermek istiyorum. Diyelim ki elimizde _MyEmailSender_ adında e-mail gönderen bir bileşen var. Bunun için _IEmailSender_ adında içinde e-mail göndermek için public fonksiyonlar tanımlanmış bir `interface` tanımlarım.
E-mail gönderme ihtiyacı duyan başka bir bileşen olsun. Ona da _PasswordResetHelper_ diyelim. Bu bileşen de interface'im içindeki fonksiyonlar sayesinde e-mail gönderme işlemi yapabilir. Resimde görüldüğü gibi iki bileşenim arasında direkt olarak bir bağlılık yok

![interface](../../../../../images/interface1.jpg)

_IEmailSender_ interface'ini oluşturarak iki bileşenim arasında bir bağlılık olmadığına emin olduk. Şimdi ben _MyEmailSender_ bileşenimi başka bir mail sağlayıcı ile değiştirebilirim.

Az da olsa fikir oluşturması dileği ile..

---
title: MVC Notları - Dependency Injection
description: Dependency Injection Kullanımı
slug: dependency-injection
date: Mar 10, 2017
---

Bir önceki yazımda Interface'lerin bileşenleri birbirinden ayırmada yardımcı olduğunu söylemiştik. Fakat C# bize `new` anahtarını kullanmak dışında _Interface_ kullanan bir obje oluşturmak için yerleşik bir yöntem sağlamıyor. O halde kodumuz şöyle oluyor;

```
public class PasswordResetHelper
{
   public void ResetPassword()
   {
      IEmailSender mySender = new MyEmailSender();
      //...e-mail detayarını yapılandırmak için interface'i çağırıyoruz
      mySender.SendEmail();
   }
}
```

Bu işlem bizim amacımızı olan _MyEmailSender sınıfını PasswordResetHelper'a dokunmadan değiştirmek_ için pek uygun gözükmüyor.PasswordResetHelper sınıfı _IEmailSender_ interface'i ile e-mailleri ayarlama ve gönderme işlemlerini yapıyor. Lakin bu interface'i kullanan bir obje oluşturmak için MyEmailSender'dan bir nesne oluşturması gerekecek. Aslında işleri biraz daha zorlaştırdık çünkü PasswordResetHelper bizim MyEmailSender sınıfımıza ve IEmailSender interface'imize bağlı oldu.

![Dependency-Injection](/blog/interface1.jpg)

Bizim amacımız ise doğrudan obje yaratmadan interface'i kullanan objeler kullanmak. Bu problem çözümüne ise `Dependency Injection` deniyor. Ayrıca `Inversion of Control (IoC)` olarak ta bilinir.

> Dependency Injection Loosely Coupled denen Geniş Bağlı sistemleri oluşturmak için bir tasarım modelidir. Kafa karıştırıcı olabilmesine karşın özellikle MVC tasarım modelinde oldukça önemlidir.

## Dependency (Bağımlılık) Bozma ve Tanımlama

DI desenini iki parçadan oluşuyor. İlkinde, bileşenimdeki somut sınıf bağımlılığını kaldırıyorum. _--bu örnekte PasswordResetHelper bileşeni_. Bunu parametre olarak interface kabul eden bir sınıf constructor'ı (yapıcısı) oluşturarak yapıyorum;

```
public	class	PasswordResetHelper
{
   private IEmailSender emailsender;
   public PasswordResetHelper(IEmailSender emailsenderParam)
   {
      emailSender = emailsenderParam;
   }
   public void	ResetPassword()
   {
      //IEmailSender mySender =	new MyEmailSender();
      //...e-mai detayarını yapılandırmak için interface'i çağırıyoruz
      emailsender.SendEmail();
   }
}
```

_PasswordResetHelper_ sınıfının constructor'ında _IEmailSender_ interface'inin dependency tanımlaması yapılıyor. Yani IEmailSender'ı uygulayan obje almadıkça bu sınıf oluşturulup kullanılamaz. Bağımlılık tanımlamasında _PasswordResetHelper_ sınıfının artık _MyEmailSender_ ile alkası yok. Bu sınıf sadece IEmailSender interface'sine dayanır. Kısacası PasswordResetHelper sınıfı artık IEmailSender interface'sinin nasıl tanımlandığını bilmiyor diyebiliriz.

## Bağımlılıkları enjekte etme (Injecting Dependencies)

DI iki parçadan oluşuyor demiştik. Birincisi dependency'i tanımlamaydı. İkincisi ise PasswordResetHelper sınıfı tarafından tanımlanan dependency'i `inject`(enjekte) etmektir. Bu sebeple buna _dependency injection_ diyoruz.

Tüm bunların anlamı şudur ki, ben hangi sınıfın _IEmailSender_'i kullanacağında karar vermem, o sınıftan bir nesne oluşturup o nesneyi PasswordResetHelper'in yapıcısına parametre olarak göndermem gerekiyor.

> PasswordResetHelper sınıfı bağımlılıklarını yapıcı metodu ile tanımlıyor. Buna constructor injection da denir. Ayrıca bağımlılıklarımı bir public özellik ile de tanımlayabilirim. Bu da setter injection'dur.

Oluşturmuş olduğumuz bağımlılıklar sınıflarımıza runtime dediğimiz çalışma sırasında enjekte edilirler. Böylelikle uygulamayı çalıştırdığımızda hangi interface'i kullanacağımızı seçebiliriz. Farklı e-mail sağlayıcılarından istediğimi seçip yolumuza öyle devam edebiliriz. Böylelikle DI bize bir önceki [yazımda](https://ozturkenes.com/blog/loosely-coupled-kavrami) resimdeki gibi bir ilişkiye sahip olmamızı sağlaybilir.

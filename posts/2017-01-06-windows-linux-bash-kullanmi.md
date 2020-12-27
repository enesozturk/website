---
title: Windows 10 üzerinde Ubuntu Bash
description: Ubuntu Bash'ı Windows Üzerinde Kurma
slug: windowsta-linux-bash-kullanmak
date: Jan 06, 2017
---

Merhaba sevgili okurlar. Bir Windows kullanıcısısınız ve benim gibi Linux komutlarını öğrenip geliştirmek istiyorsanız veya belli bir yazılım geliştirme sürecinde Linux Araçlarına ihtiyacınız varsa ve sanal makinaya olsun, dual boot ile Windows'un yanına Linux kurmak olsun istemiyorsanız başka bir çözüm daha var.

Henüz beta aşamasında olan `Bash on Ubuntu on Windows` ile Windows'üzerinde Ubuntu Bash'ı kullanabilirsiniz.

Bir takım özelliklerinden bahsedelim:<br>

1. `grep`, `sed`, `awk` gibi ortak komut satırı yardımcı-programlarını destekler ve çalıştırır.<br>
2. Komut satırı ile dosyalar arası işlemler yapabilirsiniz.<br>
3. Komut satırı yardımcı programlarına dayalı çekirdek programları Bash'ta çalıştırabilirsiniz.<br>

## Kurulum

Öncelikle kurulu işletim sisteminin `64-bit` olması ve `14393.0` veya üstü bir güncelleme sürümünde olması gerekmekte.<br>

![UbuntuBash1](../../../../../images/ubuntubash1.jpg)

Bash'ı Windows'ta çalıştırmak için:

1.Windows Geliştirici(Developer) Mod'u Etkinleştirin.<br>
2.Linux için Windows Altsistem'i (Windows Subsystem for Linux) etkinleştirin.

### Geliştirici Mod'u Aç

1.Ayarlar -> Güncelleme ve Güvenlik -> Geliştiriciler için<br>
2.Geliştirici Mod butonunu seçin.<br>

![UbuntuBash2](../../../../../images/ubuntubash1.jpg)

### Linux İçin Windows Altsistem Aç

1.Başlat üzerinde `Windows özelliklerini aç veya kapat` diye aratıp açın.<br> 2.`Linux için Windows Altsistem`'i seçin ve Tamam'a tıklayın.<br>

![UbuntuBash3](../../../../../images/ubuntubash1.jpg)

Bu işlemi komut satırı üzerinden yapmak isterseniz:
<br>1.Başlat üzerinden `PowerShell`'i yönetici modda açın.

```
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
```

komutunu girin ve bekleyin. Bittiktan sonra kapatabilirsiniz.
Bu işlem bittikten sonra bilgisayarı mutlaka yeniden başlatın.

## Çalıştırın

Başlat üzerinden `cmd`'yi çalıştırıp `bash` komutunu girin veya direk başlat üzerinden bash aratıp açın.
Sizden Lisans için onay isteyecektir. `y` basıp kabul ettikten sonra Ubuntu kullanıcı mod'u yüklenecek ve `Bash on Ubuntu on Windows` kısayolu eklenecektir.

Daha sonra Bash'ı ister kısayol ile ister komut satırına 'bash' komutu girerek çalıştırın.

Yüklemeden sonra Linux dağıtımı `%localappdata%\lxss` dosyasında konumlanacak. Bunun olduça güzel bir sebebi var.

> <p sytle="font-size:20px;"><b>Windows araçlarını ve programlarını kullanarak bu konumda dosyaları düzenlemek veya dosya oluşturmasını önlemek.</b> Eğer bu yapılırsa büyük ihtimalle Linux dosyalarımız bozulacaktır.</p>

## Kullanıcı Oluşturun

Bash'ı ilk çalıştırdığınızda sizden kullanıcı oluşturmanız istenecektir.Bir kullanıcı adı ve şifre belirledikten sonra Ubuntu Bash'ı kullanabilirsiniz. Okuduğunuz için teşekkür ederim.

> Kaynak: https://msdn.microsoft.com/en-us/commandline/wsl/about

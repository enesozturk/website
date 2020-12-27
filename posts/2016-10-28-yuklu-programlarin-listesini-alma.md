---
title: Windows'ta yüklü programların listesini çıkartma
description: powershell
slug: windowsta-yuklu-programlarin-listesi
date: Oct 28, 2016
---

![powershell](../../../../../images/powershell.jpg)

Merhabalar, bugün bilgisayarımızda yüklü olan programların listesini herhangi bir program kullanmadan komut penceresi ile oluşturacağız.

Bu komutu kullanmak için bize gerekli olan şey Windows'un yeni nesil komut satırı uygulaması olan PowerShell. Bunu için başlat menüsünü açıp "powershell" diye aratın. En başta çıkan uygulamayı seçin. Karşımıza PowerShell komut penceresi gelecek.<br/>
Daha sonra aşağıdaki kodu kopyalayıp yapıştırın ve Enter tuşuna basın.

```java
Get-ItemProperty HKLM:\Software\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall\* | Select-Object DisplayName, DisplayVersion, Publisher, InstallDate | Format-Table –AutoSize
```

PowerShell bize yüklü programların listesini versiyon, geliştirici, yükleme tarihi gibi bilgiler ile birlikte verecek.

Fakat siz büyük ihtimalle bunları bir dosyada liste şeklinde isteyeceksiniz. Bunu yapması da oldukça kolay.<br/>
Kodumuzun sonuna '>' işareti ekleyip bir yol belirleyeceğiz ve oraya çıkartacağız.

```java
Get-ItemProperty HKLM:\Software\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall\* | Select-Object DisplayName, DisplayVersion, Publisher, InstallDate | Format-Table –AutoSize > C:\Users\EnesPc\Desktop\YukluProgramlar.txt
```

(Yukarıdaki komutta dosya yolunu kendi bilgisayarınıza göre ayarlayın.)<br/>
Bu kadar basit. Şimdi oluşturulan dosyayı açıp tam listeyi görebilirisiniz. Okuduğunuz için teşekkür ederim.

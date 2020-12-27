---
title: Docker ve VS Code
description: VS Code için Docker eklentisi kullanımı
slug: docker-vscode
date: Aug 07, 2018
---

Docker ve Visual Studio Code

Merhabalar.. Bugün VS Code kullananlar için Docker eklentisi ile Docker’ı nasıl etkili ve hızlı kullanırız onu göreceğiz. Örnek proje olarak bir Node JS projesi kuracağız.

## Kurulum

Başlamadan önce sistemimizde Docker’ın kurulu olması gerekmekte, bunun için kendi sitesindeki [kurulum yönergelerini ](https://docs.docker.com/install/)izleyebilirsiniz. Ve tabii [VS Code](https://code.visualstudio.com/) kullanıyor olduğunuzu varsayıyorum.

VS Code’u açtıktan sonra eklentiler sekmesinden “Docker” yazıp aratarak kullanacağımız eklentiyi bulup indireceğiz. (Muhtemelen ilk çıkan eklenti olacaktır). Yükledikten sonra VS Code’u yenileyip devam ediyorum.

![](https://cdn-images-1.medium.com/max/2038/1*-Ifg8P1YU6_9gSxsP7jcBA.png)

Farkedeceksiniz ki soldaki ikonların arasına Docker ikonu da eklendi. Bu bizim Docker Explorer’ımız. Buradaki _Images_, _Containers_ ve _Registers_ sekmeleri ile sistemimizdeki image ve container’ları yönetebileceğiz.

![](https://cdn-images-1.medium.com/max/2044/1*K3eZYz9rIP7EosbNIVhmqw.png)

Ayrıca VS Code’a bu eklenti ile beraber yeni komutlar da eklenmiş oldu. Komut satırını açıp (F1) “_docker_” yazıyorum. Buradan bir kaç komutu görebiliriz.

![](https://cdn-images-1.medium.com/max/2038/1*Xsw-RKbaOP1Gh150uRC2Ig.png)

## Node JS

Docker eklentisini göstermek için basit bir Node JS uygulaması kullanacağız. Bunun için gerekli komutları terminal yardımıyla girip projemi oluşturuyorum.

![](https://cdn-images-1.medium.com/max/2976/1*bD_h47CMwHpxyVGer5Ct3A.png)

Daha sonra *index.js *dosyama gerekli kodları yazarak _express_ serverimi hazırlıyorum.

![](https://cdn-images-1.medium.com/max/2976/1*2O8ZwA49Jhj43vQuqTACCw.png)

**_project.json_** dosyamı da projemi başlatamak için kullanacağım komutu ekleyerek düzenliyorum.

![](https://cdn-images-1.medium.com/max/2976/1*sKDbXzrT6XDWayRxdgxm8Q.png)

Şimdi terminalden “**_npm start_**” komutunu verip **3000** portundan uygulamamızın başladığını görebiliriz.

Normal şartlarda docker kullanmak için aşağıdaki adımları izleyecektik:

- Dockerfile oluştur (veya docker-compose.yml).
- Docker komutlarını yaz (FROM, WORKDIR, ADD, EXPOSE, CMD).
- “**_docker build …_**” komutunu kullan.
- “**_docker run …_**” komutunu kullan.

Fakat kullanacağımız eklenti ile tek yapmamız gereken şey şu:

Komut satırını açıp(F1) “**_docker”_** komutunu girin ve ‘_Docker: Add Docker files to Workspace_’ seçin.

![](https://cdn-images-1.medium.com/max/2048/1*oYPgTPB_otPFFLILGFNPYQ.png)

Bize çalıştığımız platform ve port ile ilgili birkaç soru soracak. Bunlara cevap verelim. Node JS’i seçip devam ediyorum.

![](https://cdn-images-1.medium.com/max/2050/1*xoSfU9BGZgzqPSgFUUxOKw.png)

Daha sonra uygulamamızın hangi portu dinleyeceğini seçiyorum. _3000_ girip devam edelim.

![](https://cdn-images-1.medium.com/max/2048/1*dhbDeOfUgxko_9r5sm3JqQ.png)

Projemize .dockerignore, docker-compose.debug.yml, docker-compose.yml, Dockerfile dosyaları eklendi. Bunlar bizim image ve container oluşturmak için gerekli dosyalarımız. Eklenti tarafından otomatik oluşturuldu.

**_.dockerignore_** dosyası Docker’a image’i oluştururken hangi dosyaları görmezden geleceğini söyler.

**docker-compose.debug.yml** bize docker-compose komutunu çalıştırırken debug yapmamızı sağlayacak.

**docker-compose.yml** ise bizim docker servislerimizi yürütmek için kullanacağımız asıl dosya. Container’ımıza başka bir servis veya kaynak eklemek istediğimizde bu dosyayı düzenleyeceğiz.

![](https://cdn-images-1.medium.com/max/2976/1*gdcml3UN1qBEqMUvQ-P4nw.png)

Dockerfile dosyamız ise buradaki en önemli dosyamız. Projemizin kullanacağı environment’ler, kopyalanacağı dizin, kullanacağı port gibi bilgileri eklentimiz bizim için hazırlamış durumda.

![](https://cdn-images-1.medium.com/max/2976/1*h5QRSku8g29DX2AWoZKFhQ.png)

Şimdi Image’imi oluşturarak devam ediyorum. VS Code komut satırını açıp ‘docker’ yazın ve _Docker: Build Image_ komutunu seçin.

![](https://cdn-images-1.medium.com/max/2042/1*zVC-25BpBc5V5AJx8lL8EA.png)

Daha sonra bizden Dockerfile seçmemizi istiyor. Enter’a basıp devam ediyorum.

![](https://cdn-images-1.medium.com/max/2038/1*0wJNx5nZqFe5uOIrQz2_xw.png)

Devamında bizden bir tag yazmamızı isteyecek. Bizim için proje ismi ile bir tag oluşturacak. Bu sizin için uygunsa yine enter’a basıp devam edin. İsterseniz değiştirebilirsiniz.

![](https://cdn-images-1.medium.com/max/2048/1*_5gm_hOVVeSfN7ahAvZ-mA.png)

Aşağıdaki terminalde komutumuza ait logları görebiliriz.

![](https://cdn-images-1.medium.com/max/2048/1*qh3-PpsTb8yogp0_vqwYzQ.png)

Son olarak container’ımızı ayağa kaldırmak için gerekli komutları vermeliyiz. Tekrar komut satırımı açıp “docker run” komutunu veriyorum ve oluşturmuş olduğum _image_’i seçiyorum.

Terminalde şu çıktıyı göreceksiniz.

![](https://cdn-images-1.medium.com/max/2044/1*w8yAzyuNVRDSQpiWXsJL4A.png)

Dikkat ederseniz **_-p 3000:3000_** parametresi ile container’ın oluşturduğumuz sonucudaki 3000' sunucusunu birbirine bağlamış bulunduk. Şimdi **_localhost:3000_** adresine giderek uygulamamızı görebiliriz.

Dilersek image’imizi çalıştırma, container’ımızı başlatma-durdurma ve container’ın terminaline bağlanma gibi komutları Docker Explorer üzerinden de verebiliriz.

![](https://cdn-images-1.medium.com/max/2038/1*lpJZLMBJmWWNLNEiwTQb7Q.png)

![](https://cdn-images-1.medium.com/max/2038/1*IRKufdX6BkNkpV8Bvf4EHw.png)

VS Code Docker eklentisi ile Docker kullanımı basit haliyle bu şekildeydi. Farklı projelere göre eminimki farklılık gösterecektir. Herkese iyi çalışmalar..

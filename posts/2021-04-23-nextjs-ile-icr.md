---
title: Next JS ile önemli Jamstack kavramları
description: ICR, SSR, SSG gibi önemli kavramlara genel bakış
slug: next-js-ile-onemli-jamstack-kavramlari
date: April 23, 2021
---

> Bu yazı Lee Robinson tarafında yazılan ve Smash Magazine'de yayınlanan [A Complete Guide To Incremental Static Regeneration (ISR) With Next.js](https://www.smashingmagazine.com/2021/04/incremental-static-regeneration-nextjs/)'in çevirisidir. Yazıda ISR merkezli bir anladım olsa da Next.js yazanlar için önemli olan çoğu kavramı içerdiği için başlığı değiştirdim. İyi okumalar dilerim.

Geçtiğimiz yıl, [Next JS 9.3](https://nextjs.org/blog/next-9-3) ile beraber onu hibrit framework'e çeviren Static Site Generation özelliği geldi. Bu makalede Jamstack'in yeni devrimini konuşacağız: Incremental Statik Regeneration (Kademeli Statik Yeniden Oluşturma)

## Static Site Generation Sorunu

Jamstack'in arkasındaki temel mantık, CDN'e gönderilebilen, saniyeler içinde global olarak dağıtılabilir, **önceden oluşturulmuş (pre-rendered) statik sayfalar**. Statik içerik, yüklemesi hızlı, down sürelerine karşı dirençli, crawler'lar tarafından hızlıca indexlenebiliyor. Fakat beraberinde bazı sorunlar getiriyor.

Büyük ölçekli bir projede Jamstack mimarisi geliştirdiyseniz sitenizin build edilmesini uzun süre beklemek durumunda kalmış olabilirsiniz. Sayfa sayısını arttırdıkça build süresi de artar. [target.com](https://www.target.com/)'u ele alalım. Her deployment'ta statik olarak milyonlarca ürünü oluşturmak mümkün mü?

![The Problem with Static-Site Generation: Because build-times scale linearly with the number of pages, you might be stuck waiting for hours for your site to build.](/blog/build-times-regeneration-nextjs.png)

Her sayfası 1ms'de oluşturmuş olsa bile, ki bu gerçekçi bir rakam değil, tüm sitenin oluşturulması için saatler gerekebilir. Büyük websiteleri için Static Site Generation çözümünü kullanmak bu yüzden mantıklı değil. Burada daha esnek, hibrit bir çözüme ihtiyaç var.

## Control Management Systems

Çoğu projede site içeriği koddan ayrılır. Headless CMS çözümleri, geliştirme ihtiyacı olmadan içerik oluşturma ve yayınlamayı sağlar. Fakat geleneksel statik sitelerde bu işlem biraz yavaş olabilir.

100.000 ürünü olan bir e-ticaret sitesini düşünün. Ürün fiyatları sürekli değişiyor olsun. Bir içerik yöneticisi kulaklığın fiyatını 100₺'den 120₺'ye çektiğinde, kullanılan CMS **webhook** aracılığı ile siteyi tekrar build edecek. Bir fiyat değişikliği için uzun süre yeni build'i beklemek tabiki mantıklı bir yöntem değil.

Gereksiz hesaplamalara sahip uzun build süreleri ayrıca ek maliyetler doğurur. Uygulamanızın yeniden build almaya gerek kalmadan hangi ürünlerin değiştiğini anlaması ve kademeli olarak (incrementaly) bu sayfaları güncellemesi en ideal yoldur.

## Incremental Static Regeneration

Next.js, ICR ile geliştiricilerin ve içerik yöneticilerinin, sitenin tamamını build etmeye gerek kalmadan sayfa bazlı static-generation yapmalarını sağlar. Bu sayede uygulamanızı milyonlarca sayfaya scale ederken static sayfaların avantajını elde edersiniz.

ICR ile statik sayfalar build zamanı yerine run-time'da (çalışma anı) oluşturulur. Analitik eventleri, A/B testiler veya diğer metrikler gibi konfigurasyonları build anı ve çalışma anı arasında istediğiniz gibi ayarlama esnekliğine sahip olursunuz.

Az önce bahsettiğimiz 100.000 ürünlü e-ticaret sitesini düşünün. Gerçekçi bir 50ms'lik statik sayfa üretme süresi ile tüm işlem yaklaşık 2 saat sürecektir. ISR ise bize şu iki seçenek arasında dilediğimiz oranda seçim yapmamızı sağlıyor:

**Hızlı Build Süresi**
En popüler 1000 ürünü build-time'da oluştur. Diğer ürünler ise önbellek'de (cache) olmadığı için atılan istekler ile yine kısa sürede sağlanacaktır.

**Yüksek Önbellek Oranı**
Build time'da 10.000 ürünü oluştur. Dolayısı ile kullanıcı isteğinden önce çok fazla ürün sunmuş olacaksınız. Fakat tahmin edeceğiniz üzere daha uzun sürecektir.

![The advantage of ISR: You have the flexibility to choose which pages are generated at build or on-demand. Choose from (A) faster builds or (B) more cached.](/blog/generation-regeneration-nextjs.png)

Bahsettiğimiz e-ticaret sitesi örneğine daha yakından bakalım.

## Başlarken

### Verileri Çekmek (Fetching)

ISR, static sayfalar üretmek için Next.js API'ındaki statik sayfa oluşturmak için kullanılan `getStaticProps` methodunu kullanıyor. Bu methoda `revalidate` prop'unu vererek Next.js'e ISR kullanmasını söylemiş oluyoruz.

![A diagram of the request flow for Incremental Static Regeneration.](regeneration-regeneration-nextjs.png)

1. Next.js sayfa bazlı `revalidation` süresi belirleyebilir. Biz burada 60 diyelim.
1. Ürün sayfasına atılan ilk istek orjinal fiyatlı önbellekteki sayfayı gösterecek.
1. Veri CMS üzerinden güncellensin.
1. İlk istekten sonra ve 60sn'den önce atılan herhangi bir isteğe önbellekteki sayfa dönecektir.
1. 60sn sonra, Next.js hala önbellekteki sayfayı gösterecek fakat revalidate süresi geldiği için arkaplanda sayfayı yeniden oluşturmaya başlayacak.
1. Sayfa başarılı olarak yeniden oluşturulduğunda Next.js önbelleği silip güncellenen sayfayı kullanıcıya sunacaktır. Eğer arkaplandaki yeniden oluşturma başarısız olursa önbellekteki sayfa gösterilmeye devam edecek.

```js
// pages/products/[id].js

export async function getStaticProps({ params }) {
  return {
    props: {
      product: await getProductFromDatabase(params.id)
    },
    revalidate: 60
  }
}
```

### Yolların (Path) Oluşturulması

Next.js hangi ürünlerin build-time'da hangi ürünlerin istek anında (on-demand) oluşturulacağını belirler. Şimdi `getStaticPaths` methodu ile en popüler 1000 ürünü build-time'da oluşturulmasını sağlayalım.

İlk build'den sonra diğer ürünleri için istek atarken Next.js'in nasıl **"fallback"** edeceğini belirleyelim. Burada `blocking` ve `true` olarak iki seçeneğimiz var:

`blocking`
Henüz oluşturulmamış bir sayfaya istek atıldığında, Next.js ilk istekte server-rendering yapacak, sonraki isteklerde ise önbellekten sunacaktır.

`true`
Henüz oluşturulmamış bir sayfaya istek atıldığında, Next.js sayfayı yükleniyor durumu (loading state) ile doğrudan sunacak. Veri çekme işlemi bittikten sonra sayfa yeniden render olacak ve önbelleğe saklanacak. Sonraki isteklerde önbellekteki sonuç sunulacak.

```js
// pages/products/[id].js

export async function getStaticPaths() {
  const products = await getTop1000Products()
  const paths = products.map((product) => ({
    params: { id: product.id }
  }))

  return { paths, fallback: ‘blocking’ }
}
```

## Takaslar (Tradeoffs)

Next.js her şeyden önce son kullanıcıya odaklanır. 'En iyi çözüm' uygulamanın kullanıcısına, sektörüne göre değişir. Geliştiricilere framework dışına çıkmadan farklı çözümler sunarak, Next.js projeniz için doğru aracı seçmenizi sağlıyor.

### Server Side Rendering

ISR her zaman doğru çözüm olmayabilir. Örnek olarak Facebook'un akış sayfası önbellekteki içeriği sunamaz. Bu senaryoda, SSR kullanıp [surrogate keys](https://www.fastly.com/blog/surrogate-keys-part-1) ile kendi `cache-control` header'larınızı belirleyerek içeriğinizi yönetmek isteyebilirsiniz. Böylelikle Next.js'in sağladığı bu hibrit özellik ile framework dışına çıkmadan geliştirme yapabilirsiniz.

```js
// Next.js ile hem getServerSideProps hem de API yönlendirmeleri içinde
// server taraflı oluşturulmuş sayfayı önbellekte saklayabilirsiniz
res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
```

SSR ve uç (edge) önbellekleme ISR'a benzer. En temel fark **ilk istek** anıdır. ISR, ilk istek sonucunda statik sayfa dönmeyi garantiler. Arkaplandaki veritabanınızda veya API servislerinizde bir sorun olsa bile, kullanıcılar sunulan statik sayfayı görebilecekler. Ancak SSR gelen isteğe göre sayfanızı oluşturmanızı sağlar.

> Not: SSR'ı önbellekleme yapmadan kullanmak performans sorunlarına yol açacaktır. Kullanıcınızın sitenizi görmesini engellemek istediğinizde her bir ms önemlidir ve bu [TTFB](https://web.dev/time-to-first-byte/) skorunuzda kötü bir sonuca yol açabilir.

### Statik Site Generation

ISR küçük siteler için her zaman mantıklı değildir. Eğer revalidation süreniz tüm sitenin build süresinden büyükse static-site generation kullanmak isteyebilirsiniz.

### Client Side Rendering

React ile Next.js kullanmadan client-side rendering yapıyorsanız (SPA), uygulamanız ön tarafta yükleniyor durumu ile gelecek ve JavaScript ile ilk isteği atacak (örn: `useEffect`'de atılan istek). Bu hosting seçeneklerinizi yükseltse bile (bir sunucuya ihtiyaç olmaması gibi) bazı sorunları da mevcut.

İlk yüklenen HTML'den önce bir pre-rendered içeriğin olmaması SEO'nun kabiliyetini ve hızını düşürür. Ve tabiki JavaScript kapalıyken Client Side Rendering mümkün değildir.

### ISR Fallback Seçenekleri

Eğer uygulamanız verilerinizi hızlı bir şekilde çekiliyorsa `fallback: 'blocking'` kullanmayı deneyin. Yükleniyor durumu ile uğraşmanıza gerek kalmayacak ve önbellekte olsa da olmasa da sayfanız her zaman aynı sonucu dönecek. Eğer veri çekme işleminiz yavaşsa, `fallback: 'true'` kullanıcınıza yükleniyor durumu göstermenizi sağlar.

### ISR: Önbelleklemeden Fazlası

ISR'ı önbellekleme kapsamında anlatmış olsamda, deployment'lar arasında oluşturulan sayfalarınızı saklamak için tasarlanmış yapısı vardır.

Her deployment bir ID anahtarına sahiptir. Bu sayede Next.js statik sayfalarınızın geçmişini tutabilir. Geri gitmek istediğinizde bu ID'yi önceki deployment'ın ID'si ile güncelleyebilir, atomik deployment'lar yapabilirsiniz. Yani geçmiş deploymentlarınızı görebilirsiniz.

ISR ile buna bir örnek:

- Kodunuzu 123 ID'si ile deploy ettiniz.
- Sayfanızda bir yazım hatası (typo) olmuş olsun; 'Ens Öztürk'
- Sayfayı CMS üzerinden güncellediniz. Yeniden deploy'a gerek kalmadı.
- Sayfanız 'Enes Öztürk'ü göstermeye başladığında bellekte saklanacak
- Sonra yanlış bir takım kodları deploy ettiniz ve deployment ID'si 345 oldu.
- Dolayısı ile ID 123'e geri döndünüz ve hala 'Enes Öztürk' görüyorsunuz.

Geri dönüşler ve kalıcı statik sayfalar Next.js'in kapsamı dışında, hosting sağlayıcınız ile ilgili bir olay. ISR'ın cache-control'e sahip SSR'dan farklı olduğunu unutmayın. Önbelleklerin bir süresi var.

## ICR Örnekleri

Incremental Static Regeneration, e-ticaret siteleri, marketing sayfaları, blog postları gibi siteler için çok uygun.

- [E-Commerce Demo](https://nextjs.org/commerce)
  Next.js Commerce, yüksek performanslı, hepsi bir arada bir e-ticaret başlangıç kiti.
- [Github Reactions Demo](https://reactions-demo.vercel.app/)
  Buradaki Github issue'suna bir reaksiyon verdiğinizde onu ISR ile sayfa tekrar oluşturuluyor ve güncelleniyor.
- [Static Tweets Demo](https://static-tweet.vercel.app/)
  Bu proje 30sn'de deploy ediliyor fakat ISR ile istek anında statik olarak 500M tweet oluşturabilir.

## Next.Js Öğrenin

Geliştiriciler ve büyük takımlar hibrit yaklaşımı ve istek anında ISR özelliği için Next.js'i tercih ediyor. ISR ile statik sayfaların faydalarını server-side rendering esnekliği ile sağlayacaksınız. [Next.js hakkında daha fazlasını öğrenebilirsiniz](https://nextjs.org/learn/basics/create-nextjs-app) - Mutlu kodlamalar 🙌🏽

> Lee Robinson

---
title: C# Notlar
description: C# Kısa Hatırlatmalar
slug: c-sharp-notlar
date: Mar 29, 2017
---

Bugün yaklaşan vizelerinde bahanesi ile programlama ile ilgili çıkartmak istediğim notları buraya yazmayı planladım.
Kavramları uzunca açıklamaktan çok kendimce kısa kısa özelliklerini yazacağım.

## Static Sınıflar

Static olmayan sınıflardan farkı yok gibi gözükür, fakat;

- Static sınıflar `new` anahtar sözcüğü ile bir örnek oluşturarak kullanılmaz.
- Static sınıflar _sealed_ denen mühürlenmiş sınıflardır. Bu yüzden miras alınamaz veya vermezler.
- Yapıcıları kendinden _private_'dir ve bu, sınıftan nesne üretilmesini engeller.
- Static class oluşturmak, sadece static üye içeren ve _private_ yapıcı içeren normal sınıflar ile aynıdır.
- *Örnek Yapıcı*sı içermez, *Statik Yapıcı*sı içerirler.

## Static Üyeler

- Static üyeler sınıf objesi oluşturulmadan çağırılabilir.
- Static üyelerin bellekteki yeri değişmez. *Sabit*tir
- Bir sınıf içerisinde static üyeler statik olmayan üyelere erişemezler.
- Static olmayan sınıflar içinde static üyeler oluşturulabilir.
- Bu sınıflardan ne kadar nesne oluşturulursa oluşturulsun, static üyenin kopyası yalnızca bir tanedir.
- Static üyeler _overload_ edilebilir fakat _overread_ edilemezler.
- Bir sınıf static ise ancak ve ancak statik üye bulundurabilirler.

```csharp
    class OrnekSinif
    {
        public static int a = 0;
    }
    class Program
    {
        static void Main(string[] args)
        {
            WriteLine(OrnekSinif.a); //Sınıf ismi ile static üyeye eriştik.
        }
    }
```

## this anahtar kelimesi

- Varsayılan sınıfın örneğini referans eder.
- Benzer isimdeki alanların kullanımı sağlar.
- Başka bir metoda nesneyi parametre olarak aktarır.
- Sınıfın indexer(dizi) olarak kullanılmasını sağlar.

## İnterface

- C# ve Java gibi dillerde çoklu kalıtımın yerini interfaceler tutar.
- Birbirleri arasında kalıtım olmayan sınıflara bir mecburiyet bırakırlar.
- Nesneleri oluşturulamaz
- En büyük var olma nedenleri diğer interface ve sınıflara rehber olmalarıdır.
- Yapıcı içermezler
- Tüm üyeleri public kabul edilir.
- Alan(field) içermezler.

## Polymorphism - Çok Biçimlilik

- İki türlüdür;
- Statik Polymorphism => Aynı sınıf içerisinde metodların ve operatörlerin aşırı yüklenmesidir(overloading). (Derleme zamanında)
- Dinamik Polymorphism => Farklı sınıflarda metodların override edilmesi. (Çalışma zamanında)
- Dinamik Çok Biçimlilikte [_abstract_](#abstract) anahtar kelimesi kullanılır;

## Abstract Sınıflar

- _new_ anahtar kelimesi ile örneği oluşturulamaz.
- İnterface'lere benzerler.
- Abstract sınıf içinde yine abstract olarak tanımlanan method en az bir tane bulunması gerekir ve yalnızca tanımlanır. İşlem yapmaz.
- Bu metodlar abstract sınıfı kalıtım olarak alan sınıflarda _override_ edilerek kullanılır.
- Method override edilirken başına _override_ eki gelir.
- Her abstract metod aslında _virtual_'dır.

### Abstract Metodlar

- Somut sınıflar oluşturmak için override edilmesi gereken metodlardır.
- abstract anahtar kelimesi alırlar.

Polymorphism ve Abstract sınıflara şöyle bir örnek verelim:
_KonsereGir_ adlı abstract bir sınıfımız olsun. _Kisi_ adlı sınıfımız bu sınıfı kalıtım alarak içindeki abstract tanımlanan metodu override eder.
Daha sonra _Uygunluk_ adlı sınıfımız ile oluşturulan kişinin konsere girebilmek için uygun olup olmadığını kontrol edelim.

```csharp
public abstract class KonsereGir
    {
        protected int Yas;
        public KonsereGir(int yas)
        {
            this.Yas = yas;
        }
        public abstract bool Kontrol();
    }
public class Kisi : KonsereGir
    {
        public Kisi(int yas)
            :base(yas)
        {
        }

        public override bool Kontrol()
        {
            if (Yas < 18) return true;
            else return false;
        }
    }
    public class Uygunluk
    {
        public void Bildiri(KonsereGir konseregir)
        {
            bool uygunMu;
            uygunMu = konseregir.Kontrol();
            if (uygunMu) WriteLine("Kişi konsere girebilir");
            else WriteLine("Kişi konsere girmek için küçük.");
        }
    }
    class Program
    {
        static void Main(string[] args)
        {
            Uygunluk u = new Uygunluk();
            Kisi k = new Kisi(18);
            u.Bildiri(k);
            ReadKey();
        }
    }
```

## readonly anahtar kelimesi

- Yapıcı fonksiyon içerisinde değer atanmalı aksi halde değiştirilemez.

## base anahtar kelimesi

- Türetişmiş sınıftan anasınıfın elemanlarına erişmek için kullanılır;
- Temel sınıftanki, başka method taradından _override_ edilmiş metodu çağırır.
- Türetilmiş sınıfın örneğini oluştururken hengi temel sınıfın yapıcısını çağıracağını belirtir.

```csharp
public class Person {
    protected string name = "Enes";
    protected string surname = "Öztürk";

    public virtual void BilgiAl(){
        WriteLine($"Name {name}");
        WriteLine($"Surname{surname}");
    }

}
class Ogrenci : Person{
    public string id = "a1b2c3";
    public override void getInfo(){
        base.BilgiAl();
        WriteLine("Ogrenci id: {0}",id);
    }
}
class Program
    {
        static void Main(string[] args)
        {
            Ogrenci ogr = new Ogrenci();
            ogr.BilgiAl();
        }
    }
```

İkinci kullanım:

```csharp
public class TemelSinif{
    int num;

    public void TemelSinif(){

    }
    public void TemelSinif(int i){
        num = i;
        WriteLine($"TemelSinif(int i) içinde");
    }
    public BilgiAl(){
        return num;
    }
}
public class TuretilmisSinif : TemelSinif
{

    public void TuretilmisSinif() : base()
    {

    }
    public void TemelSinif(int i) :base(i)

        num = i;
        WriteLine($"TemelSinif(int i) içinde");
    }
    public BilgiAl(){
        return num;
    }
}
class Program
    {
        static void Main(string[] args)
        {
            TuretilmisSinif ts = new TuretilmisSinif();
            TuretilmisSinif ts1 = new TuretilmisSinif(1);
        }
    }
```

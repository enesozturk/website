---
title: Azure Web App ile SMTP kullanmak
description: MS Azure üzerindeki web app ile SMTP mail gönderme
slug: azure-smtp-kullanimi
date: Jul 26, 2017
---

Merhabalar, geçen gün Azure Web App olarak yayınladığım sitede SMTP kullanırken yapmış olduğum bağlantının başarısız olduğunu gördüm.
Hata şöyleydi;

> System.Net.Mail.SmtpException: The SMTP server requires a secure connection
> or the client was not authenticated. The server response was:
> 5.5.1 Authentication Required. Learn more at

Localde çalışırken Azure'da çalışmıyordu. SMTP kodlarını yazarken önemli bir satırı atlamışım. Şu şekilde kullanarak sorunu çözdüm;

```
public async Task SendAsync(IdentityMessage message)
{
    //Enes Ozturk
    var smtp = new SmtpClient
	{
		Host = "smtp.gmail.com",
		Port = 587,
		DeliveryMethod = SmtpDeliveryMethod.Network, //1 Azure Web App için bu iki satır önemli aksi halde bendeki gibi hata alabilirsiniz.
		UseDefaultCredentials = true, //2
		Credentials = new System.Net.NetworkCredential("xxx@gmail.com", "password"),
		EnableSsl = true
	};

	using (var email = new MailMessage("mail-gonderen-adres@gmail.com", message.Destination)
	{
	    IsBodyHtml = true,
	    Subject = message.Subject,
	    Body = message.Body
	})
	smtp.Send(email);
}
```

Sevgiler..

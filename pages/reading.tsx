import Page from '@components/page'
import { Goodreads } from '@components/icons'
import { Entry, EntryGroupText, SeeOthers } from '../components/entry'

const Paragliding = () => {
  return (
    <Page title="Reading" description="Collection of books that I read">
      <article>
        <EntryGroupText title="Currently Reading" emphasized />
        <Entry
          target="blank"
          title="1984"
          description="George Orwell"
          href="https://www.goodreads.com/book/show/40961427-1984"
          icon={<Goodreads />}
        />
        <EntryGroupText title="Favorite Books I Read" emphasized />
        <Entry
          target="blank"
          title="Mutlu Beyin"
          description="Loretta Graziano Breuning"
          href="https://www.goodreads.com/review/show/2999368252?book_show_action=false&from_review_page=1"
          icon={<Goodreads />}
        />
        <Entry
          target="blank"
          title="21. Yüzyıl İçin 21 Ders"
          description="Yuval Noah Harari"
          href="https://www.goodreads.com/book/show/41034731-21-y-zy-l-i-in-21-ders"
          icon={<Goodreads />}
        />
        <Entry
          target="blank"
          title="Serenad"
          description="Zulfu Livaneli"
          href="https://www.goodreads.com/book/show/41034731-21-y-zy-l-i-in-21-ders"
          icon={<Goodreads />}
        />
        <Entry
          target="blank"
          title="Cehenneme Övgü"
          description="Gündüz Vassaf"
          href="https://www.goodreads.com/book/show/6902351-cehenneme-vg"
          icon={<Goodreads />}
        />
        <Entry
          target="blank"
          title="Emotional Intelligence"
          description="Harvard Business Review"
          href="https://www.goodreads.com/book/show/23258980-on-emotional-intelligence"
          icon={<Goodreads />}
        />
        <Entry
          target="blank"
          title="The Power of Habit"
          description="Charles Duhigg"
          href="https://www.goodreads.com/book/show/12609433-the-power-of-habit"
          icon={<Goodreads />}
        />
        <SeeOthers
          title="See Others on Goodreads"
          href="https://www.goodreads.com/user/show/102775572-enes-zt-rk"
        />
      </article>
    </Page>
  )
}

export default Paragliding

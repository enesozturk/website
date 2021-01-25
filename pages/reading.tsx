import Page from '@components/page'
import { Goodreads } from '@components/icons'
import { Entry, EntryGroupText, SeeOthers } from '../components/entry'

import data from '../data/reading.json'

const Paragliding = () => {
  return (
    <Page title="Reading" description="Collection of books that I read">
      <article>
        <EntryGroupText title="Currently Reading" />
        {data.currently.map((item, index) => {
          return (
            <Entry
              key={index}
              target="blank"
              title={item.title}
              description={item.author}
              href={item.link}
              icon={<Goodreads />}
            />
          )
        })}

        <EntryGroupText title="Favorite Books I Read" />
        {data.read.map((item, index) => {
          return (
            <Entry
              key={index}
              target="blank"
              title={item.title}
              description={item.author}
              href={item.link}
              icon={<Goodreads />}
            />
          )
        })}
        <SeeOthers
          title="See Others on Goodreads"
          href="https://www.goodreads.com/user/show/102775572-enes-zt-rk"
        />
      </article>
    </Page>
  )
}

export default Paragliding

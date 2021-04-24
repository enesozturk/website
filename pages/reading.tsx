import Page from '@components/page'
import { Goodreads } from '@components/icons'
import { Entry, EntryGroupText, SeeOthers } from '../components/entry'

import { getTable } from 'utils/airtable'

type ReadingDataItem = {
  title: string
  author: string
  link: string
  status: 'currently' | 'read'
}

type ReadingProps = {
  currently: ReadingDataItem[]
  read: ReadingDataItem[]
}

const Reading = (props: ReadingProps) => {
  const { currently, read } = props
  return (
    <Page title="Reading" description="Collection of books that I read">
      <article>
        <EntryGroupText title="Currently Reading" />
        {currently.map((item, index) => {
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
        {read.map((item, index) => {
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

export async function getStaticProps() {
  const data = await getTable('Reading')

  const currently = data.filter((p: ReadingDataItem) => p.status == 'currently')
  const read = data.filter((p: ReadingDataItem) => p.status == 'read')

  return {
    props: {
      currently,
      read
    },
    revalidate: 10800
  }
}

export default Reading

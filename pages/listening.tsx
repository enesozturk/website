import Page from '@components/page'
import { Spotify } from '@components/icons'
import { Entry, EntryGroupText } from '../components/entry'

import { getTable } from 'utils/airtable'

type ListeningDataItem = {
  title: string
  author: string
  link: string
  image: string
  type: 'album' | 'playlist'
}

type ListeningProps = {
  album: ListeningDataItem[]
  playlist: ListeningDataItem[]
}

const Projects = (props: ListeningProps) => {
  const { album, playlist } = props

  return (
    <Page title="Listening" description="Collection of my playlists">
      <EntryGroupText title="Favorite Albums" smallGap />
      {album.map((item: ListeningDataItem, index: number) => {
        return (
          <Entry
            key={index}
            smallGap
            target="blank"
            title={item.title}
            description={item.author}
            href={item.link}
            image={item.image}
            icon={<Spotify />}
          />
        )
      })}
      <EntryGroupText title="My Playlists" smallGap />
      {playlist.map((item: ListeningDataItem, index: number) => {
        return (
          <Entry
            key={index}
            smallGap
            target="blank"
            title={item.title}
            description={item.author}
            href={item.link}
            image={item.image}
            icon={<Spotify />}
          />
        )
      })}
    </Page>
  )
}

export async function getStaticProps() {
  const data = await getTable('Listening')

  const album = data.filter((p: ListeningDataItem) => p.type == 'album')
  const playlist = data.filter((p: ListeningDataItem) => p.type == 'playlist')

  return {
    props: {
      album,
      playlist
    },
    revalidate: 10800
  }
}

export default Projects

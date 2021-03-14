import Page from '@components/page'
import { Spotify } from '@components/icons'
import { Entry, EntryGroupText } from '../components/entry'

import { getTable } from 'utils/airtable'

type ListeningProps = {
  data: any
}

const Projects = (props: ListeningProps) => {
  const { album, playlist } = props

  return (
    <Page title="Listening" description="Collection of my playlists">
      <EntryGroupText title="Favorite Albums" smallGap />
      {album.map((item, index) => {
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
      {playlist.map((item, index) => {
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

  const album = data.filter(p => p.type == 'album')
  const playlist = data.filter(p => p.type == 'playlist')

  return {
    props: {
      album,
      playlist
    },
    revalidate: 100
  }
}

export default Projects

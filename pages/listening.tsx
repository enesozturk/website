import Page from '@components/page'
import { Spotify } from '@components/icons'
import { Entry, EntryGroupText } from '../components/entry'

import data from '../data/listening.json'

const Projects = () => {
  return (
    <Page title="Listening" description="Collection of my playlists">
      <EntryGroupText title="Favorite Albums" smallGap />
      {data.albums.map((item, index) => {
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
      {data.playlists.map((item, index) => {
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

export default Projects

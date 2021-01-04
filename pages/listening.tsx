import Page from '@components/page'
import { Spotify } from '@components/icons'
import { Entry, EntryGroupText } from '../components/entry'

const Projects = () => {
  return (
    <Page title="Listening" description="Collection of my playlists">
      <EntryGroupText title="Favorite Albums" emphasized />
      <Entry
        title="Simulation Theory"
        description="Muse"
        href="https://open.spotify.com/album/5OZgDtx180ZZPMpm36J2zC"
        image="https://i.scdn.co/image/ab67616d00001e024cb163c1d111f77307c842b6"
        icon={<Spotify />}
      />
      <Entry
        title="Mutsuz Parti"
        description="Büyük Ev Ablukada"
        href="https://open.spotify.com/album/1UBVA82yVbyoaBkVnWKhB8?si=j2xjDx7xSZ2wacKNBceWOA"
        image="https://i.scdn.co/image/ab67616d00001e02d85bc4f2cfba519163aa0d9f"
        icon={<Spotify />}
      />
      <Entry
        title="Lafıma Gücenme"
        description="Ari Barokas"
        href="https://open.spotify.com/album/5NsIMUWwAn4BMDvwyArZz7"
        image="https://i.scdn.co/image/ab67616d00001e021d26b3e7ea803059a6e4ffea"
        icon={<Spotify />}
      />
      <Entry
        title="Ludovico II"
        description="Şanışer"
        href="https://open.spotify.com/album/2bNlPIlKyhtYJIe7lHa6F6?si=W6d1MVBfQvCwgE5hUQtXVg"
        image="https://i.scdn.co/image/ab67616d00001e02114c2ebb9903b8a121b41aa5"
        icon={<Spotify />}
      />
      <Entry
        title="İyi Niyetli Bir Gün"
        description="Gece"
        href="https://open.spotify.com/album/03F98O6rqq2Eie8kZzcCFX"
        image="https://i.scdn.co/image/ab67616d00001e02a28c98aca6ca2fc8a05430df"
        icon={<Spotify />}
      />
      <EntryGroupText title="My Playlists" emphasized />
      <Entry
        title="Relaxing"
        description="Playlist - Enes Öztürk"
        href="https://open.spotify.com/playlist/16xiQIS7MKuTbuOheHnnSA"
        image="https://i.scdn.co/image/ab67706c0000bebb7f34f13ebab6652ce735dc4b"
        icon={<Spotify />}
      />
      <Entry
        title="Instrumental - Piano"
        description="Playlist - Enes Öztürk"
        href="https://open.spotify.com/playlist/2aifbSMuIGllmWMptLmGL5"
        image="https://i.scdn.co/image/ab67706c0000bebb4230239b939282d2799bba92"
        icon={<Spotify />}
      />
      <Entry
        title="Oldies"
        description="Playlist - Enes Öztürk"
        href="https://open.spotify.com/playlist/7JtlpKCAtXURJfynbUODFz"
        image="https://i.scdn.co/image/ab67706c0000bebb137db8d5b8a74fc86d775500"
        icon={<Spotify />}
      />
      <Entry
        title="Evening Rest"
        description="Playlist - Enes Öztürk"
        href="https://open.spotify.com/playlist/0rLLhxlZyqucYXVkTKbQal"
        image="https://i.scdn.co/image/ab67706c0000bebbb72ebc5b4bb6ce933976e157"
        icon={<Spotify />}
      />
    </Page>
  )
}

export default Projects

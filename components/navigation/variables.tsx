import {
  Twitter,
  Home,
  Edit,
  Linkedin,
  Github,
  At,
  Cloud,
  LeftQuote,
  Terminal,
  Spotify,
  Book,
  Bookmark,
  TwentyOne
} from '@components/icons'

export type MenuItemProps = {
  route: string
  icon: React.ReactNode
  title: string
  external?: boolean
}

export type MenuListProps = {
  navigation: MenuItemProps[]
  collections: MenuItemProps[]
  social: MenuItemProps[]
  lastActivity: MenuItemProps[]
}

export const MenuList: MenuListProps = {
  navigation: [
    { route: '/', icon: <Home />, title: 'Home' },
    { route: '/blog', icon: <Edit />, title: 'Blog' },
    { route: '/contact', icon: <At />, title: 'Contact' }
  ],
  collections: [
    { route: '/goals', icon: <TwentyOne />, title: 'Goals' },
    { route: '/projects', icon: <Terminal />, title: 'Projects' },
    { route: '/reading', icon: <Book />, title: 'Reading' },
    { route: '/listening', icon: <Spotify />, title: 'Listening' },
    { route: '/paragliding', icon: <Cloud />, title: 'Paragliding' },
    { route: '/quotes', icon: <LeftQuote />, title: 'Qoutes' },
    { route: '/bookmarks', icon: <Bookmark />, title: 'Bookmarks' }
  ],
  social: [
    {
      route: 'https://twitter.com/enesozt_',
      icon: <Twitter />,
      title: 'Twitter',
      external: true
    },
    {
      route: 'https://github.com/enesozturk',
      icon: <Github />,
      title: 'Github',
      external: true
    },
    {
      route: 'https://linkedin.com/in/enes-ozturk',
      icon: <Linkedin />,
      title: 'Linkedin',
      external: true
    }
  ],
  lastActivity: [
    {
      route: '/blog/react-native-ile-60-fps-animasyonlar',
      icon: <Edit />,
      title: 'React Native ile 60 FPS Animasyonlar'
    },
    {
      route: '/blog/react-native-optimization-b1-k6',
      icon: <Edit />,
      title: 'React Native Uygulamamı Nasıl Optimize Ederim? [B1:K6]'
    },
    {
      route: '/blog/react-native-optimization-b1-k5',
      icon: <Edit />,
      title: 'React Native Uygulamamı Nasıl Optimize Ederim? [B1:K5]'
    }
  ]
}

export const FilteredList = (list: MenuItemProps[], search: string) => {
  if (search === '') return list
  else {
    const regex = new RegExp(`.*${search.toLocaleLowerCase()}.*`, 'g')
    return list.filter((item: MenuItemProps) => {
      return regex.test(item.title.replace('\\s', '').toLocaleLowerCase())
    })
  }
}

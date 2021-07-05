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
  TwentyOne,
  Superpeer
} from '@components'

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
      route: 'https://superpeer.com/enesozturk',
      icon: <Superpeer />,
      title: 'Superpeer',
      external: true
    },
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
      route: '/blog/react-native-ile-single-sign-on-kimlik-dogrulama',
      icon: <Edit />,
      title: 'React Native ile Single Sign On Kimlik Doğrulama'
    },
    {
      route: '/blog/next-js-ile-onemli-jamstack-kavramlari',
      icon: <Edit />,
      title: 'Next.js ile Jamstack Kavramları'
    },
    {
      route: 'https://github.com/enesozturk/react-native-hold-menu',
      icon: <Terminal />,
      title: 'React Native Hold Menu Published',
      external: true
    },
    {
      route: '/blog/ikibin-yirmibir',
      icon: <Edit />,
      title: '2021'
    }
  ]
}

export const FilteredList = (
  list: MenuItemProps[],
  search: string,
  x?: string
) => {
  if (x) console.log(x)
  if (search === '') return list
  else {
    const regex = new RegExp(`.*${search.toLocaleLowerCase()}.*`, 'g')
    return list.filter((item: MenuItemProps) => {
      return regex.test(item.title.replace('\\s', '').toLocaleLowerCase())
    })
  }
}

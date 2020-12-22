import {
  Twitter,
  Home,
  Edit,
  Linkedin,
  Github,
  Letter,
  Cloud,
  LeftQuote,
  Terminal
} from '@components/icons'

export type MenuItemProps = {
  route: string
  icon: React.ReactNode
  title: string
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
    { route: '/contact', icon: <Letter />, title: 'Contact' }
  ],
  collections: [
    { route: '/projects', icon: <Terminal />, title: 'Projects' },
    { route: '/quotes', icon: <LeftQuote />, title: 'Qoutes' },
    { route: '/paragliding', icon: <Cloud />, title: 'Paragliding' }
  ],
  social: [
    {
      route: 'https://twitter.com/enesozt_',
      icon: <Twitter />,
      title: 'Twitter'
    },
    {
      route: 'https://github.com/enesozturk',
      icon: <Github />,
      title: 'Github'
    },
    {
      route: 'https://linkedin.com/in/enes-ozturk',
      icon: <Linkedin />,
      title: 'Linkedin'
    }
  ],
  lastActivity: [
    {
      route: '/blog/react-native-ile-60-fps-animasyonlar',
      icon: <Edit />,
      title: 'React Native ile 60 FPS Animasyonlar'
    },
    {
      route: '/blog/react-native-uygulamami-nasil-optimize-ederim-b1-k6',
      icon: <Edit />,
      title: 'React Native Uygulamamı Nasıl Optimize Ederim? [B1:K6]'
    },
    {
      route: '/blog/react-native-uygulamami-nasil-optimize-ederim-b1-k5',
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

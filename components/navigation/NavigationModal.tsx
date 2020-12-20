import React, { useEffect, useRef, useMemo, useState, memo } from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'
import useDelayedRender from 'use-delayed-render'
import { DialogContent, DialogOverlay } from '@reach/dialog'

import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  useCommand,
  usePages,
  CommandGroup
} from 'cmdk'

import {
  Paraglider,
  Twitter,
  Home,
  Edit,
  Identification,
  Linkedin,
  Github
} from '@components/icons'
import styles from './navigation.module.css'
import headerStyles from '@components/header/header.module.css'
import { useTheme } from 'next-themes'
import tinykeys from '@lib/tinykeys'
import postMeta from '@data/blog.json'

const CommandData = React.createContext({})
const useCommandData = () => React.useContext<any>(CommandData)

const CommandMenu = memo(() => {
  const listRef = useRef<HTMLElement>(null)
  const commandRef = useRef<any>(null)
  const router = useRouter()
  const commandProps = useCommand({
    label: 'Site Navigation'
  })
  const [pages, setPages] = usePages(commandProps, ThemeItems)
  const [open, setOpen] = useState(false)
  const { search, list } = commandProps

  const { mounted, rendered } = useDelayedRender(open, {
    enterDelay: -1,
    exitDelay: 200
  })

  // Can't do this inside of useCommand because it relies on useDelayedRender
  useEffect(() => {
    if (!mounted) {
      setPages([DefaultItems])
    }
  }, [mounted, setPages])

  const Items = pages[pages.length - 1]

  const keymap = useMemo(() => {
    return {
      t: () => {
        setPages([ThemeItems])
        setOpen(true)
      },
      // Blog
      'g b': () => router.push('/blog'),
      // Navigation
      'g h': () => router.push('/'),
      'g c': () => router.push('/contact'),
      // Collections
      'g r': () => router.push('/reading'),
      'g d': () => router.push('/design'),
      'g k': () => router.push('/keyboards'),
      'g m': () => router.push('/music'),
      'g p': () => router.push('/projects'),
      'g q': () => router.push('/quotes'),
      'g w': () => router.push('/words'),
      'g i': () => router.push('/ideas'),
      // Social
      'g t': () => () =>
        window.open('https://twitter.com/pacocoursey', '_blank')
    }
  }, [router, setPages])

  // Register the keybinds globally
  useEffect(() => {
    const unsubs = [
      tinykeys(window, keymap, { ignoreFocus: true }),
      tinykeys(window, { '$mod+k': () => setOpen(o => !o) })
    ]
    return () => {
      unsubs.forEach(unsub => unsub())
    }
  }, [keymap])

  useEffect(() => {
    // When items change, bounce the UI
    if (commandRef && commandRef.current) {
      // Bounce the UI slightly
      commandRef.current.style.transform = 'scale(0.99)'
      commandRef.current.style.transition = 'transform 0.1s ease'
      // Not exactly safe, but should be OK
      setTimeout(() => {
        commandRef.current.style.transform = ''
      }, 100)
    }
  }, [pages])

  const heightRef = useRef<any>(null)

  useEffect(() => {
    if (!listRef.current || !heightRef.current) return

    const height = Math.min(listRef.current.offsetHeight + 1, 300)
    heightRef.current.style.height = height + 'px'
  })

  return (
    <>
      <button
        className={headerStyles.command}
        title="Fly"
        onClick={() => setOpen(true)}
      >
        <Paraglider />
      </button>

      <DialogOverlay
        isOpen={mounted}
        className={cn(styles.screen, {
          [styles.show]: rendered
        })}
        onDismiss={() => setOpen(false)}
      >
        <DialogContent
          className={styles['dialog-content']}
          aria-label="Site Navigation"
        >
          <Command
            {...commandProps}
            ref={commandRef}
            className={cn(styles.command, {
              [styles.show]: rendered
            })}
          >
            <div className={styles.wrapper}>
              <div className={styles.top}>
                <CommandInput
                  placeholder={
                    Items === ThemeItems
                      ? 'Select a theme...'
                      : Items === BlogItems
                      ? 'Search for posts...'
                      : 'Type a command or search...'
                  }
                />
              </div>

              <div
                ref={heightRef}
                className={cn(styles.container, {
                  [styles.empty]: list.current.length === 0
                })}
              ></div>

              <div className={styles.content}>
                <div className={styles.menuItems}>
                  <span className={styles.groupTitle}>Navigation</span>
                  <div className={styles.menuItemGroup}>
                    <div className={styles.menuItem}>
                      <div className={styles.icon}>
                        <Home />
                      </div>
                      <span>Home</span>
                    </div>
                    <div className={styles.menuItem}>
                      <div className={styles.icon}>
                        <Edit />
                      </div>
                      <span>Blog</span>
                    </div>
                    <div className={styles.menuItem}>
                      <div className={styles.icon}>
                        <Identification />
                      </div>
                      <span>Contact</span>
                    </div>
                  </div>

                  <span className={styles.groupTitle}>Social</span>
                  <div className={styles.menuItemGroup}>
                    <div className={styles.menuItem}>
                      <div className={styles.icon}>
                        <Twitter />
                      </div>
                      <span>Twitter</span>
                    </div>
                    <div className={styles.menuItem}>
                      <div className={styles.icon}>
                        <Github />
                      </div>
                      <span>Github</span>
                    </div>
                    <div className={styles.menuItem}>
                      <div className={styles.icon}>
                        <Linkedin />
                      </div>
                      <span>Linkedin</span>
                    </div>
                  </div>
                </div>

                <div className={styles.previewContainer}>
                  <span className={styles.groupTitle}>Last Activity</span>
                  <div className={styles.menuItemGroup}>
                    <div className={styles.menuItem}>
                      <div className={styles.icon}>
                        <Edit />
                      </div>
                      <span>React Native ile 60 FPS Animasyonlar</span>
                    </div>
                    <div className={styles.menuItem}>
                      <div className={styles.icon}>
                        <Edit />
                      </div>
                      <span>
                        React Native Uygulamamı Nasıl Optimize Ederim? [B1:K6]
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Command>
        </DialogContent>
      </DialogOverlay>
    </>
  )
})

CommandMenu.displayName = 'CommandMenu'
export default CommandMenu

const ThemeItems = () => {
  const { theme: activeTheme, themes, setTheme } = useTheme()
  const { setOpen } = useCommandData()

  return themes.map(theme => {
    if (theme === activeTheme) return null
    return (
      <Item
        value={theme}
        key={`theme-${theme}`}
        callback={() => {
          setTheme(theme)
          setOpen(false)
        }}
      >
        {theme}
      </Item>
    )
  })
}

const BlogItems = () => {
  const router = useRouter()

  return postMeta.map((post, i) => {
    return (
      <Item
        key={`blog-item-${post.title}-${i}`}
        value={post.title}
        callback={() => router.push('/blog/[slug]', `/blog/${post.slug}`)}
      />
    )
  })
}

type LabelProps = {
  title: any
  values?: any
  search?: any
}

const Label = ({ title, values, search }: LabelProps) => {
  return (
    <div className={styles.label} aria-hidden>
      {title}
    </div>
  )
}

type GroupProps = {
  children: any
  title: any
}

const Group = ({ children, title }: GroupProps) => {
  return (
    <CommandGroup heading={<Label title={title} />} className={styles.group}>
      {children}
    </CommandGroup>
  )
}

const DefaultItems = () => {
  const router = useRouter()
  const { setPages, pages } = useCommandData()

  return (
    <>
      <Item value="Themes" keybind="t" closeOnCallback={false} />
      <Group title="Blog">
        <Item value="Blog" icon={<Edit />} keybind="g b" />
        <Item
          value="Search blog..."
          icon={<Search />}
          closeOnCallback={false}
          callback={() => setPages([...pages, BlogItems])}
        />
      </Group>

      <Group title="Collection">
        <Item value="Projects" icon={<Document />} keybind="g p" />
        {/* <Item value="Reading" icon={<Book />} keybind="g r" />
        <Item value="Design" icon={<Design />} keybind="g d" />
        <Item value="Keyboards" icon={<M6 />} keybind="g k" />
        <Item value="Music" icon={<Music />} keybind="g m" />
        <Item value="Quotes" icon={<Quote />} keybind="g q" />
        <Item value="Words" icon={<Words />} keybind="g w" />
        <Item value="Ideas" icon={<Lightbulb />} keybind="g i" /> */}
      </Group>

      <Group title="Navigation">
        <Item value="Home" icon={<ArrowRight />} keybind="g h" />
        <Item value="Contact" icon={<ArrowRight />} keybind="g c" />
      </Group>

      <Group title="Social">
        <Item
          value="GitHub"
          icon={<Github />}
          callback={() =>
            window.open('https://github.com/enesozturk', '_blank')
          }
        />
        <Item
          value="Twitter"
          icon={<Twitter />}
          callback={() => window.open('https://twitter.com/enesozt_', '_blank')}
          keybind="g t"
        />
        <Item
          value="Linkedin"
          callback={() =>
            window.open('https://linkedin.com/in/enes-ozturk', '_blank')
          }
          keybind="g t"
        />
      </Group>
    </>
  )
}

type ItemProps = {
  value: any
  icon?: any
  children?: any
  callback?: any
  closeOnCallback?: any
  keybind?: any
}

const Item = ({
  value,
  icon,
  children,
  callback,
  closeOnCallback = true,
  keybind,
  ...props
}: ItemProps) => {
  const { keymap, setOpen } = useCommandData()

  const cb = () => {
    if (callback) {
      callback()
    } else {
      keymap[keybind]?.()
    }

    if (closeOnCallback) {
      setOpen(false)
    }
  }

  return (
    <CommandItem {...props} callback={cb}>
      <div>
        <div className={styles.icon}>{icon}</div>
        {children || value}
      </div>

      {keybind && (
        <span className={styles.keybind}>
          {keybind.includes(' ') ? (
            keybind.split(' ').map((key: any, i: any) => {
              return <kbd key={`keybind-${key}-${i}`}>{key}</kbd>
            })
          ) : (
            <kbd>{keybind}</kbd>
          )}
        </span>
      )}
    </CommandItem>
  )
}

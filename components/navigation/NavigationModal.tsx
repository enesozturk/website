import React, { useEffect, useRef, useState, memo } from 'react'
import cn from 'classnames'

import useDelayedRender from 'use-delayed-render'
import { DialogContent, DialogOverlay } from '@reach/dialog'

import { Command as CommandLogo, Edit } from '@components/icons'
import styles from './navigation.module.css'
import headerStyles from '@components/header/header.module.css'
import { useTheme } from 'next-themes'
import MenuItem from './MenuItem'
import SearchInput from './SearchInput'
import { MenuList, MenuItemProps } from './variables'

const filteredList = (list: MenuItemProps[], search: string) => {
  if (search === '') return list
  else {
    const regex = new RegExp(`.*${search.toLocaleLowerCase()}.*`, 'g')
    return list.filter((item: MenuItemProps) => {
      return regex.test(item.title.replace('\\s', '').toLocaleLowerCase())
    })
  }
}

const CommandMenu = memo(() => {
  const { theme, setTheme } = useTheme()

  const listRef = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const { mounted, rendered } = useDelayedRender(open, {
    enterDelay: -1,
    exitDelay: 200
  })

  const toggleTheme = () => {
    setTheme(theme == 'dark' ? 'light' : 'dark')
  }

  const heightRef = useRef<any>(null)

  useEffect(() => {
    if (!listRef.current || !heightRef.current) return

    const height = Math.min(listRef.current.offsetHeight + 1, 300)
    heightRef.current.style.height = height + 'px'
  })

  const navigations = filteredList(MenuList.navigation, search)
  const collections = filteredList(MenuList.collections, search)
  const socials = filteredList(MenuList.social, search)
  const lastActivities = filteredList(MenuList.lastActivity, search)

  return (
    <>
      <button
        className={headerStyles.command}
        title="Fly"
        onClick={() => setOpen(true)}
      >
        <CommandLogo />
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
          <div
            className={cn(styles.command, {
              [styles.show]: rendered
            })}
          >
            <div className={styles.wrapper}>
              <SearchInput
                wrapperClassName={styles.top}
                value={search}
                setSearch={(value: string) => setSearch(value)}
              />

              <div className={styles.content}>
                <div className={styles.menuItems}>
                  {navigations.length > 0 && (
                    <>
                      <span className={styles.groupTitle}>Navigation</span>
                      <div className={styles.menuItemGroup}>
                        {navigations.map((item, index) => {
                          return (
                            <MenuItem
                              key={index}
                              route={item.route}
                              icon={item.icon}
                              title={item.title}
                            />
                          )
                        })}
                      </div>
                    </>
                  )}

                  {collections.length > 0 && (
                    <>
                      <span className={styles.groupTitle}>Collections</span>
                      <div className={styles.menuItemGroup}>
                        {collections.map((item, index) => {
                          return (
                            <MenuItem
                              key={index}
                              route={item.route}
                              icon={item.icon}
                              title={item.title}
                            />
                          )
                        })}
                      </div>
                    </>
                  )}

                  {socials.length > 0 && (
                    <>
                      <span className={styles.groupTitle}>Social</span>
                      <div className={styles.menuItemGroup}>
                        {socials.map((item, index) => {
                          return (
                            <MenuItem
                              key={index}
                              external
                              route={item.route}
                              icon={item.icon}
                              title={item.title}
                            />
                          )
                        })}
                      </div>
                    </>
                  )}

                  <span className={styles.groupTitle}>Settings</span>
                  <div
                    className={`${styles.menuItemGroup} ${styles.toggleTheme}`}
                  >
                    <MenuItem
                      onClick={toggleTheme}
                      icon={<Edit />}
                      title="Toggle Theme"
                    />
                  </div>
                </div>

                <div className={styles.previewContainer}>
                  {lastActivities.length > 0 && (
                    <>
                      <span className={styles.groupTitle}>Last Activity</span>
                      <div className={styles.menuItemGroup}>
                        {lastActivities.map((item, index) => {
                          return (
                            <MenuItem
                              key={index}
                              route={item.route}
                              icon={item.icon}
                              title={item.title}
                            />
                          )
                        })}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </DialogOverlay>
    </>
  )
})

CommandMenu.displayName = 'CommandMenu'
export default CommandMenu

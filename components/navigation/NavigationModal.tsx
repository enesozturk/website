import React, { useEffect, useRef, useState, memo } from 'react'

import { useTheme } from 'next-themes'
import { DialogContent, DialogOverlay } from '@reach/dialog'

// Components
import MenuItem from './MenuItem'
import SearchInput from './SearchInput'

// Icons
import { Edit, MenuIcon } from '@components/icons'

// Styles
import styles from './navigation.module.css'
import headerStyles from '@components/header/header.module.css'

// Utils
import { MenuList, FilteredList } from './variables'
import { animated, useTransition } from 'react-spring'

const NavigationModal = () => {
  const AnimatedDialogOverlay = animated(DialogOverlay)
  const AnimatedDialogContent = animated(DialogContent)
  const [showDialog, setShowDialog] = React.useState(false)
  const transitions = useTransition(showDialog, {
    from: { opacity: 0, y: -10 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 10 },
    config: { duration: 100 }
  })

  const { theme, setTheme } = useTheme()

  const listRef = useRef<HTMLElement>(null)
  const [search, setSearch] = useState('')

  const toggleTheme = () => {
    setTheme(theme == 'dark' ? 'light' : 'dark')
  }

  const heightRef = useRef<any>(null)

  useEffect(() => {
    if (!listRef.current || !heightRef.current) return

    const height = Math.min(listRef.current.offsetHeight + 1, 300)
    heightRef.current.style.height = height + 'px'
  })

  const navigations = FilteredList(MenuList.navigation, search)
  const collections = FilteredList(MenuList.collections, search)
  const socials = FilteredList(MenuList.social, search)
  const lastActivities = FilteredList(MenuList.lastActivity, search)

  return (
    <>
      <button
        className={headerStyles.command}
        title="Fly"
        onClick={() => setShowDialog(true)}
      >
        <MenuIcon />
      </button>
      {transitions(
        (style, item) =>
          item && (
            <AnimatedDialogOverlay
              className={styles.screen}
              style={{ opacity: style.opacity }}
              isOpen={showDialog}
              onDismiss={() => setShowDialog(false)}
            >
              <AnimatedDialogContent className={styles.navigationModal}>
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
                          <span className={styles.groupTitle}>
                            Last Activity
                          </span>
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
              </AnimatedDialogContent>
            </AnimatedDialogOverlay>
          )
      )}
    </>
  )
}

NavigationModal.displayName = 'NavigationModal'
export default memo(NavigationModal)

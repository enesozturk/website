import React, { useState, memo } from 'react'
import cn from 'classnames'

import { useTheme } from 'next-themes'
import { DialogContent, DialogOverlay } from '@reach/dialog'
import useDelayedRender from 'use-delayed-render'

// Components
import MenuItem from './MenuItem'
import MenuGroup from './MenuGroup'
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
  const [showDialog, setShowDialog] = React.useState(false)
  const { mounted, rendered } = useDelayedRender(showDialog, {
    enterDelay: -1,
    exitDelay: 200
  })

  const { theme, setTheme } = useTheme()
  const [search, setSearch] = useState('')

  const toggleTheme = () => {
    setTheme(theme == 'dark' ? 'light' : 'dark')
  }

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
      <DialogOverlay
        isOpen={mounted}
        className={cn(styles.screen, {
          [styles.show]: rendered
        })}
        onDismiss={() => setShowDialog(false)}
        dangerouslyBypassFocusLock
      >
        <DialogContent
          aria-label="Site Navigation"
          className={cn(styles.navigationModal, {
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
                <MenuGroup list={navigations} title="Navigation" />
                <MenuGroup list={collections} title="Collections" />
                <MenuGroup list={socials} title="Social" />

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
                <MenuGroup list={lastActivities} title="Last Activity" />
              </div>
            </div>
          </div>
        </DialogContent>
      </DialogOverlay>
    </>
  )
}

NavigationModal.displayName = 'NavigationModal'
export default memo(NavigationModal)

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
import { Moon, StrikeMenu } from '@components/icons'

// Styles
import styles from './navigation.module.css'
import headerStyles from '@components/header/header.module.css'

// Utils
import { MenuList, FilteredList } from './variables'

const NavigationModal = () => {
  const [showDialog, setShowDialog] = React.useState(false)
  const { mounted, rendered } = useDelayedRender(showDialog, {
    enterDelay: 10,
    exitDelay: 300
  })

  const { theme, setTheme } = useTheme()
  const [search, setSearch] = useState('')

  const toggleTheme = () => {
    setTheme(theme == 'dark' ? 'light' : 'dark')
  }

  const navigations = React.useMemo(
    () => FilteredList(MenuList.navigation, search),
    [search]
  )
  const collections = React.useMemo(
    () => FilteredList(MenuList.collections, search),
    [search]
  )
  const socials = React.useMemo(() => FilteredList(MenuList.social, search), [
    search
  ])
  const lastActivities = React.useMemo(
    () => FilteredList(MenuList.lastActivity, search),
    [search]
  )

  return (
    <>
      <button
        className={headerStyles.command}
        title="Menu"
        onClick={() => setShowDialog(true)}
      >
        <StrikeMenu />
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
                    icon={<Moon />}
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

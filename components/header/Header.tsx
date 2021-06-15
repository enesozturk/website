import { memo } from 'react'
import Link from 'next/link'

import { NavigationModal, Logo } from '@components'

import styles from './header.module.css'

type HeaderProps = {
  title?: string | number | null
}

const Header = ({ title }: HeaderProps) => {
  return (
    <nav className={styles.nav}>
      <div className={styles.header}>
        <div className={styles.logoAndPageTitle}>
          <Link href="/">
            <a aria-label="Navigate Home" className={styles.logo}>
              <Logo />
            </a>
          </Link>
          {title && <div className={styles.content}>{title}</div>}
        </div>
        <NavigationModal />
      </div>
    </nav>
  )
}

Header.displayName = 'Header'
export default memo(Header)

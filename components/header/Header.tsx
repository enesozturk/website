import { memo } from 'react'
import Link from 'next/link'

import styles from './header.module.css'
import Navigation from '@components/navigation'
import { Logo } from '@components/icons'

type HeaderProps = {
  title?: string | number | null
}

const Header = ({ title }: HeaderProps) => {
  return (
    <nav className={styles.nav}>
      <div className={styles.header}>
        <Link href="/">
          <a aria-label="Navigate Home" className={styles.logo}>
            <Logo />
          </a>
        </Link>
        <Navigation />
        {title && <div className={styles.content}>{title}</div>}
      </div>
    </nav>
  )
}

Header.displayName = 'Header'
export default memo(Header)

import { memo } from 'react'
import Link from 'next/link'

import styles from './header.module.css'
import Command from '@components/navigation'

type HeaderProps = {
  title?: string | number | null
}

const Header = ({ title }: HeaderProps) => {
  return (
    <nav className={styles.nav}>
      <div className={styles.header}>
        {/* <Link href="/">
          <a aria-label="Navigate Home" className={styles.logo}>
            <LogoIcon />
          </a>
        </Link> */}

        <Command />

        {title && <div className={styles.content}>{title}</div>}
      </div>
    </nav>
  )
}

Header.displayName = 'Header'
export default memo(Header)

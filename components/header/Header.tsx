import { memo } from 'react'

import styles from './header.module.css'
import Command from '@components/navigation'

type HeaderProps = {
  title?: string | number | null
}

const Header = ({ title }: HeaderProps) => {
  return (
    <nav className={styles.nav}>
      <div className={styles.header}>
        <Command />
        {title && <div className={styles.content}>{title}</div>}
      </div>
    </nav>
  )
}

Header.displayName = 'Header'
export default memo(Header)

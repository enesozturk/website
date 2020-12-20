import React from 'react'
import styles from './navigation.module.css'

import Link from '@components/link'

type MenuItemProps = {
  icon: React.ReactNode
  title: string
  route?: string
  onClick?: () => void
  external?: boolean
}

const MenuItem = ({ icon, title, route, external, onClick }: MenuItemProps) => {
  return route ? (
    <Link href={route} external={external} className={styles.menuItem}>
      <div className={styles.icon}>{icon}</div>
      <span>{title}</span>
    </Link>
  ) : (
    <button onClick={onClick} className={styles.menuItem}>
      <div className={styles.icon}>{icon}</div>
      <span>{title}</span>
    </button>
  )
}

export default MenuItem

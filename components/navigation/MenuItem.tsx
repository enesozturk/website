import React from 'react'
import styles from './navigation.module.css'

import Link from '@components/link'

type MenuItemProps = {
  icon: React.ReactNode
  title: string
  route: string
  external?: boolean
}

const MenuItem = ({ icon, title, route, external }: MenuItemProps) => {
  return (
    <Link href={route} external={external} className={styles.menuItem}>
      <div className={styles.icon}>{icon}</div>
      <span>{title}</span>
    </Link>
  )
}

export default MenuItem

import React, { memo } from 'react'
import cn from 'classnames'
import styles from './menuItem.module.css'

import { Link } from '@components'

type MenuItemProps = {
  icon: React.ReactNode
  title: string
  route?: string
  onClick?: () => void
  external?: boolean
  active?: boolean
}

const MenuItem = ({
  icon,
  title,
  route,
  external,
  onClick,
  active
}: MenuItemProps) => {
  const isSuperpeer = title === 'Superpeer'

  return route ? (
    <Link
      href={route}
      external={external}
      className={cn([
        styles.menuItem,
        {
          [styles.menuItemActive]: active,
          [styles.superpeer]: isSuperpeer
        }
      ])}
    >
      <div className={styles.icon}>{icon}</div>
      <div className={styles.menuItemTitleWrapper}>
        <span>{title}</span>
      </div>
    </Link>
  ) : (
    <button onClick={onClick} className={styles.menuItem}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.menuItemTitleWrapper}>
        <span>{title}</span>
      </div>
    </button>
  )
}

export default memo(MenuItem)

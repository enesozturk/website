import React, { memo } from 'react'
import { useRouter } from 'next/router'

import styles from './navigation.module.css'

import MenuItem from './MenuItem'
import { MenuItemProps } from './variables'

type MenuGroupProps = {
  title: string
  list: MenuItemProps[]
  external?: boolean
}

const MenuGroup = ({ list, title }: MenuGroupProps) => {
  const { pathname } = useRouter()

  return (
    <>
      {list.length > 0 ? (
        <>
          <span className={styles.groupTitle}>{title}</span>
          <div className={styles.menuItemGroup}>
            {list.map((item, index) => {
              return (
                <MenuItem
                  key={index}
                  route={item.route}
                  icon={item.icon}
                  title={item.title}
                  external={item.external ? true : false}
                  active={pathname == item.route}
                />
              )
            })}
          </div>
        </>
      ) : null}
    </>
  )
}

export default memo(MenuGroup)

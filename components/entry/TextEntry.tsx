import { memo } from 'react'
import cn from 'classnames'

import Link from '@components/link'
import styles from './text.module.css'

type TextEntryProps = {
  title: string
  description: string
  type: string
  date?: string | null
  href: string
  as?: string
}

const TextEntry = ({
  title,
  description,
  type,
  date,
  href,
  as
}: TextEntryProps) => {
  return (
    <li className={styles.item}>
      <Link href={href} as={as} external={!as} className={styles.link}>
        <div className={styles.type}>
          <span>{type}</span>
          {date && <span>{date}</span>}
        </div>
        <div>
          <p className={cn(styles.title, 'clamp')}>{title}</p>
          {description && (
            <p className={cn(styles.description, 'clamp')}>{description}</p>
          )}
        </div>
      </Link>
    </li>
  )
}

export default memo(TextEntry)

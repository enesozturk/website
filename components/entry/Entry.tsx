import cn from 'classnames'
import { useInView } from 'react-intersection-observer'
import 'intersection-observer'

import styles from './entry.module.css'

type EntryProps = {
  title: string
  description: string
  image?: string
  href: string
  icon?: React.ReactNode
}

const Entry = ({ title, description, image, href, icon }: EntryProps) => {
  const [ref] = useInView({ triggerOnce: true })

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      ref={ref}
      className={styles.link}
      title={`${title} - ${description}`}
    >
      {image && (
        <div className={styles.imageWrapper}>
          <img className={styles.image} src={image} />
        </div>
      )}
      <section>
        <p className={cn(styles.title, 'clamp')}>{title}</p>
        <p className={cn(styles.description, 'clamp')}>{description}</p>
      </section>
      {icon}
    </a>
  )
}

export default Entry

import cn from 'classnames'
import { useInView } from 'react-intersection-observer'
import 'intersection-observer'

import styles from './entry.module.css'

type EntryProps = {
  link?: boolean;
  target?: "self" | "blank";
  title: string
  description: string
  image?: string
  href: string
  icon?: React.ReactNode
  border?: boolean;
  smallGap?: boolean;
}

const Entry = ({ title, description, image, href, target, icon, border, smallGap }: EntryProps) => {
  const [ref] = useInView({ triggerOnce: true })

  const content = (
    <>
      <section>
        {image && (
          <div className={styles.imageWrapper}>
            <img className={styles.image} src={image} />
          </div>
        )}
        <div>
          <p className={cn(styles.title, 'clamp')}>{title}</p>
          <p className={cn(styles.description, 'clamp')}>{description}</p>
        </div>
      </section>
      {icon}
    </>
  )


  return href ? (
    <a
      href={href}
      target={target == "blank" ? "_blank" : '_self'}
      rel="noopener noreferrer"
      ref={ref}
      className={cn([styles.link, {
        [styles.border]: border,
        [styles.smallGap]: smallGap
      }])}
      title={`${title} - ${description}`}
    >
      {content}
    </a>
  ) : (
      <div className={cn([styles.link, {
        [styles.border]: border
      }])}>{content}</div>
    )
}

export default Entry

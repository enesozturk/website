import cn from 'classnames'
import { useInView } from 'react-intersection-observer'
import 'intersection-observer'

import styles from './entry.module.css'

type EntryProps = {
  link?: boolean;
  target?: "self" | "blank";
  as?: string;
  title: string
  description: string
  image?: string
  href: string
  icon?: React.ReactNode
}

const Entry = ({ title, description, image, href, target, icon }: EntryProps) => {
  const [ref] = useInView({ triggerOnce: true })

  const content = (
    <>
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
    </>
  )


  return href ? (
    <a
      href={href}
      target={target == "blank" ? "_blank" : '_self'}
      rel="noopener noreferrer"
      ref={ref}
      className={styles.link}
      title={`${title} - ${description}`}
    >
      {content}
    </a>
  ) : (
      <div className={styles.link}>{content}</div>
    )
}

export default Entry

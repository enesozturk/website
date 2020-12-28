import cn from 'classnames'
import styles from './entry.module.css'

const SeeOthers = ({
  title,
  href
}: {
  title?: string
  icon?: React.ReactNode
  href?: string
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn([styles.link, styles.seeOthersButton])}
    >
      {title ? title : 'See Others'}
    </a>
  )
}

export default SeeOthers

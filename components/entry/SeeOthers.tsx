import cn from 'classnames'
import styles from './entry.module.css'

const SeeOthers = ({
  onClick,
  title,
  href
}: {
  onClick?: () => void;
  title?: string
  icon?: React.ReactNode
  href?: string
}) => {
  return onClick ? (
    <button
      onClick={onClick}
      className={cn([styles.link, styles.seeOthersButton])}
    >
      {title}
    </button>
  ) : (
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

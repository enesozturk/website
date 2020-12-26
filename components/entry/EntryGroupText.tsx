import cn from 'classnames'
import styles from './entry.module.css'

const EntryGroupText = ({
  title,
  emphasized
}: {
  title: string
  emphasized?: boolean
}) => {
  return (
    <p
      className={cn([
        styles.entryGroupText,
        {
          [styles.emphasized]: emphasized
        }
      ])}
    >
      {title}
    </p>
  )
}

export default EntryGroupText

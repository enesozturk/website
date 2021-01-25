import cn from 'classnames'
import styles from './entry.module.css'

const EntryGroupText = ({
  title,
  smallGap
}: {
  title: string
  smallGap?: boolean
}) => {
  return (
    <p
      className={cn([
        styles.entryGroupText,
        {
          [styles.smallGap]: smallGap
        }
      ])}
    >
      {title}
    </p>
  )
}

export default EntryGroupText

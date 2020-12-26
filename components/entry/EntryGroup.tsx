import styles from './entry.module.css'

const EntryGroup = ({
  children
}: {
  children: React.ReactNode | React.ReactNode[]
}) => {
  return <div className={styles.entryGroup}>{children}</div>
}

export default EntryGroup

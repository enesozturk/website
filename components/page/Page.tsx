import Head from '@components/head'
import Header from '@components/header/Header'
import styles from './page.module.css'

type PageProps = {
  header?: boolean
  footer?: boolean
  title?: string | number
  description?: string
  image?: string
  showHeaderTitle?: boolean
  children: React.ReactNode | React.ReactNode[]
}

const Page = ({
  header = true,
  title,
  description,
  image,
  showHeaderTitle = true,
  children
}: PageProps) => {
  return (
    <div className={styles.wrapper}>
      <Head
        title={`${title ? `${title} - ` : ''}Enes Ozturk`}
        description={description}
        image={image}
      />

      {header && <Header title={showHeaderTitle ? title : null} />}
      <main className={styles.main}>{children}</main>
    </div>
  )
}

export default Page

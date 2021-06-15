import Head from 'next/head'

import { Page } from '@components'
import styles from './error.module.css'

type ErrorProps = {
  status?: number
}

const Error = ({ status }: ErrorProps) => {
  return (
    <Page title={status ? status : 'Error'}>
      <Head>
        <title>404 — Enes Ozturk</title>
      </Head>

      {status === 404 ? (
        <>
          <h3>This page cannot be found.</h3>
        </>
      ) : (
        <section className={styles.section}>
          <span>{status || '?'}</span>
          <p>An error occurred.</p>
        </section>
      )}
    </Page>
  )
}

export default Error

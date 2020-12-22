import Head from 'next/head'

import Page from '@components/page'
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
          <h1>This page cannot be found.</h1>

          <p>
            <blockquote cite="http://www.aaronsw.com/weblog/visitingmit">
              <p>
                Just because there's nothing here doesn't mean there's nothing.
                If nothing happened, definitely something happened.
              </p>

              <footer>— Anonym</footer>
            </blockquote>
          </p>
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

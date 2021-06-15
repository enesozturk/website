import Page from '@components/page'
import Link from '@components/link'

const Home = () => {
  return (
    <Page description="Software developer and paragliding pilot">
      <article>
        <h1>Enes Öztürk</h1>

        <p>
          Software developer and paragliding pilot. I'm writing code and sharing
          my experiences. Trying aerobatics in the air. 🤘🏽
        </p>

        <p style={{ textDecoration: '' }}>
          Working with{' '}
          <Link underline href="https://qooper.io" external>
            Qooper
          </Link>{' '}
          to create awesome mentoring apps.
        </p>
      </article>
    </Page>
  )
}

export default Home

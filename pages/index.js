import Page from '@components/page'
import Link from '@components/link'

const Home = () => {
  return (
    <Page description="Hi, I'm Enes. Full stack developer and paragliding enthusiast.">
      <article>
        <h1>Enes Öztürk</h1>

        <p>
          Software developer and paragliding pilot. I'm writing code and sharing
          my experiences. 👨🏻‍💻 Trying aerobatics in the air 🤘🏽
        </p>

        <p>
          Working with{' '}
          <Link underline href="https://iyzico.com" external>
            İyzico
          </Link>{' '}
          to make fintech better.
        </p>
      </article>
    </Page>
  )
}

export default Home

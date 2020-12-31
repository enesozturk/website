import Page from '@components/page'
import Link from '@components/link'

const Home = () => {
  return (
    <Page description="Hi, I'm Enes. Full stack developer and paragliding enthusiast.">
      <article>
        <h1>Enes Öztürk</h1>

        <p>
          Software developer and paragliding pilot. I'm writing code and sharing
          my experiences. Trying aerobatics in the air. 🤘🏽
        </p>

        <p style={{ textDecoration: '' }}>
          Working with{' '}
          <Link underline href="https://casemice.com" external>
            Casemice
          </Link>{' '}
          to create awesome educational apps for physicians and pharma
          companies. [Will be updated soon 👀 ]
        </p>
      </article>
    </Page>
  )
}

export default Home

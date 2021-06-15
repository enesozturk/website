import { Page } from '@components'

const Contact = () => {
  return (
    <Page title="Contact" footer={false} description="Get in touch.">
      <article>
        <p>Get in touch.</p>

        <blockquote>
          <a
            href="mailto:enesozturk.d@gmail.com?subject=Hello"
            className="reset"
          >
            enesozturk.d@gmail.com
          </a>
        </blockquote>
      </article>
    </Page>
  )
}

export default Contact

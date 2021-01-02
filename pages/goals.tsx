import Page from '@components/page'
import getMarkdown from '@lib/get-markdown'
import Link from '@components/link' // eslint-disable-line

const Goals = ({ html }) => {
  return (
    <Page title="Goals in 2021" description="Goal to do in 2021">
      <article dangerouslySetInnerHTML={{ __html: html }} />
    </Page>
  )
}

export const getStaticProps = async () => {
  const md = await getMarkdown('data/goals.md')

  return {
    props: {
      html: md
    }
  }
}

export default Goals

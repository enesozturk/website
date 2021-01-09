import Page from '@components/page'
import getMarkdown from '@lib/get-markdown'

type GoalsProps = {
  html: string
}

const Goals = ({ html }: GoalsProps) => {
  return (
    <Page
      title="Goals in 2021"
      description="Goals that I want to achieve in 2021"
      image="https://ozturkenes.s3.eu-central-1.amazonaws.com/og-21.png"
    >
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

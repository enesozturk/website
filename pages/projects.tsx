import { Github } from '@components/icons'
import Page from '@components/page'
import { getTable } from 'utils/airtable'
import { Entry, EntryGroupText } from '../components/entry'

type ProjectsProps = {
  data: any
}

const Projects = (props: ProjectsProps) => {
  const { opensource, casemice } = props

  return (
    <Page
      title="Projects"
      description="Collection of my past and present work."
    >
      <article>
        <EntryGroupText title="Open Source" />
        {opensource &&
          opensource.map((item, index) => {
            return (
              <Entry
                key={index}
                target="blank"
                title={item.title}
                description={item.description}
                href={item.link}
                icon={<Github />}
              />
            )
          })}
        {/* <SeeOthers
          title="See Others on Github"
          href="https://www.github.com/enesozturk"
        /> */}

        <EntryGroupText title="with Casemice" />
        {casemice &&
          casemice.map((item, index) => {
            return (
              <Entry
                key={index}
                target="blank"
                title={item.title}
                description={item.description}
                href={item.link}
              />
            )
          })}
      </article>
    </Page>
  )
}

export async function getStaticProps() {
  const data = await getTable('Projects')

  const opensource = data.filter(p => p.organization == 'opensource')
  const casemice = data.filter(p => p.organization == 'casemice')

  return {
    props: {
      opensource,
      casemice
    },
    revalidate: 100
  }
}

export default Projects

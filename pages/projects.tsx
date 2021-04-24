import { Github } from '@components/icons'
import Page from '@components/page'
import { getTable } from 'utils/airtable'
import { Entry, EntryGroupText } from '../components/entry'

type ProjectDataItem = {
  title: string
  description: string
  link: string
  organization: 'opensource' | 'casemice'
}

type ProjectsProps = {
  opensource: ProjectDataItem[]
  casemice: ProjectDataItem[]
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

  const opensource = data.filter(
    (p: ProjectDataItem) => p.organization == 'opensource'
  )
  const casemice = data.filter(
    (p: ProjectDataItem) => p.organization == 'casemice'
  )

  return {
    props: {
      opensource,
      casemice
    },
    revalidate: 10800
  }
}

export default Projects

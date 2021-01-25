import { Github } from '@components/icons'
import Page from '@components/page'
import { Entry, EntryGroupText } from '../components/entry'

import data from '../data/projects.json'

const Projects = () => {
  return (
    <Page
      title="Projects"
      description="Collection of my past and present work."
    >
      <article>
        <EntryGroupText title="Open Source" />
        {data.opensource.map((item, index) => {
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
        {data.casemice.map((item, index) => {
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

export default Projects

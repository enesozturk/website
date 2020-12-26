import { Github } from '@components/icons'
import Page from '@components/page'
import { Entry, EntryGroup, EntryGroupText } from '../components/entry'

const Projects = () => {
  return (
    <Page title="Projects" description="Collection of past and present work.">
      <article>
        <EntryGroupText title="Open Source" emphasized />
        <EntryGroupText title="I love open source." />
        <Entry
          title="React Native Swipeable Panel"
          description="Zero dependency swipeable bottom panel for React Native"
          href="https://github.com/enesozturk/rn-swipeable-panel"
          icon={<Github />}
        />
        <Entry
          title="The AirG Paragliding Website"
          description="New website of The AirG Paragliders with Next JS & Material UI"
          href="https://airg.netlify.app/product"
          icon={<Github />}
        />
        <EntryGroupText title="with Casemice" emphasized />
        <EntryGroupText title="I developed single page and mobile apps with React & React Native mostly" />
        <Entry
          title="Keapad"
          description="Interactive presentation tool for pharma"
          href="https://casemice.com/newave_portfolio/casestory/"
        />
        <Entry
          title="Casequest"
          description="Casequest is a case discussion and presentation application for Pharma companies to communicate with doctors"
          href="https://casemice.com/newave_portfolio/casestory/"
        />
        <Entry
          title="Graphy Online"
          description="Visual training tool for pharma"
          href="https://casemice.com/newave_portfolio/casestory/"
        />
        <Entry
          title="Casemobile"
          description="Case based doctor training and communication tool"
          href="https://casemice.com/newave_portfolio/casestory/"
        />
        <Entry
          title="Compass"
          description="Self-detailing tool that transforms guideline recommendation into a decision tree for better patient management"
          href="https://casemice.com/newave_portfolio/casestory/"
        />
        <Entry
          title="Docmaze"
          description="Case based doctor training and communication tool"
          href="https://casemice.com/newave_portfolio/casestory/"
        />
      </article>
    </Page>
  )
}

export default Projects

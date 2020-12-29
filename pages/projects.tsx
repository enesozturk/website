import { Github } from '@components/icons'
import Page from '@components/page'
import { Entry, EntryGroupText } from '../components/entry'

const Projects = () => {
  return (
    <Page title="Projects" description="Collection of past and present work.">
      <article>
        <EntryGroupText title="Open Source" emphasized />
        <Entry
          title="React Native Swipeable Panel"
          description="Zero dependency swipeable bottom panel for React Native"
          href="https://github.com/enesozturk/rn-swipeable-panel"
          icon={<Github />}
        />
        <Entry
          title="React Native Hold Menu [Soon]"
          description="Hold to open context menu for React Native powered by Reanimated 2"
          href=""
          icon={<Github />}
        />
        <EntryGroupText title="with Casemice" emphasized />
        <Entry
          title="Keapad"
          description="Interactive presentation tool for pharma"
          href="https://casemice.com/newave_portfolio/keapad/"
        />
        <Entry
          title="Casequest"
          description="Casequest is a case discussion and presentation application for Pharma companies to communicate with doctors"
          href="https://casemice.com/newave_portfolio/casestory/"
        />
        <Entry
          title="Graphy Online"
          description="Visual training tool for pharma"
          href="https://casemice.com/newave_portfolio/graphyonline/"
        />
        <Entry
          title="Casemobile"
          description="Case based doctor training and communication tool"
          href="https://casemice.com/newave_portfolio/casemobile/"
        />
        <Entry
          title="Compass"
          description="Self-detailing tool that transforms guideline recommendation into a decision tree for better patient management"
          href="https://casemice.com/newave_portfolio/compass/"
        />
        <Entry
          title="Docmaze"
          description="Case based doctor training and communication tool"
          href="https://casemice.com/newave_portfolio/docmaze/"
        />
      </article>
    </Page>
  )
}

export default Projects

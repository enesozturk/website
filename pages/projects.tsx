import { Github } from '@components/icons'
import Page from '@components/page'
import { Entry, EntryGroupText } from '../components/entry'

const Projects = () => {
  return (
    <Page
      title="Projects"
      description="Collection of my past and present work."
    >
      <article>
        <EntryGroupText title="Open Source" />
        <Entry
          target="blank"
          title="React Native Swipeable Panel"
          description="Zero dependency swipeable bottom panel for React Native"
          href="https://github.com/enesozturk/rn-swipeable-panel"
          icon={<Github />}
        />
        <Entry
          target="blank"
          title="React Native Hold Menu [Soon]"
          description="Hold to open context menu for React Native powered by Reanimated 2"
          href=""
          icon={<Github />}
        />
        <Entry
          target="blank"
          title="hyper-rename-tab"
          description="Hyper plugin to rename your tabs"
          href="https://github.com/enesozturk/hyper-rename-tab"
          icon={<Github />}
        />
        <Entry
          target="blank"
          title="deploy-next-to-x"
          description="Guides to deploy your Next JS apps 🚀"
          href="https://github.com/enesozturk/deploy-next-to-x"
          icon={<Github />}
        />
        <Entry
          target="blank"
          title="Chatectron"
          description="Web socket implementation with Socket.io & Electron & React JS 💬 🖥"
          href="https://github.com/enesozturk/chatectron"
          icon={<Github />}
        />
        <EntryGroupText title="with Casemice" />
        <Entry
          target="blank"
          title="Keapad"
          description="Interactive presentation tool for pharma"
          href="https://casemice.com/newave_portfolio/keapad/"
        />
        <Entry
          target="blank"
          title="Casequest"
          description="Casequest is a case discussion and presentation application for Pharma companies to communicate with doctors"
          href="https://casemice.com/newave_portfolio/casestory/"
        />
        <Entry
          target="blank"
          title="Graphy Online"
          description="Visual training tool for pharma"
          href="https://casemice.com/newave_portfolio/graphyonline/"
        />
        <Entry
          target="blank"
          title="Casemobile"
          description="Case based doctor training and communication tool"
          href="https://casemice.com/newave_portfolio/casemobile/"
        />
        <Entry
          target="blank"
          title="Compass"
          description="Self-detailing tool that transforms guideline recommendation into a decision tree for better patient management"
          href="https://casemice.com/newave_portfolio/compass/"
        />
        <Entry
          target="blank"
          title="Docmaze"
          description="Case based doctor training and communication tool"
          href="https://casemice.com/newave_portfolio/docmaze/"
        />
      </article>
    </Page>
  )
}

export default Projects

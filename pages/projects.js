import Page from '@components/page'
import Entry from '@components/entry'

const Projects = () => {
  return (
    <Page title="Projects" description="Collection of past and present work.">
      <article>
        <Entry
          title="React Native Swipeable Panel"
          description="Zero dependency swipeable bottom panel for React Native"
          image="https://repository-images.githubusercontent.com/189957962/67d05c00-9d0f-11ea-9e26-952fe31db247"
          href="https://github.com/enesozturk/rn-swipeable-panel"
        />
        <Entry
          title="The AirG Paragliding Website"
          image="https://airg.netlify.app/product1.jpg"
          description="New website of The AirG Paragliders with Next JS & Material UI"
          href="https://airg.netlify.app/product"
        />
        <p>with Casemice</p>
        <Entry
          title="Casequest"
          description="Casequest is a case discussion and presentation application for Pharma companies to communicate with doctors"
          href="https://casemice.com/newave_portfolio/casestory/"
        />
        <Entry
          title="Graphy Online"
          description="Casequest is a case discussion and presentation application for Pharma companies to communicate with doctors"
          href="https://casemice.com/newave_portfolio/casestory/"
        />
        <Entry
          title="Casemobile"
          description="Casequest is a case discussion and presentation application for Pharma companies to communicate with doctors"
          href="https://casemice.com/newave_portfolio/casestory/"
        />
        <Entry
          title="Compass"
          description="Casequest is a case discussion and presentation application for Pharma companies to communicate with doctors"
          href="https://casemice.com/newave_portfolio/casestory/"
        />
      </article>
    </Page>
  )
}

export default Projects

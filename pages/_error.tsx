import React from 'react'
import { NextPageContext } from 'next'

import { Error } from '@components'
interface EProps {
  status: number
}

class E extends React.Component<EProps> {
  static getInitialProps(ctx: NextPageContext) {
    const status = ctx.res
      ? ctx.res.statusCode
      : ctx.err
      ? ctx.err.statusCode
      : null
    return { status }
  }

  render() {
    const { status } = this.props
    return <Error status={status} />
  }
}

export default E

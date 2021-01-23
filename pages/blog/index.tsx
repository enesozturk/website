import React from 'react'

import Page from '@components/page'
import { Entry, SeeOthers } from '../../components/entry'
import getPosts from '@lib/get-posts'

type BlogProps = {
  posts: any
}

const paginate = true;

const Blog = ({ posts }: BlogProps) => {
  const [showMore, setShowMore] = React.useState(10)

  return (
    <Page title="Blog" description="Writing about my experiences">
      <article>
        {posts.slice(0, paginate ? showMore : undefined).map((post: any) => {
          // const year = new Date().getFullYear()
          // const postYear = new Date(post.date).getFullYear()
          // const date = new Date(post.date).toLocaleDateString('default', {
          //   month: 'numeric',
          //   day: 'numeric'
          // })

          return (
            <Entry
              href={`/blog/${post.slug}`}
              key={`post-item-${post.slug}`}
              title={post.title}
              description={post.description}
            />
          )
        })}
        {paginate && showMore < posts.length && (
          <>
            <SeeOthers
              title="Show More"
              onClick={() => {
                setShowMore(showMore + 5)
              }}
            />
          </>
        )}
      </article>
    </Page>
  )
}

export const getStaticProps = () => {
  const posts = getPosts()

  return {
    props: {
      posts
    }
  }
}

export default Blog

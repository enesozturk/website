import React from 'react'

import Page from '@components/page'
import PostsList from '@components/posts-list/PostList'
import getPosts from '@lib/get-posts'

type BlogProps = {
  posts: any
}

const Blog = ({ posts }: BlogProps) => {
  return (
    <Page title="Blog" description="Writing about my experiences">
      <article>
        <ul>
          <PostsList paginate posts={posts} />
        </ul>
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

import { NextPageContext } from 'next'

import { Post } from '@components'
import getPosts from '@lib/get-posts'
import renderMarkdown from '@lib/render-markdown'

const PostPage = (props: any) => {
  return <Post {...props} />
}

type PostProps = {
  body: string
} | null

interface Context extends NextPageContext {
  params: {
    slug: string
  }
}

export const getStaticProps = (ctx: Context) => {
  const slug = ctx.params.slug
  const posts: PostProps[] = getPosts()
  const postIndex = posts.findIndex((p: any) => p.slug === slug)
  const post = posts[postIndex]
  const { ...rest } = post

  return {
    props: {
      previous: posts[postIndex + 1] || null,
      next: posts[postIndex - 1] || null,
      ...rest,
      html: renderMarkdown(post ? post.body : null)
    }
  }
}

export const getStaticPaths = () => {
  return {
    paths: getPosts().map((p: any) => `/blog/${p.slug}`),
    fallback: false
  }
}

export default PostPage

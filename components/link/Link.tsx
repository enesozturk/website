import { memo } from 'react'
import NextLink from 'next/link'
import cn from 'classnames'
import { UrlObject } from 'url'

import styles from './link.module.css'

const canPrefetch = (href: string) => {
  if (!href || !href.startsWith('/')) {
    return false
  }

  return true
}

type Url = string | UrlObject

type LinkProps = {
  href: Url
  external?: boolean
  as?: string
  passHref?: boolean
  children: React.ReactNode | React.ReactNode[]
  className?: string
  props?: HTMLElement
  underline?: boolean
  gray?: boolean
}

const Link = ({
  external,
  href,
  as,
  passHref,
  children,
  className,

  // Styling
  underline,
  gray,
  ...props
}: LinkProps) => {
  const c = cn(className, styles.reset, {
    [styles.gray]: gray,
    [styles.underline]: underline
  })

  if (external && typeof href == 'string') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={c}
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <>
      <NextLink
        href={href}
        as={as}
        prefetch={
          typeof href == 'string'
            ? canPrefetch(href)
              ? undefined
              : false
            : false
        }
        passHref={passHref}
      >
        {passHref ? (
          children
        ) : (
          <a className={c} {...props}>
            {children}
          </a>
        )}
      </NextLink>
    </>
  )
}

Link.displayName = 'Link'
export default memo(Link)

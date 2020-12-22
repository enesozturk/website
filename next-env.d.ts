/// <reference types="next" />
/// <reference types="next/types/global" />

declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

import { forwardRef, MouseEventHandler } from 'react'

import styles from './button.module.css'

type ButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement> | undefined
  children: React.ReactNode
  disabled: boolean
}

const Button = forwardRef(
  ({ onClick, children, disabled }: ButtonProps, ref: any) => {
    return (
      <button
        onClick={onClick}
        className={styles.button}
        disabled={disabled}
        ref={ref}
      >
        {children}
      </button>
    )
  }
)

export default Button

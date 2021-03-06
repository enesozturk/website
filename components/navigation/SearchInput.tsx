import React, { memo } from 'react'

import styles from './navigation.module.css'

type SearchInputProps = {
  value: string
  setSearch: (arg: string) => void
  wrapperClassName: string
}

const SearchInput = ({
  wrapperClassName,
  value,
  setSearch
}: SearchInputProps) => {
  return (
    <div className={wrapperClassName}>
      <div className={styles.searchInputWrapper}>
        <input
          className="searchInput"
          placeholder="Type a route to go..."
          type="text"
          aria-expanded="true"
          aria-autocomplete="list"
          aria-haspopup="listbox"
          autoComplete="off"
          role="combobox"
          aria-owns="57"
          id="58"
          data-command-input=""
          value={value}
          onChange={(e: any) => {
            setSearch(e.target.value)
          }}
        />
      </div>
    </div>
  )
}

export default memo(SearchInput)

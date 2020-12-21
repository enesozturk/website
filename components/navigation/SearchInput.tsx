import React from 'react'

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
      <input
        placeholder="Type a command or search..."
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
  )
}

export default SearchInput

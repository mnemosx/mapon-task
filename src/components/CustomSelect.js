import React from 'react'
import Select, { components } from 'react-select'
import { ReactComponent as Down } from '../assets/icons/down.svg'

const customStyles = {
  option: provided => ({
    ...provided,
    padding: '10px 20px',
    textAlign: 'left',
    fontSize: 14
  }),
  menu: provided => ({
    ...provided,
    zIndex: 3
  }),
  control: provided => ({
    ...provided,
    fontSize: 14,
    textAlign: 'left',
    padding: 0,
    border: '1px solid #DCDEE0',
    cursor: 'pointer',
    minHeight: 'unset',
    height: '32px',
    alignContent: 'center',
    boxShadow: 'none'
  }),
  singleValue: provided => ({
    ...provided,
    lineHeight: '35px',
    height: '32px'
  }),
  placeholder: provided => ({
    ...provided,
    color: '#384045',
    marginTop: '3px'
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    transition: 'all .2s ease',
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null
  })
}

const DropdownIndicator = props => {
  return (
    <components.DropdownIndicator {...props}>
      <Down />
    </components.DropdownIndicator>
  )
}

export default function CustomSelect({
  defaultValue,
  options,
  placeholder,
  onChange,
  isLoading // TODO: add loading indicator
}) {
  return (
    <Select
      styles={customStyles}
      defaultValue={defaultValue}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      isSearchable={false}
      components={{
        IndicatorSeparator: () => null,
        DropdownIndicator
      }}
      theme={theme => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: '#98ca02'
        }
      })}
    />
  )
}

import React, { forwardRef, useState } from 'react'

const CustomDateInput = forwardRef(
  ({ autoFocusToday = false, value, onClick, onChangeRaw }, ref) => {
    const [localValue, setLocalValue] = useState(null)
    const handleKeyDown = event => {
      if (event.key === 'Enter') {
        onChangeRaw(localValue)
      }
    }
    return (
      <div className="custom-input-wrapper">
        <input
          ref={ref}
          onClick={onClick}
          value={localValue || value}
          autoFocus={autoFocusToday}
          type="text"
          onChange={e => setLocalValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => localValue && onChangeRaw(localValue)}
        />
      </div>
    )
  }
)

export default CustomDateInput

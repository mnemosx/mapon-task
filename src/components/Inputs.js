import React, { forwardRef, useRef, useState } from 'react'
import styles from './Inputs.module.scss'
import DatePicker from 'react-datepicker'
import { parseISO, subDays, parse, isToday } from 'date-fns'
import { formatDateToISO, isDateBeforeOtherDate } from '../utils'
import { useDispatch, useSelector } from 'react-redux'
import {
  vehicleChanged,
  dateFromChanged,
  dateToChanged
} from '../store/reducers/userInputs'
import CustomSelect from './CustomSelect'

export default function Inputs() {
  const [showIsToday, setShowIsToday] = useState(true)
  const [autoFocusToday, setAutoFocusToday] = useState(false)
  const dispatch = useDispatch()

  const {
    list: { data: { units: vehicles } = [] },
    loading
  } = useSelector(state => state.vehicles)

  const { vehicle, dateFrom, dateTo } = useSelector(state => state.userInputs)

  const minDate = useRef(subDays(parseISO(dateTo), 31))

  const vehicleOptions = vehicles?.map(vehicle => ({
    value: vehicle.unit_id,
    label: vehicle.number
  }))

  const setDate = (type, newDate) => {
    if (type === 'from') {
      dispatch(dateFromChanged(formatDateToISO(newDate)))
    }
    if (type === 'to') {
      minDate.current = subDays(newDate, 31)
      if (dateFrom) {
        if (isDateBeforeOtherDate(newDate, dateFrom)) {
          dispatch(dateFromChanged(formatDateToISO(newDate)))
        }
        if (isDateBeforeOtherDate(dateFrom, minDate.current)) {
          dispatch(dateFromChanged(formatDateToISO(minDate.current)))
        }
      }
      dispatch(dateToChanged(formatDateToISO(newDate)))
    }
  }

  const handleChangeRaw = (value, type) => {
    value &&
      setDate(type, parse(value.replace(/[,/]/g, '.'), 'd.MM.yyyy', new Date()))
  }
  const CustomDateInput = forwardRef(({ value, onClick, onChangeRaw }, ref) => {
    const [localValue, setLocalValue] = useState(value)
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
          defaultValue={value}
          autoFocus={autoFocusToday}
          type="text"
          onChange={setLocalValue}
          onKeyDown={handleKeyDown}
          onBlur={() => localValue !== value && onChangeRaw(localValue)}
        />
      </div>
    )
  })

  const onToCalendarOpen = () => {
    setAutoFocusToday(true)
    setShowIsToday(false)
  }
  const onToCalendarClose = () => {
    setAutoFocusToday(false)
    setShowIsToday(isToday(parseISO(dateTo)))
  }

  return (
    <div className={styles.inputs}>
      <div className={styles.inputs__row}>
        <p className={styles.inputs__label}>
          Vehicle <span className={styles.required}>number</span>
        </p>
        <div className={styles.inputs__select}>
          <CustomSelect
            defaultValue={vehicle}
            onChange={option => dispatch(vehicleChanged(option))}
            options={vehicleOptions}
            isLoading={loading}
            placeholder="Select vehicle"
          />
        </div>
      </div>
      <div className={styles.inputs__row}>
        <span className={styles.inputs__label}>Period</span>
        <div className={styles.datePickers}>
          <div className={styles.datePicker}>
            <span className={styles.subtitle}>From</span>
            <DatePicker
              wrapperClassName={styles.dateInput}
              onChange={date => setDate('from', date)}
              selected={dateFrom && parseISO(dateFrom)}
              minDate={minDate.current}
              maxDate={parseISO(dateTo)}
              dateFormat="d.MM.yyyy"
              customInput={
                <CustomDateInput
                  onChangeRaw={event =>
                    handleChangeRaw(event.target.value, 'from')
                  }
                />
              }
            />
          </div>
          <div className={styles.datePicker}>
            <span className={styles.subtitle}>To</span>

            <DatePicker
              wrapperClassName={styles.dateInput}
              selected={dateTo && parseISO(dateTo)}
              onChange={date => setDate('to', date)}
              maxDate={Date.now()}
              dateFormat="d.MM.yyyy"
              onCalendarOpen={onToCalendarOpen}
              onCalendarClose={onToCalendarClose}
              customInput={
                <CustomDateInput
                  onChangeRaw={event =>
                    handleChangeRaw(event.target.value, 'to')
                  }
                />
              }
            />
            {showIsToday && <div className={styles.today}>Today</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

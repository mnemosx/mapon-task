import React, { useRef, useState } from 'react'
import styles from 'styles/Inputs.module.scss'
import DatePicker from 'react-datepicker'
import { parseISO, subDays, parse, isToday } from 'date-fns'
import { formatDateToISO, isDateBeforeOtherDate } from 'utils'
import { useDispatch, useSelector } from 'react-redux'
import { dateFromChanged, dateToChanged } from 'store/reducers/userInputs'
import CustomDateInput from './CustomDateInput'

export default function DateInputs() {
  const [showIsToday, setShowIsToday] = useState(true)
  const [autoFocusToday, setAutoFocusToday] = useState(false)
  const dispatch = useDispatch()

  const { dateFrom, dateTo } = useSelector(state => state.userInputs)

  const minDate = useRef(subDays(parseISO(dateTo), 31))

  const setDate = (type, newDate) => {
    console.log(type, newDate)
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

  const onToCalendarOpen = () => {
    setAutoFocusToday(true)
    setShowIsToday(false)
  }
  const onToCalendarClose = () => {
    setAutoFocusToday(false)
    setShowIsToday(isToday(parseISO(dateTo)))
  }

  return (
    <div className={styles.dateInputs}>
      <div className={styles.datePicker}>
        <span className={styles.subtitle}>From</span>
        <DatePicker
          wrapperClassName={styles.dateInput}
          selected={dateFrom && parseISO(dateFrom)}
          onChange={date => setDate('from', date)}
          minDate={minDate.current}
          maxDate={parseISO(dateTo)}
          dateFormat="d.MM.yyyy"
          customInput={
            <CustomDateInput
              onChangeRaw={val => handleChangeRaw(val, 'from')}
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
              autoFocusToday={autoFocusToday}
              onChangeRaw={val => handleChangeRaw(val, 'to')}
            />
          }
        />
        {showIsToday && <div className={styles.today}>Today</div>}
      </div>
    </div>
  )
}

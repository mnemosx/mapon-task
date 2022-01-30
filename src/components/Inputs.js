import React, { useRef } from 'react'
import styles from './Inputs.module.scss'
import DatePicker from 'react-datepicker'
import { parseISO, subDays } from 'date-fns'
import { formatDateToISO, isDateBeforeOtherDate } from '../utils'
import { useDispatch, useSelector } from 'react-redux'
import {
  vehicleChanged,
  dateFromChanged,
  dateToChanged
} from '../store/reducers/userInputs'
import CustomSelect from './CustomSelect'

export default function Inputs() {
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

  return (
    <div className={styles.inputs}>
      <div className={styles.inputs__row}>
        <p
          className={`${styles.inputs__label} ${styles['inputs__label--left']}`}
        >
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
        <span
          className={`${styles.inputs__label} ${styles['inputs__label--left']}`}
        >
          Period
        </span>
        <div className={styles['date-input-container']}>
          <label
            htmlFor="date-from"
            className={`${styles.inputs__label} ${styles['inputs__label--top']}`}
          >
            From
            <DatePicker
              wrapperClassName="datePicker"
              onChange={date => setDate('from', date)}
              selected={dateFrom && parseISO(dateFrom)}
              minDate={minDate.current}
              maxDate={parseISO(dateTo)}
            />
          </label>
          <label
            htmlFor="date-to"
            className={`${styles.inputs__label} ${styles['inputs__label--top']}`}
          >
            To
            <DatePicker
              className={styles['datepicker-to']}
              selected={dateTo && parseISO(dateTo)}
              onChange={date => setDate('to', date)}
              maxDate={Date.now()}
            />
          </label>
        </div>
      </div>
    </div>
  )
}

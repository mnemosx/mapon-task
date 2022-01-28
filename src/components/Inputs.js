import React from 'react'
import styles from './Inputs.module.scss'
import DatePicker from 'react-datepicker'
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

  const { vehicleNumber, dateFrom, dateTo } = useSelector(
    state => state.userInputs
  )
  const vehicleOptions = vehicles?.map(vehicle => ({
    value: vehicle.number,
    label: vehicle.number
  }))

  const setDate = (type, date) => {
    if (type === 'from') {
      dispatch(dateFromChanged(date))
      return
    }
    if (type === 'to') {
      dispatch(dateToChanged(date))
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
            defaultValue={vehicleNumber}
            onChange={option => dispatch(vehicleChanged(option.value))}
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
              selected={dateFrom}
              onChange={date => setDate('from', date)}
            />
          </label>
          <label
            htmlFor="date-to"
            className={`${styles.inputs__label} ${styles['inputs__label--top']}`}
          >
            To
            <DatePicker
              className={styles['datepicker-to']}
              selected={dateTo}
              onChange={date => setDate('to', date)}
            />
          </label>
        </div>
      </div>
    </div>
  )
}

import React from 'react'
import styles from './Inputs.module.scss'
import DatePicker from 'react-datepicker'
import { useDispatch, useSelector } from 'react-redux'
import {
  vehicleChanged,
  dateFromChanged,
  dateToChanged
} from '../store/reducers/userInputs'

export default function Inputs() {
  const dispatch = useDispatch()

  const vehicles = useSelector(state => state.vehicles.list?.data?.units)
  const { vehicleNumber, dateFrom, dateTo } = useSelector(
    state => state.userInputs
  )
  const vehicleOptions = vehicles?.map(vehicle => vehicle.number) || []

  const setDate = (type, date) => {
    if (type === 'from') {
      dispatch(dateFromChanged(date))
      return
    }
    if (type === 'to') {
      dispatch(dateToChanged(date))
    }
  }

  // const setVehicle = ({ type, value }) => {}
  return (
    <div className={styles.inputs}>
      <div className={styles.inputs__row}>
        <label
          htmlFor="select-vehicle"
          className={`${styles.inputs__label} ${styles['inputs__label--left']}`}
        >
          <span className={styles.required}>Vehicle number</span>
        </label>
        <select
          type="select"
          id="select-vehicle"
          value={vehicleNumber}
          onChange={e => dispatch(vehicleChanged(e.target.value))}
        >
          <option label="Select vehicle">Select vehicle</option>
          {vehicleOptions.map(vehicle => (
            <option key={vehicle}>{vehicle}</option>
          ))}
        </select>
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

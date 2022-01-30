import React from 'react'
import styles from './Inputs.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { vehicleChanged } from '../../store/reducers/userInputs'
import CustomSelect from './CustomSelect'
import DateInputs from './DateInputs'

export default function Inputs() {
  const dispatch = useDispatch()

  const {
    list: { data: { units: vehicles } = [] },
    loading
  } = useSelector(state => state.vehicles)

  const { vehicle } = useSelector(state => state.userInputs)

  const vehicleOptions = vehicles?.map(vehicle => ({
    value: vehicle.unit_id,
    label: vehicle.number
  }))

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
        <DateInputs />
      </div>
    </div>
  )
}

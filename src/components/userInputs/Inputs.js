import React from 'react'
import styles from 'styles/Inputs.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { vehicleChanged } from 'store/reducers/userInputs'
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
    <div className={styles.container}>
      <div className={styles.row}>
        <p className={styles.label}>
          Vehicle <span className="required">number</span>
        </p>
        <div className={styles.selectContainer}>
          <CustomSelect
            defaultValue={vehicle}
            onChange={option => dispatch(vehicleChanged(option))}
            options={vehicleOptions}
            isLoading={loading}
            placeholder="Select vehicle"
          />
        </div>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Period</span>
        <DateInputs />
      </div>
    </div>
  )
}

import React from 'react'
import { useSelector } from 'react-redux'
import styles from 'styles/Stats.module.scss'

export default function Stats() {
  const {
    routeStats: { distance, time }
  } = useSelector(state => state.route)
  return (
    <div className={styles.stats}>
      <div className={styles.box}>
        <span className={styles.data}>{distance}</span>
        <span className={styles.subtext}>Km driven</span>
      </div>
      <div className={styles.box}>
        <span className={styles.data}>
          {time.hours}h {time.minutes}m
        </span>
        <span className={styles.subtext}>Driving time</span>
      </div>
    </div>
  )
}

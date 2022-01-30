import React from 'react'
import { useSelector } from 'react-redux'
import styles from './Stats.module.scss'

export default function Stats() {
  const {
    routeStats: { distance, time }
  } = useSelector(state => state.route)
  return (
    <div className={styles.stats}>
      <div className={styles.stats__box}>
        <span className={styles.stats__data}>{distance}</span>
        <span className={styles.stats__subtext}>Km driven</span>
      </div>
      <div className={styles.stats__box}>
        <span className={styles.stats__data}>
          {time.hours}h {time.minutes}m
        </span>
        <span className={styles.stats__subtext}>Driving time</span>
      </div>
    </div>
  )
}

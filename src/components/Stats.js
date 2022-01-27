import React from 'react'
import styles from './Stats.module.scss'

export default function Stats() {
  return (
    <div className={styles.stats}>
      <div>Km driven</div>
      <div>Driving time</div>
    </div>
  )
}

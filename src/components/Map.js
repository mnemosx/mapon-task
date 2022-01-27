import React from 'react'
import styles from './Map.module.scss'
import GoogleMapReact from 'google-map-react'

export default function Map() {
  return (
    <div className={styles.map}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_KEY }}
        defaultCenter={{
          lat: 59.95,
          lng: 30.33
        }}
        defaultZoom={11}
      >
        <span>hello</span>
      </GoogleMapReact>
    </div>
  )
}

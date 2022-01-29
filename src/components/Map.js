import React, { useEffect, useRef, useState } from 'react'
import styles from './Map.module.scss'
import GoogleMapReact from 'google-map-react'
import { useSelector } from 'react-redux'
import { ReactComponent as Marker } from '../assets/icons/marker.svg'

export default function Map() {
  const [mapData, setMapData] = useState(null)
  const { routeMarkers: markers } = useSelector(state => state.route)

  const didMountRef = useRef(false)
  const polyline = useRef(null)

  useEffect(() => {
    if (didMountRef.current) {
      renderMap(mapData.map, mapData.maps)
    }
    didMountRef.current = true

    return () => {
      for (let i of markers) {
        polyline.current.getPath().removeAt(i)
      }
    }
  }, [markers])

  const onMapLoad = map => {
    renderMap(map.map, map.maps)
    setMapData(map)
  }

  const renderMap = (map, maps) => {
    polyline.current = new maps.Polyline({
      path: markers,
      strokeColor: '#39B0FA',
      strokeOpacity: 1.0,
      strokeWeight: 4
    })

    polyline.current.setMap(map)

    const bounds = new maps.LatLngBounds()
    for (let i = 0; i < markers.length; i++) {
      bounds.extend(new maps.LatLng(markers[i].lat, markers[i].lng))
    }
    map.setCenter(bounds.getCenter())
    map.fitBounds(bounds)
  }

  return (
    <div className={styles.map}>
      <GoogleMapReact
        onGoogleApiLoaded={({ map, maps }) => onMapLoad({ map, maps })}
        yesIWantToUseGoogleMapApiInternals
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_KEY }}
        defaultCenter={{
          lat: 56.94967,
          lng: 24.10535
        }}
        defaultZoom={8}
      >
        <Marker
          className={styles.map__marker}
          lat={markers[0].lat}
          lng={markers[0].lng}
        />
        <Marker
          className={styles.map__marker}
          lat={markers[markers.length - 1].lat}
          lng={markers[markers.length - 1].lng}
        />
      </GoogleMapReact>
    </div>
  )
}

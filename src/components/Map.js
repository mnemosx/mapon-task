import React, { useEffect, useRef, useState } from 'react'
import styles from 'styles/Map.module.scss'
import GoogleMapReact from 'google-map-react'
import { useSelector } from 'react-redux'
import { ReactComponent as Marker } from 'assets/icons/marker.svg'
import variables from 'styles/_exports.scss'

export default function Map() {
  const [mapData, setMapData] = useState(null)
  const { routeMarkers: markers } = useSelector(state => state.route)

  const didMountRef = useRef(false)
  const polylines = useRef([])

  useEffect(() => {
    if (didMountRef.current) {
      renderMap(mapData.map, mapData.maps)
    }
    didMountRef.current = true

    return () => {
      polylines.current.forEach((line, i) => {
        line.setMap(null)
      })
      polylines.current = []
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markers])

  const onMapLoad = map => {
    renderMap(map.map, map.maps)
    setMapData(map)
  }

  const renderMap = (map, maps) => {
    markers.forEach(marker => {
      const line = new maps.Polyline({
        path: maps.geometry.encoding.decodePath(marker.polyline),
        strokeColor: variables.route,
        strokeOpacity: 1.0,
        strokeWeight: 4
      })
      line.setMap(map)
      polylines.current.push(line)
    })

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
        bootstrapURLKeys={{
          key: process.env.REACT_APP_MAP_KEY,
          libraries: ['geometry']
        }}
        defaultCenter={{
          lat: 56.94967,
          lng: 24.10535
        }}
        defaultZoom={8}
      >
        <Marker
          className={styles.marker}
          lat={markers[0].lat}
          lng={markers[0].lng}
        />
        <Marker
          className={styles.marker}
          lat={markers[markers.length - 1].lat}
          lng={markers[markers.length - 1].lng}
        />
      </GoogleMapReact>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import logo from './assets/Mapon_logo.svg'
import Card from './components/Card'
import Inputs from './components/Inputs'
import 'react-datepicker/dist/react-datepicker.css'
import './App.scss'
import { useDispatch } from 'react-redux'
import { loadVehicles } from './store/reducers/vehicles'
import { useSelector } from 'react-redux'
import Map from './components/Map'
import Stats from './components/Stats'
import { loadRouteData } from './store/reducers/route'

function App() {
  const [showMap, setShowMap] = useState(false)

  const {
    vehicle: { value: vehicleId },
    dateFrom,
    dateTo
  } = useSelector(state => state.userInputs)

  const { routeMarkers } = useSelector(state => state.route)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadVehicles())
  }, [dispatch])

  const generate = () => {
    dispatch(
      loadRouteData({
        unit_id: vehicleId,
        from: dateFrom,
        till: dateTo
      })
    )

    setShowMap(true)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="Company logo" width="160" height="51" />
      </header>
      <main className="App-main">
        <Card
          title="Route report"
          hasFooter={true}
          btnText="Generate"
          disabled={!vehicleId || !dateFrom}
          onBtnClick={generate}
        >
          <Inputs />
          {routeMarkers?.length ? (
            <>
              <Map />
              <Stats />
            </>
          ) : (
            showMap && (
              <div className="no-map-msg">
                <p>No routes found</p>
              </div>
            )
          )}
        </Card>
      </main>
    </div>
  )
}

export default App

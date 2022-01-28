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
import { loadRoutes } from './store/reducers/routes'

function App() {
  const [showMap, setShowMap] = useState(false)
  const {
    vehicle: { value: vehicleId },
    dateFrom,
    dateTo
  } = useSelector(state => state.userInputs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadVehicles())
  }, [dispatch])

  const formatDate = date => date.toISOString().replace(/[.,][0-9]{3}/, '')

  const generate = () => {
    dispatch(
      loadRoutes({
        unit_id: vehicleId,
        from: formatDate(dateFrom),
        till: formatDate(dateTo)
      })
    )
    !showMap && setShowMap(true)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="Company logo" />
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
          {showMap && (
            <>
              <Map />
              <Stats />
            </>
          )}
        </Card>
      </main>
    </div>
  )
}

export default App

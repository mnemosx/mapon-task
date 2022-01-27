import React, { useEffect, useState } from 'react'
import logo from './assets/Mapon_logo.svg'
import Card from './components/Card'
import Inputs from './components/Inputs'
import 'react-datepicker/dist/react-datepicker.css'
import './App.scss'
import GoogleMapReact from 'google-map-react'
import { useDispatch } from 'react-redux'
import { loadVehicles } from './store/reducers/vehicles'
import { useSelector } from 'react-redux'

function App() {
  const [showMap, setShowMap] = useState(false)
  const { vehicleNumber } = useSelector(state => state.userInputs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadVehicles())
  }, [dispatch])

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
          disabled={
            showMap || !vehicleNumber || !vehicleNumber === 'Select vehicle'
          }
          onBtnClick={setShowMap}
        >
          <Inputs />
        </Card>
        {showMap && (
          <Card hasFooter={false}>
            <div style={{ height: '400px', width: '100%' }}>
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
          </Card>
        )}
      </main>
    </div>
  )
}

export default App

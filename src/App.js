import React, { useState } from 'react'
import Search from './components/Search/Search'
import Header from './components/Header/Header'
import { NotificationContainer } from 'react-notifications'
import AlphaPlot from './components/AlphaPlot'
import SmaForm from './components/SmaForm'
import 'react-notifications/lib/notifications.css'
import { Container, Card, CardContent } from '@material-ui/core'

const App = () => {
  const [alphaData, setAlphaData] = useState(null)
  const [windowSize, setWindowSize] = useState(50)

  return (
    <>
      <Header/>
      <Container>
        <Card>
          <CardContent>
            <Search setAlphaData={setAlphaData}/>
            {alphaData && <AlphaPlot data={alphaData}/>}
          </CardContent> 
        </Card>
        <Card>
          <CardContent>
            <SmaForm
              windowSize={windowSize}
              setWindowSize={setWindowSize}
              alphaData={alphaData}
            />
          </CardContent> 
        </Card>
      </Container>
      <NotificationContainer/>
    </>
  )
}

export default App;

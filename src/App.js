import React, { useState } from 'react'
import Search from './components/forms/Search/Search'
import Header from './components/Header/Header'
import { NotificationContainer } from 'react-notifications'
import AlphaPlot from './components/plots/AlphaPlot'
import SmaPlot from './components/plots/SmaPlot'
import SmaForm from './components/forms/SmaForm'
import 'react-notifications/lib/notifications.css'
import { Container, Card, CardContent } from '@material-ui/core'

const App = () => {
  const [alphaData, setAlphaData] = useState(null)
  const [smaData, setSmaData] = useState(50)

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
              setSmaData={setSmaData}
              alphaData={alphaData}
            />
            {smaData && <SmaPlot data={alphaData} smaData={smaData}/>}
          </CardContent> 
        </Card>
      </Container>
      <NotificationContainer/>
    </>
  )
}

export default App;

import React, { useState, useRef } from 'react'
import Search from './components/forms/Search/Search'
import Header from './components/Header/Header'
import { NotificationContainer } from 'react-notifications'
import AlphaPlot from './components/plots/AlphaPlot'
import SmaPlot from './components/plots/SmaPlot'
import TrainPlot from './components/plots/TrainPlot'
import SmaForm from './components/forms/SmaForm'
import TrainForm from './components/forms/TrainForm'
import ValidationForm from './components/forms/ValidationForm'
import ValidationPlot from './components/plots/ValidationPlot'
import 'react-notifications/lib/notifications.css'
import { Container, Card, CardContent } from '@material-ui/core'

const App = () => {
  const [alphaData, setAlphaData] = useState(null)
  const [smaData, setSmaData] = useState(null)
  const [trainData, setTrainData] = useState(null)
  const trainDataRef = useRef()
  const [trainingSize, setTrainingSize] = useState(80)
  const [windowSize, setWindowSize] = useState(50)
  const [model, setModel] = useState(null)
  const [validateData, setValidateData] = useState(null)
  trainDataRef.current = trainData

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
              windowSize={windowSize}
              setWindowSize={setWindowSize}
            />
            {smaData && (
              <SmaPlot
                mainData={alphaData}
                smaData={smaData}
              />
            )}
          </CardContent> 
        </Card>
        <Card>
          <CardContent>
            <TrainForm
              trainData={trainDataRef}
              setTrainData={setTrainData}
              trainingSize={trainingSize}
              setTrainingSize={setTrainingSize}
              setModel={setModel}
              smaData={smaData}
            />
            {trainData && <TrainPlot trainData={trainData}/>}
          </CardContent> 
        </Card>
        <Card>
          <CardContent>
            <ValidationForm
              smaData={smaData}
              trainingSize={trainingSize}
              model={model}
              setValidateData={setValidateData}
              windowSize={windowSize}
            />
            {validateData && (
              <ValidationPlot
                mainData={alphaData}
                smaData={smaData}
                validateData={validateData}
              />
            )}
          </CardContent> 
        </Card>
      </Container>
      <NotificationContainer/>
    </>
  )
}

export default App;

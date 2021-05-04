import React from 'react'
import { Form } from 'react-final-form'
import SubmitButton from '../../common/SubmitButton'
import globalCss from '../../globalStyles.module.less'
import { makePredictions } from '../../../helpers/makePrediction'

const ValidationForm = ({ smaData, trainingSize, model, setValidateData, windowSize }) => {
  const onSubmit = () => {
    const inputs = smaData.map(data => data.set.map(data => parseInt(data, 10)))
    
    const val_train_x = inputs.slice(0, Math.floor(trainingSize / 100 * inputs.length))
    const val_train_y = makePredictions(val_train_x, model.model)
    
    const val_unseen_x = inputs.slice(Math.floor(trainingSize / 100 * inputs.length), inputs.length);
    const val_unseen_y = makePredictions(val_unseen_x, model.model)
    
    const timesstamps = smaData.map(data => data.timestamp).reverse()

    const trainTimesstamps = timesstamps.slice(0, Math.floor(timesstamps.length * (trainingSize / 100)))
    const unseenTimesstamps = timesstamps.slice(Math.floor(timesstamps.length * (trainingSize / 100)), timesstamps.length)
    
    setValidateData({
      trainData: val_train_y,
      unseenData: val_unseen_y,
      trainTimesstamps,
      unseenTimesstamps
    })
  }

  return (
    <Form
      onSubmit={onSubmit}
      render={({handleSubmit}) => (
        <form onSubmit={handleSubmit} className={globalCss.formContainer}>  
          <SubmitButton
            label='Validate model'
            disabled={!smaData}
          />
        </form>
      )}
    />
  )
}

export default ValidationForm

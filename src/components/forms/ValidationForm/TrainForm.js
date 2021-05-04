import React from 'react'
import { Form } from 'react-final-form'
import { TextField } from 'mui-rff'
import SubmitButton from '../../common/SubmitButton'
import globalCss from '../../globalStyles.module.less'
import { trainModel } from '../../../helpers/trainModel'

const TrainForm = ({ trainData, setTrainData, smaData }) => {
  const callback = (epoch, log) => {
    const x = trainData.current?.x || []
    const y = trainData.current?.y || []
  
    setTrainData({
      x: [...x, epoch],
      y: [...y, log.loss]
    })
  }
  const onSubmit = ({ trainingSize, epochs, learningRate, hiddenLayers }) => {
    let inputs = smaData.map(data => data.set.map(data => parseInt(data, 10)))
    inputs = inputs.slice(0, Math.floor(trainingSize / 100 * inputs.length))

    let outputs = smaData?.map(data => data.avg) || []
    outputs = outputs.slice(0, Math.floor(trainingSize / 100 * outputs.length))

    const windowSize = smaData[0].set.length

    trainModel(inputs, outputs, windowSize, epochs, learningRate, hiddenLayers, callback)
  }

  const validate = (values) => {
    const errors = {}

    if (!values.trainingSize) {
      errors.trainingSize = 'Field "Training dataset size" is required.'
    }
    if (!values.epochs) {
      errors.epochs = 'Field "Epochs" is required.'
    }
    if (!values.learningRate) {
      errors.learningRate = 'Field "Learning rate" is required.'
    }
    if (!values.hiddenLayers) {
      errors.hiddenLayers = 'Field "Hidden LSTM layers" is required.'
    }

    return errors
  }

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={{
        trainingSize: 80,
        epochs: 20,
        learningRate: 0.01,
        hiddenLayers: 4
      }}
      render={({
        handleSubmit, hasValidationErrors
      }) => (
        <form onSubmit={handleSubmit} className={globalCss.formContainer}>  
          <TextField
            name='trainingSize'
            label='Training dataset size (%)'
            variant='outlined'
            type='number'
          />
          <TextField
            name='epochs'
            label='Epochs'
            variant='outlined'
            type='number'
          />
          <TextField
            name='learningRate'
            label='Learning rate'
            variant='outlined'
            type='number'
          />
          <TextField
            name='hiddenLayers'
            label='Hidden LSTM layers'
            variant='outlined'
            type='number'
          />
          <SubmitButton
            label='Begin training model'
            disabled={!smaData || hasValidationErrors}
          />
        </form>
      )}
    />
  )
}

export default TrainForm

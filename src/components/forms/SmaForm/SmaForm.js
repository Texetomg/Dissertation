import React from 'react'
import { Form } from 'react-final-form'
import { TextField } from 'mui-rff'
import SubmitButton from '../../common/SubmitButton'
import globalCss from '../../globalStyles.module.less'
import { computeSma } from '../../../helpers/computeSma'


const SmaForm = ({ setSmaData, alphaData, windowSize, setWindowSize }) => {
  const onSubmit = (values) => {
    setWindowSize(values.windowSize)
    setSmaData(computeSma(alphaData, +values.windowSize))
  }
  
  const validate = (values) => {
    const errors = {}

    if (!values.windowSize) {
      errors.windowSize = 'Field "Window size" is required.'
    }

    return errors
  }

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={{
        windowSize: windowSize
      }}
      render={({
        handleSubmit, hasValidationErrors
      }) => (
        <form onSubmit={handleSubmit} className={globalCss.formContainer}>  
          <TextField
            name='windowSize'
            label='Window size'
            variant='outlined'
            type='number'
          />
          <SubmitButton
            label='Compute SMA'
            disabled={hasValidationErrors || !alphaData}
          />
        </form>
      )}
    />
  )
}

export default SmaForm

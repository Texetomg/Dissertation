import React from 'react'
import { Button } from '@material-ui/core'
import css from './SubmitButton.module.less'

const SubmitButton = ({ label, disabled }) => {
  return (
    <Button
      variant='contained'
      className={css.submitButton}
      color='primary'
      type='submit'
      disabled={disabled}
    >
      { label }
    </Button>
  )
}

export default SubmitButton

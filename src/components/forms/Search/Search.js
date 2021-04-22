import React, { useState } from 'react'
import { TextField, MenuItem } from '@material-ui/core'
import { Form } from 'react-final-form'
import { Autocomplete, Select } from 'mui-rff'
import { api, SYMBOL_SEARCH, apikey } from '../../../helpers/alphaVoltage'
import { useGetAxiosFetch } from '../../../helpers/useGetAxiosFetch'
import SubmitButton from '../../common/SubmitButton'
import { NotificationManager } from 'react-notifications'
import css from './Search.module.less'
import globalCss from '../../globalStyles.module.less'
import { formatData } from '../../../helpers/formatAlphaData'

const Search = ({ setAlphaData }) => {
  const [options, setOptions] = useState([])
  const [{ loading }, fetchData] = useGetAxiosFetch()

  const onSubmit = ({search, timeSeries, interval}) => {
    const timeInterval = timeSeries === 'TIME_SERIES_INTRADAY' ? `&interval=${interval}` : ''
  
    /* fetchData(`${api}${timeSeries}${search['1. symbol']}${timeInterval}&outputSize=full${apikey}`) */
    fetchData(`${api}${timeSeries}MSFT${timeInterval}&outputsize=full&apikey=demo`)
      .then(({ data }) => {
        if (data?.['Note']) {
          NotificationManager.warning('Maximum call frequency', 'Wait 1 minute', 3000)
        } else {
          setAlphaData(formatData(data))
          NotificationManager.success('Success message', 'Title here')
        }
      })
      .catch(() =>  NotificationManager.warning('Unexpected error', 'Close after 3000ms', 3000))
  };

  const onHandleChange = (value) => {
    fetchData(`${api}${SYMBOL_SEARCH}${value}${apikey}`)
      .then(data => {
        if (data?.['Note']) {
          NotificationManager.warning('Maximum call frequency', 'Wait 1 minute', 3000)
        } else {
          setOptions(data.data.bestMatches || [])
        }})
  }

  const validate = (values) => {
    const errors = {}

    /* if (!values.search) {
      errors.search = 'Field "Search" is required.'
    } */
    if (!values.timeSeries) {
      errors.timeSeries = 'Field "TimeSeries" is required.'
    }

    return errors
  }
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{
        search: 'MSFT',
        interval: '15min',
      }}
      validate={validate}
      render={({ handleSubmit, submitting, pristine, values, hasValidationErrors }) => (
        <form onSubmit={handleSubmit}>  
          <div className={globalCss.formContainer}>
            <Autocomplete
              name='search'
              className={css.autoComplete}
              loading={loading}
              options={options}
              getOptionSelected={(option, value) => value.value === option.value}
              getOptionLabel={(option) => option['2. name'] || ''}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Select a company'
                  variant='outlined'
                  onChange={(event) => onHandleChange(event.target.value)}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password',
                  }}
                />
              )}
            />
            <Select
              name='timeSeries'
              className={css.select}
              style={{minWidth: 300}}
              label='Select time series'
            >
              <MenuItem value='TIME_SERIES_INTRADAY&symbol='>Intraday</MenuItem>
              <MenuItem value='TIME_SERIES_DAILY&symbol='>Daily</MenuItem>
              <MenuItem value='TIME_SERIES_WEEKLY&symbol='>Weekly</MenuItem>
              <MenuItem value='TIME_SERIES_MONTHLY&symbol='>Monthly</MenuItem>
            </Select>
            {values.timeSeries === 'TIME_SERIES_INTRADAY&symbol=' &&
            <Select
              name='interval'
              className={css.select}
              label='Select interval'
              formControlProps={{ margin: 'none' }}
            >
              <MenuItem value='1min'>1 min</MenuItem>
              <MenuItem value='5min'>5 min</MenuItem>
              <MenuItem value='15min'>15 min</MenuItem>
              <MenuItem value='30min'>30 min</MenuItem>
              <MenuItem value='60min'>60 min</MenuItem>
            </Select>}
            <SubmitButton
              label='Fetch data'
              disabled={pristine || submitting || hasValidationErrors}
            />
          </div>
        </form>
      )}
    />
  )
}

export default Search

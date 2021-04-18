import React, { useState } from 'react'
import { Button, TextField, MenuItem } from '@material-ui/core';
import { Form } from 'react-final-form'
import { Autocomplete, Select } from 'mui-rff';
import { api, SYMBOL_SEARCH, apikey } from '../../alphaVoltage'
import { useGetAxiosFetch } from '../../useGetAxiosFetch'
import { NotificationManager } from 'react-notifications'
import css from './Search.module.less'

const Search = ({ setAlphaData }) => {
  const [options, setOptions] = useState([])
  const [{ loading }, fetchData] = useGetAxiosFetch()

  const onSubmit = ({search, timeSeries, interval}) => {
    const timeInterval = timeSeries === 'TIME_SERIES_INTRADAY' ? `&interval=${interval}` : ''
  
    fetchData(`${api}${timeSeries}${search['1. symbol']}${timeInterval}${apikey}`)
      .then(({ data }) => {
        if (data?.['Note']) {
          NotificationManager.warning('Maximum call frequency', 'Wait 1 minute', 3000)
        } else {
          setAlphaData(data)
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

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{
        interval: '15min',
      }}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>  
          <div className={css.searchContainer}>
            <Autocomplete
              name='search'
              className={css.autoComplete}
              loading={loading}
              options={options}
              getOptionSelected={(
                option,
                value,
             ) => value.value === option.value}
              
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
              
            <Button
              variant='contained'
              className={css.submitButton}
              color='primary'
              type='submit'
              disabled={pristine || submitting}
            >
              Fetch data
            </Button>
          </div>
        </form>
      )}
    />
  )
}

export default Search

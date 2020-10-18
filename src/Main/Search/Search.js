import React, { useState } from 'react'
import { Button, TextField, MenuItem, Card, CardContent, Paper, Grid } from '@material-ui/core';
import { Form } from 'react-final-form'
import { Autocomplete, Select } from 'mui-rff';
import { api, SYMBOL_SEARCH, TIME_SERIES_INTRADAY, apikey } from '../../alphaVoltage'
import { useGetAxiosFetch } from '../../useGetAxiosFetch'
import css from './Search.module.less'

const Search = () => {
  const [options, setOptions] = useState([])
  const [{data, loading, error}, fetchData] = useGetAxiosFetch()

  const onSubmit = (values) => {
    fetchData(`${api}${TIME_SERIES_INTRADAY}${values.search['1. symbol']}&interval=15min${apikey}`)
  };

  const onHandleChange = (value) => {
    fetchData(`${api}${SYMBOL_SEARCH}${value}${apikey}`)
      .then(data => setOptions(data.data.bestMatches || []))
  }

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <Card className={css.cardContainer}>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={2}>
                  <Autocomplete
                    name='search'
                    loading={loading}
                    options={options}
                    getOptionSelected={(option, value) => option['2. name'] === value['2. name']}
                    getOptionLabel={(option) => option['2. name'] || ''}
                    options={options}
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
                </Grid>
                <Grid item xs={2}>
                  <Select
                    name="timeSeries"
                    label="Select time series"
                    formControlProps={{ margin: 'none' }}
                  >
                    <MenuItem value="TIME_SERIES_INTRADAY">Intraday</MenuItem>
                    <MenuItem value="TIME_SERIES_DAILY">Daily</MenuItem>
                    <MenuItem value="TIME_SERIES_WEEKLY">Weekly</MenuItem>
                    <MenuItem value="TIME_SERIES_MONTHLY">Mounthly</MenuItem>
                  </Select>
                </Grid>
                {values.timeSeries === 'TIME_SERIES_INTRADAY' && <Grid item xs={2}>
                  <Select
                    name="interval"
                    label="Select interval"
                    formControlProps={{ margin: 'none' }}
                  >
                    <MenuItem value="1min">1 min</MenuItem>
                    <MenuItem value="5min">5 min</MenuItem>
                    <MenuItem value="15min">15 min</MenuItem>
                    <MenuItem value="30min">30 min</MenuItem>
                    <MenuItem value="60min">60 min</MenuItem>
                  </Select>
                </Grid>}
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={pristine || submitting}
                  >
                    Fetch data
                  </Button>  
                </Grid>
              </Grid>
            </CardContent>
          </Card> 
        </form>
      )}
    />
  )
}

export default Search

import React from 'react';
import { Autocomplete, Grid, TextField, Button } from '@material-ui/core';
import { removeUnderscoreAndCapitalize } from '../utils/formatStrings';

const GalleryFilters = ({
  selectedFilters,
  setSelectedFilters,
  FILTERS,
  getFiltersInitialState
}) => (
  <Grid container sx={{ display: 'flex', flexDirection: 'column' }}>
    {FILTERS.map((filter) => (
      <Autocomplete
        disablePortal
        disableClearable
        key={filter.id}
        onChange={(event, selected) => {
          setSelectedFilters({
            ...selectedFilters,
            [filter.id]: selected.value
          });
        }}
        getOptionLabel={(option) => option.name}
        options={filter.options}
        value={{
          name: removeUnderscoreAndCapitalize(selectedFilters[filter.id])
        }}
        sx={{ width: 300, mt: 2 }}
        renderInput={(params) => <TextField {...params} label={filter.label} />}
      />
    ))}
    <Button
      onClick={() => {
        const initialState = getFiltersInitialState(FILTERS);
        setSelectedFilters(initialState);
      }}
      sx={{ mt: 1 }}
    >
      RESET FILTERS
    </Button>
  </Grid>
);

export default GalleryFilters;

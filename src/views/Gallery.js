import React, { useState, useEffect } from 'react';
import { Box, Grid, Container, Typography } from '@material-ui/core';
import GalleryFilters from '../components/GalleryFilters';

const FILTERS = [
  {
    label: 'Background',
    id: 'background',
    options: [
      {
        name: 'Dark',
        value: 'dark'
      },
      {
        name: 'Antro',
        value: 'antro'
      }
    ]
  },
  {
    label: 'Fur',
    id: 'fur',
    options: [
      {
        name: 'Brown',
        value: 'brown'
      },
      {
        name: 'White',
        value: 'white'
      }
    ]
  },
  {
    label: 'Clothes',
    id: 'clothes',
    options: [
      {
        name: 'Dress',
        value: 'dress'
      },
      {
        name: 'Shirt',
        value: 'shirt'
      }
    ]
  },
  {
    label: 'Mouth',
    id: 'mouth',
    options: [
      {
        name: 'Agressive',
        value: 'agressive'
      },
      {
        name: 'Kind',
        value: 'kind'
      }
    ]
  },
  {
    label: 'Eyes',
    id: 'eyes',
    options: [
      {
        name: 'Laser',
        value: 'laser'
      },
      {
        name: 'Kind',
        value: 'kind'
      }
    ]
  },
  {
    label: 'Hat',
    id: 'hat',
    options: [
      {
        name: 'Elegant',
        value: 'elegant'
      },
      {
        name: 'Cowboy',
        value: 'cowbow'
      }
    ]
  },
  {
    label: 'Jewelery',
    id: 'jewelery',
    options: [
      {
        name: 'Elegant',
        value: 'elegant'
      },
      {
        name: 'Gold',
        value: 'gold'
      }
    ]
  }
];

const getFiltersInitialState = (filters) => {
  let filtersInitialState = {};

  filters.forEach((filter) => {
    filtersInitialState = {
      ...filtersInitialState,
      [filter.id]: ''
    };
  });
  return filtersInitialState;
};
const Gallery = () => {
  const [selectedFilters, setSelectedFilters] = useState(
    getFiltersInitialState(FILTERS)
  );

  useEffect(() => {
    console.log(selectedFilters);
  }, [selectedFilters]);

  return (
    <Grid container sx={{ mt: 15 }}>
      <Grid item xs={4} sx={{ pl: 5 }}>
        <GalleryFilters
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          FILTERS={FILTERS}
          getFiltersInitialState={getFiltersInitialState}
        />
      </Grid>
      <Grid item xs={8}>
        Items
      </Grid>
    </Grid>
  );
};

export default Gallery;

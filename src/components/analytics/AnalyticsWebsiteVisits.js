import React, { useState, useEffect } from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box, Button } from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';
//
import { BaseOptionChart } from '../charts';
import { getMetricsByOrigin } from '../../api/metrics';
import { TIME_UNITS } from '../../constants/dates';
import { getModifier } from '../../utils/formatStyles';

// ----------------------------------------------------------------------

const TimeUnitBox = styled('div')({
  width: '100%',
  justifyContent: 'flex-end',
  display: 'flex'
});

const TimeUnitButton = styled(Button)({
  marginLeft: '25px'
});

// ----------------------------------------------------------------------

const CHART_DATA = [
  {
    name: 'Team A',
    type: 'column',
    data: [23, 11, 22, 27, 13, 22, 37]
  },
  {
    name: 'Team B',
    type: 'area',
    data: [44, 55, 41, 67, 22, 43, 21]
  },
  {
    name: 'Team C',
    type: 'line',
    data: [30, 25, 36, 30, 45, 35, 64]
  }
];

export default function AnalyticsWebsiteVisits() {
  const [selectedTimeUnit, setSelectedTimeUnit] = useState('MONTH');
  const [trafficOrigin, setTrafficOrigin] = useState({
    data: [],
    labels: []
  });

  useEffect(() => {
    const getMetrics = async () => {
      const trafficData = await getMetricsByOrigin(selectedTimeUnit);
      setTrafficOrigin(trafficData);
    };
    getMetrics();
  }, [selectedTimeUnit]);
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['solid', 'gradient', 'solid'] },
    labels: trafficOrigin.labels,
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} visits`;
          }
          return y;
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title="Website Visits" subheader="(+43%) than last year" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <TimeUnitBox>
          {TIME_UNITS.map((button) => (
            <TimeUnitButton
              key={button.value}
              onClick={() => {
                setSelectedTimeUnit(button.value);
              }}
              variant={getModifier(button.value, selectedTimeUnit)}
            >
              {button.label}
            </TimeUnitButton>
          ))}
        </TimeUnitBox>
        <ReactApexChart
          type="line"
          series={trafficOrigin.data}
          options={chartOptions}
          height={364}
        />
      </Box>
    </Card>
  );
}

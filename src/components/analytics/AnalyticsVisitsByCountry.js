import { useEffect, useState } from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import {
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';
import { Card, CardHeader, Button } from '@material-ui/core';
// utils
import { fNumber } from '../../utils/formatNumber';
//
import { BaseOptionChart } from '../charts';
import { getVisitsCountries } from '../../api/metrics';
import { getModifier } from '../../utils/formatStyles';
import { TIME_UNITS } from '../../constants/dates';

// ----------------------------------------------------------------------

const TimeUnitBox = styled('div')({
  width: '100%',
  justifyContent: 'flex-end',
  display: 'flex',
  marginRight: '15px'
});

const TimeUnitButton = styled(Button)({
  marginLeft: '25px'
});
const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible'
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
  }
}));

// ----------------------------------------------------------------------

const CHART_DATA = [4344, 5435, 1443, 4443];

export default function AnalyticsVisitsByCountry() {
  const [countries, setCountries] = useState({});
  const [selectedTimeUnit, setSelectedTimeUnit] = useState('MONTH');
  const theme = useTheme();

  useEffect(() => {
    const getCountries = async () => {
      const countries = await getVisitsCountries(selectedTimeUnit);
      setCountries(countries);
    };
    getCountries();
  }, [selectedTimeUnit]);

  const colorOptions = [
    theme.palette.primary.main,
    theme.palette.info.main,
    theme.palette.warning.main,
    theme.palette.error.main,
    '#FF00E1',
    theme.palette.warning.light,
    theme.palette.primary.dark,
    theme.palette.info.light
  ];

  const chartOptions = merge(BaseOptionChart(), {
    colors: colorOptions,
    labels: countries.countries,
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `#${seriesName}`
        }
      }
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } }
    }
  });

  return (
    <Card>
      <CardHeader title="Trafic by country" />
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
      <ChartWrapperStyle dir="ltr">
        {Object.keys(countries).length > 0 && (
          <ReactApexChart
            type="pie"
            series={countries.values}
            options={chartOptions}
            height={320}
          />
        )}
      </ChartWrapperStyle>
    </Card>
  );
}

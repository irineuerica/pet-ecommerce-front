import PropTypes from 'prop-types';
import ComputerDesktopIcon from '@heroicons/react/24/solid/ComputerDesktopIcon';
import DeviceTabletIcon from '@heroicons/react/24/solid/DeviceTabletIcon';
import PhoneIcon from '@heroicons/react/24/solid/PhoneIcon';
import { Box, Card, CardContent, CardHeader, Stack, SvgIcon, Typography, useTheme } from '@mui/material';
import { Chart } from 'src/components/chart';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from 'react';

const useChartOptions = (labels: any) => {
  const theme = useTheme();

  return {
    chart: {
      background: 'transparent',
    },
    colors: [theme.palette.primary.main, theme.palette.success.main, theme.palette.warning.main],
    dataLabels: {
      enabled: false,
    },
    labels,
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
      },
    },
    states: {
      active: {
        filter: {
          type: 'none',
        },
      },
      hover: {
        filter: {
          type: 'none',
        },
      },
    },
    stroke: {
      width: 0,
    },
    theme: {
      mode: theme.palette.mode,
    },
    tooltip: {
      fillSeriesColor: false,
    },
  };
};

const iconMap = {
  Desktop: (
    <SvgIcon>
      <ComputerDesktopIcon />
    </SvgIcon>
  ),
  Tablet: (
    <SvgIcon>
      <DeviceTabletIcon />
    </SvgIcon>
  ),
  Phone: (
    <SvgIcon>
      <PhoneIcon />
    </SvgIcon>
  ),
};

export const OverviewTraffic = (props: { chartSeries: any; labels: any; sx: any }) => {
  const { chartSeries, labels, sx } = props;
  const chartOptions = useChartOptions(labels);

  return (
    <Card sx={sx}>
      <CardHeader title="Traffic Source" />
      <CardContent>
        <Chart height={300} options={chartOptions} series={chartSeries} type="donut" width="100%" />
        <Stack alignItems="center" direction="row" justifyContent="center" spacing={2} sx={{ mt: 2 }}>
          {chartSeries.map(
            (
              item:
                | string
                | number
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | ReactPortal
                | PromiseLikeOfReactNode
                | null
                | undefined,
              index: string | number,
            ) => {
              const label = labels[index];

              return (
                <Box
                  key={label}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  {/* @ts-ignore */}
                  {iconMap[label]}
                  <Typography sx={{ my: 1 }} variant="h6">
                    {label}
                  </Typography>
                  <Typography color="text.secondary" variant="subtitle2">
                    {item}%
                  </Typography>
                </Box>
              );
            },
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewTraffic.propTypes = {
  chartSeries: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  sx: PropTypes.object,
};
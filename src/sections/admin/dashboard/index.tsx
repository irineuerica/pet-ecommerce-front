import { Chart as ChartJS, registerables } from 'chart.js/auto';
import { Line } from "react-chartjs-2";
import { Button, Container, MenuItem, Select, Stack } from '@mui/material';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormInputDate } from '../../../components/FormInputDate';
const data = {

  labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
  datasets: [
    {
      label: "Produto 01",
      data: [33, 53, 85, 41, 44, 65],
      fill: false,
      borderColor: '#38394C'
    },
    {
      label: "Produto 02",
      data: [33, 25, 35, 51, 54, 76],
      fill: false,
      borderColor: '#4d9393'
    }
  ]
};
export default function Dashboard(){
  ChartJS.register(...registerables);
  const methods = useForm()
  return (
    <FormProvider {...methods}>
    <Container>
      <Line data={data} />
      <Stack spacing={3}>
        <Select label={'Produtos'} sx={{minWidth: '35%'}}>
          <MenuItem value ='1'>Produto 01</MenuItem>
          <MenuItem value ='1'>Produto 02</MenuItem>
          <MenuItem value ='1'>Produto 03</MenuItem>
          <MenuItem value ='1'>Produto 04</MenuItem>
        </Select>
      <Stack flexDirection={'row'}>
        <FormInputDate name={'de'} label={'De'} />
        <FormInputDate name={'ate'} label={'Até'}/>
      </Stack>
        <Button variant={'outlined'} color='secondary' sx={{my: 5}}>Gerar gráfico</Button>
      </Stack>
    </Container>
    </FormProvider>
  );


}
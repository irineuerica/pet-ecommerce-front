// @ts-nocheck
import { Container, FormLabel, Stack } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormInputDate } from '../../../components/FormInputDate';
import { useProduto } from '@modules/produtos/hooks/useProduto';
import { FormMultiSelect } from 'src/components/FormSelect';
import { useAnalise } from '@modules/pedido/hooks/useAnalise';
import { LoadingButton } from '@mui/lab';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { ptBR } from 'date-fns/locale';
import moment from 'moment';
import { enqueueSnackbar } from 'notistack';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend, TimeScale, CategoryScale, LineElement, Title);

interface SaleData {
  nome: string;
  quantidade: string;
  data: string;
}

export default function Dashboard() {
  const methods = useForm({
    defaultValues: {
      produtosSelecionados: [],
      dataInicio: new Date(new Date().setDate(new Date().getDate() - 30)),
      dataFim: new Date(),
    },
  });
  const { produtos, isLoading } = useProduto();
  const [chartData, setChartData] = useState<SaleData[]>([]);
  const { handleAnalysisIsLoading, handleAnalysis } = useAnalise();
  const produtosOptions = produtos?.map((produto) => {
    return { value: produto.id || 0, label: produto.nome };
  });

  const dataInicio = methods.watch('dataInicio');
  const dataFim = methods.watch('dataFim');

  const carregarAnalise = useCallback(async () => {
    const produtosSelecionados: number[] = methods.getValues('produtosSelecionados');
    const dataInicio = new Date(methods.getValues('dataInicio'));
    const dataFim = new Date(methods.getValues('dataFim'));
    if (produtosSelecionados.length === 0 || !dataInicio || !dataFim) {
      enqueueSnackbar('Preencha os campos para gerar o gráfico', {
        variant: 'error',
        style: { whiteSpace: 'pre-line' },
      });
      return;
    }
    const data = await handleAnalysis({
      produtosId: produtosSelecionados,
      dataInicio,
      dataFim,
    });
    const processedData = processData(data);

    setChartData(processedData);
  }, [chartData]);

  const colors = ['#9EA1D4', '#76B7B7', '#FD8A8A', '#FEC868', '#06AED4', '#FFD500', '#528080', '#38394C', '#98AAB3'];

  const processData = (data: SaleData[]) => {
    const productSales: { [product: string]: { [date: string]: number } } = {};

    data.forEach((item) => {
      const date = new Date(item.data);
      const day = date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
      const quantity = parseInt(item.quantidade, 10);
      console.log(item.quantidade)
      const productName = item.nome;

      if (!productSales[productName]) {
        productSales[productName] = {};
      }

      if (!productSales[productName][day]) {
        productSales[productName][day] = 0;
      }


      productSales[productName][day] += quantity;
    });
    console.log(productSales)

    return productSales;
  };

  const labels = Array.from(new Set(Object.values(chartData).flatMap(Object.keys))).sort();
  const datasets = Object.keys(chartData).map((product, index) => {
    const productData = labels.map((date) => chartData[product][date] || 0);
    return {
      label: product,
      data: productData,
      borderColor: colors[index],
      backgroundColor: colors[index],
      fill: true,
    };
  });

  const data = {
    labels: labels,
    datasets: datasets,
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: `Vendas no periodo ${moment(dataInicio).format('DD/MM/YYYY')} à ${moment(dataFim).format('DD/MM/YYYY')}`,
        },
        type: 'time',
        time: {
          unit: 'day',
          displayFormats: {
            day: 'dd/MM',
          },
          tooltipFormat: 'dd/MM/yyyy',
          adapters: {
            date: {
              locale: ptBR,
            },
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Quantidade Vendida',
        },

        ticks: {
          stepSize: 1,
        },

        beginAtZero: true,
      },
    },
  };

  return (
    <FormProvider {...methods}>
      <Container sx={{ mt: 2 }}>
        {produtos && !isLoading && (
          <>
            <Stack spacing={3} paddingBottom={3}>
              {produtosOptions?.length > 0 && (
                <>
                  <FormLabel>Produtos</FormLabel>
                  <FormMultiSelect name="produtosSelecionados" options={produtosOptions} chip />
                </>

              )}
              <Stack flexDirection={'row'} gap={2}>
                <FormInputDate maxDate={new Date()} name={'dataInicio'} label={'De'} />
                <FormInputDate maxDate={new Date()} name={'dataFim'} label={'Até'} />
              </Stack>
              <LoadingButton
                loading={handleAnalysisIsLoading}
                variant={'outlined'}
                color="secondary"
                sx={{ my: 5 }}
                onClick={() => carregarAnalise()}
              >
                Gerar gráfico
              </LoadingButton>
            </Stack>
            <Stack>
              {chartData && (
                <div>
                  <h2>Vendas Mensais</h2>
                  <Line data={data} options={options} />
                </div>
              )}
            </Stack>
          </>
        )}
      </Container>
    </FormProvider>
  );
}

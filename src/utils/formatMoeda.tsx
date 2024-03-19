export const formatMoeda = (numero?: number) => {
  if (numero === undefined || numero === null || Number.isNaN(numero)) {
    return 'R$ 0,00';
  }

  const numeroString = numero.toFixed(2);

  const partes = numeroString.split('.');
  let parteInteira = partes[0];
  const parteDecimal = partes[1] ? `,${partes[1]}` : ',00';

  const separadorMilhares = '.';
  parteInteira = parteInteira.replace(/\B(?=(\d{3})+(?!\d))/g, separadorMilhares);

  return `R$ ${parteInteira}${parteDecimal}`;
};

export const formatSemSimbolo = (numero: number) => {
  const numeroString = numero.toFixed(6);

  const partes = numeroString.split('.');
  let parteInteira = partes[0];
  const parteDecimal = partes.length > 1 ? `,${partes[1]}` : '';

  const separadorMilhares = '.';
  parteInteira = parteInteira.replace(/\B(?=(\d{3})+(?!\d))/g, separadorMilhares);

  return `${parteInteira}${parteDecimal}`;
};

export const formatMilhar = (numero: number) => {
  const numeroString = numero.toFixed(0);

  const partes = numeroString.split('.');
  let parteInteira = partes[0];
  const parteDecimal = partes.length > 1 ? `,${partes[1]}` : '';

  const separadorMilhares = '.';
  parteInteira = parteInteira.replace(/\B(?=(\d{3})+(?!\d))/g, separadorMilhares);

  return `${parteInteira}${parteDecimal}`;
};

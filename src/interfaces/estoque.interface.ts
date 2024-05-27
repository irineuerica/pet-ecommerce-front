export interface EstoqueInterface {
    id: number;
    quantidadeAtual: number;
    quantidadeVendida: number;
    motivo: string;
    dataEntrada?: Date;
    dataSaida?: Date;
}

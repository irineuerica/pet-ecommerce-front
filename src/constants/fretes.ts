export const FRETES: { [key: string]: number } = {
    "Acre": getRandomValue(),
    "Alagoas": getRandomValue(),
    "Amapá": getRandomValue(),
    "Amazonas": getRandomValue(),
    "Bahia": getRandomValue(),
    "Ceará": getRandomValue(),
    "Distrito Federal": getRandomValue(),
    "Espírito Santo": getRandomValue(),
    "Goiás": getRandomValue(),
    "Maranhão": getRandomValue(),
    "Mato Grosso": getRandomValue(),
    "Mato Grosso do Sul": getRandomValue(),
    "Minas Gerais": getRandomValue(),
    "Pará": getRandomValue(),
    "Paraíba": getRandomValue(),
    "Paraná": getRandomValue(),
    "Pernambuco": getRandomValue(),
    "Piauí": getRandomValue(),
    "Rio de Janeiro": getRandomValue(),
    "Rio Grande do Norte": getRandomValue(),
    "Rio Grande do Sul": getRandomValue(),
    "Rondônia": getRandomValue(),
    "Roraima": getRandomValue(),
    "Santa Catarina": getRandomValue(),
    "São Paulo": getRandomValue(),
    "Sergipe": getRandomValue(),
    "Tocantins": getRandomValue()
};

function getRandomValue(): number {
    return Math.floor(Math.random() * (26 - 5 + 1)) + 5;
}
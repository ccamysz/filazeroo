export interface Estabelecimento {
  id: string;
  nome: string;
  categoria: string;
  localidade: string;
  pessoasNaFila: number;
  tempoMedio: number; // minutos
}

export const mockEstabelecimentos: Estabelecimento[] = [
  { id: "e1", nome: "UBS Centro", categoria: "Saúde", localidade: "Centro", pessoasNaFila: 12, tempoMedio: 15 },
  { id: "e2", nome: "Hospital Municipal", categoria: "Saúde", localidade: "Zona Norte", pessoasNaFila: 25, tempoMedio: 22 },
  { id: "e3", nome: "Clínica Vida", categoria: "Saúde", localidade: "Zona Sul", pessoasNaFila: 8, tempoMedio: 10 },
  { id: "e4", nome: "Banco do Brasil", categoria: "Bancos e Lotéricas", localidade: "Centro", pessoasNaFila: 18, tempoMedio: 12 },
  { id: "e5", nome: "Caixa Econômica", categoria: "Bancos e Lotéricas", localidade: "Zona Norte", pessoasNaFila: 22, tempoMedio: 14 },
  { id: "e6", nome: "Lotérica da Sorte", categoria: "Bancos e Lotéricas", localidade: "Centro", pessoasNaFila: 10, tempoMedio: 8 },
  { id: "e7", nome: "Prefeitura Municipal", categoria: "Atendimentos Municipais", localidade: "Centro", pessoasNaFila: 30, tempoMedio: 20 },
  { id: "e8", nome: "Secretaria de Saúde", categoria: "Atendimentos Municipais", localidade: "Centro", pessoasNaFila: 15, tempoMedio: 18 },
  { id: "e9", nome: "Supermercado BomPreço", categoria: "Supermercados", localidade: "Zona Sul", pessoasNaFila: 6, tempoMedio: 5 },
  { id: "e10", nome: "Mercado Central", categoria: "Supermercados", localidade: "Centro", pessoasNaFila: 9, tempoMedio: 7 },
  { id: "e11", nome: "Universidade Federal", categoria: "Educação", localidade: "Zona Norte", pessoasNaFila: 20, tempoMedio: 16 },
  { id: "e12", nome: "Escola Técnica", categoria: "Educação", localidade: "Centro", pessoasNaFila: 5, tempoMedio: 10 },
  { id: "e13", nome: "Cartório 1º Ofício", categoria: "Serviços Gerais", localidade: "Centro", pessoasNaFila: 14, tempoMedio: 12 },
  { id: "e14", nome: "Detran", categoria: "Serviços Gerais", localidade: "Zona Norte", pessoasNaFila: 35, tempoMedio: 25 },
];

export const categorias = ["Saúde", "Bancos e Lotéricas", "Atendimentos Municipais", "Supermercados", "Educação", "Serviços Gerais"];
export const localidades = ["Centro", "Zona Norte", "Zona Sul"];

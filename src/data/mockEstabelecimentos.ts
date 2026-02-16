export interface Estabelecimento {
  id: string;
  nome: string;
  categoria: string;
  localidade: string;
  pessoasNaFila: number;
  tempoMedio: number; // minutos
}

export const mockEstabelecimentos: Estabelecimento[] = [
  // ==================== CENTRO ====================
  { id: "c1", nome: "Hospital Instituto Dr. José Frota (IJF)", categoria: "Saúde", localidade: "Centro", pessoasNaFila: 42, tempoMedio: 30 },
  { id: "c2", nome: "Banco do Brasil - Centro", categoria: "Bancos e Lotéricas", localidade: "Centro", pessoasNaFila: 20, tempoMedio: 13 },
  { id: "c3", nome: "Lotérica Central", categoria: "Bancos e Lotéricas", localidade: "Centro", pessoasNaFila: 10, tempoMedio: 7 },
  { id: "c4", nome: "Prefeitura de Fortaleza - Paço Municipal", categoria: "Atendimentos Municipais", localidade: "Centro", pessoasNaFila: 30, tempoMedio: 20 },
  { id: "c5", nome: "Mercado Central de Fortaleza", categoria: "Supermercados", localidade: "Centro", pessoasNaFila: 8, tempoMedio: 5 },
  { id: "c6", nome: "Escola Técnica Federal - Centro", categoria: "Educação", localidade: "Centro", pessoasNaFila: 12, tempoMedio: 14 },
  { id: "c7", nome: "Cartório 1º Ofício - Centro", categoria: "Serviços Gerais", localidade: "Centro", pessoasNaFila: 14, tempoMedio: 12 },
  { id: "c8", nome: "Correios - Centro", categoria: "Serviços Gerais", localidade: "Centro", pessoasNaFila: 9, tempoMedio: 8 },

  // ==================== ALDEOTA ====================
  { id: "a1", nome: "Clínica São Carlos - Aldeota", categoria: "Saúde", localidade: "Aldeota", pessoasNaFila: 10, tempoMedio: 12 },
  { id: "a2", nome: "Banco do Brasil - Aldeota", categoria: "Bancos e Lotéricas", localidade: "Aldeota", pessoasNaFila: 12, tempoMedio: 10 },
  { id: "a3", nome: "Posto de Atendimento Municipal - Aldeota", categoria: "Atendimentos Municipais", localidade: "Aldeota", pessoasNaFila: 14, tempoMedio: 16 },
  { id: "a4", nome: "Pão de Açúcar - Aldeota", categoria: "Supermercados", localidade: "Aldeota", pessoasNaFila: 7, tempoMedio: 4 },
  { id: "a5", nome: "Colégio Farias Brito - Aldeota", categoria: "Educação", localidade: "Aldeota", pessoasNaFila: 8, tempoMedio: 10 },
  { id: "a6", nome: "Correios - Aldeota", categoria: "Serviços Gerais", localidade: "Aldeota", pessoasNaFila: 9, tempoMedio: 8 },

  // ==================== MEIRELES ====================
  { id: "m1", nome: "Posto de Saúde Meireles", categoria: "Saúde", localidade: "Meireles", pessoasNaFila: 10, tempoMedio: 12 },
  { id: "m2", nome: "Bradesco - Meireles", categoria: "Bancos e Lotéricas", localidade: "Meireles", pessoasNaFila: 11, tempoMedio: 9 },
  { id: "m3", nome: "Secretaria de Saúde - SESA", categoria: "Atendimentos Municipais", localidade: "Meireles", pessoasNaFila: 16, tempoMedio: 19 },
  { id: "m4", nome: "Mercadinho São Luiz - Meireles", categoria: "Supermercados", localidade: "Meireles", pessoasNaFila: 5, tempoMedio: 3 },
  { id: "m5", nome: "CCAA Idiomas - Meireles", categoria: "Educação", localidade: "Meireles", pessoasNaFila: 4, tempoMedio: 8 },
  { id: "m6", nome: "Cartório 2º Ofício - Meireles", categoria: "Serviços Gerais", localidade: "Meireles", pessoasNaFila: 7, tempoMedio: 10 },

  // ==================== PAPICU ====================
  { id: "p1", nome: "Hospital Geral de Fortaleza (HGF)", categoria: "Saúde", localidade: "Papicu", pessoasNaFila: 35, tempoMedio: 25 },
  { id: "p2", nome: "Caixa Econômica Federal - Papicu", categoria: "Bancos e Lotéricas", localidade: "Papicu", pessoasNaFila: 16, tempoMedio: 12 },
  { id: "p3", nome: "Regional II - Papicu", categoria: "Atendimentos Municipais", localidade: "Papicu", pessoasNaFila: 18, tempoMedio: 15 },
  { id: "p4", nome: "Supermercado Guará - Papicu", categoria: "Supermercados", localidade: "Papicu", pessoasNaFila: 6, tempoMedio: 4 },
  { id: "p5", nome: "Universidade de Fortaleza (UNIFOR)", categoria: "Educação", localidade: "Papicu", pessoasNaFila: 22, tempoMedio: 16 },
  { id: "p6", nome: "Detran-CE - Papicu", categoria: "Serviços Gerais", localidade: "Papicu", pessoasNaFila: 30, tempoMedio: 22 },

  // ==================== BENFICA ====================
  { id: "b1", nome: "UBS Benfica", categoria: "Saúde", localidade: "Benfica", pessoasNaFila: 13, tempoMedio: 13 },
  { id: "b2", nome: "Lotérica Estrela - Benfica", categoria: "Bancos e Lotéricas", localidade: "Benfica", pessoasNaFila: 6, tempoMedio: 6 },
  { id: "b3", nome: "Posto de Atendimento Municipal - Benfica", categoria: "Atendimentos Municipais", localidade: "Benfica", pessoasNaFila: 11, tempoMedio: 14 },
  { id: "b4", nome: "Minibox Supermercado - Benfica", categoria: "Supermercados", localidade: "Benfica", pessoasNaFila: 4, tempoMedio: 3 },
  { id: "b5", nome: "Universidade Federal do Ceará (UFC)", categoria: "Educação", localidade: "Benfica", pessoasNaFila: 20, tempoMedio: 16 },
  { id: "b6", nome: "IFCE - Campus Fortaleza", categoria: "Educação", localidade: "Benfica", pessoasNaFila: 15, tempoMedio: 14 },
  { id: "b7", nome: "Correios - Benfica", categoria: "Serviços Gerais", localidade: "Benfica", pessoasNaFila: 8, tempoMedio: 7 },

  // ==================== MESSEJANA ====================
  { id: "s1", nome: "UPA Messejana", categoria: "Saúde", localidade: "Messejana", pessoasNaFila: 20, tempoMedio: 15 },
  { id: "s2", nome: "UBS Messejana", categoria: "Saúde", localidade: "Messejana", pessoasNaFila: 14, tempoMedio: 13 },
  { id: "s3", nome: "Caixa Econômica Federal - Messejana", categoria: "Bancos e Lotéricas", localidade: "Messejana", pessoasNaFila: 19, tempoMedio: 13 },
  { id: "s4", nome: "Vapt Vupt - Messejana", categoria: "Atendimentos Municipais", localidade: "Messejana", pessoasNaFila: 25, tempoMedio: 18 },
  { id: "s5", nome: "Atacadão - BR-116 Messejana", categoria: "Supermercados", localidade: "Messejana", pessoasNaFila: 10, tempoMedio: 5 },
  { id: "s6", nome: "Escola Profissional - Messejana", categoria: "Educação", localidade: "Messejana", pessoasNaFila: 9, tempoMedio: 11 },
  { id: "s7", nome: "Detran-CE - Messejana", categoria: "Serviços Gerais", localidade: "Messejana", pessoasNaFila: 35, tempoMedio: 22 },

  // ==================== PARANGABA ====================
  { id: "g1", nome: "UPA Parangaba", categoria: "Saúde", localidade: "Parangaba", pessoasNaFila: 17, tempoMedio: 14 },
  { id: "g2", nome: "Itaú - Parangaba", categoria: "Bancos e Lotéricas", localidade: "Parangaba", pessoasNaFila: 14, tempoMedio: 11 },
  { id: "g3", nome: "Regional IV - Parangaba", categoria: "Atendimentos Municipais", localidade: "Parangaba", pessoasNaFila: 20, tempoMedio: 17 },
  { id: "g4", nome: "Assaí Atacadista - Parangaba", categoria: "Supermercados", localidade: "Parangaba", pessoasNaFila: 12, tempoMedio: 6 },
  { id: "g5", nome: "EEEP Joaquim Nogueira - Parangaba", categoria: "Educação", localidade: "Parangaba", pessoasNaFila: 7, tempoMedio: 10 },
  { id: "g6", nome: "Cartório Parangaba", categoria: "Serviços Gerais", localidade: "Parangaba", pessoasNaFila: 11, tempoMedio: 9 },

  // ==================== MONTESE ====================
  { id: "t1", nome: "Posto de Saúde Montese", categoria: "Saúde", localidade: "Montese", pessoasNaFila: 11, tempoMedio: 11 },
  { id: "t2", nome: "Lotérica Boa Sorte - Montese", categoria: "Bancos e Lotéricas", localidade: "Montese", pessoasNaFila: 8, tempoMedio: 7 },
  { id: "t3", nome: "Vapt Vupt - Montese", categoria: "Atendimentos Municipais", localidade: "Montese", pessoasNaFila: 19, tempoMedio: 16 },
  { id: "t4", nome: "Frangolândia - Montese", categoria: "Supermercados", localidade: "Montese", pessoasNaFila: 6, tempoMedio: 4 },
  { id: "t5", nome: "Colégio Militar de Fortaleza", categoria: "Educação", localidade: "Montese", pessoasNaFila: 10, tempoMedio: 12 },
  { id: "t6", nome: "Correios - Montese", categoria: "Serviços Gerais", localidade: "Montese", pessoasNaFila: 11, tempoMedio: 9 },
];

export const categorias = ["Saúde", "Bancos e Lotéricas", "Atendimentos Municipais", "Supermercados", "Educação", "Serviços Gerais"];
export const localidades = ["Aldeota", "Benfica", "Centro", "Meireles", "Messejana", "Montese", "Papicu", "Parangaba"];

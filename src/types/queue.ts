export type TipoSenha = "normal" | "preferencial";
export type StatusSenha = "aguardando" | "atendendo" | "finalizado" | "cancelado" | "pulado";

export interface Justificativa {
  motivo: string;
  timestamp: string;
  acao: "cancelado" | "pulado";
}

export interface Senha {
  id: string;
  numero: string;
  tipo: TipoSenha;
  status: StatusSenha;
  horarioEntrada: string;
  horarioChamada?: string;
  horarioFinalizacao?: string;
  atendenteId?: string;
  justificativa?: Justificativa;
}

export interface Atendente {
  id: string;
  nome: string;
  cargo?: string;
  status: "ativo" | "inativo";
}

export interface EstatisticaAtendente {
  id: string;
  nome: string;
  atendimentos: number;
  tempoMedio: number; // minutos
  bonus: number; // R$
  semanal: { atendimentos: number; tempoMedio: number; lucro: number };
  mensal: { atendimentos: number; tempoMedio: number; lucro: number };
  anual: { atendimentos: number; tempoMedio: number; lucro: number };
}

export interface RelatorioData {
  atendimentosPorHora: { hora: string; atendimentos: number }[];
  tempoMedioEspera: number;
  tempoMedioGeral: number;
  totalAtendimentos: number;
  totalCancelados: number;
  totalPulados: number;
  lucroSemanal: number;
  lucroMensal: number;
  lucroAnual: number;
  mediaSemanal: number;
  mediaMensal: number;
  mediaAnual: number;
  estatisticasAtendentes: EstatisticaAtendente[];
  justificativas: (Justificativa & { senha: string; atendente?: string })[];
}

export interface UsuarioAdmin {
  id: string;
  nome: string;
  email: string;
  nivelAcesso: "admin" | "atendente";
}

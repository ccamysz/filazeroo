import { Senha, RelatorioData } from "@/types/queue";

// Mock data for development
export const mockSenhas: Senha[] = [
  { id: "1", numero: "N001", tipo: "normal", status: "aguardando", horarioEntrada: new Date(Date.now() - 1800000).toISOString() },
  { id: "2", numero: "P001", tipo: "preferencial", status: "aguardando", horarioEntrada: new Date(Date.now() - 1500000).toISOString() },
  { id: "3", numero: "N002", tipo: "normal", status: "aguardando", horarioEntrada: new Date(Date.now() - 1200000).toISOString() },
  { id: "4", numero: "P002", tipo: "preferencial", status: "aguardando", horarioEntrada: new Date(Date.now() - 900000).toISOString() },
  { id: "5", numero: "N003", tipo: "normal", status: "atendendo", horarioEntrada: new Date(Date.now() - 2400000).toISOString(), horarioChamada: new Date(Date.now() - 300000).toISOString(), atendenteId: "1" },
  { id: "6", numero: "N004", tipo: "normal", status: "finalizado", horarioEntrada: new Date(Date.now() - 3600000).toISOString(), horarioChamada: new Date(Date.now() - 3000000).toISOString(), horarioFinalizacao: new Date(Date.now() - 2400000).toISOString(), atendenteId: "2" },
  { id: "7", numero: "P003", tipo: "preferencial", status: "finalizado", horarioEntrada: new Date(Date.now() - 4200000).toISOString(), horarioChamada: new Date(Date.now() - 3600000).toISOString(), horarioFinalizacao: new Date(Date.now() - 3000000).toISOString(), atendenteId: "1" },
  { id: "8", numero: "N005", tipo: "normal", status: "cancelado", horarioEntrada: new Date(Date.now() - 5000000).toISOString(), justificativa: { motivo: "Cliente não compareceu", timestamp: new Date(Date.now() - 4800000).toISOString(), acao: "cancelado" } },
];

export const mockAtendentes: import("@/types/queue").Atendente[] = [
  { id: "1", nome: "Maria Silva", cargo: "Atendente Geral", status: "ativo" },
  { id: "2", nome: "João Santos", cargo: "Caixa", status: "ativo" },
  { id: "3", nome: "Ana Oliveira", cargo: "Recepcionista", status: "inativo" },
];

const TEMPO_MEDIO_GERAL = 10; // minutos - referência para bônus
const VALOR_POR_ATENDIMENTO = 15; // R$ por atendimento
const BONUS_POR_ATENDIMENTO_RAPIDO = 5; // R$ extra se abaixo do tempo médio

export const mockRelatorioData: RelatorioData = {
  atendimentosPorHora: [
    { hora: "08:00", atendimentos: 5 },
    { hora: "09:00", atendimentos: 12 },
    { hora: "10:00", atendimentos: 18 },
    { hora: "11:00", atendimentos: 15 },
    { hora: "12:00", atendimentos: 8 },
    { hora: "13:00", atendimentos: 6 },
    { hora: "14:00", atendimentos: 14 },
    { hora: "15:00", atendimentos: 16 },
    { hora: "16:00", atendimentos: 11 },
    { hora: "17:00", atendimentos: 7 },
  ],
  tempoMedioEspera: 12,
  tempoMedioGeral: TEMPO_MEDIO_GERAL,
  totalAtendimentos: 112,
  totalCancelados: 8,
  totalPulados: 3,
  lucroSemanal: 8_400,
  lucroMensal: 33_600,
  lucroAnual: 403_200,
  mediaSemanal: 560,
  mediaMensal: 2_240,
  mediaAnual: 26_880,
  estatisticasAtendentes: [
    {
      id: "1", nome: "Maria Silva", atendimentos: 45, tempoMedio: 8,
      bonus: 45 * BONUS_POR_ATENDIMENTO_RAPIDO, // abaixo da média → ganha bônus
      semanal: { atendimentos: 45, tempoMedio: 8, lucro: 45 * VALOR_POR_ATENDIMENTO + 45 * BONUS_POR_ATENDIMENTO_RAPIDO },
      mensal: { atendimentos: 180, tempoMedio: 8.5, lucro: 180 * VALOR_POR_ATENDIMENTO + 160 * BONUS_POR_ATENDIMENTO_RAPIDO },
      anual: { atendimentos: 2160, tempoMedio: 9, lucro: 2160 * VALOR_POR_ATENDIMENTO + 1800 * BONUS_POR_ATENDIMENTO_RAPIDO },
    },
    {
      id: "2", nome: "João Santos", atendimentos: 38, tempoMedio: 11,
      bonus: 0, // acima da média → sem bônus
      semanal: { atendimentos: 38, tempoMedio: 11, lucro: 38 * VALOR_POR_ATENDIMENTO },
      mensal: { atendimentos: 152, tempoMedio: 11.2, lucro: 152 * VALOR_POR_ATENDIMENTO },
      anual: { atendimentos: 1824, tempoMedio: 11.5, lucro: 1824 * VALOR_POR_ATENDIMENTO },
    },
    {
      id: "3", nome: "Ana Oliveira", atendimentos: 29, tempoMedio: 14,
      bonus: 0,
      semanal: { atendimentos: 29, tempoMedio: 14, lucro: 29 * VALOR_POR_ATENDIMENTO },
      mensal: { atendimentos: 116, tempoMedio: 13.8, lucro: 116 * VALOR_POR_ATENDIMENTO },
      anual: { atendimentos: 1392, tempoMedio: 14, lucro: 1392 * VALOR_POR_ATENDIMENTO },
    },
  ],
  justificativas: [
    { motivo: "Cliente não compareceu", timestamp: new Date(Date.now() - 4800000).toISOString(), acao: "cancelado", senha: "N005" },
    { motivo: "Cliente pediu para ser atendido depois", timestamp: new Date(Date.now() - 6000000).toISOString(), acao: "pulado", senha: "P002", atendente: "Maria Silva" },
    { motivo: "Documentação incompleta", timestamp: new Date(Date.now() - 7200000).toISOString(), acao: "cancelado", senha: "N003", atendente: "João Santos" },
  ],
};

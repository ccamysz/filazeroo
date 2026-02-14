import { Senha, StatusSenha, TipoSenha } from "@/types/queue";

// Mock data for development
export const mockSenhas: Senha[] = [
  { id: "1", numero: "N001", tipo: "normal", status: "aguardando", horarioEntrada: new Date(Date.now() - 1800000).toISOString() },
  { id: "2", numero: "P001", tipo: "preferencial", status: "aguardando", horarioEntrada: new Date(Date.now() - 1500000).toISOString() },
  { id: "3", numero: "N002", tipo: "normal", status: "aguardando", horarioEntrada: new Date(Date.now() - 1200000).toISOString() },
  { id: "4", numero: "P002", tipo: "preferencial", status: "aguardando", horarioEntrada: new Date(Date.now() - 900000).toISOString() },
  { id: "5", numero: "N003", tipo: "normal", status: "atendendo", horarioEntrada: new Date(Date.now() - 2400000).toISOString(), horarioChamada: new Date(Date.now() - 300000).toISOString(), atendenteId: "1" },
  { id: "6", numero: "N004", tipo: "normal", status: "finalizado", horarioEntrada: new Date(Date.now() - 3600000).toISOString(), horarioChamada: new Date(Date.now() - 3000000).toISOString(), atendenteId: "2" },
  { id: "7", numero: "P003", tipo: "preferencial", status: "finalizado", horarioEntrada: new Date(Date.now() - 4200000).toISOString(), horarioChamada: new Date(Date.now() - 3600000).toISOString(), atendenteId: "1" },
  { id: "8", numero: "N005", tipo: "normal", status: "cancelado", horarioEntrada: new Date(Date.now() - 5000000).toISOString() },
];

export const mockAtendentes = [
  { id: "1", nome: "Maria Silva", status: "ativo" as const },
  { id: "2", nome: "João Santos", status: "ativo" as const },
  { id: "3", nome: "Ana Oliveira", status: "inativo" as const },
];

export const mockRelatorioData = {
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
  tempoMedioEspera: 12, // minutos
  totalAtendimentos: 112,
  totalCancelados: 8,
};

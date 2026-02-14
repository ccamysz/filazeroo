export type TipoSenha = "normal" | "preferencial";
export type StatusSenha = "aguardando" | "atendendo" | "finalizado" | "cancelado";

export interface Senha {
  id: string;
  numero: string;
  tipo: TipoSenha;
  status: StatusSenha;
  horarioEntrada: string;
  horarioChamada?: string;
  atendenteId?: string;
}

export interface Atendente {
  id: string;
  nome: string;
  status: "ativo" | "inativo";
}

export interface UsuarioAdmin {
  id: string;
  nome: string;
  email: string;
  nivelAcesso: "admin" | "atendente";
}

import { useState, useCallback } from "react";
import { Senha, Atendente, TipoSenha, StatusSenha } from "@/types/queue";
import { mockSenhas, mockAtendentes } from "@/data/mockData";

let contadorNormal = 5;
let contadorPreferencial = 3;
let normalSemPreferencial = 0;

export function useFilaManager() {
  const [senhas, setSenhas] = useState<Senha[]>(mockSenhas);
  const [atendentes, setAtendentes] = useState<Atendente[]>(mockAtendentes);

  const aguardando = senhas.filter((s) => s.status === "aguardando");
  const atendendo = senhas.filter((s) => s.status === "atendendo");
  const finalizados = senhas.filter((s) => s.status === "finalizado");
  const cancelados = senhas.filter((s) => s.status === "cancelado");

  const gerarSenha = useCallback((tipo: TipoSenha): Senha => {
    let numero: string;
    if (tipo === "preferencial") {
      contadorPreferencial++;
      numero = `P${String(contadorPreferencial).padStart(3, "0")}`;
    } else {
      contadorNormal++;
      numero = `N${String(contadorNormal).padStart(3, "0")}`;
    }

    const nova: Senha = {
      id: crypto.randomUUID(),
      numero,
      tipo,
      status: "aguardando",
      horarioEntrada: new Date().toISOString(),
    };

    setSenhas((prev) => [...prev, nova]);
    return nova;
  }, []);

  const chamarProxima = useCallback((atendenteId: string) => {
    setSenhas((prev) => {
      const aguardandoList = prev.filter((s) => s.status === "aguardando");
      const preferenciais = aguardandoList.filter((s) => s.tipo === "preferencial");
      const normais = aguardandoList.filter((s) => s.tipo === "normal");

      let proxima: Senha | undefined;

      if (preferenciais.length > 0 && normalSemPreferencial >= 2) {
        proxima = preferenciais[0];
        normalSemPreferencial = 0;
      } else if (normais.length > 0) {
        proxima = normais[0];
        normalSemPreferencial++;
      } else if (preferenciais.length > 0) {
        proxima = preferenciais[0];
        normalSemPreferencial = 0;
      }

      if (!proxima) return prev;

      return prev.map((s) =>
        s.id === proxima!.id
          ? { ...s, status: "atendendo" as StatusSenha, horarioChamada: new Date().toISOString(), atendenteId }
          : s
      );
    });
  }, []);

  const finalizarSenha = useCallback((senhaId: string) => {
    setSenhas((prev) =>
      prev.map((s) =>
        s.id === senhaId
          ? { ...s, status: "finalizado" as StatusSenha, horarioFinalizacao: new Date().toISOString() }
          : s
      )
    );
  }, []);

  const cancelarSenha = useCallback((senhaId: string, motivo?: string) => {
    setSenhas((prev) =>
      prev.map((s) =>
        s.id === senhaId
          ? {
              ...s,
              status: "cancelado" as StatusSenha,
              justificativa: motivo
                ? { motivo, timestamp: new Date().toISOString(), acao: "cancelado" as const }
                : undefined,
            }
          : s
      )
    );
  }, []);

  const pularSenha = useCallback((senhaId: string, motivo?: string) => {
    setSenhas((prev) => {
      const senha = prev.find((s) => s.id === senhaId);
      if (!senha) return prev;

      // If atendendo, move back to aguardando at end of queue
      if (senha.status === "atendendo") {
        return prev.map((s) =>
          s.id === senhaId
            ? {
                ...s,
                status: "aguardando" as StatusSenha,
                horarioEntrada: new Date().toISOString(),
                horarioChamada: undefined,
                atendenteId: undefined,
                justificativa: motivo
                  ? { motivo, timestamp: new Date().toISOString(), acao: "pulado" as const }
                  : undefined,
              }
            : s
        );
      }

      if (senha.status !== "aguardando") return prev;
      // Move to end of queue
      const updated = prev.filter((s) => s.id !== senhaId);
      return [
        ...updated,
        {
          ...senha,
          horarioEntrada: new Date().toISOString(),
          justificativa: motivo
            ? { motivo, timestamp: new Date().toISOString(), acao: "pulado" as const }
            : undefined,
        },
      ];
    });
  }, []);

  const getPosicao = useCallback(
    (senhaId: string): number => {
      const fila = getFilaOrdenada(senhas.filter((s) => s.status === "aguardando"));
      const idx = fila.findIndex((s) => s.id === senhaId);
      return idx === -1 ? -1 : idx + 1;
    },
    [senhas]
  );

  const tempoEstimado = useCallback(
    (senhaId: string): number => {
      const pos = getPosicao(senhaId);
      if (pos <= 0) return 0;
      return pos * 5;
    },
    [getPosicao]
  );

  const toggleAtendente = useCallback((atendenteId: string) => {
    setAtendentes((prev) =>
      prev.map((a) =>
        a.id === atendenteId
          ? { ...a, status: a.status === "ativo" ? ("inativo" as const) : ("ativo" as const) }
          : a
      )
    );
  }, []);

  const adicionarAtendente = useCallback((nome: string, cargo: string) => {
    const novo: Atendente = {
      id: crypto.randomUUID(),
      nome,
      cargo,
      status: "ativo",
    };
    setAtendentes((prev) => [...prev, novo]);
  }, []);

  return {
    senhas,
    atendentes,
    aguardando,
    atendendo,
    finalizados,
    cancelados,
    gerarSenha,
    chamarProxima,
    finalizarSenha,
    cancelarSenha,
    pularSenha,
    getPosicao,
    tempoEstimado,
    toggleAtendente,
    adicionarAtendente,
  };
}

function getFilaOrdenada(aguardando: Senha[]): Senha[] {
  return [...aguardando].sort(
    (a, b) => new Date(a.horarioEntrada).getTime() - new Date(b.horarioEntrada).getTime()
  );
}

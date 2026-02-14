import { useState, useEffect, useCallback } from "react";
import { Senha, TipoSenha, StatusSenha } from "@/types/queue";
import { mockSenhas, mockAtendentes } from "@/data/mockData";

let contadorNormal = 5;
let contadorPreferencial = 3;
let normalSemPreferencial = 0;

export function useFilaManager() {
  const [senhas, setSenhas] = useState<Senha[]>(mockSenhas);
  const [atendentes, setAtendentes] = useState(mockAtendentes);

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

      // Regra: a cada 2 normais, 1 preferencial
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
      prev.map((s) => (s.id === senhaId ? { ...s, status: "finalizado" as StatusSenha } : s))
    );
  }, []);

  const cancelarSenha = useCallback((senhaId: string) => {
    setSenhas((prev) =>
      prev.map((s) => (s.id === senhaId ? { ...s, status: "cancelado" as StatusSenha } : s))
    );
  }, []);

  const pularSenha = useCallback((senhaId: string) => {
    setSenhas((prev) => {
      const senha = prev.find((s) => s.id === senhaId);
      if (!senha || senha.status !== "aguardando") return prev;
      // Move to end of queue
      const updated = prev.filter((s) => s.id !== senhaId);
      return [...updated, { ...senha, horarioEntrada: new Date().toISOString() }];
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
      return pos * 5; // ~5 min por pessoa
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
  };
}

function getFilaOrdenada(aguardando: Senha[]): Senha[] {
  // Simple ordering: by entry time
  return [...aguardando].sort(
    (a, b) => new Date(a.horarioEntrada).getTime() - new Date(b.horarioEntrada).getTime()
  );
}

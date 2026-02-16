import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useFilaManager } from "@/hooks/useFilaManager";
import { Phone, SkipForward, X, CheckCircle, Plus } from "lucide-react";
import { TipoSenha } from "@/types/queue";

const AdminFila = () => {
  const {
    senhas,
    aguardando,
    atendendo,
    atendentes,
    gerarSenha,
    chamarProxima,
    finalizarSenha,
    cancelarSenha,
    pularSenha,
  } = useFilaManager();

  const [atendenteAtual, setAtendenteAtual] = useState(atendentes.find((a) => a.status === "ativo")?.id || "");
  const [tipoNovaSenha, setTipoNovaSenha] = useState<TipoSenha>("normal");

  // Justificativa dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogAcao, setDialogAcao] = useState<"cancelar" | "pular">("cancelar");
  const [dialogSenhaId, setDialogSenhaId] = useState("");
  const [dialogSenhaNumero, setDialogSenhaNumero] = useState("");
  const [justificativa, setJustificativa] = useState("");

  const atendentesAtivos = atendentes.filter((a) => a.status === "ativo");

  const formatTime = (iso: string) => {
    return new Date(iso).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  };

  const openJustificativaDialog = (senhaId: string, senhaNumero: string, acao: "cancelar" | "pular") => {
    setDialogSenhaId(senhaId);
    setDialogSenhaNumero(senhaNumero);
    setDialogAcao(acao);
    setJustificativa("");
    setDialogOpen(true);
  };

  const confirmarAcao = () => {
    if (!justificativa.trim()) return;
    if (dialogAcao === "cancelar") {
      cancelarSenha(dialogSenhaId, justificativa.trim());
    } else {
      pularSenha(dialogSenhaId, justificativa.trim());
    }
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="font-display text-2xl font-bold text-foreground">Gerenciar Fila</h2>
        <div className="flex items-center gap-2">
          <Select value={tipoNovaSenha} onValueChange={(v) => setTipoNovaSenha(v as TipoSenha)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="preferencial">Preferencial</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => gerarSenha(tipoNovaSenha)} className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Plus className="h-4 w-4 mr-1" /> Gerar Senha
          </Button>
        </div>
      </div>

      {/* Chamar próxima */}
      <Card className="border-accent">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">Atendente</p>
              <Select value={atendenteAtual} onValueChange={setAtendenteAtual}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o atendente" />
                </SelectTrigger>
                <SelectContent>
                  {atendentesAtivos.map((a) => (
                    <SelectItem key={a.id} value={a.id}>
                      {a.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={() => atendenteAtual && chamarProxima(atendenteAtual)}
              disabled={aguardando.length === 0 || !atendenteAtual}
            >
              <Phone className="h-5 w-5 mr-2" /> Chamar Próxima
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Em atendimento */}
      {atendendo.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">Em Atendimento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {atendendo.map((s) => (
                <div key={s.id} className="flex items-center justify-between rounded-lg border bg-accent/5 p-4">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-xl font-bold text-accent">{s.numero}</span>
                    <Badge variant={s.tipo === "preferencial" ? "default" : "secondary"}>
                      {s.tipo}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Chamado às {formatTime(s.horarioChamada!)}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" onClick={() => finalizarSenha(s.id)}>
                      <CheckCircle className="h-4 w-4 mr-1" /> Finalizar
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => openJustificativaDialog(s.id, s.numero, "pular")}
                      title="Pular"
                    >
                      <SkipForward className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => openJustificativaDialog(s.id, s.numero, "cancelar")}
                      title="Cancelar"
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Fila de espera */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">
            Fila de Espera ({aguardando.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {aguardando.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Nenhuma senha na fila.</p>
          ) : (
            <div className="space-y-2">
              {aguardando.map((s, i) => (
                <div key={s.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground w-6">{i + 1}º</span>
                    <span className="font-display font-bold text-foreground">{s.numero}</span>
                    <Badge variant={s.tipo === "preferencial" ? "default" : "secondary"} className="text-xs">
                      {s.tipo === "preferencial" ? "PREF" : "NOR"}
                    </Badge>
                    <span className="text-xs text-muted-foreground hidden sm:inline">
                      Entrada: {formatTime(s.horarioEntrada)}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => openJustificativaDialog(s.id, s.numero, "pular")}
                      title="Pular"
                    >
                      <SkipForward className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => openJustificativaDialog(s.id, s.numero, "cancelar")}
                      title="Cancelar"
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Justificativa Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">
              {dialogAcao === "cancelar" ? "Cancelar" : "Pular"} Senha {dialogSenhaNumero}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Informe a justificativa para {dialogAcao === "cancelar" ? "o cancelamento" : "pular"} desta senha.
              Essa informação será registrada nos relatórios.
            </p>
            <Textarea
              placeholder="Ex: Cliente não compareceu, documentação incompleta..."
              value={justificativa}
              onChange={(e) => setJustificativa(e.target.value)}
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Voltar
            </Button>
            <Button
              onClick={confirmarAcao}
              disabled={!justificativa.trim()}
              className={dialogAcao === "cancelar" ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : "bg-accent text-accent-foreground hover:bg-accent/90"}
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminFila;

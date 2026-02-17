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
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground">Gerenciar Fila</h2>
        <div className="flex items-center gap-2">
          <Select value={tipoNovaSenha} onValueChange={(v) => setTipoNovaSenha(v as TipoSenha)}>
            <SelectTrigger className="w-32 sm:w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="preferencial">Preferencial</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => gerarSenha(tipoNovaSenha)} className="bg-accent text-accent-foreground hover:bg-accent/90 text-sm">
            <Plus className="h-4 w-4 mr-1" /> Gerar
          </Button>
        </div>
      </div>

      {/* Chamar próxima */}
      <Card className="border-accent">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
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
              className="bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto"
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
          <CardHeader className="pb-3">
            <CardTitle className="font-display text-lg">Em Atendimento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {atendendo.map((s) => (
                <div key={s.id} className="rounded-lg border bg-accent/5 p-3 sm:p-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap min-w-0">
                      <span className="font-display text-lg sm:text-xl font-bold text-accent">{s.numero}</span>
                      <Badge variant={s.tipo === "preferencial" ? "default" : "secondary"} className="text-xs">
                        {s.tipo === "preferencial" ? "PREF" : "NOR"}
                      </Badge>
                      <span className="text-xs text-muted-foreground hidden sm:inline">
                        Chamado às {formatTime(s.horarioChamada!)}
                      </span>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <Button size="sm" variant="outline" onClick={() => finalizarSenha(s.id)} className="text-xs px-2 sm:px-3">
                        <CheckCircle className="h-4 w-4 sm:mr-1" />
                        <span className="hidden sm:inline">Finalizar</span>
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => openJustificativaDialog(s.id, s.numero, "pular")} title="Pular" className="h-8 w-8">
                        <SkipForward className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => openJustificativaDialog(s.id, s.numero, "cancelar")} title="Cancelar" className="text-destructive hover:text-destructive h-8 w-8">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 sm:hidden">
                    Chamado às {formatTime(s.horarioChamada!)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Fila de espera */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="font-display text-lg">
            Fila de Espera ({aguardando.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {aguardando.length === 0 ? (
            <p className="text-center text-muted-foreground py-6 sm:py-8">Nenhuma senha na fila.</p>
          ) : (
            <div className="space-y-2">
              {aguardando.map((s, i) => (
                <div key={s.id} className="flex items-center justify-between rounded-lg border p-2.5 sm:p-3">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <span className="text-sm text-muted-foreground w-5 sm:w-6 shrink-0">{i + 1}º</span>
                    <span className="font-display font-bold text-foreground">{s.numero}</span>
                    <Badge variant={s.tipo === "preferencial" ? "default" : "secondary"} className="text-xs">
                      {s.tipo === "preferencial" ? "PREF" : "NOR"}
                    </Badge>
                    <span className="text-xs text-muted-foreground hidden sm:inline">
                      Entrada: {formatTime(s.horarioEntrada)}
                    </span>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button size="icon" variant="ghost" onClick={() => openJustificativaDialog(s.id, s.numero, "pular")} title="Pular" className="h-8 w-8">
                      <SkipForward className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => openJustificativaDialog(s.id, s.numero, "cancelar")} title="Cancelar" className="text-destructive hover:text-destructive h-8 w-8">
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
        <DialogContent className="max-w-[95vw] sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display">
              {dialogAcao === "cancelar" ? "Cancelar" : "Pular"} Senha {dialogSenhaNumero}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Informe a justificativa para {dialogAcao === "cancelar" ? "o cancelamento" : "pular"} desta senha.
            </p>
            <Textarea
              placeholder="Ex: Cliente não compareceu, documentação incompleta..."
              value={justificativa}
              onChange={(e) => setJustificativa(e.target.value)}
              rows={3}
            />
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)} className="w-full sm:w-auto">
              Voltar
            </Button>
            <Button
              onClick={confirmarAcao}
              disabled={!justificativa.trim()}
              className={`w-full sm:w-auto ${dialogAcao === "cancelar" ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : "bg-accent text-accent-foreground hover:bg-accent/90"}`}
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

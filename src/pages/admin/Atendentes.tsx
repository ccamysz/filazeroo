import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useFilaManager } from "@/hooks/useFilaManager";
import { Plus, UserPlus, Briefcase } from "lucide-react";

const CARGOS = [
  "Atendente Geral",
  "Atendente Preferencial",
  "Recepcionista",
  "Caixa",
  "Supervisor",
  "Gerente de Atendimento",
  "Auxiliar Administrativo",
  "Coordenador de Fila",
] as const;

const AdminAtendentes = () => {
  const { atendentes, toggleAtendente, adicionarAtendente } = useFilaManager();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [novoNome, setNovoNome] = useState("");
  const [novoCargo, setNovoCargo] = useState("");

  const handleAdicionar = () => {
    if (!novoNome.trim() || !novoCargo) return;
    adicionarAtendente(novoNome.trim(), novoCargo);
    setNovoNome("");
    setNovoCargo("");
    setDialogOpen(false);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground">Atendentes</h2>
        <Button
          onClick={() => setDialogOpen(true)}
          className="bg-accent text-accent-foreground hover:bg-accent/90 text-sm"
        >
          <UserPlus className="h-4 w-4 mr-1.5" />
          <span className="hidden sm:inline">Adicionar Funcionário</span>
          <span className="sm:hidden">Adicionar</span>
        </Button>
      </div>

      <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {atendentes.map((a) => (
          <Card key={a.id}>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h3 className="font-display font-semibold text-foreground truncate">{a.nome}</h3>
                  {a.cargo && (
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <Briefcase className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      <span className="text-xs text-muted-foreground truncate">{a.cargo}</span>
                    </div>
                  )}
                  <Badge
                    variant={a.status === "ativo" ? "default" : "secondary"}
                    className="mt-2"
                  >
                    {a.status === "ativo" ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
                <Switch
                  checked={a.status === "ativo"}
                  onCheckedChange={() => toggleAtendente(a.id)}
                  aria-label={`Alternar status de ${a.nome}`}
                  className="shrink-0"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog para adicionar funcionário */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-accent" />
              Novo Funcionário
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome completo</Label>
              <Input
                id="nome"
                placeholder="Ex: Carlos Eduardo"
                value={novoNome}
                onChange={(e) => setNovoNome(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cargo">Cargo / Função</Label>
              <Select value={novoCargo} onValueChange={setNovoCargo}>
                <SelectTrigger id="cargo">
                  <SelectValue placeholder="Selecione o cargo" />
                </SelectTrigger>
                <SelectContent>
                  {CARGOS.map((cargo) => (
                    <SelectItem key={cargo} value={cargo}>
                      {cargo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)} className="w-full sm:w-auto">
              Cancelar
            </Button>
            <Button
              onClick={handleAdicionar}
              disabled={!novoNome.trim() || !novoCargo}
              className="bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-1" />
              Adicionar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminAtendentes;

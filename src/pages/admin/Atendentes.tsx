import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useFilaManager } from "@/hooks/useFilaManager";

const AdminAtendentes = () => {
  const { atendentes, toggleAtendente } = useFilaManager();

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl font-bold text-foreground">Gerenciar Atendentes</h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {atendentes.map((a) => (
          <Card key={a.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-semibold text-foreground">{a.nome}</h3>
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
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminAtendentes;

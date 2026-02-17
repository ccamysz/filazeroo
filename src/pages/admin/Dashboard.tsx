import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, CheckCircle, XCircle } from "lucide-react";
import { useFilaManager } from "@/hooks/useFilaManager";

const AdminDashboard = () => {
  const { aguardando, atendendo, finalizados, cancelados } = useFilaManager();

  const stats = [
    { label: "Aguardando", value: aguardando.length, icon: Users, color: "text-accent" },
    { label: "Atendendo", value: atendendo.length, icon: Clock, color: "text-primary" },
    { label: "Finalizados", value: finalizados.length, icon: CheckCircle, color: "text-success" },
    { label: "Cancelados", value: cancelados.length, icon: XCircle, color: "text-destructive" },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground">Visão Geral</h2>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{s.value}</p>
                </div>
                <s.icon className={`h-8 w-8 ${s.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Fila atual resumida */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display">Fila Atual</CardTitle>
        </CardHeader>
        <CardContent>
          {aguardando.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">Nenhuma senha aguardando.</p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {aguardando.map((s) => (
                <Badge
                  key={s.id}
                  variant={s.tipo === "preferencial" ? "default" : "secondary"}
                  className="text-base px-4 py-2"
                >
                  {s.numero}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Em atendimento */}
      {atendendo.length > 0 && (
        <Card className="border-accent">
          <CardHeader>
            <CardTitle className="font-display text-accent">Em Atendimento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {atendendo.map((s) => (
                <Badge key={s.id} className="bg-accent text-accent-foreground text-base px-4 py-2">
                  {s.numero}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminDashboard;

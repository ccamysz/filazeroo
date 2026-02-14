import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockRelatorioData } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Clock, Users, XCircle } from "lucide-react";

const AdminRelatorios = () => {
  const { atendimentosPorHora, tempoMedioEspera, totalAtendimentos, totalCancelados } = mockRelatorioData;

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl font-bold text-foreground">Relatórios</h2>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-accent" />
            <p className="text-3xl font-bold text-foreground">{totalAtendimentos}</p>
            <p className="text-sm text-muted-foreground">Atendimentos hoje</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="text-3xl font-bold text-foreground">{tempoMedioEspera} min</p>
            <p className="text-sm text-muted-foreground">Tempo médio de espera</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <XCircle className="h-8 w-8 mx-auto mb-2 text-destructive" />
            <p className="text-3xl font-bold text-foreground">{totalCancelados}</p>
            <p className="text-sm text-muted-foreground">Cancelamentos</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-display">Atendimentos por Hora</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={atendimentosPorHora}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(76, 20%, 85%)" />
                <XAxis dataKey="hora" stroke="hsl(113, 9%, 40%)" fontSize={12} />
                <YAxis stroke="hsl(113, 9%, 40%)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0, 0%, 100%)",
                    border: "1px solid hsl(76, 20%, 85%)",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="atendimentos" fill="hsl(113, 9%, 49%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminRelatorios;

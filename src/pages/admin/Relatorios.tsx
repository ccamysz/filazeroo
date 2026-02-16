import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockRelatorioData } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";
import { Clock, Users, XCircle, TrendingUp, DollarSign, Award, SkipForward, FileText } from "lucide-react";

const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const AdminRelatorios = () => {
  const {
    atendimentosPorHora,
    tempoMedioEspera,
    tempoMedioGeral,
    totalAtendimentos,
    totalCancelados,
    totalPulados,
    lucroSemanal,
    lucroMensal,
    lucroAnual,
    mediaSemanal,
    mediaMensal,
    mediaAnual,
    estatisticasAtendentes,
    justificativas,
  } = mockRelatorioData;

  const [periodo, setPeriodo] = useState<"semanal" | "mensal" | "anual">("semanal");

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl font-bold text-foreground">Relatórios</h2>

      {/* KPIs gerais */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-5 text-center">
            <Users className="h-7 w-7 mx-auto mb-2 text-accent" />
            <p className="text-3xl font-bold text-foreground">{totalAtendimentos}</p>
            <p className="text-sm text-muted-foreground">Atendimentos hoje</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 text-center">
            <Clock className="h-7 w-7 mx-auto mb-2 text-primary" />
            <p className="text-3xl font-bold text-foreground">{tempoMedioEspera} min</p>
            <p className="text-sm text-muted-foreground">Tempo médio de espera</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 text-center">
            <XCircle className="h-7 w-7 mx-auto mb-2 text-destructive" />
            <p className="text-3xl font-bold text-foreground">{totalCancelados}</p>
            <p className="text-sm text-muted-foreground">Cancelamentos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 text-center">
            <SkipForward className="h-7 w-7 mx-auto mb-2 text-muted-foreground" />
            <p className="text-3xl font-bold text-foreground">{totalPulados}</p>
            <p className="text-sm text-muted-foreground">Pulados</p>
          </CardContent>
        </Card>
      </div>

      {/* Médias e Lucro por período */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-5 text-center">
            <TrendingUp className="h-7 w-7 mx-auto mb-2 text-accent" />
            <p className="text-2xl font-bold text-foreground">{mediaSemanal}</p>
            <p className="text-xs text-muted-foreground">Média semanal</p>
            <p className="text-lg font-semibold text-accent mt-1">{formatCurrency(lucroSemanal)}</p>
            <p className="text-xs text-muted-foreground">Lucro semanal</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 text-center">
            <TrendingUp className="h-7 w-7 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold text-foreground">{mediaMensal}</p>
            <p className="text-xs text-muted-foreground">Média mensal</p>
            <p className="text-lg font-semibold text-primary mt-1">{formatCurrency(lucroMensal)}</p>
            <p className="text-xs text-muted-foreground">Lucro mensal</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 text-center">
            <DollarSign className="h-7 w-7 mx-auto mb-2 text-accent" />
            <p className="text-2xl font-bold text-foreground">{mediaAnual.toLocaleString("pt-BR")}</p>
            <p className="text-xs text-muted-foreground">Média anual</p>
            <p className="text-lg font-semibold text-accent mt-1">{formatCurrency(lucroAnual)}</p>
            <p className="text-xs text-muted-foreground">Lucro anual</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de atendimentos por hora */}
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

      {/* Desempenho por Atendente com tabs de período */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <CardTitle className="font-display flex items-center gap-2">
            <Award className="h-5 w-5 text-accent" />
            Desempenho por Atendente
          </CardTitle>
          <Tabs value={periodo} onValueChange={(v) => setPeriodo(v as typeof periodo)}>
            <TabsList>
              <TabsTrigger value="semanal">Semanal</TabsTrigger>
              <TabsTrigger value="mensal">Mensal</TabsTrigger>
              <TabsTrigger value="anual">Anual</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground mb-3">
            Tempo médio geral: <strong>{tempoMedioGeral} min</strong> — Atendentes abaixo dessa média recebem bônus de R$ 5,00 por atendimento rápido.
          </p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Atendente</TableHead>
                <TableHead className="text-center">Atendimentos</TableHead>
                <TableHead className="text-center">Tempo Médio</TableHead>
                <TableHead className="text-center">Bônus</TableHead>
                <TableHead className="text-center">Lucro</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {estatisticasAtendentes.map((a) => {
                const periodoData = a[periodo];
                const abaixoMedia = a.tempoMedio < tempoMedioGeral;
                return (
                  <TableRow key={a.id}>
                    <TableCell className="font-medium">{a.nome}</TableCell>
                    <TableCell className="text-center">{periodoData.atendimentos}</TableCell>
                    <TableCell className="text-center">{periodoData.tempoMedio} min</TableCell>
                    <TableCell className="text-center">
                      {abaixoMedia ? (
                        <span className="text-accent font-semibold">{formatCurrency(a.bonus)}</span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center font-semibold">
                      {formatCurrency(periodoData.lucro)}
                    </TableCell>
                    <TableCell className="text-center">
                      {abaixoMedia ? (
                        <Badge className="bg-accent text-accent-foreground">⚡ Acima da média</Badge>
                      ) : (
                        <Badge variant="secondary">Regular</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Gráfico comparativo de atendentes */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display">Comparativo de Tempo Médio por Atendente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={estatisticasAtendentes.map((a) => ({
                  nome: a.nome.split(" ")[0],
                  tempoMedio: a[periodo].tempoMedio,
                  meta: tempoMedioGeral,
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(76, 20%, 85%)" />
                <XAxis dataKey="nome" stroke="hsl(113, 9%, 40%)" fontSize={12} />
                <YAxis stroke="hsl(113, 9%, 40%)" fontSize={12} label={{ value: "min", position: "insideLeft" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0, 0%, 100%)",
                    border: "1px solid hsl(76, 20%, 85%)",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="tempoMedio" name="Tempo Médio" fill="hsl(107, 23%, 67%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="meta" name="Meta" fill="hsl(0, 84%, 60%)" radius={[4, 4, 0, 0]} opacity={0.3} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Registro de justificativas */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2">
            <FileText className="h-5 w-5 text-muted-foreground" />
            Registro de Justificativas
          </CardTitle>
        </CardHeader>
        <CardContent>
          {justificativas.length === 0 ? (
            <p className="text-center text-muted-foreground py-6">Nenhuma justificativa registrada.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Senha</TableHead>
                  <TableHead>Ação</TableHead>
                  <TableHead>Motivo</TableHead>
                  <TableHead>Atendente</TableHead>
                  <TableHead>Data/Hora</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {justificativas.map((j, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{j.senha}</TableCell>
                    <TableCell>
                      <Badge variant={j.acao === "cancelado" ? "destructive" : "secondary"}>
                        {j.acao === "cancelado" ? "Cancelado" : "Pulado"}
                      </Badge>
                    </TableCell>
                    <TableCell>{j.motivo}</TableCell>
                    <TableCell>{j.atendente || "—"}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(j.timestamp).toLocaleString("pt-BR")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminRelatorios;

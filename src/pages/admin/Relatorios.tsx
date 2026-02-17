import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockRelatorioData } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
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
    <div className="space-y-4 sm:space-y-6">
      <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground">Relatórios</h2>

      {/* KPIs gerais */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4 sm:p-5 text-center">
            <Users className="h-6 w-6 sm:h-7 sm:w-7 mx-auto mb-1.5 sm:mb-2 text-accent" />
            <p className="text-2xl sm:text-3xl font-bold text-foreground">{totalAtendimentos}</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Atendimentos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 sm:p-5 text-center">
            <Clock className="h-6 w-6 sm:h-7 sm:w-7 mx-auto mb-1.5 sm:mb-2 text-primary" />
            <p className="text-2xl sm:text-3xl font-bold text-foreground">{tempoMedioEspera} min</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Tempo médio</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 sm:p-5 text-center">
            <XCircle className="h-6 w-6 sm:h-7 sm:w-7 mx-auto mb-1.5 sm:mb-2 text-destructive" />
            <p className="text-2xl sm:text-3xl font-bold text-foreground">{totalCancelados}</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Cancelados</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 sm:p-5 text-center">
            <SkipForward className="h-6 w-6 sm:h-7 sm:w-7 mx-auto mb-1.5 sm:mb-2 text-muted-foreground" />
            <p className="text-2xl sm:text-3xl font-bold text-foreground">{totalPulados}</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Pulados</p>
          </CardContent>
        </Card>
      </div>

      {/* Médias e Lucro por período */}
      <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4 sm:p-5 text-center">
            <TrendingUp className="h-6 w-6 sm:h-7 sm:w-7 mx-auto mb-1.5 sm:mb-2 text-accent" />
            <p className="text-xl sm:text-2xl font-bold text-foreground">{mediaSemanal}</p>
            <p className="text-xs text-muted-foreground">Média semanal</p>
            <p className="text-base sm:text-lg font-semibold text-accent mt-1">{formatCurrency(lucroSemanal)}</p>
            <p className="text-xs text-muted-foreground">Lucro semanal</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 sm:p-5 text-center">
            <TrendingUp className="h-6 w-6 sm:h-7 sm:w-7 mx-auto mb-1.5 sm:mb-2 text-primary" />
            <p className="text-xl sm:text-2xl font-bold text-foreground">{mediaMensal}</p>
            <p className="text-xs text-muted-foreground">Média mensal</p>
            <p className="text-base sm:text-lg font-semibold text-primary mt-1">{formatCurrency(lucroMensal)}</p>
            <p className="text-xs text-muted-foreground">Lucro mensal</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 sm:p-5 text-center">
            <DollarSign className="h-6 w-6 sm:h-7 sm:w-7 mx-auto mb-1.5 sm:mb-2 text-accent" />
            <p className="text-xl sm:text-2xl font-bold text-foreground">{mediaAnual.toLocaleString("pt-BR")}</p>
            <p className="text-xs text-muted-foreground">Média anual</p>
            <p className="text-base sm:text-lg font-semibold text-accent mt-1">{formatCurrency(lucroAnual)}</p>
            <p className="text-xs text-muted-foreground">Lucro anual</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de atendimentos por hora */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="font-display text-base sm:text-lg">Atendimentos por Hora</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-56 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={atendimentosPorHora}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(76, 20%, 85%)" />
                <XAxis dataKey="hora" stroke="hsl(113, 9%, 40%)" fontSize={11} tick={{ fontSize: 10 }} />
                <YAxis stroke="hsl(113, 9%, 40%)" fontSize={11} width={30} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0, 0%, 100%)",
                    border: "1px solid hsl(76, 20%, 85%)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="atendimentos" fill="hsl(113, 9%, 49%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Desempenho por Atendente */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="font-display flex items-center gap-2 text-base sm:text-lg">
              <Award className="h-5 w-5 text-accent" />
              Desempenho por Atendente
            </CardTitle>
            <Tabs value={periodo} onValueChange={(v) => setPeriodo(v as typeof periodo)}>
              <TabsList className="h-8">
                <TabsTrigger value="semanal" className="text-xs px-2.5">Semanal</TabsTrigger>
                <TabsTrigger value="mensal" className="text-xs px-2.5">Mensal</TabsTrigger>
                <TabsTrigger value="anual" className="text-xs px-2.5">Anual</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground mb-3">
            Tempo médio geral: <strong>{tempoMedioGeral} min</strong> — Bônus de R$ 5,00 para quem atende mais rápido.
          </p>
          {/* Mobile: cards; Desktop: table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-muted-foreground">
                  <th className="text-left py-2 font-medium">Atendente</th>
                  <th className="text-center py-2 font-medium">Atend.</th>
                  <th className="text-center py-2 font-medium">Tempo</th>
                  <th className="text-center py-2 font-medium">Bônus</th>
                  <th className="text-center py-2 font-medium">Lucro</th>
                  <th className="text-center py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {estatisticasAtendentes.map((a) => {
                  const periodoData = a[periodo];
                  const abaixoMedia = a.tempoMedio < tempoMedioGeral;
                  return (
                    <tr key={a.id} className="border-b last:border-0">
                      <td className="py-2.5 font-medium">{a.nome}</td>
                      <td className="text-center py-2.5">{periodoData.atendimentos}</td>
                      <td className="text-center py-2.5">{periodoData.tempoMedio} min</td>
                      <td className="text-center py-2.5">
                        {abaixoMedia ? (
                          <span className="text-accent font-semibold">{formatCurrency(a.bonus)}</span>
                        ) : "—"}
                      </td>
                      <td className="text-center py-2.5 font-semibold">{formatCurrency(periodoData.lucro)}</td>
                      <td className="text-center py-2.5">
                        <Badge className={abaixoMedia ? "bg-accent text-accent-foreground" : ""} variant={abaixoMedia ? "default" : "secondary"}>
                          {abaixoMedia ? "⚡ Rápido" : "Regular"}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* Mobile cards */}
          <div className="sm:hidden space-y-3">
            {estatisticasAtendentes.map((a) => {
              const periodoData = a[periodo];
              const abaixoMedia = a.tempoMedio < tempoMedioGeral;
              return (
                <div key={a.id} className="rounded-lg border p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">{a.nome}</span>
                    <Badge className={abaixoMedia ? "bg-accent text-accent-foreground" : ""} variant={abaixoMedia ? "default" : "secondary"}>
                      {abaixoMedia ? "⚡ Rápido" : "Regular"}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Atendimentos:</span>
                      <span className="ml-1 font-semibold">{periodoData.atendimentos}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Tempo:</span>
                      <span className="ml-1 font-semibold">{periodoData.tempoMedio} min</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Bônus:</span>
                      <span className={`ml-1 font-semibold ${abaixoMedia ? "text-accent" : ""}`}>
                        {abaixoMedia ? formatCurrency(a.bonus) : "—"}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Lucro:</span>
                      <span className="ml-1 font-semibold">{formatCurrency(periodoData.lucro)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Gráfico comparativo */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="font-display text-base sm:text-lg">Comparativo de Tempo Médio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={estatisticasAtendentes.map((a) => ({
                  nome: a.nome.split(" ")[0],
                  tempoMedio: a[periodo].tempoMedio,
                  meta: tempoMedioGeral,
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(76, 20%, 85%)" />
                <XAxis dataKey="nome" stroke="hsl(113, 9%, 40%)" fontSize={11} />
                <YAxis stroke="hsl(113, 9%, 40%)" fontSize={11} width={30} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0, 0%, 100%)",
                    border: "1px solid hsl(76, 20%, 85%)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <Bar dataKey="tempoMedio" name="Tempo Médio" fill="hsl(107, 23%, 67%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="meta" name="Meta" fill="hsl(0, 84%, 60%)" radius={[4, 4, 0, 0]} opacity={0.3} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Registro de justificativas */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="font-display flex items-center gap-2 text-base sm:text-lg">
            <FileText className="h-5 w-5 text-muted-foreground" />
            Justificativas
          </CardTitle>
        </CardHeader>
        <CardContent>
          {justificativas.length === 0 ? (
            <p className="text-center text-muted-foreground py-6">Nenhuma justificativa registrada.</p>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-muted-foreground">
                      <th className="text-left py-2 font-medium">Senha</th>
                      <th className="text-left py-2 font-medium">Ação</th>
                      <th className="text-left py-2 font-medium">Motivo</th>
                      <th className="text-left py-2 font-medium">Atendente</th>
                      <th className="text-left py-2 font-medium">Data/Hora</th>
                    </tr>
                  </thead>
                  <tbody>
                    {justificativas.map((j, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="py-2.5 font-medium">{j.senha}</td>
                        <td className="py-2.5">
                          <Badge variant={j.acao === "cancelado" ? "destructive" : "secondary"}>
                            {j.acao === "cancelado" ? "Cancelado" : "Pulado"}
                          </Badge>
                        </td>
                        <td className="py-2.5">{j.motivo}</td>
                        <td className="py-2.5">{j.atendente || "—"}</td>
                        <td className="py-2.5 text-muted-foreground">
                          {new Date(j.timestamp).toLocaleString("pt-BR")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Mobile cards */}
              <div className="sm:hidden space-y-3">
                {justificativas.map((j, i) => (
                  <div key={i} className="rounded-lg border p-3 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{j.senha}</span>
                      <Badge variant={j.acao === "cancelado" ? "destructive" : "secondary"} className="text-xs">
                        {j.acao === "cancelado" ? "Cancelado" : "Pulado"}
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground">{j.motivo}</p>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{j.atendente || "Sem atendente"}</span>
                      <span>{new Date(j.timestamp).toLocaleString("pt-BR")}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminRelatorios;

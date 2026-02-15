import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, User, Clock, Users, Hash, MapPin, Pencil, Save, X, Heart, Landmark, Building, ShoppingCart, GraduationCap, Wrench } from "lucide-react";
import { mockEstabelecimentos, categorias, localidades, type Estabelecimento } from "@/data/mockEstabelecimentos";
import { TipoSenha } from "@/types/queue";
import { useFilaManager } from "@/hooks/useFilaManager";

const categoryIcons: Record<string, React.ElementType> = {
  "Saúde": Heart,
  "Bancos e Lotéricas": Landmark,
  "Atendimentos Municipais": Building,
  "Supermercados": ShoppingCart,
  "Educação": GraduationCap,
  "Serviços Gerais": Wrench,
};

const ClienteDashboard = () => {
  // Account state
  const [editando, setEditando] = useState(false);
  const [dadosCliente, setDadosCliente] = useState({
    nome: "Carlos Pereira",
    telefone: "(11) 98765-4321",
    email: "carlos@email.com",
  });
  const [dadosTemp, setDadosTemp] = useState(dadosCliente);

  // Queue state
  const { senhas, gerarSenha, getPosicao, tempoEstimado } = useFilaManager();
  const [minhaSenhaId, setMinhaSenhaId] = useState<string | null>(null);
  const [estabelecimentoAtual, setEstabelecimentoAtual] = useState<Estabelecimento | null>(null);

  // Filters for entering queue
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>("todas");
  const [localidadeSelecionada, setLocalidadeSelecionada] = useState<string>("todas");

  const minhaSenha = minhaSenhaId ? senhas.find((s) => s.id === minhaSenhaId) : null;
  const posicao = minhaSenhaId ? getPosicao(minhaSenhaId) : -1;
  const tempo = minhaSenhaId ? tempoEstimado(minhaSenhaId) : 0;

  const estabelecimentosFiltrados = mockEstabelecimentos.filter((e) => {
    if (categoriaSelecionada !== "todas" && e.categoria !== categoriaSelecionada) return false;
    if (localidadeSelecionada !== "todas" && e.localidade !== localidadeSelecionada) return false;
    return true;
  });

  const handleSalvar = () => {
    setDadosCliente(dadosTemp);
    setEditando(false);
  };

  const handleCancelarEdicao = () => {
    setDadosTemp(dadosCliente);
    setEditando(false);
  };

  const handleEntrarFila = (estabelecimento: Estabelecimento, tipo: TipoSenha) => {
    const nova = gerarSenha(tipo);
    setMinhaSenhaId(nova.id);
    setEstabelecimentoAtual(estabelecimento);
  };

  const handleSairFila = () => {
    setMinhaSenhaId(null);
    setEstabelecimentoAtual(null);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b bg-card/80 backdrop-blur-md">
        <div className="container flex h-14 items-center gap-3">
          <Link to="/" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground font-display font-bold text-sm">
              FZ
            </div>
            <span className="font-display text-lg font-bold text-foreground">Minha Conta</span>
          </div>
        </div>
      </header>

      <main className="container flex-1 py-6">
        <Tabs defaultValue="fila" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="conta">Minha Conta</TabsTrigger>
            <TabsTrigger value="fila">Minha Fila</TabsTrigger>
            <TabsTrigger value="entrar">Entrar em Fila</TabsTrigger>
          </TabsList>

          {/* ===== ABA MINHA CONTA ===== */}
          <TabsContent value="conta">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-display flex items-center gap-2">
                  <User className="h-5 w-5 text-accent" />
                  Meus Dados
                </CardTitle>
                {!editando ? (
                  <Button variant="outline" size="sm" onClick={() => { setDadosTemp(dadosCliente); setEditando(true); }}>
                    <Pencil className="h-4 w-4 mr-1" /> Editar
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleSalvar}>
                      <Save className="h-4 w-4 mr-1" /> Salvar
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleCancelarEdicao}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">Nome</label>
                  {editando ? (
                    <Input value={dadosTemp.nome} onChange={(e) => setDadosTemp({ ...dadosTemp, nome: e.target.value })} />
                  ) : (
                    <p className="text-foreground font-medium">{dadosCliente.nome}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">Telefone</label>
                  {editando ? (
                    <Input value={dadosTemp.telefone} onChange={(e) => setDadosTemp({ ...dadosTemp, telefone: e.target.value })} />
                  ) : (
                    <p className="text-foreground font-medium">{dadosCliente.telefone}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  {editando ? (
                    <Input value={dadosTemp.email} onChange={(e) => setDadosTemp({ ...dadosTemp, email: e.target.value })} />
                  ) : (
                    <p className="text-foreground font-medium">{dadosCliente.email}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ===== ABA MINHA FILA ===== */}
          <TabsContent value="fila">
            {minhaSenha && minhaSenha.status !== "finalizado" && minhaSenha.status !== "cancelado" ? (
              <div className="space-y-4">
                {estabelecimentoAtual && (
                  <Card>
                    <CardContent className="p-4 flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-accent shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground">{estabelecimentoAtual.nome}</p>
                        <p className="text-sm text-muted-foreground">{estabelecimentoAtual.categoria} · {estabelecimentoAtual.localidade}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card className="text-center">
                  <CardContent className="p-8">
                    <Badge variant={minhaSenha.tipo === "preferencial" ? "default" : "secondary"} className="mb-4">
                      {minhaSenha.tipo === "preferencial" ? "Preferencial" : "Normal"}
                    </Badge>
                    <div className="font-display text-6xl font-extrabold text-accent mb-2">
                      {minhaSenha.numero}
                    </div>
                    <Badge
                      variant={minhaSenha.status === "atendendo" ? "default" : "outline"}
                      className="text-sm"
                    >
                      {minhaSenha.status === "aguardando" && "Aguardando"}
                      {minhaSenha.status === "atendendo" && "🔔 É a sua vez!"}
                    </Badge>
                  </CardContent>
                </Card>

                {minhaSenha.status === "aguardando" && (
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-5 text-center">
                        <Users className="h-6 w-6 mx-auto mb-2 text-accent" />
                        <div className="text-2xl font-bold text-foreground">{posicao}º</div>
                        <p className="text-xs text-muted-foreground">Posição na fila</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-5 text-center">
                        <Clock className="h-6 w-6 mx-auto mb-2 text-accent" />
                        <div className="text-2xl font-bold text-foreground">~{tempo} min</div>
                        <p className="text-xs text-muted-foreground">Tempo estimado</p>
                      </CardContent>
                    </Card>
                  </div>
                )}

                <Button variant="destructive" className="w-full" onClick={handleSairFila}>
                  Sair da Fila
                </Button>
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Hash className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">Nenhuma fila ativa</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Você não está em nenhuma fila no momento. Vá para "Entrar em Fila" para escolher um serviço.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* ===== ABA ENTRAR EM FILA ===== */}
          <TabsContent value="entrar">
            <div className="space-y-4">
              {/* Filtros */}
              <Card>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-muted-foreground">Categoria</label>
                      <Select value={categoriaSelecionada} onValueChange={setCategoriaSelecionada}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todas">Todas as categorias</SelectItem>
                          {categorias.map((c) => (
                            <SelectItem key={c} value={c}>{c}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-muted-foreground">Localidade</label>
                      <Select value={localidadeSelecionada} onValueChange={setLocalidadeSelecionada}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todas">Todas as localidades</SelectItem>
                          {localidades.map((l) => (
                            <SelectItem key={l} value={l}>{l}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Lista de estabelecimentos */}
              {estabelecimentosFiltrados.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-muted-foreground">Nenhum estabelecimento encontrado com os filtros selecionados.</p>
                  </CardContent>
                </Card>
              ) : (
                estabelecimentosFiltrados.map((est) => {
                  const Icon = categoryIcons[est.categoria] || Wrench;
                  const tempoEstimadoTotal = est.tempoMedio * est.pessoasNaFila;
                  return (
                    <EstabelecimentoCard
                      key={est.id}
                      estabelecimento={est}
                      Icon={Icon}
                      tempoTotal={tempoEstimadoTotal}
                      disabled={!!minhaSenha && minhaSenha.status !== "finalizado" && minhaSenha.status !== "cancelado"}
                      onEntrar={handleEntrarFila}
                    />
                  );
                })
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

interface EstabelecimentoCardProps {
  estabelecimento: Estabelecimento;
  Icon: React.ElementType;
  tempoTotal: number;
  disabled: boolean;
  onEntrar: (est: Estabelecimento, tipo: TipoSenha) => void;
}

const EstabelecimentoCard = ({ estabelecimento, Icon, tempoTotal, disabled, onEntrar }: EstabelecimentoCardProps) => {
  const [tipoFila, setTipoFila] = useState<TipoSenha>("normal");

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          {/* Info */}
          <div className="flex-1 p-4 space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground leading-tight">{estabelecimento.nome}</h3>
                <p className="text-xs text-muted-foreground">{estabelecimento.categoria} · {estabelecimento.localidade}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1 text-muted-foreground">
                <Users className="h-4 w-4" /> {estabelecimento.pessoasNaFila} pessoas
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-4 w-4" /> ~{estabelecimento.tempoMedio} min/pessoa
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 border-t sm:border-t-0 sm:border-l p-4 bg-muted/30">
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>Espera total: ~{tempoTotal} min</span>
              </div>
              <Select value={tipoFila} onValueChange={(v) => setTipoFila(v as TipoSenha)}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="preferencial">Preferencial</SelectItem>
                </SelectContent>
              </Select>
              <Button
                size="sm"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
                disabled={disabled}
                onClick={() => onEntrar(estabelecimento, tipoFila)}
              >
                Entrar na Fila
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClienteDashboard;

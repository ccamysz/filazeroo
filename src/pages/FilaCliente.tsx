import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Users, Hash, Bell, ArrowLeft } from "lucide-react";
import { useFilaManager } from "@/hooks/useFilaManager";
import { TipoSenha } from "@/types/queue";

const FilaCliente = () => {
  const [searchParams] = useSearchParams();
  const [minhaSenhaId, setMinhaSenhaId] = useState<string | null>(null);
  const [tipoSelecionado, setTipoSelecionado] = useState<TipoSenha>("normal");
  const [notificado, setNotificado] = useState(false);

  const { senhas, gerarSenha, getPosicao, tempoEstimado } = useFilaManager();

  const minhaSenha = minhaSenhaId ? senhas.find((s) => s.id === minhaSenhaId) : null;
  const posicao = minhaSenhaId ? getPosicao(minhaSenhaId) : -1;
  const tempo = minhaSenhaId ? tempoEstimado(minhaSenhaId) : 0;

  // Notification when close to being called
  useEffect(() => {
    if (posicao > 0 && posicao <= 2 && !notificado && minhaSenha?.status === "aguardando") {
      setNotificado(true);
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("FilaZero", { body: "Sua vez está chegando! Prepare-se." });
      }
    }
  }, [posicao, notificado, minhaSenha]);

  const handleEntrarFila = () => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
    const nova = gerarSenha(tipoSelecionado);
    setMinhaSenhaId(nova.id);
    setNotificado(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header simples */}
      <header className="border-b bg-card/80 backdrop-blur-md">
        <div className="container flex h-14 items-center gap-3">
          <Link to="/" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground font-display font-bold">
              FZ
            </div>
            <span className="font-display text-lg font-bold text-foreground">FilaZero</span>
          </div>
        </div>
      </header>

      <main className="container flex-1 py-8">
        {!minhaSenha ? (
          /* Tela de entrada na fila */
          <div className="mx-auto max-w-md">
            <div className="text-center mb-8">
              <h1 className="font-display text-3xl font-bold text-foreground">Entrar na Fila</h1>
              <p className="mt-2 text-muted-foreground">
                Escolha o tipo de atendimento e entre na fila virtual.
              </p>
            </div>

            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Tipo de atendimento</label>
                  <Select value={tipoSelecionado} onValueChange={(v) => setTipoSelecionado(v as TipoSenha)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="preferencial">Preferencial (Idosos, Gestantes, PcD)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleEntrarFila}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-6"
                >
                  Entrar na Fila
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Pessoas na fila agora: {senhas.filter((s) => s.status === "aguardando").length}
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Tela de acompanhamento */
          <div className="mx-auto max-w-md space-y-6">
            <div className="text-center">
              <h1 className="font-display text-2xl font-bold text-foreground">Sua Senha</h1>
            </div>

            {/* Senha card */}
            <Card className="text-center">
              <CardContent className="p-8">
                <Badge
                  variant={minhaSenha.tipo === "preferencial" ? "default" : "secondary"}
                  className="mb-4"
                >
                  {minhaSenha.tipo === "preferencial" ? "Preferencial" : "Normal"}
                </Badge>
                <div className="font-display text-6xl font-extrabold text-accent mb-2">
                  {minhaSenha.numero}
                </div>
                <Badge
                  variant={
                    minhaSenha.status === "atendendo"
                      ? "default"
                      : minhaSenha.status === "finalizado"
                      ? "secondary"
                      : minhaSenha.status === "cancelado"
                      ? "destructive"
                      : "outline"
                  }
                  className="text-sm"
                >
                  {minhaSenha.status === "aguardando" && "Aguardando"}
                  {minhaSenha.status === "atendendo" && "🔔 É a sua vez!"}
                  {minhaSenha.status === "finalizado" && "Finalizado"}
                  {minhaSenha.status === "cancelado" && "Cancelado"}
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

            {minhaSenha.status === "atendendo" && (
              <Card className="border-accent bg-accent/10">
                <CardContent className="p-6 text-center">
                  <Bell className="h-10 w-10 mx-auto mb-3 text-accent animate-bounce" />
                  <h2 className="font-display text-xl font-bold text-foreground">
                    É a sua vez!
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    Dirija-se ao guichê de atendimento.
                  </p>
                </CardContent>
              </Card>
            )}

            {(minhaSenha.status === "finalizado" || minhaSenha.status === "cancelado") && (
              <Button
                onClick={() => {
                  setMinhaSenhaId(null);
                  setNotificado(false);
                }}
                variant="outline"
                className="w-full"
              >
                Entrar na fila novamente
              </Button>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default FilaCliente;

import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, User, Building2 } from "lucide-react";

const Cadastro = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tipo") === "estabelecimento" ? "estabelecimento" : "cliente";

  const [tab, setTab] = useState(initialTab);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  // Cliente fields
  const [nomeCliente, setNomeCliente] = useState("");
  const [telefone, setTelefone] = useState("");
  const [emailCliente, setEmailCliente] = useState("");
  const [senhaCliente, setSenhaCliente] = useState("");
  const [confirmarSenhaCliente, setConfirmarSenhaCliente] = useState("");

  // Estabelecimento fields
  const [nomeEstab, setNomeEstab] = useState("");
  const [nomeFantasia, setNomeFantasia] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [segmento, setSegmento] = useState("");
  const [emailEstab, setEmailEstab] = useState("");
  const [senhaEstab, setSenhaEstab] = useState("");
  const [confirmarSenhaEstab, setConfirmarSenhaEstab] = useState("");

  const handleClienteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    if (senhaCliente.length < 6) { setErro("A senha deve ter pelo menos 6 caracteres."); return; }
    if (senhaCliente !== confirmarSenhaCliente) { setErro("As senhas não coincidem."); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); window.location.href = "/login"; }, 1000);
  };

  const handleEstabSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    if (!segmento) { setErro("Selecione o segmento do estabelecimento."); return; }
    if (senhaEstab.length < 6) { setErro("A senha deve ter pelo menos 6 caracteres."); return; }
    if (senhaEstab !== confirmarSenhaEstab) { setErro("As senhas não coincidem."); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); window.location.href = "/login?tipo=estabelecimento"; }, 1000);
  };

  const formatCnpj = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 14);
    return digits
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const PasswordField = ({ id, value, onChange, placeholder = "Mínimo 6 caracteres" }: {
    id: string; value: string; onChange: (v: string) => void; placeholder?: string;
  }) => (
    <div className="relative">
      <Input id={id} type={showPassword ? "text" : "password"} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} required autoComplete="new-password" />
      <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}>
        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground font-display font-bold text-xl">FZ</div>
            <span className="font-display text-2xl font-bold text-foreground">Fila<span className="text-accent">Zero</span></span>
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="font-display text-2xl">Criar Conta</CardTitle>
            <CardDescription>Escolha seu tipo de cadastro</CardDescription>
          </CardHeader>

          <Tabs value={tab} onValueChange={(v) => { setTab(v); setErro(""); }}>
            <div className="px-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="cliente" className="gap-2"><User className="h-4 w-4" /> Cliente</TabsTrigger>
                <TabsTrigger value="estabelecimento" className="gap-2"><Building2 className="h-4 w-4" /> Estabelecimento</TabsTrigger>
              </TabsList>
            </div>

            {/* Cliente */}
            <TabsContent value="cliente">
              <form onSubmit={handleClienteSubmit}>
                <CardContent className="space-y-4 pt-4">
                  {erro && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive" role="alert">{erro}</div>}
                  <div className="space-y-2">
                    <Label htmlFor="c-nome">Nome completo</Label>
                    <Input id="c-nome" placeholder="Seu nome" value={nomeCliente} onChange={(e) => setNomeCliente(e.target.value)} required autoComplete="name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="c-telefone">Telefone</Label>
                    <Input id="c-telefone" type="tel" placeholder="(11) 99999-9999" value={telefone} onChange={(e) => setTelefone(formatPhone(e.target.value))} required autoComplete="tel" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="c-email">E-mail</Label>
                    <Input id="c-email" type="email" placeholder="seu@email.com" value={emailCliente} onChange={(e) => setEmailCliente(e.target.value)} required autoComplete="email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="c-senha">Senha</Label>
                    <PasswordField id="c-senha" value={senhaCliente} onChange={setSenhaCliente} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="c-confirmar">Confirmar senha</Label>
                    <Input id="c-confirmar" type="password" placeholder="Repita a senha" value={confirmarSenhaCliente} onChange={(e) => setConfirmarSenhaCliente(e.target.value)} required autoComplete="new-password" />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                  <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={loading}>
                    {loading ? "Cadastrando..." : "Cadastrar como Cliente"}
                  </Button>
                  <p className="text-sm text-muted-foreground">Já tem conta? <Link to="/login" className="text-accent hover:underline font-medium">Entrar</Link></p>
                </CardFooter>
              </form>
            </TabsContent>

            {/* Estabelecimento */}
            <TabsContent value="estabelecimento">
              <form onSubmit={handleEstabSubmit}>
                <CardContent className="space-y-4 pt-4">
                  {erro && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive" role="alert">{erro}</div>}
                  <div className="space-y-2">
                    <Label htmlFor="e-responsavel">Nome do responsável</Label>
                    <Input id="e-responsavel" placeholder="Nome completo" value={nomeEstab} onChange={(e) => setNomeEstab(e.target.value)} required autoComplete="name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="e-fantasia">Nome fantasia</Label>
                    <Input id="e-fantasia" placeholder="Nome do estabelecimento" value={nomeFantasia} onChange={(e) => setNomeFantasia(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="e-cnpj">CNPJ</Label>
                    <Input id="e-cnpj" placeholder="00.000.000/0000-00" value={cnpj} onChange={(e) => setCnpj(formatCnpj(e.target.value))} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="e-segmento">Segmento</Label>
                    <Select value={segmento} onValueChange={setSegmento}>
                      <SelectTrigger id="e-segmento"><SelectValue placeholder="Selecione o segmento" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="saude">Saúde</SelectItem>
                        <SelectItem value="bancos">Bancos e Lotéricas</SelectItem>
                        <SelectItem value="municipal">Atendimentos Municipais</SelectItem>
                        <SelectItem value="supermercados">Supermercados</SelectItem>
                        <SelectItem value="educacao">Educação</SelectItem>
                        <SelectItem value="servicos">Serviços Gerais</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="e-email">E-mail corporativo</Label>
                    <Input id="e-email" type="email" placeholder="contato@empresa.com" value={emailEstab} onChange={(e) => setEmailEstab(e.target.value)} required autoComplete="email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="e-senha">Senha</Label>
                    <PasswordField id="e-senha" value={senhaEstab} onChange={setSenhaEstab} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="e-confirmar">Confirmar senha</Label>
                    <Input id="e-confirmar" type="password" placeholder="Repita a senha" value={confirmarSenhaEstab} onChange={(e) => setConfirmarSenhaEstab(e.target.value)} required autoComplete="new-password" />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                  <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={loading}>
                    {loading ? "Cadastrando..." : "Cadastrar Estabelecimento"}
                  </Button>
                  <p className="text-sm text-muted-foreground">Já tem conta? <Link to="/login?tipo=estabelecimento" className="text-accent hover:underline font-medium">Entrar</Link></p>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Cadastro;

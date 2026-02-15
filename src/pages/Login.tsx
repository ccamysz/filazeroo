import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, User, Building2 } from "lucide-react";

const Login = () => {
  const [tab, setTab] = useState("cliente");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      window.location.href = tab === "cliente" ? "/fila" : "/admin";
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground font-display font-bold text-xl">
              FZ
            </div>
            <span className="font-display text-2xl font-bold text-foreground">
              Fila<span className="text-accent">Zero</span>
            </span>
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="font-display text-2xl">Entrar</CardTitle>
            <CardDescription>Escolha seu tipo de acesso</CardDescription>
          </CardHeader>

          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <div className="px-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="cliente" className="gap-2">
                  <User className="h-4 w-4" /> Cliente
                </TabsTrigger>
                <TabsTrigger value="estabelecimento" className="gap-2">
                  <Building2 className="h-4 w-4" /> Estabelecimento
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="cliente">
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="cliente-email">E-mail ou telefone</Label>
                    <Input
                      id="cliente-email"
                      type="text"
                      placeholder="seu@email.com ou (11) 99999-9999"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cliente-senha">Senha</Label>
                    <div className="relative">
                      <Input
                        id="cliente-senha"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                  <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={loading}>
                    {loading ? "Entrando..." : "Entrar como Cliente"}
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Não tem conta?{" "}
                    <Link to="/cadastro" className="text-accent hover:underline font-medium">Cadastre-se</Link>
                  </p>
                </CardFooter>
              </form>
            </TabsContent>

            <TabsContent value="estabelecimento">
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="estab-email">E-mail corporativo</Label>
                    <Input
                      id="estab-email"
                      type="email"
                      placeholder="contato@empresa.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estab-senha">Senha</Label>
                    <div className="relative">
                      <Input
                        id="estab-senha"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                  <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={loading}>
                    {loading ? "Entrando..." : "Entrar como Estabelecimento"}
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Não tem conta?{" "}
                    <Link to="/cadastro?tipo=estabelecimento" className="text-accent hover:underline font-medium">Cadastre-se</Link>
                  </p>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Login;

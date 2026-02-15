import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Clock, Users, BarChart3, Zap, Shield, Bell, Heart, Landmark, Building, ShoppingCart, GraduationCap, Wrench } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const servicos = [
  { icon: Heart, title: "Saúde", description: "Clínicas, hospitais, laboratórios e consultórios." },
  { icon: Landmark, title: "Bancos e Lotéricas", description: "Agências bancárias, casas lotéricas e cooperativas." },
  { icon: Building, title: "Atendimentos Municipais", description: "Prefeituras, secretarias e órgãos públicos." },
  { icon: ShoppingCart, title: "Supermercados", description: "Mercados, padarias e lojas de conveniência." },
  { icon: GraduationCap, title: "Educação", description: "Escolas, universidades e secretarias acadêmicas." },
  { icon: Wrench, title: "Serviços Gerais", description: "Salões, oficinas, cartórios e muito mais." },
];

const features = [
  {
    icon: Clock,
    title: "Fila Virtual",
    description: "Clientes entram na fila pelo celular e acompanham em tempo real sua posição.",
  },
  {
    icon: Users,
    title: "Gestão de Atendimento",
    description: "Organize atendentes, guichês e prioridades de forma simples e eficiente.",
  },
  {
    icon: BarChart3,
    title: "Relatórios e Métricas",
    description: "Acompanhe tempo médio de espera, picos de demanda e produtividade.",
  },
  {
    icon: Zap,
    title: "Atendimento Ágil",
    description: "Reduza o tempo de espera e aumente a satisfação dos clientes.",
  },
  {
    icon: Shield,
    title: "Segurança",
    description: "Dados protegidos com autenticação segura e controle de acesso.",
  },
  {
    icon: Bell,
    title: "Notificações",
    description: "Avise os clientes quando estiver próximo da sua vez de ser atendido.",
  },
];

const steps = [
  { step: "01", title: "Cadastre-se", description: "Crie sua conta em poucos segundos." },
  { step: "02", title: "Entre na fila", description: "Escolha o serviço e entre na fila virtual." },
  { step: "03", title: "Acompanhe", description: "Veja sua posição em tempo real no celular." },
  { step: "04", title: "Seja atendido", description: "Receba a notificação quando for sua vez." },
];

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/30" />
          <div className="container relative py-24 md:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium">
                ✨ Gerenciamento inteligente de filas
              </Badge>
              <h1 className="font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                Chega de esperar.{" "}
                <span className="text-accent">FilaZero</span> resolve.
              </h1>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                Sistema completo para eliminar filas presenciais. Seus clientes entram na fila pelo celular e são atendidos com agilidade e organização.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 text-base" asChild>
                  <Link to="/cadastro">Começar Agora</Link>
                </Button>
                <Button size="lg" variant="outline" className="px-8 text-base" asChild>
                  <a href="#como-funciona">Saiba Mais</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Serviços */}
        <section id="servicos" className="py-20 bg-card">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center mb-14">
              <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
                Para quem é o FilaZero?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Atendemos diversos segmentos que precisam de organização no atendimento.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {servicos.map((s) => (
                <div key={s.title} className="group flex items-start gap-4 rounded-xl border border-border/60 bg-background p-5 transition-shadow hover:shadow-lg">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold text-foreground">{s.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Como Funciona */}
        <section id="como-funciona" className="py-20 bg-card">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center mb-14">
              <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
                Como funciona?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Em 4 passos simples, seus clientes nunca mais perdem tempo em filas.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((s) => (
                <div key={s.step} className="relative text-center group">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground font-display text-xl font-bold transition-transform group-hover:scale-110">
                    {s.step}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recursos */}
        <section id="recursos" className="py-20">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center mb-14">
              <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
                Recursos principais
              </h2>
              <p className="mt-4 text-muted-foreground">
                Tudo o que você precisa para gerenciar filas com excelência.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <Card key={f.title} className="group border-border/60 bg-card transition-shadow hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                      <f.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground">{f.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-accent">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-bold text-accent-foreground sm:text-4xl">
                Pronto para eliminar as filas?
              </h2>
              <p className="mt-4 text-accent-foreground/80">
                Cadastre-se gratuitamente e transforme a experiência de atendimento do seu negócio.
              </p>
              <Button size="lg" className="mt-8 bg-card text-foreground hover:bg-card/90 px-8 text-base" asChild>
                <Link to="/cadastro">Criar Conta Grátis</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;

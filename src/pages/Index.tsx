import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Clock, Users, BarChart3, Zap, Shield, Bell, Heart, Landmark,
  Building, ShoppingCart, GraduationCap, Wrench, ChevronRight,
  CheckCircle2, Star, ArrowRight, Timer, TrendingUp, Smartphone
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useRef, useState, useCallback } from "react";

/* ───── data ───── */

const servicos = [
  { icon: Heart, title: "Saúde", description: "Clínicas, hospitais, laboratórios e consultórios." },
  { icon: Landmark, title: "Bancos e Lotéricas", description: "Agências bancárias, casas lotéricas e cooperativas." },
  { icon: Building, title: "Atendimentos Municipais", description: "Prefeituras, secretarias e órgãos públicos." },
  { icon: ShoppingCart, title: "Supermercados", description: "Mercados, padarias e lojas de conveniência." },
  { icon: GraduationCap, title: "Educação", description: "Escolas, universidades e secretarias acadêmicas." },
  { icon: Wrench, title: "Serviços Gerais", description: "Salões, oficinas, cartórios e muito mais." },
];

const features = [
  { icon: Clock, title: "Fila Virtual", description: "Clientes entram na fila pelo celular e acompanham em tempo real sua posição." },
  { icon: Users, title: "Gestão de Atendimento", description: "Organize atendentes, guichês e prioridades de forma simples e eficiente." },
  { icon: BarChart3, title: "Relatórios e Métricas", description: "Acompanhe tempo médio de espera, picos de demanda e produtividade." },
  { icon: Zap, title: "Atendimento Ágil", description: "Reduza o tempo de espera e aumente a satisfação dos clientes." },
  { icon: Shield, title: "Segurança", description: "Dados protegidos com autenticação segura e controle de acesso." },
  { icon: Bell, title: "Notificações", description: "Avise os clientes quando estiver próximo da sua vez de ser atendido." },
];

const steps = [
  { step: "01", title: "Cadastre-se", description: "Crie sua conta em poucos segundos.", icon: Smartphone },
  { step: "02", title: "Entre na fila", description: "Escolha o serviço e entre na fila virtual.", icon: Users },
  { step: "03", title: "Acompanhe", description: "Veja sua posição em tempo real no celular.", icon: Timer },
  { step: "04", title: "Seja atendido", description: "Receba a notificação quando for sua vez.", icon: CheckCircle2 },
];

const stats = [
  { label: "Clientes atendidos", end: 12480, suffix: "+" },
  { label: "Tempo médio economizado", end: 42, suffix: " min" },
  { label: "Estabelecimentos", end: 350, suffix: "+" },
  { label: "Satisfação", end: 98, suffix: "%" },
];

const testimonials = [
  { name: "Maria Silva", role: "Gerente – Clínica Saúde+", text: "Reduziu 60% do tempo de espera dos nossos pacientes. Os elogios triplicaram!", avatar: "MS", stars: 5 },
  { name: "Carlos Oliveira", role: "Diretor – Banco Central CE", text: "A organização das filas melhorou absurdamente. Nossos clientes adoram.", avatar: "CO", stars: 5 },
  { name: "Ana Beatriz", role: "Coordenadora – Prefeitura", text: "Finalmente um sistema que funciona de verdade. Simples, rápido e eficiente.", avatar: "AB", stars: 5 },
];

const faqs = [
  { q: "O FilaZero é gratuito?", a: "Sim! Oferecemos um plano gratuito com funcionalidades essenciais. Para funcionalidades avançadas, temos planos acessíveis." },
  { q: "Preciso instalar algum aplicativo?", a: "Não! O FilaZero funciona diretamente pelo navegador do celular. Basta acessar o link ou escanear o QR Code." },
  { q: "Como funciona a notificação?", a: "Quando estiver próximo da sua vez, você recebe uma notificação no celular avisando para se dirigir ao local de atendimento." },
  { q: "Posso usar em mais de um estabelecimento?", a: "Sim! Você pode gerenciar múltiplos estabelecimentos e filiais com uma única conta administrativa." },
  { q: "Os dados dos clientes são seguros?", a: "Absolutamente. Utilizamos criptografia de ponta e seguimos as melhores práticas de segurança e LGPD." },
];

/* ───── hooks ───── */

function useAnimateOnScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function useCountUp(end: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, end, duration]);
  return count;
}

/* ───── sub-components ───── */

function FloatingShapes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute -top-10 -left-10 h-72 w-72 rounded-full bg-primary/10 animate-float blur-3xl" />
      <div className="absolute top-1/3 -right-20 h-96 w-96 rounded-full bg-secondary/20 animate-float-slow blur-3xl" />
      <div className="absolute bottom-10 left-1/4 h-48 w-48 rounded-full bg-accent/10 animate-pulse-soft blur-2xl" />
      <div className="absolute top-20 right-1/3 h-4 w-4 rounded-full bg-accent/40 animate-float" />
      <div className="absolute bottom-1/3 left-10 h-3 w-3 rounded-full bg-primary/50 animate-float-slow" />
      <div className="absolute top-1/2 right-10 h-5 w-5 rounded-full bg-secondary/60 animate-float" />
    </div>
  );
}

function AnimatedStat({ label, end, suffix }: { label: string; end: number; suffix: string }) {
  const { ref, isVisible } = useAnimateOnScroll();
  const count = useCountUp(end, 2000, isVisible);
  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl font-extrabold text-accent md:text-5xl">
        {isVisible ? count : 0}{suffix}
      </div>
      <p className="mt-2 text-sm text-muted-foreground font-medium">{label}</p>
    </div>
  );
}

function LiveQueueDemo() {
  const [queue, setQueue] = useState([
    { id: 1, name: "João M.", position: 1, status: "chamando" },
    { id: 2, name: "Ana P.", position: 2, status: "aguardando" },
    { id: 3, name: "Carlos S.", position: 3, status: "aguardando" },
    { id: 4, name: "Lucia F.", position: 4, status: "aguardando" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setQueue(prev => {
        const next = [...prev];
        // cycle: remove first, bump positions, add new at end
        next.shift();
        const newQueue = next.map((p, i) => ({
          ...p,
          position: i + 1,
          status: i === 0 ? "chamando" : "aguardando",
        }));
        const names = ["Pedro R.", "Marta L.", "Felipe G.", "Renata B.", "Diego O.", "Camila V."];
        newQueue.push({
          id: Date.now(),
          name: names[Math.floor(Math.random() * names.length)],
          position: newQueue.length + 1,
          status: "aguardando",
        });
        return newQueue;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto max-w-sm rounded-2xl border border-border/60 bg-card p-5 shadow-xl">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="font-display text-sm font-bold text-foreground">Fila ao vivo – Demo</h4>
        <span className="flex items-center gap-1.5 text-xs text-accent font-semibold">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Tempo real
        </span>
      </div>
      <div className="space-y-2">
        {queue.map((p) => (
          <div
            key={p.id}
            className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-all duration-500 ${
              p.status === "chamando"
                ? "bg-accent/15 border border-accent/30 text-foreground font-semibold"
                : "bg-muted/50 text-muted-foreground"
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-accent">
                {p.position}
              </span>
              {p.name}
            </span>
            {p.status === "chamando" && (
              <Badge className="bg-accent text-accent-foreground text-[10px] px-2 py-0.5 animate-pulse">
                Chamando
              </Badge>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───── main page ───── */

const Index = () => {
  const heroRef = useAnimateOnScroll();
  const servicesRef = useAnimateOnScroll();
  const stepsRef = useAnimateOnScroll();
  const featuresRef = useAnimateOnScroll();
  const testimonialsRef = useAnimateOnScroll();
  const faqRef = useAnimateOnScroll();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <FloatingShapes />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/30" />
          <div ref={heroRef.ref} className="container relative py-20 md:py-28">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className={`transition-all duration-700 ${heroRef.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
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
                <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row">
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 text-base group" asChild>
                    <Link to="/cadastro">
                      Começar Agora
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="px-8 text-base" asChild>
                    <a href="#como-funciona">Saiba Mais</a>
                  </Button>
                </div>
                <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-accent" /> Grátis para começar</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-accent" /> Sem app necessário</span>
                </div>
              </div>

              <div className={`transition-all duration-700 delay-300 ${heroRef.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                <LiveQueueDemo />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-border/60 bg-card py-14">
          <div className="container grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((s) => (
              <AnimatedStat key={s.label} {...s} />
            ))}
          </div>
        </section>

        {/* Serviços */}
        <section id="servicos" className="py-20">
          <div ref={servicesRef.ref} className="container">
            <div className={`mx-auto max-w-2xl text-center mb-14 transition-all duration-600 ${servicesRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <Badge variant="outline" className="mb-4">Segmentos</Badge>
              <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
                Para quem é o FilaZero?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Atendemos diversos segmentos que precisam de organização no atendimento.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {servicos.map((s, i) => (
                <div
                  key={s.title}
                  className={`group flex items-start gap-4 rounded-xl border border-border/60 bg-card p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-default ${
                    servicesRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: servicesRef.isVisible ? `${i * 100}ms` : '0ms' }}
                >
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
          <div ref={stepsRef.ref} className="container">
            <div className={`mx-auto max-w-2xl text-center mb-14 transition-all duration-600 ${stepsRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <Badge variant="outline" className="mb-4">Passo a passo</Badge>
              <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
                Como funciona?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Em 4 passos simples, seus clientes nunca mais perdem tempo em filas.
              </p>
            </div>

            <div className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {/* connecting line */}
              <div className="absolute top-7 left-[10%] right-[10%] hidden h-0.5 bg-gradient-to-r from-primary/20 via-accent/40 to-primary/20 lg:block" />
              {steps.map((s, i) => (
                <div
                  key={s.step}
                  className={`relative text-center group transition-all duration-500 ${
                    stepsRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: stepsRef.isVisible ? `${i * 150}ms` : '0ms' }}
                >
                  <div className="relative z-10 mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground font-display text-xl font-bold shadow-lg transition-all group-hover:scale-110 group-hover:shadow-accent/30 group-hover:shadow-xl">
                    <s.icon className="h-6 w-6" />
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
          <div ref={featuresRef.ref} className="container">
            <div className={`mx-auto max-w-2xl text-center mb-14 transition-all duration-600 ${featuresRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <Badge variant="outline" className="mb-4">Funcionalidades</Badge>
              <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
                Recursos principais
              </h2>
              <p className="mt-4 text-muted-foreground">
                Tudo o que você precisa para gerenciar filas com excelência.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f, i) => (
                <Card
                  key={f.title}
                  className={`group border-border/60 bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                    featuresRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: featuresRef.isVisible ? `${i * 100}ms` : '0ms' }}
                >
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-accent transition-all group-hover:bg-accent group-hover:text-accent-foreground group-hover:scale-110">
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

        {/* Depoimentos */}
        <section className="py-20 bg-card">
          <div ref={testimonialsRef.ref} className="container">
            <div className={`mx-auto max-w-2xl text-center mb-14 transition-all duration-600 ${testimonialsRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <Badge variant="outline" className="mb-4">Depoimentos</Badge>
              <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
                O que nossos clientes dizem
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((t, i) => (
                <Card
                  key={t.name}
                  className={`border-border/60 transition-all duration-500 hover:shadow-lg hover:-translate-y-1 ${
                    testimonialsRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: testimonialsRef.isVisible ? `${i * 150}ms` : '0ms' }}
                >
                  <CardContent className="p-6">
                    <div className="mb-3 flex gap-0.5">
                      {Array.from({ length: t.stars }).map((_, j) => (
                        <Star key={j} className="h-4 w-4 fill-warning text-warning" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed italic">"{t.text}"</p>
                    <div className="mt-5 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground font-display text-sm font-bold">
                        {t.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20">
          <div ref={faqRef.ref} className="container">
            <div className={`mx-auto max-w-2xl text-center mb-14 transition-all duration-600 ${faqRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <Badge variant="outline" className="mb-4">Dúvidas</Badge>
              <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
                Perguntas Frequentes
              </h2>
            </div>
            <div className={`mx-auto max-w-2xl transition-all duration-600 ${faqRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="rounded-xl border border-border/60 bg-card px-5 data-[state=open]:shadow-md transition-shadow"
                  >
                    <AccordionTrigger className="text-left font-display text-sm font-semibold text-foreground hover:no-underline py-4">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden py-20 bg-accent">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-card/5 animate-float blur-2xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-card/5 animate-float-slow blur-2xl" />
          </div>
          <div className="container relative">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-bold text-accent-foreground sm:text-4xl">
                Pronto para eliminar as filas?
              </h2>
              <p className="mt-4 text-accent-foreground/80">
                Cadastre-se gratuitamente e transforme a experiência de atendimento do seu negócio.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" className="bg-card text-foreground hover:bg-card/90 px-8 text-base group" asChild>
                  <Link to="/cadastro">
                    Criar Conta Grátis
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-accent-foreground/30 text-accent-foreground hover:bg-accent-foreground/10 px-8 text-base" asChild>
                  <Link to="/cliente">Ver Demo</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;

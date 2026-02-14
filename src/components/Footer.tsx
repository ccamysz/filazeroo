const Footer = () => {
  return (
    <footer className="border-t bg-card" id="contato">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground font-display font-bold text-lg">
                FZ
              </div>
              <span className="font-display text-xl font-bold text-foreground">
                Fila<span className="text-accent">Zero</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Sistema inteligente de gerenciamento de filas. Menos espera, mais eficiência.
            </p>
          </div>

          <div>
            <h3 className="font-display font-semibold text-foreground mb-3">Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#como-funciona" className="hover:text-foreground transition-colors">Como Funciona</a></li>
              <li><a href="#recursos" className="hover:text-foreground transition-colors">Recursos</a></li>
              <li><a href="#contato" className="hover:text-foreground transition-colors">Contato</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-foreground mb-3">Contato</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>contato@filazero.com</li>
              <li>(00) 0000-0000</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} FilaZero. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

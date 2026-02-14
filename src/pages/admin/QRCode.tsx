import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const AdminQRCode = () => {
  // URL da fila do cliente
  const filaUrl = `${window.location.origin}/fila`;

  const handleDownload = () => {
    const svg = document.querySelector("#qr-code-svg svg") as SVGElement;
    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svg);
    const blob = new Blob([svgStr], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "filazero-qrcode.svg";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl font-bold text-foreground">QR Code</h2>

      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="font-display">QR Code da Fila</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6 p-8">
          <div id="qr-code-svg" className="rounded-xl bg-card p-6 border">
            <QRCodeSVG
              value={filaUrl}
              size={220}
              bgColor="transparent"
              fgColor="hsl(113, 9%, 49%)"
              level="H"
            />
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Link da fila:</p>
            <code className="rounded bg-muted px-3 py-1.5 text-sm font-mono text-foreground">
              {filaUrl}
            </code>
          </div>

          <Button onClick={handleDownload} variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Baixar QR Code
          </Button>

          <p className="text-xs text-center text-muted-foreground max-w-xs">
            Imprima e disponibilize este QR Code no seu estabelecimento. Os clientes poderão escanear para entrar na fila virtual.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminQRCode;

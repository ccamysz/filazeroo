import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import FilaCliente from "./pages/FilaCliente";
import ClienteDashboard from "./pages/ClienteDashboard";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminFila from "./pages/admin/Fila";
import AdminAtendentes from "./pages/admin/Atendentes";
import AdminRelatorios from "./pages/admin/Relatorios";
import AdminQRCode from "./pages/admin/QRCode";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/fila" element={<FilaCliente />} />
          <Route path="/cliente" element={<ClienteDashboard />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="fila" element={<AdminFila />} />
            <Route path="atendentes" element={<AdminAtendentes />} />
            <Route path="relatorios" element={<AdminRelatorios />} />
            <Route path="qrcode" element={<AdminQRCode />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

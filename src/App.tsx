
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import StorePage from "./pages/StorePage";
import SubscriptionsPage from "./pages/SubscriptionsPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentSimulatedPage from "./pages/PaymentSimulatedPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/loja" element={<StorePage />} />
            <Route path="/assinaturas" element={<SubscriptionsPage />} />
            <Route path="/pagamento/:type" element={<CheckoutPage />} />
            <Route path="/pagamento/item/:itemId" element={<CheckoutPage />} />
            <Route path="/pagamento-simulado" element={<PaymentSimulatedPage />} />
            <Route path="/pagamento-sucesso" element={<PaymentSuccessPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

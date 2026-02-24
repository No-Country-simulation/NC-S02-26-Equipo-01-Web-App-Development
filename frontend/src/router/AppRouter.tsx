import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import RootLayout from "@components/layout/RootLayout";
import HomePage from "@/pages/HomePage";
import CancelPage from "@/pages/checkout/CancelPage";
import SuccessPage from "@/pages/checkout/SuccessPage";
import ScrollToTop from "@components/layout/ScrollToTop";
import { TrackingProvider } from "@/providers/TrackingProvider";

function AppRouter() {
  return (
    <TrackingProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/checkout/success" element={<SuccessPage />} />
            <Route path="/checkout/cancel" element={<CancelPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrackingProvider>
  );
}

export default AppRouter;

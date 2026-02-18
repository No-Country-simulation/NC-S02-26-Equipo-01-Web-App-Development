import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import RootLayout from "@components/layout/RootLayout";
import HomePage from "@/pages/HomePage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;

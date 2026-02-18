import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * Hook para hacer scroll suave a una sección cuando la URL tiene un hash
 * Ejemplo: /home#app-section-pricing
 */
export function useScrollToSection() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const sectionId = hash.replace("#", "");
      const element = document.getElementById(sectionId);

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [hash]);
}

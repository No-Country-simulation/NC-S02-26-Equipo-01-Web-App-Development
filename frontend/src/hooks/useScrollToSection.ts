import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * Hook para hacer scroll suave a una sección cuando la URL tiene un hash
 * Ejemplo: /home#app-section-pricing
 */
const useScrollToSection = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const sectionId = hash.replace("#", "");
    const section = document.getElementById(sectionId);

    if (!section) return;

    const navbarOffset = 80;
    let y: number;

    if (sectionId === "app-section-pricing") {
      // Centrado exacto
      y =
        section.getBoundingClientRect().top +
        15 +
        window.pageYOffset -
        window.innerHeight / 2 +
        section.offsetHeight / 2;
    } else {
      // Scroll normal con offset navbar
      y =
        section.getBoundingClientRect().top + window.pageYOffset - navbarOffset;
    }

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  }, [hash]);
};

export const handleNavigation = (
  e: React.MouseEvent<HTMLAnchorElement>,
  closable?: () => void,
) => {
  e.preventDefault();
  closable?.();
  const section = document.getElementById("app-section-pricing");
  if (section) {
    const y =
      section.getBoundingClientRect().top +
      15 +
      window.pageYOffset -
      window.innerHeight / 2 +
      section.offsetHeight / 2;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
    window.history.pushState(null, "", "#app-section-pricing");
  }
};

export default useScrollToSection;

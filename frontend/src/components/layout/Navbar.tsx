import { useState } from "react";
import logoTax from "@assets/img/logo_taxServices.png";

const Navbar = ({ dataTestId = "navbar" }: { dataTestId?: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav data-testid={dataTestId} className="fixed w-full z-50 bg-white backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center">
          <div className="flex items-center shrink-0">
            <img src={logoTax} className="w-8" alt="Tax Services Logo" />
            <span className="ml-2 text-xl font-extrabold text-primary-hover">
              TAX
              <span className="text-primary-hover font-light ">Services</span>
            </span>
          </div>

          <div className="hidden md:flex items-center flex-1 justify-center gap-8">
            <a href="#app-section-services" data-testid="nav-link-services" className="nav-link">
              Services
            </a>
            <a href="#app-section-steps" data-testid="nav-link-how" className="nav-link">
              How it Works
            </a>
            <a href="#app-section-pricing" data-testid="nav-link-pricing" className="nav-link">
              Pricing
            </a>
            <a href="#app-section-faq" data-testid="nav-link-faq" className="nav-link">
              FAQ
            </a>
          </div>

          <div className="md:hidden flex flex-1 items-center justify-end">
            <button
              data-testid="nav-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 p-4 gap-4 flex flex-col">
          <a href="#app-section-services" data-testid="nav-link-services-mobile" className="block nav-link" onClick={() => setIsOpen(false)}>
            Services
          </a>
          <a href="#app-section-steps" data-testid="nav-link-how-mobile" className="block nav-link" onClick={() => setIsOpen(false)}>
            How it Works
          </a>
          <a href="#app-section-pricing" data-testid="nav-link-pricing-mobile" className="block nav-link" onClick={() => setIsOpen(false)}>
            Pricing
          </a>
          <a href="#app-section-faq" data-testid="nav-link-faq-mobile" className="block nav-link" onClick={() => setIsOpen(false)}>
            FAQ
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

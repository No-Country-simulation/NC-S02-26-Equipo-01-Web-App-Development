import logoTax from "@assets/img/logo_taxServices.png";

const Header = () => (
  <div className="flex flex-col items-center mt-2">
    <img src={logoTax} className="w-10" alt="Tax Services Logo" />
    <div className="text-xl font-extrabold text-primary-hover">
      TAX
      <span className="font-light">Services</span>
    </div>
  </div>
);

export default Header;

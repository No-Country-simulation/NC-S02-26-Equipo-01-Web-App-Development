import logoTax from "@assets/img/logo_taxServices.png";

const Header = (props: { dataTestId?: string }) => (
  <div
    className="flex flex-col items-center mt-2"
    data-testid={props.dataTestId}
  >
    <img src={logoTax} className="w-10" alt="Tax Services Logo" />
    <div className="text-xl font-extrabold text-primary-hover">
      TAX
      <span className="font-light">Services</span>
    </div>
  </div>
);

export default Header;

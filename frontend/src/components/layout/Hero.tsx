import heroImage from "@assets/img/Hero.jpg";
import Button from "../common/Button";

const Hero = ({ dataTestId = "hero" }: { dataTestId?: string }) => {
  return (
    <section
      data-testid={dataTestId}
      className="relative py-5 text-white min-h-150 flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0 bg-black">
        <img
          src={heroImage}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover blur-xs opacity-70"
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-black opacity-80 z-10"></div>
      </div>

      <div className="container mx-auto pt-10 px-4 text-center relative">
        <p className="mb-4 text-sm font-light">
          Trusted by 2.500+ International founders
        </p>
        <h1
          data-testid="hero-title"
          className="text-3xl md:text-5xl font-bold mb-6 tracking-wide"
        >
          From Incorporation to Compliance — All in One Place
        </h1>
        <p className="text-sm md:text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
          Launch and manage your U.S. business with a single trusted team. LLC &
          C-Corp formation, tax filing, and monthly bookkeeping — designed for
          international entrepreneurs.
        </p>

        <Button data-testid="hero-cta-start">
          Start Your U.S. Business Today →
        </Button>

        <Button data-testid="hero-cta-how" isVariant="primary">
          See How it Works
        </Button>

        <ul className="mt-10 mx-auto flex flex-col md:flex-row justify-center gap-5 items-center">
          <li className="text-sm font-bold text-blue-50 whitespace-nowrap">
            <span>✅</span> IRS-Compliant
          </li>
          <li className="text-sm font-bold text-blue-50 whitespace-nowrap">
            <span>🔒</span> Secure Payments via Stripe
          </li>
          <li className="text-sm font-bold text-blue-50 whitespace-nowrap">
            <span>🌐</span> Available World Wide
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Hero;

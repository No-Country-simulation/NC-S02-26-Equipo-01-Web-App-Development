import heroImage from "@assets/img/Hero.jpg";

const Hero = () => {
  return (
    <section className="relative text-white py-20 min-h-150 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover blur-xs opacity-70"
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-black opacity-80 z-10"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative">
        <p className="mb-4 text-sm font-light">
           Trusted by 2.500+ International founders
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-wide">
          From Incorporation to Compliance — All in One Place
        </h1>
        <p className="text-lg md:text-xl mb-8 text-blue-200 max-w-2xl mx-auto">
          Launch and manage your U.S. business with a single trusted team. LLC &
          C-Corp formation, tax filing, and monthly bookkeeping — designed for
          international entrepreneurs.
        </p>
        <a
          href="#services"
          className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all shadow-md"
        >
          Start Your U.S. Business Today →
        </a>
      </div>
    </section>
  );
};

export default Hero;

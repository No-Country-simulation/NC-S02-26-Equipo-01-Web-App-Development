import "./App.css";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/layout/Hero";
import SectionContainer from "./components/layout/SectionContainer";
import Button from "./components/common/Button";

function App() {
  return (
    <div className="min-h-screen min-w-full flex flex-col overflow-x-hidden">
      <header>
        <Navbar dataTestId="app-navbar" />
      </header>
      <main>
        <Hero dataTestId="app-hero"></Hero>
        <SectionContainer
          title="Starting a U.S.Business Shouldn’t Be this hard"
          description="International founders face a fragmented system that wastes time, money and peace of mind."
          dataTestId="app-section-starting-business"
          badge={{ text: "The Problem", icon: "⚠️" }}
        >
          <Button>→ One team. One checkout. Everything handled </Button>
        </SectionContainer>

        <SectionContainer
          title="Everything Your U.S. Business Needs"
          description="Three critical services, one integrated bundle. No gaps, no overlaps, no confusion."
          dataTestId="app-section-everything-business"
          badge={{ text: "OUR SERVICES", icon: "🛡️" }}
        ></SectionContainer>

        <SectionContainer
          title="Three Simple Steps to Get Started"
          description="We've streamlined the entire process so you can go from idea to legally operating U.S. business."
          dataTestId="app-section-three-steps"
          badge={{ text: "How It Works", icon: "🛡️" }}
        ></SectionContainer>

        <SectionContainer
          title="The Smarter Way to Start Your U.S. Business"
          dataTestId="app-section-smarter-way"
          badge={{ text: "Why CorpPath", icon: "⚙️" }}
        ></SectionContainer>

        <SectionContainer
          title="Simple, Transparent Pricing"
          description="Choose the plan that fits your needs. No hidden fees, no surprises."
          dataTestId="app-section-simple-pricing"
          badge={{ text: "Pricing", icon: "📈" }}
        ></SectionContainer>

        <SectionContainer
          title="Trusted by Founders Worldwide"
          dataTestId="app-section-trusted-worldwide"
          badge={{ text: "Testimonials", icon: "💬" }}
        ></SectionContainer>

        <SectionContainer
          title="Frequently Asked Questions"
          description="Everything you need to know about starting your U.S. business."
          dataTestId="app-section-faq"
          badge={{ text: "FAQ", icon: "❓" }}
        ></SectionContainer>
        <SectionContainer
          title="Ready to Launch Your U.S. Business?"
          description="Join 2,500+ international founders who trust CorpPath for their incorporation, tax, and bookkeeping needs. Get started in minutes."
          dataTestId="app-section-ready-launch"
          isDark={true}
        >
          <Button className="mt-4 bg-gold hover:bg-gold-hover">Start Now It Takes 5 minutes →</Button>
          <p className="text-sm text-slate-50 mt-5">
            No credit card required to get started. Secure checkout via Stripe.
          </p>
        </SectionContainer>
      </main>
      <Footer dataTestId="app-footer" />
    </div>
  );
}

export default App;

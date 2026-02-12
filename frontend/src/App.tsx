import "./App.css";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/layout/Hero";
import SectionContainer from "./components/layout/SectionContainer";

function App() {
  return (
    <div className="min-h-screen min-w-full flex flex-col overflow-x-hidden">
      <header>
        <Navbar />
      </header>
      <main>
        <Hero></Hero>
        <SectionContainer
          title="Starting a U.S.Business Shouldn’t Be this hard"
          description="International founders face a fragmented system that wastes time, money and peace of mind."
        ></SectionContainer>

        <SectionContainer
          title="Everything Your U.S. Business Needs"
          description="Three critical services, one integrated bundle. No gaps, no overlaps, no confusion."
        ></SectionContainer>
        <SectionContainer
          title="Three Simple Steps to Get Started"
          description="We've streamlined the entire process so you can go from idea to legally operating U.S. business."
        ></SectionContainer>

        <SectionContainer title="The Smarter Way to Start Your U.S. Business"></SectionContainer>

        <SectionContainer
          title="Simple, Transparent Pricing"
          description="Choose the plan that fits your needs. No hidden fees, no surprises."
        ></SectionContainer>

        <SectionContainer title="Trusted by Founders Worldwide"></SectionContainer>

        <SectionContainer
          title="Frequently Asked Questions"
          description="Everything you need to know about starting your U.S. business."
        ></SectionContainer>
      </main>
      <Footer />
    </div>
  );
}

export default App;

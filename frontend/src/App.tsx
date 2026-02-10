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
          title="Section 1"
          description="This is the first section."
        ></SectionContainer>

        <SectionContainer
          title="Section 2"
          description="This is the second section."
        ></SectionContainer>
        <SectionContainer
          title="Section 3"
          description="This is the third section."
        ></SectionContainer>

        <SectionContainer
          title="Section 4"
          description="This is the fourth section."
        ></SectionContainer>

        <SectionContainer
          title="Section 5"
          description="This is the fifth  section."
        ></SectionContainer>

        <SectionContainer
          title="Section 6"
          description="This is the sixth section."
        ></SectionContainer>
        
        <SectionContainer
          title="Section 7"
          description="This is the seventh section."
        ></SectionContainer>
      </main>
      <Footer />
    </div>
  );
}

export default App;

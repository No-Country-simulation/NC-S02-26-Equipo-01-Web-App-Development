import "./App.css";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import Hero from './components/layout/Hero';

function App() {
  return (
    <div className="min-h-screen min-w-full flex flex-col overflow-x-hidden">
      <header>
        <Navbar />
      </header>
      <main>
         <Hero></Hero>
      </main>
      <Footer />
    </div>
  );
}

export default App; 

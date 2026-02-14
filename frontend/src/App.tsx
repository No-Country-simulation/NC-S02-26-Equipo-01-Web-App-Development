import "./App.css";
import Footer from "@components/layout/Footer";
import Navbar from "@components/layout/Navbar";
import Hero from "@components/layout/Hero";
import SectionContainer from "@components/layout/SectionContainer";
import Button from "@components/common/Button";
import { pricingPlans, smarterWay, theProblems, theServices, threeSteps } from "@data/data";
import Card from "@components/common/Card";

function App() {
  return (
    <>
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
            <div className="flex flex-row gap-6 justify-center mt-10 flex-wrap">
              {theProblems &&
                theProblems.map((problem, index) => (
                  <Card
                    key={index}
                    dataTestId={`app-card-problem-${index}`}
                    data={problem}
                    color="blue"
                  ></Card>
                ))}
            </div>

            <Button className="mt-14">
              → One team. One checkout. Everything handled{" "}
            </Button>
          </SectionContainer>

          <SectionContainer
            title="Everything Your U.S. Business Needs"
            description="Three critical services, one integrated bundle. No gaps, no overlaps, no confusion."
            dataTestId="app-section-everything-business"
            badge={{ text: "OUR SERVICES", icon: "🛡️" }}
            color="blue"
          >
            <div className="flex flex-row gap-6 justify-center mt-10 flex-wrap">
              {theServices &&
                theServices.map((service, index) => (
                  <Card
                    key={index}
                    dataTestId={`app-card-service-${index}`}
                    data={service}
                    color="light"
                  >
                    {service.list && (
                      <ul className="mt-4 list-disc list-inside text-left">
                        {service.list.map((item, idx) => (
                          <li
                            key={idx}
                            data-testid={`app-card-service-${index}-list-item-${idx}`}
                            className="list-none"
                          >
                            <span className="mr-2">✅</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </Card>
                ))}
            </div>
          </SectionContainer>

          <SectionContainer
            title="Three Simple Steps to Get Started"
            description="We've streamlined the entire process so you can go from idea to legally operating U.S. business."
            dataTestId="app-section-three-steps"
            badge={{ text: "How It Works", icon: "🛡️" }}
            color="dark"
          >
            <div className="flex flex-row gap-6 justify-center mt-10 flex-wrap">
              {threeSteps &&
                threeSteps.map((step, index) => (
                  <div key={index} className="relative">
                    <span className="mx-auto w-16 h-16 rounded-full border-4 border-secondary text-white flex items-center justify-center text-2xl font-light tracking-widest">
                      0{index + 1}
                    </span>
                    <Card
                      key={index}
                      dataTestId={`app-card-step-${index}`}
                      data={step}
                      color="transparent"
                    ></Card>
                  </div>
                ))}
            </div>
          </SectionContainer>

          <SectionContainer
            title="The Smarter Way to Start Your U.S. Business"
            dataTestId="app-section-smarter-way"
            badge={{ text: "Why CorpPath", icon: "⚙️" }}
          >
            <div className="flex  gap-6 justify-center mt-10 flex-wrap">
              {smarterWay &&
                smarterWay.map((item, index) => (
                  <Card
                    key={index}
                    dataTestId={`app-card-smarter-way-${index}`}
                    data={item}
                    color="blue"
                    isHorizontal
                  ></Card>
                ))}
            </div>
          </SectionContainer>

          <SectionContainer
            title="Simple, Transparent Pricing"
            description="Choose the plan that fits your needs. No hidden fees, no surprises."
            dataTestId="app-section-simple-pricing"
            badge={{ text: "Pricing", icon: "📈" }}
            color="blue"
          >
            <div className="flex flex-row gap-6 justify-center mt-10 flex-wrap">
              {pricingPlans &&
                pricingPlans.map((service, index) => (
                  <Card
                    key={index}
                    dataTestId={`app-card-pricing-${index}`}
                    data={service}
                    color="light"
                  >
                    {service.list && (
                      <ul className="mt-4 list-disc list-inside text-left">
                        {service.list.map((item, idx) => (
                          <li
                            key={idx}
                            data-testid={`app-card-pricing-${index}-list-item-${idx}`}
                            className="list-none"
                          >
                            <span className="mr-2">✅</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </Card>
                ))}
            </div>
          </SectionContainer>

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
            color="blue"
          ></SectionContainer>
          <SectionContainer
            title="Ready to Launch Your U.S. Business?"
            description="Join 2,500+ international founders who trust CorpPath for their incorporation, tax, and bookkeeping needs. Get started in minutes."
            dataTestId="app-section-ready-launch"
            color="dark"
          >
            <Button className="mt-4 bg-gold hover:bg-gold-hover">
              Start Now It Takes 5 minutes →
            </Button>
            <p className="text-sm text-slate-50 mt-5">
              No credit card required to get started. Secure checkout via
              Stripe.
            </p>
          </SectionContainer>
        </main>
        <Footer dataTestId="app-footer" />
      </div>
    </>
  );
}

export default App;

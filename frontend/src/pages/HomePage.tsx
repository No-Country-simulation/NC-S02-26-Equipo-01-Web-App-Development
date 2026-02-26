import "../App.css";
import { useScrollToSection } from "@hooks/useScrollToSection";
import Navbar from "@components/layout/Navbar";
import Hero from "@components/layout/Hero";
import SectionContainer from "@components/layout/SectionContainer";
import Button from "@components/common/Button";
import {
  faqList,
  pricingPlans,
  smarterWay,
  testimonials,
  theProblems,
  theServices,
  threeSteps,
} from "@data/data";
import Card from "@components/common/Card";
import FAQList from "@components/common/FAQList";
import useCheckout from "@hooks/useCheckout";
import {
  CheckIcon,
  FinanceIcon,
  GroupIcon,
  ManufacturingIcon,
  QuestionIcon,
  SecurityIcon,
  WarningIcon,
} from "@/assets/icons";

export default function HomePage() {
  useScrollToSection();
  const { handleCheckout } = useCheckout();
  return (
    <>
      <header>
        <Navbar dataTestId="app-navbar" />
      </header>
      <main>
        <Hero dataTestId="app-hero"></Hero>
        <SectionContainer
          id="app-section-problems"
          title="Starting a U.S.Business Shouldn’t Be this hard"
          description="International founders face a fragmented system that wastes time, money and peace of mind."
          dataTestId="app-section-starting-business"
          badge={{ text: "The Problem", icon: WarningIcon }}
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

          <Button
            className="mt-14"
            dataTestId="app-button-one-team"
            onClick={() => {
              const pricingSection = document.getElementById(
                "app-section-pricing",
              );
              if (pricingSection) {
                pricingSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            → One team. One checkout. Everything handled{" "}
          </Button>
        </SectionContainer>

        <SectionContainer
          id="app-section-services"
          title="Everything Your U.S. Business Needs"
          description="Three critical services, one integrated bundle. No gaps, no overlaps, no confusion."
          dataTestId="app-section-everything-business"
          badge={{ text: "OUR SERVICES", icon: SecurityIcon }}
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
                  className="text-center"
                >
                  {service.list && (
                    <ul className="mt-4 list-disc list-inside text-left">
                      {service.list.map((item, idx) => (
                        <li
                          key={idx}
                          data-testid={`app-card-service-${index}-list-item-${idx}`}
                          className="list-none inline-flex items-center gap-2 text-sm"
                        >
                          <span>
                            <CheckIcon className="fill-secondary" />
                          </span>
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
          id="app-section-steps"
          title="Three Simple Steps to Get Started"
          description="We've streamlined the entire process so you can go from idea to legally operating U.S. business."
          dataTestId="app-section-three-steps"
          badge={{ text: "How It Works", icon: SecurityIcon }}
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
                    className="text-center"
                  ></Card>
                </div>
              ))}
          </div>
        </SectionContainer>

        <SectionContainer
          id="app-section-why-corppath"
          title="The Smarter Way to Start Your U.S. Business"
          dataTestId="app-section-smarter-way"
          badge={{ text: "Why CorpPath", icon: ManufacturingIcon }}
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
          id="app-section-pricing"
          title="Simple, Transparent Pricing"
          description="Choose the plan that fits your needs. No hidden fees, no surprises."
          dataTestId="app-section-simple-pricing"
          badge={{ text: "Pricing", icon: FinanceIcon }}
          color="blue"
        >
          <div className="flex flex-row gap-6 items-center justify-center mt-10 flex-wrap">
            {pricingPlans &&
              pricingPlans.map((service, index) => (
                <Card
                  key={index}
                  dataTestId={`app-card-pricing-${index}`}
                  data={service}
                  color="light"
                  className={
                    service.title === "Growth" ? "border-2 border-gold" : ""
                  }
                  titleSize="2xl"
                >
                  <p className="mt-4 text-left font-bold text-xs text-text">
                    <span
                      className="text-2xl text-black"
                      data-testid="total-amount-text"
                    >
                      {service.price?.amount}
                    </span>{" "}
                    one-time + <span>${service.price?.PayMonthly}/mo</span>
                  </p>
                  <Button
                    dataTestId={`app-button-pricing-${index}`}
                    className={`w-full mx-auto mt-4 ${service.title === "Growth" ? "bg-gold hover:bg-gold-hover" : "bg-black hover:bg-gray-800"}`}
                    onClick={() =>
                      handleCheckout({
                        plan: service.productId || "",
                      })
                    }
                  >
                    Start Now →
                  </Button>
                  {service.list && (
                    <ul className="mt-4 text-left list-disc list-inside flex flex-col gap-2 mx-auto w-fit">
                      {service.list.map((item, idx) => (
                        <li
                          key={idx}
                          data-testid={`app-card-pricing-${index}-list-item-${idx}`}
                          className="list-none inline-flex items-center gap-2 text-sm"
                        >
                          <span>
                            <CheckIcon
                              className={
                                service.title === "Growth"
                                  ? "fill-gold"
                                  : "fill-secondary"
                              }
                            />
                          </span>
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
          id="app-section-testimonials"
          title="Trusted by Founders Worldwide"
          dataTestId="app-section-trusted-worldwide"
          badge={{ text: "Testimonials", icon: GroupIcon }}
        >
          <div className="flex flex-row flex-wrap gap-6 justify-evenly mt-10">
            {testimonials &&
              testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-4 text-center max-w-xs mx-auto mt-10 py-5 bg-gray-50"
                >
                  <div className="flex gap-1 text-3xl">
                    <span className="text-gold">★</span>
                    <span className="text-gold">★</span>
                    <span className="text-gold">★</span>
                    <span className="text-gold">★</span>
                    <span className="text-gray-300">★</span>
                  </div>
                  <blockquote className="text-md italic text-gray-800 px-10">
                    “{testimonial.quote}”
                  </blockquote>
                  <div className="flex flex-row items-center gap-2 mt-3">
                    <img
                      src={testimonial.avatar}
                      alt={`${testimonial.name} avatar`}
                      className="w-16 h-16 rounded-full object-cover"
                      data-testid={`app-testimonial-avatar-${index}`}
                    />
                    <div>
                      <h3
                        className="mt-2 text-xl text-left font-bold"
                        data-testid={`app-testimonial-name-${index}`}
                      >
                        {testimonial.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </SectionContainer>

        <SectionContainer
          id="app-section-faq"
          title="Frequently Asked Questions"
          description="Everything you need to know about starting your U.S. business."
          dataTestId="app-section-faq"
          badge={{ text: "FAQ", icon: QuestionIcon }}
          color="blue"
        >
          <FAQList FAQs={faqList}></FAQList>
        </SectionContainer>
        <SectionContainer
          id="app-section-cta"
          title="Ready to Launch Your U.S. Business?"
          description="Join 2,500+ international founders who trust CorpPath for their incorporation, tax, and bookkeeping needs. Get started in minutes."
          dataTestId="app-section-ready-launch"
          color="dark"
        >
          <Button
            className="mt-4 bg-gold hover:bg-gold-hover"
            dataTestId="app-button-cta"
          >
            Start Now It Takes 5 minutes →
          </Button>
          <p
            className="text-sm text-slate-50 mt-5"
            data-testid="app-text-cta-disclaimer"
          >
            No credit card required to get started. Secure checkout via Stripe.
          </p>
        </SectionContainer>
      </main>
    </>
  );
}

import type {
  Problem,
  Service,
  ICard,
  FAQItemProps,
  Testimonial,
} from "../types";

export const theProblems: Problem[] = [
  {
    title: "Complex Legal Requirements",
    description:
      "U.S. tax law and compliance rules are difficult to navigate — especially for founders based outside the United States.",
    icon: "declaration-icon.png",
  },
  {
    title: "Too Many Providers",
    description:
      "Juggling multiple vendors for incorporation, taxes, and bookkeeping leads to confusion, miscommunication, and missed deadlines.",
    icon: "fragmented-icon.png",
  },
  {
    title: "Hidden Fees & Surprises",
    description:
      "Unclear pricing from multiple services means unexpected costs that eat into your business budget every quarter.",
    icon: "hidden-fees-icon.png",
  },
];

export const theServices: Service[] = [
  {
    title: "Incorporation",
    description: "LLC & C-Corp Formation",
    icon: "incorporation-icon.png",
    list: [
      "Entity selection guidance",
      "State filing & registration",
      "EIN (Tax ID) obtainment",
      "Registered agent service",
      "Operating agreement drafting",
    ],
  },
  {
    title: "Tax & Compliance",
    description: "Stay Compliant Year-Round",
    icon: "tax-icon.png",
    list: [
      "Federal & state tax filing",
      "Annual report preparation",
      "Sales tax registration",
      "ITIN assistance for non-residents",
      "Quarterly estimated taxes",
    ],
  },
  {
    title: "Monthly Bookkeeping",
    description: "Clean Books, Always",
    icon: "bookkeeping-icon.png",
    list: [
      "Monthly reconciliation",
      "Financial statements",
      "Expense categorization",
      "Dedicated bookkeeper",
      "Real-time dashboard access",
    ],
  },
];

export const threeSteps = [
  {
    title: "Choose Your Entity",
    description:
      "Select between an LLC or C-Corp based on your business goals. Our team will guide you through the best option for your situation.",
    icon: "entity-icon.png",
  },
  {
    title: "We Incorporate & Set Up Compliance",
    description:
      "We handle all the paperwork — state filing, EIN, registered agent, operating agreements, and initial compliance setup.",
    icon: "hands-icon.png",
  },
  {
    title: "Ongoing Tax & Bookkeeping Support",
    description:
      "From day one, your books are maintained and taxes are filed on time. Focus on growth while we handle the numbers.",
    icon: "focus-icon.png",
  },
];

export const smarterWay: ICard[] = [
  {
    title: "Complex Legal Requirements",
    description:
      "U.S. tax law and compliance rules are difficult to navigate — especially for founders based outside the United States.",
    icon: "all-in-one-icon.png",
  },
  {
    title: "Complex Legal Requirements",
    description:
      "U.S. tax law and compliance rules are difficult to navigate — especially for founders based outside the United States.",
    icon: "transparent-icon.png",
  },
  {
    title: "Complex Legal Requirements",
    description:
      "U.S. tax law and compliance rules are difficult to navigate — especially for founders based outside the United States.",
    icon: "expert-support-icon.png",
  },
  {
    title: "Complex Legal Requirements",
    description:
      "U.S. tax law and compliance rules are difficult to navigate — especially for founders based outside the United States.",
    icon: "tailored-icon.png",
  },
];

export const pricingPlans: Service[] = [
  {
    title: "Starter",
    description: "Perfect for solo founders launching their first U.S. entity.",
    price: {
      amount: 499,
      PayMonthly: 150,
    },
    list: [
      "LLC formation in any state",
      "EIN obtainment",
      "Registered agent (1 year)",
      "Operating agreement",
      "Basic tax filing (annual)",
      "Monthly bookkeeping",
      "Email support",
    ],
  },
  {
    title: "Growth",
    description:
      "For scaling businesses that need full-service tax & compliance.",
    price: {
      amount: 899,
      PayMonthly: 299,
    },
    badged: {
      text: "Most Popular",
      color: "gold",
    },
    list: [
      "LLC or C-Corp formation",
      "EIN obtainment",
      "Registered agent (1 year)",
      "Operating agreement",
      "Federal + state tax filing",
      "Quarterly estimated taxes",
      "Monthly bookkeeping + reporting",
      "Sales tax registration",
      "ITIN assistance",
      "Dedicated account manager",
      "Priority support ",
    ],
  },
];

export const faqList: FAQItemProps[] = [
  {
    id: "1",
    question: "Who is this service for?",
    answer:
      "This service is for international founders who want to start and operate a U.S. business without the complexity and legal challenges of navigating U.S. tax and compliance laws on their own.",
  },

  {
    id: "2",
    question: "Do I need to live in the U.S. to form a company?",
    answer:
      "No, you do not need to live in the U.S. to form a U.S. company. Our service is specifically designed for international founders.",
  },
  {
    id: "3",
    question: "How long does incorporation take?",
    answer:
      "Incorporation typically takes 1-2 business days once all required documents are submitted.",
  },
  {
    id: "4",
    question: "What's the difference between an LLC and a C-Corp?",
    answer:
      "An LLC (Limited Liability Company) is a simpler structure with fewer formalities and more flexibility in management and taxation. A C-Corp (Corporation) is a more complex structure that offers greater scalability and is often preferred by investors.",
  },
  {
    id: "5",
    question: "Are there any hidden fees?",
    answer:
      "No, there are no hidden fees. Our pricing is transparent and includes all costs upfront.",
  },
  {
    id: "6",
    question: "Can I cancel the monthly service?",
    answer:
      "Yes, you can cancel the monthly service at any time. We offer a 30-day money-back guarantee.",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Maria G.",
    title: "E-Comerce Founder - México",
    quote: "CorpPath made it incredibly easy to form my LLC from Mexico. I didn't have to worry about a single compliance issue — they handled everything.",
    avatar: "maria-avatar.png",
  },
  {
    name: "Ahmed R.",
    title: "SaaS Founder — UAE",
    quote: "I tried doing it myself and got overwhelmed. CorpPath's team set up my C-Corp, handled my ITIN, and now manages my books monthly. It's seamless.",
    avatar: "ahmed-avatar.png",
  },
  {
    name: "Lena K.",
    title: "Freelance Consultant — Germany",
    quote: "The transparent pricing was a huge plus. No hidden fees, no surprises. I know exactly what I'm paying for and my books are always clean.",
    avatar: "lena-avatar.png",
  },

];

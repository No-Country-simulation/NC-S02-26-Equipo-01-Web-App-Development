import type { Problem, Service, ICard } from "../types";

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

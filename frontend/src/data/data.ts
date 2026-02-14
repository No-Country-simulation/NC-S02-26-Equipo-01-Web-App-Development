import { type Problem, type Service } from "../types";

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

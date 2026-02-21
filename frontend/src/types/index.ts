import type { ComponentType, SVGProps } from "react";

export interface ICard {
  title: string;
  description: string;
  icon?:  ComponentType<SVGProps<SVGSVGElement>>;
  badged?: {
    text: string;
    icon?: ComponentType<SVGProps<SVGSVGElement>>;
    color?: "gold" | "accent";
  };
}

export type Problem = ICard;

export interface Service extends ICard {
  price?: {
    amount: number;
    PayMonthly: number;
  };
  list: string[];
}

export interface Testimonial {
  name: string;
  title: string;
  quote: string;
  avatar: string;
}

export interface FAQItemProps {
  id?: string;
  question: string;
  answer: string;
}

export type PaymentStatus = "loading" | "confirmed" | "error";

export interface CheckoutPayload {
  amount: number;
  plan: string;
}

export interface ICard {
  title: string;
  description: string;
  icon?: string;
  badged?: {
    text: string;
    icon?: string;
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

export interface Card {
  title: string;
  description: string;
  icon: string;
}

export type Problem = Card;

export interface Service extends Card {
  list: string[];
}

export interface Testimonial {
  name: string;
  title: string;
  quote: string;
  avatar: string;
}

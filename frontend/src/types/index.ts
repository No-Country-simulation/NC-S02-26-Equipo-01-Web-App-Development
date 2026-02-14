export interface ICard {
  title: string;
  description: string;
  icon: string;
}

export type Problem = ICard;

export interface Service extends ICard {
  list: string[];
}

export interface Testimonial {
  name: string;
  title: string;
  quote: string;
  avatar: string;
}

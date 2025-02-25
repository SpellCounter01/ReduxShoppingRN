export interface Filters {
  categories: Array<number>;
  name?: string;
  price?: {
    floor: number;
    cieling: number;
  };
  discount: boolean;
}

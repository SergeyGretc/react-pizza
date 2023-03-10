export type CartItem = {
  id: string;
  title: string;
  type: string;
  price: number;
  imageUrl: string;
  size: number;
  count: number;
};

export interface CartSliseState {
  totalPrice: number;
  items: CartItem[];
}

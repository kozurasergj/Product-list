export interface Card {
  id: number,
  imageUrl: string,
  name: string,
  price: string,
  count: number,
  size: {
    width: number,
    height: number
  },
  weight: string,
  comments: Comment[]
}

export interface Comment {
  id: number,
  productId: number,
  description: string,
  date: string,
}

export interface GetCardAction {
  type: string;
  payload: Card[] | [];
}

export type CardAction = GetCardAction;
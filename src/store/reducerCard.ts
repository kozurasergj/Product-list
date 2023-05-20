import { GET, UPDATE_DATA } from './actionTypes';
import { Card, GetCardAction } from '@/interface/interfaces';


const initialState: Card[] | [] = [];

export const reducerCard = (state: Card[] = initialState, action: any) => {
  switch (action.type) {
    case GET:
      return {
        ...state,
        cards: action.payload
      };
    case UPDATE_DATA:
      return {
        ...state,
        cards: action.payload
      };
    default:
      return state;
  }
};

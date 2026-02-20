import { RootState } from 'src/services/store';

export const selectBun = (state: RootState) => state.order.bun;
export const selectIngredients = (state: RootState) => state.order.ingredients;
export const selectOrderStatus = (state: RootState) => state.order.status;
export const selectNewOrderData = (state: RootState) => state.order.orderData;
export const selectProfileOrders = (state: RootState) =>
  state.order.profileOrders;

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store';

export const selectFeeds = (state: RootState) => state.feed.ordersData;
export const selectOrdersAllTime = (state: RootState) =>
  state.feed.ordersData.orders;
export const selectOrderByNumber = createSelector(
  [selectOrdersAllTime, (_: RootState, number: number | null) => number],
  (orders, number) => {
    if (!number) return undefined;
    const currentOrder = orders.find((order) => order.number === number);
    return currentOrder;
  }
);
export const selectFeedStatus = (state: RootState) => state.feed.status;

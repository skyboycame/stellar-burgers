import { TOrdersData } from '@utils-types';
import { feedReducer, fetchFeeds, ininitalFeedState } from './feed-slice';

describe('feed-slice test', () => {
  const initialState: ininitalFeedState = {
    status: 'idle',
    error: null,
    ordersData: {
      orders: [],
      total: 0,
      totalToday: 0
    }
  };

  const mockOrders: TOrdersData = {
    orders: [
      {
        _id: '69987833a64177001b32c9f0',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa094a',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Био-марсианский флюоресцентный астероидный бургер',
        createdAt: '2026-02-20T15:05:23.668Z',
        updatedAt: '2026-02-20T15:05:23.869Z',
        number: 101265
      }
    ],
    total: 1,
    totalToday: 1
  };

  test('изменение status при загрузке заказов pending', () => {
    const action = {
      type: fetchFeeds.pending.type
    };
    const state = feedReducer(initialState, action);
    expect(state.status).toBe('loading');
  });

  test('изменение ordersData при загрузке заказов fulfilled', () => {
    const action = {
      type: fetchFeeds.fulfilled.type,
      payload: mockOrders
    };
    const state = feedReducer(initialState, action);
    expect(state.ordersData).toEqual(mockOrders);
  });
  test('изменение error при загрузке заказов rejected', () => {
    const action = {
      type: fetchFeeds.rejected.type,
      payload: 'ошибка'
    };
    const state = feedReducer(initialState, action);
    expect(state.error).toBe('ошибка');
  });
});

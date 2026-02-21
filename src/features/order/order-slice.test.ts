import {
  addIngredients,
  deleteIngredients,
  moveDownIngredient,
  moveUpIngredient,
  orderReducer,
  orderType
} from './order-slice';

describe('test order-slice', () => {
  const mockIng1 = {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0
  };

  const mockIng2 = {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    __v: 0
  };

  it('добавление в конструктор', () => {
    const initialState: orderType = {
      bun: null,
      ingredients: [],
      status: 'idle',
      error: null,
      orderData: null,
      profileOrders: null
    };
    const state = orderReducer(initialState, addIngredients(mockIng1));
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual(mockIng1);
  });

  it('удаление из конструктора', () => {
    const initialState: orderType = {
      bun: null,
      ingredients: [mockIng1],
      status: 'idle',
      error: null,
      orderData: null,
      profileOrders: null
    };
    const state = orderReducer(initialState, deleteIngredients(mockIng1._id));
    expect(state.ingredients).toHaveLength(0);
  });

  it('изменение в начинке вверх', () => {
    const initialState: orderType = {
      bun: null,
      ingredients: [mockIng1, mockIng2],
      status: 'idle',
      error: null,
      orderData: null,
      profileOrders: null
    };

    const state = orderReducer(initialState, moveUpIngredient(mockIng2._id));
    expect(state.ingredients[0]).toEqual(mockIng2);
    expect(state.ingredients[1]).toEqual(mockIng1);
  });
  it('изменение в начинке вниз', () => {
    const initialState: orderType = {
      bun: null,
      ingredients: [mockIng1, mockIng2],
      status: 'idle',
      error: null,
      orderData: null,
      profileOrders: null
    };

    const state = orderReducer(initialState, moveDownIngredient(mockIng1._id));
    expect(state.ingredients[0]).toEqual(mockIng2);
    expect(state.ingredients[1]).toEqual(mockIng1);
  });
});

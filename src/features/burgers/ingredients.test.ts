import {
  fetchIngredients,
  ingredientsReducer,
  initialStateType
} from './ingredients-slice';

describe('ingredients test', () => {
  const initialState: initialStateType = {
    list: [],
    status: 'idle',
    error: null,
    isLoading: false
  };

  const mockIngs = [
    {
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
    },

    {
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
    }
  ];

  test('изменение isLoading при загрузке ингредиентов', () => {
    const action = {
      type: fetchIngredients.pending.type
    };
    const state = ingredientsReducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  test('изменение list при fulfilled', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngs
    };
    const state = ingredientsReducer(initialState, action);
    expect(state.list).toEqual(mockIngs);
  });

  test('error при rejected', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      payload: 'ошибка'
    };
    const state = ingredientsReducer(initialState, action);
    expect(state.error).toEqual('ошибка');
  });
});

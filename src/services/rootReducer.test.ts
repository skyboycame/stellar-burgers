import { rootReducer } from '@store';

describe('rootReducer init', () => {
  it('проверка rootReducer', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });
    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('order');
    expect(state).toHaveProperty('feed');
    expect(state).toHaveProperty('user');
  });
});

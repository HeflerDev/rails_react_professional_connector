import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import store from '../../store/store';
import Login from '../Login';


describe('when rendering login', () => {
  test('it renders correctly', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <Login />
      </Provider>
    )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

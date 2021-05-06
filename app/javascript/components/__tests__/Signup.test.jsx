import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import store from '../../store/store';
import Signup from '../Signup';

test('when visiting the page', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <Signup />
    </Provider>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

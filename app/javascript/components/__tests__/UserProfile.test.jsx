import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import store from '../../store/store';
import UserProfile from '../UserProfile';

describe('when rendering navbar', () => {
  test('it renders correctly', () => {
    const tree = renderer.create(
      <BrowserRouter>
        <Provider store={store}>
          <UserProfile />
        </Provider>
      </BrowserRouter>
    )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

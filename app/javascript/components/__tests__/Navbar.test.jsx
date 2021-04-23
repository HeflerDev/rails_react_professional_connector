import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import store from '../../store/store';
import Navbar from '../Navbar';

describe('when rendering navbar', () => {
  test('it renders correctly', () => {
    const tree = renderer.create(
      <BrowserRouter>
        <Provider store={store}>
          <Navbar />
        </Provider>
      </BrowserRouter>
    )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

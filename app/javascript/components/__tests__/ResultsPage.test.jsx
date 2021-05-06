import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import store from '../../store/store';
import ResultsPage from '../ResultsPage';

test('it renders correctly', () => {
  const match = {
    params: { id:1 }
  }

  const tree = renderer.create(
    <BrowserRouter>
      <Provider store={store}>
        <ResultsPage match={match} />
      </Provider>
    </BrowserRouter>
  )
    .toJSON();
  expect(tree).toMatchSnapshot();
    
});

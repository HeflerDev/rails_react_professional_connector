import React from 'react';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import store from '../../store/store';
import ProfessionalProfile from '../ProfessionalProfile.jsx';

describe('when rendering the professional profile', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  test('it renders correctly', async () => {
    const match = {
      params: { id:1 }
    }

    await act(async () => {
      render(
        <Provider store={store}>
          <ProfessionalProfile isLoggedIn={false} match={match} />
        </ Provider>,
        container
      );
    });
    expect(container.innerHTML).toMatchSnapshot();
  });
});

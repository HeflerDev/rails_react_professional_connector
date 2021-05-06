import React from 'react';
import renderer from 'react-test-renderer';
import Home from '../Home';

describe('when rendering home', () => {
  test('it renders correctly', () => {
    const tree = renderer.create(<Home />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

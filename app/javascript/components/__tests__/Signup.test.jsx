import React from 'react';
import renderer from 'react-test-renderer';
import Signup from '../Signup';

test('when visiting the page', () => {
  const tree = renderer.create(
    <Signup />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

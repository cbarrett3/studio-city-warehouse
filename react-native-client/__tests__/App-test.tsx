/* eslint-disable prettier/prettier */
import 'react-native';
import React from 'react';
import App from '../App';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders correctly', () => {
   const tree = renderer.create(<App />).toJSON();
   expect(tree).toMatchSnapshot();
 });


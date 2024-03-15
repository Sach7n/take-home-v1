import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {AppProvider, useAppContext} from '../context';

describe('AppProvider', () => {
  test('setCountry updates the value of country', () => {
    const TestComponent = () => {
      const { setCountry, country } = useAppContext();
      return <button 
        onClick={() => setCountry('USA')} aria-label="country-button">{country}</button>;
   };

    const {getByLabelText, getByText } = render(
      <AppProvider>
        <TestComponent />
        </AppProvider>,
    );

    const button = getByLabelText('country-button');
    fireEvent.click(button);
    expect(getByText('USA')).toEqual(expect.anything());
  });
});

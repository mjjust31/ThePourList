import React, { createContext, useContext, useState } from 'react';

// Create the context
const DrinkContext = createContext();

// Custom hook to use the context
export const useDrink = () => useContext(DrinkContext);

// Context Provider Component
export const DrinkProvider = ({ children }) => {
  const [drinkType, setDrinkType] = useState('wine'); // default is wine

  // Function to change drink type
  const changeDrink = (type) => {
    switch (type) {
      case 'wine':
      case 'beer':
      case 'cocktail':
        setDrinkType(type);
        break;
      default:
        console.warn(`Unsupported drink type: ${type}`);
        setDrinkType('wine');
    }
  };

  return (
    <DrinkContext.Provider value={{ drinkType, changeDrink }}>
      {children}
    </DrinkContext.Provider>
  );
};

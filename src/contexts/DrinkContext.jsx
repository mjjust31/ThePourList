import React, { createContext, useContext, useState } from 'react';

// Create the context
const DrinkContext = createContext();

// Custom hook to use the context
export const useDrink = () => useContext(DrinkContext);

// Context Provider Component
export const DrinkProvider = ({ children }) => {
  // Default drink type is 'wine'
  const [drinkType, setDrinkType] = useState('wine');
  
  // State to hold the user's wine collection (or future drink collection)
  const [userWines, setUserWines] = useState([]);

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

  // Function to add a wine to the user's inventory
  const addWineToUserInventory = (newWine) => {
    setUserWines((prevWines) => [...prevWines, newWine]);
  };

  // Provide the context value
  return (
    <DrinkContext.Provider value={{ drinkType, changeDrink, userWines, addWineToUserInventory }}>
      {children}
    </DrinkContext.Provider>
  );
};

// // contexts/PriceFilterContext.js
// import { createContext, useContext, useState } from "react";

// const PriceFilterContext = createContext();

// export const PriceFilterProvider = ({ children }) => {
//   const [selectedPrice, setSelectedPrice] = useState("Under $50"); // Default matches first option

//   // Extract the numeric value (e.g., 50 from "Under $50")
//   const getNumericValue = () => {
//     const match = selectedPrice.match(/\$(\d+)/); // Extract number after $
//     return match ? parseInt(match[1]) : 
//            selectedPrice === "Above $400" ? Infinity : null; // Handle "Above $400"
//   };

//   return (
//     <PriceFilterContext.Provider
//       value={{ selectedPrice, setSelectedPrice, numericValue: getNumericValue() }}
//     >
//       {children}
//     </PriceFilterContext.Provider>
//   );
// };

// export const usePriceFilter = () => useContext(PriceFilterContext);

import {useState, useContext} from 'react'
import { createContext } from 'react';
const PriceFilterContext = createContext();

export const PriceFilterProvider = ({ children }) => {
  const [selectedPrice, setSelectedPrice] = useState("Under $50");

  const getNumericValue = () => {
    const match = selectedPrice.match(/\$(\d+)/);
    return match ? parseInt(match[1]) : selectedPrice === "Above $400" ? 400 : null;
  };

  const getFilterType = () => {
    return selectedPrice.startsWith("Above") ? "above" : "below";
  };

  return (
    <PriceFilterContext.Provider
      value={{
        selectedPrice,
        setSelectedPrice,
        numericValue: getNumericValue(),
        filterType: getFilterType(),
      }}
    >
      {children}
    </PriceFilterContext.Provider>
  );
};

export const usePriceFilter = () => useContext(PriceFilterContext);

// import React from "react";
// import { Accordion, Form } from "react-bootstrap";
// import { location ,Categories, Duration, PriceRange, Ratings} from "../../utils/data";
// import "../Tours/tour.css"
// const Filters = () => {
//   return (
//     <div className="side_bar">
//       <div className="filter_box shadow-sm rounded-2">


//         <Accordion defaultActiveKey="0">
//           <Accordion.Item eventKey="1">
//             <Accordion.Header>Apply Price Filter </Accordion.Header>
//             <Accordion.Body>
//               {PriceRange.map((Price, inx) => {
//                 return (
//                   <Form.Check
//                     key={inx}
//                     type="checkbox"
//                     id={Price}
//                     label={Price}
//                     value={Price}
//                   />
//                 );
//               })}
//             </Accordion.Body>
//           </Accordion.Item>
//         </Accordion>

//         {/* <Accordion defaultActiveKey="0">
//           <Accordion.Item eventKey="1">
//             <Accordion.Header>Rating </Accordion.Header>
//             <Accordion.Body>
//               {Ratings.map((rating, inx) => {
//                 return (
//                   <Form.Check
//                     key={inx}
//                     type="checkbox"
//                     id={rating}
//                     label={rating}
//                     value={rating}
//                   />
//                 );
//               })}
//             </Accordion.Body>
//           </Accordion.Item>
//         </Accordion>
//  */}

//       </div>
//     </div>
//   );
// };

// export default Filters;

// import React, { useState } from "react";
// import { Accordion, Form } from "react-bootstrap";
// import { PriceRange } from "../../utils/data";
// import "../Tours/tour.css";

// const Filters = () => {
//   const [selectedPrices, setSelectedPrices] = useState([PriceRange[0]]); // Initialize with the first option selected

//   const handlePriceChange = (price, isChecked) => {
//     if (isChecked) {
//       setSelectedPrices([...selectedPrices, price]);
//     } else {
//       // Ensure at least one option remains selected
//       if (selectedPrices.length > 1) {
//         setSelectedPrices(selectedPrices.filter(p => p !== price));
//       }
//     }
//   };

//   return (
//     <div className="side_bar">
//       <div className="filter_box shadow-sm rounded-2">
//         <Accordion defaultActiveKey="0">
//           <Accordion.Item eventKey="1">
//             <Accordion.Header>Apply Price Filter</Accordion.Header>
//             <Accordion.Body>
//               {PriceRange.map((price, inx) => {
//                 const isChecked = selectedPrices.includes(price);
//                 const isDisabled = isChecked && selectedPrices.length === 1;
                
//                 return (
//                   <Form.Check
//                     key={inx}
//                     type="checkbox"
//                     id={`price-${inx}`}
//                     label={price}
//                     value={price}
//                     checked={isChecked}
//                     onChange={(e) => handlePriceChange(price, e.target.checked)}
//                     disabled={isDisabled}
//                   />
//                 );
//               })}
//             </Accordion.Body>
//           </Accordion.Item>
//         </Accordion>
//       </div>
//     </div>
//   );
// };

// export default Filters;

// import React, { useState } from "react";
// import { Accordion, Form } from "react-bootstrap";
// import { PriceRange } from "../../utils/data";
// import "../Tours/tour.css";

// const Filters = () => {
//   // Initialize with the first option selected by default
//   const [selectedPrice, setSelectedPrice] = useState(PriceRange[0]);

//   const handlePriceChange = (price) => {
//     setSelectedPrice(price);
//   };

//   return (
//     <div className="side_bar">
//       <div className="filter_box shadow-sm rounded-2">
//         <Accordion defaultActiveKey="0">
//           <Accordion.Item eventKey="1">
//             <Accordion.Header>Apply Price Filter</Accordion.Header>
//             <Accordion.Body>
//               {PriceRange.map((price, inx) => (
//                 <Form.Check
//                   key={inx}
//                   type="radio" // Use radio for single selection
//                   id={`price-${inx}`}
//                   label={price}
//                   value={price}
//                   checked={selectedPrice === price}
//                   onChange={() => handlePriceChange(price)}
//                   name="priceFilter" // Same name groups the radio buttons
//                 />
//               ))}
//             </Accordion.Body>
//           </Accordion.Item>
//         </Accordion>
//       </div>
//     </div>
//   );
// };

// export default Filters;

import React from "react";
import { Accordion, Form } from "react-bootstrap";
import { PriceRange } from "../../utils/data";
import { usePriceFilter } from "../../contexts/PriceFilterContext.js";
import "../Tours/tour.css";

const Filters = () => {
  const { selectedPrice, setSelectedPrice } = usePriceFilter();

  return (
    <div className="side_bar">
      <div className="filter_box shadow-sm rounded-2">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="1">
            <Accordion.Header>Apply Price Filter</Accordion.Header>
            <Accordion.Body>
              {PriceRange.map((price, inx) => (
                <Form.Check
                  key={inx}
                  type="radio"
                  id={`price-${inx}`}
                  label={price}
                  value={price}
                  checked={selectedPrice === price}
                  onChange={() => setSelectedPrice(price)}
                  name="priceFilter"
                />
              ))}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};

export default Filters;
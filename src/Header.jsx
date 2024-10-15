import React from 'react'
import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa';
import { useContext } from 'react';
import DataContext from './context/DataContext';


const Header = ({title}) => {
  const {width} = useContext(DataContext)
  return (
     <header className='Header'>
      <h1>{title}</h1>
      {/* custom hook */}
      {width < 768 ? <FaMobileAlt/>
        : width < 992 ? <FaTabletAlt/>
        : <FaLaptop/>}
     </header>
  )
}

export default Header

// import React from 'react';
// import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa';
// import useWindowSize from './useWindowSize'; // Import the custom hook

// const Header = ({ title }) => {
//   const { width } = useWindowSize(); // Get width from the custom hook

//   return (
//     <header className='Header'>
//       <h1>{title}</h1>
//       {/* custom hook */}
//       {width < 768 ? (
//         <FaMobileAlt />
//       ) : width < 992 ? (
//         <FaTabletAlt />
//       ) : (
//         <FaLaptop />
//       )}
//     </header>
//   );
// };

// export default Header;

import { Box, Container, useToast } from "@chakra-ui/react";
import Header from "../components/Header";
import React, { useEffect } from "react";
import { useRouter } from 'next/router';

// import Link from 'next/link';
import useAuth from "../hooks/useAuth";
import { collection, onSnapshot, query, where, limit } from "firebase/firestore";
import { db } from "../firebase";

const City = () => {
    const [cities, setCities] = React.useState([]);

    const router = useRouter();
    const { name } = router.query;
  
    const { user } = useAuth();
    const toast = useToast();
    const pageName = "YourPageName";

    const refreshData = () => {
      if (!user) {
        setCities([]);
        return;
      }
      const q = query(collection(db, "city"), where("user", "==", user.uid, limit(1)));
  
      onSnapshot(q, (querySnapshot) => {
        let ar = [];
        querySnapshot.docs.forEach((doc) => {
          ar.push({ id: doc.id, ...doc.data() });
        });
        setCities(ar);
      });
    };
  
    useEffect(() => {
      refreshData();
    }, [user]);

  return (
    <Container 
      maxW="full" 
      paddingInlineStart={0}
      paddingInlineEnd={0}
      >
      <Header />
      <Box mt={5}>
      {cities &&
          cities.map((city) => (
      <Container
				maxWidth={1000}
							
			>
                <div>
      <h1>City Details: {city.name}</h1>
        <div>
          {/* <h2>{city.name}</h2> */}
          <p>Temperature: {city.temperature.toFixed(0)}C</p>
          {/* <p>Weather: {details.weather[0].description}</p> */}
          {/* Display other details here */}
        </div>
    </div>
      </Container>
          ))}
    </Box>
    </Container>
  );
};

export default City;



// import React, { useEffect, useState } from 'react';

// const CityDetails: React.FC<{ city: string }> = ({ city }) => {
//   const [details, setDetails] = useState<any>(null);
//   const API_KEY = '7083a084d91791a967f4ec9886fafc6d';

//   useEffect(() => {
//     const fetchCityDetails = async () => {
//       try {
//         const response = await fetch(
//           `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
//         );
//         const data = await response.json();
//         setDetails(data);
//       } catch (error) {
//         console.error('Error fetching city details:', error);
//       }
//     };

//     fetchCityDetails();
//   }, [city]);

//   return (
//     <div>
//       <h1>City Details: {city}</h1>
//       {details && (
//         <div>
//           <h2>{details.name}, {details.sys.country}</h2>
//           <p>Temperature: {details.main.temp}K</p>
//           <p>Weather: {details.weather[0].description}</p>
//           {/* Display other details here */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CityDetails;
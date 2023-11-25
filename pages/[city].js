// pages/[city].js
import { Container } from "@chakra-ui/react";
import Header from "../components/Header";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Heading, Text } from '@chakra-ui/react';

const CityPage = () => {
  const router = useRouter();
  const { city } = router.query;
  const [cityData, setCityData] = useState(null);
  const [unit, setUnit] = useState("C");

  useEffect(() => {

    console.log('router.query:', router.query);
  console.log('city:', city);

    const fetchCityData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7083a084d91791a967f4ec9886fafc6d&units=metric`
        );
        if (response.ok) {
          const data = await response.json();
          setCityData(data);
        } else {
          console.error('Failed to fetch city data');
        }
      } catch (error) {
        console.error('Error fetching city data', error);
      }
    };

    if (city) {
      fetchCityData();
    }
  },
  ); // Include 'city' as a dependency

  if (!cityData) {
    return <div>Loading...</div>;
  }

  return (
    <Container 
      maxW="full" 
      paddingInlineStart={0}
      paddingInlineEnd={0}
      >
      <Header />
      <div>
      <Heading as="h1" fontSize="2xl" mb={4}>
        {cityData.name}
      </Heading>
      <Text fontSize="lg">
        Temperature: {cityData.main.temp.toFixed(0)}{unit}
      </Text>
      {/* Add other details you want to display */}
    </div>
    </Container>
    
  );
};

export default CityPage;
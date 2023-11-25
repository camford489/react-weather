import {
  Badge,
  Box,
  Container,
  Heading,
  Image,
  Link,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { FaTrash } from "react-icons/fa";
import { deleteCity } from "../pages/api/city";

const CityList = () => {
  const [cityNames, setCityNames] = useState([]);
  const [cityData, setCityData] = useState([]);
  const { user } = useAuth();
  const toast = useToast();

  useEffect(() => {
    const fetchCityNames = async () => {
      if (user) {
        const q = query(collection(db, "city"), where("user", "==", user.uid));

        onSnapshot(q, (querySnapshot) => {
          let names = [];
          querySnapshot.docs.forEach((doc) => {
            names.push(doc.data().name);
          });
          setCityNames(names);
        });
      } else {
        setCityNames([]);
      }
    };

    fetchCityNames();
  }, [user]);

  useEffect(() => {
    const fetchCityData = async () => {
      const promises = cityNames.map(async (name) => {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=7083a084d91791a967f4ec9886fafc6d&units=metric`
          );
          if (response.ok) {
            const data = await response.json();
            return { name, ...data.main };
          } else {
            console.error(`Failed to fetch data for ${name}`);
            return null;
          }
        } catch (error) {
          console.error(`Error fetching data for ${name}`, error);
          return null;
        }
      });

      const cityDataArray = await Promise.all(promises);
      setCityData(cityDataArray.filter((data) => data !== null));
    };

    if (cityNames.length > 0) {
      fetchCityData();
    }
  }, [cityNames]);

  const handleCityDelete = async (id) => {
    if (confirm("Are you sure you want to delete this city?")) {
      try {
        deleteCity();
  
        toast({ title: "City deleted successfully", status: "success" });
      } catch (error) {
        console.error("Error deleting city:", error);
        toast({ title: "Error deleting city", status: "error" });
      }
    }
  };

  const unsplashApiKey = 'FJjyqOLdpYlrExNLFUaRAzzQMGxwHRmS9ktmGkCsABo';

  return (
    <Box>
      <Container maxWidth={1000}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
          {cityData.map((city) => (
            <Link href={`/${city.name}`} key={city.name} _hover={{ textDecoration: "none" }}>
              <Box
                bg="lightblue"
                boxShadow="sm"
                transition="0.25s"
                borderRadius="lg"
                overflow="hidden"
                _hover={{
                  backgroundColor: "skyblue",
                  color: "white",
                  transform: "scale(1.075)",
                }}
              >
                <Image 
                src={`https://source.unsplash.com/featured/?${city.name}+nature&client_id=${unsplashApiKey}`}
                alt={`${city.name} Nature`}
                objectFit="cover"
                w="100%"
                h="100px" // Adjust the height as needed
                 />
                <Box p={3}>
                  <Heading as="h3" fontSize="xl">
                    {city.name}
                    <Badge
                      color="red.500"
                      bg="inherit"
                      transition="0.2s"
                      _hover={{
                        bg: "inherit",
                        transform: "scale(1.2)",
                      }}
                      float="right"
                      size="xs"
                    >
                      <FaTrash onClick={() => handleCityDelete(city.name)} alt="Delete City" />
                    </Badge>
                  </Heading>
                  <Text>{city.temp.toFixed(0)}°C</Text>
                </Box>
              </Box>
            </Link>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};
              
export default CityList;
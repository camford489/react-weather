import {
  Badge,
  Box,
  Center,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import Link from 'next/link';
import useAuth from "../hooks/useAuth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import { deleteCity, toggleCityStatus } from "../api/city";
const CityList = () => {
  const [cities, setCities] = React.useState([]);

  const { user } = useAuth();
  const toast = useToast();
  const refreshData = () => {
    if (!user) {
      setCities([]);
      return;
    }
    const q = query(collection(db, "city"), where("user", "==", user.uid));

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

  const handleCityDelete = async (id) => {
    if (confirm("Are you sure you wanna delete this city?")) {
      deleteCity(id);
      toast({ title: "City deleted successfully", status: "success" });
    }
  };

  const handleToggle = async (id, status) => {
    const newStatus = status == "completed" ? "pending" : "completed";
    await toggleCityStatus({ docId: id, status: newStatus });
    toast({
      title: `City marked ${newStatus}`,
      status: newStatus == "completed" ? "success" : "warning",
    });
  };

  return (
    <Box mt={5}>
      <Container
				maxWidth={1000}
							
			>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} >
        {cities &&
          cities.map((city) => (
            <Box
              as='a'
              // cursor='pointer'
              href={city.name}
              key={city.id}
              p={3}
              boxShadow="base"
              shadow={"dark-lg"}
              transition="0.25s"
              _hover={{ boxShadow: "xl", backgroundColor: "skyblue", color:"white", transform: "scale(1.075)" }}
            >
              <div>
              <Heading as="h3" fontSize={"xl"}>
                {city.name}{" "}
                <Badge
                  color="red.500"
                  bg="inherit"
                  transition={"0.2s"}
                  _hover={{
                    bg: "inherit",
                    transform: "scale(1.2)",
                  }}
                  float="right"
                  size="xs"
                  onClick={() => handleCityDelete(city.id)}
                >
                  <FaTrash />
                </Badge>
                
              </Heading>
              <Text>{city.temperature.toFixed(0)}°C</Text>
              </div>
            </Box>
          ))}
      </SimpleGrid>
      </Container>
    </Box>
  );
};

export default CityList;

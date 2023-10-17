import React from "react";
import {
  Box,
  Input,
  Button,
  Textarea,
  Stack,
  Select,
  useToast,
  Heading,
  Badge,
  Text,
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { addCity } from "../pages/api/city";
import { FaTrash } from "react-icons/fa";
import {AiOutlineHeart,AiFillHeart} from 'react-icons/ai'
const AddCity = () => {
  const [name, setName] = React.useState("");
  const [temperature, setTemperature] = React.useState();
  // const [status, setStatus] = React.useState("pending");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);

  const toast = useToast();

  const { isLoggedIn, user } = useAuth();

  const handleCityCreate = async () => {
    if (!isLoggedIn) {
      toast({
        title: "You must be logged in to create a City",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    setIsLoading(true);
    let fetchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=7083a084d91791a967f4ec9886fafc6d&units=metric`
    const response = await fetch(fetchUrl)
    const cityWeather = await response.json()
    if (cityWeather.cod=="404") {
      toast({ title: "City failed successfully", status: "error" });
      setName("");
      setIsLoading(false);
      return
    }
    console.log(cityWeather)
    setTemperature(cityWeather.main.temp)
 
    setIsLoading(false);

    toast({ title: "City searched successfully", status: "success" });
  };
const handleFavorite = async()=>{
  setIsFavorite(true)
  setTimeout(async()=>{

    const city = {
      name,
      temperature,
      userId: user.uid,
    };
    await addCity(city);
     setName("")
  setTemperature(null)
  setIsFavorite(false)
  },1000)
    toast({ title: "City saved successfully", status: "success" });
  // setName("")
  // setTemperature(null)
}
const handleRemover = ()=>{
  setName("")
  setTemperature(null)
}
  return (
    <Box w="40%" margin={"0 auto"} display="block" mt={10}>
      <Stack direction="column"
      >
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Button
          onClick={() => handleTodoCreate()}
          disabled={name.length < 1 || isLoading}
          variantcolor="teal"
          variant="solid"
        >
          Add
        </Button>
      </Stack>
      {
        name !="" && temperature !=null? <div style={{height:"100px"}}>
            <Box
         
              p={3}
              boxShadow="2xl"
              shadow={"dark-lg"}
              transition="0.2s"
              _hover={{ boxShadow: "sm" }}
            >
              <Heading as="h3" fontSize={"xl"}>
                {name}{" "}
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
                  onClick={() => handleFavorite()}
                >
                  {isFavorite?<AiFillHeart />:<AiOutlineHeart />}
                </Badge>
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
                  onClick={() => handleRemover()}
                >
                  <FaTrash />
                </Badge>
                
              </Heading>
              <Text>{temperature.toFixed(0)}°C</Text>
            </Box>
        </div>:<div style={{height:"100px"}}>

        </div>
      }
    </Box>
  );
};

export default AddCity;

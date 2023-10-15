import {
	Box,
	Button,
	Container,
	Flex,
	Heading,
	useColorMode,
	useColorModeValue,
	useDisclosure
} from '@chakra-ui/react';
// import { Link } from 'react-router-dom';
import { useState, useCallback, Link } from "react";
import { FaGoogle, FaMoon, FaSun } from "react-icons/fa";
import Auth from "../components/Auth";


// import DrawerMenu from '../DrawerMenu';

const Header = () => {
	// Mobile Drawer
	// const { isOpen, onOpen, onClose } = useDisclosure();
const { toggleColorMode, colorMode } = useColorMode();
const [temp, setTemp] = useState(20);
  const [unit, setUnit] = useState("C");

  const oppositeUnit = unit === "C" ? "F" : "C";

  const convert = () => {
    if (unit === "C") {
      const newT = temp * 1.8 + 32;
      setTemp(Math.round(newT));
      setUnit(oppositeUnit);
    }

    if (unit === "F") {
      const newT = ((temp - 32) * 5) / 9;
      setTemp(Math.round(newT));
      setUnit(oppositeUnit);
    }
  };

	return (
		<Box
			boxShadow={'md'}
			backgroundColor={useColorModeValue('gray.100', 'gray.900')}
			paddingY={10}
			position={'sticky'}
			top={0}
			maxW={'full'}			
		>			
			<Container
				maxW={'full'}
				as={Flex}
				gap={2}
				alignItems={'center'}
				justifyContent={'space-around'}				
			>
			<Heading as={Link} to={'/'} fontWeight={'bold'} fontSize={'lg'}>
				Test Weather App - React / TypeScript / OpenWeather API
			</Heading>
			<div>
				<p>
					Temperature {temp}º{unit}
				</p>
				{/* {buttonText} {weatherData} */}
				<Button onClick={convert}>
					Convert to º{oppositeUnit}
				</Button>
				<Button onClick={() => toggleColorMode()}>
        		{colorMode == "dark" ? <FaSun /> : <FaMoon />}
      		</Button>
			</div>
      		
			
	  		<Auth />
			</Container>
		</Box>
	);
};

export default Header;
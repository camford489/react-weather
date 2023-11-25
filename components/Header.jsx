import {
	Box,
	Button,
	Container,
	Flex,
	Heading,
	Link,
	useColorMode,
	useColorModeValue,
	useDisclosure
} from '@chakra-ui/react';
import { useState, useCallback } from "react";
import { FaGoogle, FaMoon, FaSun } from "react-icons/fa";
import Auth from "../components/Auth";
import { Pacifico } from 'next/font/google'

const pacifico = Pacifico({
	subsets: ['latin'],
	weight: '400',
  })

const Header = () => {

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
			boxShadow={'sm'}
			bg={'lightblue'}
			paddingY={10}
			position={'sticky'}
			top={0}
			maxW={'full'}	
			py={'5'}		
		>			
			<Container
				maxW={'full'}
				as={Flex}
				gap={2}
				alignItems={'center'}
				justifyContent={'space-around'}				
			>
			<Heading as={Link} href={'./'} fontWeight={'bold'} fontFamily={pacifico.className} fontSize={'4xl' }>
				What's your Weather?
			</Heading>
			{/* <div>
				<p>
					Temperature {temp}º{unit}
				</p>
				
				<Button onClick={convert}>
					Convert to º{oppositeUnit}
				</Button>
				<Button onClick={() => toggleColorMode()}>
        		{colorMode == "dark" ? <FaSun /> : <FaMoon />}
      		</Button>
			</div> */}
      		
			
	  		<Auth />
			</Container>
		</Box>
	);
};

export default Header;
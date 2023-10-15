import { Container } from "@chakra-ui/react";
import Header from "../components/Header";
import AddCity from "../components/AddCity";
import CityList from "../components/CityList";

export default function Home() {
  return (
    <Container 
      maxW="full" 
      paddingInlineStart={0}
      paddingInlineEnd={0}
      >
      <Header />
      <AddCity />
      <CityList />
    </Container>
  );
}

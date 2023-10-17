import { Container } from "@chakra-ui/react";
import Header from "../../components/Header";

export default function AddCity() {
  return (
    <Container 
      maxW="full" 
      paddingInlineStart={0}
      paddingInlineEnd={0}
      >
      <Header />
      <>
      <h1>City Name</h1>
      </>
    </Container>
  );
}
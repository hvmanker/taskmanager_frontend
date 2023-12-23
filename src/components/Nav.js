import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Flex, Heading, Spacer, Button } from "@chakra-ui/react";

const Navbar = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <Flex p="4" bg="teal.500">
      <Heading size="md" color="white">
        Task Manager
      </Heading>
      <Spacer />
      <Button colorScheme="whiteAlpha" mr="4" onClick={() => navigate("/")}>
        Home
      </Button>
      <Button colorScheme="whiteAlpha" onClick={() => navigate("/create")}>
        Create Task
      </Button>
    </Flex>
  );
};

export default Navbar;

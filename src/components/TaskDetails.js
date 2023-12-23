import React from "react";
import { Box, Text, Button } from "@chakra-ui/react";

const TaskDetails = ({ task, onClose }) => {
  return (
    <Box p="4" borderWidth="1px" borderRadius="lg" mb="4">
      <Text fontSize="xl" fontWeight="semibold">
        {task.title}
      </Text>
      <Text mt="2">{task.description}</Text>
      <Button colorScheme="teal" size="sm" mt="2" onClick={onClose}>
        Back to List
      </Button>
    </Box>
  );
};

export default TaskDetails;

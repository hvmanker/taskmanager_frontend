import React, { useState } from "react";
import {
  Box,
  Input,
  Textarea,
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const CreateTask = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const newTask = {
        title,
        description,
      };

      await axios.post(`${process.env.REACT_APP_URL}/tasks/add`, newTask);

      toast({
        title: "Success",
        description: "Task created successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      navigate("/");
    } catch (error) {
      console.error("Error creating task:", error.message);

      setError("Failed to create task. Please try again.");

      toast({
        title: "Error",
        description: "Failed to create task. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box mt="4">
      {error && (
        <Alert status="error" mb="4">
          <AlertIcon />
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <Box p="4" borderWidth="1px" borderRadius="lg">
          <Input
            type="text"
            placeholder="Title"
            size="lg"
            mb="4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Description"
            size="lg"
            mb="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button type="submit" colorScheme="teal" size="md">
            Create Task
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CreateTask;

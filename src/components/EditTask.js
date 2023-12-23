import React, { useState, useEffect } from 'react';
import { Box, Input, Textarea, Button, Alert, AlertIcon } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

const EditTask = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/tasks/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setDescription(response.data.description);
      })
      .catch((error) => {
        console.error('Error fetching task details:', error.message);
        toast({
          title: 'Error',
          description: 'Failed to fetch task details.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  }, [id, toast]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if title and description are provided
    if (!title || !description) {
      setError('Title and description are required.');
      return;
    }

    const updatedTask = {
      title,
      description,
    };

    axios.post(`${process.env.REACT_APP_URL}/tasks/update/${id}`, updatedTask)
      .then((res) => {
        console.log(res.data);
        toast({
          title: 'Success',
          description: 'Task updated successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        navigate('/');
      })
      .catch((error) => {
        console.error('Error updating task:', error.message);
        toast({
          title: 'Error',
          description: 'Failed to update task. Please try again.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
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
            Update Task
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditTask;

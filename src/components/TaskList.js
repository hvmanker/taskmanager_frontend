import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Button,
  Alert,
  AlertIcon,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import TaskDetails from "./TaskDetails";
import { useToast } from "@chakra-ui/react";

const TasksList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const toast = useToast();
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/tasks/`)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error.message);
        toast({
          title: "Error",
          description: "Failed to fetch tasks.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  }, [toast]);

  const handleReadClick = (task) => {
    setSelectedTask(task);
  };

  const openDeleteDialog = (task) => {
    setTaskToDelete(task);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setTaskToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  const deleteTask = (id) => {
    axios
      .delete(`${process.env.REACT_APP_URL}/tasks/${id}`)
      .then((response) => {
        console.log(response.data);
        setTasks(tasks.filter((el) => el._id !== id));
        closeDeleteDialog();
        toast({
          title: "Success",
          description: "Task deleted successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error("Error deleting task:", error.message);
        toast({
          title: "Error",
          description: "Failed to delete task.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <div>
      {tasks.length === 0 ? (
        <Box
          mt="4"
          p="4"
          borderWidth="1px"
          borderRadius="lg"
          textAlign="center"
        >
          <Text fontSize="xl" fontWeight="semibold" color="gray.500">
            No tasks yet, create one to get started!
          </Text>
        </Box>
      ) : (
        <Box mt="4">
          {tasks.map((currentTask) => (
            <Box
              key={currentTask._id}
              p="4"
              borderWidth="1px"
              borderRadius="lg"
              mb="4"
            >
              <Text fontSize="xl" fontWeight="semibold">
                {currentTask.title}
              </Text>
              <Button
                colorScheme="teal"
                size="sm"
                mt="2"
                onClick={() => handleReadClick(currentTask)}
              >
                Read
              </Button>
              <Button
                colorScheme="teal"
                size="sm"
                mt="2"
                mr="2"
                ml="2"
                onClick={() => navigate(`/edit/${currentTask._id}`)} // Use useNavigate for navigation
              >
                Edit
              </Button>
              <Button
                colorScheme="red"
                size="sm"
                mt="2"
                onClick={() => openDeleteDialog(currentTask)}
              >
                Delete
              </Button>
            </Box>
          ))}
        </Box>
      )}

      {selectedTask && (
        <TaskDetails
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}

      <AlertDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        motionPreset="slideInBottom"
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Confirm Delete
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure you want to delete the task?
          </AlertDialogBody>

          <AlertDialogFooter gap={2}>
            <Button
              colorScheme="red"
              onClick={() => deleteTask(taskToDelete?._id)}
            >
              Delete
            </Button>
            <Button onClick={closeDeleteDialog}>Cancel</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TasksList;

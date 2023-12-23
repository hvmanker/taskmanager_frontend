import { Routes, Route } from "react-router-dom";
import { ChakraProvider, CSSReset, Container } from "@chakra-ui/react";
import Navbar from "./components/Nav";
import TasksList from "./components/TaskList";
import EditTask from "./components/EditTask";
import CreateTask from "./components/CreateTask";

function App() {
  return (
    <ChakraProvider>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<TasksList/>} />
        <Route path="/edit/:id" element={<EditTask/>} />
        <Route path="/create" element={<CreateTask/>} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;

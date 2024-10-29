import { BrowserRouter, Route, Routes } from "react-router-dom";
import ForgotPasswordComponent from "./Components/Pages/ForgotPasswordComponent";
import LoginComponent from "./Components/Pages/LoginComponent";
import MainComponent from "./Components/Layout/MainComponent";
import HomeComponent from "./Components/Pages/HomeComponent";
import RoleListComponent from "./Components/Pages/RoleListComponent";
import RoleFormComponent from "./Components/Pages/RoleFormComponent";
import UserFormComponent from "./Components/Pages/UserFormComponent";
import UserListComponent from "./Components/Pages/UserListComponent";
import "./Assets/index.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={LoginComponent} />
        <Route path="/forgot-password" Component={ForgotPasswordComponent} />
        <Route path="/" Component={MainComponent}>
          <Route path="/home" Component={HomeComponent} />
          <Route path="/roles" Component={RoleListComponent} />
          <Route path="/add-role" Component={RoleFormComponent} />
          <Route path="/edit-role/:id" Component={RoleFormComponent} />
          <Route path="/add-user" Component={UserFormComponent} />
          <Route path="/edit-user/:id" Component={UserFormComponent} />
          <Route path="/users" Component={UserListComponent} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

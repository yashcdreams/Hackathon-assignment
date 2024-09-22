import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Components/Pages/LoginPage";
import ForgotPasswordPage from "./Components/Pages/ForgotPasswordPage";
import MainComponent from "./Components/Layout/Main";
import HomeComponent from "./Components/Pages/HomeComponent";
import RoleListComponent from "./Components/Pages/RoleListComponent";
import RoleFormComponent from "./Components/Pages/RoleFormComponent";
import UserFormComponent from "./Components/Pages/UserFormComponent";
import UserListComponent from "./Components/Pages/UserListComponent";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={LoginPage} />
        <Route path="/forgot-password" Component={ForgotPasswordPage} />
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

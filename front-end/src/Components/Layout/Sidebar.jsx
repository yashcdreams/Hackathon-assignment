import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Col, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUsers,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeMenu, setActiveMenu] = useState("");

  useEffect(() => {
    const pathname = location.pathname.split("/")[1];
    if (!pathname) {
      setActiveMenu("home");
    } else {
      setActiveMenu(pathname);
    }
  }, [location]);

  const handleMenuChange = (menu) => {
    setActiveMenu(menu);
    navigate(`/${menu}`);
  };

  return (
    <>
      <Col md={3}>
        <ListGroup variant="flush">
          <ListGroup.Item
            className={`my-2 ${activeMenu === "home" && "text-black"}`}
            eventKey="home"
            onClick={() => handleMenuChange("home")}
          >
            <FontAwesomeIcon className="icon" icon={faHouse} />
            Home
          </ListGroup.Item>

          <ListGroup.Item
            className={`my-2 ${
              (activeMenu === "roles" ||
                activeMenu === "add-role" ||
                activeMenu === "edit-role") &&
              "text-black"
            }`}
            eventKey="roles"
            onClick={() => handleMenuChange("roles")}
          >
            <FontAwesomeIcon className="icon" icon={faUserShield} />
            Roles
          </ListGroup.Item>

          <ListGroup.Item
            className={`my-2 ${
              (activeMenu === "users" ||
                activeMenu === "add-user" ||
                activeMenu === "edit-user") &&
              "text-black"
            }`}
            eventKey="users"
            onClick={() => handleMenuChange("users")}
          >
            <FontAwesomeIcon className="icon" icon={faUsers} />
            Users
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </>
  );
};

export default Sidebar;

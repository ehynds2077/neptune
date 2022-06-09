import { IconButton } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import React, { useEffect } from "react";
import { MdAccountCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { useLogoutMutation } from "../features/auth/authApi";
import { logoutUser, selectUser } from "../features/auth/authSlice";

export const AccountMenu = () => {
  const user = useSelector(selectUser);
  return (
    <Menu>
      <MenuButton
        _light={{ _hover: { color: "black" }, _active: { color: "black" } }}
        as={IconButton}
        aria-label="Account"
        fontSize="xl"
        icon={<Icon as={MdAccountCircle} />}
        variant="ghost"
      />
      <MenuList _light={{ color: "black" }}>
        {user ? <UserMenuItems /> : <PublicMenuItems />}
        {/* <CommonMenuItems /> */}
      </MenuList>
    </Menu>
  );
};

const PublicMenuItems = () => {
  return (
    <MenuItem to="/login" as={RouterLink}>
      Login
    </MenuItem>
  );
};

const UserMenuItems = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [apiLogout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await apiLogout().unwrap();
      dispatch(logoutUser());

      navigate("/", { replace: true });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <MenuItem icon={<Icon as={MdAccountCircle} />}>{user?.email}</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </>
  );
};

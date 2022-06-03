import { IconButton } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import React, { useEffect } from "react";
import { MdAccountCircle } from "react-icons/md";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ColorModeSwitcher } from "../ColorModeSwitcher";

import { useAuth } from "../providers/AuthProvider";

export const AccountMenu = () => {
  const auth = useAuth();

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Account"
        icon={<Icon as={MdAccountCircle} />}
        variant="outline"
      />
      <MenuList>
        {auth.user ? <UserMenuItems /> : <PublicMenuItems />}
        {/* <CommonMenuItems /> */}
      </MenuList>
    </Menu>
  );
};

// const CommonMenuItems = () => (
//   <MenuItem>
//     <ColorModeSwitcher />
//   </MenuItem>
// );

const PublicMenuItems = () => {
  return (
    <MenuItem to="/login" as={RouterLink}>
      Login
    </MenuItem>
  );
};

const UserMenuItems = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await auth.logout();
    navigate("/", { replace: true });
  };
  return (
    <>
      <MenuItem icon={<Icon as={MdAccountCircle} />}>
        {auth.user.email}
      </MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </>
  );
};

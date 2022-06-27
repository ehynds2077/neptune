import { IconButton } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { MdAccountCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useLogoutMutation } from "../features/auth/authApi";
import { logoutUser, selectUser } from "../features/auth/authSlice";

export const AccountMenu = () => {
  return (
    <Menu>
      <MenuButton
        _light={{ _hover: { color: "black" }, _active: { color: "black" } }}
        as={IconButton}
        aria-label="Account"
        _focus={{
          boxShadow: "none",
        }}
        fontSize="xl"
        icon={<Icon as={MdAccountCircle} />}
        variant="ghost"
      />
      <MenuList _light={{ color: "black" }}>
        <UserMenuItems />
      </MenuList>
    </Menu>
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
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(logoutUser());

      navigate("/", { replace: true });
    }
  };
  return (
    <>
      <MenuItem icon={<Icon as={MdAccountCircle} />}>{user?.email}</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </>
  );
};

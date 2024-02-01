import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { useAuth } from "../context/AuthContext";
import profileImg from "../assets/images/alexander-andrews-oMYSo7wYZ3o-unsplash.jpg";
export function DropDown() {
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };
  return (
    <Menu>
      <MenuHandler>
        <button className="bg-none border-none">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" className="block shrink-0">
            <span className="sr-only">Profile</span>
            <img
              alt="profile"
              src={profileImg}
              className="h-10 w-10 rounded-full object-cover"
            />
          </a>
        </button>
      </MenuHandler>
      <MenuList>
        <MenuItem>마이 페이지</MenuItem>
        <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
      </MenuList>
    </Menu>
  );
}

import { useState } from "react";
import { IconButton, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink, useNavigate } from "react-router-dom";

import LogoImage from "../../assets/img/HealthFlow-Logo.png";
import { getSidebarItems } from "./SideBar.utils";
import * as Styled from "./SideBar.styled";
import { LogoutModal } from "../LogoutModal/LogoutModal";

import { getSession } from "../../auth/session";
import { logout } from "../../services/authService";

export const SideBar = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const bottomItemLabels = ["Configurações", "Sair"];

  const sidebarItems = getSidebarItems(getSession()?.role);

  const mainItems = sidebarItems.filter(
    (item) => !bottomItemLabels.includes(item.label),
  );

  const bottomItems = sidebarItems.filter((item) =>
    bottomItemLabels.includes(item.label),
  );

  function closeMenu() {
    setIsOpen(false);
  }

  function handleLogoutClick() {
    closeMenu();
    setIsLogoutModalOpen(true);
  }

  function handleLogoutCancel() {
    setIsLogoutModalOpen(false);
  }

  function handleLogoutConfirm() {
    logout();
    setIsLogoutModalOpen(false);
    navigate("/login", { replace: true });
  }

  function renderNavigationItem(item: (typeof sidebarItems)[number]) {
    const Icon = item.icon;

    return (
      <Styled.StyledItemButton
        key={item.label}
        component={NavLink}
        to={item.path}
        onClick={closeMenu}
      >
        <Icon />

        <ListItemText primary={item.label} />
      </Styled.StyledItemButton>
    );
  }

  return (
    <>
      <Styled.MenuButton
        onClick={() => setIsOpen((previous) => !previous)}
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </Styled.MenuButton>

      {isOpen && <Styled.Overlay onClick={closeMenu} />}

      <Styled.Container className={isOpen ? "open" : ""}>
        <Styled.LogoContainer>
          <Styled.Logo src={LogoImage} alt="Logo HealthFlow" />
        </Styled.LogoContainer>

        <Styled.ItemsContainer>
          {mainItems.map((item) => renderNavigationItem(item))}
        </Styled.ItemsContainer>

        <Styled.BottomItems>
          {bottomItems.map((item) => {
            const Icon = item.icon;

            if (item.label === "Sair") {
              return (
                <Styled.StyledItemButton
                  key={item.label}
                  type="button"
                  onClick={handleLogoutClick}
                >
                  <Icon />

                  <ListItemText primary={item.label} />
                </Styled.StyledItemButton>
              );
            }

            return renderNavigationItem(item);
          })}
        </Styled.BottomItems>
      </Styled.Container>

      <LogoutModal
        open={isLogoutModalOpen}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
};

import { useState } from "react";
import { IconButton, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink } from "react-router-dom";

import LogoImage from "../../assets/img/HealthFlow-Logo.png";
import { itemsAdmin } from "./SideBar.utils";
import * as Styled from "./SideBar.styled";

export function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const bottomItemLabels = [
    "Configurações",
    "Sair",
  ];

  const mainItems = itemsAdmin.filter(
    (item) => !bottomItemLabels.includes(item.label),
  );

  const bottomItems = itemsAdmin.filter(
    (item) => bottomItemLabels.includes(item.label),
  );

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Styled.MenuButton
        onClick={() => setIsOpen((previous) => !previous)}
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </Styled.MenuButton>

      {isOpen && (
        <Styled.Overlay onClick={closeMenu} />
      )}

      <Styled.Container className={isOpen ? "open" : ""}>
        <Styled.LogoContainer>
          <Styled.Logo
            src={LogoImage}
            alt="Logo HealthFlow"
          />
        </Styled.LogoContainer>

        <Styled.ItemsContainer>
          {mainItems.map((item) => {
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
          })}
        </Styled.ItemsContainer>

        <Styled.BottomItems>
          {bottomItems.map((item) => {
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
          })}
        </Styled.BottomItems>
      </Styled.Container>
    </>
  );
}

import { ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";

import LogoImage from "../../assets/img/HealthFlow-Logo.png";
import { itemsAdmin } from "./SideBar.utils";
import * as Styled from "./SideBar.styled";

export function SideBar() {
  return (
    <Styled.Container>
      <Styled.LogoContainer>
        <Styled.Logo
          src={LogoImage}
          alt="HealthFlow"
        />
      </Styled.LogoContainer>

      <Styled.ItemsContainer>
        {itemsAdmin.map((item) => {
          const Icon = item.icon;

          return (
            <Styled.StyledItemButton
              key={item.label}
              component={NavLink}
              to={item.path}
            >
              <Icon />
              <ListItemText primary={item.label} />
            </Styled.StyledItemButton>
          );
        })}
      </Styled.ItemsContainer>
    </Styled.Container>
  );
}

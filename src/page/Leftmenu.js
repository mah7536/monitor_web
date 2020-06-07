/** @format */

import React from "react";
import {
  Menu,
  AppBar,
  Toolbar,
  Button,
  Typography,
  MenuItem,
} from "@material-ui/core";
import { GlobalContext } from "Path/Global";
import MenuIcon from "@material-ui/icons/Menu";

const Leftmenu = () => {
  const Global = React.useContext(GlobalContext);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Logout = () => {
    Global.setLogout();
  };
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MenuIcon />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={Logout}>Logout</MenuItem>
        </Menu>
        <Typography variant="h6" color="inherit">
          Monitor System
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Leftmenu;

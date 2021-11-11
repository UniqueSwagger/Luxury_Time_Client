import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DashboardIcon from "@mui/icons-material/Dashboard";
import useAuth from "../../hooks/useAuth";
import ManageProducts from "../ManageProducts/ManageProducts";
import MakeAdmin from "../MakeAdmin/MakeAdmin";

import {
  NavLink,
  useRouteMatch,
  Route,
  Switch,
  useLocation,
  useHistory,
} from "react-router-dom";
import AddProduct from "../AddProduct/AddProduct";
import AllOrder from "../AllOrder/AllOrder";
const drawerWidth = 240;

const BookingDashboard = (props) => {
  const history = useHistory();
  let { path, url } = useRouteMatch();
  const { handleLogout } = useAuth();
  const location = useLocation();
  const pathName = location.pathname;
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        <NavLink
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
          to="/home"
        >
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon className="text-muted" sx={{ color: "black" }} />
            </ListItemIcon>
            <ListItemText className="text-black" primary="Home" />
          </ListItem>
        </NavLink>
        <NavLink
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
          to={`${url}`}
        >
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon className="text-muted" sx={{ color: "black" }} />
            </ListItemIcon>
            <ListItemText className="text-black" primary="Manage All Orders" />
          </ListItem>
        </NavLink>
        <NavLink
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
          to={`${url}/addProduct`}
        >
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon className="text-muted" sx={{ color: "black" }} />
            </ListItemIcon>
            <ListItemText className="text-black" primary="Add a Product" />
          </ListItem>
        </NavLink>
        <NavLink
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
          to={`${url}/manageProducts`}
        >
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon className="text-muted" sx={{ color: "black" }} />
            </ListItemIcon>
            <ListItemText className="text-black" primary="Manage Products" />
          </ListItem>
        </NavLink>
        <NavLink
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
          to={`${url}/makeAdmin`}
        >
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon className="text-muted" sx={{ color: "black" }} />
            </ListItemIcon>
            <ListItemText className="text-black" primary="Make Admin" />
          </ListItem>
        </NavLink>
        <ListItem button onClick={() => [handleLogout(), history.push("/")]}>
          <ListItemIcon>
            <DashboardIcon className="text-muted" sx={{ color: "black" }} />
          </ListItemIcon>
          <ListItemText className="text-black" primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: "white",
          boxShadow: "none",
        }}
      >
        <Toolbar className="bg-primary">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            className="d-block mx-auto fs-4"
            noWrap
            component="div"
          >
            {pathName === "/admin"
              ? "Manage All Orders"
              : pathName === "/admin/addProduct"
              ? "Add a Product"
              : pathName === "/admin/manageProducts"
              ? "Manage Products"
              : pathName === "/admin/makeAdmin"
              ? "Make Admin"
              : ""}
          </Typography>
        </Toolbar>

        <div
          style={{ height: "100vh", overflow: "scroll" }}
          className="bg-light"
        >
          <Switch>
            <Route exact path={path}>
              <AllOrder />
            </Route>
            <Route path={`${path}/addProduct`}>
              <AddProduct />
            </Route>
            <Route path={`${path}/manageProducts`}>
              <ManageProducts />
            </Route>
            <Route path={`${path}/makeAdmin`}>
              <MakeAdmin />
            </Route>
          </Switch>
        </div>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
};

BookingDashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default BookingDashboard;

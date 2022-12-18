import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(1),
    display: "flex",
  },
 logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(5),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },


}));

function Navbar() {
  const classes = useStyles();
  if (sessionStorage.getItem("token")){
    return (
      <AppBar position="static">
        <CssBaseline />
        <Toolbar>
          <Typography variant="h4" className={classes.logo}>
            <Link to="/" className={classes.link}>
              Home
            </Link>
          </Typography>
            <div className={classes.navlinks}>
              <Link to="/search" className={classes.link}>
                Search
              </Link>
            </div>

        </Toolbar>
      </AppBar>
    );
  } else {
    return (
      <AppBar position="static">
        <CssBaseline />
        <Toolbar>
          <Typography variant="h4" className={classes.logo}>
            <Link to="/" className={classes.link}>
              Home
            </Link>
          </Typography>
            <div className={classes.navlinks}>
              <Link to="/search" className={classes.link}>
                Search
              </Link>
              <Link to="/login" className={classes.link}>
                Login
              </Link>
            </div>
        </Toolbar>
      </AppBar>
    );
  }

}
export default Navbar;
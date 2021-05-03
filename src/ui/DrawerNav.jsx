import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Assignment, FormatListNumbered, Home, LowPriority } from '@material-ui/icons';
import { NavLink } from 'react-router-dom'
import { Redirect, Route, Switch } from 'react-router-dom'
import Herramienta from '../components/Herramienta/'
import { Proyectos } from '../components/Proyectos/'
import { useStylesDrawer } from '../styles/useStylesDrawer';
import Ranking from '../components/Ranking';
import Pasos from '../components/Pasos/';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';

import axios from 'axios'

axios.defaults.headers.common = {'Authorization': `${localStorage.getItem('token')}`}

export const DrawerNav = () => {
  const classes = useStylesDrawer();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const path = window.location.pathname
    if(path === '/login' || path === '/signup') {
      const token = localStorage.getItem('token')
      if(token) window.location = '/'
    }
  }, [])

  useEffect(() => {
    const fx = async () => {
      const res = await axios.get(`${process.env.REACT_APP_ENDPOINT}/verifyToken`)
      if(res.data.response.message === 'jwt malformed') {
        window.location = '/login'
      }
    }

    fx()
  }, [])

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Tool prioritization
          </Typography>

        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          
        {/* NavLink */}
        <NavLink 
            exact 
            activeClassName="active"
            to="/" 
          >   

            <ListItem button key={'home'}>
                <ListItemIcon>
                    <Home/>
                </ListItemIcon>
                <ListItemText primary={'Perfil'} />
            </ListItem>
          </NavLink>
        
        <hr/>
        
          <NavLink 
            exact 
            activeClassName="active"
            to="/proyectos" 
          >   
            <ListItem button key={'proyectos'}>
                <ListItemIcon>
                    <Assignment/>
                </ListItemIcon>
                <ListItemText primary={'Proyectos'} />
            </ListItem>
          </NavLink>

          <NavLink 
            exact 
            activeClassName="active"
            to="/pasos" 
          >   
            <ListItem button key={'pasos'}>
                <ListItemIcon>
                    <DoubleArrowIcon/>
                </ListItemIcon>
                <ListItemText primary={'Data'} />
            </ListItem>
          </NavLink>

          <NavLink 
            exact 
            activeClassName="active"
            to="/herramienta" 
          >
            <ListItem button key={'herramienta'}>
                <ListItemIcon>
                    <LowPriority/>
                </ListItemIcon>
                <ListItemText primary={'Priorización'} />
            </ListItem>
          </NavLink>

          <NavLink 
            exact 
            activeClassName="active"
            to="/ranking" 
          >
            <ListItem button key={'ranking'}>
                <ListItemIcon>
                    <FormatListNumbered/>
                </ListItemIcon>
                <ListItemText primary={'Ranking'} />
            </ListItem>
          </NavLink>
        </List>
      </Drawer>
      <main className={classes.content}>

      <div className={classes.toolbar}/>
      
        <Switch>
            <Route exact path="/proyectos" component={Proyectos}/>
            <Route exact path="/pasos" component={Pasos}/>
            <Route exact path="/herramienta" component={Herramienta}/>
            <Route exact path="/ranking" component={Ranking}/>
            <Redirect  to="/"/>
        </Switch>
    
      </main>
    </div>
  );
}
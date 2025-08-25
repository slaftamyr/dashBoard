import { useMemo, useState } from 'react';
import { AppBar, Avatar, Badge, Box, Breadcrumbs, CssBaseline, Divider, Drawer, IconButton, InputBase, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import PeopleIcon from '@mui/icons-material/People';
import InsightsIcon from '@mui/icons-material/Insights';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useFilters } from '../context/FiltersContext.jsx';

const drawerWidth = 240;

const navItems = [
  { label: "Overview", icon: <DashboardIcon />, to: "/" },
  { label: "Products", icon: <Inventory2Icon />, to: "/products" },
  { label: "Customers", icon: <PeopleIcon />, to: "/customers" },
  { label: "Analytics", icon: <InsightsIcon />, to: "/analytics" },
];

export default function DashboardLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const { filters, update } = useFilters();

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const pageName = useMemo(() => {
    const map = { '/': 'Overview', '/products': 'Products', '/customers': 'Customers', '/analytics': 'Analytics' };
    return map[pathname] || 'Overview';
  }, [pathname]);

  const crumbs = useMemo(() => {
    const parts = pathname === '/' ? ['overview'] : pathname.slice(1).split('/');
    return parts;
  }, [pathname]);

  const open = Boolean(anchorEl);
  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const drawer = (
    <div>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight={700} noWrap>
          Store Dashboard
        </Typography>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.to} disablePadding>
            <ListItemButton component={RouterLink} to={item.to} selected={pathname === item.to} onClick={() => setMobileOpen(false)}
              sx={{
                '&.Mui-selected': {
                  bgcolor: 'secondary.main',
                  color: 'text.primary',
                  '& .MuiListItemIcon-root': { color: 'text.primary' },
                },
                '&.Mui-selected:hover': {
                  bgcolor: 'secondary.main',
                },
              }}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" elevation={0} sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backdropFilter: 'saturate(180%) blur(10px)',
        backgroundColor: (theme) => theme.palette.background.paper,
        color: 'text.primary',
        borderBottom: (t) => `1px solid ${t.palette.divider}`,
      }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, minWidth: 0 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <Typography variant="h6" noWrap>{pageName}</Typography>
              <Breadcrumbs sx={{ display: { xs: 'none', md: 'flex' }, color: 'text.secondary' }}>
                <Link component={RouterLink} underline="hover" color="inherit" to="/">Home</Link>
                {crumbs.map((c, idx) => (
                  <Typography key={idx} variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>{c}</Typography>
                ))}
              </Breadcrumbs>
            </Box>
            <Box sx={{ flex: 1, display: { xs: 'none', sm: 'flex' }, alignItems: 'center', maxWidth: 520, ml: 2, bgcolor: 'background.default', border: (t) => `1px solid ${t.palette.divider}`, borderRadius: 999, px: 1 }}>
              <SearchIcon sx={{ color: 'text.secondary', mx: 1 }} />
              <InputBase
                placeholder="Search products, customers…"
                sx={{ flex: 1, py: 0.5 }}
                inputProps={{ 'aria-label': 'search' }}
                value={filters.q}
                onChange={(e) => update({ q: e.target.value })}
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="Notifications">
              <IconButton size="small">
                <Badge color="secondary" variant="dot">
                  <NotificationsNoneIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Settings">
              <IconButton size="small">
                <SettingsOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Account">
              <IconButton size="small" onClick={handleMenuOpen} aria-controls={open ? 'account-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>A</Avatar>
              </IconButton>
            </Tooltip>
            <Menu id="account-menu" anchorEl={anchorEl} open={open} onClose={handleMenuClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
              <Divider />
              <MenuItem onClick={handleMenuClose}>Sign out</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="navigation">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              top: { xs: 56, sm: 64 },
              height: { xs: 'calc(100% - 56px)', sm: 'calc(100% - 64px)' },
            }
          }}>
          {drawer}
        </Drawer>
        <Drawer variant="permanent" sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            borderRight: (t) => `1px solid ${t.palette.divider}`,
            top: 64,
            height: 'calc(100% - 64px)'
          }
        }} open>
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          backgroundColor: 'background.default',
          pt: { xs: '56px', sm: '64px' }
        }}>
        {children}
      </Box>
    </Box>
  );
}

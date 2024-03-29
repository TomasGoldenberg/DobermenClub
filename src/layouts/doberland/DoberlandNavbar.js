import { Icon } from '@iconify/react';
import { useState, useRef } from 'react';
import homeFill from '@iconify/icons-eva/home-fill';
import roundSpeed from '@iconify/icons-ic/round-speed';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
import {
  NavLink as RouterLink,
  useLocation,
  useHistory
} from 'react-router-dom';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  List,
  Link,
  Button,
  AppBar,
  Hidden,
  Toolbar,
  MenuItem,
  Container,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';

// routes
import { PATH_HOME, PATH_DOBERLAND } from '../../routes/paths';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
// components
import { MIconButton } from '../../components/@material-extend';
import Logo from '../../components/Logo';
import MenuPopover from '../../components/MenuPopover';

// ----------------------------------------------------------------------

const MENU_LINKS = [
  { title: 'Home', icon: homeFill, href: '/home' },
  { title: 'Castle', icon: homeFill, href: '/castle' }

  // { title: 'Advertising', icon: roundSpeed, href: '/#advertising' }
];

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 96;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  '& .isDesktopActive': {
    color: `${theme.palette.primary.main} !important`
  },
  '& .isMobileActive': {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    backgroundColor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    )
  }
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: APP_BAR_MOBILE,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  [theme.breakpoints.up('md')]: { height: APP_BAR_DESKTOP }
}));

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8
}));

// ----------------------------------------------------------------------

export default function HomeNavbar() {
  const anchorRef = useRef(null);
  const { pathname } = useLocation();
  const offset = useOffSetTop(100);
  const [openMenu, setOpenMenu] = useState(false);
  const isHome = pathname === '/';
  const history = useHistory();

  const renderMenuDesktop = (
    <>
      {MENU_LINKS.map((link) => (
        <Button
          onClick={() => {
            const url = `${PATH_DOBERLAND.root}${link.href}`;
            history.push(`${PATH_DOBERLAND.root}${link.href}`);
          }}
          key={link.title}
          activeClassName="isDesktopActive"
          style={{ textDecoration: 'none', marginRight: '15px' }}
        >
          {link.title}
        </Button>
      ))}
    </>
  );

  const renderMenuMobile = (
    <MenuPopover
      disablePortal
      open={openMenu}
      anchorEl={anchorRef.current}
      onClose={() => setOpenMenu(false)}
    >
      <List>
        {MENU_LINKS.map((link) => (
          <a
            href={link.href}
            key={link.title}
            component={RouterLink}
            onClick={() => setOpenMenu(false)}
            activeClassName="isMobileActive"
            sx={{ color: 'text.secondary', py: 1 }}
          >
            <ListItemIcon>
              <Icon icon={link.icon} width={20} height={20} />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ typography: 'body2' }}>
              {link.title}
            </ListItemText>
          </a>
        ))}
      </List>
    </MenuPopover>
  );

  return (
    <RootStyle color="transparent">
      <ToolbarStyle
        disableGutters
        sx={{
          ...(offset && {
            bgcolor: 'background.default',
            height: { md: APP_BAR_DESKTOP - 20 }
          })
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <a href="/doberland/home">
            <Logo />
          </a>
          <Box sx={{ flexGrow: 1 }} />

          <Hidden mdDown>{renderMenuDesktop}</Hidden>

          <Button
            variant="contained"
            target="_blank"
            href={PATH_DOBERLAND.purchase}
          >
            Buy on Opensea
          </Button>
        </Container>
      </ToolbarStyle>

      {offset && <ToolbarShadowStyle />}
    </RootStyle>
  );
}

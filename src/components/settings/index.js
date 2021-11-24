import { Icon } from '@iconify/react';
import { useState } from 'react';
import closeFill from '@iconify/icons-eva/close-fill';
// material
import { Box, Drawer, Tooltip, Divider, Typography } from '@material-ui/core';
//
import { FaDiscord, FaInstagram } from 'react-icons/fa';
import { MIconButton, MFab } from '../@material-extend';
import SettingMode from './SettingMode';
import SvgIconStyle from '../SvgIconStyle';
import SettingDirection from './SettingDirection';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 260;

export default function Settings() {
  const [open, setOpen] = useState(false);

  const handleOpenSettings = () => {
    setOpen(true);
  };

  const handleCloseSettings = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          bottom: { xs: 16, sm: 24, md: 32 },
          right: { xs: 16, sm: 24, md: 32 },
          zIndex: 999
        }}
      >
        <Tooltip title="Instagram">
          <MFab
            color="warning"
            size="medium"
            onClick={() => {
              window.open('https://www.instagram.com/dobermenclub.nft/');
            }}
            sx={{
              color: (theme) => theme.palette.warning.contrastText,
              background: (theme) => theme.palette.gradients.warning
            }}
          >
            <FaInstagram size="2em" />
          </MFab>
        </Tooltip>
        <Tooltip title="Discord">
          <MFab
            color="warning"
            onClick={() => {
              window.open('https://discord.com/invite/z3PbKfPwHh/');
            }}
            size="medium"
            sx={{
              ml: 2,
              color: (theme) => theme.palette.warning.contrastText,
              background: (theme) => theme.palette.gradients.warning
            }}
          >
            <FaDiscord size="2em" />
          </MFab>
        </Tooltip>
      </Box>

      <Drawer
        open={open}
        anchor="right"
        onClose={handleCloseSettings}
        sx={{ zIndex: 1999 }}
        PaperProps={{
          sx: { width: DRAWER_WIDTH }
        }}
      >
        <Box
          sx={{
            py: 2,
            pr: 1,
            pl: 2.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="subtitle1">Settings</Typography>
          <MIconButton onClick={handleCloseSettings}>
            <FaInstagram />
          </MIconButton>
        </Box>
        <Divider />

        <Box sx={{ pt: 3, px: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
            Mode
          </Typography>
          <SettingMode />

          <Box sx={{ my: 3 }} />

          <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
            Direction
          </Typography>
          <SettingDirection />
        </Box>
      </Drawer>
    </>
  );
}

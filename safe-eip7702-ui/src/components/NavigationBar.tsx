import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, Button, Typography, Box, IconButton, MenuItem, Menu } from '@mui/material';
import { Link } from 'react-router-dom';
import { WalletContext } from '../context/WalletContext';
import ChangeAccountDialog from './ChangeAccountDialog';
import { safeEIP7702Addresses } from '../safe-eip7702-config/address';

const NavigationBar: React.FC = () => {
  const { isPrivateKeyValid, account, chainId } = useContext(WalletContext)!;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [disconnectDialogOpen, setDisconnectDialogOpen] = useState(false); // State for controlling the dialog

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleChangeClick = () => {
    handleMenuClose(); // Close the menu first
    setDisconnectDialogOpen(true); // Open the dialog
  };

  const handleDisconnectConfirm = () => {
    setDisconnectDialogOpen(false);
  };


  return (
    <AppBar position="static" sx={{ backgroundColor: '#000', borderBottom: '2px solid rgb(18, 255, 128)' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        
        {/* Left Section: App Name and Buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* App Name */}
          <Typography variant="h6" sx={{ color: 'rgb(18, 255, 128)', fontFamily: '"Press Start 2P", monospace', marginRight: 4 }}>
            EOA--&gt;Safe
          </Typography>

          <Button
            component={Link}
            to="/delegate"
            disabled={!isPrivateKeyValid}
            sx={{
              marginRight: 2,
            }}
          >
            Delegate
          </Button>

          <Button
            component={Link}
            to="/settings"
            disabled={!isPrivateKeyValid}
            sx={{
              marginRight: 2,
            }}
          >
            Settings
          </Button>
        </Box>

        {/* Right Section: Account Info and Dropdown */}
        <Box>
          <IconButton>
            <Typography color='primary'>
              {safeEIP7702Addresses[chainId].name}
            </Typography>
          </IconButton>
          <IconButton onClick={handleMenuOpen} color="inherit">
            <Typography color='primary'>
              {account?.address.slice(0, 6)}...{account?.address.slice(-4)}
            </Typography>
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleChangeClick}>
            <MenuItem onClick={handleChangeClick}>Change</MenuItem>
          </Menu>
        </Box>
      </Toolbar>

      <ChangeAccountDialog
        open={disconnectDialogOpen}
        onClose={() => setDisconnectDialogOpen(false)}
        onConfirm={handleDisconnectConfirm}
      />
    </AppBar>
  );
};

export default NavigationBar;

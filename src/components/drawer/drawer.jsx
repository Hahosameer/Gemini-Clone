import React, { useContext, useState } from "react";
import "./drawer.css";  // Ensure you have the necessary styles here
import {
  Menu as MenuIcon,
  Add as AddIcon,
  Message as MessageIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  Timeline as ActivityIcon
} from "@mui/icons-material";
import { Context } from "../../context/Context";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export default function TemporaryDrawer() {
  const [open, setOpen] = useState(false);
  const { onSent, pretPrompt, setrecentPrompt, newChat } = useContext(Context);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const loadPrompt = async (prompt) => {
    setrecentPrompt(prompt);
    await onSent(prompt);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem button onClick={() => newChat()} key="newChat">
          <ListItemIcon><AddIcon /></ListItemIcon>
          <ListItemText primary="New Chat" />
        </ListItem>
        <Divider />
        <List>
          <ListItem>
            <ListItemText primary="Recent" />
          </ListItem>
          {pretPrompt.map((item, index) => (
            <ListItem button onClick={() => loadPrompt(item)} key={index}>
              <ListItemIcon><MessageIcon /></ListItemIcon>
              <ListItemText primary={item.slice(0, 18) + "..."} />
            </ListItem>
          ))}
        </List>
        <Divider />
        {['Help', 'Activity', 'Settings'].map((text, index) => {
          const icons = [<HelpIcon />, <ActivityIcon />, <SettingsIcon />];
          return (
            <ListItem button key={text}>
              <ListItemIcon>{icons[index]}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <div id="menu">
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon className='icon' />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

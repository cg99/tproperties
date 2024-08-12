import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Home, Settings, Password, AccountBox } from '@mui/icons-material';
import { useRouter } from 'next/navigation';


const Sidebar = ({ sidebarWidth }: { sidebarWidth: number }) => {
    const router = useRouter();

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    return (
        <Drawer
            sx={{
                width: sidebarWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: sidebarWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <List>
                <ListItem>
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <Divider />
                <ListItem onClick={() => handleNavigation('/saved-properties')}>
                    <ListItemIcon><Home /></ListItemIcon>
                    <ListItemText primary="Saved Properties" />
                </ListItem>
                <ListItem onClick={() => handleNavigation('/update-profile')}>
                    <ListItemIcon><AccountBox /></ListItemIcon>
                    <ListItemText primary="Update Profile" />
                </ListItem>
                <ListItem onClick={() => handleNavigation('/change-preferences')}>
                    <ListItemIcon><Settings /></ListItemIcon>
                    <ListItemText primary="Change Preferences" />
                </ListItem>
                <ListItem onClick={() => handleNavigation('/change-password')}>
                    <ListItemIcon><Password /></ListItemIcon>
                    <ListItemText primary="Change Password" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;

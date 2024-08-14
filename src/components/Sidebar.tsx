import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Home, Settings, Password, AccountBox, Work } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

type SidebarProps = {
    sidebarWidth: number;
    userRole: string;  // Assuming you pass userRole as a prop
};

const Sidebar = ({ sidebarWidth, userRole }: SidebarProps) => {
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
                {userRole === 'Customer' && ( // Conditionally render the Register as Agent link
                    <ListItem onClick={() => handleNavigation('/register/agent')}>
                        <ListItemIcon><Work /></ListItemIcon>
                        <ListItemText primary="Register as Agent" />
                    </ListItem>
                )}
            </List>
        </Drawer>
    );
};

export default Sidebar;

import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Home, Settings, Password, AccountBox, Work, HomeMaxOutlined, Add, AddBox } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { AGENT_ROLE, USER_ROLE } from '@/lib/constant/roles';

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
            className='dashboard-sidebar_left'
        >
            <List>
                <ListItem onClick={() => handleNavigation('/dashboard')}>
                    <ListItemIcon><Home /></ListItemIcon>
                    <ListItemText primary="Dashboard" />
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
                {userRole === USER_ROLE && ( // Conditionally render the Register as Agent link
                    < ListItem onClick={() => handleNavigation('/register/agent')}>
                        <ListItemIcon><Work /></ListItemIcon>
                        <ListItemText primary="Register as Agent" />
                    </ListItem>
                )}
                {userRole === AGENT_ROLE && ( // Conditionally render the Register as Agent link
                    <ListItem onClick={() => handleNavigation('/dashboard/agent/properties/new')}>
                        <ListItemIcon><AddBox /></ListItemIcon>
                        <ListItemText primary="Add New Property" />
                    </ListItem>
                )}
            </List>
        </Drawer >
    );
};

export default Sidebar;

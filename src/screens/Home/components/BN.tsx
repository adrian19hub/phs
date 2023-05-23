import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import HistoryIcon from '@mui/icons-material/History';
import LockIcon from '@mui/icons-material/Lock';

export default function SimpleBottomNavigation({
    setCurrTab,
    currTab,
}: {
    setCurrTab: React.Dispatch<React.SetStateAction<number>>;
    currTab: number;
}) {
    return (
        <Box sx={{ width: '100%' }}>
            <BottomNavigation
                showLabels
                value={currTab}
                onChange={(event, newValue) => {
                    setCurrTab(newValue);
                }}
            >
                <BottomNavigationAction label="Blocked" icon={<LockIcon />} />
                <BottomNavigationAction label="History" icon={<HistoryIcon />} />
                <BottomNavigationAction label="Monitoring" icon={<MonitorHeartIcon />} />
            </BottomNavigation>
        </Box>
    );
}

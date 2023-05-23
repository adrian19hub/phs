import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} {...other}>
            {value === index && <Typography>{children}</Typography>}
        </div>
    );
}

export default function BasicTabs({ ItemOne, ItemTwo }: { ItemOne: () => JSX.Element; ItemTwo: () => JSX.Element }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '10px' }}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Blocked IPS" sx={{ fontWeight: 'bold' }} />
                    <Tab label="Request History" sx={{ fontWeight: 'bold' }} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <ItemOne />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ItemTwo />
            </TabPanel>
        </Box>
    );
}

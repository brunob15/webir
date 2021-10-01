import { useState, useEffect } from 'react';

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Collapse from '@mui/material/Collapse';

import { getFilters } from '../../api/products';
import './Filters.scss';

function Filters() {
    const [filters, setFilters] = useState([]);
    const [checked, setChecked] = useState([0]);

    // TODO: Filtrar los resultados
    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    useEffect(() => {
        getFilters()
            .then(response => {
                if (response.status === 'success') {
                    setFilters(response.filters);
                }
            });
    }, []);

    return (
        <div className="filters">
            <List
                sx={{ width: '100%', maxWidth: 360, backgroundColor: '#F7F7F7' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader" sx={{ fontSize: '20px', fontWeight: 'bold', backgroundColor: '#F7F7F7' }}>
                        Filtros
                    </ListSubheader>
                }
                >
                {
                    filters.map(filter => (
                        <>
                            <ListItemButton sx={{ color: '#2F96D8' }}>
                                <ListItemText className="list-item-text" primary={filter.title} />
                            </ListItemButton>
                            <Collapse in={true} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {
                                        filter.values.map(value => (
                                            <ListItemButton sx={{ pl: 4, color: '#666666' }} onClick={handleToggle(value)}>
                                                <ListItemIcon>
                                                    <Checkbox
                                                        edge="start"
                                                        tabIndex={-1}
                                                        disableRipple
                                                        checked={checked.indexOf(value) !== -1}
                                                    />
                                                </ListItemIcon>
                                                <ListItemText primary={value} className="list-item-text" />
                                            </ListItemButton>
                                        ))
                                    }
                                </List>
                            </Collapse>
                        </>
                    ))
                }
            </List>
            
        </div>
    )
}

export default Filters;
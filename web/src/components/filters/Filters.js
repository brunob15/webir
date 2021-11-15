import { useState, useEffect } from "react";

import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import Collapse from "@mui/material/Collapse";

import { getFilters } from "../../api/products";
import "./Filters.scss";

function Filters({ setSearchTerm, searchTerm }) {
  const [filters, setFilters] = useState([]);

  const handleToggle = (title, value) => () => {
    if (searchTerm[title]?.includes(value)) {
      const filtered = searchTerm[title].filter((t) => t !== value);
      setSearchTerm((prev) => ({ ...prev, [title]: filtered }));
      return;
    }
    console.log('searchTerm', searchTerm);
    let values = searchTerm[title];
    if (!values) {
      values = [value]
    } else {
      values.push(value);
    }
    
    setSearchTerm((prev) => ({ ...prev, [title]: values }));
  };

  useEffect(() => {
    getFilters().then((response) => {
      if (response.status === "success") {
        setFilters(response.filters);
      }
    });
  }, []);

  const parse = {
    tiendas: "store",
    marcas: "brand",
  };

  return (
    <div className="filters">
      <List
        sx={{ width: "100%", maxWidth: 360, backgroundColor: "#F7F7F7" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            sx={{
              fontSize: "20px",
              fontWeight: "bold",
              backgroundColor: "#F7F7F7",
            }}
          >
            Filtros
          </ListSubheader>
        }
      >
        {filters.map((filter, index) => (
          <div key={`filter-${index}`}>
            <ListItemButton sx={{ color: "#2F96D8" }}>
              <ListItemText className="list-item-text" primary={filter.title} />
            </ListItemButton>
            <Collapse in={true} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {filter.values.map((value) => (
                  <ListItemButton
                    sx={{ pl: 4, color: "#666666" }}
                    onClick={handleToggle(parse[filter.title], value)}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        tabIndex={-1}
                        disableRipple
                        checked={searchTerm[parse[filter.title]]?.includes(
                          value
                        )}
                      />
                    </ListItemIcon>
                    <ListItemText primary={value} className="list-item-text" />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </div>
        ))}
      </List>
    </div>
  );
}

export default Filters;

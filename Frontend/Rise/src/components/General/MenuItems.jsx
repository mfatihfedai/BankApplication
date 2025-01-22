import { Button } from "@mui/material";
import { useAdminMenu } from "../../context/AdminMenuContext";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import "./menuItem.style.css";

function MenuItems({ list }) {
  const { componentName, setComponentName } = useAdminMenu();

  const handleClick = (e) => {
    setComponentName(e);
  };


  return (
    <div className="button-group">
      {list?.map((item, index) => (
        <button className="menu-button" onClick={() => handleClick(item.returnComponent)} key={index}>
          <div className="button-start">{item.startIcon}</div>
          <div className="button-header">{item.header}</div>
          <div className="button-end"><KeyboardArrowRightIcon/></div>
        </button>
      ))}
    </div>
  );
}

export default MenuItems;

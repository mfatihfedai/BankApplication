import { Button } from "@mui/material";
import { useAdminMenu } from "../../context/AdminMenuContext";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

function MenuItems({ list }) {
  const { componentName, setComponentName } = useAdminMenu();

  const handleClick = (header) => {
    setComponentName(header);
  };

  console.log(componentName);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        margin: "0",
        padding: "0",
      }}
    >
      {list?.map((item, index) => (
        <Button
          style={{
            backgroundColor: "var(--color-blue)",
            color: "var(--color-white)",
            margin: "1px 0",
          }}
          onClick={() => handleClick(item.header)}
          key={index}
          //   css taşınacak ve düzenlecek css grid ile yapılacak
        >
          <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}>
            <div style={{ margin:"0 1rem"}}>{item.startIcon}</div>
            <div>{item.header}</div>
            <div>
              <KeyboardArrowRightIcon />
            </div>
          </div>
        </Button>
      ))}
    </div>
  );
}

export default MenuItems;

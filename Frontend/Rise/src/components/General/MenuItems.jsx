import { Button } from "@mui/material";
import React, { useState } from "react";

function MenuItems({ list }) {
  const [componentName, setComponentName] = useState("Anasayfa"); // contexte taşınacak ve context e göre tıklanılan component açılacak

  const handleClick = (header) => {
    setComponentName(header);
  };

  console.log(componentName);

  return (
    <ul
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
            width: "25%",
            color: "var(--color-white)",
            margin: "1px 0",
          }}
          onClick={() => handleClick(item.header)}
          key={index}
        //   css taşınacak ve düzenlecek css grid ile yapılacak  
        >
          {item.startIcon}
          {item.header}
        </Button>
      ))}
    </ul>
  );
}

export default MenuItems;

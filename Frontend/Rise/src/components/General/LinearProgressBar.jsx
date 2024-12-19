import React, { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

const LinearProgressBar = ({ initialSecond }) => {
  const [secondLeft, setSecondLeft] = useState(initialSecond);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (secondLeft > 0) {
      const interval = setInterval(() => {
        setSecondLeft((prev) => prev - 1);
        setProgress((prev) => prev - 100 / initialSecond);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [secondLeft, initialSecond]);

  return (
    <Box sx={{ width: "100%", textAlign: "center" }}>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 10,
          borderRadius: 5,

          "& .MuiLinearProgress-bar": {
            backgroundColor: "var(--color-orange)",
          },
        }}
      />
    </Box>
  );
};

export default LinearProgressBar;

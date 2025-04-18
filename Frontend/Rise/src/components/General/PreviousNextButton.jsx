import React from "react";
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const PreviousNextButton = ({ hasPrevious, hasNext, onPrevious, onNext }) => {
  const { t } = useTranslation();

  if (!hasPrevious && !hasNext) {
    return null;
  }

  return (
    <div
    style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        marginTop: "10px",
        width: "100%" 
        }}>
      {/* Previous butonu sadece hasPrevious true ise görünür */}
      <div style={{ visibility: hasPrevious ? "visible" : "hidden" }}>
        <Button
          onClick={onPrevious}
          variant="contained"
        >
          {t("Geri")}
        </Button>
      </div>

      {/* Next butonu sadece hasNext true ise görünür */}
      <div style={{ visibility: hasNext ? "visible" : "hidden" }}>
        <Button
          onClick={onNext}
          variant="contained"
        >
          {t("Ileri")}
        </Button>
      </div>
    </div>
  );
};

PreviousNextButton.propTypes = {
  hasPrevious: PropTypes.bool.isRequired,
  hasNext: PropTypes.bool.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};

export default PreviousNextButton;
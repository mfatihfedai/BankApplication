import React from "react";
import Logo from "../../assets/LogoNonBackground.png";


const Loading = () => {
  return (
    <div className="logo-container">
      <img src={Logo} alt="Logo" className="logo" />
      <div className="prisma-container">
        {["P", "R", "I", "S", "M", "A"].map((letter, index) => (
          <span
            key={index}
            className="prisma-letter"
            style={{ animationDelay: `${index * 0.5}s` }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Loading;
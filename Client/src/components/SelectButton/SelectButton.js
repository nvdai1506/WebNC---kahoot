import React from "react";
import {
  BsFillTriangleFill,
  BsFillCircleFill,
  BsFillSquareFill,
  BsFillDiamondFill,
} from "react-icons/bs";

function SelectButton({ btnColor, shape }) {
  return (
    <>
      <button type="button" className={`btn ${btnColor} w-100 h-100 p-5`}>
        {(() => {
          switch (shape) {
            case "triangle":
              return <BsFillTriangleFill />;
            case "diamond":
              return <BsFillDiamondFill />;
            case "circle":
              return <BsFillCircleFill />;
            case "square":
              return <BsFillSquareFill />;
            default:
              return null;
          }
        })()}
      </button>
    </>
  );
}

export default SelectButton;

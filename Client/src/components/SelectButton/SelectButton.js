import React from "react";
import {
  BsFillTriangleFill,
  BsFillCircleFill,
  BsFillSquareFill,
  BsFillDiamondFill,
} from "react-icons/bs";

function SelectButton({ btnColor, shape }) {
  return (
    <div>
      <button type="button" className={`btn ${btnColor} col-12 p-5`}>
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
    </div>
  );
}

export default SelectButton;

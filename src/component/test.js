/** @format */
import React from "react";

const Test = (props) => {
  return (
    <div
      onClick={() => {
        if (props.Click) {
          props.Click();
        }
      }}
    >
      我是123測試
    </div>
  );
};

export { Test };

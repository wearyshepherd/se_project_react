import React, { useContext } from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <label className="switch" for="switch">
      <input
        id="switch"
        type="checkbox"
        className="switch__checkbox"
        onChange={handleToggleSwitchChange}
      />
      <p className="switch__temp-unit-f">F</p>
      <p className="switch__temp-unit-c">C</p>
      <span
        className='switch__slider'>
      </span>
    </label>
  );
};

export default ToggleSwitch;

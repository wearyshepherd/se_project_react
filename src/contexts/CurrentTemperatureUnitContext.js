import { createContext } from "react";

const CurrentTemperatureUnitContext = createContext({
  CurrentTemperatureUnit: "",
  handleToggleSwitchChange: () => {},
});

export { CurrentTemperatureUnitContext };

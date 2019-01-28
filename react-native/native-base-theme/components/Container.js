import { Platform, Dimensions } from "react-native";

import variable from "./../variables/platform";
import Variables from '../../src/constants/variables';

const deviceHeight = Dimensions.get("window").height;
export default (variables = variable) => {
  const theme = {
    flex: 1,
    height: Platform.OS === "ios" ? deviceHeight : deviceHeight - 20, 
    backgroundColor: Variables.background,
  };

  return theme;
};

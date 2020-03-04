import { createStackNavigator } from "react-navigation-stack";
import MyAccountScreen from "../screen/Account/MyAccount";
import LoginScreen from "../screen/Account/Login";
import RegisterScreen from "../screen/Account/Register";

const MyAccountScreenStacks = createStackNavigator({
  MyAccount: {
    screen: MyAccountScreen,
    navigationOptions: () => ({
      title: "Mi Cuenta"
    })
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: () => ({
      title: "Login"
    })
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: () => ({
      title: "Registro"
    })
  }
});

export default MyAccountScreenStacks;

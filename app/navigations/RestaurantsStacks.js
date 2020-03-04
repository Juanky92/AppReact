import { createStackNavigator } from "react-navigation-stack";
import RestaurantsScreen from "../screen/Restaurants";
import AddRestaurantsScreen from "../screen/Restaurants/AddRestaurants";

const RestaurantsScreenStacks = createStackNavigator({
  Restaurants: {
    screen: RestaurantsScreen,
    navigationOptions: () => ({ title: "Restaurantes" })
  },
  AddRestaurants: {
    screen: AddRestaurantsScreen,
    navigationOptions: () => ({ title: "Nuevo Restaurantes" })
  }
});

export default RestaurantsScreenStacks;

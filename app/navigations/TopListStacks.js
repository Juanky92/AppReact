import { createStackNavigator } from "react-navigation-stack";
import TopRestaurantsScreen from "../screen/TopRestaurants";

const TopListScreenStacks = createStackNavigator({
  TopRestaurants: {
    screen: TopRestaurantsScreen,
    navigationOptions: () => ({
      title: "Los mejores restaurantes"
    })
  }
});

export default TopListScreenStacks;

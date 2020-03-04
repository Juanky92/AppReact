import { createStackNavigator } from "react-navigation-stack";
import SearchScreen from "../screen/Search";

const SearchScreenStacks = createStackNavigator({
  Search: {
    screen: SearchScreen,
    navigationOptions: () => ({
      title: "Busca tus restaurantes"
    })
  }
});

export default SearchScreenStacks;

import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import DecksList from "./components/DecksList";
import AddDeck from "./components/AddDeck";
import DeckView from "./components/DeckView";
import { Ionicons } from "@expo/vector-icons";
import { createStore } from "redux";
import { Provider } from "react-redux";
import decks from "./reducers/index";
import AddCard from "./components/AddCard";
import QuizStart from "./components/QuizStart";
import { setLocalNotification } from "./utils/helpers";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function DeckStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Decks" component={DecksList} />
      <Stack.Screen
        name="Deck View"
        component={DeckView}
        options={({ route }) => ({ title: route.params.title })}
      />
      <Stack.Screen name="Add Card" component={AddCard} />
      <Stack.Screen name="Quiz" component={QuizStart} />
    </Stack.Navigator>
  );
}

function AddDeckStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Add Deck" component={AddDeck} />
    </Stack.Navigator>
  );
}
export default class App extends Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={createStore(decks)}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName;

                switch (route.name) {
                  case "Decks":
                    iconName = "md-journal";
                    break;
                  case "Add Deck":
                    iconName = "md-add-circle";
                    break;
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
          >
            <Tab.Screen name="Decks" component={DeckStack} />
            <Tab.Screen name="Add Deck" component={AddDeckStack} />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

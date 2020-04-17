import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { gray, white, purple } from "../utils/colors";
import { connect } from "react-redux";
import { recieveDecks } from "../actions/index";
import { getDecks } from "../utils/api";

function DeckRow({ title, questions, navigation }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Deck View", { title })}
    >
      <View style={styles.row}>
        <Text style={{ color: white, fontSize: 22 }}>{title}</Text>
        <Text style={{ color: gray, fontSize: 22 }}>
          {questions ? questions.length : 0} cards
        </Text>
      </View>
    </TouchableOpacity>
  );
}

class DecksList extends Component {
  componentDidMount() {
    getDecks().then((decks) => {
      console.log(decks);
      this.props.dispatch(recieveDecks(decks));
    });
  }
  renderItem = ({ item }, decks, navigation) => {
    return <DeckRow {...decks[item]} navigation={navigation} />;
  };
  render() {
    const { decks } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={Object.keys(decks)}
          renderItem={(item) =>
            this.renderItem(item, decks, this.props.navigation)
          }
          keyExtractor={(item) => decks[item].title}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
  },
  row: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: purple,
    borderRadius: 3,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: "rgba(0, 0, 0, 0.24)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
});
function maStateToProps(state) {
  return { decks: state };
}
export default connect(maStateToProps)(DecksList);

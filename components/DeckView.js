import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import SubmitBtn from "./SubmitButton";
import { purple, white, gray } from "../utils/colors";
import { connect } from "react-redux";
class DeckView extends Component {
  addCardNavigate = (navigation, title) => {
    navigation.navigate("Add Card", { title });
  };

  startQuizNavigate = (navigation, title) => {
    navigation.navigate("Quiz", { title });
  };

  render() {
    const { deck, navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>{deck.title}</Text>
          <Text style={{ color: gray, fontSize: 22 }}>
            {deck.questions ? deck.questions.length : 0} cards
          </Text>
        </View>
        <View styles={styles.buttonContainer}>
          <SubmitBtn
            onPress={() => this.addCardNavigate(navigation, deck.title)}
            buttonName="Add Card"
            buttonStyle={styles.addCardButton}
            buttonTextStyle={styles.addCardTextButton}
          />

          <SubmitBtn
            onPress={() => this.startQuizNavigate(navigation, deck.title)}
            buttonName="Start Quiz"
            disabled={!deck.questions}
            buttonStyle={styles.startQuizButton}
            buttonTextStyle={styles.startQuizTextButton}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  buttonContainer: {
    alignItems: "stretch",
  },
  addCardButton: {
    backgroundColor: white,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  addCardTextButton: {
    color: purple,
    fontSize: 22,
    textAlign: "center",
  },
  startQuizButton: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  startQuizTextButton: {
    color: white,
    fontSize: 22,
    textAlign: "center",
  },
});
function mapStateToProps(state, props) {
  const title = props.route.params.title;
  return {
    deck: state[title],
  };
}
export default connect(mapStateToProps)(DeckView);

import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { purple, white, gray } from "../utils/colors";
import { saveDeckTitle } from "../utils/api";
import { connect } from "react-redux";
import { addDeck } from "../actions/index";

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity style={styles.submitButton} onPress={onPress}>
      <Text style={styles.submitTextButton}>Submit</Text>
    </TouchableOpacity>
  );
}

class AddDeck extends Component {
  state = {
    cardName: "",
  };

  submit = () => {
    const title = this.state.cardName;
    saveDeckTitle(title);

    this.props.dispatch(
      addDeck({
        [title]: {
          title: title,
        },
      })
    );
  };
  setDeckValue = (text) => {
    this.setState(() => ({
      cardName: text,
    }));
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>What is the title of your new deck?</Text>

        <TextInput
          style={styles.inputText}
          underlineColorAndroid={gray}
          placeholder="Deck title"
          value={this.state.cardName}
          onChangeText={(text) => this.setDeckValue(text)}
        />
        <SubmitBtn onPress={this.submit} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButton: {
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
  submitTextButton: {
    color: white,
    fontSize: 22,
    textAlign: "center",
  },
  inputText: {
    width: 300,
    height: 60,
    padding: 5,
    borderColor: "black",
    borderRadius: 5,
    borderWidth: 2,
    margin: 10,
  },
  text: {
    margin: 10,
    fontSize: 22,
    flexWrap: "wrap",
  },
});
export default connect()(AddDeck);

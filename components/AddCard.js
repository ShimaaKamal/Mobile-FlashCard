import React, { Component } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import SubmitBtn from "./SubmitButton";
import { gray, white, purple } from "../utils/colors";
import { connect } from "react-redux";
import { addCardToDeck } from "../utils/api";
import { addCard } from "../actions/index";
class AddCard extends Component {
  state = {
    question: "",
    answer: "",
  };
  submit = (title, navigation) => {
    const question = this.state.question;
    const answer = this.state.answer;
    addCardToDeck(title, question, answer);
    this.props.dispatch(addCard(title, question, answer));
    navigation.goBack();
  };

  setQuestionValue = (text) => {
    this.setState(() => ({
      question: text,
    }));
  };

  setAnswerValue = (text) => {
    this.setState(() => ({
      answer: text,
    }));
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputText}
          underlineColorAndroid={gray}
          placeholder="Add Question"
          value={this.state.question}
          onChangeText={(text) => this.setQuestionValue(text)}
        />
        <TextInput
          style={styles.inputText}
          underlineColorAndroid={gray}
          placeholder="Add Answer"
          value={this.state.answer}
          onChangeText={(text) => this.setAnswerValue(text)}
        />
        <SubmitBtn
          onPress={() =>
            this.submit(this.props.route.params.title, this.props.navigation)
          }
          buttonName="Submit"
          buttonStyle={styles.submitButton}
          buttonTextStyle={styles.submitTextButton}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
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
    height: 60,
    padding: 5,
    borderColor: "black",
    borderRadius: 5,
    borderWidth: 2,
    margin: 10,
  },
});
export default connect()(AddCard);

//add new comment

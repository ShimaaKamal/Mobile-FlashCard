import React, { Component } from "react";
import CardFlip from "react-native-card-flip";
import { lightPurp, pink } from "../utils/colors";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import SubmitBtn from "./SubmitButton";
import { purple, white } from "../utils/colors";

class QuizStart extends Component {
  state = {
    question: "",
    answer: "",
    remainingQuestionsNumber: 0,
    nextQuestionId: 0,
    answerderQuestions: 0,
  };
  submit = () => {
    const questions = this.props.questions;
    if (this.state.nextQuestionId === -1) {
      this.setState((prevState) => ({
        answerderQuestions: prevState.answerderQuestions + 1,
        remainingQuestionsNumber: prevState.remainingQuestionsNumber - 1,
      }));
    } else {
      this.setState((prevState) => ({
        ...this.createStateObject(prevState, questions),
        remainingQuestionsNumber: prevState.remainingQuestionsNumber - 1,
        answerderQuestions: prevState.answerderQuestions + 1,
      }));
    }
  };

  componentDidMount() {
    this.updateStateWithQuestion();
  }

  createStateObject = (prevState, questions) => ({
    question: questions[prevState.nextQuestionId].question,
    answer: questions[prevState.nextQuestionId].answer,
    nextQuestionId:
      prevState.nextQuestionId + 1 === questions.length
        ? -1
        : prevState.nextQuestionId + 1,
  });

  updateStateWithQuestion = () => {
    const questions = this.props.questions;
    this.setState((prevState) => ({
      ...this.createStateObject(prevState, questions),
      remainingQuestionsNumber: questions.length - 1,
    }));
  };

  render() {
    const { question, answer, remainingQuestionsNumber } = this.state;

    console.log("this.state.newQuestionId", this.state.newQuestionId);
    if (
      this.state.nextQuestionId === -1 &&
      this.state.remainingQuestionsNumber == -1
    ) {
      return <Text>Congratulations: You have finished</Text>;
    }
    return (
      <View style={styles.container}>
        <Text>{remainingQuestionsNumber}</Text>
        <CardFlip
          style={styles.cardContainer}
          ref={(card) => (this.card = card)}
        >
          <TouchableOpacity
            style={styles.flipCard}
            onPress={() => this.card.flip()}
          >
            <Text>{question}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.flipCardBack}
            onPress={() => this.card.flip()}
          >
            <Text>{answer}</Text>
          </TouchableOpacity>
        </CardFlip>

        <SubmitBtn
          onPress={() => this.submit()}
          buttonName="Correct"
          buttonStyle={styles.correctButton}
          buttonTextStyle={styles.textButton}
        />
        <SubmitBtn
          onPress={() => this.submit()}
          buttonName="Incorrect"
          buttonStyle={styles.incorrectButton}
          buttonTextStyle={styles.textButton}
        />
      </View>
    );
  }
}
function mapStateToProps(state, props) {
  const title = props.route.params.title;
  console.log("title", title);
  console.log("questions", state[title].questions);
  return {
    questions: state[title].questions,
  };
}
export default connect(mapStateToProps)(QuizStart);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    flex: 1,
    marginTop: 20,
  },
  flipCard: {
    flex: 2,
    backgroundColor: lightPurp,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    fontSize: 20,
    width: 300,
  },
  flipCardBack: {
    backgroundColor: pink,
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    fontSize: 20,
    width: 300,
  },
  flipText: {
    width: 90,
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  correctButton: {
    backgroundColor: "green",
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    margin: 12,
  },
  incorrectButton: {
    backgroundColor: "red",
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    margin: 12,
  },
  textButton: {
    color: white,
    fontSize: 22,
    textAlign: "center",
  },
});

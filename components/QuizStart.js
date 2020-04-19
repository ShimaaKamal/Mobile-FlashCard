import React, { Component } from "react";
import CardFlip from "react-native-card-flip";
import { lightPurp, pink, purple, white } from "../utils/colors";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import SubmitBtn from "./SubmitButton";
import { Dimensions } from "react-native";
import TextButton from "./TextButton";
import {
  AnswerType,
  clearLocalNotification,
  setLocalNotification,
} from "../utils/helpers";

class QuizStart extends Component {
  state = {
    question: "",
    answer: "",
    remainingQuestionsNumber: 0,
    nextQuestionId: 0,
    answeredQuestions: 0,
  };

  //display next question when button is pressed
  //clear local notification when user answer all questions
  answerQuestion = (questions, answerType) => {
    if (this.state.nextQuestionId === -1) {
      clearLocalNotification().then(setLocalNotification());

      this.setState((prevState) => ({
        remainingQuestionsNumber: prevState.remainingQuestionsNumber - 1,
        answeredQuestions:
          answerType === AnswerType.CORRECT
            ? prevState.answeredQuestions + 1
            : prevState.answeredQuestions,
      }));
    } else {
      this.setState((prevState) => ({
        ...this.createStateObject(prevState, questions),
        remainingQuestionsNumber: prevState.remainingQuestionsNumber - 1,
        answeredQuestions:
          answerType === AnswerType.CORRECT
            ? prevState.answeredQuestions + 1
            : prevState.answeredQuestions,
      }));
    }
  };

  componentDidMount() {
    this.initializeStateWithQuestion();
  }

  createStateObject = (prevState, questions) => ({
    question: questions[prevState.nextQuestionId].question,
    answer: questions[prevState.nextQuestionId].answer,
    nextQuestionId:
      prevState.nextQuestionId + 1 === questions.length
        ? -1
        : prevState.nextQuestionId + 1,
  });

  //display first question
  initializeStateWithQuestion = () => {
    const questions = this.props.questions;
    this.setState((prevState) => ({
      question: questions[0].question,
      answer: questions[0].answer,
      nextQuestionId: prevState.nextQuestionId + 1,
      answeredQuestions: 0,
      remainingQuestionsNumber: questions.length,
    }));
  };

  render() {
    const {
      question,
      answer,
      nextQuestionId,
      remainingQuestionsNumber,
      answeredQuestions,
    } = this.state;

    const { questions } = this.props;

    if (nextQuestionId === -1 && remainingQuestionsNumber === 0) {
      return (
        <View style={styles.scoreContainer}>
          <Text style={styles.score}>Congratulations: You have finished</Text>
          <Text style={styles.score}>
            Your score:
            {((answeredQuestions / questions.length) * 100).toFixed(0)} %
          </Text>

          <SubmitBtn
            onPress={() => this.initializeStateWithQuestion()}
            buttonName="Restart"
            buttonStyle={styles.restartButton}
            buttonTextStyle={styles.textButton}
          />
          <TextButton
            style={styles.backButton}
            children="Back To Deck"
            onPress={() => this.props.navigation.goBack()}
          ></TextButton>
        </View>
      );
    }
    let _card;
    return (
      <View style={styles.container}>
        <Text style={styles.questionNumber}>
          {remainingQuestionsNumber} / {questions.length}
        </Text>
        <CardFlip
          style={styles.cardContainer}
          ref={(card) => {
            _card = card;
          }}
        >
          <TouchableOpacity
            style={styles.flipCard}
            onPress={() => _card.flip()}
          >
            <Text style={styles.flipText}>{question}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.flipCardBack}
            onPress={() => _card.flip()}
          >
            <Text style={styles.flipText}>{answer}</Text>
          </TouchableOpacity>
        </CardFlip>
        <TextButton
          style={styles.answerText}
          children="Answer"
          onPress={() => _card.flip()}
        ></TextButton>

        <SubmitBtn
          onPress={() => this.answerQuestion(questions, AnswerType.CORRECT)}
          buttonName="Correct"
          buttonStyle={styles.correctButton}
          buttonTextStyle={styles.textButton}
        />
        <SubmitBtn
          onPress={() => this.answerQuestion(questions, AnswerType.INCORRECT)}
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
  return {
    title: title,
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
    width: Dimensions.get("window").width - 30,
  },
  flipCardBack: {
    backgroundColor: pink,
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    fontSize: 20,
    width: Dimensions.get("window").width - 30,
  },
  flipText: {
    color: white,
    fontSize: 20,
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
  restartButton: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    margin: 12,
  },

  backButton: {
    fontSize: 22,
    alignSelf: "center",
    fontWeight: "bold",
    color: purple,
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
  questionNumber: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 10,
  },
  answerText: {
    fontSize: 22,
    alignSelf: "center",
    fontWeight: "bold",
    color: purple,
  },
  scoreContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  score: {
    margin: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
});

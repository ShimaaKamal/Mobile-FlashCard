# Mobile flashcardss

This is the a complete project of Mobile flashcardss

To get started testing the app:

* install all project dependencies with `yarn install`
* start the development server with `yarn start` or 'expo start'
* The application supports only android can work on emulator or android phone having expo 

##Front-end part
├── README.md - This file.
├── package.json # npm package manager file. 
│  
└── App.js # entery point for the app, it renders tab navigator for (add deck and deck list) and stack navigator for othe views
└── components
	├── DeckList.js  #  Render the first screen in the appliction, list of decks
	├── AddDeck.js   #  Contains add deck form
	├── AddCard.js   #  Contains add card form
    ├── DeckView.js  # It renders deck view
	├── QuizStart.js # It displays all questions of the quiz, it also handles flipping the card to display the answer
    └── SubmitButton.js , TextButton.js # generic components to display TouchableOpacityButton, we can use them in other views
└── reducers
└── actions
└── utils

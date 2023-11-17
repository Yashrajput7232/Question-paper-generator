//main.js
const readline = require('readline');
const QuestionStore = require('./questionStore');
const QuestionPaperGenerator = require('./generator');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const questionStore = new QuestionStore('./data/questions.json');
const questionPaperGenerator = new QuestionPaperGenerator(questionStore);

function getUserInput() {
  rl.question('Enter the total marks for the question paper: ', totalMarks => {
    totalMarks = Number(totalMarks) || 100;

    askDifficultyDistribution(totalMarks);
  });
}

function askDifficultyDistribution(totalMarks) {
  rl.question('Enter the percentage of questions for "Easy": ', easyPercentage => {
    easyPercentage = Number(easyPercentage) || 0;

    rl.question('Enter the percentage of questions for "Medium": ', mediumPercentage => {
      mediumPercentage = Number(mediumPercentage) || 0;

      // Calculate the percentage for "Hard"
      const hardPercentage = 100 - easyPercentage - mediumPercentage;

      // Generate the question paper based on user input
      const difficultyDistribution = [
        { difficulty: 'Easy', percentage: easyPercentage },
        { difficulty: 'Medium', percentage: mediumPercentage },
        { difficulty: 'Hard', percentage: hardPercentage }
      ];

      const questionPaper = questionPaperGenerator.generateQuestionPaper(totalMarks, difficultyDistribution);
      console.log('Generated Question Paper:', questionPaper);

      rl.close();
    });
  });
}

// Start the user input process
getUserInput();




// Below are some additional features that we could implement


// function askTopicPercentages(totalMarks, easyPercentage, mediumPercentage, hardPercentage) {
//   // Get the list of available topics
//   const availableTopics = Array.from(new Set(questionStore.questions.map(question => question.topic)));
//   console.log('Available Topics:', availableTopics.join(', '));

//   // Ask the user if they want to specify percentages for some topics
//   rl.question('Enter the topics and their percentages (e.g., "Physics 10 Chemistry 20"): ', topicInput => {
//     const topicDistribution = parseTopicInput(topicInput);

//     // Generate the question paper based on user input
//     generateQuestionPaper(totalMarks, easyPercentage, mediumPercentage, hardPercentage, topicDistribution);
//   });
// }

// function parseTopicInput(input) {
//   const topicDistribution = [];
//   const topicPercentages = input.split(' ');

//   for (let i = 0; i < topicPercentages.length; i += 2) {
//     const topic = topicPercentages[i];
//     const percentage = Number(topicPercentages[i + 1]) || 0;
//     topicDistribution.push({ topic, percentage });
//   }

//   return topicDistribution;
// }

// function generateQuestionPaper(totalMarks, easyPercentage, mediumPercentage, hardPercentage, topicDistribution) {
//   // Generate the question paper based on user input
//   const distributionConfig = [
//     { category: 'difficulty', distribution: { easy: easyPercentage, medium: mediumPercentage, hard: hardPercentage } },
//     { category: 'topic', distribution: topicDistribution }
//   ];

//   const questionPaper = questionPaperGenerator.generateQuestionPaper(totalMarks, distributionConfig);
//   console.log('Generated Question Paper:', questionPaper);

//   rl.close();
// }



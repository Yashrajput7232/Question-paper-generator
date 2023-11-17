// generator.js
const _ = require('lodash');

class QuestionPaperGenerator {
  constructor(questionStore) {
    this.questionStore = questionStore;
  }

  generateQuestionPaper(totalMarks, difficultyDistribution) {
    const questionPaper = [];

    difficultyDistribution.forEach(({ difficulty, percentage }) => {
      const targetMarks = Math.round((percentage / 100) * totalMarks);
      const questions = this.getQuestionsByDifficulty(difficulty);
      
      const selectedQuestions = _.sampleSize(questions, targetMarks);
      questionPaper.push(...selectedQuestions);
    });

    return questionPaper;
  }

  getQuestionsByDifficulty(difficulty) {
    return this.questionStore.questions.filter(question => question.difficulty === difficulty);
  }
}

module.exports = QuestionPaperGenerator;

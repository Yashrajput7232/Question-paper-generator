// questionStore.js
const fs = require('fs');
const filePath = './data/questions.json';


class QuestionStore {
  constructor(filePath) {
    this.questions = this.loadQuestions(filePath);
  }

  loadQuestions(filePath) {
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading questions:', error.message);
      return [];
    }
  }
}

module.exports = QuestionStore;

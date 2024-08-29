import { useState } from 'react';
import { FaCheck, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const questions = [
    "How often do you have trouble wrapping up final details once the challenging parts of a project are done?",
    "How often do you have difficulty getting things in order when you have to do a task that requires organization?",
    "How often do you have problems remembering appointments or obligations?",
    "When you have a task that requires a lot of thought, how often do you avoid or delay getting started?",
    "How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?",
    "How often do you feel overly active and compelled to do things, like you were driven by a motor?",
    "How often do you make careless mistakes when you have to work on a boring or difficult project?",
    "How often do you have difficulty keeping your attention when you are doing boring or repetitive work?",
    "How often do you have difficulty concentrating on what people say to you, even when they are speaking to you directly?",
    "How often do you misplace or have difficulty finding things at home or at work?",
    "How often are you distracted by activity or noise around you?",
    "How often do you leave your seat in meetings or other situations in which you are expected to remain seated?",
    "How often do you feel restless or fidgety?",
    "How often do you have difficulty unwinding and relaxing when you have time to yourself?",
    "How often do you find yourself talking too much when you are in social situations?"
];

const ADHDTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const calculateScore = () => answers.reduce((sum, answer) => sum + (answer || 0), 0);

  const getResult = (score) => {
    const maxScore = questions.length * 3;
    const percentage = (score / maxScore) * 100;
    if (percentage >= 70) return "High likelihood of ADHD";
    if (percentage >= 50) return "Moderate likelihood of ADHD";
    return "Low likelihood of ADHD";
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers(Array(questions.length).fill(null));
    setShowResult(false);
  };

  return (
    <div className="min-h-screen pt-12 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors duration-300">
      <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg transition-colors duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">ADHD Screening Test</h2>
        </div>

        {!showResult ? (
          <>
            <div className="mb-6 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-pink-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>

            <p className="mb-6 text-xl">{questions[currentQuestion]}</p>

            {['Never', 'Sometimes', 'Often', 'Very Often'].map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`w-full text-left p-4 rounded-lg mb-3 flex items-center transition-colors duration-200 ${
                  answers[currentQuestion] === index
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {answers[currentQuestion] === index && <FaCheck className="mr-3" />}
                {option}
              </button>
            ))}

            <div className="flex justify-between items-center mt-6">
              {currentQuestion > 0 && (
                <button
                  onClick={() => setCurrentQuestion(currentQuestion - 1)}
                  className="flex items-center px-4 py-2 bg-pink-500 dark:bg-pink-700 rounded hover:bg-pink-600 dark:hover:bg-pink-600 transition-colors duration-200"
                >
                  <FaArrowLeft className="mr-2" /> Previous
                </button>
              )}
              <p className="text-sm text-gray-500 dark:text-gray-400">Question {currentQuestion + 1} of {questions.length}</p>
              {currentQuestion < questions.length - 1 && (
                <button
                  onClick={() => setCurrentQuestion(currentQuestion + 1)}
                  className="flex items-center px-4 py-2 bg-pink-500 dark:bg-pink-700 rounded hover:bg-pink-600 dark:hover:bg-pink-600 transition-colors duration-200"
                >
                  Next <FaArrowRight className="ml-2" />
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Your Result</h3>
            <p className="text-3xl font-bold mb-6">{getResult(calculateScore())}</p>
            <p className="mb-6">Score: {calculateScore()} out of {questions.length * 3}</p>
            <div className="bg-pink-100 dark:bg-pink-900 border-l-4 border-pink-500 text-red-600 dark:text-pink-200 p-4 mb-6" role="alert">
              <p className="font-bold">Important Note</p>
              <p>This test is for screening purposes only and does not substitute for a professional diagnosis. Please consult with a healthcare provider for a proper evaluation.</p>
            </div>
            <button
              onClick={resetTest}
              className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors duration-200"
            >
              Take the Test Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ADHDTest;

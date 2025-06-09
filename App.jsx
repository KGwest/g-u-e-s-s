import React, { useState } from "react";

// Demo word list and associations (expand as you like!)
const WORDS = [
  { word: "apple", associations: ["fruit", "red", "pie", "tree", "sweet"] },
  { word: "cat", associations: ["animal", "pet", "feline", "whiskers", "meow"] },
  { word: "car", associations: ["drive", "vehicle", "road", "wheels", "engine"] },
];

function getScore(input, associations) {
  // Super basic similarity: how many association words match user input
  let count = 0;
  associations.forEach(a => {
    if (input.toLowerCase().includes(a)) count++;
  });
  return count;
}

export default function App() {
  const [target] = useState(() => WORDS[Math.floor(Math.random() * WORDS.length)]);
  const [guess, setGuess] = useState("");
  const [history, setHistory] = useState([]);
  const [won, setWon] = useState(false);

  const handleGuess = (e) => {
    e.preventDefault();
    const lowerGuess = guess.toLowerCase();
    if (lowerGuess === target.word) {
      setWon(true);
      setHistory(h => [
        ...h,
        { guess, response: "🎉 You guessed it! The word was " + target.word + "!" }
      ]);
    } else {
      const score = getScore(lowerGuess, target.associations);
      setHistory(h => [
        ...h,
        { guess, response: score === 0 ? "🤔 Not quite. Try a different association." : `🧐 You're on the right track! (${score}/5)` }
      ]);
    }
    setGuess("");
  };

  const restart = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-neutral-950 flex flex-col items-center justify-center px-4">
      <div className="bg-neutral-900/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-extrabold text-white tracking-widest mb-4 text-center">Association Guessing Game</h1>
        <p className="text-neutral-300 mb-6 text-center">
          Can you guess the word I'm thinking of? Enter an associated word or a full guess!
        </p>
        <form onSubmit={handleGuess} className="flex gap-2 mb-4">
          <input
            type="text"
            className="flex-1 rounded-xl px-4 py-2 bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={guess}
            onChange={e => setGuess(e.target.value)}
            placeholder={won ? "Game Over" : "Type an association or guess..."}
            disabled={won}
            required
          />
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 transition px-5 py-2 rounded-xl text-white font-bold"
            disabled={won}
          >
            {won ? "🎉" : "Guess"}
          </button>
        </form>
        <div className="h-36 overflow-y-auto mb-4">
          {history.map((item, idx) => (
            <div key={idx} className="mb-2">
              <span className="text-blue-300 font-bold">{item.guess}:</span>
              <span className="text-neutral-200 ml-2">{item.response}</span>
            </div>
          ))}
        </div>
        {won && (
          <button
            className="w-full bg-gradient-to-r from-blue-500 to-pink-600 py-2 rounded-xl font-bold text-white mt-4 shadow-lg hover:scale-105 transition"
            onClick={restart}
          >
            Play Again
          </button>
        )}
      </div>
      <footer className="mt-10 text-neutral-400 text-xs">Made with 💙 by Kezia</footer>
    </div>
  );
}

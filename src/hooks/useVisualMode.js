import { useState } from 'react';

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      const temp = history;
      temp.pop()
      setHistory(temp);
    }
    const temp = history;
    temp.push(newMode)
    setHistory(temp);
    setMode(newMode);
  }

  function back() {
    if (history.length === 1) {
      setMode(history[0])
    } else {
      const temp = history;
      temp.pop()
      setHistory(temp);
      setMode(history[history.length - 1])
    }
  }

  return { mode, transition, back }
}

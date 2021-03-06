import { useCallback, useEffect, useState } from 'react';
import { useGameId } from '../hooks';

const getSavedWords = (key: string) => {
  try {
    const item = localStorage.getItem(key);
    if (item) {
      const saved = JSON.parse(item);
      if (Array.isArray(saved)) {
        return saved.filter((word) => typeof word === 'string');
      }
    }
  } catch (ex) {
    // Do nothing
  }
  return [];
};

export const useFoundWords = () => {
  const { gameId } = useGameId();
  const key = `saved/${gameId}`;

  const [found, setStateFound] = useState<string[]>([]);

  const addFoundWord = useCallback(
    (newWord) => {
      setStateFound((existing) => {
        const newWords = [...existing, newWord].sort();
        localStorage.setItem(key, JSON.stringify(newWords));
        return newWords;
      });
    },
    [setStateFound, key]
  );

  useEffect(() => {
    setStateFound(getSavedWords(key));
  }, [key, setStateFound]);

  return {
    found,
    addFoundWord,
  };
};

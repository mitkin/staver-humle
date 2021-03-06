import { createContext, useEffect, useState } from 'react';
import { gzipJsonFetch } from '../api';
import { useLetters } from '../LettersProvider';
import Loading from '../Loading';

type Props = {
  children: React.ReactNode;
};

type ContextType = {
  words: string[];
};

export const Context = createContext<ContextType>({
  words: [],
});

const GameCreator = ({ children }: Props) => {
  const { all, centerLetter } = useLetters();

  const [words, setWords] = useState<string[]>([]);
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    const key = all.substring(0, 3);
    const url = `${process.env.PUBLIC_URL}/words/${key}.json.gz`;
    gzipJsonFetch(url)
      .then((obj) => obj[all])
      .then((loadedWords) =>
        loadedWords.filter((word: string) => word.includes(centerLetter))
      )
      .then(setWords)
      .catch(setError);
  }, [all, centerLetter]);

  if (error) {
    return <pre>{error.message}</pre>;
  }

  if (words.length === 0) {
    return <Loading />;
  }

  return <Context.Provider value={{ words }}>{children}</Context.Provider>;
};

export default GameCreator;

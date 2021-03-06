import { createContext, useEffect, useState } from 'react';
import { gzipJsonFetch } from '../api';
import { useGameId } from '../hooks';
import Loading from '../Loading';

type Props = {
  children: React.ReactNode;
};

type ContextType = {
  centerLetter: string;
  outerLetters: [string, string, string, string, string, string];
  all: string;
};

export const Context = createContext<ContextType>({
  centerLetter: '',
  outerLetters: ['', '', '', '', '', ''],
  all: '',
});

const LettersProvider = ({ children }: Props) => {
  const { gameHash } = useGameId();
  const [option, setOption] = useState('');
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    gzipJsonFetch(`${process.env.PUBLIC_URL}/words/options.json.gz`)
      .then((options) => options[gameHash % options.length])
      .then(setOption)
      .catch((e) => {
        console.error(e);
        setError(e);
      });
  }, [gameHash]);

  if (error) {
    return <div>Error!</div>;
  }

  if (!option) {
    return <Loading />;
  }

  const letters = option.split('');
  const centerLetter = letters[gameHash % letters.length];
  const outerLetters = letters.filter(
    (letter) => letter !== centerLetter
  ) as ContextType['outerLetters'];

  return (
    <Context.Provider value={{ centerLetter, outerLetters, all: option }}>
      {children}
    </Context.Provider>
  );
};

export default LettersProvider;

import React from 'react';
import { useGameState } from '../../../../data/gameState';

type FountainProps = {
};

const Fountain: React.FC<FountainProps> = () => {
  const gameState = useGameState();
  if (!gameState) return null;

  return (
    <div>
      <h2>Brunnen</h2>
      <p className='mb-1 text-left'>
        Du stehst auf einem großen gepflasterten Platz, in dessen mitte ein sprudelnder Brunnen steht.
        {gameState.gameDay === "Tag"
          ? " Im Wasser spiegelt sich das Licht der Sonne."
          : " Im Dunkel der Nacht hörst du das sanfte Plätchern."
        }
      </p>
    </div>
  );
};

export default Fountain;

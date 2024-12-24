import React from 'react';

type NewDayProps = {
};

const NewDay: React.FC<NewDayProps> = () => {

    return (
        <div className="max-widht">
            <h3>Es ist ein neuer Tag</h3>

Du öffnest deine Augen und stellst fest, dass dir ein neuer Tag geschenkt wurde. Für dich ist es dein 1. Tag. Du fühlst dich wieder frisch genug, um die Welt zu erobern!<br />
Für heute hast du 20 Runden.<br />
Deine Lebenspunkte wurden auf 10 aufgefüllt.<br />
Dein Geist und deine Stimmung sind heute Normal!<br />
Du wappnest dich mit Fäuste und ziehst auf neue Abenteuer aus.<br className='mb-1' />

Beim Rückblick auf den gestrigen Tag stellst du fest, dass:<br />
Du rein gar nichts dazugelernt hast und 1 Level aufgestiegen bist.<br />
Du 150 Goldmünzen mehr auf der Hand hast.<br />
Du der Bank 100 Goldmünzen mehr anvertraut hast.<br />
Dein Edelsteinvorrat konstant bei 0 Edelsteinen liegt.<br />
Dir dein Aussehen völlig egal ist.<br />
Dir dein Ruf völlig egal ist.<br />
Die Leute dich genauso ansehen wie gestern.<br className='mb-1' />

Die heutigen Lottozahlen sind 0-0-5-8<br />
Weil du ein Mensch bist, erhältst du heute zwei zusätzliche Waldkämpfe!<br />
Für dein Interesse in Diebesfertigkeiten erhältst du heute 1 zusätzliche Anwendung in Diebesfertigkeiten dazu.<br />

        </div>
    );
};

export default NewDay;
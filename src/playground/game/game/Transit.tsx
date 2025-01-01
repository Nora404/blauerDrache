//#region [imports]
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import BackAndNextbtn from '../../../layout/NavBtn/BackAndNextBtn';
import './Transit.css'
import { GradientText } from '../../../utility/GradientText';
import { PLACES, PlacesKeys } from '../../../data/colorfullStrings';
import { getPlaceLabelFromRoute } from '../../../routings/mappingPathToLabel';
//#endregion

//#region [prepare]
type TransitProps = {
};

const Transit: React.FC<TransitProps> = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { targetPath, startPath, steps } = useParams<{
        targetPath: string;     // z.B. "path"
        startPath: string;      // z.B. "north-gate"
        steps: string;
    }>();

    const initialSteps = Number(steps) || 5;
    const [currentSteps, setCurrentSteps] = useState<number>(initialSteps);
    //#endregion

    //#region [events]
    useEffect(() => {
        if (currentSteps <= 0) {
            navigate(`/${targetPath}`, { replace: true });
        }

        if (currentSteps >= initialSteps + 1) {
            const state = location.state as { from?: string } | undefined;
            if (state?.from) {
                navigate(state.from, { replace: true });
            } else {
                navigate(`/${startPath}`, { replace: true });
            }
        }
    }, [currentSteps, startPath, targetPath, location, initialSteps, navigate]);
    //#endregion

    //#region [handler]
    const handleGoForward = () => {
        setCurrentSteps(prev => prev - 1);
    };

    const handleGoBack = () => {
        setCurrentSteps(prev => prev + 1);
    };
    //#endregion

    //#region [helpers]
    const currentStepIndex = initialSteps - currentSteps;
    //#endregion

    //#region [jsx]
    return (
        <div className='max-width'>
            <h2>Von {getPlaceLabelFromRoute(startPath || '')} nach {getPlaceLabelFromRoute(targetPath || '')}</h2>
            <p className='mb-1 text-left'>
                Du ziehst los, um den nächsten Ort zu bereisen. Du stellst fest das du noch <b><GradientText>{currentSteps}</GradientText></b> Schritte brauchst um {getPlaceLabelFromRoute(targetPath || '')} zu erreichen.
                Du kannst dich auch einfach umdrehen und zu {getPlaceLabelFromRoute(startPath || '')} zurück gehen. Auf so einer Reise könntest du wertvolles finden: Reichtümer, Wissen oder einen qualvollen Tod.
            </p><br />

            <div className="steps-container">
                {Array.from({ length: initialSteps }).map((_, index) => (
                    // ist das gleiche wie <></> erzeugt keinen HTML Knoten (Bessere Performance)
                    <React.Fragment key={index}>
                        <div className={`step ${index === currentStepIndex ? 'active' : ''}`}>
                            {index === currentStepIndex ? '.' : ''}
                        </div>
                        {index < initialSteps - 1 && <div className="step-line"></div>}
                    </React.Fragment>
                ))}
            </div><br />

            <p className='mb-1 text-left'>
                Links von dir ist Umgebung, rechts von dir ist Umgebung – alles sieht völlig normal und unauffällig aus. Es ist schon fast langweilig wie ereignislos die letzten Schritte waren. Du kannst deinen Weg unbeirrt weiter fortsetzten.
            </p><br />

            {currentSteps > 0 && (
                <BackAndNextbtn onBack={handleGoBack} onNext={handleGoForward} />
            )}
            {currentSteps <= 0 && <p>Du hast dein Ziel erreicht ...</p>}
        </div>
    );
    //#endregion
};

export default Transit;
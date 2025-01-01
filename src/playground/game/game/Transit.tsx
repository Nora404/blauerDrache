//#region [imports]
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import BackAndNextbtn from '../../../layout/NavBtn/BackAndNextBtn';
import './Transit.css'
//#endregion

//#region [prepare]
type TransitProps = {
};

const Transit: React.FC<TransitProps> = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { target } = useParams<{ target: string }>();
    const { from } = useParams<{ from: string }>();
    const { to } = useParams<{ to: string }>();
    const { steps } = useParams<{ steps: string }>();
    const initialSteps = Number(steps) || 5;

    const [currentSteps, setCurrentSteps] = useState<number>(initialSteps);
    //#endregion

    //#region [events]
    useEffect(() => {
        if (currentSteps <= 0) {
            navigate(`/${target}`, { replace: true });
        }
        if (currentSteps >= initialSteps + 1) {
            navigate(`/${location}`, { replace: true });
        }
    }, [currentSteps, target, location]);
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
        <div>
            <h2>Von {from} nach {to}</h2>
            <p className='mb-1 text-left'>
                Es sind noch {currentSteps} Schritte bis zu deinem Ziel.
            </p>

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

            {currentSteps > 0 && (
                <BackAndNextbtn onBack={handleGoBack} onNext={handleGoForward} />
            )}
            {currentSteps <= 0 && <p>Du hast dein Ziel erreicht ...</p>}
        </div>
    );
    //#endregion
};

export default Transit;
import React from 'react';
import MultiColoredLetters from '../../utility/Formatted/MultiColoredLetters';
import { blueColors, greenColors, orangeColors, redColors, yellowColors } from '../../data/helper/colorMappingData';
import { GradientText } from '../../utility/Formatted/GradientText';
import { parseDescription } from '../../utility/Helper/ParseTextToJSX';
import { SYSTEM } from '../../data/helper/colorfullStrings';
import Talk from '../../utility/Formatted/Talk';

type ActionButtonProps = {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    label: string;
    disable?: boolean;
    color?: string[];
    result?: string;
};

const ActionButton: React.FC<ActionButtonProps> = ({
    onClick,
    label,
    disable,
    color = blueColors,
    result }) => {

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(e);
    }

    return (
        <button className="btn-border" onClick={handleClick} disabled={disable} style={{ marginLeft: "10px", marginRight: "10px" }}>
            {disable
                ? <GradientText colors={['#999999']}>{label}</GradientText>
                : <MultiColoredLetters colors={color}>{label}</MultiColoredLetters>}
            {result && <span className='text-blue-dark font-small'>{' '}({parseDescription(result)})</span>}
        </button>
    );
};

export default ActionButton;

type DefaultButtonsProps = {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disable?: boolean;
    result?: number;
};
export const BuyButton: React.FC<DefaultButtonsProps> = ({ onClick, disable, result }) => {
    const [showSuccess, setShowSuccess] = React.useState(false);
    const originalLabel = "Kaufen";
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!disable) {
            setShowSuccess(true);
            onClick(e);
            setTimeout(() => setShowSuccess(false), 1000);
        }
    };

    const displayLabel = showSuccess ? "Erfolg" : originalLabel;
    const displayColor = showSuccess ? greenColors : yellowColors;
    const resultText = result && !showSuccess ? `{Talk|rot}${-result}{/Talk} {SYSTEM.Gold}` : '';

    return <ActionButton onClick={handleClick} label={displayLabel} disable={disable} color={displayColor} result={resultText} />;
}
export const SmallBuyButton: React.FC<DefaultButtonsProps> = ({ onClick, disable, result = 0 }) => {
    const [showSuccess, setShowSuccess] = React.useState(false);

    const resultLabel = <><Talk color='rot'>{-result}</Talk> {SYSTEM.Gold}</>
    const originalLabel = <>Kaufen: {resultLabel}</>;
    const disableLabel = <><Talk color='gray'>Zu teuer: {-result} Gold</Talk></>;
    const displayLabel = showSuccess ? <Talk color='grün'>Erfolg</Talk> : originalLabel;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!disable) {
            setShowSuccess(true);
            onClick(e);
            setTimeout(() => setShowSuccess(false), 1000);
        }
    };


    return (<button className='btn-small-right' onClick={handleClick} disabled={disable}>
        {disable ? disableLabel : displayLabel}</button>);
}

export const SwapButton: React.FC<DefaultButtonsProps> = ({ onClick, disable, result }) => {
    const [showSuccess, setShowSuccess] = React.useState(false);
    const originalLabel = "Tauschen";

    console.log(result);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!disable) {
            setShowSuccess(true);
            onClick(e);
            setTimeout(() => setShowSuccess(false), 1000);
        }
    };

    const displayLabel = showSuccess ? "Erfolg" : originalLabel;
    const displayColor = showSuccess ? greenColors : orangeColors;
    const resultText = result && !showSuccess
        ? (result > 0
            ? `{Talk|rot}${-result}{/Talk}`
            : `{Talk|grün}+${-result}{/Talk}`)
        + " {SYSTEM.Gold}"
        : '';

    return <ActionButton onClick={handleClick} label={displayLabel} disable={disable} color={displayColor} result={resultText} />;
};
export const SmallSwapButton: React.FC<DefaultButtonsProps> = ({ onClick, disable, result = 0 }) => {
    const [showSuccess, setShowSuccess] = React.useState(false);

    const textColor = result > 0 ? <Talk color='rot'>{-result}</Talk> : <Talk color='grün'>+{-result}</Talk>;
    const resultLabel = <>{textColor} {SYSTEM.Gold}</>
    const originalLabel = <>Tauschen: {resultLabel}</>;
    const disableLabel = <><Talk color='gray'>Kein Tausch: {-result} Gold</Talk></>;
    const displayLabel = showSuccess ? <Talk color='grün'>Erfolg</Talk> : originalLabel;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!disable) {
            setShowSuccess(true);
            onClick(e);
            setTimeout(() => setShowSuccess(false), 1000);
        }
    };


    return (<button className='btn-small-right' onClick={handleClick} disabled={disable}>
        {disable ? disableLabel : displayLabel}</button>);
}

export const SellButton: React.FC<DefaultButtonsProps> = ({ onClick, disable }) => {
    const [showSuccess, setShowSuccess] = React.useState(false);
    const originalLabel = "Verkaufen";

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!disable) {
            setShowSuccess(true);
            onClick(e);
            setTimeout(() => setShowSuccess(false), 1000);
        }
    };

    const displayLabel = showSuccess ? "Erfolg" : originalLabel;
    const displayColor = showSuccess ? greenColors : blueColors;

    return <ActionButton onClick={handleClick} label={displayLabel} disable={disable} color={displayColor} />;
};

export const EquipButton: React.FC<DefaultButtonsProps> = ({ onClick, disable }) => {
    const [showSuccess, setShowSuccess] = React.useState(false);
    const originalLabel = "Ausrüsten";

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!disable) {
            setShowSuccess(true);
            onClick(e);
            setTimeout(() => setShowSuccess(false), 1000);
        }
    };

    const displayLabel = showSuccess ? "Jawohl!" : originalLabel;
    const displayColor = greenColors;

    return <ActionButton onClick={handleClick} label={displayLabel} disable={disable} color={displayColor} />;
};

export const UseButton: React.FC<DefaultButtonsProps> = ({ onClick, disable }) => {
    const [showSuccess, setShowSuccess] = React.useState(false);
    const originalLabel = "Benutzen";

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!disable) {
            setShowSuccess(true);
            onClick(e);
            setTimeout(() => setShowSuccess(false), 1000);
        }
    };

    const displayLabel = showSuccess ? "Hab ich!" : originalLabel;
    const displayColor = greenColors;

    return <ActionButton onClick={handleClick} label={displayLabel} disable={disable} color={displayColor} />;
};

export const DropButton: React.FC<DefaultButtonsProps> = ({ onClick, disable }) => {
    const [showSuccess, setShowSuccess] = React.useState(false);
    const originalLabel = "Ablegen";

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!disable) {
            setShowSuccess(true);
            onClick(e);
            setTimeout(() => setShowSuccess(false), 1000);
        }
    };

    const displayLabel = showSuccess ? "Ok!" : originalLabel;
    const displayColor = showSuccess ? greenColors : yellowColors;

    return <ActionButton onClick={handleClick} label={displayLabel} disable={disable} color={displayColor} />;
};

export const RemoveButton: React.FC<DefaultButtonsProps> = ({ onClick, disable }) => {
    const [showSuccess, setShowSuccess] = React.useState(false);
    const originalLabel = "Wegwerfen";

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!disable) {
            setShowSuccess(true);
            onClick(e);
            setTimeout(() => setShowSuccess(false), 1000);
        }
    };

    const displayLabel = showSuccess ? "Ist weg!" : originalLabel;
    const displayColor = showSuccess ? greenColors : redColors;

    return <ActionButton onClick={handleClick} label={displayLabel} disable={disable} color={displayColor} />;
};

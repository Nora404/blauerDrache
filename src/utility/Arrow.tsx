// export const arrowMap: Record<string, string> = {
//     n: "&uarr;",
//     o: "&rarr;",
//     s: "&darr;",
//     w: "&larr;",
//     no: "&nearr;",
//     so: "&searr;",
//     nw: "&nwarr;",
//     sw: "&swarr;",
// };

// type ArrowProps = {
//     type?: keyof typeof arrowMap;
// };

// const Arrow: React.FC<ArrowProps> = ({ type }) => {
//     const defaultSymbol = "&#x2609;";

//     return (
//         <span
//             className="arrow"
//             dangerouslySetInnerHTML={{
//                 __html: type ? arrowMap[type] : defaultSymbol,
//             }}
//         />
//     );
// };

// export default Arrow;


export const arrowMap: Record<string, string> = {
    n: "rotate(0deg)",
    o: "rotate(90deg)",
    s: "rotate(180deg)",
    w: "rotate(-90deg)",
    no: "rotate(45deg)",
    so: "rotate(135deg)",
    nw: "rotate(-45deg)",
    sw: "rotate(-135deg)",
};

type ArrowProps = {
    type?: keyof typeof arrowMap;
};

const Arrow: React.FC<ArrowProps> = ({ type = "n" }) => {
    return (
        <span
            className="arrow"
            style={{
                transform: arrowMap[type],
            }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="arrow-icon"
            >
                <path d="M12 2l7 7h-5v12h-4v-12h-5z" fill="currentColor" />
            </svg>
        </span>
    );
};

export default Arrow;

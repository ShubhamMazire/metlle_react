import React from "react";

import { Box } from "@mui/material";

const MyText = ({
    h0,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    h7,
    h8,
    h9,
    h10,
    h11,
    h12,
    h13,
    p,
    bold,
    medium,
    semibold,
    light,
    thin,
    italic,
    title,
    style,
    children,
    center,
    color,
    fontSize,
    extrabold,
    u,
    ...rest
}) => {


    var styles= [
        { fontFamily: "poppinsregular",display:"inline-block" },
        h0 && { fontSize: "7vw" },  // Responsive font size using vw
        
        h1 && { fontSize: "3vw" },  // Responsive font size using vw
        h2 && { fontSize: "2.5vw" },  // Responsive font size using vw
        h3 && { fontSize: "2vw" },  // Responsive font size using vw
        h4 && { fontSize: "1.8vw" },  // Responsive font size using vw
        h5 && { fontSize: "1.6vw" },  // Responsive font size using vw
        h6 && { fontSize: "1.4vw" },  // Responsive font size using vw
        h7 && { fontSize: "1.2vw" },  // Responsive font size using vw
        h8 && { fontSize: "1vw" },  // Responsive font size using vw
        h9 && { fontSize: "0.8vw" },  // Responsive font size using vw
        h10 && { fontSize: "0.6vw" },  // Responsive font size using vw
        h11 && { fontSize: "0.4vw" },  // Responsive font size using vw
        h12 && { fontSize: "0.2vw" },  // Responsive font size using vw
        h13 && { fontSize: "0.1vw" },  // Responsive font size using vw
        p && { fontSize: "1.4vw" },  // Responsive font size using vw
        u && { textDecorationLine: "underline" },
        fontSize && { fontSize: `${fontSize}vw` },  // Custom responsive font size using vw
        color && { color },
        center && { textAlign: "center" },
        extrabold && { fontFamily: "poppinsextrabold" },
        bold && { fontFamily: "poppinsbold" },
        semibold && { fontFamily: "poppinssemibold" },
        medium && { fontFamily: "poppinsmedium" },
        light && { fontFamily: "poppinslight" },
        thin && { fontFamily: "poppinsthin" },
        italic && { fontStyle: "italic" },
        style,
    ]

    // merge styles into one object

    styles = Object.assign({}, ...styles);

    return (
        <Box

            sx={styles}
            {...rest}
        >
            {children}
        </Box>
    );
};

export default MyText;

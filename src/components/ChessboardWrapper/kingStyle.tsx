import React from "react";

// @ts-ignore
export const getKingStyle = (isChecked: boolean, width: number, isWhite: boolean) =>
    <svg viewBox="1 1 43 43" width={width} height={width}>
        <g>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="45"
                height="45"
            >
                <g
                    style={{
                        "fill": "none",
                        "fill-opacity": 1,
                        "fill-rule": "evenodd",
                        "stroke": !isWhite && isChecked ? "rgb(255, 0, 0)" : "rgb(0, 0, 0)",
                        "stroke-width": 1.5,
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-miterlimit": 4,
                        "stroke-dasharray": "none",
                        "stroke-opacity": 1
                    }}
                >
                    {isWhite ? (
                        <>
                            <path
                                d="M 22.5,11.63 L 22.5,6"
                                style={{"fill": "none", "stroke": "rgb(0, 0, 0)", "stroke-linejoin": "miter"}}
                            />
                            <path
                                d="M 20,8 L 25,8"
                                style={{"fill": "none", "stroke": "rgb(0, 0, 0)", "stroke-linejoin": "miter"}}
                            />
                            <path
                                d="M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25"
                                style={{"fill": isChecked ? "rgb(255, 0, 0)" : "rgb(255, 255, 255)", "stroke": "rgb(0, 0, 0)", "stroke-linecap": "butt", "stroke-linejoin": "miter"}}
                            />
                            <path
                                d="M 11.5,37 C 17,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 19,16 9.5,13 6.5,19.5 C 3.5,25.5 11.5,29.5 11.5,29.5 L 11.5,37 z "
                                style={{"fill": isChecked ? "rgb(255, 0, 0)" : "rgb(255, 255, 255)", "stroke": "rgb(0, 0, 0)"}}
                            />
                            <path
                                d="M 11.5,30 C 17,27 27,27 32.5,30"
                                style={{"fill": "none", "stroke": "rgb(0, 0, 0)"}}
                            />
                            <path
                                d="M 11.5,33.5 C 17,30.5 27,30.5 32.5,33.5"
                                style={{"fill": "none", "stroke": "rgb(0, 0, 0)"}}
                            />
                            <path
                                d="M 11.5,37 C 17,34 27,34 32.5,37"
                                style={{"fill": "none", "stroke": "rgb(0, 0, 0)"}}
                            />
                        </>
                    ) : (
                        <>
                            <path
                                d="M 22.5,11.63 L 22.5,6"
                                id="path6570"
                                style={{"fill": isChecked ? "rgb(255, 0, 0)" : "rgb(0, 0, 0)", "stroke": isChecked ? "rgb(255, 0, 0)" : "rgb(0, 0, 0)", "stroke-linejoin": "miter"}}
                            />
                            <path
                                d="M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25"
                                style={{"fill": isChecked ? "rgb(255, 0, 0)" : "rgb(0, 0, 0)", "fill-opacity": 1, "stroke-linecap": "butt", "stroke-linejoin": "miter"}}
                            />
                            <path
                                d="M 11.5,37 C 17,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 19,16 9.5,13 6.5,19.5 C 3.5,25.5 11.5,29.5 11.5,29.5 L 11.5,37 z "
                                style={{"fill": isChecked ? "rgb(255, 0, 0)" : "rgb(0, 0, 0)", "stroke": isChecked ? "rgb(255, 0, 0)" : "rgb(0, 0, 0)"}}
                            />
                            <path
                                d="M 20,8 L 25,8"
                                style={{"fill": "none", "stroke": isChecked ? "rgb(255, 0, 0)" : "rgb(0, 0, 0)"}}
                            />
                            <path
                                d="M 32,29.5 C 32,29.5 40.5,25.5 38.03,19.85 C 34.15,14 25,18 22.5,24.5 L 22.51,26.6 L 22.5,24.5 C 20,18 9.906,14 6.997,19.85 C 4.5,25.5 11.85,28.85 11.85,28.85"
                                style={{"fill": "none", "stroke": "rgb(255, 255, 255)"}}
                            />
                            <path
                                d="M 11.5,30 C 17,27 27,27 32.5,30 M 11.5,33.5 C 17,30.5 27,30.5 32.5,33.5 M 11.5,37 C 17,34 27,34 32.5,37"
                                style={{"fill": "none", "stroke": "rgb(255, 255, 255)"}}
                            />
                        </>
                    )}
                </g>
            </svg>
        </g>
    </svg>
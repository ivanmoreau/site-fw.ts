import {h} from "preact";

export const jsx = (...p) => {
    return h(p[0], p[1], ...(Array.isArray(p[1].children) ? p[1].children : [p[1].children]))
}

export const jsxDEV = jsx
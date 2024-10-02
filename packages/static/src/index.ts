/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type {JSX} from "./jsx-runtime";
import {type VNode} from "preact";
import fs from "node:fs/promises"
import {render} from "preact-render-to-string";
import {renderToStringAsync} from "./preact-code/render";

type NotEmpty<T> = keyof T extends never ? never : T;

export interface Routes {
    [Key: string]: (() => NotEmpty<Routes>) | JSX.Element
}

export const subroute: (routes: NotEmpty<Routes>) => () => Routes = (routes: NotEmpty<Routes>) => () => routes;

type Tree = Array<[string, Promise<VNode<any>> | Tree]>;

const internalBuildPage = (routes: NotEmpty<Routes>): Tree => {
    const keys: string[] = Object.keys(routes);
    return keys.map((key) => {
        const value = routes[key];
        if (typeof value === "function") {
            return [key, internalBuildPage(value())]
        } else {
            return [key, Promise.resolve(value.type).then(thisType => ({
                ...value,
                type: thisType
            })) as Promise<VNode<any>>]
        }
    });
};

const isTree = (tree: Promise<VNode<any>> | Tree): tree is Tree => {
    return Array.isArray(tree)
}

const INDEX = "index.html"

const internalC = async (tree: Tree, basePath: string) => {
    for (const page of tree) {
        const content = page[1];
        const name = page[0];
        const hasTree = isTree(content);
        const thisPath = hasTree ? (basePath + name + "/") : (name === "index" ? basePath : basePath + name + "/");
        if (hasTree) {
            await internalC(content, thisPath);
        } else {
            const data = "<!DOCTYPE HTML>\n" + await renderToStringAsync(await content);
            if (!await fs.exists(thisPath)) {
                await fs.mkdir(thisPath, {recursive: true})
            }
            await fs.writeFile(thisPath + INDEX, data)
        }
    }
}

export const buildSite = async (routes: NotEmpty<Routes>) => {
    const tree = internalBuildPage(routes);
    const basePath = "dir/";
    await internalC(tree, basePath);
};
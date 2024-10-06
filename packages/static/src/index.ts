/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type {JSX} from "./jsx-runtime";
import {type VNode} from "./types/preact-types"
import fs from "node:fs/promises"
import {renderToStringAsync} from "./preact-code/render";
import { startDevServer } from '@web/dev-server';

type NotEmpty<T> = keyof T extends never ? never : T;

export interface Context {
    path: Array<string>
}

export interface Branch {
    [Key: string]: Node
}

type Node = { type: "leaf", fun: ((ctx: Context) => JSX.Element) } | {
    type: "branch",
    subroutes: NotEmpty<Branch>
}

type Routes = NotEmpty<Branch>

export const subroute: (routes: NotEmpty<Routes>) => () => Routes = (routes: NotEmpty<Routes>) => () => routes;

type Tree = Array<[string, ((ctx: Context) => VNode<any>) | Tree]>;

const internalBuildPage = (routes: NotEmpty<Routes>): Tree => {
    const keys: string[] = Object.keys(routes);
    return keys.map((key) => {
        const value = routes[key];
        if (value.type === "leaf") {
            return [key, value.fun]
        } else {
            return [key, internalBuildPage(value.subroutes)]
        }
    });
};

const isTree = (tree: ((ctx: Context) => JSX.Element) | Tree): tree is Tree => {
    return Array.isArray(tree)
}

const INDEX = "/index.html"

const internalC = async (tree: Tree, basePath: Array<string>) => {
    for (const page of tree) {
        const content = page[1];
        const name = page[0];
        const hasTree = isTree(content);
        const thisPath = hasTree || name !== "index" ? [...basePath, name] : basePath;
        const stringPath = "".concat(...thisPath.flatMap(e => ['/', e]).slice(1));
        if (hasTree) {
            await internalC(content, thisPath);
        } else {
            const data = "<!DOCTYPE HTML>\n" + await renderToStringAsync(content({
                path: thisPath
            }) as any);
            if (!await fs.exists(stringPath)) {
                await fs.mkdir(stringPath, {recursive: true})
            }
            await fs.writeFile(stringPath + INDEX, data)
        }
    }
}

export const buildSite = async (routes: NotEmpty<Routes>) => {
    const tree = internalBuildPage(routes);
    const basePath = ["dist"];
    await internalC(tree, basePath);

    if (process.argv.includes("--dev-server")) {
        console.log("Running dev server...")
        const server = await startDevServer({
            config: {
                rootDir: process.cwd() + "/dist"
            }
        })
    }
};

export const sub = (routes: NotEmpty<Routes>): Node => ({
    type: "branch",
    subroutes: routes
});

export const page = (page: (ctx: Context) => JSX.Element): Node => ({
    type: "leaf",
    fun: page
});
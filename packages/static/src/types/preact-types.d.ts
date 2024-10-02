/*
 *   Copyright (c) 2015 Jason Miller
 *
 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 *
 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.
 *
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 */

import {_JSXInternal} from "./types";

//
// Preact Virtual DOM
// -----------------------------------

// We use the `current` property to differentiate between the two kinds of Refs so
// internally we'll define `current` on both to make TypeScript happy

export type Key = string | number | any;

export type RefObject<T> = { current: T | null };
export type RefCallback<T> = {
    (instance: T | null): void | (() => void);
    current: undefined;
};
export type Ref<T> = RefObject<T> | RefCallback<T> | null;

export type ComponentChild =
    | VNode<any>
    | string
    | number
    | boolean
    | null
    | undefined;
export type ComponentChildren = ComponentChild[] | ComponentChild;

// Redefine ComponentType using our new internal FunctionComponent interface above
export type ComponentType<P = {}> = _JSXInternal.FunctionComponent<P>;

export interface VNode<P = {}> {
    type: ComponentType<P> | string;
    props: P & { children: ComponentChildren };
    key: Key;
    /**
     * ref is not guaranteed by React.ReactElement, for compatibility reasons
     * with popular react libs we define it as optional too
     */
    ref?: Ref<any> | null;
    /**
     * The time this `vnode` started rendering. Will only be set when
     * the devtools are attached.
     * Default value: `0`
     */
    startTime?: number;
    /**
     * The time that the rendering of this `vnode` was completed. Will only be
     * set when the devtools are attached.
     * Default value: `-1`
     */
    endTime?: number;
}

export interface Attributes {
    key?: Key | undefined;
    jsx?: boolean | undefined;
}

export interface ClassAttributes<T> extends Attributes {
    ref?: Ref<T>;
}
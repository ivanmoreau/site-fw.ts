/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This file incorporates work covered by the following copyright and permission notice:
 *
 *   Copyright (c) 2015-present Jason Miller
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

import {JSXInternal} from "preact/src/jsx";
import {_JSXInternal} from "../types/types";
import {VNode, ComponentChildren, Attributes, ClassAttributes} from "../types/preact-types";

export import JSX = _JSXInternal

export function jsx(
    type: 'input',
    props:
        | (JSXInternal.DOMAttributes<HTMLInputElement> &
        ClassAttributes<HTMLInputElement>)
        | null,
    ...children: ComponentChildren[]
): VNode<
    JSXInternal.DOMAttributes<HTMLInputElement> &
    ClassAttributes<HTMLInputElement>
>;
export function jsx<
    P extends JSXInternal.HTMLAttributes<T>,
    T extends HTMLElement
>(
    type: keyof JSXInternal.IntrinsicElements,
    props: (ClassAttributes<T> & P) | null,
    ...children: ComponentChildren[]
): VNode<ClassAttributes<T> & P>;
export function jsx<
    P extends JSXInternal.SVGAttributes<T>,
    T extends HTMLElement
>(
    type: keyof JSXInternal.IntrinsicElements,
    props: (ClassAttributes<T> & P) | null,
    ...children: ComponentChildren[]
): VNode<ClassAttributes<T> & P>;
export function jsx<T extends HTMLElement>(
    type: string,
    props:
        | (ClassAttributes<T> &
        JSXInternal.HTMLAttributes &
        JSXInternal.SVGAttributes)
        | null,
    ...children: ComponentChildren[]
): VNode<
    | (ClassAttributes<T> &
    JSXInternal.HTMLAttributes &
    JSXInternal.SVGAttributes)
    | null
>;
export function jsx<P>(
    type: JSX.FunctionComponent<P>,
    props: (Attributes & P) | null,
    ...children: ComponentChildren[]
): VNode<Attributes & P> | Promise<VNode<Attributes & P>>;

export const jsxDev: typeof jsx

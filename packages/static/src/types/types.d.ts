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

import {h, RenderableProps} from "preact";
import {VNode} from "./preact-types";

declare namespace _JSXInternal {
    export interface FunctionComponent<P = {}> {
        (props: RenderableProps<P>, context?: any): VNode<any> | Promise<any>;

        displayName?: string;
        defaultProps?: Partial<P> | undefined;
    }

    export type IntrinsicElements = h.JSX.IntrinsicElements

    export type ElementType<P = any> =
        | {
        [K in keyof IntrinsicElements]: P extends IntrinsicElements[K]
            ? K
            : never;
    }[keyof IntrinsicElements]
        | FunctionComponent<P>;

    export interface Element extends VNode<any> {}

    export interface ElementChildrenAttribute {
        children: any;
    }
}
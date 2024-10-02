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

// Options hooks
export const DIFF = '__b';
export const RENDER = '__r';
export const DIFFED = 'diffed';
export const COMMIT = '__c';
export const SKIP_EFFECTS = '__s';
export const CATCH_ERROR = '__e';

// VNode properties
export const COMPONENT = '__c';
export const CHILDREN = '__k';
export const PARENT = '__';
export const MASK = '__m';

// Component properties
export const VNODE = '__v';
export const DIRTY = '__d';
export const NEXT_STATE = '__s';
export const CHILD_DID_SUSPEND = '__c';
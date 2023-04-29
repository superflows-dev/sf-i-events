/**
 * @license
 * Copyright 2022 Superflows.dev
 * SPDX-License-Identifier: MIT
 */
import { SfIEvents } from '../sf-i-events.js';
// import { stub } from 'sinon';
// import {fixture, assert} from '@open-wc/testing';
import { assert } from '@open-wc/testing';
// import {html} from 'lit/static-html.js';
//const TIMEOUT = 2000;
suite('sf-i-events > left menu', () => {
    test('is defined', () => {
        const el = document.createElement('sf-i-events');
        assert.instanceOf(el, SfIEvents);
    });
});
//# sourceMappingURL=sf-i-events_test.js.map
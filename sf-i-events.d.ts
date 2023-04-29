/**
 * @license
 * Copyright 2022 Superflow.dev
 * SPDX-License-Identifier: MIT
 */
import { LitElement, PropertyValueMap } from 'lit';
/**
 * SfIEvents element.
 * @fires renderComplete - When the list is populated
 * @fires valueChanged - When the value is changed
 * @property apiId - backend api id
 * @property label - input label
 * @property name - name of the input
 * @property mode - mode of operation
 * @property selectedId - id to preselect
 * @property selectedValue - callback function
 */
export declare class SfIEvents extends LitElement {
    apiIdList: string;
    apiIdDetail: string;
    apiMethodList: string;
    apiMethodDetail: string;
    apiBodyList: string;
    apiBodyDetail: string;
    apiResponseFieldList: string;
    calendarStartDD: string;
    calendarStartMM: string;
    calendarStartYYYY: string;
    calendar: Date[];
    monthNames: string[];
    events: any;
    eventFields: any;
    getEventFields: () => any;
    eventFieldDependencies: any;
    getEventFieldDependencies: () => any;
    getApiBodyList: () => any;
    getApiBodyDetail: () => any;
    mode: string;
    flow: string;
    static styles: import("lit").CSSResult;
    _SfRowError: any;
    _SfRowErrorMessage: any;
    _SfRowSuccess: any;
    _SfRowSuccessMessage: any;
    _SfLoader: any;
    _SfCalendarContainer: any;
    _SfStreamContainer: any;
    getEventField: (field: string) => any;
    getParentFieldFromDepedencies: (field: string) => any;
    getEventTexts: (field: string, selectedId: Array<string>, row: any) => string;
    enableStream(value: boolean): void;
    prepareXhr: (data: any, url: string, loaderElement: any, authorization: any) => Promise<unknown>;
    clearMessages: () => void;
    setError: (msg: string) => void;
    setSuccess: (msg: string) => void;
    getLastDayOfLastMonth: (month: number, year: number) => number;
    getLastDayOfMonth: (month: number, year: number) => number;
    getBlanks: (month: number, year: number) => number;
    insertDates: (month: number, year: number) => string;
    insertDayNames: () => string;
    renderStreamEvents: (index: number, month: number, year: number) => string;
    renderStream: (index?: number) => void;
    renderCalendar: () => void;
    processEvent: (value: any) => void;
    fetchDetail: (value: any) => Promise<void>;
    fetchList: () => Promise<void>;
    initCalendar: () => Promise<void>;
    initInputs: () => void;
    initListeners: () => void;
    loadMode: () => Promise<void>;
    constructor();
    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    connectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sf-i-events': SfIEvents;
    }
}
//# sourceMappingURL=sf-i-events.d.ts.map
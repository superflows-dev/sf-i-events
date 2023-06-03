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
    TAB_YEAR: string;
    TAB_STREAM: string;
    TAB_UPCOMING: string;
    TAB_THIS: string;
    TAB_PAST: string;
    TAB_CUSTOM: string;
    TAB_REPORTER: string;
    TAB_APPROVER: string;
    COLOR_APPROVED: string;
    COLOR_NOT_STARTED: string;
    COLOR_IN_PROGRESS: string;
    name: string;
    apiId: string;
    apiIdList: string;
    apiIdDetail: string;
    apiIdUsers: string;
    apiIdTags: string;
    apiMethodList: string;
    apiMethodDetail: string;
    apiBodyList: string;
    apiBodyDetail: string;
    userProfileId: string;
    projectId: string;
    projectName: string;
    apiResponseFieldList: string;
    myRole: string;
    chart: any;
    calendarStartDD: string;
    calendarStartMM: string;
    calendarStartYYYY: string;
    calendar: Date[];
    mappedValuesDueDates: any;
    mappedValuesUsers: any;
    mappedValuesTags: any;
    unmappedEvents: any;
    mappings: any;
    monthNames: string[];
    events: any;
    eventsInWindow: any;
    eventHideFields: any;
    getEventHideFields: () => any;
    eventPreviewFields: any;
    getEventPreviewFields: () => any;
    eventFields: any;
    getEventFields: () => any;
    eventFieldDependencies: any;
    getEventFieldDependencies: () => any;
    getApiBodyList: () => any;
    getApiBodyDetail: () => any;
    csvDataCompliances: string;
    csvDataStats: string;
    mode: string;
    flow: string;
    fill: string;
    filterTags: string[];
    static styles: import("lit").CSSResult;
    _SfIEventsC: any;
    _SfRowError: any;
    _SfRowErrorMessage: any;
    _SfRowSuccess: any;
    _SfRowSuccessMessage: any;
    _SfLoader: any;
    _SfCalendarContainer: any;
    _SfButtonGenerate: any;
    _SfButtonSyncChosenProject: any;
    _SfButtonMapChosenProject: any;
    _SfButtonBackChosenProject: any;
    _SfButtonBackCalendarMapping: any;
    _SfButtonBackSyncMapping: any;
    _SfButtonBackChosenMapping: any;
    _SfTitleChosenProject: any;
    _SfTitleChosenMapping: any;
    _SfContainerChosenProject: any;
    _SfContainerProjectSelect: any;
    _SfContainerProjectActions: any;
    _SfStreamContainer: any;
    _SfUpcomingContainer: any;
    _SfDetailContainer: any;
    _SfThisContainer: any;
    _SfPastContainer: any;
    _SfCustomContainer: any;
    _SfMappingContainer: any;
    _SfStreamEventStatus: any;
    _SfTabContainer: any;
    _SfMappingTabContainer: any;
    _SfRoleTabContainer: any;
    _SfProject: any;
    _SfUploader: any;
    getEventField: (field: string) => any;
    getParentFieldFromDepedencies: (field: string) => any;
    getEventTexts: (field: string, selectedId: Array<string>, row: any) => string;
    enableCalendar: () => void;
    enableStream: () => void;
    enableUpcoming(): void;
    enableThis(): void;
    enablePast(): void;
    enableCustom(): void;
    prepareXhr: (data: any, url: string, loaderElement: any, authorization: any) => Promise<unknown>;
    clearMessages: () => void;
    setError: (msg: string) => void;
    setSuccess: (msg: string) => void;
    getLastDayOfLastMonth: (month: number, year: number) => number;
    getLastDayOfMonth: (month: number, year: number) => number;
    getFirstDateOfLastWeek: (startDate: Date) => Date;
    getFirstDayOfLastMonth(yourDate: Date): Date;
    getFirstDateOfWeek: (startDate: Date) => Date;
    getBlanks: (month: number, year: number) => number;
    insertDates: (month: number, year: number) => string;
    insertDayNames: () => string;
    renderStreamEvents: (index: number, month: number, year: number) => string;
    renderUpcomingEvents: (index: number, startDate: Date, count: number) => string;
    renderThisEvents: (index: number, startDate: Date) => string;
    renderPastEvents: (index: number, startDate: Date) => string;
    renderRangeEvents: (firstDate: Date, count: number) => void;
    checkStartDateEarliness: (value: string) => boolean;
    checkEndDateLateness: (value: string) => boolean;
    processDateSelection: () => void;
    initCustomRightCol: () => void;
    checkAndShowBulk: () => boolean;
    calculateAndShowSummary: () => void;
    showAllEvents: () => void;
    showMappedEvents: () => void;
    showUnmappedEvents: () => void;
    updateInAllSelections: (param: string, value: any) => void;
    updateMappingStatus: (value: any, clickIndex: number) => void;
    filterEventsInWindow: (tags: Array<string>, ctx: any) => void;
    renderCustom: () => void;
    renderPast: (index?: number) => void;
    renderUpcoming: (index?: number) => void;
    renderThis: (index?: number) => void;
    renderStream: (index?: number) => void;
    renderEventDetail: (event: any, mmddyyyy: any) => void;
    renderCalendar: () => void;
    renderRoleTabs: () => void;
    csvmaker: (data: any) => string;
    renderChartSettingsFilters: (container: HTMLDivElement, ctx: any) => void;
    renderChartSettingsSettings: (container: HTMLDivElement) => void;
    renderChartSettings: (container: HTMLDivElement, selectedTab: number | undefined, ctx: any) => void;
    renderChart: (ctx: any, type: any, data: any) => void;
    getCurrentTab: () => string;
    renderTabs: (selectedTab: string) => void;
    renderMappingTabs: (selectedTab: string) => void;
    renderExpandEvent: (events: any, index: any) => void;
    renderMapping: (unmappedEvents: any) => void;
    applyFilter: (filter?: string) => void;
    getIndexFromId: (id: string) => number;
    prepopulateMapping: (mappings: any) => void;
    clearAllMappingSelections: () => void;
    clearAllCalendars: () => void;
    transformMappingsForUpload: (mapping: any) => {
        duedates: any;
        tags: any;
        users: any;
    };
    uploadReview: (mmddyyyy: string, eventid: string, comments: string, approved: any) => Promise<void>;
    uploadReport: (mmddyyyy: string, eventid: string, comments: string, docs: any) => Promise<void>;
    uploadMapping: () => Promise<void>;
    uploadEvents: () => Promise<void>;
    processEvent: (value: any) => void;
    renderChosenProject: (events?: any) => void;
    fetchDetail: (value: any) => Promise<void>;
    fetchUserCalendar: () => Promise<void>;
    fetchCalendar: () => Promise<void>;
    fetchEventMap: () => Promise<void>;
    fetchList: () => Promise<void>;
    initCalendar: () => Promise<void>;
    initInputs: () => void;
    showChooseProject: () => void;
    showChosenProject: () => void;
    showChosenMapping: () => void;
    truncate: (str: string, n: number, useWordBoundary: boolean, ellipsis?: boolean) => string;
    initListenersAdmin: () => void;
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
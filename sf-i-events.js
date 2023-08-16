/**
 * @license
 * Copyright 2022 Superflow.dev
 * SPDX-License-Identifier: MIT
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, query, queryAssignedElements, property } from 'lit/decorators.js';
// import {customElement, query, property} from 'lit/decorators.js';
import Util from './util';
import { Chart, registerables } from 'chart.js';
// import {LitElement, html, css} from 'lit';
// import {customElement} from 'lit/decorators.js';
/*

Modes: View, Add, Edit, Delete, Admin
DB: partitionKey, rangeKey, values

*/
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
let SfIEvents = class SfIEvents extends LitElement {
    constructor() {
        super();
        this.SEARCH_BLOCK_SIZE = 10;
        this.TAB_YEAR = "year";
        this.TAB_STREAM = "stream";
        this.TAB_UPCOMING = "upcoming";
        this.TAB_THIS = "this";
        this.TAB_PAST = "past";
        this.TAB_CUSTOM = "custom";
        this.TAB_ADHOC = "adhoc";
        this.TAB_REPORTER = "reporter";
        this.TAB_APPROVER = "approver";
        this.TAB_STATUTES = "statutes";
        this.TAB_COMPLIANCES = "compliances";
        this.TAB_ENTITIES = "entities";
        this.TAB_LOCATIONS = "locations";
        this.TAB_TAGS = "tags";
        this.TAB_REPORTERS = "reporters";
        this.TAB_APPROVERS = "approvers";
        this.TAB_DUEDATES = "duedates";
        this.TAB_ALERTSCHEDULES = "alertschedules";
        this.TAB_INTERNALCONTROLS = "internalcontrols";
        this.TAB_FUNCTIONS = "functions";
        this.TAB_COUNTRIES = "countries";
        this.TAB_CALENDAR = "calendar";
        this.COLOR_APPROVED = "#50cf01";
        this.COLOR_NOT_STARTED = "#A4A9AD";
        this.COLOR_IN_PROGRESS = "#ffe505";
        this.COLOR_PAST_DUE_DATE = "#F79256";
        this.COLOR_LATE_EXECUTED = "#840B0F";
        this.COLOR_LATE_APPROVED = "#EE2F36";
        this.CERTIFICATE_HTML = `
  
  <html>
    <head>  
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
    rel="stylesheet">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;600&display=swap" rel="stylesheet">
      <style>
        body {
          font-family: Source Sans Pro;
          margin: 2px;
          padding: 20px;
          border: solid 5px gray;
          border-style: groove;
          background-color: #efefef;
        }
        .certificate-section {
          background-image: url('https://flagggrc-images.s3.amazonaws.com/certificate_background.jpg');
          background-size: cover;
          background-position: center;
          box-shadow: inset 2px 2px 6px rgba(5, 5, 5, 0.2);
          border-top: solid 1px rgba(255, 255, 255, 0.8);
          border-left: solid 1px rgba(255, 255, 255, 0.8);
          border-bottom: solid 1px rgba(255, 255, 255, 0.8);
          border-right: solid 1px rgba(255, 255, 255, 0.8);
          overflow:hidden;
          padding-top: 10px;
          padding-bottom: 20px;
          padding-left: 20px;
          padding-right: 20px;
          border-radius: 10px;
        }
        .certificate-section h1 {
          font-family: Belanosima;
          font-weight: 600;
        }
        .text-center {
          text-align: center;
        }
        .d-flex {
          display: flex;
        }
        .justify-center {
          justify-content: center;
        }
        .justify-between {
          justify-content: space-between;
        }
        .align-center {
          align-items: center;
        }
        .w-25 {
          width: 25%;
        }
        .w-16 {
          width: 16%;
        }
        .w-14 {
          width: 14%;
        }
        .w-12 {
          width: 12%;
        }
        .w-100 {
          width: 100%;
        }
        .text-center {
          text-align: center;
        }
        table {
          box-shadow: 1px 1px 10px 0 rgba(0, 0, 0, 0.25), -1px -1px 10px 0 rgba(255, 255, 255, 0.6);
          border-top: solid 1px rgba(255, 255, 255, 0.8);
          border-left: solid 1px rgba(255, 255, 255, 0.8);
          border-bottom: solid 1px rgba(255, 255, 255, 0.8);
          border-right: solid 1px rgba(255, 255, 255, 0.8);
          overflow:hidden;
        }
        th {
          background-color: #6a6a6a;
          color: white;
          padding: 5px;
        }
        td {
          padding: 5px;
          font-size: 70%;
          vertical-align: top;
        }
        td span {
          font-size: 130% !important;
        }
        .td-odd {
          background-color: #efefef;
          
        }
        .td-even {
          background-color: #dedede;
        }
        .color-pending {
          color: #ffe505;
        }
        .color-not-started {
          color: #888888;
        }
        .color-done {
          color: #50cf01;
        }
        .color-past-due-date {
          color: #F79256;
        }
        .color-late-executed {
          color: #840B0F;
        }
        .color-late-approved {
          color: #EE2F36;
        }
      </style>
    </head>
    <body>
      <div class="certificate-section">
        <h1 class="text-center">Certificate</h1>
        <p>I, PERSON_NAME, working as PERSON_DESIGNATION in PERSON_COMPANY, hereby declare that I am entrusted with the responsibility of ensuring compliance with various laws applicable to the company in the administration of business and the affairs of the company</p>
        <p>After having examined and considered all relevant information and based on the information furnished by the concerned officers, I, do hereby certify that the Finance / Technical / Administration / Legal wings / department of PERSON_COMPANY for the period PERSON_PERIOD, has in the conduct of business:</p>
        <ol>
          <li>Complied with all applicable laws, enactments, orders, rules, regulations, and other statutory requirements of the Central, State and other Statutory and local authorities concerning the business and affairs of the company;</li>
          <li>Paid all applicable statutory dues on due dates;</li>
          <li>Maintained proper registers, records, documents and books and filed proper returns, forms and statements and furnished necessary particulars to the relevant authorities; and</li>
          <li>Not done or committed any act or entered into any transactions in violation of any statutory provisions</li>
        </ol>
        <br /><br />
        <div class="d-flex justify-between align-center">
          <div>
            <div>Date: PERSON_DATE</div>
            <div>Place: </div>
          </div>
          <div>
            <div>Name: PERSON_NAME</div>
            <div>Role: PERSON_DESIGNATION</div>
          </div>
        </div>
      </div>
      <br /><br />
      <h3>Compliance Status</h3>
      PERSON_COMPLIANCE_STATUS
      <br /><br />
      <h3>Compliances List</h3>
      PERSON_COMPLIANCES
    </body>
  </html>
  
  `;
        this.myOnboardingTab = this.TAB_STATUTES;
        this.myRole = this.TAB_REPORTER;
        this.chart = null;
        this.calendar = [];
        this.mappedValuesDueDates = {};
        this.mappedValuesUsers = {};
        this.mappedValuesTags = {};
        this.unmappedEvents = null;
        this.mappings = null;
        this.triggers = null;
        this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.events = null;
        this.eventsInWindow = null;
        this.eventHideFields = null;
        this.getEventHideFields = () => {
            return JSON.parse(this.eventHideFields);
        };
        this.eventPreviewFields = null;
        this.getEventPreviewFields = () => {
            return JSON.parse(this.eventPreviewFields);
        };
        this.eventFields = null;
        this.getEventFields = () => {
            return JSON.parse(this.eventFields);
        };
        this.eventFieldDependencies = null;
        this.getEventFieldDependencies = () => {
            return JSON.parse(this.eventFieldDependencies);
        };
        this.getApiBodyList = () => {
            console.log('calendar api body list', this.apiBodyList);
            try {
                return JSON.parse(this.apiBodyList);
            }
            catch (e) {
                return {};
            }
        };
        this.getApiBodyDetail = () => {
            return JSON.parse(this.apiBodyDetail);
        };
        this.csvDataCompliances = "";
        this.csvDataStats = "";
        this.htmlDataCompliances = "";
        this.htmlDataStats = "";
        this.period = "";
        this.flow = "";
        this.fill = "solid";
        this.filterTags = [];
        this.getEventField = (field) => {
            for (var i = 0; i < this.getEventFields().length; i++) {
                if (this.getEventFields()[i].field == field) {
                    return this.getEventFields()[i];
                }
            }
        };
        this.getParentFieldFromDepedencies = (field) => {
            for (var i = 0; i < this.getEventFieldDependencies().length; i++) {
                if (this.getEventFieldDependencies()[i].type == "foreignkey" && this.getEventFieldDependencies()[i].child == field) {
                    return this.getEventFieldDependencies()[i].parent;
                }
            }
            return null;
        };
        this.getEventTexts = (field, selectedId, row) => {
            console.log('get event texts', field, selectedId, row);
            if (this.getEventField(field) != null && this.getEventField(field).type == "sf-i-select") {
                var selectedIds = "";
                selectedIds += '[';
                for (var i = 0; i < selectedId.length; i++) {
                    selectedIds += ('&quot;' + selectedId[i] + '&quot;');
                    if (i < selectedId.length - 1) {
                        selectedIds += ',';
                    }
                }
                selectedIds += ']';
                return '<sf-i-select apiId="' + this.getEventField(field).apiId + '" name="Select" label="Select" mode="text" selectedId="' + selectedIds + '"></sf-i-select>';
            }
            if (this.getEventField(field) != null && this.getEventField(field).type == "sf-i-sub-select") {
                const parentField = this.getParentFieldFromDepedencies(field);
                console.log('parentfield', parentField);
                var selectedIds = "";
                selectedIds += '[';
                for (var i = 0; i < selectedId.length; i++) {
                    selectedIds += ('&quot;' + selectedId[i] + '&quot;');
                    if (i < selectedId.length - 1) {
                        selectedIds += ',';
                    }
                }
                selectedIds += ']';
                const filterId = JSON.parse(row[parentField])[0];
                console.log('<sf-i-sub-select apiId="' + this.getEventField(field).apiId + '" name="Select" label="Select" mode="text" selectedId="' + selectedIds + '" filterId="' + filterId + '"></sf-i-sub-select>');
                return '<sf-i-sub-select apiId="' + this.getEventField(field).apiId + '" name="Select" label="Select" mode="text" selectedId="' + selectedIds + '" filterId="' + filterId + '"></sf-i-sub-select>';
            }
            if (this.getEventField(field) != null && this.getEventField(field).type == "sf-i-form") {
                console.log('<sf-i-form name="Select" apiId="' + this.getEventField(field).apiId + '" selectedId="' + selectedId[0] + '" projectField="' + this.getEventField(field).projectField + '" mode="text"></sf-i-form>');
                return '<sf-i-form name="Select" apiId="' + this.getEventField(field).apiId + '" selectedId="' + selectedId[0] + '" projectField="' + this.getEventField(field).projectField + '" mode="text"></sf-i-form>';
            }
            return "";
        };
        this.enableCalendar = () => {
            this._SfCalendarContainer.style.display = 'flex';
            this._SfStreamContainer.style.display = 'none';
            this._SfUpcomingContainer.style.display = 'none';
            this._SfThisContainer.style.display = 'none';
            this._SfPastContainer.style.display = 'none';
            this._SfCustomContainer.style.display = 'none';
            this._SfAdhocContainer.style.display = 'none';
        };
        this.enableStream = () => {
            this._SfCalendarContainer.style.display = 'none';
            this._SfStreamContainer.style.display = 'flex';
            this._SfUpcomingContainer.style.display = 'none';
            this._SfThisContainer.style.display = 'none';
            this._SfPastContainer.style.display = 'none';
            this._SfCustomContainer.style.display = 'none';
            this._SfAdhocContainer.style.display = 'none';
        };
        this.prepareXhr = async (data, url, loaderElement, authorization) => {
            if (loaderElement != null) {
                loaderElement.innerHTML = '<div class="lds-dual-ring"></div>';
            }
            return await Util.callApi(url, data, authorization);
        };
        this.clearMessages = () => {
            this._SfRowError.style.display = 'none';
            this._SfRowErrorMessage.innerHTML = '';
            this._SfRowSuccess.style.display = 'none';
            this._SfRowSuccessMessage.innerHTML = '';
        };
        this.setError = (msg) => {
            this._SfRowError.style.display = 'flex';
            this._SfRowErrorMessage.innerHTML = msg;
            this._SfRowSuccess.style.display = 'none';
            this._SfRowSuccessMessage.innerHTML = '';
        };
        this.setSuccess = (msg) => {
            this._SfRowError.style.display = 'none';
            this._SfRowErrorMessage.innerHTML = '';
            this._SfRowSuccess.style.display = 'flex';
            this._SfRowSuccessMessage.innerHTML = msg;
        };
        this.getLastDayOfLastMonth = (month, year) => {
            const date = new Date(year, month, 0);
            return date.getDate();
        };
        this.getLastDayOfMonth = (month, year) => {
            const date = new Date(year, month + 1, 0);
            return date.getDate();
        };
        this.getFirstDateOfLastWeek = (startDate) => {
            const sd = new Date(startDate.getTime());
            var first = sd.getDate() - sd.getDay();
            var firstday = new Date(sd.setDate(first));
            for (var i = 0; i < 7; i++) {
                firstday.setDate(firstday.getDate() - 1);
            }
            return firstday;
        };
        this.getFirstDateOfWeek = (startDate) => {
            const sd = new Date(startDate.getTime());
            var first = sd.getDate() - sd.getDay();
            var firstday = new Date(sd.setDate(first));
            return firstday;
        };
        this.getBlanks = (month, year) => {
            const date = new Date(("0" + (month + 1)).slice(-2) + '/01/' + year);
            const day = date.getDay();
            return day;
        };
        this.insertDates = (month, year) => {
            var html = "";
            html += '<div class="d-flex align-baseline flex-grow flex-wrap">';
            const dateNumber = this.getLastDayOfLastMonth(month, year);
            for (var i = 0; i < this.getBlanks(month, year); i++) {
                html += '<div class="day-item date-item-before fw-100">';
                html += dateNumber - (this.getBlanks(month, year) - i - 1);
                html += '</div>';
            }
            const currMonth = new Date().getMonth();
            const currDate = new Date().getDate();
            console.log('currmonth', currMonth, 'currdate', currDate);
            for (i = 0; i < this.getLastDayOfMonth(month, year); i++) {
                const mmdd = ("0" + (month + 1)).slice(-2) + "/" + ("0" + (i + 1)).slice(-2);
                var partName = "";
                if (this.events[mmdd] != null) {
                    partName = "event-calendar-day-with-event";
                    html += '<div part="' + partName + '" class="day-item date-item fw-600">';
                    if (month === currMonth && (i + 1) === currDate) {
                        html += '<div part="event-calendar-day-today">';
                        html += (i + 1);
                        html += '</div>';
                    }
                    else {
                        html += '<div>';
                        html += (i + 1);
                        html += '</div>';
                    }
                    var approved = 0;
                    var inProgress = 0;
                    var notStarted = 0;
                    var total = 0;
                    for (var j = 0; j < this.events[mmdd].length; j++) {
                        total++;
                        if (this.events[mmdd][j].documents == null || this.events[mmdd][j].documents == null || (this.events[mmdd][j].documents).length === 0) {
                            notStarted++;
                        }
                        else if (this.events[mmdd][j].approved != null && this.events[mmdd][j].approved) {
                            approved++;
                        }
                        else {
                            inProgress++;
                        }
                    }
                    var percApproved = (approved * 100) / total;
                    var percInProgress = (inProgress * 100) / total;
                    var percNotStarted = (notStarted * 100) / total;
                    console.log('percentages', mmdd, percApproved, percInProgress, percNotStarted);
                    html += '<div class="d-flex justify-center">';
                    //html += '<div part="event-date-indicator-primary" class="dot"></div>'
                    html += '<div class="dot" style="width: ' + (percApproved / 2) + '%; background-color: ' + this.COLOR_APPROVED + '"></div>';
                    html += '<div class="dot" style="width: ' + (percInProgress / 2) + '%; background-color: ' + this.COLOR_IN_PROGRESS + '"></div>';
                    html += '<div class="dot" style="width: ' + (percNotStarted / 2) + '%; background-color: ' + this.COLOR_NOT_STARTED + '"></div>';
                    html += '</div>';
                    html += '</div>';
                }
                else {
                    partName = "event-calendar-day-without-event";
                    html += '<div part="' + partName + '" class="day-item date-item fw-100">';
                    // html += '<div>'
                    //   html += (i + 1);
                    // html += '</div>'
                    if (month === currMonth && (i + 1) === currDate) {
                        html += '<div part="event-calendar-day-today">';
                        html += (i + 1);
                        html += '</div>';
                    }
                    else {
                        html += '<div>';
                        html += (i + 1);
                        html += '</div>';
                    }
                    html += '</div>';
                }
            }
            for (i = 0; i < 42 - (this.getBlanks(month, year) + this.getLastDayOfMonth(month, year)); i++) {
                html += '<div class="day-item date-item-before fw-100">';
                html += (i + 1);
                html += '</div>';
            }
            html += '</div>';
            return html;
        };
        this.insertDayNames = () => {
            var html = "";
            html += '<div class="d-flex align-center flex-grow">';
            html += '<div part="calendar-day-name" class="day-item fw-100">';
            html += 'S';
            html += '</div>';
            html += '<div part="calendar-day-name" class="day-item fw-100">';
            html += 'M';
            html += '</div>';
            html += '<div part="calendar-day-name" class="day-item fw-100">';
            html += 'T';
            html += '</div>';
            html += '<div part="calendar-day-name" class="day-item fw-100">';
            html += 'W';
            html += '</div>';
            html += '<div part="calendar-day-name" class="day-item fw-100">';
            html += 'T';
            html += '</div>';
            html += '<div part="calendar-day-name" class="day-item fw-100">';
            html += 'F';
            html += '</div>';
            html += '<div part="calendar-day-name" class="day-item fw-100">';
            html += 'S';
            html += '</div>';
            html += '</div>';
            return html;
        };
        this.getPastDueDate = (mmdd) => {
            const dd = mmdd.substring(3, 5);
            const mm = mmdd.substring(0, 2);
            console.log('getpastduedate', mmdd, dd, mm);
            var date = new Date();
            date.setMonth(parseInt(mm) - 1);
            date.setDate(parseInt(dd));
            var currDate = new Date();
            if (currDate.getTime() > date.getTime()) {
                return true;
            }
            return false;
        };
        this.getLateExecuted = (mmdd, event) => {
            const tsDoc = new Date(parseInt(event.dateofcompletion[mmdd + "/" + new Date().getFullYear()])).getTime();
            const dd = mmdd.substring(3, 5);
            const mm = mmdd.substring(0, 2);
            var date = new Date();
            date.setMonth(parseInt(mm) - 1);
            date.setDate(parseInt(dd));
            const tsCurr = date.getTime();
            console.log('late executed', mmdd, tsDoc, tsCurr);
            if (tsDoc > tsCurr) {
                console.log('late executed', true);
                return true;
            }
            return false;
        };
        this.getLateApproved = (mmdd, event) => {
            console.log('get late approved', event.lastupdated, mmdd, event.lastupdated);
            const tsLastUpdated = new Date((event.lastupdated)).getTime();
            console.log('get late approved', tsLastUpdated);
            const dd = mmdd.substring(3, 5);
            const mm = mmdd.substring(0, 2);
            var date = new Date();
            date.setMonth(parseInt(mm) - 1);
            date.setDate(parseInt(dd));
            const tsCurr = date.getTime();
            console.log('get late approved', tsCurr);
            if (tsLastUpdated > tsCurr) {
                console.log('late approved', true);
                return true;
            }
            return false;
        };
        this.renderStreamEvents = (index, month, year) => {
            const lastDay = this.getLastDayOfMonth(month, year);
            var html = '';
            html += '<div class="mb-20 stream-event-list" part="stream-event-list">';
            html += '<div part="stream-event-selected" class="mb-20">';
            html += '<div part="td-head" class="mb-5">Select Chart</div>';
            html += '<div class="mb-10 d-flex flex-wrap align-center">';
            html += '<input type="radio" id="radio-completeness" name="graph-type" checked>';
            html += '<label for="radio-completeness" part="input-label" class="mr-10">Completeness</label>';
            html += '<input type="radio" id="radio-timeliness" name="graph-type">';
            html += '<label for="radio-timeliness" part="input-label">Timeliness</label>';
            html += '</div>';
            html += '</div>';
            html += '<canvas id="myChart"></canvas>';
            html += '<div id="chart-settings-controls"></div>';
            html += '<div id="chart-settings"></div>';
            html += '</div>';
            var total = 0, notStarted = 0, approved = 0, inProgress = 0, pastDueDate = 0, lateExecuted = 0, lateApproved = 0;
            html += '<div id="stream-event-' + index + '" part="stream-event-list" class="stream-event-list">';
            html += '<div id="stream-event-summary" part="stream-event-total" class="d-flex flex-wrap">';
            html += '<div part="badge-dashboard" class="mr-10 mb-10 no-shrink"><span>Total:</span> <span id="graph-total">DASHBOARD_TOTAL</span></div>';
            html += '<div part="badge-dashboard" class="d-flex justify-center align-center mr-10 mb-10 no-shrink"><span class="material-icons color-not-started">schedule</span>&nbsp;&nbsp;<span>Not Started:</span> <span id="graph-not-started">DASHBOARD_NOT_STARTED</span></div>';
            html += '<div part="badge-dashboard" class="d-flex justify-center align-center mr-10 mb-10 no-shrink"><span class="material-symbols-outlined color-pending">pending</span>&nbsp;&nbsp;<span>In Progress:</span> <span id="graph-in-progress">DASHBOARD_IN_PROGRESS</span></div>';
            html += '<div part="badge-dashboard" class="d-flex justify-center align-center mr-10 mb-10 no-shrink"><span class="material-symbols-outlined color-done">check_circle</span>&nbsp;&nbsp;<span>Approved:</span><span id="graph-approved">DASHBOARD_APPROVED</span></div>';
            html += '<div part="calendar-tab-button-not-selected" class="d-flex justify-center align-center mr-10 mb-10 no-shrink cursor" id="button-status-more"><span class="material-symbols-outlined">navigate_next</span></div>';
            html += '<div part="badge-dashboard" class="justify-center align-center mr-10 mb-10 no-shrink late-statuses gone"><span class="material-icons color-past-due-date">running_with_errors</span>&nbsp;&nbsp;<span>Past Due Date:</span> <span id="graph-past-due-date">DASHBOARD_PAST_DUE_DATE</span></div>';
            html += '<div part="badge-dashboard" class="justify-center align-center mr-10 mb-10 no-shrink late-statuses gone"><span class="material-icons color-late-approved">running_with_errors</span>&nbsp;&nbsp;<span>Late Approved:</span> <span id="graph-late-approved">DASHBOARD_LATE_APPROVED</span></div>';
            html += '<div part="badge-dashboard" class="justify-center align-center mr-10 mb-10 no-shrink late-statuses gone"><span class="material-icons color-late-executed">running_with_errors</span>&nbsp;&nbsp;<span>Late Executed:</span> <span id="graph-late-executed">DASHBOARD_LATE_EXECUTED</span></div>';
            html += '</div>';
            this.eventsInWindow = [];
            var csvCols = "", htmlCols = "";
            var csvValues = "", htmlValues = "";
            var period = ("0" + (month + 1)).slice(-2) + "/" + ("0" + 1).slice(-2) + '/' + new Date().getFullYear() + ' - ' + ("0" + (month + 1)).slice(-2) + "/" + ("0" + lastDay).slice(-2) + '/' + new Date().getFullYear();
            this.period = period;
            for (var i = 1; i <= lastDay; i++) {
                const mmdd = ("0" + (month + 1)).slice(-2) + "/" + ("0" + i).slice(-2);
                console.log('mmdd', mmdd);
                var hide = true;
                if (this.events[mmdd] != null) {
                    hide = false;
                }
                else if (i === 1) {
                    hide = false;
                }
                else if (i === lastDay) {
                    hide = false;
                }
                else {
                    const mmddPrev = ("0" + (month + 1)).slice(-2) + "/" + ("0" + (i - 1)).slice(-2);
                    const mmddNext = ("0" + (month + 1)).slice(-2) + "/" + ("0" + (i + 1)).slice(-2);
                    console.log('hide', i, hide);
                    if ((this.events[mmddPrev] != null || this.events[mmddNext] != null)) {
                        hide = false;
                    }
                }
                console.log('hide', i, hide);
                if (this.events[mmdd] != null) {
                    //html += '<div>'+month + ',' + year + ',' + i+'</div>'
                    html += '<div part="stream-event-selected" class="d-flex stream-event-selected">';
                    html += '<div part="stream-event-selected-date">' + ("0" + i).slice(-2) + ' |</div>';
                    html += '<div class="stream-event-list-container flex-grow">';
                    for (var j = 0; j < this.events[mmdd].length; j++) {
                        total++;
                        this.events[mmdd][j]['mmdd'] = mmdd;
                        this.eventsInWindow.push(this.events[mmdd][j]);
                        var partStatus = "";
                        var lateStatus = "";
                        if (this.events[mmdd][j].approved != null && (this.events[mmdd][j].approved) != null && (this.events[mmdd][j].approved)) {
                            partStatus = "status-approved";
                            if (this.getLateExecuted(mmdd, this.events[mmdd][j])) {
                                lateStatus = "late-executed";
                            }
                            else {
                                if (this.getLateApproved(mmdd, this.events[mmdd][j])) {
                                    lateStatus = "late-approved";
                                }
                            }
                        }
                        else if (this.events[mmdd][j].documents != null && this.events[mmdd][j].documents != null && (this.events[mmdd][j].documents).length > 0) {
                            partStatus = "status-in-progress";
                            if (this.getPastDueDate(mmdd)) {
                                lateStatus = "past-due-date";
                            }
                        }
                        else {
                            partStatus = "status-not-started";
                            if (this.getPastDueDate(mmdd)) {
                                lateStatus = "past-due-date";
                            }
                        }
                        html += '<div class="stream-events-container flex-grow">';
                        html += '<div class="hidden-tags hide">' + JSON.stringify(this.events[mmdd][j]['tags']) + '</div>';
                        html += '<div class="hidden-title hide"><table><thead><th part="badge-filtered"><i>not filtered</i></th></thead></table></div>';
                        html += '<table class="stream-events-container-table" part="' + partStatus + '">';
                        html += '<thead>';
                        html += '<th part="td-head">';
                        html += 'Status';
                        if (csvCols.indexOf('Status') < 0) {
                            csvCols += 'Period,Status,Id,ObligationTitle,Obligation,Duedate';
                            htmlCols += '<tr><th>Id</th><th>Status</th><th>Obligation</th></tr>';
                        }
                        html += '</th>';
                        html += '<th part="td-head">';
                        html += '</th>';
                        html += '<th part="td-head">';
                        html += 'Location';
                        html += '</th>';
                        for (var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
                            if (this.getEventPreviewFields().includes(Object.keys(this.events[mmdd][j])[k])) {
                                html += '<th part="td-head" class="bg-left-no-border">';
                                html += Object.keys(this.events[mmdd][j])[k];
                            }
                        }
                        console.log('listing docs', this.events[mmdd][j].documents);
                        if (this.events[mmdd][j].documents != null && this.events[mmdd][j].documents != null && (this.events[mmdd][j].documents).length > 0) {
                            html += '<th part="td-head">';
                            html += 'Docs';
                            html += '</th>';
                        }
                        else {
                            if (partStatus != "status-approved") {
                                notStarted++;
                            }
                        }
                        if (this.events[mmdd][j].comments != null && this.events[mmdd][j].comments != null && (this.events[mmdd][j].comments).length > 0) {
                            html += '<th part="td-head">';
                            html += 'Comments';
                            html += '</th>';
                        }
                        else {
                        }
                        if (this.events[mmdd][j].lastupdated != null && this.events[mmdd][j].lastupdated != null && (this.events[mmdd][j].lastupdated).length > 0) {
                            html += '<th part="td-head">';
                            html += 'Updated';
                            html += '</th>';
                        }
                        else {
                        }
                        // for(var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
                        //   html += '<th part="td-head">';
                        //   html += Object.keys(this.events[mmdd][j])[k];
                        //   html += '</th>';
                        // }
                        html += '</thead>';
                        html += '<tbody>';
                        csvValues += (period + ',');
                        htmlValues += ('<tr><td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + '">' + this.events[mmdd][j]["id"] + '</td>');
                        if (partStatus == "status-approved") {
                            approved++;
                            html += '<td part="td-body">';
                            if (lateStatus == "late-executed") {
                                lateExecuted++;
                                html += '<span class="material-symbols-outlined color-done">check_circle</span><span class="material-icons color-late-executed">running_with_errors</span>';
                                csvValues += 'approved late-executed,';
                                htmlValues += ('<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' text-center"><span class="material-symbols-outlined color-done">check_circle</span><span class="material-icons color-late-executed">running_with_errors</span></td>');
                            }
                            else if (lateStatus == "late-approved") {
                                lateApproved++;
                                html += '<span class="material-symbols-outlined color-done">check_circle</span><span class="material-icons color-late-approved">running_with_errors</span>';
                                csvValues += 'approved late-approved,';
                                htmlValues += ('<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' text-center"><span class="material-symbols-outlined color-done">check_circle</span><span class="material-icons color-late-approved">running_with_errors</span></td>');
                            }
                            else {
                                html += '<span class="material-symbols-outlined color-done">check_circle</span>';
                                csvValues += 'approved,';
                                htmlValues += ('<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' text-center"><span class="material-icons color-done">check_circle</span></td>');
                            }
                            html += '</td>';
                        }
                        else if (partStatus == "status-in-progress") {
                            html += '<td part="td-body">';
                            if (lateStatus == "past-due-date") {
                                pastDueDate++;
                                html += '<span class="material-symbols-outlined color-pending">pending</span><span class="material-icons color-past-due-date">running_with_errors</span>';
                                csvValues += 'in-progress past-due-date,';
                                htmlValues += ('<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' text-center"><span class="material-symbols-outlined color-pending">pending</span><span class="material-icons color-past-due-date">running_with_errors</span></td>');
                            }
                            else {
                                html += '<span class="material-symbols-outlined color-pending">pending</span>';
                                csvValues += 'in-progress,';
                                htmlValues += ('<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' text-center"><span class="material-symbols-outlined color-pending">pending</span></td>');
                            }
                            html += '</td>';
                        }
                        else {
                            html += '<td part="td-body">';
                            if (lateStatus == "past-due-date") {
                                pastDueDate++;
                                html += '<span class="material-icons color-not-started">schedule</span><span class="material-icons color-past-due-date">running_with_errors</span>';
                                csvValues += 'not started past-due-date,';
                                htmlValues += ('<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' text-center"><span class="material-icons color-not-started">schedule</span><span class="material-icons color-past-due-date">running_with_errors</span></td>');
                            }
                            else {
                                html += '<span class="material-icons color-not-started">schedule</span>';
                                csvValues += 'not started,';
                                htmlValues += ('<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' text-center"><span class="material-icons color-not-started">schedule</span></td>');
                            }
                            html += '</td>';
                        }
                        html += '<td id="td-expand-' + i + '" part="td-body">';
                        html += '<button id="button-unmapped-expand-' + mmdd.replace('/', '-') + '-' + j + '" part="button-icon-small" class="material-icons button-expand mr-10">open_in_new</button>';
                        html += '</td>';
                        html += '<td part="td-body"><sf-i-elastic-text text="' + this.events[mmdd][j]["locationname"] + '" minLength="20"></sf-i-elastic-text></td>';
                        for (var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
                            if (this.getEventPreviewFields().includes(Object.keys(this.events[mmdd][j])[k])) {
                                html += '<td part="td-body">';
                                if (this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]].indexOf("[") >= 0) {
                                    html += this.getEventTexts(Object.keys(this.events[mmdd][j])[k], JSON.parse(this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]]), this.events[mmdd][j]);
                                }
                                else {
                                    html += ' <sf-i-elastic-text text="' + this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]].replace(/"/g, "") + '" minLength="20"></sf-i-elastic-text>';
                                }
                                html += '</td>';
                            }
                        }
                        csvValues += this.events[mmdd][j]["id"] + ',' + this.events[mmdd][j]["obligationtitle"] + ',' + this.events[mmdd][j]["obligation"] + ',' + this.events[mmdd][j]["duedate"];
                        htmlValues += ('<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + '">' + this.events[mmdd][j]["obligation"] + '</td>');
                        if (this.events[mmdd][j].documents != null && this.events[mmdd][j].documents != null && (this.events[mmdd][j].documents).length > 0) {
                            html += '<td part="td-body">';
                            html += '<span class="material-icons muted">description</span>';
                            html += (this.events[mmdd][j].documents).length;
                            html += '</td>';
                        }
                        else {
                        }
                        if (this.events[mmdd][j].comments != null && this.events[mmdd][j].comments != null && (this.events[mmdd][j].comments).length > 0) {
                            html += '<td part="td-body">';
                            html += '<span class="material-icons muted">forum</span>';
                            html += (this.events[mmdd][j].comments).length;
                            html += '</td>';
                        }
                        else {
                        }
                        if (this.events[mmdd][j].lastupdated != null && this.events[mmdd][j].lastupdated != null && (this.events[mmdd][j].lastupdated).length > 0) {
                            html += '<td part="td-body">';
                            html += Util.timeSince(new Date(this.events[mmdd][j].lastupdated).getTime());
                            html += '</td>';
                        }
                        else {
                        }
                        csvValues += '\n';
                        htmlValues += ('</tr>');
                        // for(var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
                        //   html += '<th part="td-body">';
                        //   if(this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]].indexOf("[") >= 0) {
                        //     html += this.getEventTexts(Object.keys(this.events[mmdd][j])[k], JSON.parse(this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]]), this.events[mmdd][j]);
                        //   } else {
                        //     html += this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]].replace(/"/g, "");
                        //   }
                        //   html += '</th>';
                        // }
                        html += '</tbody>';
                        html += '</table>';
                        html += '<div class="hidden-filtername hide"><table><thead><th part="badge-filter-name" class="filtername"></th></thead></table></div>';
                        html += '</div>';
                    }
                    html += '</div>';
                    html += '</div>';
                }
                else {
                    if (!hide) {
                        html += '<div part="stream-event-not-selected" class="d-flex stream-event-not-selected">';
                        html += '<div>' + ("0" + i).slice(-2) + '</div>';
                        html += '</div>';
                    }
                    else {
                        html += '<div part="stream-event-not-selected" class="d-flex stream-event-not-selected-hidden">';
                        //html += '<div>'+("0" + i).slice(-2)+' |</div>';
                        html += '<div>.</div>';
                        html += '</div>';
                    }
                }
            }
            html += '</div>';
            this.csvDataCompliances = csvCols + "\n" + csvValues;
            this.htmlDataCompliances = '<table>' + htmlCols + htmlValues + '</table>';
            inProgress = total - notStarted - approved;
            console.log('progress', total, notStarted, approved);
            html = html.replace("DASHBOARD_TOTAL", total + "");
            html = html.replace("DASHBOARD_NOT_STARTED", notStarted + "");
            html = html.replace("DASHBOARD_APPROVED", approved + "");
            html = html.replace("DASHBOARD_IN_PROGRESS", inProgress + "");
            html = html.replace("DASHBOARD_PAST_DUE_DATE", pastDueDate + "");
            html = html.replace("DASHBOARD_LATE_EXECUTED", lateExecuted + "");
            html = html.replace("DASHBOARD_LATE_APPROVED", lateApproved + "");
            this.csvDataStats = 'Period,Total,Not Started,Approved,In Progress,Past Due Date,Late Executed,Late Approved\n';
            this.csvDataStats += period + "," + total + "," + notStarted + "," + approved + "," + inProgress + "," + pastDueDate + "," + lateExecuted + "," + lateApproved;
            this.htmlDataStats = '<table class="w-100"><tr><th class="w-14">Total</th><th class="w-14">Not Started</th><th class="w-14">Approved</th><th class="w-14">In Progress</th><th class="w-14">Past Due Date</th><th class="w-14">Late Executed</th><th class="w-14">Late Approved</th><tr>';
            this.htmlDataStats += '<tr><td class="w-14 text-center td-odd">' + total + '</td><td class="w-14 text-center td-odd">' + notStarted + '</td><td class="w-14 text-center td-odd">' + approved + '</td><td class="w-14 text-center td-odd">' + inProgress + '</td><td class="w-14 text-center td-odd">' + pastDueDate + '</td><td class="w-14 text-center td-odd">' + lateExecuted + '</td><td class="w-14 text-center td-odd">' + lateApproved + '</td><tr></table>';
            return html;
        };
        this.renderUpcomingEvents = (index, startDate, count) => {
            var html = '';
            html += '<div class="mb-20 stream-event-list" part="stream-event-list">';
            html += '<div part="stream-event-selected" class="mb-20">';
            html += '<div part="td-head" class="mb-5">Select Chart</div>';
            html += '<div class="mb-10 d-flex flex-wrap align-center">';
            html += '<input type="radio" id="radio-completeness" name="graph-type" checked>';
            html += '<label for="radio-completeness" part="input-label" class="mr-10">Completeness</label>';
            html += '<input type="radio" id="radio-timeliness" name="graph-type">';
            html += '<label for="radio-timeliness" part="input-label">Timeliness</label>';
            html += '</div>';
            html += '</div>';
            html += '<canvas id="myChart"></canvas>';
            html += '<div id="chart-settings-controls"></div>';
            html += '<div id="chart-settings"></div>';
            html += '</div>';
            html += '<div id="stream-event-' + index + '" part="stream-event-list" class="stream-event-list">';
            var total = 0, notStarted = 0, approved = 0, inProgress = 0, pastDueDate = 0, lateExecuted = 0, lateApproved = 0;
            html += '<div id="stream-event-summary" part="stream-event-total" class="d-flex flex-wrap">';
            html += '<div part="badge-dashboard" class="mr-10 mb-10 no-shrink"><span>Total:</span> <span id="graph-total">DASHBOARD_TOTAL</span></div>';
            html += '<div part="badge-dashboard" class="d-flex justify-center align-center mr-10 mb-10 no-shrink"><span class="material-icons color-not-started">schedule</span>&nbsp;&nbsp;<span>Not Started:</span> <span id="graph-not-started">DASHBOARD_NOT_STARTED</span></div>';
            html += '<div part="badge-dashboard" class="d-flex justify-center align-center mr-10 mb-10 no-shrink"><span class="material-symbols-outlined color-pending">pending</span>&nbsp;&nbsp;<span>In Progress:</span> <span id="graph-in-progress">DASHBOARD_IN_PROGRESS</span></div>';
            html += '<div part="badge-dashboard" class="d-flex justify-center align-center mr-10 mb-10 no-shrink"><span class="material-symbols-outlined color-done">check_circle</span>&nbsp;&nbsp;<span>Approved:</span><span id="graph-approved">DASHBOARD_APPROVED</span></div>';
            html += '<div part="calendar-tab-button-not-selected" class="d-flex justify-center align-center mr-10 mb-10 no-shrink cursor" id="button-status-more"><span class="material-symbols-outlined">navigate_next</span></div>';
            html += '<div part="badge-dashboard" class="justify-center align-center mr-10 mb-10 no-shrink late-statuses gone"><span class="material-icons color-past-due-date">running_with_errors</span>&nbsp;&nbsp;<span>Past Due Date:</span> <span id="graph-past-due-date">DASHBOARD_PAST_DUE_DATE</span></div>';
            html += '<div part="badge-dashboard" class="justify-center align-center mr-10 mb-10 no-shrink late-statuses gone"><span class="material-icons color-late-approved">running_with_errors</span>&nbsp;&nbsp;<span>Late Approved:</span> <span id="graph-late-approved">DASHBOARD_LATE_APPROVED</span></div>';
            html += '<div part="badge-dashboard" class="justify-center align-center mr-10 mb-10 no-shrink late-statuses gone"><span class="material-icons color-late-executed">running_with_errors</span>&nbsp;&nbsp;<span>Late Executed:</span> <span id="graph-late-executed">DASHBOARD_LATE_EXECUTED</span></div>';
            html += '</div>';
            this.eventsInWindow = [];
            var csvCols = "", htmlCols = "";
            var csvValues = "", htmlValues = "";
            var period = ("0" + (startDate.getMonth() + 1)).slice(-2) + "/" + ("0" + 1).slice(-2) + ' - ' + ("0" + (startDate.getMonth() + 1)).slice(-2) + "/" + ("0" + count).slice(-2);
            this.period = period;
            for (var i = 1; i <= count; i++) {
                const mmdd = ("0" + (startDate.getMonth() + 1)).slice(-2) + "/" + ("0" + startDate.getDate()).slice(-2);
                var hide = true;
                if (this.events[mmdd] != null) {
                    hide = false;
                }
                else if (i === 1) {
                    hide = false;
                }
                else if (i === (count)) {
                    hide = false;
                }
                else {
                    const startNextDate = new Date(startDate.getTime());
                    startNextDate.setDate(startDate.getDate() + 1);
                    const startPrevDate = new Date(startDate.getTime());
                    startPrevDate.setDate(startDate.getDate() - 1);
                    const mmddNext = ("0" + (startNextDate.getMonth() + 1)).slice(-2) + "/" + ("0" + (startNextDate.getDate())).slice(-2);
                    const mmddPrev = ("0" + (startPrevDate.getMonth() + 1)).slice(-2) + "/" + ("0" + (startPrevDate.getDate())).slice(-2);
                    console.log('hide', i, hide, startNextDate, startPrevDate, mmddNext, mmddPrev);
                    if ((this.events[mmddPrev] != null || this.events[mmddNext] != null)) {
                        hide = false;
                    }
                }
                if (this.events[mmdd] != null) {
                    html += '<div part="stream-event-selected" class="d-flex stream-event-selected">';
                    html += '<div part="stream-event-selected-date">' + ("0" + startDate.getDate()).slice(-2) + '/' + (startDate.getMonth() + 1) + ' |</div>';
                    html += '<div class="stream-event-list-container flex-grow">';
                    for (var j = 0; j < this.events[mmdd].length; j++) {
                        total++;
                        this.events[mmdd][j]['mmdd'] = mmdd;
                        this.eventsInWindow.push(this.events[mmdd][j]);
                        var partStatus = "";
                        var lateStatus = "";
                        if (this.events[mmdd][j].approved != null && (this.events[mmdd][j].approved) != null && (this.events[mmdd][j].approved)) {
                            partStatus = "status-approved";
                            if (this.getLateExecuted(mmdd, this.events[mmdd][j])) {
                                lateStatus = "late-executed";
                            }
                            else {
                                if (this.getLateApproved(mmdd, this.events[mmdd][j])) {
                                    lateStatus = "late-approved";
                                }
                            }
                        }
                        else if (this.events[mmdd][j].documents != null && this.events[mmdd][j].documents != null && (this.events[mmdd][j].documents).length > 0) {
                            partStatus = "status-in-progress";
                            if (this.getPastDueDate(mmdd)) {
                                lateStatus = "past-due-date";
                            }
                        }
                        else {
                            partStatus = "status-not-started";
                            if (this.getPastDueDate(mmdd)) {
                                lateStatus = "past-due-date";
                            }
                        }
                        html += '<div class="stream-events-container flex-grow">';
                        html += '<div class="hidden-tags hide">' + JSON.stringify(this.events[mmdd][j]['tags']) + '</div>';
                        html += '<div class="hidden-title hide"><table><thead><th part="badge-filtered"><i>filtered out</i></th></thead></table></div>';
                        html += '<table class="stream-events-container-table" >';
                        html += '<thead>';
                        html += '<th part="td-head">';
                        html += 'Status';
                        if (csvCols.indexOf('Status') < 0) {
                            csvCols += 'Period,Status,Id,ObligationTitle,Obligation,Duedate';
                            htmlCols += '<tr><th>Id</th><th>Status</th><th>Obligation</th></tr>';
                        }
                        html += '</th>';
                        html += '<th part="td-head">';
                        html += '</th>';
                        html += '<th part="td-head">';
                        html += 'Location';
                        html += '</th>';
                        for (var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
                            if (this.getEventPreviewFields().includes(Object.keys(this.events[mmdd][j])[k])) {
                                html += '<th part="td-head" class="bg-left-no-border">';
                                html += Object.keys(this.events[mmdd][j])[k];
                                html += '</th>';
                            }
                        }
                        console.log('listing docs', this.events[mmdd][j].documents);
                        if (this.events[mmdd][j].documents != null && this.events[mmdd][j].documents != null && (this.events[mmdd][j].documents).length > 0) {
                            html += '<th part="td-head">';
                            html += 'Docs';
                            html += '</th>';
                        }
                        else {
                            notStarted++;
                        }
                        if (this.events[mmdd][j].comments != null && this.events[mmdd][j].comments != null && (this.events[mmdd][j].comments).length > 0) {
                            html += '<th part="td-head">';
                            html += 'Comments';
                            html += '</th>';
                        }
                        if (this.events[mmdd][j].lastupdated != null && this.events[mmdd][j].lastupdated != null && (this.events[mmdd][j].lastupdated).length > 0) {
                            html += '<th part="td-head">';
                            html += 'Updated';
                            html += '</th>';
                        }
                        // for(var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
                        //   html += '<th part="td-head">';
                        //   html += Object.keys(this.events[mmdd][j])[k];
                        //   html += '</th>';
                        // }
                        html += '</thead>';
                        html += '<tbody>';
                        csvValues += (period + ',');
                        htmlValues += ('<tr><td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + '">' + this.events[mmdd][j]["id"] + '</td>');
                        if (partStatus == "status-approved") {
                            approved++;
                            html += '<td part="td-body">';
                            if (lateStatus == "late-executed") {
                                lateExecuted++;
                                html += '<span class="material-symbols-outlined color-done">check_circle</span><span class="material-icons color-late-executed">running_with_errors</span>';
                                csvValues += 'approved late-executed,';
                                htmlValues += ('<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' text-center"><span class="material-symbols-outlined color-done">check_circle</span><span class="material-icons color-late-executed">running_with_errors</span></td>');
                            }
                            else if (lateStatus == "late-approved") {
                                lateApproved++;
                                html += '<span class="material-symbols-outlined color-done">check_circle</span><span class="material-icons color-late-approved">running_with_errors</span>';
                                csvValues += 'approved late-approved,';
                                htmlValues += ('<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' text-center"><span class="material-symbols-outlined color-done">check_circle</span><span class="material-icons color-late-approved">running_with_errors</span></td>');
                            }
                            else {
                                html += '<span class="material-symbols-outlined color-done">check_circle</span>';
                                csvValues += 'approved,';
                                htmlValues += ('<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' text-center"><span class="material-icons color-done">check_circle</span></td>');
                            }
                            html += '</td>';
                        }
                        else if (partStatus == "status-in-progress") {
                            html += '<td part="td-body">';
                            if (lateStatus == "past-due-date") {
                                pastDueDate++;
                                html += '<span class="material-symbols-outlined color-pending">pending</span><span class="material-icons color-past-due-date">running_with_errors</span>';
                                csvValues += 'in-progress past-due-date,';
                                htmlValues += ('<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' text-center"><span class="material-symbols-outlined color-pending">pending</span><span class="material-icons color-past-due-date">running_with_errors</span></td>');
                            }
                            else {
                                html += '<span class="material-symbols-outlined color-pending">pending</span>';
                                csvValues += 'in-progress,';
                                htmlValues += ('<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' text-center"><span class="material-symbols-outlined color-pending">pending</span></td>');
                            }
                            html += '</td>';
                        }
                        else {
                            html += '<td part="td-body">';
                            if (lateStatus == "past-due-date") {
                                pastDueDate++;
                                html += '<span class="material-icons color-not-started">schedule</span><span class="material-icons color-past-due-date">running_with_errors</span>';
                                csvValues += 'not started past-due-date,';
                                htmlValues += ('<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' text-center"><span class="material-icons color-not-started">schedule</span><span class="material-icons color-past-due-date">running_with_errors</span></td>');
                            }
                            else {
                                html += '<span class="material-icons color-not-started">schedule</span>';
                                csvValues += 'not started,';
                                htmlValues += ('<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' text-center"><span class="material-icons color-not-started">schedule</span></td>');
                            }
                            html += '</td>';
                        }
                        html += '<td id="td-expand-' + i + '" part="td-body">';
                        html += '<button id="button-unmapped-expand-' + mmdd.replace('/', '-') + '-' + j + '" part="button-icon-small" class="material-icons button-expand mr-10">open_in_new</button>';
                        html += '</td>';
                        html += '<td part="td-body"><sf-i-elastic-text text="' + this.events[mmdd][j]["locationname"] + '" minLength="20"></sf-i-elastic-text></td>';
                        for (var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
                            if (this.getEventPreviewFields().includes(Object.keys(this.events[mmdd][j])[k])) {
                                html += '<td part="td-body">';
                                if (this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]].indexOf("[") >= 0) {
                                    html += this.getEventTexts(Object.keys(this.events[mmdd][j])[k], JSON.parse(this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]]), this.events[mmdd][j]);
                                }
                                else {
                                    html += ' <sf-i-elastic-text text="' + this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]].replace(/"/g, "") + '" minLength="20"></sf-i-elastic-text>';
                                }
                                html += '</td>';
                            }
                        }
                        csvValues += this.events[mmdd][j]["id"] + ',' + this.events[mmdd][j]["obligationtitle"] + ',' + this.events[mmdd][j]["obligation"] + ',' + this.events[mmdd][j]["duedate"];
                        htmlValues += ('<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + '">' + this.events[mmdd][j]["obligation"] + '</td>');
                        if (this.events[mmdd][j].documents != null && this.events[mmdd][j].documents != null && (this.events[mmdd][j].documents).length > 0) {
                            html += '<td part="td-body">';
                            html += '<span class="material-icons muted">description</span>';
                            html += (this.events[mmdd][j].documents).length;
                            html += '</td>';
                        }
                        if (this.events[mmdd][j].comments != null && this.events[mmdd][j].comments != null && (this.events[mmdd][j].comments).length > 0) {
                            html += '<td part="td-body">';
                            html += '<span class="material-icons muted">forum</span>';
                            html += (this.events[mmdd][j].comments).length;
                            html += '</td>';
                        }
                        if (this.events[mmdd][j].lastupdated != null && this.events[mmdd][j].lastupdated != null && (this.events[mmdd][j].lastupdated).length > 0) {
                            html += '<td part="td-body">';
                            html += Util.timeSince(new Date(this.events[mmdd][j].lastupdated).getTime());
                            html += '</td>';
                        }
                        csvValues += '\n';
                        htmlValues += ('</tr>');
                        // for(var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
                        //   html += '<th part="td-body">';
                        //   if(this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]].indexOf("[") >= 0) {
                        //     html += this.getEventTexts(Object.keys(this.events[mmdd][j])[k], JSON.parse(this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]]), this.events[mmdd][j]);
                        //   } else {
                        //     html += this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]].replace(/"/g, "");
                        //   }
                        //   html += '</th>';
                        // }
                        html += '</tbody>';
                        html += '</table>';
                        html += '<div class="hidden-filtername hide"><table><thead><th part="badge-filter-name" class="filtername"></th></thead></table></div>';
                        html += '</div>';
                    }
                    html += '</div>';
                    html += '</div>';
                }
                else {
                    if (!hide) {
                        html += '<div part="stream-event-not-selected" class="d-flex stream-event-not-selected">';
                        html += '<div>' + ("0" + startDate.getDate()).slice(-2) + '/' + (startDate.getMonth() + 1) + '</div>';
                        html += '</div>';
                    }
                    else {
                        html += '<div part="stream-event-not-selected" class="d-flex stream-event-not-selected-hidden">';
                        //html += '<div>'+("0" + i).slice(-2)+' |</div>';
                        html += '<div>.</div>';
                        html += '</div>';
                    }
                }
                startDate.setDate(startDate.getDate() + 1);
            }
            html += '</div>';
            console.log('csvValues', csvValues);
            this.csvDataCompliances = csvCols + "\n" + csvValues;
            this.htmlDataCompliances = '<table>' + htmlCols + htmlValues + '</table>';
            inProgress = total - notStarted - approved;
            console.log('progress', total, notStarted, approved);
            html = html.replace("DASHBOARD_TOTAL", total + "");
            html = html.replace("DASHBOARD_NOT_STARTED", notStarted + "");
            html = html.replace("DASHBOARD_APPROVED", approved + "");
            html = html.replace("DASHBOARD_IN_PROGRESS", inProgress + "");
            html = html.replace("DASHBOARD_PAST_DUE_DATE", pastDueDate + "");
            html = html.replace("DASHBOARD_LATE_EXECUTED", lateExecuted + "");
            html = html.replace("DASHBOARD_LATE_APPROVED", lateApproved + "");
            this.csvDataStats = 'Period,Total,Not Started,Approved,In Progress,Past Due Date,Late Executed,Late Approved\n';
            this.csvDataStats += period + "," + total + "," + notStarted + "," + approved + "," + inProgress + "," + pastDueDate + "," + lateExecuted + "," + lateApproved;
            this.htmlDataStats = '<table class="w-100"><tr><th class="w-14">Total</th><th class="w-14">Not Started</th><th class="w-14">Approved</th><th class="w-14">In Progress</th><th class="w-14">Past Due Date</th><th class="w-14">Late Executed</th><th class="w-14">Late Approved</th><tr>';
            this.htmlDataStats += '<tr><td class="w-14 text-center td-odd">' + total + '</td><td class="w-14 text-center td-odd">' + notStarted + '</td><td class="w-14 text-center td-odd">' + approved + '</td><td class="w-14 text-center td-odd">' + inProgress + '</td><td class="w-14 text-center td-odd">' + pastDueDate + '</td><td class="w-14 text-center td-odd">' + lateExecuted + '</td><td class="w-14 text-center td-odd">' + lateApproved + '</td><tr></table>';
            return html;
        };
        this.renderThisEvents = (index, startDate) => {
            var html = '';
            html += '<div class="mb-20 stream-event-list" part="stream-event-list">';
            html += '<div part="stream-event-selected" class="mb-20">';
            html += '<div part="td-head" class="mb-5">Select Chart</div>';
            html += '<div class="mb-10 d-flex flex-wrap align-center">';
            html += '<input type="radio" id="radio-completeness" name="graph-type" checked>';
            html += '<label for="radio-completeness" part="input-label" class="mr-10">Completeness</label>';
            html += '<input type="radio" id="radio-timeliness" name="graph-type">';
            html += '<label for="radio-timeliness" part="input-label">Timeliness</label>';
            html += '</div>';
            html += '</div>';
            html += '<canvas id="myChart"></canvas>';
            html += '<div id="chart-settings-controls"></div>';
            html += '<div id="chart-settings"></div>';
            html += '</div>';
            html += '<div id="stream-event-' + index + '" part="stream-event-list" class="stream-event-list">';
            var firstDate = new Date();
            var count = 7;
            console.log('this start date', startDate);
            if (index === 0) {
                firstDate = this.getFirstDateOfWeek(startDate);
                console.log('this first date', firstDate);
                count = 7;
            }
            if (index === 1) {
                firstDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
                count = this.getLastDayOfMonth(startDate.getFullYear(), startDate.getMonth());
            }
            var total = 0, notStarted = 0, approved = 0, inProgress = 0, pastDueDate = 0, lateExecuted = 0, lateApproved = 0;
            html += '<div id="stream-event-summary" part="stream-event-total" class="d-flex flex-wrap">';
            html += '<div part="badge-dashboard" class="mr-10 mb-10 no-shrink"><span>Total:</span> <span id="graph-total">DASHBOARD_TOTAL</span></div>';
            html += '<div part="badge-dashboard" class="d-flex justify-center align-center mr-10 mb-10 no-shrink"><span class="material-icons color-not-started">schedule</span>&nbsp;&nbsp;<span>Not Started:</span> <span id="graph-not-started">DASHBOARD_NOT_STARTED</span></div>';
            html += '<div part="badge-dashboard" class="d-flex justify-center align-center mr-10 mb-10 no-shrink"><span class="material-symbols-outlined color-pending">pending</span>&nbsp;&nbsp;<span>In Progress:</span> <span id="graph-in-progress">DASHBOARD_IN_PROGRESS</span></div>';
            html += '<div part="badge-dashboard" class="d-flex justify-center align-center mr-10 mb-10 no-shrink"><span class="material-symbols-outlined color-done">check_circle</span>&nbsp;&nbsp;<span>Approved:</span><span id="graph-approved">DASHBOARD_APPROVED</span></div>';
            html += '<div part="calendar-tab-button-not-selected" class="d-flex justify-center align-center mr-10 mb-10 no-shrink cursor" id="button-status-more"><span class="material-symbols-outlined">navigate_next</span></div>';
            html += '<div part="badge-dashboard" class="justify-center align-center mr-10 mb-10 no-shrink late-statuses gone"><span class="material-icons color-past-due-date">running_with_errors</span>&nbsp;&nbsp;<span>Past Due Date:</span> <span id="graph-past-due-date">DASHBOARD_PAST_DUE_DATE</span></div>';
            html += '<div part="badge-dashboard" class="justify-center align-center mr-10 mb-10 no-shrink late-statuses gone"><span class="material-icons color-late-approved">running_with_errors</span>&nbsp;&nbsp;<span>Late Approved:</span> <span id="graph-late-approved">DASHBOARD_LATE_APPROVED</span></div>';
            html += '<div part="badge-dashboard" class="justify-center align-center mr-10 mb-10 no-shrink late-statuses gone"><span class="material-icons color-late-executed">running_with_errors</span>&nbsp;&nbsp;<span>Late Executed:</span> <span id="graph-late-executed">DASHBOARD_LATE_EXECUTED</span></div>';
            html += '</div>';
            this.eventsInWindow = [];
            var csvCols = "", htmlCols = "";
            var csvValues = "", htmlValues = "";
            var period = ("0" + (firstDate.getMonth() + 1)).slice(-2) + "/" + ("0" + 1).slice(-2) + ' - ' + ("0" + (firstDate.getMonth() + 1)).slice(-2) + "/" + ("0" + count).slice(-2);
            this.period = period;
            for (var i = 1; i <= count; i++) {
                const mmdd = ("0" + (firstDate.getMonth() + 1)).slice(-2) + "/" + ("0" + firstDate.getDate()).slice(-2);
                var hide = true;
                if (this.events[mmdd] != null) {
                    hide = false;
                }
                else if (i === 1) {
                    hide = false;
                }
                else if (i === (count)) {
                    hide = false;
                }
                else {
                    const startNextDate = new Date(firstDate.getTime());
                    startNextDate.setDate(firstDate.getDate() + 1);
                    const startPrevDate = new Date(firstDate.getTime());
                    startPrevDate.setDate(firstDate.getDate() - 1);
                    const mmddNext = ("0" + (startNextDate.getMonth() + 1)).slice(-2) + "/" + ("0" + (startNextDate.getDate())).slice(-2);
                    const mmddPrev = ("0" + (startPrevDate.getMonth() + 1)).slice(-2) + "/" + ("0" + (startPrevDate.getDate())).slice(-2);
                    console.log('hide', i, hide, startNextDate, startPrevDate, mmddNext, mmddPrev);
                    if ((this.events[mmddPrev] != null || this.events[mmddNext] != null)) {
                        hide = false;
                    }
                }
                if (this.events[mmdd] != null) {
                    html += '<div part="stream-event-selected" class="d-flex stream-event-selected">';
                    html += '<div part="stream-event-selected-date">' + ("0" + firstDate.getDate()).slice(-2) + '/' + (firstDate.getMonth() + 1) + ' |</div>';
                    html += '<div class="stream-event-list-container flex-grow">';
                    for (var j = 0; j < this.events[mmdd].length; j++) {
                        total++;
                        this.events[mmdd][j]['mmdd'] = mmdd;
                        this.eventsInWindow.push(this.events[mmdd][j]);
                        var partStatus = "";
                        var lateStatus = "";
                        if (this.events[mmdd][j].approved != null && (this.events[mmdd][j].approved) != null && (this.events[mmdd][j].approved)) {
                            partStatus = "status-approved";
                            if (this.getLateExecuted(mmdd, this.events[mmdd][j])) {
                                lateStatus = "late-executed";
                            }
                            else {
                                if (this.getLateApproved(mmdd, this.events[mmdd][j])) {
                                    lateStatus = "late-approved";
                                }
                            }
                        }
                        else if (this.events[mmdd][j].documents != null && this.events[mmdd][j].documents != null && (this.events[mmdd][j].documents).length > 0) {
                            partStatus = "status-in-progress";
                            if (this.getPastDueDate(mmdd)) {
                                lateStatus = "past-due-date";
                            }
                        }
                        else {
                            partStatus = "status-not-started";
                            if (this.getPastDueDate(mmdd)) {
                                lateStatus = "past-due-date";
                            }
                        }
                        html += '<div class="stream-events-container flex-grow">';
                        html += '<div class="hidden-tags hide">' + JSON.stringify(this.events[mmdd][j]['tags']) + '</div>';
                        html += '<div class="hidden-title hide"><table><thead><th part="badge-filtered"><i>filtered out</i></th></thead></table></div>';
                        html += '<table class="stream-events-container-table">';
                        html += '<thead>';
                        html += '<th part="td-head">';
                        html += 'Status';
                        if (csvCols.indexOf('Status') < 0) {
                            csvCols += 'Period,Status,Id,ObligationTitle,Obligation,Duedate';
                            htmlCols += '<tr><th>Id</th><th>Status</th><th>Obligation</th></tr>';
                        }
                        html += '</th>';
                        html += '<th part="td-head">';
                        html += '</th>';
                        html += '<th part="td-head">';
                        html += 'Location';
                        html += '</th>';
                        for (var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
                            if (this.getEventPreviewFields().includes(Object.keys(this.events[mmdd][j])[k])) {
                                html += '<th part="td-head" class="bg-left-no-border">';
                                html += Object.keys(this.events[mmdd][j])[k];
                                html += '</th>';
                            }
                        }
                        console.log('listing docs', this.events[mmdd][j].documents);
                        if (this.events[mmdd][j].documents != null && this.events[mmdd][j].documents != null && (this.events[mmdd][j].documents).length > 0) {
                            html += '<th part="td-head">';
                            html += 'Docs';
                            html += '</th>';
                        }
                        else {
                            notStarted++;
                        }
                        if (this.events[mmdd][j].comments != null && this.events[mmdd][j].comments != null && (this.events[mmdd][j].comments).length > 0) {
                            html += '<th part="td-head">';
                            html += 'Comments';
                            html += '</th>';
                        }
                        if (this.events[mmdd][j].lastupdated != null && this.events[mmdd][j].lastupdated != null && (this.events[mmdd][j].lastupdated).length > 0) {
                            html += '<th part="td-head">';
                            html += 'Updated';
                            html += '</th>';
                        }
                        // for(var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
                        //   html += '<th part="td-head">';
                        //   html += Object.keys(this.events[mmdd][j])[k];
                        //   html += '</th>';
                        // }
                        html += '</thead>';
                        html += '<tbody>';
                        csvValues += (period + ',');
                        htmlValues += ('<tr><td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + '">' + this.events[mmdd][j]["id"] + '</td>');
                        if (partStatus == "status-approved") {
                            approved++;
                            html += '<td part="td-body">';
                            if (lateStatus == "late-executed") {
                                lateExecuted++;
                                html += '<span class="material-symbols-outlined color-done">check_circle</span><span class="material-icons color-late-executed">running_with_errors</span>';
                                csvValues += 'approved late-executed,';
                                htmlValues += ('<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' text-center"><span class="material-symbols-outlined color-done">check_circle</span><span class="material-icons color-late-executed">running_with_errors</span></td>');
                            }
                            else if (lateStatus == "late-approved") {
                                lateApproved++;
                                html += '<span class="material-symbols-outlined color-done">check_circle</span><span class="material-icons color-late-approved">running_with_errors</span>';
                                csvValues += 'approved late-approved,';
                                htmlValues += ('<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' text-center"><span class="material-symbols-outlined color-done">check_circle</span><span class="material-icons color-late-approved">running_with_errors</span></td>');
                            }
                            else {
                                html += '<span class="material-symbols-outlined color-done">check_circle</span>';
                                csvValues += 'approved,';
                                htmlValues += ('<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' text-center"><span class="material-icons color-done">check_circle</span></td>');
                            }
                            html += '</td>';
                        }
                        else if (partStatus == "status-in-progress") {
                            html += '<td part="td-body">';
                            if (lateStatus == "past-due-date") {
                                pastDueDate++;
                                html += '<span class="material-symbols-outlined color-pending">pending</span><span class="material-icons color-past-due-date">running_with_errors</span>';
                                csvValues += 'in-progress past-due-date,';
                                htmlValues += ('<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' text-center"><span class="material-symbols-outlined color-pending">pending</span><span class="material-icons color-past-due-date">running_with_errors</span></td>');
                            }
                            else {
                                html += '<span class="material-symbols-outlined color-pending">pending</span>';
                                csvValues += 'in-progress,';
                                htmlValues += ('<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' text-center"><span class="material-symbols-outlined color-pending">pending</span></td>');
                            }
                            html += '</td>';
                        }
                        else {
                            html += '<td part="td-body">';
                            if (lateStatus == "past-due-date") {
                                pastDueDate++;
                                html += '<span class="material-icons color-not-started">schedule</span><span class="material-icons color-past-due-date">running_with_errors</span>';
                                csvValues += 'not started past-due-date,';
                                htmlValues += ('<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' text-center"><span class="material-icons color-not-started">schedule</span><span class="material-icons color-past-due-date">running_with_errors</span></td>');
                            }
                            else {
                                html += '<span class="material-icons color-not-started">schedule</span>';
                                csvValues += 'not started,';
                                htmlValues += ('<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' text-center"><span class="material-icons color-not-started">schedule</span></td>');
                            }
                            html += '</td>';
                        }
                        html += '<td id="td-expand-' + i + '" part="td-body">';
                        html += '<button id="button-unmapped-expand-' + mmdd.replace('/', '-') + '-' + j + '" part="button-icon-small" class="material-icons button-expand mr-10">open_in_new</button>';
                        html += '</td>';
                        html += '<td part="td-body"><sf-i-elastic-text text="' + this.events[mmdd][j]["locationname"] + '" minLength="20"></sf-i-elastic-text></td>';
                        for (var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
                            if (this.getEventPreviewFields().includes(Object.keys(this.events[mmdd][j])[k])) {
                                html += '<td part="td-body">';
                                if (this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]].indexOf("[") >= 0) {
                                    html += this.getEventTexts(Object.keys(this.events[mmdd][j])[k], JSON.parse(this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]]), this.events[mmdd][j]);
                                }
                                else {
                                    html += ' <sf-i-elastic-text text="' + this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]].replace(/"/g, "") + '" minLength="20"></sf-i-elastic-text>';
                                }
                                html += '</td>';
                            }
                        }
                        csvValues += this.events[mmdd][j]["id"] + ',' + this.events[mmdd][j]["obligationtitle"] + ',' + this.events[mmdd][j]["obligation"] + ',' + this.events[mmdd][j]["duedate"];
                        htmlValues += ('<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + '">' + this.events[mmdd][j]["obligation"] + '</td>');
                        if (this.events[mmdd][j].documents != null && this.events[mmdd][j].documents != null && (this.events[mmdd][j].documents).length > 0) {
                            html += '<td part="td-body">';
                            html += '<span class="material-icons muted">description</span>';
                            html += (this.events[mmdd][j].documents).length;
                            html += '</td>';
                        }
                        if (this.events[mmdd][j].comments != null && this.events[mmdd][j].comments != null && (this.events[mmdd][j].comments).length > 0) {
                            html += '<td part="td-body">';
                            html += '<span class="material-icons muted">forum</span>';
                            html += (this.events[mmdd][j].comments).length;
                            html += '</td>';
                        }
                        if (this.events[mmdd][j].lastupdated != null && this.events[mmdd][j].lastupdated != null && (this.events[mmdd][j].lastupdated).length > 0) {
                            html += '<td part="td-body">';
                            html += Util.timeSince(new Date(this.events[mmdd][j].lastupdated).getTime());
                            html += '</td>';
                        }
                        csvValues += '\n';
                        htmlValues += ('</tr>');
                        // for(var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
                        //   html += '<th part="td-body">';
                        //   if(this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]].indexOf("[") >= 0) {
                        //     html += this.getEventTexts(Object.keys(this.events[mmdd][j])[k], JSON.parse(this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]]), this.events[mmdd][j]);
                        //   } else {
                        //     html += this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]].replace(/"/g, "");
                        //   }
                        //   html += '</th>';
                        // }
                        html += '</tbody>';
                        html += '</table>';
                        html += '<div class="hidden-filtername hide"><table><thead><th part="badge-filter-name" class="filtername"></th></thead></table></div>';
                        html += '</div>';
                    }
                    html += '</div>';
                    html += '</div>';
                }
                else {
                    if (!hide) {
                        html += '<div part="stream-event-not-selected" class="d-flex stream-event-not-selected">';
                        html += '<div>' + ("0" + firstDate.getDate()).slice(-2) + '/' + (firstDate.getMonth() + 1) + '</div>';
                        html += '</div>';
                    }
                    else {
                        html += '<div part="stream-event-not-selected" class="d-flex stream-event-not-selected-hidden">';
                        //html += '<div>'+("0" + i).slice(-2)+' |</div>';
                        html += '<div>.</div>';
                        html += '</div>';
                    }
                }
                firstDate.setDate(firstDate.getDate() + 1);
            }
            html += '</div>';
            this.csvDataCompliances = csvCols + "\n" + csvValues;
            this.htmlDataCompliances = '<table>' + htmlCols + htmlValues + '</table>';
            inProgress = total - notStarted - approved;
            console.log('progress', total, notStarted, approved);
            html = html.replace("DASHBOARD_TOTAL", total + "");
            html = html.replace("DASHBOARD_NOT_STARTED", notStarted + "");
            html = html.replace("DASHBOARD_APPROVED", approved + "");
            html = html.replace("DASHBOARD_IN_PROGRESS", inProgress + "");
            html = html.replace("DASHBOARD_PAST_DUE_DATE", pastDueDate + "");
            html = html.replace("DASHBOARD_LATE_EXECUTED", lateExecuted + "");
            html = html.replace("DASHBOARD_LATE_APPROVED", lateApproved + "");
            this.csvDataStats = 'Period,Total,Not Started,Approved,In Progress,Past Due Date,Late Executed,Late Approved\n';
            this.csvDataStats += period + "," + total + "," + notStarted + "," + approved + "," + inProgress + "," + pastDueDate + "," + lateExecuted + "," + lateApproved;
            this.htmlDataStats = '<table class="w-100"><tr><th class="w-14">Total</th><th class="w-14">Not Started</th><th class="w-14">Approved</th><th class="w-14">In Progress</th><th class="w-14">Past Due Date</th><th class="w-14">Late Executed</th><th class="w-14">Late Approved</th><tr>';
            this.htmlDataStats += '<tr><td class="w-14 text-center td-odd">' + total + '</td><td class="w-14 text-center td-odd">' + notStarted + '</td><td class="w-14 text-center td-odd">' + approved + '</td><td class="w-14 text-center td-odd">' + inProgress + '</td><td class="w-14 text-center td-odd">' + pastDueDate + '</td><td class="w-14 text-center td-odd">' + lateExecuted + '</td><td class="w-14 text-center td-odd">' + lateApproved + '</td><tr></table>';
            return html;
        };
        this.renderPastEvents = (index, startDate) => {
            var html = '';
            html += '<div class="mb-20 stream-event-list" part="stream-event-list">';
            html += '<div part="stream-event-selected" class="mb-20">';
            html += '<div part="td-head" class="mb-5">Select Chart</div>';
            html += '<div class="mb-10 d-flex flex-wrap align-center">';
            html += '<input type="radio" id="radio-completeness" name="graph-type" checked>';
            html += '<label for="radio-completeness" part="input-label" class="mr-10">Completeness</label>';
            html += '<input type="radio" id="radio-timeliness" name="graph-type">';
            html += '<label for="radio-timeliness" part="input-label">Timeliness</label>';
            html += '</div>';
            html += '</div>';
            html += '<canvas id="myChart"></canvas>';
            html += '<div id="chart-settings-controls"></div>';
            html += '<div id="chart-settings"></div>';
            html += '</div>';
            html += '<div id="stream-event-' + index + '" part="stream-event-list" class="stream-event-list">';
            var firstDate = new Date();
            var count = 7;
            console.log('this start date', startDate, index);
            if (index === 0) {
                firstDate = this.getFirstDateOfLastWeek(startDate);
                console.log('this first date', firstDate);
                count = 7;
            }
            if (index === 1) {
                firstDate = this.getFirstDayOfLastMonth(startDate);
                count = this.getLastDayOfLastMonth(startDate.getMonth(), startDate.getFullYear());
                console.log('this start date', firstDate);
                console.log('this start date', count);
            }
            var total = 0, notStarted = 0, approved = 0, inProgress = 0, pastDueDate = 0, lateExecuted = 0, lateApproved = 0;
            html += '<div id="stream-event-summary" part="stream-event-total" class="d-flex flex-wrap">';
            html += '<div part="badge-dashboard" class="mr-10 mb-10 no-shrink"><span>Total:</span> <span id="graph-total">DASHBOARD_TOTAL</span></div>';
            html += '<div part="badge-dashboard" class="d-flex justify-center align-center mr-10 mb-10 no-shrink"><span class="material-icons color-not-started">schedule</span>&nbsp;&nbsp;<span>Not Started:</span> <span id="graph-not-started">DASHBOARD_NOT_STARTED</span></div>';
            html += '<div part="badge-dashboard" class="d-flex justify-center align-center mr-10 mb-10 no-shrink"><span class="material-symbols-outlined color-pending">pending</span>&nbsp;&nbsp;<span>In Progress:</span> <span id="graph-in-progress">DASHBOARD_IN_PROGRESS</span></div>';
            html += '<div part="badge-dashboard" class="d-flex justify-center align-center mr-10 mb-10 no-shrink"><span class="material-symbols-outlined color-done">check_circle</span>&nbsp;&nbsp;<span>Approved:</span><span id="graph-approved">DASHBOARD_APPROVED</span></div>';
            html += '<div part="calendar-tab-button-not-selected" class="d-flex justify-center align-center mr-10 mb-10 no-shrink cursor" id="button-status-more"><span class="material-symbols-outlined">navigate_next</span></div>';
            html += '<div part="badge-dashboard" class="justify-center align-center mr-10 mb-10 no-shrink late-statuses gone"><span class="material-icons color-past-due-date">running_with_errors</span>&nbsp;&nbsp;<span>Past Due Date:</span> <span id="graph-past-due-date">DASHBOARD_PAST_DUE_DATE</span></div>';
            html += '<div part="badge-dashboard" class="justify-center align-center mr-10 mb-10 no-shrink late-statuses gone"><span class="material-icons color-late-approved">running_with_errors</span>&nbsp;&nbsp;<span>Late Approved:</span> <span id="graph-late-approved">DASHBOARD_LATE_APPROVED</span></div>';
            html += '<div part="badge-dashboard" class="justify-center align-center mr-10 mb-10 no-shrink late-statuses gone"><span class="material-icons color-late-executed">running_with_errors</span>&nbsp;&nbsp;<span>Late Executed:</span> <span id="graph-late-executed">DASHBOARD_LATE_EXECUTED</span></div>';
            html += '</div>';
            this.eventsInWindow = [];
            var csvCols = "", htmlCols = "";
            var csvValues = "", htmlValues = "";
            var period = ("0" + (firstDate.getMonth() + 1)).slice(-2) + "/" + ("0" + 1).slice(-2) + ' - ' + ("0" + (firstDate.getMonth() + 1)).slice(-2) + "/" + ("0" + count).slice(-2);
            this.period = period;
            for (var i = 1; i <= count; i++) {
                const mmdd = ("0" + (firstDate.getMonth() + 1)).slice(-2) + "/" + ("0" + firstDate.getDate()).slice(-2);
                var hide = true;
                if (this.events[mmdd] != null) {
                    hide = false;
                }
                else if (i === 1) {
                    hide = false;
                }
                else if (i === (count)) {
                    hide = false;
                }
                else {
                    const startNextDate = new Date(firstDate.getTime());
                    startNextDate.setDate(firstDate.getDate() + 1);
                    const startPrevDate = new Date(firstDate.getTime());
                    startPrevDate.setDate(firstDate.getDate() - 1);
                    const mmddNext = ("0" + (startNextDate.getMonth() + 1)).slice(-2) + "/" + ("0" + (startNextDate.getDate())).slice(-2);
                    const mmddPrev = ("0" + (startPrevDate.getMonth() + 1)).slice(-2) + "/" + ("0" + (startPrevDate.getDate())).slice(-2);
                    console.log('hide', i, hide, startNextDate, startPrevDate, mmddNext, mmddPrev);
                    if ((this.events[mmddPrev] != null || this.events[mmddNext] != null)) {
                        hide = false;
                    }
                }
                if (this.events[mmdd] != null) {
                    html += '<div part="stream-event-selected" class="d-flex stream-event-selected">';
                    html += '<div part="stream-event-selected-date">' + ("0" + firstDate.getDate()).slice(-2) + '/' + (firstDate.getMonth() + 1) + ' |</div>';
                    html += '<div class="stream-event-list-container flex-grow">';
                    for (var j = 0; j < this.events[mmdd].length; j++) {
                        total++;
                        this.events[mmdd][j]['mmdd'] = mmdd;
                        this.eventsInWindow.push(this.events[mmdd][j]);
                        var partStatus = "";
                        var lateStatus = "";
                        if (this.events[mmdd][j].approved != null && (this.events[mmdd][j].approved) != null && (this.events[mmdd][j].approved)) {
                            partStatus = "status-approved";
                            if (this.getLateExecuted(mmdd, this.events[mmdd][j])) {
                                lateStatus = "late-executed";
                            }
                            else {
                                if (this.getLateApproved(mmdd, this.events[mmdd][j])) {
                                    lateStatus = "late-approved";
                                }
                            }
                        }
                        else if (this.events[mmdd][j].documents != null && this.events[mmdd][j].documents != null && (this.events[mmdd][j].documents).length > 0) {
                            partStatus = "status-in-progress";
                            if (this.getPastDueDate(mmdd)) {
                                lateStatus = "past-due-date";
                            }
                        }
                        else {
                            partStatus = "status-not-started";
                            if (this.getPastDueDate(mmdd)) {
                                lateStatus = "past-due-date";
                            }
                        }
                        html += '<div class="stream-events-container flex-grow">';
                        html += '<div class="hidden-tags hide">' + JSON.stringify(this.events[mmdd][j]['tags']) + '</div>';
                        html += '<div class="hidden-title hide"><table><thead><th part="badge-filtered"><i>filtered out</i></th></thead></table></div>';
                        html += '<table class="stream-events-container-table">';
                        html += '<thead>';
                        html += '<th part="td-head">';
                        html += 'Status';
                        if (csvCols.indexOf('Status') < 0) {
                            csvCols += 'Period,Status,Id,ObligationTitle,Obligation,Duedate';
                            htmlCols += '<tr><th>Id</th><th>Status</th><th>Obligation</th></tr>';
                        }
                        html += '</th>';
                        html += '<th part="td-head">';
                        html += '</th>';
                        html += '<th part="td-head">';
                        html += 'Location';
                        html += '</th>';
                        for (var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
                            if (this.getEventPreviewFields().includes(Object.keys(this.events[mmdd][j])[k])) {
                                html += '<th part="td-head" class="bg-left-no-border">';
                                html += Object.keys(this.events[mmdd][j])[k];
                                html += '</th>';
                            }
                        }
                        console.log('listing docs', this.events[mmdd][j].documents);
                        if (this.events[mmdd][j].documents != null && this.events[mmdd][j].documents != null && (this.events[mmdd][j].documents).length > 0) {
                            html += '<th part="td-head">';
                            html += 'Docs';
                            html += '</th>';
                        }
                        else {
                            notStarted++;
                        }
                        if (this.events[mmdd][j].comments != null && this.events[mmdd][j].comments != null && (this.events[mmdd][j].comments).length > 0) {
                            html += '<th part="td-head">';
                            html += 'Comments';
                            html += '</th>';
                        }
                        if (this.events[mmdd][j].lastupdated != null && this.events[mmdd][j].lastupdated != null && (this.events[mmdd][j].lastupdated).length > 0) {
                            html += '<th part="td-head">';
                            html += 'Updated';
                            html += '</th>';
                        }
                        // for(var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
                        //   html += '<th part="td-head">';
                        //   html += Object.keys(this.events[mmdd][j])[k];
                        //   html += '</th>';
                        // }
                        html += '</thead>';
                        html += '<tbody>';
                        csvValues += (period + ',');
                        htmlValues += ('<tr><td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + '">' + this.events[mmdd][j]["id"] + '</td>');
                        if (partStatus == "status-approved") {
                            approved++;
                            html += '<td part="td-body">';
                            if (lateStatus == "late-executed") {
                                lateExecuted++;
                                html += '<span class="material-symbols-outlined color-done">check_circle</span><span class="material-icons color-late-executed">running_with_errors</span>';
                                csvValues += 'approved late-executed,';
                                htmlValues += ('<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' text-center"><span class="material-symbols-outlined color-done">check_circle</span><span class="material-icons color-late-executed">running_with_errors</span></td>');
                            }
                            else if (lateStatus == "late-approved") {
                                lateApproved++;
                                html += '<span class="material-symbols-outlined color-done">check_circle</span><span class="material-icons color-late-approved">running_with_errors</span>';
                                csvValues += 'approved late-approved,';
                                htmlValues += ('<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' text-center"><span class="material-symbols-outlined color-done">check_circle</span><span class="material-icons color-late-approved">running_with_errors</span></td>');
                            }
                            else {
                                html += '<span class="material-symbols-outlined color-done">check_circle</span>';
                                csvValues += 'approved,';
                                htmlValues += ('<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' text-center"><span class="material-icons color-done">check_circle</span></td>');
                            }
                            html += '</td>';
                        }
                        else if (partStatus == "status-in-progress") {
                            html += '<td part="td-body">';
                            if (lateStatus == "past-due-date") {
                                pastDueDate++;
                                html += '<span class="material-symbols-outlined color-pending">pending</span><span class="material-icons color-past-due-date">running_with_errors</span>';
                                csvValues += 'in-progress past-due-date,';
                                htmlValues += ('<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' text-center"><span class="material-symbols-outlined color-pending">pending</span><span class="material-icons color-past-due-date">running_with_errors</span></td>');
                            }
                            else {
                                html += '<span class="material-symbols-outlined color-pending">pending</span>';
                                csvValues += 'in-progress,';
                                htmlValues += ('<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' text-center"><span class="material-symbols-outlined color-pending">pending</span></td>');
                            }
                            html += '</td>';
                        }
                        else {
                            html += '<td part="td-body">';
                            if (lateStatus == "past-due-date") {
                                pastDueDate++;
                                html += '<span class="material-icons color-not-started">schedule</span><span class="material-icons color-past-due-date">running_with_errors</span>';
                                csvValues += 'not started past-due-date,';
                                htmlValues += ('<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' text-center"><span class="material-icons color-not-started">schedule</span><span class="material-icons color-past-due-date">running_with_errors</span></td>');
                            }
                            else {
                                html += '<span class="material-icons color-not-started">schedule</span>';
                                csvValues += 'not started,';
                                htmlValues += ('<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' text-center"><span class="material-icons color-not-started">schedule</span></td>');
                            }
                            html += '</td>';
                        }
                        html += '<td id="td-expand-' + i + '" part="td-body">';
                        html += '<button id="button-unmapped-expand-' + mmdd.replace('/', '-') + '-' + j + '" part="button-icon-small" class="material-icons button-expand mr-10">open_in_new</button>';
                        html += '</td>';
                        html += '<td part="td-body"><sf-i-elastic-text text="' + this.events[mmdd][j]["locationname"] + '" minLength="20"></sf-i-elastic-text></td>';
                        for (var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
                            if (this.getEventPreviewFields().includes(Object.keys(this.events[mmdd][j])[k])) {
                                html += '<td part="td-body">';
                                if (this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]].indexOf("[") >= 0) {
                                    html += this.getEventTexts(Object.keys(this.events[mmdd][j])[k], JSON.parse(this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]]), this.events[mmdd][j]);
                                }
                                else {
                                    html += ' <sf-i-elastic-text text="' + this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]].replace(/"/g, "") + '" minLength="20"></sf-i-elastic-text>';
                                }
                                html += '</td>';
                            }
                        }
                        csvValues += this.events[mmdd][j]["id"] + ',' + this.events[mmdd][j]["obligationtitle"] + ',' + this.events[mmdd][j]["obligation"] + ',' + this.events[mmdd][j]["duedate"];
                        htmlValues += ('<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + '">' + this.events[mmdd][j]["obligation"] + '</td>');
                        if (this.events[mmdd][j].documents != null && this.events[mmdd][j].documents != null && (this.events[mmdd][j].documents).length > 0) {
                            html += '<td part="td-body">';
                            html += '<span class="material-icons muted">description</span>';
                            html += (this.events[mmdd][j].documents).length;
                            html += '</td>';
                        }
                        if (this.events[mmdd][j].comments != null && this.events[mmdd][j].comments != null && (this.events[mmdd][j].comments).length > 0) {
                            html += '<td part="td-body">';
                            html += '<span class="material-icons muted">forum</span>';
                            html += (this.events[mmdd][j].comments).length;
                            html += '</td>';
                        }
                        if (this.events[mmdd][j].lastupdated != null && this.events[mmdd][j].lastupdated != null && (this.events[mmdd][j].lastupdated).length > 0) {
                            html += '<td part="td-body">';
                            html += Util.timeSince(new Date(this.events[mmdd][j].lastupdated).getTime());
                            html += '</td>';
                        }
                        csvValues += '\n';
                        htmlValues += ('</tr>');
                        // for(var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
                        //   html += '<th part="td-body">';
                        //   if(this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]].indexOf("[") >= 0) {
                        //     html += this.getEventTexts(Object.keys(this.events[mmdd][j])[k], JSON.parse(this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]]), this.events[mmdd][j]);
                        //   } else {
                        //     html += this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]].replace(/"/g, "");
                        //   }
                        //   html += '</th>';
                        // }
                        html += '</tbody>';
                        html += '</table>';
                        html += '<div class="hidden-filtername hide"><table><thead><th part="badge-filter-name" class="filtername"></th></thead></table></div>';
                        html += '</div>';
                    }
                    html += '</div>';
                    html += '</div>';
                }
                else {
                    if (!hide) {
                        html += '<div part="stream-event-not-selected" class="d-flex stream-event-not-selected">';
                        html += '<div>' + ("0" + firstDate.getDate()).slice(-2) + '/' + (firstDate.getMonth() + 1) + '</div>';
                        html += '</div>';
                    }
                    else {
                        html += '<div part="stream-event-not-selected" class="d-flex stream-event-not-selected-hidden">';
                        //html += '<div>'+("0" + i).slice(-2)+' |</div>';
                        html += '<div>.</div>';
                        html += '</div>';
                    }
                }
                firstDate.setDate(firstDate.getDate() + 1);
            }
            html += '</div>';
            this.csvDataCompliances = csvCols + "\n" + csvValues;
            this.htmlDataCompliances = '<table>' + htmlCols + htmlValues + '</table>';
            inProgress = total - notStarted - approved;
            console.log('progress', total, notStarted, approved);
            html = html.replace("DASHBOARD_TOTAL", total + "");
            html = html.replace("DASHBOARD_NOT_STARTED", notStarted + "");
            html = html.replace("DASHBOARD_APPROVED", approved + "");
            html = html.replace("DASHBOARD_IN_PROGRESS", inProgress + "");
            html = html.replace("DASHBOARD_PAST_DUE_DATE", pastDueDate + "");
            html = html.replace("DASHBOARD_LATE_EXECUTED", lateExecuted + "");
            html = html.replace("DASHBOARD_LATE_APPROVED", lateApproved + "");
            this.csvDataStats = 'Period,Total,Not Started,Approved,In Progress,Past Due Date,Late Executed,Late Approved\n';
            this.csvDataStats += period + "," + total + "," + notStarted + "," + approved + "," + inProgress + "," + pastDueDate + "," + lateExecuted + "," + lateApproved;
            this.htmlDataStats = '<table class="w-100"><tr><th class="w-14">Total</th><th class="w-14">Not Started</th><th class="w-14">Approved</th><th class="w-14">In Progress</th><th class="w-14">Past Due Date</th><th class="w-14">Late Executed</th><th class="w-14">Late Approved</th><tr>';
            this.htmlDataStats += '<tr><td class="w-14 text-center td-odd">' + total + '</td><td class="w-14 text-center td-odd">' + notStarted + '</td><td class="w-14 text-center td-odd">' + approved + '</td><td class="w-14 text-center td-odd">' + inProgress + '</td><td class="w-14 text-center td-odd">' + pastDueDate + '</td><td class="w-14 text-center td-odd">' + lateExecuted + '</td><td class="w-14 text-center td-odd">' + lateApproved + '</td><tr></table>';
            return html;
        };
        this.renderRangeEvents = (firstDate, count) => {
            var html = '';
            html += '<div class="mb-20 stream-event-list" part="stream-event-list">';
            html += '<div part="stream-event-selected" class="mb-20">';
            html += '<div part="td-head" class="mb-5">Select Chart</div>';
            html += '<div class="mb-10 d-flex flex-wrap align-center">';
            html += '<input type="radio" id="radio-completeness" name="graph-type" checked>';
            html += '<label for="radio-completeness" part="input-label" class="mr-10">Completeness</label>';
            html += '<input type="radio" id="radio-timeliness" name="graph-type">';
            html += '<label for="radio-timeliness" part="input-label">Timeliness</label>';
            html += '</div>';
            html += '</div>';
            html += '<canvas id="myChart"></canvas>';
            html += '<div id="chart-settings-controls"></div>';
            html += '<div id="chart-settings"></div>';
            html += '</div>';
            html += '<div id="stream-event-0" part="stream-event-list" class="stream-event-list">';
            var total = 0, notStarted = 0, approved = 0, inProgress = 0, pastDueDate = 0, lateExecuted = 0, lateApproved = 0;
            html += '<div id="stream-event-summary" part="stream-event-total" class="d-flex flex-wrap">';
            html += '<div part="badge-dashboard" class="mr-10 mb-10 no-shrink"><span>Total:</span> <span id="graph-total">DASHBOARD_TOTAL</span></div>';
            html += '<div part="badge-dashboard" class="d-flex justify-center align-center mr-10 mb-10 no-shrink"><span class="material-icons color-not-started">schedule</span>&nbsp;&nbsp;<span>Not Started:</span> <span id="graph-not-started">DASHBOARD_NOT_STARTED</span></div>';
            html += '<div part="badge-dashboard" class="d-flex justify-center align-center mr-10 mb-10 no-shrink"><span class="material-symbols-outlined color-pending">pending</span>&nbsp;&nbsp;<span>In Progress:</span> <span id="graph-in-progress">DASHBOARD_IN_PROGRESS</span></div>';
            html += '<div part="badge-dashboard" class="d-flex justify-center align-center mr-10 mb-10 no-shrink"><span class="material-symbols-outlined color-done">check_circle</span>&nbsp;&nbsp;<span>Approved:</span><span id="graph-approved">DASHBOARD_APPROVED</span></div>';
            html += '<div part="calendar-tab-button-not-selected" class="d-flex justify-center align-center mr-10 mb-10 no-shrink cursor" id="button-status-more"><span class="material-symbols-outlined">navigate_next</span></div>';
            html += '<div part="badge-dashboard" class="justify-center align-center mr-10 mb-10 no-shrink late-statuses gone"><span class="material-icons color-past-due-date">running_with_errors</span>&nbsp;&nbsp;<span>Past Due Date:</span> <span id="graph-past-due-date">DASHBOARD_PAST_DUE_DATE</span></div>';
            html += '<div part="badge-dashboard" class="justify-center align-center mr-10 mb-10 no-shrink late-statuses gone"><span class="material-icons color-late-approved">running_with_errors</span>&nbsp;&nbsp;<span>Late Approved:</span> <span id="graph-late-approved">DASHBOARD_LATE_APPROVED</span></div>';
            html += '<div part="badge-dashboard" class="justify-center align-center mr-10 mb-10 no-shrink late-statuses gone"><span class="material-icons color-late-executed">running_with_errors</span>&nbsp;&nbsp;<span>Late Executed:</span> <span id="graph-late-executed">DASHBOARD_LATE_EXECUTED</span></div>';
            html += '</div>';
            var lastDate = new Date(firstDate.getTime());
            lastDate.setDate(lastDate.getDate() + count);
            this.eventsInWindow = [];
            var csvCols = "", htmlCols = "";
            var csvValues = "", htmlValues = "";
            var period = ("0" + (firstDate.getMonth() + 1)).slice(-2) + "/" + ("0" + firstDate.getDate()).slice(-2) + ' - ' + ("0" + (lastDate.getMonth() + 1)).slice(-2) + "/" + ("0" + lastDate.getDate()).slice(-2);
            for (var i = 1; i <= count; i++) {
                const mmdd = ("0" + (firstDate.getMonth() + 1)).slice(-2) + "/" + ("0" + firstDate.getDate()).slice(-2);
                var hide = true;
                if (this.events[mmdd] != null) {
                    hide = false;
                }
                else if (i === 1) {
                    hide = false;
                }
                else if (i === (count)) {
                    hide = false;
                }
                else {
                    const startNextDate = new Date(firstDate.getTime());
                    startNextDate.setDate(firstDate.getDate() + 1);
                    const startPrevDate = new Date(firstDate.getTime());
                    startPrevDate.setDate(firstDate.getDate() - 1);
                    const mmddNext = ("0" + (startNextDate.getMonth() + 1)).slice(-2) + "/" + ("0" + (startNextDate.getDate())).slice(-2);
                    const mmddPrev = ("0" + (startPrevDate.getMonth() + 1)).slice(-2) + "/" + ("0" + (startPrevDate.getDate())).slice(-2);
                    console.log('hide', i, hide, startNextDate, startPrevDate, mmddNext, mmddPrev);
                    if ((this.events[mmddPrev] != null || this.events[mmddNext] != null)) {
                        hide = false;
                    }
                }
                if (this.events[mmdd] != null) {
                    html += '<div part="stream-event-selected" class="d-flex stream-event-selected">';
                    html += '<div part="stream-event-selected-date">' + ("0" + firstDate.getDate()).slice(-2) + '/' + (firstDate.getMonth() + 1) + ' |</div>';
                    html += '<div class="stream-event-list-container flex-grow">';
                    for (var j = 0; j < this.events[mmdd].length; j++) {
                        total++;
                        this.events[mmdd][j]['mmdd'] = mmdd;
                        this.eventsInWindow.push(this.events[mmdd][j]);
                        var partStatus = "";
                        var lateStatus = "";
                        if (this.events[mmdd][j].approved != null && (this.events[mmdd][j].approved) != null && (this.events[mmdd][j].approved)) {
                            partStatus = "status-approved";
                            if (this.getLateExecuted(mmdd, this.events[mmdd][j])) {
                                lateStatus = "late-executed";
                            }
                            else {
                                if (this.getLateApproved(mmdd, this.events[mmdd][j])) {
                                    lateStatus = "late-approved";
                                }
                            }
                        }
                        else if (this.events[mmdd][j].documents != null && this.events[mmdd][j].documents != null && (this.events[mmdd][j].documents).length > 0) {
                            partStatus = "status-in-progress";
                            if (this.getPastDueDate(mmdd)) {
                                lateStatus = "past-due-date";
                            }
                        }
                        else {
                            partStatus = "status-not-started";
                            if (this.getPastDueDate(mmdd)) {
                                lateStatus = "past-due-date";
                            }
                        }
                        html += '<div class="stream-events-container flex-grow">';
                        html += '<div class="hidden-tags hide">' + JSON.stringify(this.events[mmdd][j]['tags']) + '</div>';
                        html += '<div class="hidden-title hide"><table><thead><th part="badge-filtered"><i>filtered out</i></th></thead></table></div>';
                        html += '<table class="stream-events-container-table">';
                        html += '<thead>';
                        html += '<th part="td-head">';
                        html += 'Status';
                        if (csvCols.indexOf('Status') < 0) {
                            csvCols += 'Period,Status,Id,ObligationTitle,Obligation,Duedate';
                            htmlCols += '<tr><th>Id</th><th>Status</th><th>Obligation</th></tr>';
                        }
                        html += '</th>';
                        html += '<th part="td-head">';
                        html += '</th>';
                        html += '<th part="td-head">';
                        html += 'Location';
                        html += '</th>';
                        for (var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
                            if (this.getEventPreviewFields().includes(Object.keys(this.events[mmdd][j])[k])) {
                                html += '<th part="td-head" class="bg-left-no-border">';
                                html += Object.keys(this.events[mmdd][j])[k];
                                html += '</th>';
                            }
                        }
                        html += '<th part="td-head">';
                        html += '</th>';
                        console.log('listing docs', this.events[mmdd][j].documents);
                        if (this.events[mmdd][j].documents != null && this.events[mmdd][j].documents != null && (this.events[mmdd][j].documents).length > 0) {
                            html += '<th part="td-head">';
                            html += 'Docs';
                            html += '</th>';
                        }
                        else {
                            notStarted++;
                        }
                        if (this.events[mmdd][j].comments != null && this.events[mmdd][j].comments != null && (this.events[mmdd][j].comments).length > 0) {
                            html += '<th part="td-head">';
                            html += 'Comments';
                            html += '</th>';
                        }
                        if (this.events[mmdd][j].lastupdated != null && this.events[mmdd][j].lastupdated != null && (this.events[mmdd][j].lastupdated).length > 0) {
                            html += '<th part="td-head">';
                            html += 'Updated';
                            html += '</th>';
                        }
                        // for(var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
                        //   html += '<th part="td-head">';
                        //   html += Object.keys(this.events[mmdd][j])[k];
                        //   html += '</th>';
                        // }
                        html += '</thead>';
                        html += '<tbody>';
                        csvValues += (period + ',');
                        htmlValues += ('<tr><td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + '">' + this.events[mmdd][j]["id"] + '</td>');
                        if (partStatus == "status-approved") {
                            approved++;
                            html += '<td part="td-body">';
                            if (lateStatus == "late-executed") {
                                lateExecuted++;
                                html += '<span class="material-symbols-outlined color-done">check_circle</span><span class="material-icons color-late-executed">running_with_errors</span>';
                                csvValues += 'approved late-executed,';
                                htmlValues += ('<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' text-center"><span class="material-symbols-outlined color-done">check_circle</span><span class="material-icons color-late-executed">running_with_errors</span></td>');
                            }
                            else if (lateStatus == "late-approved") {
                                lateApproved++;
                                html += '<span class="material-symbols-outlined color-done">check_circle</span><span class="material-icons color-late-approved">running_with_errors</span>';
                                csvValues += 'approved late-approved,';
                                htmlValues += ('<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' text-center"><span class="material-symbols-outlined color-done">check_circle</span><span class="material-icons color-late-approved">running_with_errors</span></td>');
                            }
                            else {
                                html += '<span class="material-symbols-outlined color-done">check_circle</span>';
                                csvValues += 'approved,';
                                htmlValues += ('<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' text-center"><span class="material-icons color-done">check_circle</span></td>');
                            }
                            html += '</td>';
                        }
                        else if (partStatus == "status-in-progress") {
                            html += '<td part="td-body">';
                            if (lateStatus == "past-due-date") {
                                pastDueDate++;
                                html += '<span class="material-symbols-outlined color-pending">pending</span><span class="material-icons color-past-due-date">running_with_errors</span>';
                                csvValues += 'in-progress past-due-date,';
                                htmlValues += ('<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' text-center"><span class="material-symbols-outlined color-pending">pending</span><span class="material-icons color-past-due-date">running_with_errors</span></td>');
                            }
                            else {
                                html += '<span class="material-symbols-outlined color-pending">pending</span>';
                                csvValues += 'in-progress,';
                                htmlValues += ('<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' text-center"><span class="material-symbols-outlined color-pending">pending</span></td>');
                            }
                            html += '</td>';
                        }
                        else {
                            html += '<td part="td-body">';
                            if (lateStatus == "past-due-date") {
                                pastDueDate++;
                                html += '<span class="material-icons color-not-started">schedule</span><span class="material-icons color-past-due-date">running_with_errors</span>';
                                csvValues += 'not started past-due-date,';
                                htmlValues += ('<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' text-center"><span class="material-icons color-not-started">schedule</span><span class="material-icons color-past-due-date">running_with_errors</span></td>');
                            }
                            else {
                                html += '<span class="material-icons color-not-started">schedule</span>';
                                csvValues += 'not started,';
                                htmlValues += ('<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + ' text-center"><span class="material-icons color-not-started">schedule</span></td>');
                            }
                            html += '</td>';
                        }
                        html += '<td id="td-expand-' + i + '" part="td-body">';
                        html += '<button id="button-unmapped-expand-' + mmdd.replace('/', '-') + '-' + j + '" part="button-icon-small" class="material-icons button-expand mr-10">open_in_new</button>';
                        html += '</td>';
                        html += '<td part="td-body"><sf-i-elastic-text text="' + this.events[mmdd][j]["locationname"] + '" minLength="20"></sf-i-elastic-text></td>';
                        for (var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
                            if (this.getEventPreviewFields().includes(Object.keys(this.events[mmdd][j])[k])) {
                                html += '<td part="td-body">';
                                if (this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]].indexOf("[") >= 0) {
                                    html += this.getEventTexts(Object.keys(this.events[mmdd][j])[k], JSON.parse(this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]]), this.events[mmdd][j]);
                                }
                                else {
                                    html += ' <sf-i-elastic-text text="' + this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]].replace(/"/g, "") + '" minLength="20"></sf-i-elastic-text>';
                                }
                                html += '</td>';
                            }
                        }
                        csvValues += this.events[mmdd][j]["id"] + ',' + this.events[mmdd][j]["obligationtitle"] + ',' + this.events[mmdd][j]["obligation"] + ',' + this.events[mmdd][j]["duedate"];
                        htmlValues += ('<td class="' + (total % 2 === 0 ? 'td-odd' : 'td-even') + '">' + this.events[mmdd][j]["obligation"] + '</td>');
                        if (this.events[mmdd][j].documents != null && this.events[mmdd][j].documents != null && (this.events[mmdd][j].documents).length > 0) {
                            html += '<td part="td-body">';
                            html += '<span class="material-icons muted">description</span>';
                            html += (this.events[mmdd][j].documents).length;
                            html += '</td>';
                        }
                        if (this.events[mmdd][j].comments != null && this.events[mmdd][j].comments != null && (this.events[mmdd][j].comments).length > 0) {
                            html += '<td part="td-body">';
                            html += '<span class="material-icons muted">forum</span>';
                            html += (this.events[mmdd][j].comments).length;
                            html += '</td>';
                        }
                        if (this.events[mmdd][j].lastupdated != null && this.events[mmdd][j].lastupdated != null && (this.events[mmdd][j].lastupdated).length > 0) {
                            html += '<td part="td-body">';
                            html += Util.timeSince(new Date(this.events[mmdd][j].lastupdated).getTime());
                            html += '</td>';
                        }
                        csvValues += '\n';
                        htmlValues += ('</tr>');
                        // for(var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
                        //   html += '<th part="td-body">';
                        //   if(this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]].indexOf("[") >= 0) {
                        //     html += this.getEventTexts(Object.keys(this.events[mmdd][j])[k], JSON.parse(this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]]), this.events[mmdd][j]);
                        //   } else {
                        //     html += this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]].replace(/"/g, "");
                        //   }
                        //   html += '</th>';
                        // }
                        html += '</tbody>';
                        html += '</table>';
                        html += '<div class="hidden-filtername hide"><table><thead><th part="badge-filter-name" class="filtername"></th></thead></table></div>';
                        html += '</div>';
                    }
                    html += '</div>';
                    html += '</div>';
                }
                else {
                    if (!hide) {
                        html += '<div part="stream-event-not-selected" class="d-flex stream-event-not-selected">';
                        html += '<div>' + ("0" + firstDate.getDate()).slice(-2) + '/' + (firstDate.getMonth() + 1) + '</div>';
                        html += '</div>';
                    }
                    else {
                        html += '<div part="stream-event-not-selected" class="d-flex stream-event-not-selected-hidden">';
                        //html += '<div>'+("0" + i).slice(-2)+' |</div>';
                        html += '<div>.</div>';
                        html += '</div>';
                    }
                }
                firstDate.setDate(firstDate.getDate() + 1);
            }
            html += '</div>';
            this.csvDataCompliances = csvCols + "\n" + csvValues;
            this.htmlDataCompliances = '<table>' + htmlCols + htmlValues + '</table>';
            inProgress = total - notStarted - approved;
            console.log('progress', total, notStarted, approved);
            html = html.replace("DASHBOARD_TOTAL", total + "");
            html = html.replace("DASHBOARD_NOT_STARTED", notStarted + "");
            html = html.replace("DASHBOARD_APPROVED", approved + "");
            html = html.replace("DASHBOARD_IN_PROGRESS", inProgress + "");
            html = html.replace("DASHBOARD_PAST_DUE_DATE", pastDueDate + "");
            html = html.replace("DASHBOARD_LATE_EXECUTED", lateExecuted + "");
            html = html.replace("DASHBOARD_LATE_APPROVED", lateApproved + "");
            this.csvDataStats = 'Period,Total,Not Started,Approved,In Progress,Past Due Date,Late Executed,Late Approved\n';
            this.csvDataStats += period + "," + total + "," + notStarted + "," + approved + "," + inProgress + "," + pastDueDate + "," + lateExecuted + "," + lateApproved;
            this.htmlDataStats = '<table class="w-100"><tr><th class="w-14">Total</th><th class="w-14">Not Started</th><th class="w-14">Approved</th><th class="w-14">In Progress</th><th class="w-14">Past Due Date</th><th class="w-14">Late Executed</th><th class="w-14">Late Approved</th><tr>';
            this.htmlDataStats += '<tr><td class="w-14 text-center td-odd">' + total + '</td><td class="w-14 text-center td-odd">' + notStarted + '</td><td class="w-14 text-center td-odd">' + approved + '</td><td class="w-14 text-center td-odd">' + inProgress + '</td><td class="w-14 text-center td-odd">' + pastDueDate + '</td><td class="w-14 text-center td-odd">' + lateExecuted + '</td><td class="w-14 text-center td-odd">' + lateApproved + '</td><tr></table>';
            this._SfCustomContainer.querySelector('.calendar-right-data').innerHTML = html;
            const buttonArr = this._SfCustomContainer.querySelectorAll('.button-expand');
            for (var i = 0; i < buttonArr.length; i++) {
                buttonArr[i].addEventListener('click', (ev) => {
                    const id = ev.target.id;
                    const idArr = id.split("-");
                    const mmdd = idArr[3] + "/" + idArr[4];
                    const j = idArr[5];
                    this._SfDetailContainer.style.display = 'block';
                    this.renderEventDetail(this.events[mmdd][j], mmdd + "/" + ((new Date()).getFullYear() + ""));
                });
            }
        };
        this.checkStartDateEarliness = (value) => {
            var startDateCalendar = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + this.calendarStartYYYY);
            var startDateChosen = new Date(value);
            if (startDateChosen.getTime() > startDateCalendar.getTime()) {
                return true;
            }
            else {
                return false;
            }
        };
        this.checkEndDateLateness = (value) => {
            var endDateCalendar = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + (parseInt(this.calendarStartYYYY) + 1));
            var endDateChosen = new Date(value);
            console.log('end date calendar', endDateCalendar);
            console.log('end date chosen', endDateChosen);
            if (endDateChosen.getTime() > endDateCalendar.getTime()) {
                return false;
            }
            else {
                return true;
            }
        };
        this.processDateSelection = () => {
            var startDateCalendar = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + this.calendarStartYYYY);
            var endDateCalendar = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + (parseInt(this.calendarStartYYYY) + 1));
            const valueStart = this._SfCustomContainer.querySelector('#stream-start-date').value;
            const valueEnd = this._SfCustomContainer.querySelector('#stream-end-date').value;
            if (valueStart != "" && valueEnd != "") {
                this.initCustomRightCol();
                if (!this.checkStartDateEarliness(valueStart)) {
                    this._SfStreamEventStatus.innerHTML = "Chosen Start Date cannot be earlier than " + startDateCalendar;
                    return;
                }
                if (!this.checkEndDateLateness(valueEnd)) {
                    this._SfStreamEventStatus.innerHTML = "Chosen End Date cannot be later than " + endDateCalendar;
                    return;
                }
                if (new Date(valueStart).getTime() > new Date(valueEnd).getTime()) {
                    this._SfStreamEventStatus.innerHTML = "Chosen End Date cannot be earlier than chosen Start Date";
                    return;
                }
                if ((new Date(valueEnd).getTime() - new Date(valueStart).getTime()) / (1000 * 60 * 60 * 24) > 365) {
                    this._SfStreamEventStatus.innerHTML = "Chosen time window cannot be greater than 365 days";
                    return;
                }
                this.renderRangeEvents(new Date(valueStart), (new Date(valueEnd).getTime() - new Date(valueStart).getTime()) / (1000 * 60 * 60 * 24));
            }
            else if (valueStart != "" && valueEnd == "") {
                this._SfStreamEventStatus.innerHTML = "Please select End Date";
            }
            else if (valueStart == "" && valueEnd != "") {
                this._SfStreamEventStatus.innerHTML = "Please select Start Date";
            }
            else {
                this._SfStreamEventStatus.innerHTML = "Please select Start Date and End Date";
            }
            console.log('rendering chart', this._SfCustomContainer.innerHTML);
            const radioCompleteness = this._SfCustomContainer.querySelector('#radio-completeness');
            radioCompleteness === null || radioCompleteness === void 0 ? void 0 : radioCompleteness.addEventListener('click', () => {
                this.renderCompletenessGraph(this._SfCustomContainer);
            });
            const radioTimeliness = this._SfCustomContainer.querySelector('#radio-timeliness');
            radioTimeliness === null || radioTimeliness === void 0 ? void 0 : radioTimeliness.addEventListener('click', () => {
                this.renderTimelinessGraph(this._SfCustomContainer);
            });
            const buttonStatusMore = this._SfCustomContainer.querySelector('#button-status-more');
            buttonStatusMore === null || buttonStatusMore === void 0 ? void 0 : buttonStatusMore.addEventListener('click', () => {
                const divStatusList = this._SfCustomContainer.querySelectorAll('.late-statuses');
                for (var i = 0; i < divStatusList.length; i++) {
                    divStatusList[i].style.display = 'flex';
                }
                buttonStatusMore.style.display = 'none';
            });
            if (this._SfCustomContainer.innerHTML.indexOf('myChart') >= 0) {
                this.renderCompletenessGraph(this._SfCustomContainer);
            }
        };
        this.initCustomRightCol = () => {
            var html = "";
            html += '<div id="stream-event-0" part="stream-event-list" class="stream-event-list">';
            html += '<div part="stream-event-not-selected" class="d-flex stream-event-not-selected">';
            html += '<div><h2 id="stream-event-status">Please select Start Date and End Date</h2></div>';
            html += '</div>';
            html += '</div>';
            this._SfCustomContainer.querySelector('.calendar-right-data').innerHTML = html;
        };
        this.checkAndShowBulk = () => {
            const inputArr = this._SfMappingContainer.querySelectorAll('.input-checkbox');
            var checked = 0;
            console.log('checkAndShowBulk', inputArr.length);
            for (var i = 0; i < inputArr.length; i++) {
                console.log(inputArr[i].checked);
                if (inputArr[i].checked) {
                    checked++;
                }
            }
            console.log('checkAndShowBulk', checked);
            if (checked > 1) {
                return true;
            }
            return false;
        };
        this.calculateAndShowSummary = () => {
            console.log('showing summary', this.mappedValuesUsers);
            const inputArr = this._SfMappingContainer.querySelectorAll('.input-users');
            var mapped = 0;
            for (var i = 0; i < Object.keys(this.mappedValuesUsers).length; i++) {
                if (this.mappedValuesUsers[Object.keys(this.mappedValuesUsers)[i]].length > 0) {
                    mapped++;
                }
            }
            this._SfMappingContainer.querySelector('#row-unmapped-summary').innerHTML = 'Completed ' + mapped + ' / ' + inputArr.length;
            this._SfMappingContainer.querySelector('#row-unmapped-graph').querySelector('.div-graph-pending').style.width = ((inputArr.length - mapped) * 100 / (inputArr.length)) + '%';
            this._SfMappingContainer.querySelector('#row-unmapped-graph').querySelector('.div-graph-complete').style.width = ((mapped) * 100 / (inputArr.length)) + '%';
            console.log('showing summary', mapped, Object.keys(this.mappedValuesUsers).length);
            if (mapped == inputArr.length) {
                this._SfMappingContainer.querySelector('#button-back-add-mapping').style.visibility = 'visible';
            }
            else {
                this._SfMappingContainer.querySelector('#button-back-add-mapping').style.visibility = 'hidden';
            }
        };
        this.showAllEvents = () => {
            this._SfMappingContainer.querySelector('#row-unmapped-filter-all').checked = true;
            // ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-filter-mapped') as HTMLInputElement)!.checked = false;
            // ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-filter-unmapped') as HTMLInputElement)!.checked = false;
            //this.renderMapping(this.unmappedEvents)
            this.applyFilter();
            this.calculateAndShowSummary();
        };
        this.showMappedEvents = () => {
            // ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-filter-all') as HTMLInputElement)!.checked = false;
            this._SfMappingContainer.querySelector('#row-unmapped-filter-mapped').checked = true;
            // ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-filter-unmapped') as HTMLInputElement)!.checked = false;
            //this.renderMapping(this.unmappedEvents)
            this.applyFilter("mapped");
        };
        this.showUnmappedEvents = () => {
            // ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-filter-all') as HTMLInputElement)!.checked = false;
            // ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-filter-mapped') as HTMLInputElement)!.checked = false;
            this._SfMappingContainer.querySelector('#row-unmapped-filter-unmapped').checked = true;
            //this.renderMapping(this.unmappedEvents)
            this.applyFilter("unmapped");
        };
        this.updateInAllSelections = (param, value) => {
            console.log('updateinallselections', param, value);
            const inputArr = this._SfMappingContainer.querySelectorAll('.input-checkbox');
            const inputDatesArr = this._SfMappingContainer.querySelectorAll('.input-dates');
            const divDatesArr = this._SfMappingContainer.querySelectorAll('.div-dates');
            const inputTagsArr = this._SfMappingContainer.querySelectorAll('.input-tags');
            const divTagsArr = this._SfMappingContainer.querySelectorAll('.div-tags');
            const inputUsersArr = this._SfMappingContainer.querySelectorAll('.input-users');
            const divUsersArr = this._SfMappingContainer.querySelectorAll('.div-users');
            for (var i = 0; i < inputArr.length; i++) {
                console.log('updateinallselections', i);
                if (inputArr[i].checked) {
                    if (param == "duedate") {
                        inputDatesArr[i].value = value;
                        divDatesArr[i].innerHTML = value;
                        this.mappedValuesDueDates[i] = value;
                    }
                    if (param == "tags") {
                        inputTagsArr[i].preselectedValues = JSON.stringify(value);
                        inputTagsArr[i].populatePreselected();
                        divTagsArr[i].innerHTML = '';
                        var html = '';
                        for (var j = 0; j < value.length; j++) {
                            html += value[j];
                            if (j < (value.length - 1)) {
                                html += ",";
                            }
                        }
                        divTagsArr[i].innerHTML = '<sf-i-elastic-text text="' + html + '" minLength="20"></sf-i-elastic-text>';
                        this.mappedValuesTags[i] = value;
                    }
                    if (param == "users") {
                        // inputUsersArr[i].value = value;
                        // divUsersArr[i].innerHTML = value;
                        // this.mappedValuesUsers[i] = value;
                        inputUsersArr[i].preselectedValues = JSON.stringify(value);
                        inputUsersArr[i].populatePreselected();
                        divUsersArr[i].innerHTML = '';
                        var html = '';
                        for (var j = 0; j < value.length; j++) {
                            html += value[j];
                            if (j < (value.length - 1)) {
                                html += ",";
                            }
                        }
                        divUsersArr[i].innerHTML = '<sf-i-elastic-text text="' + html + '" minLength="20"></sf-i-elastic-text>';
                        this.mappedValuesUsers[i] = value;
                        this.updateMappingStatus(value, i);
                        this.calculateAndShowSummary();
                    }
                }
            }
        };
        this.updateMappingStatus = (value, clickIndex) => {
            console.log('clickindex', clickIndex);
            if (value.length > 0) {
                this._SfMappingContainer.querySelector('#row-unmapped-status-' + clickIndex).innerHTML = '<span class="material-icons color-done">check_circle</done>';
            }
            else {
                this._SfMappingContainer.querySelector('#row-unmapped-status-' + clickIndex).innerHTML = '<span class="material-icons color-pending">pending</done>';
            }
        };
        this.filterEventsInWindow = (tags, ctx) => {
            const arrData = [];
            console.log('window', this.eventsInWindow);
            for (var i = 0; i < tags.length; i++) {
                var countApproved = 0;
                var countInProgress = 0;
                var countNotStarted = 0;
                for (var j = 0; j < this.eventsInWindow.length; j++) {
                    const event = this.eventsInWindow[j];
                    for (var l = 0; l < event.tags.length; l++) {
                        if ((event.tags[l] + "").toLowerCase().indexOf((tags[i] + "").toLowerCase().split(';')[1]) >= 0) {
                            if (event.documents == null || event.documents[event.mmdd + '/' + new Date().getFullYear()] == null || JSON.parse(event.documents[event.mmdd + '/' + new Date().getFullYear()]) == null) {
                                countNotStarted++;
                            }
                            else if (event.approved != null && event.approved != null && !event.approved) {
                                countInProgress++;
                            }
                            else if (event.approved != null && event.approved != null && event.approved) {
                                countApproved++;
                            }
                        }
                    }
                }
                const arrItem = [countApproved, countInProgress, countNotStarted];
                arrData.push(arrItem);
            }
            console.log(arrData);
            const dataSetApproved = [];
            const dataSetInProgress = [];
            const dataSetNotStarted = [];
            for (i = 0; i < arrData.length; i++) {
                dataSetApproved.push(arrData[i][0]);
                dataSetInProgress.push(arrData[i][1]);
                dataSetNotStarted.push(arrData[i][2]);
            }
            const tagsCompressed = [];
            for (i = 0; i < tags.length; i++) {
                tagsCompressed.push(this.truncate(tags[i].split(';')[0], 20, false, false));
            }
            if (this.fill == "solid") {
                const data = {
                    labels: tagsCompressed,
                    datasets: [
                        {
                            label: 'Approved',
                            data: dataSetApproved,
                            backgroundColor: '#8cd039'
                        },
                        {
                            label: 'In Progress',
                            data: dataSetInProgress,
                            backgroundColor: '#FFBA49'
                        },
                        {
                            label: 'Not Started',
                            data: dataSetNotStarted,
                            backgroundColor: '#A4A9AD'
                        }
                    ]
                };
                this.renderChart(ctx, 'bar', data);
            }
            else {
                const data = {
                    labels: tagsCompressed,
                    datasets: [
                        {
                            label: 'Approved',
                            data: dataSetApproved,
                            backgroundColor: Util.createDiagonalPattern3('#8cd039')
                        },
                        {
                            label: 'In Progress',
                            data: dataSetInProgress,
                            backgroundColor: Util.createDiagonalPattern1('#FFBA49')
                        },
                        {
                            label: 'Not Started',
                            data: dataSetNotStarted,
                            backgroundColor: Util.createDiagonalPattern2('#A4A9AD')
                        }
                    ]
                };
                this.renderChart(ctx, 'bar', data);
            }
        };
        this.sleep = (ms) => {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        };
        this.hideTabContainers = async () => {
            this._SfOnboardingStatutesContainer.style.display = 'none';
            this._SfOnboardingCompliancesContainer.style.display = 'none';
            this._SfOnboardingCountriesContainer.style.display = 'none';
            this._SfOnboardingEntitiesContainer.style.display = 'none';
            this._SfOnboardingLocationsContainer.style.display = 'none';
            this._SfOnboardingFunctionsContainer.style.display = 'none';
            this._SfOnboardingTagsContainer.style.display = 'none';
            this._SfOnboardingReportersContainer.style.display = 'none';
            this._SfOnboardingApproversContainer.style.display = 'none';
            this._SfOnboardingDuedatesContainer.style.display = 'none';
            this._SfOnboardingAlertSchedulesContainer.style.display = 'none';
            this._SfOnboardingInternalControlsContainer.style.display = 'none';
            this._SfOnboardingCalendarContainer.style.display = 'none';
            this._SfOnboardingStatutesContainer.innerHTML = '';
            this._SfOnboardingCompliancesContainer.innerHTML = '';
            this._SfOnboardingCountriesContainer.innerHTML = '';
            this._SfOnboardingEntitiesContainer.innerHTML = '';
            this._SfOnboardingLocationsContainer.innerHTML = '';
            this._SfOnboardingFunctionsContainer.innerHTML = '';
            this._SfOnboardingTagsContainer.innerHTML = '';
            this._SfOnboardingReportersContainer.innerHTML = '';
            this._SfOnboardingApproversContainer.innerHTML = '';
            this._SfOnboardingDuedatesContainer.innerHTML = '';
            this._SfOnboardingAlertSchedulesContainer.innerHTML = '';
            this._SfOnboardingInternalControlsContainer.innerHTML = '';
            this._SfOnboardingCalendarContainer.innerHTML = '';
        };
        this.loadOnboardingStatutes = async () => {
            this.hideTabContainers();
            this._SfOnboardingStatutesContainer.style.display = 'flex';
            const mappedStatutes = await this.fetchMappedStatutes();
            console.log('mappedstatutes', mappedStatutes);
            this.renderOnboardingStatutes(mappedStatutes);
        };
        this.loadOnboardingCompliances = async () => {
            this.hideTabContainers();
            this._SfOnboardingCompliancesContainer.style.display = 'flex';
            const mappedStatutes = await this.fetchMappedStatutes();
            const mappedCompliances = await this.fetchMappedCompliances();
            this.renderOnboardingCompliances(mappedStatutes, mappedCompliances);
        };
        this.loadOnboardingCountries = async () => {
            this.hideTabContainers();
            this._SfOnboardingCountriesContainer.style.display = 'flex';
            const mappedCountries = await this.fetchMappedCountries();
            const mappedCompliances = await this.fetchMappedCompliances();
            // const mappedStatutes = await this.fetchMappedStatutes();
            console.log('mappedCompliances', mappedCompliances);
            console.log('mappedCountries', mappedCountries);
            this.renderOnboardingCountries(mappedCountries, mappedCompliances);
        };
        this.loadOnboardingEntities = async () => {
            this.hideTabContainers();
            this._SfOnboardingEntitiesContainer.style.display = 'flex';
            const mappedEntities = await this.fetchMappedEntities();
            const mappedSerializedCountries = await this.fetchMappedSerializedCountries();
            // const mappedStatutes = await this.fetchMappedStatutes();
            console.log('mappedSerializedCountries', mappedSerializedCountries);
            console.log('mappedEntities', mappedEntities);
            this.renderOnboardingEntities(mappedEntities, mappedSerializedCountries);
        };
        this.loadOnboardingLocations = async () => {
            this.hideTabContainers();
            this._SfOnboardingLocationsContainer.style.display = 'flex';
            const mappedSerializedEntities = await this.fetchMappedSerializedEntities();
            const mappedLocations = await this.fetchMappedLocations();
            console.log('mappedserializedentities', mappedSerializedEntities);
            console.log('mappedlocations', mappedLocations);
            this.renderOnboardingLocations(mappedLocations, mappedSerializedEntities);
        };
        this.loadOnboardingFunctions = async () => {
            this.hideTabContainers();
            this._SfOnboardingFunctionsContainer.style.display = 'flex';
            const mappedSerializedLocations = await this.fetchMappedSerializedLocations();
            const mappedFunctions = await this.fetchMappedFunctions();
            console.log('mappedserializedlocations', mappedSerializedLocations);
            console.log('mappedfunctions', mappedFunctions);
            this.renderOnboardingFunctions(mappedFunctions, mappedSerializedLocations);
        };
        this.loadOnboardingTags = async () => {
            this.hideTabContainers();
            this._SfOnboardingTagsContainer.style.display = 'flex';
            const mappedSerializedFunctions = await this.fetchMappedSerializedFunctions();
            const mappedTags = await this.fetchMappedTags();
            console.log('mappedserializedfunctions', mappedSerializedFunctions);
            console.log('mappedtags', mappedTags);
            this.renderOnboardingTags(mappedTags, mappedSerializedFunctions);
        };
        this.loadOnboardingReporters = async () => {
            this.hideTabContainers();
            this._SfOnboardingReportersContainer.style.display = 'flex';
            const mappedSerializedTags = await this.fetchMappedSerializedTags();
            const mappedReporters = await this.fetchMappedReporters();
            console.log('mappedserializedtags', mappedSerializedTags);
            console.log('mappedreporters', mappedReporters);
            this.renderOnboardingReporters(mappedReporters, mappedSerializedTags);
        };
        this.loadOnboardingApprovers = async () => {
            this.hideTabContainers();
            this._SfOnboardingApproversContainer.style.display = 'flex';
            const mappedSerializedReporters = await this.fetchMappedSerializedReporters();
            const mappedApprovers = await this.fetchMappedApprovers();
            console.log('mappedserializedreporters', mappedSerializedReporters);
            console.log('mappedapprovers', mappedApprovers);
            this.renderOnboardingApprovers(mappedApprovers, mappedSerializedReporters);
        };
        this.loadOnboardingDuedates = async () => {
            this.hideTabContainers();
            this._SfOnboardingDuedatesContainer.style.display = 'flex';
            const mappedSerializedApprovers = await this.fetchMappedSerializedApprovers();
            const mappedDuedates = await this.fetchMappedDuedates();
            console.log('mappedserializedapprovers', mappedSerializedApprovers);
            console.log('mappedduedates', mappedDuedates);
            this.renderOnboardingDuedates(mappedDuedates, mappedSerializedApprovers);
        };
        this.loadOnboardingAlertSchedules = async () => {
            this.hideTabContainers();
            this._SfOnboardingAlertSchedulesContainer.style.display = 'flex';
            const mappedSerializedDuedates = await this.fetchMappedSerializedDuedates();
            const mappedAlertSchedules = await this.fetchMappedAlertSchedules();
            console.log('mappedserializedduedates', mappedSerializedDuedates);
            console.log('mappedalertschedules', mappedAlertSchedules);
            this.renderOnboardingAlertSchedules(mappedAlertSchedules, mappedSerializedDuedates);
        };
        this.loadOnboardingInternalControls = async () => {
            this.hideTabContainers();
            this._SfOnboardingInternalControlsContainer.style.display = 'flex';
            const mappedSerializedAlertSchedules = await this.fetchMappedSerializedAlertSchedules();
            const mappedInternalControls = await this.fetchMappedInternalControls();
            console.log('mappedserializedalertschedules', mappedSerializedAlertSchedules);
            console.log('mappedinternalcontrols', mappedInternalControls);
            this.renderOnboardingInternalControls(mappedInternalControls, mappedSerializedAlertSchedules);
        };
        this.loadOnboardingCalendar = async () => {
            this.hideTabContainers();
            this._SfOnboardingCalendarContainer.style.display = 'flex';
            const calendarJobs = await this.fetchCalendarJobs();
            this.renderOnboardingCalendar(calendarJobs);
        };
        this.renderAdhoc = (events = null, triggers = null) => {
            if (events == null) {
                var html = '';
                html += '<div part="stream-event-list" class="p-10 w-100">';
                html += 'Loading ...';
                html += '</div>';
                this._SfAdhocContainer.innerHTML = html;
                this.fetchAdhoc();
                return;
            }
            if (events.length === 0) {
                var html = '';
                html += '<div part="stream-event-list" class="p-10 w-100">';
                html += 'No adhoc compliances found!';
                html += '</div>';
                this._SfAdhocContainer.innerHTML = html;
                return;
            }
            var html = '';
            html += '<div part="stream-event-list" class="p-10 w-100">';
            for (var i = 0; i < events.length; i++) {
                html += '<div part="stream-event-selected" class="p-10 mb-10">';
                html += '<div class="d-flex align-start">';
                html += '<div class="mb-10 flex-grow" part="adhoc-question">' + events[i].question.replace(/"/g, '') + '</div>';
                html += '<button id="button-bolt-' + i + '" part="button-icon" class="material-icons">electric_bolt</button>';
                html += '</div>';
                html += '<div class="d-flex align-start mb-10">';
                html += '<div part="input-labal">' + events[i].locationname + '</div>';
                html += '</div>';
                html += '<div class="d-flex align-center flex-wrap">';
                html += '<div class="mr-20" part="adhoc-triggers">';
                html += "Triggers: " + (triggers[events[i].id].length > 0 ? triggers[events[i].id].length : 0);
                html += '</div>';
                html += '<div class="mr-20" part="adhoc-last-triggers">';
                html += "Last Triggered: " + (triggers[events[i].id].length > 0 ? Util.timeSince(parseInt(triggers[events[i].id][triggers[events[i].id].length - 1].timestamp)) : '-');
                html += '</div>';
                if (triggers[events[i].id].length > 0) {
                    html += '<div id="caret-' + i + '" class="mr-20 material-icons cursor" part="adhoc-caret">';
                    html += "expand_more";
                    html += '</div>';
                }
                html += '</div>';
                console.log('triggers', events[i].id, triggers[events[i].id].length);
                if (triggers[events[i].id].length > 0) {
                    html += '<div id="adhoc-history-' + i + '" class="hide">';
                    html += '<table class="mt-20">';
                    html += '<thead>';
                    html += '<th part="td-head" class="td-head">';
                    html += 'Trigger Time';
                    html += '</th>';
                    html += '<th part="td-head" class="td-head">';
                    html += 'Due Date';
                    html += '</th>';
                    html += '<th part="td-head" class="td-head">';
                    html += 'Compliance Status';
                    html += '</th>';
                    html += '<th part="td-head" class="td-head">';
                    html += '';
                    html += '</th>';
                    html += '</thead>';
                    console.log('trigger', triggers[events[i].id]);
                    console.log('events', Object.keys(this.events));
                    for (var j = (triggers[events[i].id].length - 1); j >= 0; j--) {
                        if (this.events[triggers[events[i].id][j].newduedate] == null)
                            continue;
                        var classBg = "";
                        if (j % 2 === 0) {
                            classBg = 'td-light';
                        }
                        else {
                            classBg = 'td-dark';
                        }
                        html += '<tr>';
                        html += '<td part="td-body" class="td-body ' + classBg + '">';
                        html += Util.timeSince(parseInt(triggers[events[i].id][j].timestamp));
                        html += '</td>';
                        html += '<td part="td-body" class="td-body ' + classBg + '">';
                        html += Util.timeSince(new Date(triggers[events[i].id][j].newduedatestr).getTime()) + ' on ' + triggers[events[i].id][j].newduedate.split("/")[1] + "/" + triggers[events[i].id][j].newduedate.split("/")[0];
                        html += '</td>';
                        console.log('trigger2', triggers[events[i].id][j].newduedate);
                        for (var k = 0; k < this.events[triggers[events[i].id][j].newduedate].length; k++) {
                            const dEvent = this.events[triggers[events[i].id][j].newduedate][k];
                            if (dEvent.id == events[i].id) {
                                var partStatus = "";
                                var lateStatus = "";
                                if (dEvent.approved != null && (dEvent.approved) != null && (dEvent.approved)) {
                                    partStatus = "Approved";
                                    if (this.getLateExecuted(triggers[events[i].id][j].newduedate, dEvent)) {
                                        lateStatus = "Late-executed";
                                    }
                                    else {
                                        if (this.getLateApproved(triggers[events[i].id][j].newduedate, dEvent)) {
                                            lateStatus = "Late-approved";
                                        }
                                    }
                                }
                                else if (dEvent.documents != null && dEvent.documents != null && (dEvent.documents).length > 0) {
                                    partStatus = "In-progress";
                                    if (this.getPastDueDate(triggers[events[i].id][j].newduedate)) {
                                        lateStatus = "Past-due-date";
                                    }
                                }
                                else {
                                    partStatus = "Not-started";
                                    if (this.getPastDueDate(triggers[events[i].id][j].newduedate)) {
                                        lateStatus = "Past-due-date";
                                    }
                                }
                                html += '<td part="td-body" class="td-body ' + classBg + '">';
                                html += partStatus + ' ' + lateStatus;
                                html += '</td>';
                                html += '<td part="td-body" class="td-body ' + classBg + ' d-flex align-center">';
                                html += '<button id="open-' + i + '-' + j + '-' + k + '" part="button-icon" class="button-open mr-20 material-icons">open_in_new</button>';
                                html += '<button id="delete-' + i + '-' + j + '-' + k + '" part="button-icon" class="button-delete material-icons">delete</button>';
                                html += '<button id="confirm-' + i + '-' + j + '-' + k + '" part="button-icon" class="button-confirm hide">Confirm Delete</button>';
                                html += '</td>';
                            }
                        }
                        html += '</tr>';
                    }
                    html += '</table>';
                    html += '</div>';
                }
                html += '<div id="occurrence-' + i + '" class="hide">';
                html += '<div class="d-flex align-end mt-20">';
                html += '<div class="mr-20">';
                html += '<label part="input-label" class="mb-5">Date of Occurrence</label><br />';
                html += '<input id="dateofoccurrence_' + events[i].id + '" part="input" type="date" />';
                html += '</div>';
                html += '</div>';
                html += '<button id="trigger_' + events[i].id + '_' + events[i].locationid + '" part="button" class="button-trigger mt-10 cursor">Trigger</button>';
                html += '</div>';
                html += '</div>';
                // html += '</div>';
            }
            html += '</div>';
            this._SfAdhocContainer.innerHTML = html;
            for (var i = 0; i < events.length; i++) {
                const button = this._SfAdhocContainer.querySelector('#button-bolt-' + i);
                button.addEventListener('click', (ev) => {
                    const button = ev.target;
                    const index = ev.target.id.split('-')[2];
                    console.log('clicked', ev.target.id, index);
                    const occurrence = this._SfAdhocContainer.querySelector('#occurrence-' + index);
                    console.log(occurrence, occurrence.style.display);
                    if (occurrence.style.display == "none" || occurrence.style.display == "") {
                        occurrence.style.display = "block";
                        button.style.display = 'none';
                    }
                    else {
                        occurrence.style.display = "none";
                        button.style.display = 'flex';
                    }
                });
                if (triggers[events[i].id].length > 0) {
                    const caret = this._SfAdhocContainer.querySelector('#caret-' + i);
                    caret.addEventListener('click', (ev) => {
                        const button = ev.target;
                        const index = ev.target.id.split('-')[1];
                        console.log('clicked', ev.target.id, index);
                        const history = this._SfAdhocContainer.querySelector('#adhoc-history-' + index);
                        if (history.style.display == "none" || history.style.display == "") {
                            history.style.display = "block";
                            button.innerHTML = 'expand_less';
                        }
                        else {
                            history.style.display = "none";
                            button.innerHTML = 'expand_more';
                            //button.style.display = 'flex';
                        }
                    });
                }
            }
            const opens = this._SfAdhocContainer.querySelectorAll('.button-open');
            for (var i = 0; i < opens.length; i++) {
                opens[i].addEventListener('click', (ev) => {
                    //const button = (ev.target as HTMLDivElement);
                    const indexI = ev.target.id.split('-')[1];
                    const indexJ = ev.target.id.split('-')[2];
                    const indexK = ev.target.id.split('-')[3];
                    const dEvent = this.events[triggers[events[indexI].id][indexJ].newduedate][indexK];
                    this._SfDetailContainer.style.display = 'block';
                    this.renderEventDetail(dEvent, triggers[events[indexI].id][indexJ].newduedate + "/" + ((new Date()).getFullYear() + ""));
                });
            }
            const triggerBs = this._SfAdhocContainer.querySelectorAll('.button-trigger');
            for (var i = 0; i < triggerBs.length; i++) {
                triggerBs[i].addEventListener('click', (ev) => {
                    //const button = (ev.target as HTMLDivElement);
                    const eventid = ev.target.id.split('_')[1];
                    const locationid = ev.target.id.split('_')[2];
                    if (this._SfAdhocContainer.querySelector('#dateofoccurrence_' + eventid).value.trim().length > 0) {
                        const dateofoccurrence = new Date(this._SfAdhocContainer.querySelector('#dateofoccurrence_' + eventid).value).getTime();
                        console.log('eventid', eventid, dateofoccurrence);
                        this.uploadTriggerEvent(locationid, eventid, dateofoccurrence + "");
                    }
                });
            }
            const deleteB = this._SfAdhocContainer.querySelectorAll('.button-delete');
            for (var i = 0; i < deleteB.length; i++) {
                deleteB[i].addEventListener('click', (ev) => {
                    const button = ev.target;
                    const indexI = ev.target.id.split('-')[1];
                    const indexJ = ev.target.id.split('-')[2];
                    const indexK = ev.target.id.split('-')[3];
                    const confirm = this._SfAdhocContainer.querySelector('#confirm-' + indexI + '-' + indexJ + '-' + indexK);
                    confirm.style.display = 'block';
                    button.style.display = 'none';
                });
            }
            const confirmB = this._SfAdhocContainer.querySelectorAll('.button-confirm');
            for (var i = 0; i < confirmB.length; i++) {
                confirmB[i].addEventListener('click', (ev) => {
                    const indexI = ev.target.id.split('-')[1];
                    const indexJ = ev.target.id.split('-')[2];
                    this.uploadUnTriggerEvent(events[indexI].id, triggers[events[indexI].id][indexJ].newduedate);
                });
            }
            // const open = ((this._SfAdhocContainer as HTMLDivElement).querySelector('#open-' + i) as HTMLDivElement);
            //   open.addEventListener('click', (ev: any) => {
            //     //const button = (ev.target as HTMLDivElement)
            //     const index = ev.target.id.split('-')[1];
            //     console.log('clicked', ev.target.id, index);
            //     this.renderEventDetail(this.events[mmdd][j], triggers![events[i].id][j].newduedate + "/" + ((new Date()).getFullYear() + ""));
            //   });
        };
        this.renderCustom = () => {
            var _a, _b;
            var html = '';
            html += '<div class="d-flex flex-grow mw-140">';
            html += '<div class="d-flex calendar-left-col flex-col align-end">';
            html += '<div class="title-item-date">';
            html += '<label part="input-label">Start Date</label><br />';
            html += '<input id="stream-start-date" part="input" type="date" />';
            html += '</div>';
            html += '<div class="title-item-date">';
            html += '<label part="input-label">End Date</label><br />';
            html += '<input id="stream-end-date" part="input" type="date" />';
            html += '</div>';
            html += '</div>';
            html += '<div class="calendar-right-data">';
            html += '</div>';
            html += '</div>';
            this._SfCustomContainer.innerHTML = html;
            this.initCustomRightCol();
            (_a = this._SfCustomContainer.querySelector('#stream-start-date')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', (ev) => {
                console.log('start-date', ev);
                this.processDateSelection();
            });
            (_b = this._SfCustomContainer.querySelector('#stream-end-date')) === null || _b === void 0 ? void 0 : _b.addEventListener('change', (ev) => {
                console.log('end-date', ev);
                this.processDateSelection();
            });
            // for(var i = 0; i < 3; i++) {
            //   (this._SfCustomContainer as HTMLDivElement).querySelector('#stream-month-' + i)?.addEventListener('click', (ev: any)=> {
            //     const target = parseInt((ev.target as HTMLDivElement).id.split('-')[2]);
            //     console.log('clicked ', target);
            //     this.renderPast(target);
            //   })
            // }
        };
        this.renderPast = (index = 0) => {
            var _a;
            var html = '';
            html += '<div class="d-flex flex-grow mw-140">';
            html += '<div class="calendar-left-col">';
            var part = "";
            if (index === 0) {
                part = "stream-month-selected";
            }
            else {
                part = "stream-month-not-selected";
            }
            html += '<div part="' + part + '" id="stream-month-0" part="month-title" class="title-item ' + part + '">Week</div>';
            part = "";
            if (index === 1) {
                part = "stream-month-selected";
            }
            else {
                part = "stream-month-not-selected";
            }
            html += '<div part="' + part + '" id="stream-month-1" part="month-title" class="title-item ' + part + '">Month</div>';
            html += '</div>';
            html += '<div class="calendar-right-data">';
            // var startDate = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + this.calendarStartYYYY);
            var startDate = new Date();
            html += this.renderPastEvents(index, startDate);
            startDate.setDate(startDate.getDate() + 1);
            html += '</div>';
            html += '</div>';
            this._SfPastContainer.innerHTML = html;
            const radioCompleteness = this._SfPastContainer.querySelector('#radio-completeness');
            radioCompleteness === null || radioCompleteness === void 0 ? void 0 : radioCompleteness.addEventListener('click', () => {
                this.renderCompletenessGraph(this._SfPastContainer);
            });
            const radioTimeliness = this._SfPastContainer.querySelector('#radio-timeliness');
            radioTimeliness === null || radioTimeliness === void 0 ? void 0 : radioTimeliness.addEventListener('click', () => {
                this.renderTimelinessGraph(this._SfPastContainer);
            });
            const buttonStatusMore = this._SfPastContainer.querySelector('#button-status-more');
            buttonStatusMore === null || buttonStatusMore === void 0 ? void 0 : buttonStatusMore.addEventListener('click', () => {
                const divStatusList = this._SfPastContainer.querySelectorAll('.late-statuses');
                for (var i = 0; i < divStatusList.length; i++) {
                    divStatusList[i].style.display = 'flex';
                }
                buttonStatusMore.style.display = 'none';
            });
            for (var i = 0; i < 3; i++) {
                (_a = this._SfPastContainer.querySelector('#stream-month-' + i)) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (ev) => {
                    const target = parseInt(ev.target.id.split('-')[2]);
                    console.log('clicked ', target);
                    this.renderPast(target);
                });
            }
            const buttonArr = this._SfPastContainer.querySelectorAll('.button-expand');
            for (i = 0; i < buttonArr.length; i++) {
                buttonArr[i].addEventListener('click', (ev) => {
                    const id = ev.target.id;
                    const idArr = id.split("-");
                    const mmdd = idArr[3] + "/" + idArr[4];
                    const j = idArr[5];
                    this._SfDetailContainer.style.display = 'block';
                    this.renderEventDetail(this.events[mmdd][j], mmdd + "/" + ((new Date()).getFullYear() + ""));
                });
            }
            this.renderCompletenessGraph(this._SfPastContainer);
        };
        this.renderUpcoming = (index = 0) => {
            var _a;
            var html = '';
            html += '<div class="d-flex flex-grow mw-140">';
            html += '<div class="calendar-left-col">';
            var part = "";
            if (index === 0) {
                part = "stream-month-selected";
            }
            else {
                part = "stream-month-not-selected";
            }
            html += '<div part="' + part + '" id="stream-month-0" part="month-title" class="title-item ' + part + '">7 Days</div>';
            part = "";
            if (index === 1) {
                part = "stream-month-selected";
            }
            else {
                part = "stream-month-not-selected";
            }
            html += '<div part="' + part + '" id="stream-month-1" part="month-title" class="title-item ' + part + '">30 Days</div>';
            part = "";
            if (index === 2) {
                part = "stream-month-selected";
            }
            else {
                part = "stream-month-not-selected";
            }
            html += '<div part="' + part + '" id="stream-month-2" part="month-title" class="title-item ' + part + '">90 Days</div>';
            html += '</div>';
            html += '<div class="calendar-right-data">';
            // var startDate = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + this.calendarStartYYYY);
            var startDate = new Date();
            if (index === 0) {
                html += this.renderUpcomingEvents(index, startDate, 7);
                startDate.setDate(startDate.getDate() + 1);
            }
            if (index === 1) {
                html += this.renderUpcomingEvents(index, startDate, 30);
                startDate.setDate(startDate.getDate() + 1);
            }
            if (index === 2) {
                html += this.renderUpcomingEvents(index, startDate, 90);
                startDate.setDate(startDate.getDate() + 1);
            }
            html += '</div>';
            html += '</div>';
            this._SfUpcomingContainer.innerHTML = html;
            const radioCompleteness = this._SfUpcomingContainer.querySelector('#radio-completeness');
            radioCompleteness === null || radioCompleteness === void 0 ? void 0 : radioCompleteness.addEventListener('click', () => {
                this.renderCompletenessGraph(this._SfUpcomingContainer);
            });
            const radioTimeliness = this._SfUpcomingContainer.querySelector('#radio-timeliness');
            radioTimeliness === null || radioTimeliness === void 0 ? void 0 : radioTimeliness.addEventListener('click', () => {
                this.renderTimelinessGraph(this._SfUpcomingContainer);
            });
            const buttonStatusMore = this._SfUpcomingContainer.querySelector('#button-status-more');
            buttonStatusMore === null || buttonStatusMore === void 0 ? void 0 : buttonStatusMore.addEventListener('click', () => {
                const divStatusList = this._SfUpcomingContainer.querySelectorAll('.late-statuses');
                for (var i = 0; i < divStatusList.length; i++) {
                    divStatusList[i].style.display = 'flex';
                }
                buttonStatusMore.style.display = 'none';
            });
            for (var i = 0; i < 3; i++) {
                (_a = this._SfUpcomingContainer.querySelector('#stream-month-' + i)) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (ev) => {
                    const target = parseInt(ev.target.id.split('-')[2]);
                    console.log('clicked ', target);
                    this.renderUpcoming(target);
                });
            }
            const buttonArr = this._SfUpcomingContainer.querySelectorAll('.button-expand');
            for (i = 0; i < buttonArr.length; i++) {
                buttonArr[i].addEventListener('click', (ev) => {
                    const id = ev.target.id;
                    const idArr = id.split("-");
                    const mmdd = idArr[3] + "/" + idArr[4];
                    const j = idArr[5];
                    this._SfDetailContainer.style.display = 'block';
                    this.renderEventDetail(this.events[mmdd][j], mmdd + "/" + ((new Date()).getFullYear() + ""));
                });
            }
            this.renderCompletenessGraph(this._SfUpcomingContainer);
        };
        this.renderThis = (index = 0) => {
            var _a;
            var html = '';
            html += '<div class="d-flex flex-grow mw-140">';
            html += '<div class="calendar-left-col">';
            var part = "";
            if (index === 0) {
                part = "stream-month-selected";
            }
            else {
                part = "stream-month-not-selected";
            }
            html += '<div part="' + part + '" id="stream-month-0" part="month-title" class="title-item ' + part + '">Week</div>';
            part = "";
            if (index === 1) {
                part = "stream-month-selected";
            }
            else {
                part = "stream-month-not-selected";
            }
            html += '<div part="' + part + '" id="stream-month-1" part="month-title" class="title-item ' + part + '">Month</div>';
            html += '</div>';
            html += '<div class="calendar-right-data">';
            // var startDate = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + this.calendarStartYYYY);
            var startDate = new Date();
            html += this.renderThisEvents(index, startDate);
            startDate.setDate(startDate.getDate() + 1);
            html += '</div>';
            html += '</div>';
            this._SfThisContainer.innerHTML = html;
            const radioCompleteness = this._SfThisContainer.querySelector('#radio-completeness');
            radioCompleteness === null || radioCompleteness === void 0 ? void 0 : radioCompleteness.addEventListener('click', () => {
                this.renderCompletenessGraph(this._SfThisContainer);
            });
            const radioTimeliness = this._SfThisContainer.querySelector('#radio-timeliness');
            radioTimeliness === null || radioTimeliness === void 0 ? void 0 : radioTimeliness.addEventListener('click', () => {
                this.renderTimelinessGraph(this._SfThisContainer);
            });
            const buttonStatusMore = this._SfThisContainer.querySelector('#button-status-more');
            buttonStatusMore === null || buttonStatusMore === void 0 ? void 0 : buttonStatusMore.addEventListener('click', () => {
                const divStatusList = this._SfThisContainer.querySelectorAll('.late-statuses');
                for (var i = 0; i < divStatusList.length; i++) {
                    divStatusList[i].style.display = 'flex';
                }
                buttonStatusMore.style.display = 'none';
            });
            for (var i = 0; i < 3; i++) {
                (_a = this._SfThisContainer.querySelector('#stream-month-' + i)) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (ev) => {
                    const target = parseInt(ev.target.id.split('-')[2]);
                    console.log('clicked ', target);
                    this.renderThis(target);
                });
            }
            const buttonArr = this._SfThisContainer.querySelectorAll('.button-expand');
            for (i = 0; i < buttonArr.length; i++) {
                buttonArr[i].addEventListener('click', (ev) => {
                    const id = ev.target.id;
                    const idArr = id.split("-");
                    const mmdd = idArr[3] + "/" + idArr[4];
                    const j = idArr[5];
                    this._SfDetailContainer.style.display = 'block';
                    this.renderEventDetail(this.events[mmdd][j], mmdd + "/" + ((new Date()).getFullYear() + ""));
                });
            }
            this.renderCompletenessGraph(this._SfThisContainer);
        };
        this.renderStream = (index = 0) => {
            var _a;
            console.log('renderstream', index);
            var startDate = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + this.calendarStartYYYY);
            var html = '';
            html += '<div class="d-flex flex-grow mw-140">';
            html += '<div class="calendar-left-col">';
            var startDate = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + this.calendarStartYYYY);
            for (var i = 0; i < 12; i++) {
                var part = "";
                if (i === index) {
                    part = "stream-month-selected";
                }
                else {
                    part = "stream-month-not-selected";
                }
                html += '<div part="' + part + '" id="stream-month-' + i + '" part="month-title" class="title-item ' + part + '">' + this.monthNames[startDate.getMonth()] + '&nbsp;&nbsp;' + startDate.getFullYear() + '</div>';
                startDate.setMonth(startDate.getMonth() + 1);
            }
            html += '</div>';
            html += '<div class="calendar-right-data">';
            startDate = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + this.calendarStartYYYY);
            for (i = 0; i < 12; i++) {
                if (i === index) {
                    console.log(i, index);
                    html += this.renderStreamEvents(i, startDate.getMonth(), startDate.getFullYear());
                }
                startDate.setMonth(startDate.getMonth() + 1);
            }
            html += '</div>';
            html += '</div>';
            this._SfStreamContainer.innerHTML = html;
            const radioCompleteness = this._SfStreamContainer.querySelector('#radio-completeness');
            radioCompleteness === null || radioCompleteness === void 0 ? void 0 : radioCompleteness.addEventListener('click', () => {
                this.renderCompletenessGraph(this._SfStreamContainer);
            });
            const radioTimeliness = this._SfStreamContainer.querySelector('#radio-timeliness');
            radioTimeliness === null || radioTimeliness === void 0 ? void 0 : radioTimeliness.addEventListener('click', () => {
                this.renderTimelinessGraph(this._SfStreamContainer);
            });
            const buttonStatusMore = this._SfStreamContainer.querySelector('#button-status-more');
            buttonStatusMore === null || buttonStatusMore === void 0 ? void 0 : buttonStatusMore.addEventListener('click', () => {
                const divStatusList = this._SfStreamContainer.querySelectorAll('.late-statuses');
                for (var i = 0; i < divStatusList.length; i++) {
                    divStatusList[i].style.display = 'flex';
                }
                buttonStatusMore.style.display = 'none';
            });
            for (var i = 0; i < 12; i++) {
                (_a = this._SfStreamContainer.querySelector('#stream-month-' + i)) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (ev) => {
                    const target = parseInt(ev.target.id.split('-')[2]);
                    this.renderStream(target);
                });
            }
            const buttonArr = this._SfStreamContainer.querySelectorAll('.button-expand');
            for (i = 0; i < buttonArr.length; i++) {
                buttonArr[i].addEventListener('click', (ev) => {
                    const id = ev.target.id;
                    const idArr = id.split("-");
                    const mmdd = idArr[3] + "/" + idArr[4];
                    const j = idArr[5];
                    this._SfDetailContainer.style.display = 'block';
                    this.renderEventDetail(this.events[mmdd][j], mmdd + "/" + ((new Date()).getFullYear() + ""));
                });
            }
            this.renderCompletenessGraph(this._SfStreamContainer);
        };
        this.renderCompletenessGraph = (divContainer) => {
            var dataApproved = divContainer.querySelector('#graph-approved').innerHTML;
            var dataNotStarted = divContainer.querySelector('#graph-not-started').innerHTML;
            var dataInProgress = divContainer.querySelector('#graph-in-progress').innerHTML;
            const ctx = divContainer.querySelector('#myChart');
            divContainer.querySelector('#myChart').style.maxWidth = '400px';
            divContainer.querySelector('#myChart').style.maxHeight = '400px';
            if (this.fill == "pattern") {
                const data = {
                    labels: ['Approved', 'Not Started', 'In Progress'],
                    datasets: [{
                            label: 'Compliances',
                            data: [dataApproved, dataNotStarted, dataInProgress],
                            borderWidth: 1,
                            backgroundColor: [
                                Util.createDiagonalPattern3(this.COLOR_APPROVED),
                                Util.createDiagonalPattern2(this.COLOR_NOT_STARTED),
                                Util.createDiagonalPattern1(this.COLOR_IN_PROGRESS)
                            ]
                        }]
                };
                this.renderChartSettings(divContainer, -1, ctx);
                this.renderChart(ctx, 'doughnut', data);
            }
            if (this.fill == "solid") {
                const data = {
                    labels: ['Approved', 'Not Started', 'In Progress'],
                    datasets: [{
                            label: 'Compliances',
                            data: [dataApproved, dataNotStarted, dataInProgress],
                            borderWidth: 1,
                            backgroundColor: [
                                this.COLOR_APPROVED,
                                this.COLOR_NOT_STARTED,
                                this.COLOR_IN_PROGRESS
                            ]
                        }]
                };
                this.renderChartSettings(divContainer, -1, ctx);
                this.renderChart(ctx, 'doughnut', data);
            }
        };
        this.renderTimelinessGraph = (divContainer) => {
            var dataTotal = divContainer.querySelector('#graph-total').innerHTML;
            var dataPastDueDate = divContainer.querySelector('#graph-past-due-date').innerHTML;
            var dataLateApproved = divContainer.querySelector('#graph-late-approved').innerHTML;
            var dataLateExecuted = divContainer.querySelector('#graph-late-executed').innerHTML;
            const ctx = divContainer.querySelector('#myChart');
            divContainer.querySelector('#myChart').style.maxWidth = '400px';
            divContainer.querySelector('#myChart').style.maxHeight = '400px';
            if (this.fill == "pattern") {
                const data = {
                    labels: ['In Time', 'Past Due Date', 'Late Approved', 'Late Executed'],
                    datasets: [{
                            label: 'Compliances',
                            data: [(parseInt(dataTotal) - (parseInt(dataPastDueDate) + parseInt(dataLateApproved) + parseInt(dataLateExecuted))) + "", dataPastDueDate, dataLateApproved, dataLateExecuted],
                            borderWidth: 1,
                            backgroundColor: [
                                Util.createDiagonalPattern3(this.COLOR_NOT_STARTED),
                                Util.createDiagonalPattern3(this.COLOR_PAST_DUE_DATE),
                                Util.createDiagonalPattern2(this.COLOR_LATE_APPROVED),
                                Util.createDiagonalPattern1(this.COLOR_LATE_EXECUTED)
                            ]
                        }]
                };
                this.renderChartSettings(divContainer, -1, ctx);
                this.renderChart(ctx, 'doughnut', data);
            }
            if (this.fill == "solid") {
                const data = {
                    labels: ['In Time', 'Past Due Date', 'Late Approved', 'Late Executed'],
                    datasets: [{
                            label: 'Compliances',
                            data: [(parseInt(dataTotal) - (parseInt(dataPastDueDate) + parseInt(dataLateApproved) + parseInt(dataLateExecuted))) + "", dataPastDueDate, dataLateApproved, dataLateExecuted],
                            borderWidth: 1,
                            backgroundColor: [
                                this.COLOR_NOT_STARTED,
                                this.COLOR_PAST_DUE_DATE,
                                this.COLOR_LATE_APPROVED,
                                this.COLOR_LATE_EXECUTED
                            ]
                        }]
                };
                this.renderChartSettings(divContainer, -1, ctx);
                this.renderChart(ctx, 'doughnut', data);
            }
        };
        this.renderEventDetail = (event, mmddyyyy) => {
            var _a, _b, _c, _d, _e, _f, _g;
            let comments, docs, approved, dateOfCompletion;
            comments = event['comments'] == null ? [] : event['comments'] == null ? [] : (event['comments']);
            docs = event['documents'] == null ? [] : event['documents'] == null ? [] : (event['documents']);
            approved = event['approved'] == null ? false : event['approved'] == null ? false : event['approved'];
            dateOfCompletion = event['dateofcompletion'] == null ? '' : event['dateofcompletion'] == null ? '' : event['dateofcompletion'];
            console.log('event detail', event);
            console.log('event dateofcompletion', dateOfCompletion);
            const basicFields = ['id', 'shortid'];
            const statuteFields = ['jurisdiction', 'country', 'state', 'category', 'subcategory', 'statute'];
            const complianceFields = ['specificity', 'reference', 'obligation', 'penalty', 'authority', 'frequency', 'obligationtype', 'duedate', 'applicability', 'form'];
            const grcFields = ['internalcontrols', 'firstlineofdefence', 'risk', 'riskarea'];
            var html = `
    
      <div class="d-flex justify-between m-20">
        <button part="button-icon" class="material-icons invisible">close</button>
        <h3 part="results-title" class="m-0">Compliance Details</h3>
        <button id="button-detail-close" part="button-icon" class="material-icons">close</button>
      </div>
    
    `;
            html += '<div class="accordian-container m-20 pb-20" part="accordian-container">';
            html += '<div class="accordian-section section-basic pl-20 pr-20" part="accordian-section">';
            html += '<div class="d-flex justify-between accordian-head head-basic cursor" part="accordian-head">';
            html += '<h3>Basic Information</h3>';
            html += '<h3 class="head-indicator-basic">-</h3>';
            html += '</div>';
            html += '<div class="d-flex flex-wrap accordian-body body-basic" part="accordian-body">';
            for (var i = 0; i < basicFields.length; i++) {
                if (!this.getEventPreviewFields().includes(basicFields[i])) {
                    if (!this.getEventHideFields().includes(basicFields[i])) {
                        html += '<div class="m-20">';
                        html += '<div part="detail-head"><strong>' + basicFields[i] + '</strong></div>';
                        if ((event[basicFields[i]] + "").indexOf("[") >= 0) {
                            html += this.getEventTexts(basicFields[i], JSON.parse(event[basicFields[i]]), event);
                        }
                        else {
                            html += '<sf-i-elastic-text text="' + (event[basicFields[i]] + "").replace(/"/g, "") + '" minLength="80"></sf-i-elastic-text>';
                        }
                        html += '</div>';
                    }
                }
            }
            if (this.mode == "consumer") {
                if (approved) {
                    html += '<div class="m-20">';
                    html += '<div part="detail-head"><strong>Approved</strong></div>';
                    html += '<span class="material-icons color-done">check_circle</span>';
                    html += '</div>';
                }
            }
            if (docs != null) {
                html += '<div class="m-20">';
                html += '<div part="detail-head"><strong>Documents</strong></div>';
                html += '<span class="material-icons muted">description</span>';
                html += docs.length;
                html += '</div>';
            }
            if (comments != null) {
                html += '<div class="m-20">';
                html += '<div part="detail-head"><strong>Comments</strong></div>';
                html += '<span class="material-icons muted">forum</span>';
                html += comments.length;
                html += '</div>';
            }
            html += '</div>';
            html += '</div>';
            html += '<div class="accordian-section section-statute pl-20 pr-20" part="accordian-section">';
            html += '<div class="d-flex justify-between accordian-head head-statute cursor" part="accordian-head">';
            html += '<h3>Statute Information</h3>';
            html += '<h3 class="head-indicator-statute">-</h3>';
            html += '</div>';
            html += '<div class="d-flex flex-wrap accordian-body body-statute" part="accordian-body">';
            for (var i = 0; i < statuteFields.length; i++) {
                if (!this.getEventPreviewFields().includes(statuteFields[i])) {
                    if (!this.getEventHideFields().includes(statuteFields[i])) {
                        html += '<div class="m-20">';
                        html += '<div part="detail-head"><strong>' + statuteFields[i] + '</strong></div>';
                        if ((event[statuteFields[i]] + "").indexOf("[") >= 0) {
                            html += this.getEventTexts(statuteFields[i], JSON.parse(event[statuteFields[i]]), event);
                        }
                        else {
                            html += '<sf-i-elastic-text text="' + (event[statuteFields[i]] + "").replace(/"/g, "") + '" minLength="80"></sf-i-elastic-text>';
                        }
                        html += '</div>';
                    }
                }
            }
            html += '</div>';
            html += '</div>';
            html += '<div class="accordian-section section-compliance pl-20 pr-20" part="accordian-section">';
            html += '<div class="d-flex justify-between accordian-head head-compliance" part="accordian-head">';
            html += '<h3>Compliance Information</h3>';
            html += '<h3 class="head-indicator-compliance">-</h3>';
            html += '</div>';
            html += '<div class="d-flex flex-wrap accordian-body body-compliance" part="accordian-body">';
            for (var i = 0; i < complianceFields.length; i++) {
                if (!this.getEventPreviewFields().includes(complianceFields[i])) {
                    if (!this.getEventHideFields().includes(complianceFields[i])) {
                        html += '<div class="m-20">';
                        html += '<div part="detail-head"><strong>' + complianceFields[i] + '</strong></div>';
                        if ((event[complianceFields[i]] + "").indexOf("[") >= 0) {
                            html += this.getEventTexts(complianceFields[i], JSON.parse(event[complianceFields[i]]), event);
                        }
                        else {
                            html += '<sf-i-elastic-text text="' + (event[complianceFields[i]] + "").replace(/"/g, "") + '" minLength="80"></sf-i-elastic-text>';
                        }
                        html += '</div>';
                    }
                }
            }
            html += '</div>';
            html += '</div>';
            html += '<div class="accordian-section section-grc pl-20 pr-20" part="accordian-section">';
            html += '<div class="d-flex justify-between accordian-head head-grc" part="accordian-head">';
            html += '<h3>GRC Information</h3>';
            html += '<h3 class="head-indicator-grc">-</h3>';
            html += '</div>';
            html += '<div class="d-flex flex-wrap accordian-body body-grc" part="accordian-body">';
            for (var i = 0; i < grcFields.length; i++) {
                if (!this.getEventPreviewFields().includes(grcFields[i])) {
                    if (!this.getEventHideFields().includes(grcFields[i])) {
                        html += '<div class="m-20">';
                        html += '<div part="detail-head"><strong>' + grcFields[i] + '</strong></div>';
                        if ((event[grcFields[i]] + "").indexOf("[") >= 0) {
                            html += this.getEventTexts(grcFields[i], JSON.parse(event[grcFields[i]]), event);
                        }
                        else {
                            html += '<sf-i-elastic-text text="' + (event[grcFields[i]] + "").replace(/"/g, "") + '" minLength="80"></sf-i-elastic-text>';
                        }
                        html += '</div>';
                    }
                }
            }
            html += '</div>';
            html += '</div>';
            html += '</div>';
            // html += '<div class="d-flex m-20 flex-wrap">';
            // for(var k = 0; k < Object.keys(event).length; k++) {
            //   if(!this.getEventPreviewFields().includes(Object.keys(event)[k])) {
            //     if(!this.getEventHideFields().includes(Object.keys(event)[k])) {
            //       html += '<div class="m-20">';
            //       html += '<div part="detail-head"><strong>'+Object.keys(event)[k]+'</strong></div>'
            //       console.log(Object.keys(event)[k], event[Object.keys(event)[k]]);
            //       if((event[Object.keys(event)[k]] + "").indexOf("[") >= 0) {
            //         html += this.getEventTexts(Object.keys(event)[k], JSON.parse(event[Object.keys(event)[k]]), event);
            //       } else {
            //         html += '<sf-i-elastic-text text="'+(event[Object.keys(event)[k]] + "").replace(/"/g, "")+'" minLength="20"></sf-i-elastic-text>';
            //       }
            //       html += '</div>';
            //     }
            //   }
            // }
            if (this.mode == "consumer") {
                console.log('docs received', event['documents']);
                console.log('docs received', comments);
                console.log('docs received', approved);
                //html += '</div>';      
                if (this.myRole == this.TAB_APPROVER) {
                    if (docs.length > 0) {
                        html += '<div class="d-flex justify-between m-20">';
                        html += '<h3 part="results-title" class="m-0"><br />Approve Compliance</h3>';
                        html += '</div>';
                        html += '<div class="m-20" part="report-container">';
                        html += '<div class="d-flex justify-between align-center">';
                        html += '<button class="invisible" part="button">Save</button>';
                        html += '<button id="button-uploader-submit-approve" class="button-submit" part="button">Save</button>';
                        html += '</div>';
                        html += '<div class="m-20">';
                        html += '<label part="input-label">Supporting Documents</label>';
                        html += '<slot name="uploader"></slot>';
                        html += '</div>';
                        html += '<div class="d-flex m-20 flex-col">';
                        html += '<label part="input-label">Approver Comments</label>';
                        html += '<input id="input-approver-comments" type="text" part="input" value=""/><br />';
                        html += '<label part="input-label">Date of Completion</label>';
                        html += '<input id="input-reporter-doc" part="input" type="date" value="' + (dateOfCompletion == "" ? dateOfCompletion : new Date(parseInt(dateOfCompletion)).toISOString().substring(0, 10)) + '" disabled/><br />';
                        html += '<div>';
                        html += '<label part="input-label">Approve?</label><br />';
                        html += '<div class="mt-5">';
                        html += '<input id="input-approve-yes" name="radio-approved" type="radio"/> Yes';
                        html += '<input id="input-approve-no" name="radio-approved" type="radio" checked/> No';
                        html += '</div>';
                        html += '</div>';
                        html += '</div>';
                        html += '</div>';
                    }
                }
                else {
                    html += '<div class="d-flex justify-between m-20">';
                    html += '<h3 part="results-title" class="m-0"><br />Report Compliance</h3>';
                    html += '</div>';
                    html += '<div class="m-20" part="report-container">';
                    html += '<div class="d-flex justify-between align-center">';
                    html += '<button class="invisible" part="button">Save</button>';
                    html += '<button id="button-uploader-submit-report" class="button-submit" part="button">Save</button>';
                    html += '</div>';
                    html += '<div class="d-flex m-20 flex-col">';
                    html += '<label part="input-label">Reporter Comments</label>';
                    html += '<input id="input-reporter-comments" type="text" part="input" value=""/><br />';
                    html += '<label part="input-label">Date of Completion</label>';
                    html += '<input id="input-reporter-doc" part="input" type="date" value="' + (dateOfCompletion == "" ? dateOfCompletion : new Date(parseInt(dateOfCompletion)).toISOString().substring(0, 10)) + '" max="' + (new Date().toISOString().substring(0, 10)) + '"/><br />';
                    html += '<label part="input-label">Supporting Documents</label>';
                    html += '<slot name="uploader"></slot>';
                    html += '</div>';
                    html += '</div>';
                }
                html += '<div class="d-flex justify-between m-20">';
                html += '<h3 part="results-title" class="m-0"><br />Comments</h3>';
                html += '</div>';
                html += '<div class="m-20">';
                html += '<div class="d-flex flex-col">';
                for (var i = 0; i < comments.length; i++) {
                    html += '<div part="commentbox" class="d-flex commentbox ' + (comments[i].author + "").toLowerCase() + 'box">';
                    html += '<div class="mr-20"><strong>' + comments[i].author + '</strong></div>';
                    html += '<div class="">' + comments[i].comment + '<br /><small><span class="muted">' + comments[i].timestamp + '</span></small></div>';
                    html += '</div>';
                }
                if (comments.length === 0) {
                    html += '<div><strong>No comments yet!</strong></div>';
                }
                html += '</div>';
                html += '<div>';
            }
            this._SfDetailContainer.innerHTML = html;
            (_a = this._SfDetailContainer.querySelector('#button-detail-close')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
                this._SfDetailContainer.innerHTML = '';
                this._SfDetailContainer.style.display = 'none';
            });
            (_b = this._SfDetailContainer.querySelector('.head-basic')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
                console.log('head basic clicked', this._SfDetailContainer.querySelector('.body-basic').style.display);
                if (this._SfDetailContainer.querySelector('.body-basic').style.display == 'flex' || this._SfDetailContainer.querySelector('.body-basic').style.display == '') {
                    this._SfDetailContainer.querySelector('.body-basic').style.display = 'none';
                    this._SfDetailContainer.querySelector('.head-indicator-basic').innerHTML = '+';
                }
                else {
                    this._SfDetailContainer.querySelector('.body-basic').style.display = 'flex';
                    this._SfDetailContainer.querySelector('.head-indicator-basic').innerHTML = '-';
                }
            });
            (_c = this._SfDetailContainer.querySelector('.head-statute')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
                console.log('head statute clicked', this._SfDetailContainer.querySelector('.body-statute').style.display);
                if (this._SfDetailContainer.querySelector('.body-statute').style.display == 'flex' || this._SfDetailContainer.querySelector('.body-statute').style.display == '') {
                    this._SfDetailContainer.querySelector('.body-statute').style.display = 'none';
                    this._SfDetailContainer.querySelector('.head-indicator-statute').innerHTML = '+';
                }
                else {
                    this._SfDetailContainer.querySelector('.body-statute').style.display = 'flex';
                    this._SfDetailContainer.querySelector('.head-indicator-statute').innerHTML = '-';
                }
            });
            (_d = this._SfDetailContainer.querySelector('.head-compliance')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', () => {
                if (this._SfDetailContainer.querySelector('.body-compliance').style.display == 'flex' || this._SfDetailContainer.querySelector('.body-compliance').style.display == '') {
                    this._SfDetailContainer.querySelector('.body-compliance').style.display = 'none';
                    this._SfDetailContainer.querySelector('.head-indicator-compliance').innerHTML = '+';
                }
                else {
                    this._SfDetailContainer.querySelector('.body-compliance').style.display = 'flex';
                    this._SfDetailContainer.querySelector('.head-indicator-compliance').innerHTML = '-';
                }
            });
            (_e = this._SfDetailContainer.querySelector('.head-grc')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', () => {
                if (this._SfDetailContainer.querySelector('.body-grc').style.display == 'flex' || this._SfDetailContainer.querySelector('.body-grc').style.display == '') {
                    this._SfDetailContainer.querySelector('.body-grc').style.display = 'none';
                    this._SfDetailContainer.querySelector('.head-indicator-grc').innerHTML = '+';
                }
                else {
                    this._SfDetailContainer.querySelector('.body-grc').style.display = 'flex';
                    this._SfDetailContainer.querySelector('.head-indicator-grc').innerHTML = '-';
                }
            });
            if (this.mode == "consumer") {
                (_f = this._SfDetailContainer.querySelector('#button-uploader-submit-approve')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', async () => {
                    const comments = this._SfDetailContainer.querySelector('#input-approver-comments').value;
                    const approved = this._SfDetailContainer.querySelector('#input-approve-yes').checked;
                    console.log(comments, approved);
                    await this.uploadReview(mmddyyyy, event["id"], comments, approved);
                    var clickEvent = new MouseEvent("click", {
                        "view": window,
                        "bubbles": true,
                        "cancelable": false
                    });
                    this._SfDetailContainer.querySelector('#button-detail-close').dispatchEvent(clickEvent);
                    await this.fetchUserCalendar_2();
                    if (this.getCurrentTab() == this.TAB_STREAM) {
                        this.renderTabs(this.TAB_STREAM);
                        this.renderStream();
                    }
                });
                if (this.myRole == this.TAB_REPORTER) {
                    if (approved) {
                        this._SfDetailContainer.querySelector('#button-uploader-submit-report').style.visibility = 'hidden';
                    }
                    else {
                        this._SfDetailContainer.querySelector('#button-uploader-submit-report').style.visibility = 'visible';
                        (_g = this._SfDetailContainer.querySelector('#button-uploader-submit-report')) === null || _g === void 0 ? void 0 : _g.addEventListener('click', async () => {
                            const reportercomments = this._SfDetailContainer.querySelector('#input-reporter-comments').value;
                            const reporterdoc = this._SfDetailContainer.querySelector('#input-reporter-doc').value.length > 0 ? (new Date(this._SfDetailContainer.querySelector('#input-reporter-doc').value).getTime() + "") : "";
                            const docs = this._SfUploader[0].querySelector('#uploader').selectedValues();
                            if (docs.length === 0) {
                                this.setError('No documents uploaded!');
                                setTimeout(() => {
                                    this.clearMessages();
                                }, 3000);
                            }
                            else {
                                if (reporterdoc.length === 0) {
                                    this.setError('Date of completion not selected!');
                                    setTimeout(() => {
                                        this.clearMessages();
                                    }, 3000);
                                }
                                else {
                                    await this.uploadReport(mmddyyyy, event["id"], reportercomments, reporterdoc, docs);
                                    var clickEvent = new MouseEvent("click", {
                                        "view": window,
                                        "bubbles": true,
                                        "cancelable": false
                                    });
                                    this._SfDetailContainer.querySelector('#button-detail-close').dispatchEvent(clickEvent);
                                    await this.fetchUserCalendar_2();
                                    if (this.getCurrentTab() == this.TAB_STREAM) {
                                        this.renderTabs(this.TAB_STREAM);
                                        this.renderStream();
                                    }
                                }
                            }
                        });
                    }
                }
                if (this._SfUploader[0] != null) {
                    this._SfUploader[0].querySelector('#uploader').addEventListener('uploadCompleted', (ev) => {
                        console.log(ev);
                    });
                    this._SfUploader[0].querySelector('#uploader').prepopulatedInputArr = JSON.stringify([]);
                    this._SfUploader[0].querySelector('#uploader').loadMode();
                    if (docs.length) {
                        this._SfUploader[0].querySelector('#uploader').prepopulatedInputArr = JSON.stringify(docs);
                        this._SfUploader[0].querySelector('#uploader').loadMode();
                    }
                    if (this.myRole == this.TAB_APPROVER || approved) {
                        this._SfUploader[0].querySelector('#uploader').readOnly = true;
                        this._SfUploader[0].querySelector('#uploader').loadMode();
                    }
                    else {
                        this._SfUploader[0].querySelector('#uploader').readOnly = false;
                        this._SfUploader[0].querySelector('#uploader').loadMode();
                    }
                }
                console.log('approved 1', event["approved"], this.myRole, this.TAB_APPROVER);
                if (this.myRole == this.TAB_APPROVER) {
                    console.log('approved 1', event["approved"], this.myRole, this.TAB_APPROVER);
                    if (event["approved"] === true) {
                        console.log('approved 2', event["approved"], this.myRole, this.TAB_APPROVER);
                        this._SfDetailContainer.querySelector('#input-approve-yes').checked = true;
                    }
                }
            }
        };
        this.renderCalendar = () => {
            var _a;
            console.log('redering calendar', this.events);
            var startDate = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + this.calendarStartYYYY);
            var html = '';
            for (var i = 0; i < 12; i++) {
                html += '<div class="calendar-item d-flex flex-col flex-grow" part="calendar-month">';
                html += '<div class="d-flex justify-between align-center">';
                html += '<div part="month-title" class="title-item">' + this.monthNames[startDate.getMonth()] + '&nbsp;&nbsp;' + startDate.getFullYear() + '</div>';
                html += '<button id="calendar-button-' + i + '" part="button-icon-small" class="title-item material-icons">open_in_new</button>';
                html += '</div>';
                html += this.insertDayNames();
                html += this.insertDates(startDate.getMonth(), startDate.getFullYear());
                html += '</div>';
                startDate.setMonth(startDate.getMonth() + 1);
            }
            this._SfCalendarContainer.innerHTML = html;
            for (var i = 0; i < 12; i++) {
                (_a = this._SfCalendarContainer.querySelector('#calendar-button-' + i)) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (ev) => {
                    const id = ev.target.id.split("-")[2];
                    console.log('render stream', id);
                    this.enableStream();
                    this.renderTabs(this.TAB_STREAM);
                    this.renderStream(parseInt(id));
                });
            }
        };
        this.renderTaggingTable = (divElement, sourceArray, taggingArray, sourceCols, uploadFunction, refreshFunction, colName, uniqCols, apiIdDropdown, dropdownSearchPhrase) => {
            console.log('divelement', divElement);
            console.log('sourcearray', sourceArray);
            console.log('taggingarray', taggingArray);
            console.log('uniqcols', uniqCols);
            if (taggingArray.length === 0 || sourceArray.length === 0)
                return;
            const foundArr = [];
            console.log('tagging array before', taggingArray.data.mappings.mappings.length);
            for (var i = 0; i < taggingArray.data.mappings.mappings.length; i++) {
                var found = false;
                for (var j = 0; j < sourceArray.data.mappings.mappings.length; j++) {
                    var equal = true;
                    for (var k = 0; k < uniqCols.length; k++) {
                        if (sourceArray.data.mappings.mappings[j] != null && taggingArray.data.mappings.mappings[i] != null) {
                            if (sourceArray.data.mappings.mappings[j][uniqCols[k]] != taggingArray.data.mappings.mappings[i][uniqCols[k]]) {
                                equal = false;
                            }
                        }
                    }
                    if (equal) {
                        found = true;
                    }
                }
                if (found) {
                    foundArr.push(taggingArray.data.mappings.mappings[i]);
                }
            }
            taggingArray.data.mappings.mappings = foundArr;
            console.log('tagging array after', taggingArray.data.mappings.mappings.length);
            var tagged = 0;
            for (var j = 0; j < taggingArray.data.mappings.mappings.length; j++) {
                if (taggingArray.data.mappings.mappings[j] != null) {
                    if (taggingArray.data.mappings.mappings[j][colName].length > 0) {
                        tagged++;
                    }
                }
            }
            var html = '';
            var status = '';
            if (tagged < sourceArray.data.mappings.mappings.length) {
                status = '<span class="color-pending material-icons">pending</span>';
            }
            else {
                status = '<span class="color-done material-icons">check_circle</span>';
            }
            html += '<div class="left-sticky mb-10 d-flex justify-between align-center"><h3 part="results-title" class="d-flex align-center">' + status + '&nbsp;&nbsp;Mapped ' + tagged + ' out of ' + sourceArray.data.mappings.mappings.length + '</h3><button part="button" class="button-save">Save</button></div>';
            html += '<table>';
            html += '<thead>';
            html += '<th part="td-head" class="td-head">';
            html += colName;
            html += '</th>';
            for (i = 0; i < uniqCols.length; i++) {
                html += '<th part="td-head" class="td-head">';
                html += uniqCols[i];
                html += '</th>';
            }
            for (i = 0; i < sourceCols.length; i++) {
                html += '<th part="td-head" class="td-head">';
                html += sourceCols[i];
                html += '</th>';
            }
            for (i = 0; i < JSON.parse(sourceArray.data.mappings.mappings[0].cols).length; i++) {
                html += '<th part="td-head" class="td-head">';
                html += JSON.parse(sourceArray.data.mappings.mappings[0].cols)[i];
                html += '</th>';
            }
            html += '</thead>';
            html += '<tbody>';
            for (i = 0; i < sourceArray.data.mappings.mappings.length; i++) {
                var classBg = "";
                if (i % 2 === 0) {
                    classBg = 'td-light';
                }
                else {
                    classBg = 'td-dark';
                }
                html += '<tr>';
                html += '<td class="td-body ' + classBg + '" part="td-key">';
                if (apiIdDropdown.length > 0) {
                    html += '<sf-i-form id="tags-' + i + '" class="tags-input tags-' + i + '" name="Tags" label="Select ' + colName + '" apiId="' + apiIdDropdown + '" mode="multiselect-dropdown" searchPhrase="' + this.projectName + ((dropdownSearchPhrase != null && dropdownSearchPhrase != "") ? dropdownSearchPhrase : "") + '" selectProjection="name" mandatory></sf-i-form>';
                }
                else {
                    html += '<input id="tags-' + i + '" type="text" part="input" class="tags-input"/>';
                }
                html += '</td>';
                for (var l = 0; l < uniqCols.length; l++) {
                    html += '<td class="td-body ' + classBg + '" part="td-key">';
                    html += '<sf-i-elastic-text text="' + sourceArray.data.mappings.mappings[i][uniqCols[l]] + '" minLength="10"></sf-i-elastic-text>';
                    html += '</td>';
                }
                for (l = 0; l < sourceCols.length; l++) {
                    for (var j = 0; j < JSON.parse(sourceArray.data.mappings.mappings[0].cols).length; j++) {
                        if (sourceCols[l] == JSON.parse(sourceArray.data.mappings.mappings[0].cols)[j]) {
                            html += '<td class="td-body ' + classBg + '" part="td-body">';
                            console.log('isArray', sourceCols[l], Array.isArray(JSON.parse(sourceArray.data.mappings.mappings[i].data)[j]));
                            if (Array.isArray(JSON.parse(sourceArray.data.mappings.mappings[i].data)[j])) {
                                for (var k = 0; k < JSON.parse(sourceArray.data.mappings.mappings[i].data)[j].length; k++) {
                                    html += ('<sf-i-elastic-text text="' + JSON.parse(sourceArray.data.mappings.mappings[i].data)[j][k] + '" minLength="60"></sf-i-elastic-text>');
                                }
                            }
                            else {
                                html += ('<sf-i-elastic-text text="' + JSON.parse(sourceArray.data.mappings.mappings[i].data)[j] + '" minLength="60"></sf-i-elastic-text>');
                            }
                            html += '</td>';
                        }
                    }
                }
                for (var j = 0; j < JSON.parse(sourceArray.data.mappings.mappings[0].cols).length; j++) {
                    html += '<td class="td-body ' + classBg + '" part="td-body">';
                    if (Array.isArray(JSON.parse(sourceArray.data.mappings.mappings[i].data)[j])) {
                        for (var k = 0; k < JSON.parse(sourceArray.data.mappings.mappings[i].data)[j].length; k++) {
                            html += ('<sf-i-elastic-text text="' + JSON.parse(sourceArray.data.mappings.mappings[i].data)[j][k] + '" minLength="80"></sf-i-elastic-text>');
                        }
                    }
                    else {
                        html += ('<sf-i-elastic-text text="' + JSON.parse(sourceArray.data.mappings.mappings[i].data)[j] + '" minLength="80"></sf-i-elastic-text>');
                    }
                    html += '</td>';
                }
                html += '</tr>';
                console.log('i=', i);
            }
            html += '</tbody>';
            html += '</table>';
            divElement.innerHTML = html;
            const multiArr = divElement.querySelectorAll('.tags-input');
            for (var i = 0; i < multiArr.length; i++) {
                console.log('preselect', i, apiIdDropdown);
                if (apiIdDropdown.length > 0) {
                    if (taggingArray.data.mappings.mappings[i] != null && taggingArray.data.mappings.mappings[i][colName] != null) {
                        multiArr[i].preselectedValues = JSON.stringify(taggingArray.data.mappings.mappings[i][colName]);
                    }
                    console.log('preselect', multiArr[i]);
                    multiArr[i].addEventListener('valueChanged', () => {
                        taggingArray.data.mappings.mappings = [];
                        for (var count = 0; count < sourceArray.data.mappings.mappings.length; count++) {
                            taggingArray.data.mappings.mappings[count] = sourceArray.data.mappings.mappings[count];
                            taggingArray.data.mappings.mappings[count][colName] = divElement.querySelector('#tags-' + count).selectedValues();
                        }
                        this.renderTaggingTable(divElement, sourceArray, taggingArray, sourceCols, uploadFunction, refreshFunction, colName, uniqCols, apiIdDropdown, dropdownSearchPhrase);
                    });
                }
                else {
                    if (taggingArray.data.mappings.mappings[i] != null) {
                        multiArr[i].value = taggingArray.data.mappings.mappings[i][colName];
                    }
                    multiArr[i].addEventListener('keyup', (e) => {
                        if (e.key == "Enter") {
                            taggingArray.data.mappings.mappings = [];
                            for (var count = 0; count < sourceArray.data.mappings.mappings.length; count++) {
                                taggingArray.data.mappings.mappings[count] = sourceArray.data.mappings.mappings[count];
                                taggingArray.data.mappings.mappings[count][colName] = divElement.querySelector('#tags-' + count).value;
                            }
                            this.renderTaggingTable(divElement, sourceArray, taggingArray, sourceCols, uploadFunction, refreshFunction, colName, uniqCols, apiIdDropdown, dropdownSearchPhrase);
                        }
                    });
                }
            }
            const buttonSave = divElement.querySelector('.button-save');
            buttonSave.addEventListener('click', async () => {
                await uploadFunction(taggingArray.data.mappings);
                refreshFunction();
            });
        };
        this.renderMappingTable = (divElement, jsonData, cursor, fetchFunction, searchString, mappedArray, found, uploadFunction, refreshFunction) => {
            var _a, _b, _c;
            console.log('divelement', divElement);
            console.log('jsonData', jsonData);
            console.log('cursor', cursor);
            console.log('fetch', fetchFunction);
            console.log('searchstring', searchString);
            if (jsonData.length === 0)
                return;
            var html = '';
            html += '<div class="d-flex justify-between align-center left-sticky">';
            html += '<h3 part="results-title">Search Results (' + found + ')</h3>';
            html += '<button part="button" class="button-save">Save</button>';
            html += '</div>';
            html += '<table>';
            html += '<thead>';
            html += '<th part="td-head" class="td-head left-sticky">';
            html += 'Select';
            html += '</th>';
            html += '<th part="td-head" class="td-head">';
            html += 'Id';
            html += '</th>';
            for (var i = 0; i < jsonData[0].cols.length; i++) {
                html += '<th part="td-head" class="td-head">';
                html += jsonData[0].cols[i];
                html += '</th>';
            }
            html += '</thead>';
            html += '<tbody>';
            for (var i = 0; i < jsonData.length; i++) {
                var classBg = "";
                if (i % 2 === 0) {
                    classBg = 'td-light';
                }
                else {
                    classBg = 'td-dark';
                }
                var mapped = "";
                if (jsonData[i].mapped) {
                    mapped = "checked";
                }
                html += '<tr>';
                html += '<td part="td-action" class="left-sticky">';
                html += '<div id="select-' + i + '"><input class="checkbox checkbox-' + i + '" part="input-checkbox" type="checkbox" ' + mapped + '/></div>';
                html += '</td>';
                html += '<td part="td-body" class="' + classBg + '">';
                html += '<sf-i-elastic-text class="statute id-' + i + '" text="' + (jsonData[i].id) + '" minLength="80"></sf-i-elastic-text>';
                html += '</td>';
                //let data = JSON.parse(jsonData[i].fields.data);
                for (var j = 0; j < JSON.parse(jsonData[i].data.cols).length; j++) {
                    if (jsonData[i].cols.includes(JSON.parse(jsonData[i].data.cols)[j])) {
                        html += '<td part="td-body" class="td-body ' + classBg + '">';
                        if (Array.isArray(JSON.parse(jsonData[i].data.data)[j])) {
                            for (var k = 0; k < JSON.parse(jsonData[i].data.data)[j].length; k++) {
                                html += ('<sf-i-elastic-text text="' + JSON.parse(jsonData[i].data.data)[j][k] + '" minLength="80"></sf-i-elastic-text>');
                                // if(k < (JSON.parse(jsonData[i].data.data)[j].length - 1)) {
                                //   html += "; ";
                                // }
                            }
                        }
                        else {
                            html += ('<sf-i-elastic-text text="' + JSON.parse(jsonData[i].data.data)[j] + '" minLength="80"></sf-i-elastic-text>');
                        }
                        html += '</td>';
                    }
                }
                html += '</tr>';
            }
            html += '</tbody>';
            html += '</table>';
            html += '<div class="mt-10 mb-10 d-flex justify-center align-center left-sticky">';
            if (cursor[cursor.length - 1].prev != "") {
                html += '<button part="button-icon" class="material-icons ml-10 mr-10 button-prev">navigate_before</button>';
            }
            html += '<label part="input-label" class="ml-10 mr-10">' + cursor.length + ' of ' + Math.ceil(found / this.SEARCH_BLOCK_SIZE) + '</label>';
            if (jsonData.length === this.SEARCH_BLOCK_SIZE) {
                html += '<button part="button-icon" class="material-icons ml-10 mr-10 button-next">navigate_next</button>';
            }
            html += '</div>';
            divElement.innerHTML = html;
            (_a = this._SfButtonNext) === null || _a === void 0 ? void 0 : _a.addEventListener('click', async () => {
                const resultFunction = await fetchFunction(searchString, cursor[cursor.length - 1].next);
                console.log(resultFunction);
                if (resultFunction != null) {
                    const jsonData1 = [];
                    for (var i = 0; i < resultFunction.values.length; i++) {
                        var mapped = false;
                        for (var j = 0; j < mappedArray.data.mappings.mappings.length; j++) {
                            if (mappedArray.data.mappings.mappings[j].id == resultFunction.values[i].id) {
                                if (mappedArray.data.mappings.mappings[j].selected) {
                                    mapped = true;
                                }
                            }
                        }
                        for (var j = 0; j < mappedArray.data.mappings.mappings.length; j++) {
                            if (mappedArray.data.mappings.mappings[j].id == resultFunction.values[i].id) {
                                if (mappedArray.data.mappings.mappings[j].selected) {
                                    mapped = true;
                                }
                            }
                        }
                        jsonData1.push({ id: resultFunction.values[i].id, mapped: mapped, data: resultFunction.values[i].fields, cols: jsonData[0].cols });
                    }
                    console.log('clicked', jsonData1);
                    cursor.push({ prev: cursor[cursor.length - 1].next, next: resultFunction.cursor });
                    this.renderMappingTable(divElement, jsonData1, cursor, fetchFunction, searchString, mappedArray, found, uploadFunction, refreshFunction);
                }
            });
            (_b = this._SfButtonPrev) === null || _b === void 0 ? void 0 : _b.addEventListener('click', async () => {
                cursor.pop();
                const resultFunction = await fetchFunction(searchString, cursor[cursor.length - 1].prev);
                console.log(resultFunction);
                if (resultFunction != null) {
                    const jsonData1 = [];
                    for (var i = 0; i < resultFunction.values.length; i++) {
                        var mapped = false;
                        for (var j = 0; j < mappedArray.data.mappings.mappings.length; j++) {
                            if (mappedArray.data.mappings.mappings[j].id == resultFunction.values[i].id) {
                                if (mappedArray.data.mappings.mappings[j].selected) {
                                    mapped = true;
                                }
                            }
                        }
                        jsonData1.push({ id: resultFunction.values[i].id, mapped: mapped, data: resultFunction.values[i].fields, cols: jsonData[0].cols });
                    }
                    console.log('clicked', jsonData1);
                    this.renderMappingTable(divElement, jsonData1, cursor, fetchFunction, searchString, mappedArray, found, uploadFunction, refreshFunction);
                }
            });
            (_c = this._SfButtonSave) === null || _c === void 0 ? void 0 : _c.addEventListener('click', async () => {
                const checkboxArr = divElement.querySelectorAll('.checkbox');
                const statuteArr = divElement.querySelectorAll('.statute');
                console.log(checkboxArr);
                console.log(statuteArr);
                const jsonArr = [];
                for (var i = 0; i < checkboxArr.length; i++) {
                    jsonArr.push({ id: statuteArr[i].text, selected: checkboxArr[i].checked, data: jsonData[i].data.data, cols: jsonData[i].data.cols });
                }
                console.log('jsonArr', jsonArr);
                await uploadFunction({ "searchstring": searchString, "mappings": jsonArr });
                refreshFunction();
            });
        };
        this.refreshCalendar = async () => {
            console.log('tabs', this.myOnboardingTab, this.TAB_CALENDAR);
            if (this.myOnboardingTab == this.TAB_CALENDAR) {
                const calendarJobs = await this.fetchCalendarJobs();
                if (calendarJobs.data.status == "0" || calendarJobs.data.status == "1") {
                    setTimeout(async () => {
                        await this.loadOnboardingCalendar();
                        this.refreshCalendar();
                    }, 10000);
                }
            }
        };
        this.renderOnboardingCalendar = (calendarJobs) => {
            var _a;
            console.log('calendarjobs', calendarJobs);
            var html = '';
            html += '<div id="calendar-list-container" class="pb-10 pt-10 w-100">';
            html += '<div class="d-flex justify-center align-center w-100">';
            html += '<h3 part="results-title">Calendar Status</h3>';
            html += '</div>';
            html += '<div class="d-flex justify-center align-center w-100">';
            html += '<div class="p-10">';
            html += '<div part="input-label" class="text-center">Job Status</div>';
            html += '<div class="d-flex align-center text-center">' + (calendarJobs.data.status == "0" ? "<span class=\"color-not-started material-icons\">schedule</span>&nbsp;Initialized" : calendarJobs.data.status == "1" ? "<span class=\"color-pending material-icons\">pending</span>&nbsp;In-Progress" : "<span class=\"color-done material-icons\">check_circle</span>&nbsp;Complete") + '</div>';
            html += '</div>';
            html += '<div class="p-10">';
            html += '<div part="input-label" class="text-center">Last Updated</div>';
            html += '<div class="text-center">' + new Date(calendarJobs.data.lastupdated).toLocaleString() + '</div>';
            html += '</div>';
            html += '</div>';
            html += '<div class="d-flex justify-center align-center w-100 mt-20">';
            html += '<button part="button" class="button-submit d-flex align-center"><span class="material-icons">bolt</span>&nbsp;<span>Update Calendar</span></button>';
            html += '</div>';
            html += '</div>';
            this._SfOnboardingCalendarContainer.innerHTML = html;
            (_a = this._SfOnboardingCalendarContainer.querySelector('.button-submit')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', async () => {
                await this.fetchGetMappedCalendar();
                setTimeout(() => {
                    this.refreshCalendar();
                }, 10000);
            });
            //this.refreshCalendar();
        };
        this.renderOnboardingInternalControls = (mappedInternalControls, mappedSerializedAlertSchedules) => {
            var html = '';
            html += '<div id="internalcontrols-list-container" class="d-flex flex-col w-100 scroll-x">';
            html += '</div>';
            this._SfOnboardingInternalControlsContainer.innerHTML = html;
            this.renderTaggingTable(this._SfOnboardingInternalControlsListContainer, mappedSerializedAlertSchedules, mappedInternalControls, ["obligation", "country", "statute"], this.uploadInternalControlsMapping, this.loadMode, "internalcontrols", ["id", "entityname", "locationname"], '', "");
        };
        this.renderOnboardingAlertSchedules = (mappedAlertSchedules, mappedSerializedDuedates) => {
            var html = '';
            html += '<div id="alertschedules-list-container" class="d-flex flex-col w-100 scroll-x">';
            html += '</div>';
            this._SfOnboardingAlertSchedulesContainer.innerHTML = html;
            this.renderTaggingTable(this._SfOnboardingAlertSchedulesListContainer, mappedSerializedDuedates, mappedAlertSchedules, ["obligation", "country", "statute"], this.uploadAlertSchedulesMapping, this.loadMode, "alertschedules", ["id", "entityname", "locationname"], '', "");
        };
        this.renderOnboardingDuedates = (mappedDuedates, mappedSerializedApprovers) => {
            var html = '';
            html += '<div id="duedates-list-container" class="d-flex flex-col w-100 scroll-x">';
            html += '</div>';
            this._SfOnboardingDuedatesContainer.innerHTML = html;
            this.renderTaggingTable(this._SfOnboardingDuedatesListContainer, mappedSerializedApprovers, mappedDuedates, ["obligation", "country", "statute"], this.uploadDuedatesMapping, this.loadMode, "duedates", ["id", "entityname", "locationname"], '', "");
        };
        this.renderOnboardingReporters = (mappedReporters, mappedSerializedTags) => {
            var html = '';
            html += '<div id="reporters-list-container" class="d-flex flex-col w-100 scroll-x">';
            html += '</div>';
            this._SfOnboardingReportersContainer.innerHTML = html;
            this.renderTaggingTable(this._SfOnboardingReportersListContainer, mappedSerializedTags, mappedReporters, ["obligation", "country", "statute"], this.uploadReportersMapping, this.loadMode, "reporters", ["id", "entityname", "locationname"], this.apiIdUsers, "");
        };
        this.renderOnboardingApprovers = (mappedApprovers, mappedSerializedReporters) => {
            var html = '';
            html += '<div id="approvers-list-container" class="d-flex flex-col w-100 scroll-x">';
            html += '</div>';
            this._SfOnboardingApproversContainer.innerHTML = html;
            this.renderTaggingTable(this._SfOnboardingApproversListContainer, mappedSerializedReporters, mappedApprovers, ["obligation", "country", "statute"], this.uploadApproversMapping, this.loadMode, "approvers", ["id", "entityname", "locationname"], this.apiIdUsers, "");
        };
        this.renderOnboardingTags = (mappedTags, mappedSerializedFunctions) => {
            var html = '';
            html += '<div id="tags-list-container" class="d-flex flex-col w-100 scroll-x">';
            html += '</div>';
            this._SfOnboardingTagsContainer.innerHTML = html;
            this.renderTaggingTable(this._SfOnboardingTagsListContainer, mappedSerializedFunctions, mappedTags, ["obligation", "country", "statute"], this.uploadTagsMapping, this.loadMode, "tags", ["id", "countryname", "entityname", "locationname"], this.apiIdTags, "&Tag");
        };
        this.renderOnboardingFunctions = (mappedFunctions, mappedSerializedLocations) => {
            var html = '';
            html += '<div id="functions-list-container" class="d-flex flex-col w-100 scroll-x">';
            html += '</div>';
            this._SfOnboardingFunctionsContainer.innerHTML = html;
            this.renderTaggingTable(this._SfOnboardingFunctionsListContainer, mappedSerializedLocations, mappedFunctions, ["obligation", "country", "statute"], this.uploadFunctionsMapping, this.loadMode, "functions", ["id", "countryname", "entityname", "locationname"], this.apiIdTags, "&Function");
        };
        this.renderOnboardingLocations = (mappedLocations, mappedSerializedEntities) => {
            var html = '';
            html += '<div id="locations-list-container" class="d-flex flex-col w-100 scroll-x">';
            html += '</div>';
            this._SfOnboardingLocationsContainer.innerHTML = html;
            this.renderTaggingTable(this._SfOnboardingLocationsListContainer, mappedSerializedEntities, mappedLocations, ["obligation", "country", "statute"], this.uploadLocationsMapping, this.loadMode, "locations", ["id", "countryname", "entityname"], this.apiIdTags, "&Location");
        };
        this.renderOnboardingCompliances = (mappedStatutes, mappedCompliances) => {
            console.log('mappedcompliances', mappedCompliances);
            console.log('mappedstatutes', mappedStatutes);
            var searchString = "";
            for (var i = 0; i < mappedStatutes.data.mappings.mappings.length; i++) {
                if (mappedStatutes.data.mappings.mappings[i].selected) {
                    searchString += mappedStatutes.data.mappings.mappings[i].id + "|";
                }
            }
            searchString = searchString.slice(0, -1);
            console.log('searchstring', searchString);
            var initCursor = "";
            var html = '';
            html += '<div class="d-flex flex-col w-100">';
            html += '<label part="input-label">Search Compliances</label>';
            html += '<div class="d-flex">';
            html += '<input part="input" type="text" class="w-100 input-search" placeholder="Use | to separate..." disabled/>';
            html += '<button part="button-icon" class="ml-10 material-icons button-search">search</button>';
            html += '</div>';
            html += '</div>';
            html += '<div id="compliances-list-container" class="d-flex flex-col w-100 scroll-x">';
            html += '</div>';
            this._SfOnboardingCompliancesContainer.innerHTML = html;
            // (this._SfInputSearch as HTMLInputElement).addEventListener('keyup', (e: any) => {
            //   if(e.key == 'Enter') {
            //     (this._SfButtonSearch as HTMLButtonElement).click();
            //   }
            // });
            this._SfButtonSearch.addEventListener('click', async () => {
                console.log('clicked', mappedStatutes.data.mappings.mappings);
                // const searchString = (this._SfInputSearch as HTMLButtonElement).value;
                if (searchString.length > 0) {
                    const resultCompliances = await this.fetchSearchCompliances(searchString, "");
                    console.log('resultcompliances', resultCompliances);
                    if (resultCompliances != null) {
                        const jsonData = [];
                        for (var i = 0; i < resultCompliances.values.length; i++) {
                            var mapped = false;
                            for (var j = 0; j < mappedCompliances.data.mappings.mappings.length; j++) {
                                if (mappedCompliances.data.mappings.mappings[j].id == resultCompliances.values[i].id) {
                                    if (mappedCompliances.data.mappings.mappings[j].selected) {
                                        mapped = true;
                                    }
                                }
                            }
                            jsonData.push({ id: resultCompliances.values[i].id, mapped: mapped, data: resultCompliances.values[i].fields, cols: ["country", "state", "category", "statute", "obligation", "risk", "riskarea", "frequency"] });
                        }
                        console.log('clicked', jsonData);
                        this.renderMappingTable(this._SfOnboardingCompliancesListContainer, jsonData, [{ prev: initCursor, next: resultCompliances.cursor }], this.fetchSearchCompliances, searchString, mappedCompliances, resultCompliances.found, this.uploadCompliancesMapping, this.loadMode);
                    }
                }
            });
            console.log('compliances searchstring', searchString);
            if (searchString != "") {
                this._SfInputSearch.value = searchString;
                this._SfButtonSearch.click();
            }
        };
        this.renderOnboardingEntities = (mappedEntities, mappedSerializedCountries) => {
            var html = '';
            html += '<div id="entities-list-container" class="d-flex flex-col w-100 scroll-x">';
            html += '</div>';
            this._SfOnboardingEntitiesContainer.innerHTML = html;
            this.renderTaggingTable(this._SfOnboardingEntitiesListContainer, mappedSerializedCountries, mappedEntities, ["obligation", "country", "statute"], this.uploadEntitiesMapping, this.loadMode, "entities", ["id", "countryname"], this.apiIdTags, "&Entity");
        };
        this.renderOnboardingCountries = (mappedCountries, mappedCompliances) => {
            var html = '';
            html += '<div id="countries-list-container" class="d-flex flex-col w-100 scroll-x">';
            html += '</div>';
            this._SfOnboardingCountriesContainer.innerHTML = html;
            const arr1 = [];
            for (var i = 0; i < mappedCompliances.data.mappings.mappings.length; i++) {
                if (mappedCompliances.data.mappings.mappings[i].selected) {
                    arr1.push(mappedCompliances.data.mappings.mappings[i]);
                }
            }
            mappedCompliances.data.mappings.mappings = arr1;
            // const arr2 = [];
            // for(var i = 0; i < mappedCountries.data.mappings.mappings.length; i++) {
            //   if(mappedCountries.data.mappings.mappings[i].selected) {
            //     arr2.push(mappedCountries.data.mappings.mappings[i]);
            //   }
            // }
            // mappedCountries.data.mappings.mappings = arr2;
            this.renderTaggingTable(this._SfOnboardingCountriesListContainer, mappedCompliances, mappedCountries, ["obligation", "country", "statute"], this.uploadCountriesMapping, this.loadMode, "countries", ["id"], this.apiIdTags, "-Country");
        };
        this.renderOnboardingStatutes = (mappedStatutes) => {
            var initCursor = "";
            var html = '';
            html += '<div class="d-flex flex-col w-100">';
            html += '<label part="input-label">Search Statutes</label>';
            html += '<div class="d-flex">';
            html += '<input part="input" type="text" class="w-100 input-search" placeholder="Use | to separate..." autofocus/>';
            html += '<button part="button-icon" class="ml-10 material-icons button-search">search</button>';
            html += '</div>';
            html += '</div>';
            html += '<div id="statutes-list-container" class="d-flex flex-col w-100 scroll-x">';
            html += '</div>';
            this._SfOnboardingStatutesContainer.innerHTML = html;
            this._SfInputSearch.addEventListener('keyup', (e) => {
                if (e.key == 'Enter') {
                    this._SfButtonSearch.click();
                }
            });
            this._SfButtonSearch.addEventListener('click', async () => {
                console.log('clicked', mappedStatutes.data.mappings.mappings);
                const searchString = this._SfInputSearch.value;
                console.log('clicked', searchString);
                if (searchString.length > 0) {
                    const resultStatutes = await this.fetchSearchStatutes(searchString, "");
                    if (resultStatutes != null) {
                        const jsonData = [];
                        for (var i = 0; i < resultStatutes.values.length; i++) {
                            var mapped = false;
                            for (var j = 0; j < mappedStatutes.data.mappings.mappings.length; j++) {
                                if (mappedStatutes.data.mappings.mappings[j].id == resultStatutes.values[i].id) {
                                    console.log('comparing', mappedStatutes.data.mappings.mappings[j].id, resultStatutes.values[i].id);
                                    if (mappedStatutes.data.mappings.mappings[j].selected) {
                                        mapped = true;
                                    }
                                }
                            }
                            jsonData.push({ id: resultStatutes.values[i].id, mapped: mapped, data: resultStatutes.values[i].fields, cols: ["country", "state", "name", "category", "shortid"] });
                        }
                        console.log('clicked', jsonData);
                        this.renderMappingTable(this._SfOnboardingStatutesListContainer, jsonData, [{ prev: initCursor, next: resultStatutes.cursor }], this.fetchSearchStatutes, searchString, mappedStatutes, resultStatutes.found, this.uploadStatutesMapping, this.loadMode);
                    }
                }
            });
            if (mappedStatutes.data.mappings.searchstring != "" && mappedStatutes.data.mappings.searchstring != null) {
                this._SfInputSearch.value = mappedStatutes.data.mappings.searchstring;
                this._SfButtonSearch.click();
            }
        };
        this.clickOnboardingTabs = () => {
            if (this.myOnboardingTab == this.TAB_STATUTES) {
                this._SfOnboardingTabContainer.querySelector('#onboarding-tab-statutes').click();
            }
            if (this.myOnboardingTab == this.TAB_COMPLIANCES) {
                this._SfOnboardingTabContainer.querySelector('#onboarding-tab-compliances').click();
            }
            if (this.myOnboardingTab == this.TAB_COUNTRIES) {
                this._SfOnboardingTabContainer.querySelector('#onboarding-tab-countries').click();
            }
            if (this.myOnboardingTab == this.TAB_ENTITIES) {
                this._SfOnboardingTabContainer.querySelector('#onboarding-tab-entities').click();
            }
            if (this.myOnboardingTab == this.TAB_LOCATIONS) {
                this._SfOnboardingTabContainer.querySelector('#onboarding-tab-locations').click();
            }
            if (this.myOnboardingTab == this.TAB_FUNCTIONS) {
                this._SfOnboardingTabContainer.querySelector('#onboarding-tab-functions').click();
            }
            if (this.myOnboardingTab == this.TAB_TAGS) {
                this._SfOnboardingTabContainer.querySelector('#onboarding-tab-tags').click();
            }
            if (this.myOnboardingTab == this.TAB_REPORTERS) {
                this._SfOnboardingTabContainer.querySelector('#onboarding-tab-reporters').click();
            }
            if (this.myOnboardingTab == this.TAB_APPROVERS) {
                this._SfOnboardingTabContainer.querySelector('#onboarding-tab-approvers').click();
            }
            if (this.myOnboardingTab == this.TAB_DUEDATES) {
                this._SfOnboardingTabContainer.querySelector('#onboarding-tab-duedates').click();
            }
            if (this.myOnboardingTab == this.TAB_ALERTSCHEDULES) {
                this._SfOnboardingTabContainer.querySelector('#onboarding-tab-alertschedules').click();
            }
            if (this.myOnboardingTab == this.TAB_INTERNALCONTROLS) {
                this._SfOnboardingTabContainer.querySelector('#onboarding-tab-internalcontrols').click();
            }
            if (this.myOnboardingTab == this.TAB_CALENDAR) {
                this._SfOnboardingTabContainer.querySelector('#onboarding-tab-calendar').click();
            }
        };
        this.renderOnboardingTabs = () => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
            console.log('render onboarding tabs');
            this._SfOnboardingTabContainer.innerHTML = '';
            var html = '';
            html += '<button class="tab-button mb-10" id="onboarding-tab-statutes" part="' + (this.myOnboardingTab == this.TAB_STATUTES ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Statutes</button>';
            html += '<button class="tab-button mb-10" id="onboarding-tab-compliances" part="' + (this.myOnboardingTab == this.TAB_COMPLIANCES ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Compliances</button>';
            html += '<button class="tab-button mb-10" id="onboarding-tab-countries" part="' + (this.myOnboardingTab == this.TAB_COUNTRIES ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Countries</button>';
            html += '<button class="tab-button mb-10" id="onboarding-tab-entities" part="' + (this.myOnboardingTab == this.TAB_ENTITIES ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Entities</button>';
            html += '<button class="tab-button mb-10" id="onboarding-tab-locations" part="' + (this.myOnboardingTab == this.TAB_LOCATIONS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Locations</button>';
            html += '<button class="tab-button mb-10" id="onboarding-tab-functions" part="' + (this.myOnboardingTab == this.TAB_FUNCTIONS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Functions</button>';
            html += '<button class="tab-button mb-10" id="onboarding-tab-tags" part="' + (this.myOnboardingTab == this.TAB_TAGS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Tags</button>';
            html += '<button class="tab-button mb-10" id="onboarding-tab-reporters" part="' + (this.myOnboardingTab == this.TAB_REPORTERS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Reporters</button>';
            html += '<button class="tab-button mb-10" id="onboarding-tab-approvers" part="' + (this.myOnboardingTab == this.TAB_APPROVERS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Approvers</button>';
            html += '<button class="tab-button mb-10" id="onboarding-tab-duedates" part="' + (this.myOnboardingTab == this.TAB_DUEDATES ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Duedates</button>';
            html += '<button class="tab-button mb-10" id="onboarding-tab-alertschedules" part="' + (this.myOnboardingTab == this.TAB_ALERTSCHEDULES ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Alert Schedules</button>';
            html += '<button class="tab-button mb-10" id="onboarding-tab-internalcontrols" part="' + (this.myOnboardingTab == this.TAB_INTERNALCONTROLS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Internal Controls</button>';
            html += '<button class="tab-button mb-10" id="onboarding-tab-calendar" part="' + (this.myOnboardingTab == this.TAB_CALENDAR ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Calendar</button>';
            this._SfOnboardingTabContainer.innerHTML = html;
            (_a = this._SfOnboardingTabContainer.querySelector('#onboarding-tab-statutes')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', async () => {
                this.myOnboardingTab = this.TAB_STATUTES;
                this.renderOnboardingTabs();
                await this.loadOnboardingStatutes();
            });
            (_b = this._SfOnboardingTabContainer.querySelector('#onboarding-tab-compliances')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', async () => {
                this.myOnboardingTab = this.TAB_COMPLIANCES;
                this.renderOnboardingTabs();
                this.loadOnboardingCompliances();
            });
            (_c = this._SfOnboardingTabContainer.querySelector('#onboarding-tab-countries')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', async () => {
                this.myOnboardingTab = this.TAB_COUNTRIES;
                this.renderOnboardingTabs();
                this.loadOnboardingCountries();
            });
            (_d = this._SfOnboardingTabContainer.querySelector('#onboarding-tab-entities')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', async () => {
                this.myOnboardingTab = this.TAB_ENTITIES;
                this.renderOnboardingTabs();
                this.loadOnboardingEntities();
            });
            (_e = this._SfOnboardingTabContainer.querySelector('#onboarding-tab-locations')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', async () => {
                this.myOnboardingTab = this.TAB_LOCATIONS;
                this.renderOnboardingTabs();
                this.loadOnboardingLocations();
            });
            (_f = this._SfOnboardingTabContainer.querySelector('#onboarding-tab-functions')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', async () => {
                this.myOnboardingTab = this.TAB_FUNCTIONS;
                this.renderOnboardingTabs();
                this.loadOnboardingFunctions();
            });
            (_g = this._SfOnboardingTabContainer.querySelector('#onboarding-tab-tags')) === null || _g === void 0 ? void 0 : _g.addEventListener('click', async () => {
                this.myOnboardingTab = this.TAB_TAGS;
                this.renderOnboardingTabs();
                this.loadOnboardingTags();
            });
            (_h = this._SfOnboardingTabContainer.querySelector('#onboarding-tab-reporters')) === null || _h === void 0 ? void 0 : _h.addEventListener('click', async () => {
                this.myOnboardingTab = this.TAB_REPORTERS;
                this.renderOnboardingTabs();
                this.loadOnboardingReporters();
            });
            (_j = this._SfOnboardingTabContainer.querySelector('#onboarding-tab-approvers')) === null || _j === void 0 ? void 0 : _j.addEventListener('click', async () => {
                this.myOnboardingTab = this.TAB_APPROVERS;
                this.renderOnboardingTabs();
                this.loadOnboardingApprovers();
            });
            (_k = this._SfOnboardingTabContainer.querySelector('#onboarding-tab-duedates')) === null || _k === void 0 ? void 0 : _k.addEventListener('click', async () => {
                this.myOnboardingTab = this.TAB_DUEDATES;
                this.renderOnboardingTabs();
                this.loadOnboardingDuedates();
            });
            (_l = this._SfOnboardingTabContainer.querySelector('#onboarding-tab-alertschedules')) === null || _l === void 0 ? void 0 : _l.addEventListener('click', async () => {
                this.myOnboardingTab = this.TAB_ALERTSCHEDULES;
                this.renderOnboardingTabs();
                this.loadOnboardingAlertSchedules();
            });
            (_m = this._SfOnboardingTabContainer.querySelector('#onboarding-tab-internalcontrols')) === null || _m === void 0 ? void 0 : _m.addEventListener('click', async () => {
                this.myOnboardingTab = this.TAB_INTERNALCONTROLS;
                this.renderOnboardingTabs();
                this.loadOnboardingInternalControls();
            });
            (_o = this._SfOnboardingTabContainer.querySelector('#onboarding-tab-calendar')) === null || _o === void 0 ? void 0 : _o.addEventListener('click', async () => {
                this.myOnboardingTab = this.TAB_CALENDAR;
                this.renderOnboardingTabs();
                this.loadOnboardingCalendar();
            });
        };
        this.renderRoleTabs = () => {
            var _a, _b;
            console.log('render role tabs');
            this._SfRoleTabContainer.innerHTML = '';
            var html = '';
            html += '<button class="tab-button" id="consumer-tab-reporter" part="' + (this.myRole == this.TAB_REPORTER ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Reporter</button>';
            html += '<button class="tab-button" id="consumer-tab-approver" part="' + (this.myRole == this.TAB_APPROVER ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Approver</button>';
            this._SfRoleTabContainer.innerHTML = html;
            (_a = this._SfRoleTabContainer.querySelector('#consumer-tab-reporter')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', async () => {
                this.myRole = this.TAB_REPORTER;
                this.renderRoleTabs();
                await this.fetchUserCalendar_2();
                this.enableCalendar();
                if (this.events != null) {
                    this.renderTabs(this.TAB_YEAR);
                    this.renderCalendar();
                }
            });
            (_b = this._SfRoleTabContainer.querySelector('#consumer-tab-approver')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', async () => {
                this.myRole = this.TAB_APPROVER;
                this.renderRoleTabs();
                await this.fetchUserCalendar_2();
                this.enableCalendar();
                if (this.events != null) {
                    this.renderTabs(this.TAB_YEAR);
                    this.renderCalendar();
                }
            });
        };
        this.csvmaker = (data) => {
            // Empty array for storing the values
            let csvRows = [];
            // Headers is basically a keys of an
            // object which is id, name, and
            // profession
            const headers = Object.keys(data);
            // As for making csv format, headers 
            // must be separated by comma and
            // pushing it into array
            csvRows.push(headers.join(','));
            // Pushing Object values into array
            // with comma separation
            const values = Object.values(data).join(',');
            csvRows.push(values);
            // Returning the array joining with new line 
            return csvRows.join('\n');
        };
        this.renderChartSettingsFilters = (container, ctx) => {
            var _a, _b;
            console.log(container);
            var html = `
    
      <div class="m-10" part="input">
        <div class="d-flex justify-end">
          <button id="chart-control-cancel" class="material-icons" part="button-icon-small">close</button>
        </div>
        <div class="d-flex justify-center align-end">
          <sf-i-form id="input-multi-entry-tags" name="Tags" label="Select Tags" apiId="${this.apiIdTags}" mode="multiselect-dropdown" searchPhrase="${this.projectName}" selectProjection="name" mandatory></sf-i-form>
          <button id="chart-control-plot" part="button" class="ml-20">Plot</button>          
        </div>
      </div>
    
    `;
            container.innerHTML = html;
            (_a = container.querySelector('#chart-control-plot')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
                var _a;
                const query = container.querySelector('#input-multi-entry-tags').selectedValues();
                this.filterTags = query;
                let eventContainer = null;
                if (this.getCurrentTab() == this.TAB_STREAM) {
                    eventContainer = this._SfStreamContainer;
                }
                if (this.getCurrentTab() == this.TAB_UPCOMING) {
                    eventContainer = this._SfUpcomingContainer;
                }
                if (this.getCurrentTab() == this.TAB_THIS) {
                    eventContainer = this._SfThisContainer;
                }
                if (this.getCurrentTab() == this.TAB_PAST) {
                    eventContainer = this._SfPastContainer;
                }
                if (this.getCurrentTab() == this.TAB_CUSTOM) {
                    eventContainer = this._SfCustomContainer;
                }
                const divs = eventContainer.querySelectorAll('.stream-events-container');
                const tables = eventContainer.querySelectorAll('.stream-events-container-table');
                const hiddenTitles = eventContainer.querySelectorAll('.hidden-title');
                const hiddenFilternames = eventContainer.querySelectorAll('.hidden-filtername');
                const filternames = eventContainer.querySelectorAll('.filtername');
                const streamEventSummary = eventContainer.querySelector('#stream-event-summary');
                if (this.filterTags.length > 0) {
                    streamEventSummary.style.display = 'none';
                }
                else {
                    streamEventSummary.style.display = 'block';
                }
                console.log('divs', divs);
                for (var i = 0; i < divs.length; i++) {
                    var found = false;
                    var filterMatched = "";
                    const tagsEmbedded = JSON.parse(((_a = divs[i].querySelector('.hidden-tags')) === null || _a === void 0 ? void 0 : _a.innerHTML) + "");
                    console.log(tagsEmbedded);
                    for (var count1 = 0; count1 < tagsEmbedded.length; count1++) {
                        for (var count2 = 0; count2 < this.filterTags.length; count2++) {
                            if (tagsEmbedded[count1].toLowerCase().indexOf(this.filterTags[count2].toLowerCase()) >= 0) {
                                found = true;
                                filterMatched += (this.filterTags[count2].split(';')[0] + ", ");
                            }
                        }
                    }
                    if (!found) {
                        tables[i].style.display = 'none';
                        hiddenTitles[i].style.display = 'block';
                        hiddenFilternames[i].style.display = 'none';
                        filternames[i].innerHTML = '';
                    }
                    else {
                        tables[i].style.display = 'block';
                        hiddenTitles[i].style.display = 'none';
                        hiddenFilternames[i].style.display = 'block';
                        filternames[i].innerHTML = filterMatched.replace(/,\s*$/, "");
                        ;
                    }
                }
                this.filterEventsInWindow(query, ctx);
            });
            (_b = container.querySelector('#chart-control-cancel')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
                container.innerHTML = '';
                container.dispatchEvent(new CustomEvent('canceled', { bubbles: true }));
            });
        };
        this.renderChartSettingsSettings = (container) => {
            var _a, _b, _c, _d, _e, _f;
            var html = `
    
      <div class="m-10" part="input">
        <div class="d-flex justify-end">
          <button id="chart-control-cancel" class="material-icons" part="button-icon-small">close</button>
        </div>

        <div class="d-flex justify-center">
          <div part="input" class="p-10 mr-10">
            <div part="td-head">Stats</div>
            <div part="td-body" class="d-flex align-center mt-5">
              <input type="radio" id="radio-csv" class="switch-csv" value="Excel" checked name="radio-report"/>
              <label for="radio-csv">Csv</label>
              <input type="radio" id="radio-image" class="switch-image" value="Image" name="radio-report"/>
              <label for="radio-image">Image</label>
            </div>
            <div class="d-flex justify-center">
              <button id="button-download-stats" part="button" class="mt-5">Download</button>
            </div>
          </div>
          <div part="input" class="p-10 ml-10 mr-10">
            <div part="td-head">Compliances</div>
            <div part="td-body" class="d-flex align-center mt-5">
              <input type="radio" id="radio-csv" class="switch-csv" value="Excel" checked/>
              <label for="radio-csv">Csv</label>
            </div>
            <div class="d-flex justify-center">
              <button id="button-download-compliances" part="button" class="mt-5">Download</button>
            </div>
          </div>
          <div part="input" class="p-10 ml-10">
            <div part="td-head">Certificate</div>
            <div part="td-body" class="d-flex align-center mt-5">
              <input type="radio" id="radio-html" class="switch-html" value="Html" checked/>
              <label for="radio-html">Html</label>
            </div>
            <div class="d-flex justify-center">
              <button id="button-download-certificate" part="button" class="mt-5">Download</button>
            </div>
          </div>
        </div>
      </div>
    
    `;
            container.innerHTML = html;
            (_a = container.querySelector('#chart-control-cancel')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
                container.innerHTML = '';
                container.dispatchEvent(new CustomEvent('canceled', { bubbles: true }));
            });
            (_b = container.querySelector('#button-download-compliances')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
                console.log('csvValues compliances', this.csvDataCompliances);
                const blob = new Blob([this.csvDataCompliances], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.setAttribute('href', url);
                a.setAttribute('download', 'download.csv');
                a.click();
            });
            (_c = container.querySelector('#button-download-stats')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
                const radioCsv = container.querySelector('#radio-csv');
                const radioImage = container.querySelector('#radio-image');
                console.log('radiocsv checked', radioCsv.checked);
                console.log('radioimage checked', radioImage.checked);
                if (radioCsv.checked) {
                    const blob = new Blob([this.csvDataStats], { type: 'text/csv' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.setAttribute('href', url);
                    a.setAttribute('download', 'download.csv');
                    a.click();
                }
                if (radioImage.checked) {
                    const a = document.createElement('a');
                    a.setAttribute('href', this.chart.toBase64Image());
                    a.setAttribute('download', 'download.png');
                    a.click();
                }
            });
            (_d = container.querySelector('#button-download-certificate')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', () => {
                var html = this.CERTIFICATE_HTML;
                html = html.replace(/PERSON_NAME/g, this.userName);
                html = html.replace(/PERSON_DESIGNATION/g, this.myRole);
                html = html.replace(/PERSON_COMPANY/g, this.projectName);
                html = html.replace(/PERSON_DATE/g, new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear());
                html = html.replace(/PERSON_COMPLIANCE_STATUS/g, this.htmlDataStats);
                html = html.replace(/PERSON_COMPLIANCES/g, this.htmlDataCompliances);
                html = html.replace(/PERSON_PERIOD/g, this.period);
                console.log('downloaded certificate');
                const blob = new Blob([html], { type: 'text/html' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.setAttribute('href', url);
                a.setAttribute('download', 'certificate.html');
                a.click();
            });
            (_e = container.querySelector('.switch-solid')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', () => {
                this.fill = "solid";
                if (this.getCurrentTab() == this.TAB_STREAM) {
                    this.renderStream();
                }
            });
            (_f = container.querySelector('.switch-pattern')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', () => {
                this.fill = "pattern";
                if (this.getCurrentTab() == this.TAB_STREAM) {
                    this.renderStream();
                }
            });
        };
        this.renderChartSettings = (container, selectedTab = -1, ctx) => {
            var _a, _b;
            var html = '';
            html += '<div class="d-flex justify-end align-start">';
            if (selectedTab === 0) {
                html += '<button class="tab-button" id="chart-control-filters" part="calendar-tab-button-selected" class="mr-10"><span class="material-icons">filter_list</span></button>';
            }
            else {
                html += '<button class="tab-button" id="chart-control-filters" part="calendar-tab-button-not-selected" class="mr-10"><span class="material-icons">filter_list</span></button>';
            }
            if (selectedTab === 1) {
                html += '<button class="tab-button" id="chart-control-settings" part="calendar-tab-button-selected" class="mr-10"><span class="material-icons">cloud_download</span></button>';
            }
            else {
                html += '<button class="tab-button" id="chart-control-settings" part="calendar-tab-button-not-selected" class="mr-10"><span class="material-icons">cloud_download</span></button>';
            }
            html += '</div>';
            container.querySelector('#chart-settings-controls').innerHTML = html;
            (_a = container.querySelector('#chart-settings-controls').querySelector('#chart-control-settings')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
                this.renderChartSettings(container, 1, ctx);
            });
            (_b = container.querySelector('#chart-settings-controls').querySelector('#chart-control-filters')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
                this.renderChartSettings(container, 0, ctx);
            });
            if (selectedTab === 0) {
                this.renderChartSettingsFilters(container.querySelector('#chart-settings'), ctx);
            }
            if (selectedTab === 1) {
                this.renderChartSettingsSettings(container.querySelector('#chart-settings'));
            }
            container.querySelector('#chart-settings').addEventListener('canceled', () => {
                console.log('canceled');
                this.renderChartSettings(container, -1, ctx);
                this.renderStream();
            });
            // (container.querySelector('#chart-settings-controls') as HTMLDivElement).querySelector('#chart-control-settings-cancel')?.addEventListener('click', () => {
            //   ((container.querySelector('#chart-settings-controls') as HTMLDivElement).querySelector('#chart-control-filters-cancel') as HTMLButtonElement).style.display = 'none';
            //   ((container.querySelector('#chart-settings-controls') as HTMLDivElement).querySelector('#chart-control-settings-cancel') as HTMLButtonElement).style.display = 'none';
            //   ((container.querySelector('#chart-settings-controls') as HTMLDivElement).querySelector('#chart-control-settings') as HTMLButtonElement).style.display = 'flex';
            //   ((container.querySelector('#chart-settings-controls') as HTMLDivElement).querySelector('#chart-control-filters') as HTMLButtonElement).style.display = 'flex';
            //   (container.querySelector('#chart-settings') as HTMLDivElement).innerHTML = '';
            // });
            // (container.querySelector('#chart-settings-controls') as HTMLDivElement).querySelector('#chart-control-filters-cancel')?.addEventListener('click', () => {
            //   ((container.querySelector('#chart-settings-controls') as HTMLDivElement).querySelector('#chart-control-filters-cancel') as HTMLButtonElement).style.display = 'none';
            //   ((container.querySelector('#chart-settings-controls') as HTMLDivElement).querySelector('#chart-control-settings-cancel') as HTMLButtonElement).style.display = 'none';
            //   ((container.querySelector('#chart-settings-controls') as HTMLDivElement).querySelector('#chart-control-settings') as HTMLButtonElement).style.display = 'flex';
            //   ((container.querySelector('#chart-settings-controls') as HTMLDivElement).querySelector('#chart-control-filters') as HTMLButtonElement).style.display = 'flex';
            //   (container.querySelector('#chart-settings') as HTMLDivElement).innerHTML = '';
            // });
            // (container.querySelector('#chart-settings-controls') as HTMLDivElement).querySelector('#chart-control-filters')?.addEventListener('click', () => {
            //   ((container.querySelector('#chart-settings-controls') as HTMLDivElement).querySelector('#chart-control-filters-cancel') as HTMLButtonElement).style.display = 'flex';
            //   ((container.querySelector('#chart-settings-controls') as HTMLDivElement).querySelector('#chart-control-settings-cancel') as HTMLButtonElement).style.display = 'none';
            //   ((container.querySelector('#chart-settings-controls') as HTMLDivElement).querySelector('#chart-control-settings') as HTMLButtonElement).style.display = 'none';
            //   ((container.querySelector('#chart-settings-controls') as HTMLDivElement).querySelector('#chart-control-filters') as HTMLButtonElement).style.display = 'none';
            //   (container.querySelector('#chart-settings') as HTMLDivElement).innerHTML = '';
            //   this.renderChartSettingsFilters((container.querySelector('#chart-settings') as HTMLDivElement));
            // })
        };
        this.renderChart = (ctx, type, data) => {
            console.log('rendering chart', type, data);
            if (this.chart != null) {
                this.chart.destroy();
            }
            this.chart = new Chart(ctx, {
                type: type,
                data: data,
                options: {
                    animation: {
                        onComplete: () => {
                            if (this.chart != null) {
                                console.log('onanimation complete', this.chart, this.chart.data);
                                for (var i = 0; i < this.chart.data.datasets.length; i++) {
                                    const dataset = this.chart.data.datasets[i];
                                    for (var j = 0; j < dataset.data.length; j++) {
                                        if (parseInt(dataset.data[j]) > 0) {
                                            console.log(this.chart.getDatasetMeta(i));
                                            console.log(i + "," + j, this.chart.getDatasetMeta(i).data[j]);
                                            var total = this.chart.getDatasetMeta(i).total;
                                            console.log('total', total);
                                            var mid_radius = this.chart.getDatasetMeta(i).data[j].innerRadius + (this.chart.getDatasetMeta(i).data[j].outerRadius - this.chart.getDatasetMeta(i).data[j].innerRadius) / 2;
                                            console.log('mid_radius', mid_radius);
                                            var start_angle = this.chart.getDatasetMeta(i).data[j].startAngle;
                                            console.log('start_angle', start_angle);
                                            var end_angle = this.chart.getDatasetMeta(i).data[j].endAngle;
                                            console.log('end_angle', end_angle);
                                            var mid_angle = start_angle + (end_angle - start_angle) / 2;
                                            console.log('mid_angle', mid_angle);
                                            var x = mid_radius * Math.cos(mid_angle);
                                            var y = mid_radius * Math.sin(mid_angle);
                                            this.chart.ctx.fillStyle = '#fff';
                                            if (i == 3) { // Darker text color for lighter background
                                                this.chart.ctx.fillStyle = '#444';
                                            }
                                            // var percent = String(Math.round(dataset.data[j]/total*100)) + "%";
                                            var str = "";
                                            for (var k = 0; k <= dataset.data[j].length; k++) {
                                                str += '█';
                                            }
                                            console.log('outputting bg', str);
                                            this.chart.ctx.fillStyle = '#000';
                                            //this.chart.ctx.fillText(str, this.chart.getDatasetMeta(i).data[j].x + x, this.chart.getDatasetMeta(i).data[j].y + y);
                                            //const match = /(?<value>\d+\.?\d*)/;
                                            this.chart.ctx.font = "bold 15pt Courier";
                                            this.chart.ctx.fillStyle = '#fff';
                                            this.chart.ctx.textBaseline = "middle";
                                            this.chart.ctx.textAlign = "center";
                                            this.chart.ctx.fillText(dataset.data[j], this.chart.getDatasetMeta(i).data[j].x + x, this.chart.getDatasetMeta(i).data[j].y + y);
                                        }
                                    }
                                }
                            }
                            // this.chart.data.datasets.forEach((dataset: any) => {
                            //   for (var i = 0; i < dataset.data.length; i++) {
                            //     console.log(this.chart.getDatasetMeta(i));
                            //   }
                            //   // var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
                            //   // total = dataset._meta[Object.keys(dataset._meta)[0]].total,
                            //   // mid_radius = model.innerRadius + (model.outerRadius - model.innerRadius)/2,
                            //   // start_angle = model.startAngle,
                            //   // end_angle = model.endAngle,
                            //   // mid_angle = start_angle + (end_angle - start_angle)/2;
                            // });
                        }
                    }
                },
            });
        };
        this.getCurrentTab = () => {
            if (this._SfCalendarContainer.style.display == 'flex') {
                return this.TAB_YEAR;
            }
            if (this._SfStreamContainer.style.display == 'flex') {
                return this.TAB_STREAM;
            }
            if (this._SfUpcomingContainer.style.display == 'flex') {
                return this.TAB_UPCOMING;
            }
            if (this._SfThisContainer.style.display == 'flex') {
                return this.TAB_THIS;
            }
            if (this._SfPastContainer.style.display == 'flex') {
                return this.TAB_PAST;
            }
            if (this._SfCustomContainer.style.display == 'flex') {
                return this.TAB_CUSTOM;
            }
            return "";
        };
        this.renderTabs = (selectedTab) => {
            var _a, _b, _c, _d, _e, _f, _g;
            this.clearAllCalendars();
            var html = '';
            html += '<button class="tab-button mb-10" id="calendar-tab-year" part="' + (selectedTab == this.TAB_YEAR ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Year</button>';
            html += '<button class="tab-button mb-10" id="calendar-tab-month" part="' + (selectedTab == this.TAB_STREAM ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Month</button>';
            html += '<button class="tab-button mb-10" id="calendar-tab-upcoming" part="' + (selectedTab == this.TAB_UPCOMING ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Upcoming</button>';
            html += '<button class="tab-button mb-10" id="calendar-tab-this" part="' + (selectedTab == this.TAB_THIS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Current</button>';
            html += '<button class="tab-button mb-10" id="calendar-tab-past" part="' + (selectedTab == this.TAB_PAST ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Past</button>';
            html += '<button class="tab-button mb-10" id="calendar-tab-custom" part="' + (selectedTab == this.TAB_CUSTOM ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Range</button>';
            html += '<button class="tab-button mb-10" id="calendar-tab-adhoc" part="' + (selectedTab == this.TAB_ADHOC ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Adhoc</button>';
            this._SfTabContainer.innerHTML = html;
            (_a = this._SfTabContainer.querySelector('#calendar-tab-year')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
                if (this.mode == "consumer") {
                    this.loadMode();
                }
                else {
                    this.enableCalendar();
                    this.renderTabs(this.TAB_YEAR);
                }
            });
            (_b = this._SfTabContainer.querySelector('#calendar-tab-month')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
                this.enableStream();
                this.renderTabs(this.TAB_STREAM);
                this.renderStream();
            });
            (_c = this._SfTabContainer.querySelector('#calendar-tab-upcoming')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
                this.enableUpcoming();
                this.renderTabs(this.TAB_UPCOMING);
                this.renderUpcoming();
            });
            (_d = this._SfTabContainer.querySelector('#calendar-tab-this')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', () => {
                this.enableThis();
                this.renderTabs(this.TAB_THIS);
                this.renderThis();
            });
            (_e = this._SfTabContainer.querySelector('#calendar-tab-past')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', () => {
                this.enablePast();
                this.renderTabs(this.TAB_PAST);
                this.renderPast();
            });
            (_f = this._SfTabContainer.querySelector('#calendar-tab-custom')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', () => {
                this.enableCustom();
                this.renderTabs(this.TAB_CUSTOM);
                this.renderCustom();
            });
            (_g = this._SfTabContainer.querySelector('#calendar-tab-adhoc')) === null || _g === void 0 ? void 0 : _g.addEventListener('click', () => {
                this.enableAdhoc();
                this.renderTabs(this.TAB_ADHOC);
                this.renderAdhoc();
            });
        };
        this.renderMappingTabs = (selectedTab) => {
            var _a, _b;
            var html = '';
            html += '<button class="tab-button" id="mapping-tab-reporter" part="' + (selectedTab == this.TAB_REPORTER ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Reporter</button>';
            html += '<button class="tab-button" id="mapping-tab-approver" part="' + (selectedTab == this.TAB_APPROVER ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected') + '">Approver</button>';
            this._SfMappingTabContainer.innerHTML = html;
            if (this.myRole == this.TAB_REPORTER) {
                console.log('sync mapping reporter');
                this._SfButtonBackSyncMapping.style.visibility = 'visible';
            }
            else {
                console.log('sync mapping approver');
                this._SfButtonBackSyncMapping.style.visibility = 'hidden';
            }
            (_a = this._SfMappingTabContainer.querySelector('#mapping-tab-reporter')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
                this.myRole = this.TAB_REPORTER;
                this.fetchEventMap();
                this.renderMappingTabs(this.TAB_REPORTER);
            });
            (_b = this._SfMappingTabContainer.querySelector('#mapping-tab-approver')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
                this.myRole = this.TAB_APPROVER;
                this.fetchEventMap();
                this.renderMappingTabs(this.TAB_APPROVER);
            });
        };
        this.renderExpandEvent = (events, index) => {
            var html = '';
            for (var k = 0; k < Object.keys(events[index]).length; k++) {
                if (!this.getEventPreviewFields().includes(Object.keys(events[index])[k])) {
                    html += '<td part="td-body">';
                    if (events[index][Object.keys(events[index])[k]].indexOf("[") >= 0) {
                        html += this.getEventTexts(Object.keys(events[index])[k], JSON.parse(events[index][Object.keys(events[index])[k]]), events[index]);
                    }
                    else {
                        html += '<sf-i-elastic-text text="' + events[index][Object.keys(events[index])[k]].replace(/"/g, "") + '" minLength="20"></sf-i-elastic-text>';
                    }
                    html += '</td>';
                }
            }
            console.log(this._SfMappingContainer.querySelector('#row-unmapped-' + index).innerHTML);
            this._SfMappingContainer.querySelector('#row-unmapped-' + index).insertAdjacentHTML('beforeend', html);
            html = '';
            for (var k = 0; k < Object.keys(events[index]).length; k++) {
                if (!this.getEventPreviewFields().includes(Object.keys(events[index])[k])) {
                    html += '<th part="td-head" class="bg-left">';
                    html += Object.keys(events[index])[k];
                    html += '</th>';
                }
            }
            this._SfMappingContainer.querySelector('#row-unmapped-head-' + index).insertAdjacentHTML('beforeend', html);
            this._SfMappingContainer.querySelector('#th-expand-' + index).style.display = 'none';
            this._SfMappingContainer.querySelector('#td-expand-' + index).style.display = 'none';
        };
        this.renderMapping = (unmappedEvents) => {
            var _a, _b, _c, _d, _e, _f, _g;
            this.mappedValuesDueDates = {};
            this.mappedValuesTags = {};
            this.mappedValuesUsers = {};
            console.log('rendering mapping1', unmappedEvents, this.mappedValuesDueDates, this.mappedValuesUsers, this.mappedValuesTags);
            var html = '';
            html += '<div class="d-flex align-center mt-20">';
            html += '<div id="row-unmapped-graph" class="d-flex flex-grow"><div class="div-graph-complete"></div><div class="div-graph-pending"></div></div>';
            html += '<div id="row-unmapped-summary" part="filter-title" class="ml-10">Completed 0</div>';
            html += '</div>';
            html += '<table part="stream-event-selected" id="row-unmapped-table-multi-entry" class="hide fixed-bottom justify-center">';
            html += '<tr>';
            html += '</tr>';
            html += '<tr>';
            html += '<th part="td-head" class="col-date">';
            html += 'Duedate';
            html += '</th>';
            html += '<th part="td-head" class="col-tags">';
            html += 'Tags';
            html += '</th>';
            html += '<th part="td-head">';
            html += 'Users';
            html += '</th>';
            html += '<th class="d-flex">';
            html += '<button id="row-unmapped-table-multi-entry-cancel" part="button-icon-small" class="material-icons">close</button>';
            html += '</th>';
            html += '</tr>';
            html += '<tr>';
            html += '<td class="col-date">';
            html += '<input part="input" type="text" id="row-unmapped-input-multi-entry-date" />';
            html += '</td>';
            html += '<td part="td-head" class="col-tags">';
            html += '<sf-i-form id="row-unmapped-input-multi-entry-tags" name="Tags" label="Select Tags" apiId="' + this.apiIdTags + '" mode="multiselect-dropdown" searchPhrase="' + this._SfProject[0].querySelector('#sf-i-project').selectedTexts()[0] + '" selectProjection="name" mandatory></sf-i-form>';
            //html += '<input part="input" type="text" id="row-unmapped-input-multi-entry-tags"  />';
            html += '</td>';
            html += '<td part="td-head">';
            html += '<sf-i-form id="row-unmapped-input-multi-entry-users" name="Users" label="Select Users" apiId="' + this.apiIdUsers + '" mode="multiselect-dropdown" searchPhrase="' + this._SfProject[0].querySelector('#sf-i-project').selectedTexts()[0] + '" selectProjection="name" mandatory></sf-i-form>';
            //html += '<input part="input" type="text" id="row-unmapped-input-multi-entry-users"  />';
            html += '</td>';
            html += '<td>';
            html += '</td>';
            html += '</tr>';
            html += '</table>';
            html += '<div class="d-flex align-center mt-20 mb-20">';
            html += '<div class="mr-10" part="filter-title">Filter</div>';
            html += '<div class="pr-10 pt-5 pb-5" part="filter-title"><label><input name="row-unmapped-filter" id="row-unmapped-filter-all" type="radio"/>All</label></div>';
            html += '<div class="pr-10 pt-5 pb-5" part="filter-title"><label><input name="row-unmapped-filter" id="row-unmapped-filter-mapped" type="radio"/>Mapped</label></div>';
            html += '<div class="pr-10 pt-5 pb-5" part="filter-title"><label><input name="row-unmapped-filter" id="row-unmapped-filter-unmapped" type="radio"/>Un-mapped</label></div>';
            html += '</div>';
            html += '<div class="container-mapping-event">';
            for (var i = 0; i < unmappedEvents.length; i++) {
                // var moveOn = false;
                // if(filter != "all") {
                //   if(filter == "mapped") {
                //     if(this.mappedValuesUsers[i] == null || this.mappedValuesUsers[i] == "") {
                //       moveOn = true;
                //     }
                //   }
                //   if(filter == "unmapped") {
                //     if(this.mappedValuesUsers[i] != null && this.mappedValuesUsers[i] != "") {
                //       moveOn = true;
                //     }
                //   }
                // }
                // if(moveOn) {
                //   continue;
                // }
                console.log(unmappedEvents[i]);
                html += '<table id="row-unmapped-table' + i + '">';
                html += '<thead>';
                html += '<tr id="row-unmapped-head-' + i + '">';
                html += '<th part="td-head" class="left-sticky bg-left">';
                html += 'Select';
                html += '</th>';
                html += '<th part="td-head" class="bg-left ' + ((this.mappedValuesUsers[i] != null && this.mappedValuesUsers[i] != "") ? 'color-done' : 'color-pending') + '">';
                html += 'Status';
                html += '</th>';
                html += '<th part="td-head" class="bg-left col-date-head-' + i + '">';
                html += 'Duedate';
                html += '</th>';
                html += '<th part="td-head" class="bg-left col-tags-head-' + i + '">';
                html += 'Tags';
                html += '</th>';
                html += '<th part="td-head" class="bg-left">';
                html += 'Users';
                html += '</th>';
                for (var k = 0; k < Object.keys(unmappedEvents[i]).length; k++) {
                    if (this.getEventPreviewFields().includes(Object.keys(unmappedEvents[i])[k])) {
                        html += '<th part="td-head" class="bg-left">';
                        html += Object.keys(unmappedEvents[i])[k];
                        html += '</th>';
                    }
                }
                html += '<th id="th-expand-' + i + '" part="td-head">';
                html += '</th>';
                html += '</tr>';
                html += '</thead>';
                html += '<tbody>';
                html += '<tr id="row-unmapped-' + i + '">';
                html += '<td part="td-body" class="left-sticky">';
                html += '<input type="checkbox" class="input-checkbox" id="row-unmapped-select-' + i + '"/>';
                html += '</td>';
                html += '<td part="td-body" class="" id="row-unmapped-status-' + i + '">';
                html += '<span class="material-icons ' + ((this.mappedValuesUsers[i] != null && this.mappedValuesUsers[i] != "") ? 'color-done' : 'color-pending') + '">' + ((this.mappedValuesUsers[i] != null && this.mappedValuesUsers[i] != "") ? 'check_circle' : 'pending') + '</span>';
                html += '</td>';
                html += '<td part="td-body" class="col-date-' + i + '">';
                html += '<div class="d-flex align-center">';
                html += '<input part="input" type="text" id="row-unmapped-override-date-input-' + i + '" class="hide input-dates" value="' + (this.mappedValuesDueDates[i] != null ? this.mappedValuesDueDates[i] : '') + '"/>';
                html += '<div id="row-unmapped-override-date-div-' + i + '" class="div-dates">' + ((this.mappedValuesDueDates[i] != null && this.mappedValuesDueDates[i] != "") ? this.mappedValuesDueDates[i] : '') + '</div>';
                html += '</div>';
                html += '</td>';
                html += '<td part="td-body" class="col-tags-' + i + '">';
                html += '<sf-i-form id="row-unmapped-input-tags-' + i + '" class="hide input-tags" name="Tags" label="Select Tags" apiId="' + this.apiIdTags + '" mode="multiselect-dropdown" searchPhrase="' + this._SfProject[0].querySelector('#sf-i-project').selectedTexts()[0] + '" selectProjection="name" mandatory></sf-i-form>';
                //html += '<input part="input" type="text" id="row-unmapped-input-tags-'+i+'" class="hide input-tags" value="'+((this.mappedValuesTags[i] != null && this.mappedValuesTags[i] != "") ? this.mappedValuesTags[i] : '')+'"/>';
                html += '<div id="row-unmapped-div-tags-' + i + '" class="div-tags">' + ((this.mappedValuesTags[i] != null && this.mappedValuesTags[i] != "") ? this.mappedValuesTags[i] : '') + '</div>';
                html += '</td>';
                html += '<td part="td-body" class="">';
                html += '<sf-i-form id="row-unmapped-input-users-' + i + '" class="hide input-users" name="Users" label="Select Users" apiId="' + this.apiIdUsers + '" mode="multiselect-dropdown" searchPhrase="' + this._SfProject[0].querySelector('#sf-i-project').selectedTexts()[0] + '" selectProjection="name" mandatory></sf-i-form>';
                //html += '<input part="input" type="text" id="row-unmapped-input-users-'+i+'" class="hide input-users" value="'+((this.mappedValuesUsers[i] != null && this.mappedValuesUsers[i] != "") ? this.mappedValuesUsers[i] : '')+'"/>';
                html += '<div id="row-unmapped-div-users-' + i + '" class="div-users">' + ((this.mappedValuesUsers[i] != null && this.mappedValuesUsers[i] != "") ? this.mappedValuesUsers[i] : '') + '</div>';
                html += '</td>';
                for (var k = 0; k < Object.keys(unmappedEvents[i]).length; k++) {
                    if (this.getEventPreviewFields().includes(Object.keys(unmappedEvents[i])[k])) {
                        html += '<td part="td-body">';
                        if (unmappedEvents[i][Object.keys(unmappedEvents[i])[k]].indexOf("[") >= 0) {
                            html += this.getEventTexts(Object.keys(unmappedEvents[i])[k], JSON.parse(unmappedEvents[i][Object.keys(unmappedEvents[i])[k]]), unmappedEvents[i]);
                        }
                        else {
                            html += ' <sf-i-elastic-text text="' + unmappedEvents[i][Object.keys(unmappedEvents[i])[k]].replace(/"/g, "") + '" minLength="20"></sf-i-elastic-text>';
                        }
                        html += '</td>';
                    }
                }
                html += '<td id="td-expand-' + i + '" part="td-body">';
                html += '<button id="button-unmapped-expand-' + i + '" part="button-icon-small" class="material-icons">chevron_right</button>';
                html += '</td>';
                html += '</tr>';
                html += '</tbody>';
                html += '</table>';
            }
            html += '</div>';
            html += '<button id="button-back-add-mapping" part="button" class="invisible mb-20 mt-20">Save</button>';
            this._SfMappingContainer.innerHTML = html;
            for (var i = 0; i < unmappedEvents.length; i++) {
                // var moveOn = false;
                // if(filter != "all") {
                //   if(filter == "mapped") {
                //     if(this.mappedValuesUsers[i] == null || this.mappedValuesUsers[i] == "") {
                //       moveOn = true;
                //     }
                //   }
                //   if(filter == "unmapped") {
                //     if(this.mappedValuesUsers[i] != null && this.mappedValuesUsers[i] != "") {
                //       moveOn = true;
                //     }
                //   }
                // }
                // if(moveOn) {
                //   continue;
                // }
                (_a = this._SfMappingContainer.querySelector('#button-unmapped-expand-' + i)) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (ev) => {
                    const clickIndex = ev.target.id.split("-")[3];
                    console.log('clickindex', clickIndex);
                    this.renderExpandEvent(unmappedEvents, clickIndex);
                });
                this._SfMappingContainer.querySelector('#row-unmapped-select-' + i).addEventListener('change', (ev) => {
                    const clickIndex = ev.target.id.split("-")[3];
                    console.log('clickcheckbox', clickIndex);
                    if (this._SfMappingContainer.querySelector('#row-unmapped-select-' + clickIndex).checked) {
                        this._SfMappingContainer.querySelector('#row-unmapped-override-date-input-' + clickIndex).style.display = 'block';
                        this._SfMappingContainer.querySelector('#row-unmapped-override-date-div-' + clickIndex).style.display = 'none';
                        this._SfMappingContainer.querySelector('#row-unmapped-input-tags-' + clickIndex).style.display = 'block';
                        this._SfMappingContainer.querySelector('#row-unmapped-div-tags-' + clickIndex).style.display = 'none';
                        this._SfMappingContainer.querySelector('#row-unmapped-input-users-' + clickIndex).style.display = 'block';
                        this._SfMappingContainer.querySelector('#row-unmapped-div-users-' + clickIndex).style.display = 'none';
                    }
                    else {
                        this._SfMappingContainer.querySelector('#row-unmapped-override-date-input-' + clickIndex).style.display = 'none';
                        this._SfMappingContainer.querySelector('#row-unmapped-override-date-div-' + clickIndex).style.display = 'block';
                        this._SfMappingContainer.querySelector('#row-unmapped-input-tags-' + clickIndex).style.display = 'none';
                        this._SfMappingContainer.querySelector('#row-unmapped-div-tags-' + clickIndex).style.display = 'block';
                        this._SfMappingContainer.querySelector('#row-unmapped-input-users-' + clickIndex).style.display = 'none';
                        this._SfMappingContainer.querySelector('#row-unmapped-div-users-' + clickIndex).style.display = 'block';
                    }
                    if (this.checkAndShowBulk()) {
                        this._SfMappingContainer.querySelector('#row-unmapped-table-multi-entry').style.display = 'flex';
                    }
                    else {
                        this._SfMappingContainer.querySelector('#row-unmapped-table-multi-entry').style.display = 'none';
                    }
                });
                (_b = this._SfMappingContainer.querySelector('#row-unmapped-override-date-input-' + i)) === null || _b === void 0 ? void 0 : _b.addEventListener('keyup', (ev) => {
                    const clickIndex = ev.target.id.split("-")[5];
                    const div = this._SfMappingContainer.querySelector('#row-unmapped-override-date-div-' + clickIndex);
                    const input = this._SfMappingContainer.querySelector('#row-unmapped-override-date-input-' + clickIndex);
                    div.innerHTML = input.value;
                    this.mappedValuesDueDates[clickIndex] = input.value;
                });
                (_c = this._SfMappingContainer.querySelector('#row-unmapped-input-tags-' + i)) === null || _c === void 0 ? void 0 : _c.addEventListener('valueChanged', (ev) => {
                    const clickIndex = ev.target.id.split("-")[4];
                    const form = this._SfMappingContainer.querySelector('#row-unmapped-input-tags-' + clickIndex);
                    const div = this._SfMappingContainer.querySelector('#row-unmapped-div-tags-' + clickIndex);
                    div.innerHTML = '';
                    var html = '';
                    for (var i = 0; i < form.selectedValues().length; i++) {
                        html += form.selectedValues()[i];
                        if (i < (form.selectedValues().length - 1)) {
                            html += ",";
                        }
                    }
                    div.innerHTML = '<sf-i-elastic-text text="' + html + '" minLength="20"></sf-i-elastic-text>';
                    this.mappedValuesTags[clickIndex] = form.selectedValues();
                    // const div = ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-div-tags-'+clickIndex) as HTMLDivElement);
                    // const input = ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-input-tags-'+clickIndex) as HTMLInputElement);
                    // div.innerHTML = input.value;
                });
                (_d = this._SfMappingContainer.querySelector('#row-unmapped-input-users-' + i)) === null || _d === void 0 ? void 0 : _d.addEventListener('valueChanged', (ev) => {
                    const clickIndex = ev.target.id.split("-")[4];
                    const form = this._SfMappingContainer.querySelector('#row-unmapped-input-users-' + clickIndex);
                    console.log('valuechanged called', form.selectedValues());
                    const div = this._SfMappingContainer.querySelector('#row-unmapped-div-users-' + clickIndex);
                    div.innerHTML = '';
                    var html = '';
                    for (var i = 0; i < form.selectedValues().length; i++) {
                        html += form.selectedValues()[i];
                        if (i < (form.selectedValues().length - 1)) {
                            html += ",";
                        }
                    }
                    div.innerHTML = '<sf-i-elastic-text text="' + html + '" minLength="20"></sf-i-elastic-text>';
                    this.mappedValuesUsers[clickIndex] = form.selectedValues();
                    this.updateMappingStatus(form.selectedValues(), clickIndex);
                    this.calculateAndShowSummary();
                });
            }
            (_e = this._SfMappingContainer.querySelector('#row-unmapped-input-multi-entry-users')) === null || _e === void 0 ? void 0 : _e.addEventListener('valueChanged', () => {
                const input = this._SfMappingContainer.querySelector('#row-unmapped-input-multi-entry-users');
                console.log('valuechanged users', input.selectedValues());
                this.updateInAllSelections("users", input.selectedValues());
            });
            (_f = this._SfMappingContainer.querySelector('#row-unmapped-input-multi-entry-date')) === null || _f === void 0 ? void 0 : _f.addEventListener('keyup', () => {
                const input = this._SfMappingContainer.querySelector('#row-unmapped-input-multi-entry-date');
                this.updateInAllSelections("duedate", input.value);
            });
            (_g = this._SfMappingContainer.querySelector('#row-unmapped-input-multi-entry-tags')) === null || _g === void 0 ? void 0 : _g.addEventListener('valueChanged', () => {
                const input = this._SfMappingContainer.querySelector('#row-unmapped-input-multi-entry-tags');
                this.updateInAllSelections("tags", input.selectedValues());
            });
            this._SfMappingContainer.querySelector('#row-unmapped-filter-all').addEventListener('change', () => {
                const input = this._SfMappingContainer.querySelector('#row-unmapped-filter-all');
                if (input.checked) {
                    this.showAllEvents();
                }
            });
            this._SfMappingContainer.querySelector('#row-unmapped-filter-mapped').addEventListener('change', () => {
                const input = this._SfMappingContainer.querySelector('#row-unmapped-filter-mapped');
                if (input.checked) {
                    this.showMappedEvents();
                }
            });
            this._SfMappingContainer.querySelector('#row-unmapped-filter-unmapped').addEventListener('change', () => {
                const input = this._SfMappingContainer.querySelector('#row-unmapped-filter-unmapped');
                if (input.checked) {
                    this.showUnmappedEvents();
                }
            });
            this._SfMappingContainer.querySelector('#row-unmapped-table-multi-entry-cancel').addEventListener('click', () => {
                this._SfMappingContainer.querySelector('#row-unmapped-table-multi-entry').style.display = 'none';
                this.clearAllMappingSelections();
            });
            this._SfMappingContainer.querySelector('#button-back-add-mapping').addEventListener('click', async () => {
                this.uploadMapping();
            });
        };
        this.applyFilter = (filter = "all") => {
            for (var i = 0; i < this.unmappedEvents.length; i++) {
                if (filter == "mapped") {
                    if (this.mappedValuesUsers[i] != null && this.mappedValuesUsers[i] != "") {
                        this._SfMappingContainer.querySelector('#row-unmapped-table' + i).style.display = 'block';
                    }
                    else {
                        this._SfMappingContainer.querySelector('#row-unmapped-table' + i).style.display = 'none';
                    }
                }
                if (filter == "unmapped") {
                    if (this.mappedValuesUsers[i] == null || this.mappedValuesUsers[i] == "") {
                        this._SfMappingContainer.querySelector('#row-unmapped-table' + i).style.display = 'block';
                    }
                    else {
                        this._SfMappingContainer.querySelector('#row-unmapped-table' + i).style.display = 'none';
                    }
                }
                if (filter == "all") {
                    this._SfMappingContainer.querySelector('#row-unmapped-table' + i).style.display = 'block';
                }
                if (this.myRole == this.TAB_APPROVER) {
                    this._SfMappingContainer.querySelectorAll('.col-date')[0].style.display = 'none';
                    this._SfMappingContainer.querySelectorAll('.col-date')[1].style.display = 'none';
                    this._SfMappingContainer.querySelector('.col-date-' + i).style.display = 'none';
                    this._SfMappingContainer.querySelector('.col-date-head-' + i).style.display = 'none';
                    this._SfMappingContainer.querySelectorAll('.col-tags')[0].style.display = 'none';
                    this._SfMappingContainer.querySelectorAll('.col-tags')[1].style.display = 'none';
                    this._SfMappingContainer.querySelector('.col-tags-' + i).style.display = 'none';
                    this._SfMappingContainer.querySelector('.col-tags-head-' + i).style.display = 'none';
                }
                else {
                    this._SfMappingContainer.querySelectorAll('.col-date')[0].style.display = 'table-cell';
                    this._SfMappingContainer.querySelectorAll('.col-date')[1].style.display = 'table-cell';
                    this._SfMappingContainer.querySelector('.col-date-' + i).style.display = 'table-cell';
                    this._SfMappingContainer.querySelector('.col-date-head-' + i).style.display = 'table-cell';
                    this._SfMappingContainer.querySelectorAll('.col-tags')[0].style.display = 'table-cell';
                    this._SfMappingContainer.querySelectorAll('.col-tags')[1].style.display = 'table-cell';
                    this._SfMappingContainer.querySelector('.col-tags-' + i).style.display = 'table-cell';
                    this._SfMappingContainer.querySelector('.col-tags-head-' + i).style.display = 'table-cell';
                }
            }
            if (filter == "all") {
                this._SfMappingContainer.querySelector('#row-unmapped-filter-all').checked = true;
            }
            if (filter == "mapped") {
                this._SfMappingContainer.querySelector('#row-unmapped-filter-mapped').checked = true;
            }
            if (filter == "unmapped") {
                this._SfMappingContainer.querySelector('#row-unmapped-filter-unmapped').checked = true;
            }
        };
        this.getIndexFromId = (id) => {
            for (var i = 0; i < this.unmappedEvents.length; i++) {
                if (this.unmappedEvents[i].id == id) {
                    return i;
                }
            }
            return -1;
        };
        this.prepopulateMapping = (mappings) => {
            console.log('mappings5', mappings, this.mappedValuesUsers);
            if (mappings == null) {
                return;
            }
            for (var i = 0; i < Object.keys(mappings.duedates).length; i++) {
                const eventId = Object.keys(mappings.duedates)[i];
                const index = this.getIndexFromId(eventId);
                if (index >= 0) {
                    this.mappedValuesDueDates[index] = mappings.duedates[eventId];
                }
            }
            for (var i = 0; i < Object.keys(mappings.tags).length; i++) {
                const eventId = Object.keys(mappings.tags)[i];
                const index = this.getIndexFromId(eventId);
                if (index >= 0) {
                    this.mappedValuesTags[index] = mappings.tags[eventId];
                }
            }
            for (var i = 0; i < Object.keys(mappings.users).length; i++) {
                const eventId = Object.keys(mappings.users)[i];
                const index = this.getIndexFromId(eventId);
                console.log('mapping users', index);
                if (index >= 0) {
                    this.mappedValuesUsers[index] = mappings.users[eventId];
                }
            }
            console.log(this.mappedValuesDueDates);
            console.log(this.mappedValuesTags);
            console.log(this.mappedValuesUsers);
            for (var i = 0; i < this.unmappedEvents.length; i++) {
                this._SfMappingContainer.querySelector('#row-unmapped-override-date-div-' + i).innerHTML = (this.mappedValuesDueDates[i] != null && this.mappedValuesDueDates[i] != "") ? this.mappedValuesDueDates[i] : "";
                this._SfMappingContainer.querySelector('#row-unmapped-override-date-input-' + i).value = (this.mappedValuesDueDates[i] != null && this.mappedValuesDueDates[i] != "") ? this.mappedValuesDueDates[i] : "";
                if (this.mappedValuesTags[i] != null) {
                    var html = '';
                    for (var j = 0; j < this.mappedValuesTags[i].length; j++) {
                        html += this.mappedValuesTags[i][j];
                        if (j < (this.mappedValuesTags[i].length - 1)) {
                            html += ',';
                        }
                    }
                    this._SfMappingContainer.querySelector('#row-unmapped-div-tags-' + i).innerHTML = '<sf-i-elastic-text text="' + html + '" minLength="20"></sf-i-elastic-text>';
                    this._SfMappingContainer.querySelector('#row-unmapped-input-tags-' + i).preselectedValues = JSON.stringify(this.mappedValuesTags[i]);
                    //((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-input-tags-'+i) as SfIForm)!.populatePreselected();
                }
                if (this.mappedValuesUsers[i] != null) {
                    html = '';
                    for (var j = 0; j < this.mappedValuesUsers[i].length; j++) {
                        html += this.mappedValuesUsers[i][j];
                        if (j < (this.mappedValuesUsers[i].length - 1)) {
                            html += ',';
                        }
                    }
                    this._SfMappingContainer.querySelector('#row-unmapped-div-users-' + i).innerHTML = '<sf-i-elastic-text text="' + html + '" minLength="20"></sf-i-elastic-text>';
                    this._SfMappingContainer.querySelector('#row-unmapped-input-users-' + i).preselectedValues = JSON.stringify(this.mappedValuesUsers[i]);
                    //((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-input-users-'+i) as SfIForm)!.populatePreselected();
                }
                if (this.mappedValuesUsers[i] != null) {
                    this._SfMappingContainer.querySelector('#row-unmapped-status-' + i).innerHTML = '<span class="material-icons color-done">check_circle</span>';
                }
                else {
                    this._SfMappingContainer.querySelector('#row-unmapped-status-' + i).innerHTML = '<span class="material-icons color-pending">pending</span>';
                }
            }
            this.calculateAndShowSummary();
        };
        this.clearAllMappingSelections = () => {
            const inputArr = this._SfMappingContainer.querySelectorAll('.input-checkbox');
            for (var i = 0; i < inputArr.length; i++) {
                if (inputArr[i].checked) {
                    inputArr[i].checked = false;
                    inputArr[i].dispatchEvent(new Event('change'));
                }
            }
        };
        this.clearAllCalendars = () => {
            //(this._SfCalendarContainer as HTMLDivElement).innerHTML = "";
            this._SfStreamContainer.innerHTML = "";
            this._SfUpcomingContainer.innerHTML = "";
            this._SfThisContainer.innerHTML = "";
            this._SfPastContainer.innerHTML = "";
            this._SfCustomContainer.innerHTML = "";
            this._SfAdhocContainer.innerHTML = "";
        };
        this.transformMappingsForUpload = (mapping) => {
            const duedates = mapping.duedates;
            const tags = mapping.tags;
            const users = mapping.users;
            const transformedDuedates = {};
            const transformedTags = {};
            const transformedUsers = {};
            console.log('unmappedevents[i] duedates', duedates);
            for (var i = 0; i < Object.keys(duedates).length; i++) {
                console.log('unmappedevents[i]', i, this.unmappedEvents[i]);
                const index = Object.keys(duedates)[i];
                const eventId = this.unmappedEvents[i].id;
                transformedDuedates[eventId] = duedates[index];
            }
            for (var i = 0; i < Object.keys(tags).length; i++) {
                const index = Object.keys(tags)[i];
                const eventId = this.unmappedEvents[i].id;
                transformedTags[eventId] = tags[index];
            }
            for (var i = 0; i < Object.keys(users).length; i++) {
                const index = Object.keys(users)[i];
                const eventId = this.unmappedEvents[i].id;
                transformedUsers[eventId] = users[index];
            }
            return {
                duedates: transformedDuedates,
                tags: transformedTags,
                users: transformedUsers
            };
        };
        this.uploadInternalControlsMapping = async (data) => {
            console.log('uploading..', data);
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/updatemappedinternalcontrols";
            const body = {
                "projectid": this.projectId,
                "data": JSON.stringify(data)
            };
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log('jsonResponse sync', jsonRespose);
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
                setTimeout(() => {
                    this.clearMessages();
                }, 2000);
            }
        };
        this.uploadAlertSchedulesMapping = async (data) => {
            console.log('uploading..', data);
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/updatemappedalertschedules";
            const body = {
                "projectid": this.projectId,
                "data": JSON.stringify(data)
            };
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log('jsonResponse sync', jsonRespose);
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
                setTimeout(() => {
                    this.clearMessages();
                }, 2000);
            }
        };
        this.uploadDuedatesMapping = async (data) => {
            console.log('uploading..', data);
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/updatemappedduedates";
            const body = {
                "projectid": this.projectId,
                "data": JSON.stringify(data)
            };
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log('jsonResponse sync', jsonRespose);
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
                setTimeout(() => {
                    this.clearMessages();
                }, 2000);
            }
        };
        this.uploadApproversMapping = async (data) => {
            console.log('uploading..', data);
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/updatemappedapprovers";
            const body = {
                "projectid": this.projectId,
                "data": JSON.stringify(data)
            };
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log('jsonResponse sync', jsonRespose);
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
                setTimeout(() => {
                    this.clearMessages();
                }, 2000);
            }
        };
        this.uploadReportersMapping = async (data) => {
            console.log('uploading..', data);
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/updatemappedreporters";
            const body = {
                "projectid": this.projectId,
                "data": JSON.stringify(data)
            };
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log('jsonResponse sync', jsonRespose);
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
                setTimeout(() => {
                    this.clearMessages();
                }, 2000);
            }
        };
        this.uploadTagsMapping = async (data) => {
            console.log('uploading..', data);
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/updatemappedtags";
            const body = {
                "projectid": this.projectId,
                "data": JSON.stringify(data)
            };
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log('jsonResponse sync', jsonRespose);
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
                setTimeout(() => {
                    this.clearMessages();
                }, 2000);
            }
        };
        this.uploadFunctionsMapping = async (data) => {
            console.log('uploading..', data);
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/updatemappedfunctions";
            const body = {
                "projectid": this.projectId,
                "data": JSON.stringify(data)
            };
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log('jsonResponse sync', jsonRespose);
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
                setTimeout(() => {
                    this.clearMessages();
                }, 2000);
            }
        };
        this.uploadLocationsMapping = async (data) => {
            console.log('uploading..', data);
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/updatemappedlocations";
            const body = {
                "projectid": this.projectId,
                "data": JSON.stringify(data)
            };
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log('jsonResponse sync', jsonRespose);
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
                setTimeout(() => {
                    this.clearMessages();
                }, 2000);
            }
        };
        this.uploadEntitiesMapping = async (data) => {
            console.log('uploading..', data);
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/updatemappedentities";
            const body = {
                "projectid": this.projectId,
                "data": JSON.stringify(data)
            };
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log('jsonResponse sync', jsonRespose);
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
                setTimeout(() => {
                    this.clearMessages();
                }, 2000);
            }
        };
        this.uploadCountriesMapping = async (data) => {
            console.log('uploading..', data);
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/updatemappedcountries";
            const body = {
                "projectid": this.projectId,
                "data": JSON.stringify(data)
            };
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log('jsonResponse sync', jsonRespose);
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
                setTimeout(() => {
                    this.clearMessages();
                }, 2000);
            }
        };
        this.uploadCompliancesMapping = async (data) => {
            console.log('uploading..', data);
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/updatemappedcompliances";
            const body = {
                "projectid": this.projectId,
                "data": JSON.stringify(data)
            };
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log('jsonResponse sync', jsonRespose);
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
                setTimeout(() => {
                    this.clearMessages();
                }, 2000);
            }
        };
        this.uploadStatutesMapping = async (data) => {
            console.log('uploading..', data);
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/updatemappedstatutes";
            var searchstring = '';
            for (var i = 0; i < data.mappings.length; i++) {
                const dataItem = JSON.parse(data.mappings[i].data);
                console.log(dataItem[3]);
                searchstring += dataItem[3];
                if (i < (data.mappings.length - 1)) {
                    searchstring += '|';
                }
            }
            const body = {
                "projectid": this.projectId,
                "data": JSON.stringify(data),
                "compliancessearchstring": searchstring
            };
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log('jsonResponse sync', jsonRespose);
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
                setTimeout(() => {
                    this.clearMessages();
                }, 2000);
            }
        };
        this.uploadUnTriggerEvent = async (eventid, mmdd) => {
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/untriggermyevent";
            const body = {
                "mmdd": mmdd,
                "projectid": this.projectId,
                "eventid": eventid,
                "entityid": this.entityId,
                "locationid": this.locationId
            };
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log('jsonResponse sync', jsonRespose);
                this.setSuccess("Event untriggered successfully!");
                await this.fetchUserCalendar_2();
                setTimeout(() => {
                    this.clearMessages();
                    this.renderTabs(this.TAB_ADHOC);
                    this.renderAdhoc();
                }, 2000);
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
                setTimeout(() => {
                    this.clearMessages();
                }, 2000);
            }
        };
        this.uploadTriggerEvent = async (locationId, eventid, dateofoccurrence) => {
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/triggermyevent";
            const body = {
                "dateofoccurrence": dateofoccurrence,
                "projectid": this.projectId,
                "eventid": eventid,
                "entityid": this.entityId,
                "locationid": locationId
            };
            console.log('uploading...', body);
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log('jsonResponse sync', jsonRespose);
                this.setSuccess("Event triggered successfully!");
                await this.fetchUserCalendar_2();
                setTimeout(() => {
                    this.clearMessages();
                    this.renderTabs(this.TAB_ADHOC);
                    this.renderAdhoc();
                }, 2000);
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
                setTimeout(() => {
                    this.clearMessages();
                }, 2000);
            }
        };
        this.uploadReview = async (mmddyyyy, eventid, comments, approved) => {
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/uploadreview";
            const body = {
                "mmddyyyy": mmddyyyy,
                "projectid": this.projectId,
                "type": "review",
                "eventid": eventid,
                "comments": comments,
                "approved": approved,
                "entityid": this.entityId,
                "locationid": this.locationId
            };
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log('jsonResponse sync', jsonRespose);
                this.setSuccess("Report uploaded successfully!");
                setTimeout(() => {
                    this.clearMessages();
                    // this.showChosenMapping();
                    // this.fetchEventMap();
                    // if(this.myRole == this.TAB_REPORTER) {
                    //   this.renderMappingTabs(this.TAB_REPORTER);
                    // } else {
                    //   this.renderMappingTabs(this.TAB_APPROVER);
                    // }
                }, 2000);
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.uploadReport = async (mmddyyyy, eventid, comments, doc, docs) => {
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/uploadreport";
            const body = {
                "mmddyyyy": mmddyyyy,
                "projectid": this.projectId,
                "type": "report",
                "eventid": eventid,
                "comments": comments,
                "dateofcompletion": doc,
                "entityid": this.entityId,
                "locationid": this.locationId,
                "docs": JSON.stringify(docs)
            };
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log('jsonResponse sync', jsonRespose);
                this.setSuccess("Report uploaded successfully!");
                setTimeout(() => {
                    this.clearMessages();
                    // this.showChosenMapping();
                    // this.fetchEventMap();
                    // if(this.myRole == this.TAB_REPORTER) {
                    //   this.renderMappingTabs(this.TAB_REPORTER);
                    // } else {
                    //   this.renderMappingTabs(this.TAB_APPROVER);
                    // }
                }, 2000);
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.uploadMapping = async () => {
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/mapevents";
            const mapping = this.transformMappingsForUpload({
                duedates: this.mappedValuesDueDates,
                tags: this.mappedValuesTags,
                users: this.mappedValuesUsers
            });
            const body = { "projectid": this._SfProject[0].querySelector('#sf-i-project').selectedValues()[0], "role": this.myRole, "mapping": JSON.stringify(mapping) };
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log('jsonResponse sync', jsonRespose);
                this.setSuccess("Mapping uploaded successfully!");
                setTimeout(() => {
                    this.clearMessages();
                    this.showChosenMapping();
                    this.fetchEventMap();
                    if (this.myRole == this.TAB_REPORTER) {
                        this.renderMappingTabs(this.TAB_REPORTER);
                    }
                    else {
                        this.renderMappingTabs(this.TAB_APPROVER);
                    }
                }, 2000);
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.uploadEvents = async () => {
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/synccalendar";
            const body = { "projectid": this._SfProject[0].querySelector('#sf-i-project').selectedValues()[0], "events": JSON.stringify(this.events) };
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log('jsonResponse sync', jsonRespose);
                // this.loadMode();
                this.showChosenMapping();
                this.fetchEventMap();
                this.renderMappingTabs(this.TAB_REPORTER);
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.uploadReprogramTrigger = async (eventid, timestamp) => {
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/reprogramtrigger";
            const body = { "projectid": this._SfProject[0].querySelector('#sf-i-project').selectedValues()[0], "eventid": eventid, "timestamp": timestamp + "" };
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log('jsonResponse sync', jsonRespose);
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.processEvent = (value) => {
            console.log('processing due date', value);
            console.log('processing due date', value.duedate.replace(/['"]+/g, ''));
            console.log('processing due date', this.mappings);
            var duedate = value.duedate;
            if (this.mappings != null && this.mappings.duedates != null && this.mappings.duedates[value.id] != null && this.mappings.duedates[value.id] != "") {
                duedate = this.mappings.duedates[value.id];
            }
            const duedateArr = duedate.replace(/['"]+/g, '').split(",");
            const startMonth = parseInt(this.calendarStartMM);
            for (var i = 0; i < duedateArr.length; i++) {
                const dateArr = duedateArr[i].split("/");
                console.log('datearr', dateArr);
                if (dateArr[2] == "*") {
                    if (dateArr[1] == "*") {
                        var j = startMonth;
                        while (true) {
                            console.log('processing event', dateArr[2], dateArr[1], j);
                            const mmdd = ("0" + j).slice(-2) + "/" + ("0" + dateArr[0]).slice(-2);
                            if (this.events == null) {
                                this.events = {};
                            }
                            if (this.events[mmdd] == null) {
                                this.events[mmdd] = [];
                            }
                            this.events[mmdd].push(value);
                            if (startMonth !== 12) {
                                if (j === (startMonth - 1)) {
                                    break;
                                }
                            }
                            j++;
                            if (j === 13) {
                                j = 0;
                            }
                        }
                    }
                    else {
                        const mmdd = ("0" + (parseInt(dateArr[1]))).slice(-2) + "/" + ("0" + dateArr[0]).slice(-2);
                        if (this.events == null) {
                            this.events = {};
                        }
                        if (this.events[mmdd] == null) {
                            this.events[mmdd] = [];
                        }
                        this.events[mmdd].push(value);
                    }
                }
                else {
                    if ((new Date().getFullYear() + "") == dateArr[2]) {
                        const mmdd = ("0" + (parseInt(dateArr[1]))).slice(-2) + "/" + ("0" + dateArr[0]).slice(-2);
                        if (this.events == null) {
                            this.events = {};
                        }
                        if (this.events[mmdd] == null) {
                            this.events[mmdd] = [];
                        }
                        this.events[mmdd].push(value);
                    }
                }
            }
            console.log('calendar processed', this.calendar);
            console.log('event processed', this.events);
        };
        this.renderChosenProject = (events = null) => {
            if (events == null) {
                var html = '';
                html += '<div class="lb"></div>';
                html += '<div class="d-flex justify-between align-center">';
                html += '<div class="muted">Calender doesn\'t exist! &nbsp; &nbsp;</div>';
                html += '<button id="button-generate-chosen-project" part="button">Generate</button>';
                html += '</div>';
                html += '<div class="rb"></div>';
                this._SfContainerChosenProject.innerHTML = html;
                this._SfContainerChosenProject.querySelector('#button-generate-chosen-project').addEventListener('click', async () => {
                    await this.fetchList();
                });
            }
            else {
            }
        };
        this.fetchSearchStatutes = async (searchString, cursor = "") => {
            let url = "https://" + this.apiIdStatutes + ".execute-api.us-east-1.amazonaws.com/test/list";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "searchstring": searchString, "cursor": cursor }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchSearchCompliances = async (searchString, cursor = "") => {
            let url = "https://" + this.apiIdCompliances + ".execute-api.us-east-1.amazonaws.com/test/list";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "searchstring": searchString, "cursor": cursor }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchMappedLocations = async () => {
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/getmappedlocations";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchMappedFunctions = async () => {
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/getmappedfunctions";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchMappedCompliances = async () => {
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/getmappedcompliances";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchMappedSerializedAlertSchedules = async () => {
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/getmappedserializedalertschedules";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchMappedSerializedDuedates = async () => {
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/getmappedserializedduedates";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchMappedSerializedApprovers = async () => {
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/getmappedserializedapprovers";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchMappedSerializedReporters = async () => {
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/getmappedserializedreporters";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchMappedSerializedTags = async () => {
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/getmappedserializedtags";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchMappedSerializedLocations = async () => {
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/getmappedserializedlocations";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchMappedSerializedFunctions = async () => {
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/getmappedserializedfunctions";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchMappedSerializedEntities = async () => {
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/getmappedserializedentities";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchMappedSerializedCountries = async () => {
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/getmappedserializedcountries";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchMappedInternalControls = async () => {
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/getmappedinternalcontrols";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchMappedAlertSchedules = async () => {
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/getmappedalertschedules";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchMappedDuedates = async () => {
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/getmappedduedates";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchMappedReporters = async () => {
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/getmappedreporters";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchMappedApprovers = async () => {
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/getmappedapprovers";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchMappedTags = async () => {
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/getmappedtags";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchMappedCountries = async () => {
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/getmappedcountries";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchMappedEntities = async () => {
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/getmappedentities";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchMappedStatutes = async () => {
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/getmappedstatutes";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchCalendarJobs = async () => {
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/getcalendarjobs";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log(jsonRespose);
                return jsonRespose;
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchDetail = async (value) => {
            const body = this.getApiBodyList();
            body.id = value;
            console.log('detail', value, body);
            let url = "https://" + this.apiIdDetail + ".execute-api.us-east-1.amazonaws.com/test/" + this.apiMethodDetail;
            console.log('fetch events detail url', url);
            console.log('fetch events detail body', body);
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log('jsonResponse fetch events detail', jsonRespose.data.value.duedate);
                this.processEvent(jsonRespose.data.value);
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchGetMappedCalendar = async () => {
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/getmappedcalendar";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            this.prepareXhr({ "projectid": this.projectId }, url, this._SfLoader, authorization);
            this.setSuccess('Operation triggered! It will complete in the background in a few minutes...');
            setTimeout(() => {
                this.clearMessages();
                this._SfLoader.innerHTML = '';
            }, 3000);
        };
        this.foundCalendarInLocal = () => {
            const localKey = this.projectId + ';' + this.userProfileId + ';' + this.entityId + ';' + this.locationId;
            var foundInLocal = false;
            if (localStorage.getItem(localKey) != null) {
                if (localStorage.getItem(localKey) != "") {
                    foundInLocal = true;
                }
            }
            return foundInLocal;
        };
        this.getLocalKey = () => {
            const localKey = this.projectId + ';' + this.userProfileId + ';' + this.entityId + ';' + this.locationId;
            return localKey;
        };
        this.cleanLocalStorage = () => {
            const delKeys = [];
            for (var i = 0; i < localStorage.length; i++) {
                if (localStorage.key(i) != this.getLocalKey()) {
                    delKeys.push(localStorage.key(i));
                }
            }
            for (var i = 0; i < delKeys.length; i++) {
                localStorage.removeItem(delKeys[i] || "");
            }
        };
        this.fetchUserCalendar_2 = async () => {
            if (this.foundCalendarInLocal()) {
                const jsonRespose = JSON.parse(localStorage.getItem(this.getLocalKey()) || "");
                this.showChosenProject();
                console.log(jsonRespose);
                this.events = (jsonRespose.data.events);
                if (this.events != null) {
                    this.renderTabs(this.TAB_YEAR);
                    this.renderCalendar();
                }
            }
            this.cleanLocalStorage();
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/" + ((this.locationId != null && this.locationId != "") ? "getmyevents" : "getallmyevents");
            console.log('fetch calendar url', url);
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId, "userprofileid": this.userProfileId, "role": this.myRole, "entityid": this.entityId, "locationid": this.locationId, "adhoc": "false" }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log('foundinlocal', this.foundCalendarInLocal());
                if (this.foundCalendarInLocal()) {
                    this.events = (jsonRespose.data.events);
                }
                else {
                    this.showChosenProject();
                    console.log(jsonRespose);
                    this.events = (jsonRespose.data.events);
                    if (this.events != null) {
                        this.renderTabs(this.TAB_YEAR);
                        this.renderCalendar();
                    }
                }
                localStorage.setItem(this.getLocalKey(), xhr.responseText);
            }
            else {
                if (xhr.status === 404) {
                    this.showChosenProject();
                    this._SfTitleChosenProject.innerHTML = this._SfProject[0].querySelector('#sf-i-project').selectedTexts()[0];
                    this.renderChosenProject();
                }
                else {
                    const jsonRespose = JSON.parse(xhr.responseText);
                    this.setError(jsonRespose.error);
                }
            }
        };
        this.fetchUserCalendar = async () => {
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/getuserevents";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId, "userprofileid": this.userProfileId, "role": this.myRole }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.showChosenProject();
                console.log(jsonRespose);
                this.events = (jsonRespose.data.events);
                if (this.events != null) {
                    this.renderTabs(this.TAB_YEAR);
                    this.renderCalendar();
                }
                // this.renderChosenProject(events);
            }
            else {
                if (xhr.status === 404) {
                    this.showChosenProject();
                    this._SfTitleChosenProject.innerHTML = this._SfProject[0].querySelector('#sf-i-project').selectedTexts()[0];
                    this.renderChosenProject();
                }
                else {
                    const jsonRespose = JSON.parse(xhr.responseText);
                    this.setError(jsonRespose.error);
                }
            }
        };
        this.fetchCalendar = async () => {
            //this.apiBodyList = '{"id": "' +(this._SfProject[0].querySelector('#sf-i-project') as SfIForm).selectedValues()[0]+ '"}'
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/getcalendar";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this._SfProject[0].querySelector('#sf-i-project').selectedValues()[0] }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.showChosenProject();
                this._SfTitleChosenProject.innerHTML = this.truncate(this._SfProject[0].querySelector('#sf-i-project').selectedTexts()[0], 20, true);
                this.events = JSON.parse(jsonRespose.data.value.events);
                // console.log(events);
                if (this.events != null) {
                    this.renderTabs(this.TAB_YEAR);
                    this.renderCalendar();
                }
                // this.renderChosenProject(events);
            }
            else {
                if (xhr.status === 404) {
                    this.showChosenProject();
                    this._SfTitleChosenProject.innerHTML = this._SfProject[0].querySelector('#sf-i-project').selectedTexts()[0];
                    this.renderChosenProject();
                }
                else {
                    const jsonRespose = JSON.parse(xhr.responseText);
                    this.setError(jsonRespose.error);
                }
            }
        };
        this.fetchReprogramAdhoc = async () => {
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/reprogramtrigger";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.mode == "admin" ? this._SfProject[0].querySelector('#sf-i-project').selectedValues()[0] : this.projectId }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log(jsonRespose);
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
                this.fetchList();
                setTimeout(() => {
                    this.clearMessages();
                }, 3000);
            }
        };
        this.fetchAdhoc = async (reprogramTriggers = false) => {
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/" + ((this.locationId != null && this.locationId != "") ? "getmyevents" : "getallmyevents");
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this.projectId, "userprofileid": this.userProfileId, "role": this.myRole, "entityid": this.entityId, "locationid": this.locationId, "adhoc": "true" }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log(jsonRespose);
                this.unmappedEvents = jsonRespose.data.unmappedEvents;
                this.mappings = jsonRespose.data.mappings;
                this.triggers = jsonRespose.data.triggers;
                if (!reprogramTriggers) {
                    this.renderAdhoc(this.unmappedEvents, this.triggers);
                }
                else {
                    // await this.processTriggers(this.triggers);
                }
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
                this.fetchList();
                setTimeout(() => {
                    this.clearMessages();
                }, 3000);
            }
        };
        this.fetchEventMap = async () => {
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/getunmappedevents";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "projectid": this._SfProject[0].querySelector('#sf-i-project').selectedValues()[0], "role": this.myRole }, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log(jsonRespose);
                this.unmappedEvents = jsonRespose.data.unmappedEvents;
                this.mappings = jsonRespose.data.mappings;
                console.log('mappings-1', 'fetcheventmap', this.mappings);
                console.log('mappings0', 'fetcheventmap', this.mappedValuesUsers);
                this.renderMapping(this.unmappedEvents);
                console.log('mappings1', 'fetcheventmap', this.mappedValuesUsers);
                this.prepopulateMapping(this.mappings);
                console.log('mappings2', 'fetcheventmap', this.mappedValuesUsers);
                this.applyFilter();
                if (jsonRespose.data.mappings != null && this.myRole != this.TAB_APPROVER) {
                    this._SfButtonBackCalendarMapping.style.visibility = 'visible';
                }
                else {
                    this._SfButtonBackCalendarMapping.style.visibility = 'hidden';
                }
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
                this.fetchList();
                setTimeout(() => {
                    this.clearMessages();
                }, 3000);
            }
        };
        this.fetchList = async () => {
            console.log('calendar fetching list', this.apiIdList);
            const body = this.getApiBodyList();
            if (this.apiIdList != null) {
                body.id = this._SfProject[0].querySelector('#sf-i-project').selectedValues()[0];
                let url = "https://" + this.apiIdList + ".execute-api.us-east-1.amazonaws.com/test/" + this.apiMethodList;
                console.log('fetch events url', url);
                const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
                const xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
                this._SfLoader.innerHTML = '';
                console.log('fetch events body', body);
                if (xhr.status == 200) {
                    const jsonRespose = JSON.parse(xhr.responseText);
                    console.log('list response', JSON.stringify(jsonRespose));
                    const fieldArr = JSON.parse(jsonRespose.data.value[this.apiResponseFieldList]);
                    this.events = null;
                    for (var i = 0; i < fieldArr.length; i++) {
                        console.log('events', fieldArr[i]);
                        await this.fetchDetail(fieldArr[i]);
                    }
                    console.log('all events processed');
                    await this.uploadEvents();
                    await this.fetchReprogramAdhoc();
                    //await this.fetchAdhoc(true);
                }
                else {
                    const jsonRespose = JSON.parse(xhr.responseText);
                    this.setError(jsonRespose.error);
                }
            }
        };
        this.initCalendar = async () => {
            var newDate = null;
            var newMonth = null;
            var newYear = null;
            var startDate = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + this.calendarStartYYYY);
            console.log('startDate', startDate);
            do {
                this.calendar.push(startDate);
                startDate.setDate(startDate.getDate() + 1);
                newDate = ("0" + startDate.getDate()).slice(-2);
                newMonth = ("0" + startDate.getMonth()).slice(-2);
                newYear = (startDate.getFullYear());
            } while (!(newDate == this.calendarStartDD && newMonth == (("0" + ((parseInt(this.calendarStartMM) - 1) + "")).slice(-2)) && newYear === (parseInt(this.calendarStartYYYY) + 1)));
            console.log(this.calendar);
        };
        this.initInputs = () => {
            this.calendarStartDD = ("0" + this.calendarStartDD).slice(-2);
            this.calendarStartMM = ("0" + this.calendarStartMM).slice(-2);
        };
        this.showChooseProject = () => {
            var elems = this._SfIEventsC.querySelectorAll('.choose-project');
            var index = 0, length = elems.length;
            for (; index < length; index++) {
                elems[index].style.display = 'flex';
            }
            elems = this._SfIEventsC.querySelectorAll('.chosen-project');
            index = 0, length = elems.length;
            for (; index < length; index++) {
                elems[index].style.display = 'none';
            }
            elems = this._SfIEventsC.querySelectorAll('.chosen-mapping');
            index = 0, length = elems.length;
            for (; index < length; index++) {
                elems[index].style.display = 'none';
            }
        };
        this.showChosenProject = () => {
            var elems = this._SfIEventsC.querySelectorAll('.choose-project');
            var index = 0, length = elems.length;
            for (; index < length; index++) {
                elems[index].style.display = 'none';
            }
            elems = this._SfIEventsC.querySelectorAll('.chosen-project');
            index = 0, length = elems.length;
            for (; index < length; index++) {
                elems[index].style.display = 'flex';
            }
            elems = this._SfIEventsC.querySelectorAll('.chosen-mapping');
            index = 0, length = elems.length;
            for (; index < length; index++) {
                elems[index].style.display = 'none';
            }
        };
        this.showChosenMapping = () => {
            var elems = this._SfIEventsC.querySelectorAll('.choose-project');
            var index = 0, length = elems.length;
            for (; index < length; index++) {
                elems[index].style.display = 'none';
            }
            elems = this._SfIEventsC.querySelectorAll('.chosen-project');
            index = 0, length = elems.length;
            for (; index < length; index++) {
                elems[index].style.display = 'none';
            }
            elems = this._SfIEventsC.querySelectorAll('.chosen-mapping');
            index = 0, length = elems.length;
            for (; index < length; index++) {
                elems[index].style.display = 'flex';
            }
        };
        this.truncate = (str, n, useWordBoundary, ellipsis = true) => {
            if (str.length <= n) {
                return str;
            }
            const subString = str.slice(0, n - 1); // the original check
            return (useWordBoundary
                ? subString.slice(0, subString.lastIndexOf(" "))
                : subString) + (ellipsis ? "&hellip;" : "...");
        };
        this.initListenersAdmin = () => {
            var _a, _b, _c, _d, _e, _f, _g;
            var old_element = null;
            var new_element = null;
            old_element = this._SfProject[0].querySelector('#sf-i-project');
            new_element = old_element.cloneNode(true);
            (_a = old_element === null || old_element === void 0 ? void 0 : old_element.parentElement) === null || _a === void 0 ? void 0 : _a.replaceChild(new_element, old_element);
            this._SfProject[0].querySelector('#sf-i-project').addEventListener('valueChanged', async () => {
                this._SfTitleChosenMapping.innerHTML = this.truncate(this._SfProject[0].querySelector('#sf-i-project').selectedTexts()[0], 20, true);
                this.showChosenMapping();
                this.fetchEventMap();
                this.renderMappingTabs(this.TAB_REPORTER);
            });
            old_element = this._SfButtonBackChosenProject;
            new_element = old_element.cloneNode(true);
            (_b = old_element === null || old_element === void 0 ? void 0 : old_element.parentElement) === null || _b === void 0 ? void 0 : _b.replaceChild(new_element, old_element);
            this._SfButtonBackChosenProject.addEventListener('click', async () => {
                this.loadMode();
            });
            old_element = this._SfButtonSyncChosenProject;
            new_element = old_element.cloneNode(true);
            (_c = old_element === null || old_element === void 0 ? void 0 : old_element.parentElement) === null || _c === void 0 ? void 0 : _c.replaceChild(new_element, old_element);
            this._SfButtonSyncChosenProject.addEventListener('click', async () => {
                this.fetchList();
            });
            old_element = this._SfButtonBackChosenMapping;
            new_element = old_element.cloneNode(true);
            (_d = old_element === null || old_element === void 0 ? void 0 : old_element.parentElement) === null || _d === void 0 ? void 0 : _d.replaceChild(new_element, old_element);
            this._SfButtonBackChosenMapping.addEventListener('click', async () => {
                this.loadMode();
            });
            old_element = this._SfButtonMapChosenProject;
            new_element = old_element.cloneNode(true);
            (_e = old_element === null || old_element === void 0 ? void 0 : old_element.parentElement) === null || _e === void 0 ? void 0 : _e.replaceChild(new_element, old_element);
            this._SfButtonMapChosenProject.addEventListener('click', async () => {
                this._SfTitleChosenMapping.innerHTML = this.truncate(this._SfProject[0].querySelector('#sf-i-project').selectedTexts()[0], 20, true);
                this.showChosenMapping();
                this.fetchEventMap();
                this.renderMappingTabs(this.TAB_REPORTER);
            });
            old_element = this._SfButtonBackCalendarMapping;
            new_element = old_element.cloneNode(true);
            (_f = old_element === null || old_element === void 0 ? void 0 : old_element.parentElement) === null || _f === void 0 ? void 0 : _f.replaceChild(new_element, old_element);
            this._SfButtonBackCalendarMapping.addEventListener('click', async () => {
                this.fetchCalendar();
            });
            old_element = this._SfButtonBackSyncMapping;
            new_element = old_element.cloneNode(true);
            (_g = old_element === null || old_element === void 0 ? void 0 : old_element.parentElement) === null || _g === void 0 ? void 0 : _g.replaceChild(new_element, old_element);
            this._SfButtonBackSyncMapping.addEventListener('click', async () => {
                this.fetchList();
            });
        };
        this.loadMode = async () => {
            Chart.register(...registerables);
            //Chart.register(Colors);
            if (this.mode == "onboarding") {
                //this.myOnboardingTab = this.TAB_STATUTES;
                this.renderOnboardingTabs();
                this.clickOnboardingTabs();
                //this.loadOnboardingStatutes();
                //((this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-compliances') as HTMLButtonElement).click();
            }
            else if (this.mode == "admin") {
                this.showChooseProject();
                this.initListenersAdmin();
            }
            else {
                this.enableCalendar();
                this.initInputs();
                this.initCalendar();
                this.myRole = this.TAB_REPORTER;
                this.renderRoleTabs();
                await this.fetchUserCalendar_2();
                if (this.events != null && !this.foundCalendarInLocal()) {
                    this.renderTabs(this.TAB_YEAR);
                    this.renderCalendar();
                }
            }
        };
    }
    enableUpcoming() {
        this._SfCalendarContainer.style.display = 'none';
        this._SfStreamContainer.style.display = 'none';
        this._SfUpcomingContainer.style.display = 'flex';
        this._SfThisContainer.style.display = 'none';
        this._SfPastContainer.style.display = 'none';
        this._SfCustomContainer.style.display = 'none';
        this._SfAdhocContainer.style.display = 'none';
    }
    enableThis() {
        this._SfCalendarContainer.style.display = 'none';
        this._SfStreamContainer.style.display = 'none';
        this._SfUpcomingContainer.style.display = 'none';
        this._SfThisContainer.style.display = 'flex';
        this._SfPastContainer.style.display = 'none';
        this._SfCustomContainer.style.display = 'none';
        this._SfAdhocContainer.style.display = 'none';
    }
    enablePast() {
        this._SfCalendarContainer.style.display = 'none';
        this._SfStreamContainer.style.display = 'none';
        this._SfUpcomingContainer.style.display = 'none';
        this._SfThisContainer.style.display = 'none';
        this._SfPastContainer.style.display = 'flex';
        this._SfCustomContainer.style.display = 'none';
        this._SfAdhocContainer.style.display = 'none';
    }
    enableCustom() {
        this._SfCalendarContainer.style.display = 'none';
        this._SfStreamContainer.style.display = 'none';
        this._SfUpcomingContainer.style.display = 'none';
        this._SfThisContainer.style.display = 'none';
        this._SfPastContainer.style.display = 'none';
        this._SfCustomContainer.style.display = 'flex';
        this._SfAdhocContainer.style.display = 'none';
    }
    enableAdhoc() {
        this._SfCalendarContainer.style.display = 'none';
        this._SfStreamContainer.style.display = 'none';
        this._SfUpcomingContainer.style.display = 'none';
        this._SfThisContainer.style.display = 'none';
        this._SfPastContainer.style.display = 'none';
        this._SfCustomContainer.style.display = 'none';
        this._SfAdhocContainer.style.display = 'flex';
    }
    getFirstDayOfLastMonth(yourDate) {
        var d = new Date(yourDate);
        d.setDate(1);
        d.setMonth(d.getMonth() - 1);
        return d;
    }
    firstUpdated(_changedProperties) {
        this.loadMode();
    }
    connectedCallback() {
        super.connectedCallback();
    }
    render() {
        if (this.mode == "onboarding") {
            return html `
          
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <div class="SfIEventsC">
          
          <div class="d-flex justify-center">
              <div class="loader-element"></div>
          </div>
          
          <div class="d-flex justify-center mb-20 flex-wrap" id="onboarding-tab-container">

          </div>
          
          <div class="d-flex justify-center">
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch w-100" id="statutes-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch w-100" id="compliances-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch w-100" id="countries-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch w-100" id="entities-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch w-100" id="locations-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch w-100" id="functions-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="tags-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="reporters-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="approvers-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="duedates-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="alertschedules-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="internalcontrols-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="calendar-container">
              
            </div>
          </div>
          
          <div class="d-flex justify-between">
              <div class="lb"></div>
              <div>
                <div class="div-row-error div-row-submit gone">
                  <div part="errormsg" class="div-row-error-message"></div>
                </div>
                <div class="div-row-success div-row-submit gone">
                  <div part="successmsg" class="div-row-success-message"></div>
                </div>
              </div>
              <div class="rb"></div>
          </div>
        </div>

      `;
        }
        else if (this.mode == "admin") {
            return html `
          
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <div class="SfIEventsC">
            
          <div class="d-flex justify-center">
            <h1 part="title">${this.name}</h1>
          </div>
          <div class="d-flex justify-center">
            <div part="badge" class="badge">Admin</div>
          </div>
          <br />
          <div class="loader-element"></div>
          <div class="choose-project" class="d-flex justify-center align-start">
            <div class="d-flex flex-grow justify-center align-start">
              <h3 part="results-title" id="title-choose-project" class="m-0">Choose Project</h3>
            </div>
          </div>
          <div class="d-flex justify-between">
              <div class="lb"></div>
              <div class=" main-container">
                <div class="chosen-project" class="d-flex justify-center align-start">
                  <div class="d-flex flex-grow justify-between align-start">
                    <div class="d-flex justify-center">
                      &nbsp;<button id="button-back-chosen-project" part="button-icon" class="button-icon"><span class="material-icons">keyboard_backspace</span></button>
                      &nbsp;<button part="button-icon" class="invisible button-icon"><span class="material-icons">keyboard_backspace</span></button>
                    </div>
                    <h3 part="results-title" id="title-chosen-project" class="m-0">Project Name</h3>
                    <div class="d-flex justify-center">
                      <button id="button-sync-chosen-project" part="button-icon" class="button-icon"><span class="material-icons">sync</span></button>
                      &nbsp;
                      <button id="button-map-chosen-project" part="button-icon" class="button-icon"><span class="material-icons">person_add</span></button>
                      &nbsp;
                    </div>
                  </div>
                </div>
                <div class="chosen-mapping" class="d-flex justify-center align-center">
                  <div class="d-flex flex-grow justify-between align-start">
                    <div>
                      &nbsp;
                      <button id="button-back-chosen-mapping" part="button-icon" class="button-icon"><span class="material-icons">keyboard_backspace</span></button>
                      <button part="button-icon" class="invisible button-icon"><span class="material-icons">calendar_month</span></button>
                    </div>
                    <h3 part="results-title" id="title-chosen-mapping" class="m-0">Project Name</h3>
                    <div>
                      <button id="button-back-sync-mapping" part="button-icon" class="button-icon"><span class="material-icons">cloud_download</span></button>
                      <button id="button-back-calendar-mapping" part="button-icon" class="invisible button-icon"><span class="material-icons">calendar_month</span></button>
                      &nbsp;
                    </div>
                  </div>
                </div>
                <div class="choose-project" class="d-flex justify-center align-start">
                  <div class=" mt-20">
                    <slot name="project"></slot>
                  </div>
                </div>
                <div id="container-chosen-project" class="chosen-project hide d-flex justify-center align-start mt-20">
                  
                </div>
                <div class="chosen-project d-flex justify-center flex-wrap" id="tab-container">

                </div>
              
                <div class="chosen-project d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="calendar-container">
                  
                </div>
                <div class="chosen-project d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="stream-container">
                  
                </div>
                <div class="chosen-project d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="upcoming-container">
                  
                </div>
                <div class="chosen-project d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="this-container">
                  
                </div>
                <div class="chosen-project d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="past-container">
                  
                </div>
                <div class="chosen-project d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="custom-container">
                  
                </div>

                <div class="chosen-project d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="adhoc-container">
                  
                </div>

                <div class="chosen-mapping d-flex justify-center mt-20" id="mapping-tab-container">

                </div>
                <div class="chosen-mapping d-flex flex-col mb-100" id="mapping-container">
                </div>
              </div>
              <div class="rb"></div>
          </div>
          <div id="detail-container" class="hide" part="detail-container">
          </div>
          <div class="d-flex justify-between">
              <div class="lb"></div>
              <div>
                <div class="div-row-error div-row-submit gone">
                  <div part="errormsg" class="div-row-error-message"></div>
                </div>
                <div class="div-row-success div-row-submit gone">
                  <div part="successmsg" class="div-row-success-message"></div>
                </div>
              </div>
              <div class="rb"></div>
          </div>
        </div>

      `;
        }
        else {
            return html `
          
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <div class="SfIEventsC">
          
          <div class="d-flex justify-center">
              <div class="loader-element"></div>
          </div>
          
          <div class="d-flex justify-center mb-20" id="role-tab-container">

          </div>
          
          <div class="d-flex justify-center flex-wrap" id="tab-container">

          </div>
          <div class="d-flex justify-center">
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="calendar-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="stream-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="upcoming-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="this-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="past-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="custom-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="adhoc-container">
              
            </div>
          </div>
          <div id="detail-container" class="hide" part="detail-container">
          </div>
          <div class="d-flex justify-between">
              <div class="lb"></div>
              <div>
                <div class="div-row-error div-row-submit gone">
                  <div part="errormsg" class="div-row-error-message"></div>
                </div>
                <div class="div-row-success div-row-submit gone">
                  <div part="successmsg" class="div-row-success-message"></div>
                </div>
              </div>
              <div class="rb"></div>
          </div>
        </div>

      `;
        }
    }
};
SfIEvents.styles = css `

    
    .SfIEventsC {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: space-between;
    }

    .td-dark {
      background-color: #e9e9e9;
    }

    .td-light {
      background-color: #f6f6f6;
    }

    .invisible {
      visibility: hidden;
    }

    .scroll-x {
      overflow-x: auto;
    }

    .mw-140 {
      max-width: 140%
    }
    
    .no-shrink {
      flex-shrink: 0;
    }

    .p-10 {
      padding: 10px;
    }

    .cursor {
      cursor: pointer;
    }

    .commentbox {
      padding: 10px;
      border: solid 1px gray;
      border-radius: 10px;
    }

    .reporterbox {
      width: 90%;
      margin-right: 10%;
    }

    .approverbox {
      width: 90%;
      margin-left: 5%;
    }

    .pr-5 {
      padding-right: 5px;
    }

    .pt-5 {
      padding-top: 5px;
    }

    .pb-5 {
      padding-bottom: 5px;
    }

    .pb-20 {
      padding-bottom: 20px;
    }

    .m-20 {
      margin: 20px;
    }

    .m-10 {
      margin: 10px;
    }

    .text-start {
      text-align: start;
    }

    .text-center {
      text-align: center;
    }

    .mb-100 {
      margin-bottom: 100px;
    }

    .mb-10 {
      margin-bottom: 10px;
    }

    .mb-5 {
      margin-bottom: 5px;
    }

    .mt-5 {
      margin-top: 5px;
    }

    #button-back-add-mapping {
      bottom: 10px;
      z-index: 98;
      position: sticky;
      width: 96%;
      margin-left: 2%;
      margin-right: 2%;
    }

    .fixed-bottom {
      position: fixed;
      bottom: 0px;
      left: 0px;
      width: 100%;
      z-index: 99;
    }

    .div-graph-complete {
      background-color: #50cf01;
      height: 100%;
      width: 0%;
    }

    .div-graph-pending {
      background-color: #ffe505;
      height: 100%;
      width: 100%;
    }

    input:not([type='radio']) {

    border-width: 0px;      
    border-radius: 5px;
    color: #666;
    background: #efefef;
    box-shadow: 1px 1px 10px 0 rgba(0, 0, 0, 0.25), -1px -1px 10px 0 rgba(255, 255, 255, 0.6);
    border-top: solid 1px rgba(255, 255, 255, 0.3);
    border-left: solid 1px rgba(255, 255, 255, 0.3);
    border-bottom: solid 1px rgba(0, 0, 0, 0.1);
    border-right: solid 1px rgba(0, 0, 0, 0.1);
    padding: 10px;

    }

    .bg-pending {
      background-color: #ffe505;
    }

    .bg-done {
      background-color: #50cf01;
    }

    .color-past-due-date {
      color: #F79256;
    }

    .color-late-executed {
      color: #840B0F;
    }
    .color-late-approved {
      color: #EE2F36;
    }

    .color-pending {
      color: #ffe505;
    }

    .color-not-started {
      color: #888888;
    }

    .color-done {
      color: #50cf01;
    }

    .pr-10 {
      padding-right: 10px;
    }

    .pt-10 {
      padding-top: 10px;
    }

    .pb-10 {
      padding-bottom: 10px;
    }

    .bg-left {
      border-top: solid 1px #dcdcdc;
      padding-right: 5px;
    }

    .bg-left-no-border {
      padding-right: 5px;
    }

    .m-0 {
      margin: 0px;
    }

    .mt-10 {
      margin-top: 10px;
    }

    .mt-5 {
      margin-top: 5px;
    }

    .ml-10 {
      margin-left: 10px;
    }

    .mt-20 {
      margin-top: 20px;
    }

    .ml-20 {
      margin-left: 20px;
    }

    .mr-20 {
      margin-right: 20px;
    }

    .mb-20 {
      margin-bottom: 20px;
    }

    .flex-grow {
      flex-grow: 1;
    }

    .flex-wrap {
      flex-wrap: wrap;
    }

    .left-sticky {
      left: 0px;
      position: sticky;
    }

    .link {
      text-decoration: underline;
      cursor: pointer;
    }

    .accordian-head {
      cursor: pointer;
    }

    .button-submit {
      font-weight: 800;
      font-size: 110%;
    }

    .mr-10 {
      margin-right: 10px;
    }

    .pl-5 {
      padding-left: 5px;
    }

    .pl-10 {
      padding-left: 10px;
    }

    .pr-10 {
      padding-right: 10px;
    }

    .pl-20 {
      padding-left: 20px;
    }

    .pr-20 {
      padding-right: 20px;
    }

    .gone {
      display: none
    }

    .loader-element {
      position: fixed;
      right: 10px;
      top: 10px;
      margin-left: 5px;
    }

    #row-unmapped-graph {
      width: 300px;
      height: 10px;
    }

    #stream-container {
      padding: 2%;
    }

    #custom-container {
      padding: 2%;
    }

    #adhoc-container {
      padding: 2%;
    }

    #upcoming-container {
      padding: 2%;
    }

    .container-mapping-event {
      overflow-x: auto;
    }

    #this-container {
      padding: 2%;
    }

    #past-container {
      padding: 2%;
    }

    .stream-event-list {
      margin-left: 10px;
      padding: 10px;
    }

    .stream-events-container {
      overflow-x: auto;
      width: 100%
    }
    .stream-event-list-container {
      width: 200px;
    }

    .stream-event-selected {
      padding-left: 20px;
      padding-right: 10px;
      padding-top: 5px;
      padding-bottom: 5px;
    }
    
    .stream-event-not-selected {
      padding-left: 20px;
      padding-right: 10px;
      padding-top: 5px;
      padding-bottom: 5px;
      color: #aaa;
      font-size: 80%;
    }

    .stream-event-not-selected-hidden {
      padding-left: 20px;
      padding-right: 10px;
      padding-top: 5px;
      padding-bottom: 5px;
      color: #aaa;
      line-height: 0.05;
    }

    .stream-month-selected {
      padding: 10px;
      text-align: center;
    }

    .stream-month-not-selected {
      padding: 10px;
      text-align: center;
    }

    .calendar-left-col {
      width: 30%;
    }

    .calendar-right-data {
      width: 70%;
    }

    .day-item {
      width: 14%;
      margin-bottom: 5px;
      text-align: center;
    }

    .date-item {
      font-size: 80%;
      color: #333;
    }

    .date-item-before {
      font-size: 80%;
      color: #999;
    }

    .dot {
      height: 4px;
      border-radius: 3px;
    }

    .title-item {
      padding: 5px;
      margin-bottom: 20px;
    }

    .title-item-date {
      padding-right: 5px;
      margin-bottom: 20px;
    }

    .calendar-item {
      width: 90%;
      margin-bottom: 20px;
    }

    .muted {
      color: gray;
    }

    .td-head {
      text-transform: capitalize;
    }

    .tab-button {
      padding: 10px;
      padding-left: 15px;
      padding-right: 15px;
      font-size: 105%;
      margin-left: 5px;
      margin-right: 5px;
    }

    .td-body {
      padding: 5px;
    }

    .td-dark {
      background-color: #e9e9e9;
    }

    .td-highlight {
      background-color: black;
      color: white;
    }

    .td-light {
      background-color: #f6f6f6;
    }

    td {
      white-space: nowrap;
    }

    .w-100 {
      width: 100%;
    }

    .fw-100 {
      font-weight: 100;
    }

    .fw-200 {
      font-weight: 200;
    }

    .fw-300 {
      font-weight: 300;
    }

    .fw-600 {
      font-weight: 600;
    }

    .align-start {
      align-items: flex-start;
    }

    .align-stretch {
      align-items: stretch;
    }

    .align-baseline {
      align-items: baseline;
    }

    .align-end {
      align-items: flex-end;
    }

    .align-center {
      align-items: center;
    }
    
    .lds-dual-ring {
      display: inline-block;
      width: 50px;
      height: 50px;
    }
    .lds-dual-ring:after {
      content: " ";
      display: block;
      width: 50px;
      height: 50px;
      margin: 0px;
      border-radius: 50%;
      border: 2px solid #fff;
      border-color: #888 #ddd #888 #ddd;
      background-color: white;
      animation: lds-dual-ring 0.8s linear infinite;
    }

    .lds-dual-ring-lg {
      display: inline-block;
      width: 30px;
      height: 30px;
    }
    .lds-dual-ring-lg:after {
      content: " ";
      display: block;
      width: 30px;
      height: 30px;
      margin: 0px;
      border-radius: 50%;
      border: 3px solid #fff;
      border-color: #888 #ddd #888 #ddd;
      animation: lds-dual-ring 0.8s linear infinite;
    }

    .div-row-error {
      display: flex;
      justify-content: center;
      position: fixed;
      position: fixed;
      top: 0px;
      right: 0px;
      margin-top: 20px;
      margin-right: 20px;
      display: none;
      align-items:center;
      background-color: white;
      border: dashed 1px red;
      padding: 20px;
    }

    .div-row-error-message {
      color: red;
      padding: 5px;
      background-color: white;
      text-align: center;
    }

    .div-row-success {
      display: flex;
      justify-content: center;
      position: fixed;
      top: 0px;
      right: 0px;
      margin-top: 20px;
      margin-right: 20px;
      display: none;
      align-items:center;
      background-color: white;
      border: dashed 1px green;
      padding: 20px;
    }

    .div-row-success-message {
      color: green;
      padding: 5px;
      background-color: white;
      text-align: center;
    }

    .d-flex {
      display: flex;
    }

    .flex-col {
      flex-direction: column;
    }

    .justify-center {
      justify-content: center;
    }

    .justify-between {
      justify-content: space-between;
    }

    .justify-end {
      justify-content: flex-end;
    }

    @keyframes lds-dual-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }  

    .hide {
      display: none;
    }

    .lb {
      width: 5%
    }
    .rb {
      width: 5%
    }

    .main-container {
      width: 90%;
      overflow-x: auto;
    }

    @media (orientation: landscape) {

      .lb {
        width: 30%
      }
      .rb {
        width: 30%
      }


      .calendar-item {
        width: 20%;
        margin: 2%;
        padding: 1%;
      }

      .main-container {
        width: 40%;
      }

    }
    

  `;
__decorate([
    property()
], SfIEvents.prototype, "projectId", void 0);
__decorate([
    property()
], SfIEvents.prototype, "name", void 0);
__decorate([
    property()
], SfIEvents.prototype, "apiId", void 0);
__decorate([
    property()
], SfIEvents.prototype, "apiIdStatutes", void 0);
__decorate([
    property()
], SfIEvents.prototype, "apiIdCompliances", void 0);
__decorate([
    property()
], SfIEvents.prototype, "apiIdList", void 0);
__decorate([
    property()
], SfIEvents.prototype, "apiIdDetail", void 0);
__decorate([
    property()
], SfIEvents.prototype, "apiIdUsers", void 0);
__decorate([
    property()
], SfIEvents.prototype, "apiIdTags", void 0);
__decorate([
    property()
], SfIEvents.prototype, "apiMethodList", void 0);
__decorate([
    property()
], SfIEvents.prototype, "apiMethodDetail", void 0);
__decorate([
    property()
], SfIEvents.prototype, "apiBodyList", void 0);
__decorate([
    property()
], SfIEvents.prototype, "apiBodyDetail", void 0);
__decorate([
    property()
], SfIEvents.prototype, "userProfileId", void 0);
__decorate([
    property()
], SfIEvents.prototype, "entityId", void 0);
__decorate([
    property()
], SfIEvents.prototype, "locationId", void 0);
__decorate([
    property()
], SfIEvents.prototype, "userName", void 0);
__decorate([
    property()
], SfIEvents.prototype, "projectName", void 0);
__decorate([
    property()
], SfIEvents.prototype, "apiResponseFieldList", void 0);
__decorate([
    property()
], SfIEvents.prototype, "myOnboardingTab", void 0);
__decorate([
    property()
], SfIEvents.prototype, "myRole", void 0);
__decorate([
    property()
], SfIEvents.prototype, "chart", void 0);
__decorate([
    property()
], SfIEvents.prototype, "calendarStartDD", void 0);
__decorate([
    property()
], SfIEvents.prototype, "calendarStartMM", void 0);
__decorate([
    property()
], SfIEvents.prototype, "calendarStartYYYY", void 0);
__decorate([
    property()
], SfIEvents.prototype, "calendar", void 0);
__decorate([
    property()
], SfIEvents.prototype, "mappedValuesDueDates", void 0);
__decorate([
    property()
], SfIEvents.prototype, "mappedValuesUsers", void 0);
__decorate([
    property()
], SfIEvents.prototype, "mappedValuesTags", void 0);
__decorate([
    property()
], SfIEvents.prototype, "unmappedEvents", void 0);
__decorate([
    property()
], SfIEvents.prototype, "mappings", void 0);
__decorate([
    property()
], SfIEvents.prototype, "triggers", void 0);
__decorate([
    property()
], SfIEvents.prototype, "monthNames", void 0);
__decorate([
    property()
], SfIEvents.prototype, "events", void 0);
__decorate([
    property()
], SfIEvents.prototype, "eventsInWindow", void 0);
__decorate([
    property()
], SfIEvents.prototype, "eventHideFields", void 0);
__decorate([
    property()
], SfIEvents.prototype, "eventPreviewFields", void 0);
__decorate([
    property()
], SfIEvents.prototype, "eventFields", void 0);
__decorate([
    property()
], SfIEvents.prototype, "eventFieldDependencies", void 0);
__decorate([
    property()
], SfIEvents.prototype, "csvDataCompliances", void 0);
__decorate([
    property()
], SfIEvents.prototype, "csvDataStats", void 0);
__decorate([
    property()
], SfIEvents.prototype, "htmlDataCompliances", void 0);
__decorate([
    property()
], SfIEvents.prototype, "htmlDataStats", void 0);
__decorate([
    property()
], SfIEvents.prototype, "period", void 0);
__decorate([
    property()
], SfIEvents.prototype, "mode", void 0);
__decorate([
    property()
], SfIEvents.prototype, "flow", void 0);
__decorate([
    property()
], SfIEvents.prototype, "fill", void 0);
__decorate([
    property()
], SfIEvents.prototype, "filterTags", void 0);
__decorate([
    query('.SfIEventsC')
], SfIEvents.prototype, "_SfIEventsC", void 0);
__decorate([
    query('.div-row-error')
], SfIEvents.prototype, "_SfRowError", void 0);
__decorate([
    query('.div-row-error-message')
], SfIEvents.prototype, "_SfRowErrorMessage", void 0);
__decorate([
    query('.div-row-success')
], SfIEvents.prototype, "_SfRowSuccess", void 0);
__decorate([
    query('.div-row-success-message')
], SfIEvents.prototype, "_SfRowSuccessMessage", void 0);
__decorate([
    query('.loader-element')
], SfIEvents.prototype, "_SfLoader", void 0);
__decorate([
    query('#calendar-container')
], SfIEvents.prototype, "_SfCalendarContainer", void 0);
__decorate([
    query('#button-generate')
], SfIEvents.prototype, "_SfButtonGenerate", void 0);
__decorate([
    query('.button-search')
], SfIEvents.prototype, "_SfButtonSearch", void 0);
__decorate([
    query('.button-save')
], SfIEvents.prototype, "_SfButtonSave", void 0);
__decorate([
    query('.button-next')
], SfIEvents.prototype, "_SfButtonNext", void 0);
__decorate([
    query('.button-prev')
], SfIEvents.prototype, "_SfButtonPrev", void 0);
__decorate([
    query('.input-search')
], SfIEvents.prototype, "_SfInputSearch", void 0);
__decorate([
    query('#button-sync-chosen-project')
], SfIEvents.prototype, "_SfButtonSyncChosenProject", void 0);
__decorate([
    query('#button-map-chosen-project')
], SfIEvents.prototype, "_SfButtonMapChosenProject", void 0);
__decorate([
    query('#button-back-chosen-project')
], SfIEvents.prototype, "_SfButtonBackChosenProject", void 0);
__decorate([
    query('#button-back-calendar-mapping')
], SfIEvents.prototype, "_SfButtonBackCalendarMapping", void 0);
__decorate([
    query('#button-back-sync-mapping')
], SfIEvents.prototype, "_SfButtonBackSyncMapping", void 0);
__decorate([
    query('#button-back-chosen-mapping')
], SfIEvents.prototype, "_SfButtonBackChosenMapping", void 0);
__decorate([
    query('#title-chosen-project')
], SfIEvents.prototype, "_SfTitleChosenProject", void 0);
__decorate([
    query('#title-chosen-mapping')
], SfIEvents.prototype, "_SfTitleChosenMapping", void 0);
__decorate([
    query('#container-chosen-project')
], SfIEvents.prototype, "_SfContainerChosenProject", void 0);
__decorate([
    query('#container-project-select')
], SfIEvents.prototype, "_SfContainerProjectSelect", void 0);
__decorate([
    query('#container-project-actions')
], SfIEvents.prototype, "_SfContainerProjectActions", void 0);
__decorate([
    query('#stream-container')
], SfIEvents.prototype, "_SfStreamContainer", void 0);
__decorate([
    query('#upcoming-container')
], SfIEvents.prototype, "_SfUpcomingContainer", void 0);
__decorate([
    query('#detail-container')
], SfIEvents.prototype, "_SfDetailContainer", void 0);
__decorate([
    query('#this-container')
], SfIEvents.prototype, "_SfThisContainer", void 0);
__decorate([
    query('#past-container')
], SfIEvents.prototype, "_SfPastContainer", void 0);
__decorate([
    query('#custom-container')
], SfIEvents.prototype, "_SfCustomContainer", void 0);
__decorate([
    query('#adhoc-container')
], SfIEvents.prototype, "_SfAdhocContainer", void 0);
__decorate([
    query('#mapping-container')
], SfIEvents.prototype, "_SfMappingContainer", void 0);
__decorate([
    query('#stream-event-status')
], SfIEvents.prototype, "_SfStreamEventStatus", void 0);
__decorate([
    query('#tab-container')
], SfIEvents.prototype, "_SfTabContainer", void 0);
__decorate([
    query('#mapping-tab-container')
], SfIEvents.prototype, "_SfMappingTabContainer", void 0);
__decorate([
    query('#role-tab-container')
], SfIEvents.prototype, "_SfRoleTabContainer", void 0);
__decorate([
    query('#onboarding-tab-container')
], SfIEvents.prototype, "_SfOnboardingTabContainer", void 0);
__decorate([
    query('#statutes-list-container')
], SfIEvents.prototype, "_SfOnboardingStatutesListContainer", void 0);
__decorate([
    query('#statutes-container')
], SfIEvents.prototype, "_SfOnboardingStatutesContainer", void 0);
__decorate([
    query('#compliances-list-container')
], SfIEvents.prototype, "_SfOnboardingCompliancesListContainer", void 0);
__decorate([
    query('#compliances-container')
], SfIEvents.prototype, "_SfOnboardingCompliancesContainer", void 0);
__decorate([
    query('#entities-list-container')
], SfIEvents.prototype, "_SfOnboardingEntitiesListContainer", void 0);
__decorate([
    query('#entities-container')
], SfIEvents.prototype, "_SfOnboardingEntitiesContainer", void 0);
__decorate([
    query('#functions-container')
], SfIEvents.prototype, "_SfOnboardingFunctionsContainer", void 0);
__decorate([
    query('#functions-list-container')
], SfIEvents.prototype, "_SfOnboardingFunctionsListContainer", void 0);
__decorate([
    query('#countries-container')
], SfIEvents.prototype, "_SfOnboardingCountriesContainer", void 0);
__decorate([
    query('#countries-list-container')
], SfIEvents.prototype, "_SfOnboardingCountriesListContainer", void 0);
__decorate([
    query('#locations-list-container')
], SfIEvents.prototype, "_SfOnboardingLocationsListContainer", void 0);
__decorate([
    query('#locations-container')
], SfIEvents.prototype, "_SfOnboardingLocationsContainer", void 0);
__decorate([
    query('#tags-list-container')
], SfIEvents.prototype, "_SfOnboardingTagsListContainer", void 0);
__decorate([
    query('#tags-container')
], SfIEvents.prototype, "_SfOnboardingTagsContainer", void 0);
__decorate([
    query('#reporters-list-container')
], SfIEvents.prototype, "_SfOnboardingReportersListContainer", void 0);
__decorate([
    query('#reporters-container')
], SfIEvents.prototype, "_SfOnboardingReportersContainer", void 0);
__decorate([
    query('#approvers-container')
], SfIEvents.prototype, "_SfOnboardingApproversContainer", void 0);
__decorate([
    query('#approvers-list-container')
], SfIEvents.prototype, "_SfOnboardingApproversListContainer", void 0);
__decorate([
    query('#duedates-list-container')
], SfIEvents.prototype, "_SfOnboardingDuedatesListContainer", void 0);
__decorate([
    query('#duedates-container')
], SfIEvents.prototype, "_SfOnboardingDuedatesContainer", void 0);
__decorate([
    query('#alertschedules-list-container')
], SfIEvents.prototype, "_SfOnboardingAlertSchedulesListContainer", void 0);
__decorate([
    query('#alertschedules-container')
], SfIEvents.prototype, "_SfOnboardingAlertSchedulesContainer", void 0);
__decorate([
    query('#internalcontrols-list-container')
], SfIEvents.prototype, "_SfOnboardingInternalControlsListContainer", void 0);
__decorate([
    query('#internalcontrols-container')
], SfIEvents.prototype, "_SfOnboardingInternalControlsContainer", void 0);
__decorate([
    query('#calendar-list-container')
], SfIEvents.prototype, "_SfOnboardingCalendarListContainer", void 0);
__decorate([
    query('#calendar-container')
], SfIEvents.prototype, "_SfOnboardingCalendarContainer", void 0);
__decorate([
    queryAssignedElements({ slot: 'project' })
], SfIEvents.prototype, "_SfProject", void 0);
__decorate([
    queryAssignedElements({ slot: 'uploader' })
], SfIEvents.prototype, "_SfUploader", void 0);
SfIEvents = __decorate([
    customElement('sf-i-events')
], SfIEvents);
export { SfIEvents };
//# sourceMappingURL=sf-i-events.js.map
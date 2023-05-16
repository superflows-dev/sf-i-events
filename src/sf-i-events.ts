/**
 * @license
 * Copyright 2022 Superflow.dev
 * SPDX-License-Identifier: MIT
 */

import {LitElement, html, css, PropertyValueMap} from 'lit';
import {customElement, query, queryAssignedElements, property} from 'lit/decorators.js';
// import {customElement, query, property} from 'lit/decorators.js';
import Util from './util';
import {SfIForm} from 'sf-i-form';
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
@customElement('sf-i-events')
export class SfIEvents extends LitElement {

  TAB_YEAR = "year";
  TAB_STREAM = "stream";
  TAB_UPCOMING = "upcoming";
  TAB_THIS = "this";
  TAB_PAST = "past";
  TAB_CUSTOM = "custom";
  TAB_REPORTER = "reporter";
  TAB_APPROVER = "approver";

  @property()
  name!: string;

  @property()
  apiId!: string;

  @property()
  apiIdList!: string;

  @property()
  apiIdDetail!: string;

  @property()
  apiIdUsers!: string;

  @property()
  apiIdTags!: string;

  @property()
  apiMethodList!: string;

  @property()
  apiMethodDetail!: string;

  @property()
  apiBodyList!: string;

  @property()
  apiBodyDetail!: string;

  @property()
  userProfileId!: string;

  @property()
  projectId!: string;

  @property()
  apiResponseFieldList!: string;

  @property()
  myRole: string = this.TAB_REPORTER;

  @property()
  calendarStartDD!: string;

  @property()
  calendarStartMM!: string;

  @property()
  calendarStartYYYY!: string;

  @property()
  calendar: Date [] = [];

  @property()
  mappedValuesDueDates: any = {};

  @property()
  mappedValuesUsers: any = {};

  @property()
  mappedValuesTags: any = {};

  @property()
  unmappedEvents: any = null;

  @property()
  mappings: any = null;

  @property()
  monthNames: string []  = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  @property()
  events: any = null;

  @property()
  eventPreviewFields: any = null;

  getEventPreviewFields = () => {
    return JSON.parse(this.eventPreviewFields);
  }

  @property()
  eventFields: any = null;

  getEventFields = () => {
    return JSON.parse(this.eventFields);
  }

  @property()
  eventFieldDependencies: any = null;

  getEventFieldDependencies = () => {
    return JSON.parse(this.eventFieldDependencies);
  }

  getApiBodyList = () => {
    console.log('calendar api body list', this.apiBodyList);
    try {
      return JSON.parse(this.apiBodyList);
    } catch (e: any) {
      return {};
    }
  }

  getApiBodyDetail = () => {
    return JSON.parse(this.apiBodyDetail);
  }

  @property()
  mode!: string;

  @property()
  flow: string = "";

  static override styles = css`

    
    .SfIEventsC {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: space-between;
    }

    .invisible {
      visibility: hidden;
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

    .m-20 {
      margin: 20px;
    }

    .text-start {
      text-align: start;
    }

    .mb-100 {
      margin-bottom: 100px;
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
      background-color: #64a692;
      height: 100%;
      width: 0%;
    }

    .div-graph-pending {
      background-color: #f49315;
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
      background-color: #f49315;
    }

    .bg-done {
      background-color: #64a692;
    }

    .color-pending {
      color: #f49315;
    }

    .color-done {
      color: #64a692;
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

    .ml-10 {
      margin-left: 10px;
    }

    .mt-20 {
      margin-top: 20px;
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

    .mr-10 {
      margin-right: 10px;
    }

    .pl-5 {
      padding-left: 5px;
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
      width: 6px;
      height: 6px;
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
  
  @query('.SfIEventsC')
  _SfIEventsC: any;
  
  @query('.div-row-error')
  _SfRowError: any;

  @query('.div-row-error-message')
  _SfRowErrorMessage: any;

  @query('.div-row-success')
  _SfRowSuccess: any;

  @query('.div-row-success-message')
  _SfRowSuccessMessage: any;

  @query('.loader-element')
  _SfLoader: any;

  @query('#calendar-container')
  _SfCalendarContainer: any;

  @query('#button-generate')
  _SfButtonGenerate: any;

  @query('#button-sync-chosen-project')
  _SfButtonSyncChosenProject: any;

  @query('#button-map-chosen-project')
  _SfButtonMapChosenProject: any;

  @query('#button-back-chosen-project')
  _SfButtonBackChosenProject: any;

  @query('#button-back-calendar-mapping')
  _SfButtonBackCalendarMapping: any;

  @query('#button-back-sync-mapping')
  _SfButtonBackSyncMapping: any;

  @query('#button-back-chosen-mapping')
  _SfButtonBackChosenMapping: any;

  @query('#title-chosen-project')
  _SfTitleChosenProject: any;

  @query('#title-chosen-mapping')
  _SfTitleChosenMapping: any;

  @query('#container-chosen-project')
  _SfContainerChosenProject: any;

  @query('#container-project-select')
  _SfContainerProjectSelect: any;

  @query('#container-project-actions')
  _SfContainerProjectActions: any;

  @query('#stream-container')
  _SfStreamContainer: any;

  @query('#upcoming-container')
  _SfUpcomingContainer: any;

  @query('#detail-container')
  _SfDetailContainer: any;

  @query('#this-container')
  _SfThisContainer: any;

  @query('#past-container')
  _SfPastContainer: any;

  @query('#custom-container')
  _SfCustomContainer: any;

  @query('#mapping-container')
  _SfMappingContainer: any;

  @query('#stream-event-status')
  _SfStreamEventStatus: any;

  @query('#tab-container')
  _SfTabContainer: any;

  @query('#mapping-tab-container')
  _SfMappingTabContainer: any;

  @query('#role-tab-container')
  _SfRoleTabContainer: any;

  @queryAssignedElements({slot: 'project'})
  _SfProject: any;

  getEventField = (field: string) => {

    for(var i = 0; i < this.getEventFields().length; i++) {

      if(this.getEventFields()[i].field == field) {
        return this.getEventFields()[i];
      }

    }

  }

  getParentFieldFromDepedencies = (field: string) => {

    for(var i = 0; i < this.getEventFieldDependencies().length; i++) {

      if(this.getEventFieldDependencies()[i].type == "foreignkey" && this.getEventFieldDependencies()[i].child == field) {
        return this.getEventFieldDependencies()[i].parent;
      }

    }

    return null;

  }

  getEventTexts = (field: string, selectedId: Array<string>, row: any) => {

    console.log('get event texts', field, selectedId, row);

    if(this.getEventField(field) != null && this.getEventField(field).type == "sf-i-select") {

      var selectedIds = "";
      selectedIds += '[';
      for(var i = 0; i < selectedId.length; i++) {
        selectedIds += ('&quot;'+selectedId[i]+'&quot;');
        if(i < selectedId.length - 1) {
          selectedIds += ',';
        }
      }
      selectedIds += ']';

      return '<sf-i-select apiId="'+this.getEventField(field).apiId+'" name="Select" label="Select" mode="text" selectedId="'+selectedIds+'"></sf-i-select>'

    }

    if(this.getEventField(field) != null && this.getEventField(field).type == "sf-i-sub-select") {

      const parentField = this.getParentFieldFromDepedencies(field);

      console.log('parentfield', parentField);

      var selectedIds = "";
      selectedIds += '[';
      for(var i = 0; i < selectedId.length; i++) {
        selectedIds += ('&quot;'+selectedId[i]+'&quot;');
        if(i < selectedId.length - 1) {
          selectedIds += ',';
        }
      }
      selectedIds += ']';

      const filterId = JSON.parse(row[parentField])[0];

      console.log('<sf-i-sub-select apiId="'+this.getEventField(field).apiId+'" name="Select" label="Select" mode="text" selectedId="'+selectedIds+'" filterId="'+filterId+'"></sf-i-sub-select>');

      return '<sf-i-sub-select apiId="'+this.getEventField(field).apiId+'" name="Select" label="Select" mode="text" selectedId="'+selectedIds+'" filterId="'+filterId+'"></sf-i-sub-select>'

    }

    if(this.getEventField(field) != null && this.getEventField(field).type == "sf-i-form") {

      console.log('<sf-i-form name="Select" apiId="'+this.getEventField(field).apiId+'" selectedId="'+selectedId[0]+'" projectField="'+this.getEventField(field).projectField+'" mode="text"></sf-i-form>');

      return '<sf-i-form name="Select" apiId="'+this.getEventField(field).apiId+'" selectedId="'+selectedId[0]+'" projectField="'+this.getEventField(field).projectField+'" mode="text"></sf-i-form>'
    }

    

    return "";
  }

  enableCalendar = () => {
    (this._SfCalendarContainer as HTMLDivElement).style.display = 'flex';
    (this._SfStreamContainer as HTMLDivElement).style.display = 'none';
    (this._SfUpcomingContainer as HTMLDivElement).style.display = 'none';
    (this._SfThisContainer as HTMLDivElement).style.display = 'none';
    (this._SfPastContainer as HTMLDivElement).style.display = 'none';
    (this._SfCustomContainer as HTMLDivElement).style.display = 'none';
  }

  enableStream = () => {
      (this._SfCalendarContainer as HTMLDivElement).style.display = 'none';
      (this._SfStreamContainer as HTMLDivElement).style.display = 'flex';
      (this._SfUpcomingContainer as HTMLDivElement).style.display = 'none';
      (this._SfThisContainer as HTMLDivElement).style.display = 'none';
      (this._SfPastContainer as HTMLDivElement).style.display = 'none';
      (this._SfCustomContainer as HTMLDivElement).style.display = 'none';
  }

  enableUpcoming() {
    (this._SfCalendarContainer as HTMLDivElement).style.display = 'none';
    (this._SfStreamContainer as HTMLDivElement).style.display = 'none';
    (this._SfUpcomingContainer as HTMLDivElement).style.display = 'flex';
    (this._SfThisContainer as HTMLDivElement).style.display = 'none';
    (this._SfPastContainer as HTMLDivElement).style.display = 'none';
    (this._SfCustomContainer as HTMLDivElement).style.display = 'none';
  }

  enableThis() {
    (this._SfCalendarContainer as HTMLDivElement).style.display = 'none';
    (this._SfStreamContainer as HTMLDivElement).style.display = 'none';
    (this._SfUpcomingContainer as HTMLDivElement).style.display = 'none';
    (this._SfThisContainer as HTMLDivElement).style.display = 'flex';
    (this._SfPastContainer as HTMLDivElement).style.display = 'none';
    (this._SfCustomContainer as HTMLDivElement).style.display = 'none';
  }

  enablePast() {
    (this._SfCalendarContainer as HTMLDivElement).style.display = 'none';
    (this._SfStreamContainer as HTMLDivElement).style.display = 'none';
    (this._SfUpcomingContainer as HTMLDivElement).style.display = 'none';
    (this._SfThisContainer as HTMLDivElement).style.display = 'none';
    (this._SfPastContainer as HTMLDivElement).style.display = 'flex';
    (this._SfCustomContainer as HTMLDivElement).style.display = 'none';
  }

  enableCustom() {
    (this._SfCalendarContainer as HTMLDivElement).style.display = 'none';
    (this._SfStreamContainer as HTMLDivElement).style.display = 'none';
    (this._SfUpcomingContainer as HTMLDivElement).style.display = 'none';
    (this._SfThisContainer as HTMLDivElement).style.display = 'none';
    (this._SfPastContainer as HTMLDivElement).style.display = 'none';
    (this._SfCustomContainer as HTMLDivElement).style.display = 'flex';
  }

  prepareXhr = async (data: any, url: string, loaderElement: any, authorization: any) => {

    
    if(loaderElement != null) {
      loaderElement.innerHTML = '<div class="lds-dual-ring"></div>';
    }
    return await Util.callApi(url, data, authorization);

  }

  clearMessages = () => {
    this._SfRowError.style.display = 'none';
    this._SfRowErrorMessage.innerHTML = '';
    this._SfRowSuccess.style.display = 'none';
    this._SfRowSuccessMessage.innerHTML = '';
  }

  setError = (msg: string) => {
    this._SfRowError.style.display = 'flex';
    this._SfRowErrorMessage.innerHTML = msg;
    this._SfRowSuccess.style.display = 'none';
    this._SfRowSuccessMessage.innerHTML = '';
  }

  setSuccess = (msg: string) => {
    this._SfRowError.style.display = 'none';
    this._SfRowErrorMessage.innerHTML = '';
    this._SfRowSuccess.style.display = 'flex';
    this._SfRowSuccessMessage.innerHTML = msg;
  }

  getLastDayOfLastMonth = (month: number, year: number) => {
    const date = new Date(year, month, 0);
    return date.getDate()
  }

  getLastDayOfMonth = (month: number, year: number): number => {
    const date = new Date(year, month + 1, 0);
    return date.getDate()
  }

  getFirstDateOfLastWeek = (startDate: Date) : Date => {

    const sd = new Date(startDate.getTime());
    var first = sd.getDate() - sd.getDay();
    var firstday = new Date(sd.setDate(first));
    for(var i = 0; i < 7; i++) {
      firstday.setDate(firstday.getDate() - 1);
    }
    return firstday;

  }

  getFirstDayOfLastMonth(yourDate: Date) {
    var d = new Date(yourDate);
    d.setDate(1);
    d.setMonth(d.getMonth() - 1);
    return d;
}
  
  getFirstDateOfWeek = (startDate: Date) : Date => {

    const sd = new Date(startDate.getTime());
    var first = sd.getDate() - sd.getDay();
    var firstday = new Date(sd.setDate(first));
    return firstday;

  }

  getBlanks = (month: number, year: number) => {

    const date = new Date(("0" + (month+1)).slice(-2) + '/01/' + year);
    const day = date.getDay();
    return day;

  }

  insertDates = (month: number, year: number) => {

    var html = "";

    html += '<div class="d-flex align-baseline flex-grow flex-wrap">';

    const dateNumber = this.getLastDayOfLastMonth(month, year);

    for(var i = 0; i < this.getBlanks(month, year); i++) {

      html += '<div class="day-item date-item-before fw-100">';
      html += dateNumber-(this.getBlanks(month, year) - i - 1);
      html += '</div>';  

    }

    for(i = 0; i < this.getLastDayOfMonth(month, year); i++) {

      const mmdd = ("0" + (month+1)).slice(-2) + "/" + ("0" + (i+1)).slice(-2);

      var partName = "";

      if(this.events[mmdd] != null) {
        partName = "event-calendar-day-with-event";
        html += '<div part="' + partName + '" class="day-item date-item fw-600">';
          html += '<div>'
            html += (i + 1);
          html += '</div>'
          html += '<div class="d-flex justify-center">'
            html += '<div part="event-date-indicator-primary" class="dot"></div>'
          html += '</div>'
        html += '</div>';  
      } else {
        partName = "event-calendar-day-without-event";
        html += '<div part="' + partName + '" class="day-item date-item fw-100">';
          html += '<div>'
            html += (i + 1);
          html += '</div>'
        html += '</div>'; 
      }

    }

    for(i = 0; i < 42 - (this.getBlanks(month, year) + this.getLastDayOfMonth(month, year)); i++) {
      html += '<div class="day-item date-item-before fw-100">';
      html += (i+1);
      html += '</div>'; 
    }

    html += '</div>';

    return html;

  }

  insertDayNames = () => {

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

  }

  renderStreamEvents = (index: number, month: number, year: number) => {

    const lastDay = this.getLastDayOfMonth(month, year);

    var html = '<div id="stream-event-'+index+'" part="stream-event-list" class="stream-event-list">';

    var total = 0;

    for(var i = 1; i <= lastDay; i++) {

      const mmdd = ("0" + (month+1)).slice(-2) + "/" + ("0" + i).slice(-2);
      if(this.events[mmdd] != null) {
        total++;
      }

    }

    html += '<div id="stream-event-summary" part="stream-event-total">';
    html += 'Total: <strong>'+total+'</strong>';
    html += '</div>';

    for(i = 1; i <= lastDay; i++) {

      const mmdd = ("0" + (month+1)).slice(-2) + "/" + ("0" + i).slice(-2);

      var hide = true;

      if(this.events[mmdd] != null) {
        hide = false;
      } else if(i === 1){
        hide = false;
      } else if(i === lastDay){
        hide = false;
      } else {
        const mmddPrev = ("0" + (month+1)).slice(-2) + "/" + ("0" + (i-1)).slice(-2);
        const mmddNext = ("0" + (month+1)).slice(-2) + "/" + ("0" + (i+1)).slice(-2);
        console.log('hide', i, hide);
        if((this.events[mmddPrev] != null || this.events[mmddNext] != null)) {
          hide = false;
        }
      }

      console.log('hide', i, hide);

      if(this.events[mmdd] != null) {
        total++;
        //html += '<div>'+month + ',' + year + ',' + i+'</div>'
        html += '<div part="stream-event-selected" class="d-flex stream-event-selected">';
          html += '<div part="stream-event-selected-date">'+("0" + i).slice(-2)+' |</div>';
          html += '<div class="stream-event-list-container flex-grow">'
          for(var j = 0; j < (this.events[mmdd] as Array<any>).length; j++) {
            html += '<div class="stream-events-container flex-grow">';
              html += '<table>';
              html += '<thead>';
              for(var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
                if(this.getEventPreviewFields().includes(Object.keys(this.events[mmdd][j])[k])) {
                  html += '<th part="td-head" class="bg-left-no-border">';
                  html += Object.keys(this.events[mmdd][j])[k];
                  html += '</th>';
                }
              }
              html += '<th part="td-head">';
              html += '</th>';
              // for(var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
              //   html += '<th part="td-head">';
              //   html += Object.keys(this.events[mmdd][j])[k];
              //   html += '</th>';
              // }
              html += '</thead>';
              html += '<tbody>';
              for(var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
                if(this.getEventPreviewFields().includes(Object.keys(this.events[mmdd][j])[k])) {
        
                  html += '<td part="td-body">';
                  if(this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]].indexOf("[") >= 0) {
                    html += this.getEventTexts(Object.keys(this.events[mmdd][j])[k], JSON.parse(this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]]), this.events[mmdd][j]);
                  } else {
                    html += ' <sf-i-elastic-text text="'+this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]].replace(/"/g, "")+'" minLength="20"></sf-i-elastic-text>';
                  }
                  html += '</td>';
                  
                }
              }
              html += '<td id="td-expand-'+i+'" part="td-body">';
              html += '<button id="button-unmapped-expand-'+mmdd.replace('/', '-')+'-'+j+'" part="button-icon-small" class="material-icons button-expand">open_in_new</button>'
              html += '</td>';
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
            html += '</div>';
          }
          html += '</div>'
        html += '</div>';
      } else {
        if(!hide) {
          html += '<div part="stream-event-not-selected" class="d-flex stream-event-not-selected">';
          html += '<div>'+("0" + i).slice(-2)+'</div>';
          html += '</div>';
        } else {
          html += '<div part="stream-event-not-selected" class="d-flex stream-event-not-selected-hidden">';
          //html += '<div>'+("0" + i).slice(-2)+' |</div>';
          html += '<div>.</div>';
          html += '</div>';
        }
      }
      

    }

    html += '</div>'

    return html;

  }

  renderUpcomingEvents = (index:number, startDate: Date, count: number) => {

    var html = '<div id="stream-event-'+index+'" part="stream-event-list" class="stream-event-list">';

    for(var i = 1; i <= count; i++) {

      const mmdd = ("0" + (startDate.getMonth()+1)).slice(-2) + "/" + ("0" + startDate.getDate()).slice(-2);

      var hide = true;

      if(this.events[mmdd] != null) {
        hide = false;
      } else if(i === 1){
        hide = false;
      } else if(i === (count)){
        hide = false;
      } else {

        const startNextDate = new Date(startDate.getTime());
        startNextDate.setDate(startDate.getDate() + 1);

        const startPrevDate = new Date(startDate.getTime());
        startPrevDate.setDate(startDate.getDate() - 1);

        const mmddNext = ("0" + (startNextDate.getMonth()+1)).slice(-2) + "/" + ("0" + (startNextDate.getDate())).slice(-2);
        const mmddPrev = ("0" + (startPrevDate.getMonth()+1)).slice(-2) + "/" + ("0" + (startPrevDate.getDate())).slice(-2);
        console.log('hide', i, hide, startNextDate, startPrevDate, mmddNext, mmddPrev);
        if((this.events[mmddPrev] != null || this.events[mmddNext] != null)) {
          hide = false;
        }
      }

      if(this.events[mmdd] != null) {

        html += '<div part="stream-event-selected" class="d-flex stream-event-selected">';
          html += '<div part="stream-event-selected-date">'+("0" + startDate.getDate()).slice(-2)+'/'+(startDate.getMonth()+1)+' |</div>';
          html += '<div class="stream-event-list-container flex-grow">'
          for(var j = 0; j < (this.events[mmdd] as Array<any>).length; j++) {
            html += '<div class="stream-events-container flex-grow">';
              html += '<table>';
              html += '<thead>';
              for(var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
                if(this.getEventPreviewFields().includes(Object.keys(this.events[mmdd][j])[k])) {
                  html += '<th part="td-head" class="bg-left-no-border">';
                  html += Object.keys(this.events[mmdd][j])[k];
                  html += '</th>';
                }
              }
              html += '<th part="td-head">';
              html += '</th>';
              // for(var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
              //   html += '<th part="td-head">';
              //   html += Object.keys(this.events[mmdd][j])[k];
              //   html += '</th>';
              // }
              html += '</thead>';
              html += '<tbody>';
              for(var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
                if(this.getEventPreviewFields().includes(Object.keys(this.events[mmdd][j])[k])) {
        
                  html += '<td part="td-body">';
                  if(this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]].indexOf("[") >= 0) {
                    html += this.getEventTexts(Object.keys(this.events[mmdd][j])[k], JSON.parse(this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]]), this.events[mmdd][j]);
                  } else {
                    html += ' <sf-i-elastic-text text="'+this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]].replace(/"/g, "")+'" minLength="20"></sf-i-elastic-text>';
                  }
                  html += '</td>';
                  
                }
              }
              html += '<td id="td-expand-'+i+'" part="td-body">';
              html += '<button id="button-unmapped-expand-'+mmdd.replace('/', '-')+'-'+j+'" part="button-icon-small" class="material-icons button-expand">open_in_new</button>'
              html += '</td>';
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
            html += '</div>';
          }
          html += '</div>';
        html += '</div>';

      } else {

        if(!hide) {
          html += '<div part="stream-event-not-selected" class="d-flex stream-event-not-selected">';
          html += '<div>'+("0" + startDate.getDate()).slice(-2)+'/'+(startDate.getMonth()+1)+'</div>';
          html += '</div>';
        } else {
          html += '<div part="stream-event-not-selected" class="d-flex stream-event-not-selected-hidden">';
          //html += '<div>'+("0" + i).slice(-2)+' |</div>';
          html += '<div>.</div>';
          html += '</div>';
        }

      }

      startDate.setDate(startDate.getDate() + 1);

    }

    html += '</div>'

    return html;

  }

  renderThisEvents = (index: number, startDate: Date) => {

    var html = '<div id="stream-event-'+index+'" part="stream-event-list" class="stream-event-list">';

    var firstDate = new Date();
    var count = 7;

    console.log('this start date', startDate);

    if(index === 0) {

      firstDate = (this.getFirstDateOfWeek(startDate) as Date);
      console.log('this first date', firstDate);
      count = 7;

    }

    if(index === 1) {

      firstDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
      count = this.getLastDayOfMonth(startDate.getFullYear(), startDate.getMonth());

    }

    for(var i = 1; i <= count; i++) {

      const mmdd = ("0" + (firstDate.getMonth()+1)).slice(-2) + "/" + ("0" + firstDate.getDate()).slice(-2);

      var hide = true;

      if(this.events[mmdd] != null) {
        hide = false;
      } else if(i === 1){
        hide = false;
      } else if(i === (count)){
        hide = false;
      } else {

        const startNextDate = new Date(firstDate.getTime());
        startNextDate.setDate(firstDate.getDate() + 1);

        const startPrevDate = new Date(firstDate.getTime());
        startPrevDate.setDate(firstDate.getDate() - 1);

        const mmddNext = ("0" + (startNextDate.getMonth()+1)).slice(-2) + "/" + ("0" + (startNextDate.getDate())).slice(-2);
        const mmddPrev = ("0" + (startPrevDate.getMonth()+1)).slice(-2) + "/" + ("0" + (startPrevDate.getDate())).slice(-2);
        console.log('hide', i, hide, startNextDate, startPrevDate, mmddNext, mmddPrev);
        if((this.events[mmddPrev] != null || this.events[mmddNext] != null)) {
          hide = false;
        }
      }

      if(this.events[mmdd] != null) {

        html += '<div part="stream-event-selected" class="d-flex stream-event-selected">';
          html += '<div part="stream-event-selected-date">'+("0" + firstDate.getDate()).slice(-2)+'/'+(firstDate.getMonth()+1)+' |</div>';
          html += '<div class="stream-event-list-container flex-grow">'
          for(var j = 0; j < (this.events[mmdd] as Array<any>).length; j++) {
            html += '<div class="stream-events-container flex-grow">';
              html += '<table>';
              html += '<thead>';
              for(var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
                if(this.getEventPreviewFields().includes(Object.keys(this.events[mmdd][j])[k])) {
                  html += '<th part="td-head" class="bg-left-no-border">';
                  html += Object.keys(this.events[mmdd][j])[k];
                  html += '</th>';
                }
              }
              html += '<th part="td-head">';
              html += '</th>';
              // for(var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
              //   html += '<th part="td-head">';
              //   html += Object.keys(this.events[mmdd][j])[k];
              //   html += '</th>';
              // }
              
              html += '</thead>';
              html += '<tbody>';
              for(var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
                if(this.getEventPreviewFields().includes(Object.keys(this.events[mmdd][j])[k])) {
        
                  html += '<td part="td-body">';
                  if(this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]].indexOf("[") >= 0) {
                    html += this.getEventTexts(Object.keys(this.events[mmdd][j])[k], JSON.parse(this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]]), this.events[mmdd][j]);
                  } else {
                    html += ' <sf-i-elastic-text text="'+this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]].replace(/"/g, "")+'" minLength="20"></sf-i-elastic-text>';
                  }
                  html += '</td>';
                  
                }
              }
              html += '<td id="td-expand-'+i+'" part="td-body">';
              html += '<button id="button-unmapped-expand-'+mmdd.replace('/', '-')+'-'+j+'" part="button-icon-small" class="material-icons button-expand">open_in_new</button>'
              html += '</td>';
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
            html += '</div>';
          }
          html += '</div>';
        html += '</div>';

      } else {

        if(!hide) {
          html += '<div part="stream-event-not-selected" class="d-flex stream-event-not-selected">';
          html += '<div>'+("0" + firstDate.getDate()).slice(-2)+'/'+(firstDate.getMonth()+1)+'</div>';
          html += '</div>';
        } else {
          html += '<div part="stream-event-not-selected" class="d-flex stream-event-not-selected-hidden">';
          //html += '<div>'+("0" + i).slice(-2)+' |</div>';
          html += '<div>.</div>';
          html += '</div>';
        }

      }

      firstDate.setDate(firstDate.getDate() + 1);

    }

    html += '</div>'

    return html;

  }

  renderPastEvents = (index: number, startDate: Date) => {

    var html = '<div id="stream-event-'+index+'" part="stream-event-list" class="stream-event-list">';

    var firstDate = new Date();
    var count = 7;

    console.log('this start date', startDate, index);

    if(index === 0) {

      firstDate = (this.getFirstDateOfLastWeek(startDate) as Date);
      console.log('this first date', firstDate);
      count = 7;

    }

    if(index === 1) {

      firstDate = (this.getFirstDayOfLastMonth(startDate) as Date);
      count = this.getLastDayOfLastMonth(startDate.getMonth(), startDate.getFullYear());

      console.log('this start date', firstDate);
      console.log('this start date', count);

    }

    for(var i = 1; i <= count; i++) {

      const mmdd = ("0" + (firstDate.getMonth()+1)).slice(-2) + "/" + ("0" + firstDate.getDate()).slice(-2);

      var hide = true;

      if(this.events[mmdd] != null) {
        hide = false;
      } else if(i === 1){
        hide = false;
      } else if(i === (count)){
        hide = false;
      } else {

        const startNextDate = new Date(firstDate.getTime());
        startNextDate.setDate(firstDate.getDate() + 1);

        const startPrevDate = new Date(firstDate.getTime());
        startPrevDate.setDate(firstDate.getDate() - 1);

        const mmddNext = ("0" + (startNextDate.getMonth()+1)).slice(-2) + "/" + ("0" + (startNextDate.getDate())).slice(-2);
        const mmddPrev = ("0" + (startPrevDate.getMonth()+1)).slice(-2) + "/" + ("0" + (startPrevDate.getDate())).slice(-2);
        console.log('hide', i, hide, startNextDate, startPrevDate, mmddNext, mmddPrev);
        if((this.events[mmddPrev] != null || this.events[mmddNext] != null)) {
          hide = false;
        }
      }

      if(this.events[mmdd] != null) {

        html += '<div part="stream-event-selected" class="d-flex stream-event-selected">';
          html += '<div part="stream-event-selected-date">'+("0" + firstDate.getDate()).slice(-2)+'/'+(firstDate.getMonth()+1)+' |</div>';
          html += '<div class="stream-event-list-container flex-grow">'
          for(var j = 0; j < (this.events[mmdd] as Array<any>).length; j++) {
            html += '<div class="stream-events-container flex-grow">';
              html += '<table>';
              html += '<thead>';
              for(var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
                if(this.getEventPreviewFields().includes(Object.keys(this.events[mmdd][j])[k])) {
                  html += '<th part="td-head" class="bg-left-no-border">';
                  html += Object.keys(this.events[mmdd][j])[k];
                  html += '</th>';
                }
              }
              html += '<th part="td-head">';
              html += '</th>';
              // for(var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
              //   html += '<th part="td-head">';
              //   html += Object.keys(this.events[mmdd][j])[k];
              //   html += '</th>';
              // }
              html += '</thead>';
              html += '<tbody>';
              for(var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
                if(this.getEventPreviewFields().includes(Object.keys(this.events[mmdd][j])[k])) {
        
                  html += '<td part="td-body">';
                  if(this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]].indexOf("[") >= 0) {
                    html += this.getEventTexts(Object.keys(this.events[mmdd][j])[k], JSON.parse(this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]]), this.events[mmdd][j]);
                  } else {
                    html += ' <sf-i-elastic-text text="'+this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]].replace(/"/g, "")+'" minLength="20"></sf-i-elastic-text>';
                  }
                  html += '</td>';
                  
                }
              }
              html += '<td id="td-expand-'+i+'" part="td-body">';
              html += '<button id="button-unmapped-expand-'+mmdd.replace('/', '-')+'-'+j+'" part="button-icon-small" class="material-icons button-expand">open_in_new</button>'
              html += '</td>';
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
            html += '</div>';
          }
          html += '</div>';
        html += '</div>';

      } else {

        if(!hide) {
          html += '<div part="stream-event-not-selected" class="d-flex stream-event-not-selected">';
          html += '<div>'+("0" + firstDate.getDate()).slice(-2)+'/'+(firstDate.getMonth()+1)+'</div>';
          html += '</div>';
        } else {
          html += '<div part="stream-event-not-selected" class="d-flex stream-event-not-selected-hidden">';
          //html += '<div>'+("0" + i).slice(-2)+' |</div>';
          html += '<div>.</div>';
          html += '</div>';
        }

      }

      firstDate.setDate(firstDate.getDate() + 1);

    }

    html += '</div>'

    return html;

  }

  renderRangeEvents = (firstDate: Date, count: number) => {

    var html = '<div id="stream-event-0" part="stream-event-list" class="stream-event-list">';

    for(var i = 1; i <= count; i++) {

      const mmdd = ("0" + (firstDate.getMonth()+1)).slice(-2) + "/" + ("0" + firstDate.getDate()).slice(-2);

      var hide = true;

      if(this.events[mmdd] != null) {
        hide = false;
      } else if(i === 1){
        hide = false;
      } else if(i === (count)){
        hide = false;
      } else {

        const startNextDate = new Date(firstDate.getTime());
        startNextDate.setDate(firstDate.getDate() + 1);

        const startPrevDate = new Date(firstDate.getTime());
        startPrevDate.setDate(firstDate.getDate() - 1);

        const mmddNext = ("0" + (startNextDate.getMonth()+1)).slice(-2) + "/" + ("0" + (startNextDate.getDate())).slice(-2);
        const mmddPrev = ("0" + (startPrevDate.getMonth()+1)).slice(-2) + "/" + ("0" + (startPrevDate.getDate())).slice(-2);
        console.log('hide', i, hide, startNextDate, startPrevDate, mmddNext, mmddPrev);
        if((this.events[mmddPrev] != null || this.events[mmddNext] != null)) {
          hide = false;
        }
      }

      if(this.events[mmdd] != null) {

        html += '<div part="stream-event-selected" class="d-flex stream-event-selected">';
          html += '<div part="stream-event-selected-date">'+("0" + firstDate.getDate()).slice(-2)+'/'+(firstDate.getMonth()+1)+' |</div>';
          html += '<div class="stream-event-list-container flex-grow">'
          for(var j = 0; j < (this.events[mmdd] as Array<any>).length; j++) {
            html += '<div class="stream-events-container flex-grow">';
              html += '<table>';
              html += '<thead>';
              for(var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
                if(this.getEventPreviewFields().includes(Object.keys(this.events[mmdd][j])[k])) {
                  html += '<th part="td-head" class="bg-left-no-border">';
                  html += Object.keys(this.events[mmdd][j])[k];
                  html += '</th>';
                }
              }
              html += '<th part="td-head">';
              html += '</th>';
              // for(var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
              //   html += '<th part="td-head">';
              //   html += Object.keys(this.events[mmdd][j])[k];
              //   html += '</th>';
              // }
              html += '</thead>';
              html += '<tbody>';
              for(var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
                if(this.getEventPreviewFields().includes(Object.keys(this.events[mmdd][j])[k])) {
        
                  html += '<td part="td-body">';
                  if(this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]].indexOf("[") >= 0) {
                    html += this.getEventTexts(Object.keys(this.events[mmdd][j])[k], JSON.parse(this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]]), this.events[mmdd][j]);
                  } else {
                    html += ' <sf-i-elastic-text text="'+this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]].replace(/"/g, "")+'" minLength="20"></sf-i-elastic-text>';
                  }
                  html += '</td>';
                  
                }
              }
              html += '<td id="td-expand-'+i+'" part="td-body">';
              html += '<button id="button-unmapped-expand-'+mmdd.replace('/', '-')+'-'+j+'" part="button-icon-small" class="material-icons button-expand">open_in_new</button>'
              html += '</td>';
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
            html += '</div>';
          }
          html += '</div>';
        html += '</div>';

      } else {

        if(!hide) {
          html += '<div part="stream-event-not-selected" class="d-flex stream-event-not-selected">';
          html += '<div>'+("0" + firstDate.getDate()).slice(-2)+'/'+(firstDate.getMonth()+1)+'</div>';
          html += '</div>';
        } else {
          html += '<div part="stream-event-not-selected" class="d-flex stream-event-not-selected-hidden">';
          //html += '<div>'+("0" + i).slice(-2)+' |</div>';
          html += '<div>.</div>';
          html += '</div>';
        }

      }

      firstDate.setDate(firstDate.getDate() + 1);

    }


    html += '</div>';

    (this._SfCustomContainer as HTMLDivElement).querySelector('.calendar-right-data')!.innerHTML = html;

    const buttonArr = (this._SfCustomContainer as HTMLDivElement).querySelectorAll('.button-expand') as NodeListOf<HTMLButtonElement>;

    for(var i = 0; i < buttonArr.length; i++) {

      buttonArr[i].addEventListener('click', (ev: any) => {

        const id = ev.target.id;
        const idArr = id.split("-")
        const mmdd = idArr[3] + "/" + idArr[4];
        const j = idArr[5];

        (this._SfDetailContainer as HTMLDivElement).style.display = 'block'

        this.renderEventDetail(this.events[mmdd][j]);
  
      })

    }

  }

  checkStartDateEarliness = (value: string) => {

    var startDateCalendar = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + this.calendarStartYYYY);
    var startDateChosen = new Date(value);

    if(startDateChosen.getTime() > startDateCalendar.getTime()) {
      return true;
    } else {
      return false;
    }
  }

  checkEndDateLateness = (value: string) => {

    var endDateCalendar = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + (parseInt(this.calendarStartYYYY) + 1));
    var endDateChosen = new Date(value);

    console.log('end date calendar', endDateCalendar);
    console.log('end date chosen', endDateChosen);

    if(endDateChosen.getTime() > endDateCalendar.getTime()) {
      return false;
    } else {
      return true;
    }
  }

  processDateSelection = () => {

    var startDateCalendar = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + this.calendarStartYYYY);
    var endDateCalendar = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + (parseInt(this.calendarStartYYYY) + 1));

    const valueStart = ((this._SfCustomContainer as HTMLDivElement).querySelector('#stream-start-date') as HTMLInputElement).value;
    const valueEnd = ((this._SfCustomContainer as HTMLDivElement).querySelector('#stream-end-date') as HTMLInputElement).value;

    if(valueStart != "" && valueEnd != "") {
      this.initCustomRightCol();
      if(!this.checkStartDateEarliness(valueStart)) {
        (this._SfStreamEventStatus as HTMLDivElement).innerHTML = "Chosen Start Date cannot be earlier than " + startDateCalendar;
        return;
      }
      if(!this.checkEndDateLateness(valueEnd)) {
        (this._SfStreamEventStatus as HTMLDivElement).innerHTML = "Chosen End Date cannot be later than " + endDateCalendar;
        return;
      }
      if(new Date(valueStart).getTime() > new Date(valueEnd).getTime()) {
        (this._SfStreamEventStatus as HTMLDivElement).innerHTML = "Chosen End Date cannot be earlier than chosen Start Date";
        return;
      }
      if((new Date(valueEnd).getTime() - new Date(valueStart).getTime())/(1000*60*60*24) > 90) {
        (this._SfStreamEventStatus as HTMLDivElement).innerHTML = "Chosen time window cannot be greater than 90 days";
        return;
      }
      this.renderRangeEvents(new Date(valueStart), (new Date(valueEnd).getTime() - new Date(valueStart).getTime())/(1000*60*60*24));
    } else if(valueStart != "" && valueEnd == "") {
      (this._SfStreamEventStatus as HTMLDivElement).innerHTML = "Please select End Date";
    } else if(valueStart == "" && valueEnd != "") {
      (this._SfStreamEventStatus as HTMLDivElement).innerHTML = "Please select Start Date";
    } else {
      (this._SfStreamEventStatus as HTMLDivElement).innerHTML = "Please select Start Date and End Date";
    }

  }

  initCustomRightCol = () => {

    var html = "";

    html += '<div id="stream-event-0" part="stream-event-list" class="stream-event-list">';
      html += '<div part="stream-event-not-selected" class="d-flex stream-event-not-selected">';
      html += '<div><h2 id="stream-event-status">Please select Start Date and End Date</h2></div>';
      html += '</div>';
    html += '</div>';


    (this._SfCustomContainer as HTMLDivElement).querySelector('.calendar-right-data')!.innerHTML = html

  }

  checkAndShowBulk = () => {

    const inputArr = (this._SfMappingContainer as HTMLDivElement).querySelectorAll('.input-checkbox') as NodeListOf<HTMLInputElement>;

    var checked = 0;

    console.log('checkAndShowBulk', inputArr.length);

    for(var i = 0; i < inputArr.length; i++) {

      console.log(inputArr[i].checked);
      if(inputArr[i].checked) {
        checked++;
      }
      
    }

    console.log('checkAndShowBulk', checked);

    if(checked > 1) {
      return true;
    }

    return false;

  }

  calculateAndShowSummary = () => {

    console.log('showing summary');

    const inputArr = (this._SfMappingContainer as HTMLDivElement).querySelectorAll('.input-users');
    var mapped = 0;
    for(var i = 0; i < Object.keys(this.mappedValuesUsers).length; i++) {
      if(this.mappedValuesUsers[Object.keys(this.mappedValuesUsers)[i]].length > 0) {
        mapped++;
      }
    }

    (this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-summary')!.innerHTML = 'Completed ' + mapped + ' / ' + inputArr.length;
    ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-graph')!.querySelector('.div-graph-pending')! as HTMLDivElement).style.width = ((inputArr.length - mapped)*100/(inputArr.length)) + '%';
    ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-graph')!.querySelector('.div-graph-complete')! as HTMLDivElement).style.width = ((mapped)*100/(inputArr.length)) + '%';

    console.log('showing summary', mapped, Object.keys(this.mappedValuesUsers).length);

    if(mapped == inputArr.length) {
      ((this._SfMappingContainer as HTMLDivElement).querySelector('#button-back-add-mapping') as HTMLButtonElement)!.style.visibility = 'visible';
    } else {
      ((this._SfMappingContainer as HTMLDivElement).querySelector('#button-back-add-mapping') as HTMLButtonElement)!.style.visibility = 'hidden';
    }
  }

  showAllEvents = () => {

    ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-filter-all') as HTMLInputElement)!.checked = true;
    // ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-filter-mapped') as HTMLInputElement)!.checked = false;
    // ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-filter-unmapped') as HTMLInputElement)!.checked = false;
    //this.renderMapping(this.unmappedEvents)
    this.applyFilter();
    this.calculateAndShowSummary();
    
  }

  showMappedEvents = () => {

    // ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-filter-all') as HTMLInputElement)!.checked = false;
    ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-filter-mapped') as HTMLInputElement)!.checked = true;
    // ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-filter-unmapped') as HTMLInputElement)!.checked = false;
    //this.renderMapping(this.unmappedEvents)
    this.applyFilter("mapped")

  }

  showUnmappedEvents = () => {

    // ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-filter-all') as HTMLInputElement)!.checked = false;
    // ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-filter-mapped') as HTMLInputElement)!.checked = false;
    ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-filter-unmapped') as HTMLInputElement)!.checked = true;
    //this.renderMapping(this.unmappedEvents)
    this.applyFilter("unmapped")

  }

  updateInAllSelections = (param: string, value: any) => {

    console.log('updateinallselections', param, value);

    const inputArr = (this._SfMappingContainer as HTMLDivElement).querySelectorAll('.input-checkbox') as NodeListOf<HTMLInputElement>;
    const inputDatesArr = (this._SfMappingContainer as HTMLDivElement).querySelectorAll('.input-dates') as NodeListOf<HTMLInputElement>;
    const divDatesArr = (this._SfMappingContainer as HTMLDivElement).querySelectorAll('.div-dates') as NodeListOf<HTMLDivElement>;
    const inputTagsArr = (this._SfMappingContainer as HTMLDivElement).querySelectorAll('.input-tags') as NodeListOf<SfIForm>;
    const divTagsArr = (this._SfMappingContainer as HTMLDivElement).querySelectorAll('.div-tags') as NodeListOf<HTMLDivElement>;
    const inputUsersArr = (this._SfMappingContainer as HTMLDivElement).querySelectorAll('.input-users') as NodeListOf<SfIForm>;
    const divUsersArr = (this._SfMappingContainer as HTMLDivElement).querySelectorAll('.div-users') as NodeListOf<HTMLDivElement>;

    for(var i = 0; i < inputArr.length; i++) {
      console.log('updateinallselections', i);
      if(inputArr[i].checked) {
        if(param == "duedate") {
          inputDatesArr[i].value = value;
          divDatesArr[i].innerHTML = value;
          this.mappedValuesDueDates[i] = value;
        }
        if(param == "tags") {
          inputTagsArr[i].preselectedValues = JSON.stringify(value);
          inputTagsArr[i].populatePreselected();
          divTagsArr[i].innerHTML = '';
          var html = '';
          for(var j = 0; j < value.length; j++) {
            html += value[j];
            if(j < (value.length - 1)) {
              html += ",";
            }
          }
          divTagsArr[i].innerHTML = '<sf-i-elastic-text text="'+html+'" minLength="20"></sf-i-elastic-text>';
          this.mappedValuesTags[i] = value;
        }
        if(param == "users") {
          // inputUsersArr[i].value = value;
          // divUsersArr[i].innerHTML = value;
          // this.mappedValuesUsers[i] = value;
          inputUsersArr[i].preselectedValues = JSON.stringify(value);
          inputUsersArr[i].populatePreselected();
          divUsersArr[i].innerHTML = '';
          var html = '';
          for(var j = 0; j < value.length; j++) {
            html += value[j];
            if(j < (value.length - 1)) {
              html += ",";
            }
          }
          divUsersArr[i].innerHTML = '<sf-i-elastic-text text="'+html+'" minLength="20"></sf-i-elastic-text>';
          this.mappedValuesUsers[i] = value;
          this.updateMappingStatus(value, i);
          this.calculateAndShowSummary();
        }
      }
    }

  }

  updateMappingStatus = (value: any, clickIndex: number) => {
    console.log('clickindex', clickIndex);
    if(value.length > 0) {
      ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-status-'+clickIndex) as HTMLDivElement).innerHTML = '<span class="material-icons color-done">check_circle</done>'
    } else {
      ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-status-'+clickIndex) as HTMLDivElement).innerHTML = '<span class="material-icons color-pending">pending</done>'
    }
  }

  renderCustom = () => {

    var html = '';

    html += '<div class="d-flex flex-grow">';
      html += '<div class="d-flex calendar-left-col flex-col align-end">';

        html += '<div class="title-item-date">';
        html += '<label part="input-label">Start Date</label><br />'
        html += '<input id="stream-start-date" part="input" type="date" />'
        html += '</div>';
        html += '<div class="title-item-date">';
        html += '<label part="input-label">End Date</label><br />'
        html += '<input id="stream-end-date" part="input" type="date" />'
        html += '</div>';

      html += '</div>';

      html += '<div class="calendar-right-data">';

      html += '</div>';
    html += '</div>';

    (this._SfCustomContainer as HTMLDivElement).innerHTML = html;

    this.initCustomRightCol();

    (this._SfCustomContainer as HTMLDivElement).querySelector('#stream-start-date')?.addEventListener('change', (ev: any) => {
      console.log('start-date', ev);
      this.processDateSelection();
    });

    (this._SfCustomContainer as HTMLDivElement).querySelector('#stream-end-date')?.addEventListener('change', (ev: any) => {
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
  }

  renderPast = (index: number = 0) => {

    var html = '';

    html += '<div class="d-flex flex-grow">';
      html += '<div class="calendar-left-col">';

        var part = "";
        if(index === 0) {
          part = "stream-month-selected";
        } else {
          part = "stream-month-not-selected";
        }
        html += '<div part="'+part+'" id="stream-month-0" part="month-title" class="title-item '+part+'">Week</div>';

        part = "";
        if(index === 1) {
          part = "stream-month-selected";
        } else {
          part = "stream-month-not-selected";
        }
        html += '<div part="'+part+'" id="stream-month-1" part="month-title" class="title-item '+part+'">Month</div>';

      html += '</div>';
      html += '<div class="calendar-right-data">';

      // var startDate = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + this.calendarStartYYYY);
      var startDate = new Date();
      html += this.renderPastEvents(index, startDate);
      startDate.setDate(startDate.getDate() + 1);
        
      html += '</div>';
    html += '</div>';

    (this._SfPastContainer as HTMLDivElement).innerHTML = html;

    for(var i = 0; i < 3; i++) {
      (this._SfPastContainer as HTMLDivElement).querySelector('#stream-month-' + i)?.addEventListener('click', (ev: any)=> {
        const target = parseInt((ev.target as HTMLDivElement).id.split('-')[2]);
        console.log('clicked ', target);
        this.renderPast(target);
      })
    }

    const buttonArr = (this._SfPastContainer as HTMLDivElement).querySelectorAll('.button-expand') as NodeListOf<HTMLButtonElement>;

    for(i = 0; i < buttonArr.length; i++) {

      buttonArr[i].addEventListener('click', (ev: any) => {

        const id = ev.target.id;
        const idArr = id.split("-")
        const mmdd = idArr[3] + "/" + idArr[4];
        const j = idArr[5];

        (this._SfDetailContainer as HTMLDivElement).style.display = 'block'

        this.renderEventDetail(this.events[mmdd][j]);
  
      })

    }

  }

  renderUpcoming = (index: number = 0) => {

    var html = '';

    html += '<div class="d-flex flex-grow">';
      html += '<div class="calendar-left-col">';

        var part = "";
        if(index === 0) {
          part = "stream-month-selected";
        } else {
          part = "stream-month-not-selected";
        }
        html += '<div part="'+part+'" id="stream-month-0" part="month-title" class="title-item '+part+'">7 Days</div>';

        part = "";
        if(index === 1) {
          part = "stream-month-selected";
        } else {
          part = "stream-month-not-selected";
        }
        html += '<div part="'+part+'" id="stream-month-1" part="month-title" class="title-item '+part+'">30 Days</div>';

        part = "";
        if(index === 2) {
          part = "stream-month-selected";
        } else {
          part = "stream-month-not-selected";
        }
        html += '<div part="'+part+'" id="stream-month-2" part="month-title" class="title-item '+part+'">90 Days</div>';

      html += '</div>';
      html += '<div class="calendar-right-data">';

       // var startDate = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + this.calendarStartYYYY);
       var startDate = new Date();
      if(index === 0) {
        html += this.renderUpcomingEvents(index, startDate, 7);
        startDate.setDate(startDate.getDate() + 1);
      }

      if(index === 1) {
        html += this.renderUpcomingEvents(index, startDate, 30);
        startDate.setDate(startDate.getDate() + 1);
      }

      if(index === 2) {
        html += this.renderUpcomingEvents(index, startDate, 90);
        startDate.setDate(startDate.getDate() + 1);
      }

        
      html += '</div>';
    html += '</div>';

    (this._SfUpcomingContainer as HTMLDivElement).innerHTML = html;

    for(var i = 0; i < 3; i++) {
      (this._SfUpcomingContainer as HTMLDivElement).querySelector('#stream-month-' + i)?.addEventListener('click', (ev: any)=> {
        const target = parseInt((ev.target as HTMLDivElement).id.split('-')[2]);
        console.log('clicked ', target);
        this.renderUpcoming(target);

      })
    }

    const buttonArr = (this._SfUpcomingContainer as HTMLDivElement).querySelectorAll('.button-expand') as NodeListOf<HTMLButtonElement>;

    for(i = 0; i < buttonArr.length; i++) {

      buttonArr[i].addEventListener('click', (ev: any) => {

        const id = ev.target.id;
        const idArr = id.split("-")
        const mmdd = idArr[3] + "/" + idArr[4];
        const j = idArr[5];

        (this._SfDetailContainer as HTMLDivElement).style.display = 'block'

        this.renderEventDetail(this.events[mmdd][j]);
  
      })

    }

  }

  renderThis = (index: number = 0) => {

    var html = '';

    html += '<div class="d-flex flex-grow">';
      html += '<div class="calendar-left-col">';

        var part = "";
        if(index === 0) {
          part = "stream-month-selected";
        } else {
          part = "stream-month-not-selected";
        }
        html += '<div part="'+part+'" id="stream-month-0" part="month-title" class="title-item '+part+'">Week</div>';

        part = "";
        if(index === 1) {
          part = "stream-month-selected";
        } else {
          part = "stream-month-not-selected";
        }
        html += '<div part="'+part+'" id="stream-month-1" part="month-title" class="title-item '+part+'">Month</div>';

      html += '</div>';
      html += '<div class="calendar-right-data">';

      // var startDate = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + this.calendarStartYYYY);
      var startDate = new Date();
      html += this.renderThisEvents(index, startDate);
      startDate.setDate(startDate.getDate() + 1);
        
      html += '</div>';
    html += '</div>';

    (this._SfThisContainer as HTMLDivElement).innerHTML = html;

    for(var i = 0; i < 3; i++) {
      (this._SfThisContainer as HTMLDivElement).querySelector('#stream-month-' + i)?.addEventListener('click', (ev: any)=> {
        const target = parseInt((ev.target as HTMLDivElement).id.split('-')[2]);
        console.log('clicked ', target);
        this.renderThis(target);

      })
    }

    const buttonArr = (this._SfThisContainer as HTMLDivElement).querySelectorAll('.button-expand') as NodeListOf<HTMLButtonElement>;

    for(i = 0; i < buttonArr.length; i++) {

      buttonArr[i].addEventListener('click', (ev: any) => {

        const id = ev.target.id;
        const idArr = id.split("-")
        const mmdd = idArr[3] + "/" + idArr[4];
        const j = idArr[5];

        (this._SfDetailContainer as HTMLDivElement).style.display = 'block'

        this.renderEventDetail(this.events[mmdd][j]);
  
      })

    }
  }

  renderStream = (index: number = 0) => {

    console.log('renderstream', index);

    var startDate = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + this.calendarStartYYYY);

    var html = '';

    html += '<div class="d-flex flex-grow">';
      html += '<div class="calendar-left-col">';

        var startDate = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + this.calendarStartYYYY);

        for(var i = 0; i < 12; i++) {

          var part = "";

          if(i === index) {
            part = "stream-month-selected";
          } else {
            part = "stream-month-not-selected";
          }

          html += '<div part="'+part+'" id="stream-month-'+i+'" part="month-title" class="title-item '+part+'">' + this.monthNames[startDate.getMonth()] + '&nbsp;&nbsp;' + startDate.getFullYear() + '</div>';
          startDate.setMonth(startDate.getMonth() + 1);
        }

      html += '</div>';
      html += '<div class="calendar-right-data">';

        startDate = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + this.calendarStartYYYY);
        for(i = 0; i < 12; i++) {
          if(i === index) {
            console.log(i, index)
            html += this.renderStreamEvents(i, startDate.getMonth(), startDate.getFullYear())
          }
          startDate.setMonth(startDate.getMonth() + 1);
        }
      html += '</div>';
    html += '</div>';

    (this._SfStreamContainer as HTMLDivElement).innerHTML = html;

    for(var i = 0; i < 12; i++) {
      (this._SfStreamContainer as HTMLDivElement).querySelector('#stream-month-' + i)?.addEventListener('click', (ev: any)=> {

        const target = parseInt((ev.target as HTMLDivElement).id.split('-')[2]);
        this.renderStream(target);

      })
    }

    const buttonArr = (this._SfStreamContainer as HTMLDivElement).querySelectorAll('.button-expand') as NodeListOf<HTMLButtonElement>;

    for(i = 0; i < buttonArr.length; i++) {

      buttonArr[i].addEventListener('click', (ev: any) => {

        const id = ev.target.id;
        const idArr = id.split("-")
        const mmdd = idArr[3] + "/" + idArr[4];
        const j = idArr[5];

        (this._SfDetailContainer as HTMLDivElement).style.display = 'block'

        this.renderEventDetail(this.events[mmdd][j]);
  
      })

    }

    console.log('stream button array', buttonArr);

  }

  renderEventDetail = (event: any) => {

    console.log('event detail', event);

    var html = `
    
      <div class="d-flex justify-between m-20">
        <button part="button-icon" class="material-icons invisible">close</button>
        <h3 part="results-title" class="m-0">Compliance Details</h3>
        <button id="button-detail-close" part="button-icon" class="material-icons">close</button>
      </div>
    
    `;

    html += '<div class="d-flex m-20 flex-wrap">';

    for(var k = 0; k < Object.keys(event).length; k++) {
      if(!this.getEventPreviewFields().includes(Object.keys(event)[k])) {

        html += '<div class="m-20">';
        html += '<div part="detail-head"><strong>'+Object.keys(event)[k]+'</strong></div>'
        if(event[Object.keys(event)[k]].indexOf("[") >= 0) {
          html += this.getEventTexts(Object.keys(event)[k], JSON.parse(event[Object.keys(event)[k]]), event);
        } else {
          html += '<sf-i-elastic-text text="'+event[Object.keys(event)[k]].replace(/"/g, "")+'" minLength="20"></sf-i-elastic-text>';
        }
        html += '</div>';
        
      }
    }

    html += '</div>';

    html += '<hr>';

    html += '<div class="m-20">';

      html += '<h3>Submission</h3>';
      html += '<div class="d-flex m-20 flex-col">';
      html += '<label part="input-label">Comments</label>';
      html += '<input type="text" part="input" />';
      html += '</div>';

      html += '</div>';
    html += '<div>';

    (this._SfDetailContainer as HTMLDivElement).innerHTML = html;

    (this._SfDetailContainer as HTMLDivElement).querySelector('#button-detail-close')?.addEventListener('click', () => {

      (this._SfDetailContainer as HTMLDivElement).innerHTML = '';
      (this._SfDetailContainer as HTMLDivElement).style.display = 'none';

    });


  }

  renderCalendar = () => {

    console.log('redering calendar', this.events);

    var startDate = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + this.calendarStartYYYY);

    var html = '';

    for(var i = 0; i < 12; i++) {

      html += '<div class="calendar-item d-flex flex-col flex-grow" part="calendar-month">';
      html += '<div class="d-flex justify-between align-center">';
      html += '<div part="month-title" class="title-item">' + this.monthNames[startDate.getMonth()] + '&nbsp;&nbsp;' + startDate.getFullYear() + '</div>';
      html += '<button id="calendar-button-'+i+'" part="button-icon-small" class="title-item material-icons">open_in_new</button>'
      html += '</div>';
      html += this.insertDayNames();
      html += this.insertDates(startDate.getMonth(), startDate.getFullYear());
      html += '</div>';

      startDate.setMonth(startDate.getMonth() + 1);
  
    }

    (this._SfCalendarContainer as HTMLDivElement).innerHTML = html;

    for(var i = 0; i < 12; i++) {

      (this._SfCalendarContainer as HTMLDivElement).querySelector('#calendar-button-' + i)?.addEventListener('click', (ev: any) => {

        const id = (ev.target as HTMLButtonElement).id.split("-")[2];
        console.log('render stream', id);
        this.enableStream();
        this.renderTabs(this.TAB_STREAM);
        this.renderStream(parseInt(id));

      })

    }

  }

  renderRoleTabs = () => {

    (this._SfRoleTabContainer as HTMLDivElement).innerHTML = '';

    var html = '';

    html += '<button class="tab-button" id="consumer-tab-reporter" part="'+(this.myRole == this.TAB_REPORTER ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Reporter</button>';
    html += '<button class="tab-button" id="consumer-tab-approver" part="'+(this.myRole == this.TAB_APPROVER ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Approver</button>';
    
    (this._SfRoleTabContainer as HTMLDivElement).innerHTML = html;

    (this._SfRoleTabContainer as HTMLDivElement).querySelector('#consumer-tab-reporter')?.addEventListener('click', async () => {

      this.myRole = this.TAB_REPORTER;
      this.renderRoleTabs();
      await this.fetchUserCalendar();
      if(this.events != null) {
        this.renderTabs(this.TAB_YEAR);
        this.renderCalendar();
      }

    });

    (this._SfRoleTabContainer as HTMLDivElement).querySelector('#consumer-tab-approver')?.addEventListener('click', async () => {

      this.myRole = this.TAB_APPROVER;
      this.renderRoleTabs();
      await this.fetchUserCalendar();
      if(this.events != null) {
        this.renderTabs(this.TAB_YEAR);
        this.renderCalendar();
      }

    })

  }

  renderTabs = (selectedTab: string) => {

    this.clearAllCalendars();

    var html = '';

    html += '<button class="tab-button" id="calendar-tab-year" part="'+(selectedTab == this.TAB_YEAR ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Year</button>';
    html += '<button class="tab-button" id="calendar-tab-month" part="'+(selectedTab == this.TAB_STREAM ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Month</button>';
    html += '<button class="tab-button" id="calendar-tab-upcoming" part="'+(selectedTab == this.TAB_UPCOMING ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Upcoming</button>';
    html += '<button class="tab-button" id="calendar-tab-this" part="'+(selectedTab == this.TAB_THIS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Current</button>';
    html += '<button class="tab-button" id="calendar-tab-past" part="'+(selectedTab == this.TAB_PAST ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Past</button>';
    html += '<button class="tab-button" id="calendar-tab-custom" part="'+(selectedTab == this.TAB_CUSTOM ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Range</button>';

    (this._SfTabContainer as HTMLDivElement).innerHTML = html;

    (this._SfTabContainer as HTMLDivElement).querySelector('#calendar-tab-year')?.addEventListener('click', () => {
      if(this.mode == "consumer") {
        this.loadMode();
      } else {
        this.enableCalendar();
        this.renderTabs(this.TAB_YEAR);
      }
    });

    (this._SfTabContainer as HTMLDivElement).querySelector('#calendar-tab-month')?.addEventListener('click', () => {
      this.enableStream();
      this.renderTabs(this.TAB_STREAM);
      this.renderStream();
    });

    (this._SfTabContainer as HTMLDivElement).querySelector('#calendar-tab-upcoming')?.addEventListener('click', () => {
      this.enableUpcoming();
      this.renderTabs(this.TAB_UPCOMING);
      this.renderUpcoming();
    });

    (this._SfTabContainer as HTMLDivElement).querySelector('#calendar-tab-this')?.addEventListener('click', () => {
      this.enableThis();
      this.renderTabs(this.TAB_THIS);
      this.renderThis();
    });

    (this._SfTabContainer as HTMLDivElement).querySelector('#calendar-tab-past')?.addEventListener('click', () => {
      this.enablePast();
      this.renderTabs(this.TAB_PAST);
      this.renderPast();
    });

    (this._SfTabContainer as HTMLDivElement).querySelector('#calendar-tab-custom')?.addEventListener('click', () => {
      this.enableCustom();
      this.renderTabs(this.TAB_CUSTOM);
      this.renderCustom();
    });

  }

  renderMappingTabs = (selectedTab: string) => {

    var html = '';

    html += '<button class="tab-button" id="mapping-tab-reporter" part="'+(selectedTab == this.TAB_REPORTER ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Reporter</button>';
    html += '<button class="tab-button" id="mapping-tab-approver" part="'+(selectedTab == this.TAB_APPROVER ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Approver</button>';

    (this._SfMappingTabContainer as HTMLDivElement).innerHTML = html;

    (this._SfMappingTabContainer as HTMLDivElement).querySelector('#mapping-tab-reporter')?.addEventListener('click', () => {
      this.myRole = this.TAB_REPORTER;
      this.fetchEventMap();
      this.renderMappingTabs(this.TAB_REPORTER)
    });

    (this._SfMappingTabContainer as HTMLDivElement).querySelector('#mapping-tab-approver')?.addEventListener('click', () => {
      this.myRole = this.TAB_APPROVER;
      this.fetchEventMap();
      this.renderMappingTabs(this.TAB_APPROVER)
    });

  }

  renderExpandEvent = (events:any, index: any) => {

    var html = '';
                  
    for(var k = 0; k < Object.keys(events[index]).length; k++) {
      if(!this.getEventPreviewFields().includes(Object.keys(events[index])[k])) {

        html += '<td part="td-body">';
        if(events[index][Object.keys(events[index])[k]].indexOf("[") >= 0) {
          html += this.getEventTexts(Object.keys(events[index])[k], JSON.parse(events[index][Object.keys(events[index])[k]]), events[index]);
        } else {
          html += '<sf-i-elastic-text text="'+events[index][Object.keys(events[index])[k]].replace(/"/g, "")+'" minLength="20"></sf-i-elastic-text>';
        }
        html += '</td>';
        
      }
    }

    console.log((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-'+index)!.innerHTML);

    (this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-'+index)!.insertAdjacentHTML('beforeend', html);

    html = '';
    for(var k = 0; k < Object.keys(events[index]).length; k++) {
      if(!this.getEventPreviewFields().includes(Object.keys(events[index])[k])) {
        html += '<th part="td-head" class="bg-left">';
        html += Object.keys(events[index])[k];
        html += '</th>';
      }
    }

    (this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-head-'+index)!.insertAdjacentHTML('beforeend', html);

    ((this._SfMappingContainer as HTMLDivElement).querySelector('#th-expand-'+index) as HTMLElement).style.display = 'none';
    ((this._SfMappingContainer as HTMLDivElement).querySelector('#td-expand-'+index) as HTMLElement).style.display = 'none';

  }

  renderMapping = (unmappedEvents: any) => {

    this.mappedValuesDueDates = {};
    this.mappedValuesTags = {};
    this.mappedValuesUsers = {};

    console.log('rendering mapping', unmappedEvents, this.mappedValuesDueDates, this.mappedValuesUsers, this.mappedValuesTags)

    var html = '';

    html += '<div class="d-flex align-center mt-20">';
    html += '<div id="row-unmapped-graph" class="d-flex flex-grow"><div class="div-graph-complete"></div><div class="div-graph-pending"></div></div>';
    html += '<div id="row-unmapped-summary" part="filter-title" class="ml-10">Completed 0</div>';
    html += '</div>';

    html += '<table part="button" id="row-unmapped-table-multi-entry" class="hide fixed-bottom justify-center">';
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
    html += '<sf-i-form id="row-unmapped-input-multi-entry-tags" name="Tags" label="Select Tags" apiId="'+this.apiIdTags+'" mode="multiselect-dropdown" searchPhrase="'+(this._SfProject[0].querySelector('#sf-i-project') as SfIForm).selectedTexts()[0]+'" selectProjection="name" mandatory></sf-i-form>';
    //html += '<input part="input" type="text" id="row-unmapped-input-multi-entry-tags"  />';
    html += '</td>';
    html += '<td part="td-head">';
    html += '<sf-i-form id="row-unmapped-input-multi-entry-users" name="Users" label="Select Users" apiId="'+this.apiIdUsers+'" mode="multiselect-dropdown" searchPhrase="'+(this._SfProject[0].querySelector('#sf-i-project') as SfIForm).selectedTexts()[0]+'" selectProjection="name" mandatory></sf-i-form>';
    //html += '<input part="input" type="text" id="row-unmapped-input-multi-entry-users"  />';
    html += '</td>';
    html += '<td>';
    html += '</td>';
    html += '</tr>';
    html += '</table>';

    html += '<div class="d-flex align-center mt-20 mb-20">';
    html += '<div class="mr-10" part="filter-title">Filter</div>';
    html += '<div class="pr-10 pt-5 pb-5" part="filter-title"><label><input name="row-unmapped-filter" id="row-unmapped-filter-all" type="radio"/>All</label></div>'
    html += '<div class="pr-10 pt-5 pb-5" part="filter-title"><label><input name="row-unmapped-filter" id="row-unmapped-filter-mapped" type="radio"/>Mapped</label></div>'
    html += '<div class="pr-10 pt-5 pb-5" part="filter-title"><label><input name="row-unmapped-filter" id="row-unmapped-filter-unmapped" type="radio"/>Un-mapped</label></div>'
    html += '</div>'

    html += '<div class="container-mapping-event">';

    for(var i = 0; i < unmappedEvents.length; i++) {

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
      html += '<table id="row-unmapped-table'+i+'">';
      html += '<thead>';
      html += '<tr id="row-unmapped-head-'+i+'">';
      html += '<th part="td-head" class="left-sticky bg-left">';
      html += 'Select';
      html += '</th>';
      html += '<th part="td-head" class="bg-left '+((this.mappedValuesUsers[i] != null && this.mappedValuesUsers[i] != "") ? 'color-done' : 'color-pending')+'">';
      html += 'Status';
      html += '</th>';
      html += '<th part="td-head" class="bg-left col-date-head-'+i+'">';
      html += 'Duedate';
      html += '</th>';
      html += '<th part="td-head" class="bg-left col-tags-head-'+i+'">';
      html += 'Tags';
      html += '</th>';
      html += '<th part="td-head" class="bg-left">';
      html += 'Users';
      html += '</th>';
      for(var k = 0; k < Object.keys(unmappedEvents[i]).length; k++) {
        if(this.getEventPreviewFields().includes(Object.keys(unmappedEvents[i])[k])) {
          html += '<th part="td-head" class="bg-left">';
          html += Object.keys(unmappedEvents[i])[k];
          html += '</th>';
        }
      }
      html += '<th id="th-expand-'+i+'" part="td-head">';
      html += '</th>';
      html += '</tr>';
      html += '</thead>';
      html += '<tbody>';
      html += '<tr id="row-unmapped-'+i+'">';
      html += '<td part="td-body" class="left-sticky">';
      html += '<input type="checkbox" class="input-checkbox" id="row-unmapped-select-'+i+'"/>'
      html += '</td>';
      html += '<td part="td-body" class="" id="row-unmapped-status-'+i+'">';
      html += '<span class="material-icons '+((this.mappedValuesUsers[i] != null && this.mappedValuesUsers[i] != "") ? 'color-done' : 'color-pending')+'">'+((this.mappedValuesUsers[i] != null && this.mappedValuesUsers[i] != "") ? 'check_circle' : 'pending')+'</span>';
      html += '</td>';
      html += '<td part="td-body" class="col-date-'+i+'">';
      html += '<div class="d-flex align-center">';
      html += '<input part="input" type="text" id="row-unmapped-override-date-input-'+i+'" class="hide input-dates" value="'+(this.mappedValuesDueDates[i] != null ? this.mappedValuesDueDates[i] : '')+'"/>';
      html += '<div id="row-unmapped-override-date-div-'+i+'" class="div-dates">'+((this.mappedValuesDueDates[i] != null && this.mappedValuesDueDates[i] != "") ? this.mappedValuesDueDates[i] : '')+'</div>';
      html += '</div>';
      html += '</td>';
      html += '<td part="td-body" class="col-tags-'+i+'">';
      html += '<sf-i-form id="row-unmapped-input-tags-'+i+'" class="hide input-tags" name="Tags" label="Select Tags" apiId="'+this.apiIdTags+'" mode="multiselect-dropdown" searchPhrase="'+(this._SfProject[0].querySelector('#sf-i-project') as SfIForm).selectedTexts()[0]+'" selectProjection="name" mandatory></sf-i-form>';
      //html += '<input part="input" type="text" id="row-unmapped-input-tags-'+i+'" class="hide input-tags" value="'+((this.mappedValuesTags[i] != null && this.mappedValuesTags[i] != "") ? this.mappedValuesTags[i] : '')+'"/>';
      html += '<div id="row-unmapped-div-tags-'+i+'" class="div-tags">'+((this.mappedValuesTags[i] != null && this.mappedValuesTags[i] != "") ? this.mappedValuesTags[i] : '')+'</div>';
      html += '</td>';
      html += '<td part="td-body" class="">';
      html += '<sf-i-form id="row-unmapped-input-users-'+i+'" class="hide input-users" name="Users" label="Select Users" apiId="'+this.apiIdUsers+'" mode="multiselect-dropdown" searchPhrase="'+(this._SfProject[0].querySelector('#sf-i-project') as SfIForm).selectedTexts()[0]+'" selectProjection="name" mandatory></sf-i-form>';
      //html += '<input part="input" type="text" id="row-unmapped-input-users-'+i+'" class="hide input-users" value="'+((this.mappedValuesUsers[i] != null && this.mappedValuesUsers[i] != "") ? this.mappedValuesUsers[i] : '')+'"/>';
      html += '<div id="row-unmapped-div-users-'+i+'" class="div-users">'+((this.mappedValuesUsers[i] != null && this.mappedValuesUsers[i] != "") ? this.mappedValuesUsers[i] : '')+'</div>';
      html += '</td>';
      for(var k = 0; k < Object.keys(unmappedEvents[i]).length; k++) {
        if(this.getEventPreviewFields().includes(Object.keys(unmappedEvents[i])[k])) {

          html += '<td part="td-body">';
          if(unmappedEvents[i][Object.keys(unmappedEvents[i])[k]].indexOf("[") >= 0) {
            html += this.getEventTexts(Object.keys(unmappedEvents[i])[k], JSON.parse(unmappedEvents[i][Object.keys(unmappedEvents[i])[k]]), unmappedEvents[i]);
          } else {
            html += ' <sf-i-elastic-text text="'+unmappedEvents[i][Object.keys(unmappedEvents[i])[k]].replace(/"/g, "")+'" minLength="20"></sf-i-elastic-text>';
          }
          html += '</td>';
          
        }
      }
      html += '<td id="td-expand-'+i+'" part="td-body">';
      html += '<button id="button-unmapped-expand-'+i+'" part="button-icon-small" class="material-icons">chevron_right</button>'
      html += '</td>';
      html += '</tr>';
      html += '</tbody>';
      html += '</table>';
    }

    html += '</div>';

    html += '<button id="button-back-add-mapping" part="button" class="invisible mb-20 mt-20">Save</button>';

    (this._SfMappingContainer as HTMLDivElement).innerHTML = html;

    for(var i = 0; i < unmappedEvents.length; i++) {

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

      (this._SfMappingContainer as HTMLDivElement).querySelector('#button-unmapped-expand-'+i)?.addEventListener('click', (ev: any) => {

        const clickIndex = ev.target.id.split("-")[3];
        console.log('clickindex', clickIndex)
        this.renderExpandEvent(unmappedEvents, clickIndex);

      });

      ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-select-'+i) as HTMLInputElement).addEventListener('change', (ev: any) => {

        const clickIndex = ev.target.id.split("-")[3];
        console.log('clickcheckbox', clickIndex)
        if(((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-select-'+clickIndex) as HTMLInputElement).checked) {
          ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-override-date-input-'+clickIndex) as HTMLInputElement).style.display = 'block';
          ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-override-date-div-'+clickIndex) as HTMLInputElement).style.display = 'none';
          ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-input-tags-'+clickIndex) as HTMLInputElement).style.display = 'block';
          ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-div-tags-'+clickIndex) as HTMLInputElement).style.display = 'none';
          ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-input-users-'+clickIndex) as HTMLInputElement).style.display = 'block';
          ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-div-users-'+clickIndex) as HTMLInputElement).style.display = 'none';
        } else {
          ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-override-date-input-'+clickIndex) as HTMLInputElement).style.display = 'none';
          ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-override-date-div-'+clickIndex) as HTMLInputElement).style.display = 'block';
          ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-input-tags-'+clickIndex) as HTMLInputElement).style.display = 'none';
          ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-div-tags-'+clickIndex) as HTMLInputElement).style.display = 'block';
          ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-input-users-'+clickIndex) as HTMLInputElement).style.display = 'none';
          ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-div-users-'+clickIndex) as HTMLInputElement).style.display = 'block';
        }
        if(this.checkAndShowBulk()) {
          ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-table-multi-entry') as HTMLElement).style.display = 'flex';
        } else {
          ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-table-multi-entry') as HTMLElement).style.display = 'none';
        }

      });

      (this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-override-date-input-'+i)?.addEventListener('keyup', (ev: any) => {

        const clickIndex = ev.target.id.split("-")[5];
        const div = ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-override-date-div-'+clickIndex) as HTMLDivElement);
        const input = ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-override-date-input-'+clickIndex) as HTMLInputElement);
        div.innerHTML = input.value;
        this.mappedValuesDueDates[clickIndex] = input.value;
        
      });

      (this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-input-tags-'+i)?.addEventListener('valueChanged', (ev: any) => {

        const clickIndex = ev.target.id.split("-")[4];
        const form = ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-input-tags-'+clickIndex) as SfIForm);
        const div = ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-div-tags-'+clickIndex) as HTMLDivElement);
        div.innerHTML = '';
        var html = '';
        for(var i = 0; i < form.selectedValues().length; i++) {
          html += form.selectedValues()[i];
          if(i < (form.selectedValues().length - 1)) {
            html += ",";
          }
        }
        div.innerHTML = '<sf-i-elastic-text text="'+html+'" minLength="20"></sf-i-elastic-text>';
        this.mappedValuesTags[clickIndex] = form.selectedValues();

        // const div = ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-div-tags-'+clickIndex) as HTMLDivElement);
        // const input = ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-input-tags-'+clickIndex) as HTMLInputElement);
        // div.innerHTML = input.value;

      });

      (this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-input-users-'+i)?.addEventListener('valueChanged', (ev: any) => {

        const clickIndex = ev.target.id.split("-")[4];
        const form = ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-input-users-'+clickIndex) as SfIForm);
        console.log('valuechanged called', form.selectedValues());
        const div = ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-div-users-'+clickIndex) as HTMLDivElement);
        div.innerHTML = '';
        var html = '';
        for(var i = 0; i < form.selectedValues().length; i++) {
          html += form.selectedValues()[i];
          if(i < (form.selectedValues().length - 1)) {
            html += ",";
          }
        }
        div.innerHTML = '<sf-i-elastic-text text="'+html+'" minLength="20"></sf-i-elastic-text>';
        this.mappedValuesUsers[clickIndex] = form.selectedValues();
        this.updateMappingStatus(form.selectedValues(), clickIndex);
        this.calculateAndShowSummary();        

      });

    }

    
    (this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-input-multi-entry-users')?.addEventListener('valueChanged', () => {

      const input = ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-input-multi-entry-users') as SfIForm);
      console.log('valuechanged users', input.selectedValues());
      this.updateInAllSelections("users", input.selectedValues());

    });

    (this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-input-multi-entry-date')?.addEventListener('keyup', () => {

      const input = ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-input-multi-entry-date') as HTMLInputElement);
      this.updateInAllSelections("duedate", input.value)

    });

    (this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-input-multi-entry-tags')?.addEventListener('valueChanged', () => {

      const input = ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-input-multi-entry-tags') as SfIForm);
      this.updateInAllSelections("tags", input.selectedValues());

    });

    ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-filter-all') as HTMLInputElement).addEventListener('change', () => {

      const input = ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-filter-all') as HTMLInputElement);
      if(input.checked) {
        this.showAllEvents();
      }

    });

    ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-filter-mapped') as HTMLInputElement).addEventListener('change', () => {

      const input = ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-filter-mapped') as HTMLInputElement);
      if(input.checked) {
        this.showMappedEvents();
      }

    });

    ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-filter-unmapped') as HTMLInputElement).addEventListener('change', () => {

      const input = ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-filter-unmapped') as HTMLInputElement);
      if(input.checked) {
        this.showUnmappedEvents();
      }

    });

    ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-table-multi-entry-cancel') as HTMLInputElement).addEventListener('click', () => {

      ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-table-multi-entry') as HTMLElement).style.display = 'none';
      this.clearAllMappingSelections();

    });

    ((this._SfMappingContainer as HTMLDivElement).querySelector('#button-back-add-mapping') as HTMLButtonElement)!.addEventListener('click', async () => {
      this.uploadMapping();
    });
    
  }

  applyFilter = (filter: string = "all") => {

    for(var i = 0; i < this.unmappedEvents.length; i++) {

      if(filter == "mapped") {


        if(this.mappedValuesUsers[i] != null && this.mappedValuesUsers[i] != "") {
          ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-table'+i) as HTMLElement).style.display = 'block';
        } else {
          ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-table'+i) as HTMLElement).style.display = 'none';
        }

      }

      if(filter == "unmapped") {

        if(this.mappedValuesUsers[i] == null || this.mappedValuesUsers[i] == "") {
          ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-table'+i) as HTMLElement).style.display = 'block';
        } else {
          ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-table'+i) as HTMLElement).style.display = 'none';
        }

      }

      if(filter == "all") {

        ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-table'+i) as HTMLElement).style.display = 'block';

      }

      if(this.myRole == this.TAB_APPROVER) {
        ((this._SfMappingContainer as HTMLDivElement).querySelectorAll('.col-date') as NodeListOf<HTMLElement>)[0].style.display = 'none';
        ((this._SfMappingContainer as HTMLDivElement).querySelectorAll('.col-date') as NodeListOf<HTMLElement>)[1].style.display = 'none';
        ((this._SfMappingContainer as HTMLDivElement).querySelector('.col-date-'+i) as HTMLElement).style.display = 'none';
        ((this._SfMappingContainer as HTMLDivElement).querySelector('.col-date-head-'+i) as HTMLElement).style.display = 'none';
        ((this._SfMappingContainer as HTMLDivElement).querySelectorAll('.col-tags') as NodeListOf<HTMLElement>)[0].style.display = 'none';
        ((this._SfMappingContainer as HTMLDivElement).querySelectorAll('.col-tags') as NodeListOf<HTMLElement>)[1].style.display = 'none';
        ((this._SfMappingContainer as HTMLDivElement).querySelector('.col-tags-'+i) as HTMLElement).style.display = 'none';
        ((this._SfMappingContainer as HTMLDivElement).querySelector('.col-tags-head-'+i) as HTMLElement).style.display = 'none';
      } else {
        ((this._SfMappingContainer as HTMLDivElement).querySelectorAll('.col-date') as NodeListOf<HTMLElement>)[0].style.display = 'table-cell';
        ((this._SfMappingContainer as HTMLDivElement).querySelectorAll('.col-date') as NodeListOf<HTMLElement>)[1].style.display = 'table-cell';
        ((this._SfMappingContainer as HTMLDivElement).querySelector('.col-date-'+i) as HTMLElement).style.display = 'table-cell';
        ((this._SfMappingContainer as HTMLDivElement).querySelector('.col-date-head-'+i) as HTMLElement).style.display = 'table-cell';
        ((this._SfMappingContainer as HTMLDivElement).querySelectorAll('.col-tags') as NodeListOf<HTMLElement>)[0].style.display = 'table-cell';
        ((this._SfMappingContainer as HTMLDivElement).querySelectorAll('.col-tags') as NodeListOf<HTMLElement>)[1].style.display = 'table-cell';
        ((this._SfMappingContainer as HTMLDivElement).querySelector('.col-tags-'+i) as HTMLElement).style.display = 'table-cell';
        ((this._SfMappingContainer as HTMLDivElement).querySelector('.col-tags-head-'+i) as HTMLElement).style.display = 'table-cell';
      }


    }

    if(filter == "all") {

      ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-filter-all') as HTMLInputElement).checked = true;

    }


    if(filter == "mapped") {

      ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-filter-mapped') as HTMLInputElement).checked = true;

    }

    if(filter == "unmapped") {

      ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-filter-unmapped') as HTMLInputElement).checked = true;

    }

  }

  getIndexFromId = (id: string) => {

    for(var i = 0; i < this.unmappedEvents.length; i++) {

      if(this.unmappedEvents[i].id == id) {
        return i;
      }

    }

    return -1;
  }

  prepopulateMapping = (mappings: any) => {

    console.log('mappings', mappings);

    if(mappings == null) {
      return;
    }

    for(var i = 0; i < Object.keys(mappings.duedates).length; i++) {
      const eventId = Object.keys(mappings.duedates)[i];
      const index = this.getIndexFromId(eventId);
      this.mappedValuesDueDates[index] = mappings.duedates[eventId];
    }

    for(var i = 0; i < Object.keys(mappings.tags).length; i++) {
      const eventId = Object.keys(mappings.tags)[i];
      const index = this.getIndexFromId(eventId);
      this.mappedValuesTags[index] = mappings.tags[eventId];
    }

    for(var i = 0; i < Object.keys(mappings.users).length; i++) {
      const eventId = Object.keys(mappings.users)[i];
      const index = this.getIndexFromId(eventId);
      this.mappedValuesUsers[index] = mappings.users[eventId];
    }

    console.log(this.mappedValuesDueDates);
    console.log(this.mappedValuesTags);
    console.log(this.mappedValuesUsers);

    for(var i = 0; i < this.unmappedEvents.length; i++) {

      ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-override-date-div-'+i) as HTMLDivElement)!.innerHTML = (this.mappedValuesDueDates[i] != null && this.mappedValuesDueDates[i] != "") ? this.mappedValuesDueDates[i] : "";
      ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-override-date-input-'+i) as HTMLInputElement)!.value = (this.mappedValuesDueDates[i] != null && this.mappedValuesDueDates[i] != "") ? this.mappedValuesDueDates[i] : "";
      
      if(this.mappedValuesTags[i] != null) {
        var html = '';
        for(var j = 0; j < this.mappedValuesTags[i].length; j++) {
          html += this.mappedValuesTags[i][j];
          if(j < (this.mappedValuesTags[i].length - 1)) {
            html += ',';
          }
        }
        ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-div-tags-'+i) as HTMLDivElement)!.innerHTML = '<sf-i-elastic-text text="'+html+'" minLength="20"></sf-i-elastic-text>';
        ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-input-tags-'+i) as SfIForm)!.preselectedValues = JSON.stringify(this.mappedValuesTags[i]);
        //((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-input-tags-'+i) as SfIForm)!.populatePreselected();
      }
      

      if(this.mappedValuesUsers[i] != null) {
        html = '';
        for(var j = 0; j < this.mappedValuesUsers[i].length; j++) {
          html += this.mappedValuesUsers[i][j];
          if(j < (this.mappedValuesUsers[i].length - 1)) {
            html += ',';
          }
        }
        ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-div-users-'+i) as HTMLDivElement)!.innerHTML = '<sf-i-elastic-text text="'+html+'" minLength="20"></sf-i-elastic-text>';
        ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-input-users-'+i) as SfIForm)!.preselectedValues = JSON.stringify(this.mappedValuesUsers[i]);
        //((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-input-users-'+i) as SfIForm)!.populatePreselected();
      }

      if(this.mappedValuesUsers[i] != null) {
        ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-status-'+i) as HTMLDivElement).innerHTML = '<span class="material-icons color-done">check_circle</span>';
      } else {
        ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-status-'+i) as HTMLDivElement).innerHTML = '<span class="material-icons color-pending">pending</span>';
      }
      

    }

    this.calculateAndShowSummary();

  }

  clearAllMappingSelections = () => {

    const inputArr = (this._SfMappingContainer as HTMLDivElement).querySelectorAll('.input-checkbox') as NodeListOf<HTMLInputElement>;
    for(var i = 0; i < inputArr.length; i++) {

      if(inputArr[i].checked) {
        inputArr[i].checked = false;
        inputArr[i].dispatchEvent(new Event('change'));
      }
      
    }

  }

  clearAllCalendars = () => {

    (this._SfCalendarContainer as HTMLDivElement).innerHTML = "";
    (this._SfStreamContainer as HTMLDivElement).innerHTML = "";
    (this._SfUpcomingContainer as HTMLDivElement).innerHTML = "";
    (this._SfThisContainer as HTMLDivElement).innerHTML = "";
    (this._SfPastContainer as HTMLDivElement).innerHTML = "";
    (this._SfCustomContainer as HTMLDivElement).innerHTML = "";

  }

  transformMappingsForUpload = (mapping: any) => {

    const duedates = mapping.duedates;
    const tags = mapping.tags;
    const users = mapping.users;

    const transformedDuedates : any = {};
    const transformedTags : any  = {};
    const transformedUsers : any  = {};

    console.log('unmappedevents[i] duedates',duedates);

    for(var i = 0; i < Object.keys(duedates).length; i++) {

      console.log('unmappedevents[i]',i,this.unmappedEvents[i]);

      const index = Object.keys(duedates)[i];
      const eventId = this.unmappedEvents[i].id;
      transformedDuedates[eventId] = duedates[index];

    }

    for(var i = 0; i < Object.keys(tags).length; i++) {

      const index = Object.keys(tags)[i];
      const eventId = this.unmappedEvents[i].id;
      transformedTags[eventId] = tags[index];

    }

    for(var i = 0; i < Object.keys(users).length; i++) {

      const index = Object.keys(users)[i];
      const eventId = this.unmappedEvents[i].id;
      transformedUsers[eventId] = users[index];

    }

    return {
      duedates: transformedDuedates,
      tags: transformedTags,
      users: transformedUsers
    }

  }

  uploadMapping = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/mapevents";

    const mapping = this.transformMappingsForUpload({
      duedates: this.mappedValuesDueDates,
      tags: this.mappedValuesTags,
      users: this.mappedValuesUsers
    });

    const body = { "projectid": (this._SfProject[0].querySelector('#sf-i-project') as SfIForm).selectedValues()[0], "role": this.myRole, "mapping": JSON.stringify(mapping)} 
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log('jsonResponse sync', jsonRespose);
      this.setSuccess("Mapping uploaded successfully!");
      setTimeout(() => {
        this.clearMessages()
        this.showChosenMapping();
        this.fetchEventMap();
        if(this.myRole == this.TAB_REPORTER) {
          this.renderMappingTabs(this.TAB_REPORTER);
        } else {
          this.renderMappingTabs(this.TAB_APPROVER);
        }
      }, 2000);
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
    }

  }

  uploadEvents = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/synccalendar";

    const body = { "projectid": (this._SfProject[0].querySelector('#sf-i-project') as SfIForm).selectedValues()[0], "events": JSON.stringify(this.events)} 
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log('jsonResponse sync', jsonRespose);
      this.loadMode();
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
    }
  }

  processEvent = (value: any) => {

    console.log('processing due date', value);
    console.log('processing due date', value.duedate.replace(/['"]+/g, ''));
    console.log('processing due date', this.mappings);

    var duedate = value.duedate;

    if(this.mappings.duedates[value.id] != null && this.mappings.duedates[value.id] != "") {
      duedate = this.mappings.duedates[value.id];
    }

    const duedateArr = duedate.replace(/['"]+/g, '').split(",") as Array<string>;

    const startMonth = parseInt(this.calendarStartMM);

    for(var i = 0; i < duedateArr.length; i++) {

      const dateArr = duedateArr[i].split("/");
      console.log('datearr', dateArr);

      if(dateArr[2] == "*") {
        if(dateArr[1] == "*") {

          var j = startMonth;

          while(true) {

            console.log('processing event',dateArr[2],dateArr[1],j);

            const mmdd =  ("0" +j).slice(-2) + "/" + ("0" + dateArr[0]).slice(-2);

            if(this.events == null) {
              this.events = {};
            }
            if(this.events[mmdd] == null) {
              this.events[mmdd] = [];
            }
            (this.events[mmdd] as Array<any>).push(value);


            if(startMonth !== 12) {

              if(j === (startMonth - 1)) {
                break;
              }
            }


            j++;

            if(j === 13) {
              j = 0;
            }

          } 

        } else {

            const mmdd =  ("0" +(parseInt(dateArr[1]))).slice(-2) + "/" + ("0" + dateArr[0]).slice(-2);

            if(this.events == null) {
              this.events = {};
            }
            if(this.events[mmdd] == null) {
              this.events[mmdd] = [];
            }
            (this.events[mmdd] as Array<any>).push(value);

        }
      }

    }

    console.log('calendar processed', this.calendar);
    console.log('event processed', this.events);

  }

  renderChosenProject = (events: any = null) => {

    if(events == null) {

      var html = '';

      html += '<div class="lb"></div>';
      html += '<div class="d-flex justify-between align-center">';
        html += '<div class="muted">Calender doesn\'t exist! &nbsp; &nbsp;</div>';
        html += '<button id="button-generate-chosen-project" part="button">Generate</button>';
      html += '</div>';
      html += '<div class="rb"></div>';

      (this._SfContainerChosenProject as HTMLDivElement).innerHTML = html;

      (((this._SfContainerChosenProject as HTMLDivElement) as HTMLDivElement).querySelector('#button-generate-chosen-project') as HTMLButtonElement).addEventListener('click', async () => {
        await this.fetchList();
      });
    
    } else {

    }

  }

  fetchDetail = async (value: any) => {

    const body: any = this.getApiBodyList();
    body.id = value;
    console.log('detail', value, body);
    let url = "https://"+this.apiIdDetail+".execute-api.us-east-1.amazonaws.com/test/" + this.apiMethodDetail;

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log('jsonResponse', jsonRespose);
      this.processEvent(jsonRespose.data.value)
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
    }

  }

  fetchUserCalendar = async() => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getuserevents";

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId, "userprofileid": this.userProfileId, "role": this.myRole}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.showChosenProject();
      console.log(jsonRespose);
      this.events = (jsonRespose.data.events)
      
      if(this.events != null) {
        this.renderTabs(this.TAB_YEAR);
        this.renderCalendar();
      }
      // this.renderChosenProject(events);
      
    } else {

      if(xhr.status === 404) {

        this.showChosenProject();
        (this._SfTitleChosenProject as HTMLElement).innerHTML = (this._SfProject[0].querySelector('#sf-i-project') as SfIForm).selectedTexts()[0];
        this.renderChosenProject();

      } else {
        const jsonRespose = JSON.parse(xhr.responseText);
        this.setError(jsonRespose.error);
      }

    }

  }

  fetchCalendar = async() => {

    //this.apiBodyList = '{"id": "' +(this._SfProject[0].querySelector('#sf-i-project') as SfIForm).selectedValues()[0]+ '"}'

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getcalendar";

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": (this._SfProject[0].querySelector('#sf-i-project') as SfIForm).selectedValues()[0]}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.showChosenProject();
      (this._SfTitleChosenProject as HTMLElement).innerHTML = this.truncate((this._SfProject[0].querySelector('#sf-i-project') as SfIForm).selectedTexts()[0], 20, true);
      this.events = JSON.parse(jsonRespose.data.value.events)
      // console.log(events);
      if(this.events != null) {
        this.renderTabs(this.TAB_YEAR);
        this.renderCalendar();
      }
      // this.renderChosenProject(events);
      
    } else {

      if(xhr.status === 404) {

        this.showChosenProject();
        (this._SfTitleChosenProject as HTMLElement).innerHTML = (this._SfProject[0].querySelector('#sf-i-project') as SfIForm).selectedTexts()[0];
        this.renderChosenProject();

      } else {
        const jsonRespose = JSON.parse(xhr.responseText);
        this.setError(jsonRespose.error);
      }

    }

  }

  fetchEventMap = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getunmappedevents";

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": (this._SfProject[0].querySelector('#sf-i-project') as SfIForm).selectedValues()[0], "role": this.myRole}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      this.unmappedEvents = jsonRespose.data.unmappedEvents;
      this.mappings = jsonRespose.data.mappings;
      this.renderMapping( this.unmappedEvents)
      this.prepopulateMapping(this.mappings);
      this.applyFilter();
      if(jsonRespose.data.mappings != null) {
        (this._SfButtonBackCalendarMapping as HTMLButtonElement).style.visibility = 'visible';
      } else {
        (this._SfButtonBackCalendarMapping as HTMLButtonElement).style.visibility = 'hidden';
      }
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchList = async () => {

    console.log('calendar fetching list', this.apiIdList);

    const body: any = this.getApiBodyList();

    if(this.apiIdList != null) {

      let url = "https://"+this.apiIdList+".execute-api.us-east-1.amazonaws.com/test/" + this.apiMethodList;

      const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
      const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
      this._SfLoader.innerHTML = '';
      if(xhr.status == 200) {

        const jsonRespose = JSON.parse(xhr.responseText);

        console.log('list response', JSON.stringify(jsonRespose));

        const fieldArr = JSON.parse(jsonRespose.data.value[this.apiResponseFieldList]) as Array<string>;
        this.events = null;
        for(var i = 0; i < fieldArr.length; i++) {

          console.log('events', fieldArr[i]);
          await this.fetchDetail(fieldArr[i])

        }

        console.log('all events processed');
        this.uploadEvents();
        
      } else {
        const jsonRespose = JSON.parse(xhr.responseText);
        this.setError(jsonRespose.error);
      }

    }

  }

  initCalendar = async () => {

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

    } while(!(newDate == this.calendarStartDD && newMonth == (("0" + ((parseInt(this.calendarStartMM) - 1) + "")).slice(-2)) && newYear === (parseInt(this.calendarStartYYYY) + 1)));

    console.log(this.calendar);

  }

  initInputs = () => {

    this.calendarStartDD = ("0" + this.calendarStartDD).slice(-2);
    this.calendarStartMM = ("0" + this.calendarStartMM).slice(-2);

  }

  showChooseProject = () => {

    var elems = (this._SfIEventsC as HTMLDivElement).querySelectorAll('.choose-project') as NodeListOf<HTMLElement>;
    var index = 0, length = elems.length;
    for ( ; index < length; index++) {
        elems[index].style.display = 'flex'
    }

    elems = (this._SfIEventsC as HTMLDivElement).querySelectorAll('.chosen-project') as NodeListOf<HTMLElement>;
    index = 0, length = elems.length;
    for ( ; index < length; index++) {
        elems[index].style.display = 'none'
    }

    elems = (this._SfIEventsC as HTMLDivElement).querySelectorAll('.chosen-mapping') as NodeListOf<HTMLElement>;
    index = 0, length = elems.length;
    for ( ; index < length; index++) {
        elems[index].style.display = 'none'
    }
  }

  showChosenProject = () => {

    var elems = (this._SfIEventsC as HTMLDivElement).querySelectorAll('.choose-project') as NodeListOf<HTMLElement>;
    var index = 0, length = elems.length;
    for ( ; index < length; index++) {
        elems[index].style.display = 'none'
    }

    elems = (this._SfIEventsC as HTMLDivElement).querySelectorAll('.chosen-project') as NodeListOf<HTMLElement>;
    index = 0, length = elems.length;
    for ( ; index < length; index++) {
        elems[index].style.display = 'flex'
    }


    elems = (this._SfIEventsC as HTMLDivElement).querySelectorAll('.chosen-mapping') as NodeListOf<HTMLElement>;
    index = 0, length = elems.length;
    for ( ; index < length; index++) {
        elems[index].style.display = 'none'
    }
    
  }

  showChosenMapping = () => {

    var elems = (this._SfIEventsC as HTMLDivElement).querySelectorAll('.choose-project') as NodeListOf<HTMLElement>;
    var index = 0, length = elems.length;
    for ( ; index < length; index++) {
        elems[index].style.display = 'none'
    }

    elems = (this._SfIEventsC as HTMLDivElement).querySelectorAll('.chosen-project') as NodeListOf<HTMLElement>;
    index = 0, length = elems.length;
    for ( ; index < length; index++) {
        elems[index].style.display = 'none'
    }


    elems = (this._SfIEventsC as HTMLDivElement).querySelectorAll('.chosen-mapping') as NodeListOf<HTMLElement>;
    index = 0, length = elems.length;
    for ( ; index < length; index++) {
        elems[index].style.display = 'flex'
    }
    
  }

  truncate = ( str: string, n: number, useWordBoundary: boolean ) => {
    if (str.length <= n) { return str; }
    const subString = str.slice(0, n-1); // the original check
    return (useWordBoundary 
      ? subString.slice(0, subString.lastIndexOf(" ")) 
      : subString) + "&hellip;";
  };

  initListenersAdmin = () => {

    var old_element = null;
    var new_element = null;

    old_element = (this._SfProject[0].querySelector('#sf-i-project') as SfIForm);
    new_element = old_element!.cloneNode(true);
    old_element?.parentElement?.replaceChild(new_element, old_element!);
    this._SfProject[0].querySelector('#sf-i-project').addEventListener('valueChanged', async () => {
      (this._SfTitleChosenMapping as HTMLElement).innerHTML = this.truncate((this._SfProject[0].querySelector('#sf-i-project') as SfIForm).selectedTexts()[0], 20, true);
      this.showChosenMapping();
      this.fetchEventMap();
      this.renderMappingTabs(this.TAB_REPORTER);
    });  

    old_element = (this._SfButtonBackChosenProject as HTMLButtonElement);
    new_element = old_element!.cloneNode(true);
    old_element?.parentElement?.replaceChild(new_element, old_element!);
    (this._SfButtonBackChosenProject as HTMLButtonElement).addEventListener('click', async () => {
      this.loadMode();
    });

    old_element = (this._SfButtonSyncChosenProject as HTMLButtonElement);
    new_element = old_element!.cloneNode(true);
    old_element?.parentElement?.replaceChild(new_element, old_element!);
    (this._SfButtonSyncChosenProject as HTMLButtonElement).addEventListener('click', async () => {
      this.fetchList();
    });

    old_element = (this._SfButtonBackChosenMapping as HTMLButtonElement);
    new_element = old_element!.cloneNode(true);
    old_element?.parentElement?.replaceChild(new_element, old_element!);
    (this._SfButtonBackChosenMapping as HTMLButtonElement).addEventListener('click', async () => {
      this.loadMode();
    });

    old_element = (this._SfButtonMapChosenProject as HTMLButtonElement);
    new_element = old_element!.cloneNode(true);
    old_element?.parentElement?.replaceChild(new_element, old_element!);
    (this._SfButtonMapChosenProject as HTMLButtonElement).addEventListener('click', async () => {
      (this._SfTitleChosenMapping as HTMLElement).innerHTML = this.truncate((this._SfProject[0].querySelector('#sf-i-project') as SfIForm).selectedTexts()[0], 20, true);
      this.showChosenMapping();
      this.fetchEventMap();
      this.renderMappingTabs(this.TAB_REPORTER);
    });

  
    old_element = (this._SfButtonBackCalendarMapping as HTMLButtonElement);
    new_element = old_element!.cloneNode(true);
    old_element?.parentElement?.replaceChild(new_element, old_element!);
    (this._SfButtonBackCalendarMapping as HTMLButtonElement).addEventListener('click', async () => {
      this.fetchCalendar()
    });

    old_element = (this._SfButtonBackSyncMapping as HTMLButtonElement);
    new_element = old_element!.cloneNode(true);
    old_element?.parentElement?.replaceChild(new_element, old_element!);
    (this._SfButtonBackSyncMapping as HTMLButtonElement).addEventListener('click', async () => {
      this.fetchList();
    });
    
  }

  loadMode = async () => {

    if(this.mode == "admin") {

      this.showChooseProject();
      this.initListenersAdmin();

    } else {

      this.enableCalendar();
      this.initInputs();
      this.initCalendar();
      this.myRole = this.TAB_REPORTER;
      this.renderRoleTabs();
      await this.fetchUserCalendar();
      
      if(this.events != null) {
        this.renderTabs(this.TAB_YEAR);
        this.renderCalendar();
      }
      
    }

  }

  constructor() {
    super();
  }

  protected override firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {

    this.loadMode();

  }
  
  override connectedCallback() {
    super.connectedCallback()
  }
  
  override render() {

    if(this.mode == "admin") {

      return html`
          
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
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
                      <button id="button-back-sync-mapping" part="button-icon" class="button-icon"><span class="material-icons">sync</span></button>
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
                <div class="chosen-project d-flex justify-center" id="tab-container">

                </div>
              
                <div class="chosen-project d-flex flex-grow flex-wrap justify-center align-stretch" id="calendar-container">
                  
                </div>
                <div class="chosen-project d-flex flex-grow flex-wrap justify-center align-stretch" id="stream-container">
                  
                </div>
                <div class="chosen-project d-flex flex-grow flex-wrap justify-center align-stretch" id="upcoming-container">
                  
                </div>
                <div class="chosen-project d-flex flex-grow flex-wrap justify-center align-stretch" id="this-container">
                  
                </div>
                <div class="chosen-project d-flex flex-grow flex-wrap justify-center align-stretch" id="past-container">
                  
                </div>
                <div class="chosen-project d-flex flex-grow flex-wrap justify-center align-stretch" id="custom-container">
                  
                </div>

                <div class="chosen-mapping d-flex justify-center mt-20" id="mapping-tab-container">

                </div>
                <div class="chosen-mapping d-flex flex-col mb-100" id="mapping-container">
                </div>
              </div>
              <div class="rb"></div>
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

    } else {

      return html`
          
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <div class="SfIEventsC">
          
          <div class="d-flex justify-center">
              <div class="loader-element"></div>
          </div>
          
          <div class="d-flex justify-center mb-20" id="role-tab-container">

          </div>
          
          <div class="d-flex justify-center" id="tab-container">

          </div>
          <div class="d-flex justify-center">
            <div class="d-flex flex-grow flex-wrap justify-center align-stretch" id="calendar-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-center align-stretch" id="stream-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-center align-stretch" id="upcoming-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-center align-stretch" id="this-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-center align-stretch" id="past-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-center align-stretch" id="custom-container">
              
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

}


declare global {
  interface HTMLElementTagNameMap {
    'sf-i-events': SfIEvents;
  }
}

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
import {SfIUploader} from 'sf-i-uploader';
import {Chart, ChartItem, registerables} from 'chart.js';
import { SfIElasticText } from 'sf-i-elastic-text';
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

  SEARCH_BLOCK_SIZE = 10;
  FLOW_GRAPH_COMPLETENESS = "completeness";
  FLOW_GRAPH_TIMELINESS = "timeliness";
  FLOW_GRAPH_RISKAREAS = "riskarea";
  FLOW_GRAPH_RISKSEVERITY = "risk";
  FLOW_GRAPH_LOCATION = "locationname";
  FLOW_GRAPH_FUNCTION = "functions";
  FLOW_GRAPH_OBLIGATIONTYPE = "obligationtype";
  FLOW_GRAPH_JURISDICTION = "jurisdiction";
  FLOW_GRAPH_FREQUENCY = "frequency";
  TAB_YEAR = "year";
  TAB_STREAM = "stream";
  TAB_UPCOMING = "upcoming";
  TAB_THIS = "this";
  TAB_PAST = "past";
  TAB_CUSTOM = "custom";
  TAB_ADHOC = "adhoc";
  TAB_REPORTER = "reporter";
  TAB_APPROVER = "approver";
  TAB_FUNCTION_HEAD = "functionhead";
  TAB_AUDITOR = "auditor";
  TAB_VIEWER = "viewer";
  TAB_STATUTES = "statutes";
  TAB_COMPLIANCES = "compliances";
  TAB_ENTITIES = "entities";
  TAB_LOCATIONS = "locations";
  TAB_TAGS = "tags";
  TAB_REPORTERS = "reporters";
  TAB_APPROVERS = "approvers";
  TAB_FUNCTION_HEADS = "functionheads";
  TAB_MAKER_CHECKERS = "makercheckers";
  TAB_AUDITORS = "auditors";
  TAB_DOCS = "docs";
  TAB_VIEWERS = "viewers";
  TAB_DUEDATES = "duedates";
  TAB_ALERTSCHEDULES = "alertschedules";
  TAB_INTERNALCONTROLS = "internalcontrols";
  TAB_FUNCTIONS = "functions";
  TAB_COUNTRIES = "countries";
  TAB_CALENDAR = "calendar";
  COLOR_APPROVED = "#50cf01";
  COLOR_NOT_STARTED = "#A4A9AD";
  COLOR_IN_PROGRESS = "#ffe505"
  COLOR_PAST_DUE_DATE = "#F79256";
  COLOR_LATE_EXECUTED = "#840B0F";
  COLOR_LATE_APPROVED = "#EE2F36";
  CERTIFICATE_HTML = `
  
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

  COMPLIANCES_HTML = `
  
  <html>
    <head>  
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">  
      <link rel="preconnect" href="https://fonts.googleapis.com/">
      <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin="">
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@100;300;400;700;900&family=Oleo+Script&family=Oswald:wght@700&display=swap" rel="stylesheet">
      <style>
        body {
          font-family: DM Sans;
          margin: 2px;
          padding: 20px;
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
        .mt-10 {
          margin-top: 10px;
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
        .w-200px {
          width: 200px;
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
          overflow:auto;
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
        .h-100 {
          height: 100vh;
        }
        .abs {
          position: absolute;
        }
        .watermark {
          background-image: url(https://flagggrc-images.s3.amazonaws.com/logo.png);
          background-position: center;
          background-repeat: no-repeat;
          opacity: 5%;
          width: 100%;
          height: 100vh;
          position: fixed;
        }
        .scroll-x {
          display: block;
          overflow-x: auto;
        }
      </style>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
      <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.0.5/purify.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    </head>
    <body>
        <div>
          <h1 class="text-center">Compliance Report</h1>
          <div class="d-flex justify-between align-center">
            <div>
              <div>Report generated for PROJECT_NAME on REPORT_DATE</div>
            </div>
          </div>
          <br />
          <div class="watermark"></div>
          <div class="report">
            PERSON_COMPLIANCES
          </div>
        </div>
        <script>

        </script>
      </body>

  </html>
  
  `;

  @property()
  selectedCbs: Array<any> = [];

  @property()
  projectId!: string;

  @property()
  name!: string;

  @property()
  apiId!: string;

  @property()
  apiIdStatutes!: string;

  @property()
  apiIdCompliances!: string;

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
  graphParam: string = "";

  @property()
  entityId: string = "";

  @property()
  locationId: string = "";

  @property()
  countryId: string = "";

  @property()
  functionId: string = "";

  @property()
  tagId: string = "";

  @property()
  userName!: string;
  
  @property()
  projectName!: string;

  @property()
  apiResponseFieldList!: string;

  @property()
  myOnboardingTab: string = this.TAB_STATUTES;

  @property()
  myRole: string = "";

  @property()
  chart: any = null;

  @property()
  chart2: any = null;

  @property()
  chart3: any = null;

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
  triggers: any = null;

  @property()
  monthNames: string []  = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  @property()
  events: any = null;

  @property()
  eventsInWindow: any = null;

  @property()
  eventHideFields: any = null;

  getEventHideFields = () => {
    return JSON.parse(this.eventHideFields);
  }

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
  csvDataCompliances: string = "";

  @property()
  csvDataStats: string = "";

  @property()
  htmlDataCompliances: string = "";

  @property()
  htmlDataStats: string = "";

  @property()
  period: string = "";

  @property()
  mode!: string;

  @property()
  flowGraph: string = "";

  @property()
  flow: string = "";

  @property()
  fill: string = "solid";

  @property()
  filterTags: string [] = [];

  @property()
  riskAreasData: any = null;

  @property()
  riskAreasPartStatusData: any = null;

  @property()
  riskAreasLateStatusData: any = null;

  @property()
  riskSeverityData: any = null;

  @property()
  riskSeverityPartStatusData: any = null;

  @property()
  riskSeverityLateStatusData: any = null;

  @property()
  functionData: any = null;

  @property()
  functionPartStatusData: any = null;

  @property()
  functionLateStatusData: any = null;

  @property()
  obligationTypeData: any = null;

  @property()
  obligationTypePartStatusData: any = null;

  @property()
  obligationTypeLateStatusData: any = null;

  @property()
  jurisdictionData: any = null;

  @property()
  jurisdictionPartStatusData: any = null;

  @property()
  jurisdictionLateStatusData: any = null;

  @property()
  currentColumnIndex: string = "";

  @property()
  frequencyData: any = null;

  @property()
  frequencyPartStatusData: any = null;

  @property()
  frequencyLateStatusData: any = null;

  @property()
  locationData: any = null;

  @property()
  locationPartStatusData: any = null;

  @property()
  locationLateStatusData: any = null;

  @property()
  selectedItems: Array<string> = [];

  @property()
  selectedStatus: string = "";

  @property()
  stream: string = this.TAB_STREAM;

  static override styles = css`

    .bg-white {
      background-color: white;
    }

    @media (orientation: landscape) {

      .chart-container {
        width: 100%;
        overflow-x: scroll;
      }

      .chart-item {
        min-width: 40%;
      }

    }

    @media (orientation: portrait) {

      .chart-container {
        width: 100%;
        overflow-x: scroll;
      }

      .chart-item {
        width: 100%;
      }

    }

    @media (orientation: landscape) {

      .mobile-only {
        display: none;
      }

      .desktop-only {
        display: flex;
      }

    }

    @media (orientation: portrait) {

      .mobile-only {
        display: flex;
      }

      .desktop-only {
        display: none;
      }

    }
    
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
      padding: 0%;
    }

    #custom-container {
      padding: 0%;
    }

    #adhoc-container {
      padding: 0%;
    }

    #upcoming-container {
      padding: 0%;
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
      margin-left: 0px;
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

    @media (orientation: portrait) {

      .calendar-right-data {
        width: 100%;
      }

    }

    @media (orientation: landscape) {

      .calendar-right-data {
        width: 70%;
      }

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
      padding: 8px;
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
    
    .lds-text {
      position: absolute;
      left: 0px;
      top: 0px;
      margin-top: 2px;
      margin-left: 2px;
      width: 50px;
      height: 50px;
      color: gray;
    }

    .lds-text-c {
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
    }

    .lds-text-c-i {
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
        padding: 8px;
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

  @query('.button-search')
  _SfButtonSearch: any;

  @query('.button-save')
  _SfButtonSave: any;

  @query('.button-next')
  _SfButtonNext: any;

  @query('.button-prev')
  _SfButtonPrev: any;

  @query('.input-search')
  _SfInputSearch: any;

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

  @query('#adhoc-container')
  _SfAdhocContainer: any;

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

  @query('#onboarding-tab-container')
  _SfOnboardingTabContainer: any;

  @query('#statutes-list-container')
  _SfOnboardingStatutesListContainer: any;

  @query('#statutes-container')
  _SfOnboardingStatutesContainer: any;

  @query('#compliances-list-container')
  _SfOnboardingCompliancesListContainer: any;

  @query('#compliances-container')
  _SfOnboardingCompliancesContainer: any;

  @query('#entities-list-container')
  _SfOnboardingEntitiesListContainer: any;

  @query('#entities-container')
  _SfOnboardingEntitiesContainer: any;

  @query('#functions-container')
  _SfOnboardingFunctionsContainer: any;

  @query('#functions-list-container')
  _SfOnboardingFunctionsListContainer: any;

  @query('#countries-container')
  _SfOnboardingCountriesContainer: any;

  @query('#countries-list-container')
  _SfOnboardingCountriesListContainer: any;

  @query('#locations-list-container')
  _SfOnboardingLocationsListContainer: any;

  @query('#locations-container')
  _SfOnboardingLocationsContainer: any;

  @query('#tags-list-container')
  _SfOnboardingTagsListContainer: any;

  @query('#tags-container')
  _SfOnboardingTagsContainer: any;

  @query('#reporters-list-container')
  _SfOnboardingReportersListContainer: any;

  @query('#reporters-container')
  _SfOnboardingReportersContainer: any;
  
  @query('#approvers-container')
  _SfOnboardingApproversContainer: any;

  @query('#functionheads-container')
  _SfOnboardingFunctionHeadsContainer: any;

  @query('#makercheckers-container')
  _SfOnboardingMakerCheckersContainer: any;

  @query('#docs-container')
  _SfOnboardingDocsContainer: any;

  @query('#auditors-container')
  _SfOnboardingAuditorsContainer: any;

  @query('#viewers-container')
  _SfOnboardingViewersContainer: any;

  @query('#approvers-list-container')
  _SfOnboardingApproversListContainer: any;

  @query('#makercheckers-list-container')
  _SfOnboardingMakerCheckersListContainer: any;

  @query('#docs-list-container')
  _SfOnboardingDocsListContainer: any;

  @query('#functionheads-list-container')
  _SfOnboardingFunctionHeadsListContainer: any;

  @query('#auditors-list-container')
  _SfOnboardingAuditorsListContainer: any;

  @query('#viewers-list-container')
  _SfOnboardingViewersListContainer: any;

  @query('#duedates-list-container')
  _SfOnboardingDuedatesListContainer: any;

  @query('#duedates-container')
  _SfOnboardingDuedatesContainer: any;

  @query('#alertschedules-list-container')
  _SfOnboardingAlertSchedulesListContainer: any;

  @query('#alertschedules-container')
  _SfOnboardingAlertSchedulesContainer: any;

  @query('#internalcontrols-list-container')
  _SfOnboardingInternalControlsListContainer: any;

  @query('#internalcontrols-container')
  _SfOnboardingInternalControlsContainer: any;

  @query('#calendar-list-container')
  _SfOnboardingCalendarListContainer: any;

  @query('#calendar-container')
  _SfOnboardingCalendarContainer: any;

  @queryAssignedElements({slot: 'project'})
  _SfProject: any;

  @queryAssignedElements({slot: 'uploader'})
  _SfUploader: any;

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
    (this._SfAdhocContainer as HTMLDivElement).style.display = 'none';
  }

  enableStream = () => {
      (this._SfCalendarContainer as HTMLDivElement).style.display = 'none';
      (this._SfStreamContainer as HTMLDivElement).style.display = 'flex';
      (this._SfUpcomingContainer as HTMLDivElement).style.display = 'none';
      (this._SfThisContainer as HTMLDivElement).style.display = 'none';
      (this._SfPastContainer as HTMLDivElement).style.display = 'none';
      (this._SfCustomContainer as HTMLDivElement).style.display = 'none';
      (this._SfAdhocContainer as HTMLDivElement).style.display = 'none';
  }

  enableUpcoming() {
    (this._SfCalendarContainer as HTMLDivElement).style.display = 'none';
    (this._SfStreamContainer as HTMLDivElement).style.display = 'none';
    (this._SfUpcomingContainer as HTMLDivElement).style.display = 'flex';
    (this._SfThisContainer as HTMLDivElement).style.display = 'none';
    (this._SfPastContainer as HTMLDivElement).style.display = 'none';
    (this._SfCustomContainer as HTMLDivElement).style.display = 'none';
    (this._SfAdhocContainer as HTMLDivElement).style.display = 'none';
  }

  enableThis() {
    (this._SfCalendarContainer as HTMLDivElement).style.display = 'none';
    (this._SfStreamContainer as HTMLDivElement).style.display = 'none';
    (this._SfUpcomingContainer as HTMLDivElement).style.display = 'none';
    (this._SfThisContainer as HTMLDivElement).style.display = 'flex';
    (this._SfPastContainer as HTMLDivElement).style.display = 'none';
    (this._SfCustomContainer as HTMLDivElement).style.display = 'none';
    (this._SfAdhocContainer as HTMLDivElement).style.display = 'none';
  }

  enablePast() {
    (this._SfCalendarContainer as HTMLDivElement).style.display = 'none';
    (this._SfStreamContainer as HTMLDivElement).style.display = 'none';
    (this._SfUpcomingContainer as HTMLDivElement).style.display = 'none';
    (this._SfThisContainer as HTMLDivElement).style.display = 'none';
    (this._SfPastContainer as HTMLDivElement).style.display = 'flex';
    (this._SfCustomContainer as HTMLDivElement).style.display = 'none';
    (this._SfAdhocContainer as HTMLDivElement).style.display = 'none';
  }

  enableCustom() {
    (this._SfCalendarContainer as HTMLDivElement).style.display = 'none';
    (this._SfStreamContainer as HTMLDivElement).style.display = 'none';
    (this._SfUpcomingContainer as HTMLDivElement).style.display = 'none';
    (this._SfThisContainer as HTMLDivElement).style.display = 'none';
    (this._SfPastContainer as HTMLDivElement).style.display = 'none';
    (this._SfCustomContainer as HTMLDivElement).style.display = 'flex';
    (this._SfAdhocContainer as HTMLDivElement).style.display = 'none';
  }

  enableAdhoc() {
    (this._SfCalendarContainer as HTMLDivElement).style.display = 'none';
    (this._SfStreamContainer as HTMLDivElement).style.display = 'none';
    (this._SfUpcomingContainer as HTMLDivElement).style.display = 'none';
    (this._SfThisContainer as HTMLDivElement).style.display = 'none';
    (this._SfPastContainer as HTMLDivElement).style.display = 'none';
    (this._SfCustomContainer as HTMLDivElement).style.display = 'none';
    (this._SfAdhocContainer as HTMLDivElement).style.display = 'flex';
  }

  prepareXhr = async (data: any, url: string, loaderElement: any, authorization: any, loaderText: string = '') => {

    
    if(loaderElement != null) {
      loaderElement.innerHTML = '<div class="lds-dual-ring"></div>';
      loaderElement.innerHTML += ('<div class="lds-text"><div class="lds-text-c">'+loaderText+'</div></div>');
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

  getMonthStatus = (month: number, year: number) => {

    //html += '<div class="d-flex align-baseline flex-grow flex-wrap">';

    const currMonth = new Date().getMonth();
    const currDate = new Date().getDate();

    console.log('currmonth', currMonth, 'currdate', currDate);

    var approved = 0;
    var inProgress = 0;
    var notStarted = 0;
    var total = 0;

    for(var i = 0; i < this.getLastDayOfMonth(month, year); i++) {

      const mmdd = ("0" + (month+1)).slice(-2) + "/" + ("0" + (i+1)).slice(-2);

      if(this.events[mmdd] != null) {

          for(var j = 0; j < this.events[mmdd].length; j++) {
            total++;
            if(this.events[mmdd][j].documents == null || this.events[mmdd][j].documents == null || (this.events[mmdd][j].documents).length === 0) {
              notStarted++;
            } else if(this.events[mmdd][j].approved != null && this.events[mmdd][j].approved){
              approved++;
            } else {
              inProgress++;
            }
          }

      } 
    }

    console.log('month-status', approved, inProgress, notStarted, total);

    var percApproved = (approved * 100)/total;
    var percInProgress = (inProgress * 100)/total;
    var percNotStarted = (notStarted * 100)/total;

    return {percNotStarted, percInProgress, percApproved};

  }

  insertDates = (month: number, year: number) => {

    var html = "";

    html += '<div part="bg-calendar" class="d-flex align-baseline flex-grow flex-wrap p-10">';

    const dateNumber = this.getLastDayOfLastMonth(month, year);

    for(var i = 0; i < this.getBlanks(month, year); i++) {

      html += '<div class="day-item date-item-before fw-100">';
      html += dateNumber-(this.getBlanks(month, year) - i - 1);
      html += '</div>';  

    }

    const currMonth = new Date().getMonth();
    const currDate = new Date().getDate();

    console.log('currmonth', currMonth, 'currdate', currDate);

    for(i = 0; i < this.getLastDayOfMonth(month, year); i++) {

      const mmdd = ("0" + (month+1)).slice(-2) + "/" + ("0" + (i+1)).slice(-2);

      var partName = "";

      if(this.events[mmdd] != null) {
        partName = "event-calendar-day-with-event";
        html += '<div part="' + partName + '" class="day-item date-item fw-600">';

          if(month === currMonth && (i+1) === currDate) {

            html += '<div part="event-calendar-day-today">'
              html += (i + 1);
            html += '</div>'

          } else {

            html += '<div>'
              html += (i + 1);
            html += '</div>'

          }

          var approved = 0;
          var inProgress = 0;
          var notStarted = 0;
          var total = 0;

          for(var j = 0; j < this.events[mmdd].length; j++) {
            total++;
            if(this.events[mmdd][j].documents == null || this.events[mmdd][j].documents == null || (this.events[mmdd][j].documents).length === 0) {
              notStarted++;
            } else if(this.events[mmdd][j].approved != null && this.events[mmdd][j].approved){
              approved++;
            } else {
              inProgress++;
            }
          }

          var percApproved = (approved * 100)/total;
          var percInProgress = (inProgress * 100)/total;
          var percNotStarted = (notStarted * 100)/total;

          console.log('percentages', mmdd, percApproved, percInProgress, percNotStarted)

          html += '<div class="d-flex justify-center">'
            //html += '<div part="event-date-indicator-primary" class="dot"></div>'
            html += '<div class="dot" style="width: '+(percApproved/2)+'%; background-color: '+this.COLOR_APPROVED+'"></div>'
            html += '<div class="dot" style="width: '+(percInProgress/2)+'%; background-color: '+this.COLOR_IN_PROGRESS+'"></div>'
            html += '<div class="dot" style="width: '+(percNotStarted/2)+'%; background-color: '+this.COLOR_NOT_STARTED+'"></div>'
          html += '</div>'
        html += '</div>';  
      } else {
        partName = "event-calendar-day-without-event";
        html += '<div part="' + partName + '" class="day-item date-item fw-100">';
          // html += '<div>'
          //   html += (i + 1);
          // html += '</div>'
          if(month === currMonth && (i+1) === currDate) {

            html += '<div part="event-calendar-day-today">'
              html += (i + 1);
            html += '</div>'

          } else {

            html += '<div>'
              html += (i + 1);
            html += '</div>'

          }
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

    html += '<div part="bg-calendar" class="d-flex align-center flex-grow p-10">';

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

  getPastDueDate = (mmdd: string) => {

    const dd = mmdd.substring(3, 5);
    const mm = mmdd.substring(0, 2);

    console.log('getpastduedate', mmdd, dd, mm);

    var date = new Date();
    date.setMonth(parseInt(mm) - 1);
    date.setDate(parseInt(dd));

    var currDate = new Date();

    if(currDate.getTime() > date.getTime()) {
      return true;
    }

    return false;

  }

  getLateExecuted = (mmdd: string, event: any) => {

    const tsDoc = new Date(parseInt(event.dateofcompletion[mmdd + "/" + new Date().getFullYear()])).getTime();

    const dd = mmdd.substring(3, 5);
    const mm = mmdd.substring(0, 2);
    var date = new Date();
    date.setMonth(parseInt(mm) - 1);
    date.setDate(parseInt(dd));

    const tsCurr = date.getTime();

    console.log('late executed', mmdd, tsDoc, tsCurr)

    if(tsDoc > tsCurr) {
      console.log('late executed', true)
      return true;
    }

    return false;

  }

  getLateApproved = (mmdd: string, event: any) => {

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

    if(tsLastUpdated > tsCurr) {
      console.log('late approved', true)
      return true;
    }

    return false;

  }

  updateJurisdictionStats = (jurisdictions: Array<string>, partStatus: string, lateStatus: string) => {

    for(var i = 0; i < jurisdictions.length; i++) {

      if(this.jurisdictionData == null) {
        this.jurisdictionData = {};
      }

      const jurisdictionName = jurisdictions[i].replace(/ *\([^)]*\) */g, "")
  
      if(this.jurisdictionData[jurisdictionName] == null) {
        this.jurisdictionData[jurisdictionName] = 1;
      } else {
        this.jurisdictionData[jurisdictionName]++;
      }

    }

    for(var i = 0; i < jurisdictions.length; i++) {

      if(this.jurisdictionLateStatusData == null) {
        this.jurisdictionLateStatusData = {};
      }

      if(this.jurisdictionPartStatusData == null) {
        this.jurisdictionPartStatusData = {};
      }

      if(this.jurisdictionLateStatusData[jurisdictions[i]] == null) {
        this.jurisdictionLateStatusData[jurisdictions[i]] = {};
      }

      if(this.jurisdictionPartStatusData[jurisdictions[i]] == null) {
        this.jurisdictionPartStatusData[jurisdictions[i]] = {};
      }

      if(this.jurisdictionPartStatusData[jurisdictions[i]]["status-not-started"] == null) {
        this.jurisdictionPartStatusData[jurisdictions[i]]["status-not-started"] = 0;
      }
      if(this.jurisdictionPartStatusData[jurisdictions[i]]["status-in-progress"] == null) {
        this.jurisdictionPartStatusData[jurisdictions[i]]["status-in-progress"] = 0;
      }
      if(this.jurisdictionPartStatusData[jurisdictions[i]]["status-approved"] == null) {
        this.jurisdictionPartStatusData[jurisdictions[i]]["status-approved"] = 0;
      }

      this.jurisdictionPartStatusData[jurisdictions[i]][partStatus]++;

      if(this.jurisdictionLateStatusData[jurisdictions[i]]["late-executed"] == null) {
        this.jurisdictionLateStatusData[jurisdictions[i]]["late-executed"] = 0;
      }
      if(this.jurisdictionLateStatusData[jurisdictions[i]]["late-approved"] == null) {
        this.jurisdictionLateStatusData[jurisdictions[i]]["late-approved"] = 0;
      }
      if(this.jurisdictionLateStatusData[jurisdictions[i]]["past-due-date"] == null) {
        this.jurisdictionLateStatusData[jurisdictions[i]]["past-due-date"] = 0;
      }
      if(this.jurisdictionLateStatusData[jurisdictions[i]]["in-time"] == null) {
        this.jurisdictionLateStatusData[jurisdictions[i]]["in-time"] = 0;
      }

      this.jurisdictionLateStatusData[jurisdictions[i]][lateStatus]++;

    }

  }

  updateFrequencyStats = (frequencies: Array<string>, partStatus: string, lateStatus: string) => {

    for(var i = 0; i < frequencies.length; i++) {

      if(this.frequencyData == null) {
        this.frequencyData = {};
      }

      const frequencyName = frequencies[i].replace(/ *\([^)]*\) */g, "")
  
      if(this.frequencyData[frequencyName] == null) {
        this.frequencyData[frequencyName] = 1;
      } else {
        this.frequencyData[frequencyName]++;
      }

    }

    for(var i = 0; i < frequencies.length; i++) {

      if(this.frequencyLateStatusData == null) {
        this.frequencyLateStatusData = {};
      }

      if(this.frequencyPartStatusData == null) {
        this.frequencyPartStatusData = {};
      }

      if(this.frequencyLateStatusData[frequencies[i]] == null) {
        this.frequencyLateStatusData[frequencies[i]] = {};
      }

      if(this.frequencyPartStatusData[frequencies[i]] == null) {
        this.frequencyPartStatusData[frequencies[i]] = {};
      }

      if(this.frequencyPartStatusData[frequencies[i]]["status-not-started"] == null) {
        this.frequencyPartStatusData[frequencies[i]]["status-not-started"] = 0;
      }
      if(this.frequencyPartStatusData[frequencies[i]]["status-in-progress"] == null) {
        this.frequencyPartStatusData[frequencies[i]]["status-in-progress"] = 0;
      }
      if(this.frequencyPartStatusData[frequencies[i]]["status-approved"] == null) {
        this.frequencyPartStatusData[frequencies[i]]["status-approved"] = 0;
      }

      this.frequencyPartStatusData[frequencies[i]][partStatus]++;

      if(this.frequencyLateStatusData[frequencies[i]]["late-executed"] == null) {
        this.frequencyLateStatusData[frequencies[i]]["late-executed"] = 0;
      }
      if(this.frequencyLateStatusData[frequencies[i]]["late-approved"] == null) {
        this.frequencyLateStatusData[frequencies[i]]["late-approved"] = 0;
      }
      if(this.frequencyLateStatusData[frequencies[i]]["past-due-date"] == null) {
        this.frequencyLateStatusData[frequencies[i]]["past-due-date"] = 0;
      }
      if(this.frequencyLateStatusData[frequencies[i]]["in-time"] == null) {
        this.frequencyLateStatusData[frequencies[i]]["in-time"] = 0;
      }

      this.frequencyLateStatusData[frequencies[i]][lateStatus]++;

    }

  }

  updateLocationStats = (locations: Array<string>, partStatus: string, lateStatus: string) => {

    for(var i = 0; i < locations.length; i++) {

      if(this.locationData == null) {
        this.locationData = {};
      }

      const locationName = locations[i].replace(/ *\([^)]*\) */g, "")
  
      if(this.locationData[locationName] == null) {
        this.locationData[locationName] = 1;
      } else {
        this.locationData[locationName]++;
      }

    }

    for(var i = 0; i < locations.length; i++) {


      const locationName = locations[i].replace(/ *\([^)]*\) */g, "")

      if(this.locationLateStatusData == null) {
        this.locationLateStatusData = {};
      }

      if(this.locationPartStatusData == null) {
        this.locationPartStatusData = {};
      }

      if(this.locationLateStatusData[locationName] == null) {
        this.locationLateStatusData[locationName] = {};
      }

      if(this.locationPartStatusData[locationName] == null) {
        this.locationPartStatusData[locationName] = {};
      }

      if(this.locationPartStatusData[locationName]["status-not-started"] == null) {
        this.locationPartStatusData[locationName]["status-not-started"] = 0;
      }
      if(this.locationPartStatusData[locationName]["status-in-progress"] == null) {
        this.locationPartStatusData[locationName]["status-in-progress"] = 0;
      }
      if(this.locationPartStatusData[locationName]["status-approved"] == null) {
        this.locationPartStatusData[locationName]["status-approved"] = 0;
      }

      this.locationPartStatusData[locationName][partStatus]++;

      if(this.locationLateStatusData[locationName]["late-executed"] == null) {
        this.locationLateStatusData[locationName]["late-executed"] = 0;
      }
      if(this.locationLateStatusData[locationName]["late-approved"] == null) {
        this.locationLateStatusData[locationName]["late-approved"] = 0;
      }
      if(this.locationLateStatusData[locationName]["past-due-date"] == null) {
        this.locationLateStatusData[locationName]["past-due-date"] = 0;
      }
      if(this.locationLateStatusData[locationName]["in-time"] == null) {
        this.locationLateStatusData[locationName]["in-time"] = 0;
      }

      this.locationLateStatusData[locationName][lateStatus]++;

    }

  }

  updateFunctionStats = (functions: Array<string>, partStatus: string, lateStatus: string) => {

    for(var i = 0; i < functions.length; i++) {

      if(this.functionData == null) {
        this.functionData = {};
      }

      const functionName = functions[i].replace(/ *\([^)]*\) */g, "")
  
      if(this.functionData[functionName] == null) {
        this.functionData[functionName] = 1;
      } else {
        this.functionData[functionName]++;
      }

    }

    for(var i = 0; i < functions.length; i++) {


      const functionName = functions[i].replace(/ *\([^)]*\) */g, "")

      if(this.functionLateStatusData == null) {
        this.functionLateStatusData = {};
      }

      if(this.functionPartStatusData == null) {
        this.functionPartStatusData = {};
      }

      if(this.functionLateStatusData[functionName] == null) {
        this.functionLateStatusData[functionName] = {};
      }

      if(this.functionPartStatusData[functionName] == null) {
        this.functionPartStatusData[functionName] = {};
      }

      if(this.functionPartStatusData[functionName]["status-not-started"] == null) {
        this.functionPartStatusData[functionName]["status-not-started"] = 0;
      }
      if(this.functionPartStatusData[functionName]["status-in-progress"] == null) {
        this.functionPartStatusData[functionName]["status-in-progress"] = 0;
      }
      if(this.functionPartStatusData[functionName]["status-approved"] == null) {
        this.functionPartStatusData[functionName]["status-approved"] = 0;
      }

      this.functionPartStatusData[functionName][partStatus]++;

      if(this.functionLateStatusData[functionName]["late-executed"] == null) {
        this.functionLateStatusData[functionName]["late-executed"] = 0;
      }
      if(this.functionLateStatusData[functionName]["late-approved"] == null) {
        this.functionLateStatusData[functionName]["late-approved"] = 0;
      }
      if(this.functionLateStatusData[functionName]["past-due-date"] == null) {
        this.functionLateStatusData[functionName]["past-due-date"] = 0;
      }
      if(this.functionLateStatusData[functionName]["in-time"] == null) {
        this.functionLateStatusData[functionName]["in-time"] = 0;
      }

      this.functionLateStatusData[functionName][lateStatus]++;

    }

  }

  updateRiskAreaStats = (riskAreas: Array<string>, partStatus: string, lateStatus: string) => {

    for(var i = 0; i < riskAreas.length; i++) {

      if(this.riskAreasData == null) {
        this.riskAreasData = {};
      }
  
      if(this.riskAreasData[riskAreas[i]] == null) {
        this.riskAreasData[riskAreas[i]] = 1;
      } else {
        this.riskAreasData[riskAreas[i]]++;
      }

    }

    for(var i = 0; i < riskAreas.length; i++) {

      if(this.riskAreasLateStatusData == null) {
        this.riskAreasLateStatusData = {};
      }

      if(this.riskAreasPartStatusData == null) {
        this.riskAreasPartStatusData = {};
      }

      if(this.riskAreasLateStatusData[riskAreas[i]] == null) {
        this.riskAreasLateStatusData[riskAreas[i]] = {};
      }

      if(this.riskAreasPartStatusData[riskAreas[i]] == null) {
        this.riskAreasPartStatusData[riskAreas[i]] = {};
      }

      if(this.riskAreasPartStatusData[riskAreas[i]]["status-not-started"] == null) {
        this.riskAreasPartStatusData[riskAreas[i]]["status-not-started"] = 0;
      }
      if(this.riskAreasPartStatusData[riskAreas[i]]["status-in-progress"] == null) {
        this.riskAreasPartStatusData[riskAreas[i]]["status-in-progress"] = 0;
      }
      if(this.riskAreasPartStatusData[riskAreas[i]]["status-approved"] == null) {
        this.riskAreasPartStatusData[riskAreas[i]]["status-approved"] = 0;
      }

      this.riskAreasPartStatusData[riskAreas[i]][partStatus]++;

      if(this.riskAreasLateStatusData[riskAreas[i]]["late-executed"] == null) {
        this.riskAreasLateStatusData[riskAreas[i]]["late-executed"] = 0;
      }
      if(this.riskAreasLateStatusData[riskAreas[i]]["late-approved"] == null) {
        this.riskAreasLateStatusData[riskAreas[i]]["late-approved"] = 0;
      }
      if(this.riskAreasLateStatusData[riskAreas[i]]["past-due-date"] == null) {
        this.riskAreasLateStatusData[riskAreas[i]]["past-due-date"] = 0;
      }
      if(this.riskAreasLateStatusData[riskAreas[i]]["in-time"] == null) {
        this.riskAreasLateStatusData[riskAreas[i]]["in-time"] = 0;
      }

      this.riskAreasLateStatusData[riskAreas[i]][lateStatus]++;

    }


  }

  updateRiskSeverityStats = (riskSeverities: Array<string>, partStatus: string, lateStatus: string) => {

    for(var i = 0; i < riskSeverities.length; i++) {

      if(this.riskSeverityData == null) {
        this.riskSeverityData = {};
      }
  
      if(this.riskSeverityData[riskSeverities[i]] == null) {
        this.riskSeverityData[riskSeverities[i]] = 1;
      } else {
        this.riskSeverityData[riskSeverities[i]]++;
      }

    }

    for(var i = 0; i < riskSeverities.length; i++) {

      if(this.riskSeverityLateStatusData == null) {
        this.riskSeverityLateStatusData = {};
      }

      if(this.riskSeverityPartStatusData == null) {
        this.riskSeverityPartStatusData = {};
      }

      if(this.riskSeverityLateStatusData[riskSeverities[i]] == null) {
        this.riskSeverityLateStatusData[riskSeverities[i]] = {};
      }

      if(this.riskSeverityPartStatusData[riskSeverities[i]] == null) {
        this.riskSeverityPartStatusData[riskSeverities[i]] = {};
      }

      if(this.riskSeverityPartStatusData[riskSeverities[i]]["status-not-started"] == null) {
        this.riskSeverityPartStatusData[riskSeverities[i]]["status-not-started"] = 0;
      }
      if(this.riskSeverityPartStatusData[riskSeverities[i]]["status-in-progress"] == null) {
        this.riskSeverityPartStatusData[riskSeverities[i]]["status-in-progress"] = 0;
      }
      if(this.riskSeverityPartStatusData[riskSeverities[i]]["status-approved"] == null) {
        this.riskSeverityPartStatusData[riskSeverities[i]]["status-approved"] = 0;
      }

      this.riskSeverityPartStatusData[riskSeverities[i]][partStatus]++;

      if(this.riskSeverityLateStatusData[riskSeverities[i]]["late-executed"] == null) {
        this.riskSeverityLateStatusData[riskSeverities[i]]["late-executed"] = 0;
      }
      if(this.riskSeverityLateStatusData[riskSeverities[i]]["late-approved"] == null) {
        this.riskSeverityLateStatusData[riskSeverities[i]]["late-approved"] = 0;
      }
      if(this.riskSeverityLateStatusData[riskSeverities[i]]["past-due-date"] == null) {
        this.riskSeverityLateStatusData[riskSeverities[i]]["past-due-date"] = 0;
      }
      if(this.riskSeverityLateStatusData[riskSeverities[i]]["in-time"] == null) {
        this.riskSeverityLateStatusData[riskSeverities[i]]["in-time"] = 0;
      }

      this.riskSeverityLateStatusData[riskSeverities[i]][lateStatus]++;

    }

  }

  updateObligationTypeStats = (obligationTypes: Array<string>, partStatus: string, lateStatus: string) => {

    for(var i = 0; i < obligationTypes.length; i++) {

      if(this.obligationTypeData == null) {
        this.obligationTypeData = {};
      }
  
      if(this.obligationTypeData[obligationTypes[i]] == null) {
        this.obligationTypeData[obligationTypes[i]] = 1;
      } else {
        this.obligationTypeData[obligationTypes[i]]++;
      }

    }

    for(var i = 0; i < obligationTypes.length; i++) {

      if(this.obligationTypeLateStatusData == null) {
        this.obligationTypeLateStatusData = {};
      }

      if(this.obligationTypePartStatusData == null) {
        this.obligationTypePartStatusData = {};
      }

      if(this.obligationTypeLateStatusData[obligationTypes[i]] == null) {
        this.obligationTypeLateStatusData[obligationTypes[i]] = {};
      }

      if(this.obligationTypePartStatusData[obligationTypes[i]] == null) {
        this.obligationTypePartStatusData[obligationTypes[i]] = {};
      }

      if(this.obligationTypePartStatusData[obligationTypes[i]]["status-not-started"] == null) {
        this.obligationTypePartStatusData[obligationTypes[i]]["status-not-started"] = 0;
      }
      if(this.obligationTypePartStatusData[obligationTypes[i]]["status-in-progress"] == null) {
        this.obligationTypePartStatusData[obligationTypes[i]]["status-in-progress"] = 0;
      }
      if(this.obligationTypePartStatusData[obligationTypes[i]]["status-approved"] == null) {
        this.obligationTypePartStatusData[obligationTypes[i]]["status-approved"] = 0;
      }

      this.obligationTypePartStatusData[obligationTypes[i]][partStatus]++;

      if(this.obligationTypeLateStatusData[obligationTypes[i]]["late-executed"] == null) {
        this.obligationTypeLateStatusData[obligationTypes[i]]["late-executed"] = 0;
      }
      if(this.obligationTypeLateStatusData[obligationTypes[i]]["late-approved"] == null) {
        this.obligationTypeLateStatusData[obligationTypes[i]]["late-approved"] = 0;
      }
      if(this.obligationTypeLateStatusData[obligationTypes[i]]["past-due-date"] == null) {
        this.obligationTypeLateStatusData[obligationTypes[i]]["past-due-date"] = 0;
      }
      if(this.obligationTypeLateStatusData[obligationTypes[i]]["in-time"] == null) {
        this.obligationTypeLateStatusData[obligationTypes[i]]["in-time"] = 0;
      }

      this.obligationTypeLateStatusData[obligationTypes[i]][lateStatus]++;

    }

  }

  renderStreamEvents = (index: number, month: number, year: number) => {

    this.selectedItems = [];
    this.selectedStatus = "";

    const lastDay = this.getLastDayOfMonth(month, year);

    var html = '';

    html += '<div class="mb-20 stream-event-list" part="stream-event-list-charts">';
      html += '<div part="stream-event-chart-selection" class="mb-20">';
        html += '<div part="td-head" class="mb-5">Select Chart</div>';
        html += '<div class="mb-10 d-flex flex-wrap align-center">';
          html += '<div part="chart-radio-item"><input type="radio" id="radio-completeness" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_COMPLETENESS) ? 'checked' : '') +'>';
          html += '<label for="radio-completeness" part="input-label" class="mr-10">Completeness</label></div>';
          html += '<div part="chart-radio-item"><input type="radio" id="radio-timeliness" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_TIMELINESS) ? 'checked' : '') +'>';
          html += '<label for="radio-timeliness" part="input-label" class="mr-10">Timeliness</label></div>';
          html += '<div part="chart-radio-item"><input type="radio" id="radio-risk" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_RISKAREAS) ? 'checked' : '') +'>';
          html += '<label for="radio-risk" part="input-label" class="mr-10">Risk Areas</label></div>';
          html += '<div part="chart-radio-item"><input type="radio" id="radio-riskseverity" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_RISKSEVERITY) ? 'checked' : '') +'>';
          html += '<label for="radio-riskseverity" part="input-label" class="mr-10">Risk Severity</label></div>';
          html += '<div part="chart-radio-item"><input type="radio" id="radio-location" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_LOCATION) ? 'checked' : '') +'>';
          html += '<label for="radio-location" part="input-label" class="mr-10">Location</label></div>';
          html += '<div part="chart-radio-item"><input type="radio" id="radio-function" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_FUNCTION) ? 'checked' : '') +'>';
          html += '<label for="radio-function" part="input-label" class="mr-10">Function</label></div>';
          html += '<div part="chart-radio-item"><input type="radio" id="radio-obligationtype" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_OBLIGATIONTYPE) ? 'checked' : '') +'>';
          html += '<label for="radio-obligationtype" part="input-label" class="mr-10">Obligation Type</label></div>';
          html += '<div part="chart-radio-item"><input type="radio" id="radio-jurisdiction" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_JURISDICTION) ? 'checked' : '') +'>';
          html += '<label for="radio-jurisdiction" part="input-label" class="mr-10">Jurisdiction</label></div>';
          html += '<div part="chart-radio-item"><input type="radio" id="radio-frequency" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_FREQUENCY) ? 'checked' : '') +'>';
          html += '<label for="radio-frequency" part="input-label">Frequency</label></div>';
        html += '</div>';
      html += '</div>';
      html += '<div class="chart-container d-flex scroll-x align-center"><div part="chart-item" class="chart-item"><canvas id="myChart"></div></canvas><div part="chart-item chart-item-middle" class="chart-item"><canvas id="myChart2" class="gone"></canvas></div><div part="chart-item" class="chart-item"><canvas id="myChart3" class="gone"></div></div>';
      html += '<div id="chart-settings-controls" class="mt-20"></div>'
      html += '<div id="chart-settings"></div>'
    html += '</div>';

    var total = 0, notStarted = 0, approved = 0, inProgress = 0, pastDueDate = 0, lateExecuted = 0, lateApproved = 0;

    html += '<div id="stream-event-'+index+'" part="stream-event-list" class="stream-event-list">';
    
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
    var period = ("0" + (month+1)).slice(-2) + "/" + ("0" + 1).slice(-2) + '/' + new Date().getFullYear() + ' - ' + ("0" + (month+1)).slice(-2) + "/" + ("0" + lastDay).slice(-2) + '/' + new Date().getFullYear()

    this.period = period;

    for(var i = 1; i <= lastDay; i++) {

      const mmdd = ("0" + (month+1)).slice(-2) + "/" + ("0" + i).slice(-2);

      console.log('mmdd', mmdd);

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

      console.log('flowgraph', this.flowGraph)

      if(this.events[mmdd] != null) {

        //html += '<div>'+month + ',' + year + ',' + i+'</div>'
        html += '<div part="stream-event-selected" class="d-flex stream-event-selected">';
          html += '<div part="stream-event-selected-date">'+("0" + i).slice(-2)+' |</div>';
          html += '<div class="stream-event-list-container flex-grow">'
          for(var j = 0; j < (this.events[mmdd] as Array<any>).length; j++) {

            total++;
            this.events[mmdd][j]['mmdd'] = mmdd
            this.eventsInWindow.push(this.events[mmdd][j]);

            var partStatus = "";
            var lateStatus = "in-time";

            if(this.events[mmdd][j].approved != null && (this.events[mmdd][j].approved) != null && (this.events[mmdd][j].approved)) {
              partStatus = "status-approved";
              if(this.getLateExecuted(mmdd, this.events[mmdd][j])) {
                lateStatus = "late-executed"
              } else {
                if(this.getLateApproved(mmdd, this.events[mmdd][j])) {
                  lateStatus = "late-approved"
                }
              }
            } else if(this.events[mmdd][j].comments != null && this.events[mmdd][j].comments != null && (this.events[mmdd][j].comments).length > 0) {
              partStatus = "status-in-progress";
              if(this.getPastDueDate(mmdd)) {
                lateStatus = "past-due-date"
              }
            } else {
              partStatus = "status-not-started";
              if(this.getPastDueDate(mmdd)) {
                lateStatus = "past-due-date"
              }
            }

            this.updateRiskAreaStats(this.events[mmdd][j]['riskarea'], partStatus, lateStatus);
            this.updateRiskSeverityStats(this.events[mmdd][j]['risk'], partStatus, lateStatus);
            this.updateFunctionStats(this.events[mmdd][j]['functions'], partStatus, lateStatus)
            this.updateObligationTypeStats(this.events[mmdd][j]['obligationtype'], partStatus, lateStatus)
            this.updateJurisdictionStats(this.events[mmdd][j]['jurisdiction'], partStatus, lateStatus)
            this.updateFrequencyStats(this.events[mmdd][j]['frequency'], partStatus, lateStatus)
            this.updateLocationStats([this.events[mmdd][j]['locationname']], partStatus, lateStatus)

            html += '<div class="stream-events-container flex-grow">';
              html += '<div class="hidden-tags hide">'+JSON.stringify(this.events[mmdd][j]['tags'])+'</div>'
              html += '<div class="hidden-title hide"><table><thead><th part="badge-filtered"><i>not filtered</i></th></thead></table></div>'
              html += '<div part="stream-events-event-title" class="d-flex align-center pl-5 pb-5">' + ('<input id="button-select-'+mmdd.replace('/', '-')+'-'+j + '-' + (((this.events[mmdd][j].makercheckers != null && (this.events[mmdd][j].makercheckers).length > 0)) ? '1' : '0') + '-' + (((this.events[mmdd][j].docs != null && (this.events[mmdd][j].docs).length > 0)) ? '1' : '0') + '-' + this.events[mmdd][j].entityid.replace(/-/g, '_') + '-' + this.events[mmdd][j].locationid.replace(/-/g, '_') + '-' + this.events[mmdd][j].id.replace(/-/g, '_') +  '-' + this.events[mmdd][j].duedate.split('/')[1] + '-' + this.events[mmdd][j].duedate.split('/')[0] + '-' + this.events[mmdd][j].duedate.split('/')[2] + '-' + partStatus.replace(/-/g,'_') +  '" class="button-select mr-10" type="checkbox" />') + '<sf-i-elastic-text text="'+this.events[mmdd][j]['obligationtitle']+'" minLength="100"></sf-i-elastic-text></div>';
              html += '<table class="stream-events-container-table" part="'+partStatus+'">';
              html += '<thead>';
              html += '<th part="td-head">';
              html += '</th>';
              html += '<th part="td-head">';
              html += 'Status'
              if(csvCols.indexOf('Status') < 0) {
                csvCols += 'Period,Status,Id,ObligationTitle,Obligation,Duedate' 
                htmlCols += '<tr><th>Id</th><th>Status</th><th class="w-200px">Statute</th><th>Reference</th><th class="w-200px">Applicability</th><th class="w-200px">Obligation</th><th>ObligationType</th><th class="w-200px">Penalty</th><th>RiskSeverity</th><th>Frequency</th><th>SubFrequency</th><th>DueDate</th></tr>'
              }
              html += '</th>';
              html += '<th part="td-head">';
              html += 'Location'
              html += '</th>'
              html += '<th part="td-head">';
              html += 'Entity'
              html += '</th>'
              html += '<th part="td-head">';
              html += 'Country'
              html += '</th>'
              html += '<th part="td-head">';
              html += 'Function'
              html += '</th>'
              for(var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
                if(this.getEventPreviewFields().includes(Object.keys(this.events[mmdd][j])[k])) {
                  html += '<th part="td-head" class="bg-left-no-border">';
                  html += Object.keys(this.events[mmdd][j])[k];
                }
              }
              
              console.log('listing docs',this.events[mmdd][j].documents )
              if(this.events[mmdd][j].documents != null && this.events[mmdd][j].documents != null && (this.events[mmdd][j].documents).length > 0) {
                html += '<th part="td-head">';
                html += 'Docs'
                html += '</th>';
              } else {
                
              }
              if(this.events[mmdd][j].comments != null && this.events[mmdd][j].comments != null && (this.events[mmdd][j].comments).length > 0) {
                html += '<th part="td-head">';
                html += 'Comments'
                html += '</th>';
              } else {
                if(partStatus != "status-approved") {
                  notStarted++;
                }
              }
              if(this.events[mmdd][j].lastupdated != null && this.events[mmdd][j].lastupdated != null && (this.events[mmdd][j].lastupdated).length > 0) {
                html += '<th part="td-head">';
                html += 'Updated'
                html += '</th>';
              } else {
              }
              if(this.events[mmdd][j].makercheckers != null && (this.events[mmdd][j].makercheckers).length > 0) {
                html += '<th part="td-head">';
                html += ''
                html += '</th>'
              }
              if(this.events[mmdd][j].docs != null && (this.events[mmdd][j].docs).length > 0) {
                html += '<th part="td-head">';
                html += ''
                html += '</th>'
              }
              html += '</thead>';
              html += '<tbody>';
              csvValues += (period + ',');
              htmlValues += ('<tr><td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["id"]+'</td>');
              if(partStatus == "status-approved") {
                approved++
                html += '<td part="td-body">';
                if(lateStatus == "late-executed") {
                  lateExecuted++;
                  if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
                    html += '<span class="material-symbols-outlined color-done">check_circle</span>';
                  }
                  if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
                    html += '<span class="material-icons color-late-executed">running_with_errors</span>';
                  }
                  csvValues += 'approved late-executed,';
                  htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center">approved late-executed</td>');
                } else if(lateStatus == "late-approved") {
                  lateApproved++;
                  if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
                    html += '<span class="material-symbols-outlined color-done">check_circle</span>'
                  }
                  if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
                    html += '<span class="material-icons color-late-approved">running_with_errors</span>'
                  }
                  csvValues += 'approved late-approved,';
                  htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center">approved late-approved</td>');
                } else {
                  if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
                    html += '<span class="material-symbols-outlined color-done">check_circle</span>'
                  }
                  if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
                    html += '<span class="material-symbols-outlined color-not-started">timer</span>'
                  }
                  csvValues += 'approved,';
                  htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center">approved</td>');
                }
                html += '</td>';
              } else if(partStatus == "status-in-progress") {
                html += '<td part="td-body">';
                if(lateStatus == "past-due-date") {
                  pastDueDate++;
                  if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
                    html += '<span class="material-symbols-outlined color-pending">pending</span>'
                  }
                  if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
                    html += '<span class="material-icons color-past-due-date">running_with_errors</span>'
                  }
                  csvValues += 'in-progress past-due-date,';
                  htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center">in-progress past-due-date</td>');
                } else {
                  if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
                    html += '<span class="material-symbols-outlined color-pending">pending</span>'
                  }
                  if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
                    html += '<span class="material-symbols-outlined color-not-started">timer</span>'
                  }
                  csvValues += 'in-progress,';
                  htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center">in-progress</td>');
                }
                
                html += '</td>';
              } else {
                html += '<td part="td-body">';
                if(lateStatus == "past-due-date") {
                  pastDueDate++;
                  if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
                    html += '<span class="material-icons color-not-started">schedule</span>'
                  }
                  if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
                    html += '<span class="material-icons color-past-due-date">running_with_errors</span>'
                  }
                  csvValues += 'not started past-due-date,';
                  htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center">not started past-due-date</td>');
                } else {
                  if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
                    html += '<span class="material-icons color-not-started">schedule</span>'
                  }
                  if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
                    html += '<span class="material-symbols-outlined color-not-started">timer</span>'
                  }
                  csvValues += 'not started,';
                  htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center">not started</td>');
                }
                
                html += '</td>';
              }
              html += '<td id="td-expand-'+i+'" part="td-body">';
              html += '<button id="button-unmapped-expand-'+mmdd.replace('/', '-')+'-'+j+'" part="button-icon-small" class="material-icons button-expand mr-10">open_in_new</button>'
              html += '</td>';
              html += '<td part="td-body"><sf-i-elastic-text text="'+this.events[mmdd][j]["locationname"].replace(/ *\([^)]*\) */g, "")+'" minLength="10"></sf-i-elastic-text></td>';
              html += '<td part="td-body"><sf-i-elastic-text text="'+this.events[mmdd][j]["entityname"].replace(/ *\([^)]*\) */g, "")+'" minLength="10"></sf-i-elastic-text></td>';
              html += '<td part="td-body"><sf-i-elastic-text text="'+this.events[mmdd][j]["countryname"].replace(/ *\([^)]*\) */g, "")+'" minLength="10"></sf-i-elastic-text></td>';
              var functions = '';
              for(const element of this.events[mmdd][j]["functions"])  {
                functions += (element.split(';')[0].replace(/ *\([^)]*\) */g, "") + ",");
              }
              functions = functions.replace(/,\s*$/, "");
              html += '<td part="td-body"><sf-i-elastic-text text="'+functions+'" minLength="10"></sf-i-elastic-text></td>';
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
              console.log('statute = ', (this.events[mmdd][j]["statute"]));
              csvValues += this.events[mmdd][j]["id"] + ',' + this.events[mmdd][j]["obligationtitle"] + ',' + this.events[mmdd][j]["obligation"] + ',' + this.events[mmdd][j]["duedate"];
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["statute"]+'</td>');
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["reference"]+'</td>');
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["applicability"]+'</td>');
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["obligation"]+'</td>');
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["obligationtype"]+'</td>');
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["penalty"]+'</td>');
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["risk"]+'</td>');
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["frequency"]+'</td>');
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["subfrequency"]+'</td>');
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["duedate"]+'</td>');

              
              if(this.events[mmdd][j].documents != null && this.events[mmdd][j].documents != null && (this.events[mmdd][j].documents).length > 0) {
                html += '<td part="td-body">';
                html += '<span class="material-icons muted">description</span>'
                html += (this.events[mmdd][j].documents).length
                html += '</td>';
              } else {
              }
              if(this.events[mmdd][j].comments != null && this.events[mmdd][j].comments != null && (this.events[mmdd][j].comments).length > 0) {
                html += '<td part="td-body">';
                html += '<span class="material-icons muted">forum</span>'
                html += (this.events[mmdd][j].comments).length
                html += '</td>';
              } else {
              }
              if(this.events[mmdd][j].lastupdated != null && this.events[mmdd][j].lastupdated != null && (this.events[mmdd][j].lastupdated).length > 0) {
                html += '<td part="td-body">';
                html += Util.timeSince(new Date(this.events[mmdd][j].lastupdated).getTime())
                html += '</td>';
              } else {
              }
              if(this.events[mmdd][j].makercheckers != null && (this.events[mmdd][j].makercheckers).length > 0) {
                html += '<td part="td-body">';
                html += '<span class="material-symbols-outlined muted">done_all</span>'
                html += '</td>';
              }
              if(this.events[mmdd][j].docs != null && (this.events[mmdd][j].docs).length > 0) {
                html += '<th part="td-body">';
                html += '<span class="material-symbols-outlined muted">scan_delete</span>'
                html += '</th>'
              }
              csvValues += '\n';
              htmlValues += ('</tr>');
              
              html += '</tbody>';
              html += '</table>';
              html += '<div class="hidden-filtername hide"><table><thead><th part="badge-filter-name" class="filtername"></th></thead></table></div>'

              if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS && this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {

                let graphParam = '';
                if(Array.isArray(this.events[mmdd][j][this.flowGraph])) {
                  graphParam = this.events[mmdd][j][this.flowGraph].toString().replace(/ *\([^)]*\) */g, "");
                } else {
                  graphParam = this.events[mmdd][j][this.flowGraph].replace(/ *\([^)]*\) */g, "");
                }
                html += '<div class="d-flex"><div part="badge-filter-name" class="graphparamname mb-20">' + graphParam + '</div></div>';

              } else {

                if(this.flowGraph == this.FLOW_GRAPH_COMPLETENESS) {

                  html += '<div class="d-flex"><div part="badge-filter-name" class="graphparamname mb-20">' + partStatus.replace('status-', '') + '</div></div>';

                }

                if(this.flowGraph == this.FLOW_GRAPH_TIMELINESS) {

                  html += '<div class="d-flex"><div part="badge-filter-name" class="graphparamname mb-20">' + lateStatus + '</div></div>';

                }

              }


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

    this.csvDataCompliances = csvCols + "\n" + csvValues;
    this.htmlDataCompliances = '<table>' + htmlCols + htmlValues + '</table>';

    inProgress = total - notStarted - approved;

    console.log('progress', total, notStarted, approved)

    html = html.replace("DASHBOARD_TOTAL", total+"");
    html = html.replace("DASHBOARD_NOT_STARTED", notStarted+"");
    html = html.replace("DASHBOARD_APPROVED", approved+"");
    html = html.replace("DASHBOARD_IN_PROGRESS", inProgress+"");
    html = html.replace("DASHBOARD_PAST_DUE_DATE", pastDueDate+"");
    html = html.replace("DASHBOARD_LATE_EXECUTED", lateExecuted+"");
    html = html.replace("DASHBOARD_LATE_APPROVED", lateApproved+"");

    this.csvDataStats = 'Period,Total,Not Started,Approved,In Progress,Past Due Date,Late Executed,Late Approved\n';
    this.csvDataStats += period + "," + total + "," + notStarted + "," + approved + "," + inProgress + "," + pastDueDate + "," + lateExecuted + "," + lateApproved;

    this.htmlDataStats = '<table class="w-100"><tr><th class="w-14">Total</th><th class="w-14">Not Started</th><th class="w-14">Approved</th><th class="w-14">In Progress</th><th class="w-14">Past Due Date</th><th class="w-14">Late Executed</th><th class="w-14">Late Approved</th><tr>'
    this.htmlDataStats += '<tr><td class="w-14 text-center td-odd">'+total+'</td><td class="w-14 text-center td-odd">'+notStarted+'</td><td class="w-14 text-center td-odd">'+approved+'</td><td class="w-14 text-center td-odd">'+inProgress+'</td><td class="w-14 text-center td-odd">'+pastDueDate+'</td><td class="w-14 text-center td-odd">'+lateExecuted+'</td><td class="w-14 text-center td-odd">'+lateApproved+'</td><tr></table>'

    return html;

  }

  renderUpcomingEvents = (index:number, startDate: Date, count: number) => {

    this.selectedItems = [];
    this.selectedStatus = "";

    var html = '';

    html += '<div class="mb-20 stream-event-list" part="stream-event-list-charts">';
      html += '<div part="stream-event-chart-selection" class="mb-20">';
        html += '<div part="td-head" class="mb-5">Select Chart</div>';
        html += '<div class="mb-10 d-flex flex-wrap align-center">';
          html += '<div part="chart-radio-item"><input type="radio" id="radio-completeness" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_COMPLETENESS) ? 'checked' : '') +'>';
          html += '<label for="radio-completeness" part="input-label" class="mr-10">Completeness</label></div>';
          html += '<div part="chart-radio-item"><input type="radio" id="radio-timeliness" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_TIMELINESS) ? 'checked' : '') +'>';
          html += '<label for="radio-timeliness" part="input-label" class="mr-10">Timeliness</label></div>';
          html += '<div part="chart-radio-item"><input type="radio" id="radio-risk" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_RISKAREAS) ? 'checked' : '') +'>';
          html += '<label for="radio-risk" part="input-label" class="mr-10">Risk Areas</label></div>';
          html += '<div part="chart-radio-item"><input type="radio" id="radio-riskseverity" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_RISKSEVERITY) ? 'checked' : '') +'>';
          html += '<label for="radio-riskseverity" part="input-label" class="mr-10">Risk Severity</label></div>';
          html += '<div part="chart-radio-item"><input type="radio" id="radio-location" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_LOCATION) ? 'checked' : '') +'>';
          html += '<label for="radio-location" part="input-label" class="mr-10">Location</label></div>';
          html += '<div part="chart-radio-item"><input type="radio" id="radio-function" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_FUNCTION) ? 'checked' : '') +'>';
          html += '<label for="radio-function" part="input-label" class="mr-10">Function</label></div>';
          html += '<div part="chart-radio-item"><input type="radio" id="radio-obligationtype" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_OBLIGATIONTYPE) ? 'checked' : '') +'>';
          html += '<label for="radio-obligationtype" part="input-label" class="mr-10">Obligation Type</label></div>';
          html += '<div part="chart-radio-item"><input type="radio" id="radio-jurisdiction" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_JURISDICTION) ? 'checked' : '') +'>';
          html += '<label for="radio-jurisdiction" part="input-label" class="mr-10">Jurisdiction</label></div>';
          html += '<div part="chart-radio-item"><input type="radio" id="radio-frequency" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_FREQUENCY) ? 'checked' : '') +'>';
          html += '<label for="radio-frequency" part="input-label">Frequency</label></div>';
        html += '</div>';
      html += '</div>';
      html += '<div class="chart-container d-flex scroll-x align-center"><div part="chart-item" class="chart-item"><canvas id="myChart"></div></canvas><div part="chart-item chart-item-middle" class="chart-item"><canvas id="myChart2" class="gone"></canvas></div><div part="chart-item" class="chart-item"><canvas id="myChart3" class="gone"></div></div>';
      html += '<div id="chart-settings-controls" class="mt-20"></div>'
      html += '<div id="chart-settings"></div>'
    html += '</div>';


    html += '<div id="stream-event-'+index+'" part="stream-event-list" class="stream-event-list">';

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
    var period = ("0" + (startDate.getMonth()+1)).slice(-2) + "/" + ("0" + 1).slice(-2) + ' - ' + ("0" + (startDate.getMonth()+1)).slice(-2) + "/" + ("0" + count).slice(-2)

    this.period = period;

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
            total++
            this.events[mmdd][j]['mmdd'] = mmdd
            this.eventsInWindow.push(this.events[mmdd][j]);

            var partStatus = "";
            var lateStatus = "in-time";

            if(this.events[mmdd][j].approved != null && (this.events[mmdd][j].approved) != null && (this.events[mmdd][j].approved)) {
              partStatus = "status-approved";
              if(this.getLateExecuted(mmdd, this.events[mmdd][j])) {
                lateStatus = "late-executed"
              } else {
                if(this.getLateApproved(mmdd, this.events[mmdd][j])) {
                  lateStatus = "late-approved"
                }
              }
            } else if(this.events[mmdd][j].comments != null && this.events[mmdd][j].comments != null && (this.events[mmdd][j].comments).length > 0) {
              partStatus = "status-in-progress";
              if(this.getPastDueDate(mmdd)) {
                lateStatus = "past-due-date"
              }
            } else {
              partStatus = "status-not-started";
              if(this.getPastDueDate(mmdd)) {
                lateStatus = "past-due-date"
              }
            }

            this.updateRiskAreaStats(this.events[mmdd][j]['riskarea'], partStatus, lateStatus);
            this.updateRiskSeverityStats(this.events[mmdd][j]['risk'], partStatus, lateStatus);
            this.updateFunctionStats(this.events[mmdd][j]['functions'], partStatus, lateStatus);
            this.updateObligationTypeStats(this.events[mmdd][j]['obligationtype'], partStatus, lateStatus);
            this.updateJurisdictionStats(this.events[mmdd][j]['jurisdiction'], partStatus, lateStatus)
            this.updateFrequencyStats(this.events[mmdd][j]['frequency'], partStatus, lateStatus)
            this.updateLocationStats([this.events[mmdd][j]['locationname']], partStatus, lateStatus)

            html += '<div class="stream-events-container flex-grow">';
              html += '<div class="hidden-tags hide">'+JSON.stringify(this.events[mmdd][j]['tags'])+'</div>'
              html += '<div class="hidden-title hide"><table><thead><th part="badge-filtered"><i>filtered out</i></th></thead></table></div>'
              html += '<div part="stream-events-event-title" class="d-flex align-center pl-5 pb-5">' + ('<input id="button-select-'+mmdd.replace('/', '-')+'-'+j + '-' + (((this.events[mmdd][j].makercheckers != null && (this.events[mmdd][j].makercheckers).length > 0)) ? '1' : '0') + '-' + (((this.events[mmdd][j].docs != null && (this.events[mmdd][j].docs).length > 0)) ? '1' : '0') + '-' + this.events[mmdd][j].entityid.replace(/-/g, '_') + '-' + this.events[mmdd][j].locationid.replace(/-/g, '_') + '-' + this.events[mmdd][j].id.replace(/-/g, '_') +  '-' + this.events[mmdd][j].duedate.split('/')[1] + '-' + this.events[mmdd][j].duedate.split('/')[0] + '-' + this.events[mmdd][j].duedate.split('/')[2] + '-' + partStatus.replace(/-/g,'_') +  '" class="button-select mr-10" type="checkbox" />') + '<sf-i-elastic-text text="'+this.events[mmdd][j]['obligationtitle']+'" minLength="100"></sf-i-elastic-text></div>';
              html += '<table class="stream-events-container-table" >';
              html += '<thead>';
              html += '<th part="td-head">';
              html += 'Status'
              if(csvCols.indexOf('Status') < 0) {
                csvCols += 'Period,Status,Id,ObligationTitle,Obligation,Duedate'
                htmlCols += '<tr><th>Id</th><th>Status</th><th class="w-200px">Statute</th><th>Reference</th><th class="w-200px">Applicability</th><th class="w-200px">Obligation</th><th>ObligationType</th><th class="w-200px">Penalty</th><th>RiskSeverity</th><th>Frequency</th><th>SubFrequency</th><th>DueDate</th></tr>'
              }
              html += '</th>';
              html += '<th part="td-head">';
              html += '</th>';
              html += '<th part="td-head">';
              html += 'Location'
              html += '</th>'
              html += '<th part="td-head">';
              html += 'Entity'
              html += '</th>'
              html += '<th part="td-head">';
              html += 'Country'
              html += '</th>'
              html += '<th part="td-head">';
              html += 'Function'
              html += '</th>'
              
              
              for(var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
                if(this.getEventPreviewFields().includes(Object.keys(this.events[mmdd][j])[k])) {
                  html += '<th part="td-head" class="bg-left-no-border">';
                  html += Object.keys(this.events[mmdd][j])[k];
                  html += '</th>';
                }
              }
              
              console.log('listing docs',this.events[mmdd][j].documents )
              if(this.events[mmdd][j].documents != null && this.events[mmdd][j].documents != null && (this.events[mmdd][j].documents).length > 0) {
                html += '<th part="td-head">';
                html += 'Docs'
                html += '</th>';
              }
              if(this.events[mmdd][j].comments != null && this.events[mmdd][j].comments != null && (this.events[mmdd][j].comments).length > 0) {
                html += '<th part="td-head">';
                html += 'Comments'
                html += '</th>';
              } else {
                if(partStatus != "status-approved") {
                  notStarted++;
                }
              }
              if(this.events[mmdd][j].lastupdated != null && this.events[mmdd][j].lastupdated != null && (this.events[mmdd][j].lastupdated).length > 0) {
                html += '<th part="td-head">';
                html += 'Updated'
                html += '</th>';
              }
              if(this.events[mmdd][j].makercheckers != null && (this.events[mmdd][j].makercheckers).length > 0) {
                html += '<th part="td-head">';
                html += ''
                html += '</th>'
              }
              if(this.events[mmdd][j].docs != null && (this.events[mmdd][j].docs).length > 0) {
                html += '<th part="td-head">';
                html += ''
                html += '</th>'
              }
              // for(var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
              //   html += '<th part="td-head">';
              //   html += Object.keys(this.events[mmdd][j])[k];
              //   html += '</th>';
              // }
              html += '</thead>';
              html += '<tbody>';
              csvValues += (period + ',');
              htmlValues += ('<tr><td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["id"]+'</td>');
              if(partStatus == "status-approved") {
                approved++
                html += '<td part="td-body">';
                if(lateStatus == "late-executed") {
                  lateExecuted++;
                  if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
                    html += '<span class="material-symbols-outlined color-done">check_circle</span>';
                  }
                  if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
                    html += '<span class="material-icons color-late-executed">running_with_errors</span>';
                  }
                  csvValues += 'approved late-executed,';
                  htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center"><span class="material-symbols-outlined color-done">check_circle</span><span class="material-icons color-late-executed">running_with_errors</span></td>');
                } else if(lateStatus == "late-approved") {
                  lateApproved++;
                  if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
                    html += '<span class="material-symbols-outlined color-done">check_circle</span>'
                  }
                  if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
                    html += '<span class="material-icons color-late-approved">running_with_errors</span>'
                  }
                  csvValues += 'approved late-approved,';
                  htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center"><span class="material-symbols-outlined color-done">check_circle</span><span class="material-icons color-late-approved">running_with_errors</span></td>');
                } else {
                  if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
                    html += '<span class="material-symbols-outlined color-done">check_circle</span>'
                  }
                  if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
                    html += '<span class="material-symbols-outlined color-not-started">timer</span>'
                  }
                  csvValues += 'approved,';
                  htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center"><span class="material-icons color-done">check_circle</span></td>');
                }
                html += '</td>';
              } else if(partStatus == "status-in-progress") {
                html += '<td part="td-body">';
                if(lateStatus == "past-due-date") {
                  pastDueDate++;
                  if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
                    html += '<span class="material-symbols-outlined color-pending">pending</span>'
                  }
                  if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
                    html += '<span class="material-icons color-past-due-date">running_with_errors</span>'
                  }
                  csvValues += 'in-progress past-due-date,';
                  htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center"><span class="material-symbols-outlined color-pending">pending</span><span class="material-icons color-past-due-date">running_with_errors</span></td>');
                } else {
                  if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
                    html += '<span class="material-symbols-outlined color-pending">pending</span>'
                  }
                  if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
                    html += '<span class="material-symbols-outlined color-not-started">timer</span>'
                  }
                  csvValues += 'in-progress,';
                  htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center"><span class="material-symbols-outlined color-pending">pending</span></td>');
                }
                
                html += '</td>';
              } else {
                html += '<td part="td-body">';
                if(lateStatus == "past-due-date") {
                  pastDueDate++;
                  if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
                    html += '<span class="material-icons color-not-started">schedule</span>'
                  }
                  if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
                    html += '<span class="material-icons color-past-due-date">running_with_errors</span>'
                  }
                  csvValues += 'not started past-due-date,';
                  htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center"><span class="material-icons color-not-started">schedule</span><span class="material-icons color-past-due-date">running_with_errors</span></td>');
                } else {
                  if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
                    html += '<span class="material-icons color-not-started">schedule</span>'
                  }
                  if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
                    html += '<span class="material-symbols-outlined color-not-started">timer</span>'
                  }
                  csvValues += 'not started,';
                  htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center"><span class="material-icons color-not-started">schedule</span></td>');
                }
                
                html += '</td>';
              }
              html += '<td id="td-expand-'+i+'" part="td-body">';
              html += '<button id="button-unmapped-expand-'+mmdd.replace('/', '-')+'-'+j+'" part="button-icon-small" class="material-icons button-expand mr-10">open_in_new</button>'
              html += '</td>';
              html += '<td part="td-body"><sf-i-elastic-text text="'+this.events[mmdd][j]["locationname"].replace(/ *\([^)]*\) */g, "")+'" minLength="10"></sf-i-elastic-text></td>';
              html += '<td part="td-body"><sf-i-elastic-text text="'+this.events[mmdd][j]["entityname"].replace(/ *\([^)]*\) */g, "")+'" minLength="10"></sf-i-elastic-text></td>';
              html += '<td part="td-body"><sf-i-elastic-text text="'+this.events[mmdd][j]["countryname"].replace(/ *\([^)]*\) */g, "")+'" minLength="10"></sf-i-elastic-text></td>';
              var functions = '';
              for(const element of this.events[mmdd][j]["functions"])  {
                functions += (element.split(';')[0].replace(/ *\([^)]*\) */g, "") + ",");
              }
              functions = functions.replace(/,\s*$/, "");
              html += '<td part="td-body"><sf-i-elastic-text text="'+functions+'" minLength="10"></sf-i-elastic-text></td>';
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
              
              csvValues += this.events[mmdd][j]["id"] + ',' + this.events[mmdd][j]["obligationtitle"] + ',' + this.events[mmdd][j]["obligation"] + ',' + this.events[mmdd][j]["duedate"];
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["statute"]+'</td>');
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["reference"]+'</td>');
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["applicability"]+'</td>');
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["obligation"]+'</td>');
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["obligationtype"]+'</td>');
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["penalty"]+'</td>');
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["risk"]+'</td>');
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["frequency"]+'</td>');
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["subfrequency"]+'</td>');
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["duedate"]+'</td>');

              
              if(this.events[mmdd][j].documents != null && this.events[mmdd][j].documents != null && (this.events[mmdd][j].documents).length > 0) {
                html += '<td part="td-body">';
                html += '<span class="material-icons muted">description</span>'
                html += (this.events[mmdd][j].documents).length
                html += '</td>';
              }
              if(this.events[mmdd][j].comments != null && this.events[mmdd][j].comments != null && (this.events[mmdd][j].comments).length > 0) {
                html += '<td part="td-body">';
                html += '<span class="material-icons muted">forum</span>'
                html += (this.events[mmdd][j].comments).length
                html += '</td>';
              }
              if(this.events[mmdd][j].lastupdated != null && this.events[mmdd][j].lastupdated != null && (this.events[mmdd][j].lastupdated).length > 0) {
                html += '<td part="td-body">';
                html += Util.timeSince(new Date(this.events[mmdd][j].lastupdated).getTime())
                html += '</td>';
              }
              if(this.events[mmdd][j].makercheckers != null && (this.events[mmdd][j].makercheckers).length > 0) {
                html += '<td part="td-body">';
                html += '<span class="material-symbols-outlined muted">done_all</span>'
                html += '</td>';
              }
              if(this.events[mmdd][j].docs != null && (this.events[mmdd][j].docs).length > 0) {
                html += '<th part="td-body">';
                html += '<span class="material-symbols-outlined muted">scan_delete</span>'
                html += '</th>'
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
              html += '<div class="hidden-filtername hide"><table><thead><th part="badge-filter-name" class="filtername"></th></thead></table></div>'

              if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS && this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {

                let graphParam = '';
                if(Array.isArray(this.events[mmdd][j][this.flowGraph])) {
                  graphParam = this.events[mmdd][j][this.flowGraph].toString().replace(/ *\([^)]*\) */g, "");
                } else {
                  graphParam = this.events[mmdd][j][this.flowGraph].replace(/ *\([^)]*\) */g, "");
                }
                html += '<div class="d-flex"><div part="badge-filter-name" class="graphparamname mb-20">' + graphParam + '</div></div>';

              } else {

                if(this.flowGraph == this.FLOW_GRAPH_COMPLETENESS) {

                  html += '<div class="d-flex"><div part="badge-filter-name" class="graphparamname mb-20">' + partStatus.replace('status-', '') + '</div></div>';

                }

                if(this.flowGraph == this.FLOW_GRAPH_TIMELINESS) {

                  html += '<div class="d-flex"><div part="badge-filter-name" class="graphparamname mb-20">' + lateStatus + '</div></div>';

                }

              }

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

    console.log('csvValues', csvValues);

    this.csvDataCompliances = csvCols + "\n" + csvValues;
    this.htmlDataCompliances = '<table>' + htmlCols + htmlValues + '</table>';

    inProgress = total - notStarted - approved;

    console.log('progress', total, notStarted, approved)

    html = html.replace("DASHBOARD_TOTAL", total+"");
    html = html.replace("DASHBOARD_NOT_STARTED", notStarted+"");
    html = html.replace("DASHBOARD_APPROVED", approved+"");
    html = html.replace("DASHBOARD_IN_PROGRESS", inProgress+"");
    html = html.replace("DASHBOARD_PAST_DUE_DATE", pastDueDate+"");
    html = html.replace("DASHBOARD_LATE_EXECUTED", lateExecuted+"");
    html = html.replace("DASHBOARD_LATE_APPROVED", lateApproved+"");

    this.csvDataStats = 'Period,Total,Not Started,Approved,In Progress,Past Due Date,Late Executed,Late Approved\n';
    this.csvDataStats += period + "," + total + "," + notStarted + "," + approved + "," + inProgress + "," + pastDueDate + "," + lateExecuted + "," + lateApproved;

    this.htmlDataStats = '<table class="w-100"><tr><th class="w-14">Total</th><th class="w-14">Not Started</th><th class="w-14">Approved</th><th class="w-14">In Progress</th><th class="w-14">Past Due Date</th><th class="w-14">Late Executed</th><th class="w-14">Late Approved</th><tr>'
    this.htmlDataStats += '<tr><td class="w-14 text-center td-odd">'+total+'</td><td class="w-14 text-center td-odd">'+notStarted+'</td><td class="w-14 text-center td-odd">'+approved+'</td><td class="w-14 text-center td-odd">'+inProgress+'</td><td class="w-14 text-center td-odd">'+pastDueDate+'</td><td class="w-14 text-center td-odd">'+lateExecuted+'</td><td class="w-14 text-center td-odd">'+lateApproved+'</td><tr></table>'

    return html;

  }

  renderThisEvents = (index: number, startDate: Date) => {

    this.selectedItems = [];
    this.selectedStatus = "";

    var html = '';

    html += '<div class="mb-20 stream-event-list" part="stream-event-list-charts">';
      html += '<div part="stream-event-chart-selection" class="mb-20">';
        html += '<div part="td-head" class="mb-5">Select Chart</div>';
        html += '<div class="mb-10 d-flex flex-wrap align-center">';
          html += '<div part="chart-radio-item"><input type="radio" id="radio-completeness" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_COMPLETENESS) ? 'checked' : '') +'>';
          html += '<label for="radio-completeness" part="input-label" class="mr-10">Completeness</label></div>';
          html += '<div part="chart-radio-item"><input type="radio" id="radio-timeliness" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_TIMELINESS) ? 'checked' : '') +'>';
          html += '<label for="radio-timeliness" part="input-label" class="mr-10">Timeliness</label></div>';
          html += '<div part="chart-radio-item"><input type="radio" id="radio-risk" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_RISKAREAS) ? 'checked' : '') +'>';
          html += '<label for="radio-risk" part="input-label" class="mr-10">Risk Areas</label></div>';
          html += '<div part="chart-radio-item"><input type="radio" id="radio-riskseverity" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_RISKSEVERITY) ? 'checked' : '') +'>';
          html += '<label for="radio-riskseverity" part="input-label" class="mr-10">Risk Severity</label></div>';
          html += '<div part="chart-radio-item"><input type="radio" id="radio-location" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_LOCATION) ? 'checked' : '') +'>';
          html += '<label for="radio-location" part="input-label" class="mr-10">Location</label></div>';
          html += '<div part="chart-radio-item"><input type="radio" id="radio-function" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_FUNCTION) ? 'checked' : '') +'>';
          html += '<label for="radio-function" part="input-label" class="mr-10">Function</label></div>';
          html += '<div part="chart-radio-item"><input type="radio" id="radio-obligationtype" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_OBLIGATIONTYPE) ? 'checked' : '') +'>';
          html += '<label for="radio-obligationtype" part="input-label" class="mr-10">Obligation Type</label></div>';
          html += '<div part="chart-radio-item"><input type="radio" id="radio-jurisdiction" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_JURISDICTION) ? 'checked' : '') +'>';
          html += '<label for="radio-jurisdiction" part="input-label" class="mr-10">Jurisdiction</label></div>';
          html += '<div part="chart-radio-item"><input type="radio" id="radio-frequency" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_FREQUENCY) ? 'checked' : '') +'>';
          html += '<label for="radio-frequency" part="input-label">Frequency</label></div>';
        html += '</div>';
      html += '</div>';
      html += '<div class="chart-container d-flex scroll-x align-center"><div part="chart-item" class="chart-item"><canvas id="myChart"></div></canvas><div part="chart-item chart-item-middle" class="chart-item"><canvas id="myChart2" class="gone"></canvas></div><div part="chart-item" class="chart-item"><canvas id="myChart3" class="gone"></div></div>';
      html += '<div id="chart-settings-controls" class="mt-20"></div>'
      html += '<div id="chart-settings"></div>'
    html += '</div>';

    html += '<div id="stream-event-'+index+'" part="stream-event-list" class="stream-event-list">';

    var firstDate = new Date();
    var count = 7;

    console.log('this start date', startDate);

    if(index === 0) {

      firstDate = (this.getFirstDateOfWeek(startDate) as Date);
      console.log('this first date', firstDate);
      count = 7;

    }

    if(index === 1) {

      
      firstDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
      count = this.getLastDayOfMonth(startDate.getMonth(), startDate.getFullYear());
      console.log('last day of month', count);

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
    var period = ("0" + (firstDate.getMonth()+1)).slice(-2) + "/" + ("0" + 1).slice(-2) + ' - ' + ("0" + (firstDate.getMonth()+1)).slice(-2) + "/" + ("0" + count).slice(-2)

    this.period = period;

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
            total++;
            this.events[mmdd][j]['mmdd'] = mmdd
            this.eventsInWindow.push(this.events[mmdd][j]);

            var partStatus = "";
            var lateStatus = "in-time";

            if(this.events[mmdd][j].approved != null && (this.events[mmdd][j].approved) != null && (this.events[mmdd][j].approved)) {
              partStatus = "status-approved";
              if(this.getLateExecuted(mmdd, this.events[mmdd][j])) {
                lateStatus = "late-executed"
              } else {
                if(this.getLateApproved(mmdd, this.events[mmdd][j])) {
                  lateStatus = "late-approved"
                }
              }
            } else if(this.events[mmdd][j].comments != null && this.events[mmdd][j].comments != null && (this.events[mmdd][j].comments).length > 0) {
              partStatus = "status-in-progress";
              if(this.getPastDueDate(mmdd)) {
                lateStatus = "past-due-date"
              }
            } else {
              partStatus = "status-not-started";
              if(this.getPastDueDate(mmdd)) {
                lateStatus = "past-due-date"
              }
            }

            this.updateRiskAreaStats(this.events[mmdd][j]['riskarea'], partStatus, lateStatus);
            this.updateRiskSeverityStats(this.events[mmdd][j]['risk'], partStatus, lateStatus);
            this.updateFunctionStats(this.events[mmdd][j]['functions'], partStatus, lateStatus);
            this.updateObligationTypeStats(this.events[mmdd][j]['obligationtype'], partStatus, lateStatus);
            this.updateJurisdictionStats(this.events[mmdd][j]['jurisdiction'], partStatus, lateStatus)
            this.updateFrequencyStats(this.events[mmdd][j]['frequency'], partStatus, lateStatus)
            this.updateLocationStats([this.events[mmdd][j]['locationname']], partStatus, lateStatus)


            html += '<div class="stream-events-container flex-grow">';
              html += '<div class="hidden-tags hide">'+JSON.stringify(this.events[mmdd][j]['tags'])+'</div>'
              html += '<div class="hidden-title hide"><table><thead><th part="badge-filtered"><i>filtered out</i></th></thead></table></div>'
              html += '<div part="stream-events-event-title" class="d-flex align-center pl-5 pb-5">' + ('<input id="button-select-'+mmdd.replace('/', '-')+'-'+j + '-' + (((this.events[mmdd][j].makercheckers != null && (this.events[mmdd][j].makercheckers).length > 0)) ? '1' : '0') + '-' + (((this.events[mmdd][j].docs != null && (this.events[mmdd][j].docs).length > 0)) ? '1' : '0') + '-' + this.events[mmdd][j].entityid.replace(/-/g, '_') + '-' + this.events[mmdd][j].locationid.replace(/-/g, '_') + '-' + this.events[mmdd][j].id.replace(/-/g, '_') +  '-' + this.events[mmdd][j].duedate.split('/')[1] + '-' + this.events[mmdd][j].duedate.split('/')[0] + '-' + this.events[mmdd][j].duedate.split('/')[2] + '-' + partStatus.replace(/-/g,'_') +  '" class="button-select mr-10" type="checkbox" />') + '<sf-i-elastic-text text="'+this.events[mmdd][j]['obligationtitle']+'" minLength="100"></sf-i-elastic-text></div>';
              html += '<table class="stream-events-container-table">';
              html += '<thead>';
              html += '<th part="td-head">';
              html += 'Status'
              if(csvCols.indexOf('Status') < 0) {
                csvCols += 'Period,Status,Id,ObligationTitle,Obligation,Duedate' 
                htmlCols += '<tr><th>Id</th><th>Status</th><th class="w-200px">Statute</th><th>Reference</th><th class="w-200px">Applicability</th><th class="w-200px">Obligation</th><th>ObligationType</th><th class="w-200px">Penalty</th><th>RiskSeverity</th><th>Frequency</th><th>SubFrequency</th><th>DueDate</th></tr>'
              }
              html += '</th>';
              html += '<th part="td-head">';
              html += '</th>';
              html += '<th part="td-head">';
              html += 'Location'
              html += '</th>'
              html += '<th part="td-head">';
              html += 'Entity'
              html += '</th>'
              html += '<th part="td-head">';
              html += 'Country'
              html += '</th>'
              html += '<th part="td-head">';
              html += 'Function'
              html += '</th>'
              
              for(var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
                if(this.getEventPreviewFields().includes(Object.keys(this.events[mmdd][j])[k])) {
                  html += '<th part="td-head" class="bg-left-no-border">';
                  html += Object.keys(this.events[mmdd][j])[k];
                  html += '</th>';
                }
              }
              
              console.log('listing docs',this.events[mmdd][j].documents )
              if(this.events[mmdd][j].documents != null && this.events[mmdd][j].documents != null && (this.events[mmdd][j].documents).length > 0) {
                html += '<th part="td-head">';
                html += 'Docs'
                html += '</th>';
              }
              if(this.events[mmdd][j].comments != null && this.events[mmdd][j].comments != null && (this.events[mmdd][j].comments).length > 0) {
                html += '<th part="td-head">';
                html += 'Comments'
                html += '</th>';
              } else {
                if(partStatus != "status-approved") {
                  notStarted++;
                }
              }
              if(this.events[mmdd][j].lastupdated != null && this.events[mmdd][j].lastupdated != null && (this.events[mmdd][j].lastupdated).length > 0) {
                html += '<th part="td-head">';
                html += 'Updated'
                html += '</th>';
              }
              if(this.events[mmdd][j].makercheckers != null && (this.events[mmdd][j].makercheckers).length > 0) {
                html += '<th part="td-head">';
                html += ''
                html += '</th>'
              }
              if(this.events[mmdd][j].docs != null && (this.events[mmdd][j].docs).length > 0) {
                html += '<th part="td-head">';
                html += ''
                html += '</th>'
              }
              // for(var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
              //   html += '<th part="td-head">';
              //   html += Object.keys(this.events[mmdd][j])[k];
              //   html += '</th>';
              // }
              
              html += '</thead>';
              html += '<tbody>';
              csvValues += (period + ',');
              htmlValues += ('<tr><td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["id"]+'</td>');
              if(partStatus == "status-approved") {
                approved++
                html += '<td part="td-body">';
                if(lateStatus == "late-executed") {
                  lateExecuted++;
                  if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
                    html += '<span class="material-symbols-outlined color-done">check_circle</span>';
                  }
                  if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
                    html += '<span class="material-icons color-late-executed">running_with_errors</span>';
                  }
                  csvValues += 'approved late-executed,';
                  htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center"><span class="material-symbols-outlined color-done">check_circle</span><span class="material-icons color-late-executed">running_with_errors</span></td>');
                } else if(lateStatus == "late-approved") {
                  lateApproved++;
                  if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
                    html += '<span class="material-symbols-outlined color-done">check_circle</span>'
                  }
                  if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
                    html += '<span class="material-icons color-late-approved">running_with_errors</span>'
                  }
                  csvValues += 'approved late-approved,';
                  htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center"><span class="material-symbols-outlined color-done">check_circle</span><span class="material-icons color-late-approved">running_with_errors</span></td>');
                } else {
                  if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
                    html += '<span class="material-symbols-outlined color-done">check_circle</span>'
                  }
                  if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
                    html += '<span class="material-symbols-outlined color-not-started">timer</span>'
                  }
                  csvValues += 'approved,';
                  htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center"><span class="material-icons color-done">check_circle</span></td>');
                }
                html += '</td>';
              } else if(partStatus == "status-in-progress") {
                html += '<td part="td-body">';
                if(lateStatus == "past-due-date") {
                  pastDueDate++;
                  if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
                    html += '<span class="material-symbols-outlined color-pending">pending</span>'
                  }
                  if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
                    html += '<span class="material-icons color-past-due-date">running_with_errors</span>'
                  }
                  csvValues += 'in-progress past-due-date,';
                  htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center"><span class="material-symbols-outlined color-pending">pending</span><span class="material-icons color-past-due-date">running_with_errors</span></td>');
                } else {
                  if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
                    html += '<span class="material-symbols-outlined color-pending">pending</span>'
                  }
                  if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
                    html += '<span class="material-symbols-outlined color-not-started">timer</span>'
                  }
                  csvValues += 'in-progress,';
                  htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center"><span class="material-symbols-outlined color-pending">pending</span></td>');
                }
                
                html += '</td>';
              } else {
                html += '<td part="td-body">';
                if(lateStatus == "past-due-date") {
                  pastDueDate++;
                  if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
                    html += '<span class="material-icons color-not-started">schedule</span>'
                  }
                  if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
                    html += '<span class="material-icons color-past-due-date">running_with_errors</span>'
                  }
                  csvValues += 'not started past-due-date,';
                  htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center"><span class="material-icons color-not-started">schedule</span><span class="material-icons color-past-due-date">running_with_errors</span></td>');
                } else {
                  if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
                    html += '<span class="material-icons color-not-started">schedule</span>'
                  }
                  if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
                    html += '<span class="material-symbols-outlined color-not-started">timer</span>'
                  }
                  csvValues += 'not started,';
                  htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center"><span class="material-icons color-not-started">schedule</span></td>');
                }
                
                html += '</td>';
              }
              html += '<td id="td-expand-'+i+'" part="td-body">';
              html += '<button id="button-unmapped-expand-'+mmdd.replace('/', '-')+'-'+j+'" part="button-icon-small" class="material-icons button-expand mr-10">open_in_new</button>'
              html += '</td>';
              html += '<td part="td-body"><sf-i-elastic-text text="'+this.events[mmdd][j]["locationname"].replace(/ *\([^)]*\) */g, "")+'" minLength="10"></sf-i-elastic-text></td>';
              html += '<td part="td-body"><sf-i-elastic-text text="'+this.events[mmdd][j]["entityname"].replace(/ *\([^)]*\) */g, "")+'" minLength="10"></sf-i-elastic-text></td>';
              html += '<td part="td-body"><sf-i-elastic-text text="'+this.events[mmdd][j]["countryname"].replace(/ *\([^)]*\) */g, "")+'" minLength="10"></sf-i-elastic-text></td>';
              var functions = '';
              for(const element of this.events[mmdd][j]["functions"])  {
                functions += (element.split(';')[0].replace(/ *\([^)]*\) */g, "") + ",");
              }
              functions = functions.replace(/,\s*$/, "");
              html += '<td part="td-body"><sf-i-elastic-text text="'+functions+'" minLength="10"></sf-i-elastic-text></td>';
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
              
              csvValues += this.events[mmdd][j]["id"] + ',' + this.events[mmdd][j]["obligationtitle"] + ',' + this.events[mmdd][j]["obligation"] + ',' + this.events[mmdd][j]["duedate"];
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["statute"]+'</td>');
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["reference"]+'</td>');
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["applicability"]+'</td>');
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["obligation"]+'</td>');
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["obligationtype"]+'</td>');
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["penalty"]+'</td>');
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["risk"]+'</td>');
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["frequency"]+'</td>');
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["subfrequency"]+'</td>');
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["duedate"]+'</td>');

              
              if(this.events[mmdd][j].documents != null && this.events[mmdd][j].documents != null && (this.events[mmdd][j].documents).length > 0) {
                html += '<td part="td-body">';
                html += '<span class="material-icons muted">description</span>'
                html += (this.events[mmdd][j].documents).length
                html += '</td>';
              }
              if(this.events[mmdd][j].comments != null && this.events[mmdd][j].comments != null && (this.events[mmdd][j].comments).length > 0) {
                html += '<td part="td-body">';
                html += '<span class="material-icons muted">forum</span>'
                html += (this.events[mmdd][j].comments).length
                html += '</td>';
              }
              if(this.events[mmdd][j].lastupdated != null && this.events[mmdd][j].lastupdated != null && (this.events[mmdd][j].lastupdated).length > 0) {
                html += '<td part="td-body">';
                html += Util.timeSince(new Date(this.events[mmdd][j].lastupdated).getTime())
                html += '</td>';
              }
              if(this.events[mmdd][j].makercheckers != null && (this.events[mmdd][j].makercheckers).length > 0) {
                html += '<td part="td-body">';
                html += '<span class="material-symbols-outlined muted">done_all</span>'
                html += '</td>';
              }
              if(this.events[mmdd][j].docs != null && (this.events[mmdd][j].docs).length > 0) {
                html += '<th part="td-body">';
                html += '<span class="material-symbols-outlined muted">scan_delete</span>'
                html += '</th>'
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
              html += '<div class="hidden-filtername hide"><table><thead><th part="badge-filter-name" class="filtername"></th></thead></table></div>'

              if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS && this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {

                let graphParam = '';
                if(Array.isArray(this.events[mmdd][j][this.flowGraph])) {
                  graphParam = this.events[mmdd][j][this.flowGraph].toString().replace(/ *\([^)]*\) */g, "");
                } else {
                  graphParam = this.events[mmdd][j][this.flowGraph].replace(/ *\([^)]*\) */g, "");
                }
                html += '<div class="d-flex"><div part="badge-filter-name" class="graphparamname mb-20">' + graphParam + '</div></div>';

              } else {

                if(this.flowGraph == this.FLOW_GRAPH_COMPLETENESS) {

                  html += '<div class="d-flex"><div part="badge-filter-name" class="graphparamname mb-20">' + partStatus.replace('status-', '') + '</div></div>';

                }

                if(this.flowGraph == this.FLOW_GRAPH_TIMELINESS) {

                  html += '<div class="d-flex"><div part="badge-filter-name" class="graphparamname mb-20">' + lateStatus + '</div></div>';

                }

              }

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

    this.csvDataCompliances = csvCols + "\n" + csvValues;
    this.htmlDataCompliances = '<table>' + htmlCols + htmlValues + '</table>';

    inProgress = total - notStarted - approved;

    console.log('progress', total, notStarted, approved)

    html = html.replace("DASHBOARD_TOTAL", total+"");
    html = html.replace("DASHBOARD_NOT_STARTED", notStarted+"");
    html = html.replace("DASHBOARD_APPROVED", approved+"");
    html = html.replace("DASHBOARD_IN_PROGRESS", inProgress+"");
    html = html.replace("DASHBOARD_PAST_DUE_DATE", pastDueDate+"");
    html = html.replace("DASHBOARD_LATE_EXECUTED", lateExecuted+"");
    html = html.replace("DASHBOARD_LATE_APPROVED", lateApproved+"");

    this.csvDataStats = 'Period,Total,Not Started,Approved,In Progress,Past Due Date,Late Executed,Late Approved\n';
    this.csvDataStats += period + "," + total + "," + notStarted + "," + approved + "," + inProgress + "," + pastDueDate + "," + lateExecuted + "," + lateApproved;

    this.htmlDataStats = '<table class="w-100"><tr><th class="w-14">Total</th><th class="w-14">Not Started</th><th class="w-14">Approved</th><th class="w-14">In Progress</th><th class="w-14">Past Due Date</th><th class="w-14">Late Executed</th><th class="w-14">Late Approved</th><tr>'
    this.htmlDataStats += '<tr><td class="w-14 text-center td-odd">'+total+'</td><td class="w-14 text-center td-odd">'+notStarted+'</td><td class="w-14 text-center td-odd">'+approved+'</td><td class="w-14 text-center td-odd">'+inProgress+'</td><td class="w-14 text-center td-odd">'+pastDueDate+'</td><td class="w-14 text-center td-odd">'+lateExecuted+'</td><td class="w-14 text-center td-odd">'+lateApproved+'</td><tr></table>'

    return html;

  }

  renderPastEvents = (index: number, startDate: Date) => {

    this.selectedItems = [];
    this.selectedStatus = "";

    var html = '';

    html += '<div class="mb-20 stream-event-list" part="stream-event-list-charts">';
      html += '<div part="stream-event-chart-selection" class="mb-20">';
        html += '<div part="td-head" class="mb-5">Select Chart</div>';
        html += '<div class="mb-10 d-flex flex-wrap align-center">';
          html += '<div part="chart-radio-item"><input type="radio" id="radio-completeness" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_COMPLETENESS) ? 'checked' : '') +'>';
          html += '<label for="radio-completeness" part="input-label" class="mr-10">Completeness</label></div>';
          html += '<div part="chart-radio-item"><input type="radio" id="radio-timeliness" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_TIMELINESS) ? 'checked' : '') +'>';
          html += '<label for="radio-timeliness" part="input-label" class="mr-10">Timeliness</label></div>';
          html += '<div part="chart-radio-item"><input type="radio" id="radio-risk" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_RISKAREAS) ? 'checked' : '') +'>';
          html += '<label for="radio-risk" part="input-label" class="mr-10">Risk Areas</label></div>';
          html += '<div part="chart-radio-item"><input type="radio" id="radio-riskseverity" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_RISKSEVERITY) ? 'checked' : '') +'>';
          html += '<label for="radio-riskseverity" part="input-label" class="mr-10">Risk Severity</label></div>';
          html += '<div part="chart-radio-item"><input type="radio" id="radio-location" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_LOCATION) ? 'checked' : '') +'>';
          html += '<label for="radio-location" part="input-label" class="mr-10">Location</label></div>';
          html += '<div part="chart-radio-item"><input type="radio" id="radio-function" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_FUNCTION) ? 'checked' : '') +'>';
          html += '<label for="radio-function" part="input-label" class="mr-10">Function</label></div>';
          html += '<div part="chart-radio-item"><input type="radio" id="radio-obligationtype" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_OBLIGATIONTYPE) ? 'checked' : '') +'>';
          html += '<label for="radio-obligationtype" part="input-label" class="mr-10">Obligation Type</label></div>';
          html += '<div part="chart-radio-item"><input type="radio" id="radio-jurisdiction" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_JURISDICTION) ? 'checked' : '') +'>';
          html += '<label for="radio-jurisdiction" part="input-label" class="mr-10">Jurisdiction</label></div>';
          html += '<div part="chart-radio-item"><input type="radio" id="radio-frequency" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_FREQUENCY) ? 'checked' : '') +'>';
          html += '<label for="radio-frequency" part="input-label">Frequency</label></div>';
        html += '</div>';
      html += '</div>';
      html += '<div class="chart-container d-flex scroll-x align-center"><div part="chart-item" class="chart-item"><canvas id="myChart"></div></canvas><div part="chart-item chart-item-middle" class="chart-item"><canvas id="myChart2" class="gone"></canvas></div><div part="chart-item" class="chart-item"><canvas id="myChart3" class="gone"></div></div>';
      html += '<div id="chart-settings-controls" class="mt-20"></div>'
      html += '<div id="chart-settings"></div>'
    html += '</div>';


    html += '<div id="stream-event-'+index+'" part="stream-event-list" class="stream-event-list">';

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
    var period = ("0" + (firstDate.getMonth()+1)).slice(-2) + "/" + ("0" + 1).slice(-2) + ' - ' + ("0" + (firstDate.getMonth()+1)).slice(-2) + "/" + ("0" + count).slice(-2)

    this.period = period;

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
            total++;
            this.events[mmdd][j]['mmdd'] = mmdd
            this.eventsInWindow.push(this.events[mmdd][j]);

            var partStatus = "";
            var lateStatus = "in-time";

            if(this.events[mmdd][j].approved != null && (this.events[mmdd][j].approved) != null && (this.events[mmdd][j].approved)) {
              partStatus = "status-approved";
              if(this.getLateExecuted(mmdd, this.events[mmdd][j])) {
                lateStatus = "late-executed"
              } else {
                if(this.getLateApproved(mmdd, this.events[mmdd][j])) {
                  lateStatus = "late-approved"
                }
              }
            } else if(this.events[mmdd][j].comments != null && this.events[mmdd][j].comments != null && (this.events[mmdd][j].comments).length > 0) {
              partStatus = "status-in-progress";
              if(this.getPastDueDate(mmdd)) {
                lateStatus = "past-due-date"
              }
            } else {
              partStatus = "status-not-started";
              if(this.getPastDueDate(mmdd)) {
                lateStatus = "past-due-date"
              }
            }

            this.updateRiskAreaStats(this.events[mmdd][j]['riskarea'], partStatus, lateStatus);
            this.updateRiskSeverityStats(this.events[mmdd][j]['risk'], partStatus, lateStatus);
            this.updateFunctionStats(this.events[mmdd][j]['functions'], partStatus, lateStatus);
            this.updateObligationTypeStats(this.events[mmdd][j]['obligationtype'], partStatus, lateStatus);
            this.updateJurisdictionStats(this.events[mmdd][j]['jurisdiction'], partStatus, lateStatus)
            this.updateFrequencyStats(this.events[mmdd][j]['frequency'], partStatus, lateStatus)
            this.updateLocationStats([this.events[mmdd][j]['locationname']], partStatus, lateStatus)

            html += '<div class="stream-events-container flex-grow">';
              html += '<div class="hidden-tags hide">'+JSON.stringify(this.events[mmdd][j]['tags'])+'</div>'
              html += '<div class="hidden-title hide"><table><thead><th part="badge-filtered"><i>filtered out</i></th></thead></table></div>'
              html += '<div part="stream-events-event-title" class="d-flex align-center pl-5 pb-5">' + ('<input id="button-select-'+mmdd.replace('/', '-')+'-'+j + '-' + (((this.events[mmdd][j].makercheckers != null && (this.events[mmdd][j].makercheckers).length > 0)) ? '1' : '0') + '-' + (((this.events[mmdd][j].docs != null && (this.events[mmdd][j].docs).length > 0)) ? '1' : '0') + '-' + this.events[mmdd][j].entityid.replace(/-/g, '_') + '-' + this.events[mmdd][j].locationid.replace(/-/g, '_') + '-' + this.events[mmdd][j].id.replace(/-/g, '_') +  '-' + this.events[mmdd][j].duedate.split('/')[1] + '-' + this.events[mmdd][j].duedate.split('/')[0] + '-' + this.events[mmdd][j].duedate.split('/')[2] + '-' + partStatus.replace(/-/g,'_') +  '" class="button-select mr-10" type="checkbox" />') + '<sf-i-elastic-text text="'+this.events[mmdd][j]['obligationtitle']+'" minLength="100"></sf-i-elastic-text></div>';
              html += '<table class="stream-events-container-table">';
              html += '<thead>';
              html += '<th part="td-head">';
              html += 'Status'
              if(csvCols.indexOf('Status') < 0) {
                csvCols += 'Period,Status,Id,ObligationTitle,Obligation,Duedate' 
                htmlCols += '<tr><th>Id</th><th>Status</th><th class="w-200px">Statute</th><th>Reference</th><th class="w-200px">Applicability</th><th class="w-200px">Obligation</th><th>ObligationType</th><th class="w-200px">Penalty</th><th>RiskSeverity</th><th>Frequency</th><th>SubFrequency</th><th>DueDate</th></tr>'
              }
              html += '</th>';
              html += '<th part="td-head">';
              html += '</th>';
              html += '<th part="td-head">';
              html += 'Location'
              html += '</th>'
              html += '<th part="td-head">';
              html += 'Entity'
              html += '</th>'
              html += '<th part="td-head">';
              html += 'Country'
              html += '</th>'
              html += '<th part="td-head">';
              html += 'Function'
              html += '</th>'
              
              for(var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
                if(this.getEventPreviewFields().includes(Object.keys(this.events[mmdd][j])[k])) {
                  html += '<th part="td-head" class="bg-left-no-border">';
                  html += Object.keys(this.events[mmdd][j])[k];
                  html += '</th>';
                }
              }
              
             
              console.log('listing docs',this.events[mmdd][j].documents )
              if(this.events[mmdd][j].documents != null && this.events[mmdd][j].documents != null && (this.events[mmdd][j].documents).length > 0) {
                html += '<th part="td-head">';
                html += 'Docs'
                html += '</th>';
              }
              if(this.events[mmdd][j].comments != null && this.events[mmdd][j].comments != null && (this.events[mmdd][j].comments).length > 0) {
                html += '<th part="td-head">';
                html += 'Comments'
                html += '</th>';
              } else {
                if(partStatus != "status-approved") {
                  notStarted++;
                }
              }
              if(this.events[mmdd][j].lastupdated != null && this.events[mmdd][j].lastupdated != null && (this.events[mmdd][j].lastupdated).length > 0) {
                html += '<th part="td-head">';
                html += 'Updated'
                html += '</th>';
              }
              if(this.events[mmdd][j].makercheckers != null && (this.events[mmdd][j].makercheckers).length > 0) {
                html += '<th part="td-head">';
                html += ''
                html += '</th>'
              }
              if(this.events[mmdd][j].docs != null && (this.events[mmdd][j].docs).length > 0) {
                html += '<th part="td-head">';
                html += ''
                html += '</th>'
              }
              // for(var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
              //   html += '<th part="td-head">';
              //   html += Object.keys(this.events[mmdd][j])[k];
              //   html += '</th>';
              // }
              html += '</thead>';
              html += '<tbody>';
              csvValues += (period + ',');
              htmlValues += ('<tr><td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["id"]+'</td>');
              if(partStatus == "status-approved") {
                approved++
                html += '<td part="td-body">';
                if(lateStatus == "late-executed") {
                  lateExecuted++;
                  if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
                    html += '<span class="material-symbols-outlined color-done">check_circle</span>';
                  }
                  if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
                    html += '<span class="material-icons color-late-executed">running_with_errors</span>';
                  }
                  csvValues += 'approved late-executed,';
                  htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center"><span class="material-symbols-outlined color-done">check_circle</span><span class="material-icons color-late-executed">running_with_errors</span></td>');
                } else if(lateStatus == "late-approved") {
                  lateApproved++;
                  if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
                    html += '<span class="material-symbols-outlined color-done">check_circle</span>'
                  }
                  if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
                    html += '<span class="material-icons color-late-approved">running_with_errors</span>'
                  }
                  csvValues += 'approved late-approved,';
                  htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center"><span class="material-symbols-outlined color-done">check_circle</span><span class="material-icons color-late-approved">running_with_errors</span></td>');
                } else {
                  if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
                    html += '<span class="material-symbols-outlined color-done">check_circle</span>'
                  }
                  if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
                    html += '<span class="material-symbols-outlined color-not-started">timer</span>'
                  }
                  csvValues += 'approved,';
                  htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center"><span class="material-icons color-done">check_circle</span></td>');
                }
                html += '</td>';
              } else if(partStatus == "status-in-progress") {
                html += '<td part="td-body">';
                if(lateStatus == "past-due-date") {
                  pastDueDate++;
                  if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
                    html += '<span class="material-symbols-outlined color-pending">pending</span>'
                  }
                  if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
                    html += '<span class="material-icons color-past-due-date">running_with_errors</span>'
                  }
                  csvValues += 'in-progress past-due-date,';
                  htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center"><span class="material-symbols-outlined color-pending">pending</span><span class="material-icons color-past-due-date">running_with_errors</span></td>');
                } else {
                  if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
                    html += '<span class="material-symbols-outlined color-pending">pending</span>'
                  }
                  if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
                    html += '<span class="material-symbols-outlined color-not-started">timer</span>'
                  }
                  csvValues += 'in-progress,';
                  htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center"><span class="material-symbols-outlined color-pending">pending</span></td>');
                }
                
                html += '</td>';
              } else {
                html += '<td part="td-body">';
                if(lateStatus == "past-due-date") {
                  pastDueDate++;
                  if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
                    html += '<span class="material-icons color-not-started">schedule</span>'
                  }
                  if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
                    html += '<span class="material-icons color-past-due-date">running_with_errors</span>'
                  }
                  csvValues += 'not started past-due-date,';
                  htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center"><span class="material-icons color-not-started">schedule</span><span class="material-icons color-past-due-date">running_with_errors</span></td>');
                } else {
                  if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
                    html += '<span class="material-icons color-not-started">schedule</span>'
                  }
                  if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
                    html += '<span class="material-symbols-outlined color-not-started">timer</span>'
                  }
                  csvValues += 'not started,';
                  htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center"><span class="material-icons color-not-started">schedule</span></td>');
                }
                
                html += '</td>';
              }
              html += '<td id="td-expand-'+i+'" part="td-body">';
              html += '<button id="button-unmapped-expand-'+mmdd.replace('/', '-')+'-'+j+'" part="button-icon-small" class="material-icons button-expand mr-10">open_in_new</button>'
              html += '</td>';
              html += '<td part="td-body"><sf-i-elastic-text text="'+this.events[mmdd][j]["locationname"].replace(/ *\([^)]*\) */g, "")+'" minLength="10"></sf-i-elastic-text></td>';
              html += '<td part="td-body"><sf-i-elastic-text text="'+this.events[mmdd][j]["entityname"].replace(/ *\([^)]*\) */g, "")+'" minLength="10"></sf-i-elastic-text></td>';
              html += '<td part="td-body"><sf-i-elastic-text text="'+this.events[mmdd][j]["countryname"].replace(/ *\([^)]*\) */g, "")+'" minLength="10"></sf-i-elastic-text></td>';
              var functions = '';
              for(const element of this.events[mmdd][j]["functions"])  {
                functions += (element.split(';')[0].replace(/ *\([^)]*\) */g, "") + ",");
              }
              functions = functions.replace(/,\s*$/, "");
              html += '<td part="td-body"><sf-i-elastic-text text="'+functions+'" minLength="10"></sf-i-elastic-text></td>';
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
              
              csvValues += this.events[mmdd][j]["id"] + ',' + this.events[mmdd][j]["obligationtitle"] + ',' + this.events[mmdd][j]["obligation"] + ',' + this.events[mmdd][j]["duedate"];
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["statute"]+'</td>');
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["reference"]+'</td>');
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["applicability"]+'</td>');
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["obligation"]+'</td>');
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["obligationtype"]+'</td>');
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["penalty"]+'</td>');
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["risk"]+'</td>');
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["frequency"]+'</td>');
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["subfrequency"]+'</td>');
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["duedate"]+'</td>');
              
              if(this.events[mmdd][j].documents != null && this.events[mmdd][j].documents != null && (this.events[mmdd][j].documents).length > 0) {
                html += '<td part="td-body">';
                html += '<span class="material-icons muted">description</span>'
                html += (this.events[mmdd][j].documents).length
                html += '</td>';
              }
              if(this.events[mmdd][j].comments != null && this.events[mmdd][j].comments != null && (this.events[mmdd][j].comments).length > 0) {
                html += '<td part="td-body">';
                html += '<span class="material-icons muted">forum</span>'
                html += (this.events[mmdd][j].comments).length
                html += '</td>';
              }
              if(this.events[mmdd][j].lastupdated != null && this.events[mmdd][j].lastupdated != null && (this.events[mmdd][j].lastupdated).length > 0) {
                html += '<td part="td-body">';
                html += Util.timeSince(new Date(this.events[mmdd][j].lastupdated).getTime())
                html += '</td>';
              }
              if(this.events[mmdd][j].makercheckers != null && (this.events[mmdd][j].makercheckers).length > 0) {
                html += '<td part="td-body">';
                html += '<span class="material-symbols-outlined muted">done_all</span>'
                html += '</td>';
              }
              if(this.events[mmdd][j].docs != null && (this.events[mmdd][j].docs).length > 0) {
                html += '<th part="td-body">';
                html += '<span class="material-symbols-outlined muted">scan_delete</span>'
                html += '</th>'
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
              html += '<div class="hidden-filtername hide"><table><thead><th part="badge-filter-name" class="filtername"></th></thead></table></div>'

              if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS && this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {

                let graphParam = '';
                if(Array.isArray(this.events[mmdd][j][this.flowGraph])) {
                  graphParam = this.events[mmdd][j][this.flowGraph].toString().replace(/ *\([^)]*\) */g, "");
                } else {
                  graphParam = this.events[mmdd][j][this.flowGraph].replace(/ *\([^)]*\) */g, "");
                }
                html += '<div class="d-flex"><div part="badge-filter-name" class="graphparamname mb-20">' + graphParam + '</div></div>';

              } else {

                if(this.flowGraph == this.FLOW_GRAPH_COMPLETENESS) {

                  html += '<div class="d-flex"><div part="badge-filter-name" class="graphparamname mb-20">' + partStatus.replace('status-', '') + '</div></div>';

                }

                if(this.flowGraph == this.FLOW_GRAPH_TIMELINESS) {

                  html += '<div class="d-flex"><div part="badge-filter-name" class="graphparamname mb-20">' + lateStatus + '</div></div>';

                }

              }

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

    this.csvDataCompliances = csvCols + "\n" + csvValues;
    this.htmlDataCompliances = '<table>' + htmlCols + htmlValues + '</table>';

    inProgress = total - notStarted - approved;

    console.log('progress', total, notStarted, approved)

    html = html.replace("DASHBOARD_TOTAL", total+"");
    html = html.replace("DASHBOARD_NOT_STARTED", notStarted+"");
    html = html.replace("DASHBOARD_APPROVED", approved+"");
    html = html.replace("DASHBOARD_IN_PROGRESS", inProgress+"");
    html = html.replace("DASHBOARD_PAST_DUE_DATE", pastDueDate+"");
    html = html.replace("DASHBOARD_LATE_EXECUTED", lateExecuted+"");
    html = html.replace("DASHBOARD_LATE_APPROVED", lateApproved+"");

    this.csvDataStats = 'Period,Total,Not Started,Approved,In Progress,Past Due Date,Late Executed,Late Approved\n';
    this.csvDataStats += period + "," + total + "," + notStarted + "," + approved + "," + inProgress + "," + pastDueDate + "," + lateExecuted + "," + lateApproved;

    this.htmlDataStats = '<table class="w-100"><tr><th class="w-14">Total</th><th class="w-14">Not Started</th><th class="w-14">Approved</th><th class="w-14">In Progress</th><th class="w-14">Past Due Date</th><th class="w-14">Late Executed</th><th class="w-14">Late Approved</th><tr>'
    this.htmlDataStats += '<tr><td class="w-14 text-center td-odd">'+total+'</td><td class="w-14 text-center td-odd">'+notStarted+'</td><td class="w-14 text-center td-odd">'+approved+'</td><td class="w-14 text-center td-odd">'+inProgress+'</td><td class="w-14 text-center td-odd">'+pastDueDate+'</td><td class="w-14 text-center td-odd">'+lateExecuted+'</td><td class="w-14 text-center td-odd">'+lateApproved+'</td><tr></table>'


    return html;

  }

  renderRangeEvents = (firstDate: Date, count: number) => {

    this.selectedItems = [];

    var html = '';

    html += '<div class="mb-20 stream-event-list" part="stream-event-list-charts">';
      html += '<div part="stream-event-chart-selection" class="mb-20">';
        html += '<div part="td-head" class="mb-5">Select Chart</div>';
        html += '<div class="mb-10 d-flex flex-wrap align-center">';
          html += '<div part="chart-radio-item"><input type="radio" id="radio-completeness" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_COMPLETENESS) ? 'checked' : '') +'>';
          html += '<label for="radio-completeness" part="input-label" class="mr-10">Completeness</label></div>';
          html += '<div part="chart-radio-item"><input type="radio" id="radio-timeliness" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_TIMELINESS) ? 'checked' : '') +'>';
          html += '<label for="radio-timeliness" part="input-label" class="mr-10">Timeliness</label></div>';
          html += '<div part="chart-radio-item"><input type="radio" id="radio-risk" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_RISKAREAS) ? 'checked' : '') +'>';
          html += '<label for="radio-risk" part="input-label" class="mr-10">Risk Areas</label></div>';
          html += '<div part="chart-radio-item"><input type="radio" id="radio-riskseverity" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_RISKSEVERITY) ? 'checked' : '') +'>';
          html += '<label for="radio-riskseverity" part="input-label" class="mr-10">Risk Severity</label></div>';
          html += '<div part="chart-radio-item"><input type="radio" id="radio-location" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_LOCATION) ? 'checked' : '') +'>';
          html += '<label for="radio-location" part="input-label" class="mr-10">Location</label></div>';
          html += '<div part="chart-radio-item"><input type="radio" id="radio-function" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_FUNCTION) ? 'checked' : '') +'>';
          html += '<label for="radio-function" part="input-label" class="mr-10">Function</label></div>';
          html += '<div part="chart-radio-item"><input type="radio" id="radio-obligationtype" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_OBLIGATIONTYPE) ? 'checked' : '') +'>';
          html += '<label for="radio-obligationtype" part="input-label" class="mr-10">Obligation Type</label></div>';
          html += '<div part="chart-radio-item"><input type="radio" id="radio-jurisdiction" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_JURISDICTION) ? 'checked' : '') +'>';
          html += '<label for="radio-jurisdiction" part="input-label" class="mr-10">Jurisdiction</label></div>';
          html += '<div part="chart-radio-item"><input type="radio" id="radio-frequency" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_FREQUENCY) ? 'checked' : '') +'>';
          html += '<label for="radio-frequency" part="input-label">Frequency</label></div>';
        html += '</div>';
      html += '</div>';
      html += '<div class="chart-container d-flex scroll-x align-center"><div part="chart-item" class="chart-item"><canvas id="myChart"></div></canvas><div part="chart-item chart-item-middle" class="chart-item"><canvas id="myChart2" class="gone"></canvas></div><div part="chart-item" class="chart-item"><canvas id="myChart3" class="gone"></div></div>';
      html += '<div id="chart-settings-controls" class="mt-20"></div>'
      html += '<div id="chart-settings"></div>'
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
    lastDate.setDate(lastDate.getDate() + count)

    this.eventsInWindow = [];
    var csvCols = "", htmlCols = "";
    var csvValues = "", htmlValues = "";
    var period = ("0" + (firstDate.getMonth()+1)).slice(-2) + "/" + ("0" + firstDate.getDate()).slice(-2) + ' - ' + ("0" + (lastDate.getMonth()+1)).slice(-2) + "/" + ("0" + lastDate.getDate()).slice(-2)

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
            total++;
            this.events[mmdd][j]['mmdd'] = mmdd
            this.eventsInWindow.push(this.events[mmdd][j]);

            var partStatus = "";
            var lateStatus = "in-time";

            if(this.events[mmdd][j].approved != null && (this.events[mmdd][j].approved) != null && (this.events[mmdd][j].approved)) {
              partStatus = "status-approved";
              if(this.getLateExecuted(mmdd, this.events[mmdd][j])) {
                lateStatus = "late-executed"
              } else {
                if(this.getLateApproved(mmdd, this.events[mmdd][j])) {
                  lateStatus = "late-approved"
                }
              }
            } else if(this.events[mmdd][j].comments != null && this.events[mmdd][j].comments != null && (this.events[mmdd][j].comments).length > 0) {
              partStatus = "status-in-progress";
              if(this.getPastDueDate(mmdd)) {
                lateStatus = "past-due-date"
              }
            } else {
              partStatus = "status-not-started";
              if(this.getPastDueDate(mmdd)) {
                lateStatus = "past-due-date"
              }
            }

            this.updateRiskAreaStats(this.events[mmdd][j]['riskarea'], partStatus, lateStatus);
            this.updateRiskSeverityStats(this.events[mmdd][j]['risk'], partStatus, lateStatus);
            this.updateFunctionStats(this.events[mmdd][j]['functions'], partStatus, lateStatus);
            this.updateObligationTypeStats(this.events[mmdd][j]['obligationtype'], partStatus, lateStatus);
            this.updateJurisdictionStats(this.events[mmdd][j]['jurisdiction'], partStatus, lateStatus)
            this.updateFrequencyStats(this.events[mmdd][j]['frequency'], partStatus, lateStatus)
            this.updateLocationStats([this.events[mmdd][j]['locationname']], partStatus, lateStatus)

            html += '<div class="stream-events-container flex-grow">';
              html += '<div class="hidden-tags hide">'+JSON.stringify(this.events[mmdd][j]['tags'])+'</div>'
              html += '<div class="hidden-title hide"><table><thead><th part="badge-filtered"><i>filtered out</i></th></thead></table></div>'
              html += '<div part="stream-events-event-title" class="d-flex align-center pl-5 pb-5">' + ('<input id="button-select-'+mmdd.replace('/', '-')+'-'+j + '-' + (((this.events[mmdd][j].makercheckers != null && (this.events[mmdd][j].makercheckers).length > 0)) ? '1' : '0') + '-' + (((this.events[mmdd][j].docs != null && (this.events[mmdd][j].docs).length > 0)) ? '1' : '0') + '-' + this.events[mmdd][j].entityid.replace(/-/g, '_') + '-' + this.events[mmdd][j].locationid.replace(/-/g, '_') + '-' + this.events[mmdd][j].id.replace(/-/g, '_') +  '-' + this.events[mmdd][j].duedate.split('/')[1] + '-' + this.events[mmdd][j].duedate.split('/')[0] + '-' + this.events[mmdd][j].duedate.split('/')[2] + '-' + partStatus.replace(/-/g,'_') +  '" class="button-select mr-10" type="checkbox" />') + '<sf-i-elastic-text text="'+this.events[mmdd][j]['obligationtitle']+'" minLength="100"></sf-i-elastic-text></div>';
              html += '<table class="stream-events-container-table">';
              html += '<thead>';
              html += '<th part="td-head">';
              html += 'Status'
              if(csvCols.indexOf('Status') < 0) {
                csvCols += 'Period,Status,Id,ObligationTitle,Obligation,Duedate' 
                htmlCols += '<tr><th>Id</th><th>Status</th><th class="w-200px">Statute</th><th>Reference</th><th class="w-200px">Applicability</th><th class="w-200px">Obligation</th><th>ObligationType</th><th class="w-200px">Penalty</th><th>RiskSeverity</th><th>Frequency</th><th>SubFrequency</th><th>DueDate</th></tr>'
              }
              html += '</th>';
              html += '<th part="td-head">';
              html += '</th>';
              html += '<th part="td-head">';
              html += 'Location'
              html += '</th>'
              html += '<th part="td-head">';
              html += 'Entity'
              html += '</th>'
              html += '<th part="td-head">';
              html += 'Country'
              html += '</th>'
              html += '<th part="td-head">';
              html += 'Function'
              html += '</th>'
              
              for(var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
                if(this.getEventPreviewFields().includes(Object.keys(this.events[mmdd][j])[k])) {
                  html += '<th part="td-head" class="bg-left-no-border">';
                  html += Object.keys(this.events[mmdd][j])[k];
                  html += '</th>';
                }
              }
              
              console.log('listing docs',this.events[mmdd][j].documents )
              if(this.events[mmdd][j].documents != null && this.events[mmdd][j].documents != null && (this.events[mmdd][j].documents).length > 0) {
                html += '<th part="td-head">';
                html += 'Docs'
                html += '</th>';
              }
              if(this.events[mmdd][j].comments != null && this.events[mmdd][j].comments != null && (this.events[mmdd][j].comments).length > 0) {
                html += '<th part="td-head">';
                html += 'Comments'
                html += '</th>';
              } else {
                if(partStatus != "status-approved") {
                  notStarted++;
                }
              }
              if(this.events[mmdd][j].lastupdated != null && this.events[mmdd][j].lastupdated != null && (this.events[mmdd][j].lastupdated).length > 0) {
                html += '<th part="td-head">';
                html += 'Updated'
                html += '</th>';
              }
              if(this.events[mmdd][j].makercheckers != null && (this.events[mmdd][j].makercheckers).length > 0) {
                html += '<th part="td-head">';
                html += ''
                html += '</th>'
              }
              if(this.events[mmdd][j].docs != null && (this.events[mmdd][j].docs).length > 0) {
                html += '<th part="td-head">';
                html += ''
                html += '</th>'
              }

              // for(var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
              //   html += '<th part="td-head">';
              //   html += Object.keys(this.events[mmdd][j])[k];
              //   html += '</th>';
              // }
              html += '</thead>';
              html += '<tbody>';
              csvValues += (period + ',');
              htmlValues += ('<tr><td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["id"]+'</td>');
              if(partStatus == "status-approved") {
                approved++
                html += '<td part="td-body">';
                if(lateStatus == "late-executed") {
                  lateExecuted++;
                  if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
                    html += '<span class="material-symbols-outlined color-done">check_circle</span>';
                  }
                  if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
                    html += '<span class="material-icons color-late-executed">running_with_errors</span>';
                  }
                  csvValues += 'approved late-executed,';
                  htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center"><span class="material-symbols-outlined color-done">check_circle</span><span class="material-icons color-late-executed">running_with_errors</span></td>');
                } else if(lateStatus == "late-approved") {
                  lateApproved++;
                  if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
                    html += '<span class="material-symbols-outlined color-done">check_circle</span>'
                  }
                  if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
                    html += '<span class="material-icons color-late-approved">running_with_errors</span>'
                  }
                  csvValues += 'approved late-approved,';
                  htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center"><span class="material-symbols-outlined color-done">check_circle</span><span class="material-icons color-late-approved">running_with_errors</span></td>');
                } else {
                  if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
                    html += '<span class="material-symbols-outlined color-done">check_circle</span>'
                  }
                  if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
                    html += '<span class="material-symbols-outlined color-not-started">timer</span>'
                  }
                  csvValues += 'approved,';
                  htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center"><span class="material-icons color-done">check_circle</span></td>');
                }
                html += '</td>';
              } else if(partStatus == "status-in-progress") {
                html += '<td part="td-body">';
                if(lateStatus == "past-due-date") {
                  pastDueDate++;
                  if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
                    html += '<span class="material-symbols-outlined color-pending">pending</span>'
                  }
                  if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
                    html += '<span class="material-icons color-past-due-date">running_with_errors</span>'
                  }
                  csvValues += 'in-progress past-due-date,';
                  htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center"><span class="material-symbols-outlined color-pending">pending</span><span class="material-icons color-past-due-date">running_with_errors</span></td>');
                } else {
                  if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
                    html += '<span class="material-symbols-outlined color-pending">pending</span>'
                  }
                  if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
                    html += '<span class="material-symbols-outlined color-not-started">timer</span>'
                  }
                  csvValues += 'in-progress,';
                  htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center"><span class="material-symbols-outlined color-pending">pending</span></td>');
                }
                
                html += '</td>';
              } else {
                html += '<td part="td-body">';
                if(lateStatus == "past-due-date") {
                  pastDueDate++;
                  if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
                    html += '<span class="material-icons color-not-started">schedule</span>'
                  }
                  if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
                    html += '<span class="material-icons color-past-due-date">running_with_errors</span>'
                  }
                  csvValues += 'not started past-due-date,';
                  htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center"><span class="material-icons color-not-started">schedule</span><span class="material-icons color-past-due-date">running_with_errors</span></td>');
                } else {
                  if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
                    html += '<span class="material-icons color-not-started">schedule</span>'
                  }
                  if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
                    html += '<span class="material-symbols-outlined color-not-started">timer</span>'
                  }
                  csvValues += 'not started,';
                  htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center"><span class="material-icons color-not-started">schedule</span></td>');
                }
                
                html += '</td>';
              }
              html += '<td id="td-expand-'+i+'" part="td-body">';
              html += '<button id="button-unmapped-expand-'+mmdd.replace('/', '-')+'-'+j+'" part="button-icon-small" class="material-icons button-expand mr-10">open_in_new</button>'
              html += '</td>';
              html += '<td part="td-body"><sf-i-elastic-text text="'+this.events[mmdd][j]["locationname"].replace(/ *\([^)]*\) */g, "")+'" minLength="10"></sf-i-elastic-text></td>';
              html += '<td part="td-body"><sf-i-elastic-text text="'+this.events[mmdd][j]["entityname"].replace(/ *\([^)]*\) */g, "")+'" minLength="10"></sf-i-elastic-text></td>';
              html += '<td part="td-body"><sf-i-elastic-text text="'+this.events[mmdd][j]["countryname"].replace(/ *\([^)]*\) */g, "")+'" minLength="10"></sf-i-elastic-text></td>';
              var functions = '';
              for(const element of this.events[mmdd][j]["functions"])  {
                functions += (element.split(';')[0].replace(/ *\([^)]*\) */g, "") + ",");
              }
              functions = functions.replace(/,\s*$/, "");
              html += '<td part="td-body"><sf-i-elastic-text text="'+functions+'" minLength="10"></sf-i-elastic-text></td>';
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

              csvValues += this.events[mmdd][j]["id"] + ',' + this.events[mmdd][j]["obligationtitle"] + ',' + this.events[mmdd][j]["obligation"] + ',' + this.events[mmdd][j]["duedate"];
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["statute"]+'</td>');
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["reference"]+'</td>');
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["applicability"]+'</td>');
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["obligation"]+'</td>');
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["obligationtype"]+'</td>');
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["penalty"]+'</td>');
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["risk"]+'</td>');
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["frequency"]+'</td>');
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["subfrequency"]+'</td>');
              htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["duedate"]+'</td>');

              
              if(this.events[mmdd][j].documents != null && this.events[mmdd][j].documents != null && (this.events[mmdd][j].documents).length > 0) {
                html += '<td part="td-body">';
                html += '<span class="material-icons muted">description</span>'
                html += (this.events[mmdd][j].documents).length
                html += '</td>';
              }
              if(this.events[mmdd][j].comments != null && this.events[mmdd][j].comments != null && (this.events[mmdd][j].comments).length > 0) {
                html += '<td part="td-body">';
                html += '<span class="material-icons muted">forum</span>'
                html += (this.events[mmdd][j].comments).length
                html += '</td>';
              }
              if(this.events[mmdd][j].lastupdated != null && this.events[mmdd][j].lastupdated != null && (this.events[mmdd][j].lastupdated).length > 0) {
                html += '<td part="td-body">';
                html += Util.timeSince(new Date(this.events[mmdd][j].lastupdated).getTime())
                html += '</td>';
              }
              if(this.events[mmdd][j].makercheckers != null && (this.events[mmdd][j].makercheckers).length > 0) {
                html += '<td part="td-body">';
                html += '<span class="material-symbols-outlined muted">done_all</span>'
                html += '</td>';
              }
              if(this.events[mmdd][j].docs != null && (this.events[mmdd][j].docs).length > 0) {
                html += '<th part="td-body">';
                html += '<span class="material-symbols-outlined muted">scan_delete</span>'
                html += '</th>'
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
              html += '<div class="hidden-filtername hide"><table><thead><th part="badge-filter-name" class="filtername"></th></thead></table></div>'

              if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS && this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {

                let graphParam = '';
                if(Array.isArray(this.events[mmdd][j][this.flowGraph])) {
                  graphParam = this.events[mmdd][j][this.flowGraph].toString().replace(/ *\([^)]*\) */g, "");
                } else {
                  graphParam = this.events[mmdd][j][this.flowGraph].replace(/ *\([^)]*\) */g, "");
                }
                html += '<div class="d-flex"><div part="badge-filter-name" class="graphparamname mb-20">' + graphParam + '</div></div>';

              } else {

                if(this.flowGraph == this.FLOW_GRAPH_COMPLETENESS) {

                  html += '<div class="d-flex"><div part="badge-filter-name" class="graphparamname mb-20">' + partStatus.replace('status-', '') + '</div></div>';

                }

                if(this.flowGraph == this.FLOW_GRAPH_TIMELINESS) {

                  html += '<div class="d-flex"><div part="badge-filter-name" class="graphparamname mb-20">' + lateStatus + '</div></div>';

                }

              }

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

    this.csvDataCompliances = csvCols + "\n" + csvValues;
    this.htmlDataCompliances = '<table>' + htmlCols + htmlValues + '</table>';

    inProgress = total - notStarted - approved;

    console.log('progress', total, notStarted, approved)

    html = html.replace("DASHBOARD_TOTAL", total+"");
    html = html.replace("DASHBOARD_NOT_STARTED", notStarted+"");
    html = html.replace("DASHBOARD_APPROVED", approved+"");
    html = html.replace("DASHBOARD_IN_PROGRESS", inProgress+"");
    html = html.replace("DASHBOARD_PAST_DUE_DATE", pastDueDate+"");
    html = html.replace("DASHBOARD_LATE_EXECUTED", lateExecuted+"");
    html = html.replace("DASHBOARD_LATE_APPROVED", lateApproved+"");

    this.csvDataStats = 'Period,Total,Not Started,Approved,In Progress,Past Due Date,Late Executed,Late Approved\n';
    this.csvDataStats += period + "," + total + "," + notStarted + "," + approved + "," + inProgress + "," + pastDueDate + "," + lateExecuted + "," + lateApproved;

    this.htmlDataStats = '<table class="w-100"><tr><th class="w-14">Total</th><th class="w-14">Not Started</th><th class="w-14">Approved</th><th class="w-14">In Progress</th><th class="w-14">Past Due Date</th><th class="w-14">Late Executed</th><th class="w-14">Late Approved</th><tr>';
    this.htmlDataStats += '<tr><td class="w-14 text-center td-odd">'+total+'</td><td class="w-14 text-center td-odd">'+notStarted+'</td><td class="w-14 text-center td-odd">'+approved+'</td><td class="w-14 text-center td-odd">'+inProgress+'</td><td class="w-14 text-center td-odd">'+pastDueDate+'</td><td class="w-14 text-center td-odd">'+lateExecuted+'</td><td class="w-14 text-center td-odd">'+lateApproved+'</td><tr></table>';

    (this._SfCustomContainer as HTMLDivElement).querySelector('.calendar-right-data')!.innerHTML = html;

    const buttonArr = (this._SfCustomContainer as HTMLDivElement).querySelectorAll('.button-expand') as NodeListOf<HTMLButtonElement>;

    for(var i = 0; i < buttonArr.length; i++) {

      buttonArr[i].addEventListener('click', (ev: any) => {

        const id = ev.target.id;
        const idArr = id.split("-")
        const mmdd = idArr[3] + "/" + idArr[4];
        const j = idArr[5];

        let found = false;
        for(var k = 0; k < this.selectedItems.length; k++) {
          if(this.selectedItems[k].indexOf(idArr[3] + '-' + idArr[4] + '-' + idArr[5]) >= 0) {
            found = true;
          }
        }
        if(!found) {
          this.selectedItems = [];
          this.clearButtonSelection();
        }

        (this._SfDetailContainer as HTMLDivElement).style.display = 'block'

        this.renderEventDetail(this.events[mmdd][j], mmdd + "/" + ((new Date()).getFullYear() + ""), null);
  
      })

    }

    const streamEventsContainer = (this._SfCustomContainer as HTMLDivElement).querySelectorAll('.stream-events-container') as NodeListOf<HTMLDivElement>;
    const buttonSelect = (this._SfCustomContainer as HTMLDivElement).querySelectorAll('.button-select') as NodeListOf<HTMLButtonElement>;

    for(i = 0; i < buttonSelect.length; i++) {

      buttonSelect[i].addEventListener('click', (ev: any) => {

        console.log('eventscontainer', streamEventsContainer.length, buttonSelect.length);

        const id = ev.target.id;
        const idArr = id.split("-")
        // const mmdd = idArr[2] + "/" + idArr[3];
        // const j = idArr[4];
        // const makercheckers = idArr[5];
        const docs = idArr[6];

        if((ev.target as HTMLInputElement).checked) {
          this.selectedItems.push(id);
        } else {
          this.selectedItems.splice(this.selectedItems.indexOf(id), 1);
        }

        if(this.selectedItems.length === 0) {

          for(var k = 0; k < buttonSelect.length; k++) {

            (buttonSelect[k] as HTMLInputElement).style.display = 'block';
            (streamEventsContainer[k] as HTMLDivElement).style.display = 'block';
  
          }

        } else {

          if(this.selectedItems.length === 1) {

            const id1 = id;
            const idArr1 = id1.split("-")
            const status = idArr1[13].replace(/_/g, '-');
            this.selectedStatus = status;

          }

          for(var k = 0; k < buttonSelect.length; k++) {

            const id1 = buttonSelect[k].id;
            const idArr1 = id1.split("-")
            const docs1 = idArr1[6];
            const status = idArr1[13].replace(/_/g, '-');
  
            if(docs == docs1 && status == this.selectedStatus) {
            } else {
              (buttonSelect[k] as HTMLInputElement).style.display = 'none';
              (streamEventsContainer[k] as HTMLDivElement).style.display = 'none';
            }
  
          }  
          

        }

        // (this._SfDetailContainer as HTMLDivElement).style.display = 'block'

        // this.renderEventDetail(this.events[mmdd][j], mmdd + "/" + ((new Date()).getFullYear() + ""));
  
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

    var endDateCalendar = new Date(this.calendarStartMM + '/' + (this.calendarStartDD + 10) + '/' + (parseInt(this.calendarStartYYYY) + 1));
    var endDateChosen = new Date(value);

    console.log('end date calendar', endDateCalendar);
    console.log('end date chosen', endDateChosen);

    if(endDateChosen.getTime() > endDateCalendar.getTime()) {
      return false;
    } else {
      return true;
    }
  }

  processDateSelection = async () => {

    this.clearGraphData();

    var startDateCalendar = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + this.calendarStartYYYY);
    var endDateCalendar = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + (parseInt(this.calendarStartYYYY) + 1));

    const valueStart = ((this._SfCustomContainer as HTMLDivElement).querySelector('#stream-start-date') as HTMLInputElement).value;
    const valueEnd = ((this._SfCustomContainer as HTMLDivElement).querySelector('#stream-end-date') as HTMLInputElement).value;

    console.log('valuestart', valueStart);
    console.log('valueend', valueEnd);

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
      if((new Date(valueEnd).getTime() - new Date(valueStart).getTime())/(1000*60*60*24) > 400) {
        (this._SfStreamEventStatus as HTMLDivElement).innerHTML = "Chosen time window cannot be greater than 400 days";
        return;
      }
      await this.fetchUserCalendar_2(valueStart.split('-')[1] + "/" + valueStart.split('-')[2] + "/" + valueStart.split('-')[0], valueEnd.split('-')[1] + "/" + valueEnd.split('-')[2] + "/" + valueEnd.split('-')[0]);
      this.renderRangeEvents(new Date(valueStart), (new Date(valueEnd).getTime() - new Date(valueStart).getTime())/(1000*60*60*24));
    } else if(valueStart != "" && valueEnd == "") {
      (this._SfStreamEventStatus as HTMLDivElement).innerHTML = "Please select End Date";
    } else if(valueStart == "" && valueEnd != "") {
      (this._SfStreamEventStatus as HTMLDivElement).innerHTML = "Please select Start Date";
    } else {
      (this._SfStreamEventStatus as HTMLDivElement).innerHTML = "Please select Start Date and End Date";
    }

    const attachHandlers = () => {
      console.log('rendering chart', (this._SfCustomContainer as HTMLDivElement).innerHTML);

      const radioCompleteness = (this._SfCustomContainer as HTMLDivElement).querySelector('#radio-completeness') as HTMLButtonElement;
      radioCompleteness?.addEventListener('click', () => {
  
        this.flowGraph = this.FLOW_GRAPH_COMPLETENESS;
        this.renderRangeEvents(new Date(valueStart), (new Date(valueEnd).getTime() - new Date(valueStart).getTime())/(1000*60*60*24));
        this.renderCompletenessGraph((this._SfCustomContainer as HTMLDivElement));
        attachHandlers();
        
      });
  
      const radioTimeliness = (this._SfCustomContainer as HTMLDivElement).querySelector('#radio-timeliness') as HTMLButtonElement;
      radioTimeliness?.addEventListener('click', () => {
  
        this.flowGraph = this.FLOW_GRAPH_TIMELINESS;
        console.log('setting flow graph to ', this.flowGraph);
        this.renderRangeEvents(new Date(valueStart), (new Date(valueEnd).getTime() - new Date(valueStart).getTime())/(1000*60*60*24));
        this.renderTimelinessGraph((this._SfCustomContainer as HTMLDivElement))
        attachHandlers();
        
      });
  
      const radioRisk = (this._SfCustomContainer as HTMLDivElement).querySelector('#radio-risk') as HTMLButtonElement;
      radioRisk?.addEventListener('click', () => {
  
        this.flowGraph = this.FLOW_GRAPH_RISKAREAS;
        console.log('setting flow graph to ', this.flowGraph);
        this.renderRangeEvents(new Date(valueStart), (new Date(valueEnd).getTime() - new Date(valueStart).getTime())/(1000*60*60*24));
        this.renderRiskGraph((this._SfCustomContainer as HTMLDivElement))
        attachHandlers();
        
      });
  
      const radioFunction = (this._SfCustomContainer as HTMLDivElement).querySelector('#radio-function') as HTMLButtonElement;
      radioFunction?.addEventListener('click', () => {
  
        this.flowGraph = this.FLOW_GRAPH_FUNCTION;
        this.renderRangeEvents(new Date(valueStart), (new Date(valueEnd).getTime() - new Date(valueStart).getTime())/(1000*60*60*24));
        this.renderFunctionGraph((this._SfCustomContainer as HTMLDivElement))
        attachHandlers();
        
      });
  
  
      const radioRiskSeverity = (this._SfCustomContainer as HTMLDivElement).querySelector('#radio-riskseverity') as HTMLButtonElement;
      radioRiskSeverity?.addEventListener('click', () => {
  
        this.flowGraph = this.FLOW_GRAPH_RISKSEVERITY;
        this.renderRangeEvents(new Date(valueStart), (new Date(valueEnd).getTime() - new Date(valueStart).getTime())/(1000*60*60*24));
        this.renderRiskSeverityGraph((this._SfCustomContainer as HTMLDivElement))
        attachHandlers();

      });
  
      const radioObligationType = (this._SfCustomContainer as HTMLDivElement).querySelector('#radio-obligationtype') as HTMLButtonElement;
      radioObligationType?.addEventListener('click', () => {
  
        this.flowGraph = this.FLOW_GRAPH_OBLIGATIONTYPE;
        this.renderRangeEvents(new Date(valueStart), (new Date(valueEnd).getTime() - new Date(valueStart).getTime())/(1000*60*60*24));
        this.renderObligationTypeGraph((this._SfCustomContainer as HTMLDivElement))
        attachHandlers();
        
      });
  
      const radioJurisdiction = (this._SfCustomContainer as HTMLDivElement).querySelector('#radio-jurisdiction') as HTMLButtonElement;
      radioJurisdiction?.addEventListener('click', () => {
  
        this.flowGraph = this.FLOW_GRAPH_JURISDICTION;
        this.renderRangeEvents(new Date(valueStart), (new Date(valueEnd).getTime() - new Date(valueStart).getTime())/(1000*60*60*24));
        this.renderJurisdictionGraph((this._SfCustomContainer as HTMLDivElement))
        attachHandlers();
        
      });
  
      const radioFrequency = (this._SfCustomContainer as HTMLDivElement).querySelector('#radio-frequency') as HTMLButtonElement;
      radioFrequency?.addEventListener('click', () => {
  
        this.flowGraph = this.FLOW_GRAPH_FREQUENCY;
        this.renderRangeEvents(new Date(valueStart), (new Date(valueEnd).getTime() - new Date(valueStart).getTime())/(1000*60*60*24));
        this.renderFrequencyGraph((this._SfCustomContainer as HTMLDivElement))
        attachHandlers();
        
      });
      
  
      const radioLocation = (this._SfCustomContainer as HTMLDivElement).querySelector('#radio-location') as HTMLButtonElement;
      radioLocation?.addEventListener('click', () => {
  
        this.flowGraph = this.FLOW_GRAPH_LOCATION;
        this.renderRangeEvents(new Date(valueStart), (new Date(valueEnd).getTime() - new Date(valueStart).getTime())/(1000*60*60*24));
        this.renderLocationGraph((this._SfCustomContainer as HTMLDivElement))
        attachHandlers();
        
      });
  
      const buttonStatusMore = (this._SfCustomContainer as HTMLDivElement).querySelector('#button-status-more');
      buttonStatusMore?.addEventListener('click', () => {
  
        const divStatusList = (this._SfCustomContainer as HTMLDivElement).querySelectorAll('.late-statuses') as NodeListOf<HTMLDivElement>;
        for(var i = 0; i < divStatusList.length; i++) {
          divStatusList[i].style.display = 'flex';
        }
        (buttonStatusMore as HTMLButtonElement).style.display = 'none';
  
      });
  
    }

    attachHandlers();

    if((this._SfCustomContainer as HTMLDivElement).innerHTML.indexOf('myChart') >= 0) {
  
      this.renderCompletenessGraph((this._SfCustomContainer as HTMLDivElement));

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

    console.log('showing summary',this.mappedValuesUsers);

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

  filterEventsInWindow = (tags: Array<string>, ctx: any, divContainer: HTMLDivElement | null) => {

    const arrData = [];

    console.log('window', this.eventsInWindow);

    if(divContainer != null) this.clearGraph(divContainer, 2);
    if(divContainer != null) this.clearGraph(divContainer, 3);

    for(var i = 0; i < tags.length; i++) {

      var countApproved = 0;
      var countInProgress = 0;
      var countNotStarted = 0;

      for(var j = 0; j < this.eventsInWindow.length; j++) {

        const event = this.eventsInWindow[j];

        for(var l = 0; l < event.tags.length; l++) {

          if((event.tags[l] + "").toLowerCase().indexOf((tags[i] + "").toLowerCase().split(';')[1]) >= 0) {
            console.log('plot approved', event.approved)
            //if(event.documents == null || event.documents[event.mmdd + '/' + new Date().getFullYear()] == null || JSON.parse(event.documents[event.mmdd + '/' + new Date().getFullYear()]) == null) {
            if(event.comments == null || event.comments.length === 0) {
              countNotStarted++;
            } else if (event.approved == null) {
              countInProgress++;
            } else if(!event.approved) {
              countInProgress++;
            } else if(event.approved) {
              countApproved++;
            }
            // if(event.documents == null || event.documents.length === 0) {
            //   countNotStarted++;
            // } else if (event.approved == null) {
            //   countInProgress++;
            // } else if(!event.approved) {
            //   countInProgress++;
            // } else if(event.approved) {
            //   countApproved++;
            // }
          }

        }

      }

      const arrItem = [countApproved, countInProgress, countNotStarted];
      arrData.push(arrItem)

    }

    console.log(arrData);

    const dataSetApproved = [];
    const dataSetInProgress = [];
    const dataSetNotStarted = [];

    for(i = 0; i < arrData.length; i++) {

      dataSetApproved.push(arrData[i][0]);
      dataSetInProgress.push(arrData[i][1]);
      dataSetNotStarted.push(arrData[i][2]);

    }

    console.log('plotting dataset', dataSetApproved, dataSetInProgress, dataSetNotStarted);

    const tagsCompressed = [];

    for(i = 0; i < tags.length; i++) {
      tagsCompressed.push(this.truncate(tags[i].split(';')[0], 20, false, false));
    }

    if(this.fill == "solid") {

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
      }

      this.renderChart(ctx, 'bar', data, "Custom Plot")

    } else {

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
      }

      this.renderChart(ctx, 'bar', data, "Custom Plot")

    }

  }

  sleep = (ms: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  hideTabContainers = async () => {

    (this._SfOnboardingStatutesContainer as HTMLDivElement).style.display = 'none';
    (this._SfOnboardingCompliancesContainer as HTMLDivElement).style.display = 'none';
    (this._SfOnboardingCountriesContainer as HTMLDivElement).style.display = 'none';
    (this._SfOnboardingEntitiesContainer as HTMLDivElement).style.display = 'none';
    (this._SfOnboardingLocationsContainer as HTMLDivElement).style.display = 'none';
    (this._SfOnboardingFunctionsContainer as HTMLDivElement).style.display = 'none';
    (this._SfOnboardingTagsContainer as HTMLDivElement).style.display = 'none';
    (this._SfOnboardingReportersContainer as HTMLDivElement).style.display = 'none';
    (this._SfOnboardingApproversContainer as HTMLDivElement).style.display = 'none';
    (this._SfOnboardingFunctionHeadsContainer as HTMLDivElement).style.display = 'none';
    (this._SfOnboardingMakerCheckersContainer as HTMLDivElement).style.display = 'none';
    (this._SfOnboardingAuditorsContainer as HTMLDivElement).style.display = 'none';
    (this._SfOnboardingViewersContainer as HTMLDivElement).style.display = 'none';
    (this._SfOnboardingDocsContainer as HTMLDivElement).style.display = 'none';
    (this._SfOnboardingDuedatesContainer as HTMLDivElement).style.display = 'none';
    (this._SfOnboardingAlertSchedulesContainer as HTMLDivElement).style.display = 'none';
    (this._SfOnboardingInternalControlsContainer as HTMLDivElement).style.display = 'none';
    (this._SfOnboardingCalendarContainer as HTMLDivElement).style.display = 'none';

    (this._SfOnboardingStatutesContainer as HTMLDivElement).innerHTML = '';
    (this._SfOnboardingCompliancesContainer as HTMLDivElement).innerHTML = '';
    (this._SfOnboardingCountriesContainer as HTMLDivElement).innerHTML = '';
    (this._SfOnboardingEntitiesContainer as HTMLDivElement).innerHTML = '';
    (this._SfOnboardingLocationsContainer as HTMLDivElement).innerHTML = '';
    (this._SfOnboardingFunctionsContainer as HTMLDivElement).innerHTML = '';
    (this._SfOnboardingTagsContainer as HTMLDivElement).innerHTML = '';
    (this._SfOnboardingReportersContainer as HTMLDivElement).innerHTML = '';
    (this._SfOnboardingApproversContainer as HTMLDivElement).innerHTML = '';
    (this._SfOnboardingFunctionHeadsContainer as HTMLDivElement).innerHTML = '';
    (this._SfOnboardingMakerCheckersContainer as HTMLDivElement).innerHTML = '';
    (this._SfOnboardingAuditorsContainer as HTMLDivElement).innerHTML = '';
    (this._SfOnboardingViewersContainer as HTMLDivElement).innerHTML = '';
    (this._SfOnboardingDocsContainer as HTMLDivElement).innerHTML = '';
    (this._SfOnboardingDuedatesContainer as HTMLDivElement).innerHTML = '';
    (this._SfOnboardingAlertSchedulesContainer as HTMLDivElement).innerHTML = '';
    (this._SfOnboardingInternalControlsContainer as HTMLDivElement).innerHTML = '';
    (this._SfOnboardingCalendarContainer as HTMLDivElement).innerHTML = '';

  }

  loadOnboardingStatutes = async () => {
    this.hideTabContainers();
    (this._SfOnboardingStatutesContainer as HTMLDivElement).style.display = 'flex';
    const mappedStatutes = await this.fetchMappedStatutes();
    console.log('mappedstatutes', mappedStatutes);
    this.renderOnboardingStatutes(mappedStatutes);
  }

  loadOnboardingCompliances = async () => {
    this.hideTabContainers();
    (this._SfOnboardingCompliancesContainer as HTMLDivElement).style.display = 'flex';
    const mappedStatutes = await this.fetchMappedStatutes();
    const mappedCompliances = await this.fetchMappedCompliances();
    this.renderOnboardingCompliances(mappedStatutes, mappedCompliances);
  }

  loadOnboardingCountries = async () => {
    this.hideTabContainers();
    (this._SfOnboardingCountriesContainer as HTMLDivElement).style.display = 'flex';
    const countriesJobs = await this.fetchCountriesJobs();
    const mappedCountries = await this.fetchMappedCountries();
    const mappedCompliances = await this.fetchMappedCompliances();
    // const mappedStatutes = await this.fetchMappedStatutes();
    console.log('countriesJobs', countriesJobs);
    console.log('mappedCompliances', mappedCompliances);
    console.log('mappedCountries', mappedCountries);
    this.renderOnboardingCountries(mappedCountries, mappedCompliances, countriesJobs);
  }

  loadOnboardingEntities = async () => {
    this.hideTabContainers();
    (this._SfOnboardingEntitiesContainer as HTMLDivElement).style.display = 'flex';
    const entitiesJobs = await this.fetchEntitiesJobs();
    const mappedEntities = await this.fetchMappedEntities();
    const mappedSerializedCountries = await this.fetchMappedSerializedCountries();
    // const mappedStatutes = await this.fetchMappedStatutes();
    console.log('mappedSerializedCountries', mappedSerializedCountries);
    console.log('mappedEntities', mappedEntities);
    this.renderOnboardingEntities(mappedEntities, mappedSerializedCountries, entitiesJobs);
  }

  loadOnboardingLocations = async () => {
    this.hideTabContainers();
    (this._SfOnboardingLocationsContainer as HTMLDivElement).style.display = 'flex';
    const locationsJobs = await this.fetchLocationsJobs();
    const mappedSerializedEntities = await this.fetchMappedSerializedEntities();
    const mappedLocations = await this.fetchMappedLocations();
    console.log('mappedserializedentities', mappedSerializedEntities);
    console.log('mappedlocations', mappedLocations);
    this.renderOnboardingLocations(mappedLocations, mappedSerializedEntities, locationsJobs);
  }

  loadOnboardingFunctions = async () => {
    this.hideTabContainers();
    (this._SfOnboardingFunctionsContainer as HTMLDivElement).style.display = 'flex';
    const functionsJobs = await this.fetchFunctionJobs();
    const mappedSerializedLocations = await this.fetchMappedSerializedLocations();
    const mappedFunctions = await this.fetchMappedFunctions();
    console.log('functionjobs', functionsJobs);
    console.log('mappedserializedlocations', mappedSerializedLocations);
    console.log('mappedfunctions', mappedFunctions);
    this.renderOnboardingFunctions(mappedFunctions, mappedSerializedLocations, functionsJobs);
  }

  loadOnboardingTags = async () => {
    this.hideTabContainers();
    (this._SfOnboardingTagsContainer as HTMLDivElement).style.display = 'flex';
    const tagsJobs = await this.fetchTagsJobs();
    const mappedSerializedFunctions = await this.fetchMappedSerializedFunctions();
    const mappedTags = await this.fetchMappedTags();
    console.log('mappedserializedfunctions', mappedSerializedFunctions);
    console.log('mappedtags', mappedTags);
    this.renderOnboardingTags(mappedTags, mappedSerializedFunctions, tagsJobs);
  }

  loadOnboardingReporters = async () => {
    this.hideTabContainers();
    (this._SfOnboardingReportersContainer as HTMLDivElement).style.display = 'flex';
    const reportersJobs = await this.fetchReportersJobs();
    const mappedSerializedTags = await this.fetchMappedSerializedTags();
    const mappedReporters = await this.fetchMappedReporters();
    console.log('mappedserializedtags', mappedSerializedTags);
    console.log('mappedreporters', mappedReporters);
    this.renderOnboardingReporters(mappedReporters, mappedSerializedTags, reportersJobs);
  }

  loadOnboardingApprovers = async () => {
    this.hideTabContainers();
    (this._SfOnboardingApproversContainer as HTMLDivElement).style.display = 'flex';
    const approversJobs = await this.fetchApproversJobs();
    const mappedSerializedReporters = await this.fetchMappedSerializedReporters();
    const mappedApprovers = await this.fetchMappedApprovers();
    console.log('mappedserializedreporters', mappedSerializedReporters);
    console.log('mappedapprovers', mappedApprovers);
    this.renderOnboardingApprovers(mappedApprovers, mappedSerializedReporters, approversJobs);
  }

  loadOnboardingFunctionHeads = async () => {
    this.hideTabContainers();
    (this._SfOnboardingFunctionHeadsContainer as HTMLDivElement).style.display = 'flex';
    const functionHeadsJobs = await this.fetchFunctionHeadsJobs();
    const mappedSerializedApprovers = await this.fetchMappedSerializedApprovers();
    const mappedFunctionHeads = await this.fetchMappedFunctionHeads();
    console.log('mappedserializedapprovers', mappedSerializedApprovers);
    console.log('mappedfunctionheads', mappedFunctionHeads);
    this.renderOnboardingFunctionHeads(mappedFunctionHeads, mappedSerializedApprovers, functionHeadsJobs);
  }

  loadOnboardingViewers = async () => {
    this.hideTabContainers();
    (this._SfOnboardingViewersContainer as HTMLDivElement).style.display = 'flex';
    const makerViewersJobs = await this.fetchViewersJobs();
    const mappedSerializedAuditors = await this.fetchMappedSerializedAuditors();
    const mappedViewers = await this.fetchMappedViewers();
    console.log('mappedSerializedAuditors', mappedSerializedAuditors);
    console.log('mappedViewers', mappedViewers);
    this.renderOnboardingViewers(mappedViewers, mappedSerializedAuditors, makerViewersJobs);
  }

  loadOnboardingDocs = async () => {
    this.hideTabContainers();
    (this._SfOnboardingDocsContainer as HTMLDivElement).style.display = 'flex';
    const docsJobs = await this.fetchDocsJobs();
    const mappedSerializedViewers = await this.fetchMappedSerializedViewers();
    const mappedDocs = await this.fetchMappedDocs();
    console.log('mappedSerializedViewers', mappedSerializedViewers);
    console.log('mappedDocs', mappedDocs);
    this.renderOnboardingDocs(mappedDocs, mappedSerializedViewers, docsJobs);
  }

  loadOnboardingMakerCheckers = async () => {
    this.hideTabContainers();
    (this._SfOnboardingMakerCheckersContainer as HTMLDivElement).style.display = 'flex';
    const makerCheckersJobs = await this.fetchMakerCheckersJobs();
    const mappedSerializedDocs = await this.fetchMappedSerializedDocs();
    const mappedMakerCheckers = await this.fetchMappedMakerCheckers();
    console.log('mappedSerializedDocs', mappedSerializedDocs);
    console.log('mappedMakerCheckers', mappedMakerCheckers);
    this.renderOnboardingMakerCheckers(mappedMakerCheckers, mappedSerializedDocs, makerCheckersJobs);
  }

  loadOnboardingAuditors = async () => {
    this.hideTabContainers();
    (this._SfOnboardingAuditorsContainer as HTMLDivElement).style.display = 'flex';
    const auditorsJobs = await this.fetchAuditorsJobs();
    const mappedSerializedFunctionheads = await this.fetchMappedSerializedFunctionheads();
    const mappedAuditors = await this.fetchMappedAuditors();
    console.log('mappedSerializedFunctionheads', mappedSerializedFunctionheads);
    console.log('mappedAuditors', mappedAuditors);
    this.renderOnboardingAuditors(mappedAuditors, mappedSerializedFunctionheads, auditorsJobs);
  }

  loadOnboardingDuedates = async () => {
    this.hideTabContainers();
    (this._SfOnboardingDuedatesContainer as HTMLDivElement).style.display = 'flex';
    const duedatesJobs = await this.fetchDueDatesJobs();
    const mappedSerializedMakerCheckers = await this.fetchMappedSerializedMakerCheckers();
    const mappedDuedates = await this.fetchMappedDuedates();
    console.log('mappedSerializedMakerCheckers', mappedSerializedMakerCheckers);
    console.log('mappedduedates', mappedDuedates);
    this.renderOnboardingDuedates(mappedDuedates, mappedSerializedMakerCheckers, duedatesJobs);
  }

  loadOnboardingAlertSchedules = async () => {
    this.hideTabContainers();
    (this._SfOnboardingAlertSchedulesContainer as HTMLDivElement).style.display = 'flex';
    const alertschedulesJobs = await this.fetchAlertSchedulesJobs();
    const mappedSerializedDuedates = await this.fetchMappedSerializedDuedates();
    const mappedAlertSchedules = await this.fetchMappedAlertSchedules();
    console.log('mappedserializedduedates', mappedSerializedDuedates);
    console.log('mappedalertschedules', mappedAlertSchedules);
    this.renderOnboardingAlertSchedules(mappedAlertSchedules, mappedSerializedDuedates, alertschedulesJobs);
  }

  loadOnboardingInternalControls = async () => {
    this.hideTabContainers();
    (this._SfOnboardingInternalControlsContainer as HTMLDivElement).style.display = 'flex';
    const internalcontrolsJobs = await this.fetchInternalControlsJobs();
    const mappedSerializedAlertSchedules = await this.fetchMappedSerializedAlertSchedules();
    const mappedInternalControls = await this.fetchMappedInternalControls();
    console.log('mappedserializedalertschedules', mappedSerializedAlertSchedules);
    console.log('mappedinternalcontrols', mappedInternalControls);
    this.renderOnboardingInternalControls(mappedInternalControls, mappedSerializedAlertSchedules, internalcontrolsJobs);
  }

  loadOnboardingCalendar = async () => {
    this.hideTabContainers();
    (this._SfOnboardingCalendarContainer as HTMLDivElement).style.display = 'flex';
    const calendarJobs = await this.fetchCalendarJobs();
    this.renderOnboardingCalendar(calendarJobs);
  }

  calculateStartAndEndDateOfPast = (index: number = 0) => {

    console.log('calculating start and end of past');

    let block = 10;

    if(index === 0) {

      block = 10;

    } else {

      block = 30;

    }

    let currDay = new Date();
    for(var i = 0; i < block; i++) {
      currDay.setDate(currDay.getDate() - 1);
    }

    const startDate = ("0" + (currDay.getMonth() + 1)).slice(-2) + "/" + ("0" + (currDay.getDate() + 1)).slice(-2) + "/" + currDay.getFullYear();

    currDay = new Date();
    for(var i = 0; i < block; i++) {
      currDay.setDate(currDay.getDate() + 1);
    }

    const endDate = ("0" + (currDay.getMonth() + 1)).slice(-2) + "/" + ("0" + (currDay.getDate() + 1)).slice(-2) + "/" + currDay.getFullYear();

    return {startDate: startDate, endDate: endDate}

  }

  calculateStartAndEndDateOfThis = (index: number = 0) => {

    console.log('calculating start and end of upcoming');

    let block = 10;
    var firstDate = new Date();

    if(index === 0) {

      firstDate = (this.getFirstDateOfWeek(new Date()) as Date);
      console.log('this first date', firstDate);
      block = 10;

    }

    if(index === 1) {

      firstDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
      console.log('this first date', firstDate);
      block = 35;

    }

    const currentMonth = parseInt(("0" + (new Date().getMonth() + 1)).slice(-2));
    let lastMonth = -1;
    if(currentMonth <= 11 && currentMonth >= 2) {
      lastMonth = parseInt(((currentMonth - 1) + "").slice(-2));
    } else if(currentMonth === 12) {
      lastMonth = 11;
    } else if(currentMonth === 1) {
      lastMonth = 12;
    }

    let lastMonthsYear = -1;
    if((lastMonth) >= parseInt(this.calendarStartMM)) {
      lastMonthsYear = parseInt(this.calendarStartYYYY);
    } else {
      lastMonthsYear = parseInt(this.calendarStartYYYY) + 1;
    }

    var incDate = new Date();
    for(var j = 0; j < block; j++) {
      incDate.setDate(incDate.getDate() + 1);
    }

    let incDateMonth = (incDate.getMonth() + 1);

    let incDateYear = -1;
    if((incDateMonth) >= parseInt(this.calendarStartMM)) {
      incDateYear = parseInt(this.calendarStartYYYY);
    } else {
      incDateYear = parseInt(this.calendarStartYYYY) + 1;
    }

    let startDate = lastMonth + "/25/" + lastMonthsYear;        
    let endDate = (incDate.getMonth() + 1) + "/" + incDate.getDate() + "/" + incDateYear;

    console.log('calculating start and end of upcoming', {startDate: startDate, endDate: endDate});

    return {startDate: startDate, endDate: endDate}

  }

  calculateStartAndEndDateOfUpcoming = (index: number = 0) => {

    console.log('calculating start and end of upcoming');

    let block = 10;
    if(index === 0) {
      block = 10;
    } else if(index === 1) {
      block = 35;
    } else {
      block = 95;
    }

    const currentMonth = parseInt(("0" + (new Date().getMonth() + 1)).slice(-2));
    let lastMonth = -1;
    if(currentMonth <= 11 && currentMonth >= 2) {
      lastMonth = parseInt(((currentMonth - 1) + "").slice(-2));
    } else if(currentMonth === 12) {
      lastMonth = 11;
    } else if(currentMonth === 1) {
      lastMonth = 12;
    }

    let lastMonthsYear = -1;
    if((lastMonth) >= parseInt(this.calendarStartMM)) {
      lastMonthsYear = parseInt(this.calendarStartYYYY);
    } else {
      lastMonthsYear = parseInt(this.calendarStartYYYY) + 1;
    }

    var incDate = new Date();
    for(var j = 0; j < block; j++) {
      incDate.setDate(incDate.getDate() + 1);
    }

    let incDateMonth = (incDate.getMonth() + 1);

    let incDateYear = -1;
    if((incDateMonth) >= parseInt(this.calendarStartMM)) {
      incDateYear = parseInt(this.calendarStartYYYY);
    } else {
      incDateYear = parseInt(this.calendarStartYYYY) + 1;
    }

    let startDate = lastMonth + "/25/" + lastMonthsYear;        
    let endDate = (incDate.getMonth() + 1) + "/" + incDate.getDate() + "/" + incDateYear;

    console.log('calculating start and end of upcoming', {startDate: startDate, endDate: endDate});

    return {startDate: startDate, endDate: endDate}

  }

  calculateStartAndEndDateOfStream = (index: number = 0) => {

    console.log('calculateStartAndEndDateOfStream', index);

    let month = parseInt(this.calendarStartMM);
    for(var j = 0; j < 12; j++) {
      if(j === index) {

        let currentMonth = month;
        let lastMonth = -1;
        let nextMonth = -1;

        if(currentMonth <= 11 && currentMonth >= 2) {
          lastMonth = parseInt(((currentMonth - 1) + "").slice(-2));
          nextMonth = parseInt(((currentMonth + 1) + "").slice(-2));
        } else if(currentMonth === 12) {
          lastMonth = 11;
          nextMonth = 1;
        } else if(currentMonth === 1) {
          lastMonth = 12;
          nextMonth = 2;
        }

        console.log('last month', lastMonth);

        let lastMonthsYear = -1;
        let nextMonthsYear = -1;

        if((lastMonth) >= parseInt(this.calendarStartMM)) {
          lastMonthsYear = parseInt(this.calendarStartYYYY);
        } else {
          if(j === 0) {
            lastMonthsYear = parseInt(this.calendarStartYYYY);
          } else {
            lastMonthsYear = parseInt(this.calendarStartYYYY) + 1;
          }
          
        }

        if((nextMonth) >= parseInt(this.calendarStartMM)) {
          nextMonthsYear = parseInt(this.calendarStartYYYY);
        } else {
          nextMonthsYear = parseInt(this.calendarStartYYYY) + 1;
        }

        let startDate = lastMonth + "/25/" + lastMonthsYear;
        let endDate = nextMonth + "/01/" + nextMonthsYear;

        return {startDate: startDate, endDate: endDate};
        
      } else {

        if(month === 12) {
          month = 1;
        } else {
          month++;
        }

      }

    }

    return null;

  }

  renderAdhoc = (events: Array<any>|null = null, triggers: Array<any>|null = null) => {

    if(events == null) {

      var html = '';
      html += '<div part="stream-event-list" class="p-10 w-100">';
        html += 'Loading ...';
      html += '</div>';
      
      (this._SfAdhocContainer as HTMLDivElement).innerHTML = html;  
      this.fetchAdhoc();
      return;
  
    }

    if(events.length === 0) {
      var html = '';
      html += '<div part="stream-event-list" class="p-10 w-100">';
        html += 'No adhoc compliances found!';
      html += '</div>';
      
      (this._SfAdhocContainer as HTMLDivElement).innerHTML = html;  
      return;
    }

    var html = '';
    html += '<div part="stream-event-list" class="p-10 w-100">';
    for(var i = 0; i < events.length; i++) {

      html += '<div part="stream-event-selected" class="p-10 mb-10">';

        html += '<div class="d-flex align-start">';
          html += '<div class="mb-10 flex-grow" part="adhoc-question">'+events[i].question.replace(/"/g, '')+'</div>';
          html += '<button id="button-bolt-'+i+'" part="button-icon" class="material-icons">electric_bolt</button>'
        html += '</div>'
        html += '<div class="d-flex align-start mb-10">';
          html += '<div part="input-labal">'+events[i].locationname+'</div>';
        html += '</div>'
        html += '<div class="d-flex align-center flex-wrap">';
          html += '<div class="mr-20" part="adhoc-triggers">';
            html += "Triggers: " + (triggers![events[i].id].length > 0 ? triggers![events[i].id].length : 0);
          html += '</div>';
          html += '<div class="mr-20" part="adhoc-last-triggers">';
            html += "Last Triggered: " + (triggers![events[i].id].length > 0 ? Util.timeSince(parseInt(triggers![events[i].id][triggers![events[i].id].length - 1].timestamp)) : '-');
          html += '</div>';
          if(triggers![events[i].id].length > 0) {
            html += '<div id="caret-'+i+'" class="mr-20 material-icons cursor" part="adhoc-caret">';
              html += "expand_more";
            html += '</div>';
          }
          
        html += '</div>';

        console.log('triggers', events[i].id, triggers![events[i].id].length);

        if(triggers![events[i].id].length > 0) {

          html += '<div id="adhoc-history-'+i+'" class="hide">';

            html += '<table class="mt-20">';
            html += '<thead>';
            html += '<th part="td-head" class="td-head">';
            html += 'Trigger Time'
            html += '</th>';
            html += '<th part="td-head" class="td-head">';
            html += 'Due Date'
            html += '</th>';
            html += '<th part="td-head" class="td-head">';
            html += 'Compliance Status'
            html += '</th>';
            html += '<th part="td-head" class="td-head">';
            html += ''
            html += '</th>';
            html += '</thead>';

            console.log('trigger', triggers![events[i].id]);
            console.log('events', Object.keys(this.events))

            for(var j = (triggers![events[i].id].length-1); j >= 0; j--) {

              if(this.events[triggers![events[i].id][j].newduedate] == null) continue;

              var classBg = "";

              if(j%2 === 0) {
                classBg = 'td-light';
              } else {
                classBg = 'td-dark';
              }

              html += '<tr>';

              html += '<td part="td-body" class="td-body '+classBg+'">';
              html += Util.timeSince(parseInt(triggers![events[i].id][j].timestamp));
              html += '</td>';

              html += '<td part="td-body" class="td-body '+classBg+'">';
              html += Util.timeSince(new Date(triggers![events[i].id][j].newduedatestr).getTime()) + ' on ' + triggers![events[i].id][j].newduedate.split("/")[1] + "/" + triggers![events[i].id][j].newduedate.split("/")[0];
              html += '</td>';

              console.log('trigger2', triggers![events[i].id][j].newduedate);

              for(var k = 0; k < (this.events[triggers![events[i].id][j].newduedate] as Array<any>).length; k++) {
                const dEvent = (this.events[triggers![events[i].id][j].newduedate] as Array<any>)[k];
                if(dEvent.id == events[i].id) {

                  var partStatus = "";
                  var lateStatus = "";

                  if(dEvent.approved != null && (dEvent.approved) != null && (dEvent.approved)) {
                    partStatus = "Approved";
                    if(this.getLateExecuted(triggers![events[i].id][j].newduedate, dEvent)) {
                      lateStatus = "Late-executed"
                    } else {
                      if(this.getLateApproved(triggers![events[i].id][j].newduedate, dEvent)) {
                        lateStatus = "Late-approved"
                      }
                    }
                  } else if(dEvent.documents != null && dEvent.documents != null && (dEvent.documents).length > 0) {
                    partStatus = "In-progress";
                    if(this.getPastDueDate(triggers![events[i].id][j].newduedate)) {
                      lateStatus = "Past-due-date"
                    }
                  } else {
                    partStatus = "Not-started";
                    if(this.getPastDueDate(triggers![events[i].id][j].newduedate)) {
                      lateStatus = "Past-due-date"
                    }
                  }

                  html += '<td part="td-body" class="td-body '+classBg+'">';
                  html += partStatus + ' ' + lateStatus;
                  html += '</td>';

                  html += '<td part="td-body" class="td-body '+classBg+' d-flex align-center">';
                  html += '<button id="open-'+i+'-'+j+'-'+k+'" part="button-icon" class="button-open mr-20 material-icons">open_in_new</button>';
                  html += '<button id="delete-'+i+'-'+j+'-'+k+'" part="button-icon" class="button-delete material-icons">delete</button>';
                  html += '<button id="confirm-'+i+'-'+j+'-'+k+'" part="button-icon" class="button-confirm hide">Confirm Delete</button>';
                  html += '</td>';

                }
              }

              html += '</tr>';

            }
            
            html += '</table>';

          html += '</div>';

        }

        console.log('events i', events[i]);

        html += '<div id="occurrence-'+i+'" class="hide">';
          html += '<div class="d-flex align-end mt-20">';
            html += '<div class="mr-20">';
              html += '<label part="input-label" class="mb-5">Date of Occurrence</label><br />';
              html += '<input id="dateofoccurrence_'+events[i].id+'" part="input" type="date" />'
            html += '</div>';
          html += '</div>';
          html += '<button id="trigger_'+events[i].id+'_'+events[i].locationid+'_'+events[i].entityid+'" part="button" class="button-trigger mt-10 cursor">Trigger</button>'
        html += '</div>';
      html += '</div>';

        

     // html += '</div>';

    }
    html += '</div>';

    (this._SfAdhocContainer as HTMLDivElement).innerHTML = html;

    for(var i = 0; i < events.length; i++) {

      const button = ((this._SfAdhocContainer as HTMLDivElement).querySelector('#button-bolt-' + i) as HTMLButtonElement);
      button.addEventListener('click', (ev: any) => {

        const button = (ev.target as HTMLButtonElement)
        const index = ev.target.id.split('-')[2];
        console.log('clicked', ev.target.id, index);

        const occurrence = ((this._SfAdhocContainer as HTMLDivElement).querySelector('#occurrence-' + index) as HTMLDivElement)
        console.log(occurrence, occurrence.style.display)
        if(occurrence.style.display == "none" || occurrence.style.display == "") {
          occurrence.style.display = "block";
          button.style.display = 'none';
        } else {
          occurrence.style.display = "none";
          button.style.display = 'flex';
        }

      });

      if(triggers![events[i].id].length > 0) {
      
        const caret = ((this._SfAdhocContainer as HTMLDivElement).querySelector('#caret-' + i) as HTMLDivElement);
        caret.addEventListener('click', (ev: any) => {

          const button = (ev.target as HTMLDivElement)
          const index = ev.target.id.split('-')[1];
          console.log('clicked', ev.target.id, index);

          const history = ((this._SfAdhocContainer as HTMLDivElement).querySelector('#adhoc-history-' + index) as HTMLDivElement)
          if(history.style.display == "none" || history.style.display == "") {
            history.style.display = "block";
            button.innerHTML = 'expand_less';
          } else {
            history.style.display = "none";
            button.innerHTML = 'expand_more';
            //button.style.display = 'flex';
          }

        });

      }

    }


    const opens = ((this._SfAdhocContainer as HTMLDivElement).querySelectorAll('.button-open') as NodeListOf<HTMLButtonElement>);
    for(var i = 0; i < opens.length; i++) {

      opens[i].addEventListener('click', (ev: any) => {

        //const button = (ev.target as HTMLDivElement);
        const indexI = ev.target.id.split('-')[1];
        const indexJ = ev.target.id.split('-')[2];
        const indexK = ev.target.id.split('-')[3];

        const dEvent = (this.events[triggers![events[indexI].id][indexJ].newduedate] as Array<any>)[indexK];
        (this._SfDetailContainer as HTMLDivElement).style.display = 'block'
        this.renderEventDetail(dEvent, triggers![events[indexI].id][indexJ].newduedate + "/" + ((new Date()).getFullYear() + ""), null);

      });

    }

    const triggerBs = ((this._SfAdhocContainer as HTMLDivElement).querySelectorAll('.button-trigger') as NodeListOf<HTMLButtonElement>);
    for(var i = 0; i < triggerBs.length; i++) {

      triggerBs[i].addEventListener('click', (ev: any) => {

        //const button = (ev.target as HTMLDivElement);
        const eventid = ev.target.id.split('_')[1];
        const locationid = ev.target.id.split('_')[2];
        const entityid = ev.target.id.split('_')[3];
        if(((this._SfAdhocContainer as HTMLDivElement).querySelector('#dateofoccurrence_'+eventid) as HTMLInputElement).value.trim().length > 0) {
          const dateofoccurrence = new Date(((this._SfAdhocContainer as HTMLDivElement).querySelector('#dateofoccurrence_'+eventid) as HTMLInputElement).value).getTime();
          console.log('eventid', eventid, locationid, entityid, dateofoccurrence);
          this.uploadTriggerEvent(entityid, locationid, eventid, dateofoccurrence + "")  
        }
        
      });

    }


    const deleteB = ((this._SfAdhocContainer as HTMLDivElement).querySelectorAll('.button-delete') as NodeListOf<HTMLButtonElement>);
    for(var i = 0; i < deleteB.length; i++) {

      deleteB[i].addEventListener('click', (ev: any) => {

        const button = (ev.target as HTMLButtonElement);
        const indexI = ev.target.id.split('-')[1];
        const indexJ = ev.target.id.split('-')[2];
        const indexK = ev.target.id.split('-')[3];

        const confirm = ((this._SfAdhocContainer as HTMLDivElement).querySelector('#confirm-'+indexI+'-'+indexJ+'-'+indexK) as HTMLButtonElement) 
        confirm.style.display = 'block';
        button.style.display = 'none';

      });

    }

    const confirmB = ((this._SfAdhocContainer as HTMLDivElement).querySelectorAll('.button-confirm') as NodeListOf<HTMLButtonElement>);
    for(var i = 0; i < confirmB.length; i++) {

      confirmB[i].addEventListener('click', (ev: any) => {

        const indexI = ev.target.id.split('-')[1];
        const indexJ = ev.target.id.split('-')[2];

        this.uploadUnTriggerEvent(events[indexI].id, triggers![events[indexI].id][indexJ].newduedate)        

      });

    }

    // const open = ((this._SfAdhocContainer as HTMLDivElement).querySelector('#open-' + i) as HTMLDivElement);
    //   open.addEventListener('click', (ev: any) => {

    //     //const button = (ev.target as HTMLDivElement)
    //     const index = ev.target.id.split('-')[1];
    //     console.log('clicked', ev.target.id, index);


    //     this.renderEventDetail(this.events[mmdd][j], triggers![events[i].id][j].newduedate + "/" + ((new Date()).getFullYear() + ""));

    //   });

  }

  renderCustom = () => {

    var html = '';

    html += '<div class="scroll-x w-100 mobile-only">';

      html += '<div class="title-item-date">';
        html += '<label part="input-label">Start Date</label><br />'
        html += '<input id="stream-start-date-mobile" part="input" type="date" />'
      html += '</div>';
      html += '<div class="title-item-date">';
        html += '<label part="input-label">End Date</label><br />'
        html += '<input id="stream-end-date-mobile" part="input" type="date" />'
      html += '</div>';

    html += '</div>';

    html += '<div class="d-flex w-100">';
      html += '<div class="calendar-left-col desktop-only flex-col justify-start align-end">';

        html += '<div class="title-item-date">';
        html += '<label part="input-label">Start Date</label><br />'
        html += '<input id="stream-start-date" part="input" type="date" />'
        html += '</div>';
        html += '<div class="title-item-date">';
        html += '<label part="input-label">End Date</label><br />'
        html += '<input id="stream-end-date" part="input" type="date" />'
        html += '</div>';

      html += '</div>';

      html += '<div class="calendar-right-data flex-grow">';

      html += '</div>';
    html += '</div>';

    (this._SfCustomContainer as HTMLDivElement).innerHTML = html;

    this.initCustomRightCol();

    (this._SfCustomContainer as HTMLDivElement).querySelector('#stream-start-date')?.addEventListener('change', (ev: any) => {
      console.log('start-date', ev);
      this.flowGraph = this.FLOW_GRAPH_COMPLETENESS;
      this.processDateSelection();
    });

    (this._SfCustomContainer as HTMLDivElement).querySelector('#stream-end-date')?.addEventListener('change', (ev: any) => {
      console.log('end-date', ev);
      this.flowGraph = this.FLOW_GRAPH_COMPLETENESS;
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

    this.clearGraphData();

    var html = '';

    html += '<div class="scroll-x w-100 mobile-only">';

      var part = "";
      if(index === 0) {
        part = "stream-month-selected";
      } else {
        part = "stream-month-not-selected";
      }
      html += '<div part="'+part+'" id="stream-month-0-mobile" part="month-title" class="title-item '+part+' mr-10">Past Week</div>';

      part = "";
      if(index === 1) {
        part = "stream-month-selected";
      } else {
        part = "stream-month-not-selected";
      }
      html += '<div part="'+part+'" id="stream-month-1-mobile" part="month-title" class="title-item '+part+' mr-10">Past Month</div>';

    html += '</div>';

    html += '<div class="d-flex w-100">';
      html += '<div class="calendar-left-col desktop-only flex-col">';

        var part = "";
        if(index === 0) {
          part = "stream-month-selected";
        } else {
          part = "stream-month-not-selected";
        }
        html += '<div part="'+part+'" id="stream-month-0" part="month-title" class="title-item '+part+'">Past Week</div>';

        part = "";
        if(index === 1) {
          part = "stream-month-selected";
        } else {
          part = "stream-month-not-selected";
        }
        html += '<div part="'+part+'" id="stream-month-1" part="month-title" class="title-item '+part+'">Past Month</div>';

      html += '</div>';


      html += '<div class="calendar-right-data flex-grow">';

      // var startDate = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + this.calendarStartYYYY);
      var startDate = new Date();
      html += this.renderPastEvents(index, startDate);
      startDate.setDate(startDate.getDate() + 1);
        
      html += '</div>';
    html += '</div>';

    (this._SfPastContainer as HTMLDivElement).innerHTML = html;

    const radioCompleteness = (this._SfPastContainer as HTMLDivElement).querySelector('#radio-completeness') as HTMLButtonElement;
    radioCompleteness?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_COMPLETENESS;
      this.renderPast(index);
      this.renderCompletenessGraph((this._SfPastContainer as HTMLDivElement));
      
    });

    const radioTimeliness = (this._SfPastContainer as HTMLDivElement).querySelector('#radio-timeliness') as HTMLButtonElement;
    radioTimeliness?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_TIMELINESS;
      this.renderPast(index);
      this.renderTimelinessGraph((this._SfPastContainer as HTMLDivElement))
      
    });

    const radioRisk = (this._SfPastContainer as HTMLDivElement).querySelector('#radio-risk') as HTMLButtonElement;
    radioRisk?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_RISKAREAS;
      this.renderPast(index);
      this.renderRiskGraph((this._SfPastContainer as HTMLDivElement))
      
    });

    const radioRiskSeverity = (this._SfPastContainer as HTMLDivElement).querySelector('#radio-riskseverity') as HTMLButtonElement;
    radioRiskSeverity?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_RISKSEVERITY;
      this.renderPast(index);
      this.renderRiskSeverityGraph((this._SfPastContainer as HTMLDivElement))
      
    });

    const radioFunction = (this._SfPastContainer as HTMLDivElement).querySelector('#radio-function') as HTMLButtonElement;
    radioFunction?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_FUNCTION;
      this.renderPast(index);
      this.renderFunctionGraph((this._SfPastContainer as HTMLDivElement))
      
    });

    const radioObligationType = (this._SfPastContainer as HTMLDivElement).querySelector('#radio-obligationtype') as HTMLButtonElement;
    radioObligationType?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_OBLIGATIONTYPE;
      this.renderPast(index);
      this.renderObligationTypeGraph((this._SfPastContainer as HTMLDivElement))
      
    });

    const radioJurisdiction = (this._SfPastContainer as HTMLDivElement).querySelector('#radio-jurisdiction') as HTMLButtonElement;
    radioJurisdiction?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_JURISDICTION;
      this.renderPast(index);
      this.renderJurisdictionGraph((this._SfPastContainer as HTMLDivElement))
      
    });

    const radioFrequency = (this._SfPastContainer as HTMLDivElement).querySelector('#radio-frequency') as HTMLButtonElement;
    radioFrequency?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_FREQUENCY;
      this.renderPast(index);
      this.renderFrequencyGraph((this._SfPastContainer as HTMLDivElement))
      
    });

    const radioLocation = (this._SfPastContainer as HTMLDivElement).querySelector('#radio-location') as HTMLButtonElement;
    radioLocation?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_LOCATION;
      this.renderPast(index);
      this.renderLocationGraph((this._SfPastContainer as HTMLDivElement))
      
    });

    const buttonStatusMore = (this._SfPastContainer as HTMLDivElement).querySelector('#button-status-more');
    buttonStatusMore?.addEventListener('click', () => {

      const divStatusList = (this._SfPastContainer as HTMLDivElement).querySelectorAll('.late-statuses') as NodeListOf<HTMLDivElement>;
      for(var i = 0; i < divStatusList.length; i++) {
        divStatusList[i].style.display = 'flex';
      }
      (buttonStatusMore as HTMLButtonElement).style.display = 'none';

    });

    for(var i = 0; i < 3; i++) {
      (this._SfPastContainer as HTMLDivElement).querySelector('#stream-month-' + i)?.addEventListener('click', async (ev: any)=> {
        const target = parseInt((ev.target as HTMLDivElement).id.split('-')[2]);
        const dateResult = this.calculateStartAndEndDateOfPast(target);
        await this.fetchUserCalendar_2(dateResult.startDate, dateResult.endDate);
        console.log('clicked ', target);
        this.flowGraph = this.FLOW_GRAPH_COMPLETENESS;
        this.currentColumnIndex = target + "";
        this.renderPast(target);
      });
      (this._SfPastContainer as HTMLDivElement).querySelector('#stream-month-' + i + '-mobile')?.addEventListener('click', async (ev: any)=> {
        const target = parseInt((ev.target as HTMLDivElement).id.split('-')[2]);
        const dateResult = this.calculateStartAndEndDateOfPast(target);
        await this.fetchUserCalendar_2(dateResult.startDate, dateResult.endDate);
        console.log('clicked ', target);
        this.flowGraph = this.FLOW_GRAPH_COMPLETENESS;
        this.currentColumnIndex = target + "";
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

        let found = false;
        for(var k = 0; k < this.selectedItems.length; k++) {
          if(this.selectedItems[k].indexOf(idArr[3] + '-' + idArr[4] + '-' + idArr[5]) >= 0) {
            found = true;
          }
        }
        if(!found) {
          this.selectedItems = [];
          this.clearButtonSelection();
        }

        (this._SfDetailContainer as HTMLDivElement).style.display = 'block'

        this.renderEventDetail(this.events[mmdd][j], mmdd + "/" + ((new Date()).getFullYear() + ""), (this._SfPastContainer as HTMLDivElement).querySelector('#stream-month-'+this.currentColumnIndex) as HTMLButtonElement);
  
      })

    }

    const streamEventsContainer = (this._SfPastContainer as HTMLDivElement).querySelectorAll('.stream-events-container') as NodeListOf<HTMLDivElement>;
    const buttonSelect = (this._SfPastContainer as HTMLDivElement).querySelectorAll('.button-select') as NodeListOf<HTMLButtonElement>;

    for(i = 0; i < buttonSelect.length; i++) {

      buttonSelect[i].addEventListener('click', (ev: any) => {

        console.log('eventscontainer', streamEventsContainer.length, buttonSelect.length);

        const id = ev.target.id;
        const idArr = id.split("-")
        // const mmdd = idArr[2] + "/" + idArr[3];
        // const j = idArr[4];
        // const makercheckers = idArr[5];
        const docs = idArr[6];

        if((ev.target as HTMLInputElement).checked) {
          this.selectedItems.push(id);
        } else {
          this.selectedItems.splice(this.selectedItems.indexOf(id), 1);
        }

        if(this.selectedItems.length === 0) {

          for(var k = 0; k < buttonSelect.length; k++) {

            (buttonSelect[k] as HTMLInputElement).style.display = 'block';
            (streamEventsContainer[k] as HTMLDivElement).style.display = 'block';
  
          }

        } else {

          if(this.selectedItems.length === 1) {

            const id1 = id;
            const idArr1 = id1.split("-")
            const status = idArr1[13].replace(/_/g, '-');
            this.selectedStatus = status;

          }

          for(var k = 0; k < buttonSelect.length; k++) {

            const id1 = buttonSelect[k].id;
            const idArr1 = id1.split("-")
            const docs1 = idArr1[6];
            const status = idArr1[13].replace(/_/g, '-');
  
            if(docs == docs1 && status == this.selectedStatus) {
            } else {
              (buttonSelect[k] as HTMLInputElement).style.display = 'none';
              (streamEventsContainer[k] as HTMLDivElement).style.display = 'none';
            }
  
          }  
          

        }

        // (this._SfDetailContainer as HTMLDivElement).style.display = 'block'

        // this.renderEventDetail(this.events[mmdd][j], mmdd + "/" + ((new Date()).getFullYear() + ""));
  
      })

    }

    this.renderCompletenessGraph((this._SfPastContainer as HTMLDivElement));

  }

  renderUpcoming = (index: number = 0) => {

    this.clearGraphData();

    var html = '';

    html += '<div class="scroll-x w-100 mobile-only">';

      var part = "";
      if(index === 0) {
        part = "stream-month-selected";
      } else {
        part = "stream-month-not-selected";
      }
      html += '<div part="'+part+'" id="stream-month-0-mobile" part="month-title" class="title-item '+part+' mr-10">7 Days</div>';

      part = "";
      if(index === 1) {
        part = "stream-month-selected";
      } else {
        part = "stream-month-not-selected";
      }
      html += '<div part="'+part+'" id="stream-month-1-mobile" part="month-title" class="title-item '+part+' mr-10">30 Days</div>';

      part = "";
      if(index === 2) {
        part = "stream-month-selected";
      } else {
        part = "stream-month-not-selected";
      }
      html += '<div part="'+part+'" id="stream-month-2-mobile" part="month-title" class="title-item '+part+' mr-10">90 Days</div>';

    html += '</div>';


    html += '<div class="d-flex w-100">';
      html += '<div class="calendar-left-col desktop-only flex-col">';

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

      html += '<div class="calendar-right-data flex-grow">';

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

    const radioCompleteness = (this._SfUpcomingContainer as HTMLDivElement).querySelector('#radio-completeness') as HTMLButtonElement;
    radioCompleteness?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_COMPLETENESS;
      this.renderUpcoming(index);
      this.renderCompletenessGraph((this._SfUpcomingContainer as HTMLDivElement));
      
    });

    const radioTimeliness = (this._SfUpcomingContainer as HTMLDivElement).querySelector('#radio-timeliness') as HTMLButtonElement;
    radioTimeliness?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_TIMELINESS;
      this.renderUpcoming(index);
      this.renderTimelinessGraph((this._SfUpcomingContainer as HTMLDivElement))
      
    });

    const radioRisk = (this._SfUpcomingContainer as HTMLDivElement).querySelector('#radio-risk') as HTMLButtonElement;
    radioRisk?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_RISKAREAS;
      this.renderUpcoming(index);
      this.renderRiskGraph((this._SfUpcomingContainer as HTMLDivElement))
      
    });

    const radioFunction = (this._SfUpcomingContainer as HTMLDivElement).querySelector('#radio-function') as HTMLButtonElement;
    radioFunction?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_FUNCTION;
      this.renderUpcoming(index);
      this.renderFunctionGraph((this._SfUpcomingContainer as HTMLDivElement))
      
    });


    const radioRiskSeverity = (this._SfUpcomingContainer as HTMLDivElement).querySelector('#radio-riskseverity') as HTMLButtonElement;
    radioRiskSeverity?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_RISKSEVERITY;
      this.renderUpcoming(index);
      this.renderRiskSeverityGraph((this._SfUpcomingContainer as HTMLDivElement))
      
    });

    const radioObligationType = (this._SfUpcomingContainer as HTMLDivElement).querySelector('#radio-obligationtype') as HTMLButtonElement;
    radioObligationType?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_OBLIGATIONTYPE;
      this.renderUpcoming(index);
      this.renderObligationTypeGraph((this._SfUpcomingContainer as HTMLDivElement))
      
    });

    const radioJurisdiction = (this._SfUpcomingContainer as HTMLDivElement).querySelector('#radio-jurisdiction') as HTMLButtonElement;
    radioJurisdiction?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_JURISDICTION;
      this.renderUpcoming(index);
      this.renderJurisdictionGraph((this._SfUpcomingContainer as HTMLDivElement))
      
    });

    const radioFrequency = (this._SfUpcomingContainer as HTMLDivElement).querySelector('#radio-frequency') as HTMLButtonElement;
    radioFrequency?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_FREQUENCY;
      this.renderUpcoming(index);
      this.renderFrequencyGraph((this._SfUpcomingContainer as HTMLDivElement))
      
    });


    const radioLocation = (this._SfUpcomingContainer as HTMLDivElement).querySelector('#radio-location') as HTMLButtonElement;
    radioLocation?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_LOCATION;
      this.renderUpcoming(index);
      this.renderLocationGraph((this._SfUpcomingContainer as HTMLDivElement))
      
    });

    const buttonStatusMore = (this._SfUpcomingContainer as HTMLDivElement).querySelector('#button-status-more');
    buttonStatusMore?.addEventListener('click', () => {

      const divStatusList = (this._SfUpcomingContainer as HTMLDivElement).querySelectorAll('.late-statuses') as NodeListOf<HTMLDivElement>;
      for(var i = 0; i < divStatusList.length; i++) {
        divStatusList[i].style.display = 'flex';
      }
      (buttonStatusMore as HTMLButtonElement).style.display = 'none';

    });

    for(var i = 0; i < 3; i++) {
      (this._SfUpcomingContainer as HTMLDivElement).querySelector('#stream-month-' + i)?.addEventListener('click', async (ev: any)=> {
        const target = parseInt((ev.target as HTMLDivElement).id.split('-')[2]);

        const dateResult = this.calculateStartAndEndDateOfUpcoming(target);
        await this.fetchUserCalendar_2(dateResult.startDate, dateResult.endDate);

        console.log('clicked ', target);
        this.flowGraph = this.FLOW_GRAPH_COMPLETENESS;
        this.currentColumnIndex = target + "";
        this.renderUpcoming(target);

      });

      (this._SfUpcomingContainer as HTMLDivElement).querySelector('#stream-month-' + i + '-mobile')?.addEventListener('click', async (ev: any)=> {
        const target = parseInt((ev.target as HTMLDivElement).id.split('-')[2]);

        const dateResult = this.calculateStartAndEndDateOfUpcoming(target);
        await this.fetchUserCalendar_2(dateResult.startDate, dateResult.endDate);

        console.log('clicked ', target);
        this.flowGraph = this.FLOW_GRAPH_COMPLETENESS;
        this.currentColumnIndex = target + "";
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

        let found = false;
        for(var k = 0; k < this.selectedItems.length; k++) {
          if(this.selectedItems[k].indexOf(idArr[3] + '-' + idArr[4] + '-' + idArr[5]) >= 0) {
            found = true;
          }
        }
        if(!found) {
          this.selectedItems = [];
          this.clearButtonSelection();
        }

        (this._SfDetailContainer as HTMLDivElement).style.display = 'block'

        this.renderEventDetail(this.events[mmdd][j], mmdd + "/" + ((new Date()).getFullYear() + ""), (this._SfUpcomingContainer as HTMLDivElement).querySelector('#stream-month-'+this.currentColumnIndex) as HTMLButtonElement);
  
      })

    }

    const streamEventsContainer = (this._SfUpcomingContainer as HTMLDivElement).querySelectorAll('.stream-events-container') as NodeListOf<HTMLDivElement>;
    const buttonSelect = (this._SfUpcomingContainer as HTMLDivElement).querySelectorAll('.button-select') as NodeListOf<HTMLButtonElement>;

    for(i = 0; i < buttonSelect.length; i++) {

      buttonSelect[i].addEventListener('click', (ev: any) => {

        console.log('eventscontainer', streamEventsContainer.length, buttonSelect.length);

        const id = ev.target.id;
        const idArr = id.split("-")
        // const mmdd = idArr[2] + "/" + idArr[3];
        // const j = idArr[4];
        // const makercheckers = idArr[5];
        const docs = idArr[6];

        if((ev.target as HTMLInputElement).checked) {
          this.selectedItems.push(id);
        } else {
          this.selectedItems.splice(this.selectedItems.indexOf(id), 1);
        }

        if(this.selectedItems.length === 0) {

          for(var k = 0; k < buttonSelect.length; k++) {

            (buttonSelect[k] as HTMLInputElement).style.display = 'block';
            (streamEventsContainer[k] as HTMLDivElement).style.display = 'block';
  
          }

        } else {

          if(this.selectedItems.length === 1) {

            const id1 = id;
            const idArr1 = id1.split("-")
            const status = idArr1[13].replace(/_/g, '-');
            this.selectedStatus = status;

          }

          for(var k = 0; k < buttonSelect.length; k++) {

            const id1 = buttonSelect[k].id;
            const idArr1 = id1.split("-")
            const docs1 = idArr1[6];
            const status = idArr1[13].replace(/_/g, '-');
  
            if(docs == docs1 && status == this.selectedStatus) {
            } else {
              (buttonSelect[k] as HTMLInputElement).style.display = 'none';
              (streamEventsContainer[k] as HTMLDivElement).style.display = 'none';
            }
  
          }  
          

        }

        // (this._SfDetailContainer as HTMLDivElement).style.display = 'block'

        // this.renderEventDetail(this.events[mmdd][j], mmdd + "/" + ((new Date()).getFullYear() + ""));
  
      })

    }
    
    this.renderCompletenessGraph((this._SfUpcomingContainer as HTMLDivElement));

  }

  renderThis = (index: number = 0) => {

    this.clearGraphData();

    var html = '';

    html += '<div class="scroll-x w-100 mobile-only">';

      var part = "";
      if(index === 0) {
        part = "stream-month-selected";
      } else {
        part = "stream-month-not-selected";
      }
      html += '<div part="'+part+'" id="stream-month-0-mobile" part="month-title" class="title-item '+part+' mr-10">Current Week</div>';

      part = "";
      if(index === 1) {
        part = "stream-month-selected";
      } else {
        part = "stream-month-not-selected";
      }
      html += '<div part="'+part+'" id="stream-month-1-mobile" part="month-title" class="title-item '+part+'">Current Month</div>';

    html += '</div>';

    html += '<div class="d-flex w-100">';
      html += '<div class="calendar-left-col desktop-only flex-col">';

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


      html += '<div class="calendar-right-data flex-grow">';

      // var startDate = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + this.calendarStartYYYY);
      var startDate = new Date();
      html += this.renderThisEvents(index, startDate);
      startDate.setDate(startDate.getDate() + 1);
        
      html += '</div>';
    html += '</div>';

    (this._SfThisContainer as HTMLDivElement).innerHTML = html;

    const radioCompleteness = (this._SfThisContainer as HTMLDivElement).querySelector('#radio-completeness') as HTMLButtonElement;
    radioCompleteness?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_COMPLETENESS;
      this.renderThis(index);
      this.renderCompletenessGraph((this._SfThisContainer as HTMLDivElement));
      
    });

    const radioTimeliness = (this._SfThisContainer as HTMLDivElement).querySelector('#radio-timeliness') as HTMLButtonElement;
    radioTimeliness?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_TIMELINESS;
      this.renderThis(index);
      this.renderTimelinessGraph((this._SfThisContainer as HTMLDivElement))
      
    });

    const radioRisk = (this._SfThisContainer as HTMLDivElement).querySelector('#radio-risk') as HTMLButtonElement;
    radioRisk?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_RISKAREAS;
      this.renderThis(index);
      this.renderRiskGraph((this._SfThisContainer as HTMLDivElement))
      
    });


    const radioFunction = (this._SfThisContainer as HTMLDivElement).querySelector('#radio-function') as HTMLButtonElement;
    radioFunction?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_FUNCTION;
      this.renderThis(index);
      this.renderFunctionGraph((this._SfThisContainer as HTMLDivElement))
      
    });

    const radioRiskSeverity = (this._SfThisContainer as HTMLDivElement).querySelector('#radio-riskseverity') as HTMLButtonElement;
    radioRiskSeverity?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_RISKSEVERITY;
      this.renderThis(index);
      this.renderRiskSeverityGraph((this._SfThisContainer as HTMLDivElement))
      
    });

    const radioObligationType = (this._SfThisContainer as HTMLDivElement).querySelector('#radio-obligationtype') as HTMLButtonElement;
    radioObligationType?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_OBLIGATIONTYPE;
      this.renderThis(index);
      this.renderObligationTypeGraph((this._SfThisContainer as HTMLDivElement))
      
    });

    const radioJurisdiction = (this._SfThisContainer as HTMLDivElement).querySelector('#radio-jurisdiction') as HTMLButtonElement;
    radioJurisdiction?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_JURISDICTION;
      this.renderThis(index);
      this.renderJurisdictionGraph((this._SfThisContainer as HTMLDivElement))
      
    });

    const radioFrequency = (this._SfThisContainer as HTMLDivElement).querySelector('#radio-frequency') as HTMLButtonElement;
    radioFrequency?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_FREQUENCY;
      this.renderThis(index);
      this.renderFrequencyGraph((this._SfThisContainer as HTMLDivElement))
      
    });

    const radioLocation = (this._SfThisContainer as HTMLDivElement).querySelector('#radio-location') as HTMLButtonElement;
    radioLocation?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_LOCATION;
      this.renderThis(index);
      this.renderLocationGraph((this._SfThisContainer as HTMLDivElement))
      
    });

    const buttonStatusMore = (this._SfThisContainer as HTMLDivElement).querySelector('#button-status-more');
    buttonStatusMore?.addEventListener('click', () => {

      const divStatusList = (this._SfThisContainer as HTMLDivElement).querySelectorAll('.late-statuses') as NodeListOf<HTMLDivElement>;
      for(var i = 0; i < divStatusList.length; i++) {
        divStatusList[i].style.display = 'flex';
      }
      (buttonStatusMore as HTMLButtonElement).style.display = 'none';

    });

    for(var i = 0; i < 3; i++) {
      (this._SfThisContainer as HTMLDivElement).querySelector('#stream-month-' + i)?.addEventListener('click', async (ev: any)=> {
        const target = parseInt((ev.target as HTMLDivElement).id.split('-')[2]);
        console.log('clicked ', target);
        const dateResult = this.calculateStartAndEndDateOfThis(target);
        await this.fetchUserCalendar_2(dateResult.startDate, dateResult.endDate);
        this.flowGraph = this.FLOW_GRAPH_COMPLETENESS;
        this.currentColumnIndex = target + "";
        this.renderThis(target);
      });

      (this._SfThisContainer as HTMLDivElement).querySelector('#stream-month-' + i + '-mobile')?.addEventListener('click', async (ev: any)=> {
        const target = parseInt((ev.target as HTMLDivElement).id.split('-')[2]);
        console.log('clicked ', target);
        const dateResult = this.calculateStartAndEndDateOfThis(target);
        await this.fetchUserCalendar_2(dateResult.startDate, dateResult.endDate);
        this.flowGraph = this.FLOW_GRAPH_COMPLETENESS;
        this.currentColumnIndex = target + "";
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

        let found = false;
        for(var k = 0; k < this.selectedItems.length; k++) {
          if(this.selectedItems[k].indexOf(idArr[3] + '-' + idArr[4] + '-' + idArr[5]) >= 0) {
            found = true;
          }
        }
        if(!found) {
          this.selectedItems = [];
          this.clearButtonSelection();
        }

        (this._SfDetailContainer as HTMLDivElement).style.display = 'block'

        this.renderEventDetail(this.events[mmdd][j], mmdd + "/" + ((new Date()).getFullYear() + ""), (this._SfThisContainer as HTMLDivElement).querySelector('#stream-month-'+this.currentColumnIndex) as HTMLButtonElement);
  
      })

    }

    const streamEventsContainer = (this._SfThisContainer as HTMLDivElement).querySelectorAll('.stream-events-container') as NodeListOf<HTMLDivElement>;
    const buttonSelect = (this._SfThisContainer as HTMLDivElement).querySelectorAll('.button-select') as NodeListOf<HTMLButtonElement>;

    for(i = 0; i < buttonSelect.length; i++) {

      buttonSelect[i].addEventListener('click', (ev: any) => {

        console.log('eventscontainer', streamEventsContainer.length, buttonSelect.length);

        const id = ev.target.id;
        const idArr = id.split("-")
        // const mmdd = idArr[2] + "/" + idArr[3];
        // const j = idArr[4];
        // const makercheckers = idArr[5];
        const docs = idArr[6];

        if((ev.target as HTMLInputElement).checked) {
          this.selectedItems.push(id);
        } else {
          this.selectedItems.splice(this.selectedItems.indexOf(id), 1);
        }

        if(this.selectedItems.length === 0) {

          for(var k = 0; k < buttonSelect.length; k++) {

            (buttonSelect[k] as HTMLInputElement).style.display = 'block';
            (streamEventsContainer[k] as HTMLDivElement).style.display = 'block';
  
          }

        } else {

          if(this.selectedItems.length === 1) {

            const id1 = id;
            const idArr1 = id1.split("-")
            const status = idArr1[13].replace(/_/g, '-');
            this.selectedStatus = status;

          }

          for(var k = 0; k < buttonSelect.length; k++) {

            const id1 = buttonSelect[k].id;
            const idArr1 = id1.split("-")
            const docs1 = idArr1[6];
            const status = idArr1[13].replace(/_/g, '-');
  
            if(docs == docs1 && status == this.selectedStatus) {
            } else {
              (buttonSelect[k] as HTMLInputElement).style.display = 'none';
              (streamEventsContainer[k] as HTMLDivElement).style.display = 'none';
            }
  
          }  
          

        }

        // (this._SfDetailContainer as HTMLDivElement).style.display = 'block'

        // this.renderEventDetail(this.events[mmdd][j], mmdd + "/" + ((new Date()).getFullYear() + ""));
  
      })

    }


    this.renderCompletenessGraph((this._SfThisContainer as HTMLDivElement));
    
  }

  renderStream = (index: number = 0) => {

    this.clearGraphData();

    var startDate = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + this.calendarStartYYYY);

    var html = '';

    html += '<div class="scroll-x w-100 mobile-only">';

      for(var i = 0; i < 12; i++) {

        var part = "";

          if(i === index) {
            part = "stream-month-selected";
          } else {
            part = "stream-month-not-selected";
          }

          html += '<div part="'+part+'" id="stream-month-'+i+'-mobile" part="month-title" class="title-item '+part+' mr-10">' + this.monthNames[startDate.getMonth()] + '&nbsp;' + startDate.getFullYear()%100 + '</div>';
          startDate.setMonth(startDate.getMonth() + 1);

      }

    html += '</div>';

    html += '<div class="d-flex w-100">';
      html += '<div class="calendar-left-col desktop-only flex-col">';

        var startDate = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + this.calendarStartYYYY);

        for(i = 0; i < 12; i++) {

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


    const radioCompleteness = (this._SfStreamContainer as HTMLDivElement).querySelector('#radio-completeness') as HTMLButtonElement;
    radioCompleteness?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_COMPLETENESS;
      this.renderStream(index);
      this.renderCompletenessGraph((this._SfStreamContainer as HTMLDivElement));
      
    });

    const radioTimeliness = (this._SfStreamContainer as HTMLDivElement).querySelector('#radio-timeliness') as HTMLButtonElement;
    radioTimeliness?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_TIMELINESS;
      this.renderStream(index);
      this.renderTimelinessGraph((this._SfStreamContainer as HTMLDivElement))
      
    });

    const radioRisk = (this._SfStreamContainer as HTMLDivElement).querySelector('#radio-risk') as HTMLButtonElement;
    radioRisk?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_RISKAREAS;
      this.renderStream(index);
      this.renderRiskGraph((this._SfStreamContainer as HTMLDivElement))
      
    });

    const radioRiskSeverity = (this._SfStreamContainer as HTMLDivElement).querySelector('#radio-riskseverity') as HTMLButtonElement;
    radioRiskSeverity?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_RISKSEVERITY;
      this.renderStream(index);
      this.renderRiskSeverityGraph((this._SfStreamContainer as HTMLDivElement))
      
    });

    const radioFunction = (this._SfStreamContainer as HTMLDivElement).querySelector('#radio-function') as HTMLButtonElement;
    radioFunction?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_FUNCTION;
      this.renderStream(index);
      this.renderFunctionGraph((this._SfStreamContainer as HTMLDivElement))
      
    });

    const radioObligationType = (this._SfStreamContainer as HTMLDivElement).querySelector('#radio-obligationtype') as HTMLButtonElement;
    radioObligationType?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_OBLIGATIONTYPE;
      this.renderStream(index);
      this.renderObligationTypeGraph((this._SfStreamContainer as HTMLDivElement))
      
    });

    const radioJurisdiction = (this._SfStreamContainer as HTMLDivElement).querySelector('#radio-jurisdiction') as HTMLButtonElement;
    radioJurisdiction?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_JURISDICTION;
      this.renderStream(index);
      this.renderJurisdictionGraph((this._SfStreamContainer as HTMLDivElement))
      
    });

    const radioFrequency = (this._SfStreamContainer as HTMLDivElement).querySelector('#radio-frequency') as HTMLButtonElement;
    radioFrequency?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_FREQUENCY;
      this.renderStream(index);
      this.renderFrequencyGraph((this._SfStreamContainer as HTMLDivElement))
      
    });

    const radioLocation = (this._SfStreamContainer as HTMLDivElement).querySelector('#radio-location') as HTMLButtonElement;
    radioLocation?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_LOCATION;
      this.renderStream(index);
      this.renderLocationGraph((this._SfStreamContainer as HTMLDivElement))
      
    });
    
    const buttonStatusMore = (this._SfStreamContainer as HTMLDivElement).querySelector('#button-status-more');
    buttonStatusMore?.addEventListener('click', () => {

      const divStatusList = (this._SfStreamContainer as HTMLDivElement).querySelectorAll('.late-statuses') as NodeListOf<HTMLDivElement>;
      for(var i = 0; i < divStatusList.length; i++) {
        divStatusList[i].style.display = 'flex';
      }
      (buttonStatusMore as HTMLButtonElement).style.display = 'none';

    });

    for(var i = 0; i < 12; i++) {
      (this._SfStreamContainer as HTMLDivElement).querySelector('#stream-month-' + i)?.addEventListener('click', async (ev: any)=> {

        const target = parseInt((ev.target as HTMLDivElement).id.split('-')[2]);
        const dateResult = this.calculateStartAndEndDateOfStream(target);
        console.log('dateresult', dateResult);
        if(dateResult != null) {
          await this.fetchUserCalendar_2(dateResult.startDate, dateResult.endDate);
        }
        this.flowGraph = this.FLOW_GRAPH_COMPLETENESS;
        this.currentColumnIndex = target + "";
        this.renderStream(target);


      });

      (this._SfStreamContainer as HTMLDivElement).querySelector('#stream-month-' + i+'-mobile')?.addEventListener('click', async (ev: any)=> {

        const target = parseInt((ev.target as HTMLDivElement).id.split('-')[2]);
        const dateResult = this.calculateStartAndEndDateOfStream(target);
        if(dateResult != null) {
          await this.fetchUserCalendar_2(dateResult.startDate, dateResult.endDate);
        }
        this.flowGraph = this.FLOW_GRAPH_COMPLETENESS;
        this.currentColumnIndex = target + "";
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

        let found = false;
        for(var k = 0; k < this.selectedItems.length; k++) {
          if(this.selectedItems[k].indexOf(idArr[3] + '-' + idArr[4] + '-' + idArr[5]) >= 0) {
            found = true;
          }
        }
        if(!found) {
          this.selectedItems = [];
          this.clearButtonSelection();
        }

        (this._SfDetailContainer as HTMLDivElement).style.display = 'block'

        ;
        this.renderEventDetail(this.events[mmdd][j], mmdd + "/" + ((new Date()).getFullYear() + ""), (this._SfStreamContainer as HTMLDivElement).querySelector('#stream-month-'+this.currentColumnIndex) as HTMLButtonElement);
  
      })

    }

    const streamEventsContainer = (this._SfStreamContainer as HTMLDivElement).querySelectorAll('.stream-events-container') as NodeListOf<HTMLDivElement>;
    const buttonSelect = (this._SfStreamContainer as HTMLDivElement).querySelectorAll('.button-select') as NodeListOf<HTMLButtonElement>;

    for(i = 0; i < buttonSelect.length; i++) {

      buttonSelect[i].addEventListener('click', (ev: any) => {

        console.log('eventscontainer', streamEventsContainer.length, buttonSelect.length);

        const id = ev.target.id;
        const idArr = id.split("-")
        // const mmdd = idArr[2] + "/" + idArr[3];
        // const j = idArr[4];
        // const makercheckers = idArr[5];
        const docs = idArr[6];

        if((ev.target as HTMLInputElement).checked) {
          this.selectedItems.push(id);
        } else {
          this.selectedItems.splice(this.selectedItems.indexOf(id), 1);
        }

        if(this.selectedItems.length === 0) {

          for(var k = 0; k < buttonSelect.length; k++) {

            (buttonSelect[k] as HTMLInputElement).style.display = 'block';
            (streamEventsContainer[k] as HTMLDivElement).style.display = 'block';
  
          }

        } else {

          if(this.selectedItems.length === 1) {

            const id1 = id;
            const idArr1 = id1.split("-")
            const status = idArr1[13].replace(/_/g, '-');
            this.selectedStatus = status;

          }

          for(var k = 0; k < buttonSelect.length; k++) {

            const id1 = buttonSelect[k].id;
            const idArr1 = id1.split("-")
            const docs1 = idArr1[6];
            const status = idArr1[13].replace(/_/g, '-');
  
            if(docs == docs1 && status == this.selectedStatus) {
            } else {
              (buttonSelect[k] as HTMLInputElement).style.display = 'none';
              (streamEventsContainer[k] as HTMLDivElement).style.display = 'none';
            }
  
          }  
          

        }

        // (this._SfDetailContainer as HTMLDivElement).style.display = 'block'

        // this.renderEventDetail(this.events[mmdd][j], mmdd + "/" + ((new Date()).getFullYear() + ""));
  
      })

    }

    this.renderCompletenessGraph((this._SfStreamContainer as HTMLDivElement));

  }

  clearButtonSelection = () => {

    const buttonSelect = (this._SfStreamContainer as HTMLDivElement).querySelectorAll('.button-select') as NodeListOf<HTMLButtonElement>;

    for(var i = 0; i < buttonSelect.length; i++) {

      (buttonSelect[i] as HTMLInputElement).checked = false;

    }

  }

  clearGraphData = () => {
    this.chart = null;
    this.chart2 = null;
    this.chart3 = null;
    this.riskAreasData = null;
    this.riskAreasPartStatusData = null;
    this.riskAreasLateStatusData = null;
    this.riskSeverityData = null;
    this.riskSeverityLateStatusData = null;
    this.riskSeverityPartStatusData = null;
    this.functionData = null;
    this.functionLateStatusData = null;
    this.functionPartStatusData = null;
    this.obligationTypeData = null;
    this.obligationTypeLateStatusData = null;
    this.obligationTypePartStatusData = null;
    this.jurisdictionData = null;
    this.jurisdictionPartStatusData = null;
    this.jurisdictionLateStatusData = null;
    this.frequencyData = null;
    this.frequencyLateStatusData = null;
    this.frequencyPartStatusData = null;
  }

  clearGraph = (divContainer: HTMLDivElement, index: number) => {

    if(index == 2) {

      (divContainer.querySelector('#myChart2') as HTMLCanvasElement).classList.add('gone');
      (divContainer.querySelector('#myChart2') as HTMLCanvasElement).parentElement!.style.height = '0px';
      if(this.chart2 != null) {
        (this.chart2 as Chart).destroy();
      }
      this.chart2 = null;

    }

    if(index == 3) {

      (divContainer.querySelector('#myChart3') as HTMLCanvasElement).classList.add('gone');
      (divContainer.querySelector('#myChart3') as HTMLCanvasElement).parentElement!.style.height = '0px';
      if(this.chart3 != null) {
        (this.chart3 as Chart).destroy();
      }
      this.chart3 = null;
      
    }

  }

  renderCompletenessGraph = (divContainer: HTMLDivElement) => {

    var dataApproved = (divContainer.querySelector('#graph-approved') as HTMLSpanElement).innerHTML;
    var dataNotStarted = (divContainer.querySelector('#graph-not-started') as HTMLSpanElement).innerHTML;
    var dataInProgress = (divContainer.querySelector('#graph-in-progress') as HTMLSpanElement).innerHTML;

    const ctx = divContainer.querySelector('#myChart') as ChartItem;
    this.clearGraph(divContainer, 2);
    this.clearGraph(divContainer, 3);


    if(this.fill == "pattern") {

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
      }

      this.renderChartSettings(divContainer, -1, ctx);
      this.renderChart(ctx, 'doughnut', data, "Completeness")

    }

    if(this.fill == "solid") {

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
      }

      this.renderChartSettings(divContainer, -1, ctx);
      this.renderChart(ctx, 'doughnut', data, "Completeness")

    }

  }

  renderTimelinessGraph = (divContainer: HTMLDivElement) => {


    var dataTotal = (divContainer.querySelector('#graph-total') as HTMLSpanElement).innerHTML;
    var dataPastDueDate = (divContainer.querySelector('#graph-past-due-date') as HTMLSpanElement).innerHTML;
    var dataLateApproved = (divContainer.querySelector('#graph-late-approved') as HTMLSpanElement).innerHTML;
    var dataLateExecuted = (divContainer.querySelector('#graph-late-executed') as HTMLSpanElement).innerHTML;

    const ctx = divContainer.querySelector('#myChart') as ChartItem;
    this.clearGraph(divContainer, 2);
    this.clearGraph(divContainer, 3);

    if(this.fill == "pattern") {

      const data = {
        labels: ['In Time', 'Past Due Date', 'Late Approved', 'Late Executed'],
        datasets: [{
          label: 'Compliances',
          data: [(parseInt(dataTotal) - (parseInt(dataPastDueDate)+parseInt(dataLateApproved)+parseInt(dataLateExecuted))) + "", dataPastDueDate, dataLateApproved, dataLateExecuted],
          borderWidth: 1,
          backgroundColor: [
            Util.createDiagonalPattern3(this.COLOR_NOT_STARTED),
            Util.createDiagonalPattern3(this.COLOR_PAST_DUE_DATE),
            Util.createDiagonalPattern2(this.COLOR_LATE_APPROVED),
            Util.createDiagonalPattern1(this.COLOR_LATE_EXECUTED)
          ]
        }]
      }

      this.renderChartSettings(divContainer, -1, ctx);
      this.renderChart(ctx, 'doughnut', data, "Timeliness")

    }

    if(this.fill == "solid") {

      const data = {
        labels: ['In Time', 'Past Due Date', 'Late Approved', 'Late Executed'],
        datasets: [{
          label: 'Compliances',
          data: [(parseInt(dataTotal) - (parseInt(dataPastDueDate)+parseInt(dataLateApproved)+parseInt(dataLateExecuted))) + "", dataPastDueDate, dataLateApproved, dataLateExecuted],
          borderWidth: 1,
          backgroundColor: [
            this.COLOR_NOT_STARTED,
            this.COLOR_PAST_DUE_DATE,
            this.COLOR_LATE_APPROVED,
            this.COLOR_LATE_EXECUTED
          ]
        }]
      }

      this.renderChartSettings(divContainer, -1, ctx);
      this.renderChart(ctx, 'doughnut', data, "Timeliness")

    }

  }

  renderRiskSeverityGraph = (divContainer: HTMLDivElement) => {

    if(this.riskSeverityData == null) return;

    const data:any = {};
    data['labels'] = [];
    data['datasets'] = [];
    data['datasets'].push({});
    data['datasets'][0]['data'] = [];
    data['datasets'][0]['backgroundColor'] = [];
    data['datasets'][0]['borderWidth'] = 1;
    for(var i = 0; i < Object.keys(this.riskSeverityData).length; i++) {
      data['labels'].push(Object.keys(this.riskSeverityData)[i]);
    }
    for(var i = 0; i < Object.keys(this.riskSeverityData).length; i++) {
      data['datasets'][0]['data'].push(this.riskSeverityData[Object.keys(this.riskSeverityData)[i]]);
      data['datasets'][0]['backgroundColor'].push(Util.getRandomColor());
    }

    // var dataTotal = (divContainer.querySelector('#graph-total') as HTMLSpanElement).innerHTML;
    // var dataPastDueDate = (divContainer.querySelector('#graph-past-due-date') as HTMLSpanElement).innerHTML;
    // var dataLateApproved = (divContainer.querySelector('#graph-late-approved') as HTMLSpanElement).innerHTML;
    // var dataLateExecuted = (divContainer.querySelector('#graph-late-executed') as HTMLSpanElement).innerHTML;

    const ctx = divContainer.querySelector('#myChart') as ChartItem;
    // (divContainer.querySelector('#myChart') as HTMLCanvasElement).style.maxWidth = '400px';
    // (divContainer.querySelector('#myChart') as HTMLCanvasElement).style.maxHeight = '400px';

    if(this.fill == "pattern") {

      this.renderChartSettings(divContainer, -1, ctx);
      this.renderChart(ctx, 'pie', data, "Risk Severity Distribution")

    }

    if(this.fill == "solid") {

      this.renderChartSettings(divContainer, -1, ctx);
      this.renderChart(ctx, 'pie', data, "Risk Severity Distribution")

    }


    // 2

    const dataBar:any = {};

    dataBar['labels'] = [];
    for(i = 0; i < Object.keys(this.riskSeverityPartStatusData).length; i++) {
      dataBar['labels'].push(this.formatLabel(Object.keys(this.riskSeverityPartStatusData)[i], 15));
    }
    dataBar['datasets'] = [];
    dataBar['datasets'].push({});
    dataBar['datasets'].push({});
    dataBar['datasets'].push({});

    dataBar['datasets'][0]['label'] = 'Approved';
    dataBar['datasets'][0]['data'] = [];
    for(i = 0; i < Object.keys(this.riskSeverityPartStatusData).length; i++) {
      dataBar['datasets'][0]['data'].push(this.riskSeverityPartStatusData[Object.keys(this.riskSeverityPartStatusData)[i]]['status-approved']);
    }
    dataBar['datasets'][0]['backgroundColor'] = '#8cd039';

    dataBar['datasets'][1]['label'] = 'In Progress';
    dataBar['datasets'][1]['data'] = [];
    for(i = 0; i < Object.keys(this.riskSeverityPartStatusData).length; i++) {
      dataBar['datasets'][1]['data'].push(this.riskSeverityPartStatusData[Object.keys(this.riskSeverityPartStatusData)[i]]['status-in-progress']);
    }
    dataBar['datasets'][1]['backgroundColor'] = '#FFBA49';

    dataBar['datasets'][2]['label'] = 'Not Started';
    dataBar['datasets'][2]['data'] = [];
    for(i = 0; i < Object.keys(this.riskSeverityPartStatusData).length; i++) {
      dataBar['datasets'][2]['data'].push(this.riskSeverityPartStatusData[Object.keys(this.riskSeverityPartStatusData)[i]]['status-not-started']);
    }
    dataBar['datasets'][2]['backgroundColor'] = '#A4A9AD';

    const ctx2 = divContainer.querySelector('#myChart2') as ChartItem;
    (divContainer.querySelector('#myChart2') as HTMLCanvasElement).classList.remove('gone');
    
    console.log('databar', dataBar);

    if(this.fill == "solid") {

      this.renderChart2(ctx2, 'bar', dataBar, "Risk Severity vs Completeness")

    } else {

      this.renderChart2(ctx2, 'bar', dataBar, "Risk Severity vs Completeness")

    }

    // 3

    const dataBar2:any = {};

    dataBar2['labels'] = [];
    for(i = 0; i < Object.keys(this.riskSeverityLateStatusData).length; i++) {
      dataBar2['labels'].push(this.formatLabel(Object.keys(this.riskSeverityLateStatusData)[i], 15));
    }
    dataBar2['datasets'] = [];
    dataBar2['datasets'].push({});
    dataBar2['datasets'].push({});
    dataBar2['datasets'].push({});
    dataBar2['datasets'].push({});

    dataBar2['datasets'][0]['label'] = 'In Time';
    dataBar2['datasets'][0]['data'] = [];
    for(i = 0; i < Object.keys(this.riskSeverityLateStatusData).length; i++) {
      dataBar2['datasets'][0]['data'].push(this.riskSeverityLateStatusData[Object.keys(this.riskSeverityLateStatusData)[i]]['in-time']);
    }
    dataBar2['datasets'][0]['backgroundColor'] = '#888888';

    dataBar2['datasets'][1]['label'] = 'Past Due Date';
    dataBar2['datasets'][1]['data'] = [];
    for(i = 0; i < Object.keys(this.riskSeverityLateStatusData).length; i++) {
      dataBar2['datasets'][1]['data'].push(this.riskSeverityLateStatusData[Object.keys(this.riskSeverityLateStatusData)[i]]['past-due-date']);
    }
    dataBar2['datasets'][1]['backgroundColor'] = '#F79256';

    dataBar2['datasets'][2]['label'] = 'Late Executed';
    dataBar2['datasets'][2]['data'] = [];
    for(i = 0; i < Object.keys(this.riskSeverityLateStatusData).length; i++) {
      dataBar2['datasets'][2]['data'].push(this.riskSeverityLateStatusData[Object.keys(this.riskSeverityLateStatusData)[i]]['late-executed']);
    }
    dataBar2['datasets'][2]['backgroundColor'] = '#840B0F';

    dataBar2['datasets'][3]['label'] = 'Late Approved';
    dataBar2['datasets'][3]['data'] = [];
    for(i = 0; i < Object.keys(this.riskSeverityLateStatusData).length; i++) {
      dataBar2['datasets'][3]['data'].push(this.riskSeverityLateStatusData[Object.keys(this.riskSeverityLateStatusData)[i]]['late-approved']);
    }
    dataBar2['datasets'][3]['backgroundColor'] = '#EE2F36';

    const ctx3 = divContainer.querySelector('#myChart3') as ChartItem;
    (divContainer.querySelector('#myChart3') as HTMLCanvasElement).classList.remove('gone');
    
    console.log('databar', dataBar2);

    if(this.fill == "solid") {

      this.renderChart3(ctx3, 'bar', dataBar2, "Risk Severity vs Timeliness")

    } else {

      this.renderChart3(ctx3, 'bar', dataBar2, "Risk Severity vs Timeliness")

    }


  }

  renderObligationTypeGraph = (divContainer: HTMLDivElement) => {

    if(this.obligationTypeData == null) return;

    const data:any = {};
    data['labels'] = [];
    data['datasets'] = [];
    data['datasets'].push({});
    data['datasets'][0]['data'] = [];
    data['datasets'][0]['backgroundColor'] = [];
    data['datasets'][0]['borderWidth'] = 1;
    for(var i = 0; i < Object.keys(this.obligationTypeData).length; i++) {
      data['labels'].push(Object.keys(this.obligationTypeData)[i]);
    }
    for(var i = 0; i < Object.keys(this.obligationTypeData).length; i++) {
      data['datasets'][0]['data'].push(this.obligationTypeData[Object.keys(this.obligationTypeData)[i]]);
      data['datasets'][0]['backgroundColor'].push(Util.getRandomColor());
    }

    // var dataTotal = (divContainer.querySelector('#graph-total') as HTMLSpanElement).innerHTML;
    // var dataPastDueDate = (divContainer.querySelector('#graph-past-due-date') as HTMLSpanElement).innerHTML;
    // var dataLateApproved = (divContainer.querySelector('#graph-late-approved') as HTMLSpanElement).innerHTML;
    // var dataLateExecuted = (divContainer.querySelector('#graph-late-executed') as HTMLSpanElement).innerHTML;

    const ctx = divContainer.querySelector('#myChart') as ChartItem;
    // (divContainer.querySelector('#myChart') as HTMLCanvasElement).style.maxWidth = '400px';
    // (divContainer.querySelector('#myChart') as HTMLCanvasElement).style.maxHeight = '400px';

    if(this.fill == "pattern") {

      this.renderChartSettings(divContainer, -1, ctx);
      this.renderChart(ctx, 'pie', data, "Obligation Type Distribution")

    }

    if(this.fill == "solid") {

      this.renderChartSettings(divContainer, -1, ctx);
      this.renderChart(ctx, 'pie', data, "Obligation Type Distribution")

    }

    // 2

    const dataBar:any = {};

    dataBar['labels'] = [];
    for(i = 0; i < Object.keys(this.obligationTypePartStatusData).length; i++) {
      dataBar['labels'].push(this.formatLabel(Object.keys(this.obligationTypePartStatusData)[i], 15));
    }
    dataBar['datasets'] = [];
    dataBar['datasets'].push({});
    dataBar['datasets'].push({});
    dataBar['datasets'].push({});

    dataBar['datasets'][0]['label'] = 'Approved';
    dataBar['datasets'][0]['data'] = [];
    for(i = 0; i < Object.keys(this.obligationTypePartStatusData).length; i++) {
      dataBar['datasets'][0]['data'].push(this.obligationTypePartStatusData[Object.keys(this.obligationTypePartStatusData)[i]]['status-approved']);
    }
    dataBar['datasets'][0]['backgroundColor'] = '#8cd039';

    dataBar['datasets'][1]['label'] = 'In Progress';
    dataBar['datasets'][1]['data'] = [];
    for(i = 0; i < Object.keys(this.obligationTypePartStatusData).length; i++) {
      dataBar['datasets'][1]['data'].push(this.obligationTypePartStatusData[Object.keys(this.obligationTypePartStatusData)[i]]['status-in-progress']);
    }
    dataBar['datasets'][1]['backgroundColor'] = '#FFBA49';

    dataBar['datasets'][2]['label'] = 'Not Started';
    dataBar['datasets'][2]['data'] = [];
    for(i = 0; i < Object.keys(this.obligationTypePartStatusData).length; i++) {
      dataBar['datasets'][2]['data'].push(this.obligationTypePartStatusData[Object.keys(this.obligationTypePartStatusData)[i]]['status-not-started']);
    }
    dataBar['datasets'][2]['backgroundColor'] = '#A4A9AD';

    const ctx2 = divContainer.querySelector('#myChart2') as ChartItem;
    (divContainer.querySelector('#myChart2') as HTMLCanvasElement).classList.remove('gone');
    
    console.log('databar', dataBar);

    if(this.fill == "solid") {

      this.renderChart2(ctx2, 'bar', dataBar, "Obligation Type vs Completeness")

    } else {

      this.renderChart2(ctx2, 'bar', dataBar, "Obligation Type vs Completeness")

    }

    // 3

    const dataBar2:any = {};

    dataBar2['labels'] = [];
    for(i = 0; i < Object.keys(this.obligationTypeLateStatusData).length; i++) {
      dataBar2['labels'].push(this.formatLabel(Object.keys(this.obligationTypeLateStatusData)[i], 15));
    }
    dataBar2['datasets'] = [];
    dataBar2['datasets'].push({});
    dataBar2['datasets'].push({});
    dataBar2['datasets'].push({});
    dataBar2['datasets'].push({});

    dataBar2['datasets'][0]['label'] = 'In Time';
    dataBar2['datasets'][0]['data'] = [];
    for(i = 0; i < Object.keys(this.obligationTypeLateStatusData).length; i++) {
      dataBar2['datasets'][0]['data'].push(this.obligationTypeLateStatusData[Object.keys(this.obligationTypeLateStatusData)[i]]['in-time']);
    }
    dataBar2['datasets'][0]['backgroundColor'] = '#888888';

    dataBar2['datasets'][1]['label'] = 'Past Due Date';
    dataBar2['datasets'][1]['data'] = [];
    for(i = 0; i < Object.keys(this.obligationTypeLateStatusData).length; i++) {
      dataBar2['datasets'][1]['data'].push(this.obligationTypeLateStatusData[Object.keys(this.obligationTypeLateStatusData)[i]]['past-due-date']);
    }
    dataBar2['datasets'][1]['backgroundColor'] = '#F79256';

    dataBar2['datasets'][2]['label'] = 'Late Executed';
    dataBar2['datasets'][2]['data'] = [];
    for(i = 0; i < Object.keys(this.obligationTypeLateStatusData).length; i++) {
      dataBar2['datasets'][2]['data'].push(this.obligationTypeLateStatusData[Object.keys(this.obligationTypeLateStatusData)[i]]['late-executed']);
    }
    dataBar2['datasets'][2]['backgroundColor'] = '#840B0F';

    dataBar2['datasets'][3]['label'] = 'Late Approved';
    dataBar2['datasets'][3]['data'] = [];
    for(i = 0; i < Object.keys(this.obligationTypeLateStatusData).length; i++) {
      dataBar2['datasets'][3]['data'].push(this.obligationTypeLateStatusData[Object.keys(this.obligationTypeLateStatusData)[i]]['late-approved']);
    }
    dataBar2['datasets'][3]['backgroundColor'] = '#EE2F36';

    const ctx3 = divContainer.querySelector('#myChart3') as ChartItem;
    (divContainer.querySelector('#myChart3') as HTMLCanvasElement).classList.remove('gone');
    
    console.log('databar', dataBar2);

    if(this.fill == "solid") {

      this.renderChart3(ctx3, 'bar', dataBar2, "Obligation Type vs Timeliness")

    } else {

      this.renderChart3(ctx3, 'bar', dataBar2, "Obligation Type vs Timeliness")

    }

  }

  renderFunctionGraph = (divContainer: HTMLDivElement) => {

    if(this.functionData == null) return;

    const data:any = {};
    data['labels'] = [];
    data['datasets'] = [];
    data['datasets'].push({});
    data['datasets'][0]['data'] = [];
    data['datasets'][0]['backgroundColor'] = [];
    data['datasets'][0]['borderWidth'] = 1;
    for(var i = 0; i < Object.keys(this.functionData).length; i++) {
      data['labels'].push(Object.keys(this.functionData)[i]);
    }
    for(var i = 0; i < Object.keys(this.functionData).length; i++) {
      data['datasets'][0]['data'].push(this.functionData[Object.keys(this.functionData)[i]]);
      data['datasets'][0]['backgroundColor'].push(Util.getRandomColor());
    }

    // var dataTotal = (divContainer.querySelector('#graph-total') as HTMLSpanElement).innerHTML;
    // var dataPastDueDate = (divContainer.querySelector('#graph-past-due-date') as HTMLSpanElement).innerHTML;
    // var dataLateApproved = (divContainer.querySelector('#graph-late-approved') as HTMLSpanElement).innerHTML;
    // var dataLateExecuted = (divContainer.querySelector('#graph-late-executed') as HTMLSpanElement).innerHTML;

    const ctx = divContainer.querySelector('#myChart') as ChartItem;
    // (divContainer.querySelector('#myChart') as HTMLCanvasElement).style.maxWidth = '400px';
    // (divContainer.querySelector('#myChart') as HTMLCanvasElement).style.maxHeight = '400px';

    if(this.fill == "pattern") {

      this.renderChartSettings(divContainer, -1, ctx);
      this.renderChart(ctx, 'pie', data, "Function Distribution")

    }

    if(this.fill == "solid") {

      this.renderChartSettings(divContainer, -1, ctx);
      this.renderChart(ctx, 'pie', data, "Function Distribution")

    }

    // 2

    const dataBar:any = {};

    dataBar['labels'] = [];
    for(i = 0; i < Object.keys(this.functionPartStatusData).length; i++) {
      dataBar['labels'].push(this.formatLabel(Object.keys(this.functionPartStatusData)[i], 15));
    }
    dataBar['datasets'] = [];
    dataBar['datasets'].push({});
    dataBar['datasets'].push({});
    dataBar['datasets'].push({});

    dataBar['datasets'][0]['label'] = 'Approved';
    dataBar['datasets'][0]['data'] = [];
    for(i = 0; i < Object.keys(this.functionPartStatusData).length; i++) {
      dataBar['datasets'][0]['data'].push(this.functionPartStatusData[Object.keys(this.functionPartStatusData)[i]]['status-approved']);
    }
    dataBar['datasets'][0]['backgroundColor'] = '#8cd039';

    dataBar['datasets'][1]['label'] = 'In Progress';
    dataBar['datasets'][1]['data'] = [];
    for(i = 0; i < Object.keys(this.functionPartStatusData).length; i++) {
      dataBar['datasets'][1]['data'].push(this.functionPartStatusData[Object.keys(this.functionPartStatusData)[i]]['status-in-progress']);
    }
    dataBar['datasets'][1]['backgroundColor'] = '#FFBA49';

    dataBar['datasets'][2]['label'] = 'Not Started';
    dataBar['datasets'][2]['data'] = [];
    for(i = 0; i < Object.keys(this.functionPartStatusData).length; i++) {
      dataBar['datasets'][2]['data'].push(this.functionPartStatusData[Object.keys(this.functionPartStatusData)[i]]['status-not-started']);
    }
    dataBar['datasets'][2]['backgroundColor'] = '#A4A9AD';

    const ctx2 = divContainer.querySelector('#myChart2') as ChartItem;
    (divContainer.querySelector('#myChart2') as HTMLCanvasElement).classList.remove('gone');
    
    console.log('databar', dataBar);

    if(this.fill == "solid") {

      this.renderChart2(ctx2, 'bar', dataBar, "Function vs Completeness")

    } else {

      this.renderChart2(ctx2, 'bar', dataBar, "Function vs Completeness")

    }

    // 3

    const dataBar2:any = {};

    dataBar2['labels'] = [];
    for(i = 0; i < Object.keys(this.functionLateStatusData).length; i++) {
      dataBar2['labels'].push(this.formatLabel(Object.keys(this.functionLateStatusData)[i], 15));
    }
    dataBar2['datasets'] = [];
    dataBar2['datasets'].push({});
    dataBar2['datasets'].push({});
    dataBar2['datasets'].push({});
    dataBar2['datasets'].push({});

    dataBar2['datasets'][0]['label'] = 'In Time';
    dataBar2['datasets'][0]['data'] = [];
    for(i = 0; i < Object.keys(this.functionLateStatusData).length; i++) {
      dataBar2['datasets'][0]['data'].push(this.functionLateStatusData[Object.keys(this.functionLateStatusData)[i]]['in-time']);
    }
    dataBar2['datasets'][0]['backgroundColor'] = '#888888';

    dataBar2['datasets'][1]['label'] = 'Past Due Date';
    dataBar2['datasets'][1]['data'] = [];
    for(i = 0; i < Object.keys(this.functionLateStatusData).length; i++) {
      dataBar2['datasets'][1]['data'].push(this.functionLateStatusData[Object.keys(this.functionLateStatusData)[i]]['past-due-date']);
    }
    dataBar2['datasets'][1]['backgroundColor'] = '#F79256';

    dataBar2['datasets'][2]['label'] = 'Late Executed';
    dataBar2['datasets'][2]['data'] = [];
    for(i = 0; i < Object.keys(this.functionLateStatusData).length; i++) {
      dataBar2['datasets'][2]['data'].push(this.functionLateStatusData[Object.keys(this.functionLateStatusData)[i]]['late-executed']);
    }
    dataBar2['datasets'][2]['backgroundColor'] = '#840B0F';

    dataBar2['datasets'][3]['label'] = 'Late Approved';
    dataBar2['datasets'][3]['data'] = [];
    for(i = 0; i < Object.keys(this.functionLateStatusData).length; i++) {
      dataBar2['datasets'][3]['data'].push(this.functionLateStatusData[Object.keys(this.functionLateStatusData)[i]]['late-approved']);
    }
    dataBar2['datasets'][3]['backgroundColor'] = '#EE2F36';

    const ctx3 = divContainer.querySelector('#myChart3') as ChartItem;
    (divContainer.querySelector('#myChart3') as HTMLCanvasElement).classList.remove('gone');
    
    console.log('databar', dataBar2);

    if(this.fill == "solid") {

      this.renderChart3(ctx3, 'bar', dataBar2, "Function vs Timeliness")

    } else {

      this.renderChart3(ctx3, 'bar', dataBar2, "Function vs Timeliness")

    }

  }

  renderLocationGraph = (divContainer: HTMLDivElement) => {

    console.log('locationdata', this.locationData);

    if(this.locationData == null) return;

    const data:any = {};
    data['labels'] = [];
    data['datasets'] = [];
    data['datasets'].push({});
    data['datasets'][0]['data'] = [];
    data['datasets'][0]['backgroundColor'] = [];
    data['datasets'][0]['borderWidth'] = 1;
    for(var i = 0; i < Object.keys(this.locationData).length; i++) {
      data['labels'].push(Object.keys(this.locationData)[i]);
    }
    for(var i = 0; i < Object.keys(this.locationData).length; i++) {
      data['datasets'][0]['data'].push(this.locationData[Object.keys(this.locationData)[i]]);
      data['datasets'][0]['backgroundColor'].push(Util.getRandomColor());
    }

    // var dataTotal = (divContainer.querySelector('#graph-total') as HTMLSpanElement).innerHTML;
    // var dataPastDueDate = (divContainer.querySelector('#graph-past-due-date') as HTMLSpanElement).innerHTML;
    // var dataLateApproved = (divContainer.querySelector('#graph-late-approved') as HTMLSpanElement).innerHTML;
    // var dataLateExecuted = (divContainer.querySelector('#graph-late-executed') as HTMLSpanElement).innerHTML;

    const ctx = divContainer.querySelector('#myChart') as ChartItem;
    // (divContainer.querySelector('#myChart') as HTMLCanvasElement).style.maxWidth = '400px';
    // (divContainer.querySelector('#myChart') as HTMLCanvasElement).style.maxHeight = '400px';

    if(this.fill == "pattern") {

      this.renderChartSettings(divContainer, -1, ctx);
      this.renderChart(ctx, 'pie', data, "Location Distribution")

    }

    if(this.fill == "solid") {

      this.renderChartSettings(divContainer, -1, ctx);
      this.renderChart(ctx, 'pie', data, "Location Distribution")

    }

    // 2

    const dataBar:any = {};

    dataBar['labels'] = [];
    for(i = 0; i < Object.keys(this.locationPartStatusData).length; i++) {
      dataBar['labels'].push(this.formatLabel(Object.keys(this.locationPartStatusData)[i], 15));
    }
    dataBar['datasets'] = [];
    dataBar['datasets'].push({});
    dataBar['datasets'].push({});
    dataBar['datasets'].push({});

    dataBar['datasets'][0]['label'] = 'Approved';
    dataBar['datasets'][0]['data'] = [];
    for(i = 0; i < Object.keys(this.locationPartStatusData).length; i++) {
      dataBar['datasets'][0]['data'].push(this.locationPartStatusData[Object.keys(this.locationPartStatusData)[i]]['status-approved']);
    }
    dataBar['datasets'][0]['backgroundColor'] = '#8cd039';

    dataBar['datasets'][1]['label'] = 'In Progress';
    dataBar['datasets'][1]['data'] = [];
    for(i = 0; i < Object.keys(this.locationPartStatusData).length; i++) {
      dataBar['datasets'][1]['data'].push(this.locationPartStatusData[Object.keys(this.locationPartStatusData)[i]]['status-in-progress']);
    }
    dataBar['datasets'][1]['backgroundColor'] = '#FFBA49';

    dataBar['datasets'][2]['label'] = 'Not Started';
    dataBar['datasets'][2]['data'] = [];
    for(i = 0; i < Object.keys(this.locationPartStatusData).length; i++) {
      dataBar['datasets'][2]['data'].push(this.locationPartStatusData[Object.keys(this.locationPartStatusData)[i]]['status-not-started']);
    }
    dataBar['datasets'][2]['backgroundColor'] = '#A4A9AD';

    const ctx2 = divContainer.querySelector('#myChart2') as ChartItem;
    (divContainer.querySelector('#myChart2') as HTMLCanvasElement).classList.remove('gone');
    
    console.log('databar', dataBar);

    if(this.fill == "solid") {

      this.renderChart2(ctx2, 'bar', dataBar, "Location vs Completeness")

    } else {

      this.renderChart2(ctx2, 'bar', dataBar, "Location vs Completeness")

    }

    // 3

    const dataBar2:any = {};

    dataBar2['labels'] = [];
    for(i = 0; i < Object.keys(this.locationLateStatusData).length; i++) {
      dataBar2['labels'].push(this.formatLabel(Object.keys(this.locationLateStatusData)[i], 15));
    }
    dataBar2['datasets'] = [];
    dataBar2['datasets'].push({});
    dataBar2['datasets'].push({});
    dataBar2['datasets'].push({});
    dataBar2['datasets'].push({});

    dataBar2['datasets'][0]['label'] = 'In Time';
    dataBar2['datasets'][0]['data'] = [];
    for(i = 0; i < Object.keys(this.locationLateStatusData).length; i++) {
      dataBar2['datasets'][0]['data'].push(this.locationLateStatusData[Object.keys(this.locationLateStatusData)[i]]['in-time']);
    }
    dataBar2['datasets'][0]['backgroundColor'] = '#888888';

    dataBar2['datasets'][1]['label'] = 'Past Due Date';
    dataBar2['datasets'][1]['data'] = [];
    for(i = 0; i < Object.keys(this.locationLateStatusData).length; i++) {
      dataBar2['datasets'][1]['data'].push(this.locationLateStatusData[Object.keys(this.locationLateStatusData)[i]]['past-due-date']);
    }
    dataBar2['datasets'][1]['backgroundColor'] = '#F79256';

    dataBar2['datasets'][2]['label'] = 'Late Executed';
    dataBar2['datasets'][2]['data'] = [];
    for(i = 0; i < Object.keys(this.locationLateStatusData).length; i++) {
      dataBar2['datasets'][2]['data'].push(this.locationLateStatusData[Object.keys(this.locationLateStatusData)[i]]['late-executed']);
    }
    dataBar2['datasets'][2]['backgroundColor'] = '#840B0F';

    dataBar2['datasets'][3]['label'] = 'Late Approved';
    dataBar2['datasets'][3]['data'] = [];
    for(i = 0; i < Object.keys(this.locationLateStatusData).length; i++) {
      dataBar2['datasets'][3]['data'].push(this.locationLateStatusData[Object.keys(this.locationLateStatusData)[i]]['late-approved']);
    }
    dataBar2['datasets'][3]['backgroundColor'] = '#EE2F36';

    const ctx3 = divContainer.querySelector('#myChart3') as ChartItem;
    (divContainer.querySelector('#myChart3') as HTMLCanvasElement).classList.remove('gone');
    
    console.log('databar', dataBar2);

    if(this.fill == "solid") {

      this.renderChart3(ctx3, 'bar', dataBar2, "Location vs Timeliness")

    } else {

      this.renderChart3(ctx3, 'bar', dataBar2, "Location vs Timeliness")

    }

  }

  renderJurisdictionGraph = (divContainer: HTMLDivElement) => {

    if(this.jurisdictionData == null) return;

    const data:any = {};
    data['labels'] = [];
    data['datasets'] = [];
    data['datasets'].push({});
    data['datasets'][0]['data'] = [];
    data['datasets'][0]['backgroundColor'] = [];
    data['datasets'][0]['borderWidth'] = 1;
    for(var i = 0; i < Object.keys(this.jurisdictionData).length; i++) {
      data['labels'].push(Object.keys(this.jurisdictionData)[i]);
    }
    for(var i = 0; i < Object.keys(this.jurisdictionData).length; i++) {
      data['datasets'][0]['data'].push(this.jurisdictionData[Object.keys(this.jurisdictionData)[i]]);
      data['datasets'][0]['backgroundColor'].push(Util.getRandomColor());
    }

    // var dataTotal = (divContainer.querySelector('#graph-total') as HTMLSpanElement).innerHTML;
    // var dataPastDueDate = (divContainer.querySelector('#graph-past-due-date') as HTMLSpanElement).innerHTML;
    // var dataLateApproved = (divContainer.querySelector('#graph-late-approved') as HTMLSpanElement).innerHTML;
    // var dataLateExecuted = (divContainer.querySelector('#graph-late-executed') as HTMLSpanElement).innerHTML;

    const ctx = divContainer.querySelector('#myChart') as ChartItem;
    // (divContainer.querySelector('#myChart') as HTMLCanvasElement).style.maxWidth = '400px';
    // (divContainer.querySelector('#myChart') as HTMLCanvasElement).style.maxHeight = '400px';

    if(this.fill == "pattern") {

      this.renderChartSettings(divContainer, -1, ctx);
      this.renderChart(ctx, 'pie', data, "Jurisdiction Distribution")

    }

    if(this.fill == "solid") {

      this.renderChartSettings(divContainer, -1, ctx);
      this.renderChart(ctx, 'pie', data, "Jurisdiction Distribution")

    }

    // 2

    const dataBar:any = {};

    dataBar['labels'] = [];
    for(i = 0; i < Object.keys(this.jurisdictionPartStatusData).length; i++) {
      dataBar['labels'].push(this.formatLabel(Object.keys(this.jurisdictionPartStatusData)[i], 15));
    }
    dataBar['datasets'] = [];
    dataBar['datasets'].push({});
    dataBar['datasets'].push({});
    dataBar['datasets'].push({});

    dataBar['datasets'][0]['label'] = 'Approved';
    dataBar['datasets'][0]['data'] = [];
    for(i = 0; i < Object.keys(this.jurisdictionPartStatusData).length; i++) {
      dataBar['datasets'][0]['data'].push(this.jurisdictionPartStatusData[Object.keys(this.jurisdictionPartStatusData)[i]]['status-approved']);
    }
    dataBar['datasets'][0]['backgroundColor'] = '#8cd039';

    dataBar['datasets'][1]['label'] = 'In Progress';
    dataBar['datasets'][1]['data'] = [];
    for(i = 0; i < Object.keys(this.jurisdictionPartStatusData).length; i++) {
      dataBar['datasets'][1]['data'].push(this.jurisdictionPartStatusData[Object.keys(this.jurisdictionPartStatusData)[i]]['status-in-progress']);
    }
    dataBar['datasets'][1]['backgroundColor'] = '#FFBA49';

    dataBar['datasets'][2]['label'] = 'Not Started';
    dataBar['datasets'][2]['data'] = [];
    for(i = 0; i < Object.keys(this.jurisdictionPartStatusData).length; i++) {
      dataBar['datasets'][2]['data'].push(this.jurisdictionPartStatusData[Object.keys(this.jurisdictionPartStatusData)[i]]['status-not-started']);
    }
    dataBar['datasets'][2]['backgroundColor'] = '#A4A9AD';

    const ctx2 = divContainer.querySelector('#myChart2') as ChartItem;
    (divContainer.querySelector('#myChart2') as HTMLCanvasElement).classList.remove('gone');
    
    console.log('databar', dataBar);

    if(this.fill == "solid") {

      this.renderChart2(ctx2, 'bar', dataBar, "Jurisdiction vs Completeness")

    } else {

      this.renderChart2(ctx2, 'bar', dataBar, "Jurisdiction vs Completeness")

    }

    // 3

    const dataBar2:any = {};

    dataBar2['labels'] = [];
    for(i = 0; i < Object.keys(this.jurisdictionLateStatusData).length; i++) {
      dataBar2['labels'].push(this.formatLabel(Object.keys(this.jurisdictionLateStatusData)[i], 15));
    }
    dataBar2['datasets'] = [];
    dataBar2['datasets'].push({});
    dataBar2['datasets'].push({});
    dataBar2['datasets'].push({});
    dataBar2['datasets'].push({});

    dataBar2['datasets'][0]['label'] = 'In Time';
    dataBar2['datasets'][0]['data'] = [];
    for(i = 0; i < Object.keys(this.jurisdictionLateStatusData).length; i++) {
      dataBar2['datasets'][0]['data'].push(this.jurisdictionLateStatusData[Object.keys(this.jurisdictionLateStatusData)[i]]['in-time']);
    }
    dataBar2['datasets'][0]['backgroundColor'] = '#888888';

    dataBar2['datasets'][1]['label'] = 'Past Due Date';
    dataBar2['datasets'][1]['data'] = [];
    for(i = 0; i < Object.keys(this.jurisdictionLateStatusData).length; i++) {
      dataBar2['datasets'][1]['data'].push(this.jurisdictionLateStatusData[Object.keys(this.jurisdictionLateStatusData)[i]]['past-due-date']);
    }
    dataBar2['datasets'][1]['backgroundColor'] = '#F79256';

    dataBar2['datasets'][2]['label'] = 'Late Executed';
    dataBar2['datasets'][2]['data'] = [];
    for(i = 0; i < Object.keys(this.jurisdictionLateStatusData).length; i++) {
      dataBar2['datasets'][2]['data'].push(this.jurisdictionLateStatusData[Object.keys(this.jurisdictionLateStatusData)[i]]['late-executed']);
    }
    dataBar2['datasets'][2]['backgroundColor'] = '#840B0F';

    dataBar2['datasets'][3]['label'] = 'Late Approved';
    dataBar2['datasets'][3]['data'] = [];
    for(i = 0; i < Object.keys(this.jurisdictionLateStatusData).length; i++) {
      dataBar2['datasets'][3]['data'].push(this.jurisdictionLateStatusData[Object.keys(this.jurisdictionLateStatusData)[i]]['late-approved']);
    }
    dataBar2['datasets'][3]['backgroundColor'] = '#EE2F36';

    const ctx3 = divContainer.querySelector('#myChart3') as ChartItem;
    (divContainer.querySelector('#myChart3') as HTMLCanvasElement).classList.remove('gone');
    
    console.log('databar', dataBar2);

    if(this.fill == "solid") {

      this.renderChart3(ctx3, 'bar', dataBar2, "Jurisdiction vs Timeliness")

    } else {

      this.renderChart3(ctx3, 'bar', dataBar2, "Jurisdiction vs Timeliness")

    }

  }

  renderFrequencyGraph = (divContainer: HTMLDivElement) => {

    if(this.frequencyData == null) return;

    const data:any = {};
    data['labels'] = [];
    data['datasets'] = [];
    data['datasets'].push({});
    data['datasets'][0]['data'] = [];
    data['datasets'][0]['backgroundColor'] = [];
    data['datasets'][0]['borderWidth'] = 1;
    for(var i = 0; i < Object.keys(this.frequencyData).length; i++) {
      data['labels'].push(Object.keys(this.frequencyData)[i]);
    }
    for(var i = 0; i < Object.keys(this.frequencyData).length; i++) {
      data['datasets'][0]['data'].push(this.frequencyData[Object.keys(this.frequencyData)[i]]);
      data['datasets'][0]['backgroundColor'].push(Util.getRandomColor());
    }

    // var dataTotal = (divContainer.querySelector('#graph-total') as HTMLSpanElement).innerHTML;
    // var dataPastDueDate = (divContainer.querySelector('#graph-past-due-date') as HTMLSpanElement).innerHTML;
    // var dataLateApproved = (divContainer.querySelector('#graph-late-approved') as HTMLSpanElement).innerHTML;
    // var dataLateExecuted = (divContainer.querySelector('#graph-late-executed') as HTMLSpanElement).innerHTML;

    const ctx = divContainer.querySelector('#myChart') as ChartItem;
    // (divContainer.querySelector('#myChart') as HTMLCanvasElement).style.maxWidth = '400px';
    // (divContainer.querySelector('#myChart') as HTMLCanvasElement).style.maxHeight = '400px';

    if(this.fill == "pattern") {

      this.renderChartSettings(divContainer, -1, ctx);
      this.renderChart(ctx, 'pie', data, "Frequency Distribution")

    }

    if(this.fill == "solid") {

      this.renderChartSettings(divContainer, -1, ctx);
      this.renderChart(ctx, 'pie', data, "Frequency Distribution")

    }

    // 2

    const dataBar:any = {};

    dataBar['labels'] = [];
    for(i = 0; i < Object.keys(this.frequencyPartStatusData).length; i++) {
      dataBar['labels'].push(this.formatLabel(Object.keys(this.frequencyPartStatusData)[i], 15));
    }
    dataBar['datasets'] = [];
    dataBar['datasets'].push({});
    dataBar['datasets'].push({});
    dataBar['datasets'].push({});

    dataBar['datasets'][0]['label'] = 'Approved';
    dataBar['datasets'][0]['data'] = [];
    for(i = 0; i < Object.keys(this.frequencyPartStatusData).length; i++) {
      dataBar['datasets'][0]['data'].push(this.frequencyPartStatusData[Object.keys(this.frequencyPartStatusData)[i]]['status-approved']);
    }
    dataBar['datasets'][0]['backgroundColor'] = '#8cd039';

    dataBar['datasets'][1]['label'] = 'In Progress';
    dataBar['datasets'][1]['data'] = [];
    for(i = 0; i < Object.keys(this.frequencyPartStatusData).length; i++) {
      dataBar['datasets'][1]['data'].push(this.frequencyPartStatusData[Object.keys(this.frequencyPartStatusData)[i]]['status-in-progress']);
    }
    dataBar['datasets'][1]['backgroundColor'] = '#FFBA49';

    dataBar['datasets'][2]['label'] = 'Not Started';
    dataBar['datasets'][2]['data'] = [];
    for(i = 0; i < Object.keys(this.frequencyPartStatusData).length; i++) {
      dataBar['datasets'][2]['data'].push(this.frequencyPartStatusData[Object.keys(this.frequencyPartStatusData)[i]]['status-not-started']);
    }
    dataBar['datasets'][2]['backgroundColor'] = '#A4A9AD';

    const ctx2 = divContainer.querySelector('#myChart2') as ChartItem;
    (divContainer.querySelector('#myChart2') as HTMLCanvasElement).classList.remove('gone');
    
    console.log('databar', dataBar);

    if(this.fill == "solid") {

      this.renderChart2(ctx2, 'bar', dataBar, "Frequency vs Completeness")

    } else {

      this.renderChart2(ctx2, 'bar', dataBar, "Frequency vs Completeness")

    }

    // 3

    const dataBar2:any = {};

    dataBar2['labels'] = [];
    for(i = 0; i < Object.keys(this.frequencyLateStatusData).length; i++) {
      dataBar2['labels'].push(this.formatLabel(Object.keys(this.frequencyLateStatusData)[i], 15));
    }
    dataBar2['datasets'] = [];
    dataBar2['datasets'].push({});
    dataBar2['datasets'].push({});
    dataBar2['datasets'].push({});
    dataBar2['datasets'].push({});

    dataBar2['datasets'][0]['label'] = 'In Time';
    dataBar2['datasets'][0]['data'] = [];
    for(i = 0; i < Object.keys(this.frequencyLateStatusData).length; i++) {
      dataBar2['datasets'][0]['data'].push(this.frequencyLateStatusData[Object.keys(this.frequencyLateStatusData)[i]]['in-time']);
    }
    dataBar2['datasets'][0]['backgroundColor'] = '#888888';

    dataBar2['datasets'][1]['label'] = 'Past Due Date';
    dataBar2['datasets'][1]['data'] = [];
    for(i = 0; i < Object.keys(this.frequencyLateStatusData).length; i++) {
      dataBar2['datasets'][1]['data'].push(this.frequencyLateStatusData[Object.keys(this.frequencyLateStatusData)[i]]['past-due-date']);
    }
    dataBar2['datasets'][1]['backgroundColor'] = '#F79256';

    dataBar2['datasets'][2]['label'] = 'Late Executed';
    dataBar2['datasets'][2]['data'] = [];
    for(i = 0; i < Object.keys(this.frequencyLateStatusData).length; i++) {
      dataBar2['datasets'][2]['data'].push(this.frequencyLateStatusData[Object.keys(this.frequencyLateStatusData)[i]]['late-executed']);
    }
    dataBar2['datasets'][2]['backgroundColor'] = '#840B0F';

    dataBar2['datasets'][3]['label'] = 'Late Approved';
    dataBar2['datasets'][3]['data'] = [];
    for(i = 0; i < Object.keys(this.frequencyLateStatusData).length; i++) {
      dataBar2['datasets'][3]['data'].push(this.frequencyLateStatusData[Object.keys(this.frequencyLateStatusData)[i]]['late-approved']);
    }
    dataBar2['datasets'][3]['backgroundColor'] = '#EE2F36';

    const ctx3 = divContainer.querySelector('#myChart3') as ChartItem;
    (divContainer.querySelector('#myChart3') as HTMLCanvasElement).classList.remove('gone');
    
    console.log('databar', dataBar2);

    if(this.fill == "solid") {

      this.renderChart3(ctx3, 'bar', dataBar2, "Frequency vs Timeliness")

    } else {

      this.renderChart3(ctx3, 'bar', dataBar2, "Frequency vs Timeliness")

    }

  }

  renderRiskGraph = (divContainer: HTMLDivElement) => {

    // Pie chart

    console.log('risk data', this.riskAreasData, this.riskAreasPartStatusData, this.riskAreasLateStatusData);

    if(this.riskAreasData == null) return;

    const data:any = {};
    data['labels'] = [];
    data['datasets'] = [];
    data['datasets'].push({});
    data['datasets'][0]['data'] = [];
    data['datasets'][0]['backgroundColor'] = [];
    data['datasets'][0]['borderWidth'] = 1;
    for(var i = 0; i < Object.keys(this.riskAreasData).length; i++) {
      data['labels'].push(Object.keys(this.riskAreasData)[i]);
    }
    for(var i = 0; i < Object.keys(this.riskAreasData).length; i++) {
      data['datasets'][0]['data'].push(this.riskAreasData[Object.keys(this.riskAreasData)[i]]);
      data['datasets'][0]['backgroundColor'].push(Util.getRandomColor());
    }

    const ctx = divContainer.querySelector('#myChart') as ChartItem;
    //(divContainer.querySelector('#myChart') as HTMLCanvasElement).style.width = '50%';
    // (divContainer.querySelector('#myChart') as HTMLCanvasElement).style.maxHeight = '400px';

    if(this.fill == "pattern") {

      this.renderChartSettings(divContainer, -1, ctx);
      this.renderChart(ctx, 'pie', data, "Risk Area Distribution")

    }

    if(this.fill == "solid") {

      this.renderChartSettings(divContainer, -1, ctx);
      this.renderChart(ctx, 'pie', data, "Risk Area Distribution")

    }

    const dataBar:any = {};

    dataBar['labels'] = [];
    for(i = 0; i < Object.keys(this.riskAreasPartStatusData).length; i++) {
      dataBar['labels'].push(this.formatLabel(Object.keys(this.riskAreasPartStatusData)[i], 15));
    }
    dataBar['datasets'] = [];
    dataBar['datasets'].push({});
    dataBar['datasets'].push({});
    dataBar['datasets'].push({});

    dataBar['datasets'][0]['label'] = 'Approved';
    dataBar['datasets'][0]['data'] = [];
    for(i = 0; i < Object.keys(this.riskAreasPartStatusData).length; i++) {
      dataBar['datasets'][0]['data'].push(this.riskAreasPartStatusData[Object.keys(this.riskAreasPartStatusData)[i]]['status-approved']);
    }
    dataBar['datasets'][0]['backgroundColor'] = '#8cd039';

    dataBar['datasets'][1]['label'] = 'In Progress';
    dataBar['datasets'][1]['data'] = [];
    for(i = 0; i < Object.keys(this.riskAreasPartStatusData).length; i++) {
      dataBar['datasets'][1]['data'].push(this.riskAreasPartStatusData[Object.keys(this.riskAreasPartStatusData)[i]]['status-in-progress']);
    }
    dataBar['datasets'][1]['backgroundColor'] = '#FFBA49';

    dataBar['datasets'][2]['label'] = 'Not Started';
    dataBar['datasets'][2]['data'] = [];
    for(i = 0; i < Object.keys(this.riskAreasPartStatusData).length; i++) {
      dataBar['datasets'][2]['data'].push(this.riskAreasPartStatusData[Object.keys(this.riskAreasPartStatusData)[i]]['status-not-started']);
    }
    dataBar['datasets'][2]['backgroundColor'] = '#A4A9AD';

    const ctx2 = divContainer.querySelector('#myChart2') as ChartItem;
    (divContainer.querySelector('#myChart2') as HTMLCanvasElement).classList.remove('gone');
    
    console.log('databar', dataBar);

    if(this.fill == "solid") {

      this.renderChart2(ctx2, 'bar', dataBar, "Risk Area vs Completeness")

    } else {

      this.renderChart2(ctx2, 'bar', dataBar, "Risk Area vs Completeness")

    }

    // 3

    const dataBar2:any = {};

    dataBar2['labels'] = [];
    for(i = 0; i < Object.keys(this.riskAreasLateStatusData).length; i++) {
      dataBar2['labels'].push(this.formatLabel(Object.keys(this.riskAreasLateStatusData)[i], 15));
    }
    dataBar2['datasets'] = [];
    dataBar2['datasets'].push({});
    dataBar2['datasets'].push({});
    dataBar2['datasets'].push({});
    dataBar2['datasets'].push({});

    dataBar2['datasets'][0]['label'] = 'In Time';
    dataBar2['datasets'][0]['data'] = [];
    for(i = 0; i < Object.keys(this.riskAreasLateStatusData).length; i++) {
      dataBar2['datasets'][0]['data'].push(this.riskAreasLateStatusData[Object.keys(this.riskAreasLateStatusData)[i]]['in-time']);
    }
    dataBar2['datasets'][0]['backgroundColor'] = '#888888';

    dataBar2['datasets'][1]['label'] = 'Past Due Date';
    dataBar2['datasets'][1]['data'] = [];
    for(i = 0; i < Object.keys(this.riskAreasLateStatusData).length; i++) {
      dataBar2['datasets'][1]['data'].push(this.riskAreasLateStatusData[Object.keys(this.riskAreasLateStatusData)[i]]['past-due-date']);
    }
    dataBar2['datasets'][1]['backgroundColor'] = '#F79256';

    dataBar2['datasets'][2]['label'] = 'Late Executed';
    dataBar2['datasets'][2]['data'] = [];
    for(i = 0; i < Object.keys(this.riskAreasLateStatusData).length; i++) {
      dataBar2['datasets'][2]['data'].push(this.riskAreasLateStatusData[Object.keys(this.riskAreasLateStatusData)[i]]['late-executed']);
    }
    dataBar2['datasets'][2]['backgroundColor'] = '#840B0F';

    dataBar2['datasets'][3]['label'] = 'Late Approved';
    dataBar2['datasets'][3]['data'] = [];
    for(i = 0; i < Object.keys(this.riskAreasLateStatusData).length; i++) {
      dataBar2['datasets'][3]['data'].push(this.riskAreasLateStatusData[Object.keys(this.riskAreasLateStatusData)[i]]['late-approved']);
    }
    dataBar2['datasets'][3]['backgroundColor'] = '#EE2F36';

    const ctx3 = divContainer.querySelector('#myChart3') as ChartItem;
    (divContainer.querySelector('#myChart3') as HTMLCanvasElement).classList.remove('gone');
    
    console.log('databar', dataBar2);

    if(this.fill == "solid") {

      this.renderChart3(ctx3, 'bar', dataBar2, "Risk Area vs Timeliness")

    } else {

      this.renderChart3(ctx3, 'bar', dataBar2, "Risk Area vs Timeliness")

    }

  }

  renderEventDetail = (event: any, mmddyyyy: any, currentColumnButton: HTMLButtonElement | null) => {

    let comments, docs, approved, dateOfCompletion, makercheckers: Array<string>, docsOptional;
    let entityId: string = "";
    let locationId: string = "";

    entityId = event.entityid;
    locationId = event.locationid;
    comments = event['comments'] == null ? [] : event['comments'] == null ? [] :  (event['comments']);
    docs = event['documents'] == null ? [] : event['documents'] == null ? [] :  (event['documents']);
    approved = event['approved'] == null ? false : event['approved'] == null ? false : event['approved'];
    dateOfCompletion = event['dateofcompletion'] == null ? '' : event['dateofcompletion'] == null ? '' : event['dateofcompletion'];
    makercheckers = event['makercheckers'] == null ? [] : event['makercheckers'] == null ? [] : event['makercheckers']; 
    docsOptional = event['docs'] == null ? [] : event['docs'] == null ? [] : event['docs']; 

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

    if(this.selectedItems.length > 1) {
      
      html += `
    
        <div class="d-flex justify-between m-20">
          <h4 class="m-0">${this.selectedItems.length - 1} other ` + (this.selectedItems.length === 1 ? `item` : `items`) + ` also selected</h4>
        </div>
    
      `;
      
    }

    html += '<div class="accordian-container m-20 pb-20" part="accordian-container">';

    html += '<div part="detail-summary">';
    html += ('<div part="detail-summary-title" class="pl-20 pr-20"><h1>'+event['obligationtitle']+'</h1></div>');
    html += ('<div part="detail-summary-subtitle" class="pl-20 pr-20"><h3>'+event['obligation']+'</h3></div>');
    html += ('<div part="detail-summary-content" class="pl-20 pr-20">'+('<sf-i-elastic-text text="'+(event['internalcontrols'] + "").replace(/"/g, "").replace(/\n/g,'<br />')+'" minLength="80"></sf-i-elastic-text>')+'</div>');
    html += '</div>';

    html += '<br />';

    html += '<div class="accordian-section section-basic pl-20 pr-20" part="accordian-section">';
      html += '<div class="d-flex justify-between accordian-head head-basic cursor" part="accordian-head">';
        html += '<h3>Basic Information</h3>'
        html += '<h3 class="head-indicator-basic">-</h3>'
      html += '</div>';
      html += '<div class="d-flex flex-wrap accordian-body body-basic" part="accordian-body">';
      
      for(var i = 0; i < basicFields.length; i++) {

        if(!this.getEventPreviewFields().includes(basicFields[i])) {
    
          if(!this.getEventHideFields().includes(basicFields[i])) {

            html += '<div class="m-20">';
            html += '<div part="detail-head"><strong>'+basicFields[i]+'</strong></div>'
            if((event[basicFields[i]] + "").indexOf("[") >= 0) {
              html += this.getEventTexts(basicFields[i], JSON.parse(event[basicFields[i]]), event);
            } else {
              html += '<sf-i-elastic-text text="'+(event[basicFields[i]] + "").replace(/"/g, "")+'" minLength="80"></sf-i-elastic-text>';
            }
            html += '</div>';

          }
        }

      }

      if(this.mode == "consumer") {
        if(approved) {
          html += '<div class="m-20">';
          html += '<div part="detail-head"><strong>Approved</strong></div>'
          html += '<span class="material-icons color-done">check_circle</span>'
          html += '</div>';
        }
      }

      if(docs != null) {
        html += '<div class="m-20">';
        html += '<div part="detail-head"><strong>Documents</strong></div>'
        html += '<span class="material-icons muted">description</span>'
        html += docs.length
        html += '</div>';
      }

      if(comments != null) {
        html += '<div class="m-20">';
        html += '<div part="detail-head"><strong>Comments</strong></div>'
        html += '<span class="material-icons muted">forum</span>'
        html += comments.length
        html += '</div>';
      }

      html += '</div>';
    html += '</div>';
    
    
    html += '<div class="accordian-section section-statute pl-20 pr-20" part="accordian-section">';
      html += '<div class="d-flex justify-between accordian-head head-statute cursor" part="accordian-head">';
        html += '<h3>Statute Information</h3>'
        html += '<h3 class="head-indicator-statute">-</h3>'
      html += '</div>';
      html += '<div class="d-flex flex-wrap accordian-body body-statute" part="accordian-body">';
      
      for(var i = 0; i < statuteFields.length; i++) {

        if(!this.getEventPreviewFields().includes(statuteFields[i])) {
    
          if(!this.getEventHideFields().includes(statuteFields[i])) {

            html += '<div class="m-20">';
            html += '<div part="detail-head"><strong>'+statuteFields[i]+'</strong></div>'
            if((event[statuteFields[i]] + "").indexOf("[") >= 0) {
              html += this.getEventTexts(statuteFields[i], JSON.parse(event[statuteFields[i]]), event);
            } else {
              html += '<sf-i-elastic-text text="'+(event[statuteFields[i]] + "").replace(/"/g, "")+'" minLength="80"></sf-i-elastic-text>';
            }
            html += '</div>';

          }
        }

      }

      html += '</div>';
    html += '</div>';

    html += '<div class="accordian-section section-compliance pl-20 pr-20" part="accordian-section">';
      html += '<div class="d-flex justify-between accordian-head head-compliance" part="accordian-head">';
        html += '<h3>Compliance Information</h3>'
        html += '<h3 class="head-indicator-compliance">-</h3>'
      html += '</div>';
      html += '<div class="d-flex flex-wrap accordian-body body-compliance" part="accordian-body">';
      
      for(var i = 0; i < complianceFields.length; i++) {

        console.log(complianceFields[i]);
        console.log(event[complianceFields[i]]);

        if(!this.getEventPreviewFields().includes(complianceFields[i])) {
    
          if(!this.getEventHideFields().includes(complianceFields[i])) {

            if(event[complianceFields[i]].indexOf('http://') >= 0) {

              let res = event[complianceFields[i]].split(" ").find((word:any) => word.startsWith("http")); 
              html += '<div class="m-20">';
              html += '<div part="detail-head"><strong>'+complianceFields[i]+'</strong></div>'
              if((event[complianceFields[i]] + "").indexOf("[") >= 0) {
                html += this.getEventTexts(complianceFields[i], JSON.parse(event[complianceFields[i]]), event) + "&nbsp;<a href=\""+res+"\" target=\"_blank\">Open</a>";
              } else {
                html += '<sf-i-elastic-text text="'+(event[complianceFields[i]] + "").replace(/"/g, "").replace(/\n/g,'<br />')+'" minLength="80"></sf-i-elastic-text>' + "&nbsp;<a href=\""+res+"\" target=\"_blank\">Open</a>";
              }
              html += '</div>';

            } else {

              html += '<div class="m-20">';
              html += '<div part="detail-head"><strong>'+complianceFields[i]+'</strong></div>'
              if((event[complianceFields[i]] + "").indexOf("[") >= 0) {
                html += this.getEventTexts(complianceFields[i], JSON.parse(event[complianceFields[i]]), event);
              } else {
                html += '<sf-i-elastic-text text="'+(event[complianceFields[i]] + "").replace(/"/g, "").replace(/\n/g,'<br />')+'" minLength="80"></sf-i-elastic-text>';
              }
              html += '</div>';

            }


          }
        }

      }

      html += '</div>';
    html += '</div>';

    html += '<div class="accordian-section section-grc pl-20 pr-20" part="accordian-section">';
      html += '<div class="d-flex justify-between accordian-head head-grc" part="accordian-head">';
        html += '<h3>GRC Information</h3>'
        html += '<h3 class="head-indicator-grc">-</h3>'
      html += '</div>';
      html += '<div class="d-flex flex-wrap accordian-body body-grc" part="accordian-body">';
      
      for(var i = 0; i < grcFields.length; i++) {

        console.log(grcFields[i]);
        if(!this.getEventPreviewFields().includes(grcFields[i])) {
    
          if(!this.getEventHideFields().includes(grcFields[i])) {

            html += '<div class="m-20">';
            html += '<div part="detail-head"><strong>'+grcFields[i]+'</strong></div>'
            if((event[grcFields[i]] + "").indexOf("[") >= 0) {
              html += this.getEventTexts(grcFields[i], JSON.parse(event[grcFields[i]]), event);
            } else {
              console.log('grcfield', event[grcFields[i]]);
              html += '<sf-i-elastic-text text="'+(event[grcFields[i]] + "").replace(/"/g, "").replace(/\n/g,'<br />')+'" minLength="80"></sf-i-elastic-text>';
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

    if(this.mode == "consumer") {

      
      console.log('docs received', event['documents']);
      console.log('docs received', comments);
      console.log('docs received', approved);
        
      if(this.myRole == this.TAB_APPROVER || this.myRole == this.TAB_FUNCTION_HEAD) {

        if(comments.length > 0) {

          html += '<div class="d-flex justify-between m-20">';
          html += '<h3 part="results-title" class="m-0"><br />Approve Compliance</h3>';
          html += '</div>';
          html += '<div class="m-20" part="report-container">';
          html += '<div class="d-flex justify-between align-center">'
            html += '<button class="invisible" part="button">Save</button>'
            html += '<button id="button-uploader-submit-approve" class="button-submit" part="button">Save</button>'
          html += '</div>'

          if(this.myRole != this.TAB_FUNCTION_HEAD && docsOptional.length === 0) {
            html += '<div class="m-20">';
            html += '<label part="input-label">Supporting Documents</label>';
            html += '<slot name="uploader"></slot>';
            html += '</div>';  
          }

          html += '<div class="d-flex m-20 flex-col">';
            html += '<label part="input-label">Approver Comments</label>';
            html += '<input id="input-approver-comments" type="text" part="input" value=""/><br />';
            html += '<label part="input-label">Date of Completion</label>';
            html += '<input id="input-reporter-doc" part="input" type="date" value="'+(dateOfCompletion == "" ? dateOfCompletion : new Date(parseInt(dateOfCompletion)).toISOString().substring(0,10))+'" disabled/><br />';
            html += '<div>'
              html += '<label part="input-label">Approve?</label><br />';
              html += '<div class="mt-5">'
              html += '<input id="input-approve-yes" name="radio-approved" type="radio"/> Yes';
              html += '<input id="input-approve-no" name="radio-approved" type="radio" checked/> No';
              html += '</div>'
            html += '</div>';
          html += '</div>';
          html += '</div>';

        }

      } 
      
      if(this.myRole == this.TAB_REPORTER || this.myRole == this.TAB_FUNCTION_HEAD) {

        html += '<div class="d-flex justify-between m-20">';
        html += '<h3 part="results-title" class="m-0"><br />Report Compliance</h3>';
        html += '</div>';

        var showSubmissionSection = true;
        var showGoogleFormLink = false;

        if(event['form'].length > 5) {

          if(event['form'].indexOf('docs.google.com/forms') >= 0) {
            showSubmissionSection = false;
            if(!approved) {
              showGoogleFormLink = true;
              
            }
          }
          
        }

        if(showGoogleFormLink) {
          html += ('<div part="detail-summary-form" class="mt-20 pl-20 pr-20"><button part="button" onclick="window.open(\'' + event['form'] + (this.projectId + '_' + entityId + '_' + locationId + '_' + event['id'] + '_' + mmddyyyy) + '\',\'_blank\')">Submit Via Link</button></div>');
        }

        if(showSubmissionSection) {

          html += '<div class="m-20" part="report-container">';
          html += '<div class="d-flex justify-between align-center">'
            html += '<button class="invisible" part="button">Save</button>'
            html += '<button id="button-uploader-submit-report" class="button-submit" part="button">Save</button>'
          html += '</div>'

          html += '<div class="d-flex m-20 flex-col">';
            html += '<label part="input-label">Reporter Comments</label>';
            html += '<input id="input-reporter-comments" type="text" part="input" value=""/><br />';
            html += '<label part="input-label">Date of Completion</label>';
            html += '<input id="input-reporter-doc" part="input" type="date" value="'+(dateOfCompletion == "" ? dateOfCompletion : new Date(parseInt(dateOfCompletion)).toISOString().substring(0,10))+'" max="'+(new Date().toISOString().substring(0, 10))+'"/><br />';
            if(docsOptional.length === 0) {
              html += '<label part="input-label">Supporting Documents</label>';
              html += '<slot name="uploader"></slot>';
            }
            html += '<br />';
            if(makercheckers.length > 0) {
              html += '<div part="td-head" class="td-head d-flex justify-center align-center"><span class="material-symbols-outlined">check_small</span><div>&nbsp;Auto-approve Enabled</div></div>';
            }
          html += '</div>';
          html += '</div>';

        }


        

      }

      if(this.myRole == this.TAB_AUDITOR) {

        html += '<div class="d-flex justify-between m-20">';
        html += '<h3 part="results-title" class="m-0"><br />Audit Compliance</h3>';
        html += '</div>';
        html += '<div class="m-20" part="report-container">';
        html += '<div class="d-flex justify-between align-center">'
          html += '<button class="invisible" part="button">Save</button>'
          html += '<button id="button-uploader-submit-audit" class="button-submit" part="button">Save</button>'
        html += '</div>'

        html += '<div class="d-flex m-20 flex-col">';
          html += '<label part="input-label">Auditor Comments</label>';
          html += '<input id="input-auditor-comments" type="text" part="input" value=""/><br />';
          html += '<label part="input-label">Date of Completion</label>';
          html += '<input id="input-auditor-doc" part="input" type="date" value="'+(dateOfCompletion == "" ? dateOfCompletion : new Date(parseInt(dateOfCompletion)).toISOString().substring(0,10))+'" max="'+(new Date().toISOString().substring(0, 10))+'" readonly/><br />';
          html += '<div>'
              html += '<label part="input-label">Approve?</label><br />';
              html += '<div class="mt-5">'
              html += '<input id="input-approve-yes" name="radio-approved" type="radio" checked/> Yes';
              html += '<input id="input-approve-no" name="radio-approved" type="radio"/> No';
              html += '</div>'
            html += '</div>';
          html += '<br />';
          if(docsOptional.length === 0) {
            html += '<label part="input-label">Supporting Documents</label>';
            html += '<slot name="uploader"></slot>';
          }
        html += '</div>';
        html += '</div>';

      }
      
      if(this.myRole == this.TAB_VIEWER) {

        html += '<div class="d-flex justify-between m-20">';
        html += '<h3 part="results-title" class="m-0"><br />View Compliance</h3>';
        html += '</div>';
        html += '<div class="m-20" part="report-container">';

        html += '<div class="d-flex m-20 flex-col">';
          html += '<div>'
              html += '<label part="input-label">Approve?</label><br />';
              html += '<div class="mt-5">'
              html += '<input id="input-approve-yes" name="radio-approved" type="radio" checked/> Yes';
              html += '<input id="input-approve-no" name="radio-approved" type="radio"/> No';
              html += '</div>'
            html += '</div>';
          html += '<br />';
          if(docsOptional.length === 0) {
            html += '<label part="input-label">Supporting Documents</label>';
            html += '<slot name="uploader"></slot>';
          }
        html += '</div>';
        html += '</div>';

      }

      html += '<div class="d-flex justify-between m-20">';
      html += '<h3 part="results-title" class="m-0"><br />Comments</h3>';
      html += '</div>';
      html += '<div class="m-20">';

        html += '<div class="d-flex flex-col">';

          for(var i = 0; i < comments.length; i++) {
            html += '<div part="commentbox" class="d-flex commentbox '+(comments[i].author + "").toLowerCase()+'box">';
            html += '<div class="mr-20"><strong>'+comments[i].author+'</strong></div>';
            const onlyCommentText = comments[i].comment.replace(/ *\([^)]*\) */g, "").trim();
            try {
              const jsonComments = JSON.parse(onlyCommentText);
              var htmlTable = '';
              for(var j = 0; j < Object.keys(jsonComments).length; j++) {
                htmlTable += '<div class="mb-20">';
                  htmlTable += ('<div part="detail-head">' + Object.keys(jsonComments)[j] + '</div>');
                  htmlTable += ('<sf-i-elastic-text text="'+jsonComments[Object.keys(jsonComments)[j]]+'" minLength="20"></sf-i-elastic-text>');
                  htmlTable += '</div>';
              }
              html += '<div class="">'+htmlTable+'<small><span class="muted">'+comments[i].timestamp+'</span></small></div>';
            } catch (e: any) {
              html += '<div class="">'+comments[i].comment+'<br /><small><span class="muted">'+comments[i].timestamp+'</span></small></div>';
            }
            
            html += '</div>';
          }
          if(comments.length === 0) {
            html += '<div><strong>No comments yet!</strong></div>';
          }

        html += '</div>';

      html += '<div>';

    }

    (this._SfDetailContainer as HTMLDivElement).innerHTML = html;

    (this._SfDetailContainer as HTMLDivElement).querySelector('#button-detail-close')?.addEventListener('click', () => {

      (this._SfDetailContainer as HTMLDivElement).innerHTML = '';
      (this._SfDetailContainer as HTMLDivElement).style.display = 'none';

    });

    (this._SfDetailContainer as HTMLDivElement).querySelector('.head-basic')?.addEventListener('click', () => {

      console.log('head basic clicked', ((this._SfDetailContainer as HTMLDivElement).querySelector('.body-basic') as HTMLDivElement).style.display);

      if(((this._SfDetailContainer as HTMLDivElement).querySelector('.body-basic') as HTMLDivElement).style.display == 'flex' || ((this._SfDetailContainer as HTMLDivElement).querySelector('.body-basic') as HTMLDivElement).style.display == '') {
        ((this._SfDetailContainer as HTMLDivElement).querySelector('.body-basic') as HTMLDivElement).style.display = 'none';
        ((this._SfDetailContainer as HTMLDivElement).querySelector('.head-indicator-basic') as HTMLDivElement).innerHTML = '+';
      } else {
        ((this._SfDetailContainer as HTMLDivElement).querySelector('.body-basic') as HTMLDivElement).style.display = 'flex';
        ((this._SfDetailContainer as HTMLDivElement).querySelector('.head-indicator-basic') as HTMLDivElement).innerHTML = '-';
      }
    });
    
    (this._SfDetailContainer as HTMLDivElement).querySelector('.head-statute')?.addEventListener('click', () => {

      console.log('head statute clicked', ((this._SfDetailContainer as HTMLDivElement).querySelector('.body-statute') as HTMLDivElement).style.display);

      if(((this._SfDetailContainer as HTMLDivElement).querySelector('.body-statute') as HTMLDivElement).style.display == 'flex' || ((this._SfDetailContainer as HTMLDivElement).querySelector('.body-statute') as HTMLDivElement).style.display == '') {
        ((this._SfDetailContainer as HTMLDivElement).querySelector('.body-statute') as HTMLDivElement).style.display = 'none';
        ((this._SfDetailContainer as HTMLDivElement).querySelector('.head-indicator-statute') as HTMLDivElement).innerHTML = '+';
      } else {
        ((this._SfDetailContainer as HTMLDivElement).querySelector('.body-statute') as HTMLDivElement).style.display = 'flex';
        ((this._SfDetailContainer as HTMLDivElement).querySelector('.head-indicator-statute') as HTMLDivElement).innerHTML = '-';
      }
    });

    (this._SfDetailContainer as HTMLDivElement).querySelector('.head-compliance')?.addEventListener('click', () => {
      if(((this._SfDetailContainer as HTMLDivElement).querySelector('.body-compliance') as HTMLDivElement).style.display == 'flex' || ((this._SfDetailContainer as HTMLDivElement).querySelector('.body-compliance') as HTMLDivElement).style.display == '') {
        ((this._SfDetailContainer as HTMLDivElement).querySelector('.body-compliance') as HTMLDivElement).style.display = 'none';
        ((this._SfDetailContainer as HTMLDivElement).querySelector('.head-indicator-compliance') as HTMLDivElement).innerHTML = '+';
      } else {
        ((this._SfDetailContainer as HTMLDivElement).querySelector('.body-compliance') as HTMLDivElement).style.display = 'flex';
        ((this._SfDetailContainer as HTMLDivElement).querySelector('.head-indicator-compliance') as HTMLDivElement).innerHTML = '-';
      }
    });

    (this._SfDetailContainer as HTMLDivElement).querySelector('.head-grc')?.addEventListener('click', () => {
      if(((this._SfDetailContainer as HTMLDivElement).querySelector('.body-grc') as HTMLDivElement).style.display == 'flex' || ((this._SfDetailContainer as HTMLDivElement).querySelector('.body-grc') as HTMLDivElement).style.display == '') {
        ((this._SfDetailContainer as HTMLDivElement).querySelector('.body-grc') as HTMLDivElement).style.display = 'none';
        ((this._SfDetailContainer as HTMLDivElement).querySelector('.head-indicator-grc') as HTMLDivElement).innerHTML = '+';
      } else {
        ((this._SfDetailContainer as HTMLDivElement).querySelector('.body-grc') as HTMLDivElement).style.display = 'flex';
        ((this._SfDetailContainer as HTMLDivElement).querySelector('.head-indicator-grc') as HTMLDivElement).innerHTML = '-';
      }
    });

    if(this.mode == "consumer") {

      (this._SfDetailContainer as HTMLDivElement).querySelector('#button-uploader-submit-approve')?.addEventListener('click', async () => {

        const comments = ((this._SfDetailContainer as HTMLDivElement).querySelector('#input-approver-comments') as HTMLInputElement).value;
        const approved = ((this._SfDetailContainer as HTMLDivElement).querySelector('#input-approve-yes') as HTMLInputElement).checked;

        console.log(comments, approved);

        await this.uploadReview(entityId, locationId, mmddyyyy, event["id"], comments, approved)
        
        var clickEvent = new MouseEvent("click", {
            "view": window,
            "bubbles": true,
            "cancelable": false
        });
        ((this._SfDetailContainer as HTMLDivElement).querySelector('#button-detail-close') as HTMLButtonElement)!.dispatchEvent(clickEvent);
        if(this.getCurrentTab() == this.TAB_CUSTOM) {
          this.processDateSelection();
        } else {
          if(currentColumnButton != null) {
            currentColumnButton.click();
          }
        }

      });

      (this._SfDetailContainer as HTMLDivElement).querySelector('#button-uploader-submit-audit')?.addEventListener('click', async () => {

        const comments = ((this._SfDetailContainer as HTMLDivElement).querySelector('#input-auditor-comments') as HTMLInputElement).value;
        const approved = ((this._SfDetailContainer as HTMLDivElement).querySelector('#input-approve-yes') as HTMLInputElement).checked;

        if(this.selectedItems.length === 0) {

          await this.uploadAudit(entityId, locationId, mmddyyyy, event["id"], comments, approved)
        
        } else {

          for(var k = 0; k < this.selectedItems.length; k++) {
                    
            const selectedId = this.selectedItems[k];
            console.log('selectedid', selectedId);

            entityId = selectedId.split('-')[7].replace(/_/g, '-');
            locationId = selectedId.split('-')[8].replace(/_/g, '-');
            const eventId = selectedId.split('-')[9].replace(/_/g, '-');
            mmddyyyy = selectedId.split('-')[10] + '/' + selectedId.split('-')[11] + '/' + selectedId.split('-')[12];

            console.log(entityId, locationId, eventId, mmddyyyy);

            await this.uploadAudit(entityId, locationId, mmddyyyy, eventId, comments, approved);

          }

        }

        var clickEvent = new MouseEvent("click", {
            "view": window,
            "bubbles": true,
            "cancelable": false
        });
        ((this._SfDetailContainer as HTMLDivElement).querySelector('#button-detail-close') as HTMLButtonElement)!.dispatchEvent(clickEvent);
        if(this.getCurrentTab() == this.TAB_CUSTOM) {
          this.processDateSelection();
        } else {
          if(currentColumnButton != null) {
            currentColumnButton.click();
          }
        }

      });

      if(this.myRole == this.TAB_REPORTER || this.myRole == this.TAB_FUNCTION_HEAD) {

        if(approved) {

          if(((this._SfDetailContainer as HTMLDivElement).querySelector('#button-uploader-submit-report') as HTMLElement) != null) {
            ((this._SfDetailContainer as HTMLDivElement).querySelector('#button-uploader-submit-report') as HTMLElement).style.visibility = 'hidden';
          }
          

        } else {

          if(((this._SfDetailContainer as HTMLDivElement).querySelector('#button-uploader-submit-report') as HTMLElement) != null) {


            ((this._SfDetailContainer as HTMLDivElement).querySelector('#button-uploader-submit-report') as HTMLElement).style.visibility = 'visible';

            (this._SfDetailContainer as HTMLDivElement).querySelector('#button-uploader-submit-report')?.addEventListener('click', async () => {


              const reportercomments = ((this._SfDetailContainer as HTMLDivElement).querySelector('#input-reporter-comments') as HTMLInputElement).value;
              const reporterdoc = ((this._SfDetailContainer as HTMLDivElement).querySelector('#input-reporter-doc') as HTMLInputElement).value.length > 0 ? (new Date(((this._SfDetailContainer as HTMLDivElement).querySelector('#input-reporter-doc') as HTMLInputElement).value).getTime() + "") : "";
              let docs:any[] = [];
              
              if(docsOptional.length === 0) {
                docs = (this._SfUploader[0].querySelector('#uploader') as SfIUploader)!.selectedValues();
              }
      
              if(docs.length === 0 && docsOptional.length === 0) {

                this.setError('No documents uploaded!');
                setTimeout(() => {
                  this.clearMessages();
                }, 3000);

              } else {

                if(reporterdoc.length === 0) {

                  this.setError('Date of completion not selected!');
                  setTimeout(() => {
                    this.clearMessages();
                  }, 3000);

                } else {

                  if(this.selectedItems.length === 0) {

                    console.log('makerscheckers', makercheckers);

                    await this.uploadReport(entityId, locationId, mmddyyyy, event["id"], reportercomments, reporterdoc, docs)
                    if(makercheckers.length > 0) {

                      await this.uploadReview(entityId, locationId, mmddyyyy, event["id"], "Auto approved", true);

                    }

                  } else {

                    for(var k = 0; k < this.selectedItems.length; k++) {
                      
                      const selectedId = this.selectedItems[k];
                      console.log('selectedid', selectedId);

                      const makercheckersL = selectedId.split('-')[5];
                      entityId = selectedId.split('-')[7].replace(/_/g, '-');
                      locationId = selectedId.split('-')[8].replace(/_/g, '-');
                      const eventId = selectedId.split('-')[9].replace(/_/g, '-');
                      mmddyyyy = selectedId.split('-')[10] + '/' + selectedId.split('-')[11] + '/' + selectedId.split('-')[12];

                      console.log(entityId, locationId, eventId, mmddyyyy);

                      await this.uploadReport(entityId, locationId, mmddyyyy, eventId, reportercomments, reporterdoc, docs)
                      if(parseInt(makercheckersL) > 0) {

                        await this.uploadReview(entityId, locationId, mmddyyyy, eventId, "Auto approved", true);

                      }

                    }

                  }

                  var clickEvent = new MouseEvent("click", {
                    "view": window,
                    "bubbles": true,
                    "cancelable": false
                  });

                  ((this._SfDetailContainer as HTMLDivElement).querySelector('#button-detail-close') as HTMLButtonElement)!.dispatchEvent(clickEvent);
                  // await this.fetchUserCalendar_2();
                  // if(this.getCurrentTab() == this.TAB_STREAM) {
                  //   this.renderTabs(this.TAB_STREAM);
                  //   this.renderStream();
                  // }
                  if(this.getCurrentTab() == this.TAB_CUSTOM) {
                    this.processDateSelection();
                  } else {
                    if(currentColumnButton != null) {
                      currentColumnButton.click();
                    }
                  }

                }
              }
              
      
            });


          }

          
        }

        

      }
      
      if(this._SfUploader[0] != null) {

        this._SfUploader[0].querySelector('#uploader').addEventListener('uploadCompleted', (ev: any) => {
          console.log(ev);
        });  

        (this._SfUploader[0].querySelector('#uploader') as SfIUploader)!.prepopulatedInputArr = JSON.stringify([]);
        (this._SfUploader[0].querySelector('#uploader') as SfIUploader)!.loadMode();

        if(docs.length) {
          (this._SfUploader[0].querySelector('#uploader') as SfIUploader)!.prepopulatedInputArr = JSON.stringify(docs);
          (this._SfUploader[0].querySelector('#uploader') as SfIUploader)!.loadMode();
        }

        if(this.myRole == this.TAB_APPROVER || approved) {
          (this._SfUploader[0].querySelector('#uploader') as SfIUploader)!.readOnly = true;
          (this._SfUploader[0].querySelector('#uploader') as SfIUploader)!.loadMode();
        } else {
          (this._SfUploader[0].querySelector('#uploader') as SfIUploader)!.readOnly = false;
          (this._SfUploader[0].querySelector('#uploader') as SfIUploader)!.loadMode();
        }

      }

      
      
      console.log('approved 1', event["approved"], this.myRole, this.TAB_APPROVER);
      if(this.myRole == this.TAB_APPROVER || this.myRole == this.TAB_VIEWER || this.myRole == this.TAB_AUDITOR || this.myRole == this.TAB_FUNCTION_HEAD) {
        console.log('approved 1', event["approved"], this.myRole, this.TAB_APPROVER);
        if(event["approved"] != null) {
          if(event["approved"] === true) {
            console.log('approved 2', event["approved"], this.myRole, this.TAB_APPROVER);
            if(((this._SfDetailContainer as HTMLDivElement).querySelector('#input-approve-yes') as HTMLInputElement) != null) {
              ((this._SfDetailContainer as HTMLDivElement).querySelector('#input-approve-yes') as HTMLInputElement).checked = true;
            }
            if(((this._SfDetailContainer as HTMLDivElement).querySelector('#input-approve-no') as HTMLInputElement) != null) {
              ((this._SfDetailContainer as HTMLDivElement).querySelector('#input-approve-no') as HTMLInputElement).checked = false;
            }
          } else {
            if(((this._SfDetailContainer as HTMLDivElement).querySelector('#input-approve-yes') as HTMLInputElement) != null) {
              ((this._SfDetailContainer as HTMLDivElement).querySelector('#input-approve-yes') as HTMLInputElement)!.checked = false;
            }
            if(((this._SfDetailContainer as HTMLDivElement).querySelector('#input-approve-no') as HTMLInputElement) != null) {
              ((this._SfDetailContainer as HTMLDivElement).querySelector('#input-approve-no') as HTMLInputElement)!.checked = true;
            }
          }
        } else {
          ((this._SfDetailContainer as HTMLDivElement).querySelector('#input-approve-yes') as HTMLInputElement).checked = false;
          ((this._SfDetailContainer as HTMLDivElement).querySelector('#input-approve-no') as HTMLInputElement).checked = true;
        }
      }

    }

  }

  renderCalendar = () => {

    console.log('redering calendar', this.events);

    var startDate = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + this.calendarStartYYYY);

    var html = '';

    for(var i = 0; i < 12; i++) {

      const monthStatus = this.getMonthStatus(startDate.getMonth(), startDate.getFullYear());
      console.log('monthstatus', monthStatus);

      html += '<div class="calendar-item d-flex flex-col flex-grow" part="calendar-month" style="background: linear-gradient(to right, '+this.COLOR_APPROVED+' 0%, '+this.COLOR_APPROVED+' '+ parseInt(monthStatus['percApproved'] + "") +'%, '+this.COLOR_IN_PROGRESS+' '+ parseInt(monthStatus['percApproved'] + "") +'%, '+this.COLOR_IN_PROGRESS+' '+ (parseInt(monthStatus['percApproved'] + "") + parseInt(monthStatus['percInProgress'] + "")) +'%, '+this.COLOR_NOT_STARTED+' '+ (parseInt(monthStatus['percApproved'] + "") + parseInt(monthStatus['percInProgress'] + "")) +'%, '+this.COLOR_NOT_STARTED+' 100%);">';
      html += '<div part="bg-calendar" class="d-flex justify-between align-center p-10">';
      html += '<div part="month-title" class="title-item">' + this.monthNames[startDate.getMonth()] + '&nbsp;&nbsp;' + startDate.getFullYear() + '</div>';
      html += '<button id="calendar-button-'+i+'" part="button-icon-small-light" class="title-item material-icons">open_in_new</button>'
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

  renderTaggingTable = (divElement: any, sourceArray: any, taggingArray: any, sourceCols: any, uploadFunction: any, refreshFunction: any, colName: any, uniqCols: Array<any>, apiIdDropdown: string, dropdownSearchPhrase: any, mandatoryFields: any, jobs: any, anotherProjection: any) => {

    console.log('divelement', divElement);
    console.log('sourcearray', sourceArray);
    console.log('taggingarray', taggingArray);
    console.log('uniqcols', uniqCols);

    this.selectedCbs = [];

    if(taggingArray.length === 0 || sourceArray.length === 0) return;

    const foundArr = [];

    console.log('tagging array before', taggingArray.data.mappings.mappings.length);

    for(var i = 0; i < taggingArray.data.mappings.mappings.length; i++) {

      var found = false;
      for(var j = 0; j < sourceArray.data.mappings.mappings.length; j++) {

        var equal = true;

        for(var k = 0; k < uniqCols.length; k++) {

          if(sourceArray.data.mappings.mappings[j] != null && taggingArray.data.mappings.mappings[i] != null) {
            if(sourceArray.data.mappings.mappings[j][uniqCols[k]] != taggingArray.data.mappings.mappings[i][uniqCols[k]]) {
              equal = false;
            }
          }
          
        }

        if(equal) {
          found = true;
        }

      }
      if(found) {
        foundArr.push(taggingArray.data.mappings.mappings[i]);
      }

      console.log('found', taggingArray.data.mappings.mappings[i].id, found);

    }

    taggingArray.data.mappings.mappings = foundArr;

    console.log('tagging array after', taggingArray.data.mappings.mappings.length,taggingArray.data.mappings.mappings);

    let mandatoryPresent = true;

    for(i = 0; i < (mandatoryFields as Array<string>).length; i++) {

      for(var j = 0; j < taggingArray.data.mappings.mappings.length; j++) {

        console.log('checking mandatory', mandatoryFields[i], taggingArray.data.mappings.mappings[j], taggingArray.data.mappings.mappings[j][mandatoryFields[i]])
        if(taggingArray.data.mappings.mappings[j][mandatoryFields[i]] == null) {
          mandatoryPresent = false;
        }

      }

    }

    var tagged = 0;

    for(var j = 0; j < taggingArray.data.mappings.mappings.length; j++) {

      if(taggingArray.data.mappings.mappings[j] != null) {
        if(taggingArray.data.mappings.mappings[j][colName].length > 0) {
          tagged++;
        }
  
      }
      
    }


    var html = '';

    var showTable = true;

    if(jobs && jobs.data) {
      html += (jobs.data.status == "0" ? "<div part=\"results-title\" class=\"d-flex align-center mb-10\"><span class=\"color-not-started material-icons\">schedule</span>&nbsp; Job initizalied</div>" : jobs.data.status == "1" ? "<div  part=\"results-title\" class=\"d-flex align-center mb-10\"><span class=\"color-pending material-icons\">pending</span>&nbsp; Job in-progress&nbsp; "+parseInt(jobs.data.progress)+"% complete</div>" : "<div part=\"results-title\" class=\"d-flex align-center mb-10\"><span class=\"color-done material-icons\">check_circle</span>&nbsp; Job complete</div>" );
      if(jobs.data.status == "0" || jobs.data.status == "1") {
        showTable = false;
      }
    }

    var status = '';
    if(tagged < sourceArray.data.mappings.mappings.length) {
      status = '<span class="color-pending material-icons">pending</span>';
    } else {
      status = '<span class="color-done material-icons">check_circle</span>';
    }

    var mandatoryStatus = '';
    if(!mandatoryPresent) {
      mandatoryStatus = '<span class="color-late-executed material-icons">error</span>&nbsp;&nbsp;Mandatory fields are not present';
    } else {
      mandatoryStatus = '<span class="color-done material-icons">check_circle</span>&nbsp;&nbsp;Mandatory fields are present';
    }

    if(showTable) {

      html += '<div class="left-sticky mb-10 d-flex justify-between align-center"><h4 part="results-title" class="d-flex align-center m-0">'+status+'&nbsp;&nbsp;Mapped '+tagged+' out of '+sourceArray.data.mappings.mappings.length+'</h4><button part="button" class="button-save">Save</button></div>'

    } else {

      html += '<div class="left-sticky mb-10 d-flex justify-between align-center"><h4 part="results-title" class="d-flex align-center m-0">'+status+'&nbsp;&nbsp;Mapped '+tagged+' out of '+sourceArray.data.mappings.mappings.length+'</h4></div>'

    }
    
    html += '<div class="left-sticky mb-10 d-flex justify-between align-center"><h4 part="results-title" class="d-flex align-center m-0">' + mandatoryStatus + '</h4></div>'

    if(showTable) {

      html += '<table class="mt-20">';

      html += '<thead>';
      html += '<th part="td-head" class="td-head">'
      html += '</th>'
      html += '<th part="td-head" class="td-head">'
      html += colName;
      html += '</th>'
      for(i = 0; i < uniqCols.length; i++) {
        html += '<th part="td-head" class="td-head">'
        html += uniqCols[i];
        html += '</th>'
      }
      for(i = 0; i < sourceCols.length; i++) {
        html += '<th part="td-head" class="td-head">'
        html += sourceCols[i];
        html += '</th>'
      }
      
      // for(i = 0; i < JSON.parse(sourceArray.data.mappings.mappings[0].cols).length; i++) {
      //   html += '<th part="td-head" class="td-head">'
      //   html += JSON.parse(sourceArray.data.mappings.mappings[0].cols)[i];
      //   html += '</th>'
      // }
      html += '</thead>';
      html += '<tbody>';

      for(i = 0; i < sourceArray.data.mappings.mappings.length; i++) {

        var classBg = "";

        if(i%2 === 0) {
          classBg = 'td-light';
        } else {
          classBg = 'td-dark';
        }

        html += '<tr>';

        html += '<td class="td-body '+classBg+'" ><input id="cb-'+i+'" type="checkbox" class="cb-select"/></td>';

        html += '<td class="td-body '+classBg+'" part="td-key">'
        if(apiIdDropdown.length > 0) {
          if(anotherProjection != null) {
            html += '<sf-i-form id="tags-'+i+'" class="tags-input tags-'+i+'" name="Tags" label="Select '+colName+'" apiId="'+apiIdDropdown+'" mode="multiselect-dropdown" searchPhrase="'+this.projectName+((dropdownSearchPhrase != null && dropdownSearchPhrase != "") ? dropdownSearchPhrase : "")+'" selectProjection="name" selectAnotherProjection="'+anotherProjection+'" mandatory></sf-i-form>';
          } else {
            html += '<sf-i-form id="tags-'+i+'" class="tags-input tags-'+i+'" name="Tags" label="Select '+colName+'" apiId="'+apiIdDropdown+'" mode="multiselect-dropdown" searchPhrase="'+this.projectName+((dropdownSearchPhrase != null && dropdownSearchPhrase != "") ? dropdownSearchPhrase : "")+'" selectProjection="name" mandatory></sf-i-form>';
          }
          
        } else {
          html += '<input id="tags-'+i+'" type="text" part="input" class="tags-input"/>';
        }
        html += '</td>'

        for(var l = 0; l < uniqCols.length; l++) {
          html += '<td class="td-body '+classBg+'" part="td-key">'
          html += '<sf-i-elastic-text text="'+sourceArray.data.mappings.mappings[i][uniqCols[l]].replace(/ *\([^)]*\) */g, "")+'" minLength="60"></sf-i-elastic-text>';
          html += '</td>'
        }


        for(l = 0; l < sourceCols.length; l++) {

          for(var j = 0; j < JSON.parse(sourceArray.data.mappings.mappings[0].cols).length; j++) {

            if(sourceCols[l] == JSON.parse(sourceArray.data.mappings.mappings[0].cols)[j]) {
    
              html += '<td class="td-body '+classBg+'" part="td-body">';
    
              console.log('isArray', sourceCols[l], Array.isArray(JSON.parse(sourceArray.data.mappings.mappings[i].data)[j]));
              if(Array.isArray(JSON.parse(sourceArray.data.mappings.mappings[i].data)[j])) {
                
                for(var k = 0; k < JSON.parse(sourceArray.data.mappings.mappings[i].data)[j].length; k++) {
                  html +=  ('<sf-i-elastic-text text="'+JSON.parse(sourceArray.data.mappings.mappings[i].data)[j][k]+'" minLength="60"></sf-i-elastic-text>');
                }
        
              } else {
                html += ('<sf-i-elastic-text text="'+JSON.parse(sourceArray.data.mappings.mappings[i].data)[j]+'" minLength="60"></sf-i-elastic-text>')
              }
    
              html += '</td>';
    
            }
    
          }

        }

        html += '</tr>';
        console.log('i=', i);

      }
      html += '</tbody>';
      html += '</table>';

    }

    divElement.innerHTML = html;

    const multiArr = (divElement as HTMLDivElement).querySelectorAll('.tags-input') as NodeListOf<SfIForm|HTMLInputElement>;

    for(var i = 0; i < multiArr.length; i++) {

      if(apiIdDropdown.length > 0) {

        for(var j = 0; j < taggingArray.data.mappings.mappings.length; j++) {

          var equal = true;

          for(var k = 0; k < uniqCols.length; k++) {

            if(sourceArray.data.mappings.mappings[i] != null && taggingArray.data.mappings.mappings[j] != null) {
              if(sourceArray.data.mappings.mappings[i][uniqCols[k]] != taggingArray.data.mappings.mappings[j][uniqCols[k]]) {
                equal = false;
              }
            }
            
          }

          if(equal) {
            
            // if(taggingArray.data.mappings.mappings[i] != null && taggingArray.data.mappings.mappings[i][colName] != null) {
            //   (multiArr[i] as SfIForm).preselectedValues = JSON.stringify(taggingArray.data.mappings.mappings[i][colName]);
            // }
            (multiArr[i] as SfIForm).preselectedValues = JSON.stringify(taggingArray.data.mappings.mappings[j][colName]);
            if(taggingArray.data.mappings.mappings[j][colName].length > 0) {
              ((multiArr[i] as SfIForm).parentElement as HTMLTableCellElement).setAttribute("part", "row-mapped");
            }

          }

        }

        console.log('preselect', multiArr[i]);

        multiArr[i].addEventListener('valueChanged', ( e: any  ) => {

          const selectedIndex = e.currentTarget.id.split('-')[1];

          taggingArray.data.mappings.mappings = [];

          for(var count = 0; count < sourceArray.data.mappings.mappings.length; count++) {

            taggingArray.data.mappings.mappings[count] = sourceArray.data.mappings.mappings[count];
            console.log('selectedindexchecking', this.selectedCbs, count, this.selectedCbs.includes(selectedIndex), this.selectedCbs.includes(count));
            if(this.selectedCbs.includes(selectedIndex) && this.selectedCbs.includes(count + '')) {
              taggingArray.data.mappings.mappings[count][colName] = ((divElement as HTMLDivElement).querySelector('#tags-' + selectedIndex) as SfIForm).selectedValues();
            } else {
              taggingArray.data.mappings.mappings[count][colName] = ((divElement as HTMLDivElement).querySelector('#tags-' + count) as SfIForm).selectedValues();
            }

          }

          
          this.renderTaggingTable(divElement, sourceArray, taggingArray, sourceCols, uploadFunction, refreshFunction, colName, uniqCols,apiIdDropdown, dropdownSearchPhrase, mandatoryFields, jobs, anotherProjection)
  
        });

      } else {

        if(taggingArray.data.mappings.mappings[i] != null) {
          (multiArr[i] as HTMLInputElement).value = taggingArray.data.mappings.mappings[i][colName];
        }

        multiArr[i].addEventListener('keyup', (e: any) => {

          const selectedIndex = e.currentTarget.id.split('-')[1];

          if(e.key == "Enter") {

            taggingArray.data.mappings.mappings = [];

            for(var count = 0; count < sourceArray.data.mappings.mappings.length; count++) {
              taggingArray.data.mappings.mappings[count] = sourceArray.data.mappings.mappings[count];
              if(this.selectedCbs.includes(selectedIndex) && this.selectedCbs.includes(count + '')) {
                taggingArray.data.mappings.mappings[count][colName] = ((divElement as HTMLDivElement).querySelector('#tags-' + selectedIndex) as HTMLInputElement).value;
              } else {
                taggingArray.data.mappings.mappings[count][colName] = ((divElement as HTMLDivElement).querySelector('#tags-' + count) as HTMLInputElement).value;
              }
              
            }
            
            this.renderTaggingTable(divElement, sourceArray, taggingArray, sourceCols, uploadFunction, refreshFunction, colName, uniqCols,apiIdDropdown, dropdownSearchPhrase, mandatoryFields, jobs, anotherProjection)
    
          }

        });

      }

  
    }

    const buttonSave = (divElement as HTMLDivElement).querySelector('.button-save') as HTMLButtonElement;
    buttonSave?.addEventListener('click', async () => {
      await uploadFunction(taggingArray.data.mappings);
      refreshFunction();
    });

    const cbArr = (divElement as HTMLDivElement).querySelectorAll('.cb-select') as NodeListOf<HTMLInputElement>;
    for(i = 0; i < cbArr.length; i++) {
      cbArr[i].addEventListener('change', (ev: any) => {
        const cbSelectId = ev.currentTarget.id;
        const cbSelectIndex = cbSelectId.split('-')[1];

        if(!this.selectedCbs.includes(cbSelectIndex)) {
          this.selectedCbs.push(cbSelectIndex);
        } else {
          this.selectedCbs.splice(this.selectedCbs.indexOf(cbSelectIndex), 1);
        }
        console.log(this.selectedCbs);
      })
    }

  }

  renderMappingTable = (divElement: any, jsonData: Array<any>, cursor: Array<any>, fetchFunction: any, searchString: string, mappedArray: any, found: number, uploadFunction: any, refreshFunction: any) => {
    console.log('divelement', divElement);
    console.log('jsonData', jsonData);
    console.log('cursor', cursor);
    console.log('fetch', fetchFunction);
    console.log('searchstring', searchString);

    if(jsonData.length === 0) return;

    var html = '';

    html += '<div class="d-flex justify-between align-center left-sticky">';
    html += '<h3 part="results-title">Search Results ('+found+')</h3>';
    html += '<button part="button" class="button-save">Save</button>';
    html += '</div>';

    html += '<table>';

    html += '<thead>';
    html += '<th part="td-head" class="td-head left-sticky">'
    html += 'Select';
    html += '</th>'
    html += '<th part="td-head" class="td-head">'
    html += 'Id';
    html += '</th>'
    for(var i = 0; i < jsonData[0].cols.length; i++) {
      html += '<th part="td-head" class="td-head">'
      html += jsonData[0].cols[i]
      html += '</th>'
    }
    html += '</thead>'

    html += '<tbody>'
    for(var i = 0; i < jsonData.length; i++) {

      var classBg = "";

      if(i%2 === 0) {
        classBg = 'td-light';
      } else {
        classBg = 'td-dark';
      }

      var mapped = "";

      if(jsonData[i].mapped) {
        mapped = "checked";
      }

      html += '<tr>';
      html += '<td part="td-action" class="left-sticky">';
      html += '<div id="select-'+i+'"><input class="checkbox checkbox-'+i+'" part="input-checkbox" type="checkbox" '+mapped+'/></div>';
      html += '</td>';
      html += '<td part="td-body" class="'+classBg+'">';
      html += '<sf-i-elastic-text class="statute id-'+i+'" text="'+(jsonData[i].id)+'" minLength="80"></sf-i-elastic-text>';
      html += '</td>';
      //let data = JSON.parse(jsonData[i].fields.data);
      for(var j = 0; j < JSON.parse(jsonData[i].data.cols).length; j++) {

        if(jsonData[i].cols.includes(JSON.parse(jsonData[i].data.cols)[j])) {
          html += '<td part="td-body" class="td-body '+classBg+'">';
          if(Array.isArray(JSON.parse(jsonData[i].data.data)[j])) {

            for(var k = 0; k < JSON.parse(jsonData[i].data.data)[j].length; k++) {
              html +=  ('<sf-i-elastic-text text="'+JSON.parse(jsonData[i].data.data)[j][k]+'" minLength="80"></sf-i-elastic-text>');
              // if(k < (JSON.parse(jsonData[i].data.data)[j].length - 1)) {
              //   html += "; ";
              // }
            }

          } else {
            html += ('<sf-i-elastic-text text="'+JSON.parse(jsonData[i].data.data)[j]+'" minLength="80"></sf-i-elastic-text>')
          }
          html += '</td>';
        }

      }
      html += '</tr>';
    }
    html += '</tbody>'
    html += '</table>';

    // html += '<div class="mt-10 mb-10 d-flex justify-center align-center left-sticky">';
    //   if(cursor[cursor.length - 1].prev != "") {
    //     html += '<button part="button-icon" class="material-icons ml-10 mr-10 button-prev">navigate_before</button>'
    //   }
    //   html += '<label part="input-label" class="ml-10 mr-10">'+cursor.length+' of '+Math.ceil(found/this.SEARCH_BLOCK_SIZE)+'</label>'
    //   if(jsonData.length === this.SEARCH_BLOCK_SIZE) {
    //     html += '<button part="button-icon" class="material-icons ml-10 mr-10 button-next">navigate_next</button>'
    //   }
    // html += '</div>';

    divElement.innerHTML = html;

    (this._SfButtonNext as HTMLButtonElement)?.addEventListener('click', async () => {
      const resultFunction = await fetchFunction(searchString, cursor[cursor.length - 1].next);
      console.log(resultFunction);
      if(resultFunction != null) {
        const jsonData1 = [];
        for(var i = 0; i < resultFunction.values.length; i++) {
          var mapped = false;
          for(var j = 0; j < mappedArray.data.mappings.mappings.length; j++) {
            if(mappedArray.data.mappings.mappings[j].id == resultFunction.values[i].id) {
              if(mappedArray.data.mappings.mappings[j].selected) {
                mapped = true;
              }
            }
          }
          for(var j = 0; j < mappedArray.data.mappings.mappings.length; j++) {
            if(mappedArray.data.mappings.mappings[j].id == resultFunction.values[i].id) {
              if(mappedArray.data.mappings.mappings[j].selected) {
                mapped = true;
              }
            }
          }

          jsonData1.push({id: resultFunction.values[i].id, mapped: mapped, data: resultFunction.values[i].fields, cols: jsonData[0].cols})
        }
        console.log('clicked', jsonData1);
        cursor.push({prev: cursor[cursor.length - 1].next, next: resultFunction.cursor})
        this.renderMappingTable(divElement, jsonData1, cursor, fetchFunction, searchString, mappedArray, found, uploadFunction, refreshFunction)
      }
    });

    (this._SfButtonPrev as HTMLButtonElement)?.addEventListener('click', async () => {
      cursor.pop();
      const resultFunction = await fetchFunction(searchString, cursor[cursor.length - 1].prev);
      console.log(resultFunction);
      if(resultFunction != null) {
        const jsonData1 = [];
        for(var i = 0; i < resultFunction.values.length; i++) {
          var mapped = false;
          for(var j = 0; j < mappedArray.data.mappings.mappings.length; j++) {
            if(mappedArray.data.mappings.mappings[j].id == resultFunction.values[i].id) {
              if(mappedArray.data.mappings.mappings[j].selected) {
                mapped = true;
              }
            }
          }
          jsonData1.push({id: resultFunction.values[i].id, mapped: mapped, data: resultFunction.values[i].fields, cols: jsonData[0].cols})
        }
        console.log('clicked', jsonData1);
        this.renderMappingTable(divElement, jsonData1, cursor, fetchFunction, searchString, mappedArray, found, uploadFunction, refreshFunction)
      }
    });

    (this._SfButtonSave as HTMLButtonElement)?.addEventListener('click', async () => {
      const checkboxArr = (divElement as HTMLDivElement).querySelectorAll('.checkbox') as NodeListOf<HTMLInputElement>;
      const statuteArr = (divElement as HTMLDivElement).querySelectorAll('.statute') as NodeListOf<SfIElasticText>;
      console.log(checkboxArr);
      console.log(statuteArr);
      const jsonArr = [];
      for(var i = 0; i < checkboxArr.length; i++) {
        jsonArr.push({id: (statuteArr[i] as SfIElasticText).text, selected: checkboxArr[i].checked, data: jsonData[i].data.data, cols: jsonData[i].data.cols})
      }
      console.log('jsonArr', jsonArr);
      await uploadFunction({"searchstring": searchString, "mappings": jsonArr});
      refreshFunction();
    });


  }

  refreshCalendar = async () => {

    console.log('tabs',this.myOnboardingTab,this.TAB_CALENDAR);
    
    if(this.myOnboardingTab == this.TAB_CALENDAR) {

      const calendarJobs = await this.fetchCalendarJobs();

      if(calendarJobs.data.status == "0" || calendarJobs.data.status == "1") {
        
        setTimeout(async () => {
          await this.loadOnboardingCalendar();
          this.refreshCalendar();
        }, 10000);
      }

    }

  }

  renderOnboardingCalendar = (calendarJobs: any) => {

    console.log('calendarjobs', calendarJobs);

    var html = '';

    html += '<div id="calendar-list-container" class="pb-10 pt-10 w-100">';

      html += '<div class="d-flex justify-center align-center w-100">';
        html += '<h3 part="results-title">Calendar Status</h3>';
      html += '</div>';
    
      if(calendarJobs.data != null) {

        html += '<div class="d-flex justify-center align-center w-100">';

          html += '<div class="p-10">';
            html += '<div part="input-label" class="text-center">Job Status</div>';
            html += '<div class="d-flex align-center text-center">' + (calendarJobs.data.status == "0" ? "<span class=\"color-not-started material-icons\">schedule</span>&nbsp;Initialized" : calendarJobs.data.status == "1" ? "<span class=\"color-pending material-icons\">pending</span>&nbsp;In-Progress" : "<span class=\"color-done material-icons\">check_circle</span>&nbsp;Complete" ) + '</div>';
          html += '</div>';

          html += '<div class="p-10">';
            html += '<div part="input-label" class="text-center">Last Updated</div>';
            html += '<div class="text-center">' + new Date(calendarJobs.data.lastupdated).toLocaleString() + '</div>';
          html += '</div>';
        html += '</div>';

      }

      html += '<div class="d-flex justify-center align-center w-100 mt-20">';
        html += '<button part="button" class="button-submit d-flex align-center"><span class="material-icons">bolt</span>&nbsp;<span>Update Calendar</span></button>';
      html += '</div>';

    html += '</div>';

    (this._SfOnboardingCalendarContainer as HTMLDivElement).innerHTML = html;

    (this._SfOnboardingCalendarContainer as HTMLDivElement).querySelector('.button-submit')?.addEventListener('click', async () => {
      await this.fetchGetMappedCalendar();
      setTimeout( () => {
        this.refreshCalendar();
      }, 10000);
    });

    //this.refreshCalendar();

  }

  renderOnboardingInternalControls = (mappedInternalControls: any, mappedSerializedAlertSchedules: any, internalcontrolsJobs: any) => {

    var html = '';

    html += '<div id="internalcontrols-list-container" class="d-flex flex-col w-100 scroll-x">';
    html += '</div>';

    (this._SfOnboardingInternalControlsContainer as HTMLDivElement).innerHTML = html;

    this.renderTaggingTable((this._SfOnboardingInternalControlsListContainer as HTMLDivElement),mappedSerializedAlertSchedules, mappedInternalControls, ["firstlineofdefence", "obligation", "country", "statute"], this.uploadInternalControlsMapping, this.loadMode, "internalcontrols", ["id", "entityname", "locationname"], '', "", ["reporters", "functions", "tags", "approvers", "functionheads", "auditors", "viewers", "docs", "makercheckers", "duedates", "alertschedules", "internalcontrols"], internalcontrolsJobs, null);

  }

  renderOnboardingAlertSchedules = (mappedAlertSchedules: any, mappedSerializedDuedates: any, alertschedulesJobs: any) => {

    var html = '';

    html += '<div id="alertschedules-list-container" class="d-flex flex-col w-100 scroll-x">';
    html += '</div>';

    (this._SfOnboardingAlertSchedulesContainer as HTMLDivElement).innerHTML = html;

    this.renderTaggingTable((this._SfOnboardingAlertSchedulesListContainer as HTMLDivElement),mappedSerializedDuedates, mappedAlertSchedules, ["firstlineofdefence", "obligation", "country", "statute"], this.uploadAlertSchedulesMapping, this.loadMode, "alertschedules", ["id", "entityname", "locationname"], '', "", ["reporters", "functions", "tags", "approvers", "functionheads", "auditors", "viewers", "docs", "makercheckers", "duedates", "alertschedules"], alertschedulesJobs, null);

  }

  renderOnboardingDuedates = (mappedDuedates: any, mappedSerializedMakerCheckers: any, duedatesJobs: any) => {

    var html = '';

    html += '<div id="duedates-list-container" class="d-flex flex-col w-100 scroll-x">';
    html += '</div>';

    (this._SfOnboardingDuedatesContainer as HTMLDivElement).innerHTML = html;

    this.renderTaggingTable((this._SfOnboardingDuedatesListContainer as HTMLDivElement),mappedSerializedMakerCheckers, mappedDuedates, ["firstlineofdefence", "obligation", "country", "statute"], this.uploadDuedatesMapping, this.loadMode, "duedates", ["id", "entityname", "locationname"], '', "", ["reporters", "functions", "tags", "approvers", "functionheads", "auditors", "viewers", "docs", "makercheckers", "duedates"], duedatesJobs, null);

  }

  renderOnboardingReporters = (mappedReporters: any, mappedSerializedTags: any, reportersJobs: any) => {

    var html = '';

    html += '<div id="reporters-list-container" class="d-flex flex-col w-100 scroll-x">';
    html += '</div>';

    (this._SfOnboardingReportersContainer as HTMLDivElement).innerHTML = html;

    this.renderTaggingTable((this._SfOnboardingReportersListContainer as HTMLDivElement),mappedSerializedTags, mappedReporters, ["firstlineofdefence", "obligation", "country", "statute"], this.uploadReportersMapping, this.loadMode, "reporters", ["id", "entityname", "locationname"], this.apiIdUsers, "", ["reporters", "functions", "tags"], reportersJobs, null);

  }

  renderOnboardingApprovers = (mappedApprovers: any, mappedSerializedReporters: any, approversJobs: any) => {

    var html = '';

    html += '<div id="approvers-list-container" class="d-flex flex-col w-100 scroll-x">';
    html += '</div>';

    (this._SfOnboardingApproversContainer as HTMLDivElement).innerHTML = html;

    this.renderTaggingTable((this._SfOnboardingApproversListContainer as HTMLDivElement),mappedSerializedReporters, mappedApprovers, ["firstlineofdefence", "obligation", "country", "statute"], this.uploadApproversMapping, this.loadMode, "approvers", ["id", "entityname", "locationname"], this.apiIdUsers, "", ["approvers", "functions", "tags", "reporters"], approversJobs, null);

  }

  renderOnboardingFunctionHeads = (mappedFunctionHeads: any, mappedSerializedApprovers: any, functionHeadsJobs: any) => {

    var html = '';

    html += '<div id="functionheads-list-container" class="d-flex flex-col w-100 scroll-x">';
    html += '</div>';

    (this._SfOnboardingFunctionHeadsContainer as HTMLDivElement).innerHTML = html;

    this.renderTaggingTable((this._SfOnboardingFunctionHeadsListContainer as HTMLDivElement),mappedSerializedApprovers, mappedFunctionHeads, ["firstlineofdefence", "obligation", "country", "statute"], this.uploadFunctionHeadsMapping, this.loadMode, "functionheads", ["id", "entityname", "locationname"], this.apiIdUsers, "", ["approvers", "functions", "tags", "reporters", "functionheads"], functionHeadsJobs, null);

  }

  renderOnboardingMakerCheckers = (mappedMakerCheckers: any, mappedSerializedDocs: any, makerCheckerJobs: any) => {

    var html = '';

    html += '<div id="makercheckers-list-container" class="d-flex flex-col w-100 scroll-x">';
    html += '</div>';

    (this._SfOnboardingMakerCheckersContainer as HTMLDivElement).innerHTML = html;

    this.renderTaggingTable((this._SfOnboardingMakerCheckersListContainer as HTMLDivElement),mappedSerializedDocs, mappedMakerCheckers, ["firstlineofdefence", "obligation", "country", "statute"], this.uploadMakerCheckersMapping, this.loadMode, "makercheckers", ["id", "entityname", "locationname"], this.apiIdTags, "&MakerChecker", ["approvers", "functions", "tags", "reporters", "functionheads", "auditors", "viewers", "docs", "makercheckers"], makerCheckerJobs, null);

  }

  renderOnboardingDocs = (mappedDocs: any, mappedSerializedViewers: any, docsJobs: any) => {

    var html = '';

    html += '<div id="docs-list-container" class="d-flex flex-col w-100 scroll-x">';
    html += '</div>';

    (this._SfOnboardingDocsContainer as HTMLDivElement).innerHTML = html;

    this.renderTaggingTable((this._SfOnboardingDocsListContainer as HTMLDivElement),mappedSerializedViewers, mappedDocs, ["firstlineofdefence", "obligation", "country", "statute"], this.uploadDocsMapping, this.loadMode, "docs", ["id", "entityname", "locationname"], this.apiIdTags, "&MakerChecker", ["approvers", "functions", "tags", "reporters", "functionheads", "auditors", "viewers", "docs"], docsJobs, null);

  }

  renderOnboardingAuditors = (mappedAuditors: any, mappedSerializedFunctionheads: any, auditorsJobs: any) => {

    console.log('inside rendering auditors..');

    var html = '';

    html += '<div id="auditors-list-container" class="d-flex flex-col w-100 scroll-x">';
    html += '</div>';

    (this._SfOnboardingAuditorsContainer as HTMLDivElement).innerHTML = html;

    this.renderTaggingTable((this._SfOnboardingAuditorsListContainer as HTMLDivElement),mappedSerializedFunctionheads, mappedAuditors, ["firstlineofdefence", "obligation", "country", "statute"], this.uploadAuditorsMapping, this.loadMode, "auditors", ["id", "entityname", "locationname"], this.apiIdUsers, "", ["approvers", "functions", "tags", "reporters", "functionheads", "auditors"], auditorsJobs, null);

  }

  renderOnboardingViewers = (mappedViewers: any, mappedSerializedAuditors: any, viewersJobs: any) => {

    console.log('inside rendering viewers..');

    var html = '';

    html += '<div id="viewers-list-container" class="d-flex flex-col w-100 scroll-x">';
    html += '</div>';

    (this._SfOnboardingViewersContainer as HTMLDivElement).innerHTML = html;

    this.renderTaggingTable((this._SfOnboardingViewersListContainer as HTMLDivElement),mappedSerializedAuditors, mappedViewers, ["firstlineofdefence", "obligation", "country", "statute"], this.uploadViewersMapping, this.loadMode, "viewers", ["id", "entityname", "locationname"], this.apiIdUsers, "", ["approvers", "functions", "tags", "reporters", "functionheads", "auditors", "viewers"], viewersJobs, null);

  }

  renderOnboardingTags = (mappedTags: any, mappedSerializedFunctions: any, tagsJobs: any) => {

    var html = '';

    html += '<div id="tags-list-container" class="d-flex flex-col w-100 scroll-x">';
    html += '</div>';

    (this._SfOnboardingTagsContainer as HTMLDivElement).innerHTML = html;

    this.renderTaggingTable((this._SfOnboardingTagsListContainer as HTMLDivElement),mappedSerializedFunctions, mappedTags, ["firstlineofdefence", "obligationtype", "obligation", "reference", "country", "statute"], this.uploadTagsMapping, this.loadMode, "tags", ["id", "countryname", "entityname", "locationname"], this.apiIdTags, "&Tag", ["tags", "functions"], tagsJobs, "tagtype");

  }

  renderOnboardingFunctions = (mappedFunctions: any, mappedSerializedLocations: any, functionsJobs: any) => {

    var html = '';

    html += '<div id="functions-list-container" class="d-flex flex-col w-100 scroll-x">';
    html += '</div>';

    (this._SfOnboardingFunctionsContainer as HTMLDivElement).innerHTML = html;

    this.renderTaggingTable((this._SfOnboardingFunctionsListContainer as HTMLDivElement),mappedSerializedLocations, mappedFunctions, ["firstlineofdefence", "obligation", "country", "statute"], this.uploadFunctionsMapping, this.loadMode, "functions", ["id", "countryname", "entityname", "locationname"], this.apiIdTags, "&Function", ["functions"], functionsJobs, null);

  }

  renderOnboardingLocations = (mappedLocations: any, mappedSerializedEntities: any, locationsJobs: any) => {

    var html = '';

    html += '<div id="locations-list-container" class="d-flex flex-col w-100 scroll-x">';
    html += '</div>';

    (this._SfOnboardingLocationsContainer as HTMLDivElement).innerHTML = html;

    this.renderTaggingTable((this._SfOnboardingLocationsListContainer as HTMLDivElement),mappedSerializedEntities, mappedLocations, ["firstlineofdefence", "obligation", "country", "statute"], this.uploadLocationsMapping, this.loadMode, "locations", ["id", "countryname", "entityname"], this.apiIdTags, "&Location", ["locations"], locationsJobs, null);

  }

  renderOnboardingCompliances = (mappedStatutes: any, mappedCompliances: any) => {

    console.log('mappedcompliances', mappedCompliances);
    console.log('mappedstatutes', mappedStatutes);

    var searchString = "";

    for(var i = 0; i < (mappedStatutes.data.mappings.mappings as Array<any>).length; i++) {
      if((mappedStatutes.data.mappings.mappings as Array<any>)[i].selected) {
        searchString += (mappedStatutes.data.mappings.mappings as Array<any>)[i].id + "|";
      }
    }
    searchString = searchString.slice(0, -1);

    console.log('searchstring', searchString);

    var initCursor = "";

    var html = '';

    html += '<div class="d-flex flex-col w-100">';
    html += '<label part="input-label">Search Compliances</label>';
      html += '<div class="d-flex">';
      html += '<input part="input" type="text" class="w-100 input-search" placeholder="Use | to separate..." disabled/>'
      html += '<button part="button-icon" class="ml-10 material-icons button-search">search</button>'
      html += '</div>';
    html += '</div>';

    html += '<div id="compliances-list-container" class="d-flex flex-col w-100 scroll-x">';
    html += '</div>';

    (this._SfOnboardingCompliancesContainer as HTMLDivElement).innerHTML = html;

    // (this._SfInputSearch as HTMLInputElement).addEventListener('keyup', (e: any) => {
    //   if(e.key == 'Enter') {
    //     (this._SfButtonSearch as HTMLButtonElement).click();
    //   }
    // });
    
    (this._SfButtonSearch as HTMLButtonElement).addEventListener('click', async () => {
      console.log('clicked', mappedStatutes.data.mappings.mappings);
      // const searchString = (this._SfInputSearch as HTMLButtonElement).value;
      if(searchString.length > 0) {
        const resultCompliances = await this.fetchSearchCompliances(searchString, "");
        console.log('resultcompliances', resultCompliances);
        if(resultCompliances != null) {
          const jsonData = [];
          for(var i = 0; i < resultCompliances.values.length; i++) {
            var mapped = false;
            for(var j = 0; j < mappedCompliances.data.mappings.mappings.length; j++) {
              if(mappedCompliances.data.mappings.mappings[j].id == resultCompliances.values[i].id) {
                if(mappedCompliances.data.mappings.mappings[j].selected) {
                  mapped = true;
                }
              }
            }

            jsonData.push({id: resultCompliances.values[i].id, mapped: mapped, data: resultCompliances.values[i].fields, cols: ["country", "state", "category", "statute", "applicability", "obligation", "risk", "riskarea", "frequency", "penalty"]})
          }
          console.log('clicked', jsonData);
          this.renderMappingTable((this._SfOnboardingCompliancesListContainer as HTMLDivElement), jsonData, [{prev: initCursor, next: resultCompliances.cursor}], this.fetchSearchCompliances, searchString, mappedCompliances, resultCompliances.found, this.uploadCompliancesMapping, this.loadMode)
        }
      }
    });

    console.log('compliances searchstring', searchString);

    if(searchString != "") {
      (this._SfInputSearch as HTMLInputElement).value = searchString;
      (this._SfButtonSearch as HTMLButtonElement).click();
    }

  }

  renderOnboardingEntities = (mappedEntities: any, mappedSerializedCountries: any, entitiesJobs: any) => {

    var html = '';

    html += '<div id="entities-list-container" class="d-flex flex-col w-100 scroll-x">';
    html += '</div>';

    (this._SfOnboardingEntitiesContainer as HTMLDivElement).innerHTML = html;

    this.renderTaggingTable((this._SfOnboardingEntitiesListContainer as HTMLDivElement),mappedSerializedCountries, mappedEntities, ["firstlineofdefence", "obligation", "country", "statute"], this.uploadEntitiesMapping, this.loadMode, "entities", ["id", "countryname"], this.apiIdTags, "&Entity", ["entities"], entitiesJobs, null);

  }

  renderOnboardingCountries = (mappedCountries: any, mappedCompliances: any, countriesJobs: any) => {

    var html = '';

    html += '<div id="countries-list-container" class="d-flex flex-col w-100 scroll-x">';
    html += '</div>';

    (this._SfOnboardingCountriesContainer as HTMLDivElement).innerHTML = html;

    const arr1 = [];

    for(var i = 0; i < mappedCompliances.data.mappings.mappings.length; i++) {
      if(mappedCompliances.data.mappings.mappings[i].selected) {
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

    this.renderTaggingTable((this._SfOnboardingCountriesListContainer as HTMLDivElement), mappedCompliances, mappedCountries, ["firstlineofdefence", "obligation", "country", "statute"], this.uploadCountriesMapping, this.loadMode, "countries", ["id"], this.apiIdTags, "-Country", ["countries"], countriesJobs, null);

  }

  renderOnboardingStatutes = (mappedStatutes: any) => {

    var initCursor = "";

    var html = '';

    html += '<div class="d-flex flex-col w-100">';
    html += '<label part="input-label">Search Statutes</label>';
      html += '<div class="d-flex">';
      html += '<input part="input" type="text" class="w-100 input-search" placeholder="Use | to separate..." autofocus/>'
      html += '<button part="button-icon" class="ml-10 material-icons button-search">search</button>'
      html += '</div>';
    html += '</div>';

    html += '<div id="statutes-list-container" class="d-flex flex-col w-100 scroll-x">';
    html += '</div>';

    (this._SfOnboardingStatutesContainer as HTMLDivElement).innerHTML = html;

    (this._SfInputSearch as HTMLInputElement).addEventListener('keyup', (e: any) => {
      if(e.key == 'Enter') {
        (this._SfButtonSearch as HTMLButtonElement).click();
      }
    });
    
    (this._SfButtonSearch as HTMLButtonElement).addEventListener('click', async () => {
      console.log('clicked', mappedStatutes.data.mappings.mappings);
      const searchString = (this._SfInputSearch as HTMLButtonElement).value;
      console.log('clicked', searchString);
      if(searchString.length > 0) {
        const resultStatutes = await this.fetchSearchStatutes(searchString, "");
        if(resultStatutes != null) {
          const jsonData = [];
          for(var i = 0; i < resultStatutes.values.length; i++) {
            var mapped = false;
            for(var j = 0; j < mappedStatutes.data.mappings.mappings.length; j++) {
              if(mappedStatutes.data.mappings.mappings[j].id == resultStatutes.values[i].id) {
                console.log('comparing',mappedStatutes.data.mappings.mappings[j].id,resultStatutes.values[i].id);
                if(mappedStatutes.data.mappings.mappings[j].selected) {
                  mapped = true;
                }
              }
            }

            jsonData.push({id: resultStatutes.values[i].id, mapped: mapped, data: resultStatutes.values[i].fields, cols: ["country", "state", "name", "category", "shortid"]})
          }
          console.log('clicked', jsonData);
          this.renderMappingTable((this._SfOnboardingStatutesListContainer as HTMLDivElement), jsonData, [{prev: initCursor, next: resultStatutes.cursor}], this.fetchSearchStatutes, searchString, mappedStatutes, resultStatutes.found, this.uploadStatutesMapping, this.loadMode)
        }
      }
    });

    if(mappedStatutes.data.mappings.searchstring != "" && mappedStatutes.data.mappings.searchstring != null) {
      (this._SfInputSearch as HTMLInputElement).value = mappedStatutes.data.mappings.searchstring;
      (this._SfButtonSearch as HTMLButtonElement).click();
    }

  }

  clickOnboardingTabs = () => {

    if(this.myOnboardingTab == this.TAB_STATUTES) {
      ((this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-statutes') as HTMLButtonElement).click();
    }
    if(this.myOnboardingTab == this.TAB_COMPLIANCES) {
      ((this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-compliances') as HTMLButtonElement).click();
    }
    if(this.myOnboardingTab == this.TAB_COUNTRIES) {
      ((this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-countries') as HTMLButtonElement).click();
    }
    if(this.myOnboardingTab == this.TAB_ENTITIES) {
      ((this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-entities') as HTMLButtonElement).click();
    }
    if(this.myOnboardingTab == this.TAB_LOCATIONS) {
      ((this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-locations') as HTMLButtonElement).click();
    }
    if(this.myOnboardingTab == this.TAB_FUNCTIONS) {
      ((this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-functions') as HTMLButtonElement).click();
    }
    if(this.myOnboardingTab == this.TAB_TAGS) {
      ((this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-tags') as HTMLButtonElement).click();
    }
    if(this.myOnboardingTab == this.TAB_REPORTERS) {
      ((this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-reporters') as HTMLButtonElement).click();
    }
    if(this.myOnboardingTab == this.TAB_APPROVERS) {
      ((this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-approvers') as HTMLButtonElement).click();
    }
    if(this.myOnboardingTab == this.TAB_FUNCTION_HEADS) {
      ((this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-functionheads') as HTMLButtonElement).click();
    }
    if(this.myOnboardingTab == this.TAB_AUDITORS) {
      ((this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-auditors') as HTMLButtonElement).click();
    }
    if(this.myOnboardingTab == this.TAB_VIEWERS) {
      ((this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-viewers') as HTMLButtonElement).click();
    }
    if(this.myOnboardingTab == this.TAB_DOCS) {
      ((this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-docs') as HTMLButtonElement).click();
    }
    if(this.myOnboardingTab == this.TAB_MAKER_CHECKERS) {
      ((this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-makercheckers') as HTMLButtonElement).click();
    }
    if(this.myOnboardingTab == this.TAB_DUEDATES) {
      ((this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-duedates') as HTMLButtonElement).click();
    }
    if(this.myOnboardingTab == this.TAB_ALERTSCHEDULES) {
      ((this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-alertschedules') as HTMLButtonElement).click();
    }
    if(this.myOnboardingTab == this.TAB_INTERNALCONTROLS) {
      ((this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-internalcontrols') as HTMLButtonElement).click();
    }
    if(this.myOnboardingTab == this.TAB_CALENDAR) {
      ((this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-calendar') as HTMLButtonElement).click();
    }

  }

  renderOnboardingTabs = () => {

    console.log('render onboarding tabs');

    (this._SfOnboardingTabContainer as HTMLDivElement).innerHTML = '';

    var html = '';

    html += '<button class="tab-button mb-10" id="onboarding-tab-statutes" part="'+(this.myOnboardingTab == this.TAB_STATUTES ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Statutes</button>';
    html += '<button class="tab-button mb-10" id="onboarding-tab-compliances" part="'+(this.myOnboardingTab == this.TAB_COMPLIANCES ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Compliances</button>';
    html += '<button class="tab-button mb-10" id="onboarding-tab-countries" part="'+(this.myOnboardingTab == this.TAB_COUNTRIES ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Countries</button>';
    html += '<button class="tab-button mb-10" id="onboarding-tab-entities" part="'+(this.myOnboardingTab == this.TAB_ENTITIES ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Entities</button>';
    html += '<button class="tab-button mb-10" id="onboarding-tab-locations" part="'+(this.myOnboardingTab == this.TAB_LOCATIONS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Locations</button>';
    html += '<button class="tab-button mb-10" id="onboarding-tab-functions" part="'+(this.myOnboardingTab == this.TAB_FUNCTIONS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Functions</button>';
    html += '<button class="tab-button mb-10" id="onboarding-tab-tags" part="'+(this.myOnboardingTab == this.TAB_TAGS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Tags</button>';
    html += '<button class="tab-button mb-10" id="onboarding-tab-reporters" part="'+(this.myOnboardingTab == this.TAB_REPORTERS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Reporters</button>';
    html += '<button class="tab-button mb-10" id="onboarding-tab-approvers" part="'+(this.myOnboardingTab == this.TAB_APPROVERS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Approvers</button>';
    html += '<button class="tab-button mb-10" id="onboarding-tab-functionheads" part="'+(this.myOnboardingTab == this.TAB_FUNCTION_HEADS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Function Heads</button>';
    html += '<button class="tab-button mb-10" id="onboarding-tab-auditors" part="'+(this.myOnboardingTab == this.TAB_AUDITORS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Auditors</button>';
    html += '<button class="tab-button mb-10" id="onboarding-tab-viewers" part="'+(this.myOnboardingTab == this.TAB_VIEWERS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Viewers</button>';
    html += '<button class="tab-button mb-10" id="onboarding-tab-docs" part="'+(this.myOnboardingTab == this.TAB_DOCS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Docs</button>';
    html += '<button class="tab-button mb-10" id="onboarding-tab-makercheckers" part="'+(this.myOnboardingTab == this.TAB_MAKER_CHECKERS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Maker Checkers</button>';
    html += '<button class="tab-button mb-10" id="onboarding-tab-duedates" part="'+(this.myOnboardingTab == this.TAB_DUEDATES ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Duedates</button>';
    html += '<button class="tab-button mb-10" id="onboarding-tab-alertschedules" part="'+(this.myOnboardingTab == this.TAB_ALERTSCHEDULES ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Alert Schedules</button>';
    html += '<button class="tab-button mb-10" id="onboarding-tab-internalcontrols" part="'+(this.myOnboardingTab == this.TAB_INTERNALCONTROLS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Internal Controls</button>';
    html += '<button class="tab-button mb-10" id="onboarding-tab-calendar" part="'+(this.myOnboardingTab == this.TAB_CALENDAR ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Calendar</button>';

    (this._SfOnboardingTabContainer as HTMLDivElement).innerHTML = html;

    (this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-statutes')?.addEventListener('click', async () => {

      this.myOnboardingTab = this.TAB_STATUTES;
      this.renderOnboardingTabs();
      await this.loadOnboardingStatutes();

    });

    (this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-compliances')?.addEventListener('click', async () => {

      this.myOnboardingTab = this.TAB_COMPLIANCES;
      this.renderOnboardingTabs();
      this.loadOnboardingCompliances();

    });

    (this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-countries')?.addEventListener('click', async () => {

      this.myOnboardingTab = this.TAB_COUNTRIES;
      this.renderOnboardingTabs();
      this.loadOnboardingCountries();

    });

    (this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-entities')?.addEventListener('click', async () => {

      this.myOnboardingTab = this.TAB_ENTITIES;
      this.renderOnboardingTabs();
      this.loadOnboardingEntities();

    });

    (this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-locations')?.addEventListener('click', async () => {

      this.myOnboardingTab = this.TAB_LOCATIONS;
      this.renderOnboardingTabs();
      this.loadOnboardingLocations();

    });

    (this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-functions')?.addEventListener('click', async () => {

      this.myOnboardingTab = this.TAB_FUNCTIONS;
      this.renderOnboardingTabs();
      this.loadOnboardingFunctions();

    });

    (this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-tags')?.addEventListener('click', async () => {

      this.myOnboardingTab = this.TAB_TAGS;
      this.renderOnboardingTabs();
      this.loadOnboardingTags();

    });

    (this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-reporters')?.addEventListener('click', async () => {

      this.myOnboardingTab = this.TAB_REPORTERS;
      this.renderOnboardingTabs();
      this.loadOnboardingReporters();

    });

    (this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-approvers')?.addEventListener('click', async () => {

      this.myOnboardingTab = this.TAB_APPROVERS;
      this.renderOnboardingTabs();
      this.loadOnboardingApprovers();

    });

    (this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-functionheads')?.addEventListener('click', async () => {

      this.myOnboardingTab = this.TAB_FUNCTION_HEADS;
      this.renderOnboardingTabs();
      this.loadOnboardingFunctionHeads();

    });

    (this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-auditors')?.addEventListener('click', async () => {

      this.myOnboardingTab = this.TAB_AUDITORS;
      this.renderOnboardingTabs();
      this.loadOnboardingAuditors();

    });

    (this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-viewers')?.addEventListener('click', async () => {

      this.myOnboardingTab = this.TAB_VIEWERS;
      this.renderOnboardingTabs();
      this.loadOnboardingViewers();

    });

    (this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-makercheckers')?.addEventListener('click', async () => {

      this.myOnboardingTab = this.TAB_MAKER_CHECKERS;
      this.renderOnboardingTabs();
      this.loadOnboardingMakerCheckers();

    });

    (this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-docs')?.addEventListener('click', async () => {

      this.myOnboardingTab = this.TAB_DOCS;
      this.renderOnboardingTabs();
      this.loadOnboardingDocs();

    });

    (this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-duedates')?.addEventListener('click', async () => {

      this.myOnboardingTab = this.TAB_DUEDATES;
      this.renderOnboardingTabs();
      this.loadOnboardingDuedates();

    });

    (this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-alertschedules')?.addEventListener('click', async () => {

      this.myOnboardingTab = this.TAB_ALERTSCHEDULES;
      this.renderOnboardingTabs();
      this.loadOnboardingAlertSchedules();

    });

    (this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-internalcontrols')?.addEventListener('click', async () => {

      this.myOnboardingTab = this.TAB_INTERNALCONTROLS;
      this.renderOnboardingTabs();
      this.loadOnboardingInternalControls();

    });

    (this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-calendar')?.addEventListener('click', async () => {

      this.myOnboardingTab = this.TAB_CALENDAR;
      this.renderOnboardingTabs();
      this.loadOnboardingCalendar();

    });

    
  }

  proceedToCalendar = async () => {
    this.renderRoleTabs();
    await this.fetchUserCalendar_2();
    this.enableCalendar();
    if(this.events != null) {
      this.renderTabs(this.TAB_YEAR);
      this.renderCalendar();
    }
  }

  renderRoleTabs = () => {

    console.log('render role tabs');

    (this._SfRoleTabContainer as HTMLDivElement).innerHTML = '';

    var html = '';

    html += '<button class="tab-button" id="consumer-tab-reporter" part="'+(this.myRole == this.TAB_REPORTER ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Reporter</button>';
    html += '<button class="tab-button" id="consumer-tab-approver" part="'+(this.myRole == this.TAB_APPROVER ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Approver</button>';
    html += '<button class="tab-button" id="consumer-tab-functionhead" part="'+(this.myRole == this.TAB_FUNCTION_HEAD ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Function Head</button>';
    html += '<button class="tab-button" id="consumer-tab-auditor" part="'+(this.myRole == this.TAB_AUDITOR ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Auditor</button>';
    html += '<button class="tab-button" id="consumer-tab-auditor" part="'+(this.myRole == this.TAB_VIEWER ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Viewer</button>';

    (this._SfRoleTabContainer as HTMLDivElement).innerHTML = html;

    (this._SfRoleTabContainer as HTMLDivElement).querySelector('#consumer-tab-reporter')?.addEventListener('click', async () => {

      this.myRole = this.TAB_REPORTER;
      this.renderRoleTabs();
      // this.proceedToCalendar();
      ((this._SfTabContainer as HTMLDivElement).querySelector('#calendar-tab-month') as HTMLButtonElement)?.click();

    });

    (this._SfRoleTabContainer as HTMLDivElement).querySelector('#consumer-tab-approver')?.addEventListener('click', async () => {

      this.myRole = this.TAB_APPROVER;
      this.renderRoleTabs();
      // this.proceedToCalendar();
      ((this._SfTabContainer as HTMLDivElement).querySelector('#calendar-tab-month') as HTMLButtonElement)?.click();

    });

    (this._SfRoleTabContainer as HTMLDivElement).querySelector('#consumer-tab-functionhead')?.addEventListener('click', async () => {

      this.myRole = this.TAB_FUNCTION_HEAD;
      this.renderRoleTabs();
      // this.proceedToCalendar();
      ((this._SfTabContainer as HTMLDivElement).querySelector('#calendar-tab-month') as HTMLButtonElement)?.click();

    });

    (this._SfRoleTabContainer as HTMLDivElement).querySelector('#consumer-tab-auditor')?.addEventListener('click', async () => {

      this.myRole = this.TAB_AUDITOR;
      this.renderRoleTabs();
      // this.proceedToCalendar();
      ((this._SfTabContainer as HTMLDivElement).querySelector('#calendar-tab-month') as HTMLButtonElement)?.click();

    });


    (this._SfRoleTabContainer as HTMLDivElement).querySelector('#consumer-tab-viewer')?.addEventListener('click', async () => {

      this.myRole = this.TAB_VIEWER;
      this.renderRoleTabs();
      // this.proceedToCalendar();
      ((this._SfTabContainer as HTMLDivElement).querySelector('#calendar-tab-month') as HTMLButtonElement)?.click();

    });

  }

  csvmaker = (data: any) => {
  
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
    csvRows.push(values)
  
    // Returning the array joining with new line 
    return csvRows.join('\n')
  }

  renderChartSettingsFilters = (container: HTMLDivElement, ctx: any) => {

    console.log(container);

    var html = `
    
      <div class="m-10" part="filters-container">
        <div class="d-flex justify-end">
          <button id="chart-control-cancel" class="material-icons" part="button-icon-small">close</button>
        </div>
        <div class="d-flex justify-center align-end flex-wrap">
          <sf-i-form id="input-multi-entry-tags" name="Tags" label="Select Tags" apiId="${this.apiIdTags}" mode="multiselect-dropdown" searchPhrase="${this.projectName}" selectProjection="name" mandatory></sf-i-form>
          <button id="chart-control-plot" part="button" class="ml-20">Plot</button>          
        </div>
      </div>
    
    `;

    container.innerHTML = html;

    container.querySelector('#chart-control-plot')?.addEventListener('click', () => {

      const query = (container.querySelector('#input-multi-entry-tags') as SfIForm).selectedValues();
      this.filterTags = query;

      let eventContainer = null;

      if(this.getCurrentTab() == this.TAB_STREAM) {
        eventContainer = (this._SfStreamContainer as HTMLDivElement);
      }

      if(this.getCurrentTab() == this.TAB_UPCOMING) {
        eventContainer = (this._SfUpcomingContainer as HTMLDivElement);
      }

      if(this.getCurrentTab() == this.TAB_THIS) {
        eventContainer = (this._SfThisContainer as HTMLDivElement);
      }

      if(this.getCurrentTab() == this.TAB_PAST) {
        eventContainer = (this._SfPastContainer as HTMLDivElement);
      }

      if(this.getCurrentTab() == this.TAB_CUSTOM) {
        eventContainer = (this._SfCustomContainer as HTMLDivElement);
      }

      const divs = eventContainer!.querySelectorAll('.stream-events-container') as NodeListOf<HTMLElement>;
      const tables = eventContainer!.querySelectorAll('.stream-events-container-table') as NodeListOf<HTMLTableElement>;
      const hiddenTitles = eventContainer!.querySelectorAll('.hidden-title') as NodeListOf<HTMLDivElement>;
      const hiddenFilternames = eventContainer!.querySelectorAll('.hidden-filtername') as NodeListOf<HTMLDivElement>;
      const filternames = eventContainer!.querySelectorAll('.filtername') as NodeListOf<HTMLTableCellElement>;
      const streamEventSummary = eventContainer!.querySelector('#stream-event-summary') as HTMLDivElement;

      if(this.filterTags.length > 0) {
        streamEventSummary.style.display = 'none';
      } else {
        streamEventSummary.style.display = 'block';
      }

      console.log('divs', divs);

      for(var i = 0; i < divs.length; i++) {
        var found = false;
        var filterMatched = "";
        const tagsEmbedded = JSON.parse((divs[i] as HTMLDivElement).querySelector('.hidden-tags')?.innerHTML + "");
        console.log(tagsEmbedded);
        for(var count1 = 0; count1 < tagsEmbedded.length; count1++) {
          for(var count2 = 0; count2 < this.filterTags.length; count2++) {
            if(tagsEmbedded[count1].toLowerCase().indexOf(this.filterTags[count2].toLowerCase()) >= 0) {
              found = true;
              filterMatched += (this.filterTags[count2].split(';')[0] + ", ");
            }
          }
        }
        if(!found) {
          (tables[i] as HTMLDivElement).style.display = 'none';
          (hiddenTitles[i] as HTMLDivElement).style.display = 'block';
          (hiddenFilternames[i] as HTMLDivElement).style.display = 'none';
          filternames[i].innerHTML = '';
        } else {
          (tables[i] as HTMLDivElement).style.display = 'block';
          (hiddenTitles[i] as HTMLDivElement).style.display = 'none';
          (hiddenFilternames[i] as HTMLDivElement).style.display = 'block';
          filternames[i].innerHTML = filterMatched.replace(/,\s*$/, "");;
        }
      }
      
      this.filterEventsInWindow(query, ctx, eventContainer);

    });
    
    container.querySelector('#chart-control-cancel')?.addEventListener('click', () => {

      container.innerHTML = '';
      container.dispatchEvent(new CustomEvent('canceled', {bubbles: true}));

    });

  }

  renderChartSettingsSettings = (container: HTMLDivElement) => {

    var html = `
    
      <div class="m-10" part="settings-container">
        <div class="d-flex justify-end">
          <button id="chart-control-cancel" class="material-icons" part="button-icon-small">close</button>
        </div>

        <div class="d-flex justify-center">
          <div class="p-10 mr-10">
            <div part="td-head">Stats</div>
            <div part="td-body" class="d-flex align-center mt-5">
              <input type="radio" id="radio-csv" class="switch-csv" value="Excel" checked name="radio-report" part="radio-download"/>
              <label for="radio-csv" part="label-radio-download">Csv</label>
              <input type="radio" id="radio-image" class="switch-image" value="Image" name="radio-report" part="radio-download"/>
              <label for="radio-image" part="label-radio-download">Image</label>
            </div>
            <div class="d-flex">
              <button id="button-download-stats" part="button" class="mt-5">Download</button>
            </div>
          </div>
          <div class="p-10 ml-10 mr-10">
            <div part="td-head">Compliances</div>
            <div part="td-body" class="d-flex align-center mt-5">
              <input type="radio" id="radio-csv" class="switch-csv" value="Excel" checked part="radio-download"/>
              <label for="radio-html" part="label-radio-download">Html</label>
            </div>
            <div class="d-flex">
              <button id="button-download-compliances" part="button" class="mt-5">Download</button>
            </div>
          </div>
          <div class="p-10 ml-10">
            <div part="td-head">Certificate</div>
            <div part="td-body" class="d-flex align-center mt-5">
              <input type="radio" id="radio-html" class="switch-html" value="Html" checked part="radio-download"/>
              <label for="radio-html" part="label-radio-download">Html</label>
            </div>
            <div class="d-flex">
              <button id="button-download-certificate" part="button" class="mt-5">Download</button>
            </div>
          </div>
        </div>
      </div>
    
    `;

    container.innerHTML = html;

    container.querySelector('#chart-control-cancel')?.addEventListener('click', () => {

      container.innerHTML = '';
      container.dispatchEvent(new CustomEvent('canceled', {bubbles: true}));

    });

    container.querySelector('#button-download-compliances')?.addEventListener('click', () => {

      // console.log('csvValues compliances', this.csvDataCompliances);

      // const blob = new Blob([this.csvDataCompliances], { type: 'text/csv' });
      // const url = window.URL.createObjectURL(blob)
      // const a = document.createElement('a')
      // a.setAttribute('href', url)
      // a.setAttribute('download', 'download.csv');
      // a.click()

      const ts = new Date().getTime();

      var html = this.COMPLIANCES_HTML;
      html = html.replace(/PROJECT_NAME/g, this.projectName);
      html = html.replace(/REPORT_DATE/g, new Date().getDate() + "/" + (new Date().getMonth()+1) + "/" + new Date().getFullYear() + " " + new Date().getHours() + ":" + new Date().getMinutes());
      html = html.replace(/PERSON_COMPLIANCES/g, this.htmlDataCompliances);

      const blob = new Blob([html], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.setAttribute('href', url)
      a.setAttribute('download', 'report_'+ts+'.html');
      a.click()

    })

    container.querySelector('#button-download-stats')?.addEventListener('click', () => {


      const radioCsv = (container.querySelector('#radio-csv') as HTMLInputElement);
      const radioImage = (container.querySelector('#radio-image') as HTMLInputElement);

      console.log('radiocsv checked', radioCsv.checked);
      console.log('radioimage checked', radioImage.checked);

      if(radioCsv.checked) {

        const blob = new Blob([this.csvDataStats], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.setAttribute('href', url)
        a.setAttribute('download', 'download.csv');
        a.click()

      }

      if(radioImage.checked) {

        const a = document.createElement('a')
        a.setAttribute('href', (this.chart as Chart).toBase64Image())
        a.setAttribute('download', 'download_'+new Date().getTime()+'.png');
        a.click()

        if(this.chart2 != null) {
          const a2 = document.createElement('a')
          a2.setAttribute('href', (this.chart2 as Chart).toBase64Image())
          a2.setAttribute('download', 'download_completeness_'+new Date().getTime()+'.png');
          a2.click()
        }

        if(this.chart3 != null) {
          const a3 = document.createElement('a')
          a3.setAttribute('href', (this.chart3 as Chart).toBase64Image())
          a3.setAttribute('download', 'download_timeliness_'+new Date().getTime()+'.png');
          a3.click()
        }

      }

    })

    container.querySelector('#button-download-certificate')?.addEventListener('click', () => {

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
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.setAttribute('href', url)
      a.setAttribute('download', 'certificate.html');
      a.click()

    })

    container.querySelector('.switch-solid')?.addEventListener('click', () => {

      this.fill = "solid";
      if(this.getCurrentTab() == this.TAB_STREAM) {
        this.renderStream();
      }
      
    });

    container.querySelector('.switch-pattern')?.addEventListener('click', () => {

      this.fill = "pattern";
      if(this.getCurrentTab() == this.TAB_STREAM) {
        this.renderStream();
      }
      
    });

  }

  renderChartSettings = (container: HTMLDivElement, selectedTab: number = -1, ctx: any) => {

    var html = '';

    html += '<div class="d-flex justify-end align-start">';
    if (selectedTab === 0) {
      html += '<button class="tab-button" id="chart-control-filters" part="calendar-tab-button-selected" class="mr-10"><span class="material-icons">filter_list</span></button>';
    } else {
      html += '<button class="tab-button" id="chart-control-filters" part="calendar-tab-button-not-selected" class="mr-10"><span class="material-icons">filter_list</span></button>';
    }
    if (selectedTab === 1) {
      html += '<button class="tab-button" id="chart-control-settings" part="calendar-tab-button-selected" class="mr-10"><span class="material-icons">cloud_download</span></button>';
    } else {
      html += '<button class="tab-button" id="chart-control-settings" part="calendar-tab-button-not-selected" class="mr-10"><span class="material-icons">cloud_download</span></button>';
    }
    html += '</div>';

    (container.querySelector('#chart-settings-controls') as HTMLDivElement).innerHTML = html;

    (container.querySelector('#chart-settings-controls') as HTMLDivElement).querySelector('#chart-control-settings')?.addEventListener('click', () => {

      this.renderChartSettings(container, 1, ctx);

    });

    (container.querySelector('#chart-settings-controls') as HTMLDivElement).querySelector('#chart-control-filters')?.addEventListener('click', () => {

      this.renderChartSettings(container, 0, ctx);

    });

    if(selectedTab === 0) {

      const radioCompleteness = container.querySelector('#radio-completeness') as HTMLButtonElement;
      radioCompleteness.click();
      this.renderChartSettingsFilters((container.querySelector('#chart-settings') as HTMLDivElement), ctx);
    }

    if(selectedTab === 1) {
      const radioCompleteness = container.querySelector('#radio-completeness') as HTMLButtonElement;
      radioCompleteness.click();
      this.renderChartSettingsSettings((container.querySelector('#chart-settings') as HTMLDivElement));
    }

    (container.querySelector('#chart-settings') as HTMLDivElement).addEventListener('canceled', () => {
      console.log('canceled');
      this.renderChartSettings(container, -1, ctx);
      this.renderStream();
    })

    
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

  }

  formatLabel = (str: string, maxwidth: number) => {
    const sections: any = [];
    var words = str.split(" ");
    var temp = "";
  
    words.forEach(function(item, index){
      if(temp.length > 0)
      {
        var concat = temp + ' ' + item;
  
        if(concat.length > maxwidth){
          sections.push(temp);
          temp = "";
        }
        else{
          if(index == (words.length-1)) {
            sections.push(concat);
            return;
          }
          else {
            temp = concat;
            return;
          }
        }
      }
  
      if(index == (words.length-1)) {
        sections.push(item);
        return;
      }
  
      if(item.length < maxwidth) {
        temp = item;
      }
      else {
        sections.push(item);
      }
  
    });
  
    return sections;
  }
  
  renderChart3 = (ctx: any, type: any, data: any, title: string) => {

    if(this.chart3 != null) {
      (this.chart3 as Chart).destroy();
    }
    
    this.chart3 =  new Chart(ctx, {
      type: type,
      data: data,
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          onComplete: () => {

            if(this.chart3 != null) {

              if(type == 'bar') {

                this.chart3.ctx.font = "bold 10pt Courier";
                this.chart3.ctx.fillStyle = '#fff';
                this.chart3.ctx.textBaseline = "middle";
                this.chart3.ctx.textAlign = "center";

                for(var i = 0; i < this.chart3.data.datasets.length; i++) {

                  const dataset = this.chart3.data.datasets[i];
                  for (var j = 0; j < dataset.data.length; j++) {

                    if(parseInt(dataset.data[j]) > 0) {
                      console.log('points', this.chart3.getDatasetMeta(i).data[j]);
                      this.chart3.ctx.fillText(dataset.data[j], this.chart3.getDatasetMeta(i).data[j].x - 20, this.chart3.getDatasetMeta(i).data[j].y);
                    }

                  }

                }

              } else {

                console.log('onanimation complete', this.chart3, this.chart3.data);
                for(var i = 0; i < this.chart3.data.datasets.length; i++) {

                  const dataset = this.chart3.data.datasets[i];
                  for (var j = 0; j < dataset.data.length; j++) {

                    if(parseInt(dataset.data[j]) > 0) {

                      console.log(this.chart3.getDatasetMeta(i));
                      console.log(i + "," + j, this.chart3.getDatasetMeta(i).data[j]);
                      var total = this.chart3.getDatasetMeta(i).total;
                      console.log('total', total);
                      var mid_radius = this.chart3.getDatasetMeta(i).data[j].innerRadius + (this.chart3.getDatasetMeta(i).data[j].outerRadius - this.chart3.getDatasetMeta(i).data[j].innerRadius)/2;
                      console.log('mid_radius', mid_radius);
                      var start_angle = this.chart3.getDatasetMeta(i).data[j].startAngle;
                      console.log('start_angle', start_angle);
                      var end_angle = this.chart3.getDatasetMeta(i).data[j].endAngle;
                      console.log('end_angle', end_angle);
                      var mid_angle = start_angle + (end_angle - start_angle)/2;
                      console.log('mid_angle', mid_angle);

                      var x = mid_radius * Math.cos(mid_angle);
                      var y = mid_radius * Math.sin(mid_angle);

                      this.chart3.ctx.fillStyle = '#fff';
                      if (i == 3){ // Darker text color for lighter background
                        this.chart3.ctx.fillStyle = '#444';
                      }
                      // var percent = String(Math.round(dataset.data[j]/total*100)) + "%";
                      var str = "";
                      for(var k = 0; k <= dataset.data[j].length; k++) {
                        str += '█';
                      }
                      console.log('outputting bg', str);
                      this.chart3.ctx.fillStyle = '#000';
                      //this.chart.ctx.fillText(str, this.chart.getDatasetMeta(i).data[j].x + x, this.chart.getDatasetMeta(i).data[j].y + y);
                      //const match = /(?<value>\d+\.?\d*)/;
                      let fillText = '';
                      if((this.chart3.data.labels[j] + "").toLowerCase().replace(/ /g, "-") == this.graphParam) {
                        this.chart3.ctx.font = "bold 20pt Courier";
                        fillText = dataset.data[j] + '✓';
                      } else {
                        this.chart3.ctx.font = "bold 15pt Courier";
                        fillText = dataset.data[j];
                      }
                      this.chart3.ctx.fillStyle = '#fff';
                      this.chart3.ctx.textBaseline = "middle";
                      this.chart3.ctx.textAlign = "center";

                      console.log('comparing labels', (this.chart3.data.labels[j] + "").toLowerCase().replace(/ /g, "-"), j, this.graphParam, this.chart3.getDatasetMeta(i).data[j]);
                      this.chart3.ctx.fillText(fillText, this.chart3.getDatasetMeta(i).data[j].x + x, this.chart3.getDatasetMeta(i).data[j].y + y);

                    }
                    
                  }
                }

              }

              
            }

          }
        },
        scales: {
          x: {
            grid: {
                display: false,
                drawBorder: false
            },
            ticks: {
              display: false,
            },
            stacked: true,
          },
          y: {
            grid: {
                display: false,
                drawBorder: false
            },
            ticks: {
              font: {
                size: window.innerWidth > window.innerHeight ? window.innerWidth/170 : window.innerWidth/40,
              }
            },
            stacked: true,
          }
        },
        barPercentage: 0.8,
        categoryPercentage: 0.5,
        plugins: {
          legend: {
            display: true,
            position: "bottom",
            align: "center",
            labels: {
              font: {
                size: 10,
              },
              boxWidth: 10,
              boxHeight: 10,
            }
          },
          title: {
            display: true,
            text: title,
            font: {
                size: 16,
            }
          }
        }
      },
        
    });

    console.log('canvas parent node', this.chart3.canvas.parentNode);
    this.chart3.canvas.parentNode.style.height = (parseInt(data.labels.length)*90 + 40) + 'px';

  }

  renderChart2 = (ctx: any, type: any, data: any, title: string) => {

    if(this.chart2 != null) {
      (this.chart2 as Chart).destroy();
    }
    
    this.chart2 =  new Chart(ctx, {
      type: type,
      data: data,
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          onComplete: () => {

            if(this.chart2 != null) {

              if(type == 'bar') {

                this.chart2.ctx.font = "bold 10pt Courier";
                this.chart2.ctx.fillStyle = '#fff';
                this.chart2.ctx.textBaseline = "middle";
                this.chart2.ctx.textAlign = "center";

                for(var i = 0; i < this.chart2.data.datasets.length; i++) {

                  const dataset = this.chart2.data.datasets[i];
                  for (var j = 0; j < dataset.data.length; j++) {

                    if(parseInt(dataset.data[j]) > 0) {
                      console.log('points', this.chart2.getDatasetMeta(i).data[j]);
                      this.chart2.ctx.fillText(dataset.data[j], this.chart2.getDatasetMeta(i).data[j].x - 20, this.chart2.getDatasetMeta(i).data[j].y);
                    }

                  }

                }

              } else {

                console.log('onanimation complete', this.chart2, this.chart2.data);
              
                for(var i = 0; i < this.chart2.data.datasets.length; i++) {

                  const dataset = this.chart2.data.datasets[i];
                  for (var j = 0; j < dataset.data.length; j++) {

                    if(parseInt(dataset.data[j]) > 0) {

                      console.log(this.chart2.getDatasetMeta(i));
                      console.log(i + "," + j, this.chart2.getDatasetMeta(i).data[j]);
                      var total = this.chart2.getDatasetMeta(i).total;
                      console.log('total', total);
                      var mid_radius = this.chart2.getDatasetMeta(i).data[j].innerRadius + (this.chart2.getDatasetMeta(i).data[j].outerRadius - this.chart2.getDatasetMeta(i).data[j].innerRadius)/2;
                      console.log('mid_radius', mid_radius);
                      var start_angle = this.chart2.getDatasetMeta(i).data[j].startAngle;
                      console.log('start_angle', start_angle);
                      var end_angle = this.chart2.getDatasetMeta(i).data[j].endAngle;
                      console.log('end_angle', end_angle);
                      var mid_angle = start_angle + (end_angle - start_angle)/2;
                      console.log('mid_angle', mid_angle);

                      var x = mid_radius * Math.cos(mid_angle);
                      var y = mid_radius * Math.sin(mid_angle);

                      this.chart2.ctx.fillStyle = '#fff';
                      if (i == 3){ // Darker text color for lighter background
                        this.chart2.ctx.fillStyle = '#444';
                      }
                      // var percent = String(Math.round(dataset.data[j]/total*100)) + "%";
                      var str = "";
                      for(var k = 0; k <= dataset.data[j].length; k++) {
                        str += '█';
                      }
                      console.log('outputting bg', str);
                      this.chart2.ctx.fillStyle = '#000';
                      //this.chart.ctx.fillText(str, this.chart.getDatasetMeta(i).data[j].x + x, this.chart.getDatasetMeta(i).data[j].y + y);
                      //const match = /(?<value>\d+\.?\d*)/;
                      let fillText = '';
                      if((this.chart2.data.labels[j] + "").toLowerCase().replace(/ /g, "-") == this.graphParam) {
                        this.chart2.ctx.font = "bold 20pt Courier";
                        fillText = dataset.data[j] + '✓';
                      } else {
                        this.chart2.ctx.font = "bold 15pt Courier";
                        fillText = dataset.data[j];
                      }
                      this.chart2.ctx.fillStyle = '#fff';
                      this.chart2.ctx.textBaseline = "middle";
                      this.chart2.ctx.textAlign = "center";

                      console.log('comparing labels', (this.chart2.data.labels[j] + "").toLowerCase().replace(/ /g, "-"), j, this.graphParam, this.chart2.getDatasetMeta(i).data[j]);
                      this.chart2.ctx.fillText(fillText, this.chart2.getDatasetMeta(i).data[j].x + x, this.chart2.getDatasetMeta(i).data[j].y + y);

                    }
                    
                  }
                }

              }

            }

          }
        },
        scales: {
          x: {
            grid: {
                display: false,
                drawBorder: false
            },
            ticks: {
              display: false,
            },
            stacked: true,
          },
          y: {
            grid: {
                display: false,
                drawBorder: false
            },
            ticks: {
              font: {
                size: window.innerWidth > window.innerHeight ? window.innerWidth/170 : window.innerWidth/40,
              }
            },
            stacked: true,
          }
        },
        barPercentage: 0.8,
        categoryPercentage: 0.5,
        plugins: {
          legend: {
            display: true,
            position: "bottom",
            align: "center",
            labels: {
              font: {
                size: 10,
              },
              boxWidth: 10,
              boxHeight: 10,
            }
          },
          title: {
            display: true,
            text: title,
            font: {
                size: 16,
            }
          }
        }
      },
        
    });

    console.log('canvas parent node', this.chart2.canvas.parentNode);
    this.chart2.canvas.parentNode.style.height = (parseInt(data.labels.length)*90 + 40) + 'px';

  }

  renderChart = (ctx: any, type: any, data: any, title: string) => {

    if(this.chart != null) {
      (this.chart as Chart).destroy();
    }
    
    this.chart =  new Chart(ctx, {
      type: type,
      data: data,
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          onComplete: () => {

            if(this.chart != null) {

              if(type == 'bar') {

                this.chart.ctx.font = "bold 10pt Courier";
                this.chart.ctx.fillStyle = '#fff';
                this.chart.ctx.textBaseline = "middle";
                this.chart.ctx.textAlign = "center";

                for(var i = 0; i < this.chart.data.datasets.length; i++) {

                  const dataset = this.chart.data.datasets[i];
                  for (var j = 0; j < dataset.data.length; j++) {

                    if(parseInt(dataset.data[j]) > 0) {
                      console.log('points', this.chart.getDatasetMeta(i).data[j]);
                      this.chart.ctx.fillText(dataset.data[j], this.chart.getDatasetMeta(i).data[j].x - 20, this.chart.getDatasetMeta(i).data[j].y);
                    }

                  }

                }

              } else {

                console.log('onanimation complete', this.chart, this.chart.data);
              
                var rendered = false;

                for(var i = 0; i < this.chart.data.datasets.length; i++) {

                  const dataset = this.chart.data.datasets[i];
                  for (var j = 0; j < dataset.data.length; j++) {

                    if(parseInt(dataset.data[j]) > 0) {

                      rendered = true;
                      console.log(this.chart.getDatasetMeta(i));
                      console.log(i + "," + j, this.chart.getDatasetMeta(i).data[j]);
                      var total = this.chart.getDatasetMeta(i).total;
                      console.log('total', total);
                      var mid_radius = this.chart.getDatasetMeta(i).data[j].innerRadius + (this.chart.getDatasetMeta(i).data[j].outerRadius - this.chart.getDatasetMeta(i).data[j].innerRadius)/2;
                      console.log('mid_radius', mid_radius);
                      var start_angle = this.chart.getDatasetMeta(i).data[j].startAngle;
                      console.log('start_angle', start_angle);
                      var end_angle = this.chart.getDatasetMeta(i).data[j].endAngle;
                      console.log('end_angle', end_angle);
                      var mid_angle = start_angle + (end_angle - start_angle)/2;
                      console.log('mid_angle', mid_angle);

                      var x = mid_radius * Math.cos(mid_angle);
                      var y = mid_radius * Math.sin(mid_angle);

                      this.chart.ctx.fillStyle = '#fff';
                      if (i == 3){ // Darker text color for lighter background
                        this.chart.ctx.fillStyle = '#444';
                      }
                      // var percent = String(Math.round(dataset.data[j]/total*100)) + "%";
                      var str = "";
                      for(var k = 0; k <= dataset.data[j].length; k++) {
                        str += '█';
                      }
                      console.log('outputting bg', str);
                      this.chart.ctx.fillStyle = '#000';
                      //this.chart.ctx.fillText(str, this.chart.getDatasetMeta(i).data[j].x + x, this.chart.getDatasetMeta(i).data[j].y + y);
                      //const match = /(?<value>\d+\.?\d*)/;
                      let fillText = '';
                      let replaceText = ' ';
                      if(this.flowGraph == this.FLOW_GRAPH_COMPLETENESS || this.flowGraph == this.FLOW_GRAPH_TIMELINESS) {
                        replaceText = '-';
                      }
                      if((this.chart.data.labels[j] + "").toLowerCase().replace(/ /g, replaceText) == this.graphParam) {
                        this.chart.ctx.font = "bold 20pt Courier";
                        fillText = dataset.data[j] + '✓';
                      } else {
                        this.chart.ctx.font = "bold 15pt Courier";
                        fillText = dataset.data[j];
                      }
                      this.chart.ctx.fillStyle = '#fff';
                      this.chart.ctx.textBaseline = "middle";
                      this.chart.ctx.textAlign = "center";

                      console.log('comparing labels', (this.chart.data.labels[j] + "").toLowerCase().replace(/ /g, "-"), j, this.graphParam, this.chart.getDatasetMeta(i).data[j]);
                      this.chart.ctx.fillText(fillText, this.chart.getDatasetMeta(i).data[j].x + x, this.chart.getDatasetMeta(i).data[j].y + y);

                    }
                    
                  }
                }

                if(!rendered) {
                  const { chartArea: { left, top, right, bottom }, ctx } = this.chart;
                  const centerX = (left + right) / 2;
                  const centerY = (top + bottom) / 2;
                  ctx.font = "15pt Arial";
                  ctx.fillStyle = '#666';
                  ctx.textAlign = 'center';
                  ctx.textBaseline = 'middle';
                  ctx.fillText('No data to display', centerX, centerY);
                }

              }

            }

          }
        },
        scales: {
          x: {
            grid: {
                display: false,
                drawBorder: false
            },
            ticks: {
              display: false,
            },
            stacked: true,
          },
          y: {
            grid: {
                display: false,
                drawBorder: false
            },
            ticks: {
              display: type == 'bar' ? true : false,
              font: {
                size: window.innerWidth > window.innerHeight ? window.innerWidth/170 : window.innerWidth/40,
              }
            },
            stacked: true,
          }
        },
        barPercentage: 0.8,
        categoryPercentage: 0.5,
        plugins: {
          legend: {
            display: true,
            position: "bottom",
            align: "center",
            labels: {
              font: {
                size: 10,
              },
              boxWidth: 10,
              boxHeight: 10,
            }
          },
          title: {
            display: true,
            text: title,
            font: {
                size: 16,
            }
          }
        },
        onClick: (event: any, array: any) => {
          this.clickOnPie(event, array, data)
        }
      },
        
    });

    this.chart.canvas.parentNode.style.height = '450px';
    
  }

  clickOnPie = (event: any, array: any, data: any) => {
    console.log('graph onclick', event);
    console.log('graph onclick', array);
    console.log('graph onclick', data);
    console.log('graph onclick element', array[0].element);
    console.log('graph onclick index', array[0].index);
    console.log('graph onclick label', (data.labels[array[0].index] + "").toLowerCase().replace(/ /g, "-"));
    console.log('graph onclick data', data.datasets[0].data[array[0].index]);

    let labelClicked = '';

    if(this.flowGraph == this.FLOW_GRAPH_COMPLETENESS || this.flowGraph == this.FLOW_GRAPH_TIMELINESS) {
      labelClicked = (data.labels[array[0].index] + "").toLowerCase().replace(/ /g, "-").replace('status-', '');  
    } else {
      labelClicked = (data.labels[array[0].index] + "").toLowerCase();
    }
    

    let eventContainer = null;

    if(this.getCurrentTab() == this.TAB_STREAM) {
      eventContainer = (this._SfStreamContainer as HTMLDivElement);
    }

    if(this.getCurrentTab() == this.TAB_UPCOMING) {
      eventContainer = (this._SfUpcomingContainer as HTMLDivElement);
    }

    if(this.getCurrentTab() == this.TAB_THIS) {
      eventContainer = (this._SfThisContainer as HTMLDivElement);
    }

    if(this.getCurrentTab() == this.TAB_PAST) {
      eventContainer = (this._SfPastContainer as HTMLDivElement);
    }

    if(this.getCurrentTab() == this.TAB_CUSTOM) {
      eventContainer = (this._SfCustomContainer as HTMLDivElement);
    }

    const divs = eventContainer!.querySelectorAll('.stream-events-container') as NodeListOf<HTMLElement>;
    const tables = eventContainer!.querySelectorAll('.stream-events-container-table') as NodeListOf<HTMLTableElement>;
    const graphparamnames = eventContainer!.querySelectorAll('.graphparamname') as NodeListOf<HTMLTableCellElement>;
    const streamEventSummary = eventContainer!.querySelector('#stream-event-summary') as HTMLDivElement;

    if(this.graphParam == labelClicked) {

      this.graphParam = "";
      streamEventSummary.style.display = 'flex';

    } else {

      this.graphParam = labelClicked;
      streamEventSummary.style.display = 'none';

    }

    for(var i = 0; i < divs.length; i++) {

      console.log('comparing', (graphparamnames[i] as HTMLDivElement).innerHTML.toLowerCase().replace('&amp;', '&'), this.graphParam);
      if((graphparamnames[i] as HTMLDivElement).innerHTML.toLowerCase().replace('&amp;', '&').indexOf(this.graphParam) >= 0) {
        (tables[i] as HTMLDivElement).style.display = 'block';
        //(hiddenFilternames[i] as HTMLDivElement).style.display = 'block';
        (graphparamnames[i] as HTMLDivElement).style.display = 'block';
      } else {
        (tables[i] as HTMLDivElement).style.display = 'none';
        //(hiddenFilternames[i] as HTMLDivElement).style.display = 'none';
        (graphparamnames[i] as HTMLDivElement).style.display = 'none';
      }

    }
  }

  getCurrentTab = () => {

    if((this._SfCalendarContainer as HTMLDivElement).style.display == 'flex') {
      return this.TAB_YEAR;
    }

    if((this._SfStreamContainer as HTMLDivElement).style.display == 'flex') {
      return this.TAB_STREAM;
    }

    if((this._SfUpcomingContainer as HTMLDivElement).style.display == 'flex') {
      return this.TAB_UPCOMING;
    }

    if((this._SfThisContainer as HTMLDivElement).style.display == 'flex') {
      return this.TAB_THIS;
    }

    if((this._SfPastContainer as HTMLDivElement).style.display == 'flex') {
      return this.TAB_PAST;
    }

    if((this._SfCustomContainer as HTMLDivElement).style.display == 'flex') {
      return this.TAB_CUSTOM;
    }
    
    return "";

  }

  renderTabs = (selectedTab: string) => {

    this.clearAllCalendars();

    this.flowGraph = this.FLOW_GRAPH_COMPLETENESS;

    var html = '';

    html += '<button class="tab-button mb-10" id="calendar-tab-month" part="'+(selectedTab == this.TAB_STREAM ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Month</button>';
    html += '<button class="tab-button mb-10" id="calendar-tab-upcoming" part="'+(selectedTab == this.TAB_UPCOMING ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Upcoming</button>';
    html += '<button class="tab-button mb-10" id="calendar-tab-this" part="'+(selectedTab == this.TAB_THIS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Current</button>';
    html += '<button class="tab-button mb-10" id="calendar-tab-past" part="'+(selectedTab == this.TAB_PAST ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Past</button>';
    html += '<button class="tab-button mb-10" id="calendar-tab-custom" part="'+(selectedTab == this.TAB_CUSTOM ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Range</button>';
    html += '<button class="tab-button mb-10" id="calendar-tab-year" part="'+(selectedTab == this.TAB_YEAR ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Year</button>';
    html += '<button class="tab-button mb-10" id="calendar-tab-adhoc" part="'+(selectedTab == this.TAB_ADHOC ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Adhoc</button>';

    (this._SfTabContainer as HTMLDivElement).innerHTML = html;

    (this._SfTabContainer as HTMLDivElement).querySelector('#calendar-tab-year')?.addEventListener('click', async () => {

      console.log('calclicked', this.mode);

      if(this.mode == "consumer") {
        this.renderTabs(this.TAB_YEAR);
        this.enableCalendar();
        await this.fetchUserCalendar_2();
        this.renderCalendar();
        // this.loadMode();
        
      } else {
        this.enableCalendar();
        this.renderTabs(this.TAB_YEAR);
      }
    });

    (this._SfTabContainer as HTMLDivElement).querySelector('#calendar-tab-month')?.addEventListener('click', async () => {
      this.enableStream();
      this.renderTabs(this.TAB_STREAM);

      const currMonth = ("0" + (new Date().getMonth() + 1)).slice(-2);
      let idx = 0;
      for(var i = 0; i < 12; i++) {
        if(parseInt(currMonth) === (parseInt(this.calendarStartMM) + i)) {
          idx = i;
          break;
        }
      }
      const dateResult = this.calculateStartAndEndDateOfStream(idx);
      if(dateResult != null) {
        await this.fetchUserCalendar_2(dateResult.startDate, dateResult.endDate);
      }
      this.renderStream(idx);
    });

    (this._SfTabContainer as HTMLDivElement).querySelector('#calendar-tab-upcoming')?.addEventListener('click', async () => {
      this.enableUpcoming();
      this.renderTabs(this.TAB_UPCOMING);
      const dateResult = this.calculateStartAndEndDateOfUpcoming(0);
      console.log('dateresult', dateResult)
      await this.fetchUserCalendar_2(dateResult.startDate, dateResult.endDate);
      this.renderUpcoming();
    });

    (this._SfTabContainer as HTMLDivElement).querySelector('#calendar-tab-this')?.addEventListener('click', async () => {
      this.enableThis();
      this.renderTabs(this.TAB_THIS);
      const dateResult = this.calculateStartAndEndDateOfThis(0);
      console.log('dateresult', dateResult)
      await this.fetchUserCalendar_2(dateResult.startDate, dateResult.endDate);
      this.renderThis();
    });

    (this._SfTabContainer as HTMLDivElement).querySelector('#calendar-tab-past')?.addEventListener('click', async () => {
      this.enablePast();
      this.renderTabs(this.TAB_PAST);
      const dateResult = this.calculateStartAndEndDateOfPast(0);
      console.log('dateresult', dateResult)
      await this.fetchUserCalendar_2(dateResult.startDate, dateResult.endDate);
      this.renderPast();
    });

    (this._SfTabContainer as HTMLDivElement).querySelector('#calendar-tab-custom')?.addEventListener('click', () => {
      this.enableCustom();
      this.renderTabs(this.TAB_CUSTOM);
      this.renderCustom();
    });

    (this._SfTabContainer as HTMLDivElement).querySelector('#calendar-tab-adhoc')?.addEventListener('click', () => {
      this.enableAdhoc();
      this.renderTabs(this.TAB_ADHOC);
      this.renderAdhoc();
    });

  }

  renderMappingTabs = (selectedTab: string) => {

    var html = '';

    html += '<button class="tab-button" id="mapping-tab-reporter" part="'+(selectedTab == this.TAB_REPORTER ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Reporter</button>';
    html += '<button class="tab-button" id="mapping-tab-approver" part="'+(selectedTab == this.TAB_APPROVER ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Approver</button>';

    (this._SfMappingTabContainer as HTMLDivElement).innerHTML = html;

    if(this.myRole == this.TAB_REPORTER) {
      console.log('sync mapping reporter');
      (this._SfButtonBackSyncMapping as HTMLButtonElement).style.visibility = 'visible';
    } else {
      console.log('sync mapping approver');
      (this._SfButtonBackSyncMapping as HTMLButtonElement).style.visibility = 'hidden';
    }

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

    console.log('rendering mapping1', unmappedEvents, this.mappedValuesDueDates, this.mappedValuesUsers, this.mappedValuesTags)

    
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

    console.log('mappings5', mappings, this.mappedValuesUsers);

    if(mappings == null) {
      return;
    }

    for(var i = 0; i < Object.keys(mappings.duedates).length; i++) {
      const eventId = Object.keys(mappings.duedates)[i];
      const index = this.getIndexFromId(eventId);
      if(index >= 0) {
        this.mappedValuesDueDates[index] = mappings.duedates[eventId];
      }
    }

    for(var i = 0; i < Object.keys(mappings.tags).length; i++) {
      const eventId = Object.keys(mappings.tags)[i];
      const index = this.getIndexFromId(eventId);
      if(index >= 0) {
        this.mappedValuesTags[index] = mappings.tags[eventId];
      }
    }

    for(var i = 0; i < Object.keys(mappings.users).length; i++) {
      const eventId = Object.keys(mappings.users)[i];
      const index = this.getIndexFromId(eventId);
      console.log('mapping users', index);
      if(index >= 0) {
        this.mappedValuesUsers[index] = mappings.users[eventId];
      }
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

    //(this._SfCalendarContainer as HTMLDivElement).innerHTML = "";
    (this._SfStreamContainer as HTMLDivElement).innerHTML = "";
    (this._SfUpcomingContainer as HTMLDivElement).innerHTML = "";
    (this._SfThisContainer as HTMLDivElement).innerHTML = "";
    (this._SfPastContainer as HTMLDivElement).innerHTML = "";
    (this._SfCustomContainer as HTMLDivElement).innerHTML = "";
    (this._SfAdhocContainer as HTMLDivElement).innerHTML = "";

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

  uploadInternalControlsMapping = async (data: any) => {
    console.log('uploading..', data);
    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/updatemappedinternalcontrols";

    const body = { 
      "projectid": this.projectId, 
      "data": JSON.stringify(data)
    }

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log('jsonResponse sync', jsonRespose);
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
      setTimeout(() => {
        this.clearMessages()
      }, 2000);
    }

  }

  uploadAlertSchedulesMapping = async (data: any) => {
    console.log('uploading..', data);
    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/updatemappedalertschedules";

    const body = { 
      "projectid": this.projectId, 
      "data": JSON.stringify(data)
    }

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log('jsonResponse sync', jsonRespose);
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
      setTimeout(() => {
        this.clearMessages()
      }, 2000);
    }

  }

  uploadDuedatesMapping = async (data: any) => {
    console.log('uploading..', data);
    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/updatemappedduedates";

    const body = { 
      "projectid": this.projectId, 
      "data": JSON.stringify(data)
    }

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log('jsonResponse sync', jsonRespose);
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
      setTimeout(() => {
        this.clearMessages()
      }, 2000);
    }

  }

  uploadApproversMapping = async (data: any) => {
    console.log('uploading..', data);
    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/updatemappedapprovers";

    const body = { 
      "projectid": this.projectId, 
      "data": JSON.stringify(data)
    }

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log('jsonResponse sync', jsonRespose);
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
      setTimeout(() => {
        this.clearMessages()
      }, 2000);
    }

  }

  uploadFunctionHeadsMapping = async (data: any) => {
    console.log('uploading..', data);
    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/updatemappedfunctionheads";

    const body = { 
      "projectid": this.projectId, 
      "data": JSON.stringify(data)
    }

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log('jsonResponse sync', jsonRespose);
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
      setTimeout(() => {
        this.clearMessages()
      }, 2000);
    }

  }

  uploadMakerCheckersMapping = async (data: any) => {
    console.log('uploading..', data);
    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/updatemappedmakercheckers";

    const body = { 
      "projectid": this.projectId, 
      "data": JSON.stringify(data)
    }

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log('jsonResponse sync', jsonRespose);
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
      setTimeout(() => {
        this.clearMessages()
      }, 2000);
    }

  }

  uploadDocsMapping = async (data: any) => {
    console.log('uploading..', data);
    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/updatemappeddocs";

    const body = { 
      "projectid": this.projectId, 
      "data": JSON.stringify(data)
    }

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log('jsonResponse sync', jsonRespose);
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
      setTimeout(() => {
        this.clearMessages()
      }, 2000);
    }

  }

  uploadAuditorsMapping = async (data: any) => {
    console.log('uploading..', data);
    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/updatemappedauditors";

    const body = { 
      "projectid": this.projectId, 
      "data": JSON.stringify(data)
    }

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log('jsonResponse sync', jsonRespose);
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
      setTimeout(() => {
        this.clearMessages()
      }, 2000);
    }

  }

  uploadViewersMapping = async (data: any) => {
    console.log('uploading..', data);
    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/updatemappedviewers";

    const body = { 
      "projectid": this.projectId, 
      "data": JSON.stringify(data)
    }

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log('jsonResponse sync', jsonRespose);
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
      setTimeout(() => {
        this.clearMessages()
      }, 2000);
    }

  }


  uploadReportersMapping = async (data: any) => {
    console.log('uploading..', data);
    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/updatemappedreporters";

    const body = { 
      "projectid": this.projectId, 
      "data": JSON.stringify(data)
    }

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log('jsonResponse sync', jsonRespose);
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
      setTimeout(() => {
        this.clearMessages()
      }, 2000);
    }

  }

  uploadTagsMapping = async (data: any) => {
    console.log('uploading..', data);
    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/updatemappedtags";

    const body = { 
      "projectid": this.projectId, 
      "data": JSON.stringify(data)
    }

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log('jsonResponse sync', jsonRespose);
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
      setTimeout(() => {
        this.clearMessages()
      }, 2000);
    }

  }

  uploadFunctionsMapping = async (data: any) => {
    console.log('uploading..', data);
    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/updatemappedfunctions";

    const body = { 
      "projectid": this.projectId, 
      "data": JSON.stringify(data)
    }

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log('jsonResponse sync', jsonRespose);
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
      setTimeout(() => {
        this.clearMessages()
      }, 2000);
    }

  }

  uploadLocationsMapping = async (data: any) => {
    console.log('uploading..', data);
    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/updatemappedlocations";

    const body = { 
      "projectid": this.projectId, 
      "data": JSON.stringify(data)
    }

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log('jsonResponse sync', jsonRespose);
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
      setTimeout(() => {
        this.clearMessages()
      }, 2000);
    }

  }

  uploadEntitiesMapping = async (data: any) => {
    console.log('uploading..', data);
    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/updatemappedentities";

    const body = { 
      "projectid": this.projectId, 
      "data": JSON.stringify(data)
    }

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log('jsonResponse sync', jsonRespose);
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
      setTimeout(() => {
        this.clearMessages()
      }, 2000);
    }

  }

  uploadCountriesMapping = async (data: any) => {
    console.log('uploading..', data);
    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/updatemappedcountries";

    const body = { 
      "projectid": this.projectId, 
      "data": JSON.stringify(data)
    }

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log('jsonResponse sync', jsonRespose);
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
      setTimeout(() => {
        this.clearMessages()
      }, 2000);
    }

  }

  uploadCompliancesMapping = async (data: any) => {
    console.log('uploading..', data);
    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/updatemappedcompliances";

    const body = { 
      "projectid": this.projectId, 
      "data": JSON.stringify(data)
    }

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log('jsonResponse sync', jsonRespose);
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
      setTimeout(() => {
        this.clearMessages()
      }, 2000);
    }

  }

  uploadStatutesMapping = async (data: any) => {
    console.log('uploading..', data);
    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/updatemappedstatutes";

    var searchstring = '';

    for(var i = 0; i < data.mappings.length; i++) {

      const dataItem = JSON.parse(data.mappings[i].data);
      console.log(dataItem[3])
      searchstring += dataItem[3];
      if(i < (data.mappings.length - 1)) {
        searchstring += '|';
      }

    }

    const body = { 
      "projectid": this.projectId, 
      "data": JSON.stringify(data),
      "compliancessearchstring": searchstring
    }

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log('jsonResponse sync', jsonRespose);
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
      setTimeout(() => {
        this.clearMessages()
      }, 2000);
    }

  }

  uploadUnTriggerEvent = async (eventid: string, mmdd: string) => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/untriggermyevent";

    const body = { 
      "mmdd": mmdd, 
      "projectid": this.projectId, 
      "eventid": eventid,
      "entityid": this.entityId,
      "locationid": this.locationId
    } 

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log('jsonResponse sync', jsonRespose);
      this.setSuccess("Event untriggered successfully!");
      await this.fetchUserCalendar_2();
      setTimeout(() => {
        this.clearMessages()
        this.renderTabs(this.TAB_ADHOC);
        this.renderAdhoc();
      }, 2000);
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
      setTimeout(() => {
        this.clearMessages()
      }, 2000);
    }

  }

  uploadTriggerEvent = async (entityId: string, locationId: string, eventid: string, dateofoccurrence: string) => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/triggermyevent";

    const body = { 
      "dateofoccurrence": dateofoccurrence,
      "projectid": this.projectId, 
      "eventid": eventid,
      "entityid": entityId,
      "locationid": locationId
    } 

    console.log('uploading...', body);

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log('jsonResponse sync', jsonRespose);
      this.setSuccess("Event triggered successfully!");
      await this.fetchUserCalendar_2();
      setTimeout(() => {
        this.clearMessages()
        this.renderTabs(this.TAB_ADHOC);
        this.renderAdhoc();
      }, 2000);
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
      setTimeout(() => {
        this.clearMessages()
      }, 2000);
    }

  }

  uploadAudit = async (entityId: string, locationId: string, mmddyyyy: string, eventid: string, comments: string, approved: any) => {
    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/uploadaudit";

    const body = { 
      "mmddyyyy": mmddyyyy,
      "projectid": this.projectId, 
      "type": "audit",
      "eventid": eventid,
      "comments": comments,
      "approved": approved,
      "entityid": entityId,
      "locationid": locationId
    } 
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log('jsonResponse sync', jsonRespose);
      this.setSuccess("Audit report uploaded successfully!");
      setTimeout(() => {
        this.clearMessages()
        // this.showChosenMapping();
        // this.fetchEventMap();
        // if(this.myRole == this.TAB_REPORTER) {
        //   this.renderMappingTabs(this.TAB_REPORTER);
        // } else {
        //   this.renderMappingTabs(this.TAB_APPROVER);
        // }
      }, 2000);
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
    }
  }

  uploadReview = async (entityId: string, locationId: string, mmddyyyy: string, eventid: string, comments: string, approved: any) => {
    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/uploadreview";

    const body = { 
      "mmddyyyy": mmddyyyy,
      "projectid": this.projectId, 
      "type": "review",
      "eventid": eventid,
      "comments": comments,
      "approved": approved,
      "entityid": entityId,
      "locationid": locationId
    } 
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log('jsonResponse sync', jsonRespose);
      this.setSuccess("Report uploaded successfully!");
      setTimeout(() => {
        this.clearMessages()
        // this.showChosenMapping();
        // this.fetchEventMap();
        // if(this.myRole == this.TAB_REPORTER) {
        //   this.renderMappingTabs(this.TAB_REPORTER);
        // } else {
        //   this.renderMappingTabs(this.TAB_APPROVER);
        // }
      }, 2000);
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
    }
  }

  uploadReport = async (entityId: string, locationId: string, mmddyyyy: string, eventid: string, comments: string, doc: string, docs: any) => {
    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/uploadreport";

    const body = { 
      "mmddyyyy": mmddyyyy,
      "projectid": this.projectId, 
      "type": "report",
      "eventid": eventid,
      "comments": comments,
      "dateofcompletion": doc,
      "entityid": entityId,
      "locationid": locationId,
      "docs": JSON.stringify(docs),
    } 

    console.log(body);

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log('jsonResponse sync', jsonRespose);
      this.setSuccess("Report uploaded successfully!");
      setTimeout(() => {
        this.clearMessages()
        // this.showChosenMapping();
        // this.fetchEventMap();
        // if(this.myRole == this.TAB_REPORTER) {
        //   this.renderMappingTabs(this.TAB_REPORTER);
        // } else {
        //   this.renderMappingTabs(this.TAB_APPROVER);
        // }
      }, 2000);
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
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
      // this.loadMode();
      this.showChosenMapping();
      this.fetchEventMap();
      this.renderMappingTabs(this.TAB_REPORTER);
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
    }
  }

  uploadReprogramTrigger = async (eventid: string, timestamp: string) => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/reprogramtrigger";

    const body = { "projectid": (this._SfProject[0].querySelector('#sf-i-project') as SfIForm).selectedValues()[0], "eventid": eventid, "timestamp": timestamp + ""} 
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log('jsonResponse sync', jsonRespose);
      
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

    if(this.mappings != null && this.mappings.duedates != null && this.mappings.duedates[value.id] != null && this.mappings.duedates[value.id] != "") {
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
      } else {

        if((new Date().getFullYear() + "") == dateArr[2]) {

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

  fetchSearchStatutes = async (searchString: string, cursor: string = "") => {

    let url = "https://"+this.apiIdStatutes+".execute-api.us-east-1.amazonaws.com/test/list";
    let authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    let xhr : any = (await this.prepareXhr({"searchstring": searchString, "cursor": cursor}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log('searchstatutes', jsonRespose);

      let newCursor = jsonRespose.cursor;
      let i = 0;

      while(true) {

        url = "https://"+this.apiIdStatutes+".execute-api.us-east-1.amazonaws.com/test/list";
        authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
        xhr = (await this.prepareXhr({"searchstring": searchString, "cursor": newCursor}, url, this._SfLoader, authorization, "" + parseInt(((i)*10*100/jsonRespose.found) + "") + "%")) as any;
        this._SfLoader.innerHTML = '';
        if(xhr.status == 200) {
          const jsonRespose1 = JSON.parse(xhr.responseText);
          jsonRespose.values.push(...jsonRespose1.values);
          if(newCursor == jsonRespose1.cursor) {
            break;
          }
          newCursor = jsonRespose1.cursor;
          console.log('newcursor', i, jsonRespose1.cursor);
        } else {
          break;
        }

        i++;
      }


      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchSearchCompliances = async (searchString: string, cursor: string = "") => {

    let url = "https://"+this.apiIdCompliances+".execute-api.us-east-1.amazonaws.com/test/list";
    let authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    let xhr : any = (await this.prepareXhr({"searchstring": searchString, "cursor": cursor}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);

      let newCursor = jsonRespose.cursor;
      console.log('newcursor', newCursor);
      let i = 0;

      while(true) {

        url = "https://"+this.apiIdCompliances+".execute-api.us-east-1.amazonaws.com/test/list";
        authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
        xhr = (await this.prepareXhr({"searchstring": searchString, "cursor": newCursor}, url, this._SfLoader, authorization, "" + parseInt(((i)*10*100/jsonRespose.found) + "") + "%")) as any;

        this._SfLoader.innerHTML = '';
        if(xhr.status == 200) {
          const jsonRespose1 = JSON.parse(xhr.responseText);
          console.log('newcursor response', jsonRespose1);
          jsonRespose.values.push(...jsonRespose1.values);
          if(newCursor == jsonRespose1.cursor) {
            break;
          }
          newCursor = jsonRespose1.cursor;
          console.log('newcursor', i, jsonRespose1.cursor);
        } else {
          break;
        }

        i++;

      }

      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchMappedLocations = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getmappedlocations";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchMappedFunctions = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getmappedfunctions";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchMappedCompliances = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getmappedcompliances";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchMappedSerializedAlertSchedules = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getmappedserializedalertschedules";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchMappedSerializedDuedates = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getmappedserializedduedates";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchMappedSerializedApprovers = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getmappedserializedapprovers";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchMappedSerializedFunctionheads = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getmappedserializedfunctionheads";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }


  fetchMappedSerializedMakerCheckers = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getmappedserializedmakercheckers";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchMappedSerializedDocs = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getmappedserializeddocs";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }


  fetchMappedSerializedAuditors = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getmappedserializedauditors";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchMappedSerializedViewers = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getmappedserializedviewers";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchMappedSerializedReporters = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getmappedserializedreporters";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchMappedSerializedTags = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getmappedserializedtags";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchMappedSerializedLocations = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getmappedserializedlocations";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchMappedSerializedFunctions = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getmappedserializedfunctions";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchMappedSerializedEntities = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getmappedserializedentities";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchMappedSerializedCountries = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getmappedserializedcountries";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchMappedInternalControls = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getmappedinternalcontrols";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchMappedAlertSchedules = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getmappedalertschedules";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchMappedDuedates = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getmappedduedates";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchMappedReporters = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getmappedreporters";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchMappedApprovers = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getmappedapprovers";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchMappedFunctionHeads = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getmappedfunctionheads";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchMappedMakerCheckers = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getmappedmakercheckers";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchMappedDocs = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getmappeddocs";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }


  fetchMappedAuditors = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getmappedauditors";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchMappedViewers = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getmappedviewers";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchMappedTags = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getmappedtags";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchMappedCountries = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getmappedcountries";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchMappedEntities = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getmappedentities";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchMappedStatutes = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getmappedstatutes";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchInternalControlsJobs = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getinternalcontrolsjobs";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchAlertSchedulesJobs = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getalertschedulesjobs";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchDueDatesJobs = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getduedatesjobs";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchApproversJobs = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getapproversjobs";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchFunctionHeadsJobs = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getfunctionheadsjobs";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchMakerCheckersJobs = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getmakercheckersjobs";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchDocsJobs = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getdocsjobs";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchAuditorsJobs = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getauditorsjobs";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchViewersJobs = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getviewersjobs";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchReportersJobs = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getreportersjobs";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }
  
  fetchTagsJobs = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/gettagsjobs";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }
  
  fetchLocationsJobs = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getlocationsjobs";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }
  
  fetchCountriesJobs = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getcountriesjobs";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }
  
  fetchEntitiesJobs = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getentitiesjobs";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }
  
  fetchFunctionJobs = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getfunctionsjobs";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchCalendarJobs = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getcalendarjobs";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchDetail = async (value: any) => {

    const body: any = this.getApiBodyList();
    body.id = value;
    console.log('detail', value, body);
    let url = "https://"+this.apiIdDetail+".execute-api.us-east-1.amazonaws.com/test/" + this.apiMethodDetail;

    console.log('fetch events detail url', url);
    console.log('fetch events detail body', body);

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log('jsonResponse fetch events detail', jsonRespose.data.value.duedate);
      this.processEvent(jsonRespose.data.value)
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
    }

  }

  fetchGetMappedCalendar = async() => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/getmappedcalendar";

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization);
    this.setSuccess('Operation triggered! It will complete in the background in a few minutes...');
    setTimeout(() => {
      this.clearMessages();
      this._SfLoader.innerHTML = '';
    }, 3000);

  }

  // foundCalendarInLocal = (body: any) => {
  //   var foundInLocal = false;
  //   if(localStorage.getItem(JSON.stringify(body)) != null) {
  //     if(localStorage.getItem(JSON.stringify(body)) != "") {
  //       foundInLocal = true;
  //     }
  //   }
  //   return foundInLocal;
  // }

  // // getLocalKey = () => {
  // //   const localKey = this.projectId + ';' + this.userProfileId + ';' + this.entityId + ';' + this.locationId;
  // //   return localKey;
  // // }

  // cleanLocalStorage = (body: any) => {
    
  //   const delKeys = [];
  //   for(var i = 0; i < localStorage.length; i++) {
  //     if(localStorage.key(i) != JSON.stringify(body)) {
  //       delKeys.push(localStorage.key(i));
  //     }
  //   }
  //   for( var i = 0; i < delKeys.length; i++) {
  //     localStorage.removeItem(delKeys[i] || "");
  //   }
  // }

  fetchUserCalendar_2 = async(startDate: string = "", endDate: string = "") => {

    let path = "";

    if(this.tagId != null && this.tagId != "") {
      path = "getallmytagevents";
    } else if(this.functionId != null && this.functionId != "") {
      path = "getallfunctionevents";
    } else if(this.countryId != null && this.countryId != "") {
      path = "getallcountryevents";
    } else if(this.locationId != null && this.locationId != "") {
      path = "getmyevents";
    } else {
      path = "getallmyevents";
    }

    let sDate = "";
    let eDate = "";
    let paginate = false;

    console.log('currenttab', this.getCurrentTab());

    if(this.getCurrentTab() == this.TAB_YEAR) {
      sDate = "03/31/" + this.calendarStartYYYY;
      eDate = "04/01/" + (this.calendarStartYYYY + 1);
      paginate = true;
    } else {
      sDate = startDate;
      eDate = endDate;
    }


    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/"+ path;
    console.log('fetch calendar url', url);
    let urlBody = {"projectid": this.projectId, "userprofileid": this.userProfileId, "role": this.myRole, "entityid": this.entityId, "countryid": this.countryId, "functionid": this.functionId, "locationid": this.locationId, "tagid": this.tagId, "adhoc": "false", "exclusivestartkey": "", "sdate": sDate, "edate": eDate, "paginate": paginate};

    console.log('urlbody', urlBody);

    // if(this.foundCalendarInLocal(urlBody)) {
    //   //const jsonRespose = JSON.parse(localStorage.getItem(JSON.stringify(urlBody)) || "");
    //   this.showChosenProject();
    //   //console.log(jsonRespose);
    //   this.events = JSON.parse(localStorage.getItem(JSON.stringify(urlBody)) || "");
    //   if(this.events != null) {
    //     this.renderTabs(this.TAB_YEAR);
    //     this.renderCalendar();
    //   }
    // }

    // this.cleanLocalStorage(urlBody);

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(urlBody, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      // console.log('foundinlocal', this.foundCalendarInLocal(urlBody));

      // if(this.foundCalendarInLocal(urlBody)) {
      //   this.events = (jsonRespose.data.events)
      // } else {
        this.showChosenProject();
        console.log(jsonRespose);
        this.events = (jsonRespose.data.events)

        let lastEvaluatedKey = jsonRespose.lastEvaluatedKey;

        console.log('lastevaluatedkey0', lastEvaluatedKey);

        do {

          if(lastEvaluatedKey != null) {

            const xhr2 : any = (await this.prepareXhr({"projectid": this.projectId, "userprofileid": this.userProfileId, "role": this.myRole, "entityid": this.entityId, "countryid": this.countryId, "functionid": this.functionId, "locationid": this.locationId, "tagid": this.tagId, "adhoc": "false", "exclusivestartkey": lastEvaluatedKey, "sdate": sDate, "edate": eDate, "paginate": paginate}, url, this._SfLoader, authorization)) as any;
            this._SfLoader.innerHTML = '';

            if(xhr2.status == 200) {

              const jsonRespose2 = JSON.parse(xhr2.responseText);
              this.events = {...this.events, ...jsonRespose2.data.events}

              lastEvaluatedKey = jsonRespose2.lastEvaluatedKey;
              console.log('lastevaluatedkey1', lastEvaluatedKey);

            } else {
              console.log('calendar fetching error breaking');
              break;
            }

          } else {
            console.log('calendar fetching breaking');
            break;
          }

        } while(1)

        if(this.events != null) {
          // this.renderTabs(this.TAB_YEAR);
          //this.renderCalendar();
        }
      
      // }

      //localStorage.setItem(JSON.stringify(urlBody), JSON.stringify(this.events));
      
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

  fetchReprogramAdhoc = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/reprogramtrigger";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.mode == "admin" ? (this._SfProject[0].querySelector('#sf-i-project') as SfIForm).selectedValues()[0] : this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
      this.fetchList();
      setTimeout(() => {
        this.clearMessages();
      }, 3000);

    }
  }

  fetchAdhoc = async (reprogramTriggers: boolean = false, startDate: string = "", endDate: string = "") => {

    let path = "";
    
    if(this.tagId != null && this.tagId != "") {
      path = "getallmytagevents";
    } else if(this.functionId != null && this.functionId != "") {
      path = "getallfunctionevents";
    } else if(this.countryId != null && this.countryId != "") {
      path = "getallcountryevents";
    } else if(this.locationId != null && this.locationId != "") {
      path = "getmyevents";
    } else {
      path = "getallmyevents";
    }

    let sDate = "";
    let eDate = "";
    let paginate = false;

    console.log('currenttab', this.getCurrentTab());

    if(this.getCurrentTab() == this.TAB_YEAR) {
      sDate = "03/31/" + this.calendarStartYYYY;
      eDate = "04/01/" + (this.calendarStartYYYY + 1);
      paginate = true;
    } else {
      sDate = startDate;
      eDate = endDate;
    }


    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/"+ path;
    let urlBody = {"projectid": this.projectId, "userprofileid": this.userProfileId, "role": this.myRole, "entityid": this.entityId, "countryid": this.countryId, "functionid": this.functionId, "locationid": this.locationId, "tagid": this.tagId, "adhoc": "true", "exclusivestartkey": "", "sdate": sDate, "edate": eDate, "paginate": paginate};

    console.log('urlbody', urlBody);

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(urlBody, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      this.unmappedEvents = jsonRespose.data.unmappedEvents;
      this.mappings = jsonRespose.data.mappings;
      this.triggers = jsonRespose.data.triggers;

      let lastEvaluatedKey = jsonRespose.lastEvaluatedKey;

      do {

        if(lastEvaluatedKey != null) {

          const xhr2 : any = (await this.prepareXhr({"projectid": this.projectId, "userprofileid": this.userProfileId, "role": this.myRole, "entityid": this.entityId, "countryid": this.countryId, "functionid": this.functionId, "locationid": this.locationId, "tagid": this.tagId, "adhoc": "true", "exclusivestartkey": lastEvaluatedKey, "sdate": sDate, "edate": eDate, "paginate": paginate}, url, this._SfLoader, authorization)) as any;
          this._SfLoader.innerHTML = '';

          if(xhr2.status == 200) {

            const jsonRespose2 = JSON.parse(xhr2.responseText);
            this.unmappedEvents = {...this.unmappedEvents, ...jsonRespose.data.unmappedEvents};
            this.mappings = {...this.mappings, ...jsonRespose.data.mappings};
            this.triggers = {...this.triggers, ...jsonRespose.data.triggers};

            lastEvaluatedKey = jsonRespose2.lastEvaluatedKey;
            console.log('lastevaluatedkey1', lastEvaluatedKey);

          } else {
            console.log('calendar fetching error breaking');
            break;
          }

        } else {
          console.log('calendar fetching breaking');
          break;
        }

      } while(1)

      if(!reprogramTriggers) {
        this.renderAdhoc(this.unmappedEvents, this.triggers);
      } else {
        // await this.processTriggers(this.triggers);
      }

    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
      this.fetchList();
      setTimeout(() => {
        this.clearMessages();
      }, 3000);

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
      console.log('mappings-1', 'fetcheventmap', this.mappings)
      console.log('mappings0', 'fetcheventmap', this.mappedValuesUsers)
      this.renderMapping( this.unmappedEvents)
      console.log('mappings1', 'fetcheventmap', this.mappedValuesUsers)
      this.prepopulateMapping(this.mappings);
      console.log('mappings2', 'fetcheventmap', this.mappedValuesUsers)
      this.applyFilter();
      if(jsonRespose.data.mappings != null && this.myRole != this.TAB_APPROVER) {
        (this._SfButtonBackCalendarMapping as HTMLButtonElement).style.visibility = 'visible';
      } else {
        (this._SfButtonBackCalendarMapping as HTMLButtonElement).style.visibility = 'hidden';
      }
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
      this.fetchList();
      setTimeout(() => {
        this.clearMessages();
      }, 3000);

    }

  }

  fetchList = async () => {

    console.log('calendar fetching list', this.apiIdList);

    const body: any = this.getApiBodyList();

    if(this.apiIdList != null) {

      body.id = (this._SfProject[0].querySelector('#sf-i-project') as SfIForm).selectedValues()[0];

      let url = "https://"+this.apiIdList+".execute-api.us-east-1.amazonaws.com/test/" + this.apiMethodList;

      console.log('fetch events url', url);

      const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
      const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
      this._SfLoader.innerHTML = '';

      console.log('fetch events body', body);

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
        await this.uploadEvents();
        await this.fetchReprogramAdhoc();
        //await this.fetchAdhoc(true);
        
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

  truncate = ( str: string, n: number, useWordBoundary: boolean, ellipsis: boolean = true ) => {
    if (str.length <= n) { return str; }
    const subString = str.slice(0, n-1); // the original check
    return (useWordBoundary 
      ? subString.slice(0, subString.lastIndexOf(" ")) 
      : subString) + (ellipsis ? "&hellip;" : "...");
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

    Chart.register(...registerables);
    //Chart.register(Colors);

    if(this.mode == "onboarding") {

      //this.myOnboardingTab = this.TAB_STATUTES;
      this.renderOnboardingTabs();
      // this.clickOnboardingTabs();
      //this.loadOnboardingStatutes();
      //((this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-compliances') as HTMLButtonElement).click();

    } else if(this.mode == "admin") {

      this.showChooseProject();
      this.initListenersAdmin();

    } else {

      this.flowGraph = this.FLOW_GRAPH_COMPLETENESS;
      this.enableCalendar();
      this.initInputs();
      this.initCalendar();
      let tempRole = this.myRole;
      if(tempRole == "") {
        this.myRole = this.TAB_REPORTER;
      }
      this.renderRoleTabs();
      if(tempRole != "") {
        this._SfRoleTabContainer.innerHTML = '';
      }

      console.log('stream received', this.stream, this.TAB_STREAM, this.TAB_YEAR);

      if(this.stream == this.TAB_YEAR) {
        this.renderTabs(this.TAB_YEAR);
        ((this._SfTabContainer as HTMLDivElement).querySelector('#calendar-tab-year') as HTMLButtonElement)?.click();
      } else {
        console.log('stream received rendering year', this.stream);
        this.renderTabs(this.TAB_STREAM);
        ((this._SfTabContainer as HTMLDivElement).querySelector('#calendar-tab-month') as HTMLButtonElement)?.click();
      }
      //await this.fetchUserCalendar_2();
      
      
      // if(this.events != null && !this.foundCalendarInLocal()) {
      //   this.renderTabs(this.TAB_YEAR);
      //   this.renderCalendar();
      // }
      
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

    if(this.mode == "onboarding") {

      return html`
          
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
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="functionheads-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="auditors-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="viewers-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="docs-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="makercheckers-container">
              
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


    } else if(this.mode == "admin") {

      return html`
          
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

    } else {

      return html`
          
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
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="calendar-container">
              
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

}


declare global {
  interface HTMLElementTagNameMap {
    'sf-i-events': SfIEvents;
  }
}

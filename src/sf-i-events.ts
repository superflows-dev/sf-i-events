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
import { SfIMultitextarea } from 'sf-i-multitextarea';
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
  FLOW_GRAPH_COMPLIANCE = "compliance";
  FLOW_GRAPH_RISKAREAS = "riskarea";
  FLOW_GRAPH_RISKSEVERITY = "risk";
  FLOW_GRAPH_LOCATION = "locationname";
  FLOW_GRAPH_FUNCTION = "functions";
  FLOW_GRAPH_OBLIGATIONTYPE = "obligationtype";
  FLOW_GRAPH_JURISDICTION = "jurisdiction";
  FLOW_GRAPH_FREQUENCY = "frequency";
  FLOW_GRAPH_SUBCATEGORY = "subcategory";
  TAB_GROUP_BUSINESS_UNDERSTANDING = "businessunderstanding";
  TAB_GROUP_GOVERNANCE_MAPPING = "governancemapping";
  TAB_GROUP_CUSTOMIZATION = "customize";
  TAB_GROUP_ROLLOUT = "rollout";
  TAB_YEAR = "year";
  TAB_FIND = "find";
  TAB_STREAM = "stream";
  TAB_UPCOMING = "upcoming";
  TAB_THIS = "this";
  TAB_PAST = "past";
  TAB_CUSTOM = "custom";
  TAB_ADHOC = "adhoc";
  TAB_REGISTERS = "registers";
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
  TAB_EXTENSIONS = "extensions";
  TAB_TRIGGERS = "triggers";
  TAB_ALERTSCHEDULES = "alertschedules";
  TAB_ACTIVATIONS = "activations";
  TAB_INVALIDATION = "invalidations";
  TAB_INTERNALCONTROLS = "internalcontrols";
  TAB_SIGNOFF = "signoff";
  TAB_FUNCTIONS = "functions";
  TAB_COUNTRIES = "countries";
  TAB_CALENDAR = "calendar";
  TAB_RCM_COMPLIANCES = "compliances";
  TAB_RCM_PROJECTS = "projects";
  TAB_RCM_DATE = "date";
  TAB_RCM_CONFIRM = "confirm";
  TAB_RCM_JOBS = "jobs";
  COLOR_APPROVED = "#50cf01";
  COLOR_NOT_STARTED = "#A4A9AD";
  COLOR_PENDING_APPROVAL = "#ffe505"
  COLOR_REJECTED = "#C80036"
  COLOR_PAST_DUE_DATE = "#ffe505";
  COLOR_LATE_EXECUTED = "#840B0F";
  COLOR_LATE_APPROVED = "#EE2F36";
  COLOR_LATE_REPORTED = "#Ef9C66";
  COLOR_SCHEDULED = "#888888";
  COLOR_NOT_COMPLIED = "#C80036";
  COLOR_PARTIALLY_COMPLIED = "#F79256";
  COLOR_COMPLIED = "#50cf01";
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
        .person-designation {
          text-transform: capitalize;
        }
        .status-format {
          text-transform: uppercase;
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
        .td-thin {
          min-width: 150px;
        }
        .td-wide {
          min-width: 300px;
        }
        td {
          padding: 5px;
          font-size: 70%;
          vertical-align: top;
          min-width: 200px;
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
        .color-pending-approval {
          color: #ffe505;
        }
        .color-not-started {
          color: #888888;
        }
        .color-not-complied {
          color: #C80036;
        }
        .color-partially-complied {
          color: #F79256;
        }
        .color-scheduled {
          color: #888888;
        }
        .color-complied {
          color: #50cf01;
        
        }
        .color-done {
          color: #50cf01;
        }
        .color-rejected {
          color: #C80036;
        }
        .color-approved {
          color: #50cf01;
        }
        .color-past-due-date {
          color: #ffe505;
        }
        .color-late-executed {
          color: #840B0F;
        }
        .color-late-approved {
          color: #EE2F36;
        }
        .color-late-reported {
          color: #Ef9C66;
        }
      </style>
    </head>
    <body>
      <div class="certificate-section">
        <h1 class="text-center">Certificate</h1>
        <p>I, PERSON_NAME, working as <span class="person-designation">PERSON_DESIGNATION</span> in PERSON_COMPANY, hereby declare that I am entrusted with the responsibility of ensuring compliance with various laws applicable to the company in the administration of business and the affairs of the company</p>
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
            <div class="person-designation">Role: PERSON_DESIGNATION</div>
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
        .status-format {
          text-transform: uppercase;
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
        .td-thin {
          min-width: 150px;
        }
        .td-wide {
          min-width: 300px;
        }
        td {
          padding: 5px;
          font-size: 70%;
          vertical-align: top;
          min-width: 200px;
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
        .color-pending-approval {
          color: #ffe505;
        }
        .color-not-started {
          color: #888888;
        }
        .color-not-complied {
          color: #C80036;
        }
        .color-partially-complied {
          color: #F79256;
        }
        .color-complied {
          color: #50cf01;
        }
        .color-scheduled {
          color: #888888;
        }
        .color-done {
          color: #50cf01;
        }
        .color-rejected {
          color: #C80036;
        }
        .color-approved {
          color: #50cf01;
        }
        .color-past-due-date {
          color: #ffe505;
        }
        .color-late-executed {
          color: #840B0F;
        }
        .color-late-approved {
          color: #EE2F36;
        }
        .color-late-reported {
          color: #Ef9C66;
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
          <h1>Compliance Report</h1>
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

  MAPPING_HTML = `
  
  <html>
    <head>  
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
    rel="stylesheet">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;600&display=swap" rel="stylesheet">
      <script src="https://unpkg.com/@webcomponents/webcomponentsjs@latest/webcomponents-loader.js"></script>
      <script type="module">

          import {LitElement, html, css} from 'https://esm.run/lit-element/lit-element.js';
          import {SfISelect} from 'https://esm.run/sf-i-select/sf-i-select.js';
          import {SfISubSelect} from 'https://esm.run/sf-i-sub-select/sf-i-sub-select.js';
          import {SfIForm} from 'https://esm.run/sf-i-form/sf-i-form.js';
          import {SfIElasticText} from 'https://esm.run/sf-i-elastic-text/sf-i-elastic-text.js';
          import {SfIUploader} from 'https://esm.run/sf-i-uploader/sf-i-uploader.js';
          import {SfIMultitextarea} from 'https://esm.run/sf-i-multitextarea/sf-i-multitextarea.js';
          
          // import {LitElement, html, css} from 'https://unpkg.com/lit-element@3.3.3/lit-element.js?module';
          // import {SfNav} from 'https://unpkg.com/sf-nav@1.0.94/sf-nav.js?module';
          // import {SfChartPie} from 'https://unpkg.com/sf-chart-pie@1.0.4/sf-chart-pie.js?module';
          // import {SfChartBar} from 'https://unpkg.com/sf-chart-bar@1.0.6/sf-chart-bar.js?module';
          // import {SfUserAuth} from 'https://unpkg.com/sf-user-auth@1.0.89/sf-user-auth.js?module';
          // import {SfISelect} from 'https://unpkg.com/sf-i-select@1.0.91/sf-i-select.js?module';
          // import {SfISubSelect} from 'https://unpkg.com/sf-i-sub-select@1.0.82/sf-i-sub-select.js?module';
          // import {SfIForm} from 'https://unpkg.com/sf-i-form@1.0.125/sf-i-form.js?module';
          // import {SfIEvents} from 'https://unpkg.com/sf-i-events@1.0.469/sf-i-events.js?module';
          // import {SfIElasticText} from 'https://unpkg.com/sf-i-elastic-text@1.0.11/sf-i-elastic-text.js?module';
          // import {SfIUploader} from 'https://unpkg.com/sf-i-uploader@1.0.60/sf-i-uploader.js?module';
          // import {SfRandomText} from 'https://unpkg.com/sf-random-text@1.0.2/sf-random-text.js?module';
          // import {SfIMultitextarea} from 'https://unpkg.com/sf-i-multitextarea@1.0.16/sf-i-multitextarea.js?module';
          
      </script>
      <style>
        body {
          font-family: Source Sans Pro;
          margin: 2px;
          padding: 20px;
          background-color: #efefef;
        }
        .chosen {
          background-color: #E5FAD4 !important;
        }
        .td-head {
          text-transform: capitalize;
        }
        .status-format {
          text-transform: uppercase;
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
        .color-pending-approval {
          color: #ffe505;
        }
        .color-not-started {
          color: #888888;
        }
        .color-not-complied {
          color: #C80036;
        }
        .color-partially-complied {
          color: #F79256;
        }
        .color-complied {
          color: #50cf01;
        }
        .color-scheduled {
          color: #888888;
        }
        .color-done {
          color: #50cf01;
        }
        .color-rejected {
          color: #C80036;
        }
        .color-approved {
          color: #50cf01;
        }
        .color-past-due-date {
          color: #ffe505;
        }
        .color-late-executed {
          color: #840B0F;
        }
        .color-late-approved {
          color: #EE2F36;
        }
        .color-late-reported {
          color: #Ef9C66;
        }
      </style>
    </head>
    <body>
      TABLE_DATA
    </body>
  </html>
  
  `;
  
  TAGGING_HTML = `
    
    <html>
      <head>  
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;600&display=swap" rel="stylesheet">
        <script src="https://unpkg.com/@webcomponents/webcomponentsjs@latest/webcomponents-loader.js"></script>
        <script type="module">

            import {LitElement, html, css} from 'https://esm.run/lit-element/lit-element.js';
            import {SfISelect} from 'https://esm.run/sf-i-select/sf-i-select.js';
            import {SfISubSelect} from 'https://esm.run/sf-i-sub-select/sf-i-sub-select.js';
            import {SfIForm} from 'https://esm.run/sf-i-form/sf-i-form.js';
            import {SfIElasticText} from 'https://esm.run/sf-i-elastic-text/sf-i-elastic-text.js';
            import {SfIUploader} from 'https://esm.run/sf-i-uploader/sf-i-uploader.js';
            import {SfIMultitextarea} from 'https://esm.run/sf-i-multitextarea/sf-i-multitextarea.js';
            
            // import {LitElement, html, css} from 'https://unpkg.com/lit-element@3.3.3/lit-element.js?module';
            // import {SfNav} from 'https://unpkg.com/sf-nav@1.0.94/sf-nav.js?module';
            // import {SfChartPie} from 'https://unpkg.com/sf-chart-pie@1.0.4/sf-chart-pie.js?module';
            // import {SfChartBar} from 'https://unpkg.com/sf-chart-bar@1.0.6/sf-chart-bar.js?module';
            // import {SfUserAuth} from 'https://unpkg.com/sf-user-auth@1.0.89/sf-user-auth.js?module';
            // import {SfISelect} from 'https://unpkg.com/sf-i-select@1.0.91/sf-i-select.js?module';
            // import {SfISubSelect} from 'https://unpkg.com/sf-i-sub-select@1.0.82/sf-i-sub-select.js?module';
            // import {SfIForm} from 'https://unpkg.com/sf-i-form@1.0.125/sf-i-form.js?module';
            // import {SfIEvents} from 'https://unpkg.com/sf-i-events@1.0.469/sf-i-events.js?module';
            // import {SfIElasticText} from 'https://unpkg.com/sf-i-elastic-text@1.0.11/sf-i-elastic-text.js?module';
            // import {SfIUploader} from 'https://unpkg.com/sf-i-uploader@1.0.60/sf-i-uploader.js?module';
            // import {SfRandomText} from 'https://unpkg.com/sf-random-text@1.0.2/sf-random-text.js?module';
            // import {SfIMultitextarea} from 'https://unpkg.com/sf-i-multitextarea@1.0.16/sf-i-multitextarea.js?module';
            
        </script>
        <style>
          body {
            font-family: Source Sans Pro;
            margin: 2px;
            padding: 20px;
            background-color: #efefef;
          }
          .chosen {
            background-color: #E5FAD4 !important;
          }
          .td-head {
            text-transform: capitalize;
          }
          .status-format {
            text-transform: uppercase;
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
          .color-pending-approval {
            color: #ffe505;
          }
          .color-not-started {
            color: #888888;
          }
          .color-not-complied {
            color: #C80036;
          }
          .color-partially-complied {
            color: #F79256;
          }
          .color-complied {
            color: #50cf01;
          }
          .color-scheduled {
            color: #888888;
          }
          .color-done {
            color: #50cf01;
          }
          .color-rejected {
            color: #C80036;
          }
          .color-approved {
            color: #50cf01;
          }
          .color-past-due-date {
            color: #ffe505;
          }
          .color-late-executed {
            color: #840B0F;
          }
          .color-late-approved {
            color: #EE2F36;
          }
          .color-late-reported {
            color: #Ef9C66;
          }
        </style>
      </head>
      <body>
        TABLE_DATA
      </body>
      <script>
        var preselectedValues = TABLE_VALUES;
        const inputs = document.querySelectorAll('.tags-input');
        for(var i = 0; i < inputs.length; i++) {
          inputs[i].preselectedValues = preselectedValues[i];
        }
      </script>
    </html>
  
  `;

  AUTOSAVE_FLAG = true;

  EXCLUDE_COLS_FROM_REGS: Array<string> = ["updatetype", "question", "invalidations", "activations", "alertschedule", "clientquestion", "countryname", "countryid", "entityname", "entityid", "locationname", "locationid", "reporters", "approvers", "timeframe", "responsedays", "execmodule", "functions", "shortid", "shortnumid", "countries", "entities", "locations","tagsmap","reportersmap","approversmap","functionheadsmap","auditorsmap","viewersmap","approved","documents","comments","lastupdated","dateofcompletion","mmdd","completeness","timeliness","compliance","delta","triggers"]

  chartSelectedLegend: Array<number>= [];

  selectedFilter: any = null;

  barCharDataSet2: Array<any> = [];

  barCharDataSet2Arr: Array<any> = [];

  barCharDataSet3: Array<any> = [];

  barCharDataSet3Arr: Array<any> = [];

  barCharDataSet4: Array<any> = [];

  barCharDataSet4Arr: Array<any> = [];

  @query('#decrypt-container')
  _SfDecryptContainer: any;

  @query('#sf-i-project-decrypt')
  _SfDecryptProjectInput: any;

  @query('#input-decrypt')
  _SfDecryptFileInput: any;

  @query('#button-decrypt')
  _SfDecryptButton: any;

  @property()
  decryptProjectId: string = "";

  @property()
  decryptFileName: string = "";

  @property()
  filteronboarding: string = '[]';

  getfilterOnboarding = () => {
    return JSON.parse(this.filteronboarding);
  }

  getFilterOnboardingString = () => {

    const jsonFilterOnboarding = JSON.parse(this.filteronboarding);

    var html = '';

    html += '<h5>Mapped Locations</h5>'

    html += '<table>';

    html += '<tr>';
      html += '<th part="td-head">';
      html += 'Country'
      html += '</th>';
      html += '<th part="td-head">';
      html += 'State'
      html += '</th>';
      html += '<th part="td-head">';
      html += 'Location'
      html += '</th>';
    html += '</tr>';

    let count = 0;

    for(var i = 0; i < jsonFilterOnboarding.length; i++) {

      var country = jsonFilterOnboarding[i].country;

      if(jsonFilterOnboarding[i].locations != null && Object.keys(jsonFilterOnboarding[i].locations).length > 0) {

        for(var j = 0; j < Object.keys(jsonFilterOnboarding[i].locations).length; j++) {

          const state = Object.keys(jsonFilterOnboarding[i].locations)[j];
  
          var classBg = '';
  
          if(count%2 === 0) {
            classBg = 'td-light';
          } else {
            classBg = 'td-dark';
          }
  
          html += '<tr>';
  
            html += '<td part="td-body1" class="'+classBg+'">';
              html += country;
            html += '</td>';
  
            html += '<td part="td-body1" class="'+classBg+'">';
              html += state;
            html += '</td>';
  
            html += '<td part="td-body1" class="'+classBg+'">';
  
              //console.log('gettinglocations', (jsonFilterOnboarding[i]['locations'][state]));
  
              var tempHtml = '';
              for(var k = 0; k < (jsonFilterOnboarding[i]['locations'][state]).length; k++) {
                const location = (jsonFilterOnboarding[i]['locations'][state])[k];
                tempHtml += location;
                if(k < ((jsonFilterOnboarding[i]['locations'][state]).length - 1)) {
                  tempHtml += ', ';
                }
              }
              html += ('<div><sf-i-elastic-text class="statute-summary id-9" text="'+tempHtml+'" minlength="50"></sf-i-elastic-text></div>');
            html += '</td>';
  
          html += '</tr>';
  
          count++;
  
        }  

      }

     
    }

    html += '</table>';
    
    
    html += '<h5 class="mt-20">Mapped Laws</h5>'

    html += '<table>';

    html += '<tr>';
      html += '<th part="td-head">';
      html += 'Country'
      html += '</th>';
      html += '<th part="td-head">';
      html += 'State'
      html += '</th>';
      html += '<th part="td-head">';
      html += 'Subcategory'
      html += '</th>';
      html += '<th part="td-head">';
      html += 'Exclusions'
      html += '</th>';
      html += '<th part="td-head">';
      html += 'Inclusions'
      html += '</th>';
    html += '</tr>';

    for(var i = 0; i < jsonFilterOnboarding.length; i++) {

      var classBg = '';

      if(i%2 === 0) {
        classBg = 'td-light';
      } else {
        classBg = 'td-dark';
      }

      html += '<tr>';
        html += '<td part="td-body1" class="'+classBg+'">';
          html += jsonFilterOnboarding[i].country;
        html += '</td>';
        html += '<td part="td-body1" class="'+classBg+'">';
          for(var j = 0; j < jsonFilterOnboarding[i].states.length; j++) {
            html += ('<div>'+(jsonFilterOnboarding[i].states[j].length === 0 ? 'Federal' : jsonFilterOnboarding[i].states[j])+'</div>');
          }
        html += '</td>';
        html += '<td part="td-body1" class="'+classBg+'">';
        for(var j = 0; j < jsonFilterOnboarding[i].subcategories.length; j++) {
          html += ('<div>'+jsonFilterOnboarding[i].subcategories[j]+'</div>');
        }
        html += '</td>';
        html += '<td part="td-body1" class="'+classBg+'">';
          if(jsonFilterOnboarding[i].excludestatutes != null) {
            for(var j = 0; j < jsonFilterOnboarding[i].excludestatutes.length; j++) {
              html += ('<div><sf-i-elastic-text class="statute-summary id-9" text="'+jsonFilterOnboarding[i].excludestatutes[j]+'" minlength="10"></sf-i-elastic-text></div>');
            }
          }
        html += '</td>';
        html += '<td part="td-body1" class="'+classBg+'">';
          if(jsonFilterOnboarding[i].includestatutes != null) {
            for(var j = 0; j < jsonFilterOnboarding[i].includestatutes.length; j++) {
              html += ('<div><sf-i-elastic-text class="statute-summary id-9" text="'+jsonFilterOnboarding[i].includestatutes[j]+'" minlength="20"></sf-i-elastic-text></div>');
            }
          }
        html += '</td>';
      html += '</tr>';

    }

    html += '</table>';

    return html;

  }

  @property()
  locations!: string;

  getLocations = () => {
    return JSON.parse(this.locations);
  }

  getLocationsByCountry = (country: string, statute: string) => {

    let locations = [];
    if(this.getLocations()[country] != null) {
      const states = Object.keys(this.getLocations()[country]);
      for(var i = 0; i < states.length; i++) {
  
        if(this.getfilterOnboarding().length === 0) {
          locations.push(...this.getLocations()[country][states[i]]);
        } else {
          for(var j = 0; j < this.getLocations()[country][states[i]].length; j++) {
            for(var k = 0; k < this.getfilterOnboarding().length; k++) {
              if(this.getfilterOnboarding()[k]['country'] == country) {
                
                if(this.getfilterOnboarding()[k]['locations'] != null) {
                  if(this.getfilterOnboarding()[k]['locations'][states[i]] != null) {
                    var push = true;
                    if(this.getfilterOnboarding()[k]['locations'][states[i]].includes(this.getLocations()[country][states[i]][j])) {
                      
                      if(this.getfilterOnboarding()[k]['excludelocations'] == null) {
                      } else {
                        if(this.getfilterOnboarding()[k]['excludelocations'][statute] == null) {
                        } else {
                          if(this.getfilterOnboarding()[k]['excludelocations'][statute][states[i]] == null) {
                          } else {
                            if(statute == "Information Technology Act, 2000") {
                              //console.log("getLocationsByCountry", push, this.getfilterOnboarding()[k]['excludelocations'][statute][states[i]], this.getLocations()[country][states[i]][j], this.getfilterOnboarding()[k]['excludelocations'][statute][states[i]].includes(this.getLocations()[country][states[i]][j]));
                            }
                            if(this.getfilterOnboarding()[k]['excludelocations'][statute][states[i]].includes(this.getLocations()[country][states[i]][j])) {
                              //console.log("getLocationsByCountry", 'setting false');
                              push = false;
                            }
                          }
                        }
                        if(statute == "Information Technology Act, 2000") {
                          //console.log("getLocationsByCountry", push, this.getLocations()[country][states[i]][j]);
                        }  
                      }
                    } else {
                      push = false;
                    }
                    
                  } else {
                    push = false;
                  }
                } else {
                  push = false;
                }
                if(push) {
                  locations.push(this.getLocations()[country][states[i]][j]);
                }
                
              }
            }
          }
        }
  
      }
    }
    
    return locations;

  }

  getLocationsByState = (country: string, state: string, statute: string) => {
    
    //console.log('getting getLocationsByState', country, state, this.getfilterOnboarding());

    let locations = [];

    if(this.getLocations()[country] != null) {
      if(this.getLocations()[country][state] != null) {

        if(this.getLocations()[country][state] != null) {
          if(this.getfilterOnboarding().length === 0) {
            locations.push(...this.getLocations()[country][state]);
          } else {
            for(var k = 0; k < this.getfilterOnboarding().length; k++) {
              if(this.getfilterOnboarding()[k]['country'] == country) {
                for(var i = 0; i < this.getLocations()[country][state].length; i++) {
                  var push = true;
                  if(this.getfilterOnboarding()[k]['locations'] != null) {
                    if(this.getfilterOnboarding()[k]['locations'][state] != null) {
                      if(this.getfilterOnboarding()[k]['locations'][state].includes(this.getLocations()[country][state][i])) {
                        
                        if(this.getfilterOnboarding()[k]['excludelocations'] == null) {
                        } else {
                          if(this.getfilterOnboarding()[k]['excludelocations'][statute] == null) {
                          } else {
                            if(this.getfilterOnboarding()[k]['excludelocations'][statute][state] == null) {
                            } else {
                              if(this.getfilterOnboarding()[k]['excludelocations'][statute][state].includes(this.getLocations()[country][state][i])) {
                                push = false;
                              }
                            }
                          }
                        } 
                      } else {
                        push = false;
                      }
                      
                    } else {
                      push = false;
                    }
                  } else {
                    push = false;
                  }
                  if(push) {
                    locations.push(this.getLocations()[country][state][i]);
                  }
                  
                }
              }
            }
          }
        }
      }  
    }

    //console.log('getting getLocationsByState return ', locations);
    return locations;

  }

  @property()
  selectedCbs: Array<any> = [];

  @property()
  projectId!: string;

  @property()
  contractStartDate: string = "";

  @property()
  name!: string;

  @property()
  disableflagggrcresponse: string = "";

  @property()
  disablesave: string = "";

  @property()
  disableclientresponse: string = "";

  @property()
  disablesignoff: string = "";

  @property()
  apiId!: string;

  @property()
  apiIdStatutes!: string;

  @property()
  apiIdProjects!: string;

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
  showRegisterExport: string = "false";

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
  rcmSelectedCompliance!: any;

  @property()
  rcmSelectedProjects!: any;

  @property()
  rcmSelectedDate!: any;

  @property()
  rcmSelectedMessage!: any;

  @property()
  myOnboardingTab: string = "";

  @property()
  myOnboardingTabGroup: string = "";

  @property()
  myRcmTab: string = this.TAB_RCM_COMPLIANCES;

  @property()
  myRole: string = "";

  @property()
  chart: any = null;

  @property()
  chart2: any = null;

  @property()
  chart3: any = null;

  @property()
  chart4: any = null;

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
  streamIndex: any = null;

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
    //console.log('calendar api body list', this.apiBodyList);
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
  csvDataRegisters: string = "";

  @property()
  csvDataCompliances: string = "";

  @property()
  csvTableData: string = "";

  @property()
  csvDataStats: string = "";

  @property()
  csvGraphStats: string = "";

  @property()
  csvCompletenessStats: string = "";

  @property()
  csvTimelinessStats: string = "";

  @property()
  csvComplianceStats: string = "";

  @property()
  htmlDataCompliances: string = "";

  @property()
  htmlDataStats: string = "";

  @property()
  period: string = "";

  @property()
  mode!: string;

  @property()
  flowRcmNotification: number = 0;

  @property()
  flowGraph: string = "";

  @property()
  flow: string = "";

  @property()
  fill: string = "solid";

  @property()
  filterTags: string [] = [];


  @property()
  subfilter: string = "";


  @property()
  riskAreasData: any = null;

  @property()
  riskAreasPartStatusData: any = null;

  @property()
  riskAreasLateStatusData: any = null;

  @property()
  riskAreasComplianceStatusData: any = null;

  @property()
  riskSeverityData: any = null;

  @property()
  arrCols: Array<string> = ["country", "state", "obligationtitle", "statute", "category"];

  @property()
  arrRcmProjectCols: Array<string> = ["name"];

  @property()
  riskSeverityPartStatusData: any = null;

  @property()
  riskSeverityLateStatusData: any = null;

  @property()
  riskSeverityComplianceStatusData: any = null;

  @property()
  functionData: any = null;

  @property()
  functionPartStatusData: any = null;

  @property()
  functionLateStatusData: any = null;

  @property()
  functionComplianceStatusData: any = null;

  @property()
  obligationTypeData: any = null;

  @property()
  obligationTypePartStatusData: any = null;

  @property()
  obligationTypeLateStatusData: any = null;

  @property()
  obligationTypeComplianceStatusData: any = null;

  @property()
  jurisdictionData: any = null;

  @property()
  jurisdictionPartStatusData: any = null;

  @property()
  jurisdictionLateStatusData: any = null;

  @property()
  jurisdictionComplianceStatusData: any = null;

  @property()
  currentColumnIndex: string = "";

  @property()
  frequencyData: any = null;

  @property()
  frequencyPartStatusData: any = null;

  @property()
  frequencyLateStatusData: any = null;

  @property()
  frequencyComplianceStatusData: any = null;

  @property()
  subcategoryData: any = null;

  @property()
  subcategoryPartStatusData: any = null;

  @property()
  subcategoryLateStatusData: any = null;

  @property()
  subcategoryComplianceStatusData: any = null;

  @property()
  locationData: any = null;

  @property()
  locationPartStatusData: any = null;

  @property()
  locationLateStatusData: any = null;

  @property()
  locationComplianceStatusData: any = null;

  @property()
  selectedItems: Array<string> = [];

  @property()
  selectedStatus: string = "";

  @property()
  selectedTab: string = "";

  @property()
  selectedCountryTab: number = -1;

  @property()
  restrictToMapping: string = "";

  @property()
  enableDeleteLatestReport: string = "";

  @property()
  stream: string = this.TAB_STREAM;

  static override styles = css`

    .bg-white {
      background-color: white;
    }

    .proposed-users-table {

      width: 150px;

    }

    #calendar-tab-next span {
      font-size: 80%;
    }

    .justify-evenly {
      justify-content: space-evenly;
    }

    #detail-container {
      z-index: 101;
    }

    .plain-filter-icon {
      cursor: pointer;
    }

    .pos-fixed {
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      top: 0px;
      left: 0px;
      width: 100%;
      min-height: 100%;
      z-index: 101;
    }

    .sub-button {
      font-size: 80%;
    }

    .sub-button span {
      font-size: 80%;
    }

    .pos-fixed-scroll {
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      bottom: 50px;
      right: 50px;
      z-index: 99;
    }

    .cover-slide {
      position: absolute;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
      background-color: black;
      opacity: 0.4;
    }

    .detail-container {
      width: 60%;
      height: 400px;
      background-color: #efefef;
      overflow-y: auto;
      border-radius: 10px;
      z-index: 102;
    }

    @media (orientation: portrait) {

      .detail-container {
        width: 80%;
        height: 400px;
        background-color: #efefef;
        overflow-y: auto;
        border-radius: 10px;
      }

    }

    .box {
      margin-top: 20px;
      height: 10px;
      width: 100%;
      background: linear-gradient(-45deg, transparent 10%, #ccc 5%, transparent 60%);
      background-size: 300%;
      background-position-x: 100%;
      animation: shimmer 1.5s infinite linear;
      margin-bottom: 20px;
    }

    .chosen {
      background-color: #E5FAD4 !important;
    }
  
    @keyframes shimmer {
      to {
         background-position-x: 0%
      }
   }  

   .truncate {
    display: none
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


    @media (orientation: portrait) {

      #tab-container {
        position: fixed;
        bottom: 0px;
        left: 0px;
        background-color: #efefef;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 10px;
        overflow-x: auto;
        width: 100%;
        max-width: 100%;
        justify-content: start;
        box-shadow: 1px 1px 10px 0 rgba(0, 0, 0, 0.25), -1px -1px 10px 0 rgba(255, 255, 255, 0.6);
        z-index: 101;
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

    .title-byline {
      font-size: 90%;
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

    .mb-0 {
      margin-bottom: 0px;
    }

    .mt-0 {
      margin-top: 0px;
    }

    .ml-0 {
      margin-left: 0px;
    }

    .mr-0 {
      margin-right: 0px;
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

    .badge-success {
      padding-left: 5px;
      padding-right: 5px;
      padding-top: 5px;
      padding-bottom: 2px;
      border-radius: 7px;
      color: white;
      background-color: #50cf01;
    }

    .badge-warning {
      padding-left: 5px;
      padding-right: 5px;
      padding-top: 5px;
      padding-bottom: 2px;
      border-radius: 7px;
      color: black;
      background-color: #ffe505;
    }

    .badge-error {
      padding-left: 5px;
      padding-right: 5px;
      padding-top: 5px;
      padding-bottom: 2px;
      border-radius: 7px;
      color: white;
      background-color: #C80036;
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

    .color-pending {
      color: #ffe505;
    }
    .color-pending-approval {
      color: #ffe505;
    }
    .color-not-started {
      color: #888888;
    }
    .color-not-complied {
      color: #C80036;
    }
    .color-partially-complied {
      color: #F79256;
    }
    .color-complied {
      color: #50cf01;
    }
    .color-scheduled {
      color: #888888;
    }
    .color-done {
      color: #50cf01;
    }
    .color-rejected {
      color: #C80036;
    }
    .color-approved {
      color: #50cf01;
    }
    .color-past-due-date {
      color: #ffe505;
    }
    .color-late-executed {
      color: #840B0F;
    }
    .color-late-approved {
      color: #EE2F36;
    }
    .color-late-reported {
      color: #Ef9C66;
    }

    .pr-10 {
      padding-right: 10px;
    }

    .pt-10 {
      padding-top: 10px;
    }

    .pt-20 {
      padding-top: 20px;
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
      z-index: 100;
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
      right: 30px;
      top: 30px;
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

    .w-90 {
      width: 90%;
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
      margin-top: 40px;
      font-size: 90%;
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
      z-index: 102;
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

  @query('#find-container')
  _SfFindContainer: any;

  @query('#register-container')
  _SfRegisterContainer: any;

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

  @query('#onboarding-status-container')
  _SfOnboardingStatusContainer: any;

  @query('#rcm-container')
  _SfRcmContainer: any;

  @query('#rcm-container-list')
  _SfRcmContainerList: any;

  @query('#rcm-tab-container')
  _SfRcmTabContainer: any;

  @query('#statutes-list-container')
  _SfOnboardingStatutesListContainer: any;

  @query('#rcm-compliance-container')
  _SfRcmComplianceContainer: any;
  
  @query('#rcm-projects-container')
  _SfRcmProjectsContainer: any;
  
  @query('#rcm-date-container')
  _SfRcmDateContainer: any;
  
  @query('#rcm-confirm-container')
  _SfRcmConfirmContainer: any;
  
  @query('#rcm-jobs-container')
  _SfRcmJobsContainer: any;

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

  @query('#extensions-container')
  _SfOnboardingExtensionsContainer: any;

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

  @query('#extensions-list-container')
  _SfOnboardingExtensionsListContainer: any;

  @query('#duedates-container')
  _SfOnboardingDuedatesContainer: any;

  @query('#alertschedules-list-container')
  _SfOnboardingAlertSchedulesListContainer: any;

  @query('#alertschedules-container')
  _SfOnboardingAlertSchedulesContainer: any;

  @query('#activations-list-container')
  _SfOnboardingActivationListContainer: any;

  @query('#activations-container')
  _SfOnboardingActivationsContainer: any;

  @query('#invalidations-list-container')
  _SfOnboardingInvalidationListContainer: any;

  @query('#invalidations-container')
  _SfOnboardingInvalidationsContainer: any;

  @query('#triggers-container')
  _SfOnboardingTriggersContainer: any;

  @query('#triggers-list-container')
  _SfOnboardingTriggersListContainer: any;

  @query('#internalcontrols-list-container')
  _SfOnboardingInternalControlsListContainer: any;

  @query('#internalcontrols-container')
  _SfOnboardingInternalControlsContainer: any;

  @query('#signoff-container')
  _SfOnboardingSignoffContainer: any;

  @query('#calendar-list-container')
  _SfOnboardingCalendarListContainer: any;

  @query('#calendar-container')
  _SfOnboardingCalendarContainer: any;

  @query('#onboarding-tab-group-0')
  _SfOnboardingTabGroup0: any;

  @query('#onboarding-tab-group-1')
  _SfOnboardingTabGroup1: any;

  @query('#onboarding-tab-group-2')
  _SfOnboardingTabGroup2: any;

  @query('#onboarding-tab-group-3')
  _SfOnboardingTabGroup3: any;

  @query('#onboarding-tab-group-button-0')
  _SfOnboardingTabGroupButton0: any;

  @query('#onboarding-tab-group-button-1')
  _SfOnboardingTabGroupButton1: any;

  @query('#onboarding-tab-group-button-2')
  _SfOnboardingTabGroupButton2: any;

  @query('#onboarding-tab-group-button-3')
  _SfOnboardingTabGroupButton3: any;

  @queryAssignedElements({slot: 'project'})
  _SfProject: any;

  @queryAssignedElements({slot: 'uploader'})
  _SfUploader: any;

  isSelectedLegend = (value: number) : any => {
    return this.chartSelectedLegend.includes(value);
  }
  removeFromSelectedLegend = (value: number) => {
    const index = this.chartSelectedLegend.indexOf(value);
    if (index > -1) { // only splice array when item is found
      this.chartSelectedLegend.splice(index, 1); // 2nd parameter means remove one item only
    }
  }

  clearSelectedLegend = () => {
    this.chartSelectedLegend = [];
    if(this.chart != null) {
      this.chart.data.datasets[0].data.forEach((_d: any, i: any) => {
        //console.log(d);
        this.chart.getDatasetMeta(0).data[i].hidden = false;
        this.chart.update();
      })
    }
    if(this.chart2 != null && this.chart3 != null && this.chart4 != null) {
      if(this.barCharDataSet2Arr.length > 0 && this.barCharDataSet3Arr.length > 0 && this.barCharDataSet4Arr.length > 0) {
        do {
          this.chart2.data.datasets = this.barCharDataSet2Arr.pop();
          this.chart3.data.datasets = this.barCharDataSet3Arr.pop();
          this.chart4.data.datasets = this.barCharDataSet4Arr.pop();
        } while(this.barCharDataSet2Arr.length > 0)
        
      } else {
        if(this.barCharDataSet2.length > 0 && this.barCharDataSet3.length > 0 && this.barCharDataSet4.length > 0) {
          this.barCharDataSet2.pop();
          this.barCharDataSet3.pop();
          this.barCharDataSet4.pop();
        }
      }
    }
    this.selectedFilter = null;
  }

  clearSelectedGraphParam = () => {

    //console.log('clickonbar clearing graph param', this.chart, this.chart2, this.chart3);

    this.graphParam = "";
    if(this.chart != null) {
      this.chart.update();
    }

    if(this.chart2 != null && this.chart3 != null && this.chart4 != null) {
      if(this.barCharDataSet2.length > 0 && this.barCharDataSet3.length > 0 && this.barCharDataSet4.length > 0) {
        this.chart2.data.datasets = this.barCharDataSet2.pop();
        this.chart3.data.datasets = this.barCharDataSet3.pop();
        this.chart4.data.datasets = this.barCharDataSet4.pop();
      }
    } else {
      if(this.barCharDataSet2.length > 0 && this.barCharDataSet3.length > 0 && this.barCharDataSet4.length > 0) {
        this.barCharDataSet2.pop();
        this.barCharDataSet3.pop();
        this.barCharDataSet4.pop();
      }
    }

    this.processGraphFilter("");
    this.selectedFilter = null;
  }

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

      //console.log('parentfield', parentField);

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

      //console.log('<sf-i-sub-select apiId="'+this.getEventField(field).apiId+'" name="Select" label="Select" mode="text" selectedId="'+selectedIds+'" filterId="'+filterId+'"></sf-i-sub-select>');

      return '<sf-i-sub-select apiId="'+this.getEventField(field).apiId+'" name="Select" label="Select" mode="text" selectedId="'+selectedIds+'" filterId="'+filterId+'"></sf-i-sub-select>'

    }

    if(this.getEventField(field) != null && this.getEventField(field).type == "sf-i-form") {

      //console.log('<sf-i-form name="Select" apiId="'+this.getEventField(field).apiId+'" selectedId="'+selectedId[0]+'" projectField="'+this.getEventField(field).projectField+'" mode="text"></sf-i-form>');

      return '<sf-i-form name="Select" apiId="'+this.getEventField(field).apiId+'" selectedId="'+selectedId[0]+'" projectField="'+this.getEventField(field).projectField+'" mode="text"></sf-i-form>'
    }

    

    return "";
  }

  clearTabs = () => {
    (this._SfCalendarContainer as HTMLDivElement).style.display = 'none';
    (this._SfStreamContainer as HTMLDivElement).style.display = 'none';
    (this._SfUpcomingContainer as HTMLDivElement).style.display = 'none';
    (this._SfThisContainer as HTMLDivElement).style.display = 'none';
    (this._SfPastContainer as HTMLDivElement).style.display = 'none';
    (this._SfCustomContainer as HTMLDivElement).style.display = 'none';
    (this._SfAdhocContainer as HTMLDivElement).style.display = 'none';
    (this._SfFindContainer as HTMLDivElement).style.display = 'none';
    (this._SfRegisterContainer as HTMLDivElement).style.display = 'none';
  }

  enableCalendar = () => {
    this.clearTabs();
    (this._SfCalendarContainer as HTMLDivElement).style.display = 'flex';
  }

  enableStream = () => {
    this.clearTabs();
      (this._SfStreamContainer as HTMLDivElement).style.display = 'flex';
  }

  enableUpcoming() {
    this.clearTabs();
    (this._SfUpcomingContainer as HTMLDivElement).style.display = 'flex';
  }

  enableThis() {
    this.clearTabs();
    (this._SfThisContainer as HTMLDivElement).style.display = 'flex';
  }

  enablePast() {
    this.clearTabs();
    (this._SfPastContainer as HTMLDivElement).style.display = 'flex';
  }

  enableCustom() {
    this.clearTabs();
    (this._SfCustomContainer as HTMLDivElement).style.display = 'flex';
  }

  enableFind() {
    this.clearTabs();
    (this._SfFindContainer as HTMLDivElement).style.display = 'flex';
  }

  enableAdhoc() {
    this.clearTabs();
    (this._SfAdhocContainer as HTMLDivElement).style.display = 'flex';
  }

  enableRegisters() {
    this.clearTabs();
    (this._SfRegisterContainer as HTMLDivElement).style.display = 'flex';
  }

  prepareXhrPresigned = async (data: any, url: string, loaderElement: any, loaderText: string = '') => {

    
    if(loaderElement != null) {
      loaderElement.innerHTML = '<div class="lds-dual-ring"></div>';
      loaderElement.innerHTML += ('<div class="lds-text"><div class="lds-text-c">'+loaderText+'</div></div>');
    }
    return await Util.callApiPresigned(url, data);

  }

  prepareXhrPresignedGet = async (url: string, loaderElement: any, loaderText: string = '') => {

    
    if(loaderElement != null) {
      loaderElement.innerHTML = '<div class="lds-dual-ring"></div>';
      loaderElement.innerHTML += ('<div class="lds-text"><div class="lds-text-c">'+loaderText+'</div></div>');
    }
    return await Util.callApiPresignedGet(url);

  }
 
  prepareXhrPresignedDelete = async (url: string, loaderElement: any, loaderText: string = '') => {

    
    if(loaderElement != null) {
      loaderElement.innerHTML = '<div class="lds-dual-ring"></div>';
      loaderElement.innerHTML += ('<div class="lds-text"><div class="lds-text-c">'+loaderText+'</div></div>');
    }
    return await Util.callApiPresignedDelete(url);

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

    // const currMonth = new Date().getMonth();
    // const currDate = new Date().getDate();

    //console.log('currmonth', currMonth, 'currdate', currDate);

    var approved = 0;
    var pendingApproval = 0;
    var rejected = 0;
    var notStarted = 0;
    var total = 0;

    for(var i = 0; i < this.getLastDayOfMonth(month, year); i++) {

      const mmdd = ("0" + (month+1)).slice(-2) + "/" + ("0" + (i+1)).slice(-2);

      if(month === 1 && i === (this.getLastDayOfMonth(month, year) - 1) ) {
        //console.log('getLastDayOfMonth', month, this.getLastDayOfMonth(month, year), mmdd);
      }

      if(this.events[mmdd] != null) {

          for(var j = 0; j < this.events[mmdd].length; j++) {

            total++;

            const partStatus = this.getCompletenessStatus(this.events[mmdd][j]);

            if(partStatus == "approved") {
              approved++
            }
            if(partStatus == "not-started") {
              notStarted++
            }
            if(partStatus == "pending-approval") {
              pendingApproval++
            }
            if(partStatus == "rejected") {
              rejected++
            }

          }

      } 
    }

    //console.log('month-status', approved, pendingApproval, rejected, notStarted, total);

    var percApproved = (approved * 100)/total;
    var percPendingApproval = (pendingApproval * 100)/total;
    var percRejected = (rejected * 100)/total;
    var percNotStarted = (notStarted * 100)/total;

    return {percNotStarted: percNotStarted, percPendingApproval: percPendingApproval, percApproved: percApproved, percRejected: percRejected};

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

    //console.log('currmonth', currMonth, 'currdate', currDate);

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
          var pendingApproval = 0;
          var rejected = 0;
          var notStarted = 0;
          var total = 0;

          for(var j = 0; j < this.events[mmdd].length; j++) {
            total++;

            const partStatus = this.getCompletenessStatus(this.events[mmdd][j]);

            if(partStatus == "approved") {
              approved++;
            }

            if(partStatus == "pending-approval") {
              pendingApproval++;
            }

            if(partStatus == "rejected") {
              rejected++;
            }

            if(partStatus == "not-started") {
              notStarted++;
            }

          }

          var percApproved = (approved * 100)/total;
          var percPendingApproval = (pendingApproval * 100)/total;
          var percNotStarted = (notStarted * 100)/total;
          var percRejected = (rejected * 100)/total;

          //console.log('percentages', mmdd, percApproved, percPendingApproval, percRejected, percNotStarted)

          html += '<div class="d-flex justify-center">'
            //html += '<div part="event-date-indicator-primary" class="dot"></div>'
            html += '<div class="dot" style="width: '+(percApproved/2)+'%; background-color: '+this.COLOR_APPROVED+'"></div>'
            html += '<div class="dot" style="width: '+(percPendingApproval/2)+'%; background-color: '+this.COLOR_PENDING_APPROVAL+'"></div>'
            html += '<div class="dot" style="width: '+(percRejected/2)+'%; background-color: '+this.COLOR_REJECTED+'"></div>'
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

  getYearFromMonthAndCalendarStart = (mm: string) => {

    var yyyy = "";

    var currMonth = new Date().getMonth() + 1;

    if(parseInt(mm) < parseInt(this.calendarStartMM) && currMonth < parseInt(this.calendarStartMM)) {
      //console.log('getpastduedate returning', 0);
      yyyy = parseInt(this.calendarStartYYYY) + "";
    } else if(parseInt(mm) >= parseInt(this.calendarStartMM) && currMonth < parseInt(this.calendarStartMM)) {
      //console.log('getpastduedate returning', 1);
      yyyy = (parseInt(this.calendarStartYYYY) - 1) + "";
    } else if(parseInt(mm) < parseInt(this.calendarStartMM) && currMonth >= parseInt(this.calendarStartMM)) {
      //console.log('getpastduedate returning', 2);
      yyyy = (parseInt(this.calendarStartYYYY) + 1) + "";
    } else if(parseInt(mm) >= parseInt(this.calendarStartMM) && currMonth >= parseInt(this.calendarStartMM)) {
      //console.log('getpastduedate returning', 3);
      yyyy = (parseInt(this.calendarStartYYYY)) + "";
    }

    return yyyy;

  }

  getPastDueDate = (mmdd: string) => {

    const dd = mmdd.substring(3, 5);
    const mm = mmdd.substring(0, 2);

    //console.log('getpastduedate', mmdd, dd, mm);

    // var yyyy = "";

    // if(parseInt(mm) < parseInt(this.calendarStartMM) && currMonth < parseInt(this.calendarStartMM)) {
    //   //console.log('getpastduedate returning', 0);
    //   yyyy = parseInt(this.calendarStartYYYY) + "";
    // } else if(parseInt(mm) >= parseInt(this.calendarStartMM) && currMonth < parseInt(this.calendarStartMM)) {
    //   //console.log('getpastduedate returning', 1);
    //   yyyy = (parseInt(this.calendarStartYYYY) - 1) + "";
    // } else if(parseInt(mm) < parseInt(this.calendarStartMM) && currMonth >= parseInt(this.calendarStartMM)) {
    //   //console.log('getpastduedate returning', 2);
    //   yyyy = (parseInt(this.calendarStartYYYY) + 1) + "";
    // } else if(parseInt(mm) >= parseInt(this.calendarStartMM) && currMonth >= parseInt(this.calendarStartMM)) {
    //   //console.log('getpastduedate returning', 3);
    //   yyyy = (parseInt(this.calendarStartYYYY)) + "";
    // }

    var yyyy = this.getYearFromMonthAndCalendarStart(mm);

    var date = new Date();
    date.setMonth(parseInt(mm) - 1);
    date.setDate(parseInt(dd));
    date.setFullYear(parseInt(yyyy));

    var currDate = new Date();

    if(currDate.getTime() > date.getTime()) {

      //console.log('getpastduedate returning true', yyyy);
      return true;
    }

    return false;

  }

  getLateExecuted = (mmdd: string, event: any) => {

    //console.log('late executed', mmdd, event.dateofcompletion)

    const tsDoc = new Date(parseInt(event.dateofcompletion)).getTime();

    const dd = mmdd.substring(3, 5);
    const mm = mmdd.substring(0, 2);

    // var yyyy = "";

    // var currMonth = new Date().getMonth() + 1;

    // // if(parseInt(mm) < parseInt(this.calendarStartMM) && currMonth < parseInt(this.calendarStartMM)) {
    // //   yyyy = new Date().getFullYear() + "";
    // // } else if(parseInt(mm) >= parseInt(this.calendarStartMM) && currMonth <= parseInt(this.calendarStartMM)) {
    // //   yyyy = (new Date().getFullYear() - 1) + "";
    // // } else if(parseInt(mm) < parseInt(this.calendarStartMM) && currMonth >= parseInt(this.calendarStartMM)) {
    // //   yyyy = (new Date().getFullYear() + 1) + "";
    // // } else if(parseInt(mm) >= parseInt(this.calendarStartMM) && currMonth >= parseInt(this.calendarStartMM)) {
    // //   yyyy = (new Date().getFullYear() + 1) + "";
    // // }

    // if(parseInt(mm) < parseInt(this.calendarStartMM) && currMonth < parseInt(this.calendarStartMM)) {
    //   yyyy = parseInt(this.calendarStartYYYY) + "";
    // } else if(parseInt(mm) >= parseInt(this.calendarStartMM) && currMonth <= parseInt(this.calendarStartMM)) {
    //   yyyy = (parseInt(this.calendarStartYYYY) - 1) + "";
    // } else if(parseInt(mm) < parseInt(this.calendarStartMM) && currMonth >= parseInt(this.calendarStartMM)) {
    //   yyyy = (parseInt(this.calendarStartYYYY) + 1) + "";
    // } else if(parseInt(mm) >= parseInt(this.calendarStartMM) && currMonth >= parseInt(this.calendarStartMM)) {
    //   yyyy = (parseInt(this.calendarStartYYYY) + 1) + "";
    // }

    var yyyy = this.getYearFromMonthAndCalendarStart(mm);

    var date = new Date();
    date.setMonth(parseInt(mm) - 1);
    date.setDate(parseInt(dd));
    date.setFullYear(parseInt(yyyy));

    const tsCurr = date.getTime();

    //console.log('late executed', mmdd, tsDoc, tsCurr)

    if(tsDoc > tsCurr) {
      //console.log('late executed', true)
      return true;
    }

    return false;

  }

  getLateReported = (mmdd: string, event: any) => {

    const dd = mmdd.substring(3, 5);
    const mm = mmdd.substring(0, 2);

    var yyyy = this.getYearFromMonthAndCalendarStart(mm);

    var date = new Date();
    date.setMonth(parseInt(mm) - 1);
    date.setDate(parseInt(dd));
    date.setFullYear(parseInt(yyyy));

    const tsCurr = date.getTime();

    for(var i = event.comments.length - 1; i >= 0; i--) {
      const comment = event.comments[i];
      const tsComment = new Date(comment.timestamp);
      const authorComment = comment.author;
      if(authorComment == "Reporter" && tsComment.getTime() > tsCurr) {
        return true;
      }
    }

    return false;

  }

  getLateApproved = (mmdd: string, event: any) => {

    const dd = mmdd.substring(3, 5);
    const mm = mmdd.substring(0, 2);

    var yyyy = this.getYearFromMonthAndCalendarStart(mm);

    var date = new Date();
    date.setMonth(parseInt(mm) - 1);
    date.setDate(parseInt(dd));
    date.setFullYear(parseInt(yyyy));

    const tsCurr = date.getTime();

    for(var i = event.comments.length - 1; i >= 0; i--) {
      const comment = event.comments[i];
      const tsComment = new Date(comment.timestamp);
      const authorComment = comment.author;
      if(authorComment == "Approver" && tsComment.getTime() > tsCurr) {
        return true;
      }
    }

    return false;

    // //console.log('get late approved', event.obligationtitle, event.lastupdated, mmdd, event.lastupdated);

    // const tsLastUpdated = new Date((event.lastupdated)).getTime();

    // //console.log('get late approved', tsLastUpdated);

    // const dd = mmdd.substring(3, 5);
    // const mm = mmdd.substring(0, 2);

    // var yyyy = this.getYearFromMonthAndCalendarStart(mm);

    // var date = new Date();
    // date.setMonth(parseInt(mm) - 1);
    // date.setDate(parseInt(dd));
    // date.setFullYear(parseInt(yyyy));

    // const tsCurr = date.getTime();

    // //console.log('get late approved', tsCurr);

    // if(tsLastUpdated > tsCurr) {
    //   //console.log('late approved', true)
    //   return true;
    // }

    // return false;

  }

  updateGraphStats = (arr: Array<string>, arrData: any, arrPartData: any, arrLateData: any, arrComplianceData: any, partStatus: string, lateStatus: string, complianceStatus: string ) => {

    for(var i = 0; i < arr.length; i++) {
      if(arrData == null) {
        arrData = {};
      }
      const name = arr[i].split(';')[0].trim().replace(/ *\([^)]*\) */g, "")
      if(arrData[name] == null) {
        arrData[name] = 1;
      } else {
        arrData[name]++;
      }
      if(name.toLowerCase().indexOf('na - corp sec') >= 0) {
        console.log('arrData[corpsec]', name, arrData[name]);
      }
    }

    for(var i = 0; i < arr.length; i++) {

      if(arrLateData == null) {
        arrLateData = {};
      }

      if(arrPartData == null) {
        arrPartData = {};
      }

      if(arrComplianceData == null) {
        arrComplianceData = {};
      }

      const name = arr[i].split(';')[0].trim().replace(/ *\([^)]*\) */g, "")

      if(arrLateData[name] == null) {
        arrLateData[name] = {};
      }

      if(arrPartData[name] == null) {
        arrPartData[name] = {};
      }

      if(arrComplianceData[name] == null) {
        arrComplianceData[name] = {};
      }

      if(arrPartData[name]["not-started"] == null) {
        arrPartData[name]["not-started"] = 0;
      }
      if(arrPartData[name]["pending-approval"] == null) {
        arrPartData[name]["pending-approval"] = 0;
      }
      if(arrPartData[name]["rejected"] == null) {
        arrPartData[name]["rejected"] = 0;
      }
      if(arrPartData[name]["approved"] == null) {
        arrPartData[name]["approved"] = 0;
      }

      arrPartData[name][partStatus]++;

      if(arrLateData[name]["late-executed"] == null) {
        arrLateData[name]["late-executed"] = 0;
      }
      if(arrLateData[name]["late-reported"] == null) {
        arrLateData[name]["late-reported"] = 0;
      }
      if(arrLateData[name]["late-approved"] == null) {
        arrLateData[name]["late-approved"] = 0;
      }
      if(arrLateData[name]["past-due-date"] == null) {
        arrLateData[name]["past-due-date"] = 0;
      }
      if(arrLateData[name]["in-time"] == null) {
        arrLateData[name]["in-time"] = 0;
      }

      arrLateData[name][lateStatus]++;

      if(arrComplianceData[name]["scheduled"] == null) {
        arrComplianceData[name]["scheduled"] = 0;
      }
      if(arrComplianceData[name]["not-complied"] == null) {
        arrComplianceData[name]["not-complied"] = 0;
      }
      if(arrComplianceData[name]["partially-complied"] == null) {
        arrComplianceData[name]["partially-complied"] = 0;
      }
      if(arrComplianceData[name]["complied"] == null) {
        arrComplianceData[name]["complied"] = 0;
      }

      arrComplianceData[name][complianceStatus]++;

    }

    return {arrData: arrData, arrPartData: arrPartData, arrLateData: arrLateData, arrComplianceData: arrComplianceData}
  }

  updateJurisdictionStats = (jurisdictions: Array<string>, partStatus: string, lateStatus: string, complianceStatus: string) => {

    const result = this.updateGraphStats(jurisdictions, this.jurisdictionData, this.jurisdictionPartStatusData, this.jurisdictionLateStatusData, this.jurisdictionComplianceStatusData, partStatus, lateStatus, complianceStatus);
    this.jurisdictionData = result.arrData;
    this.jurisdictionLateStatusData = result.arrLateData;
    this.jurisdictionPartStatusData = result.arrPartData;
    this.jurisdictionComplianceStatusData = result.arrComplianceData;

  }

  updateSubcategoryStats = (subcategories: Array<string>, partStatus: string, lateStatus: string, complianceStatus: string) => {

    const result = this.updateGraphStats(subcategories, this.subcategoryData, this.subcategoryPartStatusData, this.subcategoryLateStatusData, this.subcategoryComplianceStatusData, partStatus, lateStatus, complianceStatus);
    this.subcategoryData = result.arrData;
    this.subcategoryLateStatusData = result.arrLateData;
    this.subcategoryPartStatusData = result.arrPartData;
    this.subcategoryComplianceStatusData = result.arrComplianceData;

  }

  updateFrequencyStats = (frequencies: Array<string>, partStatus: string, lateStatus: string, complianceStatus: string) => {

    const result = this.updateGraphStats(frequencies, this.frequencyData, this.frequencyPartStatusData, this.frequencyLateStatusData, this.frequencyComplianceStatusData, partStatus, lateStatus, complianceStatus);
    this.frequencyData = result.arrData;
    this.frequencyLateStatusData = result.arrLateData;
    this.frequencyPartStatusData = result.arrPartData;
    this.frequencyComplianceStatusData = result.arrComplianceData;

  }

  updateLocationStats = (location: string, partStatus: string, lateStatus: string, complianceStatus: string) => {

    //console.log('location', location);

    if(this.locationData == null) {
      this.locationData = {};
    }

    const locationName = location.replace(/ *\([^)]*\) */g, "")

    if(this.locationData[locationName] == null) {
      this.locationData[locationName] = 1;
    } else {
      this.locationData[locationName]++;
    }

    if(this.locationLateStatusData == null) {
      this.locationLateStatusData = {};
    }

    if(this.locationPartStatusData == null) {
      this.locationPartStatusData = {};
    }

    if(this.locationComplianceStatusData == null) {
      this.locationComplianceStatusData = {};
    }

    if(this.locationLateStatusData[locationName] == null) {
      this.locationLateStatusData[locationName] = {};
    }

    if(this.locationPartStatusData[locationName] == null) {
      this.locationPartStatusData[locationName] = {};
    }

    if(this.locationComplianceStatusData[locationName] == null) {
      this.locationComplianceStatusData[locationName] = {};
    }

    if(this.locationPartStatusData[locationName]["not-started"] == null) {
      this.locationPartStatusData[locationName]["not-started"] = 0;
    }
    if(this.locationPartStatusData[locationName]["pending-approval"] == null) {
      this.locationPartStatusData[locationName]["pending-approval"] = 0;
    }
    if(this.locationPartStatusData[locationName]["rejected"] == null) {
      this.locationPartStatusData[locationName]["rejected"] = 0;
    }
    if(this.locationPartStatusData[locationName]["approved"] == null) {
      this.locationPartStatusData[locationName]["approved"] = 0;
    }

    this.locationPartStatusData[locationName][partStatus]++;

    if(this.locationLateStatusData[locationName]["late-reported"] == null) {
      this.locationLateStatusData[locationName]["late-reported"] = 0;
    }
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

    if(this.locationComplianceStatusData[locationName]["not-complied"] == null) {
      this.locationComplianceStatusData[locationName]["not-complied"] = 0;
    }
    if(this.locationComplianceStatusData[locationName]["complied"] == null) {
      this.locationComplianceStatusData[locationName]["complied"] = 0;
    }
    if(this.locationComplianceStatusData[locationName]["partially-complied"] == null) {
      this.locationComplianceStatusData[locationName]["partially-complied"] = 0;
    }
    if(this.locationComplianceStatusData[locationName]["scheduled"] == null) {
      this.locationComplianceStatusData[locationName]["scheduled"] = 0;
    }

    this.locationComplianceStatusData[locationName][complianceStatus]++;

  }

  updateFunctionStats = (functions: Array<string>, partStatus: string, lateStatus: string, complianceStatus: string) => {

    const result = this.updateGraphStats(functions, this.functionData, this.functionPartStatusData, this.functionLateStatusData, this.functionComplianceStatusData, partStatus, lateStatus, complianceStatus);
    this.functionData = result.arrData;
    this.functionLateStatusData = result.arrLateData;
    this.functionPartStatusData = result.arrPartData;
    this.functionComplianceStatusData = result.arrComplianceData;

  }

  updateRiskAreaStats = (riskAreas: Array<string>, partStatus: string, lateStatus: string, complianceStatus: string) => {


    const result = this.updateGraphStats(riskAreas, this.riskAreasData, this.riskAreasPartStatusData, this.riskAreasLateStatusData, this.riskAreasComplianceStatusData, partStatus, lateStatus, complianceStatus);
    this.riskAreasData = result.arrData;
    this.riskAreasLateStatusData = result.arrLateData;
    this.riskAreasPartStatusData = result.arrPartData;
    this.riskAreasComplianceStatusData = result.arrComplianceData;

  }

  updateRiskSeverityStats = (riskSeverities: Array<string>, partStatus: string, lateStatus: string, complianceStatus: string) => {

    //console.log('updateRiskSeverityStats', riskSeverities, complianceStatus)

    const result = this.updateGraphStats(riskSeverities, this.riskSeverityData, this.riskSeverityPartStatusData, this.riskSeverityLateStatusData, this.riskSeverityComplianceStatusData, partStatus, lateStatus, complianceStatus);
    this.riskSeverityData = result.arrData;
    this.riskSeverityLateStatusData = result.arrLateData;
    this.riskSeverityPartStatusData = result.arrPartData;
    this.riskSeverityComplianceStatusData = result.arrComplianceData;

    //console.log('updateRiskSeverityStats', JSON.stringify(result.arrComplianceData))

  }

  updateObligationTypeStats = (obligationTypes: Array<string>, partStatus: string, lateStatus: string, complianceStatus: string) => {

    const result = this.updateGraphStats(obligationTypes, this.obligationTypeData, this.obligationTypePartStatusData, this.obligationTypeLateStatusData, this.obligationTypeComplianceStatusData, partStatus, lateStatus, complianceStatus);
    this.obligationTypeData = result.arrData;
    this.obligationTypeLateStatusData = result.arrLateData;
    this.obligationTypePartStatusData = result.arrPartData;
    this.obligationTypeComplianceStatusData = result.arrComplianceData;

    //console.log('Updating obligationtype stats', this.obligationTypeLateStatusData);
  }

  getReporterStringFromEvent = (event: any) => {
    let reporterStr = '';
    for(var k = 0; k < event.reporters.length; k++) {
      reporterStr += '<div part="badge-reporter-name" class="graphparamname graphparamname2 mb-20 ml-10">' + (event.reporters[k].split(';')[0]) + '</div>';
    }
    return reporterStr;
  }

  getReporterDetailStringFromEvent = (event: any) => {
    let reporterStr = '';
    for(var k = 0; k < event.reporters.length; k++) {
      reporterStr += '<div part="detail-reporter-name" class="graphparamname mb-20 mr-10">' + (event.reporters[k].split(';')[0]) + '</div>';
    }
    return reporterStr;
  }

  getApproverStringFromEvent = (event: any) => {
    let approverStr = '';
    for(var k = 0; k < event.approvers.length; k++) {
      approverStr += '<div part="badge-approver-name" class="graphparamname graphparamname3 mb-20 ml-10">' + (event.approvers[k].split(';')[0]) + '</div>';
    }
    return approverStr;
  }

  getApproverDetailStringFromEvent = (event: any) => {
    let approverStr = '';
    for(var k = 0; k < event.approvers.length; k++) {
      approverStr += '<div part="detail-approver-name" class="graphparamname mb-20 mr-10">' + (event.approvers[k].split(';')[0]) + '</div>';
    }
    return approverStr;
  }

  renderLatestCompliance = (mmddyyyy: string, event: any) => {

    var lastMax = 0;
    for(var k = 0; k < event.compliances.length; k++) {

      const tsOfEvent = new Date(mmddyyyy).getTime();
      const tsOfCompliance = parseInt(event.compliances[k].complianceid.S);
      if(tsOfCompliance > lastMax && tsOfCompliance <= tsOfEvent) {

        event['specificity'] = JSON.parse(event.compliances[k].data.S)['specificity'];
        event['reference'] = JSON.parse(event.compliances[k].data.S)['reference'];
        event['obligation'] = JSON.parse(event.compliances[k].data.S)['obligation'];
        event['penalty'] = JSON.parse(event.compliances[k].data.S)['penalty'];
        event['authority'] = JSON.parse(event.compliances[k].data.S)['authority'];
        event['frequency'] = JSON.parse(event.compliances[k].data.S)['frequency'];
        event['obligationtype'] = JSON.parse(event.compliances[k].data.S)['obligationtype'];
        event['duedate'] = JSON.parse(event.compliances[k].data.S)['duedate'];
        event['applicability'] = JSON.parse(event.compliances[k].data.S)['applicability'];
        event['form'] = JSON.parse(event.compliances[k].data.S)['form'];
        event['internalcontrols'] = JSON.parse(event.compliances[k].data.S)['internalcontrols'];
        event['firstlineofdefence'] = JSON.parse(event.compliances[k].data.S)['firstlineofdefence'];
        event['risk'] = JSON.parse(event.compliances[k].data.S)['risk'];
        event['riskarea'] = JSON.parse(event.compliances[k].data.S)['riskarea'];

      }

    }
    return event;
  }

  getCompletenessStatus = (event: any) => {

    //console.log(event);

    if(event.comments == null || event.comments.length === 0) {
      return "not-started";
    } else {
      if(event.approved != null && event.approved) {
        return "approved";
      } else {

        if(event.comments[event.comments.length - 1].author == "Reporter") {
          return "pending-approval";
        } else {
          return "rejected";
        }

      }
    }

  }

  getTimelinessStatus = (mmdd: string, event: any, completeness: string) => {

    if(completeness == "not-started") {

      if(this.getPastDueDate(mmdd)) {
        return "past-due-date";
      } else {
        return "in-time"
      }

    } else if(completeness == "pending-approval" || completeness == "rejected") {

      if(this.getLateExecuted(mmdd, event)) {
        return "late-executed";
      } else if(this.getLateReported(mmdd, event)) {
        return "late-reported";
      } else if(this.getPastDueDate(mmdd)) {
        return "past-due-date";
      } else {
        return "in-time";
      }

    } else {

      if(this.getLateExecuted(mmdd, event)) {
        return "late-executed";
      } else if(this.getLateReported(mmdd, event)) {
        return "late-reported";
      } else if(this.getLateApproved(mmdd, event)) {
        return "late-approved";
      } else {
        return "in-time";
      }

    }

  }

  getComplianceStatus = (completeness: string, timeliness: string) => {

    if(completeness == "not-started") {

      if(timeliness == "in-time") {
        return "scheduled";
      } else {
        return "not-complied";
      }

    } else if(completeness == "pending-approval") {

      if(timeliness == "in-time") {
        return "scheduled";
      } else if(timeliness == "past-due-date" || timeliness == "late-executed") {
        return "not-complied";
      } else {
        return "partially-complied";
      }

    } else if(completeness == "rejected") {

      if(timeliness == "in-time") {
        return "scheduled";
      } else {
        return "not-complied";
      }

    } else {

      if(timeliness == "in-time" || timeliness == "late-reported" || timeliness == "late-approved") {
        return "complied";
      } else {
        return "not-complied";
      }

    }

  }

  numcalled: number = 0;

  updateStats = (event: any, partStatus: string, lateStatus: string, complianceStatus: string) => {

    this.updateRiskAreaStats(event['riskarea'], partStatus, lateStatus, complianceStatus);
    this.updateRiskSeverityStats(event['risk'], partStatus, lateStatus, complianceStatus);
    this.updateFunctionStats(event['functions'], partStatus, lateStatus, complianceStatus)
    this.updateObligationTypeStats(event['obligationtype'], partStatus, lateStatus, complianceStatus)
    this.updateJurisdictionStats(event['jurisdiction'], partStatus, lateStatus, complianceStatus)
    this.updateFrequencyStats(event['frequency'], partStatus, lateStatus, complianceStatus)
    //console.log('updateLocationStats', event['locationname'], event.duedate, event.id);
    this.updateLocationStats(event['locationname'], partStatus, lateStatus, complianceStatus)
    this.updateSubcategoryStats(event['subcategory'], partStatus, lateStatus, complianceStatus)

  }

  renderCalendarGraphs = (showGraph: boolean) => {

    //console.log('flowGraph', this.flowGraph);

    var html = '';

    html += '<div class="mb-20 stream-event-list" part="stream-event-list-charts">';
      if(showGraph) {
        html += '<div part="stream-event-chart-selection" class="mb-20">';
          html += '<div part="td-head" class="mb-5">Select Chart</div>';
          html += '<div class="mb-10 d-flex flex-wrap align-center">';
            html += '<div part="chart-radio-item"><input type="radio" id="radio-compliance" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_COMPLIANCE) ? 'checked' : '') +'>';
            html += '<label for="radio-compliance" part="input-label" class="mr-10">Compliance</label></div>';
            html += '<div part="chart-radio-item"><input type="radio" id="radio-completeness" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_COMPLETENESS) ? 'checked' : '') +'>';
            html += '<label for="radio-completeness" part="input-label" class="mr-10">Completeness</label></div>';
            html += '<div part="chart-radio-item"><input type="radio" id="radio-timeliness" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_TIMELINESS) ? 'checked' : '') +'>';
            html += '<label for="radio-timeliness" part="input-label" class="mr-10">Timeliness</label></div>';            

            html += '<div part="chart-radio-item" class="chart-radio-item-secondary '+(this.flowGraph == this.FLOW_GRAPH_RISKAREAS ? '' : 'hide')+'"><input type="radio" id="radio-risk" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_RISKAREAS) ? 'checked' : '') +'>';
            html += '<label for="radio-risk" part="input-label" class="mr-10">Risk Areas</label></div>';
            html += '<div part="chart-radio-item" class="chart-radio-item-secondary '+(this.flowGraph == this.FLOW_GRAPH_RISKSEVERITY ? '' : 'hide')+'"><input type="radio" id="radio-riskseverity" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_RISKSEVERITY) ? 'checked' : '') +'>';
            html += '<label for="radio-riskseverity" part="input-label" class="mr-10">Risk Severity</label></div>';
            html += '<div part="chart-radio-item" class="chart-radio-item-secondary '+(this.flowGraph == this.FLOW_GRAPH_LOCATION ? '' : 'hide')+'"><input type="radio" id="radio-location" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_LOCATION) ? 'checked' : '') +'>';
            html += '<label for="radio-location" part="input-label" class="mr-10">Location</label></div>';
            html += '<div part="chart-radio-item" class="chart-radio-item-secondary '+(this.flowGraph == this.FLOW_GRAPH_FUNCTION ? '' : 'hide')+'"><input type="radio" id="radio-function" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_FUNCTION) ? 'checked' : '') +'>';
            html += '<label for="radio-function" part="input-label" class="mr-10">Function</label></div>';
            html += '<div part="chart-radio-item" class="chart-radio-item-secondary '+(this.flowGraph == this.FLOW_GRAPH_OBLIGATIONTYPE ? '' : 'hide')+'"><input type="radio" id="radio-obligationtype" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_OBLIGATIONTYPE) ? 'checked' : '') +'>';
            html += '<label for="radio-obligationtype" part="input-label" class="mr-10">Obligation Type</label></div>';
            html += '<div part="chart-radio-item" class="chart-radio-item-secondary '+(this.flowGraph == this.FLOW_GRAPH_JURISDICTION ? '' : 'hide')+'"><input type="radio" id="radio-jurisdiction" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_JURISDICTION) ? 'checked' : '') +'>';
            html += '<label for="radio-jurisdiction" part="input-label" class="mr-10">Jurisdiction</label></div>';
            html += '<div part="chart-radio-item" class="chart-radio-item-secondary '+(this.flowGraph == this.FLOW_GRAPH_FREQUENCY ? '' : 'hide')+'"><input type="radio" id="radio-frequency" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_FREQUENCY) ? 'checked' : '') +'>';
            html += '<label for="radio-frequency" part="input-label" class="mr-10">Frequency</label></div>';
            html += '<div part="chart-radio-item" class="chart-radio-item-secondary '+(this.flowGraph == this.FLOW_GRAPH_SUBCATEGORY ? '' : 'hide')+'"><input type="radio" id="radio-subcategory" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_SUBCATEGORY) ? 'checked' : '') +'>';
            html += '<label for="radio-frequency" part="input-label">SubCategory</label></div>';

            html += '<button id="graph-radios-expander" class="ml-10" part="calendar-tab-button-not-selected"><span class="material-symbols-outlined">chevron_right</span></button>'

          html += '</div>';
        html += '</div>';
        html += '<div class="chart-container d-flex scroll-x align-center"><div part="chart-item" class="chart-item"><canvas id="myChart"></canvas></div><div part="chart-item" class="chart-item"><canvas id="myChart4" class="gone"></canvas></div><div part="chart-item chart-item-middle" class="chart-item"><canvas id="myChart2" class="gone"></canvas></div><div part="chart-item" class="chart-item"><canvas id="myChart3" class="gone"></canvas></div></div>';
        html += '<div id="chart-settings-controls" class="mt-20"></div>'
        html += '<div id="chart-settings"></div>'
      } else {
        html += '<div part="box" class="box"></div>';
      }
    html += '</div>';

    return html;

  }

  renderCalendarContainerDivStart = (index: number) => {

    var html = '';

    html += '<div id="stream-event-'+index+'" part="stream-event-list" class="stream-event-list">';

    return html;

  }

  renderCalendarContainerDivEnd = () => {

    var html = '';
    html += '</div>';

    return html;

  }

  renderCalendarEventSummary = () => {

    var html = '';

    html += '<div id="stream-event-summary" part="stream-event-total" class="d-flex flex-wrap">';
    html += '<div part="badge-dashboard" class="mr-10 mb-10 no-shrink"><span>Total:</span>&nbsp;<span id="graph-total">DASHBOARD_TOTAL</span></div>';
    html += '<div part="badge-dashboard" id="chip-completeness-0" class="chip stat-completeness d-flex justify-center align-center mr-10 mb-10 no-shrink"><span class="material-icons color-not-started">schedule</span>&nbsp;&nbsp;<span>Not Started:</span>&nbsp;<span id="graph-not-started">DASHBOARD_NOT_STARTED</span></div>';
    html += '<div part="badge-dashboard" id="chip-completeness-1" class="chip stat-completeness d-flex justify-center align-center mr-10 mb-10 no-shrink"><span class="material-symbols-outlined color-pending">pending</span>&nbsp;&nbsp;<span>Pending Approval:</span>&nbsp;<span id="graph-pending-approval">DASHBOARD_PENDING_APPROVAL</span></div>';
    html += '<div part="badge-dashboard" id="chip-completeness-2" class="chip stat-completeness d-flex justify-center align-center mr-10 mb-10 no-shrink"><span class="material-symbols-outlined color-rejected">block</span>&nbsp;&nbsp;<span>Rejected:</span>&nbsp;<span id="graph-rejected">DASHBOARD_REJECTED</span></div>';
    html += '<div part="badge-dashboard" id="chip-completeness-3" class="chip stat-completeness d-flex justify-center align-center mr-10 mb-10 no-shrink"><span class="material-symbols-outlined color-done">check_circle</span>&nbsp;&nbsp;<span>Approved:</span>&nbsp;<span id="graph-approved">DASHBOARD_APPROVED</span></div>';
    html += '<div part="badge-dashboard" id="chip-timeliness-0" class="chip stat-timeliness justify-center align-center mr-10 mb-10 no-shrink late-statuses"><span class="material-icons color-in-time">schedule</span>&nbsp;&nbsp;<span>In Time:</span>&nbsp;<span id="graph-in-time">DASHBOARD_IN_TIME</span></div>';
    html += '<div part="badge-dashboard" id="chip-timeliness-1" class="chip stat-timeliness justify-center align-center mr-10 mb-10 no-shrink late-statuses"><span class="material-icons color-past-due-date">timer</span>&nbsp;&nbsp;<span>Past Due Date:</span>&nbsp;<span id="graph-past-due-date">DASHBOARD_PAST_DUE_DATE</span></div>';
    html += '<div part="badge-dashboard" id="chip-timeliness-2" class="chip stat-timeliness justify-center align-center mr-10 mb-10 no-shrink late-statuses"><span class="material-icons color-late-reported">report_off</span>&nbsp;&nbsp;<span>Late Reported:</span>&nbsp;<span id="graph-late-reported">DASHBOARD_LATE_REPORTED</span></div>';
    html += '<div part="badge-dashboard" id="chip-timeliness-3" class="chip stat-timeliness justify-center align-center mr-10 mb-10 no-shrink late-statuses"><span class="material-icons color-late-approved">remove_done</span>&nbsp;&nbsp;<span>Late Approved:</span>&nbsp;<span id="graph-late-approved">DASHBOARD_LATE_APPROVED</span></div>';
    html += '<div part="badge-dashboard" id="chip-timeliness-4" class="chip stat-timeliness justify-center align-center mr-10 mb-10 no-shrink late-statuses"><span class="material-icons color-late-executed">running_with_errors</span>&nbsp;&nbsp;<span>Late Executed:</span>&nbsp;<span id="graph-late-executed">DASHBOARD_LATE_EXECUTED</span></div>';

    html += '<div part="badge-dashboard" id="chip-compliance-0" class="chip stat-compliance justify-center align-center mr-10 mb-10 no-shrink compliance-statuses"><span class="material-icons color-scheduled">schedule</span>&nbsp;&nbsp;<span>Scheduled:</span>&nbsp;<span id="graph-scheduled">DASHBOARD_SCHEDULED</span></div>';
    html += '<div part="badge-dashboard" id="chip-compliance-1" class="chip stat-compliance justify-center align-center mr-10 mb-10 no-shrink compliance-statuses"><span class="material-icons color-not-complied">disabled_by_default</span>&nbsp;&nbsp;<span>Not Complied:</span>&nbsp;<span id="graph-not-complied">DASHBOARD_NOT_COMPLIED</span></div>';
    html += '<div part="badge-dashboard" id="chip-compliance-2" class="chip stat-compliance justify-center align-center mr-10 mb-10 no-shrink compliance-statuses"><span class="material-icons color-partially-complied">rule</span>&nbsp;&nbsp;<span>Partially Complied:</span>&nbsp;<span id="graph-partially-complied">DASHBOARD_PARTIALLY_COMPLIED</span></div>';
    html += '<div part="badge-dashboard" id="chip-compliance-3" class="chip stat-compliance justify-center align-center mr-10 mb-10 no-shrink compliance-statuses"><span class="material-symbols-outlined color-complied">sweep</span>&nbsp;&nbsp;<span>Complied:</span>&nbsp;<span id="graph-complied">DASHBOARD_COMPLIED</span></div>';
    html += '</div>';

    html += '<div id="stream-event-filter" part="stream-event-total" class="d-flex flex-wrap"></div>';

    return html;

  }

  getCalendarRowHide = (events: any, i: number, lastDay: number, month: number, firstDate: any = null, currDate: any = null) => {

    var hide = true;

    if(events != null) {
      hide = false;
    } else if(i === 1){
      hide = false;
    } else if(i === lastDay){
      hide = false;
    } else {
      if(firstDate == null) {
        const mmddPrev = ("0" + (month+1)).slice(-2) + "/" + ("0" + (i-1)).slice(-2);
        const mmddNext = ("0" + (month+1)).slice(-2) + "/" + ("0" + (i+1)).slice(-2);
        //console.log('hide', i, hide);
        if((this.events[mmddPrev] != null || this.events[mmddNext] != null)) {
          hide = false;
        }
      } else {
        const startNextDate = new Date(currDate.getTime());
        startNextDate.setDate(currDate.getDate() + 1);

        const startPrevDate = new Date(currDate.getTime());
        startPrevDate.setDate(currDate.getDate() - 1);

        const mmddNext = ("0" + (startNextDate.getMonth()+1)).slice(-2) + "/" + ("0" + (startNextDate.getDate())).slice(-2);
        const mmddPrev = ("0" + (startPrevDate.getMonth()+1)).slice(-2) + "/" + ("0" + (startPrevDate.getDate())).slice(-2);
        //console.log('hide', i, hide, startNextDate, startPrevDate, mmddNext, mmddPrev);
        if((this.events[mmddPrev] != null || this.events[mmddNext] != null)) {
          hide = false;
        }
      }
    }

    return hide;

  }

  renderCalendarRowDivStart = (i: number, firstDate: any = null, ddmm: string = "") => {

    var html = '';

    html += '<div part="stream-event-selected" class="d-flex stream-event-selected">';
      html += '<div part="stream-event-selected-date">'+ (firstDate != null ? ddmm : ("0" + i).slice(-2))+' |</div>';
      html += '<div class="stream-event-list-container flex-grow">'

    return html;

  }

  renderCalendarRowDivEnd = () => {

    var html = '';

    html += '</div>'
    html += '</div>';

    return html;

  }

  renderCalendarRowDivItemDivStart = (mmdd: string, event: any, itemNumber: number, partStatus: string) => {

    var html = '';

    var remarks = "";
    var occurrenceDate = "";

    const arrMmdd = mmdd.split("/");
    const ddmm = arrMmdd[1] + "/" + arrMmdd[0];

    if(event.triggers.length > 0 && event.triggers != "[]") {
      
      const arrTriggers = JSON.parse(event.triggers);
      for(var i = 0; i < arrTriggers.length; i++) {
        const targetDates = arrTriggers[i].targetDates;
        for(var j = 0; j < targetDates.length; j++) {
          console.log('comparing', targetDates[j], ddmm);
          if(targetDates[j].indexOf(ddmm) >= 0) {
            remarks = arrTriggers[i].remarks;
            occurrenceDate = arrTriggers[i].occurrenceDate;
            console.log('remarks', mmdd)
          }
        }
      }

    }

    let lastUpdated : string = '';

    console.log('lastUpdated', event.lastupdated);
    if(event.lastupdated != null && event.lastupdated.length > 0) {
      lastUpdated = event.lastupdated;
      
    }

    html += '<div class="stream-events-container flex-grow">';
    html += '<div class="hidden-tags hide">'+JSON.stringify(event['tags'])+'</div>'
    html += '<div class="hidden-title hide"><table><thead><th part="badge-filtered"><i>not filtered</i></th></thead></table></div>'
    html += '<div part="stream-events-event-title" class="stream-events-event-title d-flex align-center pl-5 pb-5">' + ('<input id="button-select-'+mmdd.replace('/', '-')+'-'+itemNumber + '-' + (((event.makercheckers != null && (event.makercheckers).length > 0)) ? '1' : '0') + '-' + (((event.docs != null && (event.docs).length > 0)) ? '1' : '0') + '-' + event.entityid.replace(/-/g, '_') + '-' + event.locationid.replace(/-/g, '_') + '-' + event.id.replace(/-/g, '_') +  '-' + event.duedate.split('/')[1] + '-' + event.duedate.split('/')[0] + '-' + event.duedate.split('/')[2] + '-' + partStatus.replace(/-/g,'_') +  '" class="button-select mr-10" type="checkbox" />') + '<sf-i-elastic-text text="'+event['obligationtitle']+'" minLength="100"></sf-i-elastic-text>' + (lastUpdated.length > 0 ? ('&nbsp;&nbsp;<div part="event-last-updated-time" class="d-flex align-center">' + lastUpdated + '</div>') : "") + '</div>';
    if(remarks.length > 0) {
      html += '<div part="stream-events-event-subtitle" class="stream-events-event-subtitle">'+remarks+', occurred on '+occurrenceDate+'</div>';  
    }
    

    

    return html;

  }

  renderCalendarRowDivItemDivEnd = () => {

    var html = '';
    html += '</div>';
    
    return html;

  }

  renderCalendarBlankRowDiv = (hide: boolean, slice: number, i: number, firstDate: any = null, ddmm: string = "") => {

    var html = '';

    //console.log('hidedecision', ddmm, hide);

    if(!hide) {
      html += '<div part="stream-event-not-selected" class="d-flex stream-event-not-selected">';
      html += '<div>'+(firstDate != null ? ddmm : ("0" + i).slice(-2))+'</div>';
      html += '</div>';
      slice = 2;
    } else {
      if(i%slice === 0) {
        html += '<div part="stream-event-not-selected" class="d-flex stream-event-not-selected-hidden">';
        //html += '<div>'+("0" + i).slice(-2)+' |</div>';
        html += '<div>.</div>';
        html += '</div>';
        slice+=3;
      }
    }
    
    return {html: html, slice: slice};

  }

  renderCalendarRowDivItemDivTableHead = (event: any, partStatus: string) => {

    var html = '';

    html += '<table class="stream-events-container-table" part="'+partStatus+'">';
    html += '<thead>';
    html += '<th part="td-head">';
    html += 'Open'
    html += '</th>';
    html += '<th part="td-head">';
    html += 'Status'
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
    for(var k = 0; k < Object.keys(event).length; k++) {
      if(this.getEventPreviewFields().includes(Object.keys(event)[k])) {
        html += '<th part="td-head" class="bg-left-no-border">';
        html += Object.keys(event)[k];
      }
    }
    
    //console.log('listing docs',event.documents )
    if(event.documents != null && (event.documents).length > 0) {
      html += '<th part="td-head">';
      html += 'Docs'
      html += '</th>';
    }
    if(event.comments != null && (event.comments).length > 0) {
      html += '<th part="td-head">';
      html += 'Comments'
      html += '</th>';
    }
    if(event.lastupdated != null && (event.lastupdated).length > 0) {
      html += '<th part="td-head">';
      html += 'Updated'
      html += '</th>';
    }
    if(event.makercheckers != null && (event.makercheckers).length > 0) {
      html += '<th part="td-head">';
      html += ''
      html += '</th>'
    }
    if(event.docs != null && (event.docs).length > 0) {
      html += '<th part="td-head">';
      html += ''
      html += '</th>'
    }
    if(event.obligationtype[0].toLowerCase() == "quality indicator confirmatory"
    || event.obligationtype[0].toLowerCase() == "quality indicator percentage") {
      if(event.comments != null && (event.comments).length > 0) {
        html += '<th part="td-head">';
        html += ''
        html += '</th>'
      }
    }
    html += '</thead>';

    console.log('event.obligationtype', event.obligationtype[0].toLowerCase());

    return html;

  }

  renderCalendarRowDivItemDivTableBody = (event: any, partStatus: string, lateStatus: string, complianceStatus: string, mmdd: string, i: number, j: number) => {

    var html = '';

    html += '<tbody>';
    html += '<td id="td-expand-'+i+'" part="td-body">';
    html += '<button id="button-unmapped-expand-'+mmdd.replace('/', '-')+'-'+j+'" part="button-icon-small" class="material-icons button-expand mr-10">open_in_new</button>'
    html += '</td>';
    html += '<td part="td-body">';
    html += this.renderStatusHtml(partStatus, lateStatus, complianceStatus, i);
    html += '</td>';
    html += '<td part="td-body"><sf-i-elastic-text text="'+event["locationname"].replace(/ *\([^)]*\) */g, "")+'" minLength="10"></sf-i-elastic-text></td>';
    html += '<td part="td-body"><sf-i-elastic-text text="'+event["entityname"].replace(/ *\([^)]*\) */g, "")+'" minLength="10"></sf-i-elastic-text></td>';
    html += '<td part="td-body"><sf-i-elastic-text text="'+event["countryname"].replace(/ *\([^)]*\) */g, "")+'" minLength="10"></sf-i-elastic-text></td>';
    var functions = '';
    for(const element of event["functions"])  {
      functions += (element.split(';')[0].replace(/ *\([^)]*\) */g, "") + ",");
    }
    functions = functions.replace(/,\s*$/, "");
    html += '<td part="td-body"><sf-i-elastic-text text="'+functions+'" minLength="10"></sf-i-elastic-text></td>';
    for(var k = 0; k < Object.keys(event).length; k++) {
      if(this.getEventPreviewFields().includes(Object.keys(event)[k])) {

        html += '<td part="td-body">';
        if(event[Object.keys(event)[k]].indexOf("[") >= 0) {
          html += this.getEventTexts(Object.keys(event)[k], JSON.parse(event[Object.keys(event)[k]]), event);
        } else {
          html += ' <sf-i-elastic-text text="'+event[Object.keys(event)[k]].replace(/"/g, "")+'" minLength="20"></sf-i-elastic-text>';
        }
        html += '</td>';
        
      }
    }
    if(event.documents != null && event.documents != null && (event.documents).length > 0) {
      html += '<td part="td-body">';
      html += '<span class="material-icons muted">description</span>'
      html += (event.documents).length
      html += '</td>';
    }
    if(event.comments != null && event.comments != null && (event.comments).length > 0) {
      html += '<td part="td-body">';
      html += '<span class="material-icons muted">forum</span>'
      html += (event.comments).length
      html += '</td>';
    }
    if(event.lastupdated != null && event.lastupdated != null && (event.lastupdated).length > 0) {
      html += '<td part="td-body">';
      html += Util.timeSince(new Date(event.lastupdated).getTime())
      html += '</td>';
    }
    if(event.makercheckers != null && (event.makercheckers).length > 0) {
      html += '<td part="td-body">';
      html += '<span class="material-symbols-outlined muted">done_all</span>'
      html += '</td>';
    }
    if(event.docs != null && (event.docs).length > 0) {
      html += '<th part="td-body">';
      html += '<span class="material-symbols-outlined muted">scan_delete</span>'
      html += '</th>'
    }
    if(event.obligationtype[0].toLowerCase() == "quality indicator confirmatory"
    || event.obligationtype[0].toLowerCase() == "quality indicator percentage") {
      if(event.comments != null && (event.comments).length > 0) {
        html += '<td part="td-body">';
        for(var n = (event.comments.length - 1); n >= 0; n--) {

          if(event.comments[n].author == "Reporter") {
            const reportedValue = ((event.comments[n].comment).replace(/ *\([^)]*\) */g, "").trim());
            console.log((event.comments[n].comment).replace(/ *\([^)]*\) */g, "").trim(), reportedValue, event.comments[n]);
            let badge: string = "";
            if(event.obligationtype[0].toLowerCase() == "quality indicator percentage") {
              if(parseInt(reportedValue) > 98) {
                badge = "badge-success";
              } else if (parseInt(reportedValue) > 90) {
                badge = "badge-warning";
              } else {
                badge = "badge-error";
              }
              
            } else {

              if(reportedValue.toLowerCase() == "yes") {
                badge = "badge-success";
              } else {
                badge = "badge-error";
              }

            }
            html += ('<span class="'+badge+'">'+reportedValue+'</span>');
            break;
          }

        }
        
        html += '</td>'
      }
    }
    html += '</tbody>';
    html += '</table>';

    return html;

  }

  renderStatusHtml = (partStatus: string, lateStatus: string, complianceStatus: string, i: number) => {

    var html = '';

    html += (complianceStatus == "scheduled" ? '<span class="material-symbols-outlined color-scheduled color-scheduled-item color-scheduled-item-'+i+'">schedule</span>' : '');
    html += (complianceStatus == "not-complied" ? '<span class="material-symbols-outlined color-not-complied color-not-complied-item color-not-complied-item-'+i+'">disabled_by_default</span>' : '');
    html += (complianceStatus == "partially-complied" ? '<span class="material-symbols-outlined color-partially-complied color-partially-complied-item color-partially-complied-item-'+i+'">rule</span>' : '');
    html += (complianceStatus == "complied" ? '<span class="material-symbols-outlined color-complied color-complied-item color-complied-item-'+i+'">sweep</span>' : '');
    
    html += (partStatus == "not-started" ? '<span class="material-symbols-outlined color-not-started color-not-started-item color-not-started-item-'+i+'">schedule</span>' : '');
    html += (partStatus == "pending-approval" ? '<span class="material-symbols-outlined color-pending color-pending-item color-pending-item-'+i+'">pending</span>' : '');
    html += (partStatus == "rejected" ? '<span class="material-symbols-outlined color-rejected color-rejected-item color-rejected-item-'+i+'">block</span>' : '');
    html += (partStatus == "approved" ? '<span class="material-symbols-outlined color-done color-done-item color-done-item-'+i+'">check_circle</span>' : '');

    html += (lateStatus == "in-time" ? '<span class="material-symbols-outlined color-in-time color-in-time-item color-in-time-item-'+i+'">schedule</span>' : '');
    html += (lateStatus == "past-due-date" ? '<span class="material-symbols-outlined color-past-due-date color-past-due-date-item color-past-due-date-item-'+i+'">timer</span>' : '');
    html += (lateStatus == "late-reported" ? '<span class="material-symbols-outlined color-late-reported color-late-reported-item color-late-reported-item-'+i+'">report_off</span>' : '');
    html += (lateStatus == "late-approved" ? '<span class="material-symbols-outlined color-late-approved color-late-approved-item color-late-approved-item-'+i+'">remove_done</span>' : '');
    html += (lateStatus == "late-executed" ? '<span class="material-symbols-outlined color-late-executed color-late-executed-item color-late-executed-item-'+i+'">running_with_errors</span>' : '');

    html.trim().replace(/ \s*$/, "");

    return html;
  }

  renderStatusString = (partStatus: string, lateStatus: string, complianceStatus: string) => {
    
    var str : string = '';
    
    str += (partStatus == "not-started" ? 'not-started ' : '');
    str += (partStatus == "pending-approval" ? 'pending-approval ' : '');
    str += (partStatus == "rejected" ? 'rejected ' : '');
    str += (partStatus == "approved" ? 'approved ' : '');

    str += (lateStatus == "in-time" ? 'in-time ' : '');
    str += (lateStatus == "past-due-date" ? 'past-due-date ' : '');
    str += (lateStatus == "late-reported" ? 'late-reported ' : '');
    str += (lateStatus == "late-approved" ? 'late-approved ' : '');
    str += (lateStatus == "late-executed" ? 'late-executed ' : '');

    str += (complianceStatus == "scheduled" ? 'scheduled ' : '');
    str += (complianceStatus == "complied" ? 'complied ' : '');
    str += (complianceStatus == "not-complied" ? 'not-complied ' : '');
    str += (complianceStatus == "partially-complied" ? 'partially-complied ' : '');

    return str.trim();
  }

  getGraphParam = (event: any) => {
    let graphParam = '';

    //console.log('getGraphParam', this.flowGraph, event);

    if(Array.isArray(event[this.flowGraph])) {
      graphParam = event[this.flowGraph].toString().replace(/ *\([^)]*\) */g, "").replace(/,/g,' • ');
    } else {
      graphParam = event[this.flowGraph].replace(/ *\([^)]*\) */g, "").replace(/,/g,' • ');
    }
    return graphParam;
  }

  renderCalendarAnnotations = (event: any) => {

    var html = '';

    html += '<div class="hidden-filtername hide"><table><thead><th part="badge-filter-name" class="filtername"></th></thead></table></div>'

    let reporterStr = this.getReporterStringFromEvent(event);
    let approverStr = this.getApproverStringFromEvent(event);

    let graphParam = this.getGraphParam(event);

    html += '<div class="d-flex"><div part="badge-filter-name" class="graphparamname graphparamname1 mb-20">' + graphParam.split(';')[0] + '</div>' + reporterStr + approverStr + '</div>';

    return html;

  }

  renderEvents = (_firstDay: any, _endDay: any, iInit: number, iLast: number, showGraph: boolean, index: number, month: number, period: string, firstDate: any = null) => {

    var total = 0, notStarted = 0, approved = 0, pendingApproval = 0, rejected = 0, inTime = 0, pastDueDate = 0, lateExecuted = 0, lateApproved = 0, lateReported = 0, scheduled = 0, partiallyComplied = 0, notComplied = 0, complied = 0;
    var html = '';
    this.selectedItems = [];
    this.selectedStatus = "";
    var csvCols = "", htmlCols = "";
    var csvValues = "", htmlValues = "";
    var slice = 2;
    this.eventsInWindow = [];

    var lastDay = iLast;

    this.clearGraphData();
    this.clearSelectedGraphParam();
    this.clearSelectedLegend();
    
    html += this.renderCalendarGraphs(showGraph);
    html += this.renderCalendarContainerDivStart(index)
    html += this.renderCalendarEventSummary();


    // csvCols += 'Period,Status,Id,ObligationTitle,Obligation,Duedate' 
    csvCols += 'Id,Country,State,Jurisdiction,Category,Subcategory,Statute,Reference,Applicability,ObligationType,ObligationTitle,Obligation,Firstlineofdefence,Secondlineofdefence,Thirdlineofdefence,Internalcontrols,Penalty,Form,AdditionalUrl,Definition,Authority,RiskSeverity,RiskAreas,Frequency,SubFrequency,DueDate,Status,ReportParameter' 
    htmlCols += '<tr><th class="td-thin">Id</th><th class="td-thin">Country</th><th class="td-thin">State</th><th class="td-thin">Jurisdiction</th><th class="td-thin">Category</th><th class="td-thin">Subcategory</th><th class="td-wide">Statute</th><th class="td-thin">Reference</th><th class="td-thin">Applicability</th><th class="td-thin">ObligationType</th><th class="td-wide">ObligationTitle</th><th class="td-wide">Obligation</th><th class="td-thin">Firstlineofdefence</th><th class="td-thin">Secondlineofdefence</th><th class="td-thin">Thirdlineofdefence</th><th>InternalControls</th><th class="td-wide">Penalty</th><th class="td-thin">Form</th><th class="td-thin">Additional URL</th><th class="td-thin">Definition</th><th class="td-thin">Authority</th><th class="td-thin">RiskSeverity</th><th class="td-wide">RiskAreas</th><th class="td-thin">Frequency</th><th class="td-thin">SubFrequency</th><th class="td-thin">DueDate</th><th class="td-wide">Status</th><th class="td-wide">ReportParameter</th></tr>'
    
    for(var i = iInit; i <= iLast; i++) {

      let mmdd : string = "";

      if(firstDate == null) {
        mmdd = ("0" + (month+1)).slice(-2) + "/" + ("0" + i).slice(-2);
      } else {
        const currDate = new Date(firstDate.getTime());
        currDate.setDate(firstDate.getDate() + (i - 1));
        mmdd = ("0" + (currDate.getMonth()+1)).slice(-2) + "/" + ("0" + currDate.getDate()).slice(-2);
      }

      //console.log('mmdd', mmdd);
      //console.log('mmddevent', mmdd,this.events[mmdd]);

      var hide;
      if(firstDate == null) {
        hide = this.getCalendarRowHide(this.events[mmdd], i, lastDay, month, firstDate, null);
      } else {
        const currDate = new Date(firstDate.getTime());
        currDate.setDate(firstDate.getDate() + (i - 1));
        hide = this.getCalendarRowHide(this.events[mmdd], i, lastDay, month, firstDate, currDate);
      }      

      if(this.events[mmdd] != null) {

        
        html += this.renderCalendarRowDivStart(i, firstDate, mmdd.split("/")[1] + "/" + mmdd.split("/")[0]);
        
        for(var j = 0; j < (this.events[mmdd] as Array<any>).length; j++) {

          total++;
          this.events[mmdd][j]['mmdd'] = mmdd
          this.eventsInWindow.push(this.events[mmdd][j]);


          var partStatus = "";
          var lateStatus = "";
          var complianceStatus = "";

          // const tempEvents1 = JSON.parse(JSON.stringify(this.events));
          // //console.log('eventlog1', tempEvents1['06/30'][7].comments, mmdd, j);

          partStatus = this.getCompletenessStatus(JSON.parse(JSON.stringify(this.events[mmdd][j])));
          lateStatus = this.getTimelinessStatus(mmdd, JSON.parse(JSON.stringify(this.events[mmdd][j])), partStatus);
          complianceStatus = this.getComplianceStatus(partStatus, lateStatus);

          // const tempEvents2 = JSON.parse(JSON.stringify(this.events));
          // //console.log('eventlog2', tempEvents2['06/30'][7].comments, mmdd, j);

          notStarted = notStarted + (partStatus == "not-started" ? 1 : 0);
          pendingApproval = pendingApproval + (partStatus == "pending-approval" ? 1 : 0);
          rejected = rejected + (partStatus == "rejected" ? 1 : 0);
          approved = approved + (partStatus == "approved" ? 1 : 0);
          inTime = inTime + (lateStatus == "in-time" ? 1 : 0); 
          pastDueDate = pastDueDate + (lateStatus == "past-due-date" ? 1 : 0);
          lateReported = lateReported + (lateStatus == "late-reported" ? 1 : 0);
          lateApproved = lateApproved + (lateStatus == "late-approved" ? 1 : 0);
          lateExecuted = lateExecuted + (lateStatus == "late-executed" ? 1 : 0);
          scheduled = scheduled + (complianceStatus == "scheduled" ? 1 : 0);
          partiallyComplied = partiallyComplied + (complianceStatus == "partially-complied" ? 1 : 0);
          notComplied = notComplied + (complianceStatus == "not-complied" ? 1 : 0);
          complied = complied + (complianceStatus == "complied" ? 1 : 0);

          this.events[mmdd][j][this.FLOW_GRAPH_COMPLETENESS] = partStatus;
          this.events[mmdd][j][this.FLOW_GRAPH_TIMELINESS] = lateStatus;
          this.events[mmdd][j][this.FLOW_GRAPH_COMPLIANCE] = complianceStatus;


          if(this.events[mmdd][j].id == "362e0260-b0bf-41f9-9788-a7f680de1c3b") {
            
            //console.log('commentsinlist 1', JSON.stringify(this.events[mmdd][j].comments), mmdd, j)
          }


          this.updateStats(this.events[mmdd][j], partStatus, lateStatus, complianceStatus);

          csvValues += ('"' + (this.events[mmdd][j]["id"] + '",'));
          csvValues += ('"' + (this.events[mmdd][j]["country"] + '",'));
          csvValues += ('"' + (this.events[mmdd][j]["state"] + '",'));
          csvValues += ('"' + (this.events[mmdd][j]["jurisdiction"] + '",'));
          csvValues += ('"' + (this.events[mmdd][j]["category"] + '",'));
          csvValues += ('"' + (this.events[mmdd][j]["subcategory"] + '",'));
          csvValues += ('"' + (this.events[mmdd][j]["statute"] + '",'));
          csvValues += ('"' + ((this.events[mmdd][j]["reference"] + "").replace(/"/g, "") + '",'));
          csvValues += ('"' + ((this.events[mmdd][j]["applicability"] + "").replace(/"/g, "") + '",'));
          csvValues += ('"' + ((this.events[mmdd][j]["obligationtype"] + "").replace(/"/g, "") + '",'));
          csvValues += ('"' + ((this.events[mmdd][j]["obligationtitle"] + "").replace(/"/g, "") + '",'));
          csvValues += ('"' + ((this.events[mmdd][j]["obligation"] + "").replace(/"/g, "") + '",'));
          csvValues += ('"' + ((this.events[mmdd][j]["firstlineofdefence"] + "").replace(/"/g, "") + '",'));
          csvValues += ('"' + ((this.events[mmdd][j]["secondlineofdefence"] + "").replace(/"/g, "") + '",'));
          csvValues += ('"' + ((this.events[mmdd][j]["thirdlineofdefence"] + "").replace(/"/g, "") + '",'));
          csvValues += ('"' + ((this.events[mmdd][j]["internalcontrols"] + "").replace(/"/g, "") + '",'));
          csvValues += ('"' + ((this.events[mmdd][j]["penalty"] + "").replace(/"/g, "") + '",'));
          csvValues += ('"' + ((this.events[mmdd][j]["form"] + "").replace(/"/g, "") + '",'));
          csvValues += ('"' + ((this.events[mmdd][j]["additionalurls"] + "").replace(/"/g, "") + '",'));
          csvValues += ('"' + ((this.events[mmdd][j]["definition"] + "").replace(/"/g, "") + '",'));
          csvValues += ('"' + ((this.events[mmdd][j]["authority"] + "").replace(/"/g, "") + '",'));
          csvValues += ('"' + ((this.events[mmdd][j]["risk"] + "").replace(/"/g, "") + '",'));
          csvValues += ('"' + ((this.events[mmdd][j]["riskarea"] + "").replace(/"/g, "") + '",'));
          csvValues += ('"' + ((this.events[mmdd][j]["frequency"] + "").replace(/"/g, "") + '",'));
          csvValues += ('"' + ((this.events[mmdd][j]["subfrequency"] + "").replace(/"/g, "") + '",'));
          csvValues += ('"' + ((this.events[mmdd][j]["duedate"] + "").replace(/"/g, "") + '",'));
          csvValues += ('"' + (this.renderStatusString(partStatus, lateStatus, complianceStatus) + '",'));
          csvValues += ('"' + (this.getGraphParam(this.events[mmdd][j]) + '"\n'));

          // csvValues += (period + ',' 
          //   + this.renderStatusString(partStatus, lateStatus, complianceStatus) + ',' 
          //   + this.events[mmdd][j]["id"] + ',' 
          //   + this.events[mmdd][j]["obligationtitle"] + ',' 
          //   + this.events[mmdd][j]["obligation"] + ',' 
          //   + this.events[mmdd][j]["duedate"]
          //   + '\n');

          htmlValues += ('<tr><td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' td-thin">'+this.events[mmdd][j]["id"]+'</td>'
            + '<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' td-thin">'+this.events[mmdd][j]["country"]+'</td>'
            + '<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' td-thin">'+this.events[mmdd][j]["state"]+'</td>'
            + '<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' td-thin">'+this.events[mmdd][j]["jurisdiction"]+'</td>'
            + '<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' td-thin">'+this.events[mmdd][j]["category"]+'</td>'
            + '<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' td-thin">'+this.events[mmdd][j]["subcategory"]+'</td>'
            + '<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' td-wide">'+this.events[mmdd][j]["statute"]+'</td>'
            + '<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' td-thin">'+this.events[mmdd][j]["reference"]+'</td>'
            + '<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' td-thin">'+this.events[mmdd][j]["applicability"]+'</td>'
            + '<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' td-thin">'+this.events[mmdd][j]["obligationtype"]+'</td>'
            + '<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' td-wide">'+this.events[mmdd][j]["obligationtitle"]+'</td>'
            + '<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' td-wide">'+this.events[mmdd][j]["obligation"]+'</td>'
            + '<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' td-thin">'+this.events[mmdd][j]["firstlineofdefence"]+'</td>'
            + '<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' td-thin">'+this.events[mmdd][j]["secondlineofdefence"]+'</td>'
            + '<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' td-thin">'+this.events[mmdd][j]["thirdlineofdefence"]+'</td>'
            + '<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' td-wide">'+this.events[mmdd][j]["internalcontrols"]+'</td>'
            + '<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' td-wide">'+this.events[mmdd][j]["penalty"]+'</td>'
            + '<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' td-thin">'+this.events[mmdd][j]["form"]+'</td>'
            + '<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' td-thin">'+this.events[mmdd][j]["additionalurls"]+'</td>'
            + '<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' td-thin">'+this.events[mmdd][j]["definition"]+'</td>'
            + '<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' td-thin">'+this.events[mmdd][j]["authority"]+'</td>'
            + '<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' td-thin">'+this.events[mmdd][j]["risk"]+'</td>'
            + '<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' td-wide">'+this.events[mmdd][j]["riskarea"]+'</td>'
            + '<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' td-thin">'+this.events[mmdd][j]["frequency"]+'</td>'
            + '<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' td-thin">'+this.events[mmdd][j]["subfrequency"]+'</td>'
            + '<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' td-thin">'+this.events[mmdd][j]["duedate"]+'</td>'
            + '<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' td-wide text-center status-format">'+ this.renderStatusString(partStatus, lateStatus, complianceStatus)+'</td>'
            + '<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' td-wide status-format">'+this.getGraphParam(this.events[mmdd][j])+'</td>'
            + '</tr>');

          html += this.renderCalendarRowDivItemDivStart(mmdd, this.events[mmdd][j], j, partStatus);
          html += this.renderCalendarRowDivItemDivTableHead(this.events[mmdd][j], partStatus);
          html += this.renderCalendarRowDivItemDivTableBody(this.events[mmdd][j], partStatus, lateStatus, complianceStatus, mmdd, i, j);
          html += this.renderCalendarAnnotations(this.events[mmdd][j]);
          html += this.renderCalendarRowDivItemDivEnd();

        }

        html += this.renderCalendarRowDivEnd();
          
      } else {

        const result: any = this.renderCalendarBlankRowDiv(hide, slice, i, firstDate, mmdd.split("/")[1] + "/" + mmdd.split("/")[0]);
        //console.log('result', result);
        html += result.html;
        slice = result.slice;

      }

    }

    html += this.renderCalendarContainerDivEnd();

    //console.log('final risk severities', this.riskSeverityData);

    //this.period = firstDay?.getDate() + '/' + (firstDay!.getMonth()+1) + '/' + firstDay?.getFullYear() + " - " + endDay?.getDate() + '/' + (endDay!.getMonth()+1) + '/' + endDay?.getFullYear();
    this.period = period;


    this.csvDataCompliances = csvCols + "\n" + csvValues;
    this.htmlDataCompliances = '<table>' + htmlCols + htmlValues + '</table>';

    //console.log('renderevents htmlcols', this.htmlDataCompliances);

    //console.log('progress', this.period, total, notStarted, approved)

    html = html.replace("DASHBOARD_TOTAL", total+"");
    html = html.replace("DASHBOARD_NOT_STARTED", notStarted+"");
    html = html.replace("DASHBOARD_APPROVED", approved+"");
    html = html.replace("DASHBOARD_PENDING_APPROVAL", pendingApproval+"");
    html = html.replace("DASHBOARD_REJECTED", rejected+"");
    html = html.replace("DASHBOARD_IN_TIME", inTime+"");
    html = html.replace("DASHBOARD_PAST_DUE_DATE", pastDueDate+"");
    html = html.replace("DASHBOARD_LATE_REPORTED", lateReported+"")
    html = html.replace("DASHBOARD_LATE_EXECUTED", lateExecuted+"");
    html = html.replace("DASHBOARD_LATE_APPROVED", lateApproved+"");
    html = html.replace("DASHBOARD_SCHEDULED", scheduled+"");
    html = html.replace("DASHBOARD_NOT_COMPLIED", notComplied+"");
    html = html.replace("DASHBOARD_PARTIALLY_COMPLIED", partiallyComplied+"");
    html = html.replace("DASHBOARD_COMPLIED", complied+"");

    this.csvDataStats = 'Period,Total,Not Started,Approved,Pending Approval,Rejected,Past Due Date,Late Reported,Late Executed,Late Approved,Scheduled,Not Complied,Partially Complied,Complied\n';
    this.csvDataStats += this.period + "," + total + "," + notStarted + "," + approved + "," + pendingApproval + "," + rejected + "," + pastDueDate + "," + lateReported + "," + lateExecuted + "," + lateApproved + "," + scheduled + "," + notComplied + "," + partiallyComplied + "," + complied;

    this.htmlDataStats = 'Completeness<br /><br /><table class="w-100"><tr><th class="w-14">Total</th><th class="w-14">Not Started</th><th class="w-14">Approved</th><th class="w-14">Pending Approval</th><th class="w-14">Rejected</th><tr>';
    this.htmlDataStats += '<tr><td class="w-14 text-center td-odd">'+total+'</td><td class="w-14 text-center td-odd">'+notStarted+'</td><td class="w-14 text-center td-odd">'+approved+'</td><td class="w-14 text-center td-odd">'+pendingApproval+'</td><td class="w-14 text-center td-odd">'+rejected+'</td></table>'

    this.htmlDataStats += '<br /><br />Timeliness<br /><br /><table class="mt-20 w-100"><tr><th class="w-14">Total</th><th class="w-14">In Time</th><th class="w-14">Past Due Date</th><th class="w-14">Late Reported</th><th class="w-14">Late Executed</th><th class="w-14">Late Approved</th><tr>';
    this.htmlDataStats += '<tr><td class="w-14 text-center td-odd">'+total+'</td><td class="w-14 text-center td-odd">'+(total-(pastDueDate+lateApproved+lateExecuted))+'</td><td class="w-14 text-center td-odd">'+pastDueDate+'</td><td class="w-14 text-center td-odd">'+lateReported+'</td><td class="w-14 text-center td-odd">'+lateExecuted+'</td><td class="w-14 text-center td-odd">'+lateApproved+'</td><tr></table>'

    this.htmlDataStats += '<br /><br />Compliance<br /><br /><table class="w-100"><tr><th class="w-14">Total</th><th class="w-14">Scheduled</th><th class="w-14">Not Complied</th><th class="w-14">Partially Complied</th><th class="w-14">Complied</th><tr>';
    this.htmlDataStats += '<tr><td class="w-14 text-center td-odd">'+total+'</td><td class="w-14 text-center td-odd">'+scheduled+'</td><td class="w-14 text-center td-odd">'+notComplied+'</td><td class="w-14 text-center td-odd">'+partiallyComplied+'</td><td class="w-14 text-center td-odd">'+complied+'</td><tr></table>'

    return html;

  }

  renderStreamEvents = (index: number, month: number, year: number, showGraph: boolean = true) => {
 
    //console.log('flowgraph renderStreamEvents', this.flowGraph);

    const lastDay = this.getLastDayOfMonth(month, year);
    let firstDay = new Date(year, month, 1);
    let endDay = new Date(year, month, 1);
    endDay?.setDate(endDay.getDate() + lastDay + 1);
    var period = ("0" + (month+1)).slice(-2) + "/" + ("0" + 1).slice(-2) + '/' + new Date().getFullYear() + ' - ' + ("0" + (month+1)).slice(-2) + "/" + ("0" + lastDay).slice(-2) + '/' + new Date().getFullYear()   

    return this.renderEvents(firstDay, endDay, 1, lastDay, showGraph, index, month, period);

  }

  renderThisEvents = (index: number, startDate: Date, showGraph: boolean = true) => {

    var firstDate = new Date();
    var count = 7;

    //console.log('this start date', startDate);

    if(index === 0) {

      firstDate = (this.getFirstDateOfWeek(startDate) as Date);
      //console.log('this first date', firstDate);
      count = 7;

    }

    if(index === 1) {
      
      firstDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
      count = this.getLastDayOfMonth(startDate.getMonth(), startDate.getFullYear());
      //console.log('last day of month', count);

    }

    const lastDay = count;
    let firstDay = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate());
    let endDay = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate());
    endDay?.setDate(endDay.getDate() + lastDay + 1);

    var period = ("0" + (firstDate.getMonth()+1)).slice(-2) + "/" + ("0" + 1).slice(-2) + '/' + firstDate.getFullYear() + ' - ' + ("0" + (firstDate.getMonth()+1)).slice(-2) + "/" + ("0" + count).slice(-2) + '/' + firstDate.getFullYear()   

    return this.renderEvents(firstDay, endDay, 1, lastDay, showGraph, index, (firstDate.getMonth()), period);

  }

  renderRangeEvents = (firstDate: Date, count: number, eventsContainer: HTMLDivElement) => {


    var lastDate = new Date(firstDate.getTime());
    lastDate.setDate(lastDate.getDate() + count - 1)

    const lastDay = count;
    let firstDay = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate());
    let endDay = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate());
    endDay?.setDate(endDay.getDate() + lastDay + 1);

    var period = ("0" + (firstDate.getMonth()+1)).slice(-2) + "/" + ("0" + firstDate.getDate()).slice(-2) + '/' + firstDate.getFullYear() + ' - ' + ("0" + (lastDate.getMonth()+1)).slice(-2) + "/" + ("0" + lastDate.getDate()).slice(-2) + '/' + lastDate.getFullYear();

    //console.log('rangeperiod', period)

    var html = this.renderEvents(firstDay, endDay, 1, lastDay, true, 0, (firstDate.getMonth()), period, firstDate);

    eventsContainer.querySelector('.calendar-right-data')!.innerHTML = html;

    this.attachTimelineFilterHandlers(eventsContainer);

    const radioExpander = eventsContainer.querySelector('#graph-radios-expander') as HTMLButtonElement;
    radioExpander?.addEventListener('click', (e: any) => {

      const button = (e.currentTarget as HTMLButtonElement);
      button.style.display = 'none';

      const arrRadios = eventsContainer.querySelectorAll('.chart-radio-item-secondary') as NodeListOf<HTMLDivElement>;
      arrRadios.forEach(div => {
        div.style.display = 'block';
      });


    });

    const buttonArr = eventsContainer.querySelectorAll('.button-expand') as NodeListOf<HTMLButtonElement>;

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

        var yyyy = this.getCurrentYear(idArr[3]);

        this.renderEventDetail(this.events[mmdd][j], mmdd + "/" + yyyy, null);
  
      })

    }

    const streamEventsContainer = eventsContainer.querySelectorAll('.stream-events-container') as NodeListOf<HTMLDivElement>;
    const buttonSelect = eventsContainer.querySelectorAll('.button-select') as NodeListOf<HTMLButtonElement>;

    for(i = 0; i < buttonSelect.length; i++) {

      buttonSelect[i].addEventListener('click', (ev: any) => {

        //console.log('eventscontainer', streamEventsContainer.length, buttonSelect.length);

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

    // this.clearGraphData();

    // //console.log('rendering range', firstDate, count);

    // this.selectedItems = [];

    // var html = '';

    // html += '<div class="mb-20 stream-event-list" part="stream-event-list-charts">';
    //   html += '<div part="stream-event-chart-selection" class="mb-20">';
    //     html += '<div part="td-head" class="mb-5">Select Chart</div>';
    //     html += '<div class="mb-10 d-flex flex-wrap align-center">';
    //       html += '<div part="chart-radio-item"><input type="radio" id="radio-completeness" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_COMPLETENESS) ? 'checked' : '') +'>';
    //       html += '<label for="radio-completeness" part="input-label" class="mr-10">Completeness</label></div>';
    //       html += '<div part="chart-radio-item"><input type="radio" id="radio-timeliness" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_TIMELINESS) ? 'checked' : '') +'>';
    //       html += '<label for="radio-timeliness" part="input-label" class="mr-10">Timeliness</label></div>';
    //       html += '<div part="chart-radio-item"><input type="radio" id="radio-risk" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_RISKAREAS) ? 'checked' : '') +'>';
    //       html += '<label for="radio-risk" part="input-label" class="mr-10">Risk Areas</label></div>';
    //       html += '<div part="chart-radio-item"><input type="radio" id="radio-riskseverity" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_RISKSEVERITY) ? 'checked' : '') +'>';
    //       html += '<label for="radio-riskseverity" part="input-label" class="mr-10">Risk Severity</label></div>';
    //       html += '<div part="chart-radio-item"><input type="radio" id="radio-location" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_LOCATION) ? 'checked' : '') +'>';
    //       html += '<label for="radio-location" part="input-label" class="mr-10">Location</label></div>';
    //       html += '<div part="chart-radio-item"><input type="radio" id="radio-function" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_FUNCTION) ? 'checked' : '') +'>';
    //       html += '<label for="radio-function" part="input-label" class="mr-10">Function</label></div>';
    //       html += '<div part="chart-radio-item"><input type="radio" id="radio-obligationtype" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_OBLIGATIONTYPE) ? 'checked' : '') +'>';
    //       html += '<label for="radio-obligationtype" part="input-label" class="mr-10">Obligation Type</label></div>';
    //       html += '<div part="chart-radio-item"><input type="radio" id="radio-jurisdiction" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_JURISDICTION) ? 'checked' : '') +'>';
    //       html += '<label for="radio-jurisdiction" part="input-label" class="mr-10">Jurisdiction</label></div>';
    //       html += '<div part="chart-radio-item"><input type="radio" id="radio-frequency" name="graph-type" part="radio-graph" '+ ((this.flowGraph == this.FLOW_GRAPH_FREQUENCY) ? 'checked' : '') +'>';
    //       html += '<label for="radio-frequency" part="input-label">Frequency</label></div>';
    //     html += '</div>';
    //   html += '</div>';
    //   html += '<div class="chart-container d-flex scroll-x align-center"><div part="chart-item" class="chart-item"><canvas id="myChart"></canvas></div><div part="chart-item" class="chart-item"><canvas id="myChart4" class="gone"></canvas></div><div part="chart-item chart-item-middle" class="chart-item"><canvas id="myChart2" class="gone"></canvas></div><div part="chart-item" class="chart-item"><canvas id="myChart3" class="gone"></canvas></div></div>';
    //   html += '<div id="chart-settings-controls" class="mt-20"></div>'
    //   html += '<div id="chart-settings"></div>'
    // html += '</div>';

    // html += '<div id="stream-event-0" part="stream-event-list" class="stream-event-list">';

    // var total = 0, notStarted = 0, approved = 0, inProgress = 0, pastDueDate = 0, lateExecuted = 0, lateApproved = 0;

    // html += '<div id="stream-event-summary" part="stream-event-total" class="d-flex flex-wrap">';
    // html += '<div part="badge-dashboard" class="mr-10 mb-10 no-shrink"><span>Total:</span> <span id="graph-total">DASHBOARD_TOTAL</span></div>';
    // html += '<div part="badge-dashboard" class="stat-completeness d-flex justify-center align-center mr-10 mb-10 no-shrink"><span class="material-icons color-not-started">schedule</span>&nbsp;&nbsp;<span>Not Started:</span> <span id="graph-not-started">DASHBOARD_NOT_STARTED</span></div>';
    // html += '<div part="badge-dashboard" class="stat-completeness d-flex justify-center align-center mr-10 mb-10 no-shrink"><span class="material-symbols-outlined color-pending">pending</span>&nbsp;&nbsp;<span>In Progress:</span> <span id="graph-in-progress">DASHBOARD_IN_PROGRESS</span></div>';
    // html += '<div part="badge-dashboard" class="stat-completeness d-flex justify-center align-center mr-10 mb-10 no-shrink"><span class="material-symbols-outlined color-done">check_circle</span>&nbsp;&nbsp;<span>Approved:</span><span id="graph-approved">DASHBOARD_APPROVED</span></div>';
    // // html += '<div part="calendar-tab-button-not-selected" class="gone d-flex justify-center align-center mr-10 mb-10 no-shrink cursor" id="button-status-more"><span class="material-symbols-outlined">navigate_next</span></div>';
    // html += '<div part="badge-dashboard" class="stat-timeliness justify-center align-center mr-10 mb-10 no-shrink late-statuses"><span class="material-icons color-not-started">timer</span>&nbsp;&nbsp;<span>In Time:</span> <span id="graph-in-time">DASHBOARD_IN_TIME</span></div>';
    // html += '<div part="badge-dashboard" class="stat-timeliness justify-center align-center mr-10 mb-10 no-shrink late-statuses"><span class="material-icons color-past-due-date">running_with_errors</span>&nbsp;&nbsp;<span>Past Due Date:</span> <span id="graph-past-due-date">DASHBOARD_PAST_DUE_DATE</span></div>';
    // html += '<div part="badge-dashboard" class="stat-timeliness justify-center align-center mr-10 mb-10 no-shrink late-statuses"><span class="material-icons color-late-approved">running_with_errors</span>&nbsp;&nbsp;<span>Late Approved:</span> <span id="graph-late-approved">DASHBOARD_LATE_APPROVED</span></div>';
    // html += '<div part="badge-dashboard" class="stat-timeliness justify-center align-center mr-10 mb-10 no-shrink late-statuses"><span class="material-icons color-late-executed">running_with_errors</span>&nbsp;&nbsp;<span>Late Executed:</span> <span id="graph-late-executed">DASHBOARD_LATE_EXECUTED</span></div>';
    // html += '</div>';
    // html += '<div id="stream-event-filter" part="stream-event-total" class="d-flex flex-wrap"></div>';

    // var lastDate = new Date(firstDate.getTime());
    // lastDate.setDate(lastDate.getDate() + count)

    // this.eventsInWindow = [];
    // var csvCols = "", htmlCols = "";
    // var csvValues = "", htmlValues = "";
    // var period = ("0" + (firstDate.getMonth()+1)).slice(-2) + "/" + ("0" + firstDate.getDate()).slice(-2) + ' - ' + ("0" + (lastDate.getMonth()+1)).slice(-2) + "/" + ("0" + lastDate.getDate()).slice(-2)

    // let firstDay: Date | null = null;
    // let endDay = null;

    // var slice = 2;

    // for(var i = 1; i <= count; i++) {

    //   if(i === 1) {
    //     firstDay = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate());
    //     endDay = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate());
    //   } else {
    //     endDay?.setDate(endDay.getDate() + 1);
    //   }


    //   const mmdd = ("0" + (firstDate.getMonth()+1)).slice(-2) + "/" + ("0" + firstDate.getDate()).slice(-2);

    //   var hide = true;

    //   //console.log('eventslice', slice);
    //   //console.log('event status', mmdd, this.events[mmdd]);

    //   if(this.events[mmdd] != null) {
    //     hide = false;
    //   } else if(i === 1){
    //     hide = false;
    //   } else if(i === (count)){
    //     hide = false;
    //   } else {

    //     const startNextDate = new Date(firstDate.getTime());
    //     startNextDate.setDate(firstDate.getDate() + 1);

    //     const startPrevDate = new Date(firstDate.getTime());
    //     startPrevDate.setDate(firstDate.getDate() - 1);

    //     const mmddNext = ("0" + (startNextDate.getMonth()+1)).slice(-2) + "/" + ("0" + (startNextDate.getDate())).slice(-2);
    //     const mmddPrev = ("0" + (startPrevDate.getMonth()+1)).slice(-2) + "/" + ("0" + (startPrevDate.getDate())).slice(-2);
    //     //console.log('hide', i, hide, startNextDate, startPrevDate, mmddNext, mmddPrev);
    //     if((this.events[mmddPrev] != null || this.events[mmddNext] != null)) {
    //       hide = false;
    //     }
    //   }

    //   if(this.events[mmdd] != null) {
    //     html += '<div part="stream-event-selected" class="d-flex stream-event-selected">';
    //       html += '<div part="stream-event-selected-date">'+("0" + firstDate.getDate()).slice(-2)+'/'+(firstDate.getMonth()+1)+' |</div>';
    //       html += '<div class="stream-event-list-container flex-grow">'
    //       for(var j = 0; j < (this.events[mmdd] as Array<any>).length; j++) {
    //         total++;
    //         this.events[mmdd][j]['mmdd'] = mmdd
    //         this.eventsInWindow.push(this.events[mmdd][j]);

    //         // this.events[mmdd][j] = this.renderLatestCompliance(("0" + (firstDate.getMonth()+1)).slice(-2), this.events[mmdd][j]);

    //         var partStatus = "";
    //         var lateStatus = "in-time";

    //         if(this.events[mmdd][j].approved != null && (this.events[mmdd][j].approved) != null && (this.events[mmdd][j].approved)) {
              
    //           partStatus = "status-approved";
    //           if(this.getLateExecuted(mmdd, this.events[mmdd][j])) {
    //             lateStatus = "late-executed"
    //           } else {
    //             if(this.getLateApproved(mmdd, this.events[mmdd][j])) {
    //               lateStatus = "late-approved"
    //             }
    //           }
    //         } else if(this.events[mmdd][j].comments != null && this.events[mmdd][j].comments != null && (this.events[mmdd][j].comments).length > 0) {
    //           partStatus = "status-in-progress";
    //           if(this.getPastDueDate(mmdd)) {
    //             lateStatus = "past-due-date"
    //           }
    //         } else {
    //           partStatus = "status-not-started";
    //           if(this.getPastDueDate(mmdd)) {
    //             lateStatus = "past-due-date"
    //           }
    //         }

    //         this.updateRiskAreaStats(this.events[mmdd][j]['riskarea'], partStatus, lateStatus);
    //         this.updateRiskSeverityStats(this.events[mmdd][j]['risk'], partStatus, lateStatus);
    //         this.updateFunctionStats(this.events[mmdd][j]['functions'], partStatus, lateStatus);
    //         this.updateObligationTypeStats(this.events[mmdd][j]['obligationtype'], partStatus, lateStatus);
    //         this.updateJurisdictionStats(this.events[mmdd][j]['jurisdiction'], partStatus, lateStatus)
    //         this.updateFrequencyStats(this.events[mmdd][j]['frequency'], partStatus, lateStatus)
    //         this.updateLocationStats([this.events[mmdd][j]['locationname']], partStatus, lateStatus)

    //         html += '<div class="stream-events-container flex-grow">';
    //           html += '<div class="hidden-tags hide">'+JSON.stringify(this.events[mmdd][j]['tags'])+'</div>'
    //           html += '<div class="hidden-title hide"><table><thead><th part="badge-filtered"><i>filtered out</i></th></thead></table></div>'
    //           html += '<div part="stream-events-event-title" class="stream-events-event-title d-flex align-center pl-5 pb-5">' + ('<input id="button-select-'+mmdd.replace('/', '-')+'-'+j + '-' + (((this.events[mmdd][j].makercheckers != null && (this.events[mmdd][j].makercheckers).length > 0)) ? '1' : '0') + '-' + (((this.events[mmdd][j].docs != null && (this.events[mmdd][j].docs).length > 0)) ? '1' : '0') + '-' + this.events[mmdd][j].entityid.replace(/-/g, '_') + '-' + this.events[mmdd][j].locationid.replace(/-/g, '_') + '-' + this.events[mmdd][j].id.replace(/-/g, '_') +  '-' + this.events[mmdd][j].duedate.split('/')[1] + '-' + this.events[mmdd][j].duedate.split('/')[0] + '-' + this.events[mmdd][j].duedate.split('/')[2] + '-' + partStatus.replace(/-/g,'_') +  '" class="button-select mr-10" type="checkbox" />') + '<sf-i-elastic-text text="'+this.events[mmdd][j]['obligationtitle']+'" minLength="100"></sf-i-elastic-text></div>';
    //           html += '<table class="stream-events-container-table">';
    //           html += '<thead>';
    //           html += '<th part="td-head">';
    //           html += 'Status'
    //           if(csvCols.indexOf('Status') < 0) {
    //             csvCols += 'Period,Status,Id,ObligationTitle,Obligation,Duedate' 
    //             htmlCols += '<tr><th>Id</th><th>Status</th><th>Statute</th><th>Reference</th><th class="w-200px">Applicability</th><th>ObligationType</th><th class="w-200px">Obligation</th><th class="w-200px">InternalControls</th><th class="w-200px">Penalty</th><th>RiskSeverity</th><th>Frequency</th><th>SubFrequency</th><th>DueDate</th><th>ReportParameter</th></tr>'
    //           }
    //           html += '</th>';
    //           html += '<th part="td-head">';
    //           html += '</th>';
    //           html += '<th part="td-head">';
    //           html += 'Location'
    //           html += '</th>'
    //           html += '<th part="td-head">';
    //           html += 'Entity'
    //           html += '</th>'
    //           html += '<th part="td-head">';
    //           html += 'Country'
    //           html += '</th>'
    //           html += '<th part="td-head">';
    //           html += 'Function'
    //           html += '</th>'
              
    //           for(var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
    //             if(this.getEventPreviewFields().includes(Object.keys(this.events[mmdd][j])[k])) {
    //               html += '<th part="td-head" class="bg-left-no-border">';
    //               html += Object.keys(this.events[mmdd][j])[k];
    //               html += '</th>';
    //             }
    //           }
              
    //           //console.log('listing docs',this.events[mmdd][j].documents )
    //           if(this.events[mmdd][j].documents != null && this.events[mmdd][j].documents != null && (this.events[mmdd][j].documents).length > 0) {
    //             html += '<th part="td-head">';
    //             html += 'Docs'
    //             html += '</th>';
    //           }
    //           if(this.events[mmdd][j].comments != null && this.events[mmdd][j].comments != null && (this.events[mmdd][j].comments).length > 0) {
    //             html += '<th part="td-head">';
    //             html += 'Comments'
    //             html += '</th>';
    //           } else {
    //             if(partStatus != "status-approved") {
    //               notStarted++;
    //             }
    //           }
    //           if(this.events[mmdd][j].lastupdated != null && this.events[mmdd][j].lastupdated != null && (this.events[mmdd][j].lastupdated).length > 0) {
    //             html += '<th part="td-head">';
    //             html += 'Updated'
    //             html += '</th>';
    //           }
    //           if(this.events[mmdd][j].makercheckers != null && (this.events[mmdd][j].makercheckers).length > 0) {
    //             html += '<th part="td-head">';
    //             html += ''
    //             html += '</th>'
    //           }
    //           if(this.events[mmdd][j].docs != null && (this.events[mmdd][j].docs).length > 0) {
    //             html += '<th part="td-head">';
    //             html += ''
    //             html += '</th>'
    //           }

    //           // for(var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
    //           //   html += '<th part="td-head">';
    //           //   html += Object.keys(this.events[mmdd][j])[k];
    //           //   html += '</th>';
    //           // }
    //           html += '</thead>';
    //           html += '<tbody>';
    //           csvValues += (period + ',');
    //           htmlValues += ('<tr><td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["id"]+'</td>');
    //           if(partStatus == "status-approved") {
    //             approved++
    //             html += '<td part="td-body">';
    //             if(lateStatus == "late-executed") {
    //               lateExecuted++;
    //               if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
    //                 html += '<span class="material-symbols-outlined color-done color-done-item color-done-item-'+i+'">check_circle</span>';
    //               }
    //               if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
    //                 html += '<span class="material-icons color-late-executed color-late-executed color-late-executed-'+i+'">running_with_errors</span>';
    //               }
    //               csvValues += 'approved late-executed,';
    //               htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center status-format">approved late-executed</td>');
    //             } else if(lateStatus == "late-approved") {
    //               lateApproved++;
    //               if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
    //                 html += '<span class="material-symbols-outlined color-done color-done-item color-done-item-'+i+'">check_circle</span>'
    //               }
    //               if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
    //                 html += '<span class="material-icons color-late-approved color-late-approved color-late-approved-'+i+'">running_with_errors</span>'
    //               }
    //               csvValues += 'approved late-approved,';
    //               htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center status-format">approved late-approved</td>');
    //             } else {
    //               if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
    //                 html += '<span class="material-symbols-outlined color-done color-done-item color-done-item-'+i+'">check_circle</span>'
    //               }
    //               if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
    //                 html += '<span class="material-symbols-outlined color-not-started color-not-started-item color-not-started-item-'+i+'">timer</span>'
    //               }
    //               csvValues += 'approved,';
    //               htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center status-format">approved</td>');
    //             }
    //             html += '</td>';
    //           } else if(partStatus == "status-in-progress") {
    //             html += '<td part="td-body">';
    //             if(lateStatus == "past-due-date") {
    //               pastDueDate++;
    //               if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
    //                 html += '<span class="material-symbols-outlined color-pending color-pending-item color-pending-item-'+i+'">pending</span>'
    //               }
    //               if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
    //                 html += '<span class="material-icons color-past-due-date color-past-due-date-item color-past-due-date-item-'+i+'">running_with_errors</span>'
    //               }
    //               csvValues += 'in-progress past-due-date,';
    //               htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center status-format">in-progress past-due-date</td>');
    //             } else {
    //               if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
    //                 html += '<span class="material-symbols-outlined color-pending color-pending-item color-pending-item-'+i+'">pending</span>'
    //               }
    //               if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
    //                 html += '<span class="material-symbols-outlined color-not-started color-not-started-item color-not-started-item-'+i+'">timer</span>'
    //               }
    //               csvValues += 'in-progress,';
    //               htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center status-format">in-progress</td>');
    //             }
                
    //             html += '</td>';
    //           } else {
    //             html += '<td part="td-body">';
    //             if(lateStatus == "past-due-date") {
    //               pastDueDate++;
    //               if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
    //                 html += '<span class="material-icons color-not-started color-not-started-item color-not-started-item-'+i+'">schedule</span>'
    //               }
    //               if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
    //                 html += '<span class="material-icons color-past-due-date color-past-due-date-item color-past-due-date-item-'+i+'">running_with_errors</span>'
    //               }
    //               csvValues += 'not started past-due-date,';
    //               htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center status-format">not-started past-due-date</td>');
    //             } else {
    //               if(this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {
    //                 html += '<span class="material-icons color-not-started color-not-started-item color-not-started-item-'+i+'">schedule</span>'
    //               }
    //               if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS) {
    //                 html += '<span class="material-symbols-outlined color-not-started color-not-started-item color-not-started-item-'+i+'">timer</span>'
    //               }
    //               csvValues += 'not started,';
    //               htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +' text-center status-format">not-started</td>');
    //             }
                
    //             html += '</td>';
    //           }
    //           html += '<td id="td-expand-'+i+'" part="td-body">';
    //           html += '<button id="button-unmapped-expand-'+mmdd.replace('/', '-')+'-'+j+'" part="button-icon-small" class="material-icons button-expand mr-10">open_in_new</button>'
    //           html += '</td>';
    //           html += '<td part="td-body"><sf-i-elastic-text text="'+this.events[mmdd][j]["locationname"].replace(/ *\([^)]*\) */g, "")+'" minLength="10"></sf-i-elastic-text></td>';
    //           html += '<td part="td-body"><sf-i-elastic-text text="'+this.events[mmdd][j]["entityname"].replace(/ *\([^)]*\) */g, "")+'" minLength="10"></sf-i-elastic-text></td>';
    //           html += '<td part="td-body"><sf-i-elastic-text text="'+this.events[mmdd][j]["countryname"].replace(/ *\([^)]*\) */g, "")+'" minLength="10"></sf-i-elastic-text></td>';
    //           var functions = '';
    //           for(const element of this.events[mmdd][j]["functions"])  {
    //             functions += (element.split(';')[0].replace(/ *\([^)]*\) */g, "") + ",");
    //           }
    //           functions = functions.replace(/,\s*$/, "");
    //           html += '<td part="td-body"><sf-i-elastic-text text="'+functions+'" minLength="10"></sf-i-elastic-text></td>';
    //           for(var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
    //             if(this.getEventPreviewFields().includes(Object.keys(this.events[mmdd][j])[k])) {
        
    //               html += '<td part="td-body">';
    //               if(this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]].indexOf("[") >= 0) {
    //                 html += this.getEventTexts(Object.keys(this.events[mmdd][j])[k], JSON.parse(this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]]), this.events[mmdd][j]);
    //               } else {
    //                 html += ' <sf-i-elastic-text text="'+this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]].replace(/"/g, "")+'" minLength="20"></sf-i-elastic-text>';
    //               }
    //               html += '</td>';
                  
    //             }
    //           }

    //           csvValues += this.events[mmdd][j]["id"] + ',' + this.events[mmdd][j]["obligationtitle"] + ',' + this.events[mmdd][j]["obligation"] + ',' + this.events[mmdd][j]["duedate"];
    //           htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["statute"]+'</td>');
    //           htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["reference"]+'</td>');
    //           htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["applicability"]+'</td>');
    //           htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["obligationtype"]+'</td>');
    //           htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["obligation"]+'</td>');
    //           htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["internalcontrols"]+'</td>');
    //           htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["penalty"]+'</td>');
    //           htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["risk"]+'</td>');
    //           htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["frequency"]+'</td>');
    //           htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["subfrequency"]+'</td>');
    //           htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+this.events[mmdd][j]["duedate"]+'</td>');

              
    //           if(this.events[mmdd][j].documents != null && this.events[mmdd][j].documents != null && (this.events[mmdd][j].documents).length > 0) {
    //             html += '<td part="td-body">';
    //             html += '<span class="material-icons muted">description</span>'
    //             html += (this.events[mmdd][j].documents).length
    //             html += '</td>';
    //           }
    //           if(this.events[mmdd][j].comments != null && this.events[mmdd][j].comments != null && (this.events[mmdd][j].comments).length > 0) {
    //             html += '<td part="td-body">';
    //             html += '<span class="material-icons muted">forum</span>'
    //             html += (this.events[mmdd][j].comments).length
    //             html += '</td>';
    //           }
    //           if(this.events[mmdd][j].lastupdated != null && this.events[mmdd][j].lastupdated != null && (this.events[mmdd][j].lastupdated).length > 0) {
    //             html += '<td part="td-body">';
    //             html += Util.timeSince(new Date(this.events[mmdd][j].lastupdated).getTime())
    //             html += '</td>';
    //           }
    //           if(this.events[mmdd][j].makercheckers != null && (this.events[mmdd][j].makercheckers).length > 0) {
    //             html += '<td part="td-body">';
    //             html += '<span class="material-symbols-outlined muted">done_all</span>'
    //             html += '</td>';
    //           }
    //           if(this.events[mmdd][j].docs != null && (this.events[mmdd][j].docs).length > 0) {
    //             html += '<th part="td-body">';
    //             html += '<span class="material-symbols-outlined muted">scan_delete</span>'
    //             html += '</th>'
    //           }
    //           csvValues += '\n';
              
    //           // for(var k = 0; k < Object.keys(this.events[mmdd][j]).length; k++) {
    //           //   html += '<th part="td-body">';
    //           //   if(this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]].indexOf("[") >= 0) {
    //           //     html += this.getEventTexts(Object.keys(this.events[mmdd][j])[k], JSON.parse(this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]]), this.events[mmdd][j]);
    //           //   } else {
    //           //     html += this.events[mmdd][j][Object.keys(this.events[mmdd][j])[k]].replace(/"/g, "");
    //           //   }
                
    //           //   html += '</th>';
    //           // }
    //           html += '</tbody>';
    //           html += '</table>';
    //           html += '<div class="hidden-filtername hide"><table><thead><th part="badge-filter-name" class="filtername"></th></thead></table></div>'

    //           let reporterStr = this.getReporterStringFromEvent(this.events[mmdd][j]);
    //           let approverStr = this.getApproverStringFromEvent(this.events[mmdd][j]);

    //           if(this.flowGraph != this.FLOW_GRAPH_COMPLETENESS && this.flowGraph != this.FLOW_GRAPH_TIMELINESS) {

    //             let graphParam = '';
    //             if(Array.isArray(this.events[mmdd][j][this.flowGraph])) {
    //               graphParam = this.events[mmdd][j][this.flowGraph].toString().replace(/ *\([^)]*\) */g, "");
    //             } else {
    //               graphParam = this.events[mmdd][j][this.flowGraph].replace(/ *\([^)]*\) */g, "");
    //             }
    //             html += '<div class="d-flex"><div part="badge-filter-name" class="graphparamname graphparamname1 mb-20">' + graphParam + '</div>'+reporterStr + approverStr+'</div>';
    //             htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+graphParam+'</td>');

    //           } else {

    //             if(this.flowGraph == this.FLOW_GRAPH_COMPLETENESS) {

    //               html += '<div class="d-flex"><div part="badge-filter-name" class="graphparamname graphparamname1 mb-20">' + partStatus.replace('status-', '') + '</div>'+reporterStr + approverStr+'</div>';
    //               htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+partStatus.replace('status-', '')+'</td>');

    //             }

    //             if(this.flowGraph == this.FLOW_GRAPH_TIMELINESS) {

    //               html += '<div class="d-flex"><div part="badge-filter-name" class="graphparamname graphparamname1 mb-20">' + lateStatus + '</div>'+reporterStr + approverStr+'</div>';
    //               htmlValues += ('<td class="'+ (total%2 === 0 ? 'td-odd' : 'td-even') +'">'+lateStatus+'</td>');

    //             }

    //           }

    //           htmlValues += ('</tr>');

    //         html += '</div>';
    //       }
    //       html += '</div>';
    //     html += '</div>';

    //   } else {

    //     if(!hide) {
    //       html += '<div part="stream-event-not-selected" class="d-flex stream-event-not-selected">';
    //       html += '<div>'+("0" + firstDate.getDate()).slice(-2)+'/'+(firstDate.getMonth()+1)+'</div>';
    //       html += '</div>';
    //       slice = 2;
    //     } else {
    //       //console.log('eventslice=person', i, slice, i%slice);
    //       if(i%slice === 0) {
    //         html += '<div part="stream-event-not-selected" class="d-flex stream-event-not-selected-hidden">';
    //         //html += '<div>'+("0" + i).slice(-2)+' |</div>';
    //         html += '<div>.</div>';
    //         html += '</div>';
    //         slice+=3;
    //       }
    //     }

    //   }

    //   firstDate.setDate(firstDate.getDate() + 1);

    // }

    // html += '</div>';

    // this.period = firstDay?.getDate() + '/' + (firstDay!.getMonth()+1) + '/' + firstDay?.getFullYear() + " - " + endDay?.getDate() + '/' + (endDay!.getMonth()+1) + '/' + endDay?.getFullYear();

    // this.csvDataCompliances = csvCols + "\n" + csvValues;
    // this.htmlDataCompliances = '<table>' + htmlCols + htmlValues + '</table>';

    // inProgress = total - notStarted - approved;

    // //console.log('progress', total, notStarted, approved)

    // html = html.replace("DASHBOARD_TOTAL", total+"");
    // html = html.replace("DASHBOARD_NOT_STARTED", notStarted+"");
    // html = html.replace("DASHBOARD_APPROVED", approved+"");
    // html = html.replace("DASHBOARD_IN_PROGRESS", inProgress+"");
    // html = html.replace("DASHBOARD_IN_TIME", (total - pastDueDate - lateApproved - lateExecuted)+"");
    // html = html.replace("DASHBOARD_PAST_DUE_DATE", pastDueDate+"");
    // html = html.replace("DASHBOARD_LATE_EXECUTED", lateExecuted+"");
    // html = html.replace("DASHBOARD_LATE_APPROVED", lateApproved+"");

    // this.csvDataStats = 'Period,Total,Not Started,Approved,In Progress,Past Due Date,Late Executed,Late Approved\n';
    // this.csvDataStats += this.period + "," + total + "," + notStarted + "," + approved + "," + inProgress + "," + pastDueDate + "," + lateExecuted + "," + lateApproved;

    // this.htmlDataStats = '<table class="w-100"><tr><th class="w-14">Total</th><th class="w-14">Not Started</th><th class="w-14">Approved</th><th class="w-14">In Progress</th><th class="w-14">Past Due Date</th><th class="w-14">Late Executed</th><th class="w-14">Late Approved</th><tr>';
    // this.htmlDataStats += '<tr><td class="w-14 text-center td-odd">'+total+'</td><td class="w-14 text-center td-odd">'+notStarted+'</td><td class="w-14 text-center td-odd">'+approved+'</td><td class="w-14 text-center td-odd">'+inProgress+'</td><td class="w-14 text-center td-odd">'+pastDueDate+'</td><td class="w-14 text-center td-odd">'+lateExecuted+'</td><td class="w-14 text-center td-odd">'+lateApproved+'</td><tr></table>';

    

  }
 
  renderRegisterEvents = (events: any) => {

    var html = '';

    this.csvDataRegisters = '';

    html += '<div class="d-flex scroll-x w-100p">';

    for(var i = 0; i < Object.keys(events).length; i++) {
      const country = Object.keys(events)[i];
      html += ('<button class="tab-button tab-button-country" id="tab-button-country-'+i+'" part="'+(this.selectedCountryTab == i ? 'calendar-tab-button-selected-small' : 'calendar-tab-button-not-selected-small')+'">'+country+'</button>');
    }

    html += '</div>';

    html += '<div id="register-list" class="pl-10 pt-10"></div>';

    this._SfRegisterContainer.querySelector('.calendar-right-data')!.innerHTML = html;

    const divRegisterList = (this._SfRegisterContainer.querySelector('.calendar-right-data') as HTMLDivElement).querySelector('#register-list');

    const arrButtons = (this._SfRegisterContainer.querySelector('.calendar-right-data') as HTMLDivElement).querySelectorAll('.tab-button-country') as NodeListOf<HTMLButtonElement>;

    for(i = 0; i < arrButtons.length; i++) {
      const button = Util.clearListeners(arrButtons[i]);
      button.addEventListener('click', (e: any)=> {
        const index = e.currentTarget.id.split('-')[3];
        this.selectedCountryTab = index
        this.renderRegisterEvents(events);
      });
    }

    if(this.selectedCountryTab >= 0) {

      const index = this.selectedCountryTab;
      //console.log('indexclicked', index);

      const objCountry = events[Object.keys(events)[index]];
      //console.log('indexclicked', objCountry);

      var html = '';
      this.csvDataRegisters += '"ID",';
      for(var i = 0; i < Object.keys(objCountry).length; i++) {

        const statute = Object.keys(objCountry)[i];

        // this.csvDataRegisters += ('\n\n"' + statute + '"\n\n');

        html += ('<h3 part="register-section-title-'+(i != 0 ? 'not-selected' : 'selected')+'" class="left-sticky register-statute" id="register-statute-'+i+'">'+statute+'</h3>');
        html += '<div class="w-100p scroll-x '+(i != 0 ? 'hide' : '')+'" id="register-body-'+i+'" >';
          html += '<table>';
          
            if(i === 0) {
              for(var k = 0; k < JSON.parse(objCountry[statute][Object.keys(objCountry[statute])[0]].cols).length; k++) {
                if(!this.EXCLUDE_COLS_FROM_REGS.includes(JSON.parse(objCountry[statute][Object.keys(objCountry[statute])[0]].cols)[k].toLowerCase())) {
                  this.csvDataRegisters += ('"' + JSON.parse(objCountry[statute][Object.keys(objCountry[statute])[0]].cols)[k] + '",');
                  console.log('loggin col', JSON.parse(objCountry[statute][Object.keys(objCountry[statute])[0]].cols)[k])
                } 
              }
              this.csvDataRegisters = this.csvDataRegisters.replace(/,\s*$/, "");
              this.csvDataRegisters += ('\n');
            }
        
            for(var j = 0; j < Object.keys(objCountry[statute]).length; j++) {
              const complianceId = Object.keys(objCountry[statute])[j];
              const compliance = objCountry[statute][complianceId];
              const data = JSON.parse(compliance.data);
              const cols = JSON.parse(compliance.cols);
              this.csvDataRegisters += ('"' + complianceId + '",');
              html += '<tr>';
              html += ('<td class="td-body" part="td-body-register"><button part="button-icon" id="button-icon-country-'+index+'-'+i+'-'+j+'" class="button-icon-country"><span class="material-symbols-outlined">open_in_new</span></button></td>');
              html += ('<td class="td-body" part="td-body-register"><span part="td-head" style="padding-left: 0px !important">ID</span><br /><sf-i-elastic-text text="'+complianceId+'" minLength="10" lineSize="4"></sf-i-elastic-text></td>');
              for(var k = 0; k < cols.length; k++) {
                if(!this.EXCLUDE_COLS_FROM_REGS.includes(cols[k].toLowerCase())) {
                  html += ('<td class="td-body" part="td-body-register"><span part="td-head" style="padding-left: 0px !important">' + cols[k] + '</span><br /><sf-i-elastic-text text="'+data[k]+'" minLength="80" lineSize="4"></sf-i-elastic-text></td>');
                  this.csvDataRegisters += ('"' + (data[k] + "").replace(/"/g, '') + '",');
                  // this.csvDataRegisters += ('",');
                }
              }
              this.csvDataRegisters = this.csvDataRegisters.replace(/,\s*$/, "");
              this.csvDataRegisters += ('\n');
              console.log('enter');
              html += '</tr>';
            }
            
          html += '</table>';
        html += '</div>';
  
      }

      divRegisterList!.innerHTML = html;

      console.log('csvdataregisters', this.csvDataRegisters);

      const arrButtonCountries = (this._SfRegisterContainer.querySelector('.calendar-right-data') as HTMLDivElement).querySelectorAll('.button-icon-country') as NodeListOf<HTMLButtonElement>;

      for(i = 0; i < arrButtonCountries.length; i++) {
        const button = Util.clearListeners(arrButtonCountries[i]);

        button.addEventListener('click', (e: any)=> {

          const index = e.currentTarget.id.split('-')[3];
          const i1 = e.currentTarget.id.split('-')[4];
          const j1 = e.currentTarget.id.split('-')[5];
          //console.log('country clicked', index, i1, j1);

          const objCountry = events[Object.keys(events)[index]];
          const statute = Object.keys(objCountry)[i1];
          const complianceId = Object.keys(objCountry[statute])[j1];
          const compliance = objCountry[statute][complianceId];

          this.renderEventDetailShort(compliance);

        });
      }

      const arrRegisterStatutes = (this._SfRegisterContainer.querySelector('.calendar-right-data') as HTMLDivElement).querySelectorAll('.register-statute') as NodeListOf<HTMLDivElement>;
      for(i = 0; i < arrRegisterStatutes.length; i++) {

        const button = Util.clearListeners(arrRegisterStatutes[i]);
        button.addEventListener('click', (e: any)=> {

          const button = (e.currentTarget as HTMLDivElement);
          const index = e.currentTarget.id.split('-')[2];
          console.log('index', index);
          const divBody = ((this._SfRegisterContainer.querySelector('.calendar-right-data') as HTMLDivElement).querySelector('#register-body-'+ index) as HTMLDivElement);
          if(divBody.classList.contains('hide')) {
            divBody.classList.remove('hide')
            button.setAttribute('part','register-section-title-selected');
          } else {
            divBody.classList.add('hide')
            button.setAttribute('part','register-section-title-not-selected');
          }

        });

      }

    } else {
      const index = 0;
      this.selectedCountryTab = index
      this.renderRegisterEvents(events);
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

    //console.log('end date calendar', endDateCalendar);
    //console.log('end date chosen', endDateChosen);

    if(endDateChosen.getTime() > endDateCalendar.getTime()) {
      return false;
    } else {
      return true;
    }
  }

  attachHandlers = (eventContainer: HTMLDivElement, valueStart: string, valueEnd: string) => {

    const radioCompleteness = eventContainer.querySelector('#radio-completeness') as HTMLButtonElement;
    radioCompleteness?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_COMPLETENESS;
      this.renderRangeEvents(new Date(valueStart), (new Date(valueEnd).getTime() - new Date(valueStart).getTime())/(1000*60*60*24), eventContainer);
      this.renderCompletenessGraph(eventContainer);
      this.attachHandlers(eventContainer, valueStart, valueEnd);
      
    });

    const radioTimeliness = eventContainer.querySelector('#radio-timeliness') as HTMLButtonElement;
    radioTimeliness?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_TIMELINESS;
      //console.log('setting flow graph to ', this.flowGraph);
      this.renderRangeEvents(new Date(valueStart), (new Date(valueEnd).getTime() - new Date(valueStart).getTime())/(1000*60*60*24), eventContainer);
      this.renderTimelinessGraph(eventContainer)
      this.attachHandlers(eventContainer, valueStart, valueEnd);
      
    });

    const radioRisk = eventContainer.querySelector('#radio-risk') as HTMLButtonElement;
    radioRisk?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_RISKAREAS;
      //console.log('setting flow graph to ', this.flowGraph);
      this.renderRangeEvents(new Date(valueStart), (new Date(valueEnd).getTime() - new Date(valueStart).getTime())/(1000*60*60*24), eventContainer);
      this.renderRiskGraph(eventContainer)
      this.attachHandlers(eventContainer, valueStart, valueEnd);
      
    });

    const radioFunction = eventContainer.querySelector('#radio-function') as HTMLButtonElement;
    radioFunction?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_FUNCTION;
      this.renderRangeEvents(new Date(valueStart), (new Date(valueEnd).getTime() - new Date(valueStart).getTime())/(1000*60*60*24), eventContainer);
      this.renderFunctionGraph(eventContainer)
      this.attachHandlers(eventContainer, valueStart, valueEnd);
      
    });


    const radioRiskSeverity = eventContainer.querySelector('#radio-riskseverity') as HTMLButtonElement;
    radioRiskSeverity?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_RISKSEVERITY;
      this.renderRangeEvents(new Date(valueStart), (new Date(valueEnd).getTime() - new Date(valueStart).getTime())/(1000*60*60*24), eventContainer);
      this.renderRiskSeverityGraph(eventContainer)
      this.attachHandlers(eventContainer, valueStart, valueEnd);

    });

    const radioObligationType = eventContainer.querySelector('#radio-obligationtype') as HTMLButtonElement;
    radioObligationType?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_OBLIGATIONTYPE;
      this.renderRangeEvents(new Date(valueStart), (new Date(valueEnd).getTime() - new Date(valueStart).getTime())/(1000*60*60*24), eventContainer);
      this.renderObligationTypeGraph(eventContainer)
      this.attachHandlers(eventContainer, valueStart, valueEnd);
      
    });

    const radioJurisdiction = eventContainer.querySelector('#radio-jurisdiction') as HTMLButtonElement;
    radioJurisdiction?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_JURISDICTION;
      this.renderRangeEvents(new Date(valueStart), (new Date(valueEnd).getTime() - new Date(valueStart).getTime())/(1000*60*60*24), eventContainer);
      this.renderJurisdictionGraph(eventContainer)
      this.attachHandlers(eventContainer, valueStart, valueEnd);
      
    });

    const radioFrequency = eventContainer.querySelector('#radio-frequency') as HTMLButtonElement;
    radioFrequency?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_FREQUENCY;
      this.renderRangeEvents(new Date(valueStart), (new Date(valueEnd).getTime() - new Date(valueStart).getTime())/(1000*60*60*24), eventContainer);
      this.renderFrequencyGraph(eventContainer)
      this.attachHandlers(eventContainer, valueStart, valueEnd);
      
    });


    const radioSubcategory = eventContainer.querySelector('#radio-subcategory') as HTMLButtonElement;
    radioSubcategory?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_SUBCATEGORY;
      this.renderRangeEvents(new Date(valueStart), (new Date(valueEnd).getTime() - new Date(valueStart).getTime())/(1000*60*60*24), eventContainer);
      this.renderSubcategoryGraph(eventContainer)
      this.attachHandlers(eventContainer, valueStart, valueEnd);
      
    });
    

    const radioLocation = eventContainer.querySelector('#radio-location') as HTMLButtonElement;
    radioLocation?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_LOCATION;
      this.renderRangeEvents(new Date(valueStart), (new Date(valueEnd).getTime() - new Date(valueStart).getTime())/(1000*60*60*24), eventContainer);
      this.renderLocationGraph(eventContainer)
      this.attachHandlers(eventContainer, valueStart, valueEnd);
      
    });

    // const buttonStatusMore = (this._SfCustomContainer as HTMLDivElement).querySelector('#button-status-more');
    // buttonStatusMore?.addEventListener('click', () => {

    //   const divStatusList = (this._SfCustomContainer as HTMLDivElement).querySelectorAll('.late-statuses') as NodeListOf<HTMLDivElement>;
    //   for(var i = 0; i < divStatusList.length; i++) {
    //     divStatusList[i].style.display = 'flex';
    //   }
    //   (buttonStatusMore as HTMLButtonElement).style.display = 'none';

    // });

  }

  processFindSelection = async (eventContainer: HTMLDivElement, searchString: string) => {
    var startDateCalendar = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + this.calendarStartYYYY);
    var endDateCalendar = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + (parseInt(this.calendarStartYYYY) + 1));

    const tsStart = new Date(startDateCalendar);
    const tsEnd = new Date(endDateCalendar);
    tsStart.setDate(tsStart.getDate() - 2);
    tsEnd.setDate(tsEnd.getDate() + 2);

    //console.log('tsstart', tsStart);
    //console.log('tsend', tsEnd);
    
    // await this.fetchUserCalendar_2(tsStart.getMonth() + "/" + tsStart.getDate() + "/" + tsStart.getFullYear(), valueEnd.split('-')[1] + "/" + valueEnd.split('-')[2] + "/" + valueEnd.split('-')[0]);
    await this.fetchAndYearlyRenderUserCalendar_2((tsStart.getMonth() + 1) + "/" + tsStart.getDate() + "/" + tsStart.getFullYear(), (tsEnd.getMonth() + 1) + "/" + tsEnd.getDate() + "/" + tsEnd.getFullYear(), searchString);
    this.renderRangeEvents(startDateCalendar, ((endDateCalendar.getTime()+24*60*60*1000) - startDateCalendar.getTime())/(1000*60*60*24), (this._SfFindContainer as HTMLDivElement));

    this.attachHandlers(eventContainer, this.calendarStartMM + '/' + this.calendarStartDD + '/' + this.calendarStartYYYY, this.calendarStartMM + '/' + this.calendarStartDD + '/' + (parseInt(this.calendarStartYYYY) + 1));

    if(eventContainer.innerHTML.indexOf('myChart') >= 0) {
  
      this.renderComplianceGraph(eventContainer);

    }
  }

  processDateSelection = async (eventContainer: HTMLDivElement) => {

    var startDateCalendar = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + this.calendarStartYYYY);
    var endDateCalendar = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + (parseInt(this.calendarStartYYYY) + 1));

    var valueStart = ((this._SfCustomContainer as HTMLDivElement).querySelector('#stream-start-date') as HTMLInputElement).value;
    if(valueStart == "") {
      valueStart = ((this._SfCustomContainer as HTMLDivElement).querySelector('#stream-start-date-mobile') as HTMLInputElement).value;
    }
    var valueEnd = ((this._SfCustomContainer as HTMLDivElement).querySelector('#stream-end-date') as HTMLInputElement).value;
    if(valueEnd == "") {
      valueEnd = ((this._SfCustomContainer as HTMLDivElement).querySelector('#stream-end-date-mobile') as HTMLInputElement).value;
    }

    //console.log('valuestart', valueStart);
    //console.log('valueend', valueEnd);


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
      const tsStart = new Date(valueStart);
      const tsEnd = new Date(valueEnd);
      tsStart.setDate(tsStart.getDate() - 2);
      tsEnd.setDate(tsEnd.getDate() + 2);

      //console.log('tsstart', tsStart);
      //console.log('tsend', tsEnd);
      
      // await this.fetchUserCalendar_2(tsStart.getMonth() + "/" + tsStart.getDate() + "/" + tsStart.getFullYear(), valueEnd.split('-')[1] + "/" + valueEnd.split('-')[2] + "/" + valueEnd.split('-')[0]);
      await this.fetchAndYearlyRenderUserCalendar_2((tsStart.getMonth() + 1) + "/" + tsStart.getDate() + "/" + tsStart.getFullYear(), (tsEnd.getMonth() + 1) + "/" + tsEnd.getDate() + "/" + tsEnd.getFullYear());
      this.renderRangeEvents(new Date(valueStart), ((new Date(valueEnd).getTime()+24*60*60*1000) - new Date(valueStart).getTime())/(1000*60*60*24), (this._SfCustomContainer as HTMLDivElement));
    } else if(valueStart != "" && valueEnd == "") {
      (this._SfStreamEventStatus as HTMLDivElement).innerHTML = "Please select End Date";
    } else if(valueStart == "" && valueEnd != "") {
      (this._SfStreamEventStatus as HTMLDivElement).innerHTML = "Please select Start Date";
    } else {
      (this._SfStreamEventStatus as HTMLDivElement).innerHTML = "Please select Start Date and End Date";
    }

    this.attachHandlers(eventContainer, valueStart, valueEnd);

    if(eventContainer.innerHTML.indexOf('myChart') >= 0) {
  
      this.renderComplianceGraph(eventContainer);

    }
    
  }

  initFindRightCol = () => {

    var html = "";

    html += '<div id="stream-event-0" part="stream-event-list" class="stream-event-list">';
      html += '<div part="stream-event-not-selected" class="d-flex stream-event-not-selected">';
      html += '<div><h2 id="stream-event-status">Type something and press enter</h2></div>';
      html += '</div>';
    html += '</div>';


    (this._SfFindContainer as HTMLDivElement).querySelector('.calendar-right-data')!.innerHTML = html

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

    //console.log('checkAndShowBulk', inputArr.length);

    for(var i = 0; i < inputArr.length; i++) {

      //console.log(inputArr[i].checked);
      if(inputArr[i].checked) {
        checked++;
      }
      
    }

    //console.log('checkAndShowBulk', checked);

    if(checked > 1) {
      return true;
    }

    return false;

  }

  calculateAndShowSummary = () => {

    //console.log('showing summary',this.mappedValuesUsers);

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

    //console.log('showing summary', mapped, Object.keys(this.mappedValuesUsers).length);

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

    //console.log('updateinallselections', param, value);

    const inputArr = (this._SfMappingContainer as HTMLDivElement).querySelectorAll('.input-checkbox') as NodeListOf<HTMLInputElement>;
    const inputDatesArr = (this._SfMappingContainer as HTMLDivElement).querySelectorAll('.input-dates') as NodeListOf<HTMLInputElement>;
    const divDatesArr = (this._SfMappingContainer as HTMLDivElement).querySelectorAll('.div-dates') as NodeListOf<HTMLDivElement>;
    const inputTagsArr = (this._SfMappingContainer as HTMLDivElement).querySelectorAll('.input-tags') as NodeListOf<SfIForm>;
    const divTagsArr = (this._SfMappingContainer as HTMLDivElement).querySelectorAll('.div-tags') as NodeListOf<HTMLDivElement>;
    const inputUsersArr = (this._SfMappingContainer as HTMLDivElement).querySelectorAll('.input-users') as NodeListOf<SfIForm>;
    const divUsersArr = (this._SfMappingContainer as HTMLDivElement).querySelectorAll('.div-users') as NodeListOf<HTMLDivElement>;

    for(var i = 0; i < inputArr.length; i++) {
      //console.log('updateinallselections', i);
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
    //console.log('clickindex', clickIndex);
    if(value.length > 0) {
      ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-status-'+clickIndex) as HTMLDivElement).innerHTML = '<span class="material-icons color-done">check_circle</done>'
    } else {
      ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-status-'+clickIndex) as HTMLDivElement).innerHTML = '<span class="material-icons color-pending">pending</done>'
    }
  }

  filterEventsInWindow = (tags: Array<string>, _ctx: any, divContainer: HTMLDivElement | null) => {

    const arrData = [];

    //console.log('window', this.eventsInWindow, ctx);

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
            //console.log('plot approved', event.approved)
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

    //console.log(arrData);

    const dataSetApproved = [];
    const dataSetInProgress = [];
    const dataSetNotStarted = [];

    for(i = 0; i < arrData.length; i++) {

      dataSetApproved.push(arrData[i][0]);
      dataSetInProgress.push(arrData[i][1]);
      dataSetNotStarted.push(arrData[i][2]);

    }

    //console.log('plotting dataset', dataSetApproved, dataSetInProgress, dataSetNotStarted);

    const tagsCompressed = [];

    for(i = 0; i < tags.length; i++) {
      tagsCompressed.push(this.truncate(tags[i].split(';')[0], 20, false, false));
    }

    if(divContainer != null) {
      this.clearGraph(divContainer, 1);
      this.showGraph(divContainer, 4);
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

      const ctx4 = divContainer?.querySelector('#myChart4') as ChartItem;
      (divContainer?.querySelector('#myChart4') as HTMLCanvasElement).classList.remove('gone');
      
      if(this.fill == "solid") {

        this.renderChart4(ctx4, 'bar', data, "Custom Plot")

      } else {

        this.renderChart4(ctx4, 'bar', data, "Custom Plot")

      }

      

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

      const ctx4 = divContainer?.querySelector('#myChart4') as ChartItem;
      (divContainer?.querySelector('#myChart4') as HTMLCanvasElement).classList.remove('gone');
      
      if(this.fill == "solid") {

        this.renderChart4(ctx4, 'bar', data, "Custom Plot")

      } else {

        this.renderChart4(ctx4, 'bar', data, "Custom Plot")

      }

      // this.renderChart(ctx, 'bar', data, "Custom Plot")

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
    (this._SfOnboardingExtensionsContainer as HTMLDivElement).style.display = 'none';
    (this._SfOnboardingAlertSchedulesContainer as HTMLDivElement).style.display = 'none';
    (this._SfOnboardingActivationsContainer as HTMLDivElement).style.display = 'none';
    (this._SfOnboardingInvalidationsContainer as HTMLDivElement).style.display = 'none';
    (this._SfOnboardingTriggersContainer as HTMLDivElement).style.display = 'none';
    (this._SfOnboardingInternalControlsContainer as HTMLDivElement).style.display = 'none';
    (this._SfOnboardingSignoffContainer as HTMLDivElement).style.display = 'none';
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
    (this._SfOnboardingExtensionsContainer as HTMLDivElement).innerHTML = '';
    (this._SfOnboardingAlertSchedulesContainer as HTMLDivElement).innerHTML = '';
    (this._SfOnboardingActivationsContainer as HTMLDivElement).innerHTML = '';
    (this._SfOnboardingInvalidationsContainer as HTMLDivElement).innerHTML = '';
    (this._SfOnboardingTriggersContainer as HTMLDivElement).innerHTML = '';
    (this._SfOnboardingInternalControlsContainer as HTMLDivElement).innerHTML = '';
    (this._SfOnboardingSignoffContainer as HTMLDivElement).innerHTML = '';
    (this._SfOnboardingCalendarContainer as HTMLDivElement).innerHTML = '';

  }

  hideRcmTabContainers = async () => {

    (this._SfRcmComplianceContainer as HTMLDivElement).style.display = 'none';
    (this._SfRcmProjectsContainer as HTMLDivElement).style.display = 'none';
    (this._SfRcmDateContainer as HTMLDivElement).style.display = 'none';
    (this._SfRcmConfirmContainer as HTMLDivElement).style.display = 'none';
    (this._SfRcmJobsContainer as HTMLDivElement).style.display = 'none';
    
    (this._SfRcmComplianceContainer as HTMLDivElement).innerHTML = '';
    (this._SfRcmProjectsContainer as HTMLDivElement).innerHTML = '';
    (this._SfRcmDateContainer as HTMLDivElement).innerHTML = '';
    (this._SfRcmConfirmContainer as HTMLDivElement).innerHTML = '';
    (this._SfRcmJobsContainer as HTMLDivElement).innerHTML = '';
    

  }

  loadRcmNotifications = async () => {

    const notifs = await this.fetchRcmNotifications(this.projectId);
    //console.log('notifs', notifs);
    this.renderRcmNotifications(notifs);

  }

  loadRcmCompliances = async () => {

    this.hideRcmTabContainers();
    (this._SfRcmComplianceContainer as HTMLDivElement).style.display = 'flex';

    const compliances: Array<any> = [];

    var nextBackwardTokenOrig = '';

    const tempCompliances: Array<string> = [];

    while(true) {

      const updatedCompliances = await this.fetchUpdatedCompliances(nextBackwardTokenOrig);
      //console.log('updatedCompliances', updatedCompliances.data.length);

      const nextBackwardTokenNew = updatedCompliances.nextBackwardToken;

      //console.log('comparison', nextBackwardTokenNew, nextBackwardTokenOrig);
  
      if(nextBackwardTokenOrig == nextBackwardTokenNew) {
        //console.log('breaking...');
        break;
      } else {
        nextBackwardTokenOrig = nextBackwardTokenNew;
      }

      for(var i = 0; i < updatedCompliances.data.length; i++) {
        const event = JSON.parse(updatedCompliances.data[i].message);
        //console.log(i, 'event op', JSON.parse(event.req.body).id);
        if(event.op == "update") {
          if(!tempCompliances.includes(JSON.parse(event.req.body).id)) {
            compliances.push(JSON.parse(event.req.body));
            tempCompliances.push(JSON.parse(event.req.body).id);
          }
          
        }
      }

      //console.log('compliances', compliances);

    }

    if(compliances.length > 0) {
      this.renderRcmCompliances(compliances);
      const arrCompliances = [];
      for(var i = 0; i < compliances.length; i++) {
        arrCompliances.push(compliances[i].id);
      }
      //console.log('compliances 2', arrCompliances);
      const lockedCompliances = await this.fetchRcmLockedCompliances(arrCompliances);
      //console.log('compliances 2 locked', lockedCompliances);
      this.renderRcmLockedCompliances(lockedCompliances);

      (this._SfRcmComplianceContainer as HTMLDivElement).querySelector('#cb-completed')?.addEventListener('change', (e: any) => {

        const cb = (e.currentTarget as HTMLInputElement);
        if(cb.checked) {
          this.renderRcmUnlockedCompliances(lockedCompliances);
        } else {
          this.renderRcmLockedCompliances(lockedCompliances);
        }
  
      });
  
      const arrButtons = (this._SfRcmComplianceContainer as HTMLDivElement).querySelectorAll('.buttonselect-icon') as NodeListOf<HTMLButtonElement>;
      for(i = 0; i < arrButtons.length; i++) {
  
        arrButtons[i].addEventListener('click', (e: any) => {
  
          const id = e.currentTarget.id.replace('button-', '');
          var index = -1;
          for(var j = 0; j < compliances.length; j++) {
            if(compliances[j].id == id) {
              index = j;
            }
          }
          //console.log(id, index, compliances[index]);
          this.rcmSelectedCompliance = compliances[index];
          ((this._SfRcmTabContainer as HTMLDivElement).querySelector('#rcm-tab-projects') as HTMLButtonElement).click();
  
        })
  
      }
  
      const arrLockButtons = (this._SfRcmComplianceContainer as HTMLDivElement).querySelectorAll('.button-lock-icon') as NodeListOf<HTMLButtonElement>;
      for(i = 0; i < arrLockButtons.length; i++) {
  
        arrLockButtons[i].addEventListener('click', async (e: any) => {
  
          const index = e.currentTarget.id.replace('button-lock-', '');
          await this.fetchUpdateRcmLock(index);
          this.loadRcmCompliances();
          
        })
  
      }

    }

  }

  loadRcmProjects = async () => {

    //console.log('loadRcmProjects');
    this.hideRcmTabContainers();
    (this._SfRcmProjectsContainer as HTMLDivElement).style.display = 'flex';
    this.renderRcmSelectedComplianceInProject((this._SfRcmProjectsContainer as HTMLDivElement));

    var mappedProjects;
    if(this.rcmSelectedCompliance != null) {
      mappedProjects = await this.fetchMappedProjects();
      //console.log('mappedProjects', mappedProjects.data);
    }

    const projects = [];

    if(mappedProjects != null) {
      for(var i = 0; i < mappedProjects.data.length; i++) {

        const projectDetail = await this.fetchDetailProject(mappedProjects.data[i]['projectid']['S']);
        projects.push(projectDetail.data.value);
  
      }
  
    }
    
    this.rcmSelectedProjects = projects;

    this.renderRcmProjects((this._SfRcmProjectsContainer as HTMLDivElement), this.rcmSelectedProjects);

    if(this.rcmSelectedProjects != null && this.rcmSelectedProjects.length > 0) {
      this.renderRcmProceed((this._SfRcmProjectsContainer as HTMLDivElement), (this._SfRcmTabContainer as HTMLDivElement).querySelector('#rcm-tab-date'));
    }
  }

  loadRcmDate = async () => {

    //console.log('loadRcmDate');
    this.hideRcmTabContainers();
    (this._SfRcmDateContainer as HTMLDivElement).style.display = 'flex';
    this.renderRcmDate((this._SfRcmDateContainer as HTMLDivElement));
    this.renderRcmSelectedComplianceInProject((this._SfRcmDateContainer as HTMLDivElement));
    //console.log('projects', this.rcmSelectedProjects);
    this.renderRcmProjects((this._SfRcmDateContainer as HTMLDivElement), this.rcmSelectedProjects);

    if(this.rcmSelectedProjects != null && this.rcmSelectedProjects.length > 0) {
      this.renderRcmProceed((this._SfRcmDateContainer as HTMLDivElement), (this._SfRcmTabContainer as HTMLDivElement).querySelector('#rcm-tab-jobs'));
    }

    ((this._SfRcmDateContainer as HTMLDivElement).querySelector('#rcm-date') as HTMLInputElement)?.addEventListener('change', (e: any) => {
      this.rcmSelectedDate = (e.currentTarget as HTMLInputElement).value;
      //console.log(this.rcmSelectedDate);
    });

    ((this._SfRcmDateContainer as HTMLDivElement).querySelector('#rcm-message') as HTMLInputElement)?.addEventListener('change', (e: any) => {
      this.rcmSelectedMessage = (e.currentTarget as HTMLInputElement).value;
      //console.log(this.rcmSelectedMessage);
    });


  }

  loadRcmJobs = async () => {

    //console.log('loadRcmJobs');
    this.hideRcmTabContainers();
    (this._SfRcmJobsContainer as HTMLDivElement).style.display = 'flex';

    if(this.rcmSelectedCompliance != null) {
      const jobs = await this.fetchRcmJobs(this.rcmSelectedCompliance.id);
      //console.log('jobs', jobs, this.rcmSelectedDate, this.rcmSelectedMessage); 
      if(this.rcmSelectedDate != null && this.rcmSelectedMessage != null) {
        this.renderRcmJobs((this._SfRcmJobsContainer as HTMLDivElement));
        this.renderRcmSelectedDate((this._SfRcmJobsContainer as HTMLDivElement));
      }
      this.renderRcmSelectedComplianceInProject((this._SfRcmJobsContainer as HTMLDivElement));
      this.renderRcmProjects((this._SfRcmJobsContainer as HTMLDivElement), this.rcmSelectedProjects);
      this.renderRcmSelectedJobs((this._SfRcmJobsContainer as HTMLDivElement), jobs);
      
      //console.log('projects', this.rcmSelectedProjects);
      ((this._SfRcmJobsContainer as HTMLDivElement).querySelector('#button-submit') as HTMLButtonElement)?.addEventListener('click', async () => {
        //console.log(this.rcmSelectedCompliance);
        await this.fetchCreateRcmJob(this.rcmSelectedCompliance.id, this.rcmSelectedCompliance, this.rcmSelectedDate, this.rcmSelectedMessage, this.rcmSelectedProjects);
        this.loadRcmJobs();
      });
    } else {

    }
     
    
  }
  
  loadOnboardingStatutes = async () => {
    this.hideTabContainers();
    (this._SfOnboardingStatutesContainer as HTMLDivElement).style.display = 'flex';
    const mappedStatutes = await this.fetchMappedStatutes();
    //console.log('mappedstatutes', mappedStatutes);
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
    //console.log('countriesJobs', countriesJobs);
    //console.log('mappedCompliances', mappedCompliances);
    //console.log('mappedCountries', mappedCountries);


    for(var i = 0; i < mappedCompliances.data.mappings.mappings.length; i++) {

      if(mappedCompliances.data.mappings.mappings[i].id == "33a0deab-e93e-41b7-831a-473f9ea3eea2") {
        //console.log('uniqcol zero', mappedCompliances.data.mappings.mappings[i]);
      }

    }
    this.renderOnboardingCountries(mappedCountries, mappedCompliances, countriesJobs);
  }

  loadOnboardingEntities = async () => {
    this.hideTabContainers();
    (this._SfOnboardingEntitiesContainer as HTMLDivElement).style.display = 'flex';
    const entitiesJobs = await this.fetchEntitiesJobs();
    const mappedEntities = await this.fetchMappedEntities();
    const mappedSerializedCountries = await this.fetchMappedSerializedCountries();
    const arrStatuteEntitiesApplicabilities = await this.loadProposedFromStatutes(1);
    // const mappedStatutes = await this.fetchMappedStatutes();
    //console.log('mappedSerializedCountries', mappedSerializedCountries);
    //console.log('mappedEntities', mappedEntities);
    //console.log('entitiesApplicabilities', arrStatuteEntitiesApplicabilities);
    this.renderOnboardingEntities(mappedEntities, mappedSerializedCountries, entitiesJobs, arrStatuteEntitiesApplicabilities);
  }

  loadOnboardingLocations = async () => {
    this.hideTabContainers();
    (this._SfOnboardingLocationsContainer as HTMLDivElement).style.display = 'flex';
    const locationsJobs = await this.fetchLocationsJobs();
    const mappedSerializedEntities = await this.fetchMappedSerializedEntities();
    const mappedLocations = await this.fetchMappedLocations();
    //console.log('mappedserializedentities', mappedSerializedEntities);
    //console.log('mappedlocations', mappedLocations);
    this.renderOnboardingLocations(mappedLocations, mappedSerializedEntities, locationsJobs);
  }

  loadOnboardingFunctions = async () => {
    this.hideTabContainers();
    (this._SfOnboardingFunctionsContainer as HTMLDivElement).style.display = 'flex';
    const functionsJobs = await this.fetchFunctionJobs();
    const mappedSerializedLocations = await this.fetchMappedSerializedLocations();
    const mappedFunctions = await this.fetchMappedFunctions();
    //console.log('functionjobs', functionsJobs);
    //console.log('mappedserializedlocations', mappedSerializedLocations);
    //console.log('mappedfunctions', mappedFunctions);
    this.renderOnboardingFunctions(mappedFunctions, mappedSerializedLocations, functionsJobs);
  }

  loadOnboardingTags = async () => {
    this.hideTabContainers();
    (this._SfOnboardingTagsContainer as HTMLDivElement).style.display = 'flex';
    const tagsJobs = await this.fetchTagsJobs();
    const mappedSerializedLocations = await this.fetchMappedSerializedLocations();
    const mappedTags = await this.fetchMappedTags();
    //console.log('mappedSerializedLocations', mappedSerializedLocations);
    //console.log('mappedtags', mappedTags);
    this.renderOnboardingTags(mappedTags, mappedSerializedLocations, tagsJobs);
  }

  loadProposedFromStatutes = async (fieldIndex: number) => {
    const mappedStatutes = await this.fetchMappedStatutes();
    //console.log('mappedstatutes', mappedStatutes);
    const arrStatuteReporters : any = {}
    for(var i = 0; i < mappedStatutes.data.mappings.mappings.length; i++) {

      if(arrStatuteReporters[mappedStatutes.data.mappings.mappings[i].countryname] == null) {
        arrStatuteReporters[mappedStatutes.data.mappings.mappings[i].countryname] = {}
      }
      if(arrStatuteReporters[mappedStatutes.data.mappings.mappings[i].countryname][mappedStatutes.data.mappings.mappings[i].statutename.trim()] == null) {
        arrStatuteReporters[mappedStatutes.data.mappings.mappings[i].countryname][mappedStatutes.data.mappings.mappings[i].statutename.trim()] = {}
      }
      
      arrStatuteReporters[mappedStatutes.data.mappings.mappings[i].countryname][mappedStatutes.data.mappings.mappings[i].statutename.trim()] = mappedStatutes.data.mappings.mappings[i].extraFields[fieldIndex];
    }
    //console.log('mappedstatutesend', arrStatuteReporters);
    return arrStatuteReporters;
  }

  loadOnboardingReporters = async () => {
    this.hideTabContainers();
    (this._SfOnboardingReportersContainer as HTMLDivElement).style.display = 'flex';
    const reportersJobs = await this.fetchReportersJobs();
    const mappedSerializedLocations = await this.fetchMappedSerializedLocations();
    const mappedReporters = await this.fetchMappedReporters();
    // const arrStatuteReporters = await this.loadProposedFromStatutes(1);
    //console.log('mappedSerializedLocations', mappedSerializedLocations);
    //console.log('mappedreporters', mappedReporters);
    //console.log('arrstatutereporters', arrStatuteReporters);
    this.renderOnboardingReporters(mappedReporters, mappedSerializedLocations, reportersJobs, null);
  }

  loadOnboardingApprovers = async () => {
    this.hideTabContainers();
    (this._SfOnboardingApproversContainer as HTMLDivElement).style.display = 'flex';
    const approversJobs = await this.fetchApproversJobs();
    const mappedSerializedLocations = await this.fetchMappedSerializedLocations();
    const mappedApprovers = await this.fetchMappedApprovers();
    // const arrStatuteApprovers = await this.loadProposedFromStatutes(2);
    //console.log('mappedserializedlocations', mappedSerializedLocations);
    //console.log('mappedapprovers', mappedApprovers);
    this.renderOnboardingApprovers(mappedApprovers, mappedSerializedLocations, approversJobs, null);
  }

  loadOnboardingFunctionHeads = async () => {
    this.hideTabContainers();
    (this._SfOnboardingFunctionHeadsContainer as HTMLDivElement).style.display = 'flex';
    const functionHeadsJobs = await this.fetchFunctionHeadsJobs();
    const mappedSerializedLocations = await this.fetchMappedSerializedLocations();
    const mappedFunctionHeads = await this.fetchMappedFunctionHeads();
    // const arrStatuteFunctionheads = await this.loadProposedFromStatutes(3);
    //console.log('mappedserializedlocations', mappedSerializedLocations);
    //console.log('mappedfunctionheads', mappedFunctionHeads);
    this.renderOnboardingFunctionHeads(mappedFunctionHeads, mappedSerializedLocations, functionHeadsJobs, null);
  }

  loadOnboardingViewers = async () => {
    this.hideTabContainers();
    (this._SfOnboardingViewersContainer as HTMLDivElement).style.display = 'flex';
    const makerViewersJobs = await this.fetchViewersJobs();
    const mappedSerializedLocations = await this.fetchMappedSerializedLocations();
    const mappedViewers = await this.fetchMappedViewers();
    // const arrStatuteViewers = await this.loadProposedFromStatutes(5);
    //console.log('mappedSerializedLocations', mappedSerializedLocations);
    //console.log('mappedViewers', mappedViewers);
    this.renderOnboardingViewers(mappedViewers, mappedSerializedLocations, makerViewersJobs, null);
  }

  loadOnboardingDocs = async () => {
    this.hideTabContainers();
    (this._SfOnboardingDocsContainer as HTMLDivElement).style.display = 'flex';
    const docsJobs = await this.fetchDocsJobs();
    const mappedSerializedLocations = await this.fetchMappedSerializedLocations();
    const mappedDocs = await this.fetchMappedDocs();
    //console.log('mappedSerializedLocations', mappedSerializedLocations);
    //console.log('mappedDocs', mappedDocs);
    this.renderOnboardingDocs(mappedDocs, mappedSerializedLocations, docsJobs);
  }

  loadOnboardingMakerCheckers = async () => {
    this.hideTabContainers();
    (this._SfOnboardingMakerCheckersContainer as HTMLDivElement).style.display = 'flex';
    const makerCheckersJobs = await this.fetchMakerCheckersJobs();
    const mappedSerializedLocations = await this.fetchMappedSerializedLocations();
    const mappedMakerCheckers = await this.fetchMappedMakerCheckers();
    //console.log('mappedSerializedLocations', mappedSerializedLocations);
    //console.log('mappedMakerCheckers', mappedMakerCheckers);
    this.renderOnboardingMakerCheckers(mappedMakerCheckers, mappedSerializedLocations, makerCheckersJobs);
  }

  loadOnboardingAuditors = async () => {
    this.hideTabContainers();
    (this._SfOnboardingAuditorsContainer as HTMLDivElement).style.display = 'flex';
    const auditorsJobs = await this.fetchAuditorsJobs();
    const mappedSerializedLocations = await this.fetchMappedSerializedLocations();
    const mappedAuditors = await this.fetchMappedAuditors();
    // const arrStatuteAuditors = await this.loadProposedFromStatutes(4);
    //console.log('mappedSerializedFunctionheads', mappedSerializedLocations);
    //console.log('mappedAuditors', mappedAuditors);
    this.renderOnboardingAuditors(mappedAuditors, mappedSerializedLocations, auditorsJobs, null);
  }

  loadOnboardingDuedates = async () => {
    this.hideTabContainers();
    (this._SfOnboardingDuedatesContainer as HTMLDivElement).style.display = 'flex';
    const duedatesJobs = await this.fetchDueDatesJobs();
    const mappedSerializedLocations = await this.fetchMappedSerializedLocations();
    const mappedDuedates = await this.fetchMappedDuedates();
    //console.log('mappedSerializedLocations', mappedSerializedLocations);
    //console.log('mappedduedates', mappedDuedates);
    this.renderOnboardingDuedates(mappedDuedates, mappedSerializedLocations, duedatesJobs);
  }

  loadOnboardingActivations = async () => {
    this.hideTabContainers();
    (this._SfOnboardingActivationsContainer as HTMLDivElement).style.display = 'flex';
    const activationsJobs = await this.fetchExtensionsJobs();
    const mappedSerializedLocations = await this.fetchMappedSerializedLocations();
    const mappedActivations = await this.fetchMappedActivations();
    //console.log('mappedserializedlocations', mappedSerializedLocations);
    //console.log('mappedactivations', mappedActivations);
    this.renderOnboardingActivations(mappedActivations, mappedSerializedLocations, activationsJobs);
  }

  loadOnboardingInvalidations = async () => {
    this.hideTabContainers();
    (this._SfOnboardingInvalidationsContainer as HTMLDivElement).style.display = 'flex';
    const invalidationsJobs = await this.fetchExtensionsJobs();
    const mappedSerializedLocations = await this.fetchMappedSerializedLocations();
    const mappedInvalidations = await this.fetchMappedInvalidations();
    //console.log('mappedserializedlocations', mappedSerializedLocations);
    //console.log('mappedinvalidations', mappedInvalidations);
    this.renderOnboardingInvalidations(mappedInvalidations, mappedSerializedLocations, invalidationsJobs);
  }
  
  loadOnboardingAlertSchedules = async () => {
    this.hideTabContainers();
    (this._SfOnboardingAlertSchedulesContainer as HTMLDivElement).style.display = 'flex';
    const alertschedulesJobs = await this.fetchAlertSchedulesJobs();
    const mappedSerializedLocations = await this.fetchMappedSerializedLocations();
    const mappedAlertSchedules = await this.fetchMappedAlertSchedules();
    //console.log('mappedserializedlocations', mappedSerializedLocations);
    //console.log('mappedalertschedules', mappedAlertSchedules);
    this.renderOnboardingAlertSchedules(mappedAlertSchedules, mappedSerializedLocations, alertschedulesJobs);
  }

  loadOnboardingExtensions = async () => {
    this.hideTabContainers();
    (this._SfOnboardingExtensionsContainer as HTMLDivElement).style.display = 'flex';
    const extensionsJobs = await this.fetchExtensionsJobs();
    const mappedSerializedLocations = await this.fetchMappedSerializedLocations();
    const mappedExtensions = await this.fetchMappedExtensions();
    //console.log('mappedserializedlocations', mappedSerializedLocations);
    //console.log('mappedextensions', mappedExtensions);
    this.renderOnboardingExtensions(mappedExtensions, mappedSerializedLocations, extensionsJobs);
  }

  loadOnboardingTriggers = async () => {
    this.hideTabContainers();
    (this._SfOnboardingTriggersContainer as HTMLDivElement).style.display = 'flex';
    // const triggersJobs = await this.fetchInternalControlsJobs();
    // const mappedSerializedAlertSchedules = await this.fetchMappedSerializedAlertSchedules();
    const mappedSerializedLocations = await this.fetchMappedSerializedLocations();
    const mappedTriggers = await this.fetchMappedTriggers();
    //console.log('mappedSerializedAlertSchedules', mappedSerializedAlertSchedules);
    //console.log('mappedTriggers', mappedTriggers);
    this.renderOnboardingTriggers(mappedTriggers, mappedSerializedLocations, null);
  }

  loadOnboardingInternalControls = async () => {
    this.hideTabContainers();
    (this._SfOnboardingInternalControlsContainer as HTMLDivElement).style.display = 'flex';
    const internalcontrolsJobs = await this.fetchInternalControlsJobs();
    const mappedSerializedLocations = await this.fetchMappedSerializedLocations();
    const mappedInternalControls = await this.fetchMappedInternalControls();
    //console.log('mappedSerializedlocations', mappedSerializedLocations);
    //console.log('mappedinternalcontrols', mappedInternalControls);
    this.renderOnboardingInternalControls(mappedInternalControls, mappedSerializedLocations, internalcontrolsJobs);
  }

  loadOnboardingSignoff = async () => {
    this.hideTabContainers();
    (this._SfOnboardingSignoffContainer as HTMLDivElement).style.display = 'flex';
    const signoff = await this.fetchGetSignOff();
    this.renderOnboardingSignoff(signoff);
    //console.log(signoff);
  }

  loadOnboardingCalendar = async () => {
    this.hideTabContainers();
    (this._SfOnboardingCalendarContainer as HTMLDivElement).style.display = 'flex';
    const calendarJobs = await this.fetchCalendarJobs();
    this.renderOnboardingCalendar(calendarJobs);
  }

  calculateStartAndEndDateOfPast = (index: number = 0) => {

    //console.log('calculating start and end of past');

    let block = 10;

    if(index === 0) {

      block = 10;

    } else {

      block = 30;

    }

    let nowMonth = new Date().getMonth() + 1;
    let nowYear = parseInt(this.getCurrentYear(nowMonth + ""));
    let nowDate = new Date(nowYear, new Date().getMonth(), new Date().getDate())

    let currDay = nowDate;
    for(var i = 0; i < block; i++) {
      currDay.setDate(currDay.getDate() - 1);
    }

    const startDate = ("0" + (currDay.getMonth() + 1)).slice(-2) + "/" + ("0" + (currDay.getDate() + 1)).slice(-2) + "/" + currDay.getFullYear();

    // currDay = new Date();
    currDay = nowDate;
    for(var i = 0; i < block; i++) {
      currDay.setDate(currDay.getDate() + 1);
    }

    const endDate = ("0" + (currDay.getMonth() + 1)).slice(-2) + "/" + ("0" + (currDay.getDate() + 1)).slice(-2) + "/" + currDay.getFullYear();

    return {startDate: startDate, endDate: endDate}

  }

  calculateStartAndEndDateOfThis = (index: number = 0) => {

    //console.log('calculating start and end of this');

    let block = 10;
    var firstDate = new Date();
    firstDate = new Date(parseInt(this.getCurrentYear((firstDate.getMonth() + 1) + "")), firstDate.getMonth(), firstDate.getDate())

    if(index === 0) {

      let nowMonth = new Date().getMonth() + 1;
      let nowYear = parseInt(this.getCurrentYear(nowMonth + ""));
      let nowDate = new Date(nowYear, new Date().getMonth(), new Date().getDate())

      firstDate = (this.getFirstDateOfWeek(nowDate) as Date);
      //console.log('this first date', firstDate);
      block = 10;

    }

    if(index === 1) {

      let nowMonth = new Date().getMonth() + 1;
      let nowYear = parseInt(this.getCurrentYear(nowMonth + ""));

      firstDate = new Date(nowYear, new Date().getMonth(), 1);
      //console.log('this first date', firstDate);
      block = 35;

    }

    let sDate = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate());

    let eDate = new Date(sDate.getFullYear(), sDate.getMonth(), sDate.getDate());

    for(var i = 0; i < block; i++) {
      eDate.setDate(eDate.getDate() + 1);
    }

    return {startDate: (sDate.getMonth() + 1) + '/' + sDate.getDate() + '/' + sDate.getFullYear(), endDate: (eDate.getMonth() + 1) + '/' + eDate.getDate() + '/' + eDate.getFullYear()}


  }

  calculateStartAndEndDateOfUpcoming = (index: number = 0) : any => {

    //console.log('calculating start and end of upcoming');

    let nowMonth = new Date().getMonth() + 1;
    let nowYear = parseInt(this.getCurrentYear(nowMonth + ""));

    let currDate = new Date();
    let sDate = new Date(nowYear, currDate.getMonth(), currDate.getDate());
    sDate.setDate(sDate.getDate() - 1);

    let block = 10;
    if(index === 0) {
      block = 8;
    } else if(index === 1) {
      block = 32;
    } else {
      block = 92;
    }

    let eDate = new Date(sDate.getFullYear(), sDate.getMonth(), sDate.getDate());

    for(var i = 0; i < block; i++) {
      eDate.setDate(eDate.getDate() + 1);
    }

    return {startDate: (sDate.getMonth() + 1) + '/' + sDate.getDate() + '/' + sDate.getFullYear(), endDate: (eDate.getMonth() + 1) + '/' + eDate.getDate() + '/' + eDate.getFullYear()}

  }

  calculateStartAndEndDateOfStream = (index: number = 0) => {

    let month = parseInt(this.calendarStartMM);

    //console.log('calculateStartAndEndDateOfStream', index, month);

    for(var j = 0; j < 12; j++) {
      if(j === index) {

        let currentMonth = month;
        let nowMonth = new Date().getMonth() + 1;
        //let nowYear = new Date().getFullYear();
        let nowYear = parseInt(this.getCurrentYear(nowMonth + ""));
        let lastMonth = -1;
        let nextMonth = -1;

        let lastMonthsYear = -1;
        let nextMonthsYear = -1;

        if(currentMonth === 1) {
          // Mar
          lastMonth = 12;
          nextMonth = 2;
          if(nowMonth < parseInt(this.calendarStartMM)) {
            lastMonthsYear = nowYear - 1;
            nextMonthsYear = nowYear;
          } else {
            lastMonthsYear = nowYear;
            nextMonthsYear = nowYear + 1;
          }
          
          
          
        }
        
        if(currentMonth === 2) {
          // Mar
          lastMonth = 1;
          nextMonth = 3;
          if(nowMonth < parseInt(this.calendarStartMM)) {
            lastMonthsYear = nowYear;
            nextMonthsYear = nowYear;
          } else {
            lastMonthsYear = nowYear + 1;
            nextMonthsYear = nowYear + 1;
          }
          
        }

        if(currentMonth === 3) {
          // Mar
          lastMonth = 2;
          nextMonth = 4;
          if(nowMonth < parseInt(this.calendarStartMM)) {
            lastMonthsYear = nowYear;
            nextMonthsYear = nowYear;
          } else {
            lastMonthsYear = nowYear + 1;
            nextMonthsYear = nowYear + 1;
          }
        }

        if(currentMonth === 4) {
          // Mar
          lastMonth = 3;
          nextMonth = 5;
          if(nowMonth < parseInt(this.calendarStartMM)) {
            lastMonthsYear = nowYear - 1;
            nextMonthsYear = nowYear - 1;
          } else {
            lastMonthsYear = nowYear;
            nextMonthsYear = nowYear;
          }
        }

        if(currentMonth === 5) {
          // Mar
          lastMonth = 4;
          nextMonth = 6;
          if(nowMonth < parseInt(this.calendarStartMM)) {
            lastMonthsYear = nowYear - 1;
            nextMonthsYear = nowYear - 1;
          } else {
            lastMonthsYear = nowYear;
            nextMonthsYear = nowYear;
          }
        }

        if(currentMonth === 6) {
          // Mar
          lastMonth = 5;
          nextMonth = 7;
          if(nowMonth < parseInt(this.calendarStartMM)) {
            lastMonthsYear = nowYear - 1;
            nextMonthsYear = nowYear - 1;
          } else {
            lastMonthsYear = nowYear;
            nextMonthsYear = nowYear;
          }
        }

        if(currentMonth === 7) {
          // Mar
          lastMonth = 6;
          nextMonth = 8;
          if(nowMonth < parseInt(this.calendarStartMM)) {
            lastMonthsYear = nowYear - 1;
            nextMonthsYear = nowYear - 1;
          } else {
            lastMonthsYear = nowYear;
            nextMonthsYear = nowYear;
          }
        }

        if(currentMonth === 8) {
          // Mar
          lastMonth = 7;
          nextMonth = 9;
          if(nowMonth < parseInt(this.calendarStartMM)) {
            lastMonthsYear = nowYear - 1;
            nextMonthsYear = nowYear - 1;
          } else {
            lastMonthsYear = nowYear;
            nextMonthsYear = nowYear;
          }
        }

        if(currentMonth === 9) {
          // Mar
          lastMonth = 8;
          nextMonth = 10;
          if(nowMonth < parseInt(this.calendarStartMM)) {
            lastMonthsYear = nowYear - 1;
            nextMonthsYear = nowYear - 1;
          } else {
            lastMonthsYear = nowYear;
            nextMonthsYear = nowYear;
          }
        }

        if(currentMonth === 10) {
          // Mar
          lastMonth = 9;
          nextMonth = 11;
          if(nowMonth < parseInt(this.calendarStartMM)) {
            lastMonthsYear = nowYear - 1;
            nextMonthsYear = nowYear - 1;
          } else {
            lastMonthsYear = nowYear;
            nextMonthsYear = nowYear;
          }
        }

        if(currentMonth === 11) {
          // Mar
          lastMonth = 10;
          nextMonth = 12;
          if(nowMonth < parseInt(this.calendarStartMM)) {
            lastMonthsYear = nowYear - 1;
            nextMonthsYear = nowYear - 1;
          } else {
            lastMonthsYear = nowYear;
            nextMonthsYear = nowYear;
          }
        }

        if(currentMonth === 12) {
          // Mar
          lastMonth = 11;
          nextMonth = 1;
          if(nowMonth < parseInt(this.calendarStartMM)) {
            lastMonthsYear = nowYear - 1;
            nextMonthsYear = nowYear;
          } else {
            lastMonthsYear = nowYear;
            nextMonthsYear = nowYear + 1;
          }
        }

        // //console.log('calculateStartAndEndDateOfStream', currentMonth, index);

        // if(currentMonth <= 11 && currentMonth >= 2) {
        //   lastMonth = parseInt(((currentMonth - 1) + "").slice(-2));
        //   nextMonth = parseInt(((currentMonth + 1) + "").slice(-2));
        // } else if(currentMonth === 12) {
        //   lastMonth = 11;
        //   nextMonth = 1;
        // } else if(currentMonth === 1) {
        //   lastMonth = 12;
        //   nextMonth = 2;
        // }

        // //console.log('last month', lastMonth);
        // //console.log('next month', nextMonth, this.calendarStartMM);

        // // let lastMonthsYear = -1;
        // // let nextMonthsYear = -1;

        // if((lastMonth) >= parseInt(this.calendarStartMM)) {
        //   lastMonthsYear = parseInt(this.calendarStartYYYY);
        // } else {
        //   if(j === 0) {
        //     lastMonthsYear = parseInt(this.calendarStartYYYY);
        //   } else {
        //     lastMonthsYear = parseInt(this.calendarStartYYYY) + 1;
        //   }
          
        // }

        // if((nextMonth) >= parseInt(this.calendarStartMM)) {
        //   nextMonthsYear = parseInt(this.calendarStartYYYY);
        // } else {
        //   nextMonthsYear = parseInt(this.calendarStartYYYY) + 1;
        // }

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

  renderAdhocConfirmed = async (adhocQuestions: any, render: boolean) => {

    for(var i = 0; i < Object.keys(adhocQuestions).length; i++) {
  
      const radioYes = (this._SfAdhocContainer as HTMLDivElement).querySelector('#radio-yes-'+i) as HTMLInputElement;
      console.log(radioYes.checked);

      if(render) {
        if(!radioYes.checked) {
          const divQuestion = ((this._SfAdhocContainer as HTMLDivElement).querySelector('#adhoc-question-'+i) as HTMLDivElement);
          if(divQuestion != null) {
            console.log('divQuestion', divQuestion, render, divQuestion.classList);
            if(!divQuestion.classList.contains('hide')) {
              divQuestion.classList.add('hide');
            }
          }
        }
      } else {
        if(!radioYes.checked) {
          const divQuestion = ((this._SfAdhocContainer as HTMLDivElement).querySelector('#adhoc-question-'+i) as HTMLDivElement);
          if(divQuestion != null) {
            console.log('divQuestion', divQuestion, render, divQuestion.classList);
            if(divQuestion.classList.contains('hide')) {
              divQuestion.classList.remove('hide');
            }
          }
        }
      }

    }

  }

  renderAdhoc = async () => {

    var html = '';
    html += '<div part="stream-event-list" class="p-10 w-100" id="adhoc-list">';
      html += 'Loading ...';
    html += '</div>';
    
    (this._SfAdhocContainer as HTMLDivElement).innerHTML = html;  
    
    const resultAdhoc = await this.fetchAdhoc();
    const adhocQuestions : any = {};
    
    for(var i = 0; i < resultAdhoc.data.events["00/00"].length; i++) {

      if(resultAdhoc.data.events["00/00"][i]['adhocquestion'] != null && resultAdhoc.data.events["00/00"][i]['adhocquestion'].length > 0) {
        if(adhocQuestions[resultAdhoc.data.events["00/00"][i]['adhocquestion'][0].trim()] == null) {
          adhocQuestions[resultAdhoc.data.events["00/00"][i]['adhocquestion'][0].trim()] = [];
        }
        adhocQuestions[resultAdhoc.data.events["00/00"][i]['adhocquestion'][0].trim()].push(resultAdhoc.data.events["00/00"][i]);
      }

    }

    console.log('adhocQuestions', adhocQuestions);

    html = '';

    const arrAllTriggerIds : any = {};

    for(i = 0; i < Object.keys(adhocQuestions).length; i++) {

      // const firstCompliance = adhocQuestions[Object.keys(adhocQuestions)[i]][0];
      // console.log('triggers', i, '=' + firstCompliance.triggers + '=');
      // const firstComplianceTriggers = firstCompliance.triggers == null ? [] : firstCompliance.triggers == "" ? [] : JSON.parse(firstCompliance.triggers);

      html += '<div part="stream-event-selected" id="adhoc-question-'+i+'" class="pl-10 pr-10 pb-20 mb-10">';
      
      html += '<h3 part="results-title" class="mb-0">'+Object.keys(adhocQuestions)[i]+'</h3>';
      html += '<button part="adhoc-compliance-list-count-not-selected" id="compliance-count-'+i+'" class="compliance-count mb-20 mt-10" part="text-view">' + adhocQuestions[Object.keys(adhocQuestions)[i]].length + ' compliance(s) associated</button><br />';
      html += '<div id="compliance-list-body-'+i+'" class="hide">'
      html += '<table class="mb-20">';
      html += '<tr>';
      html += '<td part="td-head">ComplianceId</td><td part="td-head">Location</td><td part="td-head">Obligation</td>';
      html += '</tr>'
      for(var j = 0; j < adhocQuestions[Object.keys(adhocQuestions)[i]].length; j++) {
        const compliance =  adhocQuestions[Object.keys(adhocQuestions)[i]][j];
        
        html += '<tr>';
        html += ('<td part="td-body"><sf-i-elastic-text text="'+compliance.id+'" minLength="10" lineSize="6"></sf-i-elastic-text></td><td part="td-body"><sf-i-elastic-text text="'+compliance.locationname.replace(/ *\([^)]*\) */g, "").trim()+'" minLength="80" lineSize="6"></sf-i-elastic-text></td><td part="td-body"><sf-i-elastic-text text="'+compliance.obligation+'" minLength="80" lineSize="6"></sf-i-elastic-text></td>');
        html += '</tr>'
      }
      html += '</table>'
      html += '</div>'
      html += '<div>';
      html += '<input type="radio" name="my-radio-group-'+i+'" id="radio-no-'+i+'" value="no" checked/><label for="radio-no-'+i+'">No</label>&nbsp;&nbsp;<input type="radio" name="my-radio-group-'+i+'" id="radio-yes-'+i+'" value="yes" /><label for="radio-yes-'+i+'">Yes</label>';
      html += '</div>';
      html += '<div id="choose-date-'+i+'" class="mb-20 mt-20 hide">'
        html += ('<label part="input-label">Date of occurrence</label><br />');
        html += ('<input part="input" id="date-of-occurrence-'+i+'" type="date" style="margin-left: 0; margin-right: 0; padding: 0" /><br />');
        html += '<div class="mb-20"></div>'
        html += ('<label part="input-label">Remarks</label><br />');
        html += ('<textarea part="input" id="remarks-'+i+'" style="margin: 0; padding: 0"></textarea><br />');
        if(this.locationId != "") {
          html += ('<label part="td-head">Will be triggered for this location</label>');
        } else if(this.entityId != ""){
          html += ('<label part="td-head">Will be triggered for all locations of this entity</label>');
        } else if(this.countryId != ""){
          html += ('<label part="td-head">Will be triggered for all locations of this country</label>');
        }
      html += '</div>';

      let arrTriggerIds : Array<string> = [];
      let arrTriggerRemarks : Array<string> = [];
      let arrTriggers : any = {};

      for(var j = 0; j < adhocQuestions[Object.keys(adhocQuestions)[i]].length; j++) {
        const compliance =  adhocQuestions[Object.keys(adhocQuestions)[i]][j];
        const locationname = compliance.locationname;
        const complianceTriggers = compliance.triggers == null ? [] : compliance.triggers == "" ? [] : JSON.parse(compliance.triggers);
        console.log('complianceTriggers', complianceTriggers);
        for(var k = 0; k < complianceTriggers.length; k++) {

          const triggerDate = complianceTriggers[k].triggerDate;
          const occurrenceDate = complianceTriggers[k].occurrenceDate;
          const complianceId = complianceTriggers[k].complianceId;
          const triggerId = complianceTriggers[k].triggerId;
          const remarks = complianceTriggers[k].remarks;

          const triggerdd = triggerDate.split('/')[0];
          const triggermm = triggerDate.split('/')[1];
          const triggeryyyy = triggerDate.split('/')[2];
          const tsTrigger = (new Date(triggeryyyy, parseInt(triggermm) - 1, triggerdd) + "").split(" ");
          const dateTrigger = (tsTrigger[0] + " " + tsTrigger[1] + " " + tsTrigger[2] + " " + tsTrigger[3]);

          const occurrencedd = occurrenceDate.split('/')[0];
          const occurrencemm = occurrenceDate.split('/')[1];
          const occurrenceyyyy = occurrenceDate.split('/')[2];
          const tsOccurrence = (new Date(occurrenceyyyy, parseInt(occurrencemm) - 1, occurrencedd) + "").split(" ");
          const dateOccurrence = (tsOccurrence[0] + " " + tsOccurrence[1] + " " + tsOccurrence[2] + " " + tsOccurrence[3]);
          
          console.log('triggerId', triggerId);
          if(!arrTriggerIds.includes(triggerId)) {
            arrTriggerIds.push(triggerId);
            arrTriggerRemarks.push(remarks)
          }
          if(arrTriggers[triggerId] == null) {
            arrTriggers[triggerId] = {};
          }
          if(arrTriggers[triggerId][dateTrigger] == null) {
            arrTriggers[triggerId][dateTrigger] = {};
          }
          if(arrTriggers[triggerId][dateTrigger][locationname] == null) {
            arrTriggers[triggerId][dateTrigger][locationname] = {};
          }
          if(arrTriggers[triggerId][dateTrigger][locationname][complianceId] == null) {
            arrTriggers[triggerId][dateTrigger][locationname][complianceId] = dateOccurrence;
          }
        }

      }
      
      arrAllTriggerIds[i] = arrTriggerIds;

      if(arrTriggerIds.length > 0) {

        html += '<div class="mt-20 pt-10">';
        html += ('<label part="adhoc-previous-triggers-count-not-selected" id="previous-triggers-'+i+'" class="mb-10">Previous Triggers ('+arrTriggerIds.length+')</label><br />');
        html += '</div>';
      
      }

      html += '<div id="previous-triggers-body-' + i + '" class="hide">';

      for(var j = 0; j < arrTriggerIds.length; j++) {

        html += '<div class="d-flex align-center mt-20">'
          html += '<span class="badge-counter" part="badge-counter">'+(j+1)+'</span>';
          html += '<div part="results-title"><sf-i-elastic-text text="'+arrTriggerRemarks[j]+'" minLength="40"></sf-i-elastic-text></div>';
        html += '</div>'
        html += '<div part="td-body" class="d-flex align-center">'
          html += '<div>Trigger Id: </div>&nbsp;&nbsp;<sf-i-elastic-text text="'+arrTriggerIds[j]+'" minLength="10" lineSize="6"></sf-i-elastic-text>&nbsp;&nbsp; <button id="adhoc-delete-start-'+i+'-'+j+'"  class="mr-10">Retract</button><button id="adhoc-delete-cancel-'+i+'-'+j+'" class="mr-10 hide">Cancel</button><button id="adhoc-delete-confirm-'+i+'-'+j+'" class="mr-10 hide">Confirm Retract</button>';
        html += '</div>'
        

        for(var k = 0; k < Object.keys(arrTriggers[arrTriggerIds[j]]).length; k++) {
          const dateTrigger = Object.keys(arrTriggers[arrTriggerIds[j]])[k];

          for(var l = 0; l < Object.keys(arrTriggers[arrTriggerIds[j]][dateTrigger]).length; l++) {
            const locationTrigger = Object.keys(arrTriggers[arrTriggerIds[j]][dateTrigger])[l];

            for(var m = 0; m < Object.keys(arrTriggers[arrTriggerIds[j]][dateTrigger][locationTrigger]).length; m++) {
              const complianceTrigger = Object.keys(arrTriggers[arrTriggerIds[j]][dateTrigger][locationTrigger])[m];
              const dateOccurrence = arrTriggers[arrTriggerIds[j]][dateTrigger][locationTrigger][complianceTrigger];
              html += '<div part="td-head" class="d-flex align-center ml-10">';
              html += '<div>Occurred on&nbsp;&nbsp;' + dateOccurrence + ',&nbsp;&nbsp;Triggered on&nbsp;&nbsp;' + dateTrigger + '&nbsp;&nbsp;at&nbsp;&nbsp;'+locationTrigger.replace(/ *\([^)]*\) */g, "").trim()+'&nbsp;&nbsp;for Compliance Id&nbsp;&nbsp;</div><sf-i-elastic-text text="'+complianceTrigger+'" minLength="10" lineSize="6"></sf-i-elastic-text>';
              html += '</div>';
            }

          }

        }

      }

      html += '</div>';
      
      html += '</div>';

    }

    html += '<div class="d-flex justify-end w-100" style="position: fixed; bottom: 70px; left: 0px;">';
    html += '<button part="button-lg-short" id="radio-submit" class="d-flex align-center mt-10 pt-10 pb-10 mr-10 ml-10"><span class="material-symbols-outlined">bolt</span>&nbsp;<span>Trigger</span></button>';
    html += '<button part="button-lg-short-secondary" id="radio-submit-cancel" class="d-flex align-center mt-10 pt-10 pb-10 hide mr-10"><span class="material-symbols-outlined">close</span>&nbsp;<span>Cancel</span></button>'
    html += '<button part="button-lg-short" id="radio-submit-confirm" class="d-flex align-center mt-10 mr-10 pt-10 pb-10 hide"><span class="material-symbols-outlined">check</span>&nbsp;<span>Confirm</span></button>'
    html += '</div>';

    if(Object.keys(adhocQuestions).length === 0) {
      html = '<div class="d-flex justify-center mt-20 mb-20"><div part="results-title">No records found</div></div>';
    }

    (this._SfAdhocContainer as HTMLDivElement).querySelector('#adhoc-list')!.innerHTML = html;
    
    for(i = 0; i < Object.keys(adhocQuestions).length; i++) {

      const firstCompliance = adhocQuestions[Object.keys(adhocQuestions)[i]][0];
      const firstComplianceTriggers = firstCompliance.triggers == null ? [] : firstCompliance.triggers == "" ? [] : JSON.parse(firstCompliance.triggers);

      for(var j = 0; j < firstComplianceTriggers.length; j++)  {

        (this._SfAdhocContainer as HTMLDivElement).querySelector('#adhoc-delete-start-'+i+'-'+j)?.addEventListener('click', (e: any) => {

          const _id = e.currentTarget.id;
          const _i = _id.split('-')[3];
          const _j = _id.split('-')[4];

          ((this._SfAdhocContainer as HTMLDivElement).querySelector('#adhoc-delete-start-'+_i+'-'+_j) as HTMLButtonElement).classList.add('hide');
          ((this._SfAdhocContainer as HTMLDivElement).querySelector('#adhoc-delete-cancel-'+_i+'-'+_j) as HTMLButtonElement).classList.remove('hide');
          ((this._SfAdhocContainer as HTMLDivElement).querySelector('#adhoc-delete-confirm-'+_i+'-'+_j) as HTMLButtonElement).classList.remove('hide');

        });

        (this._SfAdhocContainer as HTMLDivElement).querySelector('#adhoc-delete-cancel-'+i+'-'+j)?.addEventListener('click', (e: any) => {

          const _id = e.currentTarget.id;
          const _i = _id.split('-')[3];
          const _j = _id.split('-')[4];

          ((this._SfAdhocContainer as HTMLDivElement).querySelector('#adhoc-delete-start-'+_i+'-'+_j) as HTMLButtonElement).classList.remove('hide');
          ((this._SfAdhocContainer as HTMLDivElement).querySelector('#adhoc-delete-cancel-'+_i+'-'+_j) as HTMLButtonElement).classList.add('hide');
          ((this._SfAdhocContainer as HTMLDivElement).querySelector('#adhoc-delete-confirm-'+_i+'-'+_j) as HTMLButtonElement).classList.add('hide');

        });

        (this._SfAdhocContainer as HTMLDivElement).querySelector('#adhoc-delete-confirm-'+i+'-'+j)?.addEventListener('click', async (e: any) => {

          const _id = e.currentTarget.id;
          const _i = _id.split('-')[3];
          const _j = _id.split('-')[4];

          const untrigger = {
            projectid: this.projectId,
            triggerid: arrAllTriggerIds[_i][_j]
          }

          console.log('untrigger', untrigger);
          await this.uploadUnTriggerEvent(untrigger)
          this.renderAdhoc();

        });

      }

    }

    for(i = 0; i < Object.keys(adhocQuestions).length; i++) {
      
      const radioYes = (this._SfAdhocContainer as HTMLDivElement).querySelector('#radio-yes-'+i) as HTMLInputElement;
      radioYes.addEventListener('click', (e:any) => {
        const id = e.currentTarget.id.split('-')[2];
        const chooseDate = (this._SfAdhocContainer as HTMLDivElement).querySelector('#choose-date-'+id) as HTMLDivElement;
        console.log(chooseDate);
        chooseDate.classList.remove('hide');
      })

      const radioNo = (this._SfAdhocContainer as HTMLDivElement).querySelector('#radio-no-'+i) as HTMLInputElement;
      radioNo.addEventListener('click', (e:any) => {
        const id = e.currentTarget.id.split('-')[2];
        const chooseDate = (this._SfAdhocContainer as HTMLDivElement).querySelector('#choose-date-'+id) as HTMLDivElement;
        console.log(chooseDate);
        chooseDate.classList.add('hide');
      })

    }

    for(i = 0; i < Object.keys(adhocQuestions).length; i++) {

      const complianceCount = (this._SfAdhocContainer as HTMLDivElement).querySelector('#compliance-count-'+i) as HTMLDivElement;
      complianceCount.addEventListener('click', (e:any) => {

        const index = e.currentTarget.id.split('-')[2];
        console.log(index);
        const body = (this._SfAdhocContainer as HTMLDivElement).querySelector('#compliance-list-body-'+index) as HTMLDivElement;
        if(body.classList.contains('hide')) {
          body.classList.remove('hide');
          e.currentTarget.setAttribute('part', 'adhoc-compliance-list-count-selected')
        } else {
          body.classList.add('hide');
          e.currentTarget.setAttribute('part', 'adhoc-compliance-list-count-not-selected')
        }

      });

    }

    for(i = 0; i < Object.keys(adhocQuestions).length; i++) {

      const previousTriggerCount = (this._SfAdhocContainer as HTMLDivElement).querySelector('#previous-triggers-'+i) as HTMLDivElement;
      if(previousTriggerCount != null) {
        previousTriggerCount.addEventListener('click', (e:any) => {
          const index = e.currentTarget.id.split('-')[2];
          console.log(index);
          const body = (this._SfAdhocContainer as HTMLDivElement).querySelector('#previous-triggers-body-'+index) as HTMLDivElement;
          if(body.classList.contains('hide')) {
            body.classList.remove('hide');
            e.currentTarget.setAttribute('part', 'adhoc-previous-triggers-count-selected')
          } else {
            body.classList.add('hide');
            e.currentTarget.setAttribute('part', 'adhoc-previous-triggers-count-not-selected')
          }
        });
      }
      // complianceCount.addEventListener('click', (e:any) => {

      //   const index = e.currentTarget.id.split('-')[2];
      //   console.log(index);
      //   const body = (this._SfAdhocContainer as HTMLDivElement).querySelector('#compliance-list-body-'+index) as HTMLDivElement;
      //   if(body.classList.contains('hide')) {
      //     body.classList.remove('hide');
      //     e.currentTarget.setAttribute('part', 'adhoc-compliance-list-count-selected')
      //   } else {
      //     body.classList.add('hide');
      //     e.currentTarget.setAttribute('part', 'adhoc-compliance-list-count-not-selected')
      //   }

      // });

    }

    const submitButtonCancel = (this._SfAdhocContainer as HTMLDivElement).querySelector('#radio-submit-cancel') as HTMLButtonElement;
    if(submitButtonCancel != null) {
      submitButtonCancel.addEventListener('click', () => {
        if(submitButtonConfirm != null && !submitButtonConfirm.classList.contains('hide')) {
          submitButtonConfirm.classList.add('hide');
        }

        if(submitButtonCancel != null && !submitButtonCancel.classList.contains('hide')) {
          submitButtonCancel.classList.add('hide');
        }

        if(submitButton != null && submitButton.classList.contains('hide')) {
          submitButton.classList.remove('hide');
        }
        this.renderAdhocConfirmed(adhocQuestions, false);
      })
    }

    const submitButtonConfirm = (this._SfAdhocContainer as HTMLDivElement).querySelector('#radio-submit-confirm') as HTMLButtonElement;
    if(submitButtonConfirm != null) {

      submitButtonConfirm.addEventListener('click', async () => {

        let triggeredCompliances : any = [];
  
        var submitFlag = true;
  
        for(i = 0; i < Object.keys(adhocQuestions).length; i++) {
  
          const radioYes = (this._SfAdhocContainer as HTMLDivElement).querySelector('#radio-yes-'+i) as HTMLInputElement;
          console.log(radioYes.checked);
          if(radioYes.checked) {
            const compliances = adhocQuestions[Object.keys(adhocQuestions)[i]];
            // const chooseDate = ((this._SfAdhocContainer as HTMLDivElement).querySelector('#choose-date-'+i) as HTMLDivElement)
            const chooseDateInput = ((this._SfAdhocContainer as HTMLDivElement).querySelector('#date-of-occurrence-'+i) as HTMLInputElement);
            const remarksInput = ((this._SfAdhocContainer as HTMLDivElement).querySelector('#remarks-'+i) as HTMLTextAreaElement);
            const dateOfTrigger = (new Date().getDate() + "").slice(-2) + "/" + ((new Date().getMonth() + 1) + "").slice(-2) + "/" + (new Date().getFullYear() + "");
            const dateOfOccurrence = chooseDateInput.value;
            const remarks = remarksInput.value;
            if(dateOfOccurrence == "") {
              chooseDateInput.setAttribute('style', 'border:solid 2px ' + this.COLOR_REJECTED + ' !important');
              submitFlag = false;
            } 
            if(remarks == "") {
              remarksInput.setAttribute('style', 'border:solid 2px ' + this.COLOR_REJECTED + ' !important');
              submitFlag = false;
            }
            if(submitFlag){
              triggeredCompliances.push({
                compliances: compliances,
                dateOfOccurrence: dateOfOccurrence,
                dateOfTrigger: dateOfTrigger,
                locationId: this.locationId,
                entityId: this.entityId,
                countryId: this.countryId,
                tagId: this.tagId,
                remarks: remarks,
              });
              chooseDateInput.setAttribute('style', 'border:');
            } else {
              break;
            }
          }
  
        }
  
        console.log('triggeredCompliances',triggeredCompliances);
        if(submitFlag) {
          await this.uploadTriggerEvent(triggeredCompliances);
          
          this.renderAdhoc();
        }
  
      });
  
    }

    const submitButton = (this._SfAdhocContainer as HTMLDivElement).querySelector('#radio-submit') as HTMLButtonElement;
    if(submitButton != null) {
      
      submitButton.addEventListener('click', async () => {

        if(submitButtonConfirm != null && submitButtonConfirm.classList.contains('hide')) {
          submitButtonConfirm.classList.remove('hide');
        }

        if(submitButtonCancel != null && submitButtonCancel.classList.contains('hide')) {
          submitButtonCancel.classList.remove('hide');
        }

        if(submitButton != null && !submitButton.classList.contains('hide')) {
          submitButton.classList.add('hide');
        }

        this.renderAdhocConfirmed(adhocQuestions, true);
  
      });
  
    }
    
  }

  renderRegister = async () => {

    var html = '';

    html += '<div class="scroll-x w-100 mobile-only">';

      html += '<div class="title-item-date">';
        html += '<label part="input-label">Search</label><br />'
        html += '<input id="stream-search-mobile" part="input" type="text" autofocus/>'
      html += '</div>';

    html += '</div>';

    html += '<div class="d-flex w-100">';
      html += '<div class="calendar-left-col desktop-only flex-col justify-start align-end">';

        html += '<div>';
          html += '<div class="title-item-date">';
          html += '<label part="input-label">Search</label><br />'
          html += '<input id="stream-search" part="input" type="text" autofocus/>'
          html += '</div>';

          console.log('showRegisterExport', this.showRegisterExport);
          if(this.showRegisterExport && this.showRegisterExport == "true") {
            
            html += '<div class="title-item-date mt-20">';
            html += '<label part="input-label">Export</label><br /><br />'
            html += '<input type="radio" id="radio-csv" class="switch-csv" value="Excel" checked name="radio-report" part="radio-download"/>';
            html += '<label for="radio-csv" part="label-radio-download" class="mr-10">Registers (CSV)</label><br />';
            html += '<button id="button-download" part="button" class="d-flex justify-center align-center w-100 mt-20"><span class="material-symbols-outlined">download</span>&nbsp;&nbsp;<span>Export</span></button>';
            html += '</div>';
          }
        html += '</div>';

      html += '</div>';

      html += '<div part="stream-event-list" class="calendar-right-data flex-grow pl-10 pt-20">';

      html += '</div>';
    html += '</div>';

    (this._SfRegisterContainer as HTMLDivElement).innerHTML = html;

    const events = await this.fetchRegisters();
    this.renderRegisterEvents(events);

    (this._SfRegisterContainer as HTMLDivElement).querySelector('#stream-search')?.addEventListener('keyup', async (ev: any) => {
      //console.log('ev', ev.key);
      if(ev.key == "Enter") {
        const searchString = ((this._SfRegisterContainer as HTMLDivElement).querySelector('#stream-search') as HTMLInputElement).value;
        const events = await this.fetchRegisters(searchString);
        this.renderRegisterEvents(events);
      }
    });

    (this._SfRegisterContainer as HTMLDivElement).querySelector('#button-download')?.addEventListener('click', () => {
      
      const ts = new Date();
      console.log(this.csvDataRegisters);
      const blob = new Blob([this.csvDataRegisters], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.setAttribute('href', url)
      a.setAttribute('download', 'report_'+ts+'.csv');
      a.click()

    });

  }

  renderFind = () => {

    //console.log('renderingFind');

    this.clearGraphData();
    this.clearSelectedGraphParam();
    this.clearSelectedLegend();

    var html = '';

    html += '<div class="scroll-x w-100 mobile-only">';

      html += '<div class="title-item-date">';
        html += '<label part="input-label">Search</label><br />'
        html += '<input id="stream-search-mobile" part="input" type="text" autofocus/>'
      html += '</div>';

    html += '</div>';

    html += '<div class="d-flex w-100">';
      html += '<div class="calendar-left-col desktop-only flex-col justify-start align-end">';

        html += '<div class="title-item-date">';
        html += '<label part="input-label">Search</label><br />'
        html += '<input id="stream-search" part="input" type="text" autofocus/>'
        html += '</div>';

      html += '</div>';

      html += '<div class="calendar-right-data flex-grow">';

      html += '</div>';
    html += '</div>';

    (this._SfFindContainer as HTMLDivElement).innerHTML = html;

    this.initFindRightCol();

    (this._SfFindContainer as HTMLDivElement).querySelector('#stream-search')?.addEventListener('keyup', (ev: any) => {
      //console.log('key', ev.key);
      if(ev.key == "Enter") {
        const searchString = ((this._SfFindContainer as HTMLDivElement).querySelector('#stream-search') as HTMLInputElement).value;
        this.processFindSelection((this._SfFindContainer as HTMLDivElement), searchString);
      }
    });

  }

  renderCustom = () => {

    this.clearGraphData();
    this.clearSelectedGraphParam();
    this.clearSelectedLegend();

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
      html += '<div class="title-item-date">';
        html += '<button part="button-lg-short-secondary">This Quarter</button>'
      html += '</div>';
      html += '<div class="title-item-date">';
        html += '<button part="button-lg-short-secondary">This Year</button>'
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
        html += '<div class="title-item-date">';
        html += '<button id="button-this-quarter" part="button-lg-short-secondary">This Quarter</button>'
        html += '</div>';
        html += '<div class="title-item-date">';
        html += '<button id="button-this-year" part="button-lg-short-secondary">This Year</button>'
        html += '</div>';
        

      html += '</div>';

      html += '<div class="calendar-right-data flex-grow">';

      html += '</div>';
    html += '</div>';

    (this._SfCustomContainer as HTMLDivElement).innerHTML = html;

    this.initCustomRightCol();

    (this._SfCustomContainer as HTMLDivElement).querySelector('#stream-start-date')?.addEventListener('change', (_ev: any) => {
      //console.log('start-date', ev);
      this.flowGraph = this.FLOW_GRAPH_COMPLIANCE;
      this.processDateSelection((this._SfCustomContainer as HTMLDivElement));
    });

    (this._SfCustomContainer as HTMLDivElement).querySelector('#stream-end-date')?.addEventListener('change', (_ev: any) => {
      //console.log('end-date', ev);
      this.flowGraph = this.FLOW_GRAPH_COMPLIANCE;
      this.processDateSelection((this._SfCustomContainer as HTMLDivElement));
    });

    (this._SfCustomContainer as HTMLDivElement).querySelector('#stream-start-date-mobile')?.addEventListener('change', (_ev: any) => {
      //console.log('start-date', ev);
      this.flowGraph = this.FLOW_GRAPH_COMPLIANCE;
      this.processDateSelection((this._SfCustomContainer as HTMLDivElement));
    });

    (this._SfCustomContainer as HTMLDivElement).querySelector('#stream-end-date-mobile')?.addEventListener('change', (_ev: any) => {
      //console.log('end-date', ev);
      this.flowGraph = this.FLOW_GRAPH_COMPLIANCE;
      this.processDateSelection((this._SfCustomContainer as HTMLDivElement));
    });

    (this._SfCustomContainer as HTMLDivElement).querySelector('#button-this-year')?.addEventListener('click', () => {
      ((this._SfCustomContainer as HTMLDivElement).querySelector('#stream-start-date') as HTMLInputElement).value = this.calendarStartYYYY + '-' + this.calendarStartMM + '-' + this.calendarStartDD;
      ((this._SfCustomContainer as HTMLDivElement).querySelector('#stream-end-date') as HTMLInputElement).value = (parseInt(this.calendarStartYYYY) + 1) + '-' + this.calendarStartMM + '-' + this.calendarStartDD;
      this.processDateSelection((this._SfCustomContainer as HTMLDivElement));
    });

    (this._SfCustomContainer as HTMLDivElement).querySelector('#button-this-quarter')?.addEventListener('click', () => {

      const mmCurrent = ((new Date().getMonth() + 1));

      let startDate : string = "";
      let endDate : string = "";

      if(mmCurrent >=4 && mmCurrent <= 6) {

        startDate = this.calendarStartYYYY + '-' + '04' + '-' + "01";
        endDate = this.calendarStartYYYY + '-' + '07' + '-' + "01";

      } else if(mmCurrent >=6 && mmCurrent <= 9) {

        startDate = this.calendarStartYYYY + '-' + '07' + '-' + "01";
        endDate = this.calendarStartYYYY + '-' + '10' + '-' + "01";

      } else if(mmCurrent >=9 && mmCurrent <= 12) {

        startDate = this.calendarStartYYYY + '-' + '10' + '-' + "01";
        endDate = (parseInt(this.calendarStartYYYY) + 1) + '-' + '01' + '-' + "01";

      } else {
        startDate = this.calendarStartYYYY + '-' + '01' + '-' + "01";
        endDate = (parseInt(this.calendarStartYYYY) + 1) + '-' + '04' + '-' + "01";
      }

      ((this._SfCustomContainer as HTMLDivElement).querySelector('#stream-start-date') as HTMLInputElement).value = startDate;
      ((this._SfCustomContainer as HTMLDivElement).querySelector('#stream-end-date') as HTMLInputElement).value = endDate;
      this.processDateSelection((this._SfCustomContainer as HTMLDivElement));
    });
    

    // for(var i = 0; i < 3; i++) {
    //   (this._SfCustomContainer as HTMLDivElement).querySelector('#stream-month-' + i)?.addEventListener('click', (ev: any)=> {
    //     const target = parseInt((ev.target as HTMLDivElement).id.split('-')[2]);
    //     //console.log('clicked ', target);
    //     this.renderPast(target);
    //   })
    // }
  }

  renderThis = (index: number = 1, showGraph: boolean = true) => {

    this.clearGraphData();
    this.clearSelectedGraphParam();
    this.clearSelectedLegend();

    this.streamIndex = index;

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
      html += this.renderThisEvents(index, startDate, showGraph);
      startDate.setDate(startDate.getDate() + 1);
        
      html += '</div>';
    html += '</div>';

    (this._SfThisContainer as HTMLDivElement).innerHTML = html;

    const radioExpander = (this._SfThisContainer as HTMLDivElement).querySelector('#graph-radios-expander') as HTMLButtonElement;
    radioExpander?.addEventListener('click', (e: any) => {

      const button = (e.currentTarget as HTMLButtonElement);
      button.style.display = 'none';

      const arrRadios = (this._SfThisContainer as HTMLDivElement).querySelectorAll('.chart-radio-item-secondary') as NodeListOf<HTMLDivElement>;
      arrRadios.forEach(div => {
        div.style.display = 'block';
      });


    });

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

    const radioSubcategory = (this._SfThisContainer as HTMLDivElement).querySelector('#radio-subcategory') as HTMLButtonElement;
    radioSubcategory?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_SUBCATEGORY;
      this.renderThis(index);
      this.renderSubcategoryGraph((this._SfThisContainer as HTMLDivElement))
      
    });

    const radioLocation = (this._SfThisContainer as HTMLDivElement).querySelector('#radio-location') as HTMLButtonElement;
    radioLocation?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_LOCATION;
      this.renderThis(index);
      this.renderLocationGraph((this._SfThisContainer as HTMLDivElement))
      
    });

    // const buttonStatusMore = (this._SfThisContainer as HTMLDivElement).querySelector('#button-status-more');
    // buttonStatusMore?.addEventListener('click', () => {

    //   const divStatusList = (this._SfThisContainer as HTMLDivElement).querySelectorAll('.late-statuses') as NodeListOf<HTMLDivElement>;
    //   for(var i = 0; i < divStatusList.length; i++) {
    //     divStatusList[i].style.display = 'flex';
    //   }
    //   (buttonStatusMore as HTMLButtonElement).style.display = 'none';

    // });

    for(var i = 0; i < 3; i++) {
      (this._SfThisContainer as HTMLDivElement).querySelector('#stream-month-' + i)?.addEventListener('click', async (ev: any)=> {
        const target = parseInt((ev.target as HTMLDivElement).id.split('-')[2]);
        //console.log('clicked ', target);
        const dateResult = this.calculateStartAndEndDateOfThis(target);
        this.flowGraph = this.FLOW_GRAPH_COMPLIANCE;
        this.currentColumnIndex = target + "";
        await this.fetchAndYearlyRenderUserCalendar_2(dateResult.startDate, dateResult.endDate);
        this.renderThis(target);
      });

      (this._SfThisContainer as HTMLDivElement).querySelector('#stream-month-' + i + '-mobile')?.addEventListener('click', async (ev: any)=> {
        const target = parseInt((ev.target as HTMLDivElement).id.split('-')[2]);
        //console.log('clicked ', target);
        this.flowGraph = this.FLOW_GRAPH_COMPLIANCE;
        this.currentColumnIndex = target + "";
        const dateResult = this.calculateStartAndEndDateOfThis(target);
        await this.fetchAndYearlyRenderUserCalendar_2(dateResult.startDate, dateResult.endDate);
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

        var yyyy = this.getCurrentYear(idArr[3]);

        this.renderEventDetail(this.events[mmdd][j], mmdd + "/" + yyyy, (this._SfThisContainer as HTMLDivElement).querySelector('#stream-month-'+this.currentColumnIndex) as HTMLButtonElement);
  
      })

    }

    const streamEventsContainer = (this._SfThisContainer as HTMLDivElement).querySelectorAll('.stream-events-container') as NodeListOf<HTMLDivElement>;
    const buttonSelect = (this._SfThisContainer as HTMLDivElement).querySelectorAll('.button-select') as NodeListOf<HTMLButtonElement>;

    for(i = 0; i < buttonSelect.length; i++) {

      buttonSelect[i].addEventListener('click', (ev: any) => {

        //console.log('eventscontainer', streamEventsContainer.length, buttonSelect.length);

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


    if(showGraph) this.renderComplianceGraph((this._SfThisContainer as HTMLDivElement));
    
  }

  renderStream = (index: number = 0, showGraph: boolean = true) => {

    //console.log('flowgraph renderStream', this.flowGraph);

    this.streamIndex = index;

    this.clearGraphData();
    this.clearSelectedGraphParam();
    this.clearSelectedLegend();

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
            //console.log(i, index)
            html += this.renderStreamEvents(i, startDate.getMonth(), startDate.getFullYear(), showGraph)
          }
          startDate.setMonth(startDate.getMonth() + 1);
        }
      html += '</div>';
    html += '</div>';

    (this._SfStreamContainer as HTMLDivElement).innerHTML = html;

    this.attachTimelineFilterHandlers((this._SfStreamContainer as HTMLDivElement));

    const radioExpander = (this._SfStreamContainer as HTMLDivElement).querySelector('#graph-radios-expander') as HTMLButtonElement;
    radioExpander?.addEventListener('click', (e: any) => {

      const button = (e.currentTarget as HTMLButtonElement);
      button.style.display = 'none';

      const arrRadios = (this._SfStreamContainer as HTMLDivElement).querySelectorAll('.chart-radio-item-secondary') as NodeListOf<HTMLDivElement>;
      arrRadios.forEach(div => {
        div.style.display = 'block';
      });


    });

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

    const radioCompliance = (this._SfStreamContainer as HTMLDivElement).querySelector('#radio-compliance') as HTMLButtonElement;
    radioCompliance?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_COMPLIANCE;
      this.renderStream(index);
      this.renderComplianceGraph((this._SfStreamContainer as HTMLDivElement))
      
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

    const radioSubcategory = (this._SfStreamContainer as HTMLDivElement).querySelector('#radio-subcategory') as HTMLButtonElement;
    radioSubcategory?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_SUBCATEGORY;
      this.renderStream(index);
      this.renderSubcategoryGraph((this._SfStreamContainer as HTMLDivElement))
      
    });

    const radioLocation = (this._SfStreamContainer as HTMLDivElement).querySelector('#radio-location') as HTMLButtonElement;
    radioLocation?.addEventListener('click', () => {

      this.flowGraph = this.FLOW_GRAPH_LOCATION;
      this.renderStream(index);
      this.renderLocationGraph((this._SfStreamContainer as HTMLDivElement))
      
    });
    
    // const buttonStatusMore = (this._SfStreamContainer as HTMLDivElement).querySelector('#button-status-more');
    // buttonStatusMore?.addEventListener('click', () => {

    //   const divStatusList = (this._SfStreamContainer as HTMLDivElement).querySelectorAll('.late-statuses') as NodeListOf<HTMLDivElement>;
    //   for(var i = 0; i < divStatusList.length; i++) {
    //     divStatusList[i].style.display = 'flex';
    //   }
    //   (buttonStatusMore as HTMLButtonElement).style.display = 'none';

    // });

    for(var i = 0; i < 12; i++) {
      (this._SfStreamContainer as HTMLDivElement).querySelector('#stream-month-' + i)?.addEventListener('click', async (ev: any)=> {

        const target = parseInt((ev.target as HTMLDivElement).id.split('-')[2]);
        const dateResult = this.calculateStartAndEndDateOfStream(target);
        //console.log('dateresult', dateResult);
        this.currentColumnIndex = target + "";
        if(dateResult != null) {
          await this.fetchAndYearlyRenderUserCalendar_2(dateResult.startDate, dateResult.endDate);
        }
        this.flowGraph = this.FLOW_GRAPH_COMPLIANCE;
        this.renderStream(target);

      });

      (this._SfStreamContainer as HTMLDivElement).querySelector('#stream-month-' + i+'-mobile')?.addEventListener('click', async (ev: any)=> {

        const target = parseInt((ev.target as HTMLDivElement).id.split('-')[2]);
        const dateResult = this.calculateStartAndEndDateOfStream(target);
        if(dateResult != null) {
          await this.fetchAndYearlyRenderUserCalendar_2(dateResult.startDate, dateResult.endDate);
        }
        this.flowGraph = this.FLOW_GRAPH_COMPLIANCE;
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
          console.log('selectedItems', this.selectedItems[k], idArr[3] + '-' + idArr[4] + '-' + idArr[5], this.selectedItems[k].indexOf(idArr[3] + '-' + idArr[4] + '-' + idArr[5]));
          if(this.selectedItems[k].indexOf(idArr[3] + '-' + idArr[4] + '-' + idArr[5]) >= 0) {
            found = true;
          }
        }
        if(!found) {
          this.selectedItems = [];
          this.clearButtonSelection();
        }

        (this._SfDetailContainer as HTMLDivElement).style.display = 'block';

        //console.log('commentsinlist', (this._SfStreamContainer as HTMLDivElement).querySelector('#stream-month-'+this.currentColumnIndex) as HTMLButtonElement, this.events[mmdd][j].comments, mmdd, j);

        var yyyy = this.getCurrentYear(idArr[3]);

        this.renderEventDetail(this.events[mmdd][j], mmdd + "/" + yyyy, (this._SfStreamContainer as HTMLDivElement).querySelector('#stream-month-'+this.currentColumnIndex) as HTMLButtonElement);
  
      })

    }

    const streamEventsContainer = (this._SfStreamContainer as HTMLDivElement).querySelectorAll('.stream-events-container') as NodeListOf<HTMLDivElement>;
    const buttonSelect = (this._SfStreamContainer as HTMLDivElement).querySelectorAll('.button-select') as NodeListOf<HTMLButtonElement>;

    for(i = 0; i < buttonSelect.length; i++) {

      buttonSelect[i].addEventListener('click', (ev: any) => {

        //console.log('eventscontainer', streamEventsContainer.length, buttonSelect.length);

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

    if(showGraph) this.renderComplianceGraph((this._SfStreamContainer as HTMLDivElement));

  }

  attachTimelineFilterHandlers = (divContainer: HTMLDivElement) => {

    const divs = divContainer.querySelectorAll('.chip') as NodeListOf<HTMLDivElement>;
    divs.forEach(div => {
      div.addEventListener('click', () => {

        const spans = div.querySelectorAll('span') as NodeListOf<HTMLSpanElement>;
        if(spans[2].innerHTML == "0") {
          this.setError('No items present for the selected filter!')
          setTimeout(() => {
            this.clearMessages();
          }, 2000);
        } else {
          this.clickOnPie(false, parseInt(div.id.split('-')[2]))
          this.chart.update();
        }

      })
      
    });

  }

  getCurrentYear = (mm: string) => {

    // var currMonth = new Date().getMonth() + 1;

    // // if(parseInt(mm) < parseInt(this.calendarStartMM) && currMonth < parseInt(this.calendarStartMM)) {
    // //   yyyy = new Date().getFullYear() + "";
    // // } else if(parseInt(mm) >= parseInt(this.calendarStartMM) && currMonth <= parseInt(this.calendarStartMM)) {
    // //   yyyy = (new Date().getFullYear() - 1) + "";
    // // } else if(parseInt(mm) < parseInt(this.calendarStartMM) && currMonth >= parseInt(this.calendarStartMM)) {
    // //   yyyy = (new Date().getFullYear() + 1) + "";
    // // } else if(parseInt(mm) >= parseInt(this.calendarStartMM) && currMonth >= parseInt(this.calendarStartMM)) {
    // //   yyyy = (new Date().getFullYear() + 1) + "";
    // // }

    // if(parseInt(mm) < parseInt(this.calendarStartMM) && currMonth < parseInt(this.calendarStartMM)) {
    //   yyyy = parseInt(this.calendarStartYYYY) + "";
    // } else if(parseInt(mm) >= parseInt(this.calendarStartMM) && currMonth <= parseInt(this.calendarStartMM)) {
    //   yyyy = (parseInt(this.calendarStartYYYY) - 1) + "";
    // } else if(parseInt(mm) < parseInt(this.calendarStartMM) && currMonth >= parseInt(this.calendarStartMM)) {
    //   yyyy = (parseInt(this.calendarStartYYYY) + 1) + "";
    // } else if(parseInt(mm) >= parseInt(this.calendarStartMM) && currMonth >= parseInt(this.calendarStartMM)) {
    //   yyyy = (parseInt(this.calendarStartYYYY) + 1) + "";
    // }

    var yyyy = this.getYearFromMonthAndCalendarStart(mm);

    return yyyy;
  }

  clearButtonSelection = () => {

    const buttonSelect = (this._SfStreamContainer as HTMLDivElement).querySelectorAll('.button-select') as NodeListOf<HTMLButtonElement>;

    for(var i = 0; i < buttonSelect.length; i++) {

      (buttonSelect[i] as HTMLInputElement).checked = false;

    }

  }

  clearGraphData = () => {
    //console.log('clearing graph data');
    this.chart = null;
    this.chart2 = null;
    this.chart3 = null;
    this.chart4 = null;
    this.riskAreasData = null;
    this.riskAreasPartStatusData = null;
    this.riskAreasLateStatusData = null;
    this.riskAreasComplianceStatusData = null;
    this.riskSeverityData = null;
    this.riskSeverityLateStatusData = null;
    this.riskSeverityPartStatusData = null;
    this.riskSeverityComplianceStatusData = null;
    this.functionData = null;
    this.functionLateStatusData = null;
    this.functionPartStatusData = null;
    this.functionComplianceStatusData = null;
    this.locationData = null;
    this.locationLateStatusData = null;
    this.locationPartStatusData = null;
    this.locationComplianceStatusData = null;
    this.obligationTypeData = null;
    this.obligationTypeLateStatusData = null;
    this.obligationTypePartStatusData = null;
    this.obligationTypeComplianceStatusData = null;
    this.jurisdictionData = null;
    this.jurisdictionPartStatusData = null;
    this.jurisdictionLateStatusData = null;
    this.jurisdictionComplianceStatusData = null;
    this.subcategoryData = null;
    this.subcategoryLateStatusData = null;
    this.subcategoryPartStatusData = null;
    this.subcategoryComplianceStatusData = null;
    this.frequencyData = null;
    this.frequencyLateStatusData = null;
    this.frequencyPartStatusData = null;
    this.frequencyComplianceStatusData = null;
  }

  showGraph =  (divContainer: HTMLDivElement, index: number) => {

    if(index == 1) {

      (divContainer.querySelector('#myChart') as HTMLCanvasElement).parentElement!.style.display = 'block';

    }

    if(index == 4) {

      (divContainer.querySelector('#myChart4') as HTMLCanvasElement).parentElement!.style.display = 'block';
      
    }
    
    if(index == 2) {

      (divContainer.querySelector('#myChart2') as HTMLCanvasElement).parentElement!.style.display = 'block';
      // (divContainer.querySelector('#myChart2') as HTMLCanvasElement).classList.add('gone');
      // (divContainer.querySelector('#myChart2') as HTMLCanvasElement).parentElement!.style.height = '0px';
      // if(this.chart2 != null) {
      //   (this.chart2 as Chart).destroy();
      // }
      // this.chart2 = null;

    }

    if(index == 3) {

      (divContainer.querySelector('#myChart3') as HTMLCanvasElement).parentElement!.style.display = 'block';
      // (divContainer.querySelector('#myChart3') as HTMLCanvasElement).classList.add('gone');
      // (divContainer.querySelector('#myChart3') as HTMLCanvasElement).parentElement!.style.height = '0px';
      // if(this.chart3 != null) {
      //   (this.chart3 as Chart).destroy();
      // }
      // this.chart3 = null;
      
    }

  }

  clearGraph = (divContainer: HTMLDivElement, index: number) => {
    
    if(index == 1) {

      (divContainer.querySelector('#myChart') as HTMLCanvasElement).parentElement!.style.display = 'none';

    }

    if(index == 4) {

      (divContainer.querySelector('#myChart4') as HTMLCanvasElement).parentElement!.style.display = 'none';
      
    }
    
    if(index == 2) {

      (divContainer.querySelector('#myChart2') as HTMLCanvasElement).parentElement!.style.display = 'none';
      // (divContainer.querySelector('#myChart2') as HTMLCanvasElement).classList.add('gone');
      // (divContainer.querySelector('#myChart2') as HTMLCanvasElement).parentElement!.style.height = '0px';
      // if(this.chart2 != null) {
      //   (this.chart2 as Chart).destroy();
      // }
      // this.chart2 = null;

    }

    if(index == 3) {

      (divContainer.querySelector('#myChart3') as HTMLCanvasElement).parentElement!.style.display = 'none';
      // (divContainer.querySelector('#myChart3') as HTMLCanvasElement).classList.add('gone');
      // (divContainer.querySelector('#myChart3') as HTMLCanvasElement).parentElement!.style.height = '0px';
      // if(this.chart3 != null) {
      //   (this.chart3 as Chart).destroy();
      // }
      // this.chart3 = null;
      
    }

  }

  renderCompletenessCsvForGraph = (dataBar: any, parameter: string) => {

    this.csvCompletenessStats = parameter + ",Not Started,In Progress,Complete\n";
    for(var i = 0; i < dataBar['labels'].length; i++) {
      this.csvCompletenessStats += dataBar['labels'][i].join(" ") + "," + dataBar['datasets'][2]['data'][i] + "," + dataBar['datasets'][1]['data'][i] + "," + dataBar['datasets'][0]['data'][i] + (i < (dataBar['labels'].length - 1) ? "\n" : "");
    }

    //console.log('rendering csv completeness', this.csvCompletenessStats);

  }

  renderTimelinessCsvForGraph = (dataBar: any, parameter: string) => {

    //console.log('dataBar', dataBar);

    this.csvTimelinessStats = parameter + ",In Time,Past Due Date,Late Approved,Late Executed,Late Reported\n";
    for(var i = 0; i < dataBar['labels'].length; i++) {
      this.csvTimelinessStats += dataBar['labels'][i].join(" ") + "," + dataBar['datasets'][0]['data'][i] + "," + dataBar['datasets'][1]['data'][i] + "," + dataBar['datasets'][3]['data'][i] + "," + dataBar['datasets'][2]['data'][i] + "," + dataBar['datasets'][4]['data'][i] + (i < (dataBar['labels'].length - 1) ? "\n" : "");
    }

    //console.log('rendering csv csvTimelinessStats', this.csvTimelinessStats);

  }

  renderComplianceCsvForGraph = (dataBar: any, parameter: string) => {

    this.csvComplianceStats = parameter + ",Scheduled,Not Complied,Partially Complied,Complied\n";
    for(var i = 0; i < dataBar['labels'].length; i++) {
      this.csvComplianceStats += dataBar['labels'][i].join(" ") + "," + dataBar['datasets'][0]['data'][i] + "," + dataBar['datasets'][1]['data'][i] + "," + dataBar['datasets'][3]['data'][i] + "," + dataBar['datasets'][2]['data'][i] + (i < (dataBar['labels'].length - 1) ? "\n" : "");
    }

    //console.log('rendering csv csvComplianceStats', this.csvComplianceStats);

  }

  renderCompletenessGraph = (divContainer: HTMLDivElement) => {

    this.clearSelectedGraphParam();
    // this.clearSelectedLegend();
    
    this.csvGraphStats = "";
    this.csvCompletenessStats = "";
    this.csvTimelinessStats = "";
    this.csvComplianceStats = "";

    if((divContainer.querySelector('#graph-approved') as HTMLSpanElement) == null) return;

    var dataApproved = (divContainer.querySelector('#graph-approved') as HTMLSpanElement).innerHTML;
    var dataNotStarted = (divContainer.querySelector('#graph-not-started') as HTMLSpanElement).innerHTML;
    var dataPendingApproval = (divContainer.querySelector('#graph-pending-approval') as HTMLSpanElement).innerHTML;
    var dataRejected = (divContainer.querySelector('#graph-rejected') as HTMLSpanElement).innerHTML;

    const ctx = divContainer.querySelector('#myChart') as ChartItem;
    this.showGraph(divContainer, 1);
    this.clearGraph(divContainer, 2);
    this.clearGraph(divContainer, 3);
    this.clearGraph(divContainer, 4);

    if(this.fill == "pattern") {

      const data = {
        labels: ['Approved', 'Not Started', 'Pending Approval', 'Rejected'],
        datasets: [{
          label: 'Compliances',
          data: [dataApproved, dataNotStarted, dataPendingApproval, dataRejected],
          borderWidth: 1,
          backgroundColor: [
            Util.createDiagonalPattern3(this.COLOR_APPROVED),
            Util.createDiagonalPattern2(this.COLOR_NOT_STARTED),
            Util.createDiagonalPattern1(this.COLOR_PENDING_APPROVAL),
            Util.createDiagonalPattern1(this.COLOR_REJECTED)
          ]
        }]
      }

      this.renderChartSettings(divContainer, -1, ctx);
      this.renderChart(ctx, 'doughnut', data, "Completeness")

    }
    const data = {
      labels: ['Approved', 'Not Started', 'Pending Approval', 'Rejected'],
      datasets: [{
        label: 'Compliances',
        data: [dataApproved, dataNotStarted, dataPendingApproval, dataRejected],
        borderWidth: 1,
        backgroundColor: [
          this.COLOR_APPROVED,
          this.COLOR_NOT_STARTED,
          this.COLOR_PENDING_APPROVAL,
          this.COLOR_REJECTED
        ]
      }]
    }

    this.csvGraphStats += 'Completeness,Approved,Not Started,Pending Approval,Rejected,Total\n';
    this.csvGraphStats += 'Total,'+dataApproved+','+dataNotStarted+','+dataPendingApproval+','+dataRejected+','+(parseInt(dataApproved)+parseInt(dataNotStarted)+parseInt(dataPendingApproval)+parseInt(dataRejected))+'\n';

    const itemsTimeliness = divContainer.querySelectorAll('.stat-timeliness') as NodeListOf<HTMLElement>;
    for(var i = 0; i < itemsTimeliness.length; i++) {
      itemsTimeliness[i].style.display = 'none';
    }
    const itemsCompleteness = divContainer.querySelectorAll('.stat-completeness') as NodeListOf<HTMLElement>;
    for(var i = 0; i < itemsCompleteness.length; i++) {
      itemsCompleteness[i].style.display = 'flex';
    }
    const itemsCompliance = divContainer.querySelectorAll('.stat-compliance') as NodeListOf<HTMLElement>;
    for(var i = 0; i < itemsCompliance.length; i++) {
      itemsCompliance[i].style.display = 'none';
    }
    this.renderChartSettings(divContainer, -1, ctx);
    this.renderChart(ctx, 'doughnut', data, "Completeness")

  }

  renderComplianceGraph = (divContainer: HTMLDivElement) => {

    //console.log('Rendering compliance graph...');

    this.clearSelectedGraphParam();
    // this.clearSelectedLegend();

    this.csvGraphStats = "";
    this.csvCompletenessStats = "";
    this.csvTimelinessStats = "";
    this.csvComplianceStats = "";

    var dataTotal = (divContainer.querySelector('#graph-total') as HTMLSpanElement).innerHTML;
    var dataNotComplied = (divContainer.querySelector('#graph-not-complied') as HTMLSpanElement).innerHTML;
    var dataScheduled = (divContainer.querySelector('#graph-scheduled') as HTMLSpanElement).innerHTML;
    var dataPartiallyComplied = (divContainer.querySelector('#graph-partially-complied') as HTMLSpanElement).innerHTML;
    var dataComplied = (divContainer.querySelector('#graph-complied') as HTMLSpanElement).innerHTML;

    const ctx = divContainer.querySelector('#myChart') as ChartItem;
    this.showGraph(divContainer, 1);
    this.clearGraph(divContainer, 2);
    this.clearGraph(divContainer, 3);
    this.clearGraph(divContainer, 4);

    const data = {
      labels: ['Scheduled', 'Not Complied', 'Partially Complied', 'Complied'],
      datasets: [{
        label: 'Compliances',
        data: [dataScheduled, dataNotComplied, dataPartiallyComplied, dataComplied],
        borderWidth: 1,
        backgroundColor: [
          this.COLOR_SCHEDULED,
          this.COLOR_NOT_COMPLIED,
          this.COLOR_PARTIALLY_COMPLIED,
          this.COLOR_COMPLIED
        ]
      }]
    }

    this.csvGraphStats += 'Compliance,Scheduled,Not Complied,Partially Complied,Complied,Total\n';
    this.csvGraphStats += 'Count,'+parseInt(dataScheduled)+','+parseInt(dataNotComplied)+','+parseInt(dataPartiallyComplied)+','+parseInt(dataComplied)+','+parseInt(dataTotal)+'\n';

    //console.log('rendering timeliness graph', this.csvGraphStats);

    const itemsTimeliness = divContainer.querySelectorAll('.stat-timeliness') as NodeListOf<HTMLElement>;
    for(var i = 0; i < itemsTimeliness.length; i++) {
      itemsTimeliness[i].style.display = 'none';
    }
    const itemsCompleteness = divContainer.querySelectorAll('.stat-completeness') as NodeListOf<HTMLElement>;
    for(var i = 0; i < itemsCompleteness.length; i++) {
      itemsCompleteness[i].style.display = 'none';
    }
    const itemsCompliance = divContainer.querySelectorAll('.stat-compliance') as NodeListOf<HTMLElement>;
    for(var i = 0; i < itemsCompliance.length; i++) {
      itemsCompliance[i].style.display = 'flex';
    }

    this.renderChartSettings(divContainer, -1, ctx);
    this.renderChart(ctx, 'doughnut', data, "Compliance")

  }

  renderTimelinessGraph = (divContainer: HTMLDivElement) => {

    this.clearSelectedGraphParam();
    // this.clearSelectedLegend();

    this.csvGraphStats = "";
    this.csvCompletenessStats = "";
    this.csvTimelinessStats = "";
    this.csvComplianceStats = "";

    var dataTotal = (divContainer.querySelector('#graph-total') as HTMLSpanElement).innerHTML;
    var dataPastDueDate = (divContainer.querySelector('#graph-past-due-date') as HTMLSpanElement).innerHTML;
    var dataLateApproved = (divContainer.querySelector('#graph-late-approved') as HTMLSpanElement).innerHTML;
    var dataLateExecuted = (divContainer.querySelector('#graph-late-executed') as HTMLSpanElement).innerHTML;
    var dataLateReported = (divContainer.querySelector('#graph-late-reported') as HTMLSpanElement).innerHTML;

    const ctx = divContainer.querySelector('#myChart') as ChartItem;
    this.showGraph(divContainer, 1);
    this.clearGraph(divContainer, 2);
    this.clearGraph(divContainer, 3);
    this.clearGraph(divContainer, 4);

    const data = {
      labels: ['In Time', 'Past Due Date', 'Late Approved', 'Late Executed', 'Late Reported'],
      datasets: [{
        label: 'Compliances',
        data: [(parseInt(dataTotal) - (parseInt(dataPastDueDate)+parseInt(dataLateApproved)+parseInt(dataLateExecuted)+parseInt(dataLateReported))) + "", dataPastDueDate, dataLateApproved, dataLateExecuted, dataLateReported],
        borderWidth: 1,
        backgroundColor: [
          this.COLOR_NOT_STARTED,
          this.COLOR_PAST_DUE_DATE,
          this.COLOR_LATE_APPROVED,
          this.COLOR_LATE_EXECUTED,
          this.COLOR_LATE_REPORTED
        ]
      }]
    }

    this.csvGraphStats += 'Completeness,In Time,Past Due Date,Late Approved,Late Executed,Late Reported,Total\n';
    this.csvGraphStats += 'Count,'+(parseInt(dataTotal) - (parseInt(dataPastDueDate)+parseInt(dataLateApproved)+parseInt(dataLateExecuted)))+','+(parseInt(dataPastDueDate)+','+parseInt(dataLateApproved)+','+parseInt(dataLateExecuted)+','+parseInt(dataLateReported)+',' + (parseInt(dataTotal) - (parseInt(dataPastDueDate)+parseInt(dataLateApproved)+parseInt(dataLateExecuted)+parseInt(dataLateReported))))+'\n';

    //console.log('rendering timeliness graph', this.csvGraphStats);

    const itemsTimeliness = divContainer.querySelectorAll('.stat-timeliness') as NodeListOf<HTMLElement>;
    for(var i = 0; i < itemsTimeliness.length; i++) {
      itemsTimeliness[i].style.display = 'flex';
    }
    const itemsCompleteness = divContainer.querySelectorAll('.stat-completeness') as NodeListOf<HTMLElement>;
    for(var i = 0; i < itemsCompleteness.length; i++) {
      itemsCompleteness[i].style.display = 'none';
    }
    const itemsCompliance = divContainer.querySelectorAll('.stat-compliance') as NodeListOf<HTMLElement>;
    for(var i = 0; i < itemsCompliance.length; i++) {
      itemsCompliance[i].style.display = 'none';
    }

    this.renderChartSettings(divContainer, -1, ctx);
    this.renderChart(ctx, 'doughnut', data, "Timeliness")

  }

  renderRiskSeverityGraph = (divContainer: HTMLDivElement) => {

    //console.log('Rendering risk severity', this.riskSeverityComplianceStatusData);

    this.renderGraph(divContainer, this.riskSeverityData, this.riskSeverityPartStatusData, this.riskSeverityLateStatusData, this.riskSeverityComplianceStatusData, 'RiskSeverity');

  }

  renderObligationTypeGraph = (divContainer: HTMLDivElement) => {

    this.renderGraph(divContainer, this.obligationTypeData, this.obligationTypePartStatusData, this.obligationTypeLateStatusData, this.obligationTypeComplianceStatusData, 'ObligationType');

  }

  renderFunctionGraph = (divContainer: HTMLDivElement) => {

    this.renderGraph(divContainer, this.functionData, this.functionPartStatusData, this.functionLateStatusData, this.functionComplianceStatusData, 'Function');

  }

  renderLocationGraph = (divContainer: HTMLDivElement) => {
    
    this.renderGraph(divContainer, this.locationData, this.locationPartStatusData, this.locationLateStatusData, this.locationComplianceStatusData, 'Location');

  }

  renderJurisdictionGraph = (divContainer: HTMLDivElement) => {

    this.renderGraph(divContainer, this.jurisdictionData, this.jurisdictionPartStatusData, this.jurisdictionLateStatusData, this.jurisdictionComplianceStatusData, 'Jurisdiction');

  }

  renderSubcategoryGraph = (divContainer: HTMLDivElement) => {

    this.renderGraph(divContainer, this.subcategoryData, this.subcategoryPartStatusData, this.subcategoryLateStatusData, this.subcategoryComplianceStatusData, 'SubCategory');

  }

  renderFrequencyGraph = (divContainer: HTMLDivElement) => {

    this.renderGraph(divContainer, this.frequencyData, this.frequencyPartStatusData, this.frequencyLateStatusData, this.frequencyComplianceStatusData, 'Frequency');

  }

  renderRiskGraph = (divContainer: HTMLDivElement) => {

    this.renderGraph(divContainer, this.riskAreasData, this.riskAreasPartStatusData, this.riskAreasLateStatusData, this.riskAreasComplianceStatusData, 'RiskAreas');

  }

  populateGraphDataBarPart = (partData: any) => {

    const dataBar:any = {};

    dataBar['labels'] = [];
    for(var i = 0; i < Object.keys(partData).length; i++) {
      dataBar['labels'].push(this.formatLabel(Object.keys(partData)[i], 15));
    }
    dataBar['datasets'] = [];
    dataBar['datasets'].push({});
    dataBar['datasets'].push({});
    dataBar['datasets'].push({});
    dataBar['datasets'].push({});

    dataBar['datasets'][0]['label'] = 'Approved';
    dataBar['datasets'][0]['data'] = [];
    for(i = 0; i < Object.keys(partData).length; i++) {
      dataBar['datasets'][0]['data'].push(partData[Object.keys(partData)[i]]['approved']);
    }
    dataBar['datasets'][0]['backgroundColor'] = this.COLOR_APPROVED;

    dataBar['datasets'][1]['label'] = 'Pending Approval';
    dataBar['datasets'][1]['data'] = [];
    for(i = 0; i < Object.keys(partData).length; i++) {
      dataBar['datasets'][1]['data'].push(partData[Object.keys(partData)[i]]['pending-approval']);
    }
    dataBar['datasets'][1]['backgroundColor'] = this.COLOR_PENDING_APPROVAL;

    
    dataBar['datasets'][2]['label'] = 'Rejected';
    dataBar['datasets'][2]['data'] = [];
    for(i = 0; i < Object.keys(partData).length; i++) {
      dataBar['datasets'][2]['data'].push(partData[Object.keys(partData)[i]]['rejected']);
    }
    dataBar['datasets'][2]['backgroundColor'] = this.COLOR_REJECTED;

    dataBar['datasets'][3]['label'] = 'Not Started';
    dataBar['datasets'][3]['data'] = [];
    for(i = 0; i < Object.keys(partData).length; i++) {
      dataBar['datasets'][3]['data'].push(partData[Object.keys(partData)[i]]['not-started']);
    }
    dataBar['datasets'][3]['backgroundColor'] = this.COLOR_NOT_STARTED;

    return dataBar;

  }

  populateGraphDataBarLate = (lateData: any) => {

    const dataBar2:any = {};

    dataBar2['labels'] = [];
    for(var i = 0; i < Object.keys(lateData).length; i++) {
      dataBar2['labels'].push(this.formatLabel(Object.keys(lateData)[i], 15));
    }
    dataBar2['datasets'] = [];
    dataBar2['datasets'].push({});
    dataBar2['datasets'].push({});
    dataBar2['datasets'].push({});
    dataBar2['datasets'].push({});
    dataBar2['datasets'].push({});

    dataBar2['datasets'][0]['label'] = 'In Time';
    dataBar2['datasets'][0]['data'] = [];
    for(i = 0; i < Object.keys(lateData).length; i++) {
      dataBar2['datasets'][0]['data'].push(lateData[Object.keys(lateData)[i]]['in-time']);
    }
    dataBar2['datasets'][0]['backgroundColor'] = '#888888';

    dataBar2['datasets'][1]['label'] = 'Past Due Date';
    dataBar2['datasets'][1]['data'] = [];
    for(i = 0; i < Object.keys(lateData).length; i++) {
      dataBar2['datasets'][1]['data'].push(lateData[Object.keys(lateData)[i]]['past-due-date']);
    }
    dataBar2['datasets'][1]['backgroundColor'] = this.COLOR_PAST_DUE_DATE;

    dataBar2['datasets'][2]['label'] = 'Late Executed';
    dataBar2['datasets'][2]['data'] = [];
    for(i = 0; i < Object.keys(lateData).length; i++) {
      dataBar2['datasets'][2]['data'].push(lateData[Object.keys(lateData)[i]]['late-executed']);
    }
    dataBar2['datasets'][2]['backgroundColor'] = this.COLOR_LATE_EXECUTED;

    dataBar2['datasets'][3]['label'] = 'Late Approved';
    dataBar2['datasets'][3]['data'] = [];
    for(i = 0; i < Object.keys(lateData).length; i++) {
      dataBar2['datasets'][3]['data'].push(lateData[Object.keys(lateData)[i]]['late-approved']);
    }
    dataBar2['datasets'][3]['backgroundColor'] = this.COLOR_LATE_APPROVED;

    dataBar2['datasets'][4]['label'] = 'Late Reported';
    dataBar2['datasets'][4]['data'] = [];
    for(i = 0; i < Object.keys(lateData).length; i++) {
      dataBar2['datasets'][4]['data'].push(lateData[Object.keys(lateData)[i]]['late-reported']);
    }
    dataBar2['datasets'][4]['backgroundColor'] = this.COLOR_LATE_REPORTED;

    return dataBar2;

  }

  populateGraphDataBarCompliance = (complianceData: any) => {

    const dataBar2:any = {};

    dataBar2['labels'] = [];
    for(var i = 0; i < Object.keys(complianceData).length; i++) {
      dataBar2['labels'].push(this.formatLabel(Object.keys(complianceData)[i], 15));
    }
    dataBar2['datasets'] = [];
    dataBar2['datasets'].push({});
    dataBar2['datasets'].push({});
    dataBar2['datasets'].push({});
    dataBar2['datasets'].push({});

    dataBar2['datasets'][0]['label'] = 'Scheduled';
    dataBar2['datasets'][0]['data'] = [];
    for(i = 0; i < Object.keys(complianceData).length; i++) {
      dataBar2['datasets'][0]['data'].push(complianceData[Object.keys(complianceData)[i]]['scheduled']);
    }
    dataBar2['datasets'][0]['backgroundColor'] = this.COLOR_SCHEDULED;

    dataBar2['datasets'][1]['label'] = 'Not Complied';
    dataBar2['datasets'][1]['data'] = [];
    for(i = 0; i < Object.keys(complianceData).length; i++) {
      dataBar2['datasets'][1]['data'].push(complianceData[Object.keys(complianceData)[i]]['not-complied']);
    }
    dataBar2['datasets'][1]['backgroundColor'] = this.COLOR_NOT_COMPLIED;

    dataBar2['datasets'][2]['label'] = 'Partially Complied';
    dataBar2['datasets'][2]['data'] = [];
    for(i = 0; i < Object.keys(complianceData).length; i++) {
      dataBar2['datasets'][2]['data'].push(complianceData[Object.keys(complianceData)[i]]['partially-complied']);
    }
    dataBar2['datasets'][2]['backgroundColor'] = this.COLOR_PARTIALLY_COMPLIED;

    dataBar2['datasets'][3]['label'] = 'Complied';
    dataBar2['datasets'][3]['data'] = [];
    for(i = 0; i < Object.keys(complianceData).length; i++) {
      dataBar2['datasets'][3]['data'].push(complianceData[Object.keys(complianceData)[i]]['complied']);
    }
    dataBar2['datasets'][3]['backgroundColor'] = this.COLOR_COMPLIED;

    return dataBar2;

  }

  populateGraphDataPie = (pieData: any) => {

    const data:any = {};
    data['labels'] = [];
    data['datasets'] = [];
    data['datasets'].push({});
    data['datasets'][0]['data'] = [];
    data['datasets'][0]['backgroundColor'] = [];
    data['datasets'][0]['borderWidth'] = 1;
    for(var i = 0; i < Object.keys(pieData).length; i++) {
      data['labels'].push(Object.keys(pieData)[i]);
    }
    for(var i = 0; i < Object.keys(pieData).length; i++) {
      data['datasets'][0]['data'].push(pieData[Object.keys(pieData)[i]]);
      data['datasets'][0]['backgroundColor'].push(Util.getRandomColor());
    }

    return data;
  }

  renderPieCsv = (pieData: any, csv: string, param: string) => {

    csv += param + ','
    for(var i = 0; i < Object.keys(pieData).length; i++) {
      csv += (Object.keys(pieData)[i])
      if(i < (Object.keys(pieData).length - 1)) {
        csv += ','
      }
    }
    csv += '\n'

    csv += 'Count,'
    for(var i = 0; i < Object.keys(pieData).length; i++) {
      csv += (pieData[Object.keys(pieData)[i]])
      if(i < (Object.keys(pieData).length - 1)) {
        csv += ','
      }
    }
    csv += '\n'

    return csv;

  }

  renderGraph = (divContainer: HTMLDivElement, pieData: any, partData: any, lateData: any, complianceData: any, param: string) => {

    this.clearSelectedGraphParam();
    // this.clearSelectedLegend();

    this.csvGraphStats = "";
    this.csvCompletenessStats = "";
    this.csvTimelinessStats = "";
    this.csvComplianceStats = "";

    if(pieData == null) return;

    // this.clearGraph(divContainer, 4);

    const data:any = this.populateGraphDataPie(pieData);
    
    this.csvGraphStats = this.renderPieCsv(pieData, this.csvGraphStats, param);

    const ctx = divContainer.querySelector('#myChart') as ChartItem;
    this.renderChartSettings(divContainer, -1, ctx);
    this.renderChart(ctx, 'pie', data, param + " Distribution")

    // 2

    const dataBar:any = this.populateGraphDataBarPart(partData);
    const ctx2 = divContainer.querySelector('#myChart2') as ChartItem;
    this.showGraph(divContainer, 2);
    this.renderChart2(ctx2, 'bar', dataBar, param + " vs Completeness")
    this.renderCompletenessCsvForGraph(dataBar, param + " Completeness Breakdown")

    // 3

    const dataBar2:any = this.populateGraphDataBarLate(lateData);
    const ctx3 = divContainer.querySelector('#myChart3') as ChartItem;
    this.showGraph(divContainer, 3);
    this.renderChart3(ctx3, 'bar', dataBar2, param + " vs Timeliness")
    this.renderTimelinessCsvForGraph(dataBar2, param + " Timeliness Breakdown")

    // 4

    //console.log('rendering compliance matrix', complianceData);

    const dataBar3:any = this.populateGraphDataBarCompliance(complianceData);

    //console.log('rendering compliance matrix', dataBar3);

    const ctx4 = divContainer.querySelector('#myChart4') as ChartItem;
    this.showGraph(divContainer, 4);
    this.renderChart4(ctx4, 'bar', dataBar3, param + " vs Compliance")
    this.renderComplianceCsvForGraph(dataBar3, param + " Compliance Breakdown")

    const itemsTimeliness = divContainer.querySelectorAll('.stat-timeliness') as NodeListOf<HTMLElement>;
    for(var i = 0; i < itemsTimeliness.length; i++) {
      itemsTimeliness[i].style.display = 'flex';
    }
    const itemsCompleteness = divContainer.querySelectorAll('.stat-completeness') as NodeListOf<HTMLElement>;
    for(var i = 0; i < itemsCompleteness.length; i++) {
      itemsCompleteness[i].style.display = 'flex';
    }
    const itemsCompliance = divContainer.querySelectorAll('.stat-compliance') as NodeListOf<HTMLElement>;
    for(var i = 0; i < itemsCompliance.length; i++) {
      itemsCompliance[i].style.display = 'flex';
    }


  }

  renderEventDetailShort = (compliance: any) => {

    var html = `
    
      <div class="d-flex justify-between m-20">
        <button part="button-icon" class="material-icons invisible">close</button>
        <h3 part="results-title" class="m-0">Compliance Details</h3>
        <button id="button-detail-close" part="button-icon" class="material-icons">close</button>
      </div>
    
    `;

    let shortId : string = "";

    html += '<div class="accordian-container m-20 pb-20" part="accordian-container">';

      html += '<div class="accordian-section section-basic pl-20 pr-20" part="accordian-section">';

        html += '<div class="d-flex flex-wrap accordian-body body-basic" part="accordian-body">';
        
          const data = JSON.parse(compliance.data);
          const cols = JSON.parse(compliance.cols);
          //console.log('cols', cols, cols.length);

          for(var k = 0; k < cols.length; k++) {
            if(!this.EXCLUDE_COLS_FROM_REGS.includes(cols[k].toLowerCase())) {

              html += '<div class="m-20">';
              html += '<div part="detail-head"><strong>' + cols[k] + '</strong></div>'
                html += '<sf-i-elastic-text text="'+data[k]+'" minLength="80" lineSize="6"></sf-i-elastic-text>';
              html += '</div>';

            }
            if(cols[k].toLowerCase() == "shortid") {

              shortId = (data[k])[0];

            }
          }

          console.log('shortid', shortId);
        
        html += '</div>';

        html += '<div class="d-flex justify-end flex-wrap">'
          html += '<div class="d-flex justify-end w-100 mb-10">'
            html += '<textarea part="input" id="feedback-message" class="w-100 mt-10 mb-10 hide" placeholder="Type your feedback message here..."></textarea>'
          html += '</div>'
          html += '<div class="d-flex justify-end w-100">'
            html += ('<button part="button-lg-short" id="button-feedback" class="d-flex justify-center align-center"><span class="material-symbols-outlined">comment</span><span>&nbsp;&nbsp;Send Feedback</span></button>');
            html += ('<button part="button-lg-short-secondary" id="button-feedback-cancel" class="hide d-flex justify-center align-center mr-10"><span class="material-symbols-outlined">close</span><span>&nbsp;&nbsp;Cancel</span></button>');
            html += ('<button part="button-lg-short" id="button-feedback-confirm" class="hide d-flex justify-center align-center"><span class="material-symbols-outlined">commentcheck</span><span>&nbsp;&nbsp;Submit Feedback</span></button>');
          html += '</div>'
        html += '</div>'

      html += '</div>';

    html += '</div>';

    (this._SfDetailContainer as HTMLDivElement).style.display = 'block';
    (this._SfDetailContainer as HTMLDivElement).innerHTML = html;

    (this._SfDetailContainer as HTMLDivElement).querySelector('#button-detail-close')?.addEventListener('click', () => {

      (this._SfDetailContainer as HTMLDivElement).innerHTML = '';
      (this._SfDetailContainer as HTMLDivElement).style.display = 'none';

    });

    (this._SfDetailContainer as HTMLDivElement).querySelector('#button-feedback')?.addEventListener('click', () => {

      const feedbackMessage = ((this._SfDetailContainer as HTMLDivElement).querySelector('#feedback-message') as HTMLTextAreaElement);
      const buttonFeedback = ((this._SfDetailContainer as HTMLDivElement).querySelector('#button-feedback') as HTMLButtonElement);
      const buttonCancel = ((this._SfDetailContainer as HTMLDivElement).querySelector('#button-feedback-cancel') as HTMLButtonElement);
      const buttonConfirm = ((this._SfDetailContainer as HTMLDivElement).querySelector('#button-feedback-confirm') as HTMLButtonElement);
      
      console.log(buttonConfirm.classList);

      if(feedbackMessage.classList.contains('hide')) {
        feedbackMessage.classList.remove('hide');
      }
      
      if(buttonConfirm.classList.contains('hide')) {
        buttonConfirm.classList.remove('hide');
      }

      if(buttonCancel.classList.contains('hide')) {
        buttonCancel.classList.remove('hide');
      }

      if(!buttonFeedback.classList.contains('hide')) {
        buttonFeedback.classList.add('hide');
      }

      // const body = {
      //   projectid: this.projectId,
      //   complianceid: compliance.id
      // }
      // console.log(body);

    });

    (this._SfDetailContainer as HTMLDivElement).querySelector('#button-feedback-cancel')?.addEventListener('click', () => {

      const feedbackMessage = ((this._SfDetailContainer as HTMLDivElement).querySelector('#feedback-message') as HTMLTextAreaElement);
      const buttonFeedback = ((this._SfDetailContainer as HTMLDivElement).querySelector('#button-feedback') as HTMLButtonElement);
      const buttonCancel = ((this._SfDetailContainer as HTMLDivElement).querySelector('#button-feedback-cancel') as HTMLButtonElement);
      const buttonConfirm = ((this._SfDetailContainer as HTMLDivElement).querySelector('#button-feedback-confirm') as HTMLButtonElement);
      
      console.log(buttonConfirm.classList);

      if(!feedbackMessage.classList.contains('hide')) {
        feedbackMessage.classList.add('hide');
      }
      
      if(!buttonConfirm.classList.contains('hide')) {
        buttonConfirm.classList.add('hide');
      }

      if(!buttonCancel.classList.contains('hide')) {
        buttonCancel.classList.add('hide');
      }

      if(buttonFeedback.classList.contains('hide')) {
        buttonFeedback.classList.remove('hide');
      }

    });

    (this._SfDetailContainer as HTMLDivElement).querySelector('#button-feedback-confirm')?.addEventListener('click', async () => {

      const feedbackMessage = ((this._SfDetailContainer as HTMLDivElement).querySelector('#feedback-message') as HTMLTextAreaElement);
      const buttonCancel = ((this._SfDetailContainer as HTMLDivElement).querySelector('#button-feedback-cancel') as HTMLButtonElement);
      const buttonClose = ((this._SfDetailContainer as HTMLDivElement).querySelector('#button-detail-close') as HTMLButtonElement);

      if(feedbackMessage.value.length === 0) {
        feedbackMessage.setAttribute('style', 'border:solid 2px ' + this.COLOR_REJECTED + ' !important');
      } else {
        feedbackMessage.setAttribute('style', 'border:');
        const cols = JSON.parse(compliance.cols) as Array<string>;
        const data = JSON.parse(compliance.data)
        console.log(compliance, cols, data);
        this.uploadTriggerMyEvent(
          compliance.id + ";" + shortId, 
          feedbackMessage.value, 
          compliance.countries.join(",").replace(/ *\([^)]*\) */g, ""), 
          compliance.entities.join(',').replace(/ *\([^)]*\) */g, ""), 
          compliance.locations.join(',').replace(/ *\([^)]*\) */g, ""), 
          data[cols.indexOf('statute')][0], 
          data[cols.indexOf('subcategory')][0]);
        buttonCancel.click();
        buttonClose.click();
      }
      
    });

    (this._SfDetailContainer as HTMLDivElement).querySelector('#feedback-message')?.addEventListener('keyup', (e: any) => {

      if(e.code == "Enter") {

        const buttonConfirm = ((this._SfDetailContainer as HTMLDivElement).querySelector('#button-feedback-confirm') as HTMLButtonElement);
        buttonConfirm.click();

      }

    })

  }

  renderEventDetail = (event: any, mmddyyyy: any, currentColumnButton: HTMLButtonElement | null) => {

    let comments, docs, approved, dateOfCompletion, makercheckers: Array<string>, docsOptional, documentType;
    let entityId: string = "";
    let locationId: string = "";

    entityId = event.entityid;
    locationId = event.locationid;
    comments = event['comments'] == null ? [] : (event['comments']);
    docs = event['documents'] == null ? [] : event['documents'] == null ? [] :  (event['documents']);
    approved = event['approved'] == null ? false : event['approved'] == null ? false : event['approved'];
    dateOfCompletion = event['dateofcompletion'] == null ? '' : event['dateofcompletion'] == null ? '' : event['dateofcompletion'];
    makercheckers = event['makercheckers'] == null ? [] : event['makercheckers'] == null ? [] : event['makercheckers']; 
    docsOptional = event['docs'] == null ? [] : event['docs'] == null ? [] : event['docs'];
    documentType = event['documenttype'] == null ? null : event['documenttype'][0] == null ? null : event['documenttype'][0].split(" ")[0];


    console.log('event detail', event);
    //console.log('event detail comments', comments);
    //console.log('event dateofcompletion', dateOfCompletion);
    //console.log('event detail documenttype', documentType);
    const basicFields = ['id', 'shortid', 'entityname', 'locationname','functions'];
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
            console.log('basicFields', event[basicFields[i]] + "");
            if((event[basicFields[i]] + "").indexOf("[") >= 0) {
              html += this.getEventTexts(basicFields[i], JSON.parse(event[basicFields[i]]), event).replace(/ *\([^)]*\) */g, "").trim();
            } else {
              html += '<sf-i-elastic-text text="'+(event[basicFields[i]] + "").replace(/"/g, "").replace(/ *\([^)]*\) */g, "").trim().split(';')[0]+'" minLength="80"></sf-i-elastic-text>';
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

      html += '<div class="m-20">';
      html += '<div part="detail-head"><strong>Reporters</strong></div>'
      html += this.getReporterDetailStringFromEvent(event);
      html += '</div>';

      html += '<div class="m-20">';
      html += '<div part="detail-head"><strong>Approvers</strong></div>'
      html += this.getApproverDetailStringFromEvent(event);
      html += '</div>';

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

        //console.log(complianceFields[i]);
        //console.log(event[complianceFields[i]]);

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

        //console.log(grcFields[i]);
        if(!this.getEventPreviewFields().includes(grcFields[i])) {
    
          if(!this.getEventHideFields().includes(grcFields[i])) {

            html += '<div class="m-20">';
            html += '<div part="detail-head"><strong>'+grcFields[i]+'</strong></div>'

            if(grcFields[i].toLowerCase() == "riskarea") {

              const arrValues = event[grcFields[i]];
              for(var k = 0; k < arrValues.length; k++) {
                html += '<div part="detail-reporter-name" class="mr-10">' + arrValues[k] + '</div>';
              }

            } else {
              if((event[grcFields[i]] + "").indexOf("[") >= 0) {
                html += this.getEventTexts(grcFields[i], JSON.parse(event[grcFields[i]]), event);
              } else {
                //console.log('grcfield', event[grcFields[i]]);
                html += '<sf-i-elastic-text text="'+(event[grcFields[i]] + "").replace(/"/g, "").replace(/\n/g,'<br />')+'" minLength="80"></sf-i-elastic-text>';
              }
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
    //       //console.log(Object.keys(event)[k], event[Object.keys(event)[k]]);
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

      
      //console.log('docs received', event['documents']);
      //console.log('docs received', comments);
      //console.log('docs received', approved);
        
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

          if(this.myRole != this.TAB_FUNCTION_HEAD && docs.length > 0) {
            html += '<div class="m-20">';
            html += '<label part="input-label">Supporting Documents</label>';
            html += '<slot name="uploader"></slot>';
            html += '</div>';  
          }

          html += '<div class="d-flex m-20 flex-col">';
            html += '<label part="input-label">Approver Comments*</label>';
            html += '<input id="input-approver-comments" type="text" part="input" value=""/><br />';
            html += '<label part="input-label">Date of Completion*</label>';
            html += '<input id="input-approver-doc" part="input" type="date" value="'+(dateOfCompletion == "" ? dateOfCompletion : new Date(parseInt(dateOfCompletion)).toISOString().substring(0,10))+'" disabled/><br />';
            html += '<div>'
              html += '<label part="input-label">Approve?*</label><br />';
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
            html += '<label part="input-label">Reporter Comments*</label>';
            html += '<input id="input-reporter-comments" type="text" part="input" value=""/><br />';
            html += '<label part="input-label">Date of Completion*</label>';
            html += '<input id="input-reporter-doc" part="input" type="date" value="'+(dateOfCompletion == "" ? dateOfCompletion : new Date(parseInt(dateOfCompletion)).toISOString().substring(0,10))+'" max="'+(new Date().toISOString().substring(0, 10))+'"/><br />';
            // if(docsOptional.length === 0) {
              html += '<label part="input-label">Supporting Documents' + ((docsOptional.length > 0) ? '' : '*') + '</label>';
              html += '<slot name="uploader"></slot>';
            // }
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
          if(docs.length > 0) {
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
          if(docs.length === 0) {
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
            html += '<div class="mr-20 d-flex flex-col align-end"><span part="comment-username">'+(comments[i].username != null ? comments[i].username : '')+'</span><span part="td-head">'+comments[i].author+'</span>' + ((i === (comments.length - 1) && this.enableDeleteLatestReport) ? '<br /><button class="mt-5 button-delete" part="button">Delete</button>' : '') + '</div>';
            
            const onlyCommentText = (comments[i].comment + "").replace(/ *\([^)]*\) */g, "").trim();
            try {

              const jsonComments = JSON.parse(onlyCommentText);

              if(Util.isInteger(jsonComments)) {
                html += '<div class="">'+comments[i].comment+'<br /><small><span class="muted">'+comments[i].timestamp+'</span></small></div>';
              } else {
                //console.log('json comments', jsonComments);
                var htmlTable = '';
                for(var j = 0; j < Object.keys(jsonComments).length; j++) {
                  htmlTable += '<div class="mb-20">';
                    htmlTable += ('<div part="detail-head">' + Object.keys(jsonComments)[j] + '</div>');
                    htmlTable += ('<sf-i-elastic-text text="'+jsonComments[Object.keys(jsonComments)[j]]+'" minLength="20"></sf-i-elastic-text>');
                    htmlTable += '</div>';
                }
                html += '<div class="">'+htmlTable+'<small><span class="muted">'+comments[i].timestamp+'</span></small></div>';
              }
              
            } catch (e: any) {
              //console.log('json comments exception', comments[i]);
              html += '<div class="">'+comments[i].comment+'<br /><small><span class="muted">'+comments[i].timestamp+'</span></small></div>';
            }
            
            html += '</div>';
          }
          if(comments.length === 0) {
            html += '<div><strong>No comments yet!</strong></div>';
          }

        html += '</div>';

      html += '</div>';

      if(event.reportevent != null) {

        html += '<div class="d-flex justify-between m-20">';
        html += '<h3 part="results-title" class="m-0"><br />Reported Event Details</h3>';
        html += '</div>';
        html += '<div class="m-20">';

          html += '<div class="w-100p scroll-x">';

            const jsonReportEvent = JSON.parse(event.reportevent);

            html += '<table>';
            html += '<tr>';
            for(i = 0; i < Object.keys(jsonReportEvent).length; i++) {              

              if(!this.EXCLUDE_COLS_FROM_REGS.includes(Object.keys(jsonReportEvent)[i].toLowerCase())) {

                html += '<td part="td-body-register">';
                  html += ('<span part="td-head" style="padding-left: 0px !important">'+Object.keys(jsonReportEvent)[i]+'</span>');
                  html += ('<span part="td-body"><sf-i-elastic-text text="'+jsonReportEvent[Object.keys(jsonReportEvent)[i]]+'" lineSize="4" minLength="60"></sf-i-elastic-text>'+'</span>');
                html += '</td>';

              }

            }
            html += '</tr>';
            html += '</table>';
            
          html += '</div>';

        html += '<div>';
      }

    }

    (this._SfDetailContainer as HTMLDivElement).innerHTML = html;

    (this._SfDetailContainer as HTMLDivElement).querySelector('.button-delete')?.addEventListener('click', async () => {

      await this.fetchDeleteReview(event["id"], mmddyyyy, entityId, locationId);
      this.setSuccess('Deleted successfully!')
      setTimeout(() => {
        this.clearMessages()
      }, 3000);
      //console.log('deleted', resultDelete);
      if(this.getCurrentTab() == this.TAB_CUSTOM) {
        this.processDateSelection((this._SfCustomContainer as HTMLDivElement));
      } else {
        if(currentColumnButton != null) {
          currentColumnButton.click();
        }
      }
      
      var clickEvent = new MouseEvent("click", {
        "view": window,
        "bubbles": true,
        "cancelable": false
      });
      ((this._SfDetailContainer as HTMLDivElement).querySelector('#button-detail-close') as HTMLButtonElement)!.dispatchEvent(clickEvent);

    });

    (this._SfDetailContainer as HTMLDivElement).querySelector('#button-detail-close')?.addEventListener('click', () => {

      (this._SfDetailContainer as HTMLDivElement).innerHTML = '';
      (this._SfDetailContainer as HTMLDivElement).style.display = 'none';

    });

    (this._SfDetailContainer as HTMLDivElement).querySelector('.head-basic')?.addEventListener('click', () => {

      //console.log('head basic clicked', ((this._SfDetailContainer as HTMLDivElement).querySelector('.body-basic') as HTMLDivElement).style.display);

      if(((this._SfDetailContainer as HTMLDivElement).querySelector('.body-basic') as HTMLDivElement).style.display == 'flex' || ((this._SfDetailContainer as HTMLDivElement).querySelector('.body-basic') as HTMLDivElement).style.display == '') {
        ((this._SfDetailContainer as HTMLDivElement).querySelector('.body-basic') as HTMLDivElement).style.display = 'none';
        ((this._SfDetailContainer as HTMLDivElement).querySelector('.head-indicator-basic') as HTMLDivElement).innerHTML = '+';
      } else {
        ((this._SfDetailContainer as HTMLDivElement).querySelector('.body-basic') as HTMLDivElement).style.display = 'flex';
        ((this._SfDetailContainer as HTMLDivElement).querySelector('.head-indicator-basic') as HTMLDivElement).innerHTML = '-';
      }
    });
    
    (this._SfDetailContainer as HTMLDivElement).querySelector('.head-statute')?.addEventListener('click', () => {

      //console.log('head statute clicked', ((this._SfDetailContainer as HTMLDivElement).querySelector('.body-statute') as HTMLDivElement).style.display);

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

        var clickEvent = new MouseEvent("click", {
            "view": window,
            "bubbles": true,
            "cancelable": false
        });
        ((this._SfDetailContainer as HTMLDivElement).querySelector('#button-detail-close') as HTMLButtonElement)!.dispatchEvent(clickEvent);
        
        // await this.uploadReview(entityId, locationId, mmddyyyy, event["id"], comments, approved)

        if(this.selectedItems.length === 0) {

          await this.uploadReview(entityId, locationId, mmddyyyy, event["id"], comments, approved)

        } else {

          for(var k = 0; k < this.selectedItems.length; k++) {
            
            const selectedId = this.selectedItems[k];
            //console.log('selectedid', selectedId);
            entityId = selectedId.split('-')[7].replace(/_/g, '-');
            locationId = selectedId.split('-')[8].replace(/_/g, '-');
            const eventId = selectedId.split('-')[9].replace(/_/g, '-');
            mmddyyyy = selectedId.split('-')[10] + '/' + selectedId.split('-')[11] + '/' + selectedId.split('-')[12];

            //console.log(entityId, locationId, eventId, mmddyyyy);

            await this.uploadReview(entityId, locationId, mmddyyyy, eventId, comments, approved)

            this.setSuccess("Updating, please wait...");
            await this.sleep(2000);
            this.clearMessages();

          }

        }
        
        
        if(this.getCurrentTab() == this.TAB_CUSTOM) {
          this.processDateSelection((this._SfCustomContainer as HTMLDivElement));
        } else {
          if(currentColumnButton != null) {
            currentColumnButton.click();
          }
        }

      });

      (this._SfDetailContainer as HTMLDivElement).querySelector('#button-uploader-submit-audit')?.addEventListener('click', async () => {

        const comments = ((this._SfDetailContainer as HTMLDivElement).querySelector('#input-auditor-comments') as HTMLInputElement).value;
        const approved = ((this._SfDetailContainer as HTMLDivElement).querySelector('#input-approve-yes') as HTMLInputElement).checked;

        if(comments.trim().length === 0) {

          this.setError('Comments cannot be blank!');
          setTimeout(() => {
            this.clearMessages();
          }, 3000);

        } else {

          if(this.selectedItems.length === 0) {

            await this.uploadAudit(entityId, locationId, mmddyyyy, event["id"], comments, approved)
          
          } else {

            for(var k = 0; k < this.selectedItems.length; k++) {
                      
              const selectedId = this.selectedItems[k];
              //console.log('selectedid', selectedId);

              entityId = selectedId.split('-')[7].replace(/_/g, '-');
              locationId = selectedId.split('-')[8].replace(/_/g, '-');
              const eventId = selectedId.split('-')[9].replace(/_/g, '-');
              mmddyyyy = selectedId.split('-')[10] + '/' + selectedId.split('-')[11] + '/' + selectedId.split('-')[12];

              //console.log(entityId, locationId, eventId, mmddyyyy);

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
            this.processDateSelection((this._SfCustomContainer as HTMLDivElement));
          } else {
            if(currentColumnButton != null) {
              currentColumnButton.click();
            }
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

              //console.log('reporter comments 1', reportercomments);

              const reporterdoc = ((this._SfDetailContainer as HTMLDivElement).querySelector('#input-reporter-doc') as HTMLInputElement).value.length > 0 ? (new Date(((this._SfDetailContainer as HTMLDivElement).querySelector('#input-reporter-doc') as HTMLInputElement).value).getTime() + "") : "";
              let docs:any[] = [];

              //console.log('reporter comments 2', reportercomments);
              
              // if(docsOptional.length === 0) {
                docs = (this._SfUploader[0].querySelector('#uploader') as SfIUploader)!.selectedValues();
              // }
      
              //console.log('docs', docs);

              if(docs.length === 0 && docsOptional.length === 0) {

                //console.log('reporter comments 3', reportercomments);

                this.setError('No documents uploaded!');
                setTimeout(() => {
                  this.clearMessages();
                }, 3000);

              } else {

                //console.log('reporterdoc', reporterdoc);

                if(reporterdoc.length === 0) {

                  this.setError('Date of completion not selected!');
                  setTimeout(() => {
                    this.clearMessages();
                  }, 3000);

                } else {

                  //console.log('makerscheckers 1', reportercomments);

                  if(reportercomments.trim().length === 0) {

                    this.setError('Comments cannot be blank!');
                    setTimeout(() => {
                      this.clearMessages();
                    }, 3000);

                  } else {


                    var clickEvent = new MouseEvent("click", {
                      "view": window,
                      "bubbles": true,
                      "cancelable": false
                    });

                    ((this._SfDetailContainer as HTMLDivElement).querySelector('#button-detail-close') as HTMLButtonElement)!.dispatchEvent(clickEvent);

                    if(this.selectedItems.length === 0) {

                      //console.log('makerscheckers', makercheckers, reportercomments);

                      await this.uploadReport(entityId, locationId, mmddyyyy, event["id"], reportercomments, reporterdoc, docs, event)
                      if(makercheckers.length > 0) {

                        await this.uploadReview(entityId, locationId, mmddyyyy, event["id"], "Auto approved", true);

                      }

                    } else {

                      for(var k = 0; k < this.selectedItems.length; k++) {
                        
                        const selectedId = this.selectedItems[k];
                        //console.log('selectedid', selectedId);

                        const makercheckersL = selectedId.split('-')[5];
                        entityId = selectedId.split('-')[7].replace(/_/g, '-');
                        locationId = selectedId.split('-')[8].replace(/_/g, '-');
                        const eventId = selectedId.split('-')[9].replace(/_/g, '-');
                        mmddyyyy = selectedId.split('-')[10] + '/' + selectedId.split('-')[11] + '/' + selectedId.split('-')[12];

                        //console.log(entityId, locationId, eventId, mmddyyyy);

                        await this.uploadReport(entityId, locationId, mmddyyyy, eventId, reportercomments, reporterdoc, docs, event)
                        if(parseInt(makercheckersL) > 0) {

                          await this.uploadReview(entityId, locationId, mmddyyyy, eventId, "Auto approved", true);

                        }

                        this.setSuccess("Updating, please wait...");
                        await this.sleep(2000);
                        this.clearMessages();

                      }

                    }

                    
                    if(this.getCurrentTab() == this.TAB_CUSTOM) {
                      this.processDateSelection((this._SfCustomContainer as HTMLDivElement));
                    } else {
                      if(currentColumnButton != null) {
                        currentColumnButton.click();
                      }
                    }

                  }
                  

                }
              }
      
            });

          }
          
        }

      }
      
      if(this._SfUploader[0] != null) {

        this._SfUploader[0].querySelector('#uploader').addEventListener('uploadCompleted', (_ev: any) => {
          //console.log(ev);
        });  


        //console.log('documentType checking', documentType);

        if(documentType != null) {
          (this._SfUploader[0].querySelector('#uploader') as SfIUploader)!.docType = documentType;  
        }

        (this._SfUploader[0].querySelector('#uploader') as SfIUploader)!.prepopulatedInputArr = JSON.stringify([]);
        (this._SfUploader[0].querySelector('#uploader') as SfIUploader)!.loadMode();

        if(docs.length > 0) {
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

        const dataPassthrough = {
          projectId: this.projectId,
          countryId: this.countryId,
          entityId: entityId,
          locationId: locationId,
          mmddyyyy: mmddyyyy,
          complianceId: event['id'],
          path: "uploadextract"
        };

        const callbackUrlHost = "8icpy39ru0.execute-api.us-east-1.amazonaws.com";
        const callbackUrlPath = "test/uploadextract";

        (this._SfUploader[0].querySelector('#uploader') as SfIUploader)!.projectId = this.projectId;
        (this._SfUploader[0].querySelector('#uploader') as SfIUploader)!.dataPassthrough = JSON.stringify(dataPassthrough);
        (this._SfUploader[0].querySelector('#uploader') as SfIUploader)!.callbackUrlHost = callbackUrlHost;
        (this._SfUploader[0].querySelector('#uploader') as SfIUploader)!.callbackUrlPath = callbackUrlPath;
        (this._SfUploader[0].querySelector('#uploader') as SfIUploader)!.loadMode();

      }

      
      
      //console.log('approved 1', event["approved"], this.myRole, this.TAB_APPROVER);
      if(this.myRole == this.TAB_APPROVER || this.myRole == this.TAB_VIEWER || this.myRole == this.TAB_AUDITOR || this.myRole == this.TAB_FUNCTION_HEAD) {
        //console.log('approved 1', event["approved"], this.myRole, this.TAB_APPROVER);
        if(event["approved"] != null) {
          if(event["approved"] === true) {
            //console.log('approved 2', event["approved"], this.myRole, this.TAB_APPROVER);
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
          if((this._SfDetailContainer as HTMLDivElement).querySelector('#input-approve-yes') as HTMLInputElement != null) {
            ((this._SfDetailContainer as HTMLDivElement).querySelector('#input-approve-yes') as HTMLInputElement).checked = false;
          }
          if(((this._SfDetailContainer as HTMLDivElement).querySelector('#input-approve-no') as HTMLInputElement) != null) {
            ((this._SfDetailContainer as HTMLDivElement).querySelector('#input-approve-no') as HTMLInputElement).checked = true;
          }
          
        }
      }

    }

  }

  renderCalendar = () => {

    //console.log('redering calendar', this.events);

    var startDate = new Date(this.calendarStartMM + '/' + this.calendarStartDD + '/' + this.calendarStartYYYY);

    var html = '';

    for(var i = 0; i < 12; i++) {

      const monthStatus = this.getMonthStatus(startDate.getMonth(), startDate.getFullYear());
      //console.log('monthstatus', monthStatus);

      const partApproved = this.COLOR_APPROVED + ' 0%, ' + this.COLOR_APPROVED + ' ' + parseInt(monthStatus['percApproved'] + '') + '%';
      const partPendingApproval = this.COLOR_PENDING_APPROVAL + ' ' + parseInt(monthStatus['percApproved'] + '') + '%, ' + this.COLOR_PENDING_APPROVAL + ' ' + parseInt(monthStatus['percApproved'] + '') + parseInt(monthStatus['percPendingApproval'] + '') + '%';
      const partRejected = this.COLOR_REJECTED + ' ' + parseInt(monthStatus['percApproved'] + '') + parseInt(monthStatus['percPendingApproval'] + '') + '%, ' + this.COLOR_REJECTED + ' ' + parseInt(monthStatus['percApproved'] + '') + parseInt(monthStatus['percPendingApproval'] + '') + parseInt(monthStatus['percRejected'] + '') + '%';
      const partNotStarted = this.COLOR_NOT_STARTED + ' ' + parseInt(monthStatus['percApproved'] + '') + parseInt(monthStatus['percPendingApproval'] + '') + parseInt(monthStatus['percRejected'] + '') + '%, ' + this.COLOR_NOT_STARTED + ' ' + 100 + '%';


      html += '<div class="calendar-item d-flex flex-col flex-grow" part="calendar-month" style="background: linear-gradient(to right, '+partApproved+','+partPendingApproval+','+partRejected+','+partNotStarted+');">';
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
        //console.log('render stream', id);
        this.enableStream();
        this.renderTabs(this.TAB_STREAM);
        this.renderStream(parseInt(id));

      })

    }

  }

  matchesOnBoardingFilter = (country: string, state: string, subcategory: string, statute: string) => {

    // console.log('matchingonboarding','country=' + country, 'state=' + state, 'subcategory=' + subcategory, '-' + statute + '-');

    let matchesCountry = false;

    for(var i = 0; i < this.getfilterOnboarding().length; i++) {

      matchesCountry = false;

      if(country.toLowerCase().trim().indexOf(this.getfilterOnboarding()[i].country.trim().toLowerCase()) >= 0) {

        matchesCountry = true;

        let matchesState = false;
        let matchesSubcategory = false;
        
        //console.log('matchingonboarding', matchesCountry, statute);

        for(var j = 0; j < this.getfilterOnboarding()[i].states.length; j++) {

          //if(state.toLowerCase().indexOf(this.getfilterOnboarding()[i].states[j].toLowerCase()) >= 0) {
          if(this.getfilterOnboarding()[i].states[j].toLowerCase().indexOf(state.toLowerCase()) >= 0) {
            matchesState = true;
            break;
          }

        }

        //console.log('matchingonboarding', matchesState, statute);

        for(var j = 0; j < this.getfilterOnboarding()[i].subcategories.length; j++) {

          if(subcategory.toLowerCase().trim().indexOf(this.getfilterOnboarding()[i].subcategories[j].toLowerCase().trim()) >= 0) {
            matchesSubcategory = true;
          }

        }

        //console.log('matchingonboarding', matchesSubcategory, statute);

        let isNotExcludedStatute = true;

        if(this.getfilterOnboarding()[i].excludestatutes != null) {
          if(this.getfilterOnboarding()[i].excludestatutes.includes(statute.trim())) {
            isNotExcludedStatute = false;
          }
        }

        let isIncludedStatute = false;


        if(this.getfilterOnboarding()[i].includestatutes != null) {
          if(this.getfilterOnboarding()[i].includestatutes.includes(statute.trim())) {
            isIncludedStatute = true;
          }
        }

        if(statute == "Gujarat Goods and Services Tax Act, 2017 + Gujarat Goods and Services Tax Rules, 2017") {
          console.log('isIncludedStatute', isIncludedStatute);
        }
        //console.log('matchingonboarding', isIncludedStatute, this.getfilterOnboarding()[i].includestatutes, '='+statute);
        
        if(matchesCountry && matchesState && matchesSubcategory && isNotExcludedStatute) {
          //console.log('matchingonboarding return true');
          return true;
        }

        if(matchesCountry && isIncludedStatute) {
          //console.log('matchingonboarding return true');
          return true;
        }

      }

    }

    //console.log('matchingonboarding return true');
    return false;

  }

  applyAndReloadTagging = (e: any, colName: string, taggingArray: any, sourceArray: any, divElement: any) => {

    const selectedIndex = e.currentTarget.id.split('-')[1];

    // taggingArray.data.mappings.mappings = [];

    const tempArray = [];

    for(var count = 0; count < sourceArray.data.mappings.mappings.length; count++) {

      //console.log('selectedindexchecking', selectedIndex, count, this.selectedCbs.includes(selectedIndex), this.selectedCbs.includes(count));
      //taggingArray.data.mappings.mappings[count] = sourceArray.data.mappings.mappings[count];
      //taggingArray.data.mappings.mappings.push(sourceArray.data.mappings.mappings[count]);
      tempArray.push(sourceArray.data.mappings.mappings[count]);
      // //console.log('selectedindexchecking', this.selectedCbs, count, this.selectedCbs.includes(selectedIndex), this.selectedCbs.includes(count));
      if(this.selectedCbs.includes(selectedIndex) && this.selectedCbs.includes(count + '')) {
        if(((divElement as HTMLDivElement).querySelector('#tags-' + selectedIndex) as SfIForm).selectedValues != null) {

          if (tempArray[count] == null) tempArray[count] = {};
          tempArray[count][colName] = ((divElement as HTMLDivElement).querySelector('#tags-' + selectedIndex) as SfIForm).selectedValues();
          // //console.log('selectedindexchecking A');
          // if(taggingArray.data.mappings.mappings[count] == null) taggingArray.data.mappings.mappings[count] = {};
          // taggingArray.data.mappings.mappings[count][colName] = ((divElement as HTMLDivElement).querySelector('#tags-' + selectedIndex) as SfIForm).selectedValues();

        } else {

          //console.log('selectedindexchecking B');

          if (tempArray[count] == null) tempArray[count] = {};
          tempArray[count][colName] = ((divElement as HTMLDivElement).querySelector('#tags-' + selectedIndex) as HTMLInputElement).value;

          // if(taggingArray.data.mappings.mappings[count] == null) taggingArray.data.mappings.mappings[count] = {};
          // taggingArray.data.mappings.mappings[count][colName] = ((divElement as HTMLDivElement).querySelector('#tags-' + selectedIndex) as HTMLInputElement).value;
        }
        
      } else {

        if(((divElement as HTMLDivElement).querySelector('#tags-' + count) as SfIForm).selectedValues != null) {
          
          if (tempArray[count] == null) tempArray[count] = {};
          tempArray[count][colName] = ((divElement as HTMLDivElement).querySelector('#tags-' + count) as SfIForm).selectedValues();

          
        } else {
          //console.log('selectedindexchecking D');

          if (tempArray[count] == null) tempArray[count] = {};
          tempArray[count][colName] = ((divElement as HTMLDivElement).querySelector('#tags-' + count) as HTMLInputElement).value;

          // if(taggingArray.data.mappings.mappings[count] == null) taggingArray.data.mappings.mappings[count] = {};
          // taggingArray.data.mappings.mappings[count][colName] = ((divElement as HTMLDivElement).querySelector('#tags-' + count) as HTMLInputElement).value;
        }
        
      }

    }

    taggingArray.data.mappings.mappings = tempArray;
    //console.log('selectedindexchecking', colName, taggingArray);


  }

  getDataValue = (jsonData: any, id: string) => {

    let ret: any = null;

    //console.log('pushing up again..', id, jsonData);
    
    for(var i = 0; i < jsonData.length; i++) {
      if(jsonData[i].id == id) {

        return jsonData[i].data.data;
      }

    }

    return ret;

  }

  getColsValue = (jsonData: any, id: string) => {

    let ret: any = null;

    for(var i = 0; i < jsonData.length; i++) {

      if(jsonData[i].id == id) {
        return jsonData[i].data.cols;
      }

    }

    return ret;

  }

  saveMapping = async (divElement: any, uploadBlock: number, jsonData: any, extraFields: any, searchString: string, uploadFunction: any, refreshFunction: any, saveInBackground: boolean = false) => {

    const process = async () => {
      const tableRowArr = (divElement as HTMLDivElement).querySelectorAll('.tablerow') as NodeListOf<HTMLTableRowElement>;
      const checkboxArr = (divElement as HTMLDivElement).querySelectorAll('.checkbox-row') as NodeListOf<HTMLInputElement>;
      const statuteArr = (divElement as HTMLDivElement).querySelectorAll('.statute') as NodeListOf<SfIElasticText>;
      //console.log(tableRowArr);
      //console.log(checkboxArr);
      //console.log(statuteArr);
      for(var i = 0; i < statuteArr.length; i++) {
        //console.log((statuteArr[i] as SfIElasticText).text);
      }
      let updatedRows = [];
      let jsonArr = [];
      if(uploadBlock < 0) {
        for(var i = 0; i < checkboxArr.length; i++) {

          //console.log('tablerow', (tableRowArr[i] as HTMLTableRowElement));

          if((tableRowArr[i] as HTMLTableRowElement).style.display == 'none') {
          } else {
            updatedRows.push((statuteArr[i] as SfIElasticText).text);
          }

          var dataToBePushed = {id: (statuteArr[i] as SfIElasticText).text, selected: checkboxArr[i].checked, data: this.getDataValue(jsonData, (statuteArr[i] as SfIElasticText).text), cols: this.getColsValue(jsonData, (statuteArr[i] as SfIElasticText).text), extraFields: [] as string[], updatedFields: [] as string[]};
          for(var j = 0; j < extraFields.length; j++) {
            const inputArr = (divElement as HTMLDivElement).querySelectorAll('.extra-field-'+j) as NodeListOf<SfIMultitextarea>;
            const value = inputArr[i].getValues();
            // //console.log('value', value);
            dataToBePushed.extraFields.push(value);
            if(j === 0) {
              const fields = inputArr[i].getFields();
              dataToBePushed.updatedFields.push(...fields);
            }
          }
          
          jsonArr.push(dataToBePushed)    
        }
        //console.log('jsonArr', jsonArr);
        //console.log('updatedRows', updatedRows);
        const batchNum = new Date().getTime();
        await uploadFunction({"searchstring": searchString, "mappings": jsonArr, "batch": batchNum, "updatedrows": updatedRows});

      } else {

        const batchNum = new Date().getTime();
        for(var i = 0; i < checkboxArr.length; i+=uploadBlock) {

          if((tableRowArr[i] as HTMLTableRowElement).style.display == 'none') {
          } else {
            updatedRows.push((statuteArr[i] as SfIElasticText).text);
          }

          jsonArr = [];
          for(var k = i; k < (i + uploadBlock) && k < checkboxArr.length; k++) {

            if((statuteArr[k] as SfIElasticText) != null) {

              var dataToBePushed = {id: (statuteArr[k] as SfIElasticText).text, selected: checkboxArr[k].checked, data: this.getDataValue(jsonData, (statuteArr[k] as SfIElasticText).text), cols: this.getColsValue(jsonData, (statuteArr[k] as SfIElasticText).text), extraFields: [] as string[], updatedFields: [] as string[]};
              for(var j = 0; j < extraFields.length; j++) {
                const inputArr = (divElement as HTMLDivElement).querySelectorAll('.extra-field-'+j) as NodeListOf<SfIMultitextarea>;
                const value = inputArr[k].getValues();
                dataToBePushed.extraFields.push(value);
                if(j === 0) {
                  const fields = inputArr[i].getFields();
                  dataToBePushed.updatedFields.push(...fields);
                }
              }
              jsonArr.push(dataToBePushed)

            }

          }

          //console.log('jsonArr', i, jsonArr);
          //console.log('updatedRows', updatedRows);
          await uploadFunction({"searchstring": searchString, "mappings": jsonArr, "percentage": parseInt(((k*100)/checkboxArr.length) + ""), "batch": batchNum, "updatedrows": updatedRows});

          // await this.sleepFunction(2000);

        }

      }
      
      if(!saveInBackground) refreshFunction();
    }

    if(this.disablesave == "yes") {
      return;
    }

    if(saveInBackground) {
      if(this.AUTOSAVE_FLAG) {
        this.AUTOSAVE_FLAG = false;
        setTimeout(async () => {
            await process();
            this.AUTOSAVE_FLAG = true;
            this.setSuccess('Autosaved');
            setTimeout(() => {
              this.clearMessages();
            }, 1000);
        }, 5000);
      }
    } else {
      process();
    }

  }

  saveTagging = async (mapping: any, uploadFunction: any, refreshFunction: any, saveInBackground: boolean) => {

    async function process() {
      
      //console.log('Saving...', mapping);

      await uploadFunction(mapping);
      if(!saveInBackground) refreshFunction();
    }

    if(this.disablesave == "yes") {
      return;
    }

    if(saveInBackground) {
      if(this.AUTOSAVE_FLAG) {
        this.AUTOSAVE_FLAG = false;
        setTimeout(async () => {
            await process();
            this.AUTOSAVE_FLAG = true;
            this.setSuccess('Autosaved');
            setTimeout(() => {
              this.clearMessages();
            }, 1000);
        }, 10000);
      }
    } else {
      process();
    }

  }

  renderTaggingTable = (divElement: any, sourceArray: any, taggingArray: any, sourceCols: any, uploadFunction: any, refreshFunction: any, colName: any, uniqCols: Array<any>, apiIdDropdown: string, dropdownSearchPhrase: any, mandatoryFields: any, jobs: any, anotherProjection: any, extraFields: Array<string>, _arrFeedbackReference: any, proposedUsersLabel: string, subfilter: string) => {

    // source array is the serialized field mappedcompliances
    // tagging array is the tagged array mappedcountries

    //console.log('divelement', divElement);
    //console.log('sourcearray', sourceArray);
    //console.log('taggingarray', taggingArray);
    //console.log('uniqcols', uniqCols);
    //console.log('subfiltervalue', subfilter);
    //console.log('arrFeedbackReference', arrFeedbackReference);

    this.selectedCbs = [];

    if(taggingArray.length === 0 || sourceArray.length === 0) return;

    const foundArr = [];

    if(taggingArray.data.mappings != null) {

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

      }
    }

    if(taggingArray.data.mappings == null) {
      taggingArray.data.mappings = {};
    }

    taggingArray.data.mappings.mappings = foundArr;

    let mandatoryPresent = true;

    for(i = 0; i < (mandatoryFields as Array<string>).length; i++) {

      for(var j = 0; j < taggingArray.data.mappings.mappings.length; j++) {


        if(taggingArray.data.mappings.mappings[j][mandatoryFields[i]] == null) {
          mandatoryPresent = false;
        }

      }

    }

    var tagged = 0;

    for(var j = 0; j < taggingArray.data.mappings.mappings.length; j++) {

      if(taggingArray.data.mappings.mappings[j] != null) {
        if(taggingArray.data.mappings.mappings[j][colName] != null && taggingArray.data.mappings.mappings[j][colName].length > 0) {
          tagged++;
        }
  
      }
      
    }

    // let colCountry = -1;
    // let colState = -1;
    // let colSubcategory = -1;
    // let colStatute = -1;

    const unfilteredDict : any [] = [];

    var html = '';

    var showTable = true;

    html += '<div class="d-flex justify-between flex-wrap align-center"> ';

    // if(jobs && jobs.data) {
    //   html += (jobs.data.status == "0" ? "<div part=\"results-title\" class=\"left-sticky d-flex align-center mb-10 mr-10\"><span class=\"color-not-started material-icons\">schedule</span>&nbsp; Job initizalied</div>" : jobs.data.status == "1" ? "<div  part=\"results-title\" class=\"left-sticky d-flex align-center mb-10 mr-10\"><span class=\"color-pending material-icons\">pending</span>&nbsp; Job in-progress&nbsp; "+parseInt(jobs.data.progress)+"% complete</div>" : "<div part=\"results-title\" class=\"left-sticky d-flex align-center mb-10 mr-10\"><span class=\"color-done material-icons\">check_circle</span>&nbsp; Job complete</div>" );
    //   if(jobs.data.status == "0" || jobs.data.status == "1") {
    //     showTable = false;
    //   }
    // }

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

      html += ((jobs && jobs.data && (jobs.data.status == "1" || jobs.data.status == "0" )) ? '' : '<div class="left-sticky d-flex justify-between align-center mr-10"><h4 id="mapped-stats-title" part="results-title" class="d-flex align-center m-0">'+status+'&nbsp;&nbsp;Mapped '+tagged+' out of '+sourceArray.data.mappings.mappings.length+'</h4></div>');

    } else {

      html += ((jobs && jobs.data && (jobs.data.status == "1" || jobs.data.status == "0" )) ? '' : '<div class="left-sticky d-flex justify-between align-center mr-10"><h4 id="mapped-stats-title" part="results-title" class="d-flex align-center m-0">'+status+'&nbsp;&nbsp;Mapped '+tagged+' out of '+sourceArray.data.mappings.mappings.length+'</h4></div>')

    }
    
    html += ((jobs && jobs.data && (jobs.data.status == "1" || jobs.data.status == "0" )) ? '' : '<div class="left-sticky d-flex justify-between align-center mr-10"><h4 part="results-title" class="d-flex align-center m-0">' + mandatoryStatus + '</h4></div>')
    
    html += ((jobs && jobs.data && (jobs.data.status == "1" || jobs.data.status == "0" )) ? '' : '<div class="left-sticky d-flex justify-between align-center mr-10"><h4 id="span-extra-filled" class="m-0" part="results-title"></h4></div>')

    html += '<div class="d-flex align-center">';
      // html += '<input part="input" type="text" placeholder="Filter" class="input-filter mr-10" value="'+subfilter+'" />';
      html += '<div class="mr-10">';
        html += '<div class="d-flex justify-end"><button part="calendar-tab-icon-not-selected" class="material-icons button-toggle-more">expand_more</button><button part="calendar-tab-icon-selected" class="material-icons button-toggle-more-back hide">expand_less</button></div>'
        // html += '<div class="d-flex justify-end"><button part="button" class="align-center button-download-backups hide" style="position: absolute; margin-top: 5px;"><span class="material-symbols-outlined mr-10">file_save</span><span>Download Backups</span></button></div>'
        html += '<div style="position: absolute; margin-top: 5px;"><button part="button" class="hide d-flex align-center button-download-backups" style="margin-left: -80px"><span class="material-symbols-outlined mr-10">file_save</span><span>Download Backups</span></button><button part="button" class="mt-10 hide d-flex align-center button-export-mapping" style="margin-left: -80px"><span class="material-symbols-outlined mr-10">export_notes</span><span>Export Mapping</span></button></div>'
      html += '</div>';
      // console.log('jobs', jobs);
      html += ((jobs == null || jobs.data == null) ? '<button part="button" class="button-apply d-flex align-center mr-10"><span class="material-symbols-outlined mr-10">touch_app</span><span>Apply</span></button><button part="button" class="button-save d-flex align-center"><span class="material-symbols-outlined mr-10">save</span><span>Save</span></button>' : ((jobs.data.status == "1" || jobs.data.status == "0" ) ? '<button part="button" class="button-cancel">Cancel Job</button>' : (this.disablesave == "yes" ? '' : '<button part="button" class="button-apply d-flex align-center mr-10"><span class="material-symbols-outlined mr-10">touch_app</span><span>Apply</span></button><button part="button" class="button-save d-flex align-center"><span class="material-symbols-outlined mr-10">save</span><span>Save</span></button>')));
    html += '</div>';

    html += '</div>';

    html += '<div>';
    html += '<h4 id="span-filtered" part="results-title"></h4>'
    html += '<div id="div-subfiltered"></div>'
    html += '</div>';

    html += '<br />';

    var subfiltered = 0;

    if(showTable) {

      // for(var j = 0; j < JSON.parse(sourceArray.data.mappings.mappings[0].cols).length; j++) {
      //   if(JSON.parse(sourceArray.data.mappings.mappings[0].cols)[j].toLowerCase() == "country") {
      //     //console.log('colstate-setting country', JSON.parse(sourceArray.data.mappings.mappings[0].cols)[j].toLowerCase(), j);
      //     colCountry = j;
      //   }
      //   if(JSON.parse(sourceArray.data.mappings.mappings[0].cols)[j].toLowerCase() == "state") {
      //     //console.log('colstate-setting state', JSON.parse(sourceArray.data.mappings.mappings[0].cols)[j].toLowerCase(), j);
      //     colState = j;
      //   }
      //   if(JSON.parse(sourceArray.data.mappings.mappings[0].cols)[j].toLowerCase() == "subcategory") {
      //     //console.log('colstate-setting subcategory', JSON.parse(sourceArray.data.mappings.mappings[0].cols)[j].toLowerCase(), j);
      //     colSubcategory = j;
      //   }
      //   if(JSON.parse(sourceArray.data.mappings.mappings[0].cols)[j].toLowerCase() == "statute") {
      //     //console.log('colstate-setting statute', JSON.parse(sourceArray.data.mappings.mappings[0].cols)[j].toLowerCase(), j);
      //     colStatute = j;
      //   }
      // }

      html += '<table id="table-data" class="mt-20" style="height: 200px">';

      html += '<thead>';
      html += '<th part="td-head" class="td-head">'
      html += '<div id="select-all"><input class="checkbox checkbox-all" part="input-checkbox" type="checkbox" '+((this.disableflagggrcresponse.toLowerCase() == "yes") ? 'disabled' : '')+'/></div>';
      html += '</th>'
      for(var i = 0; i < extraFields.length; i++) {
        html += '<th part="td-head" class="td-head">'
        html += extraFields[i];
        html += '</th>'
      }
      html += '<th part="td-head" class="td-head">'
      html += colName;
      html += '</th>'
      // if(arrFeedbackReference != null) {
      //   html += '<th part="td-head" class="td-head">'
      //   html += proposedUsersLabel;
      //   html += '</th>'
      // }
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
        
        var showSearch = false;

        if(subfilter == "") {
          //console.log('showsearch true 1');
          showSearch = true;
        }

        // check showSearch in extra fields

        // if(!showSearch) {

        //   for(var j = 0; j < extraFields.length; j++) {

        //     var k = 0;
        //     for(k = 0; k < taggingArray.data.mappings.mappings.length; k++) {

        //       if(taggingArray.data.mappings.mappings[k].id == sourceArray.data.mappings.mappings[i].id) {
        //         break;
        //       }

        //     }

        //     if(k < taggingArray.data.mappings.mappings.length) {

        //       try {
        //         if(taggingArray.data.mappings.mappings[k].extraFields != null && taggingArray.data.mappings.mappings[k].extraFields[j] != null && taggingArray.data.mappings.mappings[k].extraFields[j].toLowerCase().indexOf(subfilter.toLowerCase()) >= 0) {

        //           //console.log('showsearch true 2', taggingArray.data.mappings.mappings[k].extraFields[j].toLowerCase(), subfilter);
        //           showSearch = true;
        //           subfiltered++;
        //           break;
      
        //         }
        //       } catch (_e: any) {

        //       }

        //       try {

        //         if(taggingArray.data.mappings.mappings[k].extraFields != null && taggingArray.data.mappings.mappings[k].extraFields[j] != null && JSON.stringify(taggingArray.data.mappings.mappings[k].extraFields[j]).toLowerCase().indexOf(subfilter.toLowerCase()) >= 0) {

        //           //console.log('showsearch true 2', taggingArray.data.mappings.mappings[k].extraFields[j].toLowerCase(), subfilter);
        //           showSearch = true;
        //           subfiltered++;
        //           break;
      
        //         }

        //       } catch (_e: any) {

        //       }
              

        //     }

        //   }

        // }

        // if(!showSearch) {

        //   // check showSearch in uniq cols

        //   for(var l = 0; l < uniqCols.length; l++) {

        //     if(sourceArray.data.mappings.mappings[i][uniqCols[l]].replace(/ *\([^)]*\) */g, "").toLowerCase().indexOf(subfilter.toLowerCase()) >= 0) {

        //       //console.log('showsearch true 3');
        //       showSearch = true;
        //       subfiltered++;
        //       break;
  
        //     }  
            
        //   }

        // }

        // if(!showSearch) {

        //   // check showSearch in source cols

        //   for(l = 0; l < sourceCols.length; l++) {

        //     for(var j = 0; j < JSON.parse(sourceArray.data.mappings.mappings[0].cols).length; j++) {
  
        //       if(sourceCols[l] == JSON.parse(sourceArray.data.mappings.mappings[0].cols)[j]) {
      
        //         if(sourceArray.data.mappings.mappings[i].data != null) {

        //           if(Array.isArray(JSON.parse(sourceArray.data.mappings.mappings[i].data)[j])) {
                  
        //             for(var k = 0; k < JSON.parse(sourceArray.data.mappings.mappings[i].data)[j].length; k++) {

        //               if(JSON.parse(sourceArray.data.mappings.mappings[i].data)[j][k].toLowerCase().indexOf(subfilter.toLowerCase()) >= 0) {

        //                 //console.log('showsearch true 4');
        //                 showSearch = true;
        //                 subfiltered++;
        //                 break;
            
        //               }  

        //             }
            
        //           } else {

        //             if(JSON.parse(sourceArray.data.mappings.mappings[i].data)[j].toLowerCase().indexOf(subfilter.toLowerCase()) >= 0) {

        //               //console.log('showsearch true 5');
        //               showSearch = true;
        //               subfiltered++;
        //               break;
          
        //             }
          
        //           }

        //         }

        //       }

        //     }

        //   }

        // }

        var classBg = "";

        if(i%2 === 0) {
          classBg = 'td-light';
        } else {
          classBg = 'td-dark';
        }

        html += '<tr class="" id="tablerow-'+i+'">';

        html += '<td class="left-sticky td-body '+classBg+'" ><div class="'+(!showSearch ? 'truncate' : '')+'"><input id="cb-'+i+'" type="checkbox" class="checkbox-row cb-select"/></div></td>';

        for(var j = 0; j < extraFields.length; j++) {

          var k = 0;
          for(k = 0; k < taggingArray.data.mappings.mappings.length; k++) {

            if(taggingArray.data.mappings.mappings[k].id == sourceArray.data.mappings.mappings[i].id) {
              break;
            }

          }

          if(k < taggingArray.data.mappings.mappings.length) {

            html += '<td part="td-body" class="'+classBg+'">';
            html += '<div class="'+(!showSearch ? 'truncate' : '')+'">'
            // html += '<textarea part="input" id="extra-field-'+i+'-'+j+'" class="extra-field extra-field-'+j+'" '+ (taggingArray.data.mappings.mappings[k].extraFields != null ? (taggingArray.data.mappings.mappings[k].extraFields[j] != null ?  ((taggingArray.data.mappings.mappings[k].extraFields[j].toLowerCase() == "client remarks" && this.disableflagggrcresponse.toLowerCase() == "yes") ? 'disabled' : ((taggingArray.data.mappings.mappings[k].extraFields[j].toLowerCase() == "flagggrc response" && this.disableflagggrcresponse.toLowerCase() == "yes") ? 'disabled' : '')) : "") : "") +' >'+(taggingArray.data.mappings.mappings[k].extraFields != null ? (taggingArray.data.mappings.mappings[k].extraFields[j] != null ? taggingArray.data.mappings.mappings[k].extraFields[j] : "") : "")+'</textarea>';
            html += '<textarea part="input" id="extra-field-'+i+'-'+j+'" class="extra-field extra-field-'+j+'" '+ (extraFields != null ? (extraFields[j] != null ?  ((extraFields[j].toLowerCase() == "client remarks" && this.disableclientresponse.toLowerCase() == "yes") ? 'disabled' : ((extraFields[j].toLowerCase() == "flagggrc response" && this.disableflagggrcresponse.toLowerCase() == "yes") ? 'disabled' : '')) : "") : "") +' >'+(taggingArray.data.mappings.mappings[k].extraFields != null ? (taggingArray.data.mappings.mappings[k].extraFields[j] != null ? (typeof taggingArray.data.mappings.mappings[k].extraFields[j] == 'string' ? taggingArray.data.mappings.mappings[k].extraFields[j] : "") : "") : "")+'</textarea>';
            html += '</div>';
            html += '</td>';
  
          } else {

            html += '<td part="td-body" class="'+classBg+'">';
            html += '<div class="'+(!showSearch ? 'truncate' : '')+'">';
            html += '<textarea part="input" id="extra-field-'+i+'-'+j+'" class="extra-field extra-field-'+j+'" type="text" value="" '+ ((extraFields[j].toLowerCase() == "flagggrc response" && this.disableflagggrcresponse.toLowerCase() == "yes") ? 'disabled' : '') +' ></textarea>';
            html += '</div>';
            html += '</td>';

          }

          
        }

        html += '<td class="td-body '+classBg+'" part="td-key">'
        html += '<div class="'+(!showSearch ? 'truncate' : '')+'">';
        if(apiIdDropdown.length > 0) {
          if(anotherProjection != null) {
            html += '<sf-i-form id="tags-'+i+'" class="tags-input tags-'+i+'" name="Tags" label="Select '+colName+'" apiId="'+apiIdDropdown+'" mode="multiselect-dropdown" searchPhrase="'+this.projectId+((dropdownSearchPhrase != null && dropdownSearchPhrase != "") ? dropdownSearchPhrase : "")+'" selectProjection="name" selectAnotherProjection="'+anotherProjection+'" mandatory></sf-i-form>';
          } else {
            html += '<sf-i-form id="tags-'+i+'" class="tags-input tags-'+i+'" name="Tags" label="Select '+colName+'" apiId="'+apiIdDropdown+'" mode="multiselect-dropdown" searchPhrase="'+this.projectId+((dropdownSearchPhrase != null && dropdownSearchPhrase != "") ? dropdownSearchPhrase : "")+'" selectProjection="name" mandatory></sf-i-form>';
          }
          
        } else {
          html += '<input id="tags-'+i+'" type="text" part="input" class="tags-input"/>';
        }
        html += '</div>';
        html += '</td>'
        // if(arrFeedbackReference != null) {

        //   html += '<td class="td-body '+classBg+'" part="td-key">'
        //   html += '<div class="'+(!showSearch ? 'truncate' : '')+'">';
        //   if(arrFeedbackReference[JSON.parse(sourceArray.data.mappings.mappings[i].data)[1][0].trim()][JSON.parse(sourceArray.data.mappings.mappings[i].data)[6][0].trim().replace(/&amp;/g, "&")] == null) {

        //     this.setError(JSON.parse(sourceArray.data.mappings.mappings[i].data)[1][0].trim() + ':' + JSON.parse(sourceArray.data.mappings.mappings[i].data)[6][0].trim().replace(/&amp;/g, "&") + ' - is not mapped correctly');
        //     setTimeout(() => {
        //       this.clearMessages();
        //     }, 20000);

        //   } else {
        //     html += '<sf-i-elastic-text text="'+JSON.stringify(arrFeedbackReference[JSON.parse(sourceArray.data.mappings.mappings[i].data)[1][0].trim()][JSON.parse(sourceArray.data.mappings.mappings[i].data)[6][0].trim().replace(/&amp;/g, "&")]).replace(/"/g,"").replace(/\\n/g,"").replace(/{/g,"").replace(/}/g,"").replace(/\\/g,"")+'" lineSize="4" minLength="60"></sf-i-elastic-text>';
        //   }
          
        //   html += '</div>';
        //   html += '</td>'
 
        // }
        for(var l = 0; l < uniqCols.length; l++) {
          // console.log('uniqcolval', uniqCols[l], sourceArray.data.mappings.mappings[i], sourceArray.data.mappings.mappings[i][uniqCols[l]]);
          html += '<td class="td-body '+classBg+'" part="td-key">'
          html += '<div class="'+(!showSearch ? 'truncate' : '')+'">';
          html += '<sf-i-elastic-text text="'+sourceArray.data.mappings.mappings[i][uniqCols[l]].replace(/ *\([^)]*\) */g, "")+'" minLength="20"></sf-i-elastic-text>';
          html += '</div>';
          html += '</td>'
        }


        for(l = 0; l < sourceCols.length; l++) {

          for(var j = 0; j < JSON.parse(sourceArray.data.mappings.mappings[0].cols).length; j++) {

            if(sourceCols[l] == JSON.parse(sourceArray.data.mappings.mappings[0].cols)[j]) {
    
              if(sourceArray.data.mappings.mappings[i].data != null) {

                html += '<td class="td-body '+classBg+'" part="td-body">';
                html += '<div class="'+(!showSearch ? 'truncate' : '')+'">';


                if(sourceArray.data.mappings.mappings[i].id == "fdea6e4a-9d47-4042-916f-724c51f465c1") {
                  
                  //console.log('before before filtermatch',sourceCols[l],JSON.parse(sourceArray.data.mappings.mappings[0].cols)[j], colCountry, (sourceArray.data.mappings.mappings[i]), (sourceArray.data.mappings.mappings[i].data), colState);

                  //console.log('before filtermatch', colCountry, JSON.parse(sourceArray.data.mappings.mappings[i].data)[colCountry], colState, JSON.parse(sourceArray.data.mappings.mappings[i].data)[colState], JSON.parse(sourceArray.data.mappings.mappings[i].data)[colSubcategory]);

                }

                //const filterMatch = this.matchesOnBoardingFilter(JSON.parse(sourceArray.data.mappings.mappings[i].data)[colCountry][0], JSON.parse(sourceArray.data.mappings.mappings[i].data)[colState].length > 0 ? JSON.parse(sourceArray.data.mappings.mappings[i].data)[colState][0] : "", JSON.parse(sourceArray.data.mappings.mappings[i].data)[colSubcategory].length > 0 ? JSON.parse(sourceArray.data.mappings.mappings[i].data)[colSubcategory][0] : "", Array.isArray(JSON.parse(sourceArray.data.mappings.mappings[i].data)[colStatute]) ? JSON.parse(sourceArray.data.mappings.mappings[i].data)[colStatute][0] : JSON.parse(sourceArray.data.mappings.mappings[i].data)[colStatute]);

                const filterMatch = false;

                //console.log('after filtermatch', filterMatch);

                if(filterMatch) {
                  if(!unfilteredDict.includes(i)) {
                    unfilteredDict.push(i);
                  }
                }
      
                //console.log('isArray', sourceCols[l], Array.isArray(JSON.parse(sourceArray.data.mappings.mappings[i].data)[j]));
                if(Array.isArray(JSON.parse(sourceArray.data.mappings.mappings[i].data)[j])) {
                  
                  for(var k = 0; k < JSON.parse(sourceArray.data.mappings.mappings[i].data)[j].length; k++) {
                    html +=  ('<sf-i-elastic-text text="'+JSON.parse(sourceArray.data.mappings.mappings[i].data)[j][k]+'" minLength="100" lineSize="4"></sf-i-elastic-text>');
                  }
          
                } else {
                  html += ('<sf-i-elastic-text text="'+JSON.parse(sourceArray.data.mappings.mappings[i].data)[j]+'" minLength="100" lineSize="4"></sf-i-elastic-text>')
                }
      
                html += '</div>';
                html += '</td>';

              }
    
            }
    
          }

        }

        html += '</tr>';
        //console.log('i=', i);

      }
      html += '</tbody>';
      html += '</table>';

    }

    divElement.innerHTML = html;

    if(unfilteredDict.length > 0) {
      var html = '';
      html += '<div class="mb-10">Items In Your Category (' + unfilteredDict.length + ")</div>";
      html += this.getFilterOnboardingString();
      ((divElement as HTMLDivElement).querySelector('#span-filtered') as HTMLDivElement).innerHTML = html;
      
    } else {
      ((divElement as HTMLDivElement).querySelector('#span-filtered') as HTMLDivElement).style.display = 'none'; 
    }

    if(subfiltered > 0) {
      ((divElement as HTMLDivElement).querySelector('#div-subfiltered') as HTMLDivElement).innerHTML = '<h4 part="results-title">Filtered Results ('+subfiltered+')</h4>';
    }

    if(this.getfilterOnboarding().length > 0) {
      for(var i = 0; i < sourceArray.data.mappings.mappings.length; i++) {

        if(!unfilteredDict.includes(i)) {
          const tableRow = (divElement as HTMLDivElement).querySelector('#tablerow-'+i);
          if(tableRow != null) {
            (tableRow as HTMLTableRowElement).style.display = 'none';
          }
          
        }
        
      } 
    }

    // const inputFilter = (divElement as HTMLDivElement).querySelector('.input-filter') as HTMLInputElement;
    // inputFilter.addEventListener('keyup', (e: any) => {

    //   if(e.key == 'Enter') {
    //     //console.log('filtering...', inputFilter.value);
    //     if(this._SfLoader != null) {
    //       this._SfLoader.innerHTML = '<div class="lds-dual-ring"></div>';
    //       this._SfLoader.innerHTML += ('<div class="lds-text"><div class="lds-text-c"></div></div>');
    //     }
    //     setTimeout(() => {
    //       this.renderTaggingTable(divElement, sourceArray, taggingArray, sourceCols, uploadFunction, refreshFunction, colName, uniqCols,apiIdDropdown, dropdownSearchPhrase, mandatoryFields, jobs, anotherProjection, extraFields, _arrFeedbackReference, proposedUsersLabel, inputFilter.value);
    //       // this._SfLoader.innerHTML = '';
    //     }, 1000);
        
    //   }

    // });

    (divElement as HTMLDivElement).querySelector('.checkbox-all')?.addEventListener('change', (e: any) => {

      ((divElement as HTMLDivElement).querySelector('.button-save') as HTMLButtonElement).disabled = false;

      const arrCheckBoxes = (divElement as HTMLDivElement).querySelectorAll('.checkbox-row') as NodeListOf<HTMLInputElement>;
      //console.log('cb-length', arrCheckBoxes.length);
      for(var i = 0; i < arrCheckBoxes.length; i++) {
        const tableRow = (divElement as HTMLDivElement).querySelector('#tablerow-' + (i)) as HTMLElement;
        //console.log('tablerow', i, tableRow);
        if(tableRow != null) {
          if(tableRow.style.display != 'none') {
            //console.log('tablerow setting', e.currentTarget.checked, (arrCheckBoxes[i] as HTMLInputElement));
            (arrCheckBoxes[i] as HTMLInputElement).checked = e.currentTarget.checked;
            if(e.currentTarget.checked) {
              if(!this.selectedCbs.includes(i + '')) {
                this.selectedCbs.push(i + '');
              }
            } else {
              this.selectedCbs = [];
            }
          }
        }
      }

      //console.log('checkedarr', this.selectedCbs);

    });

    for(var j = 0; j < extraFields.length; j++) {

      const inputArrJ = (divElement as HTMLDivElement).querySelectorAll('.extra-field-'+j) as NodeListOf<SfIForm|HTMLInputElement>;
      for(var k = 0; k < inputArrJ.length; k++) {
        inputArrJ[k].addEventListener('keyup', (e: any) => {

          ((divElement as HTMLDivElement).querySelector('.button-save') as HTMLButtonElement).disabled = false;

          if(e.key == "Enter") {

            this.applyAndReloadTagging(e,colName, taggingArray, sourceArray, divElement);

            const activeIndex = e.target.id.split('-')[2];

            for(var count = 0; count < sourceArray.data.mappings.mappings.length; count++) {

              taggingArray.data.mappings.mappings[count].extraFields = [];
              
              if(this.selectedCbs.length > 0 && this.selectedCbs.includes(count + "")) {

                for(var l = 0; l < extraFields.length; l++) {
                  const inputExtraField = ((divElement as HTMLDivElement).querySelector('#extra-field-'+activeIndex+'-'+l) as HTMLInputElement);
                  taggingArray.data.mappings.mappings[count].extraFields.push(inputExtraField.value)
                }
    
              } else {

                for(var l = 0; l < extraFields.length; l++) {
                  const inputExtraField = ((divElement as HTMLDivElement).querySelector('#extra-field-'+count+'-'+l) as HTMLInputElement);
                  taggingArray.data.mappings.mappings[count].extraFields.push(inputExtraField.value)
                }
    
              }

            }
  
            this.renderTaggingTable(divElement, sourceArray, taggingArray, sourceCols, uploadFunction, refreshFunction, colName, uniqCols,apiIdDropdown, dropdownSearchPhrase, mandatoryFields, jobs, anotherProjection, extraFields, _arrFeedbackReference, proposedUsersLabel, subfilter)

          }
          
          // this.saveTagging(taggingArray.data.mappings, uploadFunction, refreshFunction, true);

        });

        inputArrJ[k].addEventListener('focusout', (e: any) => {

          this.applyAndReloadTagging(e,colName, taggingArray, sourceArray, divElement);

          const activeIndex = e.target.id.split('-')[2];

          for(var count = 0; count < sourceArray.data.mappings.mappings.length; count++) {

            taggingArray.data.mappings.mappings[count].extraFields = [];
            
            if(this.selectedCbs.length > 0 && this.selectedCbs.includes(count + "")) {

              for(var l = 0; l < extraFields.length; l++) {
                const inputExtraField = ((divElement as HTMLDivElement).querySelector('#extra-field-'+activeIndex+'-'+l) as HTMLInputElement);
                taggingArray.data.mappings.mappings[count].extraFields.push(inputExtraField.value)
              }
  
            } else {

              for(var l = 0; l < extraFields.length; l++) {
                const inputExtraField = ((divElement as HTMLDivElement).querySelector('#extra-field-'+count+'-'+l) as HTMLInputElement);
                taggingArray.data.mappings.mappings[count].extraFields.push(inputExtraField.value)
              }
  
            }

          }

          this.renderTaggingTable(divElement, sourceArray, taggingArray, sourceCols, uploadFunction, refreshFunction, colName, uniqCols,apiIdDropdown, dropdownSearchPhrase, mandatoryFields, jobs, anotherProjection, extraFields, _arrFeedbackReference, proposedUsersLabel, subfilter)
          
        });
      }

    }

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

          if(taggingArray.data.mappings.mappings[j].id == "fdea6e4a-9d47-4042-916f-724c51f465c1" && equal) {

            //console.log('rendertagging', taggingArray.data.mappings.mappings[j], sourceArray.data.mappings.mappings[i]);

          }


          if(equal) {
            
            (multiArr[i] as SfIForm).preselectedValues = JSON.stringify(taggingArray.data.mappings.mappings[j][colName]);
            if(taggingArray.data.mappings.mappings[j][colName].length > 0) {
              ((multiArr[i] as SfIForm).parentElement as HTMLTableCellElement).setAttribute("part", "row-mapped");
            }

          }

        }

        // for(var j = 0; j < taggingArray.data.mappings.mappings.length; j++) {

        //   var equal = true;

        //   for(var k = 0; k < uniqCols.length; k++) {

        //     if(sourceArray.data.mappings.mappings[i] != null && taggingArray.data.mappings.mappings[j] != null) {
        //       if(sourceArray.data.mappings.mappings[i][uniqCols[k]] != taggingArray.data.mappings.mappings[j][uniqCols[k]]) {
        //         equal = false;
        //       }
        //     }
            
        //   }

        //   if(taggingArray.data.mappings.mappings[i].id == "fdea6e4a-9d47-4042-916f-724c51f465c1") {

        //     //console.log('rendertagging', taggingArray.data.mappings.mappings[i], sourceArray.data.mappings.mappings[i]);

        //   }


        //   if(equal) {
            
        //     (multiArr[i] as SfIForm).preselectedValues = JSON.stringify(taggingArray.data.mappings.mappings[j][colName]);
        //     if(taggingArray.data.mappings.mappings[j][colName].length > 0) {
        //       ((multiArr[i] as SfIForm).parentElement as HTMLTableCellElement).setAttribute("part", "row-mapped");
        //     }

        //   }

        // }

        //console.log('preselect', multiArr[i]);

        multiArr[i].addEventListener('valueChanged', async ( e: any  ) => {

          ((divElement as HTMLDivElement).querySelector('.button-save') as HTMLButtonElement).disabled = false;
          this.applyAndReloadTagging(e,colName, taggingArray, sourceArray, divElement);
          // this.renderTaggingTable(divElement, sourceArray, taggingArray, sourceCols, uploadFunction, refreshFunction, colName, uniqCols,apiIdDropdown, dropdownSearchPhrase, mandatoryFields, jobs, anotherProjection, extraFields, arrFeedbackReference, proposedUsersLabel, subfilter); 
  
        });

      } else {

        if(taggingArray.data.mappings.mappings[i] != null) {
          (multiArr[i] as HTMLInputElement).value = taggingArray.data.mappings.mappings[i][colName];
        }

        multiArr[i].addEventListener('keyup', async (e: any) => {

          if(e.key == "Enter") {

            ((divElement as HTMLDivElement).querySelector('.button-save') as HTMLButtonElement).disabled = false;
            this.applyAndReloadTagging(e,colName, taggingArray, sourceArray, divElement);
            // this.renderTaggingTable(divElement, sourceArray, taggingArray, sourceCols, uploadFunction, refreshFunction, colName, uniqCols,apiIdDropdown, dropdownSearchPhrase, mandatoryFields, jobs, anotherProjection, extraFields, arrFeedbackReference, proposedUsersLabel, subfilter)
    
          }

        });


      }

  
    }

    const buttonApply = (divElement as HTMLDivElement).querySelector('.button-apply') as HTMLButtonElement;
    buttonApply.addEventListener('click', () => {
      // console.log('applied');
      // this.applyAndReloadTagging(e,colName, taggingArray, sourceArray, divElement);
      this.renderTaggingTable(divElement, sourceArray, taggingArray, sourceCols, uploadFunction, refreshFunction, colName, uniqCols,apiIdDropdown, dropdownSearchPhrase, mandatoryFields, jobs, anotherProjection, extraFields, _arrFeedbackReference, proposedUsersLabel, subfilter)
    })
    
    const buttonToggleMoreBack = (divElement as HTMLDivElement).querySelector('.button-toggle-more-back') as HTMLButtonElement;
    const buttonToggleMore = (divElement as HTMLDivElement).querySelector('.button-toggle-more') as HTMLButtonElement;
    
    buttonToggleMore.addEventListener('click', async (ev: any) => {

      ev.target.classList.add('hide');
      buttonToggleMoreBack.classList.remove('hide');
      const buttonDownloadBackups = (divElement as HTMLDivElement).querySelector('.button-download-backups') as HTMLButtonElement;
      buttonDownloadBackups.style.display = 'flex';

      const buttonDownloadBackupsNew = Util.clearListeners(buttonDownloadBackups);
      buttonDownloadBackupsNew.addEventListener('click', async () => {

        const result = await this.fetchGetStoredMapping(colName);

        for(var i = 0; i < result.data.length; i++) {

          const blob = new Blob([result.data[i].mappings != null ? JSON.stringify(result.data[i].mappings) : JSON.stringify(result.data[i])], { type: 'text/html' });
          const url = window.URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.setAttribute('href', url)
          a.setAttribute('download', 'report_'+colName+'_'+i+'.json');
          a.click()

        }

        (buttonToggleMoreBack as HTMLButtonElement).click();

        if(result.data.length === 0) {

          this.setError("No backups found!")
          setTimeout(() => {
            this.clearMessages();
          }, 3000);

        }
        
      });

      const buttonExportMapping = (divElement as HTMLDivElement).querySelector('.button-export-mapping') as HTMLButtonElement;
      buttonExportMapping.style.display = 'flex';

      //console.log('buttonExportMapping', buttonExportMapping);

      const buttonExportMappingNew = Util.clearListeners(buttonExportMapping);
      buttonExportMappingNew.addEventListener('click', async () => {

        let valueStr : string [] = [];

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
                valueStr.push(JSON.stringify(taggingArray.data.mappings.mappings[j][colName]));
              } 
            }
    
          } else {
    
            if(taggingArray.data.mappings.mappings[i] != null) {
              valueStr.push(taggingArray.data.mappings.mappings[i][colName]);
            } else {
              valueStr.push('');
            }
    
          }
      
        }

        //console.log('valueStr', valueStr);

        const valuesHTML = JSON.stringify(valueStr);

        const outerHTML = '<h3>This extract is generated on '+new Date()+'</h3>' + ((divElement as HTMLDivElement).querySelector('#span-filtered') as HTMLHeadingElement).outerHTML + '<br /><h2>'+ ((divElement as HTMLDivElement).querySelector('#mapped-stats-title') as HTMLHeadingElement).outerHTML+'</h2>' + ((divElement as HTMLDivElement).querySelector('#table-data') as HTMLTableElement).outerHTML;

        let tableHTML = this.TAGGING_HTML.replace(/TABLE_DATA/g, outerHTML);
        tableHTML = tableHTML.replace(/TABLE_VALUES/g, valuesHTML);
        
        const blob = new Blob([tableHTML], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.setAttribute('href', url)
        a.setAttribute('download', 'mapping_'+colName+'_'+new Date().getTime()+'.html');
        a.click()

      });
    
    });

    buttonToggleMoreBack.addEventListener('click', async (ev: any) => {

      ev.target.classList.add('hide');
      buttonToggleMore.classList.remove('hide');
      const buttonDownloadBackups = (divElement as HTMLDivElement).querySelector('.button-download-backups') as HTMLButtonElement;
      buttonDownloadBackups.style.display = 'none';
    
    });

    const buttonSave = (divElement as HTMLDivElement).querySelector('.button-save') as HTMLButtonElement;
    buttonSave?.addEventListener('click', async () => {
      await this.saveTagging(taggingArray.data.mappings, uploadFunction, refreshFunction, false);
    });

    const buttonCancel = (divElement as HTMLDivElement).querySelector('.button-cancel') as HTMLButtonElement;
    buttonCancel?.addEventListener('click', async () => {
      //console.log('cancel clicked');
      await this.fetchCancelOnboardingJob(colName);
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
        //console.log(this.selectedCbs);
      })
    }

    // const arrExtraFields = (divElement as HTMLDivElement).querySelectorAll('.extra-field') as NodeListOf<HTMLInputElement>;
    // var totalFields = 0;
    // var filledFields = 0;
    // for(var i = 0; i < arrExtraFields.length; i++) {
    //   const extraField = arrExtraFields[i] as HTMLInputElement;
    //   if(extraField.parentElement?.parentElement?.style.display != "none") {
    //     if(extraField.value != "") {
    //       filledFields++;
    //     }
    //     totalFields++;
    //   }
    // }
    if((divElement as HTMLDivElement).querySelector("#span-extra-filled") != null) {
      //(divElement as HTMLDivElement).querySelector("#span-extra-filled")!.innerHTML = "Fields: " + filledFields + "/" + totalFields + " completed";
      //console.log('Total fields = ' + totalFields + ', filled fields = ' + filledFields);
    }
    
  }

  renderMappingTable = (divElement: any, jsonData: Array<any>, cursor: Array<any>, fetchFunction: any, searchString: string, mappedArray: any, found: number, uploadFunction: any, refreshFunction: any, extraFields: Array<string>, uploadBlock: number, extraFieldPosition: number, colName: string, subfilter: string, statuteColName: string, extraHintsArr: Array<string>) => {
    console.log('cols', jsonData[0].data.cols);
    //console.log('divelement', divElement);
    //console.log('jsonData', jsonData);
    //console.log('cursor', cursor);
    //console.log('fetch', fetchFunction);
    //console.log('searchstring', searchString);
    //console.log('subfiltervalue', subfilter);

    const arrCompliancesFrequencies : any = {}; 

    if(jsonData.length === 0) return;

    this.selectedCbs = [];

    let colCountry = -1;
    let colState = -1;
    let colSubcategory = -1;
    let colStatute = -1;

    const unfilteredDict : any [] = [];

    var html = '';

    html += '<div>';
      html += '<h3 part="results-title">Total Items ('+found+')</h3>';
      html += '<h4 id="span-filtered" part="results-title"></h4>'
      html += '<h4 id="span-extra-filled" part="results-title"></h4>'
    html += '</div>';


    html += '<div class="d-flex justify-between align-center left-sticky flex-wrap mb-20">';
      
      html += '<div id="div-subfiltered"></div>';
      html += '<div id="scroll-overlay" part="onboarding-scroll-overlay" class="pos-fixed-scroll justify-center align-center">';
        html += '<div id="scroll-overlay-left" class="mr-10"><button part="button-icon"><span class="material-symbols-outlined">arrow_left_alt</span></button></div>';
        html += '<div id="scroll-overlay-right" class="ml-10"><button part="button-icon"><span class="material-symbols-outlined">arrow_right_alt</span></button></div>';
      html += '</div>';

      html += '<div id="detail-overlay" part="onboarding-detail-overlay" class="pos-fixed justify-center align-center hide">';
        html += '<div class="cover-slide"></div>';
        html += '<div class="detail-container p-10">';
          html += '<div class="d-flex justify-between align-center mb-20">';
            html += '<div part="results-title">Row Details</div>';
            html += '<button part="button-icon" class="detail-close"><span class="material-symbols-outlined">close</span></button>';
          html += '</div>';
          html += '<div id="detail-overlay-list">';
          html += '</div>';
        html += '</div>';
      html += '</div>';
      
      html += '<div class="d-flex align-center">';
        html += '<input part="input" type="text" placeholder="Filter" class="input-filter mr-10" value="'+subfilter+'" />';
        html += '<div class="mr-10">';
          html += '<div class="d-flex justify-end"><button part="calendar-tab-icon-not-selected" class="material-icons button-toggle-more">expand_more</button><button part="calendar-tab-icon-selected" class="material-icons button-toggle-more-back hide">expand_less</button></div>'
          html += '<div style="position: absolute; margin-top: 5px;"><button part="button" class="hide d-flex align-center button-download-backups" style="margin-left: -80px"><span class="material-symbols-outlined mr-10">file_save</span><span>Download Backups</span></button><button part="button" class="mt-10 hide d-flex align-center button-export-mapping" style="margin-left: -80px"><span class="material-symbols-outlined mr-10">export_notes</span><span>Export Mapping</span></button></div>'
        html += '</div>';
        html += (this.disablesave == "yes" ? '' : '<button part="button" class="button-save" disabled>Save</button>');
      html += '</div>';
      
    html += '</div>';

    html += '<table id="table-data">';

    html += '<thead>';
    html += '<th part="td-head" class="td-head">'
    // html += 'Select';
    html += '<div id="select-all"><input class="checkbox checkbox-all" part="input-checkbox" type="checkbox" '+((this.disableflagggrcresponse.toLowerCase() == "yes") ? 'disabled' : '')+'/></div>';
    html += '</th>'
    html += '<th part="td-head" class="td-head">'
    html += '<div>View</div>';
    html += '</th>'
    if(extraFieldPosition === 0) {
      for(var i = 0; i < extraFields.length; i++) {
        html += '<th part="td-head" class="td-head">'
        html += extraFields[i];
        html += '</th>'
      }
    }
    if(colName.toLowerCase() == "compliances") {
      html += '<th part="td-head" class="td-head">'
      html += 'Proposed Users';
      html += '</th>'
    }
    html += '<th part="td-head" class="td-head">'
    html += 'Id';
    html += '</th>'

    // for(var j = 0; j < JSON.parse(jsonData[0].data.cols).length; j++) {

    //   if(jsonData[0].cols.includes(JSON.parse(jsonData[0].data.cols)[j])) {
    //     html += '<th part="td-head" class="td-head ' + (statuteColName.toLowerCase() == JSON.parse(jsonData[0].data.cols)[j].toLowerCase() ? 'left-sticky' : '') + '">'
    //     html += JSON.parse(jsonData[0].data.cols)[j]
    //     html += '</th>'
    //   }

    // }

    for(var j = 0; j < jsonData[0].cols.length; j++) {

      html += '<th part="td-head" class="td-head ' + (statuteColName.toLowerCase() == JSON.parse(jsonData[0].data.cols)[j].toLowerCase() ? 'left-sticky' : '') + '">'
      html += jsonData[0].cols[j]
      html += '</th>'

    }

    if(extraFieldPosition === 1) {
      for(var i = 0; i < extraFields.length; i++) {
        html += '<th part="td-head" class="td-head">'
        html += extraFields[i];
        html += '</th>'
      }
    }
    html += '</thead>'

    //console.log('colstate',  JSON.parse(jsonData[0].data.cols));

    for(var i = 0; i < JSON.parse(jsonData[0].data.cols).length; i++) {
      if(JSON.parse(jsonData[0].data.cols)[i].toLowerCase() == "country") {
        console.log('colstate country', JSON.parse(jsonData[0].data.cols)[i].toLowerCase(), i);
        colCountry = i;
      }
      if(JSON.parse(jsonData[0].data.cols)[i].toLowerCase() == "state") {
        //console.log('colstate state', JSON.parse(jsonData[0].data.cols)[i].toLowerCase(), i);
        colState = i;
      }
      if(JSON.parse(jsonData[0].data.cols)[i].toLowerCase() == "subcategory") {
        //console.log('colstate subcategory', JSON.parse(jsonData[0].data.cols)[i].toLowerCase(), i);
        colSubcategory = i;
      }
      if(JSON.parse(jsonData[0].data.cols)[i].toLowerCase() == statuteColName) {
        //console.log('colstate statute', JSON.parse(jsonData[0].data.cols)[i].toLowerCase(), i);
        colStatute = i;
      }
    }

    //var countExtra0 = 0;
    var countextra = [];

    var subfiltered = 0;
    
    html += '<tbody>'

    for(let level = 0; level < 2; level++) {

      for(var i = 0; i < jsonData.length; i++) {

        //console.log('subfilter value before', subfiltered);

        let tempColCountry = -1;
        let tempColState = -1;
        let tempColStatute = -1;
        let tempColSubcategory = -1;

        if(JSON.parse(jsonData[0].data.cols)[0] == ('lastModifiedBy')) {
          if(JSON.parse(jsonData[i].data.cols)[0] != ('lastModifiedBy')) {
            tempColCountry = colCountry - 2;
            tempColState = colState - 2;
            tempColStatute = colStatute - 2;
            tempColSubcategory = colSubcategory - 2;
          } else {
            tempColCountry = colCountry;
            tempColState = colState;
            tempColStatute = colStatute;
            tempColSubcategory = colSubcategory;
          }
        } else {
          if(JSON.parse(jsonData[i].data.cols)[0] == ('lastModifiedBy')) {
            tempColCountry = colCountry + 2;
            tempColState = colState + 2;
            tempColStatute = colStatute + 2;
            tempColSubcategory = colSubcategory + 2;
          } else {
            tempColCountry = colCountry;
            tempColState = colState;
            tempColStatute = colStatute;
            tempColSubcategory = colSubcategory;
          }
        }

        if(JSON.parse(jsonData[i].data.data)[tempColCountry].length === 0 && level === 1) {

          html += '<tr id="tablerow-'+i+'" class="tablerow" style="display: none">';

            html += '<td part="td-action">';
            html += '<div id="select-'+i+'"><input class="checkbox checkbox-'+i+' checkbox-row" part="input-checkbox" type="checkbox"/></div>';
            html += '</td>';
            html += '<td part="td-action">';
            html += '<div><button part="button" id="show-detail-'+i+'"><span class="material-symbols-outlined">open_in_new</span></button></div>';
            html += '</td>';
            for(var j = 0; j < extraFields.length; j++) {
              html += '<td part="td-body">';
              html += '<sf-i-multitextarea id="extra-field-'+jsonData[i].id+'-'+j+'" class="extra-field-'+j+' extra-field" fields="[]" values="" hint="" showFields="15"></sf-i-multitextarea>';
              html += '</td>';
              if(j === 0) {
                //countExtra0++;
                countextra.push(i);
              }
            }
            if(colName.toLowerCase() == "compliances") {
              html += '<td part="td-body">';
              html += JSON.stringify(jsonData[i].previousExtraFields);
              html += '</td>';
            }
            html += '<td part="td-body">';
            html += '<sf-i-elastic-text class="statute id-'+i+'" text="'+(jsonData[i].id)+'" minLength="10"></sf-i-elastic-text>';
            html += '</td>';

          html += '</tr>';

          continue;

        }

        var showSearch = false;

        if(subfilter == "") {
          showSearch = true;
        } else {

          for(var j = 0; j < extraFields.length; j++) {

            try {

              if(jsonData[i].extraFields != null && jsonData[i].extraFields[j] != null && jsonData[i].extraFields[j].toLowerCase().indexOf(subfilter.toLowerCase()) >= 0) {

                showSearch = true;
                subfiltered++;
                break;
  
              }  

            } catch (e) {

            }

            try {

              if(jsonData[i].extraFields != null && jsonData[i].extraFields[j] != null && JSON.stringify(jsonData[i].extraFields[j]).toLowerCase().indexOf(subfilter.toLowerCase()) >= 0) {

                showSearch = true;
                subfiltered++;
                break;
  
              }  

            } catch (e) {

            }

            
          }

          if(!showSearch) {
            for(var j = 0; j < JSON.parse(jsonData[i].data.cols).length; j++) {

              if(jsonData[i].cols.includes(JSON.parse(jsonData[i].data.cols)[j])) {

                if(Array.isArray(JSON.parse(jsonData[i].data.data)[j])) {

                  var tempCount = subfiltered;
                  for(var k = 0; k < JSON.parse(jsonData[i].data.data)[j].length; k++) {

                    if(JSON.parse(jsonData[i].data.data)[j][k].toLowerCase().indexOf(subfilter.toLowerCase()) >= 0) {
                      showSearch = true;
                      //console.log('subfilter value inside 1', subfiltered);
                      subfiltered++;
                      break;
                    }

                  }

                  if(subfiltered > tempCount) break;
      
                } else {

                  if(JSON.parse(jsonData[i].data.data)[j].toLowerCase().indexOf(subfilter.toLowerCase()) >= 0) {
                    showSearch = true;
                    //console.log('subfilter value inside 2', subfiltered);
                    subfiltered++;
                    break;
                  }
                  
                }
      
              }
      
            }

          }

        }

        //console.log('subfilter value', subfiltered);

        var classBg = "";

        if(i%2 === 0) {
          classBg = 'td-light';
        } else {
          classBg = 'td-dark';
        }

        var mapped = "";

        if(jsonData[i].mapped) {
          mapped = "checked";
          this.selectedCbs.push(i);
        }

        if((level == 0 && jsonData[i].mapped) || (level == 1 && !jsonData[i].mapped)) {

          if(arrCompliancesFrequencies[jsonData[i].id] == null) {
            arrCompliancesFrequencies[jsonData[i].id] = 0;
          } else {
            arrCompliancesFrequencies[jsonData[i].id]++;
          }

          html += '<tr id="tablerow-'+i+'" class="tablerow">';
          html += '<td part="td-action" class="' + (jsonData[i].mapped ? 'chosen' : '') + '">';
          html += '<div id="select-'+i+'" class="'+(!showSearch ? 'truncate' : '')+'"><input class="checkbox checkbox-'+i+' checkbox-row" part="input-checkbox" type="checkbox" '+mapped+' '+((this.disableflagggrcresponse.toLowerCase() == "yes") ? 'disabled' : '')+'/></div>';
          html += '</td>';
          html += '<td part="td-action" class="' + (jsonData[i].mapped ? 'chosen' : '') + '">';
          html += '<div class="'+(!showSearch ? 'truncate' : '')+'"><button class="button-expand" part="button-icon" id="show-detail-'+i+'"><span class="material-symbols-outlined">open_in_new</span></button></div>';

          let locationsForThisItem: any = [];

          if(JSON.parse(jsonData[i].data.data)[tempColState].length > 0) {
            locationsForThisItem = this.getLocationsByState(JSON.parse(jsonData[i].data.data)[tempColCountry][0], JSON.parse(jsonData[i].data.data)[tempColState][0], JSON.parse(jsonData[i].data.data)[tempColStatute]);
          } else {
            //console.log(JSON.parse(jsonData[i].data.data)[colStatute]);
            locationsForThisItem = this.getLocationsByCountry(JSON.parse(jsonData[i].data.data)[tempColCountry][0], JSON.parse(jsonData[i].data.data)[tempColStatute]);
          }

          if(extraFieldPosition === 0) {

            for(var j = 0; j < extraFields.length; j++) {
              html += '<td part="td-body" class="'+classBg+' ' + (jsonData[i].mapped ? 'chosen' : '') + '">';
              
              const strLocationsForThisItem = JSON.stringify(locationsForThisItem).replace(/"/g,'&quot;');
              const valuesForThisItem = (jsonData[i].extraFields != null ? (jsonData[i].extraFields[j] != null ? jsonData[i].extraFields[j] : "") : "");
              let strValuesForThisItem: string = "";
              strValuesForThisItem =  JSON.stringify(valuesForThisItem).replace(/"/g,'&quot;');
              

              html += '<div class="'+(!showSearch ? 'truncate' : '')+'"><sf-i-multitextarea id="extra-field-'+jsonData[i].id+'-'+j+'" class="extra-field-'+j+' extra-field" '+(mapped != "checked" ? 'disabled="true"' : ((extraFields[j].toLowerCase() == "client remarks" && this.disableclientresponse.toLowerCase() == "yes") ? 'disabled="true"' : ((extraFields[j].toLowerCase() == "flagggrc response" && this.disableflagggrcresponse.toLowerCase() == "yes") ? 'disabled="true"' : '')))+' fields="'+strLocationsForThisItem+'" values="'+strValuesForThisItem+'" hint="'+extraHintsArr[j]+'" showFields="15"></sf-i-multitextarea></div>';
              // html += '<div class="'+(!showSearch ? 'truncate' : '')+'"><sf-i-multitextarea id="extra-field-'+jsonData[i].id+'-'+j+'" class="extra-field-'+j+' extra-field" '+(mapped != "checked" ? 'disabled="true"' : ((extraFields[j].toLowerCase() == "client remarks" && this.disableclientresponse.toLowerCase() == "yes") ? 'disabled="true"' : ((extraFields[j].toLowerCase() == "flagggrc response" && this.disableflagggrcresponse.toLowerCase() == "yes") ? 'disabled="true"' : '')))+' fields="'+strLocationsForThisItem+'" values="'+strValuesForThisItem+'" hint="'+extraHintsArr[j]+'">'+(jsonData[i].extraFields != null ? (jsonData[i].extraFields[j] != null ? jsonData[i].extraFields[j] : "") : "")+'</sf-i-multitextarea></div>';
              // html += '<div class="'+(!showSearch ? 'truncate' : '')+'"><textarea part="input" id="extra-field-'+jsonData[i].id+'-'+j+'" class="extra-field-'+j+' extra-field" '+(mapped != "checked" ? 'disabled' : ((extraFields[j].toLowerCase() == "client remarks" && this.disableclientresponse.toLowerCase() == "yes") ? 'disabled' : ((extraFields[j].toLowerCase() == "flagggrc response" && this.disableflagggrcresponse.toLowerCase() == "yes") ? 'disabled' : '')))+' >'+(jsonData[i].extraFields != null ? (jsonData[i].extraFields[j] != null ? jsonData[i].extraFields[j] : "") : "")+'</textarea></div>';
              html += '</td>';
            }
            
            /*
            for(var j = 0; j < extraFields.length; j++) {
              
              html += '<td part="td-body" class="'+classBg+' ' + (jsonData[i].mapped ? 'chosen' : '') + '">';

              let locationsForThisItem: any = '';

              if(JSON.parse(jsonData[i].data.data)[colState].length > 0) {
                locationsForThisItem = this.getLocationsByState(JSON.parse(jsonData[i].data.data)[colCountry][0], JSON.parse(jsonData[i].data.data)[colState][0], JSON.parse(jsonData[i].data.data)[colStatute][0]);
              } else {
                locationsForThisItem = this.getLocationsByCountry(JSON.parse(jsonData[i].data.data)[colCountry][0], JSON.parse(jsonData[i].data.data)[colStatute][0]);
              }

              const strLocationsForThisItem = JSON.stringify(locationsForThisItem).replace(/"/g,'&quot;');
              const valuesForThisItem = (jsonData[i].extraFields != null ? (jsonData[i].extraFields[j] != null ? jsonData[i].extraFields[j] : "") : "");
              let strValuesForThisItem: string = "";
              strValuesForThisItem =  JSON.stringify(valuesForThisItem).replace(/"/g,'&quot;');
              // try {
              //   JSON.parse(valuesForThisItem);
              //   strValuesForThisItem =  JSON.stringify(valuesForThisItem).replace(/"/g,'&quot;'); 
              //   //console.log('locationsForThisItem 1', JSON.stringify(locationsForThisItem), strValuesForThisItem);
              // } catch (e: any) {
              //   strValuesForThisItem = "";
              // } 
              //console.log('locationsForThisItem', JSON.stringify(locationsForThisItem));

              html += '<div class="'+(!showSearch ? 'truncate' : '')+'"><sf-i-multitextarea id="extra-field-'+jsonData[i].id+'-'+j+'" class="extra-field-'+j+' extra-field" '+(mapped != "checked" ? 'disabled="true"' : ((extraFields[j].toLowerCase() == "client remarks" && this.disableclientresponse.toLowerCase() == "yes") ? 'disabled="true"' : ((extraFields[j].toLowerCase() == "flagggrc response" && this.disableflagggrcresponse.toLowerCase() == "yes") ? 'disabled="true"' : '')))+' fields="'+strLocationsForThisItem+'" values="'+strValuesForThisItem+'" hint="'+extraHintsArr[j]+'" ></sf-i-multitextarea></div>';

              // html += '<div class="'+(!showSearch ? 'truncate' : '')+'"><sf-i-multitextarea id="extra-field-'+jsonData[i].id+'-'+j+'" class="extra-field-'+j+' extra-field" '+(mapped != "checked" ? 'disabled="true"' : ((extraFields[j].toLowerCase() == "client remarks" && this.disableclientresponse.toLowerCase() == "yes") ? 'disabled="true"' : ((extraFields[j].toLowerCase() == "flagggrc response" && this.disableflagggrcresponse.toLowerCase() == "yes") ? 'disabled="true"' : '')))+' fields="'+strLocationsForThisItem+'" values="'+strValuesForThisItem+'" hint="'+extraHintsArr[j]+'" >'+(jsonData[i].extraFields != null ? (jsonData[i].extraFields[j] != null ? jsonData[i].extraFields[j] : "") : "")+'</sf-i-multitextarea></div>';

              // html += '<div class="'+(!showSearch ? 'truncate' : '')+'"><textarea part="input" id="extra-field-'+jsonData[i].id+'-'+j+'" class="extra-field-'+j+' extra-field" '+(mapped != "checked" ? 'disabled' : ((extraFields[j].toLowerCase() == "client remarks" && this.disableclientresponse.toLowerCase() == "yes") ? 'disabled' : ((extraFields[j].toLowerCase() == "flagggrc response" && this.disableflagggrcresponse.toLowerCase() == "yes") ? 'disabled' : '')))+' >'+(jsonData[i].extraFields != null ? (jsonData[i].extraFields[j] != null ? jsonData[i].extraFields[j] : "") : "")+'</textarea></div>';
              html += '</td>';
              if(j === 0) {
                countExtra0++;
              }
            }
            */
          }

          if(colName.toLowerCase() == "compliances") {

            var userHtml = '';

            userHtml = this.getPreviousExtraFields(i, jsonData[i].previousExtraFields, locationsForThisItem, showSearch)
            
            html += '<td part="td-body" class="'+classBg+' ' + (jsonData[i].mapped ? 'chosen' : '') + '">';
            html += userHtml
            html += '</td>';
          }
          html += '<td part="td-body" class="'+classBg+' ' + (jsonData[i].mapped ? 'chosen' : '') + '">';
          html += '<div class="'+(!showSearch ? 'truncate' : '')+'"><sf-i-elastic-text class="statute id-'+i+'" text="'+(jsonData[i].id)+'" minLength="10"></sf-i-elastic-text></div>';
          html += '</td>';
          //let data = JSON.parse(jsonData[i].fields.data);
          for(var j = 0; j < JSON.parse(jsonData[i].data.cols).length; j++) {

            if(jsonData[i].cols.includes(JSON.parse(jsonData[i].data.cols)[j])) {

              html += '<td part="td-body" class="td-body '+classBg+' ' + (jsonData[i].mapped ? 'chosen' : '') + ' ' + (statuteColName.toLowerCase() == JSON.parse(jsonData[i].data.cols)[j].toLowerCase() ? 'left-sticky' : '') + '">';
              html += '<div class="'+(!showSearch ? 'truncate' : '')+'">'
                html += '<div class="d-flex align-center">';

                let filterMatch: any = null;

                filterMatch = this.matchesOnBoardingFilter(JSON.parse(jsonData[i].data.data)[tempColCountry][0], JSON.parse(jsonData[i].data.data)[tempColState].length > 0 ? JSON.parse(jsonData[i].data.data)[tempColState][0] : "", JSON.parse(jsonData[i].data.data)[tempColSubcategory].length > 0 ? JSON.parse(jsonData[i].data.data)[tempColSubcategory][0] : "", Array.isArray(JSON.parse(jsonData[i].data.data)[tempColStatute]) ? JSON.parse(jsonData[i].data.data)[tempColStatute][0] : JSON.parse(jsonData[i].data.data)[tempColStatute]);
                
                
                if(jsonData[i].id == "f724e2b9-451a-49ec-85ba-2b099f433c73") {
                  console.log('filtermatch', filterMatch);
                }
                if(filterMatch) {
                  if(!unfilteredDict.includes(i)) {
                    unfilteredDict.push(i);
                  }
                }
                if(JSON.parse(jsonData[i].data.cols)[j] == "statute") {
                  html += '<span class="material-symbols-outlined pr-5 plain-filter-icon">filter_list</span>';
                }
                
                if(Array.isArray(JSON.parse(jsonData[i].data.data)[j])) {

                  for(var k = 0; k < JSON.parse(jsonData[i].data.data)[j].length; k++) {
                    
                    html +=  ('<sf-i-elastic-text text="'+JSON.parse(jsonData[i].data.data)[j][k]+'" minLength="80" lineSize="4"></sf-i-elastic-text>');
                    //console.log('Considering', JSON.parse(jsonData[i].data.cols)[j], jsonData[i].cols, j, JSON.parse(jsonData[i].data.data)[j], '<sf-i-elastic-text text="'+JSON.parse(jsonData[i].data.data)[j][k]+'" minLength="80"></sf-i-elastic-text>');
                    
                  }

                } else {
                  
                  html += ('<sf-i-elastic-text text="'+JSON.parse(jsonData[i].data.data)[j]+'" minLength="80" lineSize="4"></sf-i-elastic-text>')
                  //console.log('Considering', JSON.parse(jsonData[i].data.cols)[j], jsonData[i].cols, j, JSON.parse(jsonData[i].data.data)[j], '<sf-i-elastic-text text="'+JSON.parse(jsonData[i].data.data)[j]+'" minLength="80"></sf-i-elastic-text>');
                  
                }
                
                html += '</div>';
              html += '</div>';
              html += '</td>';

            } 

          }

          for(var k = 0; k < jsonData[i].cols.length; k++) {

            if(JSON.parse(jsonData[i].data.cols).includes(jsonData[i].cols[k])) {

            } else {
              html += '<td part="td-body" class="td-body '+classBg+' ' + (jsonData[i].mapped ? 'chosen' : '') + ' ' +  '"></td>';
            }

          }

          // else {

          //   var foundCol = false;
          //   for(var k = 0; k < jsonData[i].cols.length; k++) {
          //     console.log('founcol compare', jsonData[i].cols[k], JSON.parse(jsonData[i].data.cols)[j]);
          //     if(jsonData[i].cols[k] == JSON.parse(jsonData[i].data.cols)[j]) {
                
          //       if(JSON.parse(jsonData[i].data.cols).includes(jsonData[i].cols[k])) {
          //         foundCol = true;
          //       }
          //     } 
          //     console.log('founcol compare', foundCol);
          //   }
            
            
          //   if(!foundCol) {
          //     html += '<td part="td-body" class="td-body '+classBg+' ' + (jsonData[i].mapped ? 'chosen' : '') + ' ' + (statuteColName.toLowerCase() == JSON.parse(jsonData[i].data.cols)[j].toLowerCase() ? 'left-sticky' : '') + '"></td>';
          //   }
            
          // }

          if(extraFieldPosition === 1) {
            for(var j = 0; j < extraFields.length; j++) {
              html += '<td part="td-body" class="'+classBg+' ' + (jsonData[i].mapped ? 'chosen' : '') + '">';
              let locationsForThisItem: any = [];

              if(JSON.parse(jsonData[i].data.data)[tempColState].length > 0) {
                locationsForThisItem = this.getLocationsByState(JSON.parse(jsonData[i].data.data)[tempColCountry][0], JSON.parse(jsonData[i].data.data)[tempColState][0], JSON.parse(jsonData[i].data.data)[tempColStatute]);
              } else {
                //console.log(JSON.parse(jsonData[i].data.data)[colStatute]);
                locationsForThisItem = this.getLocationsByCountry(JSON.parse(jsonData[i].data.data)[tempColCountry][0], JSON.parse(jsonData[i].data.data)[tempColStatute]);
              }

              const strLocationsForThisItem = JSON.stringify(locationsForThisItem).replace(/"/g,'&quot;');
              const valuesForThisItem = (jsonData[i].extraFields != null ? (jsonData[i].extraFields[j] != null ? jsonData[i].extraFields[j] : "") : "");
              let strValuesForThisItem: string = "";
              strValuesForThisItem =  JSON.stringify(valuesForThisItem).replace(/"/g,'&quot;');
              

              html += '<div class="'+(!showSearch ? 'truncate' : '')+'"><sf-i-multitextarea id="extra-field-'+jsonData[i].id+'-'+j+'" class="extra-field-'+j+' extra-field" '+(mapped != "checked" ? 'disabled="true"' : ((extraFields[j].toLowerCase() == "client remarks" && this.disableclientresponse.toLowerCase() == "yes") ? 'disabled="true"' : ((extraFields[j].toLowerCase() == "flagggrc response" && this.disableflagggrcresponse.toLowerCase() == "yes") ? 'disabled="true"' : '')))+' fields="'+strLocationsForThisItem+'" values="'+strValuesForThisItem+'" hint="'+extraHintsArr[j]+'" showFields="15"></sf-i-multitextarea></div>';
              // html += '<div class="'+(!showSearch ? 'truncate' : '')+'"><sf-i-multitextarea id="extra-field-'+jsonData[i].id+'-'+j+'" class="extra-field-'+j+' extra-field" '+(mapped != "checked" ? 'disabled="true"' : ((extraFields[j].toLowerCase() == "client remarks" && this.disableclientresponse.toLowerCase() == "yes") ? 'disabled="true"' : ((extraFields[j].toLowerCase() == "flagggrc response" && this.disableflagggrcresponse.toLowerCase() == "yes") ? 'disabled="true"' : '')))+' fields="'+strLocationsForThisItem+'" values="'+strValuesForThisItem+'" hint="'+extraHintsArr[j]+'">'+(jsonData[i].extraFields != null ? (jsonData[i].extraFields[j] != null ? jsonData[i].extraFields[j] : "") : "")+'</sf-i-multitextarea></div>';
              // html += '<div class="'+(!showSearch ? 'truncate' : '')+'"><textarea part="input" id="extra-field-'+jsonData[i].id+'-'+j+'" class="extra-field-'+j+' extra-field" '+(mapped != "checked" ? 'disabled' : ((extraFields[j].toLowerCase() == "client remarks" && this.disableclientresponse.toLowerCase() == "yes") ? 'disabled' : ((extraFields[j].toLowerCase() == "flagggrc response" && this.disableflagggrcresponse.toLowerCase() == "yes") ? 'disabled' : '')))+' >'+(jsonData[i].extraFields != null ? (jsonData[i].extraFields[j] != null ? jsonData[i].extraFields[j] : "") : "")+'</textarea></div>';
              html += '</td>';
            }
          }
          html += '</tr>';

        }

      }


    }

    html += '</tbody>'
    html += '</table>';

    //console.log('countextra', countExtra0, countextra);
    console.log('arrCompliancesFrequencies', arrCompliancesFrequencies);

    divElement.innerHTML = html;

    if(unfilteredDict.length > 0) {
      var html = '';
      html += '<div class="mb-10">Items In Your Category (' + unfilteredDict.length + ")</div>";
      html += this.getFilterOnboardingString();
      ((divElement as HTMLDivElement).querySelector('#span-filtered') as HTMLDivElement).innerHTML = html;
      
    } else {
      ((divElement as HTMLDivElement).querySelector('#span-filtered') as HTMLDivElement).style.display = 'none'; 
    }

    if(subfiltered > 0) {
      ((divElement as HTMLDivElement).querySelector('#div-subfiltered') as HTMLDivElement).innerHTML = '<h5 part="results-title">Filtered Results ('+subfiltered+')</h5>';
    }

    if(this.getfilterOnboarding().length > 0) {
      for(var i = 0; i < jsonData.length; i++) {
        if(!unfilteredDict.includes(i)) {
          const tableRow = (divElement as HTMLDivElement).querySelector('#tablerow-'+i);
          if(tableRow != null) {
            (tableRow as HTMLTableRowElement).style.display = 'none';
          } 
        }
      } 
    }

    // Scroll arrow handlers

    const scrollLeft = (divElement as HTMLDivElement).querySelector('#scroll-overlay-left') as HTMLButtonElement;
    scrollLeft.addEventListener('click', () => {
      //console.log('left');
      (this._SfOnboardingStatutesListContainer as HTMLDivElement).scrollLeft -= 150;
    });

    const scrollRight = (divElement as HTMLDivElement).querySelector('#scroll-overlay-right') as HTMLButtonElement;
    scrollRight.addEventListener('click', () => {
      //console.log('right');
      //var scrollLeft = ((divElement as HTMLDivElement).querySelector('#statutes-list-container') as HTMLDivElement).scrollLeft;
      //((divElement as HTMLDivElement).querySelector('#statutes-list-container') as HTMLDivElement).scrollLeft += 100;
      (this._SfOnboardingStatutesListContainer as HTMLDivElement).scrollLeft += 150;
    });

    // Extra field handlers

    for(var i = 0; i < extraFields.length; i++) {

      const arrExtraFields = (divElement as HTMLDivElement).querySelectorAll('.extra-field-' + i) as NodeListOf<HTMLInputElement>;
      // console.log('i='+i, arrExtraFields.length)
      for(var j = 0; j < arrExtraFields.length; j++) {

        // console.log('j='+j, jsonData[j], arrExtraFields.length)
        // const extraField = (divElement as HTMLDivElement).querySelector('#extra-field-' + jsonData[j].id + '-' + i);
        // extraField?.addEventListener('focusout', () => {
        //   ((divElement as HTMLDivElement).querySelector('.button-save') as HTMLButtonElement).disabled = false;
        // });

        // extraField?.addEventListener('keyup', async (_e:any) => {
        //   if(extraFieldPosition === 1) {
        //     await this.saveMapping (divElement, uploadBlock, jsonData, extraFields, searchString, uploadFunction, refreshFunction, true)
        //   }
          
        // });

      }

    }

    // Filter field handlers

    const inputFilter = (divElement as HTMLDivElement).querySelector('.input-filter') as HTMLInputElement;
    inputFilter.addEventListener('keyup', (e: any) => {

      if(e.key == 'Enter') {
        //console.log(inputFilter.value);
        if(this._SfLoader != null) {
          this._SfLoader.innerHTML = '<div class="lds-dual-ring"></div>';
          this._SfLoader.innerHTML += ('<div class="lds-text"><div class="lds-text-c"></div></div>');
        }
        setTimeout(() => {
          this.renderMappingTable(divElement, jsonData, cursor, fetchFunction, searchString, mappedArray, found, uploadFunction, refreshFunction, extraFields, uploadBlock, extraFieldPosition, colName, inputFilter.value, statuteColName, extraHintsArr)
          this._SfLoader.innerHTML = '';
        }, 1000);
        
      }

    });
    
    // More button handlers
    
    const buttonToggleMoreBack = (divElement as HTMLDivElement).querySelector('.button-toggle-more-back') as HTMLButtonElement;
    const buttonToggleMore = (divElement as HTMLDivElement).querySelector('.button-toggle-more') as HTMLButtonElement;
    
    buttonToggleMore.addEventListener('click', async (ev: any) => {

      ev.target.classList.add('hide');
      buttonToggleMoreBack.classList.remove('hide');
      
      const buttonDownloadBackups = (divElement as HTMLDivElement).querySelector('.button-download-backups') as HTMLButtonElement;
      buttonDownloadBackups.style.display = 'flex';

      const buttonDownloadBackupsNew = Util.clearListeners(buttonDownloadBackups);
      buttonDownloadBackupsNew.addEventListener('click', async () => {

        const result = await this.fetchGetStoredMapping(colName);

        for(var i = 0; i < result.data.length; i++) {

          const blob = new Blob([result.data[i].mappings != null ? JSON.stringify(result.data[i].mappings) : JSON.stringify(result.data[i])], { type: 'text/html' });
          const url = window.URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.setAttribute('href', url)
          a.setAttribute('download', 'report_'+colName+'_'+i+'.json');
          a.click()

        }

        (buttonToggleMoreBack as HTMLButtonElement).click();

        if(result.data.length === 0) {

          this.setError("No backups found!")
          setTimeout(() => {
            this.clearMessages();
          }, 3000);

        }
        
      });
    
      const buttonExportMapping = (divElement as HTMLDivElement).querySelector('.button-export-mapping') as HTMLButtonElement;
      buttonExportMapping.style.display = 'flex';

      //console.log('buttonExportMapping', buttonExportMapping);

      const buttonExportMappingNew = Util.clearListeners(buttonExportMapping);
      buttonExportMappingNew.addEventListener('click', async () => {

        const outerHTML = '<h3>This extract is generated on '+new Date()+'</h3>' + ((divElement as HTMLDivElement).querySelector('#span-filtered') as HTMLHeadingElement).outerHTML + '<br /><h4><span class="chosen" style="border: solid 1px black;">&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;Mapped compliances</h4><h4><span style="border: solid 1px black;">&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;Un-mapped compliances</h4>' + ((divElement as HTMLDivElement).querySelector('#table-data') as HTMLTableElement).outerHTML;

        const tableHTML = this.MAPPING_HTML.replace(/TABLE_DATA/g, outerHTML);
        
        const blob = new Blob([tableHTML], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.setAttribute('href', url)
        a.setAttribute('download', 'mapping_'+colName+'_'+new Date().getTime()+'.html');
        a.click()

      });

    });

    buttonToggleMoreBack.addEventListener('click', async (ev: any) => {


      ev.target.classList.add('hide');
      buttonToggleMore.classList.remove('hide');
      const buttonDownloadBackups = (divElement as HTMLDivElement).querySelector('.button-download-backups') as HTMLButtonElement;
      buttonDownloadBackups.style.display = 'none';
      const buttonExportMapping = (divElement as HTMLDivElement).querySelector('.button-export-mapping') as HTMLButtonElement;
      buttonExportMapping.style.display = 'none';
    
    });

    // Statute filters

    const arrFilterPlain = (divElement as HTMLDivElement).querySelectorAll('.plain-filter-icon') as NodeListOf<HTMLInputElement>;
    for(var i = 0; i < arrFilterPlain.length; i++) {
      arrFilterPlain[i].addEventListener('click', (e: any) => {
        const value = ((e.currentTarget as HTMLSpanElement).nextSibling as SfIElasticText).text;
        ((divElement as HTMLDivElement).querySelector('.input-filter') as HTMLInputElement).value = value;
        const event = new KeyboardEvent('keyup', {
          key: 'Enter',
          code: 'Enter',
          which: 13,
          keyCode: 13,
        });
        ((divElement as HTMLDivElement).querySelector('.input-filter') as HTMLInputElement).dispatchEvent(event);
        //console.log('filter click');
      })
    }


    // Expand handlers

    const arrExpands = (divElement as HTMLDivElement).querySelectorAll('.button-expand') as NodeListOf<HTMLInputElement>;
    for(var i = 0; i < arrExpands.length; i++) {
      arrExpands[i].addEventListener('click', (e: any) => {

        (divElement as HTMLDivElement).querySelector('#detail-overlay')?.classList.remove('hide');
        const id = e.currentTarget.id;
        const index = id.split("-")[2];
        //console.log(id, index);
        var html = '';

        html += '<div class="d-flex flex-wrap">';
        for(var j = 0; j < JSON.parse(jsonData[0].data.cols).length; j++) {

          html += '<div class="p-10">';
            html += ('<div part="td-head">' + JSON.parse(jsonData[0].data.cols)[j] + '</div>');
            if(JSON.parse(jsonData[0].data.cols)[j] == "state") {
              //console.log('state value', JSON.parse(jsonData[index].data.data)[j]);
            }
            if(Array.isArray(JSON.parse(jsonData[index].data.data)[j])) {

              html +=  '<div part="td-body">';
              if(JSON.parse(jsonData[index].data.data)[j].length === 0) {

                html +=  ('-<br />');

              } else {
                for(var k = 0; k < JSON.parse(jsonData[index].data.data)[j].length; k++) {
                
                  var val = JSON.parse(jsonData[index].data.data)[j][k];
                  if(val == '') {
                    val = '-';
                  }
                  html +=  ('<sf-i-elastic-text text="'+val+'" minLength="80"></sf-i-elastic-text>');
                  
                }
              }
              
              html +=  '</div>';

            } else {
              
              var val = JSON.parse(jsonData[index].data.data)[j];
              if(val == '') {
                val = '-';
              }
              html += ('<div part="td-body">' + '<sf-i-elastic-text text="'+val+'" minLength="80"></sf-i-elastic-text>' + '</div><br />')
              
            }
          html += '</div>';
        }
        html += '</div>';

        (divElement as HTMLDivElement).querySelector('#detail-overlay-list')!.innerHTML = html;

      })

    }

    // Detail close

    ((divElement as HTMLDivElement).querySelector('.detail-close') as HTMLButtonElement).addEventListener('click', (_e: any) => {
      (divElement as HTMLDivElement).querySelector('#detail-overlay')?.classList.add('hide');
    });

    // Checkbox handlers

    const arrCheckBoxes = (divElement as HTMLDivElement).querySelectorAll('.checkbox-row') as NodeListOf<HTMLInputElement>;
    for(var i = 0; i < arrCheckBoxes.length; i++) {
      arrCheckBoxes[i].addEventListener('change', async (_e: any) => {
        //console.log(e.currentTarget, (e.currentTarget as HTMLInputElement).checked);
        ((divElement as HTMLDivElement).querySelector('.button-save') as HTMLButtonElement).disabled = false;
        if(extraFieldPosition === 1) {
          await this.saveMapping (divElement, uploadBlock, jsonData, extraFields, searchString, uploadFunction, refreshFunction, true)
        }
      });
    }

    (divElement as HTMLDivElement).querySelector('.checkbox-all')?.addEventListener('change', (e: any) => {

      //console.log('cb-length', arrCheckBoxes.length);
      for(var i = 0; i < arrCheckBoxes.length; i++) {
        const tableRow = (divElement as HTMLDivElement).querySelector('#tablerow-' + (i)) as HTMLElement;
        //console.log('tablerow', i, tableRow);
        if(tableRow != null) {
          if(tableRow.style.display != 'none') {
            //console.log('tablerow setting', e.currentTarget.checked, (arrCheckBoxes[i] as HTMLInputElement));
            (arrCheckBoxes[i] as HTMLInputElement).checked = e.currentTarget.checked;
          }
        }
      }
      ((divElement as HTMLDivElement).querySelector('.button-save') as HTMLButtonElement).disabled = false;

    });

    // Next, previous, save handlers

    (this._SfButtonNext as HTMLButtonElement)?.addEventListener('click', async () => {
      const resultFunction = await fetchFunction(searchString, cursor[cursor.length - 1].next);
      //console.log(resultFunction);
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
        
        cursor.push({prev: cursor[cursor.length - 1].next, next: resultFunction.cursor})
        this.renderMappingTable(divElement, jsonData1, cursor, fetchFunction, searchString, mappedArray, found, uploadFunction, refreshFunction, extraFields, uploadBlock, extraFieldPosition, colName, subfilter, statuteColName, extraHintsArr)
      }
    });

    (this._SfButtonPrev as HTMLButtonElement)?.addEventListener('click', async () => {
      cursor.pop();
      const resultFunction = await fetchFunction(searchString, cursor[cursor.length - 1].prev);
      //console.log(resultFunction);
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
        //console.log('clicked', jsonData1);
        this.renderMappingTable(divElement, jsonData1, cursor, fetchFunction, searchString, mappedArray, found, uploadFunction, refreshFunction, extraFields, uploadBlock, extraFieldPosition, colName, subfilter, statuteColName, extraHintsArr)
      }
    });

    (this._SfButtonSave as HTMLButtonElement)?.addEventListener('click', async () => {

      await this.saveMapping (divElement, uploadBlock, jsonData, extraFields, searchString, uploadFunction, refreshFunction, false)

    });

    // const arrExtraFields = (divElement as HTMLDivElement).querySelectorAll('.extra-field') as NodeListOf<SfIMultitextarea>;
    // var totalFields = 0;
    // var filledFields = 0;
    // for(var i = 0; i < arrExtraFields.length; i++) {
    //   const extraField = arrExtraFields[i] as SfIMultitextarea;
    //   if(extraField.parentElement?.parentElement?.parentElement?.style.display != "none" && (extraField.parentElement?.parentElement?.parentElement?.firstChild?.firstChild?.firstChild as HTMLInputElement).checked) {
    //     if(extraField.getFilled()) {
    //       filledFields++;
    //     }
    //     totalFields++;
    //   }
    // }
    // (divElement as HTMLDivElement).querySelector("#span-extra-filled")!.innerHTML = "Fields: " + filledFields + "/" + totalFields + " completed";
    //console.log('Total fields = ' + totalFields + ', filled fields = ' + filledFields);

  }

  getPreviousExtraFields = (i:number, previousExtraFields: any, locationsForThisItem: any, showSearch: boolean) => {

    var userHtml = '';

    if(previousExtraFields != null && previousExtraFields.length === 9 && Object.keys(previousExtraFields[0]).length > 0) {

      userHtml += '<table class="proposed-users-table proposed-users-table-'+i+'">';
      userHtml += '<tr>';
        userHtml += '<th part="td-head">';
          userHtml += 'Reporter';
        userHtml += '</th>';
        userHtml += '<th part="td-head">';
          userHtml += 'Approver';
        userHtml += '</th>';
        userHtml += '<th part="td-head">';
          userHtml += 'Functionhead';
        userHtml += '</th>';
        userHtml += '<th part="td-head">';
          userHtml += 'Auditor';
        userHtml += '</th>';
        userHtml += '<th part="td-head">';
          userHtml += 'Viewer';
        userHtml += '</th>';
      userHtml += '</tr>';
      userHtml += '<tr>';
        userHtml += '<th part="td-head">';

          let strLocationsForThisItem : string= JSON.stringify(locationsForThisItem).replace(/"/g,'&quot;');
          let valuesForThisItem : any = (previousExtraFields != null ? (previousExtraFields[3] != null ? previousExtraFields[3] : "") : "");
          let strValuesForThisItem: string = JSON.stringify(valuesForThisItem).replace(/"/g,'&quot;');
          userHtml += '<div class="'+(!showSearch ? 'truncate' : '')+'"><sf-i-multitextarea class="extra-field" fields="'+strLocationsForThisItem+'" values="'+strValuesForThisItem+'" showCollapsed="true"></sf-i-multitextarea></div>';

        userHtml += '</th>';
        userHtml += '<th part="td-head">';

          strLocationsForThisItem = JSON.stringify(locationsForThisItem).replace(/"/g,'&quot;');
          valuesForThisItem = (previousExtraFields != null ? (previousExtraFields[4] != null ? previousExtraFields[4] : "") : "");
          strValuesForThisItem =  JSON.stringify(valuesForThisItem).replace(/"/g,'&quot;');
          userHtml += '<div class="'+(!showSearch ? 'truncate' : '')+'"><sf-i-multitextarea class="extra-field" fields="'+strLocationsForThisItem+'" values="'+strValuesForThisItem+'" showCollapsed="true"></sf-i-multitextarea></div>';

        userHtml += '</th>';
        userHtml += '<th part="td-head">';

          strLocationsForThisItem = JSON.stringify(locationsForThisItem).replace(/"/g,'&quot;');
          valuesForThisItem = (previousExtraFields != null ? (previousExtraFields[5] != null ? previousExtraFields[5] : "") : "");
          strValuesForThisItem =  JSON.stringify(valuesForThisItem).replace(/"/g,'&quot;');
          userHtml += '<div class="'+(!showSearch ? 'truncate' : '')+'"><sf-i-multitextarea class="extra-field" fields="'+strLocationsForThisItem+'" values="'+strValuesForThisItem+'" showCollapsed="true"></sf-i-multitextarea></div>';

        userHtml += '</th>';
        userHtml += '<th part="td-head">';

          strLocationsForThisItem = JSON.stringify(locationsForThisItem).replace(/"/g,'&quot;');
          valuesForThisItem = (previousExtraFields != null ? (previousExtraFields[6] != null ? previousExtraFields[6] : "") : "");
          strValuesForThisItem =  JSON.stringify(valuesForThisItem).replace(/"/g,'&quot;');
          userHtml += '<div class="'+(!showSearch ? 'truncate' : '')+'"><sf-i-multitextarea class="extra-field" fields="'+strLocationsForThisItem+'" values="'+strValuesForThisItem+'" showCollapsed="true"></sf-i-multitextarea></div>';

        userHtml += '</th>';
        userHtml += '<th part="td-head">';

          strLocationsForThisItem = JSON.stringify(locationsForThisItem).replace(/"/g,'&quot;');
          valuesForThisItem = (previousExtraFields != null ? (previousExtraFields[7] != null ? previousExtraFields[7] : "") : "");
          strValuesForThisItem =  JSON.stringify(valuesForThisItem).replace(/"/g,'&quot;');
          userHtml += '<div class="'+(!showSearch ? 'truncate' : '')+'"><sf-i-multitextarea class="extra-field" fields="'+strLocationsForThisItem+'" values="'+strValuesForThisItem+'" showCollapsed="true"></sf-i-multitextarea></div>';

        userHtml += '</th>';
      userHtml += '</tr>';
      userHtml += '</table>';
      userHtml += '';

    }

    return userHtml;

  }

  refreshCalendar = async () => {

    //console.log('tabs',this.myOnboardingTab,this.TAB_CALENDAR);
    
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

  renderNewOnboarding = () => {

    var html = '';

    html += '<div class="w-100 d-flex justify-center">';
      html += '<div>';
        html += '<div part="rcm-section-title" class="d-flex mt-20 mb-20 justify-center"><span>Client Sign Off</span></div><br />';
        html += '<label part="input-label" class="mt-5">Remarks</label><br />';
        html += '<textarea id="rcm-signoff" part="input" type="text"></textarea><br /><br />'
        html += '<label part="input-label" class="mt-5">Signature</label><br />';
        html += '<input id="rcm-signature" part="input" type="text" class="w-90"/><br /><br />'
        html += '<div class="d-flex justify-end align-center mt-20"><button part="button" class="d-flex align-center submit-signoff"><span class="material-symbols-outlined">signature</span>&nbsp;&nbsp;  Submit</button></div>'
        html += '<div class="mt-20 mb-10"></div>';
      html += '</div>';
    html += '</div>';

    (this._SfOnboardingSignoffContainer as HTMLDivElement).innerHTML = html;

    

  }

  renderOnboardingSignoff = (signoff: any) => {

    var html = '';

    // if(signoff.result == null) {

      this.renderNewOnboarding();

    // } else {

      html += '<div class="w-100 d-flex justify-evenly">';
        html += '<div>';
          html += '<div part="rcm-section-title" class="d-flex mt-20 mb-20"><span>New Sign Off</span></div><br />';
          html += '<label part="input-label" class="mt-5">Remarks</label><br />';
          html += '<textarea id="rcm-signoff" part="input" type="text"></textarea><br /><br />'
          html += '<label part="input-label" class="mt-5">Signature</label><br />';
          html += '<input id="rcm-signature" part="input" type="text" class="w-90"/><br /><br />'
          html += '<div class="d-flex justify-end align-center mt-20"><button part="button" class="d-flex align-center submit-signoff"><span class="material-symbols-outlined">signature</span>&nbsp;&nbsp;  Submit</button></div>'
          html += '<div class="mt-20 mb-10"></div>';
        html += '</div>';
        html += '<div>';
          html += '<div class="d-flex justify-between align-center">';
          html += '<div part="rcm-section-title" class="d-flex mt-20 mb-20 justify-center"><span>Sign Offs</span></div>';
          html += (this.disablesignoff == "yes" ? "" : '<button part="button" class="button-new d-flex align-center mt-20 mb-20"><span class="material-symbols-outlined">add</span><span>&nbsp;&nbsp;New</span></button>');
          html += '</div>';
          html += '<table class="mt-20">';
            html += '<thead>';
            html += '<th part="td-head" class="td-head">';
            html += 'Name';
            html += '</th>';
            html += '<th part="td-head" class="td-head">';
            html += 'Remarks';
            html += '</th>';
            html += '<th part="td-head" class="td-head">';
            html += 'Signature';
            html += '</th>';
            html += '<th part="td-head" class="td-head">';
            html += 'Timestamp';
            html += '</th>';
            html += '</thead>';
            const jsonData = JSON.parse(signoff.result.data.S);
            for(var i = 0; i < jsonData.length; i++) {

              var classBg = "";
              if (i % 2 === 0) {
                  classBg = 'td-light';
              }
              else {
                  classBg = 'td-dark';
              }
              html += '<tr>';
              html += '<td part="td-body" class="td-body ' + classBg + '">';
              html += jsonData[i].username != null ? jsonData[i].username : "";
              html += '</td>';
              html += '<td part="td-body" class="td-body ' + classBg + '">';
              html += jsonData[i].signofftext;
              html += '</td>';
              html += '<td part="td-body" class="td-body ' + classBg + '">';
              html += jsonData[i].signature;
              html += '</td>';
              html += '<td part="td-body" class="td-body ' + classBg + '">';
              html += new Date(parseInt(jsonData[i].timestamp));
              html += '</td>';
              //console.log(jsonData[i]);
            }
          html += '</table>';
        html += '</div>';
      html += '</div>';

      html += '<div class="w-100 d-flex justify-center">';
        
      html += '</div>';

    // }

    (this._SfOnboardingSignoffContainer as HTMLDivElement).innerHTML = html;
    (this._SfOnboardingSignoffContainer as HTMLDivElement).querySelector('.submit-signoff')?.addEventListener('click', async (_e: any) => {

      const signofftext = ((this._SfOnboardingSignoffContainer as HTMLDivElement).querySelector('#rcm-signoff') as HTMLInputElement).value;
      const signoffsignature = ((this._SfOnboardingSignoffContainer as HTMLDivElement).querySelector('#rcm-signature') as HTMLInputElement).value;
      await this.fetchUpdateSignOff(signofftext, signoffsignature);
      this.loadOnboardingSignoff();

    })

  }

  renderOnboardingCalendar = (_calendarJobs: any) => {

    //console.log('calendarjobs', calendarJobs);

    var html = '';

    html += '<div id="calendar-list-container" class="pb-10 pt-10 w-100">';

      // html += '<div class="d-flex justify-center align-center w-100">';
      //   html += '<h2 part="results-title">Calendar</h2>';
      // html += '</div>';
    
      // if(calendarJobs.data != null) {

      //   html += '<div class="d-flex justify-center align-center w-100">';

      //     html += '<div class="p-10">';
      //       html += '<div part="input-label" class="text-center">Job Status</div>';
      //       html += '<div class="d-flex align-center text-center">' + (calendarJobs.data.status == "0" ? "<span class=\"color-not-started material-icons\">schedule</span>&nbsp;Initialized" : calendarJobs.data.status == "1" ? "<span class=\"color-pending material-icons\">pending</span>&nbsp;In-Progress" : "<span class=\"color-done material-icons\">check_circle</span>&nbsp;Complete" ) + '</div>';
      //     html += '</div>';

      //     html += '<div class="p-10">';
      //       html += '<div part="input-label" class="text-center">Last Updated</div>';
      //       html += '<div class="text-center">' + new Date(calendarJobs.data.lastupdated).toLocaleString() + '</div>';
      //     html += '</div>';
      //   html += '</div>';

      // }

      html += '<div class="d-flex justify-center align-center w-100 mt-20">';
        html += '<select id="select-year" class="mr-10"><option value="2024">2024-25</option><option value="2023">2023-24</option></select>'
        html += '<button part="button" class="button-submit d-flex align-center"><span class="material-icons">bolt</span>&nbsp;<span>Update Calendar</span></button>';
      html += '</div>';

    html += '</div>';

    (this._SfOnboardingCalendarContainer as HTMLDivElement).innerHTML = html;

    (this._SfOnboardingCalendarContainer as HTMLDivElement).querySelector('.button-submit')?.addEventListener('click', async () => {
      const year = ((this._SfOnboardingCalendarContainer as HTMLDivElement).querySelector('#select-year') as HTMLSelectElement).value;
      //console.log(year);
      const usermap = await this.fetchGetMappedCalendar(year);
      
      if(usermap == null || usermap.usermap == null) {
        this.setError(usermap.error);
        setTimeout(() => {
          this.clearMessages()
        }, 10000);
      } else {
        await this.fetchUpdateUsermap(usermap.usermap);
      }
      
    });

    //this.refreshCalendar();

  }

  renderOnboardingTriggers = (mappedTriggers: any, mappedSerializedAlertSchedules: any, triggersJobs: any) => {

    var html = '';

    html += '<div id="triggers-list-container" class="d-flex flex-col w-100 scroll-x">';
    html += '</div>';

    (this._SfOnboardingTriggersContainer as HTMLDivElement).innerHTML = html;

    //console.log('rendering triggers...', (this._SfOnboardingTriggersContainer as HTMLDivElement).innerHTML);

    this.renderTaggingTable((this._SfOnboardingTriggersListContainer as HTMLDivElement),mappedSerializedAlertSchedules, mappedTriggers, ["frequency", "obligation", "country", "statute"], this.uploadTriggersMapping, this.loadOnboardingTriggers, "triggers", ["id", "entityname", "locationname"], '', "", ["triggers"], triggersJobs, null, ["Client remarks", "FlaggGRC response"], null, "", "");

  }

  renderOnboardingInternalControls = (mappedInternalControls: any, mappedSerializedTriggers: any, internalcontrolsJobs: any) => {

    var html = '';

    html += '<div id="internalcontrols-list-container" class="d-flex flex-col w-100 scroll-x">';
    html += '</div>';

    (this._SfOnboardingInternalControlsContainer as HTMLDivElement).innerHTML = html;

    this.renderTaggingTable((this._SfOnboardingInternalControlsListContainer as HTMLDivElement),mappedSerializedTriggers, mappedInternalControls, ["frequency", "firstlineofdefence", "obligation", "country", "statute"], this.uploadInternalControlsMapping, this.loadOnboardingInternalControls, "internalcontrols", ["id", "entityname", "locationname"], '', "", ["internalcontrols"], internalcontrolsJobs, null, ["Client remarks", "FlaggGRC response"], null, "", "");

  }

  renderOnboardingActivations = (mappedActivations: any, mappedSerializedExtensions: any, activationsJobs: any) => {

    var html = '';

    html += '<div id="activations-list-container" class="d-flex flex-col w-100 scroll-x">';
    html += '</div>';

    (this._SfOnboardingActivationsContainer as HTMLDivElement).innerHTML = html;

    this.renderTaggingTable((this._SfOnboardingActivationListContainer as HTMLDivElement),mappedSerializedExtensions, mappedActivations, [ "firstlineofdefence", "obligation", "country", "statute"], this.uploadActivationsMapping, this.loadOnboardingActivations, "activations", ["id", "entityname", "locationname"], '', "", ["activations"], activationsJobs, null, ["Client remarks", "FlaggGRC response"], null, "", "");

  }
  
  renderOnboardingInvalidations = (mappedInvalidations: any, mappedSerializedExtensions: any, invalidationsJobs: any) => {

    var html = '';

    html += '<div id="invalidations-list-container" class="d-flex flex-col w-100 scroll-x">';
    html += '</div>';

    (this._SfOnboardingInvalidationsContainer as HTMLDivElement).innerHTML = html;

    this.renderTaggingTable((this._SfOnboardingInvalidationListContainer as HTMLDivElement),mappedSerializedExtensions, mappedInvalidations, ["firstlineofdefence", "obligation", "country", "statute"], this.uploadInvalidationsMapping, this.loadOnboardingInvalidations, "invalidations", ["id", "entityname", "locationname"], '', "", ["invalidations"], invalidationsJobs, null, ["Client remarks", "FlaggGRC response"], null, "", "");

  }

  renderOnboardingAlertSchedules = (mappedAlertSchedules: any, mappedSerializedExtensions: any, alertschedulesJobs: any) => {

    var html = '';

    html += '<div id="alertschedules-list-container" class="d-flex flex-col w-100 scroll-x">';
    html += '</div>';

    (this._SfOnboardingAlertSchedulesContainer as HTMLDivElement).innerHTML = html;

    this.renderTaggingTable((this._SfOnboardingAlertSchedulesListContainer as HTMLDivElement),mappedSerializedExtensions, mappedAlertSchedules, [ "alertschedules", "firstlineofdefence", "obligation", "country", "statute"], this.uploadAlertSchedulesMapping, this.loadOnboardingAlertSchedules, "alertschedules", ["id", "entityname", "locationname"], '', "", ["alertschedules"], alertschedulesJobs, null, ["Client remarks", "FlaggGRC response"], null, "", "");

  }

  renderOnboardingExtensions = (mappedExtensions: any, mappedSerializedDuedates: any, extensionsJobs: any) => {

    var html = '';

    html += '<div id="extensions-list-container" class="d-flex flex-col w-100 scroll-x">';
    html += '</div>';

    (this._SfOnboardingExtensionsContainer as HTMLDivElement).innerHTML = html;

    this.renderTaggingTable((this._SfOnboardingExtensionsListContainer as HTMLDivElement),mappedSerializedDuedates, mappedExtensions, ["duedate","firstlineofdefence", "obligation", "country", "statute"], this.uploadExtensionsMapping, this.loadOnboardingExtensions, "extensions", ["id", "entityname", "locationname"], '', "", ["extensions"], extensionsJobs, null, ["Client remarks", "FlaggGRC response"], null, "", "");

  }

  renderOnboardingDuedates = (mappedDuedates: any, mappedSerializedMakerCheckers: any, duedatesJobs: any) => {

    var html = '';

    html += '<div id="duedates-list-container" class="d-flex flex-col w-100 scroll-x">';
    html += '</div>';

    (this._SfOnboardingDuedatesContainer as HTMLDivElement).innerHTML = html;

    this.renderTaggingTable((this._SfOnboardingDuedatesListContainer as HTMLDivElement),mappedSerializedMakerCheckers, mappedDuedates, ["duedate", "firstlineofdefence", "obligation", "country", "statute"], this.uploadDuedatesMapping, this.loadOnboardingDuedates, "duedates", ["id", "entityname", "locationname"], '', "", ["duedates"], duedatesJobs, null, ["Client remarks", "FlaggGRC response"], null, "", "");

  }

  renderOnboardingReporters = (mappedReporters: any, mappedSerializedTags: any, reportersJobs: any, _arrFeedbackReference: any) => {

    var html = '';

    html += '<div id="reporters-list-container" class="d-flex flex-col w-100 scroll-x">';
    html += '</div>';

    (this._SfOnboardingReportersContainer as HTMLDivElement).innerHTML = html;

    this.renderTaggingTable((this._SfOnboardingReportersListContainer as HTMLDivElement),mappedSerializedTags, mappedReporters, ["obligation","firstlineofdefence", "country", "statute", "reference"], this.uploadReportersMapping, this.loadOnboardingReporters, "reporters", ["id", "entityname", "locationname"], this.apiIdUsers, "", ["reporters"], reportersJobs, null, ["Client remarks", "FlaggGRC response"], null, "Guidelines", "");

  }

  renderOnboardingApprovers = (mappedApprovers: any, mappedSerializedReporters: any, approversJobs: any, _arrFeedbackReference: any) => {

    var html = '';

    html += '<div id="approvers-list-container" class="d-flex flex-col w-100 scroll-x">';
    html += '</div>';

    (this._SfOnboardingApproversContainer as HTMLDivElement).innerHTML = html;

    this.renderTaggingTable((this._SfOnboardingApproversListContainer as HTMLDivElement),mappedSerializedReporters, mappedApprovers, ["obligation","firstlineofdefence","secondlineofdefence", "country", "statute", "reference"], this.uploadApproversMapping, this.loadOnboardingApprovers, "approvers", ["id", "entityname", "locationname"], this.apiIdUsers, "", ["approvers"], approversJobs, null, ["Client remarks", "FlaggGRC response"], null, "Guidelines", "");

  }

  renderOnboardingFunctionHeads = (mappedFunctionHeads: any, mappedSerializedApprovers: any, functionHeadsJobs: any, _arrFeedbackReference: any) => {

    var html = '';

    html += '<div id="functionheads-list-container" class="d-flex flex-col w-100 scroll-x">';
    html += '</div>';

    (this._SfOnboardingFunctionHeadsContainer as HTMLDivElement).innerHTML = html;

    this.renderTaggingTable((this._SfOnboardingFunctionHeadsListContainer as HTMLDivElement),mappedSerializedApprovers, mappedFunctionHeads, ["obligation", "firstlineofdefence","thirdlineofdefence", "country", "statute", "reference"], this.uploadFunctionHeadsMapping, this.loadOnboardingFunctionHeads, "functionheads", ["id", "entityname", "locationname"], this.apiIdUsers, "", ["functionheads"], functionHeadsJobs, null, ["Client remarks", "FlaggGRC response"], null, "Guidelines", "");

  }

  renderOnboardingMakerCheckers = (mappedMakerCheckers: any, mappedSerializedDocs: any, makerCheckerJobs: any) => {

    var html = '';

    html += '<div id="makercheckers-list-container" class="d-flex flex-col w-100 scroll-x">';
    html += '</div>';

    (this._SfOnboardingMakerCheckersContainer as HTMLDivElement).innerHTML = html;

    this.renderTaggingTable((this._SfOnboardingMakerCheckersListContainer as HTMLDivElement),mappedSerializedDocs, mappedMakerCheckers, ["firstlineofdefence", "obligation", "obligationtype", "country", "statute"], this.uploadMakerCheckersMapping, this.loadOnboardingMakerCheckers, "makercheckers", ["id", "entityname", "locationname"], this.apiIdTags, "&MakerChecker", ["makercheckers"], makerCheckerJobs, null, ["Client remarks", "FlaggGRC response"], null, "", "");

  }

  renderOnboardingDocs = (mappedDocs: any, mappedSerializedViewers: any, docsJobs: any) => {

    var html = '';

    html += '<div id="docs-list-container" class="d-flex flex-col w-100 scroll-x">';
    html += '</div>';

    (this._SfOnboardingDocsContainer as HTMLDivElement).innerHTML = html;

    this.renderTaggingTable((this._SfOnboardingDocsListContainer as HTMLDivElement),mappedSerializedViewers, mappedDocs, ["firstlineofdefence", "obligation", "obligationtype", "country", "statute"], this.uploadDocsMapping, this.loadOnboardingDocs, "docs", ["id", "entityname", "locationname"], this.apiIdTags, "&MakerChecker", ["docs"], docsJobs, null, ["Client remarks", "FlaggGRC response"], null, "", "");

  }

  renderOnboardingAuditors = (mappedAuditors: any, mappedSerializedFunctionheads: any, auditorsJobs: any, _arrFeedbackReference: any) => {

    //console.log('inside rendering auditors..');

    var html = '';

    html += '<div id="auditors-list-container" class="d-flex flex-col w-100 scroll-x">';
    html += '</div>';

    (this._SfOnboardingAuditorsContainer as HTMLDivElement).innerHTML = html;

    this.renderTaggingTable((this._SfOnboardingAuditorsListContainer as HTMLDivElement),mappedSerializedFunctionheads, mappedAuditors, ["obligation","firstlineofdefence", "country", "statute", "reference"], this.uploadAuditorsMapping, this.loadOnboardingAuditors, "auditors", ["id", "entityname", "locationname"], this.apiIdUsers, "", ["auditors"], auditorsJobs, null, ["Client remarks", "FlaggGRC response"], null, "Guidelines", "");

  }

  renderOnboardingViewers = (mappedViewers: any, mappedSerializedAuditors: any, viewersJobs: any, _arrFeedbackReference: any) => {

    //console.log('inside rendering viewers..');

    var html = '';

    html += '<div id="viewers-list-container" class="d-flex flex-col w-100 scroll-x">';
    html += '</div>';

    (this._SfOnboardingViewersContainer as HTMLDivElement).innerHTML = html;

    this.renderTaggingTable((this._SfOnboardingViewersListContainer as HTMLDivElement),mappedSerializedAuditors, mappedViewers, ["obligation","firstlineofdefence", "country", "statute", "reference"], this.uploadViewersMapping, this.loadOnboardingViewers, "viewers", ["id", "entityname", "locationname"], this.apiIdUsers, "", ["viewers"], viewersJobs, null, ["Client remarks", "FlaggGRC response"], null, "Guidelines", "");

  }

  renderOnboardingTags = (mappedTags: any, mappedSerializedFunctions: any, tagsJobs: any) => {

    var html = '';

    html += '<div id="tags-list-container" class="d-flex flex-col w-100 scroll-x">';
    html += '</div>';

    (this._SfOnboardingTagsContainer as HTMLDivElement).innerHTML = html;

    this.renderTaggingTable((this._SfOnboardingTagsListContainer as HTMLDivElement),mappedSerializedFunctions, mappedTags, ["obligationtype","firstlineofdefence", "obligationtitle", "obligation", "reference", "country", "statute"], this.uploadTagsMapping, this.loadOnboardingTags, "tags", ["id", "countryname", "entityname", "locationname"], this.apiIdTags, "&Tag", ["tags"], tagsJobs, "tagtype", ["Client remarks", "FlaggGRC response"], null, "", "");

  }

  renderOnboardingFunctions = (mappedFunctions: any, mappedSerializedLocations: any, functionsJobs: any) => {

    var html = '';

    html += '<div id="functions-list-container" class="d-flex flex-col w-100 scroll-x">';
    html += '</div>';

    for(var i = 0; i < mappedSerializedLocations.data.mappings.mappings.length; i++) {

      if(mappedSerializedLocations.data.mappings.mappings[i].id == "33a0deab-e93e-41b7-831a-473f9ea3eea2") {
        //console.log('mappedSerializedLocations', mappedSerializedLocations.data.mappings.mappings[i]);
      }

    }

    (this._SfOnboardingFunctionsContainer as HTMLDivElement).innerHTML = html;

    this.renderTaggingTable((this._SfOnboardingFunctionsListContainer as HTMLDivElement),mappedSerializedLocations, mappedFunctions, ["obligation","firstlineofdefence", "country", "statute", "reference"], this.uploadFunctionsMapping, this.loadOnboardingFunctions, "functions", ["id", "countryname", "entityname", "locationname"], this.apiIdTags, "&Function", ["functions"], functionsJobs, null, ["Client remarks", "FlaggGRC response"], null, "", "");

  }

  renderOnboardingLocations = (mappedLocations: any, mappedSerializedEntities: any, locationsJobs: any) => {

    var html = '';

    html += '<div id="locations-list-container" class="d-flex flex-col w-100 scroll-x">';
    html += '</div>';

    (this._SfOnboardingLocationsContainer as HTMLDivElement).innerHTML = html;

    this.renderTaggingTable((this._SfOnboardingLocationsListContainer as HTMLDivElement),mappedSerializedEntities, mappedLocations, ["firstlineofdefence", "obligation", "country", "statute", "reference"], this.uploadLocationsMapping, this.loadOnboardingLocations, "locations", ["id", "countryname", "entityname"], this.apiIdTags, "&Location", ["locations"], locationsJobs, null, ["Client remarks", "FlaggGRC response"], null, "", "");

  }

  renderOnboardingCompliances = (mappedStatutes: any, mappedCompliances: any) => {

    //console.log('mappedcompliances', mappedCompliances);
    //console.log('mappedstatutes', mappedStatutes);

    var searchString = "";

    for(var i = 0; i < (mappedStatutes.data.mappings.mappings as Array<any>).length; i++) {
      if((mappedStatutes.data.mappings.mappings as Array<any>)[i].selected) {
        searchString += (mappedStatutes.data.mappings.mappings as Array<any>)[i].id + "|";
      }
    }
    searchString = searchString.slice(0, -1);

    //console.log('searchstring', searchString);

    var initCursor = "";

    var html = '';

    html += '<div class="d-flex flex-col w-100" style="height: 75vh">';
      html += '<div class="d-flex flex-col w-100">';
      html += '<label part="input-label">Search Compliances</label>';
        html += '<div class="d-flex">';
        html += '<input part="input" type="text" class="w-100 input-search" placeholder="Use | to separate..." disabled/>'
        html += '<button part="button-icon" class="ml-10 material-icons button-search">search</button>'
        html += '</div>';
      html += '</div>';

      html += '<div id="compliances-list-container" class="d-flex flex-col w-100 scroll-x">';
      html += '</div>';
    html += '</div>';

    (this._SfOnboardingCompliancesContainer as HTMLDivElement).innerHTML = html;
    
    (this._SfButtonSearch as HTMLButtonElement).addEventListener('click', async () => {
      //console.log('clicked', mappedStatutes.data.mappings.mappings);
      const searchString = (this._SfInputSearch as HTMLButtonElement).value;
      //console.log('searchstring', searchString);
      if(searchString.length > 0) {

        const arrSearchString = searchString.split('|');
        var resultCompliances : any = {};
        resultCompliances.values = [];
        const chunkSize = 20;
        for (let k = 0; k < arrSearchString.length; k += chunkSize) {
          
          const chunk = arrSearchString.slice(k, k + chunkSize);
            // do whatever
          const tempResultCompliances = await this.fetchSearchCompliances(chunk.join('|'), "", k, arrSearchString.length);
          //console.log(tempResultCompliances)
          resultCompliances.values.push(...tempResultCompliances.values);
          //console.log(resultCompliances);
            
        }

        if(resultCompliances != null) {

          const jsonData = [];

          const arrCompliancesFrequencies : any = {};

          for(var i = 0; i < resultCompliances.values.length; i++) {

            if(arrCompliancesFrequencies[resultCompliances.values[i].id] != null) {
              continue;
            } else {
              arrCompliancesFrequencies[resultCompliances.values[i].id] = 0;
            }

            var mapped = false;
            var extraFields = null;
            var previousExtraFields = null;
            for(var j = 0; j < mappedCompliances.data.mappings.mappings.length; j++) {
              if(mappedCompliances.data.mappings.mappings[j].id == resultCompliances.values[i].id) {
                if(mappedCompliances.data.mappings.mappings[j].selected) {
                  mapped = true;
                }
                extraFields = mappedCompliances.data.mappings.mappings[j].extraFields;
              }
            }
            
            for(j = 0; j < mappedStatutes.data.mappings.mappings.length; j++) {

              // console.log('mappedStatutes.data.mappings.mappings[j]', mappedStatutes.data.mappings.mappings[j]);
              if(Array.isArray(mappedStatutes.data.mappings.mappings[j].statutename)) {
                // sometimes this error occurs
                continue;

              }
              
              if(mappedStatutes.data.mappings.mappings[j].statutename.trim() == JSON.parse(resultCompliances.values[i].fields.data[0])[6][0].trim()) {

                if(mappedStatutes.data.mappings.mappings[j].statutename.trim() == "Corporation Act, 2001") {
                  //console.log('pushpreviousvalues', mappedStatutes.data.mappings.mappings[j], Object.keys(mappedStatutes.data.mappings.mappings[j].extraFields[0]));
                }
                previousExtraFields = mappedStatutes.data.mappings.mappings[j].extraFields
              } 
            }
            jsonData.push({id: resultCompliances.values[i].id, mapped: mapped, data: resultCompliances.values[i].fields, cols: ["country", "jurisdiction", "state", "category", "subcategory", "statute", "applicability", "obligation", "risk", "riskarea", "frequency", "penalty", "reference", "form", "subfrequency","obligationtype","duedate"], extraFields: extraFields, previousExtraFields: previousExtraFields})
          }


          this.renderMappingTable((this._SfOnboardingCompliancesListContainer as HTMLDivElement), jsonData, [{prev: initCursor, next: resultCompliances.cursor}], this.fetchSearchCompliances, searchString, mappedCompliances, resultCompliances.values.length, this.uploadCompliancesMapping, this.loadOnboardingCompliances, ["Client remarks", "FlaggGRC response"], -1, 0, "compliances", "", "statute",["optional", "optional"]);

        }

      }

    });

    //console.log('compliances searchstring', searchString);

    if(searchString != "") {
      (this._SfInputSearch as HTMLInputElement).value = searchString;
      (this._SfButtonSearch as HTMLButtonElement).click();
    }

  }

  renderOnboardingEntities = (mappedEntities: any, mappedSerializedCountries: any, entitiesJobs: any, arrFeedbackReference: any) => {

    var html = '';

    html += '<div id="entities-list-container" class="d-flex flex-col w-100 scroll-x">';
    html += '</div>';

    (this._SfOnboardingEntitiesContainer as HTMLDivElement).innerHTML = html;

    this.renderTaggingTable((this._SfOnboardingEntitiesListContainer as HTMLDivElement),mappedSerializedCountries, mappedEntities, ["firstlineofdefence", "obligation", "country", "statute"], this.uploadEntitiesMapping, this.loadOnboardingEntities, "entities", ["id", "countryname"], this.apiIdTags, "&Entity", ["entities"], entitiesJobs, null, ["Client remarks", "FlaggGRC response"], arrFeedbackReference, "Guideline", "");

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

    this.renderTaggingTable((this._SfOnboardingCountriesListContainer as HTMLDivElement), mappedCompliances, mappedCountries, ["firstlineofdefence", "obligation", "country", "statute", "state", "subcategory"], this.uploadCountriesMapping, this.loadOnboardingCountries, "countries", ["id"], this.apiIdTags, "-Country", ["countries"], countriesJobs, null, ["Client remarks", "FlaggGRC response"], null, "", "");

  }

  renderOnboardingStatutes = (mappedStatutes: any) => {

    var initCursor = "";

    var html = '';

    html += '<div class="d-flex flex-col w-100" style="height: 75vh">';
      html += '<div class="d-flex flex-col w-100">';
      html += '<label part="input-label">Search Statutes</label>';
        html += '<div class="d-flex">';
        html += '<input part="input" type="text" class="w-100 input-search" placeholder="Use | to separate..." autofocus/>'
        html += '<button part="button-icon" class="ml-10 material-icons button-search">search</button>'
        html += '</div>';
      html += '</div>';

      html += '<div id="statutes-list-container" class="d-flex flex-col w-100 scroll-x">';
      html += '</div>';

    html += '<div>';

    (this._SfOnboardingStatutesContainer as HTMLDivElement).innerHTML = html;

    (this._SfInputSearch as HTMLInputElement).addEventListener('keyup', (e: any) => {
      if(e.key == 'Enter') {
        (this._SfButtonSearch as HTMLButtonElement).click();
      }
    });
    
    (this._SfButtonSearch as HTMLButtonElement).addEventListener('click', async () => {
      //console.log('clicked', mappedStatutes.data.mappings.mappings);
      const searchString = (this._SfInputSearch as HTMLButtonElement).value;
      //console.log('clicked', searchString);
      if(searchString.length > 0) {
        const resultStatutes = await this.fetchSearchStatutes(searchString, "");
        if(resultStatutes != null) {
          const jsonData = [];
          for(var i = 0; i < resultStatutes.values.length; i++) {
            var mapped = false;
            var extraFields = null;
            for(var j = 0; j < mappedStatutes.data.mappings.mappings.length; j++) {
              if(mappedStatutes.data.mappings.mappings[j].id == resultStatutes.values[i].id) {
                //console.log('comparing',mappedStatutes.data.mappings.mappings[j].id,resultStatutes.values[i].id);
                if(mappedStatutes.data.mappings.mappings[j].selected) {
                  mapped = true;
                }
                extraFields = mappedStatutes.data.mappings.mappings[j].extraFields;
              }
            }

            jsonData.push({id: resultStatutes.values[i].id, mapped: mapped, data: resultStatutes.values[i].fields, cols: ["country", "jurisdiction", "state", "name", "category", "subcategory", "applicability"], extraFields: extraFields})
          }
          //console.log('clicked', jsonData);
          this.renderMappingTable((this._SfOnboardingStatutesListContainer as HTMLDivElement), jsonData, [{prev: initCursor, next: resultStatutes.cursor}], this.fetchSearchStatutes, searchString, mappedStatutes, resultStatutes.found, this.uploadStatutesMapping, this.loadOnboardingStatutes, ["Client remarks<br ><span class=\"title-byline\">(mention your queries, else leave blank)<span>", "Entity applicability<br /><span class=\"title-byline\">(only applicable in case of multiple corporate entities, else leave blank)<span>", "Locations applicability<br /><span class=\"title-byline\">(mention in case there is location-wise variance of applicability, else leave blank)<span>", "Reporters<br /><span class=\"title-byline\">(details of personnel who have the reponsibility of reporting)<span>", "Approvers<br /><span class=\"title-byline\">(details of personnel who have the reponsibility of approving)", "Functionheads<br /><span class=\"title-byline\">(details of personnel who head the function)", "Auditors<br /><span class=\"title-byline\">(mention details of auditors in case they are known)</span>", "Viewers<br /><span class=\"title-byline\">(mention details personnel who need to be given readonly access)</span>", "FlaggGRC response"], -1, 1, "statutes", "", "name", ["optional", "optional", "optional", "name - email@company.com", "name - email@company.com", "optional", "optional", "optional", "optional"])

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
    if(this.myOnboardingTab == this.TAB_EXTENSIONS) {
      ((this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#extensions-tab-duedates') as HTMLButtonElement).click();
    }
    if(this.myOnboardingTab == this.TAB_ALERTSCHEDULES) {
      ((this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-alertschedules') as HTMLButtonElement).click();
    }
    if(this.myOnboardingTab == this.TAB_ACTIVATIONS) {
      ((this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-activations') as HTMLButtonElement).click();
    }
    if(this.myOnboardingTab == this.TAB_INVALIDATION) {
      ((this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-invalidations') as HTMLButtonElement).click();
    }
    if(this.myOnboardingTab == this.TAB_INTERNALCONTROLS) {
      ((this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-internalcontrols') as HTMLButtonElement).click();
    }
    if(this.myOnboardingTab == this.TAB_CALENDAR) {
      ((this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-calendar') as HTMLButtonElement).click();
    }

  }

  renderOnboardingStatus = (status: any) => {

    for(var i = 0; i < status.length; i++) {

      const arrStatus = status[i].split(';');
      if(arrStatus[0].toLowerCase().indexOf('statutes') >= 0) {
        (this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#button-status-statutes')!.innerHTML = arrStatus[1];
      }
      if(arrStatus[0].toLowerCase().indexOf('compliances') >= 0) {
        (this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#button-status-compliances')!.innerHTML = arrStatus[1];
      }
      if(arrStatus[0].toLowerCase().indexOf('countries') >= 0) {
        (this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#button-status-countries')!.innerHTML = arrStatus[1];
      }
      if(arrStatus[0].toLowerCase().indexOf('entities') >= 0) {
        (this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#button-status-entities')!.innerHTML = arrStatus[1];
      }
      if(arrStatus[0].toLowerCase().indexOf('locations') >= 0) {
        (this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#button-status-locations')!.innerHTML = arrStatus[1];
      }
      if(arrStatus[0].toLowerCase().indexOf('functions') >= 0
        ) {
        (this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#button-status-functions')!.innerHTML = arrStatus[1];
      }

      if(arrStatus[0].toLowerCase().indexOf('tags') >= 0) {
        (this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#button-status-tags')!.innerHTML = arrStatus[1];
      }
      if(arrStatus[0].toLowerCase().indexOf('reporters') >= 0) {
        (this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#button-status-reporters')!.innerHTML = arrStatus[1];
      }
      if(arrStatus[0].toLowerCase().indexOf('approvers') >= 0) {
        (this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#button-status-approvers')!.innerHTML = arrStatus[1];
      }
      if(arrStatus[0].toLowerCase().indexOf('functionheads') >= 0) {
        (this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#button-status-functionheads')!.innerHTML = arrStatus[1];
      }
      if(arrStatus[0].toLowerCase().indexOf('auditors') >= 0) {
        (this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#button-status-auditors')!.innerHTML = arrStatus[1];
      }
      if(arrStatus[0].toLowerCase().indexOf('viewers') >= 0) {
        (this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#button-status-viewers')!.innerHTML = arrStatus[1];
      }
      if(arrStatus[0].toLowerCase().indexOf('docs') >= 0) {
        (this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#button-status-docs')!.innerHTML = arrStatus[1];
      }
      if(arrStatus[0].toLowerCase().indexOf('makercheckers') >= 0) {
        (this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#button-status-makercheckers')!.innerHTML = arrStatus[1];
      }
      if(arrStatus[0].toLowerCase().indexOf('duedates') >= 0) {
        (this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#button-status-duedates')!.innerHTML = arrStatus[1];
      }
      if(arrStatus[0].toLowerCase().indexOf('extensions') >= 0) {
        (this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#button-status-extensions')!.innerHTML = arrStatus[1];
      }
      if(arrStatus[0].toLowerCase().indexOf('alertschedules') >= 0) {
        (this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#button-status-alertschedules')!.innerHTML = arrStatus[1];
      }
      if(arrStatus[0].toLowerCase().indexOf('activations') >= 0) {
        (this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#button-status-activations')!.innerHTML = arrStatus[1];
      }
      if(arrStatus[0].toLowerCase().indexOf('invalidations') >= 0) {
        (this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#button-status-invalidations')!.innerHTML = arrStatus[1];
      }
      if(arrStatus[0].toLowerCase().indexOf('triggers') >= 0) {
        (this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#button-status-triggers')!.innerHTML = arrStatus[1];
      }
      if(arrStatus[0].toLowerCase().indexOf('internalcontrols') >= 0) {
        (this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#button-status-internalcontrols')!.innerHTML = arrStatus[1];
      }

    }

  }

  renderClearOnboardingContent = () =>{

    (this._SfOnboardingCountriesContainer as HTMLDivElement)!.innerHTML = '';
    (this._SfOnboardingEntitiesContainer as HTMLDivElement)!.innerHTML = '';
    (this._SfOnboardingLocationsContainer as HTMLDivElement)!.innerHTML = '';
    (this._SfOnboardingFunctionsContainer as HTMLDivElement)!.innerHTML = '';
    (this._SfOnboardingTagsContainer as HTMLDivElement)!.innerHTML = '';
    (this._SfOnboardingReportersContainer as HTMLDivElement)!.innerHTML = '';
    (this._SfOnboardingApproversContainer as HTMLDivElement)!.innerHTML = '';
    (this._SfOnboardingFunctionHeadsContainer as HTMLDivElement)!.innerHTML = '';
    (this._SfOnboardingAuditorsContainer as HTMLDivElement)!.innerHTML = '';
    (this._SfOnboardingViewersContainer as HTMLDivElement)!.innerHTML = '';
    (this._SfOnboardingDocsContainer as HTMLDivElement)!.innerHTML = '';
    (this._SfOnboardingMakerCheckersContainer as HTMLDivElement)!.innerHTML = '';
    (this._SfOnboardingDuedatesContainer as HTMLDivElement)!.innerHTML = '';
    (this._SfOnboardingAlertSchedulesContainer as HTMLDivElement)!.innerHTML = '';
    (this._SfOnboardingInternalControlsContainer as HTMLDivElement)!.innerHTML = '';

  }

  renderOnboardingTabs = async () => {

    //console.log('render onboarding tabs', this.myOnboardingTabGroup);
    let initialLoad = false;

    if(this.myOnboardingTabGroup == "") {
      this.myOnboardingTabGroup = this.TAB_GROUP_BUSINESS_UNDERSTANDING
      initialLoad = true;
    }

    //console.log('render onboarding tabs', this.myOnboardingTabGroup);

    this.selectedCbs = [];

    (this._SfOnboardingTabContainer as HTMLDivElement).innerHTML = '';

    var html = '';

    html += '<div class="d-flex w-100 justify-center">';
      html += '<button id="onboarding-tab-group-button-0" class="tab-button mb-10" part="'+(this.myOnboardingTabGroup == this.TAB_GROUP_BUSINESS_UNDERSTANDING ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Business Insights</button>';
      html += '<button id="onboarding-tab-group-button-1" class="tab-button mb-10" part="'+(this.myOnboardingTabGroup == this.TAB_GROUP_GOVERNANCE_MAPPING ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">GRC Integration</button>';
      html += '<button id="onboarding-tab-group-button-2" class="tab-button mb-10" part="'+(this.myOnboardingTabGroup == this.TAB_GROUP_CUSTOMIZATION ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Customization</button>';
      html += '<button id="onboarding-tab-group-button-3" class="tab-button mb-10" part="'+(this.myOnboardingTabGroup == this.TAB_GROUP_ROLLOUT ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Rollout</button>';
    html += '</div>';

    html += '<div id="onboarding-tab-group-0" class="'+(this.myOnboardingTabGroup == this.TAB_GROUP_BUSINESS_UNDERSTANDING ? '' : 'hide')+' d-flex justify-center sub-button align-center">';
      html += '<button class="tab-button mb-10" id="onboarding-tab-statutes" part="'+(this.myOnboardingTab == this.TAB_STATUTES ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Statutes<br /><span id="button-status-statutes" class="d-flex button-status align-center justify-center" part="button-status">...</span></button>';
      html += '<div part="onboarding-tab-arrow" class="mb-10"><span class="material-symbols-outlined">arrow_right</span></div>';
      html += '<button class="tab-button mb-10" id="onboarding-tab-compliances" part="'+(this.myOnboardingTab == this.TAB_COMPLIANCES ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Compliances<br /><span id="button-status-compliances" class="d-flex button-status align-center justify-center" part="button-status">...</span></button>';
      html += '<div part="onboarding-tab-arrow" class="mb-10"><span class="material-symbols-outlined">arrow_right</span></div>';
      html += '<button class="tab-button mb-10" id="onboarding-tab-countries" part="'+(this.myOnboardingTab == this.TAB_COUNTRIES ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Countries<br /><span id="button-status-countries" class="d-flex button-status align-center justify-center" part="button-status">...</span></button>';
      html += '<div part="onboarding-tab-arrow" class="mb-10"><span class="material-symbols-outlined">arrow_right</span></div>';
      html += '<button class="tab-button mb-10" id="onboarding-tab-entities" part="'+(this.myOnboardingTab == this.TAB_ENTITIES ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Entities<br /><span id="button-status-entities" class="d-flex button-status align-center justify-center" part="button-status">...</span></button>';
      html += '<div part="onboarding-tab-arrow" class="mb-10"><span class="material-symbols-outlined">arrow_right</span></div>';
      html += '<button class="tab-button mb-10" id="onboarding-tab-locations" part="'+(this.myOnboardingTab == this.TAB_LOCATIONS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Locations<br /><span id="button-status-locations" class="d-flex button-status align-center justify-center" part="button-status">...</span></button>';
    html += '</div>';
    
    html += '<div id="onboarding-tab-group-1" class="'+(this.myOnboardingTabGroup == this.TAB_GROUP_GOVERNANCE_MAPPING ? '' : 'hide')+' d-flex justify-center flex-wrap sub-button">';
      html += '<button class="tab-button mb-10" id="onboarding-tab-functions" part="'+(this.myOnboardingTab == this.TAB_FUNCTIONS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Functions<br /><span id="button-status-functions" class="d-flex button-status align-center justify-center" part="button-status">...</span></button>';
      html += '<button class="tab-button mb-10" id="onboarding-tab-tags" part="'+(this.myOnboardingTab == this.TAB_TAGS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Tags<br /><span id="button-status-tags" class="d-flex button-status align-center justify-center" part="button-status">...</span></button>';
      html += '<button class="tab-button mb-10" id="onboarding-tab-reporters" part="'+(this.myOnboardingTab == this.TAB_REPORTERS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Reporters<br /><span id="button-status-reporters" class="d-flex button-status align-center justify-center" part="button-status">...</span></button>';
      html += '<button class="tab-button mb-10" id="onboarding-tab-approvers" part="'+(this.myOnboardingTab == this.TAB_APPROVERS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Approvers<br /><span id="button-status-approvers" class="d-flex button-status align-center justify-center" part="button-status">...</span></button>';
      html += '<button class="tab-button mb-10" id="onboarding-tab-functionheads" part="'+(this.myOnboardingTab == this.TAB_FUNCTION_HEADS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Function Heads<br /><span id="button-status-functionheads" class="d-flex button-status align-center justify-center" part="button-status">...</span></button>';
      html += '<button class="tab-button mb-10" id="onboarding-tab-auditors" part="'+(this.myOnboardingTab == this.TAB_AUDITORS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Auditors<br /><span id="button-status-auditors" class="d-flex button-status align-center justify-center" part="button-status">...</span></button>';
      html += '<button class="tab-button mb-10" id="onboarding-tab-viewers" part="'+(this.myOnboardingTab == this.TAB_VIEWERS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Viewers<br /><span id="button-status-viewers" class="d-flex button-status align-center justify-center" part="button-status">...</span></button>';
    html += '</div>';
    
    html += '<div id="onboarding-tab-group-2" class="'+(this.myOnboardingTabGroup == this.TAB_GROUP_CUSTOMIZATION ? '' : 'hide')+' d-flex justify-center flex-wrap sub-button">';
      html += '<button class="tab-button mb-10" id="onboarding-tab-docs" part="'+(this.myOnboardingTab == this.TAB_DOCS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Docs<br /><span id="button-status-docs" class="d-flex button-status align-center justify-center" part="button-status">...</span></button>';
      html += '<button class="tab-button mb-10" id="onboarding-tab-makercheckers" part="'+(this.myOnboardingTab == this.TAB_MAKER_CHECKERS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Maker Checkers<br /><span id="button-status-makercheckers" class="d-flex button-status align-center justify-center" part="button-status">...</span></button>';
      html += '<button class="tab-button mb-10" id="onboarding-tab-duedates" part="'+(this.myOnboardingTab == this.TAB_DUEDATES ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Duedates<br /><span id="button-status-duedates" class="d-flex button-status align-center justify-center" part="button-status">...</span></button>';
      html += '<button class="tab-button mb-10" id="onboarding-tab-extensions" part="'+(this.myOnboardingTab == this.TAB_EXTENSIONS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Extensions<br /><span id="button-status-extensions" class="d-flex button-status align-center justify-center" part="button-status">...</span></button>';
      html += '<button class="tab-button mb-10" id="onboarding-tab-alertschedules" part="'+(this.myOnboardingTab == this.TAB_ALERTSCHEDULES ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Alert Schedules<br /><span id="button-status-alertschedules" class="d-flex button-status align-center justify-center" part="button-status">...</span></button>';
      html += '<button class="tab-button mb-10" id="onboarding-tab-activations" part="'+(this.myOnboardingTab == this.TAB_ACTIVATIONS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Activations<br /><span id="button-status-activations" class="d-flex button-status align-center justify-center" part="button-status">...</span></button>';
      html += '<button class="tab-button mb-10" id="onboarding-tab-invalidations" part="'+(this.myOnboardingTab == this.TAB_INVALIDATION ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Invalidations<br /><span id="button-status-invalidations" class="d-flex button-status align-center justify-center" part="button-status">...</span></button>';
      html += '<button class="tab-button mb-10" id="onboarding-tab-triggers" part="'+(this.myOnboardingTab == this.TAB_TRIGGERS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Triggers<br /><span id="button-status-triggers" class="d-flex button-status align-center justify-center" part="button-status">...</span></button>';
      html += '<button class="tab-button mb-10" id="onboarding-tab-internalcontrols" part="'+(this.myOnboardingTab == this.TAB_INTERNALCONTROLS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Internal Controls<br /><span id="button-status-internalcontrols" class="d-flex button-status align-center justify-center" part="button-status">...</span></button>';
    html += '</div>';

    html += '<div id="onboarding-tab-group-3" class="'+(this.myOnboardingTabGroup == this.TAB_GROUP_ROLLOUT ? '' : 'hide')+' d-flex justify-center flex-wrap sub-button">';
      html += '<button class="tab-button mb-10" id="onboarding-tab-signoff" part="'+(this.myOnboardingTab == this.TAB_SIGNOFF ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Sign Off<br /><span id="button-status-signoff" class="d-flex button-status align-center justify-center" part="button-status">...</span></button>';
      html += '<button class="tab-button mb-10" id="onboarding-tab-calendar" part="'+(this.myOnboardingTab == this.TAB_CALENDAR ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Calendar<br /><span id="button-status-calendar" class="d-flex button-status align-center justify-center" part="button-status">...</span></button>';
    html += '</div>';

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

    (this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-activations')?.addEventListener('click', async () => {

      this.myOnboardingTab = this.TAB_ACTIVATIONS;
      this.renderOnboardingTabs();
      this.loadOnboardingActivations();

    });

    (this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-invalidations')?.addEventListener('click', async () => {

      this.myOnboardingTab = this.TAB_INVALIDATION;
      this.renderOnboardingTabs();
      this.loadOnboardingInvalidations();

    });

    (this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-triggers')?.addEventListener('click', async () => {

      this.myOnboardingTab = this.TAB_TRIGGERS;
      this.renderOnboardingTabs();
      this.loadOnboardingTriggers();

    });

    (this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-extensions')?.addEventListener('click', async () => {

      this.myOnboardingTab = this.TAB_EXTENSIONS;
      this.renderOnboardingTabs();
      this.loadOnboardingExtensions();

    });

    (this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-internalcontrols')?.addEventListener('click', async () => {

      this.myOnboardingTab = this.TAB_INTERNALCONTROLS;
      this.renderOnboardingTabs();
      this.loadOnboardingInternalControls();

    });

    (this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-signoff')?.addEventListener('click', async () => {

      this.myOnboardingTab = this.TAB_SIGNOFF;
      this.renderOnboardingTabs();
      this.loadOnboardingSignoff();

    });

    (this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-calendar')?.addEventListener('click', async () => {

      this.myOnboardingTab = this.TAB_CALENDAR;
      this.renderOnboardingTabs();
      this.loadOnboardingCalendar();

    });

    (this._SfOnboardingTabGroupButton0 as HTMLDivElement).addEventListener('click', () => {

      this.myOnboardingTabGroup = this.TAB_GROUP_BUSINESS_UNDERSTANDING;
      this.hideTabContainers();
      this.myOnboardingTab = '';
      this.renderOnboardingTabs();

    });

    (this._SfOnboardingTabGroupButton1 as HTMLDivElement).addEventListener('click', () => {

      this.myOnboardingTabGroup = this.TAB_GROUP_GOVERNANCE_MAPPING;
      this.hideTabContainers();
      this.myOnboardingTab = '';
      this.renderOnboardingTabs();

    });

    (this._SfOnboardingTabGroupButton2 as HTMLDivElement).addEventListener('click', () => {

      this.myOnboardingTabGroup = this.TAB_GROUP_CUSTOMIZATION;
      this.hideTabContainers();
      this.myOnboardingTab = '';
      this.renderOnboardingTabs();

    });

    (this._SfOnboardingTabGroupButton3 as HTMLDivElement).addEventListener('click', () => {

      this.myOnboardingTabGroup = this.TAB_GROUP_ROLLOUT;
      this.hideTabContainers();
      this.myOnboardingTab = '';
      this.renderOnboardingTabs();

    });

    const statusOnboarding = await this.fetchOnboardingStatus();
    this.renderOnboardingStatus(statusOnboarding.result)
    this.renderClearOnboardingContent();

    if(initialLoad) {
      ((this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-statutes') as HTMLButtonElement).click();
    }
    
  }

  renderRcmProceed = (div: HTMLDivElement, button: HTMLButtonElement | null) => {

    var html = '';

    html += '<div class="mb-20 mt-20">';
    html += '<button id="button-proceed" part="button">Proceed</button>';
    html += '</div>';

    div.innerHTML += html;

    div.querySelector('#button-proceed')?.addEventListener('click', () => {
      button?.click();
    });

  }

  renderRcmSelectedComplianceInProject = (div: HTMLDivElement) => {

    var html  = '<div class="w-100" part="rcm-section">';

    html += '<div part="rcm-section-title" class="mb-10">Selected Compliance</div>';

    if(this.rcmSelectedCompliance == null || this.rcmSelectedCompliance.values == null || this.rcmSelectedCompliance.values.length === 0) {
      html += '<p part="rcm-section-error-message" class="mt-20 mb-10">No compliances found</p></div>';
      div.innerHTML += html;
      return;
    }

    html += '<table>';

    html += '<thead>';
    html += '<th part="td-head" class="td-head">'
    html += 'Id';
    html += '</th>'
    for(var i = 0; i < Object.keys(this.rcmSelectedCompliance.values).length; i++) {
      if(this.arrCols.includes(Object.keys(this.rcmSelectedCompliance.values)[i])) {
        html += '<th part="td-head" class="td-head">'
        html += Object.keys(this.rcmSelectedCompliance.values)[i]
        html += '</th>'
      }
    }
    html += '</thead>';

    html += '<tbody>';

    var classBg = "";
    classBg = 'td-light';

    html += '<tr>';
    html += '<td part="td-body" class="'+classBg+'">';
    html += '<sf-i-elastic-text class="statute id-'+i+'" text="'+(this.rcmSelectedCompliance.id)+'" minLength="80"></sf-i-elastic-text>';
    html += '</td>';
    //let data = JSON.parse(jsonData[i].fields.data);
    for(var j = 0; j < Object.keys(this.rcmSelectedCompliance.values).length; j++) {

      const objectKey = Object.keys(this.rcmSelectedCompliance.values)[j];
      if(this.arrCols.includes(objectKey)) {
        html += '<td part="td-body" class="td-body '+classBg+'">';
        if(Array.isArray(this.rcmSelectedCompliance.values[objectKey].value)) {

          for(var k = 0; k < this.rcmSelectedCompliance.values[objectKey].value.length; k++) {
            if(this.rcmSelectedCompliance.values[objectKey].text != null) {
              html +=  ('<sf-i-elastic-text text="'+this.rcmSelectedCompliance.values[objectKey].text[k]+'" minLength="80"></sf-i-elastic-text>');
            } else {
              html +=  ('<sf-i-elastic-text text="'+this.rcmSelectedCompliance.values[objectKey].value[k]+'" minLength="80"></sf-i-elastic-text>');
            }
            
            if(k < (this.rcmSelectedCompliance.values[objectKey].value.length - 1)) {
              html += "; ";
            }
          }

        } else {
          if(this.rcmSelectedCompliance.values[objectKey].text != null) {
            html += ('<sf-i-elastic-text text="'+this.rcmSelectedCompliance.values[objectKey].value+'" minLength="80"></sf-i-elastic-text>')
          } else {
            html += ('<sf-i-elastic-text text="'+this.rcmSelectedCompliance.values[objectKey].value+'" minLength="80"></sf-i-elastic-text>')
          }
        }
        html += '</td>';
      }

    }
    html += '</tr>';
    html += '</tbody>'
    html += '</table>';
    html += '</div>';
    
    div.innerHTML += html;

  }

  renderRcmCompliances = (updatedCompliances: any) => {

    var html = '<div class="w-100" part="rcm-section">';

    html += '<div part="rcm-section-title" class="mb-10">Recently Updated Compliances</div>';

    html += '<div part="rcm-setting" class="d-flex mt-20 mb-20 align-center"><div class="mr-10">Show Completed</div><input id="cb-completed" type="checkbox" /></div>';

    html += '<table>';

    html += '<thead>';
    html += '<th part="td-head" class="td-head left-sticky">'
    html += 'Select';
    html += '</th>'
    html += '<th part="td-head" class="td-head left-sticky">'
    html += 'Complete';
    html += '</th>'
    html += '<th part="td-head" class="td-head">'
    html += 'Id';
    html += '</th>'
    for(var i = 0; i < Object.keys(updatedCompliances[0].values).length; i++) {
      if(this.arrCols.includes(Object.keys(updatedCompliances[0].values)[i])) {
        html += '<th part="td-head" class="td-head">'
        html += Object.keys(updatedCompliances[0].values)[i]
        html += '</th>'
      }
    }
    html += '</thead>'

    html += '<tbody>'
    for(var i = 0; i < updatedCompliances.length; i++) {

      var classBg = "";

      if(i%2 === 0) {
        classBg = 'td-light';
      } else {
        classBg = 'td-dark';
      }

      html += '<tr id="row-'+(updatedCompliances[i].id)+'">';
      html += '<td part="td-body" class="'+classBg+' left-sticky">';
      html += '<div id="select-'+i+'"><button id="button-'+(updatedCompliances[i].id)+'" class="buttonselect-icon button-'+i+'" part="button-icon-small"><span class="material-symbols-outlined">navigate_next</span></button></div>';
      html += '</td>';
      html += '<td part="td-body" class="'+classBg+'">';
      html += '<div class="d-flex"><button id="button-lock-'+(updatedCompliances[i].id)+'" class="mr-10 button-lock-icon button-lock-'+i+'" part="button-icon-small"><span class="material-symbols-outlined">done</span></button></div>';
      html += '</td>';
      html += '<td part="td-body" class="'+classBg+'">';
      html += '<sf-i-elastic-text class="statute id-'+i+'" text="'+(updatedCompliances[i].id)+'" minLength="80"></sf-i-elastic-text>';
      html += '</td>';
      //let data = JSON.parse(jsonData[i].fields.data);
      for(var j = 0; j < Object.keys(updatedCompliances[i].values).length; j++) {

        const objectKey = Object.keys(updatedCompliances[i].values)[j];
        if(this.arrCols.includes(objectKey)) {
          html += '<td part="td-body" class="td-body '+classBg+'">';
          if(Array.isArray(updatedCompliances[i].values[objectKey].value)) {

            for(var k = 0; k < updatedCompliances[i].values[objectKey].value.length; k++) {
              if(updatedCompliances[i].values[objectKey].text != null) {
                html +=  ('<sf-i-elastic-text text="'+updatedCompliances[i].values[objectKey].text[k]+'" minLength="80"></sf-i-elastic-text>');
              } else {
                html +=  ('<sf-i-elastic-text text="'+updatedCompliances[i].values[objectKey].value[k]+'" minLength="80"></sf-i-elastic-text>');
              }
              
              if(k < (updatedCompliances[i].values[objectKey].value.length - 1)) {
                html += "; ";
              }
            }

          } else {
            if(updatedCompliances[i].values[objectKey].text != null) {
              html += ('<sf-i-elastic-text text="'+updatedCompliances[i].values[objectKey].value+'" minLength="80"></sf-i-elastic-text>')
            } else {
              html += ('<sf-i-elastic-text text="'+updatedCompliances[i].values[objectKey].value+'" minLength="80"></sf-i-elastic-text>')
            }
          }
          html += '</td>';
        }

      }
      html += '</tr>';
    }
    html += '</tbody>'
    html += '</table>';
    html += '</div>';

    (this._SfRcmComplianceContainer as HTMLDivElement).innerHTML = html;

    

  }

  renderRcmLockedCompliances = (lockedCompliances: any) => {

    //console.log('rendering locked', lockedCompliances);

    for(var i = 0; i < lockedCompliances.data.length; i++) {

      // //console.log(lockedCompliances.data[i].complianceid);
      // //console.log(((this._SfRcmComplianceContainer as HTMLDivElement).querySelector('#button-lock-' + lockedCompliances.data[i].complianceid.S) as HTMLButtonElement));
      // ((this._SfRcmComplianceContainer as HTMLDivElement).querySelector('#button-lock-' + lockedCompliances.data[i].complianceid.S) as HTMLButtonElement).style.display = 'none';
      ((this._SfRcmComplianceContainer as HTMLDivElement).querySelector('#row-' + lockedCompliances.data[i].complianceid.S) as HTMLButtonElement).style.display = 'none';
      ((this._SfRcmComplianceContainer as HTMLDivElement).querySelector('#button-lock-' + lockedCompliances.data[i].complianceid.S) as HTMLButtonElement).classList.add('gone');
      
    }

  }

  renderRcmUnlockedCompliances = (lockedCompliances: any) => {

    //console.log('rendering unlocked', lockedCompliances);

    for(var i = 0; i < lockedCompliances.data.length; i++) {

      //console.log('#row-' + lockedCompliances.data[i].complianceid.S);
      ((this._SfRcmComplianceContainer as HTMLDivElement).querySelector('#row-' + lockedCompliances.data[i].complianceid.S) as HTMLButtonElement).style.display = 'table-row';
      
      
    }

  }

  renderRcmProjects = (div: HTMLDivElement, projects: any) => {

    //console.log('projects', projects);
    
    var html  = '<div class="w-100" part="rcm-section">';

    html += '<div part="rcm-section-title" class="mt-20 mb-10">Affected Projects</div>';

    if(projects == null || projects.length === 0) {
      html += '<p part="rcm-section-error-message" class="mt-20 mb-10">No projects found</p></div>';
      div.innerHTML += html;
      return;
    }

    // //console.log(updatedCompliances);
    html += '<table>';

    html += '<thead>';
    // html += '<th part="td-head" class="td-head left-sticky">'
    // html += 'Select';
    // html += '</th>'
    html += '<th part="td-head" class="td-head">';
    html += 'Id';
    html += '</th>';
    for(var i = 0; i < Object.keys(projects[0]).length; i++) {
      if(this.arrRcmProjectCols.includes(Object.keys(projects[0])[i])) {
        html += '<th part="td-head" class="td-head">'
        html += Object.keys(projects[0])[i]
        html += '</th>'
      }
    }
    html += '</thead>';

    html += '<tbody>';
    for(var i = 0; i < projects.length; i++) {

      var classBg = "";

      if(i%2 === 0) {
        classBg = 'td-light';
      } else {
        classBg = 'td-dark';
      }

      html += '<tr>';
    //   html += '<td part="td-action" class="left-sticky">';
    //   html += '<div id="select-'+i+'"><button id="button-'+i+'" class="button-icon button-'+i+'"><span class="material-symbols-outlined">navigate_next</span></button></div>';
    //   html += '</td>';
      html += '<td part="td-body" class="'+classBg+'">';
      html += '<sf-i-elastic-text class="statute id-'+i+'" text="'+(projects[i].id)+'" minLength="80"></sf-i-elastic-text>';
      html += '</td>';
    //   //let data = JSON.parse(jsonData[i].fields.data);
      for(var j = 0; j < Object.keys(projects[i]).length; j++) {

        const objectKey = Object.keys(projects[i])[j];
        
        if(this.arrRcmProjectCols.includes(objectKey)) {
          html += '<td part="td-body" class="td-body '+classBg+'">';
          //console.log('value',projects[i][objectKey]);
          if(Array.isArray(projects[i][objectKey])) {

            for(var k = 0; k < projects[i][objectKey].value.length; k++) {
              html +=  ('<sf-i-elastic-text text="'+projects[i][objectKey][0]+'" minLength="80"></sf-i-elastic-text>');
            }

          } else {
            //console.log('not array');
            html += ('<sf-i-elastic-text text="'+projects[i][objectKey].replace(/"/g, '')+'" minLength="80"></sf-i-elastic-text>')
          }
          html += '</td>';
        }

      }
      html += '</tr>';
    }
    html += '</tbody>'
    html += '</table>';
    html += '</div>';

    div.innerHTML += html;

    // const arrButtons = (this._SfRcmComplianceContainer as HTMLDivElement).querySelectorAll('.button-icon') as NodeListOf<HTMLButtonElement>;
    // for(i = 0; i < arrButtons.length; i++) {

    //   arrButtons[i].addEventListener('click', (e: any) => {

    //     const index = e.currentTarget.id.split('-')[1];
    //     this.rcmSelectedCompliance = updatedCompliances[index];
    //     ((this._SfRcmTabContainer as HTMLDivElement).querySelector('#rcm-tab-projects') as HTMLButtonElement).click();

    //   })

    // }

  }

  renderRcmSelectedDate = (div: HTMLDivElement) => {

    var html = "";

    html  = '<div class="w-100" part="rcm-section">';

    html += '<div part="rcm-section-title" class="mt-20 mb-20">Trigger Information</div>';

    if(this.rcmSelectedDate == null || this.rcmSelectedMessage == null) {
      html += '<p part="rcm-section-error-message" class="mt-20 mb-10">No trigger information found</p></div>';
      div.innerHTML += html;
      return;
    }

    
    html += '<label part="input-label" class="mt-5">Date of Trigger</label><br />';
    html += '<p>'+this.rcmSelectedDate+'</p>'
    html += '<label part="input-label" class="mt-5">Notification Message</label><br />';
    html += '<p>'+this.rcmSelectedMessage+'</p>'

    html += '<div class="mt-20 mb-10"></div></div>';

    div.innerHTML += html;

   
  }

  renderRcmDate = (div: HTMLDivElement) => {

    var html  = '<div class="w-100" part="rcm-section">';

    html += '<div part="rcm-section-title" class="mt-20 mb-20">Trigger Information</div>';
    html += '<label part="input-label" class="mt-5">Date of Trigger</label><br />';
    html += '<input id="rcm-date" part="input" type="date" /><br /><br />'
    html += '<label part="input-label" class="mt-5">Notification Message</label><br />';
    html += '<textarea id="rcm-message" class="w-100" part="input" ></textarea>'

    html += '<div class="mt-20 mb-10"></div></div>';

    div.innerHTML += html;

   
  }

  renderRcmJobs = (div: HTMLDivElement) => {

    var html  = '<div class="w-100" part="rcm-section">';

    html += '<div part="rcm-section-title" class="mb-20">New RCM Update Job</div>';
    html += '<button id="button-submit"part="button-icon-small" class="material-icons button-expand mt-5">add_circle</button><br />';
    html += '</div>';

    div.innerHTML += html;
   
  }

  renderRcmSelectedJobs = (div: HTMLDivElement, jobs: any) => {

    var html  = '<div class="w-100" part="rcm-section">';

    html += '<div part="rcm-section-title" class="mb-10">Previous Jobs For The Selected Compliance</div>';

    if(jobs.data.length === 0) {
      html += '<p part="rcm-section-error-message" class="mt-20 mb-10">No jobs found</p></div>';
      div.innerHTML += html;
      return;
    }

    html += '<table>';

    html += '<thead>';
    html += '<th part="td-head" class="td-head">'
    html += 'Id';
    html += '</th>'
    html += '<th part="td-head" class="td-head">'
    html += 'Creation Time';
    html += '</th>'
    html += '<th part="td-head" class="td-head">'
    html += 'Status';
    html += '</th>'
    html += '<th part="td-head" class="td-head">'
    html += '';
    html += '</th>'

    html += '</thead>';

    html += '<tbody>';

    for(var i = jobs.data.length - 1; i >= 0; i--) {

      var classBg = "";
      if(i%2 === 0) {
        classBg = 'td-light';
      } else {
        classBg = 'td-dark';
      }
      
      html += '<tr>';
      html += '<td part="td-body" class="td-body '+classBg+'">';
      html += jobs.data[i].id.S;
      html += '</td>'
      html += '<td part="td-body" class="td-body '+classBg+'">';
      html += jobs.data[i].lastupdated.S;
      html += '</td>'
      html += '<td part="td-body" class="td-body '+classBg+'">';
      html += jobs.data[i].status.S == "0" ? "created" : jobs.data[i].status.S == "1" ? "in-progress" : jobs.data[i].status.S == "2" ? "completed" : "notified";
      html += '</td>'
      html += '<td part="td-body" class="td-body '+classBg+'">';
      html += jobs.data[i].status.S == "0" ? "<span class=\"color-not-started material-icons\">schedule</span>" : jobs.data[i].status.S == "1" ? "<span class=\"color-pending material-icons\">pending</span>" : jobs.data[i].status.S == "2" ? "<span class=\"color-done material-icons\">check_circle</span>" : "<span class=\"color-done material-icons\">notifications</span>";
      html += '</td>'
      html += '</tr>';

    }

    html += '</thead>';

    html += '</tbody>';
    html += '</table></div>';

    div.innerHTML += html;
   
  }

  renderRcmNotifications = (notifs: any) => {

    var html = '';

    //console.log('inside rcm notifications', notifs);

    if(notifs.data.length > 0) {

      if(this.flowRcmNotification === 0) {
        html += '<div class="d-flex align-center">';
        html += '<span part="rcm-section-title-icon" class="material-symbols-outlined mr-10">notifications</span>';
        html += '<div part="rcm-section-title" class="mr-10">Regulatory Alerts</div>';
        html += ('<div part="notif-icon-badge" class="mr-20" >'+notifs.data.length+'</div>');
        html += '<button id="button-expand" part="icon-button-small" class="material-symbols-outlined">keyboard_arrow_down</button>'
        html += '</div>';
      } else {
        html += '<div class="w-100" part="rcm-section-notification">';
        html += '<div class="d-flex align-center mb-20">';
        html += '<span part="rcm-section-title-icon" class="material-symbols-outlined mr-10">notifications</span>';
        html += '<div part="rcm-section-title">Regulatory Alerts</div>';
        html += '</div>';
        html += '<div id="rcm-container-list" class="mb-10">';
        for(var i = 0; i < notifs.data.length; i++) {
          html += '<div part="rcm-container-list-item">';
          html += notifs.data[i].message;
          html += '</div>';
        }
        html += '</div>';
        html += '</div>';
      }

    } else {

    }

    (this._SfRcmContainer as HTMLDivElement).innerHTML = html;

    if(notifs.data.length > 0) {

      if(this.flowRcmNotification === 0) {
        ((this._SfRcmContainer as HTMLDivElement).querySelector('#button-expand') as HTMLButtonElement).addEventListener('click', () => {
          this.flowRcmNotification = 1;
          this.renderRcmNotifications(notifs);
        })
      }

    }
  
  }

  renderRcmTabs = () => {

    //console.log('render rcm tabs');

    (this._SfRcmTabContainer as HTMLDivElement).innerHTML = '';

    var html = '';

    html += '<button class="tab-button mb-10" id="rcm-tab-compliances" part="'+(this.myRcmTab == this.TAB_RCM_COMPLIANCES ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Compliances</button>';
    html += '<button class="tab-button mb-10" id="rcm-tab-projects" part="'+(this.myRcmTab == this.TAB_RCM_PROJECTS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Projects</button>';
    html += '<button class="tab-button mb-10" id="rcm-tab-date" part="'+(this.myRcmTab == this.TAB_RCM_DATE ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Trigger</button>';
    html += '<button class="tab-button mb-10" id="rcm-tab-jobs" part="'+(this.myRcmTab == this.TAB_RCM_JOBS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Jobs</button>';


    (this._SfRcmTabContainer as HTMLDivElement).innerHTML = html;

    (this._SfRcmTabContainer as HTMLDivElement).querySelector('#rcm-tab-compliances')?.addEventListener('click', async () => {

      this.myRcmTab = this.TAB_RCM_COMPLIANCES;
      this.renderRcmTabs();
      await this.loadRcmCompliances();

    });

    (this._SfRcmTabContainer as HTMLDivElement).querySelector('#rcm-tab-projects')?.addEventListener('click', async () => {

      this.myRcmTab = this.TAB_RCM_PROJECTS;
      this.renderRcmTabs();
      await this.loadRcmProjects();
      //await this.loadOnboardingStatutes();

    });

    (this._SfRcmTabContainer as HTMLDivElement).querySelector('#rcm-tab-date')?.addEventListener('click', async () => {

      this.myRcmTab = this.TAB_RCM_DATE;
      this.renderRcmTabs();
      await this.loadRcmDate();
      //await this.loadOnboardingStatutes();

    });

    (this._SfRcmTabContainer as HTMLDivElement).querySelector('#rcm-tab-jobs')?.addEventListener('click', async () => {

      this.myRcmTab = this.TAB_RCM_JOBS;
      this.renderRcmTabs();
      await this.loadRcmJobs();
      //await this.loadOnboardingStatutes();

    });

  }

  proceedToCalendar = async () => {
    this.renderRoleTabs();
    await this.fetchAndYearlyRenderUserCalendar_2();
    this.enableCalendar();
    if(this.events != null) {
      this.renderTabs(this.TAB_YEAR);
      this.renderCalendar();
    }
  }

  renderRoleTabs = () => {

    //console.log('render role tabs');

    (this._SfRoleTabContainer as HTMLDivElement).innerHTML = '';

    var html = '';

    html += '<button class="tab-button" id="consumer-tab-reporter" part="'+(this.myRole == this.TAB_REPORTER ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Reporter</button>';
    html += '<button class="tab-button" id="consumer-tab-approver" part="'+(this.myRole == this.TAB_APPROVER ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Approver</button>';
    html += '<button class="tab-button" id="consumer-tab-functionhead" part="'+(this.myRole == this.TAB_FUNCTION_HEAD ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Function Head</button>';
    html += '<button class="tab-button" id="consumer-tab-auditor" part="'+(this.myRole == this.TAB_AUDITOR ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Auditor</button>';
    html += '<button class="tab-button" id="consumer-tab-viewer" part="'+(this.myRole == this.TAB_VIEWER ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Viewer</button>';

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

    //console.log(container);

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

      //console.log('divs', divs);

      for(var i = 0; i < divs.length; i++) {

        var found = false;
        var filterMatched = "";
        const tagsEmbedded = JSON.parse((divs[i] as HTMLDivElement).querySelector('.hidden-tags')?.innerHTML + "");
        //console.log(tagsEmbedded);
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
          <div class="p-10 mr-10 w-100">
            <div part="td-head">Reports</div>
            <div part="td-body" class="d-flex align-center mt-10 flex-wrap">
              <div class="mr-10 d-flex align-center mb-10">
                <input type="radio" id="radio-csv" class="switch-csv" value="Excel" checked name="radio-report" part="radio-download"/>
                <label for="radio-csv" part="label-radio-download" class="mr-10">Summary (CSV)</label>
              </div>
              <div class="mr-10 d-flex align-center mb-10">
                <input type="radio" id="radio-image" class="switch-image" value="Image" name="radio-report" part="radio-download"/>
                <label for="radio-image" part="label-radio-download" class="mr-10">Image (PNG)</label>
              </div>
              <div class="mr-10 d-flex align-center mb-10">
                <input type="radio" id="radio-stats" class="switch-image" value="Stats" name="radio-report" part="radio-download"/>
                <label for="radio-stats" part="label-radio-download" class="mr-10">Stats (HTML)</label>
              </div>
              <div class="mr-10 d-flex align-center mb-10">
                <input type="radio" id="radio-list" class="switch-image" value="List" name="radio-report" part="radio-download"/>
                <label for="radio-list" part="label-radio-download" class="mr-10">List (HTML)</label>
              </div>
              <div class="mr-10 d-flex align-center mb-10">
                <input type="radio" id="radio-list-csv" class="switch-image" value="List" name="radio-report" part="radio-download"/>
                <label for="radio-list-csv" part="label-radio-download" class="mr-10">List (CSV)</label>
              </div>
              <div class="mr-10 d-flex align-center mb-10">
                <input type="radio" id="radio-consolidated" class="switch-image" value="Consolidated" name="radio-report" part="radio-download"/>
                <label for="radio-consolidated" part="label-radio-download" class="mr-10">Consolidated (HTML)</label>
              </div>
              <div class="mr-10 d-flex align-center mb-10">
                <input type="radio" id="radio-certificate" class="switch-image" value="Certificate" name="radio-report" part="radio-download"/>
                <label for="radio-certificate" part="label-radio-download" class="mr-10">Certificate (HTML)</label>
              </div>
            </div>
            <div class="d-flex mt-10">
              <button id="button-download-stats" part="button" class="mt-5 ml-10">Download</button>
            </div>
          </div>
          <!-- <div class="p-10 ml-10 mr-10">
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
          </div> -->
        </div>
      </div>
    
    `;

    container.innerHTML = html;

    container.querySelector('#chart-control-cancel')?.addEventListener('click', () => {

      container.innerHTML = '';
      container.dispatchEvent(new CustomEvent('canceled', {bubbles: true}));

    });

    container.querySelector('#button-download-stats')?.addEventListener('click', () => {

      const radioCsv = (container.querySelector('#radio-csv') as HTMLInputElement);
      const radioImage = (container.querySelector('#radio-image') as HTMLInputElement);
      const radioStats = (container.querySelector('#radio-stats') as HTMLInputElement);
      const radioList = (container.querySelector('#radio-list') as HTMLInputElement);
      const radioListCsv = (container.querySelector('#radio-list-csv') as HTMLInputElement);
      const radioConsolidated = (container.querySelector('#radio-consolidated') as HTMLInputElement);
      const radioCertificate = (container.querySelector('#radio-certificate') as HTMLInputElement);

      //console.log('radiocsv checked', radioCsv.checked);
      //console.log('radioimage checked', radioImage.checked);

      if(radioCsv.checked) {

        const blob2 = new Blob([this.csvGraphStats], { type: 'text/csv' });
        const url2 = window.URL.createObjectURL(blob2)
        const a2 = document.createElement('a')
        a2.setAttribute('href', url2)
        a2.setAttribute('download', 'download_'+new Date()+'.csv');
        a2.click()
        
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

      if(radioStats.checked) {
        const ts = new Date().getTime();

        var html = this.COMPLIANCES_HTML;
        html = html.replace(/PROJECT_NAME/g, this.projectName);
        html = html.replace(/REPORT_DATE/g, new Date().getDate() + "/" + (new Date().getMonth()+1) + "/" + new Date().getFullYear() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ' for the period ' + this.period);

        let tempHtml: string = "";
        tempHtml += this.htmlDataStats;
        if(this.flowGraph == this.FLOW_GRAPH_COMPLETENESS || this.flowGraph == this.FLOW_GRAPH_TIMELINESS || this.flowGraph == this.FLOW_GRAPH_COMPLIANCE) {
        } else {
          tempHtml += ('<br />' + (this.csvGraphStats.length > 0 ? this.csvToHtmlTable(this.csvGraphStats) : ""));
          tempHtml += ('<br />' + (this.csvToHtmlTable(this.csvCompletenessStats) + '<br />' + this.csvToHtmlTable(this.csvTimelinessStats) + '<br />' + this.csvToHtmlTable(this.csvComplianceStats)));
        }

        html = html.replace(/PERSON_COMPLIANCES/g, tempHtml);

        const blob = new Blob([html], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.setAttribute('href', url)
        a.setAttribute('download', 'report_'+ts+'.html');
        a.click()
      }

      if(radioList.checked) {
        const ts = new Date();

        var html = this.COMPLIANCES_HTML;
        html = html.replace(/PROJECT_NAME/g, this.projectName);
        html = html.replace(/REPORT_DATE/g, new Date().getDate() + "/" + (new Date().getMonth()+1) + "/" + new Date().getFullYear() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ' for the period ' + this.period);

        let tempHtml: string = "";
        tempHtml += this.getFilteredString();
        html = html.replace(/PERSON_COMPLIANCES/g, tempHtml);

        const blob = new Blob([html], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.setAttribute('href', url)
        a.setAttribute('download', 'report_'+ts+'.html');
        a.click()
      }

      if(radioListCsv.checked) {
        const ts = new Date();
        console.log(this.csvDataCompliances);
        const blob = new Blob([this.csvDataCompliances], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.setAttribute('href', url)
        a.setAttribute('download', 'report_'+ts+'.csv');
        a.click()
      }

      if(radioConsolidated.checked) {

        const ts = new Date().getTime();

        var html = this.COMPLIANCES_HTML;
        html = html.replace(/PROJECT_NAME/g, this.projectName);
        html = html.replace(/REPORT_DATE/g, new Date().getDate() + "/" + (new Date().getMonth()+1) + "/" + new Date().getFullYear() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ' for the period ' + this.period);

        let tempHtml: string = "";
        tempHtml += this.htmlDataStats;
        if(this.flowGraph == this.FLOW_GRAPH_COMPLETENESS || this.flowGraph == this.FLOW_GRAPH_TIMELINESS || this.flowGraph == this.FLOW_GRAPH_COMPLIANCE) {
        } else {
          tempHtml += ('<br />' + (this.csvGraphStats.length > 0 ? this.csvToHtmlTable(this.csvGraphStats) : ""));
          tempHtml += ('<br />' + (this.csvToHtmlTable(this.csvCompletenessStats) + '<br />' + this.csvToHtmlTable(this.csvTimelinessStats) + '<br />' + this.csvToHtmlTable(this.csvComplianceStats)));
        }
        tempHtml += this.getFilteredString();
        html = html.replace(/PERSON_COMPLIANCES/g, tempHtml);

        const blob = new Blob([html], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.setAttribute('href', url)
        a.setAttribute('download', 'report_'+ts+'.html');
        a.click()


      }

      if(radioCertificate.checked) {

        var html = this.CERTIFICATE_HTML;
        html = html.replace(/PERSON_NAME/g, this.userName);
        html = html.replace(/PERSON_DESIGNATION/g, this.myRole);
        html = html.replace(/PERSON_COMPANY/g, this.projectName);
        html = html.replace(/PERSON_DATE/g, new Date().getDate() + "/" + (new Date().getMonth()+1) + "/" + new Date().getFullYear());

        let tempHtml: string = "";
        tempHtml += this.htmlDataStats;
        if(this.flowGraph == this.FLOW_GRAPH_COMPLETENESS || this.flowGraph == this.FLOW_GRAPH_TIMELINESS || this.flowGraph == this.FLOW_GRAPH_COMPLIANCE) {
        } else {
          tempHtml += ('<br />' + (this.csvGraphStats.length > 0 ? this.csvToHtmlTable(this.csvGraphStats) : ""));
          tempHtml += ('<br />' + (this.csvToHtmlTable(this.csvCompletenessStats) + '<br />' + this.csvToHtmlTable(this.csvTimelinessStats) + '<br />' + this.csvToHtmlTable(this.csvComplianceStats)));
        }

        html = html.replace(/PERSON_COMPLIANCE_STATUS/g, tempHtml);
        html = html.replace(/PERSON_COMPLIANCES/g, this.getFilteredString());
        html = html.replace(/PERSON_PERIOD/g, this.period);

        //console.log('downloaded certificate');
        const blob = new Blob([html], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.setAttribute('href', url)
        a.setAttribute('download', 'certificate.html');
        a.click()

      }

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
      //html += '<button class="tab-button" id="chart-control-filters" part="calendar-tab-button-selected" class="mr-10"><span class="material-icons">filter_list</span></button>';
    } else {
      //html += '<button class="tab-button" id="chart-control-filters" part="calendar-tab-button-not-selected" class="mr-10"><span class="material-icons">filter_list</span></button>';
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

    // (container.querySelector('#chart-settings-controls') as HTMLDivElement).querySelector('#chart-control-filters')?.addEventListener('click', () => {

    //   this.renderChartSettings(container, 0, ctx);

    // });

    if(selectedTab === 0) {

      const radioCompleteness = container.querySelector('#radio-completeness') as HTMLButtonElement;
      radioCompleteness.click();
      this.renderChartSettingsFilters((container.querySelector('#chart-settings') as HTMLDivElement), ctx);
    }

    if(selectedTab === 1) {
      // const radioCompleteness = container.querySelector('#radio-completeness') as HTMLButtonElement;
      // radioCompleteness.click();
      this.renderChartSettingsSettings((container.querySelector('#chart-settings') as HTMLDivElement));
    }

    (container.querySelector('#chart-settings') as HTMLDivElement).addEventListener('canceled', () => {
      //console.log('canceled');
      if(this.getCurrentTab() == this.TAB_STREAM) {
        this.renderChartSettings(container, -1, ctx);
        this.renderStream(this.streamIndex);
      }
      // if(this.getCurrentTab() == this.TAB_UPCOMING) {
      //   this.renderChartSettings(container, -1, ctx);
      //   this.renderUpcoming(this.streamIndex);
      // }
      if(this.getCurrentTab() == this.TAB_THIS) {
        this.renderChartSettings(container, -1, ctx);
        this.renderThis(this.streamIndex);
      }
      // if(this.getCurrentTab() == this.TAB_PAST) {
      //   this.renderChartSettings(container, -1, ctx);
      //   this.renderPast(this.streamIndex);
      // }
      if(this.getCurrentTab() == this.TAB_CUSTOM) {
        this.processDateSelection(container);
      }
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

  csvToHtmlTable = (strCsv: string) => {

    var html = '';

    //console.log('csvToHtmlTable', strCsv);

    var strArr = strCsv.split("\n");

    //console.log('csvToHtmlTable', strArr);

    html += '<br />' + strArr[0].split(',')[0] + '<br /><br />';

    html += '<table>';

    for(var i = 0; i < strArr.length; i++) {

      html += '<tr>';
      if(i === 0) {

        const strArrArr = strArr[i].split(',');
        for(var j = 0; j < strArrArr.length; j++) {
          html += ('<th>'+ strArrArr[j] +'</th>');
        }

      } else {

        const strArrArr = strArr[i].split(',');
        for(var j = 0; j < strArrArr.length; j++) {
          html += ('<td class="text-center">'+ strArrArr[j] +'</td>');
        }

      }
      html += '</tr>';

    }

    html += '</table>';

    //console.log('csvToHtmlTable', html);

    return html;


  }

  getFilteredString = () => {

    //console.log('selectedfilter', this.selectedFilter);

    var tempDiv = document.createElement('div');
    tempDiv.id = "div-filter-content";
    tempDiv.innerHTML = this.htmlDataCompliances;

    const newArrList: Array<HTMLTableRowElement> = [];

    //console.log('tempDiv', this.htmlDataCompliances);

    const rows = tempDiv.querySelectorAll('tr');
    for(var i = 0; i < rows.length; i++) {
      let cols = rows[i].querySelectorAll('td');
      if(cols.length === 0) {
        cols = rows[i].querySelectorAll('th');
      }
      if(i === 0) {
        newArrList.push(rows[i]);
      } else {

        if(cols.length > 0) {
          if(this.selectedFilter == null) {
            newArrList.push(rows[i]);
          } else {

            if(!this.selectedFilter.selected) {

              var found = false;

              for(var j = 0; j < this.selectedFilter.length; j++) {
                if(cols[cols.length - 1].innerHTML.toLowerCase().replace(/&amp;/g, '&').indexOf(this.selectedFilter[j].value.toLowerCase().replace(/&amp;/g, '&')) >= 0) {
                  found = true;
                }  
              }

              if(!found){
                newArrList.push(rows[i]);
              }

            } else {

              //console.log('selected filter', this.selectedFilter, cols[cols.length - 1].innerHTML.toLowerCase(), '*-*', this.selectedFilter.value.toLowerCase());

              if(cols[cols.length - 1].innerHTML.toLowerCase().replace(/&amp;/g, '&').indexOf(this.selectedFilter.value.toLowerCase().replace(/&amp;/g, '&')) >= 0) {
                newArrList.push(rows[i]);
              }
            }

          }
        }
      }
    }

    //console.log('newarrlist', newArrList);

    let filteredHTML = '';

    if(this.selectedFilter != null) {
      if(this.selectedFilter.selected) {
        filteredHTML += '<small>Filter (included parameters): ' + this.selectedFilter.value.charAt(0).toUpperCase() + this.selectedFilter.value.slice(1) + '</small>';
      } else {

        let params = "";
        for(var i = 0; i < this.selectedFilter.length; i++) {

          params += this.selectedFilter[i].value.charAt(0).toUpperCase() + this.selectedFilter[i].value.slice(1);
          if(i < (this.selectedFilter.length - 1)) {
            params += ',';
          }

        }

        filteredHTML += '<small>Filter (excluded parameters): ' + params + '</small>';
      }
    }

    //console.log('newArrList', newArrList);

    filteredHTML += '<br /><br /><div class="table-wrapper"><table>';
    for(var i = 0; i < newArrList.length; i++) {
      //console.log('htmlrender', (newArrList[i] as HTMLTableRowElement).outerHTML);
      filteredHTML += (newArrList[i] as HTMLTableRowElement).outerHTML;
    }
    filteredHTML += '</table></div>';
    return filteredHTML;
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

  renderChart4 = (ctx: any, type: any, data: any, title: string) => {

    if(this.chart4 != null) {
      (this.chart4 as Chart).destroy();
    }
    
    this.chart4 =  new Chart(ctx, {
      type: type,
      data: data,
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          onComplete: () => {

            if(this.chart4 != null) {

              if(type == 'bar') {

                this.chart4.ctx.font = "bold 10pt 'Helvetica Neue'";
                this.chart4.ctx.fillStyle = '#000';
                this.chart4.ctx.textBaseline = "middle";
                this.chart4.ctx.textAlign = "center";

                for(var i = 0; i < this.chart4.data.datasets.length; i++) {

                  const dataset = this.chart4.data.datasets[i];
                  for (var j = 0; j < dataset.data.length; j++) {

                    if(parseInt(dataset.data[j]) > 0) {

                      if((this.chart4.data.labels[j].join(" ") + "").toLowerCase().trim() == this.graphParam) {
                        this.chart4.ctx.fillStyle = '#fff';
                      } else {
                        this.chart4.ctx.fillStyle = '#000';
                      }

                      this.chart4.ctx.fillText(dataset.data[j], this.chart4.getDatasetMeta(i).data[j].x - 13, this.chart4.getDatasetMeta(i).data[j].y);

                    }

                  }

                }

              } else {

                //console.log('onanimation complete', this.chart4, this.chart4.data);
                for(var i = 0; i < this.chart4.data.datasets.length; i++) {

                  const dataset = this.chart4.data.datasets[i];
                  for (var j = 0; j < dataset.data.length; j++) {

                    if(parseInt(dataset.data[j]) > 0) {

                      //console.log(this.chart4.getDatasetMeta(i));
                      //console.log(i + "," + j, this.chart4.getDatasetMeta(i).data[j]);
                      // var total = this.chart4.getDatasetMeta(i).total;
                      //console.log('total', total);
                      var mid_radius = this.chart4.getDatasetMeta(i).data[j].innerRadius + (this.chart4.getDatasetMeta(i).data[j].outerRadius - this.chart4.getDatasetMeta(i).data[j].innerRadius)/2;
                      //console.log('mid_radius', mid_radius);
                      var start_angle = this.chart4.getDatasetMeta(i).data[j].startAngle;
                      //console.log('start_angle', start_angle);
                      var end_angle = this.chart4.getDatasetMeta(i).data[j].endAngle;
                      //console.log('end_angle', end_angle);
                      var mid_angle = start_angle + (end_angle - start_angle)/2;
                      //console.log('mid_angle', mid_angle);

                      var x = mid_radius * Math.cos(mid_angle);
                      var y = mid_radius * Math.sin(mid_angle);

                      this.chart4.ctx.fillStyle = '#fff';
                      if (i == 3){ // Darker text color for lighter background
                        this.chart4.ctx.fillStyle = '#444';
                      }
                      // var percent = String(Math.round(dataset.data[j]/total*100)) + "%";
                      // var str = "";
                      // for(var k = 0; k <= dataset.data[j].length; k++) {
                      //   str += '█';
                      // }
                      //console.log('outputting bg', str);
                      this.chart4.ctx.fillStyle = '#000';
                      //this.chart.ctx.fillText(str, this.chart.getDatasetMeta(i).data[j].x + x, this.chart.getDatasetMeta(i).data[j].y + y);
                      //const match = /(?<value>\d+\.?\d*)/;
                      let fillText = '';
                      if((this.chart4.data.labels[j] + "").toLowerCase().replace(/ /g, "-") == this.graphParam) {
                        this.chart4.ctx.font = "bold 20pt Courier";
                        fillText = dataset.data[j] + '✓';
                      } else {
                        this.chart4.ctx.font = "bold 15pt Courier";
                        fillText = dataset.data[j];
                      }
                      this.chart4.ctx.fillStyle = '#fff';
                      this.chart4.ctx.textBaseline = "middle";
                      this.chart4.ctx.textAlign = "center";

                      //console.log('comparing labels', (this.chart4.data.labels[j] + "").toLowerCase().replace(/ /g, "-"), j, this.graphParam, this.chart4.getDatasetMeta(i).data[j]);
                      this.chart4.ctx.fillText(fillText, this.chart4.getDatasetMeta(i).data[j].x + x, this.chart4.getDatasetMeta(i).data[j].y + y);

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
              },
              callback: (val: any, _index: any) => {
                // Hide every 2nd tick label
                let value = data.labels[val];
                //console.log('callback', this.graphParam);
                if(this.graphParam.length > 0) {
                  if((data.labels[val].join(" ") + "").toLowerCase().trim() == this.graphParam) {
                  } else {
                    value = "";
                  }
                } else {
                  if(this.isSelectedLegend(val)) {
                    return "";
                  }
                }
                return value;
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
            },
            onClick: () => {}
          },
          title: {
            display: true,
            text: title,
            font: {
                size: 16,
            }
          },
        },
        onClick: (_event: any = {}, array: any) => {

          // if(array == null) return;
          // if(array[0] == null) return;
          // const barIndex = array[0].index;
          // this.clickOnBar(false, 2, barIndex)
          // this.clickOnPie(true, barIndex)

          if(array == null) return;
          if(array[0] == null) return;
          const pieIndex = array[0].index;
          this.clickOnPie(false, pieIndex)
          if(this.chart2 != null && this.chart4 != null) {
            this.clickOnBar(true, 2, array[0].index);
          }

        },
      },
        
    });

    //console.log('canvas parent node', this.chart4.canvas.parentNode);
    this.chart4.canvas.parentNode.style.height = (parseInt(data.labels.length)*90 + 40) + 'px';

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

                this.chart3.ctx.font = "bold 10pt 'Helvetica Neue'";
                this.chart3.ctx.fillStyle = '#000';
                this.chart3.ctx.textBaseline = "middle";
                this.chart3.ctx.textAlign = "center";

                for(var i = 0; i < this.chart3.data.datasets.length; i++) {

                  const dataset = this.chart3.data.datasets[i];
                  for (var j = 0; j < dataset.data.length; j++) {

                    if(parseInt(dataset.data[j]) > 0) {

                      if((this.chart3.data.labels[j].join(" ") + "").toLowerCase().trim() == this.graphParam) {
                        this.chart3.ctx.fillStyle = '#fff';
                      } else {
                        this.chart3.ctx.fillStyle = '#000';
                      }

                      this.chart3.ctx.fillText(dataset.data[j], this.chart3.getDatasetMeta(i).data[j].x - 13, this.chart3.getDatasetMeta(i).data[j].y);

                    }

                  }

                }

              } else {

                //console.log('onanimation complete', this.chart3, this.chart3.data);
                for(var i = 0; i < this.chart3.data.datasets.length; i++) {

                  const dataset = this.chart3.data.datasets[i];
                  for (var j = 0; j < dataset.data.length; j++) {

                    if(parseInt(dataset.data[j]) > 0) {

                      //console.log(this.chart3.getDatasetMeta(i));
                      //console.log(i + "," + j, this.chart3.getDatasetMeta(i).data[j]);
                      // var total = this.chart3.getDatasetMeta(i).total;
                      //console.log('total', total);
                      var mid_radius = this.chart3.getDatasetMeta(i).data[j].innerRadius + (this.chart3.getDatasetMeta(i).data[j].outerRadius - this.chart3.getDatasetMeta(i).data[j].innerRadius)/2;
                      //console.log('mid_radius', mid_radius);
                      var start_angle = this.chart3.getDatasetMeta(i).data[j].startAngle;
                      //console.log('start_angle', start_angle);
                      var end_angle = this.chart3.getDatasetMeta(i).data[j].endAngle;
                      //console.log('end_angle', end_angle);
                      var mid_angle = start_angle + (end_angle - start_angle)/2;
                      //console.log('mid_angle', mid_angle);

                      var x = mid_radius * Math.cos(mid_angle);
                      var y = mid_radius * Math.sin(mid_angle);

                      this.chart3.ctx.fillStyle = '#fff';
                      if (i == 3){ // Darker text color for lighter background
                        this.chart3.ctx.fillStyle = '#444';
                      }
                      // var percent = String(Math.round(dataset.data[j]/total*100)) + "%";
                      // var str = "";
                      // for(var k = 0; k <= dataset.data[j].length; k++) {
                      //   str += '█';
                      // }
                      //console.log('outputting bg', str);
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

                      //console.log('comparing labels', (this.chart3.data.labels[j] + "").toLowerCase().replace(/ /g, "-"), j, this.graphParam, this.chart3.getDatasetMeta(i).data[j]);
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
              },
              callback: (val: any, _index: any) => {
                // Hide every 2nd tick label
                let value = data.labels[val];
                //console.log('callback', this.graphParam);
                if(this.graphParam.length > 0) {
                  if((data.labels[val].join(" ") + "").toLowerCase().trim() == this.graphParam) {
                  } else {
                    value = "";
                  }
                } else {
                  if(this.isSelectedLegend(val)) {
                    return "";
                  }
                }
                return value;
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
            },
            onClick: () => {}
          },
          title: {
            display: true,
            text: title,
            font: {
                size: 16,
            }
          },
        },
        onClick: (_event: any = {}, array: any) => {

          // if(array == null) return;
          // if(array[0] == null) return;
          // const barIndex = array[0].index;
          // this.clickOnBar(false, 2, barIndex)
          // this.clickOnPie(true, barIndex)

          if(array == null) return;
          if(array[0] == null) return;
          const pieIndex = array[0].index;
          this.clickOnPie(false, pieIndex)
          if(this.chart2 != null && this.chart3 != null) {
            this.clickOnBar(true, 2, array[0].index);
          }

        },
      },
        
    });

    //console.log('canvas parent node', this.chart3.canvas.parentNode);
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

                this.chart2.ctx.font = "bold 10pt 'Helvetica Neue'";
                this.chart2.ctx.fillStyle = '#000';
                this.chart2.ctx.textBaseline = "middle";
                this.chart2.ctx.textAlign = "center";

                for(var i = 0; i < this.chart2.data.datasets.length; i++) {

                  const dataset = this.chart2.data.datasets[i];
                  for (var j = 0; j < dataset.data.length; j++) {

                    if(parseInt(dataset.data[j]) > 0) {

                      if((this.chart2.data.labels[j].join(" ") + "").toLowerCase().trim() == this.graphParam) {
                        this.chart2.ctx.fillStyle = '#fff';
                      } else {
                        this.chart2.ctx.fillStyle = '#000';
                      }

                      this.chart2.ctx.fillText(dataset.data[j], this.chart2.getDatasetMeta(i).data[j].x - 13, this.chart2.getDatasetMeta(i).data[j].y);

                    }

                  }

                }

              } else {
              
                for(var i = 0; i < this.chart2.data.datasets.length; i++) {

                  const dataset = this.chart2.data.datasets[i];
                  for (var j = 0; j < dataset.data.length; j++) {

                    if(parseInt(dataset.data[j]) > 0) {

                      var mid_radius = this.chart2.getDatasetMeta(i).data[j].innerRadius + (this.chart2.getDatasetMeta(i).data[j].outerRadius - this.chart2.getDatasetMeta(i).data[j].innerRadius)/2;
                      var start_angle = this.chart2.getDatasetMeta(i).data[j].startAngle;
                      var end_angle = this.chart2.getDatasetMeta(i).data[j].endAngle;
                      var mid_angle = start_angle + (end_angle - start_angle)/2;

                      var x = mid_radius * Math.cos(mid_angle);
                      var y = mid_radius * Math.sin(mid_angle);

                      this.chart2.ctx.fillStyle = '#fff';
                      if (i == 3){ // Darker text color for lighter background
                        this.chart2.ctx.fillStyle = '#444';
                      }
                      // var percent = String(Math.round(dataset.data[j]/total*100)) + "%";
                      // var str;
                      // str = "";
                      // for(var k = 0; k <= dataset.data[j].length; k++) {
                      //   str += '█';
                      // }
                      this.chart2.ctx.fillStyle = '#000';
                      //this.chart.ctx.fillText(str, this.chart.getDatasetMeta(i).data[j].x + x, this.chart.getDatasetMeta(i).data[j].y + y);
                      //const match = /(?<value>\d+\.?\d*)/;
                      let fillText = '';
                      if((this.chart2.data.labels[j] + "").toLowerCase().replace(/ /g, "-") == this.graphParam)  {
                        this.chart2.ctx.font = "bold 20pt Courier";
                        fillText = dataset.data[j] + '✓';
                      } else {
                        this.chart2.ctx.font = "bold 15pt Courier";
                        fillText = dataset.data[j];
                      }
                      this.chart2.ctx.fillStyle = '#fff';
                      this.chart2.ctx.textBaseline = "middle";
                      this.chart2.ctx.textAlign = "center";
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
              },
              callback: (val: any, _index: any) => {
                // Hide every 2nd tick label
                let value = data.labels[val];
                //console.log('callback', this.graphParam);
                if(this.graphParam.length > 0) {
                  if((data.labels[val].join(" ") + "").toLowerCase().trim() == this.graphParam) {
                  } else {
                    value = "";
                  }
                } else {
                  if(this.isSelectedLegend(val)) {
                    return "";
                  }
                }
                return value;
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
            },
            onClick: () => {}
          },
          title: {
            display: true,
            text: title,
            font: {
                size: 16,
            }
          }
        },
        onClick: (_event: any = {}, array: any) => {

          // if(array == null) return;
          // if(array[0] == null) return;
          // const barIndex = array[0].index;
          // this.clickOnBar(false, 2, barIndex)
          // this.clickOnPie(true, barIndex)

          if(array == null) return;
          if(array[0] == null) return;
          const pieIndex = array[0].index;
          // const tempGraphParam = this.graphParam
          //console.log('pie bar trigger 0', this.graphParam, array[0].index, JSON.stringify(this.barCharDataSet2));
          this.clickOnPie(false, pieIndex)
          //console.log('pie bar trigger 1', this.graphParam, array[0].index, JSON.stringify(this.barCharDataSet2));
          if(this.chart2 != null && this.chart3 != null) {
            //console.log('pie bar trigger 2', this.graphParam, array[0].index);
            this.clickOnBar(true, 2, array[0].index);
          }

        },
      },
        
    });

    //console.log('canvas parent node', this.chart2.canvas.parentNode);
    this.chart2.canvas.parentNode.style.height = (parseInt(data.labels.length)*90 + 40) + 'px';

  }

  renderChart = (ctx: any, type: any, data: any, title: string) => {

    //console.log('rendering chart', this.chart);

    if(this.chart != null) {
      //console.log('destroying chart', this.chart);
      (this.chart as Chart).destroy();
      this.chart = null;
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
                      //console.log('points', this.chart.getDatasetMeta(i).data[j]);
                      this.chart.ctx.fillText(dataset.data[j], this.chart.getDatasetMeta(i).data[j].x - 20, this.chart.getDatasetMeta(i).data[j].y);
                    }

                  }

                }

              } else {

                //console.log('onanimation complete', this.chart, this.chart.data, this.graphParam);
                //console.log('onanimation complete', this.graphParam);
              
                var rendered = false;

                for(var i = 0; i < this.chart.data.datasets.length; i++) {

                  const dataset = this.chart.data.datasets[i];
                  for (var j = 0; j < dataset.data.length; j++) {

                    if(parseInt(dataset.data[j]) > 0) {

                      rendered = true;
                      //console.log(this.chart.getDatasetMeta(i));
                      //console.log(i + "," + j, this.chart.getDatasetMeta(i).data[j]);
                      // var total = this.chart.getDatasetMeta(i).total;
                      //console.log('total', total);
                      var mid_radius = this.chart.getDatasetMeta(i).data[j].innerRadius + (this.chart.getDatasetMeta(i).data[j].outerRadius - this.chart.getDatasetMeta(i).data[j].innerRadius)/2;
                      //console.log('mid_radius', mid_radius);
                      var start_angle = this.chart.getDatasetMeta(i).data[j].startAngle;
                      //console.log('start_angle', start_angle);
                      var end_angle = this.chart.getDatasetMeta(i).data[j].endAngle;
                      //console.log('end_angle', end_angle);
                      var mid_angle = start_angle + (end_angle - start_angle)/2;
                      //console.log('mid_angle', mid_angle);

                      var x = mid_radius * Math.cos(mid_angle);
                      var y = mid_radius * Math.sin(mid_angle);

                      this.chart.ctx.fillStyle = '#fff';
                      if (i == 3){ // Darker text color for lighter background
                        this.chart.ctx.fillStyle = '#444';
                      }
                      // var percent = String(Math.round(dataset.data[j]/total*100)) + "%";
                      // var str = "";
                      // for(var k = 0; k <= dataset.data[j].length; k++) {
                      //   str += '█';
                      // }
                      //console.log('outputting bg', str);
                      this.chart.ctx.fillStyle = '#000';
                      //this.chart.ctx.fillText(str, this.chart.getDatasetMeta(i).data[j].x + x, this.chart.getDatasetMeta(i).data[j].y + y);
                      //const match = /(?<value>\d+\.?\d*)/;
                      let fillText = '';
                      let replaceText = ' ';
                      if(this.flowGraph == this.FLOW_GRAPH_COMPLETENESS || this.flowGraph == this.FLOW_GRAPH_TIMELINESS) {
                        replaceText = '-';
                      }
                      this.chart.ctx.fillStyle = '#fff';
                      if((this.chart.data.labels[j] + "").toLowerCase().replace(/ /g, replaceText) == this.graphParam) {
                        this.chart.ctx.font = "bold 20pt 'Helvetica Neue'";
                        if(this.isSelectedLegend(j)) {
                          fillText = '';
                        } else {
                          this.chart.ctx.fillStyle = '#fff';
                          fillText = dataset.data[j] + '✓';
                        }
                        
                      } else {
                        this.chart.ctx.font = "bold 12pt 'Helvetica Neue'";
                        if(this.isSelectedLegend(j)) {
                          fillText = '';
                        } else {
                          this.chart.ctx.fillStyle = '#000';
                          fillText = dataset.data[j];
                          
                        }
                        
                      }

                      this.chart.ctx.textBaseline = "middle";
                      this.chart.ctx.textAlign = "center";

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
              generateLabels: (chart: any) => chart.data.labels.map((l: any, i: any) => ({
                datasetIndex: i,
                index: i,
                text: l,
                fillStyle: chart.data.datasets[0].backgroundColor[i],
                strokeStyle: chart.data.datasets[0].backgroundColor[i],
                hidden: chart.getDatasetMeta(0).data[i].hidden
             }))
            },
            onClick: (_evt: any, legendItem: any, _legend: any) => {
              if(this.graphParam.length > 0) {
                this.clearSelectedGraphParam();
              }
              //
              //console.log('index clicked', legendItem.index, this.chart.legend.legendItems[legendItem.index]);
              this.processClickOnLegend(legendItem.index, legendItem);
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
        onClick: (_event: any, array: any) => {
          
          if(array == null) return;
          if(array[0] == null) return;
          const pieIndex = array[0].index;
          // const tempGraphParam = this.graphParam
          //console.log('pie bar trigger 0', this.graphParam, array[0].index, JSON.stringify(this.barCharDataSet2));
          this.clickOnPie(false, pieIndex)
          //console.log('pie bar trigger 1', this.graphParam, array[0].index, JSON.stringify(this.barCharDataSet2));
          if(this.chart2 != null && this.chart3 != null) {
            //console.log('pie bar trigger 2', this.graphParam, array[0].index);
            this.clickOnBar(true, 2, array[0].index);
          }
        }
      },
        
    });

    this.chart.canvas.parentNode.style.height = '450px';
    
  }

  copy = (aObject: any) => {
    // Prevent undefined objects
    // if (!aObject) return aObject;
  
    let bObject : any = Array.isArray(aObject) ? [] : {};
  
    let value;
    for (const key in aObject) {
  
      // Prevent self-references to parent object
      // if (Object.is(aObject[key], aObject)) continue;
      
      value = aObject[key];
  
      bObject[key] = (typeof value === "object") ? this.copy(value) : value;
    }
  
    return bObject;
  }

  processGraphHide = (clickedValue: string, hide: boolean) => {
    //console.log('processGraphHide', clickedValue, hide, this.selectedFilter);

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
    const eventTitles = eventContainer!.querySelectorAll('.stream-events-event-title') as NodeListOf<HTMLElement>;
    const eventSubTitles = eventContainer!.querySelectorAll('.stream-events-event-subtitle') as NodeListOf<HTMLElement>;
    const tables = eventContainer!.querySelectorAll('.stream-events-container-table') as NodeListOf<HTMLTableElement>;
    const graphparamnames1 = eventContainer!.querySelectorAll('.graphparamname1') as NodeListOf<HTMLTableCellElement>;
    const graphparamnames2 = eventContainer!.querySelectorAll('.graphparamname2') as NodeListOf<HTMLTableCellElement>;
    const graphparamnames3 = eventContainer!.querySelectorAll('.graphparamname3') as NodeListOf<HTMLTableCellElement>;
    const streamEventSummary = eventContainer!.querySelector('#stream-event-summary') as HTMLDivElement;
    const streamEventFilters = eventContainer!.querySelector('#stream-event-filter') as HTMLDivElement;

    if(hide) {
      //this.graphParam = clickedValue;
      streamEventSummary.style.display = 'none';
      //console.log('selectedfilter', this.selectedFilter);
      if(this.selectedFilter == null) {
        this.selectedFilter = [];
      }
      this.selectedFilter.push({
        selected: false,
        value: clickedValue
      });

      var filterString = "";
      for(var j = 0; j < this.selectedFilter.length; j++) {
        filterString += this.selectedFilter[j].value;
        if(j < (this.selectedFilter.length - 1)) {
          filterString += ',';
        }
      }

      (streamEventFilters as HTMLDivElement).style.display = 'block';
      (streamEventFilters as HTMLDivElement).innerHTML = '<div part="badge-dashboard" class="mr-10 mb-10 no-shrink d-flex justify-between align-center"><div><span>Filtered by</span>&nbsp;&nbsp;<span id="graph-total" part="badge-filter-name">excluding '+filterString+'</span></div><button id="button-filter-cancel" part="button-icon"><span class="material-symbols-outlined">close</span></button></div>';

      (streamEventFilters as HTMLDivElement).querySelector('#button-filter-cancel')?.addEventListener('click', () => {
        this.clearSelectedLegend();
        this.clearSelectedGraphParam();
      });

    } else {

      streamEventSummary.style.display = 'flex';
      this.selectedFilter = null;
      (streamEventFilters as HTMLDivElement).style.display = 'none';
      (streamEventFilters as HTMLDivElement).innerHTML = '';

    }

    //console.log('selectedfilter', this.selectedFilter);

    for(var i = 0; i < divs.length; i++) {

      if(!hide) {
        (tables[i] as HTMLDivElement).style.display = 'block';
          //(hiddenFilternames[i] as HTMLDivElement).style.display = 'block';
          (graphparamnames1[i] as HTMLDivElement).style.display = 'block';
          if(graphparamnames2 != null && graphparamnames2[i] != null) (graphparamnames2[i] as HTMLDivElement).style.display = 'block';
          if(graphparamnames3 != null && graphparamnames3[i] != null) (graphparamnames3[i] as HTMLDivElement).style.display = 'block';
          (eventTitles[i] as HTMLDivElement).style.display = 'flex';
          if(eventSubTitles[i] != null) {
            (eventSubTitles[i] as HTMLDivElement).style.display = 'flex';
          }
          
      } else {

        var found = false;

        if(this.selectedFilter != null) {
          for(var j = 0; j < this.selectedFilter.length; j++) {
            // if((graphparamnames1[i] as HTMLDivElement).innerHTML.toLowerCase().replace('&amp;', '&').indexOf(this.selectedFilter[j].value) >= 0) {
            if((graphparamnames1[i] as HTMLDivElement).innerHTML.toLowerCase().replace('&amp;', '&').replace(/-/g, ' ') == this.selectedFilter[j].value.toLowerCase().replace('&amp;', '&').replace(/-/g, ' ')) {
              
              found = true;
              break;
            }
          }
        }
  
        if(found) {
          (tables[i] as HTMLDivElement).style.display = 'none';
          //(hiddenFilternames[i] as HTMLDivElement).style.display = 'none';
          (graphparamnames1[i] as HTMLDivElement).style.display = 'none';
          if(graphparamnames2 != null && graphparamnames2[i] != null) (graphparamnames2[i] as HTMLDivElement).style.display = 'none';
          if(graphparamnames3 != null && graphparamnames3[i] != null) (graphparamnames3[i] as HTMLDivElement).style.display = 'none';
          (eventTitles[i] as HTMLDivElement).style.display = 'none';  
          if(eventSubTitles[i] != null) {
            (eventSubTitles[i] as HTMLDivElement).style.display = 'none';  
          }
        } 
      }

      // var found = false;

      // if(this.selectedFilter != null) {
      //   for(var j = 0; j < this.selectedFilter.length; j++) {
      //     if((graphparamnames[i] as HTMLDivElement).innerHTML.toLowerCase().replace('&amp;', '&').indexOf(this.selectedFilter[j].value) >= 0) {
      //       found = true;
      //       break;
      //     }
      //   }
      // }
      

      // if(found) {
      //   if(hide) {
      //     (tables[i] as HTMLDivElement).style.display = 'none';
      //     //(hiddenFilternames[i] as HTMLDivElement).style.display = 'none';
      //     (graphparamnames[i] as HTMLDivElement).style.display = 'none';
      //     (eventTitles[i] as HTMLDivElement).style.display = 'none';  
      //   } else {
      //     (tables[i] as HTMLDivElement).style.display = 'block';
      //     //(hiddenFilternames[i] as HTMLDivElement).style.display = 'block';
      //     (graphparamnames[i] as HTMLDivElement).style.display = 'block';
      //     (eventTitles[i] as HTMLDivElement).style.display = 'flex';
          
      //   }
      // } 
      
    }

  }

  processGraphFilter = (clickedValue: string) => {

    let eventContainer = null;

    if(this.getCurrentTab() == this.TAB_STREAM) {
      eventContainer = (this._SfStreamContainer as HTMLDivElement);
    }

    // if(this.getCurrentTab() == this.TAB_UPCOMING) {
    //   eventContainer = (this._SfUpcomingContainer as HTMLDivElement);
    // }

    if(this.getCurrentTab() == this.TAB_THIS) {
      eventContainer = (this._SfThisContainer as HTMLDivElement);
    }

    // if(this.getCurrentTab() == this.TAB_PAST) {
    //   eventContainer = (this._SfPastContainer as HTMLDivElement);
    // }

    if(this.getCurrentTab() == this.TAB_CUSTOM) {
      eventContainer = (this._SfCustomContainer as HTMLDivElement);
    }

    if(this.getCurrentTab() == this.TAB_FIND) {
      eventContainer = (this._SfFindContainer as HTMLDivElement);
    }

    if(eventContainer == null) return;

    const divs = eventContainer!.querySelectorAll('.stream-events-container') as NodeListOf<HTMLElement>;
    const eventTitles = eventContainer!.querySelectorAll('.stream-events-event-title') as NodeListOf<HTMLElement>;
    const eventSubTitles = eventContainer!.querySelectorAll('.stream-events-event-subtitle') as NodeListOf<HTMLElement>;
    const tables = eventContainer!.querySelectorAll('.stream-events-container-table') as NodeListOf<HTMLTableElement>;
    const graphparamnames1 = eventContainer!.querySelectorAll('.graphparamname1') as NodeListOf<HTMLTableCellElement>;
    const graphparamnames2 = eventContainer!.querySelectorAll('.graphparamname2') as NodeListOf<HTMLTableCellElement>;
    const graphparamnames3 = eventContainer!.querySelectorAll('.graphparamname3') as NodeListOf<HTMLTableCellElement>;
    const streamEventSummary = eventContainer!.querySelector('#stream-event-summary') as HTMLDivElement;
    const streamEventFilters = eventContainer!.querySelector('#stream-event-filter') as HTMLDivElement;

    if(streamEventSummary == null) {
      return;
    }

    if(this.graphParam == clickedValue) {

      this.graphParam = "";
      streamEventSummary.style.display = 'flex';
      this.selectedFilter = null;
      (streamEventFilters as HTMLDivElement).style.display = 'none';
      (streamEventFilters as HTMLDivElement).innerHTML = '';

    } else {

      this.graphParam = clickedValue;
      streamEventSummary.style.display = 'none';
      this.selectedFilter = {
        selected: true,
        value: clickedValue
      };
      (streamEventFilters as HTMLDivElement).style.display = 'block';
      (streamEventFilters as HTMLDivElement).innerHTML = '<div part="badge-dashboard" class="d-flex align-center justify-between mr-10 mb-10 no-shrink"><div><span>Filtered by</span>&nbsp;&nbsp;<span id="graph-total" part="badge-filter-name">'+clickedValue+'</span></div><button id="button-filter-cancel" part="button-icon"><span class="material-symbols-outlined">close</span></button></div>';

      (streamEventFilters as HTMLDivElement).querySelector('#button-filter-cancel')?.addEventListener('click', () => {
        this.clearSelectedGraphParam();
      });

    }


    for(var i = 0; i < divs.length; i++) {

      //console.log('processGraphFilter', graphparamnames1[i], (graphparamnames1[i] as HTMLDivElement).innerHTML.toLowerCase().replace('&amp;', '&').replace(/-/g, ' '), this.graphParam.toLowerCase().replace('&amp;', '&').replace(/-/g, ' '));

      if((graphparamnames1[i] as HTMLDivElement).innerHTML.toLowerCase().replace('&amp;', '&').replace(/-/g, ' ') == this.graphParam.toLowerCase().replace('&amp;', '&').replace(/-/g, ' ') || this.graphParam.toLowerCase().replace('&amp;', '&').replace(/-/g, ' ') == "") {
        (tables[i] as HTMLDivElement).style.display = 'block';
        //(hiddenFilternames[i] as HTMLDivElement).style.display = 'block';
        (graphparamnames1[i] as HTMLDivElement).style.display = 'block';
        if(graphparamnames2 != null && graphparamnames2[i] != null) (graphparamnames2[i] as HTMLDivElement).style.display = 'block';
        if(graphparamnames3 != null && graphparamnames3[i] != null) (graphparamnames3[i] as HTMLDivElement).style.display = 'block';
        (eventTitles[i] as HTMLDivElement).style.display = 'flex';
        if(eventSubTitles[i] != null) {
          (eventSubTitles[i] as HTMLDivElement).style.display = 'flex';
        }
      } else {
        (tables[i] as HTMLDivElement).style.display = 'none';
        //(hiddenFilternames[i] as HTMLDivElement).style.display = 'none';
        (graphparamnames1[i] as HTMLDivElement).style.display = 'none';
        if(graphparamnames2 != null && graphparamnames2[i] != null) (graphparamnames2[i] as HTMLDivElement).style.display = 'none';
        if(graphparamnames3 != null && graphparamnames3[i] != null) (graphparamnames3[i] as HTMLDivElement).style.display = 'none';
        (eventTitles[i] as HTMLDivElement).style.display = 'none';
        if(eventSubTitles[i] != null) {
          (eventSubTitles[i] as HTMLDivElement).style.display = 'none';
        }
      }

    }

  }

  processClickOnLegend = (index: number, legendItem: any) => {

    legendItem.hidden = true;
    const ci = this.chart;
    if(this.chart.legend.chart.data.datasets != null) {
      this.chart.legend.chart.data.datasets[0].data.forEach((_d: any, i: any) => {
        if(index === i) {
  
          let opHide = true;
  
          //console.log('dataset-found before before', this.isSelectedLegend(i), legendItem, this.chartSelectedLegend);
  
          if(!this.isSelectedLegend(i)) {
  
            //this.clearSelectedLegend();
  
            opHide = true;
            this.chart.legend.chart.getDatasetMeta(0).data[index].hidden = true;
            this.chartSelectedLegend.push(index);
            ci.update();
  
          } else {

            opHide = false;

            for(var j = 0; j < this.chartSelectedLegend.length; j++) {
              this.chart.legend.chart.getDatasetMeta(0).data[this.chartSelectedLegend[j]].hidden = false;  
            }
            this.removeFromSelectedLegend(index)
            ci.update();
            
          }
  
          this.clickOnLegend(this.isSelectedLegend(i), legendItem.text);
  
          if(this.chart2 != null && this.chart3 != null) {
  
            if(opHide) {
  
              // if(this.barCharDataSet2Arr.length > 0) {
              //   this.chart2.data.datasets = this.barCharDataSet2Arr.pop();
              // }
    
              // if(this.barCharDataSet3Arr.length > 0) {
              //   this.chart3.data.datasets = this.barCharDataSet3Arr.pop();
              // }
    
              // this.barCharDataSet2Arr.push({index: index, value: this.copy(this.chart2.data.datasets)});
              // this.barCharDataSet3Arr.push({index: index, value: this.copy(this.chart3.data.datasets)});
  
              this.barCharDataSet2Arr.push(this.copy(this.chart2.data.datasets));
              this.barCharDataSet3Arr.push(this.copy(this.chart3.data.datasets));
    
              for(var k = 0; k < this.chart2.data.datasets.length; k++) {
                const dataset = this.chart2.data.datasets[k];
                for (var j = 0; j < dataset.data.length; j++) {
                  if(j === index) {
                    dataset.data[j] = 0;
                  } else {
                  }
                }
              }
    
              for(var k = 0; k < this.chart3.data.datasets.length; k++) {
                const dataset = this.chart3.data.datasets[k];
                for (var j = 0; j < dataset.data.length; j++) {
                  if(j === index) {
                    dataset.data[j] = 0;
                  } else {
                  }
                }
              }
    
              //console.log('dataset-found before', this.barCharDataSet3Arr);
    
            } else {
  
              do {
                this.chart2.data.datasets = this.barCharDataSet2Arr.pop();
                this.chart3.data.datasets = this.barCharDataSet3Arr.pop();  
              } while(this.barCharDataSet2Arr.length > 0);
  
              this.chartSelectedLegend = [];

            }

            this.chart2.update();
            this.chart3.update();
              
          }
  
          ////console.log('modified datasets', this.chart2.data.datasets);

          //console.log('dataset-found after', this.chartSelectedLegend);
  
        }
      })
  
    }
    
  }

  clickOnLegend = (hide: boolean, label: string) => {
    //console.log(hide, label);
    let labelClicked = '';

    if(this.flowGraph == this.FLOW_GRAPH_COMPLETENESS || this.flowGraph == this.FLOW_GRAPH_TIMELINESS) {
      labelClicked = (label).toLowerCase().replace(/ /g, "-").replace('status-', '');  
    } else {
      labelClicked = (label).toLowerCase();
    }

    this.processGraphHide(labelClicked, hide);
  }

  clickOnPie = (callingFromBar: boolean, pieIndex: number) => {

    //console.log('pie bar trigger 1 0', JSON.stringify(this.barCharDataSet2));
    //console.log('pieIndex', pieIndex);

    if(this.barCharDataSet2Arr.length > 0) {
      this.clearSelectedLegend();
    }

    //console.log('pie bar trigger 1 1', JSON.stringify(this.barCharDataSet2));

    let labelClicked = '';

    if(this.flowGraph == this.FLOW_GRAPH_COMPLETENESS || this.flowGraph == this.FLOW_GRAPH_TIMELINESS) {
      labelClicked = (this.chart.data.labels[pieIndex] + "").toLowerCase().replace(/ /g, "-").replace('status-', '');  
    } else {
      labelClicked = (this.chart.data.labels[pieIndex] + "").toLowerCase();
    }
    
    //console.log('pieIndex', labelClicked);

    if(!callingFromBar) {
      //console.log('pieIndex', labelClicked);
      this.processGraphFilter(labelClicked);
    }
    
  }

  clickOnBar = (callingFromPie: boolean, graphNumber: number, barIndex: number) => {
    
    let labelClicked = '';

    if(graphNumber === 2 || graphNumber === 3 || graphNumber === 4) {
      if(this.flowGraph == this.FLOW_GRAPH_COMPLETENESS || this.flowGraph == this.FLOW_GRAPH_TIMELINESS) {
        labelClicked = (this.chart2.data.labels[barIndex].join(" ") + "").toLowerCase().replace(/ /g, "-").replace('status-', '');  
      } else {
        labelClicked = (this.chart2.data.labels[barIndex].join(" ") + "").toLowerCase();
      }
    }
    
    if(!callingFromPie) {
      this.processGraphFilter(labelClicked);
    }

    //console.log('clickonbar trigger', this.graphParam, '><', this.barCharDataSet2);

    if(this.graphParam.length > 0) {

      if(this.barCharDataSet2.length > 0 && this.barCharDataSet3.length > 0 && this.barCharDataSet4.length > 0) {
        this.chart2.data.datasets = this.barCharDataSet2.pop();
        this.chart3.data.datasets = this.barCharDataSet3.pop();
        this.chart4.data.datasets = this.barCharDataSet4.pop();
      }

      this.barCharDataSet2.push(this.copy(this.chart2.data.datasets));
      for(var i = 0; i < this.chart2.data.datasets.length; i++) {
        const dataset = this.chart2.data.datasets[i];
        for (var j = 0; j < dataset.data.length; j++) {
          if(j === barIndex) {

          } else {
            dataset.data[j] = 0;
          }
        }
      }

      this.barCharDataSet3.push(this.copy(this.chart3.data.datasets));
      for(var i = 0; i < this.chart3.data.datasets.length; i++) {
        const dataset = this.chart3.data.datasets[i];
        for (var j = 0; j < dataset.data.length; j++) {
          if(j === barIndex) {

          } else {
            dataset.data[j] = 0;
          }
        }
      }

      this.barCharDataSet4.push(this.copy(this.chart4.data.datasets));
      for(var i = 0; i < this.chart4.data.datasets.length; i++) {
        const dataset = this.chart4.data.datasets[i];
        for (var j = 0; j < dataset.data.length; j++) {
          if(j === barIndex) {

          } else {
            dataset.data[j] = 0;
          }
        }
      }

      //console.log('clickonbar trigger latest values', this.chart2.data.datasets);
      //console.log('clickonbar trigger in storage', this.barCharDataSet2);
    
    } else {
      this.chart2.data.datasets = this.barCharDataSet2.pop();
      this.chart3.data.datasets = this.barCharDataSet3.pop();
      this.chart4.data.datasets = this.barCharDataSet4.pop();
    }
    
    //console.log(this.chart2.data);
    this.chart2.update();
    this.chart3.update();
    this.chart4.update();
    
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

    this.selectedTab = selectedTab;

    this.clearAllCalendars();

    this.flowGraph = this.FLOW_GRAPH_COMPLIANCE;

    var html = '';

    html += '<button class="tab-button mb-10" id="calendar-tab-month" part="'+(selectedTab == this.TAB_STREAM ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Month</button>';
    html += '<button class="tab-button mb-10" id="calendar-tab-custom" part="'+(selectedTab == this.TAB_CUSTOM ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Range</button>';
    html += '<button class="tab-button mb-10" id="calendar-tab-find" part="'+(selectedTab == this.TAB_FIND ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Search</button>';
    html += '<button class="tab-button tab-button-secondary mb-10 '+(selectedTab == this.TAB_THIS ? '' : 'hide')+'" id="calendar-tab-this" part="'+(selectedTab == this.TAB_THIS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Current</button>';
    html += '<button class="tab-button tab-button-secondary mb-10 '+(selectedTab == this.TAB_YEAR ? '' : 'hide')+'" id="calendar-tab-year" part="'+(selectedTab == this.TAB_YEAR ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Overview</button>';
    html += '<button class="tab-button tab-button-secondary mb-10 '+(selectedTab == this.TAB_ADHOC ? '' : 'hide')+'" id="calendar-tab-adhoc" part="'+(selectedTab == this.TAB_ADHOC ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Adhoc</button>';
    html += '<button class="tab-button tab-button-secondary mb-10 '+(selectedTab == this.TAB_REGISTERS ? '' : 'hide')+'" id="calendar-tab-register" part="'+(selectedTab == this.TAB_REGISTERS ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Registers</button>';
    html += '<button class="tab-button mb-10" id="calendar-tab-next" part="calendar-tab-button-not-selected"><span class="material-symbols-outlined">arrow_forward_ios</span></button>';
    

// html += '<button class="tab-button mb-10" id="calendar-tab-upcoming" part="'+(selectedTab == this.TAB_UPCOMING ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Upcoming</button>';
    // html += '<button class="tab-button mb-10" id="calendar-tab-past" part="'+(selectedTab == this.TAB_PAST ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Past</button>';

    (this._SfTabContainer as HTMLDivElement).innerHTML = html;

    (this._SfTabContainer as HTMLDivElement).querySelector('#calendar-tab-next')?.addEventListener('click', async (e: any) => {

      const buttons = (this._SfTabContainer as HTMLDivElement).querySelectorAll('.tab-button-secondary') as NodeListOf<HTMLButtonElement>;
      buttons.forEach(button => {
        button.style.display = 'block';
      });

      const button = (e.currentTarget as HTMLButtonElement);
      button.style.display = 'none';

    });

    (this._SfTabContainer as HTMLDivElement).querySelector('#calendar-tab-year')?.addEventListener('click', async () => {

      //console.log('calclicked', this.mode);

      if(this.mode == "consumer") {
        this.renderTabs(this.TAB_YEAR);
        this.enableCalendar();
        await this.fetchAndYearlyRenderUserCalendar_2();
        //this.renderCalendar();
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

      //console.log('currMonth', currMonth);

      let idx = 0;
      for(var i = 0; i < 12; i++) {
        //console.log('currMonth compare', currMonth, (parseInt(this.calendarStartMM) + i)%12);
        if((parseInt(currMonth) === 12 && (parseInt(this.calendarStartMM) + i)%12 === 0) || parseInt(currMonth) === (parseInt(this.calendarStartMM) + i)%12) {
          idx = i;
          break;
        }
      }
      this.currentColumnIndex =  idx + "";
      const dateResult = this.calculateStartAndEndDateOfStream(idx);
      if(dateResult != null) {
        await this.fetchAndYearlyRenderUserCalendar_2(dateResult.startDate, dateResult.endDate);
      }
      this.renderStream(idx);
    });

    // (this._SfTabContainer as HTMLDivElement).querySelector('#calendar-tab-upcoming')?.addEventListener('click', async () => {
    //   this.enableUpcoming();
    //   this.renderTabs(this.TAB_UPCOMING);
    //   const dateResult = this.calculateStartAndEndDateOfUpcoming(1);
    //   //console.log('dateresult', dateResult)
    //   this.currentColumnIndex =  1 + ""
    //   await this.fetchAndYearlyRenderUserCalendar_2(dateResult.startDate, dateResult.endDate);
    //   this.renderUpcoming();
    // });

    (this._SfTabContainer as HTMLDivElement).querySelector('#calendar-tab-this')?.addEventListener('click', async () => {
      this.enableThis();
      this.renderTabs(this.TAB_THIS);
      const dateResult = this.calculateStartAndEndDateOfThis(1);
      //console.log('dateresult', dateResult)
      this.currentColumnIndex =  1 + ""
      await this.fetchAndYearlyRenderUserCalendar_2(dateResult.startDate, dateResult.endDate);
      this.renderThis();
    });

    // (this._SfTabContainer as HTMLDivElement).querySelector('#calendar-tab-past')?.addEventListener('click', async () => {
    //   this.enablePast();
    //   this.renderTabs(this.TAB_PAST);
    //   const dateResult = this.calculateStartAndEndDateOfPast(1);
    //   //console.log('dateresult', dateResult)
    //   this.currentColumnIndex =  1 + ""
    //   await this.fetchAndYearlyRenderUserCalendar_2(dateResult.startDate, dateResult.endDate);
    //   this.renderPast();
    // });

    (this._SfTabContainer as HTMLDivElement).querySelector('#calendar-tab-custom')?.addEventListener('click', () => {
      this.enableCustom();
      this.renderTabs(this.TAB_CUSTOM);
      this.renderCustom();
    });

    (this._SfTabContainer as HTMLDivElement).querySelector('#calendar-tab-find')?.addEventListener('click', () => {
      this.enableFind();
      this.renderTabs(this.TAB_FIND);
      this.renderFind();
    });

    (this._SfTabContainer as HTMLDivElement).querySelector('#calendar-tab-adhoc')?.addEventListener('click', () => {
      this.enableAdhoc();
      this.renderTabs(this.TAB_ADHOC);
      this.renderAdhoc();
    });

    (this._SfTabContainer as HTMLDivElement).querySelector('#calendar-tab-register')?.addEventListener('click', () => {
      this.enableRegisters();
      this.renderTabs(this.TAB_REGISTERS);
      this.renderRegister();
    });

  }

  renderMappingTabs = (selectedTab: string) => {

    var html = '';

    html += '<button class="tab-button" id="mapping-tab-reporter" part="'+(selectedTab == this.TAB_REPORTER ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Reporter</button>';
    html += '<button class="tab-button" id="mapping-tab-approver" part="'+(selectedTab == this.TAB_APPROVER ? 'calendar-tab-button-selected' : 'calendar-tab-button-not-selected')+'">Approver</button>';

    (this._SfMappingTabContainer as HTMLDivElement).innerHTML = html;

    if(this.myRole == this.TAB_REPORTER) {
      //console.log('sync mapping reporter');
      (this._SfButtonBackSyncMapping as HTMLButtonElement).style.visibility = 'visible';
    } else {
      //console.log('sync mapping approver');
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

    //console.log((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-'+index)!.innerHTML);

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

    //console.log('rendering mapping1', unmappedEvents, this.mappedValuesDueDates, this.mappedValuesUsers, this.mappedValuesTags)

    
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

      //console.log(unmappedEvents[i]);
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
        //console.log('clickindex', clickIndex)
        this.renderExpandEvent(unmappedEvents, clickIndex);

      });

      ((this._SfMappingContainer as HTMLDivElement).querySelector('#row-unmapped-select-'+i) as HTMLInputElement).addEventListener('change', (ev: any) => {

        const clickIndex = ev.target.id.split("-")[3];
        //console.log('clickcheckbox', clickIndex)
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
        //console.log('valuechanged called', form.selectedValues());
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
      //console.log('valuechanged users', input.selectedValues());
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

    //console.log('mappings5', mappings, this.mappedValuesUsers);

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
      //console.log('mapping users', index);
      if(index >= 0) {
        this.mappedValuesUsers[index] = mappings.users[eventId];
      }
    }

    //console.log(this.mappedValuesDueDates);
    //console.log(this.mappedValuesTags);
    //console.log(this.mappedValuesUsers);

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
    (this._SfRegisterContainer as HTMLDivElement).innerHTML = "";

  }

  transformMappingsForUpload = (mapping: any) => {

    const duedates = mapping.duedates;
    const tags = mapping.tags;
    const users = mapping.users;

    const transformedDuedates : any = {};
    const transformedTags : any  = {};
    const transformedUsers : any  = {};

    //console.log('unmappedevents[i] duedates',duedates);

    for(var i = 0; i < Object.keys(duedates).length; i++) {

      //console.log('unmappedevents[i]',i,this.unmappedEvents[i]);

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

  uploadTriggersMapping = async (data: any) => {
    await this.uploadOnboardingMapping(data, 'triggers');
  }

  uploadInternalControlsMapping = async (data: any) => {
    await this.uploadOnboardingMapping(data, 'internalcontrols');
  }

  uploadAlertSchedulesMapping = async (data: any) => {
    await this.uploadOnboardingMapping(data, 'alertschedules');
  }

  uploadActivationsMapping = async (data: any) => {
    await this.uploadOnboardingMapping(data, 'activations');
  }

  uploadInvalidationsMapping = async (data: any) => {
    await this.uploadOnboardingMapping(data, 'invalidations');
  }

  uploadDuedatesMapping = async (data: any) => {
    await this.uploadOnboardingMapping(data, 'duedates');

  }

  uploadExtensionsMapping = async (data: any) => {
    await this.uploadOnboardingMapping(data, 'extensions');

  }

  uploadApproversMapping = async (data: any) => {
    await this.uploadOnboardingMapping(data, 'approvers');

  }

  uploadFunctionHeadsMapping = async (data: any) => {
    await this.uploadOnboardingMapping(data, 'functionheads');
  }

  uploadMakerCheckersMapping = async (data: any) => {
    await this.uploadOnboardingMapping(data, 'makercheckers');
  }

  uploadDocsMapping = async (data: any) => {
    await this.uploadOnboardingMapping(data, 'docs');

  }

  uploadAuditorsMapping = async (data: any) => {
    await this.uploadOnboardingMapping(data, 'auditors');

  }

  uploadViewersMapping = async (data: any) => {
    await this.uploadOnboardingMapping(data, 'viewers');

  }

  uploadReportersMapping = async (data: any) => {
    await this.uploadOnboardingMapping(data, 'reporters');
  }

  uploadTagsMapping = async (data: any) => {
    await this.uploadOnboardingMapping(data, 'tags');
  }

  uploadFunctionsMapping = async (data: any) => {
    await this.uploadOnboardingMapping(data, 'functions');
  }

  uploadLocationsMapping = async (data: any) => {
    await this.uploadOnboardingMapping(data, 'locations');
  }

  uploadEntitiesMapping = async (data: any) => {
    await this.uploadOnboardingMapping(data, 'entities');
  }

  uploadCountriesMapping = async (data: any) => {
    await this.uploadOnboardingMapping(data, 'countries');
  }

  uploadOnboardingMapping = async (data: any, onboardingstep: string) => {

    //console.log('uploading..', data);

    let url = "https://"+this.apiId+"/updatemappedonboarding";

    // const body = { 
    //   "projectid": this.projectId, 
    //   "data": JSON.stringify(data),
    //   "onboardingstep": onboardingstep,
    // }

    let body: any = { 
      "projectid": this.projectId, 
      "presigned": true, 
      "onboardingstep": onboardingstep
    }

    let authorization : any = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    let xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      //console.log('jsonResponse sync', jsonRespose);
      await this.uploadToPresignedUrl(data, jsonRespose.signedUrl)

      body = { 
        "projectid": this.projectId, 
        "key": jsonRespose.key,
        "onboardingstep": onboardingstep
      }
      authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
      xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
      this._SfLoader.innerHTML = '';
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
      setTimeout(() => {
        this.clearMessages()
      }, 2000);
    }

  }

  uploadToPresignedUrl = async (data: any, url: string) => {
    const xhr : any = (await this.prepareXhrPresigned(data, url, this._SfLoader)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {
      
    }
  }

  uploadCompliancesMapping = async (data: any) => {

    //console.log('uploading..', data);
    let url = "https://"+this.apiId+"/updatemappedcompliances";

    let body: any = { 
      "projectid": this.projectId, 
      "presigned": true, 
    }

    let authorization : any = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    let xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      //console.log('jsonResponse sync', jsonRespose);
      await this.uploadToPresignedUrl(data, jsonRespose.signedUrl)

      body = { 
        "projectid": this.projectId, 
        "key": jsonRespose.key
      }
      authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
      xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
      this._SfLoader.innerHTML = '';
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
      setTimeout(() => {
        this.clearMessages()
      }, 2000);
    }

  }

  uploadStatutesMapping = async (data: any) => {

    //console.log('uploading..', data);
    let url = "https://"+this.apiId+"/updatemappedstatutes";

    var searchstring = '';

    for(var i = 0; i < data.mappings.length; i++) {

      const dataItem = JSON.parse(data.mappings[i].data);
      // //console.log(dataItem[3])
      searchstring += dataItem[3];
      if(i < (data.mappings.length - 1)) {
        searchstring += '|';
      }

    }

    // const body = { 
    //   "projectid": this.projectId, 
    //   "data": JSON.stringify(data),
    //   "compliancessearchstring": searchstring
    // }


    let body: any = { 
      "projectid": this.projectId, 
      "presigned": true, 
    }

    let authorization : any = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    let xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      await this.uploadToPresignedUrl(data, jsonRespose.signedUrl)

      body = { 
        "projectid": this.projectId, 
        "key": jsonRespose.key,
        "compliancessearchstring": searchstring
      }

      authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
      xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
      this._SfLoader.innerHTML = '';
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
      setTimeout(() => {
        this.clearMessages()
      }, 2000);
    }

  }

  uploadUnTriggerEvent = async (untrigger: any) => {

    let url = "https://"+this.apiId+"/untriggerevent";

    const body = untrigger;

    console.log('uploading...', body);

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log('jsonResponse sync', jsonRespose);
      this.setSuccess("Your trigger has been retracted successfully. The changes will reflect in your calendar shortly.");
      setTimeout(() => {
        this.clearMessages();
      }, 3000);
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
      setTimeout(() => {
        this.clearMessages()
      }, 2000);
    }

  }

  uploadTriggerMyEvent = async (complianceid: string, message: string, countryname: string, entityname: string, locationname: string, statute: string, subcategory: string) => {

    let url = "https://"+this.apiId+"/triggermyevent";

    const body = { 
      "projectid": this.projectId, 
      "complianceid": complianceid,
      "message": message,
      "userid": this.userProfileId,
      "username": this.userName,
      "countryname": countryname,
      "entityname": entityname,
      "locationname": locationname,
      "statute": statute,
      "subcategory": subcategory
    } 

    console.log('uploading...', body);

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log('jsonResponse sync', jsonRespose);
      this.setSuccess("Feedback sent successfully!");
      setTimeout(() => {
        this.clearMessages();
      }, 5000);
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
      setTimeout(() => {
        this.clearMessages()
      }, 3000);
    }

  }

  uploadTriggerEvent = async (triggeredCompliances: any) => {

    let url = "https://"+this.apiId+"/triggerevent";

    const body = { 
      "projectid": this.projectId, 
      "triggers": triggeredCompliances
    } 

    console.log('uploading...', body);

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log('jsonResponse sync', jsonRespose);
      this.setSuccess("Your trigger request is registered successfully. The associated compliances will be available in your calendar shortly.");
      setTimeout(() => {
        this.clearMessages();
      }, 3000);
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
      setTimeout(() => {
        this.clearMessages()
      }, 10000);
    }

  }

  uploadAudit = async (entityId: string, locationId: string, mmddyyyy: string, eventid: string, comments: string, approved: any) => {
    let url = "https://"+this.apiId+"/uploadaudit";

    const body = { 
      "mmddyyyy": mmddyyyy,
      "projectid": this.projectId, 
      "type": "audit",
      "eventid": eventid,
      "comments": comments,
      "approved": approved,
      "entityid": entityId,
      "locationid": locationId,
      "username": this.userName
    } 
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      // const jsonRespose = JSON.parse(xhr.responseText);
      //console.log('jsonResponse sync', jsonRespose);
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
    let url = "https://"+this.apiId+"/uploadreview";

    const body = { 
      "mmddyyyy": mmddyyyy,
      "projectid": this.projectId, 
      "type": "review",
      "eventid": eventid,
      "comments": comments,
      "approved": approved,
      "entityid": entityId,
      "locationid": locationId,
      "username": this.userName
    } 

    //console.log('uploading review', body);
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      // const jsonRespose = JSON.parse(xhr.responseText);
      //console.log('jsonResponse sync', jsonRespose);
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

  uploadReport = async (entityId: string, locationId: string, mmddyyyy: string, eventid: string, comments: string, doc: string, docs: any, event: any) => {
    let url = "https://"+this.apiId+"/uploadreport";

    const body = { 
      "mmddyyyy": mmddyyyy,
      "projectid": this.projectId, 
      "type": "report",
      "eventid": eventid,
      "comments": comments,
      "dateofcompletion": doc,
      "entityid": entityId,
      "locationid": locationId,
      "event": JSON.stringify(event),
      "docs": JSON.stringify(docs),
      "username": this.userName
    } 

    //console.log(body);

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      // const jsonRespose = JSON.parse(xhr.responseText);
      //console.log('jsonResponse sync', jsonRespose);
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

    let url = "https://"+this.apiId+"/mapevents";

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

      // const jsonRespose = JSON.parse(xhr.responseText);
      //console.log('jsonResponse sync', jsonRespose);
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

    let url = "https://"+this.apiId+"/synccalendar";

    const body = { "projectid": (this._SfProject[0].querySelector('#sf-i-project') as SfIForm).selectedValues()[0], "events": JSON.stringify(this.events)} 
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      // const jsonRespose = JSON.parse(xhr.responseText);
      //console.log('jsonResponse sync', jsonRespose);
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

    let url = "https://"+this.apiId+"/reprogramtrigger";

    const body = { "projectid": (this._SfProject[0].querySelector('#sf-i-project') as SfIForm).selectedValues()[0], "eventid": eventid, "timestamp": timestamp + ""} 
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      // const jsonRespose = JSON.parse(xhr.responseText);
      //console.log('jsonResponse sync', jsonRespose);
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
    }
  }

  processEvent = (value: any) => {

    //console.log('processing due date', value);
    //console.log('processing due date', value.duedate.replace(/['"]+/g, ''));
    //console.log('processing due date', this.mappings);

    var duedate = value.duedate;

    if(this.mappings != null && this.mappings.duedates != null && this.mappings.duedates[value.id] != null && this.mappings.duedates[value.id] != "") {
      duedate = this.mappings.duedates[value.id];
    }

    const duedateArr = duedate.replace(/['"]+/g, '').split(",") as Array<string>;

    const startMonth = parseInt(this.calendarStartMM);

    for(var i = 0; i < duedateArr.length; i++) {

      const dateArr = duedateArr[i].split("/");
      //console.log('datearr', dateArr);

      if(dateArr[2] == "*") {
        if(dateArr[1] == "*") {

          var j = startMonth;

          while(true) {

            //console.log('processing event',dateArr[2],dateArr[1],j);

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

    //console.log('calendar processed', this.calendar);
    //console.log('event processed', this.events);

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

  fetchRcmLockedCompliances = async (lockedCompliances: Array<string>) => {

    let url = "https://"+this.apiId+"/getrcmlockedcompliances";
    let authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    let xhr : any = (await this.prepareXhr({data: lockedCompliances}, url, this._SfLoader, authorization)) as any;

    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      //console.log('lockedcompliances', jsonRespose);

      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchCancelOnboardingJob = async (onboardingStep: string) => {
    let url = "https://"+this.apiId+"/cancelonboardingjob";
    let authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    let xhr : any = (await this.prepareXhr({"projectid": this.projectId, "onboardingstep": onboardingStep}, url, this._SfLoader, authorization)) as any;

    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      //console.log('fetchCancelnboardingJob', jsonRespose);

      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }
  }

  fetchGetStoredMapping = async (flow: string) => {
    let url = "https://"+this.apiId+"/getstoredmapping";
    let authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    let xhr : any = (await this.prepareXhr({"projectid": this.projectId, "flow": flow}, url, this._SfLoader, authorization)) as any;

    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      //console.log('fetchGetStoredMapping', jsonRespose);

      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }
  }

  fetchUpdateUsermap = async (usermap: any) => {

    let url = "https://"+this.apiIdUsers+"/updatefield";

    this.setSuccess('Updating usermaps, please wait...')

    //console.log('updating usermap', usermap);
    const arrUserIds = Object.keys(usermap);
    for(var i = 0; i < arrUserIds.length; i++) {

      const userId = arrUserIds[i];
      const map = usermap[userId];
      const strMap = JSON.stringify(map).replace(/"/g, '_QUOTES_');
      const body = {id: userId, field: "usermap", value: "\""+strMap+"\""};
      //console.log('updating', userId, body, url)
      let authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
      let xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
      this._SfLoader.innerHTML = '';
      if(xhr.status == 200) {

      }

    }

    setTimeout(() => {
      this.clearMessages();
    }, 1000);

  }

  fetchUpdateRcmLock = async (complianceId: string) => {

    let url = "https://"+this.apiId+"/updatercmlock";
    let authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    let xhr : any = (await this.prepareXhr({"complianceid": complianceId, "locked": true}, url, this._SfLoader, authorization)) as any;

    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      //console.log('fetchUpdateRcmLock', jsonRespose);

      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchDetailProject = async (projectId: string) => {

    let url = "https://"+this.apiIdProjects+"/detail";
    let authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    let xhr : any = (await this.prepareXhr({"id": projectId}, url, this._SfLoader, authorization)) as any;

    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      //console.log('searchprojects', jsonRespose);

      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchDeleteReview = async (eventId: string, mmddyyyy: string, entityId: string, locationId: string) => {

    let url = "https://"+this.apiId+"/deletereview";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId, "entityid": entityId, "locationid": locationId, "mmddyyyy": mmddyyyy, "eventid": eventId, }, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      //console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchSearchStatutes = async (searchString: string, cursor: string = "") => {

    let url = "https://"+this.apiIdStatutes+"/listlarge";
    let authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    let xhr : any = (await this.prepareXhr({"searchstring": searchString, "cursor": cursor}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      //console.log('searchstatutes', jsonRespose);

      let newCursor = jsonRespose.cursor;
      let i = 0;

      while(true) {

        url = "https://"+this.apiIdStatutes+"/listlarge";
        authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
        xhr = (await this.prepareXhr({"searchstring": searchString, "cursor": newCursor}, url, this._SfLoader, authorization, "" + parseInt(((i)*100/jsonRespose.found) + "") + "%")) as any;
        this._SfLoader.innerHTML = '';
        if(xhr.status == 200) {
          const jsonRespose1 = JSON.parse(xhr.responseText);
          //console.log('found', jsonRespose1.values);
          jsonRespose.values.push(...jsonRespose1.values);
          if(newCursor == jsonRespose1.cursor) {
            break;
          }
          newCursor = jsonRespose1.cursor;
          //console.log('newcursor', i, jsonRespose1.cursor);
          i+=jsonRespose1.values.length;
        } else {
          break;
        }
      }


      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchSearchCompliances = async (searchString: string, cursor: string = "", count: number, length: number) => {

    let url = "https://"+this.apiIdCompliances+"/listlarge";
    let authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    let xhr : any = (await this.prepareXhr({"searchstring": searchString, "cursor": cursor}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
     // //console.log(jsonRespose);

      let newCursor = jsonRespose.cursor;
      ////console.log('newcursor', newCursor);

      while(true) {

        url = "https://"+this.apiIdCompliances+"/listlarge";
        authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
        xhr = (await this.prepareXhr({"searchstring": searchString, "cursor": newCursor}, url, this._SfLoader, authorization, "" + parseInt(((count)*100/length) + "") + "%")) as any;

        this._SfLoader.innerHTML = '';
        if(xhr.status == 200) {
          const jsonRespose1 = JSON.parse(xhr.responseText);
         // //console.log('newcursor response', jsonRespose1);
          jsonRespose.values.push(...jsonRespose1.values);
          if(newCursor == jsonRespose1.cursor) {
            break;
          }
          newCursor = jsonRespose1.cursor;
          ////console.log('newcursor', i, jsonRespose1.cursor);
        } else {
          break;
        }

      }

      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchMappedProjects = async () => {

    let url = "https://"+this.apiId+"/getmappedprojects";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"complianceid": this.rcmSelectedCompliance.id}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      //console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchOnboardingStatus = async () => {

    let url = "https://"+this.apiId+"/getonboardingstatus";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      //console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchGetSignOff = async () => {

    let url = "https://"+this.apiId+"/getsignoff";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      //console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchUpdateSignOff = async (signoffText: string, signature: string) => {

    let url = "https://"+this.apiId+"/updatesignoff";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId, "signofftext": signoffText, "signature": signature, "username": this.userName}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      //console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchMappedCompliances = async () => {

    let url = "https://"+this.apiId+"/getmappedcompliances";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      var jsRespose = JSON.parse(xhr.responseText);
      let resultPresigned : any = null;
      resultPresigned = {};
      resultPresigned.data = {};
      resultPresigned.data.mappings = await this.fetchPresignedUrl(jsRespose.signedUrlGet);
      console.log(resultPresigned);
      await this.fetchPresignedUrlDelete(jsRespose.signedUrlDelete)
      return resultPresigned;

      // const jsonRespose = JSON.parse(xhr.responseText);
      // return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

    // let jsonResponse : any = null;
    // let lastEvaluatedKey : any = 0;

    // do {

    //   //console.log(lastEvaluatedKey);

    //   let url = "https://"+this.apiId+"/getmappedcompliances";
    //   const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    //   const xhr : any = (await this.prepareXhr({"projectid": this.projectId, "lastevaluatedkey": lastEvaluatedKey}, url, this._SfLoader, authorization)) as any;
    //   this._SfLoader.innerHTML = '';
    //   if(xhr.status == 200) {
  
    //     const jsRespose = JSON.parse(xhr.responseText);
    //     //console.log(jsRespose);

    //     if(jsRespose == null) return;

    //     if(lastEvaluatedKey === 0) {
    //         jsonResponse = {};
    //         jsonResponse.data = {}
    //         jsonResponse.data = jsRespose.data;
    //     } else {
    //       jsonResponse.data.mappings.mappings.push(...jsRespose.data.mappings.mappings);
    //     }

    //     if(jsRespose.lastEvaluatedKey < 0) break;

    //     lastEvaluatedKey = jsRespose.lastEvaluatedKey;
        
    //   } else {
  
    //     const jsonRespose = JSON.parse(xhr.responseText);
    //     this.setError(jsonRespose.error);
    //     break;
  
    //   }

    // } while(true);
    
    // return jsonResponse;

  }

  fetchMappedSerializedExtensions = async () => {

    return (await this.fetchSerializedMapping("extensions"));

  }

  fetchMappedSerializedAlertSchedules = async () => {

    return (await this.fetchSerializedMapping("alertschedules"));

  }

  fetchMappedSerializedTriggers = async () => {

    return (await this.fetchSerializedMapping("triggers"));

  }

  fetchMappedSerializedDuedates = async () => {

    return (await this.fetchSerializedMapping("duedates"));
    
  }

  fetchMappedSerializedApprovers = async () => {

    return (await this.fetchSerializedMapping("approvers"));
    
  }

  fetchMappedSerializedFunctionheads = async () => {

    return (await this.fetchSerializedMapping("functionheads"));

  }

  fetchMappedSerializedMakerCheckers = async () => {

    return (await this.fetchSerializedMapping("makercheckers"));

  }

  fetchMappedSerializedDocs = async () => {

    return (await this.fetchSerializedMapping("docs"));
    
  }

  fetchMappedSerializedAuditors = async () => {

    return (await this.fetchSerializedMapping("auditors"));
    
  }

  fetchMappedSerializedViewers = async () => {

    return (await this.fetchSerializedMapping("viewers"));

  }

  fetchMappedSerializedReporters = async () => {

    return (await this.fetchSerializedMapping("reporters"));

  }

  fetchMappedSerializedTags = async () => {

    return (await this.fetchSerializedMapping("tags"));

  }

  fetchMappedSerializedLocations = async () => {

    return (await this.fetchSerializedMapping("locations"));

  }

  fetchMappedSerializedFunctions = async () => {

    return (await this.fetchSerializedMapping("functions"));

  }

  fetchMappedSerializedEntities = async () => {

    return (await this.fetchSerializedMapping("entities"));

  }

  fetchPresignedUrl = async (url: string) => {
    const xhr : any = (await this.prepareXhrPresignedGet(url, this._SfLoader, 'Downloading')) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {
      const jsRespose = JSON.parse(xhr.responseText);
      console.log('jsRespose', jsRespose);
      return jsRespose;
    }
  }

  fetchPresignedUrlDelete = async (url: string) => {
    const xhr : any = (await this.prepareXhrPresignedDelete(url, this._SfLoader)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {
      const jsRespose = JSON.parse(xhr.responseText);
      console.log('jsRespose', jsRespose);
      return jsRespose;
    }
  }

  fetchSerializedMapping = async (onboardingstep: string) => {

    const url = "https://"+this.apiId+"/getmappedserializedonboarding";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId, "onboardingstep": onboardingstep}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      var jsRespose = JSON.parse(xhr.responseText);
      let resultPresigned : any = null;
      resultPresigned = {};
      resultPresigned.data = {};
      resultPresigned.data.mappings = await this.fetchPresignedUrl(jsRespose.signedUrlGet);
      console.log(resultPresigned);
      await this.fetchPresignedUrlDelete(jsRespose.signedUrlDelete)
      return resultPresigned;

      // if(jsRespose != null && jsRespose.lastEvaluatedKey == null) {

      //   jsonResponse.data.mappings.mappings.push(...jsRespose.data.mappings.mappings);

      //   break;
      // } else {

      //   if(jsonResponse == null) {

      //     jsonResponse = {};
      //     jsonResponse.data = {}
      //     jsonResponse.data = jsRespose.data;

      //   } else {

      //     jsonResponse.data.mappings.mappings.push(...jsRespose.data.mappings.mappings);

      //   }
      //   lastEvaluatedKey = jsRespose.lastEvaluatedKey;
      // }
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchSerializedPartByPart = async (url: string) => {

    let jsonResponse : any = null;
    let lastEvaluatedKey : any = null;

    do {

      //console.log(lastEvaluatedKey);

      const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
      const xhr : any = (await this.prepareXhr({"projectid": this.projectId, "lastevaluatedkey": lastEvaluatedKey}, url, this._SfLoader, authorization)) as any;
      this._SfLoader.innerHTML = '';
      if(xhr.status == 200) {
  
        const jsRespose = JSON.parse(xhr.responseText);
        //console.log(jsRespose);
        if(jsRespose != null && jsRespose.lastEvaluatedKey == null) {

          jsonResponse.data.mappings.mappings.push(...jsRespose.data.mappings.mappings);

          break;
        } else {

          if(jsonResponse == null) {

            jsonResponse = {};
            jsonResponse.data = {}
            jsonResponse.data = jsRespose.data;

          } else {

            jsonResponse.data.mappings.mappings.push(...jsRespose.data.mappings.mappings);

          }
          lastEvaluatedKey = jsRespose.lastEvaluatedKey;
        }
        
      } else {
  
        const jsonRespose = JSON.parse(xhr.responseText);
        this.setError(jsonRespose.error);
  
      }

    } while(true);
    
    //console.log(jsonResponse);
    return jsonResponse;

  }

  fetchMappedSerializedCountries = async () => {

    // return (await this.fetchSerializedPartByPart("https://"+this.apiId+"/getmappedserializedcountries"));
    return (await this.fetchSerializedMapping("countries"));
    
  }

  fetchMappedTriggers = async () => {

    return (await this.fetchMappedOnboarding('triggers'));

  }

  fetchMappedInternalControls = async () => {

    return (await this.fetchMappedOnboarding('internalcontrols'));

  }

  fetchMappedAlertSchedules = async () => {

    return (await this.fetchMappedOnboarding('alertschedules'));

  }

  fetchMappedActivations = async () => {

    return (await this.fetchMappedOnboarding('activations'));

  }

  fetchMappedInvalidations = async () => {

    return (await this.fetchMappedOnboarding('invalidations'));

  }

  fetchMappedExtensions = async () => {

    return (await this.fetchMappedOnboarding('extensions'));

  }

  fetchMappedDuedates = async () => {

    return (await this.fetchMappedOnboarding('duedates'));

  }

  fetchMappedReporters = async () => {

    return (await this.fetchMappedOnboarding('reporters'));

  }

  fetchMappedApprovers = async () => {

    return (await this.fetchMappedOnboarding('approvers'));

  }

  fetchMappedFunctionHeads = async () => {

    return (await this.fetchMappedOnboarding('functionheads'));

  }

  fetchMappedMakerCheckers = async () => {

    return (await this.fetchMappedOnboarding('makercheckers'));

  }

  fetchMappedDocs = async () => {

    return (await this.fetchMappedOnboarding('docs'));

  }

  fetchMappedAuditors = async () => {

    return (await this.fetchMappedOnboarding('auditors'));

  }

  fetchMappedViewers = async () => {

    return (await this.fetchMappedOnboarding('viewers'));

  }

  fetchMappedTags = async () => {

    return (await this.fetchMappedOnboarding('tags'));

  }

  fetchMappedLocations = async () => {

    return (await this.fetchMappedOnboarding('locations'));

  }

  fetchMappedFunctions = async () => {

    return (await this.fetchMappedOnboarding('functions'));
  }

  fetchMappedEntities = async () => {

    return (await this.fetchMappedOnboarding('entities'));
  }

  fetchMappedCountries = async () => {

    return (await this.fetchMappedOnboarding('countries'));

  }

  fetchMappedOnboarding = async (onboardingstep: string) => {

    const url = "https://"+this.apiId+"/getmappedonboarding";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId, "onboardingstep": onboardingstep}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      var jsRespose = JSON.parse(xhr.responseText);
      let resultPresigned : any = null;
      resultPresigned = {};
      resultPresigned.data = {};
      resultPresigned.data.mappings = await this.fetchPresignedUrl(jsRespose.signedUrlGet);
      console.log('resultPresigned', resultPresigned);
      // await this.fetchPresignedUrlDelete(jsRespose.signedUrlDelete)
      return resultPresigned;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchUpdatedCompliances = async (nextBackwardToken: string = "") => {

    let url = "https://"+this.apiIdCompliances+"/logs";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"nextBackwardToken": nextBackwardToken}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      //console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchMappedStatutes = async () => {

    let url = "https://"+this.apiId+"/getmappedstatutes";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      //console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchCreateRcmJob = async (complianceid: string, data: any, triggerDate: string, triggerMessage: string, projects: any) => {

    data.trigger = {};
    data.trigger.date = triggerDate;
    data.trigger.message = triggerMessage;
    data.projects = [];
    data.projects.push(...projects)

    let url = "https://"+this.apiId+"/creatercmjob";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"complianceid": complianceid, "data": data}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      //console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchRcmNotifications = async (projectid: string) => {

    let url = "https://"+this.apiId+"/getrcmnotifications";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": projectid}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      //console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchRcmJobs = async (complianceid: string) => {

    let url = "https://"+this.apiId+"/getrcmjobs";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"complianceid": complianceid}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      //console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchInternalControlsJobs = async () => {

    let url = "https://"+this.apiId+"/getinternalcontrolsjobs";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      //console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchExtensionsJobs = async () => {

    let url = "https://"+this.apiId+"/getalertschedulesjobs";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      //console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchAlertSchedulesJobs = async () => {

    let url = "https://"+this.apiId+"/getalertschedulesjobs";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      //console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchDueDatesJobs = async () => {

    let url = "https://"+this.apiId+"/getduedatesjobs";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      //console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchApproversJobs = async () => {

    let url = "https://"+this.apiId+"/getapproversjobs";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      //console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchFunctionHeadsJobs = async () => {

    let url = "https://"+this.apiId+"/getfunctionheadsjobs";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      //console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchMakerCheckersJobs = async () => {

    let url = "https://"+this.apiId+"/getmakercheckersjobs";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      //console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchDocsJobs = async () => {

    let url = "https://"+this.apiId+"/getdocsjobs";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      //console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchAuditorsJobs = async () => {

    let url = "https://"+this.apiId+"/getauditorsjobs";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      //console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchViewersJobs = async () => {

    let url = "https://"+this.apiId+"/getviewersjobs";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      //console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchReportersJobs = async () => {

    let url = "https://"+this.apiId+"/getreportersjobs";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      //console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }
  
  fetchTagsJobs = async () => {

    let url = "https://"+this.apiId+"/gettagsjobs";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      //console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }
  
  fetchLocationsJobs = async () => {

    let url = "https://"+this.apiId+"/getlocationsjobs";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      //console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }
  
  fetchCountriesJobs = async () => {

    let url = "https://"+this.apiId+"/getcountriesjobs";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      //console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }
  
  fetchEntitiesJobs = async () => {

    let url = "https://"+this.apiId+"/getentitiesjobs";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      //console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }
  
  fetchFunctionJobs = async () => {

    let url = "https://"+this.apiId+"/getfunctionsjobs";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      //console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchCalendarJobs = async () => {

    let url = "https://"+this.apiId+"/getcalendarjobs";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      //console.log(jsonRespose);
      return jsonRespose;
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);

    }

  }

  fetchDetail = async (value: any) => {

    const body: any = this.getApiBodyList();
    body.id = value;
    //console.log('detail', value, body);
    let url = "https://"+this.apiIdDetail+"/" + this.apiMethodDetail;

    //console.log('fetch events detail url', url);
    //console.log('fetch events detail body', body);

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      //console.log('jsonResponse fetch events detail', jsonRespose.data.value.duedate);
      this.processEvent(jsonRespose.data.value)
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
    }

  }

  fetchGetMappedCalendar = async(year: string) => {

    // let url = "https://"+this.apiId+"/getmappedcalendar";
    let url = "https://3mefupehxkw4pwsq3oyk7lf2pq0pisdx.lambda-url.us-east-1.on.aws/getcalendar";
    const body : any = {"projectid": this.projectId, "year": year};
    if(this.contractStartDate != "") {
      body.contractstartdate = this.contractStartDate;
    }
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      return jsonRespose;
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      return jsonRespose;
      
    }

  }

  sleepFunction = async (ms: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  renderAppropriateStream = (startDate: string, endDate: string) => {
    if(startDate == "" && endDate == "") this.renderCalendar(); // yearly

    if(this.selectedTab == this.TAB_STREAM) {
      this.renderStream(parseInt(this.currentColumnIndex), false);
    }
    // if(this.selectedTab == this.TAB_UPCOMING) {
    //   this.renderUpcoming(parseInt(this.currentColumnIndex), false);
    // }
    if(this.selectedTab == this.TAB_THIS) {
      this.renderThis(parseInt(this.currentColumnIndex), false);
    }
    // if(this.selectedTab == this.TAB_PAST) {
    //   this.renderPast(parseInt(this.currentColumnIndex), false);
    // }
  }

  fetchRegisters = async(searchString: string = "") => {

    let path = "";

    path = "getallfunctionevents";

    let url = "https://"+this.apiId+"/"+ path;

    let locationId = "";
    let entityId = "";

    if(this.locationId != null && this.locationId.length > 2) {
      locationId = this.locationId;
    }
    
    if(this.entityId != null && this.entityId.length > 2) {
      entityId = this.entityId;
    }

    //console.log('fetch calendar url', url);
    let urlBody : any = {"projectid": this.projectId, "userprofileid": this.userProfileId, "role": this.myRole, "searchstring": searchString, "locationid": locationId, "entityid": entityId};

    //console.log('urlbody', url, urlBody);

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(urlBody, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log('jsonRespose', jsonRespose);
      const registers = (await this.fetchPresignedUrl(jsonRespose.signedUrlGet));
      await this.fetchPresignedUrlDelete(jsonRespose.signedUrlDelete)

        // this.renderAppropriateStream(startDate, endDate);
      // const jsonRespose = JSON.parse(xhr.responseText);
      //console.log(jsonRespose);
      return registers;
      
    }

  }

  fetchAndYearlyRenderUserCalendar_2 = async(startDate: string = "", endDate: string = "", searchString: string = "") => {

    let path = "", view = "";

    if(this.tagId != null && this.tagId != "") {
      view = "tag";
    } else if(this.countryId != null && this.countryId != "") {
      view = "country";
    } else if(this.locationId != null && this.locationId != "") {
      view = "location";
    } else {
      view = "entity";
    }

    path = "getallcountryevents";

    let sDate = "";
    let eDate = "";

    //console.log('currenttab', this.getCurrentTab());

    if(this.getCurrentTab() == this.TAB_YEAR) {
      sDate = "03/31/" + this.calendarStartYYYY;
      eDate = "04/01/" + (parseInt(this.calendarStartYYYY) + 1);
    } else {
      sDate = startDate;
      eDate = endDate;
    }


    let url = "https://"+this.apiId+"/"+ path;
    
    //console.log('fetch calendar url', url);
    let urlBody :any = {"projectid": this.projectId, "userprofileid": this.userProfileId, "role": this.myRole, "entityid": this.entityId, "countryid": this.countryId, "functionid": this.functionId, "locationid": this.locationId, "tagid": this.tagId, "adhoc": "false", "exclusivestartkey": 0, "sdate": sDate, "edate": eDate, "view": view, "year": this.calendarStartYYYY};

    if(searchString.length > 0) {
      urlBody["searchstring"] = searchString;
    }

    //console.log('urlbody', urlBody);

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(urlBody, url, this._SfLoader, authorization, 'Preparing')) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log('jsonRespose', jsonRespose);
      this.events = (await this.fetchPresignedUrl(jsonRespose.signedUrlGet));
      await this.fetchPresignedUrlDelete(jsonRespose.signedUrlDelete)

        this.renderAppropriateStream(startDate, endDate);

        // this.events = {}
        // this.events = {...JSON.parse(JSON.stringify(jsonRespose.data.events))};

        // let lastEvaluatedKey = jsonRespose.lastEvaluatedKey;

        // //console.log('lastevaluatedkey0', lastEvaluatedKey);

        // var recallCount = 0;

        // do {

        //   if(recallCount > 3) break;

        //   if(lastEvaluatedKey != null) {

        //     let urlBody2 : any = {"projectid": this.projectId, "userprofileid": this.userProfileId, "role": this.myRole, "entityid": this.entityId, "countryid": this.countryId, "functionid": this.functionId, "locationid": this.locationId, "tagid": this.tagId, "adhoc": "false", "exclusivestartkey": lastEvaluatedKey, "sdate": sDate, "edate": eDate, "view": view, "year": this.calendarStartYYYY}

        //     if(searchString.length > 0) {
        //       urlBody2["searchstring"] = searchString;
        //     }

        //     const xhr2 : any = (await this.prepareXhr(urlBody2, url, this._SfLoader, authorization)) as any;
        //     this._SfLoader.innerHTML = '';

        //     if(xhr2.status == 200) {

        //       const jsonRespose2 = JSON.parse(xhr2.responseText);

        //       for(var i = 0; i < Object.keys(JSON.parse(JSON.stringify(jsonRespose2.data.events))).length; i++) {

        //         const key = Object.keys(JSON.parse(JSON.stringify(jsonRespose2.data.events)))[i];
        //         this.events[key].push(...JSON.parse(JSON.stringify(jsonRespose2.data.events))[key]);

        //       }

        //       //console.log('consolidated', this.events)
              
        //       //console.log(jsonRespose2);

        //       this.renderAppropriateStream(startDate, endDate);

        //       lastEvaluatedKey = jsonRespose2.lastEvaluatedKey;
        //       //console.log('lastevaluatedkey1', lastEvaluatedKey);

        //     } else {
        //       //console.log('calendar fetching error breaking');
        //       break;
        //     }

        //   } else {
        //     //console.log('calendar fetching breaking');
        //     break;
        //   }

        // } while(1)


      
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

    let url = "https://"+this.apiId+"/getuserevents";

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.projectId, "userprofileid": this.userProfileId, "role": this.myRole}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.showChosenProject();
      //console.log(jsonRespose);
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

    let url = "https://3mefupehxkw4pwsq3oyk7lf2pq0pisdx.lambda-url.us-east-1.on.aws/getcalendar";

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": (this._SfProject[0].querySelector('#sf-i-project') as SfIForm).selectedValues()[0]}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.showChosenProject();
      (this._SfTitleChosenProject as HTMLElement).innerHTML = this.truncate((this._SfProject[0].querySelector('#sf-i-project') as SfIForm).selectedTexts()[0], 20, true);
      this.events = JSON.parse(jsonRespose.data.value.events)
      // //console.log(events);
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

    let url = "https://"+this.apiId+"/reprogramtrigger";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": this.mode == "admin" ? (this._SfProject[0].querySelector('#sf-i-project') as SfIForm).selectedValues()[0] : this.projectId}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      // const jsonRespose = JSON.parse(xhr.responseText);
      //console.log(jsonRespose);
      
    } else {

      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
      this.fetchList();
      setTimeout(() => {
        this.clearMessages();
      }, 3000);

    }
  }

  fetchAdhoc = async () => {

    let path = "getallmyevents", view = "";

    if(this.tagId != null && this.tagId != "") {
      view = "tag";
    } else if(this.countryId != null && this.countryId != "") {
      view = "country";
    } else if(this.locationId != null && this.locationId != "") {
      view = "location";
    } else {
      view = "entity";
    }

    let url = "https://"+this.apiId+"/"+ path;
    let urlBody = {"projectid": this.projectId, "userprofileid": this.userProfileId, "role": this.myRole, "entityid": this.entityId, "countryid": this.countryId, "functionid": this.functionId, "locationid": this.locationId, "tagid": this.tagId, "adhoc": "true", "year": this.calendarStartYYYY, "view": view};

    //console.log('urlbody', urlBody);

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(urlBody, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      return jsonRespose;

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

    let url = "https://"+this.apiId+"/getunmappedevents";

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"projectid": (this._SfProject[0].querySelector('#sf-i-project') as SfIForm).selectedValues()[0], "role": this.myRole}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      //console.log(jsonRespose);
      this.unmappedEvents = jsonRespose.data.unmappedEvents;
      this.mappings = jsonRespose.data.mappings;
      //console.log('mappings-1', 'fetcheventmap', this.mappings)
      //console.log('mappings0', 'fetcheventmap', this.mappedValuesUsers)
      this.renderMapping( this.unmappedEvents)
      //console.log('mappings1', 'fetcheventmap', this.mappedValuesUsers)
      this.prepopulateMapping(this.mappings);
      //console.log('mappings2', 'fetcheventmap', this.mappedValuesUsers)
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

    //console.log('calendar fetching list', this.apiIdList);

    const body: any = this.getApiBodyList();

    if(this.apiIdList != null) {

      body.id = (this._SfProject[0].querySelector('#sf-i-project') as SfIForm).selectedValues()[0];

      let url = "https://"+this.apiIdList+"/" + this.apiMethodList;

      //console.log('fetch events url', url);

      const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
      const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
      this._SfLoader.innerHTML = '';

      //console.log('fetch events body', body);

      if(xhr.status == 200) {

        const jsonRespose = JSON.parse(xhr.responseText);

        //console.log('list response', JSON.stringify(jsonRespose));

        const fieldArr = JSON.parse(jsonRespose.data.value[this.apiResponseFieldList]) as Array<string>;
        this.events = null;
        for(var i = 0; i < fieldArr.length; i++) {

          //console.log('events', fieldArr[i]);
          await this.fetchDetail(fieldArr[i])

        }

        //console.log('all events processed');
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

    //console.log('startDate', startDate);
    
    do {

      this.calendar.push(startDate);
      startDate.setDate(startDate.getDate() + 1);

      newDate = ("0" + startDate.getDate()).slice(-2);
      newMonth = ("0" + startDate.getMonth()).slice(-2);
      newYear = (startDate.getFullYear());

    } while(!(newDate == this.calendarStartDD && newMonth == (("0" + ((parseInt(this.calendarStartMM) - 1) + "")).slice(-2)) && newYear === (parseInt(this.calendarStartYYYY) + 1)));

    //console.log(this.calendar);

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

  isAdmin = () => {
    return Util.readCookie('admin') == "true"
  }

  initDecryptView = () => {
    if(this.isAdmin()){
      let divsArr = this._SfDecryptContainer.querySelectorAll("#decrypt-container > div")
      console.log('decrypt divs',divsArr);
      for(let divElement of divsArr){
        (divElement as HTMLElement).classList.remove('hide');
      }
      this.initDecryptListeners()
    } else {
      let divsArr = this._SfDecryptContainer.querySelectorAll("#decrypt-container > div")
      console.log('decrypt divs',divsArr);
      for(let divElement of divsArr){
        (divElement as HTMLElement).classList.add('hide');
      }
    }
  }

  initDecryptListeners = () => {
    (this._SfDecryptProjectInput as SfIForm).addEventListener('valueChanged',() => {
      let projectId = (this._SfDecryptProjectInput as SfIForm).selectedValues()[0]
      this.decryptProjectId = projectId.split(';')[projectId.split(';').length - 1];
      this.evalDecrypt()
    });
    (this._SfDecryptFileInput as HTMLInputElement).addEventListener('keyup',() => {
      console.log('keyup called');
      this.decryptFileName = (this._SfDecryptFileInput as HTMLInputElement).value;
      this.evalDecrypt()
    });
    (this._SfDecryptButton as HTMLButtonElement).addEventListener('click', () => {
      console.log('decrypt clicked', this.decryptProjectId, this.decryptFileName);
      this.submitDecrypt()
    })
  }

  evalDecrypt = () => {
    console.log((this._SfDecryptFileInput as HTMLInputElement))
    console.log('evalDecrypt', this.decryptProjectId, this.decryptFileName)
    if(this.decryptProjectId != null && this.decryptProjectId != "" && this.decryptFileName != null && this.decryptFileName.length > 3){
      (this._SfDecryptContainer?.querySelector('#button-decrypt') as HTMLButtonElement).removeAttribute('disabled');
    }else{
      (this._SfDecryptContainer?.querySelector('#button-decrypt') as HTMLButtonElement).setAttribute('disabled', 'true');
    }
  }

  submitDecrypt = async () => {

    this.clearMessages();

    console.log('submitDecrypt called');

    const body: any = {};
    let url = "https://"+this.apiId+"/getdecryptedjson";

    body["projectid"] = this.decryptProjectId; 
    body["key"] = this.decryptFileName + ".json"; 

    console.log(body);
    console.log(JSON.stringify(body));

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {
      const jsonRespose = JSON.parse(xhr.responseText);
      let data = await this.fetchPresignedUrl(jsonRespose.signedUrlGet);
      await this.fetchPresignedUrlDelete(jsonRespose.signedUrlDelete)
      console.log('decrypt response', jsonRespose)
      this.setSuccess('Operation Successful!');
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
      a.download = this.decryptFileName + ".json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a); 

      setTimeout(() => {
        this.clearMessages();
      }, 2000);
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
      setTimeout(() => {
        this.clearMessages();
      }, 5000);
    }

  }

  loadMode = async () => {

    Chart.register(...registerables);
    //Chart.register(Colors);

    if(this.mode == "rcmnotifications") {

      this.loadRcmNotifications();
      

    } else if(this.mode == "rcm") {

      this.renderRcmTabs();
      ((this._SfRcmTabContainer as HTMLDivElement).querySelector('#rcm-tab-compliances') as HTMLButtonElement).click();

    } else if(this.mode == "onboarding") {

      //this.myOnboardingTab = this.TAB_STATUTES;
      
      this.renderOnboardingTabs();
      // this.clickOnboardingTabs();
      //this.loadOnboardingStatutes();
      //((this._SfOnboardingTabContainer as HTMLDivElement).querySelector('#onboarding-tab-compliances') as HTMLButtonElement).click();

    } else if(this.mode == "admin") {

      this.showChooseProject();
      this.initListenersAdmin();

    } else if(this.mode == "downloader"){
      setTimeout(()=>{
        this.initDecryptView();
      }, 500)
    }  else {

      this.flowGraph = this.FLOW_GRAPH_COMPLIANCE;
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

      //console.log('stream received', this.stream, this.TAB_STREAM, this.TAB_YEAR);

      if(this.stream == this.TAB_YEAR) {
        this.renderTabs(this.TAB_YEAR);
        ((this._SfTabContainer as HTMLDivElement).querySelector('#calendar-tab-year') as HTMLButtonElement)?.click();
      } else {
        //console.log('stream received rendering year', this.stream);
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

    if(this.mode == "rcmnotifications") {

      return html`
          
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <div class="SfIEventsC">
          
          <div class="d-flex justify-center">
              <div class="loader-element"></div>
          </div>
          
          <div class="d-flex justify-center mb-20 flex-wrap" part="rcm-container" id="rcm-container">

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

    } else if(this.mode == "rcm") {

      return html`
          
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <div class="SfIEventsC">
          
          <div class="d-flex justify-center">
              <div class="loader-element"></div>
          </div>
          
          <div class="d-flex justify-center mb-20 flex-wrap" id="rcm-tab-container">

          </div>
          
          <div class="d-flex justify-center">
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch w-100" id="rcm-compliance-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch w-100" id="rcm-projects-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch w-100" id="rcm-date-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch w-100" id="rcm-confirm-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch w-100" id="rcm-jobs-container">
              
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

    } else if(this.mode == "onboarding") {

      return html`
          
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <div class="SfIEventsC">
          
          <div class="d-flex justify-center">
              <div class="loader-element"></div>
          </div>
          
          <div class="d-flex mb-20 flex-wrap" id="onboarding-status-container">

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
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="extensions-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="alertschedules-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="activations-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="invalidations-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="triggers-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="internalcontrols-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="signoff-container">
              
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

    } else if(this.mode == "downloader") {

      return html`
          
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        <div class="SfIEventsC">
          <div class="d-flex justify-center">
              <h1 part="title">${this.name}</h1>
          </div>
          <div id="decrypt-container" class="d-flex flex-col justify-center mt-20">
            <div class="d-flex mb-10">
              <div class="lb" part="lb"></div>
              <div class="d-flex align-end justify-between flex-grow">
                <div class="d-flex flex-col">
                  <sf-i-form id="sf-i-project-decrypt" class="mr-10" name="Projects" label="Select Project *" apiid="dnytrdlrmxgsy.cloudfront.net/project" mode="multiselect-dropdown" selectprojection="name" searchphrase="" ignoreprojections="[&quot;locations&quot;,&quot;plan&quot;,&quot;logo&quot;,&quot;shortid&quot;,&quot;plan&quot;]" mandatory="">
                  </sf-i-form>
                </div>
                <div class="d-flex flex-col">
                  <label>Decrypt Utility</label>
                  <div class="d-flex align-end">
                    <input part="input" id="input-decrypt" type="text" placeholder="file key" />.json&nbsp;&nbsp;
                    <button id="button-decrypt" part="button-icon-small" class="material-icons button-icon" disabled>download</button>
                  </div>
                  <div class="loader-element"></div>
                </div>
              </div>
              <div class="rb" part="rb"></div>
            </div>
            <div class="d-flex justify-center">
              <div class="lb" part="lb"></div>
              <div class="d-flex flex-col">
                <div class="d-flex justify-center gone">
                </div>
                <div class="div-row-error div-row-submit gone">
                  <div part="errormsg" class="div-row-error-message"></div>
                </div>
                <div class="div-row-success div-row-submit">
                  <div part="successmsg" class="div-row-success-message"></div>
                </div>
                <div class="div-row-notif div-row-submit">
                  <div part="notifmsg" class="div-row-notif-message"></div>
                </div>
              </div>
              <div class="rb" part="rb"></div>
            </div>
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
          
          <div class="d-flex justify-center" id="tab-container">

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
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="find-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="adhoc-container">
              
            </div>
            <div class="d-flex flex-grow flex-wrap justify-start align-stretch scroll-x" id="register-container">
              
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
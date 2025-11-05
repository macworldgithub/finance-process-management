// "use client";
// import React from "react";
// import { ColumnsType } from "antd/es/table";
// import { Menu, Dropdown, Checkbox } from "antd";
// import { DownOutlined } from "@ant-design/icons";
// import { DataType } from "./types";

// export const stageOptions = [
//   { label: "Initiation", key: "Initiation" },
//   { label: "Processing", key: "Processing" },
//   { label: "Completed", key: "Completed" },
// ];

// export const severityOptions = [
//   { label: "Catastrophic", key: "Catastrophic" },
//   { label: "Major", key: "Major" },
//   { label: "Moderate", key: "Moderate" },
//   { label: "Minor", key: "Minor" },
//   { label: "Insignificant", key: "Insignificant" },
// ];

// // small helper to build a Menu component for Dropdowns
// const buildMenu = (
//   items: { label: string; key: string }[],
//   onClick?: (key: string) => void
// ) => {
//   return (
//     <Menu
//       onClick={(info) => {
//         onClick?.(String(info.key));
//       }}
//       items={items as any}
//     />
//   );
// };

// export function getColumns(
//   activeTab: string,
//   activeSubTab: string,
//   handlers?: {
//     onStageChange?: (key: string, rowKey: string) => void;
//     onSelectGeneric?: (key: string, rowKey: string, field?: string) => void;
//   }
// ): ColumnsType<DataType> {
//   const baseColumns: ColumnsType<DataType> = [
//     {
//       title: "No.",
//       dataIndex: "no",
//       key: "no",
//       width: 80,
//       fixed: "left",
//     },
//     {
//       title: "Process",
//       dataIndex: "process",
//       key: "process",
//       width: 300,
//       fixed: "left",
//     },
//   ];

//   const processColumns: ColumnsType<DataType> = [
//     {
//       title: "Process Description",
//       dataIndex: "processDescription",
//       key: "processDescription",
//       width: 300,
//     },
//     {
//       title: "Process Objective",
//       dataIndex: "processObjective",
//       key: "processObjective",
//       width: 300,
//     },
//     {
//       title: "Process Severity Levels",
//       dataIndex: "processSeverityLevels",
//       key: "processSeverityLevels",
//       width: 200,
//     },
//   ];

//   const ownershipColumns: ColumnsType<DataType> = [
//     { title: "Activity", dataIndex: "activity", key: "activity", width: 250 },
//     { title: "Process", dataIndex: "process2", key: "process2", width: 250 },
//     {
//       title: "Process Stage",
//       dataIndex: "stage",
//       key: "stage",
//       width: 180,
//       render: (text: any, record: DataType) => {
//         const menu = buildMenu(stageOptions, (key) =>
//           handlers?.onStageChange?.(key, record.key)
//         );
//         return (
//           <Dropdown overlay={menu} trigger={["click"]}>
//             <div className="flex items-center cursor-pointer">
//               {text}
//               <DownOutlined className="ml-1 text-gray-500 text-xs" />
//             </div>
//           </Dropdown>
//         );
//       },
//     },
//     {
//       title: "Functions",
//       dataIndex: "functions",
//       key: "functions",
//       width: 150,
//     },
//     {
//       title: "Client Segment",
//       dataIndex: "clientSegment",
//       key: "clientSegment",
//       width: 180,
//     },
//     {
//       title: "Operational Unit",
//       dataIndex: "operationalUnit",
//       key: "operationalUnit",
//       width: 180,
//     },
//     { title: "Division", dataIndex: "division", key: "division", width: 150 },
//     { title: "Entity", dataIndex: "entity", key: "entity", width: 150 },
//     {
//       title: "Unit / Department",
//       dataIndex: "unitDepartment",
//       key: "unitDepartment",
//       width: 180,
//     },
//     {
//       title: "Product Class",
//       dataIndex: "productClass",
//       key: "productClass",
//       width: 150,
//     },
//     {
//       title: "Product Name",
//       dataIndex: "productName",
//       key: "productName",
//       width: 180,
//     },
//   ];

//   const cosoColumns: ColumnsType<DataType> = [
//     {
//       title: "Integrity & Ethical Values",
//       dataIndex: "integrityEthical",
//       key: "integrityEthical",
//       width: 200,
//       render: (checked: boolean) => (
//         <Checkbox checked={checked} className="flex justify-center" />
//       ),
//     },
//     {
//       title: "Board Oversight",
//       dataIndex: "boardOversight",
//       key: "boardOversight",
//       width: 180,
//       render: (checked: boolean) => (
//         <Checkbox checked={checked} className="flex justify-center" />
//       ),
//     },
//     {
//       title: "Organizational Structure",
//       dataIndex: "orgStructure",
//       key: "orgStructure",
//       width: 200,
//       render: (checked: boolean) => (
//         <Checkbox checked={checked} className="flex justify-center" />
//       ),
//     },
//     {
//       title: "Commitment to Competence",
//       dataIndex: "commitmentCompetence",
//       key: "commitmentCompetence",
//       width: 220,
//       render: (checked: boolean) => (
//         <Checkbox checked={checked} className="flex justify-center" />
//       ),
//     },
//     {
//       title: "Management Philosophy",
//       dataIndex: "managementPhilosophy",
//       key: "managementPhilosophy",
//       width: 200,
//       render: (checked: boolean) => (
//         <Checkbox checked={checked} className="flex justify-center" />
//       ),
//     },
//   ];

//   const intosaiColumns: ColumnsType<DataType> = [
//     {
//       title: "Integrity and Ethical Values",
//       dataIndex: "integrityEthical",
//       key: "integrityEthical",
//       width: 200,
//       render: (checked: boolean) => (
//         <Checkbox checked={checked} className="flex justify-center" />
//       ),
//     },
//     {
//       title: "Commitment to Competence",
//       dataIndex: "commitmentCompetence",
//       key: "commitmentCompetence",
//       width: 200,
//       render: (checked: boolean) => (
//         <Checkbox checked={checked} className="flex justify-center" />
//       ),
//     },
//     {
//       title: "Management's Philosophy and Operating Style",
//       dataIndex: "managementPhilosophy",
//       key: "managementPhilosophy",
//       width: 200,
//       render: (checked: boolean) => (
//         <Checkbox checked={checked} className="flex justify-center" />
//       ),
//     },
//     {
//       title: "Organizational Structure",
//       dataIndex: "orgStructure",
//       key: "orgStructure",
//       width: 200,
//       render: (checked: boolean) => (
//         <Checkbox checked={checked} className="flex justify-center" />
//       ),
//     },
//     {
//       title: "Assignment of Authority",
//       dataIndex: "assignmentAuthority",
//       key: "assignmentAuthority",
//       width: 200,
//       render: (checked: boolean) => (
//         <Checkbox checked={checked} className="flex justify-center" />
//       ),
//     },
//     {
//       title: "HR Policies and Practices",
//       dataIndex: "hrPolicies",
//       key: "hrPolicies",
//       width: 200,
//       render: (checked: boolean) => (
//         <Checkbox checked={checked} className="flex justify-center" />
//       ),
//     },
//     {
//       title: "Board/Audit Committee",
//       dataIndex: "boardAudit",
//       key: "boardAudit",
//       width: 200,
//       render: (checked: boolean) => (
//         <Checkbox checked={checked} className="flex justify-center" />
//       ),
//     },
//     {
//       title: "Management Control Methods",
//       dataIndex: "managementControl",
//       key: "managementControl",
//       width: 220,
//       render: (checked: boolean) => (
//         <Checkbox checked={checked} className="flex justify-center" />
//       ),
//     },
//     {
//       title: "External Influences",
//       dataIndex: "externalInfluences",
//       key: "externalInfluences",
//       width: 180,
//       render: (checked: boolean) => (
//         <Checkbox checked={checked} className="flex justify-center" />
//       ),
//     },
//     {
//       title: "Commitment to Internal Control",
//       dataIndex: "commitmentInternal",
//       key: "commitmentInternal",
//       width: 220,
//       render: (checked: boolean) => (
//         <Checkbox checked={checked} className="flex justify-center" />
//       ),
//     },
//     {
//       title: "Enforcement of Integrity",
//       dataIndex: "enforcementIntegrity",
//       key: "enforcementIntegrity",
//       width: 200,
//       render: (checked: boolean) => (
//         <Checkbox checked={checked} className="flex justify-center" />
//       ),
//     },
//     {
//       title: "Employee Awareness",
//       dataIndex: "employeeAwareness",
//       key: "employeeAwareness",
//       width: 180,
//       render: (checked: boolean) => (
//         <Checkbox checked={checked} className="flex justify-center" />
//       ),
//     },
//     {
//       title: "Accountability & Performance",
//       dataIndex: "accountability",
//       key: "accountability",
//       width: 220,
//       render: (checked: boolean) => (
//         <Checkbox checked={checked} className="flex justify-center" />
//       ),
//     },
//     {
//       title: "Commitment to Transparency",
//       dataIndex: "commitmentTransparency",
//       key: "commitmentTransparency",
//       width: 220,
//       render: (checked: boolean) => (
//         <Checkbox checked={checked} className="flex justify-center" />
//       ),
//     },
//   ];

//   const otherEnvColumns: ColumnsType<DataType> = [
//     {
//       title: "Responsibility Delegation Matrix",
//       dataIndex: "responsibilityMatrix",
//       key: "responsibilityMatrix",
//       width: 220,
//       render: (checked: boolean) => (
//         <Checkbox checked={checked} className="flex justify-center" />
//       ),
//     },
//     {
//       title: "Segregation of Duties",
//       dataIndex: "segregationDuties",
//       key: "segregationDuties",
//       width: 200,
//       render: (checked: boolean) => (
//         <Checkbox checked={checked} className="flex justify-center" />
//       ),
//     },
//     {
//       title: "Reporting Lines",
//       dataIndex: "reportingLines",
//       key: "reportingLines",
//       width: 150,
//       render: (checked: boolean) => (
//         <Checkbox checked={checked} className="flex justify-center" />
//       ),
//     },
//     {
//       title: "Mission",
//       dataIndex: "mission",
//       key: "mission",
//       width: 120,
//       render: (checked: boolean) => (
//         <Checkbox checked={checked} className="flex justify-center" />
//       ),
//     },
//     {
//       title: "Vision and Values",
//       dataIndex: "visionValues",
//       key: "visionValues",
//       width: 180,
//       render: (checked: boolean) => (
//         <Checkbox checked={checked} className="flex justify-center" />
//       ),
//     },
//     {
//       title: "Goals and Objectives",
//       dataIndex: "goalsObjectives",
//       key: "goalsObjectives",
//       width: 180,
//       render: (checked: boolean) => (
//         <Checkbox checked={checked} className="flex justify-center" />
//       ),
//     },
//     {
//       title: "Structures & Systems",
//       dataIndex: "structuresSystems",
//       key: "structuresSystems",
//       width: 180,
//       render: (checked: boolean) => (
//         <Checkbox checked={checked} className="flex justify-center" />
//       ),
//     },
//     {
//       title: "Policies and Procedures",
//       dataIndex: "policiesProcedures",
//       key: "policiesProcedures",
//       width: 200,
//       render: (checked: boolean) => (
//         <Checkbox checked={checked} className="flex justify-center" />
//       ),
//     },
//     {
//       title: "Processes",
//       dataIndex: "processes",
//       key: "processes",
//       width: 150,
//       render: (checked: boolean) => (
//         <Checkbox checked={checked} className="flex justify-center" />
//       ),
//     },
//     {
//       title: "Integrity and Ethical Values",
//       dataIndex: "integrityEthical",
//       key: "integrityEthical",
//       width: 220,
//       render: (checked: boolean) => (
//         <Checkbox checked={checked} className="flex justify-center" />
//       ),
//     },
//     {
//       title: "Oversight Structure",
//       dataIndex: "oversightStructure",
//       key: "oversightStructure",
//       width: 180,
//       render: (checked: boolean) => (
//         <Checkbox checked={checked} className="flex justify-center" />
//       ),
//     },
//     {
//       title: "Standards",
//       dataIndex: "standards",
//       key: "standards",
//       width: 150,
//       render: (checked: boolean) => (
//         <Checkbox checked={checked} className="flex justify-center" />
//       ),
//     },
//     {
//       title: "Methodologies",
//       dataIndex: "methodologies",
//       key: "methodologies",
//       width: 150,
//       render: (checked: boolean) => (
//         <Checkbox checked={checked} className="flex justify-center" />
//       ),
//     },
//     {
//       title: "Rules and Regulations",
//       dataIndex: "rulesRegulations",
//       key: "rulesRegulations",
//       width: 200,
//       render: (checked: boolean) => (
//         <Checkbox checked={checked} className="flex justify-center" />
//       ),
//     },
//   ];

//   const riskAssessmentInherentColumns: ColumnsType<DataType> = [
//     { title: "Risk Type", dataIndex: "riskType", key: "riskType", width: 200 },
//     {
//       title: "Risk Description",
//       dataIndex: "riskDescription",
//       key: "riskDescription",
//       width: 300,
//     },
//     {
//       title: "Severity / Impact",
//       dataIndex: "severityImpact",
//       key: "severityImpact",
//       width: 180,
//       render: (text: any, record: DataType) => {
//         const menu = buildMenu(severityOptions, (key) =>
//           handlers?.onSelectGeneric?.(key, record.key, "severityImpact")
//         );
//         return (
//           <Dropdown overlay={menu} trigger={["click"]}>
//             <div className="flex items-center cursor-pointer">
//               {text || "Select"}
//               <DownOutlined className="ml-1 text-gray-500 text-xs" />
//             </div>
//           </Dropdown>
//         );
//       },
//     },
//     {
//       title: "Probability / Likelihood",
//       dataIndex: "probabilityLikelihood",
//       key: "probabilityLikelihood",
//       width: 200,
//       render: (text: any, record: DataType) => {
//         const probabilityOptions = [
//           { label: "Certain", key: "certain" },
//           { label: "Likely", key: "likely" },
//           { label: "Possible", key: "possible" },
//           { label: "Unlikely", key: "unlikely" },
//           { label: "Rare", key: "rare" },
//         ];
//         const menu = buildMenu(probabilityOptions, (key) =>
//           handlers?.onSelectGeneric?.(key, record.key, "probabilityLikelihood")
//         );
//         return (
//           <Dropdown overlay={menu} trigger={["click"]}>
//             <div className="flex items-center cursor-pointer">
//               {text || "Select"}
//               <DownOutlined className="ml-1 text-gray-500 text-xs" />
//             </div>
//           </Dropdown>
//         );
//       },
//     },
//     {
//       title: "Classification",
//       dataIndex: "classification",
//       key: "classification",
//       width: 150,
//       render: (text: any, record: DataType) => {
//         const classificationOptions = [
//           { label: "Critical", key: "critical" },
//           { label: "High", key: "high" },
//           { label: "Moderate", key: "moderate" },
//           { label: "Low", key: "low" },
//           { label: "Lowest", key: "lowest" },
//         ];
//         const menu = buildMenu(classificationOptions, (key) =>
//           handlers?.onSelectGeneric?.(key, record.key, "classification")
//         );
//         return (
//           <Dropdown overlay={menu} trigger={["click"]}>
//             <div className="flex items-center cursor-pointer">
//               {text || "Select"}
//               <DownOutlined className="ml-1 text-gray-500 text-xs" />
//             </div>
//           </Dropdown>
//         );
//       },
//     },
//   ];

//   //   const riskResponsesColumns: ColumnsType<DataType> = [
//   //     {
//   //       title: "Type of Risk Response",
//   //       dataIndex: "riskResponseType",
//   //       key: "riskResponseType",
//   //       width: 300,
//   //       render: (text: any, record: DataType) => {
//   //         const responseOptions = [
//   //           { label: "Avoid", key: "avoid" },
//   //           { label: "Mitigate", key: "mitigate" },
//   //           { label: "Transfer", key: "transfer" },
//   //           { label: "Share", key: "share" },
//   //           { label: "Accept", key: "accept" },
//   //         ];
//   //         const menu = buildMenu(responseOptions, (key) =>
//   //           handlers?.onSelectGeneric?.(key, record.key, "riskResponseType")
//   //         );
//   //         return (
//   //           <Dropdown overlay={menu} trigger={["click"]}>
//   //             <div className="flex items-center cursor-pointer">
//   //               {text || "Select"}
//   //               <DownOutlined className="ml-1 text-gray-500 text-xs" />
//   //             </div>
//   //           </Dropdown>
//   //         );
//   //       },
//   //     },
//   //   ];

//   const riskResponsesColumns: ColumnsType<DataType> = [
//     {
//       title: "Type of Risk Response",
//       dataIndex: "riskResponseType",
//       key: "riskResponseType",
//       width: 300,
//       render: (text: any, record: DataType) => {
//         const responseOptions = [
//           { label: "Avoid", key: "Avoid" },
//           { label: "Mitigate", key: "Mitigate" },
//           { label: "Transfer", key: "Transfer" },
//           { label: "Share", key: "Share" },
//           { label: "Accept", key: "Accept" },
//         ];
//         const menu = buildMenu(responseOptions, (key) =>
//           handlers?.onSelectGeneric?.(key, record.key, "riskResponseType")
//         );
//         return (
//           <Dropdown overlay={menu} trigger={["click"]}>
//             <div className="flex items-center cursor-pointer">
//               {text || "Select"}
//               <DownOutlined className="ml-1 text-gray-500 text-xs" />
//             </div>
//           </Dropdown>
//         );
//       },
//     },
//   ];

//   // const controlActivitiesColumns: ColumnsType<DataType> = [
//   //   {
//   //     title: "Control Objectives",

//   //     dataIndex: "controlObjectives",
//   //     key: "controlObjectives",
//   //     width: 250,
//   //   },
//   //   {
//   //     title: "Control Ref",
//   //     dataIndex: "controlRef",
//   //     key: "controlRef",
//   //     width: 150,
//   //   },
//   //   {
//   //     title: "Control Definition",
//   //     dataIndex: "controlDefinition",
//   //     key: "controlDefinition",
//   //     width: 250,
//   //   },
//   //   {
//   //     title: "Control Description",
//   //     dataIndex: "controlDescription",
//   //     key: "controlDescription",
//   //     width: 300,
//   //   },
//   //   {
//   //     title: "Control Responsibility",
//   //     dataIndex: "controlResponsibility",
//   //     key: "controlResponsibility",
//   //     width: 200,
//   //   },
//   //   {
//   //     title: "Key Control",
//   //     dataIndex: "keyControl",
//   //     key: "keyControl",
//   //     width: 150,
//   //     render: (checked: boolean) => (
//   //       <Checkbox checked={checked} className="flex justify-center" />
//   //     ),
//   //   },
//   // ];

//   const controlActivitiesColumns: ColumnsType<DataType> = [
//     {
//       title: "Control Objectives",
//       dataIndex: "controlObjectives",
//       key: "controlObjectives",
//       width: 320,
//       render: (text: string) => (
//         <div style={{ whiteSpace: "pre-line", lineHeight: "1.4" }}>{text}</div>
//       ),
//     },
//     {
//       title: "Control Ref",
//       dataIndex: "controlRef",
//       key: "controlRef",
//       width: 100,
//       align: "center" as const,
//       render: () => "—",
//     },
//     {
//       title: "Control Definition",
//       dataIndex: "controlDefinition",
//       key: "controlDefinition",
//       width: 300,
//       render: (text: string) => (
//         <div style={{ whiteSpace: "pre-line", lineHeight: "1.4" }}>{text}</div>
//       ),
//     },
//     {
//       title: "Control Description",
//       dataIndex: "controlDescription",
//       key: "controlDescription",
//       width: 320,
//       render: (text: string) => (
//         <div style={{ whiteSpace: "pre-line", lineHeight: "1.4" }}>{text}</div>
//       ),
//     },
//     {
//       title: "Control Responsibility",
//       dataIndex: "controlResponsibility",
//       key: "controlResponsibility",
//       width: 180,
//     },
//     {
//       title: "Key Control",
//       dataIndex: "keyControl",
//       key: "keyControl",
//       width: 110,
//       align: "center" as const,
//       render: () => "Yes",
//     },
//     {
//       title: "Zero Tolerance",
//       dataIndex: "zeroTolerance",
//       key: "zeroTolerance",
//       width: 130,
//       align: "center" as const,
//       render: () => "Yes",
//     },
//   ];

//   const controlAssessmentColumns: ColumnsType<DataType> = [
//     {
//       title: "Level of Responsibility",
//       dataIndex: "levelResponsibility",
//       key: "levelResponsibility",
//       width: 200,
//     },
//     {
//       title: "COSO Principle #",
//       dataIndex: "cosoPrinciple",
//       key: "cosoPrinciple",
//       width: 150,
//     },
//     {
//       title: "Operational Approach",
//       dataIndex: "operationalApproach",
//       key: "operationalApproach",
//       width: 200,
//       render: (text: any, record: DataType) => {
//         const approachOptions = [
//           { label: "Automated", key: "automated" },
//           { label: "Manual", key: "manual" },
//         ];
//         const menu = buildMenu(approachOptions, (key) =>
//           handlers?.onSelectGeneric?.(key, record.key, "operationalApproach")
//         );
//         return (
//           <Dropdown overlay={menu} trigger={["click"]}>
//             <div className="flex items-center cursor-pointer">
//               {text || "Select"}
//               <DownOutlined className="ml-1 text-gray-500 text-xs" />
//             </div>
//           </Dropdown>
//         );
//       },
//     },
//     {
//       title: "Operational Frequency",
//       dataIndex: "operationalFrequency",
//       key: "operationalFrequency",
//       width: 200,
//     },
//     {
//       title: "Control Classification",
//       dataIndex: "controlClassification",
//       key: "controlClassification",
//       width: 200,
//       render: (text: any, record: DataType) => {
//         const classificationOptions = [
//           { label: "Preventive", key: "preventive" },
//           { label: "Detective", key: "detective" },
//           { label: "Corrective", key: "corrective" },
//         ];
//         const menu = buildMenu(classificationOptions, (key) =>
//           handlers?.onSelectGeneric?.(key, record.key, "controlClassification")
//         );
//         return (
//           <Dropdown overlay={menu} trigger={["click"]}>
//             <div className="flex items-center cursor-pointer">
//               {text || "Select"}
//               <DownOutlined className="ml-1 text-gray-500 text-xs" />
//             </div>
//           </Dropdown>
//         );
//       },
//     },
//   ];

//   const riskAssessmentResidualColumns: ColumnsType<DataType> =
//     riskAssessmentInherentColumns;

//   const soxColumns: ColumnsType<DataType> = [
//     {
//       title: "SOX Control Activity",
//       dataIndex: "soxControlActivity",
//       key: "soxControlActivity",
//       width: 250,
//     },
//     {
//       title: "Internal Control Over Financial Reporting?",
//       dataIndex: "internalControlFinancial",
//       key: "internalControlFinancial",
//       width: 280,
//       render: (checked: boolean) => (
//         <Checkbox checked={checked} className="flex justify-center" />
//       ),
//     },
//     {
//       title: "Occurrence",
//       dataIndex: "occurrence",
//       key: "occurrence",
//       width: 150,
//       render: (checked: boolean) => (
//         <Checkbox checked={checked} className="flex justify-center" />
//       ),
//     },
//     {
//       title: "Completeness",
//       dataIndex: "completeness",
//       key: "completeness",
//       width: 150,
//       render: (checked: boolean) => (
//         <Checkbox checked={checked} className="flex justify-center" />
//       ),
//     },
//     {
//       title: "Accuracy",
//       dataIndex: "accuracy",
//       key: "accuracy",
//       width: 150,
//       render: (checked: boolean) => (
//         <Checkbox checked={checked} className="flex justify-center" />
//       ),
//     },
//     {
//       title: "Authorization",
//       dataIndex: "authorization",
//       key: "authorization",
//       width: 150,
//       render: (checked: boolean) => (
//         <Checkbox checked={checked} className="flex justify-center" />
//       ),
//     },
//     {
//       title: "Cutoff",
//       dataIndex: "cutoff",
//       key: "cutoff",
//       width: 120,
//       render: (checked: boolean) => (
//         <Checkbox checked={checked} className="flex justify-center" />
//       ),
//     },
//     {
//       title: "Classification",
//       dataIndex: "classificationSOX",
//       key: "classificationSOX",
//       width: 150,
//       render: (checked: boolean) => (
//         <Checkbox checked={checked} className="flex justify-center" />
//       ),
//     },
//     {
//       title: "Existence",
//       dataIndex: "existence",
//       key: "existence",
//       width: 150,
//       render: (checked: boolean) => (
//         <Checkbox checked={checked} className="flex justify-center" />
//       ),
//     },
//     {
//       title: "Rights and Obligations",
//       dataIndex: "rightsObligations",
//       key: "rightsObligations",
//       width: 180,
//       render: (checked: boolean) => (
//         <Checkbox checked={checked} className="flex justify-center" />
//       ),
//     },
//     {
//       title: "Valuation and Allocation",
//       dataIndex: "valuationAllocation",
//       key: "valuationAllocation",
//       width: 200,
//       render: (checked: boolean) => (
//         <Checkbox checked={checked} className="flex justify-center" />
//       ),
//     },
//     {
//       title: "Presentation / Disclosure",
//       dataIndex: "presentationDisclosure",
//       key: "presentationDisclosure",
//       width: 200,
//       render: (checked: boolean) => (
//         <Checkbox checked={checked} className="flex justify-center" />
//       ),
//     },
//   ];

//   const internalAuditTestColumns: ColumnsType<DataType> = [
//     {
//       title: "Check",
//       dataIndex: "check",
//       key: "check",
//       width: 150,
//       render: (checked: boolean) => (
//         <Checkbox checked={checked} className="flex justify-center" />
//       ),
//     },
//     {
//       title: "Internal Audit Test",
//       dataIndex: "internalAuditTest",
//       key: "internalAuditTest",
//       width: 400,
//     },
//     {
//       title: "Sample Size",
//       dataIndex: "sampleSize",
//       key: "sampleSize",
//       width: 150,
//     },
//   ];

//   const grcExceptionLogColumns: ColumnsType<DataType> = [
//     {
//       title: "GRC Adequacy",
//       dataIndex: "grcAdequacy",
//       key: "grcAdequacy",
//       width: 200,
//     },
//     {
//       title: "GRC Effectiveness",
//       dataIndex: "grcEffectiveness",
//       key: "grcEffectiveness",
//       width: 200,
//     },
//     {
//       title: "Explanation",
//       dataIndex: "explanation",
//       key: "explanation",
//       width: 400,
//     },
//   ];

//   let dynamicColumns: ColumnsType<DataType> = processColumns;

//   switch (activeTab) {
//     case "1":
//       dynamicColumns = processColumns;
//       break;
//     case "2":
//       dynamicColumns = ownershipColumns;
//       break;
//     case "3":
//       if (activeSubTab === "coso") dynamicColumns = cosoColumns;
//       else if (activeSubTab === "intosai") dynamicColumns = intosaiColumns;
//       else dynamicColumns = otherEnvColumns;
//       break;
//     case "4":
//       dynamicColumns = riskAssessmentInherentColumns;
//       break;
//     case "5":
//       dynamicColumns = riskResponsesColumns;
//       break;
//     case "6":
//       dynamicColumns = controlActivitiesColumns;
//       break;
//     case "7":
//       dynamicColumns = controlAssessmentColumns;
//       break;
//     case "8":
//       dynamicColumns = riskAssessmentResidualColumns;
//       break;
//     case "9":
//       dynamicColumns = soxColumns;
//       break;
//     case "10":
//       dynamicColumns = internalAuditTestColumns;
//       break;
//     case "11":
//       dynamicColumns = grcExceptionLogColumns;
//       break;
//     default:
//       dynamicColumns = processColumns;
//   }

//   return [...baseColumns, ...dynamicColumns];
// }

"use client";
import React from "react";
import { EditOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { Menu, Dropdown, Checkbox, Button, Input } from "antd";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import { DataType } from "./types";

const { TextArea } = Input;

export const stageOptions = [
  { label: "Initiation", key: "Initiation" },
  { label: "Processing", key: "Processing" },
  { label: "Completed", key: "Completed" },
];

export const severityOptions = [
  { label: "Catastrophic", key: "Catastrophic" },
  { label: "Major", key: "Major" },
  { label: "Moderate", key: "Moderate" },
  { label: "Minor", key: "Minor" },
  { label: "Insignificant", key: "Insignificant" },
];

// Helper to build dropdown menu
const buildMenu = (
  items: { label: string; key: string }[],
  onClick?: (key: string) => void
) => {
  return (
    <Menu
      onClick={(info) => {
        onClick?.(String(info.key));
      }}
      items={items as any}
    />
  );
};

// Render editable checkbox
const renderEditableCheckbox = (
  value: boolean,
  record: DataType,
  field: keyof DataType,
  onCheckboxChange?: (
    rowKey: string,
    field: keyof DataType,
    checked: boolean
  ) => void
) => {
  return (
    <Checkbox
      checked={value}
      onChange={(e) => onCheckboxChange?.(record.key, field, e.target.checked)}
      className="flex justify-center"
    />
  );
};

export function getColumns(
  activeTab: string,
  activeSubTab: string,
  handlers?: {
    onStageChange?: (key: string, rowKey: string) => void;
    onSelectGeneric?: (key: string, rowKey: string, field?: string) => void;
    onCheckboxChange?: (
      rowKey: string,
      field: keyof DataType,
      checked: boolean
    ) => void;
    onTextChange?: (
      rowKey: string,
      field: keyof DataType,
      value: string
    ) => void;
    onAddRow?: () => void;
    onSaveRow?: (rowKey: string) => void;
    onEditRow?: (rowKey: string) => void;
  },
  editingKeys: string[] = []
): ColumnsType<DataType> {
  const baseColumns: ColumnsType<DataType> = [
    {
      title: () => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>No.</span>
          <Button
            style={{ marginLeft: 8 }}
            size="small"
            icon={<PlusOutlined />}
            onClick={handlers?.onAddRow}
          />
        </div>
      ),
      dataIndex: "no",
      key: "no",
      width: 80,
      fixed: "left",
    },
    {
      title: "Process",
      dataIndex: "process",
      key: "process",
      width: 300,
      fixed: "left",
      render: (text: string, record: DataType) => {
        if (editingKeys.includes(record.key)) {
          return (
            <Input
              value={text}
              onChange={(e) =>
                handlers?.onTextChange?.(record.key, "process", e.target.value)
              }
            />
          );
        }
        return text;
      },
    },
  ];
  const processColumns: ColumnsType<DataType> = [
    {
      title: "Process Description",
      dataIndex: "processDescription",
      key: "processDescription",
      width: 300,
      render: (text: string, record: DataType) => {
        if (editingKeys.includes(record.key)) {
          return (
            <TextArea
              value={text}
              onChange={(e) =>
                handlers?.onTextChange?.(
                  record.key,
                  "processDescription",
                  e.target.value
                )
              }
              autoSize={{ minRows: 2 }}
            />
          );
        }
        return text;
      },
    },
    {
      title: "Process Objective",
      dataIndex: "processObjective",
      key: "processObjective",
      width: 300,
      render: (text: string, record: DataType) => {
        if (editingKeys.includes(record.key)) {
          return (
            <TextArea
              value={text}
              onChange={(e) =>
                handlers?.onTextChange?.(
                  record.key,
                  "processObjective",
                  e.target.value
                )
              }
              autoSize={{ minRows: 2 }}
            />
          );
        }
        return text;
      },
    },
    {
      title: "Process Severity Levels",
      dataIndex: "processSeverityLevels",
      key: "processSeverityLevels",
      width: 200,
      render: (text: string, record: DataType) => {
        if (editingKeys.includes(record.key)) {
          return (
            <Input
              value={text}
              onChange={(e) =>
                handlers?.onTextChange?.(
                  record.key,
                  "processSeverityLevels",
                  e.target.value
                )
              }
            />
          );
        }
        return text;
      },
    },
  ];
  const ownershipColumns: ColumnsType<DataType> = [
    {
      title: "Activity",
      dataIndex: "activity",
      key: "activity",
      width: 250,
      render: (text: string, record: DataType) => {
        if (editingKeys.includes(record.key)) {
          return (
            <Input
              value={text}
              onChange={(e) =>
                handlers?.onTextChange?.(record.key, "activity", e.target.value)
              }
            />
          );
        }
        return text;
      },
    },
    {
      title: "Process",
      dataIndex: "process2",
      key: "process2",
      width: 250,
      render: (text: string, record: DataType) => {
        if (editingKeys.includes(record.key)) {
          return (
            <Input
              value={text}
              onChange={(e) =>
                handlers?.onTextChange?.(record.key, "process2", e.target.value)
              }
            />
          );
        }
        return text;
      },
    },
    {
      title: "Process Stage",
      dataIndex: "stage",
      key: "stage",
      width: 180,
      render: (text: any, record: DataType) => {
        const menu = buildMenu(stageOptions, (key) =>
          handlers?.onStageChange?.(key, record.key)
        );
        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <div className="flex items-center cursor-pointer">
              {text}
              <DownOutlined className="ml-1 text-gray-500 text-xs" />
            </div>
          </Dropdown>
        );
      },
    },
    {
      title: "Functions",
      dataIndex: "functions",
      key: "functions",
      width: 150,
      render: (text: string, record: DataType) => {
        if (editingKeys.includes(record.key)) {
          return (
            <Input
              value={text}
              onChange={(e) =>
                handlers?.onTextChange?.(
                  record.key,
                  "functions",
                  e.target.value
                )
              }
            />
          );
        }
        return text;
      },
    },
    {
      title: "Client Segment",
      dataIndex: "clientSegment",
      key: "clientSegment",
      width: 180,
      render: (text: string, record: DataType) => {
        if (editingKeys.includes(record.key)) {
          return (
            <Input
              value={text}
              onChange={(e) =>
                handlers?.onTextChange?.(
                  record.key,
                  "clientSegment",
                  e.target.value
                )
              }
            />
          );
        }
        return text;
      },
    },
    {
      title: "Operational Unit",
      dataIndex: "operationalUnit",
      key: "operationalUnit",
      width: 180,
      render: (text: string, record: DataType) => {
        if (editingKeys.includes(record.key)) {
          return (
            <Input
              value={text}
              onChange={(e) =>
                handlers?.onTextChange?.(
                  record.key,
                  "operationalUnit",
                  e.target.value
                )
              }
            />
          );
        }
        return text;
      },
    },
    {
      title: "Division",
      dataIndex: "division",
      key: "division",
      width: 150,
      render: (text: string, record: DataType) => {
        if (editingKeys.includes(record.key)) {
          return (
            <Input
              value={text}
              onChange={(e) =>
                handlers?.onTextChange?.(record.key, "division", e.target.value)
              }
            />
          );
        }
        return text;
      },
    },
    {
      title: "Entity",
      dataIndex: "entity",
      key: "entity",
      width: 150,
      render: (text: string, record: DataType) => {
        if (editingKeys.includes(record.key)) {
          return (
            <Input
              value={text}
              onChange={(e) =>
                handlers?.onTextChange?.(record.key, "entity", e.target.value)
              }
            />
          );
        }
        return text;
      },
    },
    {
      title: "Unit / Department",
      dataIndex: "unitDepartment",
      key: "unitDepartment",
      width: 180,
      render: (text: string, record: DataType) => {
        if (editingKeys.includes(record.key)) {
          return (
            <Input
              value={text}
              onChange={(e) =>
                handlers?.onTextChange?.(
                  record.key,
                  "unitDepartment",
                  e.target.value
                )
              }
            />
          );
        }
        return text;
      },
    },
    {
      title: "Product Class",
      dataIndex: "productClass",
      key: "productClass",
      width: 150,
      render: (text: string, record: DataType) => {
        if (editingKeys.includes(record.key)) {
          return (
            <Input
              value={text}
              onChange={(e) =>
                handlers?.onTextChange?.(
                  record.key,
                  "productClass",
                  e.target.value
                )
              }
            />
          );
        }
        return text;
      },
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      width: 180,
      render: (text: string, record: DataType) => {
        if (editingKeys.includes(record.key)) {
          return (
            <Input
              value={text}
              onChange={(e) =>
                handlers?.onTextChange?.(
                  record.key,
                  "productName",
                  e.target.value
                )
              }
            />
          );
        }
        return text;
      },
    },
  ];
  const cosoColumns: ColumnsType<DataType> = [
    {
      title: "Integrity & Ethical Values",
      dataIndex: "integrityEthical",
      key: "integrityEthical",
      width: 200,
      render: (checked: boolean, record: DataType) =>
        renderEditableCheckbox(
          checked,
          record,
          "integrityEthical",
          handlers?.onCheckboxChange
        ),
    },
    {
      title: "Board Oversight",
      dataIndex: "boardOversight",
      key: "boardOversight",
      width: 180,
      render: (checked: boolean, record: DataType) =>
        renderEditableCheckbox(
          checked,
          record,
          "boardOversight",
          handlers?.onCheckboxChange
        ),
    },
    {
      title: "Organizational Structure",
      dataIndex: "orgStructure",
      key: "orgStructure",
      width: 200,
      render: (checked: boolean, record: DataType) =>
        renderEditableCheckbox(
          checked,
          record,
          "orgStructure",
          handlers?.onCheckboxChange
        ),
    },
    {
      title: "Commitment to Competence",
      dataIndex: "commitmentCompetence",
      key: "commitmentCompetence",
      width: 220,
      render: (checked: boolean, record: DataType) =>
        renderEditableCheckbox(
          checked,
          record,
          "commitmentCompetence",
          handlers?.onCheckboxChange
        ),
    },
    {
      title: "Management Philosophy",
      dataIndex: "managementPhilosophy",
      key: "managementPhilosophy",
      width: 200,
      render: (checked: boolean, record: DataType) =>
        renderEditableCheckbox(
          checked,
          record,
          "managementPhilosophy",
          handlers?.onCheckboxChange
        ),
    },
  ];
  const intosaiColumns: ColumnsType<DataType> = [
    {
      title: "Integrity and Ethical Values",
      dataIndex: "integrityEthical",
      key: "integrityEthical",
      width: 200,
      render: (checked: boolean, record: DataType) =>
        renderEditableCheckbox(
          checked,
          record,
          "integrityEthical",
          handlers?.onCheckboxChange
        ),
    },
    {
      title: "Commitment to Competence",
      dataIndex: "commitmentCompetence",
      key: "commitmentCompetence",
      width: 200,
      render: (checked: boolean, record: DataType) =>
        renderEditableCheckbox(
          checked,
          record,
          "commitmentCompetence",
          handlers?.onCheckboxChange
        ),
    },
    {
      title: "Management's Philosophy and Operating Style",
      dataIndex: "managementPhilosophy",
      key: "managementPhilosophy",
      width: 200,
      render: (checked: boolean, record: DataType) =>
        renderEditableCheckbox(
          checked,
          record,
          "managementPhilosophy",
          handlers?.onCheckboxChange
        ),
    },
    {
      title: "Organizational Structure",
      dataIndex: "orgStructure",
      key: "orgStructure",
      width: 200,
      render: (checked: boolean, record: DataType) =>
        renderEditableCheckbox(
          checked,
          record,
          "orgStructure",
          handlers?.onCheckboxChange
        ),
    },
    {
      title: "Assignment of Authority",
      dataIndex: "assignmentAuthority",
      key: "assignmentAuthority",
      width: 200,
      render: (checked: boolean, record: DataType) =>
        renderEditableCheckbox(
          checked,
          record,
          "assignmentAuthority",
          handlers?.onCheckboxChange
        ),
    },
    {
      title: "HR Policies and Practices",
      dataIndex: "hrPolicies",
      key: "hrPolicies",
      width: 200,
      render: (checked: boolean, record: DataType) =>
        renderEditableCheckbox(
          checked,
          record,
          "hrPolicies",
          handlers?.onCheckboxChange
        ),
    },
    {
      title: "Board/Audit Committee",
      dataIndex: "boardAudit",
      key: "boardAudit",
      width: 200,
      render: (checked: boolean, record: DataType) =>
        renderEditableCheckbox(
          checked,
          record,
          "boardAudit",
          handlers?.onCheckboxChange
        ),
    },
    {
      title: "Management Control Methods",
      dataIndex: "managementControl",
      key: "managementControl",
      width: 220,
      render: (checked: boolean, record: DataType) =>
        renderEditableCheckbox(
          checked,
          record,
          "managementControl",
          handlers?.onCheckboxChange
        ),
    },
    {
      title: "External Influences",
      dataIndex: "externalInfluences",
      key: "externalInfluences",
      width: 180,
      render: (checked: boolean, record: DataType) =>
        renderEditableCheckbox(
          checked,
          record,
          "externalInfluences",
          handlers?.onCheckboxChange
        ),
    },
    {
      title: "Commitment to Internal Control",
      dataIndex: "commitmentInternal",
      key: "commitmentInternal",
      width: 220,
      render: (checked: boolean, record: DataType) =>
        renderEditableCheckbox(
          checked,
          record,
          "commitmentInternal",
          handlers?.onCheckboxChange
        ),
    },
    {
      title: "Enforcement of Integrity",
      dataIndex: "enforcementIntegrity",
      key: "enforcementIntegrity",
      width: 200,
      render: (checked: boolean, record: DataType) =>
        renderEditableCheckbox(
          checked,
          record,
          "enforcementIntegrity",
          handlers?.onCheckboxChange
        ),
    },
    {
      title: "Employee Awareness",
      dataIndex: "employeeAwareness",
      key: "employeeAwareness",
      width: 180,
      render: (checked: boolean, record: DataType) =>
        renderEditableCheckbox(
          checked,
          record,
          "employeeAwareness",
          handlers?.onCheckboxChange
        ),
    },
    {
      title: "Accountability & Performance",
      dataIndex: "accountability",
      key: "accountability",
      width: 220,
      render: (checked: boolean, record: DataType) =>
        renderEditableCheckbox(
          checked,
          record,
          "accountability",
          handlers?.onCheckboxChange
        ),
    },
    {
      title: "Commitment to Transparency",
      dataIndex: "commitmentTransparency",
      key: "commitmentTransparency",
      width: 220,
      render: (checked: boolean, record: DataType) =>
        renderEditableCheckbox(
          checked,
          record,
          "commitmentTransparency",
          handlers?.onCheckboxChange
        ),
    },
  ];
  const otherEnvColumns: ColumnsType<DataType> = [
    {
      title: "Responsibility Delegation Matrix",
      dataIndex: "responsibilityMatrix",
      key: "responsibilityMatrix",
      width: 220,
      render: (checked: boolean, record: DataType) =>
        renderEditableCheckbox(
          checked,
          record,
          "responsibilityMatrix",
          handlers?.onCheckboxChange
        ),
    },
    {
      title: "Segregation of Duties",
      dataIndex: "segregationDuties",
      key: "segregationDuties",
      width: 200,
      render: (checked: boolean, record: DataType) =>
        renderEditableCheckbox(
          checked,
          record,
          "segregationDuties",
          handlers?.onCheckboxChange
        ),
    },
    {
      title: "Reporting Lines",
      dataIndex: "reportingLines",
      key: "reportingLines",
      width: 150,
      render: (checked: boolean, record: DataType) =>
        renderEditableCheckbox(
          checked,
          record,
          "reportingLines",
          handlers?.onCheckboxChange
        ),
    },
    {
      title: "Mission",
      dataIndex: "mission",
      key: "mission",
      width: 120,
      render: (checked: boolean, record: DataType) =>
        renderEditableCheckbox(
          checked,
          record,
          "mission",
          handlers?.onCheckboxChange
        ),
    },
    {
      title: "Vision and Values",
      dataIndex: "visionValues",
      key: "visionValues",
      width: 180,
      render: (checked: boolean, record: DataType) =>
        renderEditableCheckbox(
          checked,
          record,
          "visionValues",
          handlers?.onCheckboxChange
        ),
    },
    {
      title: "Goals and Objectives",
      dataIndex: "goalsObjectives",
      key: "goalsObjectives",
      width: 180,
      render: (checked: boolean, record: DataType) =>
        renderEditableCheckbox(
          checked,
          record,
          "goalsObjectives",
          handlers?.onCheckboxChange
        ),
    },
    {
      title: "Structures & Systems",
      dataIndex: "structuresSystems",
      key: "structuresSystems",
      width: 180,
      render: (checked: boolean, record: DataType) =>
        renderEditableCheckbox(
          checked,
          record,
          "structuresSystems",
          handlers?.onCheckboxChange
        ),
    },
    {
      title: "Policies and Procedures",
      dataIndex: "policiesProcedures",
      key: "policiesProcedures",
      width: 200,
      render: (checked: boolean, record: DataType) =>
        renderEditableCheckbox(
          checked,
          record,
          "policiesProcedures",
          handlers?.onCheckboxChange
        ),
    },
    {
      title: "Processes",
      dataIndex: "processes",
      key: "processes",
      width: 150,
      render: (checked: boolean, record: DataType) =>
        renderEditableCheckbox(
          checked,
          record,
          "processes",
          handlers?.onCheckboxChange
        ),
    },
    {
      title: "Integrity and Ethical Values",
      dataIndex: "integrityEthical",
      key: "integrityEthical",
      width: 220,
      render: (checked: boolean, record: DataType) =>
        renderEditableCheckbox(
          checked,
          record,
          "integrityEthical",
          handlers?.onCheckboxChange
        ),
    },
    {
      title: "Oversight Structure",
      dataIndex: "oversightStructure",
      key: "oversightStructure",
      width: 180,
      render: (checked: boolean, record: DataType) =>
        renderEditableCheckbox(
          checked,
          record,
          "oversightStructure",
          handlers?.onCheckboxChange
        ),
    },
    {
      title: "Standards",
      dataIndex: "standards",
      key: "standards",
      width: 150,
      render: (checked: boolean, record: DataType) =>
        renderEditableCheckbox(
          checked,
          record,
          "standards",
          handlers?.onCheckboxChange
        ),
    },
    {
      title: "Methodologies",
      dataIndex: "methodologies",
      key: "methodologies",
      width: 150,
      render: (checked: boolean, record: DataType) =>
        renderEditableCheckbox(
          checked,
          record,
          "methodologies",
          handlers?.onCheckboxChange
        ),
    },
    {
      title: "Rules and Regulations",
      dataIndex: "rulesRegulations",
      key: "rulesRegulations",
      width: 200,
      render: (checked: boolean, record: DataType) =>
        renderEditableCheckbox(
          checked,
          record,
          "rulesRegulations",
          handlers?.onCheckboxChange
        ),
    },
  ];
  const riskAssessmentInherentColumns: ColumnsType<DataType> = [
    {
      title: "Risk Type",
      dataIndex: "riskType",
      key: "riskType",
      width: 200,
      render: (text: string, record: DataType) => {
        if (editingKeys.includes(record.key)) {
          return (
            <Input
              value={text}
              onChange={(e) =>
                handlers?.onTextChange?.(record.key, "riskType", e.target.value)
              }
            />
          );
        }
        return text;
      },
    },
    {
      title: "Risk Description",
      dataIndex: "riskDescription",
      key: "riskDescription",
      width: 300,
      render: (text: string, record: DataType) => {
        if (editingKeys.includes(record.key)) {
          return (
            <TextArea
              value={text}
              onChange={(e) =>
                handlers?.onTextChange?.(
                  record.key,
                  "riskDescription",
                  e.target.value
                )
              }
              autoSize={{ minRows: 2 }}
            />
          );
        }
        return text;
      },
    },
    {
      title: "Severity / Impact",
      dataIndex: "severityImpact",
      key: "severityImpact",
      width: 180,
      render: (text: any, record: DataType) => {
        const menu = buildMenu(severityOptions, (key) =>
          handlers?.onSelectGeneric?.(key, record.key, "severityImpact")
        );
        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <div className="flex items-center cursor-pointer">
              {text || "Select"}
              <DownOutlined className="ml-1 text-gray-500 text-xs" />
            </div>
          </Dropdown>
        );
      },
    },
    {
      title: "Probability / Likelihood",
      dataIndex: "probabilityLikelihood",
      key: "probabilityLikelihood",
      width: 200,
      render: (text: any, record: DataType) => {
        const probabilityOptions = [
          { label: "Certain", key: "Certain" },
          { label: "Likely", key: "Likely" },
          { label: "Possible", key: "Possible" },
          { label: "Unlikely", key: "Unlikely" },
          { label: "Rare", key: "Rare" },
        ];
        const menu = buildMenu(probabilityOptions, (key) =>
          handlers?.onSelectGeneric?.(key, record.key, "probabilityLikelihood")
        );
        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <div className="flex items-center cursor-pointer">
              {text || "Select"}
              <DownOutlined className="ml-1 text-gray-500 text-xs" />
            </div>
          </Dropdown>
        );
      },
    },
    {
      title: "Classification",
      dataIndex: "classification",
      key: "classification",
      width: 150,
      render: (text: any, record: DataType) => {
        const classificationOptions = [
          { label: "Critical", key: "Critical" },
          { label: "High", key: "High" },
          { label: "Moderate", key: "Moderate" },
          { label: "Low", key: "Low" },
          { label: "Lowest", key: "Lowest" },
        ];
        const menu = buildMenu(classificationOptions, (key) =>
          handlers?.onSelectGeneric?.(key, record.key, "classification")
        );
        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <div className="flex items-center cursor-pointer">
              {text || "Select"}
              <DownOutlined className="ml-1 text-gray-500 text-xs" />
            </div>
          </Dropdown>
        );
      },
    },
  ];
  const riskResponsesColumns: ColumnsType<DataType> = [
    {
      title: "Type of Risk Response",
      dataIndex: "riskResponseType",
      key: "riskResponseType",
      width: 300,
      render: (text: any, record: DataType) => {
        const responseOptions = [
          { label: "Avoid", key: "Avoid" },
          { label: "Mitigate", key: "Mitigate" },
          { label: "Transfer", key: "Transfer" },
          { label: "Share", key: "Share" },
          { label: "Accept", key: "Accept" },
        ];
        const menu = buildMenu(responseOptions, (key) =>
          handlers?.onSelectGeneric?.(key, record.key, "riskResponseType")
        );
        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <div className="flex items-center cursor-pointer">
              {text || "Select"}
              <DownOutlined className="ml-1 text-gray-500 text-xs" />
            </div>
          </Dropdown>
        );
      },
    },
  ];
  const controlActivitiesColumns: ColumnsType<DataType> = [
    {
      title: "Control Objectives",
      dataIndex: "controlObjectives",
      key: "controlObjectives",
      width: 320,
      render: (text: string, record: DataType) => {
        if (editingKeys.includes(record.key)) {
          return (
            <TextArea
              value={text}
              onChange={(e) =>
                handlers?.onTextChange?.(
                  record.key,
                  "controlObjectives",
                  e.target.value
                )
              }
              autoSize={{ minRows: 3 }}
            />
          );
        }
        return (
          <div style={{ whiteSpace: "pre-line", lineHeight: "1.4" }}>
            {text}
          </div>
        );
      },
    },
    {
      title: "Control Ref",
      dataIndex: "controlRef",
      key: "controlRef",
      width: 100,
      align: "center" as const,
      render: () => "—",
    },
    {
      title: "Control Definition",
      dataIndex: "controlDefinition",
      key: "controlDefinition",
      width: 300,
      render: (text: string, record: DataType) => {
        if (editingKeys.includes(record.key)) {
          return (
            <TextArea
              value={text}
              onChange={(e) =>
                handlers?.onTextChange?.(
                  record.key,
                  "controlDefinition",
                  e.target.value
                )
              }
              autoSize={{ minRows: 3 }}
            />
          );
        }
        return (
          <div style={{ whiteSpace: "pre-line", lineHeight: "1.4" }}>
            {text}
          </div>
        );
      },
    },
    {
      title: "Control Description",
      dataIndex: "controlDescription",
      key: "controlDescription",
      width: 320,
      render: (text: string, record: DataType) => {
        if (editingKeys.includes(record.key)) {
          return (
            <TextArea
              value={text}
              onChange={(e) =>
                handlers?.onTextChange?.(
                  record.key,
                  "controlDescription",
                  e.target.value
                )
              }
              autoSize={{ minRows: 3 }}
            />
          );
        }
        return (
          <div style={{ whiteSpace: "pre-line", lineHeight: "1.4" }}>
            {text}
          </div>
        );
      },
    },
    {
      title: "Control Responsibility",
      dataIndex: "controlResponsibility",
      key: "controlResponsibility",
      width: 180,
      render: (text: string, record: DataType) => {
        if (editingKeys.includes(record.key)) {
          return (
            <Input
              value={text}
              onChange={(e) =>
                handlers?.onTextChange?.(
                  record.key,
                  "controlResponsibility",
                  e.target.value
                )
              }
            />
          );
        }
        return text;
      },
    },
    {
      title: "Key Control",
      dataIndex: "keyControl",
      key: "keyControl",
      width: 110,
      align: "center" as const,
      render: () => "Yes",
    },
    {
      title: "Zero Tolerance",
      dataIndex: "zeroTolerance",
      key: "zeroTolerance",
      width: 130,
      align: "center" as const,
      render: () => "Yes",
    },
  ];
  const controlAssessmentColumns: ColumnsType<DataType> = [
    {
      title: "Level of Responsibility",
      dataIndex: "levelResponsibility",
      key: "levelResponsibility",
      width: 200,
      render: (text: string, record: DataType) => {
        if (editingKeys.includes(record.key)) {
          return (
            <Input
              value={text}
              onChange={(e) =>
                handlers?.onTextChange?.(
                  record.key,
                  "levelResponsibility",
                  e.target.value
                )
              }
            />
          );
        }
        return text;
      },
    },
    {
      title: "COSO Principle #",
      dataIndex: "cosoPrinciple",
      key: "cosoPrinciple",
      width: 150,
      render: (text: string, record: DataType) => {
        if (editingKeys.includes(record.key)) {
          return (
            <Input
              value={text}
              onChange={(e) =>
                handlers?.onTextChange?.(
                  record.key,
                  "cosoPrinciple",
                  e.target.value
                )
              }
            />
          );
        }
        return text;
      },
    },
    {
      title: "Operational Approach",
      dataIndex: "operationalApproach",
      key: "operationalApproach",
      width: 200,
      render: (text: any, record: DataType) => {
        const approachOptions = [
          { label: "Automated", key: "automated" },
          { label: "Manual", key: "manual" },
        ];
        const menu = buildMenu(approachOptions, (key) =>
          handlers?.onSelectGeneric?.(key, record.key, "operationalApproach")
        );
        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <div className="flex items-center cursor-pointer">
              {text || "Select"}
              <DownOutlined className="ml-1 text-gray-500 text-xs" />
            </div>
          </Dropdown>
        );
      },
    },
    {
      title: "Operational Frequency",
      dataIndex: "operationalFrequency",
      key: "operationalFrequency",
      width: 200,
      render: (text: string, record: DataType) => {
        if (editingKeys.includes(record.key)) {
          return (
            <Input
              value={text}
              onChange={(e) =>
                handlers?.onTextChange?.(
                  record.key,
                  "operationalFrequency",
                  e.target.value
                )
              }
            />
          );
        }
        return text;
      },
    },
    {
      title: "Control Classification",
      dataIndex: "controlClassification",
      key: "controlClassification",
      width: 200,
      render: (text: any, record: DataType) => {
        const classificationOptions = [
          { label: "Preventive", key: "preventive" },
          { label: "Detective", key: "detective" },
          { label: "Corrective", key: "corrective" },
        ];
        const menu = buildMenu(classificationOptions, (key) =>
          handlers?.onSelectGeneric?.(key, record.key, "controlClassification")
        );
        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <div className="flex items-center cursor-pointer">
              {text || "Select"}
              <DownOutlined className="ml-1 text-gray-500 text-xs" />
            </div>
          </Dropdown>
        );
      },
    },
  ];
  const riskAssessmentResidualColumns: ColumnsType<DataType> =
    riskAssessmentInherentColumns.map((col) => ({ ...col })); // copy to avoid reference issues
  const soxColumns: ColumnsType<DataType> = [
    {
      title: "SOX Control Activity",
      dataIndex: "soxControlActivity",
      key: "soxControlActivity",
      width: 250,
      render: (text: string, record: DataType) => {
        if (editingKeys.includes(record.key)) {
          return (
            <Input
              value={text}
              onChange={(e) =>
                handlers?.onTextChange?.(
                  record.key,
                  "soxControlActivity",
                  e.target.value
                )
              }
            />
          );
        }
        return text;
      },
    },
    {
      title: "Internal Control Over Financial Reporting?",
      dataIndex: "internalControlFinancial",
      key: "internalControlFinancial",
      width: 280,
      render: (checked: boolean, record: DataType) =>
        renderEditableCheckbox(
          checked,
          record,
          "internalControlFinancial",
          handlers?.onCheckboxChange
        ),
    },
    {
      title: "Occurrence",
      dataIndex: "occurrence",
      key: "occurrence",
      width: 150,
      render: (checked: boolean, record: DataType) =>
        renderEditableCheckbox(
          checked,
          record,
          "occurrence",
          handlers?.onCheckboxChange
        ),
    },
    {
      title: "Completeness",
      dataIndex: "completeness",
      key: "completeness",
      width: 150,
      render: (checked: boolean, record: DataType) =>
        renderEditableCheckbox(
          checked,
          record,
          "completeness",
          handlers?.onCheckboxChange
        ),
    },
    {
      title: "Accuracy",
      dataIndex: "accuracy",
      key: "accuracy",
      width: 150,
      render: (checked: boolean, record: DataType) =>
        renderEditableCheckbox(
          checked,
          record,
          "accuracy",
          handlers?.onCheckboxChange
        ),
    },
    {
      title: "Authorization",
      dataIndex: "authorization",
      key: "authorization",
      width: 150,
      render: (checked: boolean, record: DataType) =>
        renderEditableCheckbox(
          checked,
          record,
          "authorization",
          handlers?.onCheckboxChange
        ),
    },
    {
      title: "Cutoff",
      dataIndex: "cutoff",
      key: "cutoff",
      width: 120,
      render: (checked: boolean, record: DataType) =>
        renderEditableCheckbox(
          checked,
          record,
          "cutoff",
          handlers?.onCheckboxChange
        ),
    },
    {
      title: "Classification",
      dataIndex: "classificationSOX",
      key: "classificationSOX",
      width: 150,
      render: (checked: boolean, record: DataType) =>
        renderEditableCheckbox(
          checked,
          record,
          "classificationSOX",
          handlers?.onCheckboxChange
        ),
    },
    {
      title: "Existence",
      dataIndex: "existence",
      key: "existence",
      width: 150,
      render: (checked: boolean, record: DataType) =>
        renderEditableCheckbox(
          checked,
          record,
          "existence",
          handlers?.onCheckboxChange
        ),
    },
    {
      title: "Rights and Obligations",
      dataIndex: "rightsObligations",
      key: "rightsObligations",
      width: 180,
      render: (checked: boolean, record: DataType) =>
        renderEditableCheckbox(
          checked,
          record,
          "rightsObligations",
          handlers?.onCheckboxChange
        ),
    },
    {
      title: "Valuation and Allocation",
      dataIndex: "valuationAllocation",
      key: "valuationAllocation",
      width: 200,
      render: (checked: boolean, record: DataType) =>
        renderEditableCheckbox(
          checked,
          record,
          "valuationAllocation",
          handlers?.onCheckboxChange
        ),
    },
    {
      title: "Presentation / Disclosure",
      dataIndex: "presentationDisclosure",
      key: "presentationDisclosure",
      width: 200,
      render: (checked: boolean, record: DataType) =>
        renderEditableCheckbox(
          checked,
          record,
          "presentationDisclosure",
          handlers?.onCheckboxChange
        ),
    },
  ];
  const internalAuditTestColumns: ColumnsType<DataType> = [
    {
      title: "Check",
      dataIndex: "check",
      key: "check",
      width: 150,
      render: (checked: boolean, record: DataType) =>
        renderEditableCheckbox(
          checked,
          record,
          "check",
          handlers?.onCheckboxChange
        ),
    },
    {
      title: "Internal Audit Test",
      dataIndex: "internalAuditTest",
      key: "internalAuditTest",
      width: 400,
      render: (text: string, record: DataType) => {
        if (editingKeys.includes(record.key)) {
          return (
            <TextArea
              value={text}
              onChange={(e) =>
                handlers?.onTextChange?.(
                  record.key,
                  "internalAuditTest",
                  e.target.value
                )
              }
              autoSize={{ minRows: 2 }}
            />
          );
        }
        return text;
      },
    },
    {
      title: "Sample Size",
      dataIndex: "sampleSize",
      key: "sampleSize",
      width: 150,
      render: (text: string, record: DataType) => {
        if (editingKeys.includes(record.key)) {
          return (
            <Input
              value={text}
              onChange={(e) =>
                handlers?.onTextChange?.(
                  record.key,
                  "sampleSize",
                  e.target.value
                )
              }
            />
          );
        }
        return text;
      },
    },
  ];
  const grcExceptionLogColumns: ColumnsType<DataType> = [
    {
      title: "GRC Adequacy",
      dataIndex: "grcAdequacy",
      key: "grcAdequacy",
      width: 200,
      render: (text: string, record: DataType) => {
        if (editingKeys.includes(record.key)) {
          return (
            <Input
              value={text}
              onChange={(e) =>
                handlers?.onTextChange?.(
                  record.key,
                  "grcAdequacy",
                  e.target.value
                )
              }
            />
          );
        }
        return text;
      },
    },
    {
      title: "GRC Effectiveness",
      dataIndex: "grcEffectiveness",
      key: "grcEffectiveness",
      width: 200,
      render: (text: string, record: DataType) => {
        if (editingKeys.includes(record.key)) {
          return (
            <Input
              value={text}
              onChange={(e) =>
                handlers?.onTextChange?.(
                  record.key,
                  "grcEffectiveness",
                  e.target.value
                )
              }
            />
          );
        }
        return text;
      },
    },
    {
      title: "Explanation",
      dataIndex: "explanation",
      key: "explanation",
      width: 400,
      render: (text: string, record: DataType) => {
        if (editingKeys.includes(record.key)) {
          return (
            <TextArea
              value={text}
              onChange={(e) =>
                handlers?.onTextChange?.(
                  record.key,
                  "explanation",
                  e.target.value
                )
              }
              autoSize={{ minRows: 2 }}
            />
          );
        }
        return text;
      },
    },
  ];
  let dynamicColumns: ColumnsType<DataType> = processColumns;
  switch (activeTab) {
    case "1":
      dynamicColumns = processColumns;
      break;
    case "2":
      dynamicColumns = ownershipColumns;
      break;
    case "3":
      if (activeSubTab === "coso") dynamicColumns = cosoColumns;
      else if (activeSubTab === "intosai") dynamicColumns = intosaiColumns;
      else dynamicColumns = otherEnvColumns;
      break;
    case "4":
      dynamicColumns = riskAssessmentInherentColumns;
      break;
    case "5":
      dynamicColumns = riskResponsesColumns;
      break;
    case "6":
      dynamicColumns = controlActivitiesColumns;
      break;
    case "7":
      dynamicColumns = controlAssessmentColumns;
      break;
    case "8":
      dynamicColumns = riskAssessmentResidualColumns;
      break;
    case "9":
      dynamicColumns = soxColumns;
      break;
    case "10":
      dynamicColumns = internalAuditTestColumns;
      break;
    case "11":
      dynamicColumns = grcExceptionLogColumns;
      break;
    default:
      dynamicColumns = processColumns;
  }
  const actionsColumn: ColumnsType<DataType>[0] = {
    title: "Actions",
    key: "actions",
    width: 100,
    render: (_, record: DataType) => {
      if (editingKeys.includes(record.key)) {
        return (
          <Button onClick={() => handlers?.onSaveRow?.(record.key)}>
            Save
          </Button>
        );
      } else {
        return (
          <Button
            icon={<EditOutlined />}
            onClick={() => handlers?.onEditRow?.(record.key)}
          />
        );
      }
    },
  };
  return [...baseColumns, ...dynamicColumns, actionsColumn];
}

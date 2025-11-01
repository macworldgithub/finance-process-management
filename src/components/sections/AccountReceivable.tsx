"use client";
import React, { useState, useEffect } from "react";
import { Table, Tabs, Dropdown, Menu, Spin, Checkbox } from "antd";
import { DownOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";

interface DataType {
  key: string;
  no: string;
  process: string;
  [key: string]: any; // Allow dynamic properties for different tabs
}

interface ColumnType {
  title: string;
  dataIndex: string;
  key: string;
  width: number;
  fixed?: "left" | "right";
  render?: (text: any, record: DataType) => React.ReactNode;
}

const AccountReceivable = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("1");
  const [activeSubTab, setActiveSubTab] = useState("coso");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const stageOptions = [
    { label: "Initiation", key: "init" },
    { label: "Processing", key: "proc" },
    { label: "Completed", key: "comp" },
  ];

  // Base columns (always present)
  const baseColumns: ColumnType[] = [
    {
      title: "No.",
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
    },
  ];

  // Tab 1: Process columns
  const processColumns: ColumnType[] = [
    {
      title: "Process Description",
      dataIndex: "processDescription",
      key: "processDescription",
      width: 300,
    },
    {
      title: "Process Objective",
      dataIndex: "processObjective",
      key: "processObjective",
      width: 300,
    },
    {
      title: "Process Severity Levels",
      dataIndex: "processSeverityLevels",
      key: "processSeverityLevels",
      width: 200,
    },
  ];

  // Tab 2: Ownership columns
  const ownershipColumns: ColumnType[] = [
    {
      title: "Activity",
      dataIndex: "activity",
      key: "activity",
      width: 250,
    },
    {
      title: "Process",
      dataIndex: "process2",
      key: "process2",
      width: 250,
    },
    {
      title: "Process Stage",
      dataIndex: "stage",
      key: "stage",
      width: 180,
      render: (text: any, record: any) => {
        const menu = (
          <Menu
            onClick={({ key }) =>
              console.log("selected stage", key, "for row", record.key)
            }
            items={stageOptions}
          />
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
    },
    {
      title: "Client Segment",
      dataIndex: "clientSegment",
      key: "clientSegment",
      width: 180,
    },
    {
      title: "Operational Unit",
      dataIndex: "operationalUnit",
      key: "operationalUnit",
      width: 180,
    },
    {
      title: "Division",
      dataIndex: "division",
      key: "division",
      width: 150,
    },
    {
      title: "Entity",
      dataIndex: "entity",
      key: "entity",
      width: 150,
    },
    {
      title: "Unit / Department",
      dataIndex: "unitDepartment",
      key: "unitDepartment",
      width: 180,
    },
    {
      title: "Product Class",
      dataIndex: "productClass",
      key: "productClass",
      width: 150,
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      width: 180,
    },
  ];

  // Tab 3: Control Environment - COSO columns
  const cosoColumns: ColumnType[] = [
    {
      title: "Integrity & Ethical Values",
      dataIndex: "integrityEthical",
      key: "integrityEthical",
      width: 200,
      render: (checked: boolean) => (
        <Checkbox checked={checked} className="flex justify-center" />
      ),
    },
    {
      title: "Board Oversight",
      dataIndex: "boardOversight",
      key: "boardOversight",
      width: 180,
      render: (checked: boolean) => (
        <Checkbox checked={checked} className="flex justify-center" />
      ),
    },
    {
      title: "Organizational Structure",
      dataIndex: "orgStructure",
      key: "orgStructure",
      width: 200,
      render: (checked: boolean) => (
        <Checkbox checked={checked} className="flex justify-center" />
      ),
    },
    {
      title: "Commitment to Competence",
      dataIndex: "commitmentCompetence",
      key: "commitmentCompetence",
      width: 220,
      render: (checked: boolean) => (
        <Checkbox checked={checked} className="flex justify-center" />
      ),
    },
    {
      title: "Management Philosophy",
      dataIndex: "managementPhilosophy",
      key: "managementPhilosophy",
      width: 200,
      render: (checked: boolean) => (
        <Checkbox checked={checked} className="flex justify-center" />
      ),
    },
  ];

  // Tab 3: Control Environment - INTOSAI columns
  const intosaiColumns: ColumnType[] = [
    {
      title: "Integrity and Ethical Values",
      dataIndex: "integrityEthical",
      key: "integrityEthical",
      width: 200,
      render: (checked: boolean) => (
        <Checkbox checked={checked} className="flex justify-center" />
      ),
    },
    {
      title: "Commitment to Competence",
      dataIndex: "commitmentCompetence",
      key: "commitmentCompetence",
      width: 200,
      render: (checked: boolean) => (
        <Checkbox checked={checked} className="flex justify-center" />
      ),
    },
    {
      title: "Management's Philosophy and Operating Style",
      dataIndex: "managementPhilosophy",
      key: "managementPhilosophy",
      width: 200,
      render: (checked: boolean) => (
        <Checkbox checked={checked} className="flex justify-center" />
      ),
    },
    {
      title: "Organizational Structure",
      dataIndex: "orgStructure",
      key: "orgStructure",
      width: 200,
      render: (checked: boolean) => (
        <Checkbox checked={checked} className="flex justify-center" />
      ),
    },
    {
      title: "Assignment of Authority",
      dataIndex: "assignmentAuthority",
      key: "assignmentAuthority",
      width: 200,
      render: (checked: boolean) => (
        <Checkbox checked={checked} className="flex justify-center" />
      ),
    },
    {
      title: "HR Policies and Practices",
      dataIndex: "hrPolicies",
      key: "hrPolicies",
      width: 200,
      render: (checked: boolean) => (
        <Checkbox checked={checked} className="flex justify-center" />
      ),
    },
    {
      title: "Board/Audit Committee",
      dataIndex: "boardAudit",
      key: "boardAudit",
      width: 200,
      render: (checked: boolean) => (
        <Checkbox checked={checked} className="flex justify-center" />
      ),
    },
    {
      title: "Management Control Methods",
      dataIndex: "managementControl",
      key: "managementControl",
      width: 220,
      render: (checked: boolean) => (
        <Checkbox checked={checked} className="flex justify-center" />
      ),
    },
    {
      title: "External Influences",
      dataIndex: "externalInfluences",
      key: "externalInfluences",
      width: 180,
      render: (checked: boolean) => (
        <Checkbox checked={checked} className="flex justify-center" />
      ),
    },
    {
      title: "Commitment to Internal Control",
      dataIndex: "commitmentInternal",
      key: "commitmentInternal",
      width: 220,
      render: (checked: boolean) => (
        <Checkbox checked={checked} className="flex justify-center" />
      ),
    },
    {
      title: "Enforcement of Integrity",
      dataIndex: "enforcementIntegrity",
      key: "enforcementIntegrity",
      width: 200,
      render: (checked: boolean) => (
        <Checkbox checked={checked} className="flex justify-center" />
      ),
    },
    {
      title: "Employee Awareness",
      dataIndex: "employeeAwareness",
      key: "employeeAwareness",
      width: 180,
      render: (checked: boolean) => (
        <Checkbox checked={checked} className="flex justify-center" />
      ),
    },
    {
      title: "Accountability & Performance",
      dataIndex: "accountability",
      key: "accountability",
      width: 220,
      render: (checked: boolean) => (
        <Checkbox checked={checked} className="flex justify-center" />
      ),
    },
    {
      title: "Commitment to Transparency",
      dataIndex: "commitmentTransparency",
      key: "commitmentTransparency",
      width: 220,
      render: (checked: boolean) => (
        <Checkbox checked={checked} className="flex justify-center" />
      ),
    },
  ];

  // Tab 3: Control Environment - Other columns
  const otherEnvColumns: ColumnType[] = [
    {
      title: "Responsibility Delegation Matrix",
      dataIndex: "responsibilityMatrix",
      key: "responsibilityMatrix",
      width: 220,
      render: (checked: boolean) => (
        <Checkbox checked={checked} className="flex justify-center" />
      ),
    },
    {
      title: "Segregation of Duties",
      dataIndex: "segregationDuties",
      key: "segregationDuties",
      width: 200,
      render: (checked: boolean) => (
        <Checkbox checked={checked} className="flex justify-center" />
      ),
    },
    {
      title: "Reporting Lines",
      dataIndex: "reportingLines",
      key: "reportingLines",
      width: 150,
      render: (checked: boolean) => (
        <Checkbox checked={checked} className="flex justify-center" />
      ),
    },
    {
      title: "Mission",
      dataIndex: "mission",
      key: "mission",
      width: 120,
      render: (checked: boolean) => (
        <Checkbox checked={checked} className="flex justify-center" />
      ),
    },
    {
      title: "Vision and Values",
      dataIndex: "visionValues",
      key: "visionValues",
      width: 180,
      render: (checked: boolean) => (
        <Checkbox checked={checked} className="flex justify-center" />
      ),
    },
    {
      title: "Goals and Objectives",
      dataIndex: "goalsObjectives",
      key: "goalsObjectives",
      width: 180,
      render: (checked: boolean) => (
        <Checkbox checked={checked} className="flex justify-center" />
      ),
    },
    {
      title: "Structures & Systems",
      dataIndex: "structuresSystems",
      key: "structuresSystems",
      width: 180,
      render: (checked: boolean) => (
        <Checkbox checked={checked} className="flex justify-center" />
      ),
    },
    {
      title: "Policies and Procedures",
      dataIndex: "policiesProcedures",
      key: "policiesProcedures",
      width: 200,
      render: (checked: boolean) => (
        <Checkbox checked={checked} className="flex justify-center" />
      ),
    },
    {
      title: "Processes",
      dataIndex: "processes",
      key: "processes",
      width: 150,
      render: (checked: boolean) => (
        <Checkbox checked={checked} className="flex justify-center" />
      ),
    },
    {
      title: "Integrity and Ethical Values",
      dataIndex: "integrityEthical",
      key: "integrityEthical",
      width: 220,
      render: (checked: boolean) => (
        <Checkbox checked={checked} className="flex justify-center" />
      ),
    },
    {
      title: "Oversight Structure",
      dataIndex: "oversightStructure",
      key: "oversightStructure",
      width: 180,
      render: (checked: boolean) => (
        <Checkbox checked={checked} className="flex justify-center" />
      ),
    },
    {
      title: "Standards",
      dataIndex: "standards",
      key: "standards",
      width: 150,
      render: (checked: boolean) => (
        <Checkbox checked={checked} className="flex justify-center" />
      ),
    },
    {
      title: "Methodologies",
      dataIndex: "methodologies",
      key: "methodologies",
      width: 150,
      render: (checked: boolean) => (
        <Checkbox checked={checked} className="flex justify-center" />
      ),
    },
    {
      title: "Rules and Regulations",
      dataIndex: "rulesRegulations",
      key: "rulesRegulations",
      width: 200,
      render: (checked: boolean) => (
        <Checkbox checked={checked} className="flex justify-center" />
      ),
    },
  ];

  // Tab 4: Risk Assessment (Inherent Risk) columns
  const riskAssessmentInherentColumns: ColumnType[] = [
    {
      title: "Risk Type",
      dataIndex: "riskType",
      key: "riskType",
      width: 200,
    },
    {
      title: "Risk Description",
      dataIndex: "riskDescription",
      key: "riskDescription",
      width: 300,
    },
    {
      title: "Severity / Impact",
      dataIndex: "severityImpact",
      key: "severityImpact",
      width: 180,
      render: (text: any, record: any) => {
        const severityOptions = [
          { label: "Catastrophic", key: "catastrophic" },
          { label: "Major", key: "major" },
          { label: "Moderate", key: "moderate" },
          { label: "Minor", key: "minor" },
          { label: "Insignificant", key: "insignificant" },
        ];
        const menu = <Menu items={severityOptions} />;
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
      render: (text: any, record: any) => {
        const probabilityOptions = [
          { label: "Certain", key: "certain" },
          { label: "Likely", key: "likely" },
          { label: "Possible", key: "possible" },
          { label: "Unlikely", key: "unlikely" },
          { label: "Rare", key: "rare" },
        ];
        const menu = <Menu items={probabilityOptions} />;
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
      render: (text: any, record: any) => {
        const classificationOptions = [
          { label: "Critical", key: "critical" },
          { label: "High", key: "high" },
          { label: "Moderate", key: "moderate" },
          { label: "Low", key: "low" },
          { label: "Lowest", key: "lowest" },
        ];
        const menu = <Menu items={classificationOptions} />;
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

  // Tab 5: Risk Responses columns
  const riskResponsesColumns: ColumnType[] = [
    {
      title: "Type of Risk Response",
      dataIndex: "riskResponseType",
      key: "riskResponseType",
      width: 300,
    },
  ];

  // Tab 6: Control Activities columns
  const controlActivitiesColumns: ColumnType[] = [
    {
      title: "Control Objectives",
      dataIndex: "controlObjectives",
      key: "controlObjectives",
      width: 250,
    },
    {
      title: "Control Ref",
      dataIndex: "controlRef",
      key: "controlRef",
      width: 150,
    },
    {
      title: "Control Definition",
      dataIndex: "controlDefinition",
      key: "controlDefinition",
      width: 250,
    },
    {
      title: "Control Description",
      dataIndex: "controlDescription",
      key: "controlDescription",
      width: 300,
    },
    {
      title: "Control Responsibility",
      dataIndex: "controlResponsibility",
      key: "controlResponsibility",
      width: 200,
    },
    {
      title: "Key Control",
      dataIndex: "keyControl",
      key: "keyControl",
      width: 150,
      render: (checked: boolean) => (
        <Checkbox checked={checked} className="flex justify-center" />
      ),
    },
  ];

  // Tab 7: Control Assessment columns
  const controlAssessmentColumns: ColumnType[] = [
    {
      title: "Level of Responsibility",
      dataIndex: "levelResponsibility",
      key: "levelResponsibility",
      width: 200,
    },
    {
      title: "COSO Principle #",
      dataIndex: "cosoPrinciple",
      key: "cosoPrinciple",
      width: 150,
    },
    {
      title: "Operational Approach",
      dataIndex: "operationalApproach",
      key: "operationalApproach",
      width: 200,
      render: (text: any, record: any) => {
        const approachOptions = [
          { label: "Automated", key: "automated" },
          { label: "Manual", key: "manual" },
        ];
        const menu = <Menu items={approachOptions} />;
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
    },
    {
      title: "Control Classification",
      dataIndex: "controlClassification",
      key: "controlClassification",
      width: 200,
      render: (text: any, record: any) => {
        const classificationOptions = [
          { label: "Preventive", key: "preventive" },
          { label: "Detective", key: "detective" },
          { label: "Corrective", key: "corrective" },
        ];
        const menu = <Menu items={classificationOptions} />;
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

  // Tab 8: Risk Assessment (Residual Risk) columns - same as Inherent Risk
  const riskAssessmentResidualColumns: ColumnType[] =
    riskAssessmentInherentColumns;

  // Tab 9: SOX - Financial Statement Assertions columns
  const soxColumns: ColumnType[] = [
    {
      title: "SOX Control Activity",
      dataIndex: "soxControlActivity",
      key: "soxControlActivity",
      width: 250,
    },
    {
      title: "Internal Control Over Financial Reporting?",
      dataIndex: "internalControlFinancial",
      key: "internalControlFinancial",
      width: 280,
      render: (checked: boolean) => (
        <Checkbox checked={checked} className="flex justify-center" />
      ),
    },
    {
      title: "Occurrence",
      dataIndex: "occurrence",
      key: "occurrence",
      width: 150,
      render: (checked: boolean) => (
        <Checkbox checked={checked} className="flex justify-center" />
      ),
    },
    {
      title: "Completeness",
      dataIndex: "completeness",
      key: "completeness",
      width: 150,
      render: (checked: boolean) => (
        <Checkbox checked={checked} className="flex justify-center" />
      ),
    },
    {
      title: "Accuracy",
      dataIndex: "accuracy",
      key: "accuracy",
      width: 150,
      render: (checked: boolean) => (
        <Checkbox checked={checked} className="flex justify-center" />
      ),
    },
    {
      title: "Authorization",
      dataIndex: "authorization",
      key: "authorization",
      width: 150,
      render: (checked: boolean) => (
        <Checkbox checked={checked} className="flex justify-center" />
      ),
    },
    {
      title: "Cutoff",
      dataIndex: "cutoff",
      key: "cutoff",
      width: 120,
      render: (checked: boolean) => (
        <Checkbox checked={checked} className="flex justify-center" />
      ),
    },
    {
      title: "Classification",
      dataIndex: "classificationSOX",
      key: "classificationSOX",
      width: 150,
      render: (checked: boolean) => (
        <Checkbox checked={checked} className="flex justify-center" />
      ),
    },
    {
      title: "Existence",
      dataIndex: "existence",
      key: "existence",
      width: 150,
      render: (checked: boolean) => (
        <Checkbox checked={checked} className="flex justify-center" />
      ),
    },
    {
      title: "Rights and Obligations",
      dataIndex: "rightsObligations",
      key: "rightsObligations",
      width: 180,
      render: (checked: boolean) => (
        <Checkbox checked={checked} className="flex justify-center" />
      ),
    },
    {
      title: "Valuation and Allocation",
      dataIndex: "valuationAllocation",
      key: "valuationAllocation",
      width: 200,
      render: (checked: boolean) => (
        <Checkbox checked={checked} className="flex justify-center" />
      ),
    },
    {
      title: "Presentation / Disclosure",
      dataIndex: "presentationDisclosure",
      key: "presentationDisclosure",
      width: 200,
      render: (checked: boolean) => (
        <Checkbox checked={checked} className="flex justify-center" />
      ),
    },
  ];

  // Tab 10: Internal Audit Test columns
  const internalAuditTestColumns: ColumnType[] = [
    {
      title: "Check",
      dataIndex: "check",
      key: "check",
      width: 150,
      render: (checked: boolean) => (
        <Checkbox checked={checked} className="flex justify-center" />
      ),
    },
    {
      title: "Internal Audit Test",
      dataIndex: "internalAuditTest",
      key: "internalAuditTest",
      width: 400,
    },
    {
      title: "Sample Size",
      dataIndex: "sampleSize",
      key: "sampleSize",
      width: 150,
    },
  ];

  // Tab 11: GRC Exception Log columns
  const grcExceptionLogColumns: ColumnType[] = [
    {
      title: "GRC Adequacy",
      dataIndex: "grcAdequacy",
      key: "grcAdequacy",
      width: 200,
    },
    {
      title: "GRC Effectiveness",
      dataIndex: "grcEffectiveness",
      key: "grcEffectiveness",
      width: 200,
    },
    {
      title: "Explanation",
      dataIndex: "explanation",
      key: "explanation",
      width: 400,
    },
  ];

  // Get columns based on active tab and sub-tab
  const getColumns = (): ColumnType[] => {
    let dynamicColumns: ColumnType[] = [];

    switch (activeTab) {
      case "1": // Process
        dynamicColumns = processColumns;
        break;
      case "2": // Ownership
        dynamicColumns = ownershipColumns;
        break;
      case "3": // Control Environment
        if (activeSubTab === "coso") {
          dynamicColumns = cosoColumns;
        } else if (activeSubTab === "intosai") {
          dynamicColumns = intosaiColumns;
        } else {
          dynamicColumns = otherEnvColumns;
        }
        break;
      case "4": // Risk Assessment (Inherent Risk)
        dynamicColumns = riskAssessmentInherentColumns;
        break;
      case "5": // Risk Responses
        dynamicColumns = riskResponsesColumns;
        break;
      case "6": // Control Activities
        dynamicColumns = controlActivitiesColumns;
        break;
      case "7": // Control Assessment
        dynamicColumns = controlAssessmentColumns;
        break;
      case "8": // Risk Assessment (Residual Risk)
        dynamicColumns = riskAssessmentResidualColumns;
        break;
      case "9": // SOX - Financial Statement Assertions
        dynamicColumns = soxColumns;
        break;
      case "10": // Internal Audit Test
        dynamicColumns = internalAuditTestColumns;
        break;
      case "11": // GRC Exception Log
        dynamicColumns = grcExceptionLogColumns;
        break;
      default:
        dynamicColumns = processColumns;
    }

    return [...baseColumns, ...dynamicColumns];
  };

  const data: DataType[] = [
    {
      key: "1",
      no: "5.1",
      process: "Establishing Account Receivable",
      // Process tab data
      processDescription:
        "This Account Receivable recoding policy establishes guidelines relating to receivable management, in particular how and when to reserve a receivable, write-off a receivable, and recover a receivable",
      processObjective:
        "The objective of this Account Receivable recoding policy is to ensure consistency in Company’s accounting treatment of receivables. Accurately record invoices on a timely basis for all accepted sales that have been authorized. ",
      processSeverityLevels: "Critical",
      // Ownership tab data
      activity: "Account Receivable Processing",
      process2: "Account Receivable Recording",
      stage: "Initiation",
      functions: "Finance",
      clientSegment: "Account Receivable",
      operationalUnit: "A",
      division: "C",
      entity: "XYZ",
      unitDepartment: "Account Receivable ",
      productClass: "Non",
      productName: "Others",
      // Environment tab data (checkboxes)
      integrityEthical: true,
      boardOversight: false,
      orgStructure: true,
      commitmentCompetence: true,
      managementPhilosophy: false,
    },
    {
      key: "2",
      no: "5.2",
      process: "Establishment of Account Receivable Control Devices",
      processDescription:
        "Review the accuracy over sales invoice processing and receipt in order to prevent duplicate recording of cash collection. ",
      processObjective:
        "Review the accuracy over sales invoice processing and receipt in order to prevent duplicate recording of cash collection",
      processSeverityLevels: "High",
      activity: "Accuracy of Invoice Processing ",
      process2: "Invoicing",
      stage: "Processing",
      functions: "Finance",
      clientSegment: "Retail",
      operationalUnit: "A",
      division: "C",
      entity: "XYZ",
      unitDepartment: "Account Receivable",
      productClass: "Non",
      productName: "Others",
      integrityEthical: false,
      boardOversight: true,
      orgStructure: false,
      commitmentCompetence: true,
      managementPhilosophy: true,
    },
    {
      key: "3",
      no: "5.3",
      process: "Returns and allowances from customer",
      processDescription:
        "Accurately record all authorized sales returns and allowances and only such returns and allowances.",
      processObjective:
        "Returns of goods from customer should be adequately controlled, documented, and recorded.",
      processSeverityLevels: "High",
      activity: "Sales Return ",
      process2: "Handling of Sales  Return ",
      stage: "Processing",
      functions: "Finance",
      clientSegment: "Account Receivable",
      operationalUnit: "A",
      division: "C",
      entity: "XYZ",
      unitDepartment: "Account Receivable",
      productClass: "Non",
      productName: "Others",
      integrityEthical: true,
      boardOversight: true,
      orgStructure: true,
      commitmentCompetence: false,
      managementPhilosophy: false,
    },
    {
      key: "4",
      no: "5.4",
      process:
        "Offer Discount and allowance on Accounts Receivable collection ",
      processDescription:
        "Sales discount refers to reduction in the amount due as a result of early payment, hence pertaining to cash discounts. ",
      processObjective:
        "A sales discount may be offered when the seller is short of cash, or if it wants to reduce the recorded amount of its receivables outstanding for other reasons.",
      processSeverityLevels: "High",
      activity: "Offer Discount and allowance to the customer ",
      process2: "Allowing Sales discount and allowance",
      stage: "Processing",
      functions: "Finance",
      clientSegment: "Account Receivable",
      operationalUnit: "A",
      division: "C",
      entity: "XYZ",
      unitDepartment: "Account Receivable",
      productClass: "Non",
      productName: "others",
      integrityEthical: false,
      boardOversight: false,
      orgStructure: true,
      commitmentCompetence: true,
      managementPhilosophy: true,
    },
    {
      key: "5",
      no: "5.5",
      process: "Estimate the Accounts Receivable Aging Analysis",
      processDescription:
        "An accounts receivable aging is a report that lists unpaid customer invoices and unused credit memos by date ranges. The aging report is the primary tool used by collections personnel to determine which invoices are overdue for payment.",
      processObjective:
        "The purpose of this accounts receivable aging is to show what receivables must be dealt with more urgently because they've been overdue longer.",
      processSeverityLevels: "High",
      activity: "Account Receivable Aging Analysis",
      process2: "A/R Aging Analysis Process",
      stage: "Processing",
      functions: "Finance",
      clientSegment: "Account Receivable",
      operationalUnit: "A",
      division: "C",
      entity: "XYZ",
      unitDepartment: "Account Receivable ",
      productClass: "Non",
      productName: "Others",
      integrityEthical: true,
      boardOversight: true,
      orgStructure: false,
      commitmentCompetence: false,
      managementPhilosophy: true,
    },
    {
      key: "6",
      no: "5.6",
      process: "Assessing the Allowance for Doubtful Accounts",
      processDescription:
        "The allowance for bad debt is an account that needs strong financial controls. ",
      processObjective:
        "When there’s objective evidence that the receivable amount is no longer recoverable. As such, only specific provision is allowed. g",
      processSeverityLevels: "High",
      activity: "Allowance for Doubtful Accounts Recording",
      process2: "Allowance for Doubtful Accounts Process",
      stage: "Processing",
      functions: "Finance",
      clientSegment: "Account Receivable",
      operationalUnit: "A",
      division: "C",
      entity: "XYZ",
      unitDepartment: "Account Receivable",
      productClass: "Non",
      productName: "Others",
      integrityEthical: true,
      boardOversight: false,
      orgStructure: true,
      commitmentCompetence: true,
      managementPhilosophy: false,
    },
    {
      key: "7",
      no: "5.7",
      process: "Sending statement of account to the customers. ",
      processDescription:
        "A statement of accounts is an effective way to provide customers with a recap of the products and services that were billed to them. Statement also helps the business owners confirm the payments that the customer has already made for a statement period, which is generally a month",
      processObjective:
        "The company send statements of accounts to their customers to let them know how much they owe for sales that took place on credit during that period.",
      processSeverityLevels: "High",
      activity: "Statement of Account to the Customers",
      process2: "Statement of Account",
      stage: "Processing",
      functions: "Finance",
      clientSegment: "Account Receivable",
      operationalUnit: "A",
      division: "C",
      entity: "XYZ",
      unitDepartment: "Account Receivable",
      productClass: "Non",
      productName: "Others",
      integrityEthical: false,
      boardOversight: true,
      orgStructure: false,
      commitmentCompetence: true,
      managementPhilosophy: true,
    },
    {
      key: "8",
      no: "5.8",
      process: "Cash Receipts from Customers",
      processDescription:
        "Recording cash receipts and preparing the deposits, and approval of any adjustments or write-off to any receivable accounts.",
      processObjective:
        "Separate the accounts receivable function and cash collection function",
      processSeverityLevels: "High",
      activity: "Cash Collection from Customers",
      process2: "Cash Collection Process",
      stage: "Processing",
      functions: "Finance",
      clientSegment: "Account Receivable",
      operationalUnit: "A",
      division: "C",
      entity: "XYZ",
      unitDepartment: "Account Receivable",
      productClass: "Non",
      productName: "Others",
      integrityEthical: true,
      boardOversight: true,
      orgStructure: true,
      commitmentCompetence: false,
      managementPhilosophy: false,
    },
    {
      key: "9",
      no: "5.9",
      process: "Preparation of the Account Receivable Voucher Package",
      processDescription:
        "The Account Receivable Voucher Package is prepared to verify the supporting documents thoroughly in respect of date, amount, nature of transactions.",
      processObjective:
        "Accounts Receivable Allows to enter an accounts receivable voucher by entering a sales order, invoice and voucher automatically.",
      processSeverityLevels: "High",
      activity: "Vouching",
      process2: "Voucher  Processing",
      stage: "Processing",
      functions: "Finance",
      clientSegment: "Account Receivable",
      operationalUnit: "A",
      division: "C",
      entity: "XYZ",
      unitDepartment: "Account Receivable",
      productClass: "Non",
      productName: "Others",
      integrityEthical: false,
      boardOversight: false,
      orgStructure: true,
      commitmentCompetence: true,
      managementPhilosophy: true,
    },
    {
      key: "10",
      no: "5.10",
      process: "Procedures Performed on Account Receivable Voucher Package",
      processDescription:
        "Recording in the Account Receivable  Voucher Register, generate the report of Largest Amounts received from customer",
      processObjective:
        "Each receivable voucher should relate to one and only one invoice, debit note , or credit note which company have issued to a customer.",
      processSeverityLevels: "High",
      activity: "Vouching",
      process2: "Voucher  Processing",
      stage: "Processing",
      functions: "Finance",
      clientSegment: "Account Receivable",
      operationalUnit: "A",
      division: "C",
      entity: "XYZ",
      unitDepartment: "Account Receivable",
      productClass: "Non",
      productName: "Others",
      integrityEthical: true,
      boardOversight: true,
      orgStructure: false,
      commitmentCompetence: false,
      managementPhilosophy: true,
    },
    {
      key: "11",
      no: "5.11",
      process: "Review accounts receivable journal entries",
      processDescription:
        "Journal entries are properly approved and recorded completely and accurately in the general ledger",
      processObjective:
        "Controls are in place to provide reasonable assurance that data recorded, processed and reported remain complete, accurate and valid throughout the update and storage processes.",
      processSeverityLevels: "High",
      activity: "Perform Journal Entriesg",
      process2: "Journalizing Process",
      stage: "Processing",
      functions: "Finance",
      clientSegment: "Account Receivable",
      operationalUnit: "A",
      division: "C",
      entity: "XYZ",
      unitDepartment: "Account Receivable",
      productClass: "Non",
      productName: "Others",
      integrityEthical: true,
      boardOversight: false,
      orgStructure: true,
      commitmentCompetence: true,
      managementPhilosophy: false,
    },
    {
      key: "12",
      no: "5.12",
      process:
        "Reconciliation of Account Receivable Sub-ledger to Account Receivable General Ledger",
      processDescription:
        "The reconciliation of accounts receivable is the process of matching the detailed amounts of unpaid customer billings to the accounts receivable total stated in the general ledger",
      processObjective:
        "This matching process is important, because it proves that the general ledger figure for receivables is justified.",
      processSeverityLevels: "High",
      activity: "Reconciliation",
      process2: "Comparison of A/R SL to GL",
      stage: "Processing",
      functions: "Finance",
      clientSegment: "Account Receivable",
      operationalUnit: "A",
      division: "C",
      entity: "XYZ",
      unitDepartment: "Account Receivable",
      productClass: "Non",
      productName: "Others",
      integrityEthical: false,
      boardOversight: true,
      orgStructure: false,
      commitmentCompetence: true,
      managementPhilosophy: true,
    },
  ];

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen overflow-y-auto">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              RCM – Account Receivable
            </h1>
            <div className="flex space-x-3 bg-white border border-black shadow-sm ">
              <button className="p-2 rounded-md  hover:bg-gray-50 transition text-black font-bold">
                <LeftOutlined />
              </button>
              <div className="bg-black w-[2px] h-6 my-auto"></div>
              <button className="p-2 ounded-md hover:bg-gray-50 transition text-black font-bold">
                <RightOutlined />
              </button>
            </div>
          </div>

          {/*  Tabs section */}
          <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-sm mb-6 px-6 py-2">
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              className="text-lg"
              items={[
                { key: "1", label: "Process" },
                { key: "2", label: "Ownership" },
                { key: "3", label: "Control Environment" },
                { key: "4", label: "Risk Assessment (Inherent Risk)" },
                { key: "5", label: "Risk Responses" },
                { key: "6", label: "Control Activities" },
                { key: "7", label: "Control Assessment" },
                { key: "8", label: "Risk Assessment (Residual Risk)" },
                { key: "9", label: "SOX - Financial Statement Assertions" },
                { key: "10", label: "Internal Audit Test" },
                { key: "11", label: "GRC Exception Log" },
              ]}
            />
          </div>

          {/* Sub-tabs for Control Environment */}
          {activeTab === "3" && (
            <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-sm mb-6 px-6 py-2">
              <Tabs
                activeKey={activeSubTab}
                onChange={setActiveSubTab}
                className="text-sm"
                items={[
                  { key: "coso", label: "COSO" },
                  {
                    key: "intosai",
                    label: "INTOSAI, IFAC, and Government Audit Standards",
                  },
                  { key: "other", label: "Other" },
                ]}
              />
            </div>
          )}

          {/*  Table Section */}
          <div className="p-4 bg-white shadow-md overflow-x-auto">
            <Table
              columns={getColumns()}
              dataSource={data}
              pagination={false}
              scroll={{ x: 1300, y: 450 }}
              bordered
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AccountReceivable;

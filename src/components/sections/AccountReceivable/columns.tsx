"use client";
import React from "react";
import {
  EditOutlined,
  DeleteOutlined,
  LockOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { Menu, Dropdown, Checkbox, Button, Input, Popconfirm } from "antd";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import { DataType } from "./types";

const { TextArea } = Input;

// Your existing options arrays remain the same
export const stageOptions = [
  { label: "Processing", key: "Processing" },
  { label: "Posting", key: "Posting" },
  { label: "Initiation", key: "Initiation" },
  { label: "Confirmation", key: "Confirmation" },
];

export const severityOptions = [
  { label: "Catastrophic", key: "Catastrophic" },
  { label: "Major", key: "Major" },
  { label: "Moderate", key: "Moderate" },
  { label: "Minor", key: "Minor" },
  { label: "Insignificant", key: "Insignificant" },
];

export const processSeverityLevelsOptions = [
  { label: "Critical", key: "Critical" },
  { label: "High", key: "High" },
  { label: "Medium", key: "Medium" },
  { label: "Low", key: "Low" },
];

export const cosoPrincipleOptions = [
  {
    label: "1. Demonstrates commitment to integrity and ethical values",
    key: "1. Demonstrates commitment to integrity and ethical values",
  },
  {
    label: "2. Exercises oversight responsibility",
    key: "2. Exercises oversight responsibility",
  },
  {
    label: "3. Establishes structure, authority, and responsibility",
    key: "3. Establishes structure, authority, and responsibility",
  },
  {
    label: "4. Demonstrates commitment to competence",
    key: "4. Demonstrates commitment to competence",
  },
  { label: "5. Enforces accountability", key: "5. Enforces accountability" },
  {
    label: "6. Specifies suitable objectives",
    key: "6. Specifies suitable objectives",
  },
  {
    label: "7. Identifies and analyzes risk",
    key: "7. Identifies and analyzes risk",
  },
  { label: "8. Assesses fraud risk", key: "8. Assesses fraud risk" },
  {
    label: "9. Identifies and analyzes significant change",
    key: "9. Identifies and analyzes significant change",
  },
  {
    label: "10. Selects and develops control activities",
    key: "10. Selects and develops control activities",
  },
  {
    label: "11. Selects and develops general controls over technology",
    key: "11. Selects and develops general controls over technology",
  },
  {
    label: "12. Deploys through policies and procedures",
    key: "12. Deploys through policies and procedures",
  },
  {
    label: "13. Uses relevant information",
    key: "13. Uses relevant information",
  },
  { label: "14. Communicates internally", key: "14. Communicates internally" },
  { label: "15. Communicates externally", key: "15. Communicates externally" },
  {
    label: "16. Conducts ongoing and/or separate evaluations",
    key: "16. Conducts ongoing and/or separate evaluations",
  },
  {
    label: "17. Evaluates and communicates deficiencies",
    key: "17. Evaluates and communicates deficiencies",
  },
];

export const yesNoOptions = [
  { label: "Yes", key: "Yes" },
  { label: "No", key: "No" },
];

export const operationalFrequencyOptions = [
  { label: "Daily", key: "Daily" },
  { label: "Weekly", key: "Weekly" },
  { label: "Monthly", key: "Monthly" },
  { label: "Quarterly", key: "Quarterly" },
  { label: "Semiannually", key: "Semiannually" },
  { label: "Annually", key: "Annually" },
  { label: "Every 2 Years", key: "Every 2 Years" },
  { label: "Every 3 Years", key: "Every 3 Years" },
  { label: "As and When", key: "As and When" },
];

export const soxControlActivityOptions = [
  {
    label: "Financial Controller Activity",
    key: "Financial Controller Activity",
  },
  { label: "Other", key: "Other" },
];

// Simple buildMenu function (remove React.memo for now)
const buildMenu = (items: { label: string; key: string }[], onClick?: (key: string) => void) => {
  return (
    <Menu
      onClick={(info) => {
        onClick?.(String(info.key));
      }}
      items={items as any}
      style={{
        maxHeight: "300px",
        overflowY: "auto",
        scrollbarWidth: "thin",
        msOverflowStyle: "none",
      }}
      className="custom-scrollbar"
    />
  );
};

// Helper function to get color based on severity/impact level
const getColorForSeverity = (
  value: string
): { bgColor: string; textColor: string; borderColor: string } => {
  switch (value) {
    case "Catastrophic":
      return {
        bgColor: "#FE0000",
        textColor: "#FFFFFF",
        borderColor: "#CC0000",
      };
    case "Major":
      return {
        bgColor: "#FFC000",
        textColor: "#000000",
        borderColor: "#CCAA00",
      };
    case "Moderate":
      return {
        bgColor: "#FFFD04",
        textColor: "#000000",
        borderColor: "#99CC00",
      };
    case "Minor":
      return {
        bgColor: "#8FD154",
        textColor: "#000000",
        borderColor: "#00AA00",
      };
    case "Insignificant":
      return {
        bgColor: "#00AF50",
        textColor: "#000000",
        borderColor: "#00AA44",
      };
    case "Critical":
      return {
        bgColor: "#FE0000",
        textColor: "#FFFFFF",
        borderColor: "#CC0000",
      };
    case "High":
      return {
        bgColor: "#FFC000",
        textColor: "#000000",
        borderColor: "#CCAA00",
      };
    case "Moderate":
      return {
        bgColor: "#FFFD04",
        textColor: "#000000",
        borderColor: "#99CC00",
      };
    case "Low":
      return {
        bgColor: "#8FD154",
        textColor: "#000000",
        borderColor: "#00AA00",
      };
    case "Lowest":
      return {
        bgColor: "#00AF50",
        textColor: "#000000",
        borderColor: "#00AA44",
      };
    case "Certain":
      return {
        bgColor: "#FE0000",
        textColor: "#FFFFFF",
        borderColor: "#CC0000",
      };
    case "Likely":
      return {
        bgColor: "#FFC000",
        textColor: "#000000",
        borderColor: "#CCAA00",
      };
    case "Possible":
      return {
        bgColor: "#FFFD04",
        textColor: "#000000",
        borderColor: "#99CC00",
      };
    case "Unlikely":
      return {
        bgColor: "#8FD154",
        textColor: "#000000",
        borderColor: "#00AA00",
      };
    case "Rare":
      return {
        bgColor: "#00AF50",
        textColor: "#000000",
        borderColor: "#00AA44",
      };
    default:
      return {
        bgColor: "#F5F5F5",
        textColor: "#000000",
        borderColor: "#D9D9D9",
      };
  }
};

// Simple render functions without complex memoization
const renderEditableCheckbox = (
  value: boolean,
  record: DataType,
  field: keyof DataType,
  onCheckboxChange?: (rowKey: string, field: keyof DataType, checked: boolean) => void
) => {
  return (
    <Checkbox
      checked={value}
      onChange={(e) => onCheckboxChange?.(record.key, field, e.target.checked)}
      className="flex justify-center"
    />
  );
};

const renderTextArea = (
  text: string,
  record: DataType,
  field: keyof DataType,
  handlers: any,
  editingKeys: string[]
) => {
  if (editingKeys.includes(record.key)) {
    return (
      <TextArea
        value={text}
        onChange={(e) => handlers?.onTextChange?.(record.key, field, e.target.value)}
        autoSize={{ minRows: 2 }}
      />
    );
  }
  return text;
};

const renderInput = (
  text: string,
  record: DataType,
  field: keyof DataType,
  handlers: any,
  editingKeys: string[]
) => {
  if (editingKeys.includes(record.key)) {
    return (
      <Input
        value={text}
        onChange={(e) => handlers?.onTextChange?.(record.key, field, e.target.value)}
      />
    );
  }
  return text;
};

const renderDropdown = (
  text: any,
  record: DataType,
  field: keyof DataType,
  options: { label: string; key: string }[],
  handlers: any
) => {
  const handleMenuClick = (key: string) => {
    handlers?.onSelectGeneric?.(key, record.key, field);
  };

  const menu = buildMenu(options, handleMenuClick);
  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <div className="flex items-center cursor-pointer">
        {text || "Select"}
        <DownOutlined className="ml-1 text-gray-500 text-xs" />
      </div>
    </Dropdown>
  );
};

const renderColoredDropdown = (
  text: any,
  record: DataType,
  field: keyof DataType,
  options: { label: string; key: string }[],
  handlers: any
) => {
  const handleMenuClick = (key: string) => {
    handlers?.onSelectGeneric?.(key, record.key, field);
  };

  const menu = buildMenu(options, handleMenuClick);
  const { bgColor, textColor, borderColor } = getColorForSeverity(text);
  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <div
        className="flex items-center cursor-pointer p-2 rounded"
        style={{
          backgroundColor: bgColor,
          color: textColor,
          border: `1px solid ${borderColor}`,
          fontWeight: "600",
        }}
      >
        {text || "Select"}
        <DownOutlined className="ml-2" style={{ color: textColor }} />
      </div>
    </Dropdown>
  );
};

// Base columns
const getBaseColumns = (handlers: any, editingKeys: string[]): ColumnsType<DataType> => [
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
    render: (text: string) => text || "-",
  },
  {
    title: "Processes",
    dataIndex: "process",
    key: "process",
    width: 300,
    fixed: "left",
    render: (text: string, record: DataType) =>
      renderInput(text, record, "process", handlers, editingKeys),
  },
];

// Process columns
const getProcessColumns = (handlers: any, editingKeys: string[]): ColumnsType<DataType> => [
  {
    title: "Process Description",
    dataIndex: "processDescription",
    key: "processDescription",
    width: 300,
    render: (text: string, record: DataType) =>
      renderTextArea(text, record, "processDescription", handlers, editingKeys),
  },
  {
    title: "Process Objective",
    dataIndex: "processObjective",
    key: "processObjective",
    width: 300,
    render: (text: string, record: DataType) =>
      renderTextArea(text, record, "processObjective", handlers, editingKeys),
  },
  {
    title: "Process Severity Levels",
    dataIndex: "processSeverityLevels",
    key: "processSeverityLevels",
    width: 200,
    render: (text: any, record: DataType) =>
      renderDropdown(text, record, "processSeverityLevels", processSeverityLevelsOptions, handlers),
  },
];

// Ownership columns
const getOwnershipColumns = (handlers: any, editingKeys: string[]): ColumnsType<DataType> => [
  {
    title: "Activity",
    dataIndex: "activity",
    key: "activity",
    width: 250,
    render: (text: string, record: DataType) =>
      renderInput(text, record, "activity", handlers, editingKeys),
  },
  {
    title: "Process",
    dataIndex: "process2",
    key: "process2",
    width: 250,
    render: (text: string, record: DataType) =>
      renderInput(text, record, "process2", handlers, editingKeys),
  },
  {
    title: "Process Stage",
    dataIndex: "stage",
    key: "stage",
    width: 180,
    render: (text: any, record: DataType) => {
      const handleMenuClick = (key: string) => {
        handlers?.onStageChange?.(key, record.key);
      };
      const menu = buildMenu(stageOptions, handleMenuClick);
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
    render: (text: string, record: DataType) =>
      renderInput(text, record, "functions", handlers, editingKeys),
  },
  {
    title: "Client Segment / Functional Segment",
    dataIndex: "clientSegment",
    key: "clientSegment",
    width: 180,
    render: (text: string, record: DataType) =>
      renderInput(text, record, "clientSegment", handlers, editingKeys),
  },
  {
    title: "Operational Unit",
    dataIndex: "operationalUnit",
    key: "operationalUnit",
    width: 180,
    render: (text: string, record: DataType) =>
      renderInput(text, record, "operationalUnit", handlers, editingKeys),
  },
  {
    title: "Division",
    dataIndex: "division",
    key: "division",
    width: 150,
    render: (text: string, record: DataType) =>
      renderInput(text, record, "division", handlers, editingKeys),
  },
  {
    title: "Entity",
    dataIndex: "entity",
    key: "entity",
    width: 150,
    render: (text: string, record: DataType) =>
      renderInput(text, record, "entity", handlers, editingKeys),
  },
  {
    title: "Unit / Department",
    dataIndex: "unitDepartment",
    key: "unitDepartment",
    width: 180,
    render: (text: string, record: DataType) =>
      renderInput(text, record, "unitDepartment", handlers, editingKeys),
  },
  {
    title: "Product Class",
    dataIndex: "productClass",
    key: "productClass",
    width: 150,
    render: (text: string, record: DataType) =>
      renderInput(text, record, "productClass", handlers, editingKeys),
  },
  {
    title: "Product Name",
    dataIndex: "productName",
    key: "productName",
    width: 180,
    render: (text: string, record: DataType) =>
      renderInput(text, record, "productName", handlers, editingKeys),
  },
];

// COSO columns
const getCosoColumns = (handlers: any, editingKeys: string[]): ColumnsType<DataType> => [
  {
    title: "Integrity & Ethical Values",
    dataIndex: "integrityEthical",
    key: "integrityEthical",
    width: 200,
    render: (checked: boolean, record: DataType) =>
      renderEditableCheckbox(checked, record, "integrityEthical", handlers?.onCheckboxChange),
  },
  {
    title: "Board Oversight",
    dataIndex: "boardOversight",
    key: "boardOversight",
    width: 180,
    render: (checked: boolean, record: DataType) =>
      renderEditableCheckbox(checked, record, "boardOversight", handlers?.onCheckboxChange),
  },
  {
    title: "Organizational Structure",
    dataIndex: "orgStructure",
    key: "orgStructure",
    width: 200,
    render: (checked: boolean, record: DataType) =>
      renderEditableCheckbox(checked, record, "orgStructure", handlers?.onCheckboxChange),
  },
  {
    title: "Commitment to Competence",
    dataIndex: "commitmentCompetence",
    key: "commitmentCompetence",
    width: 220,
    render: (checked: boolean, record: DataType) =>
      renderEditableCheckbox(checked, record, "commitmentCompetence", handlers?.onCheckboxChange),
  },
  {
    title: "Management Philosophy",
    dataIndex: "managementPhilosophy",
    key: "managementPhilosophy",
    width: 200,
    render: (checked: boolean, record: DataType) =>
      renderEditableCheckbox(checked, record, "managementPhilosophy", handlers?.onCheckboxChange),
  },
];

// Actions column
const getActionsColumn = (handlers: any, editingKeys: string[]): ColumnsType<DataType>[0] => ({
  title: "Actions",
  key: "actions",
  width: 200,
  render: (_, record: DataType) => {
    const isActive = record.isActive !== false;

    if (editingKeys.includes(record.key)) {
      return (
        <Button onClick={() => handlers?.onSaveRow?.(record.key)}>
          Save
        </Button>
      );
    } else {
      return (
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {isActive && (
            <Button
              icon={<EditOutlined />}
              onClick={() => handlers?.onEditRow?.(record.key)}
            />
          )}
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handlers?.onDeleteRow?.(record.key)}
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
          <Button
            icon={isActive ? <LockOutlined /> : <UnlockOutlined />}
            onClick={() => handlers?.onToggleStatus?.(record.key)}
            type={isActive ? "default" : "primary"}
            title={isActive ? "Deactivate" : "Activate"}
          />
        </div>
      );
    }
  },
});

export function getColumns(
  activeTab: string,
  activeSubTab: string,
  handlers?: any,
  editingKeys: string[] = []
): ColumnsType<DataType> {
  
  let dynamicColumns: ColumnsType<DataType> = getProcessColumns(handlers, editingKeys);
  
  switch (activeTab) {
    case "1":
      dynamicColumns = getProcessColumns(handlers, editingKeys);
      break;
    case "2":
      dynamicColumns = getOwnershipColumns(handlers, editingKeys);
      break;
    case "3":
      if (activeSubTab === "coso") dynamicColumns = getCosoColumns(handlers, editingKeys);
      else if (activeSubTab === "intosai") dynamicColumns = getCosoColumns(handlers, editingKeys); // Use same for now
      else dynamicColumns = getCosoColumns(handlers, editingKeys); // Use same for now
      break;
    // Add other cases for remaining tabs...
    default:
      dynamicColumns = getProcessColumns(handlers, editingKeys);
  }

  return [...getBaseColumns(handlers, editingKeys), ...dynamicColumns, getActionsColumn(handlers, editingKeys)];
}
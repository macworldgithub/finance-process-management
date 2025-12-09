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
import { Select } from "antd";
const { TextArea } = Input;

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

const renderEditableCheckbox = (
  value: boolean | string,
  record: DataType,
  field: keyof DataType,
  onCheckboxChange?: (
    rowKey: string,
    field: keyof DataType,
    checked: boolean
  ) => void,
  editingKeys?: string[]
) => {
  if (editingKeys && editingKeys.includes(record.key)) {
    return (
      <Checkbox
        checked={value === true || value === "P"}
        onChange={(e) =>
          onCheckboxChange?.(record.key, field, e.target.checked)
        }
        className="flex justify-center"
      />
    );
  }
  if (value === true || value === "P") {
    return <span style={{ fontSize: 18, color: "#52c41a" }}>&#10003;</span>; // tick
  }
  if (value === false || value === "O") {
    return <span style={{ fontSize: 18, color: "#d9d9d9" }}>&#10007;</span>; // cross
  }
  return null;
};

const renderEditableInput = (
  value: string,
  recordKey: string,
  field: keyof DataType,
  handlers?: {
    onTextChange?: (
      rowKey: string,
      field: keyof DataType,
      value: string
    ) => void;
  },
  editingKeys: string[] = []
) => {
  if (editingKeys.includes(recordKey)) {
    return (
      <Input
        value={value}
        onChange={(e) =>
          handlers?.onTextChange?.(recordKey, field, e.target.value)
        }
      />
    );
  }
  return value;
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
    // Probability/Likelihood colors
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
    onDeleteRow?: (rowKey: string) => void;
    onToggleStatus?: (rowKey: string) => void;
  },
  editingKeys: string[] = []
): ColumnsType<DataType> {
  const actionsColumn: ColumnsType<DataType>[0] = {
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
                onClick={(e) => {
                  e.stopPropagation();
                  handlers?.onEditRow?.(record.key);
                }}
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
  };

  const baseColumns: ColumnsType<DataType> = [
    {
      title: () => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>No.</span>
          <Button
            style={{ marginLeft: 8 }}
            size="small"
            icon={<PlusOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              handlers?.onAddRow?.();
            }}
          />
        </div>
      ),
      dataIndex: "no",
      key: "no",
      width: 80,
      render: (text: string) => text || "-",
    },
    {
      title: "Processes",
      dataIndex: "process",
      key: "process",
      width: 300,
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

  // RCM Assessment specific columns
  const adequacyColumns: ColumnsType<DataType> = [
    {
      title: "Design Adequacy Score(0-10)",
      dataIndex: "designAdequacyScore",
      key: "designAdequacyScore",
      width: 180,
      render: (text: any, record: DataType) =>
        renderEditableInput(
          text,
          record.key,
          "designAdequacyScore",
          handlers,
          editingKeys
        ),
    },
    {
      title: "Sustainability Score(0-10)",
      dataIndex: "sustainabilityScore",
      key: "sustainabilityScore",
      width: 180,
      render: (text: any, record: DataType) =>
        renderEditableInput(
          text,
          record.key,
          "sustainabilityScore",
          handlers,
          editingKeys
        ),
    },
    {
      title: "Scalability Score(0-5)",
      dataIndex: "scalabilityScore",
      key: "scalabilityScore",
      width: 160,
      render: (text: any, record: DataType) =>
        renderEditableInput(
          text,
          record.key,
          "scalabilityScore",
          handlers,
          editingKeys
        ),
    },
    {
      title: "Adequacy Score(0-25)",
      dataIndex: "adequacyScore",
      key: "adequacyScore",
      width: 160,
      render: (text: any, record: DataType) =>
        renderEditableInput(
          text,
          record.key,
          "adequacyScore",
          handlers,
          editingKeys
        ),
    },
    {
      title: "Total Score(0-25)",
      dataIndex: "totalScore",
      key: "totalScore",
      width: 140,
      render: (text: any, record: DataType) =>
        renderEditableInput(
          text,
          record.key,
          "totalScore",
          handlers,
          editingKeys
        ),
    },
    {
      title: "Scale(1-5)",
      dataIndex: "scale",
      key: "scale",
      width: 100,
      render: (text: any, record: DataType) =>
        renderEditableInput(text, record.key, "scale", handlers, editingKeys),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      width: 100,
      render: (text: any, record: DataType) =>
        renderEditableInput(text, record.key, "rating", handlers, editingKeys),
    },
  ];

  const effectivenessColumns: ColumnsType<DataType> = [
    {
      title: "Design Score(0-10)",
      dataIndex: "designScore",
      key: "designScore",
      width: 140,
      render: (text: any, record: DataType) =>
        renderEditableInput(
          text,
          record.key,
          "designScore",
          handlers,
          editingKeys
        ),
    },
    {
      title: "Operating Score(0-10)",
      dataIndex: "operatingScore",
      key: "operatingScore",
      width: 160,
      render: (text: any, record: DataType) =>
        renderEditableInput(
          text,
          record.key,
          "operatingScore",
          handlers,
          editingKeys
        ),
    },
    {
      title: "Sustainability Score(0-5)",
      dataIndex: "sustainabilityScore",
      key: "sustainabilityScore",
      width: 180,
      render: (text: any, record: DataType) =>
        renderEditableInput(
          text,
          record.key,
          "sustainabilityScore",
          handlers,
          editingKeys
        ),
    },
    {
      title: "Effectiveness Score(0-25)",
      dataIndex: "effectivenessScore",
      key: "effectivenessScore",
      width: 180,
      render: (text: any, record: DataType) =>
        renderEditableInput(
          text,
          record.key,
          "effectivenessScore",
          handlers,
          editingKeys
        ),
    },
    {
      title: "Total Score(0-25)",
      dataIndex: "totalScore",
      key: "totalScore",
      width: 140,
      render: (text: any, record: DataType) =>
        renderEditableInput(
          text,
          record.key,
          "totalScore",
          handlers,
          editingKeys
        ),
    },
    {
      title: "Scale(1-5)",
      dataIndex: "scale",
      key: "scale",
      width: 100,
      render: (text: any, record: DataType) =>
        renderEditableInput(text, record.key, "scale", handlers, editingKeys),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      width: 100,
      render: (text: any, record: DataType) =>
        renderEditableInput(text, record.key, "rating", handlers, editingKeys),
    },
  ];

  const efficiencyColumns: ColumnsType<DataType> = [
    {
      title: "Objective Achievement Score(0-10)",
      dataIndex: "objectiveAchievementScore",
      key: "objectiveAchievementScore",
      width: 210,
      render: (text: any, record: DataType) =>
        renderEditableInput(
          text,
          record.key,
          "objectiveAchievementScore",
          handlers,
          editingKeys
        ),
    },
    {
      title: "Process Timeliness & Throughput Score(0-10)",
      dataIndex: "processTimelinessScore",
      key: "processTimelinessScore",
      width: 260,
      render: (text: any, record: DataType) =>
        renderEditableInput(
          text,
          record.key,
          "processTimelinessScore",
          handlers,
          editingKeys
        ),
    },
    {
      title: "Resource Consumption Score(0-5)",
      dataIndex: "resourceConsumptionScore",
      key: "resourceConsumptionScore",
      width: 220,
      render: (text: any, record: DataType) =>
        renderEditableInput(
          text,
          record.key,
          "resourceConsumptionScore",
          handlers,
          editingKeys
        ),
    },
    {
      title: "Efficiency Score(0-25)",
      dataIndex: "efficiencyScore",
      key: "efficiencyScore",
      width: 160,
      render: (text: any, record: DataType) =>
        renderEditableInput(
          text,
          record.key,
          "efficiencyScore",
          handlers,
          editingKeys
        ),
    },
    {
      title: "Total Score(0-25)",
      dataIndex: "totalScore",
      key: "totalScore",
      width: 140,
      render: (text: any, record: DataType) =>
        renderEditableInput(
          text,
          record.key,
          "totalScore",
          handlers,
          editingKeys
        ),
    },
    {
      title: "Scale(1-5)",
      dataIndex: "scale",
      key: "scale",
      width: 100,
      render: (text: any, record: DataType) =>
        renderEditableInput(text, record.key, "scale", handlers, editingKeys),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      width: 100,
      render: (text: any, record: DataType) =>
        renderEditableInput(text, record.key, "rating", handlers, editingKeys),
    },
  ];

  const processSeverityColumns: ColumnsType<DataType> = [
    {
      title: "Scale(1-4)",
      dataIndex: "scale",
      key: "scale",
      width: 120,
      render: (text: any, record: DataType) =>
        renderEditableInput(text, record.key, "scale", handlers, editingKeys),
    },
    {
      title: "Process Severity Levels",
      dataIndex: "processSeverityLevels",
      key: "processSeverityLevels",
      width: 180,
      render: (text: any, record: DataType) => {
        if (editingKeys.includes(record.key)) {
          const severityOptions = [
            { label: "Low", key: "Low" },
            { label: "Medium", key: "Medium" },
            { label: "High", key: "High" },
            { label: "Critical", key: "Critical" },
          ];
          const menu = buildMenu(severityOptions, (key) =>
            handlers?.onSelectGeneric?.(
              key,
              record.key,
              "processSeverityLevels"
            )
          );
          return (
            <Dropdown overlay={menu} trigger={["click"]}>
              <div className="flex items-center cursor-pointer">
                {text || "Select"}
                <DownOutlined className="ml-1 text-gray-500 text-xs" />
              </div>
            </Dropdown>
          );
        }
        return text || "";
      },
    },
  ];

  let dynamicColumns: ColumnsType<DataType> = baseColumns;

  switch (activeTab) {
    case "11":
      dynamicColumns = adequacyColumns;
      break;
    case "12":
      dynamicColumns = effectivenessColumns;
      break;
    case "13":
      dynamicColumns = efficiencyColumns;
      break;
    case "14":
      dynamicColumns = processSeverityColumns;
      break;
    default:
      dynamicColumns = adequacyColumns;
      break;
  }

  return [...baseColumns, ...dynamicColumns, actionsColumn];
}

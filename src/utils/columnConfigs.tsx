// src/utils/columnConfigs.tsx
import React from "react";
import { ColumnType } from "antd/es/table";
import { Input, Select, Typography, Button } from "antd";
import { SaveOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;

export interface ColumnConfig extends ColumnType<any> {
  title: string;
  dataIndex: string;
  key: string;
  editable?: boolean;
  width?: number;
  render?: (text: any, record: any, index?: number) => React.ReactNode;
}

interface ColumnBuilderProps {
  editingKey: string | null;
  handleFieldChange: (key: string, field: string, value: any) => void;
  handleSave: (key: string) => void;
  handleEdit: (key: string) => void;
  handleCancel: () => void;
  severityLevels?: string[];
  sectionName?: string;
  data?: any[];
}

export const getEditableColumns = ({
  editingKey,
  handleFieldChange,
  handleSave,
  handleEdit,
  handleCancel,
  severityLevels = ["Critical", "High", "Medium", "Low"],
  sectionName = "",
  data = [],
}: ColumnBuilderProps) => {
  const baseColumns: ColumnConfig[] = [
    {
      title: "No",
      dataIndex: "No",
      key: "No",
      width: 80,
      render: (text: any, record: any) =>
        editingKey === record.key ? (
          <Input
            value={text}
            onChange={(e) =>
              handleFieldChange(
                record.key,
                "No",
                parseFloat(e.target.value) || 0
              )
            }
            type="number"
            step="0.1"
          />
        ) : (
          text
        ),
    },
    {
      title: "Process",
      dataIndex: "Process",
      key: "Process",
      render: (text: string, record: any) =>
        editingKey === record.key ? (
          <Input
            value={text}
            onChange={(e) =>
              handleFieldChange(record.key, "Process", e.target.value)
            }
          />
        ) : (
          text
        ),
    },
  ];

  const sectionColumns: Record<string, ColumnConfig[]> = {
    Process: [
      {
        title: "Process Description",
        dataIndex: "Process Description",
        key: "Process Description",
        render: (text: string, record: any) =>
          editingKey === record.key ? (
            <TextArea
              value={text}
              onChange={(e) =>
                handleFieldChange(
                  record.key,
                  "Process Description",
                  e.target.value
                )
              }
              rows={3}
            />
          ) : (
            <div style={{ maxWidth: 300 }}>{text}</div>
          ),
      },
      {
        title: "Process Objectives",
        dataIndex: "Process Objectives",
        key: "Process Objectives",
        render: (text: string, record: any) =>
          editingKey === record.key ? (
            <TextArea
              value={text}
              onChange={(e) =>
                handleFieldChange(
                  record.key,
                  "Process Objectives",
                  e.target.value
                )
              }
              rows={3}
            />
          ) : (
            <div style={{ maxWidth: 300 }}>{text}</div>
          ),
      },
      {
        title: "Severity Levels",
        dataIndex: "Process Severity Levels",
        key: "Process Severity Levels",
        render: (text: string, record: any) =>
          editingKey === record.key ? (
            <Select
              value={text}
              onChange={(value) =>
                handleFieldChange(record.key, "Process Severity Levels", value)
              }
              style={{ width: 120 }}
            >
              {severityLevels.map((level) => (
                <Option key={level} value={level}>
                  {level}
                </Option>
              ))}
            </Select>
          ) : (
            <span
              style={{
                color:
                  text === "Critical"
                    ? "#ff4d4f"
                    : text === "High"
                    ? "#fa8c16"
                    : text === "Medium"
                    ? "#faad14"
                    : "#52c41a",
                fontWeight: "500",
              }}
            >
              {text}
            </span>
          ),
      },
    ],
    // Add more section-specific column configurations here as needed
  };

  // Add action column
  const actionColumn: ColumnConfig = {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    width: 120,
    render: (_: any, record: any) => {
      const editable = editingKey === record.key;
      return editable ? (
        <span>
          <Button
            type="link"
            onClick={() => handleSave(record.key)}
            style={{ marginRight: 8 }}
          >
            <SaveOutlined />
          </Button>
          <Button type="text" danger onClick={handleCancel}>
            <CloseOutlined />
          </Button>
        </span>
      ) : (
        <Button
          type="link"
          onClick={() => handleEdit(record.key)}
          disabled={editingKey !== null}
        >
          <EditOutlined />
        </Button>
      );
    },
  };

  // Return predefined columns if they exist for the section
  if (sectionColumns[sectionName]) {
    return [...baseColumns, ...sectionColumns[sectionName], actionColumn];
  }

  // Dynamic column generation for sections without predefined columns
  if (data.length > 0) {
    const firstItem = data[0];
    const dynamicColumns = Object.keys(firstItem)
      .filter((key) => !["key", "No", "Process"].includes(key))
      .map((key) => ({
        title: key,
        dataIndex: key,
        key: key,
        render: (text: any, record: any) => {
          if (editingKey === record.key) {
            return (
              <Input
                value={text}
                onChange={(e) =>
                  handleFieldChange(record.key, key, e.target.value)
                }
              />
            );
          }
          return text;
        },
      }));

    return [...baseColumns, ...dynamicColumns, actionColumn];
  }

  // Default return if no data
  return [...baseColumns, actionColumn];
};

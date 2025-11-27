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

// In columnConfigs.tsx, update the getEditableColumns function
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
  // If no data, return empty columns
  if (data.length === 0) {
    console.warn(
      "[getEditableColumns] No data provided, returning empty columns"
    );
    return [];
  }
  console.log("[getEditableColumns] Generating columns for data:", {
    dataLength: data.length,
    firstItem: data[0],
  });

  // Get all unique keys from data
  const allKeys = new Set<string>();
  data.forEach((item) => {
    Object.keys(item).forEach((key) => {
      if (key !== "key") {
        allKeys.add(key);
      }
    });
  });
  console.log("[getEditableColumns] Extracted keys:", Array.from(allKeys));

  // Create base columns
  const dynamicColumns: ColumnConfig[] = Array.from(allKeys).map((key) => {
    const isDescription =
      key.toLowerCase().includes("description") ||
      key.toLowerCase().includes("objectives");
    const isSeverity = key.toLowerCase().includes("severity");

    // Special handling for severity levels
    if (isSeverity) {
      return {
        title: key,
        dataIndex: key,
        key: key,
        width: 150,
        render: (text: string, record: any) => {
          if (editingKey === record.key) {
            return (
              <Select
                value={text}
                onChange={(value) => handleFieldChange(record.key, key, value)}
                style={{ width: "100%" }}
              >
                {severityLevels.map((level) => (
                  <Option key={level} value={level}>
                    {level}
                  </Option>
                ))}
              </Select>
            );
          }
          return (
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
          );
        },
      };
    }

    // For description/objective fields
    if (isDescription) {
      return {
        title: key,
        dataIndex: key,
        key: key,
        width: 300,
        render: (text: string, record: any) => {
          if (editingKey === record.key) {
            return (
              <TextArea
                value={text}
                onChange={(e) =>
                  handleFieldChange(record.key, key, e.target.value)
                }
                rows={3}
                style={{ width: "100%" }}
              />
            );
          }
          return <div style={{ whiteSpace: "pre-wrap" }}>{text}</div>;
        },
      };
    }

    // Default column
    return {
      title: key,
      dataIndex: key,
      key: key,
      width: 200,
      render: (text: string, record: any) => {
        if (editingKey === record.key) {
          return (
            <Input
              value={text}
              onChange={(e) =>
                handleFieldChange(record.key, key, e.target.value)
              }
              style={{ width: "100%" }}
            />
          );
        }
        return text;
      },
    };
  });

  // Add action column
  const actionColumn: ColumnConfig = {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    width: 120,
    fixed: "right",
    render: (_: any, record: any) => {
      const editable = editingKey === record.key;
      return editable ? (
        <span>
          <Button
            type="link"
            onClick={() => handleSave(record.key)}
            style={{ marginRight: 8 }}
            icon={<SaveOutlined />}
          />
          <Button
            type="text"
            danger
            onClick={handleCancel}
            icon={<CloseOutlined />}
          />
        </span>
      ) : (
        <Button
          type="link"
          onClick={() => handleEdit(record.key)}
          disabled={editingKey !== null}
          icon={<EditOutlined />}
        />
      );
    },
  };

  console.log("[getEditableColumns] Generated columns:", dynamicColumns.length);
  return [...dynamicColumns, actionColumn];
};

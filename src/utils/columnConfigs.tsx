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

// Dropdown options
const severityImpactOptions = [
  "Catastrophic",
  "Major",
  "Moderate",
  "Minor",
  "Insignificant",
];
const probabilityLikelihoodOptions = [
  "Certain",
  "Likely",
  "Possible",
  "Unlikely",
  "Rare",
];
const classificationOptions = ["Critical", "High", "Moderate", "Low", "Lowest"];

const riskResponseOptions = ["Mitigate", "Accept", "Transfer", "Avoid"];

export const getEditableColumns = ({
  editingKey,
  handleFieldChange,
  handleSave,
  handleEdit,
  handleCancel,
  severityLevels = [
    "Catastrophic",
    "Major",
    "Moderate",
    "Minor",
    "Insignificant",
  ],
  sectionName = "",
  data = [],
}: ColumnBuilderProps) => {
  if (!data || data.length === 0) return [];

  const allKeys = new Set<string>();
  data.forEach((item) =>
    Object.keys(item).forEach((key) => {
      if (key !== "key") allKeys.add(key);
    })
  );

  const dynamicColumns: ColumnConfig[] = Array.from(allKeys).map((key) => {
    const isDescription =
      key.toLowerCase().includes("description") ||
      key.toLowerCase().includes("objectives");

    const isSeverity = key.toLowerCase().includes("severity");

    // Early classification handling for Risk Assessment (Inherent Risk)
    if (
      sectionName === "Risk Assessment  (Inherent Risk)" &&
      key.toLowerCase().includes("classification")
    ) {
      return {
        title: key,
        dataIndex: key,
        key,
        width: 150,
        render: (text: string, record: any) =>
          editingKey === record.key ? (
            <Select
              value={text}
              onChange={(value) => handleFieldChange(record.key, key, value)}
              options={classificationOptions.map((o) => ({
                label: o,
                value: o,
              }))}
              style={{ width: "100%" }}
            />
          ) : (
            <span style={{ fontWeight: 500 }}>{text}</span>
          ),
      };
    }

    const isControlEnvSection = [
      "COSO-Control Environment",
      "INTOSAI, IFAC, and Government Audit Standards - Control Environment",
      "Other- - Control Environment",
    ].includes(sectionName || "");

    const isTickCrossField =
      isControlEnvSection &&
      key !== "No" &&
      key !== "Main Process" &&
      typeof data[0][key] === "string" &&
      (data[0][key] === "P" || data[0][key] === "O");

    const isControlActivitiesSection = sectionName === "Control Activities";

    const isYesNoField =
      isControlActivitiesSection &&
      typeof data[0][key] === "string" &&
      (data[0][key] === "Yes" || data[0][key] === "No");

    // Severity / Classification field handling
    if (isSeverity) {
      if (
        sectionName === "Risk Assessment  (Inherent Risk)" &&
        key.toLowerCase().includes("classification")
      ) {
        return {
          title: key,
          dataIndex: key,
          key,
          width: 150,
          render: (text: string, record: any) =>
            editingKey === record.key ? (
              <Select
                value={text}
                onChange={(value) => handleFieldChange(record.key, key, value)}
                style={{ width: "100%" }}
              >
                {classificationOptions.map((level) => (
                  <Option key={level} value={level}>
                    {level}
                  </Option>
                ))}
              </Select>
            ) : (
              <span style={{ fontWeight: 500 }}>{text}</span>
            ),
        };
      }

      // Default severity dropdown
      return {
        title: key,
        dataIndex: key,
        key,
        width: 150,
        render: (text: string, record: any) =>
          editingKey === record.key ? (
            <Select
              value={text}
              onChange={(value) => handleFieldChange(record.key, key, value)}
              options={severityLevels.map((level) => ({
                label: level,
                value: level,
              }))}
              style={{ width: "100%" }}
            />
          ) : (
            <span style={{ fontWeight: 500 }}>{text}</span>
          ),
      };
    }

    // Risk Assessment (Inherent Risk)
    if (sectionName === "Risk Assessment  (Inherent Risk)") {
      if (
        key.toLowerCase().includes("severity") ||
        key.toLowerCase().includes("impact")
      ) {
        return {
          title: key,
          dataIndex: key,
          key,
          width: 150,
          render: (text: string, record: any) =>
            editingKey === record.key ? (
              <Select
                value={text}
                onChange={(v) => handleFieldChange(record.key, key, v)}
                options={severityImpactOptions.map((o) => ({
                  label: o,
                  value: o,
                }))}
                style={{ width: "100%" }}
              />
            ) : (
              text
            ),
        };
      }

      if (
        key.toLowerCase().includes("probability") ||
        key.toLowerCase().includes("likelihood")
      ) {
        return {
          title: key,
          dataIndex: key,
          key,
          width: 150,
          render: (text: string, record: any) =>
            editingKey === record.key ? (
              <Select
                value={text}
                onChange={(v) => handleFieldChange(record.key, key, v)}
                options={probabilityLikelihoodOptions.map((o) => ({
                  label: o,
                  value: o,
                }))}
                style={{ width: "100%" }}
              />
            ) : (
              text
            ),
        };
      }
    }

    // Tick / Cross
    if (isTickCrossField) {
      return {
        title: key,
        dataIndex: key,
        key,
        width: 120,
        render: (text: string, record: any) =>
          editingKey === record.key ? (
            <Select
              value={text}
              onChange={(v) => handleFieldChange(record.key, key, v)}
              style={{ width: "100%" }}
            >
              <Option value="P">✔️ Tick</Option>
              <Option value="O">❌ Cross</Option>
            </Select>
          ) : text === "P" ? (
            "✔️"
          ) : text === "O" ? (
            "❌"
          ) : (
            text
          ),
      };
    }

    // Control Activities Yes/No
    if (isYesNoField) {
      return {
        title: key,
        dataIndex: key,
        key,
        width: 120,
        render: (text: string, record: any) =>
          editingKey === record.key ? (
            <Select
              value={text}
              onChange={(v) => handleFieldChange(record.key, key, v)}
              style={{ width: "100%" }}
            >
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
            </Select>
          ) : (
            text
          ),
      };
    }

    // Risk Responses
    if (sectionName === "Risk Responses" && key === "Type of Risk Response") {
      return {
        title: key,
        dataIndex: key,
        key,
        width: 180,
        render: (text: string, record: any) =>
          editingKey === record.key ? (
            <Select
              value={text}
              onChange={(v) => handleFieldChange(record.key, key, v)}
              style={{ width: "100%" }}
            >
              {riskResponseOptions.map((o) => (
                <Option key={o} value={o}>
                  {o}
                </Option>
              ))}
            </Select>
          ) : (
            text
          ),
      };
    }

    // Description / Objective fields
    if (isDescription) {
      return {
        title: key,
        dataIndex: key,
        key,
        width: 300,
        render: (text: string, record: any) =>
          editingKey === record.key ? (
            <TextArea
              value={text}
              onChange={(e) =>
                handleFieldChange(record.key, key, e.target.value)
              }
              rows={3}
              style={{ width: "100%" }}
            />
          ) : (
            <div style={{ whiteSpace: "pre-wrap" }}>{text}</div>
          ),
      };
    }

    // Default column
    return {
      title: key,
      dataIndex: key,
      key,
      width: 200,
      render: (text: string, record: any) =>
        editingKey === record.key ? (
          <Input
            value={text}
            onChange={(e) => handleFieldChange(record.key, key, e.target.value)}
          />
        ) : (
          text
        ),
    };
  });

  // Action Column
  const actionColumn: ColumnConfig = {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    width: 120,
    fixed: "right",
    render: (_: any, record: any) => {
      const editable = editingKey === record.key;
      return editable ? (
        <>
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
        </>
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

  return [...dynamicColumns, actionColumn];
};

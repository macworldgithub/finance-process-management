// src/components/sections/AccountReceivable/DataReviewModal.tsx
"use client";

import React, { useState } from "react";
import {
  Modal,
  Table,
  Button,
  Input,
  Select,
  Form,
  message,
  Typography,
  Space,
} from "antd";
import { EditOutlined, SaveOutlined, CloseOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;
const { Title, Text } = Typography;

interface ProcessData {
  No: number;
  "Main Process": string;
  "Process Description": string;
  "Process Objectives": string;
  "Process Severity Levels": string;
  key?: string;
}

interface DataReviewModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (data: ProcessData[]) => void;
  importedData: {
    Process: ProcessData[];
  };
}

const DataReviewModal: React.FC<DataReviewModalProps> = ({
  visible,
  onClose,
  onConfirm,
  importedData,
}) => {
  const [editingData, setEditingData] = useState<ProcessData[]>([]);
  const [editingKey, setEditingKey] = useState<string | null>(null);

  // Initialize editing data when modal opens
  React.useEffect(() => {
    if (visible && importedData?.Process) {
      const dataWithKeys = importedData.Process.map((item, index) => ({
        ...item,
        key: `row-${index}`,
      }));
      setEditingData(dataWithKeys);
    }
  }, [visible, importedData]);

  const handleEdit = (key: string) => {
    setEditingKey(key);
  };

  const handleSave = (key: string) => {
    setEditingKey(null);
    message.success("Changes saved");
  };

  const handleCancel = () => {
    setEditingKey(null);
    // Reset to original data
    const dataWithKeys = importedData.Process.map((item, index) => ({
      ...item,
      key: `row-${index}`,
    }));
    setEditingData(dataWithKeys);
  };

  const handleFieldChange = (key: string, field: string, value: string) => {
    setEditingData((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, [field]: value } : item
      )
    );
  };

  const handleConfirm = () => {
    onConfirm(editingData);
    message.success("Data imported successfully!");
    onClose();
  };

  const severityLevels = ["Critical", "High", "Medium", "Low"];

  const columns = [
    {
      title: "No",
      dataIndex: "No",
      key: "No",
      width: 80,
      render: (text: number, record: ProcessData) =>
        editingKey === record.key ? (
          <Input
            value={text}
            onChange={(e) =>
              handleFieldChange(record.key!, "No", e.target.value)
            }
            type="number"
            step="0.1"
          />
        ) : (
          text
        ),
    },
    {
      title: "Main Process",
      dataIndex: "Main Process",
      key: "Main Process",
      render: (text: string, record: ProcessData) =>
        editingKey === record.key ? (
          <Input
            value={text}
            onChange={(e) =>
              handleFieldChange(record.key!, "Main Process", e.target.value)
            }
          />
        ) : (
          text
        ),
    },
    {
      title: "Process Description",
      dataIndex: "Process Description",
      key: "Process Description",
      render: (text: string, record: ProcessData) =>
        editingKey === record.key ? (
          <TextArea
            value={text}
            onChange={(e) =>
              handleFieldChange(
                record.key!,
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
      render: (text: string, record: ProcessData) =>
        editingKey === record.key ? (
          <TextArea
            value={text}
            onChange={(e) =>
              handleFieldChange(
                record.key!,
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
      render: (text: string, record: ProcessData) =>
        editingKey === record.key ? (
          <Select
            value={text}
            onChange={(value) =>
              handleFieldChange(record.key!, "Process Severity Levels", value)
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
            }}
          >
            {text}
          </span>
        ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_: any, record: ProcessData) => {
        const editable = editingKey === record.key;
        return editable ? (
          <Space>
            <Button
              type="link"
              icon={<SaveOutlined />}
              onClick={() => handleSave(record.key!)}
              size="small"
            >
              Save
            </Button>
            <Button type="link" danger onClick={handleCancel} size="small">
              Cancel
            </Button>
          </Space>
        ) : (
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.key!)}
            size="small"
          >
            Edit
          </Button>
        );
      },
    },
  ];

  return (
    <Modal
      title={
        <div className="flex items-center justify-between">
          <Title level={4} style={{ margin: 0 }}>
            Review Imported Data
          </Title>
          <Button type="text" icon={<CloseOutlined />} onClick={onClose} />
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="confirm" type="primary" onClick={handleConfirm}>
          Confirm Import
        </Button>,
      ]}
      width={1200}
      centered
      destroyOnClose
    >
      <div className="space-y-4">
        <Text>
          Review and edit the imported data before confirming. Click the edit
          icon to modify any field.
        </Text>

        <Table
          columns={columns}
          dataSource={editingData}
          pagination={false}
          scroll={{ x: 800, y: 400 }}
          bordered
          size="small"
        />

        <div className="bg-blue-50 p-3 rounded">
          <Text type="secondary">
            <strong>Note:</strong> Changes made here will be reflected in the
            main table after confirmation.
          </Text>
        </div>
      </div>
    </Modal>
  );
};

export default DataReviewModal;

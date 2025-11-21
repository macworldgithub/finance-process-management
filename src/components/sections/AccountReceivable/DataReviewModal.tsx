// src/components/sections/AccountReceivable/DataReviewModal.tsx
"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Modal,
  Table,
  Button,
  Input,
  Select,
  message,
  Typography,
  Space,
} from "antd";
import { EditOutlined, SaveOutlined, CloseOutlined } from "@ant-design/icons";
import { submitSectionData } from "@/utils/sectionDataService";
import { getEditableColumns } from "@/utils/columnConfigs";

const { Text } = Typography;

// Update the interface to be more generic
interface DataItem {
  [key: string]: any;
  key?: string;
  No?: number | string;
}

interface DataReviewModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (data: any[]) => void;
  importedData: any;
  sectionName: string;
}

const DataReviewModal: React.FC<DataReviewModalProps> = ({
  visible,
  onClose,
  onConfirm,
  importedData,
  sectionName,
}) => {
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataItem[]>([]);

  // Initialize data when modal opens or importedData changes
  useEffect(() => {
    if (visible && importedData) {
      const sectionData = importedData[sectionName] || [];
      const formattedData = sectionData.map((item: any, index: number) => ({
        ...item,
        key: `row-${index}`,
      }));
      setData(formattedData);
    }
  }, [visible, importedData, sectionName]);

  // Generate columns dynamically based on the first data item
  const columns = useMemo(() => {
    if (data.length === 0) return [];
    
    const firstItem = data[0];
    return Object.keys(firstItem)
      .filter((key) => key !== "key")
      .map((key) => ({
        title: key,
        dataIndex: key,
        key: key,
        editable: true,
        width: 200,
        render: (text: any, record: DataItem) => {
          if (editingKey === record.key) {
            return (
              <Input
                value={text}
                onChange={(e) =>
                  //@ts-ignore
                  handleFieldChange(record.key, key, e.target.value)
                }
              />
            );
          }
          return text;
        },
      }));
  }, [data, editingKey]);

  const handleFieldChange = (key: string, field: string, value: any) => {
    const newData = [...data];
    const index = newData.findIndex((item) => key === item.key);
    if (index > -1) {
      newData[index][field] = value;
      setData(newData);
    }
  };

  const handleSave = async (key: string) => {
    try {
      setLoading(true);
      const index = data.findIndex((item) => key === item.key);
      if (index > -1) {
        const record = data[index];
        const response = await submitSectionData(sectionName, [record]);
        if (response.success) {
          message.success("Record updated successfully");
          setEditingKey(null);
        } else {
          throw new Error(response.message);
        }
      }
    } catch (error) {
      message.error("Failed to update record");
      console.error("Error updating record:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (key: string) => {
    setEditingKey(key);
  };

  const handleCancel = () => {
    setEditingKey(null);
  };

  const handleConfirm = () => {
    onConfirm(data);
    onClose();
  };

  return (
    <Modal
      title={`Review ${sectionName} Data`}
      open={visible}
      onCancel={onClose}
      width="90%"
      style={{ top: 20 }}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleConfirm}
          loading={loading}
        >
          Confirm Import
        </Button>,
      ]}
    >
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ x: true }}
        rowKey="key"
      />
    </Modal>
  );
};

export default DataReviewModal;

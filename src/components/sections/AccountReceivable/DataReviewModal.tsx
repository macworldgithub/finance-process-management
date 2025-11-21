// src/components/sections/AccountReceivable/DataReviewModal.tsx
"use client";

import React, { useState, useMemo } from "react";
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

interface ProcessData {
  [key: string]: any;
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
  const [editingData, setEditingData] = useState<ProcessData[]>([]);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Initialize editing data when modal opens
  React.useEffect(() => {
    if (visible && importedData) {
      const sectionData =
        importedData[sectionName] || importedData.Process || [];
      const dataWithKeys = sectionData.map((item: any, index: number) => ({
        ...item,
        key: `row-${index}`,
        No: item.No || index + 1,
      }));
      setEditingData(dataWithKeys);
    }
  }, [visible, importedData, sectionName]);

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
    const sectionData = importedData[sectionName] || importedData.Process || [];
    const dataWithKeys = sectionData.map((item: any, index: number) => ({
      ...item,
      key: `row-${index}`,
      No: item.No || index + 1,
    }));
    setEditingData(dataWithKeys);
  };

  const handleFieldChange = (key: string, field: string, value: any) => {
    setEditingData((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, [field]: value } : item
      )
    );
  };

  const handleConfirm = async () => {
    try {
      setLoading(true);
      // Transform data to match the expected format for the API
      const dataToSubmit = editingData.map((item: any) => {
        // Remove any auto-generated keys or internal fields
        const { key, _id, ...rest } = item;
        return rest;
      });

      // Submit the data
      await submitSectionData(sectionName, dataToSubmit);

      // Call the original onConfirm with the data
      onConfirm(editingData);
      message.success("Data imported successfully");
      onClose();
    } catch (error) {
      console.error("Error submitting data:", error);
      message.error("Failed to import data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Get columns from the column config
  //@ts-ignore
  const { getColumns } = useMemo(
    () =>
      getEditableColumns({
        editingKey,
        handleFieldChange,
        handleSave,
        handleEdit,
        handleCancel,
      }),
    [editingKey]
  );

  const columns = getColumns(sectionName);

  return (
    <Modal
      title={
        <div className="flex items-center justify-between">
          <span style={{ fontSize: "1.25rem", fontWeight: 500 }}>
            Review Imported Data
          </span>
          <Button type="text" icon={<CloseOutlined />} onClick={onClose} />
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose} disabled={loading}>
          Cancel
        </Button>,
        <Button
          key="confirm"
          type="primary"
          onClick={handleConfirm}
          loading={loading}
        >
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
          scroll={{ x: 1200, y: 400 }}
          bordered
          size="small"
          rowKey="key"
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

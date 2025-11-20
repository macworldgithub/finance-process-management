// src/components/sections/AccountReceivable/ExcelUploadModal.tsx
"use client";

import React, { useState, useEffect } from "react";
import { apiClient } from "@/config/apiClient";
import {
  Modal,
  Button,
  Select,
  Input,
  Upload,
  message,
  Radio,
  Typography,
  Card,
  Divider,
  Space,
} from "antd";
import { UploadOutlined, CloseOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { DataType } from "./types";
import DataReviewModal from "./DataReviewModal";

const { Option } = Select;
const { Title, Paragraph, Text } = Typography;

interface ExcelUploadModalProps {
  visible: boolean;
  onClose: () => void;
  onDataLoaded: (data: DataType[]) => void;
}

const ExcelUploadModal: React.FC<ExcelUploadModalProps> = ({
  visible,
  onClose,
  onDataLoaded,
}) => {
  const [mode, setMode] = useState<"single" | "multiple">("single");
  const [sections, setSections] = useState<string[]>([]);
  const [instructions, setInstructions] = useState<string[]>([]);
  const [selectedSection, setSelectedSection] = useState<string | undefined>();
  const [sheetName, setSheetName] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [importedData, setImportedData] = useState<any>(null);

  // Load sections automatically when modal opens or mode changes
  useEffect(() => {
    if (visible) {
      loadSections();
    }
  }, [visible, mode]);

  const loadSections = async () => {
    try {
      setLoading(true);
      const endpoint =
        mode === "single" ? "/single-table-allowed" : "/multiple-table-allowed";
      const { data } = await apiClient.get(endpoint);
      setSections(data.sections || []);
      setInstructions(data.instructions || []);

      // Auto-select first section for single table mode
      if (mode === "single" && data.sections?.length > 0) {
        setSelectedSection(data.sections[0]);
      } else {
        setSelectedSection(undefined);
      }
    } catch (error: any) {
      message.error(
        error?.response?.data?.detail || "Failed to fetch sections"
      );
      setSections([]);
      setInstructions([]);
    } finally {
      setLoading(false);
    }
  };

  const ensureBasicValidation = () => {
    if (!sheetName) {
      message.warning("Please enter sheet name");
      return false;
    }
    if (!file) {
      message.warning("Please upload an Excel file");
      return false;
    }
    if (mode === "single" && !selectedSection) {
      message.warning("Please select a section");
      return false;
    }
    return true;
  };

  const handleUpload = async () => {
    if (!ensureBasicValidation()) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("sheet_name", sheetName);
      formData.append("file", file as Blob);

      if (mode === "single") {
        formData.append("section_name", selectedSection!);
        const { data } = await apiClient.post("/upload/section", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        // Store the imported data and show review modal
        setImportedData(data);
        setReviewModalVisible(true);
      } else {
        // Multiple table mode
        const { data } = await apiClient.post(
          "/upload/all-sections",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        message.success("All sections uploaded successfully!");
        console.log("Multiple table response:", data);
      }
    } catch (error: any) {
      message.error(error?.response?.data?.detail || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDataConfirmed = (reviewedData: any[]) => {
    // Transform reviewed data to match DataType structure
    const transformedData = reviewedData.map((item, index) => ({
      key: String(index + 1),
      no: item.No,
      process: item["Main Process"],
      processDescription: item["Process Description"],
      processObjective: item["Process Objectives"],
      processSeverityLevels: item["Process Severity Levels"],
      // Default values for other required fields
      activity: "",
      process2: "",
      stage: "",
      functions: "Finance",
      clientSegment: "Account Receivable",
      operationalUnit: "A",
      division: "C",
      entity: "XYZ",
      unitDepartment: "Account Receivable",
      productClass: "Non",
      productName: "Others",
      isActive: true,
    }));

    onDataLoaded(transformedData);
    setReviewModalVisible(false);
    onClose();
  };

  const uploadProps: UploadProps = {
    beforeUpload: (fileObj) => {
      setFile(fileObj as File);
      return false; // prevent auto upload
    },
    maxCount: 1,
    accept: ".xlsx,.xls",
    showUploadList: false,
  };

  const handleClose = () => {
    setFile(null);
    setSheetName("");
    setSelectedSection(undefined);
    onClose();
  };

  return (
    <>
      <Modal
        title={
          <div className="flex items-center justify-between">
            <Title level={4} style={{ margin: 0 }}>
              Excel Data Import
            </Title>
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={handleClose}
              className="flex items-center"
            />
          </div>
        }
        open={visible}
        onCancel={handleClose}
        footer={null}
        width={800}
        centered
        destroyOnClose
      >
        <div className="space-y-6">
          {/* Table Type Selection */}
          <Card size="small" title="Select Table Type">
            <Radio.Group
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              buttonStyle="solid"
            >
              <Radio.Button value="single">Single Table</Radio.Button>
              <Radio.Button value="multiple">Multiple Tables</Radio.Button>
            </Radio.Group>
          </Card>

          {/* Instructions */}
          <Card size="small" title="Instructions">
            <div className="space-y-2">
              {instructions.length > 0 ? (
                instructions.map((instruction, index) => (
                  <Text key={index} className="block">
                    {instruction}
                  </Text>
                ))
              ) : (
                <Text type="secondary">
                  {mode === "single"
                    ? "Single table mode imports data into the current table view. Select a section and upload your Excel file."
                    : "Multiple table mode processes all sections from the Excel file. The data will be distributed across relevant tables."}
                </Text>
              )}
            </div>
          </Card>

          {/* Upload Form */}
          <Card size="small" title="Upload Details">
            <div className="grid grid-cols-1 gap-4">
              {/* Sheet Name */}
              <div>
                <Text strong>Sheet Name *</Text>
                <Input
                  placeholder="e.g., Sheet1, Data, Process"
                  value={sheetName}
                  onChange={(e) => setSheetName(e.target.value)}
                  className="mt-1"
                />
              </div>

              {/* Section Selection (Single Table Only) */}
              {mode === "single" && (
                <div>
                  <Text strong>Section Name *</Text>
                  <Select
                    placeholder="Select section"
                    value={selectedSection}
                    onChange={setSelectedSection}
                    loading={loading}
                    className="w-full mt-1"
                    allowClear={false}
                  >
                    {sections.map((section) => (
                      <Option key={section} value={section}>
                        {section}
                      </Option>
                    ))}
                  </Select>
                </div>
              )}

              {/* File Upload */}
              <div>
                <Text strong>Excel File *</Text>
                <div className="mt-1">
                  <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />} className="w-full">
                      Select Excel File
                    </Button>
                  </Upload>
                  {file && (
                    <div className="mt-2 p-2 bg-gray-50 rounded border">
                      <Text type="secondary">Selected: {file.name}</Text>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2">
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              type="primary"
              onClick={handleUpload}
              loading={uploading}
              disabled={
                !sheetName || !file || (mode === "single" && !selectedSection)
              }
            >
              {mode === "single" ? "Import Data" : "Upload All Sections"}
            </Button>
          </div>
        </div>
      </Modal>
      <DataReviewModal
        visible={reviewModalVisible}
        onClose={() => setReviewModalVisible(false)}
        onConfirm={handleDataConfirmed}
        importedData={importedData}
      />
    </>
  );
};

export default ExcelUploadModal;

"use client";
import React, { useState } from "react";
import { Modal, Upload, Button, message, Alert } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";
import { DataType } from "./types";

const { Dragger } = Upload;

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
  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const data = await readExcelFile(file);
      onDataLoaded(data);
      message.success("File uploaded successfully!");
      onClose();
    } catch (error) {
      message.error("Error reading file. Please check the format.");
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
      setFileList([]);
    }
  };

  const readExcelFile = (file: File): Promise<DataType[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);

          const formattedData: DataType[] = jsonData.map((row: any, index) => ({
            key: String(Date.now() + index),
            no: row["No."] || row["no"] || String(index + 1),
            process: row["Processes"] || row["process"] || "",
            designAdequacyScore:
              row["Design Adequacy Score"] || row["designAdequacyScore"] || "",
            sustainabilityScore:
              row["Sustainability Score"] || row["sustainabilityScore"] || "",
            scalabilityScore:
              row["Scalability Score"] || row["scalabilityScore"] || "",
            adequacyScore: row["Adequacy Score"] || row["adequacyScore"] || "",
            totalScore: row["Total Score"] || row["totalScore"] || "",
            scale: row["Scale"] || row["scale"] || "",
            rating: row["Rating"] || row["rating"] || "",
            designScore: row["Design Score"] || row["designScore"] || "",
            operatingScore:
              row["Operating Score"] || row["operatingScore"] || "",
            effectivenessScore:
              row["Effectiveness Score"] || row["effectivenessScore"] || "",
            objectiveAchievementScore:
              row["Objective Achievement Score"] ||
              row["objectiveAchievementScore"] ||
              "",
            processTimelinessScore:
              row["Process Timeliness Score"] ||
              row["processTimelinessScore"] ||
              "",
            resourceConsumptionScore:
              row["Resource Consumption Score"] ||
              row["resourceConsumptionScore"] ||
              "",
            efficiencyScore:
              row["Efficiency Score"] || row["efficiencyScore"] || "",
            processSeverityLevels:
              row["Process Severity Levels"] ||
              row["processSeverityLevels"] ||
              "",
            isActive: true,
          }));

          resolve(formattedData);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsBinaryString(file);
    });
  };

  const uploadProps = {
    beforeUpload: (file: File) => {
      const isExcel =
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel";
      if (!isExcel) {
        message.error("You can only upload Excel files!");
        return false;
      }
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error("File must be smaller than 10MB!");
        return false;
      }
      handleUpload(file);
      return false; // Prevent automatic upload
    },
    fileList,
    onChange: (info: any) => {
      setFileList(info.fileList.slice(-1)); // Keep only the latest file
    },
  };

  return (
    <Modal
      title="Upload Excel File"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <div className="space-y-4">
        <Alert
          message="Upload Instructions"
          description="Please upload an Excel file with the following columns: No., Processes, and relevant assessment scores. The file should be in .xlsx or .xls format."
          type="info"
          showIcon
        />

        <Dragger {...uploadProps} disabled={uploading}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for .xlsx, .xls files. File size should not exceed 10MB.
          </p>
        </Dragger>

        <div className="flex justify-end space-x-2">
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ExcelUploadModal;

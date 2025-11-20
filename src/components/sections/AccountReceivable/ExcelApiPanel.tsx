  "use client";

  import React, { useState } from "react";
  import { apiClient } from "@/config/apiClient";
  import {
    Button,
    Select,
    Input,
    Upload,
    message,
    Radio,
    Card,
    Typography,
  } from "antd";
  import type { UploadProps } from "antd";

  const { TextArea } = Input;
  const { Option } = Select;
  const { Title, Paragraph } = Typography;
  import { DataType } from "./types";

  interface ExcelApiPanelProps {
    onDataLoaded: (data: DataType[]) => void;
  }
  const ExcelApiPanel: React.FC<ExcelApiPanelProps> = ({ onDataLoaded }) => {
    const [mode, setMode] = useState<"single" | "multiple">("single");
    const [sections, setSections] = useState<string[]>([]);
    const [instructions, setInstructions] = useState<string[]>([]);
    const [selectedSection, setSelectedSection] = useState<string | undefined>();
    const [sheetName, setSheetName] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const [loadingSections, setLoadingSections] = useState(false);
    const [loadingAll, setLoadingAll] = useState(false);
    const [loadingSingle, setLoadingSingle] = useState(false);
    const [lastResponse, setLastResponse] = useState<any>(null);

    const handleFetchSections = async () => {
      try {
        setLoadingSections(true);
        const endpoint =
          mode === "single" ? "/single-table-allowed" : "/multiple-table-allowed";
        const { data } = await apiClient.get(endpoint);
        setSections(data.sections || []);
        setInstructions(data.instructions || []);
        setSelectedSection(undefined);
      } catch (error: any) {
        message.error(
          error?.response?.data?.detail || "Failed to fetch sections"
        );
      } finally {
        setLoadingSections(false);
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
      return true;
    };

    const handleUploadAll = async () => {
      if (!ensureBasicValidation()) return;
      try {
        setLoadingAll(true);
        const formData = new FormData();
        formData.append("sheet_name", sheetName);
        formData.append("file", file as Blob);
        const { data } = await apiClient.post("/upload/all-sections", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setLastResponse(data);
        message.success("Uploaded and parsed all sections successfully");
      } catch (error: any) {
        message.error(
          error?.response?.data?.detail || "Failed to upload all sections"
        );
      } finally {
        setLoadingAll(false);
      }
    };

    const handleUploadSingle = async () => {
      if (!ensureBasicValidation()) return;
      if (!selectedSection) {
        message.warning("Please select a section");
        return;
      }
      try {
        setLoadingSingle(true);
        const formData = new FormData();
        formData.append("sheet_name", sheetName);
        formData.append("section_name", selectedSection);
        formData.append("file", file as Blob);
        const { data } = await apiClient.post("/upload/section", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        // Transform API response to match DataType structure
        const transformedData = data.Process.map((item: any, index: number) => ({
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
        }));

        // Pass the transformed data to parent
        onDataLoaded(transformedData);
        message.success("Uploaded and parsed selected section successfully");
      } catch (error: any) {
        message.error(
          error?.response?.data?.detail || "Failed to upload selected section"
        );
      } finally {
        setLoadingSingle(false);
      }
    };
    const uploadProps: UploadProps = {
      beforeUpload: (fileObj) => {
        setFile(fileObj as File);
        return false; // prevent auto upload
      },
      maxCount: 1,
      accept: ".xlsx,.xls",
    };

    return (
      <Card className="mb-4" size="small">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3 flex-wrap">
              <Title level={5} style={{ margin: 0 }}>
                Excel API Upload
              </Title>
              <Radio.Group
                size="small"
                value={mode}
                onChange={(e) => {
                  setMode(e.target.value);
                  setSections([]);
                  setInstructions([]);
                  setSelectedSection(undefined);
                }}
              >
                <Radio.Button value="single">Single Table</Radio.Button>
                <Radio.Button value="multiple">Multiple Tables</Radio.Button>
              </Radio.Group>
              <Button
                size="small"
                onClick={handleFetchSections}
                loading={loadingSections}
              >
                Load Allowed Sections
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-gray-700">
                Sheet Name
              </label>
              <Input
                size="small"
                placeholder="e.g. Sheet1"
                value={sheetName}
                onChange={(e) => setSheetName(e.target.value)}
              />
              <label className="text-xs font-medium text-gray-700 mt-2">
                Excel File
              </label>
              <Upload {...uploadProps}>
                <Button size="small">Select Excel File</Button>
              </Upload>
              {file && (
                <Paragraph
                  type="secondary"
                  style={{ marginTop: 4, fontSize: 12 }}
                >
                  Selected: {file.name}
                </Paragraph>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-gray-700">
                Section Name (for single-section upload)
              </label>
              <Select
                size="small"
                placeholder="Select section"
                value={selectedSection}
                onChange={(value) => setSelectedSection(value)}
                allowClear
              >
                {sections.map((s) => (
                  <Option key={s} value={s}>
                    {s}
                  </Option>
                ))}
              </Select>

              <div className="flex gap-2 mt-3 flex-wrap">
                <Button
                  size="small"
                  type="default"
                  onClick={handleUploadAll}
                  loading={loadingAll}
                >
                  Upload All Sections
                </Button>
                <Button
                  size="small"
                  type="primary"
                  onClick={handleUploadSingle}
                  loading={loadingSingle}
                >
                  Upload Selected Section
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-gray-700">
                Backend Instructions
              </label>
              <TextArea
                readOnly
                autoSize={{ minRows: 3, maxRows: 6 }}
                value={instructions.join("\n")}
                placeholder="Click 'Load Allowed Sections' to see instructions from backend."
              />
            </div>
          </div>

          {lastResponse && (
            <div className="mt-2">
              <label className="text-xs font-medium text-gray-700">Data</label>
              <TextArea
                readOnly
                autoSize={{ minRows: 3, maxRows: 8 }}
                value={JSON.stringify(lastResponse, null, 2)}
              />
            </div>
          )}
        </div>
      </Card>
    );
  };

  export default ExcelApiPanel;

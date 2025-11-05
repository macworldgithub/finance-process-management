"use client";
import React, { useEffect, useState } from "react";
import { Table, Tabs, Spin, Input, Button } from "antd";
import { LeftOutlined, RightOutlined, EditOutlined } from "@ant-design/icons";
import { getColumns } from "./columns";
import {
  data as importedData,
  controlAssessmentData,
  financialAssertionsData,
  internalAuditData,
} from "./data";
import { DataType } from "./types";

const { TextArea } = Input;

const AccountReceivable: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("1");
  const [activeSubTab, setActiveSubTab] = useState("coso");
  const [tableData, setTableData] = useState<DataType[]>([]);
  const [editingKeys, setEditingKeys] = useState<string[]>([]);
  const tabKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeTab === "7") {
        setTableData(controlAssessmentData);
      } else if (activeTab === "9") {
        setTableData(financialAssertionsData);
      } else if (activeTab === "10") {
        setTableData(internalAuditData);
      } else {
        setTableData(importedData);
      }
      setLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [activeTab]);

  // Handlers
  const onAddRow = () => {
    // helper to parse "major.minor" (works if no is number or string)
    const parseNo = (val: string | number | undefined) => {
      const s = String(val ?? "");
      if (!s) return { major: 0, minor: 0 };
      const parts = s.split(".");
      const major = parseInt(parts[0], 10) || 0;
      const minor = parts.length > 1 ? parseInt(parts[1], 10) || 0 : 0;
      return { major, minor };
    };
    // find the max major, and within that major the max minor
    let maxMajor = -Infinity;
    let maxMinor = -Infinity;
    tableData.forEach((d) => {
      const { major, minor } = parseNo(d.no);
      if (major > maxMajor || (major === maxMajor && minor > maxMinor)) {
        maxMajor = major;
        maxMinor = minor;
      }
    });
    // If no rows, start at 1.1 (adjust if you want a different starting point)
    const newNoStr =
      maxMajor === -Infinity ? "1.1" : `${maxMajor}.${maxMinor + 1}`;
    const newKey = newNoStr; // keep keys unique and readable
    const newRow: DataType = {
      key: newKey,
      no: newNoStr, // <-- note: string (so "5.13" stays as-is)
      process: "New Process",
      processDescription: "",
      processObjective: "",
      processSeverityLevels: "",
      activity: "",
      process2: "",
      stage: "",
      functions: "",
      clientSegment: "",
      operationalUnit: "",
      division: "",
      entity: "",
      unitDepartment: "",
      productClass: "",
      productName: "",
      integrityEthical: false,
      boardOversight: false,
      orgStructure: false,
      commitmentCompetence: false,
      managementPhilosophy: false,
      assignmentAuthority: false,
      hrPolicies: false,
      boardAudit: false,
      managementControl: false,
      externalInfluences: false,
      commitmentInternal: false,
      enforcementIntegrity: false,
      employeeAwareness: false,
      accountability: false,
      commitmentTransparency: false,
      responsibilityMatrix: false,
      segregationDuties: false,
      reportingLines: false,
      mission: false,
      visionValues: false,
      goalsObjectives: false,
      structuresSystems: false,
      policiesProcedures: false,
      processes: false,
      oversightStructure: false,
      standards: false,
      methodologies: false,
      rulesRegulations: false,
      riskType: "",
      riskDescription: "",
      severityImpact: "",
      probabilityLikelihood: "",
      classification: "",
      riskResponseType: "",
      controlObjectives: "",
      controlDefinition: "",
      controlDescription: "",
      controlResponsibility: "",
      levelResponsibility: "",
      cosoPrinciple: "",
      operationalApproach: "",
      operationalFrequency: "",
      controlClassification: "",
      soxControlActivity: "",
      internalControlFinancial: false,
      occurrence: false,
      completeness: false,
      accuracy: false,
      authorization: false,
      cutoff: false,
      classificationSOX: false,
      existence: false,
      rightsObligations: false,
      valuationAllocation: false,
      presentationDisclosure: false,
      check: false,
      internalAuditTest: "",
      sampleSize: "",
      grcAdequacy: "",
      grcEffectiveness: "",
      explanation: "",
    };
    setTableData((prev) => [...prev, newRow]);
    setEditingKeys((prev) => [...prev, newKey]);
  };

  const handlers = {
    onStageChange: (key: string, rowKey: string) => {
      setTableData((prev) =>
        prev.map((r) => (r.key === rowKey ? { ...r, stage: key } : r))
      );
    },
    onSelectGeneric: (key: string, rowKey: string, field?: string) => {
      if (!field) return;
      setTableData((prev) =>
        prev.map((r) => (r.key === rowKey ? { ...r, [field]: key } : r))
      );
    },
    onCheckboxChange: (
      rowKey: string,
      field: keyof DataType,
      checked: boolean
    ) => {
      setTableData((prev) =>
        prev.map((r) => (r.key === rowKey ? { ...r, [field]: checked } : r))
      );
    },
    onTextChange: (rowKey: string, field: keyof DataType, value: string) => {
      setTableData((prev) =>
        prev.map((r) => (r.key === rowKey ? { ...r, [field]: value } : r))
      );
    },
    onSaveRow: (rowKey: string) => {
      setEditingKeys((prev) => prev.filter((k) => k !== rowKey));
    },
    onEditRow: (rowKey: string) => {
      setEditingKeys((prev) => [...prev, rowKey]);
    },
    onAddRow,
  };
  // Navigation
  const currentIndex = tabKeys.indexOf(activeTab);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < tabKeys.length - 1;
  const goPrev = () => {
    if (hasPrev) setActiveTab(tabKeys[currentIndex - 1]);
  };
  const goNext = () => {
    if (hasNext) setActiveTab(tabKeys[currentIndex + 1]);
  };
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);
  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen overflow-y-auto">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              RCM – Account Receivable
            </h1>
            <div className="flex space-x-3 bg-white border border-black shadow-sm">
              <button
                onClick={goPrev}
                disabled={!hasPrev}
                className={`p-2 rounded-md transition font-bold ${
                  hasPrev
                    ? "text-black hover:bg-gray-50 cursor-pointer"
                    : "text-gray-400 cursor-not-allowed"
                }`}
                aria-label="Previous Tab"
              >
                <LeftOutlined />
              </button>
              <div className="bg-black w-[2px] h-6 my-auto"></div>
              <button
                onClick={goNext}
                disabled={!hasNext}
                className={`p-2 rounded-md transition font-bold ${
                  hasNext
                    ? "text-black hover:bg-gray-50 cursor-pointer"
                    : "text-gray-400 cursor-not-allowed"
                }`}
                aria-label="Next Tab"
              >
                <RightOutlined />
              </button>
            </div>
          </div>
          <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-sm mb-6 px-6 py-2">
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              className="text-lg"
              items={[
                { key: "1", label: "Process" },
                { key: "2", label: "Ownership" },
                { key: "3", label: "Control Environment" },
                { key: "4", label: "Risk Assessment (Inherent Risk)" },
                { key: "5", label: "Risk Responses" },
                { key: "6", label: "Control Activities" },
                { key: "7", label: "Control Assessment" },
                { key: "8", label: "Risk Assessment (Residual Risk)" },
                { key: "9", label: "SOX - Financial Statement Assertions" },
                { key: "10", label: "Internal Audit Test" },
                { key: "11", label: "GRC Exception Log" },
              ]}
            />
          </div>
          {activeTab === "3" && (
            <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-sm mb-6 px-6 py-2">
              <Tabs
                activeKey={activeSubTab}
                onChange={setActiveSubTab}
                className="text-sm"
                items={[
                  { key: "coso", label: "COSO" },
                  {
                    key: "intosai",
                    label: "INTOSAI, IFAC, and Government Audit Standards",
                  },
                  { key: "other", label: "Other" },
                ]}
              />
            </div>
          )}
          <div className="p-4 bg-white shadow-md overflow-x-auto">
            <Table
              columns={getColumns(
                activeTab,
                activeSubTab,
                handlers,
                editingKeys
              )}
              dataSource={tableData}
              pagination={false}
              scroll={{ x: 1300, y: 450 }}
              bordered
            />
          </div>
        </>
      )}
    </div>
  );
};
export default AccountReceivable;

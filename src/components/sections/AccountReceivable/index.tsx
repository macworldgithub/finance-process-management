



"use client";
import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { Table, Tabs, Spin, Button, Popconfirm } from "antd";
import { LeftOutlined, RightOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getColumns } from "./columns";
import {
  data as importedData,
  controlAssessmentData,
  financialAssertionsData,
  internalAuditData,
} from "./data";
import { DataType } from "./types";
import * as XLSX from "xlsx";
import { Input } from "antd";
const { TextArea } = Input;
const readFromLocalStorage = <T,>(key: string, fallback: T): T => {
  try {
    if (typeof window === "undefined") return fallback;
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch (err) {
    console.warn(`Failed to parse localStorage ${key}`, err);
    return fallback;
  }
};
// ---------- Expose import handler via ref ----------
export interface AccountReceivableRef {
  triggerImport: (file: File) => void;
}
const AccountReceivable = forwardRef<AccountReceivableRef>((_, ref) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("1");
  const [activeSubTab, setActiveSubTab] = useState("coso");
  const [tableData, setTableData] = useState<DataType[]>([]);
  const [editingKeys, setEditingKeys] = useState<string[]>([]);
  const tabKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
  const [mainData, setMainData] = useState<DataType[]>(
    () => readFromLocalStorage<DataType[]>("mainData", importedData)
  );
  const [controlData, setControlData] = useState<DataType[]>(
    () => readFromLocalStorage<DataType[]>("controlData", controlAssessmentData)
  );
  const [financialData, setFinancialData] = useState<DataType[]>(
    () => readFromLocalStorage<DataType[]>("financialData", financialAssertionsData)
  );
  const [auditData, setAuditData] = useState<DataType[]>(
    () => readFromLocalStorage<DataType[]>("auditData", internalAuditData)
  );
  // Persist to localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("mainData", JSON.stringify(mainData));
  }, [mainData]);
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("controlData", JSON.stringify(controlData));
  }, [controlData]);
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("financialData", JSON.stringify(financialData));
  }, [financialData]);
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("auditData", JSON.stringify(auditData));
  }, [auditData]);
  // Load table data based on active tab
  useEffect(() => {
    const timer = setTimeout(() => {
      let dataToSet: DataType[];
      if (activeTab === "7") dataToSet = controlData;
      else if (activeTab === "9") dataToSet = financialData;
      else if (activeTab === "10") dataToSet = auditData;
      else dataToSet = mainData;
      setTableData(dataToSet);
      setLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [activeTab, mainData, controlData, financialData, auditData]);
  const getCurrentSetter = () => {
    if (activeTab === "7") return setControlData;
    else if (activeTab === "9") return setFinancialData;
    else if (activeTab === "10") return setAuditData;
    else return setMainData;
  };
  const tabConfigs: {
    key: string;
    label: string;
    dataSource: "main" | "control" | "financial" | "audit";
    subTabs?: string[];
  }[] = [
    { key: "1", label: "Process", dataSource: "main" },
    { key: "2", label: "Ownership", dataSource: "main" },
    {
      key: "3",
      label: "Control Environment",
      dataSource: "main",
      subTabs: ["coso", "intosai", "other"],
    },
    { key: "4", label: "Risk Assessment (Inherent Risk)", dataSource: "main" },
    { key: "5", label: "Risk Responses", dataSource: "main" },
    { key: "6", label: "Control Activities", dataSource: "main" },
    { key: "7", label: "Control Assessment", dataSource: "control" },
    { key: "8", label: "Risk Assessment (Residual Risk)", dataSource: "main" },
    {
      key: "9",
      label: "SOX - Financial Statement Assertions",
      dataSource: "financial",
    },
    { key: "10", label: "Internal Audit Test", dataSource: "audit" },
    { key: "11", label: "GRC Exception Log", dataSource: "main" },
  ];
  const handleExport = () => {
    const wb = XLSX.utils.book_new();
    tabConfigs.forEach((config) => {
      const tabKey = config.key;
      const sheetName = config.label;
      const fields = ["key", "no", "process"];
      if (config.subTabs) {
        config.subTabs.forEach((sub) => {
          const cols = getColumns(tabKey, sub);
          cols.forEach((c) => {
            if (
              "dataIndex" in c &&
              c.dataIndex &&
              !fields.includes(c.dataIndex as string) &&
              c.key !== "actions"
            ) {
              fields.push(c.dataIndex as string);
            }
          });
        });
      } else {
        const cols = getColumns(tabKey, "");
        cols.forEach((c) => {
          if (
            "dataIndex" in c &&
            c.dataIndex &&
            !fields.includes(c.dataIndex as string) &&
            c.key !== "actions"
          ) {
            fields.push(c.dataIndex as string);
          }
        });
      }
      let sourceData: DataType[];
      switch (config.dataSource) {
        case "main":
          sourceData = mainData;
          break;
        case "control":
          sourceData = controlData;
          break;
        case "financial":
          sourceData = financialData;
          break;
        case "audit":
          sourceData = auditData;
          break;
        default:
          sourceData = [];
      }
      const sheetData = sourceData.map((row) => {
        const newRow: Record<string, any> = {};
        fields.forEach((f) => {
          newRow[f] = row[f];
        });
        return newRow;
      });
      const ws = XLSX.utils.json_to_sheet(sheetData);
      XLSX.utils.book_append_sheet(wb, ws, sheetName.slice(0, 31));
    });
    XLSX.writeFile(wb, "rcm_data.xlsx");
  };
  // ---------- IMPORT LOGIC ----------
  const handleImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target?.result as ArrayBuffer;
      const wb = XLSX.read(data, { type: "array" });
      const updates: Record<string, Map<string, DataType>> = {
        main: new Map(mainData.map((d) => [d.key, { ...d }])),
        control: new Map(controlData.map((d) => [d.key, { ...d }])),
        financial: new Map(financialData.map((d) => [d.key, { ...d }])),
        audit: new Map(auditData.map((d) => [d.key, { ...d }])),
      };
      tabConfigs.forEach((config) => {
        const sheetName = config.label;
        if (!wb.Sheets[sheetName]) return;
        const imported: DataType[] = XLSX.utils.sheet_to_json(
          wb.Sheets[sheetName]
        );
        const source = config.dataSource;
        const dataMap = updates[source];
        imported.forEach((imp) => {
          if (!imp.key) return;
          if (dataMap.has(imp.key)) {
            Object.assign(dataMap.get(imp.key)!, imp);
          } else {
            dataMap.set(imp.key, imp);
          }
        });
      });
      const sortFn = (a: DataType, b: DataType) =>
        parseFloat(a.key) - parseFloat(b.key);
      setMainData(Array.from(updates.main.values()).sort(sortFn));
      setControlData(Array.from(updates.control.values()).sort(sortFn));
      setFinancialData(Array.from(updates.financial.values()).sort(sortFn));
      setAuditData(Array.from(updates.audit.values()).sort(sortFn));
    };
    reader.readAsArrayBuffer(file);
  };
  // Expose import trigger via ref
  useImperativeHandle(ref, () => ({
    triggerImport: (file: File) => handleImport(file),
  }));
  // Add Row
  const onAddRow = () => {
    const parseNo = (val: string | number | undefined) => {
      const s = String(val ?? "");
      if (!s) return { major: 0, minor: 0 };
      const parts = s.split(".");
      const major = parseInt(parts[0], 10) || 0;
      const minor = parts.length > 1 ? parseInt(parts[1], 10) || 0 : 0;
      return { major, minor };
    };
    let maxMajor = -Infinity;
    let maxMinor = -Infinity;
    tableData.forEach((d) => {
      const { major, minor } = parseNo(d.no);
      if (major > maxMajor || (major === maxMajor && minor > maxMinor)) {
        maxMajor = major;
        maxMinor = minor;
      }
    });
    const newNoStr = maxMajor === -Infinity ? "1.1" : `${maxMajor}.${maxMinor + 1}`;

    // ---------- NEW: generate numeric sequential key ----------
    // Prefer existing integer keys (e.g., "1", "2", "3" ...). If none found, fall back to tableData.length.
    const integerKeys: number[] = tableData
      .map((d) => {
        const k = String(d.key).trim();
        const m = k.match(/^(\d+)$/); // match purely integer keys
        return m ? parseInt(m[1], 10) : null;
      })
      .filter((n): n is number => n !== null);

    const baseForKey = integerKeys.length ? Math.max(...integerKeys) : tableData.length;
    const newKey = String(baseForKey + 1);
    // ---------------------------------------------------------

    const newRow: DataType = {
      key: newKey,
      no: newNoStr,
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
      processStage: "",
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
    const setCurrentData = getCurrentSetter();
    setCurrentData((prev) => [...prev, newRow]);
    setEditingKeys((prev) => [...prev, newKey]);
  };
  // Handlers
  const handlers = {
    onStageChange: (key: string, rowKey: string) => {
      const setCurrentData = getCurrentSetter();
      setCurrentData((prev) =>
        prev.map((r) => (r.key === rowKey ? { ...r, stage: key } : r))
      );
    },
    onSelectGeneric: (key: string, rowKey: string, field?: string) => {
      if (!field) return;
      const setCurrentData = getCurrentSetter();
      setCurrentData((prev) =>
        prev.map((r) => (r.key === rowKey ? { ...r, [field]: key } : r))
      );
    },
    onCheckboxChange: (rowKey: string, field: keyof DataType, checked: boolean) => {
      const setCurrentData = getCurrentSetter();
      setCurrentData((prev) =>
        prev.map((r) => (r.key === rowKey ? { ...r, [field]: checked } : r))
      );
    },
    onTextChange: (rowKey: string, field: keyof DataType, value: string) => {
      const setCurrentData = getCurrentSetter();
      setCurrentData((prev) =>
        prev.map((r) => (r.key === rowKey ? { ...r, [field]: value } : r))
      );
    },
    onSaveRow: (rowKey: string) => {
      setEditingKeys((prev) => prev.filter((k) => k !== rowKey));
    },
    onEditRow: (rowKey: string) => {
      setEditingKeys((prev) => [...prev, rowKey]);
    },
    onDeleteRow: (rowKey: string) => {
      const setCurrentData = getCurrentSetter();
      setCurrentData((prev) => prev.filter((r) => r.key !== rowKey));
      setEditingKeys((prev) => prev.filter((k) => k !== rowKey));
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
              items={tabConfigs.map((config) => ({
                key: config.key,
                label: config.label,
              }))}
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
          {/* Only Export button remains */}
          <div className="mb-4">
            <Button onClick={handleExport}>Export Data</Button>
          </div>
          <div className="p-4 bg-white shadow-md overflow-x-auto">
            <Table
              columns={getColumns(activeTab, activeSubTab, handlers, editingKeys)}
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
});
AccountReceivable.displayName = "AccountReceivable";
export default AccountReceivable;
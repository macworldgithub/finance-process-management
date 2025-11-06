// "use client";
// import React, { useEffect, useState } from "react";
// import { Table, Tabs, Spin, Input, Button } from "antd";
// import { LeftOutlined, RightOutlined, EditOutlined } from "@ant-design/icons";
// import { getColumns } from "./columns";
// import {
//   data as importedData,
//   controlAssessmentData,
//   financialAssertionsData,
//   internalAuditData,
// } from "./data";
// import { DataType } from "./types";

// const { TextArea } = Input;

// const AccountReceivable: React.FC = () => {
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("1");
//   const [activeSubTab, setActiveSubTab] = useState("coso");
//   const [tableData, setTableData] = useState<DataType[]>([]);
//   const [editingKeys, setEditingKeys] = useState<string[]>([]);
//   const tabKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (activeTab === "7") {
//         setTableData(controlAssessmentData);
//       } else if (activeTab === "9") {
//         setTableData(financialAssertionsData);
//       } else if (activeTab === "10") {
//         setTableData(internalAuditData);
//       } else {
//         setTableData(importedData);
//       }
//       setLoading(false);
//     }, 100);
//     return () => clearTimeout(timer);
//   }, [activeTab]);

//   // Handlers
//   const onAddRow = () => {
//     // helper to parse "major.minor" (works if no is number or string)
//     const parseNo = (val: string | number | undefined) => {
//       const s = String(val ?? "");
//       if (!s) return { major: 0, minor: 0 };
//       const parts = s.split(".");
//       const major = parseInt(parts[0], 10) || 0;
//       const minor = parts.length > 1 ? parseInt(parts[1], 10) || 0 : 0;
//       return { major, minor };
//     };
//     // find the max major, and within that major the max minor
//     let maxMajor = -Infinity;
//     let maxMinor = -Infinity;
//     tableData.forEach((d) => {
//       const { major, minor } = parseNo(d.no);
//       if (major > maxMajor || (major === maxMajor && minor > maxMinor)) {
//         maxMajor = major;
//         maxMinor = minor;
//       }
//     });
//     // If no rows, start at 1.1 (adjust if you want a different starting point)
//     const newNoStr =
//       maxMajor === -Infinity ? "1.1" : `${maxMajor}.${maxMinor + 1}`;
//     const newKey = newNoStr; // keep keys unique and readable
//     const newRow: DataType = {
//       key: newKey,
//       no: newNoStr, // <-- note: string (so "5.13" stays as-is)
//       process: "New Process",
//       processDescription: "",
//       processObjective: "",
//       processSeverityLevels: "",
//       activity: "",
//       process2: "",
//       stage: "",
//       functions: "",
//       clientSegment: "",
//       operationalUnit: "",
//       division: "",
//       entity: "",
//       unitDepartment: "",
//       productClass: "",
//       productName: "",
//       integrityEthical: false,
//       boardOversight: false,
//       orgStructure: false,
//       commitmentCompetence: false,
//       managementPhilosophy: false,
//       assignmentAuthority: false,
//       hrPolicies: false,
//       boardAudit: false,
//       managementControl: false,
//       externalInfluences: false,
//       commitmentInternal: false,
//       enforcementIntegrity: false,
//       employeeAwareness: false,
//       accountability: false,
//       commitmentTransparency: false,
//       responsibilityMatrix: false,
//       segregationDuties: false,
//       reportingLines: false,
//       mission: false,
//       visionValues: false,
//       goalsObjectives: false,
//       structuresSystems: false,
//       policiesProcedures: false,
//       processes: false,
//       oversightStructure: false,
//       standards: false,
//       methodologies: false,
//       rulesRegulations: false,
//       riskType: "",
//       riskDescription: "",
//       severityImpact: "",
//       probabilityLikelihood: "",
//       classification: "",
//       riskResponseType: "",
//       controlObjectives: "",
//       controlDefinition: "",
//       controlDescription: "",
//       controlResponsibility: "",
//       levelResponsibility: "",
//       cosoPrinciple: "",
//       operationalApproach: "",
//       operationalFrequency: "",
//       controlClassification: "",
//       soxControlActivity: "",
//       internalControlFinancial: false,
//       occurrence: false,
//       completeness: false,
//       accuracy: false,
//       authorization: false,
//       cutoff: false,
//       classificationSOX: false,
//       existence: false,
//       rightsObligations: false,
//       valuationAllocation: false,
//       presentationDisclosure: false,
//       check: false,
//       internalAuditTest: "",
//       sampleSize: "",
//       grcAdequacy: "",
//       grcEffectiveness: "",
//       explanation: "",
//     };
//     setTableData((prev) => [...prev, newRow]);
//     setEditingKeys((prev) => [...prev, newKey]);
//   };

//   const handlers = {
//     onStageChange: (key: string, rowKey: string) => {
//       setTableData((prev) =>
//         prev.map((r) => (r.key === rowKey ? { ...r, stage: key } : r))
//       );
//     },
//     onSelectGeneric: (key: string, rowKey: string, field?: string) => {
//       if (!field) return;
//       setTableData((prev) =>
//         prev.map((r) => (r.key === rowKey ? { ...r, [field]: key } : r))
//       );
//     },
//     onCheckboxChange: (
//       rowKey: string,
//       field: keyof DataType,
//       checked: boolean
//     ) => {
//       setTableData((prev) =>
//         prev.map((r) => (r.key === rowKey ? { ...r, [field]: checked } : r))
//       );
//     },
//     onTextChange: (rowKey: string, field: keyof DataType, value: string) => {
//       setTableData((prev) =>
//         prev.map((r) => (r.key === rowKey ? { ...r, [field]: value } : r))
//       );
//     },
//     onSaveRow: (rowKey: string) => {
//       setEditingKeys((prev) => prev.filter((k) => k !== rowKey));
//     },
//     onEditRow: (rowKey: string) => {
//       setEditingKeys((prev) => [...prev, rowKey]);
//     },
//     onAddRow,
//   };
//   // Navigation
//   const currentIndex = tabKeys.indexOf(activeTab);
//   const hasPrev = currentIndex > 0;
//   const hasNext = currentIndex < tabKeys.length - 1;
//   const goPrev = () => {
//     if (hasPrev) setActiveTab(tabKeys[currentIndex - 1]);
//   };
//   const goNext = () => {
//     if (hasNext) setActiveTab(tabKeys[currentIndex + 1]);
//   };
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "ArrowLeft") goPrev();
//       if (e.key === "ArrowRight") goNext();
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [currentIndex]);
//   return (
//     <div className="p-6 bg-[#f8fafc] min-h-screen overflow-y-auto">
//       {loading ? (
//         <div className="flex justify-center items-center h-screen">
//           <Spin size="large" />
//         </div>
//       ) : (
//         <>
//           <div className="flex items-center justify-between mb-6">
//             <h1 className="text-2xl font-semibold text-gray-800">
//               RCM – Account Receivable
//             </h1>
//             <div className="flex space-x-3 bg-white border border-black shadow-sm">
//               <button
//                 onClick={goPrev}
//                 disabled={!hasPrev}
//                 className={`p-2 rounded-md transition font-bold ${
//                   hasPrev
//                     ? "text-black hover:bg-gray-50 cursor-pointer"
//                     : "text-gray-400 cursor-not-allowed"
//                 }`}
//                 aria-label="Previous Tab"
//               >
//                 <LeftOutlined />
//               </button>
//               <div className="bg-black w-[2px] h-6 my-auto"></div>
//               <button
//                 onClick={goNext}
//                 disabled={!hasNext}
//                 className={`p-2 rounded-md transition font-bold ${
//                   hasNext
//                     ? "text-black hover:bg-gray-50 cursor-pointer"
//                     : "text-gray-400 cursor-not-allowed"
//                 }`}
//                 aria-label="Next Tab"
//               >
//                 <RightOutlined />
//               </button>
//             </div>
//           </div>
//           <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-sm mb-6 px-6 py-2">
//             <Tabs
//               activeKey={activeTab}
//               onChange={setActiveTab}
//               className="text-lg"
//               items={[
//                 { key: "1", label: "Process" },
//                 { key: "2", label: "Ownership" },
//                 { key: "3", label: "Control Environment" },
//                 { key: "4", label: "Risk Assessment (Inherent Risk)" },
//                 { key: "5", label: "Risk Responses" },
//                 { key: "6", label: "Control Activities" },
//                 { key: "7", label: "Control Assessment" },
//                 { key: "8", label: "Risk Assessment (Residual Risk)" },
//                 { key: "9", label: "SOX - Financial Statement Assertions" },
//                 { key: "10", label: "Internal Audit Test" },
//                 { key: "11", label: "GRC Exception Log" },
//               ]}
//             />
//           </div>
//           {activeTab === "3" && (
//             <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-sm mb-6 px-6 py-2">
//               <Tabs
//                 activeKey={activeSubTab}
//                 onChange={setActiveSubTab}
//                 className="text-sm"
//                 items={[
//                   { key: "coso", label: "COSO" },
//                   {
//                     key: "intosai",
//                     label: "INTOSAI, IFAC, and Government Audit Standards",
//                   },
//                   { key: "other", label: "Other" },
//                 ]}
//               />
//             </div>
//           )}
//           <div className="p-4 bg-white shadow-md overflow-x-auto">
//             <Table
//               columns={getColumns(
//                 activeTab,
//                 activeSubTab,
//                 handlers,
//                 editingKeys
//               )}
//               dataSource={tableData}
//               pagination={false}
//               scroll={{ x: 1300, y: 450 }}
//               bordered
//             />
//           </div>
//         </>
//       )}
//     </div>
//   );
// };
// export default AccountReceivable;

// "use client";
// import React, { useEffect, useState } from "react";
// import { Table, Tabs, Spin, Input, Button, Popconfirm } from "antd";
// import { LeftOutlined, RightOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import { getColumns } from "./columns";
// import {
//   data as importedData,
//   controlAssessmentData,
//   financialAssertionsData,
//   internalAuditData,
// } from "./data";
// import { DataType } from "./types";

// const { TextArea } = Input;
// const AccountReceivable: React.FC = () => {
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("1");
//   const [activeSubTab, setActiveSubTab] = useState("coso");
//   const [tableData, setTableData] = useState<DataType[]>([]);
//   const [editingKeys, setEditingKeys] = useState<string[]>([]);
//   const tabKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];

//   const [mainData, setMainData] = useState<DataType[]>(() => {
//     const stored = localStorage.getItem('mainData');
//     return stored ? JSON.parse(stored) : importedData;
//   });
//   const [controlData, setControlData] = useState<DataType[]>(() => {
//     const stored = localStorage.getItem('controlData');
//     return stored ? JSON.parse(stored) : controlAssessmentData;
//   });
//   const [financialData, setFinancialData] = useState<DataType[]>(() => {
//     const stored = localStorage.getItem('financialData');
//     return stored ? JSON.parse(stored) : financialAssertionsData;
//   });
//   const [auditData, setAuditData] = useState<DataType[]>(() => {
//     const stored = localStorage.getItem('auditData');
//     return stored ? JSON.parse(stored) : internalAuditData;
//   });

//   useEffect(() => {
//     localStorage.setItem('mainData', JSON.stringify(mainData));
//   }, [mainData]);

//   useEffect(() => {
//     localStorage.setItem('controlData', JSON.stringify(controlData));
//   }, [controlData]);

//   useEffect(() => {
//     localStorage.setItem('financialData', JSON.stringify(financialData));
//   }, [financialData]);

//   useEffect(() => {
//     localStorage.setItem('auditData', JSON.stringify(auditData));
//   }, [auditData]);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       let dataToSet: DataType[];
//       if (activeTab === "7") {
//         dataToSet = controlData;
//       } else if (activeTab === "9") {
//         dataToSet = financialData;
//       } else if (activeTab === "10") {
//         dataToSet = auditData;
//       } else {
//         dataToSet = mainData;
//       }
//       setTableData(dataToSet);
//       setLoading(false);
//     }, 100);
//     return () => clearTimeout(timer);
//   }, [activeTab, mainData, controlData, financialData, auditData]);

//   const getCurrentSetter = () => {
//     if (activeTab === "7") {
//       return setControlData;
//     } else if (activeTab === "9") {
//       return setFinancialData;
//     } else if (activeTab === "10") {
//       return setAuditData;
//     } else {
//       return setMainData;
//     }
//   };

//   const handleExport = () => {
//     const dataToExport = { mainData, controlData, financialData, auditData };
//     const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'rcm_data.json';
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         try {
//           const imported = JSON.parse(event.target?.result as string);
//           setMainData(imported.mainData || importedData);
//           setControlData(imported.controlData || controlAssessmentData);
//           setFinancialData(imported.financialData || financialAssertionsData);
//           setAuditData(imported.auditData || internalAuditData);
//         } catch (error) {
//           console.error('Invalid JSON file', error);
//           // Optionally, show error message to user
//         }
//       };
//       reader.readAsText(file);
//     }
//   };

//   // Handlers
//   const onAddRow = () => {
//     // helper to parse "major.minor" (works if no is number or string)
//     const parseNo = (val: string | number | undefined) => {
//       const s = String(val ?? "");
//       if (!s) return { major: 0, minor: 0 };
//       const parts = s.split(".");
//       const major = parseInt(parts[0], 10) || 0;
//       const minor = parts.length > 1 ? parseInt(parts[1], 10) || 0 : 0;
//       return { major, minor };
//     };
//     // find the max major, and within that major the max minor
//     let maxMajor = -Infinity;
//     let maxMinor = -Infinity;
//     tableData.forEach((d) => {
//       const { major, minor } = parseNo(d.no);
//       if (major > maxMajor || (major === maxMajor && minor > maxMinor)) {
//         maxMajor = major;
//         maxMinor = minor;
//       }
//     });
//     // If no rows, start at 1.1 (adjust if you want a different starting point)
//     const newNoStr =
//       maxMajor === -Infinity ? "1.1" : `${maxMajor}.${maxMinor + 1}`;
//     const newKey = newNoStr; // keep keys unique and readable
//     const newRow: DataType = {
//       key: newKey,
//       no: newNoStr, // <-- note: string (so "5.13" stays as-is)
//       process: "New Process",
//       processDescription: "",
//       processObjective: "",
//       processSeverityLevels: "",
//       activity: "",
//       process2: "",
//       stage: "",
//       functions: "",
//       clientSegment: "",
//       operationalUnit: "",
//       division: "",
//       entity: "",
//       unitDepartment: "",
//       productClass: "",
//       productName: "",
//       integrityEthical: false,
//       boardOversight: false,
//       orgStructure: false,
//       commitmentCompetence: false,
//       managementPhilosophy: false,
//       assignmentAuthority: false,
//       hrPolicies: false,
//       boardAudit: false,
//       managementControl: false,
//       externalInfluences: false,
//       commitmentInternal: false,
//       enforcementIntegrity: false,
//       employeeAwareness: false,
//       accountability: false,
//       commitmentTransparency: false,
//       responsibilityMatrix: false,
//       segregationDuties: false,
//       reportingLines: false,
//       mission: false,
//       visionValues: false,
//       goalsObjectives: false,
//       structuresSystems: false,
//       policiesProcedures: false,
//       processes: false,
//       oversightStructure: false,
//       standards: false,
//       methodologies: false,
//       rulesRegulations: false,
//       riskType: "",
//       riskDescription: "",
//       severityImpact: "",
//       probabilityLikelihood: "",
//       classification: "",
//       riskResponseType: "",
//       controlObjectives: "",
//       controlDefinition: "",
//       controlDescription: "",
//       controlResponsibility: "",
//       levelResponsibility: "",
//       cosoPrinciple: "",
//       operationalApproach: "",
//       operationalFrequency: "",
//       controlClassification: "",
//       soxControlActivity: "",
//       internalControlFinancial: false,
//       occurrence: false,
//       completeness: false,
//       accuracy: false,
//       authorization: false,
//       cutoff: false,
//       classificationSOX: false,
//       existence: false,
//       rightsObligations: false,
//       valuationAllocation: false,
//       presentationDisclosure: false,
//       check: false,
//       internalAuditTest: "",
//       sampleSize: "",
//       grcAdequacy: "",
//       grcEffectiveness: "",
//       explanation: "",
//     };
//     const setCurrentData = getCurrentSetter();
//     setCurrentData((prev: DataType[]) => [...prev, newRow]);
//     setEditingKeys((prev) => [...prev, newKey]);
//   };
//   const handlers = {
//     onStageChange: (key: string, rowKey: string) => {
//       const setCurrentData = getCurrentSetter();
//       setCurrentData((prev: DataType[]) =>
//         prev.map((r) => (r.key === rowKey ? { ...r, stage: key } : r))
//       );
//     },
//     onSelectGeneric: (key: string, rowKey: string, field?: string) => {
//       if (!field) return;
//       const setCurrentData = getCurrentSetter();
//       setCurrentData((prev: DataType[]) =>
//         prev.map((r) => (r.key === rowKey ? { ...r, [field]: key } : r))
//       );
//     },
//     onCheckboxChange: (
//       rowKey: string,
//       field: keyof DataType,
//       checked: boolean
//     ) => {
//       const setCurrentData = getCurrentSetter();
//       setCurrentData((prev: DataType[]) =>
//         prev.map((r) => (r.key === rowKey ? { ...r, [field]: checked } : r))
//       );
//     },
//     onTextChange: (rowKey: string, field: keyof DataType, value: string) => {
//       const setCurrentData = getCurrentSetter();
//       setCurrentData((prev: DataType[]) =>
//         prev.map((r) => (r.key === rowKey ? { ...r, [field]: value } : r))
//       );
//     },
//     onSaveRow: (rowKey: string) => {
//       setEditingKeys((prev) => prev.filter((k) => k !== rowKey));
//     },
//     onEditRow: (rowKey: string) => {
//       setEditingKeys((prev) => [...prev, rowKey]);
//     },
//     onDeleteRow: (rowKey: string) => {
//       const setCurrentData = getCurrentSetter();
//       setCurrentData((prev: DataType[]) => prev.filter((r) => r.key !== rowKey));
//       setEditingKeys((prev) => prev.filter((k) => k !== rowKey));
//     },
//     onAddRow,
//   };
//   // Navigation
//   const currentIndex = tabKeys.indexOf(activeTab);
//   const hasPrev = currentIndex > 0;
//   const hasNext = currentIndex < tabKeys.length - 1;
//   const goPrev = () => {
//     if (hasPrev) setActiveTab(tabKeys[currentIndex - 1]);
//   };
//   const goNext = () => {
//     if (hasNext) setActiveTab(tabKeys[currentIndex + 1]);
//   };
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "ArrowLeft") goPrev();
//       if (e.key === "ArrowRight") goNext();
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [currentIndex]);
//   return (
//     <div className="p-6 bg-[#f8fafc] min-h-screen overflow-y-auto">
//       {loading ? (
//         <div className="flex justify-center items-center h-screen">
//           <Spin size="large" />
//         </div>
//       ) : (
//         <>
//           <div className="flex items-center justify-between mb-6">
//             <h1 className="text-2xl font-semibold text-gray-800">
//               RCM – Account Receivable
//             </h1>
//             <div className="flex space-x-3 bg-white border border-black shadow-sm">
//               <button
//                 onClick={goPrev}
//                 disabled={!hasPrev}
//                 className={`p-2 rounded-md transition font-bold ${
//                   hasPrev
//                     ? "text-black hover:bg-gray-50 cursor-pointer"
//                     : "text-gray-400 cursor-not-allowed"
//                 }`}
//                 aria-label="Previous Tab"
//               >
//                 <LeftOutlined />
//               </button>
//               <div className="bg-black w-[2px] h-6 my-auto"></div>
//               <button
//                 onClick={goNext}
//                 disabled={!hasNext}
//                 className={`p-2 rounded-md transition font-bold ${
//                   hasNext
//                     ? "text-black hover:bg-gray-50 cursor-pointer"
//                     : "text-gray-400 cursor-not-allowed"
//                 }`}
//                 aria-label="Next Tab"
//               >
//                 <RightOutlined />
//               </button>
//             </div>
//           </div>
//           <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-sm mb-6 px-6 py-2">
//             <Tabs
//               activeKey={activeTab}
//               onChange={setActiveTab}
//               className="text-lg"
//               items={[
//                 { key: "1", label: "Process" },
//                 { key: "2", label: "Ownership" },
//                 { key: "3", label: "Control Environment" },
//                 { key: "4", label: "Risk Assessment (Inherent Risk)" },
//                 { key: "5", label: "Risk Responses" },
//                 { key: "6", label: "Control Activities" },
//                 { key: "7", label: "Control Assessment" },
//                 { key: "8", label: "Risk Assessment (Residual Risk)" },
//                 { key: "9", label: "SOX - Financial Statement Assertions" },
//                 { key: "10", label: "Internal Audit Test" },
//                 { key: "11", label: "GRC Exception Log" },
//               ]}
//             />
//           </div>
//           {activeTab === "3" && (
//             <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-sm mb-6 px-6 py-2">
//               <Tabs
//                 activeKey={activeSubTab}
//                 onChange={setActiveSubTab}
//                 className="text-sm"
//                 items={[
//                   { key: "coso", label: "COSO" },
//                   {
//                     key: "intosai",
//                     label: "INTOSAI, IFAC, and Government Audit Standards",
//                   },
//                   { key: "other", label: "Other" },
//                 ]}
//               />
//             </div>
//           )}
//           <div className="mb-4 flex space-x-4">
//             <Button onClick={handleExport}>Export Data</Button>
//             <Button>
//               Import Data
//               <input
//                 type="file"
//                 accept=".json"
//                 onChange={handleImport}
//                 style={{ position: 'absolute', opacity: 0, left: 0, top: 0, width: '100%', height: '100%', cursor: 'pointer' }}
//               />
//             </Button>
//           </div>
//           <div className="p-4 bg-white shadow-md overflow-x-auto">
//             <Table
//               columns={getColumns(
//                 activeTab,
//                 activeSubTab,
//                 handlers,
//                 editingKeys
//               )}
//               dataSource={tableData}
//               pagination={false}
//               scroll={{ x: 1300, y: 450 }}
//               bordered
//             />
//           </div>
//         </>
//       )}
//     </div>
//   );
// };
// export default AccountReceivable;
"use client";
import React, { useEffect, useState } from "react";
import { Table, Tabs, Spin, Input, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { getColumns } from "./columns";
import {
  data as importedData,
  controlAssessmentData,
  financialAssertionsData,
  internalAuditData,
} from "./data";
import { DataType } from "./types";

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

const AccountReceivable: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("1");
  const [activeSubTab, setActiveSubTab] = useState("coso");
  const [tableData, setTableData] = useState<DataType[]>([]);
  const [editingKeys, setEditingKeys] = useState<string[]>([]);
  const tabKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];

  // ---- lazy initializers: read localStorage safely only once during init ----
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
  // --------------------------------------------------------------------------

  // Persist to localStorage on changes (only when window exists)
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      localStorage.setItem("mainData", JSON.stringify(mainData));
    } catch (err) {
      console.warn("Failed to write mainData to localStorage", err);
    }
  }, [mainData]);

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      localStorage.setItem("controlData", JSON.stringify(controlData));
    } catch (err) {
      console.warn("Failed to write controlData to localStorage", err);
    }
  }, [controlData]);

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      localStorage.setItem("financialData", JSON.stringify(financialData));
    } catch (err) {
      console.warn("Failed to write financialData to localStorage", err);
    }
  }, [financialData]);

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      localStorage.setItem("auditData", JSON.stringify(auditData));
    } catch (err) {
      console.warn("Failed to write auditData to localStorage", err);
    }
  }, [auditData]);

  // Simulated loading delay + set tableData according to activeTab
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

  const handleExport = () => {
    const dataToExport = { mainData, controlData, financialData, auditData };
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "rcm_data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target?.result as string);
          setMainData(imported.mainData || importedData);
          setControlData(imported.controlData || controlAssessmentData);
          setFinancialData(imported.financialData || financialAssertionsData);
          setAuditData(imported.auditData || internalAuditData);
        } catch (error) {
          console.error("Invalid JSON file", error);
        }
      };
      reader.readAsText(file);
    }
  };

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
    const newKey = newNoStr;

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
    // currentIndex is safe here; goPrev/goNext capture the latest values from closure
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

          <div className="mb-4 flex space-x-4">
            <Button onClick={handleExport}>Export Data</Button>
            <Button>
              Import Data
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                style={{
                  position: "absolute",
                  opacity: 0,
                  left: 0,
                  top: 0,
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                }}
              />
            </Button>
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
};

export default AccountReceivable;

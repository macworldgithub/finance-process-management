// "use client";
// import React, {
//   useEffect,
//   useState,
//   forwardRef,
//   useImperativeHandle,
//   useRef,
//   useCallback,
// } from "react";
// import { Table, Tabs, Spin, Button, Popconfirm } from "antd";
// import {
//   LeftOutlined,
//   RightOutlined,
//   EditOutlined,
//   DeleteOutlined,
// } from "@ant-design/icons";
// import { getColumns } from "./columns";
// import {
//   data as importedData,
//   controlAssessmentData,
//   financialAssertionsData,
//   internalAuditData,
// } from "./data";
// import { DataType } from "./types";
// import * as XLSX from "xlsx";
// import { Input } from "antd";
// const { TextArea } = Input;

// const readFromLocalStorage = <T,>(key: string, fallback: T): T => {
//   try {
//     if (typeof window === "undefined") return fallback;
//     const raw = localStorage.getItem(key);
//     return raw ? (JSON.parse(raw) as T) : fallback;
//   } catch (err) {
//     console.warn(`Failed to parse localStorage ${key}`, err);
//     return fallback;
//   }
// };

// export interface AccountReceivableRef {
//   triggerImport: (file: File) => void;
// }

// const AccountReceivable = forwardRef<AccountReceivableRef>((_, ref) => {
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const tableWrapperRef = useRef<HTMLDivElement>(null);
//   const topScrollbarRef = useRef<HTMLDivElement>(null);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("1");
//   const [activeSubTab, setActiveSubTab] = useState("coso");

//   // Reset sub-tab when switching main tabs
//   useEffect(() => {
//     if (activeTab === "3") {
//       setActiveSubTab("coso");
//     } else if (activeTab === "9") {
//       setActiveSubTab("sox");
//     } else if (activeTab === "10") {
//       setActiveSubTab("audit");
//     }
//   }, [activeTab]);
//   const [tableData, setTableData] = useState<DataType[]>([]);
//   const [editingKeys, setEditingKeys] = useState<string[]>([]);
//   const tabKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

//   const [mainData, setMainData] = useState<DataType[]>(() =>
//     readFromLocalStorage<DataType[]>("mainData", importedData)
//   );
//   const [controlData, setControlData] = useState<DataType[]>(() =>
//     readFromLocalStorage<DataType[]>("controlData", controlAssessmentData)
//   );
//   const [financialData, setFinancialData] = useState<DataType[]>(() =>
//     readFromLocalStorage<DataType[]>("financialData", financialAssertionsData)
//   );
//   const [auditData, setAuditData] = useState<DataType[]>(() =>
//     readFromLocalStorage<DataType[]>("auditData", internalAuditData)
//   );

//   // Navigation state
//   const currentTabIndex = tabKeys.indexOf(activeTab);
//   const hasPrev = currentTabIndex > 0;
//   const hasNext = currentTabIndex < tabKeys.length - 1;

//   const goPrev = useCallback(() => {
//     if (hasPrev) {
//       setActiveTab(tabKeys[currentTabIndex - 1]);
//     }
//   }, [currentTabIndex, hasPrev]);

//   const goNext = useCallback(() => {
//     if (hasNext) {
//       setActiveTab(tabKeys[currentTabIndex + 1]);
//     }
//   }, [currentTabIndex, hasNext]);

//   // Persist to localStorage
//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     localStorage.setItem("mainData", JSON.stringify(mainData));
//   }, [mainData]);

//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     localStorage.setItem("controlData", JSON.stringify(controlData));
//   }, [controlData]);

//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     localStorage.setItem("financialData", JSON.stringify(financialData));
//   }, [financialData]);

//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     localStorage.setItem("auditData", JSON.stringify(auditData));
//   }, [auditData]);

//   // Load table data based on active tab
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       let dataToSet: DataType[];
//       if (activeTab === "7") dataToSet = controlData;
//       else if (activeTab === "9") dataToSet = financialData;
//       else if (activeTab === "10") dataToSet = auditData;
//       else dataToSet = mainData;
//       setTableData(dataToSet);
//       setLoading(false);
//     }, 100);
//     return () => clearTimeout(timer);
//   }, [activeTab, mainData, controlData, financialData, auditData]);

//   // Sync scrollbars when table loads
//   useEffect(() => {
//     const syncScrollbars = () => {
//       const tableBody = tableWrapperRef.current?.querySelector(
//         ".ant-table-body"
//       ) as HTMLElement;
//       if (tableBody && topScrollbarRef.current) {
//         // Sync top scrollbar with table body
//         const handleTableScroll = () => {
//           if (topScrollbarRef.current) {
//             topScrollbarRef.current.scrollLeft = tableBody.scrollLeft;
//           }
//         };

//         tableBody.addEventListener("scroll", handleTableScroll);

//         // Set scrollbar width to match table scroll width
//         const updateScrollbarWidth = () => {
//           if (topScrollbarRef.current) {
//             const scrollbarContent =
//               topScrollbarRef.current.querySelector("div");
//             if (scrollbarContent && tableBody.scrollWidth > 0) {
//               scrollbarContent.style.minWidth = `${tableBody.scrollWidth}px`;
//             }
//           }
//         };

//         // Update width initially and after a short delay to ensure table is rendered
//         updateScrollbarWidth();
//         const widthTimer = setTimeout(updateScrollbarWidth, 300);

//         return () => {
//           tableBody.removeEventListener("scroll", handleTableScroll);
//           clearTimeout(widthTimer);
//         };
//       }
//     };

//     const timer = setTimeout(syncScrollbars, 200);
//     return () => clearTimeout(timer);
//   }, [tableData, activeTab, activeSubTab]);

//   const getCurrentSetter = () => {
//     if (activeTab === "7") return setControlData;
//     else if (activeTab === "9") return setFinancialData;
//     else if (activeTab === "10") return setAuditData;
//     else return setMainData;
//   };

//   const tabConfigs = [
//     { key: "1", label: "Processes", dataSource: "main" },
//     { key: "2", label: "Ownership", dataSource: "main" },
//     {
//       key: "3",
//       label: "Control Environment",
//       dataSource: "main",
//       subTabs: ["coso", "intosai", "other"],
//     },
//     { key: "4", label: "Risk Assessment (Inherent Risk)", dataSource: "main" },
//     { key: "5", label: "Risk Responses", dataSource: "main" },
//     { key: "6", label: "Control Activities", dataSource: "main" },
//     { key: "7", label: "Control Assessment", dataSource: "control" },
//     { key: "8", label: "Risk Assessment (Residual Risk)", dataSource: "main" },
//     {
//       key: "9",
//       label: "Compliance Management",
//       dataSource: "financial",
//       subTabs: ["sox", "financial"],
//     },
//     {
//       key: "10",
//       label: "Internal Audit Management",
//       dataSource: "audit",
//       subTabs: ["audit", "grc"],
//     },
//   ];

//   const handleExport = () => {
//     const wb = XLSX.utils.book_new();
//     tabConfigs.forEach((config) => {
//       const data =
//         config.dataSource === "main"
//           ? mainData
//           : config.dataSource === "control"
//           ? controlData
//           : config.dataSource === "financial"
//           ? financialData
//           : auditData;

//       const ws = XLSX.utils.json_to_sheet(data);
//       XLSX.utils.book_append_sheet(wb, ws, config.label.substring(0, 31)); // Sheet name max 31 chars
//     });
//     XLSX.writeFile(wb, "AccountReceivable_Export.xlsx");
//   };

//   // Handle keyboard navigation
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "ArrowLeft" && hasPrev) {
//         goPrev();
//       } else if (e.key === "ArrowRight" && hasNext) {
//         goNext();
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [goPrev, goNext, hasPrev, hasNext]);

//   // Define table handlers
//   const handlers = {
//     onEdit: (key: string) => {
//       setEditingKeys((prev) => [...prev, key]);
//     },
//     onDelete: (key: string) => {
//       const setter = getCurrentSetter();
//       setter((prev) => prev.filter((item) => item.key !== key));
//     },
//     onSave: (key: string) => {
//       setEditingKeys((prev) => prev.filter((k) => k !== key));
//     },
//     onCancel: (key: string) => {
//       setEditingKeys((prev) => prev.filter((k) => k !== key));
//     },
//     onCheckboxChange: (
//       rowKey: string,
//       field: keyof DataType,
//       checked: boolean
//     ) => {
//       const setter = getCurrentSetter();
//       setter((prev) =>
//         prev.map((item) =>
//           item.key === rowKey ? { ...item, [field]: checked } : item
//         )
//       );
//     },
//     onSelectGeneric: (key: string, rowKey: string, field?: string) => {
//       if (!field) return;
//       const setter = getCurrentSetter();
//       setter((prev) =>
//         prev.map((item) =>
//           item.key === rowKey ? { ...item, [field]: key } : item
//         )
//       );
//     },
//     onTextChange: (rowKey: string, field: keyof DataType, value: string) => {
//       const setter = getCurrentSetter();
//       setter((prev) =>
//         prev.map((item) =>
//           item.key === rowKey ? { ...item, [field]: value } : item
//         )
//       );
//     },
//     onAddRow: () => {
//       const setter = getCurrentSetter();
//       const newKey = String(Date.now());
//       const newRow: DataType = {
//         key: newKey,
//         no: "",
//         process: "",
//       };
//       setter((prev) => [...prev, newRow]);
//       setEditingKeys((prev) => [...prev, newKey]);
//     },
//     onEditRow: (key: string) => {
//       setEditingKeys((prev) => [...prev, key]);
//     },
//     onSaveRow: (key: string) => {
//       setEditingKeys((prev) => prev.filter((k) => k !== key));
//     },
//     onDeleteRow: (key: string) => {
//       const setter = getCurrentSetter();
//       setter((prev) => prev.filter((item) => item.key !== key));
//     },
//     onStageChange: (key: string, rowKey: string) => {
//       const setter = getCurrentSetter();
//       setter((prev) =>
//         prev.map((item) =>
//           item.key === rowKey ? { ...item, stage: key } : item
//         )
//       );
//     },
//   };

//   return (
//     <div className="flex flex-col h-screen bg-[#f8fafc]">
//       {/* Fixed Header Section */}
//       <div className="sticky top-0 z-50 bg-white shadow-sm">
//         <div className="p-6 pb-2">
//           <div className="flex items-center justify-between mb-4">
//             <h1 className="text-2xl font-bold text-black">
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
//               <div className="bg-black w-[2px] h-6 my-auto" />
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

//           {/* Main Tabs */}
//           <div className="bg-white/50 backdrop-blur-sm rounded-t-xl shadow-sm">
//             <Tabs
//               activeKey={activeTab}
//               onChange={setActiveTab}
//               className="text-lg"
//               items={tabConfigs.map((config) => ({
//                 key: config.key,
//                 label: config.label,
//               }))}
//             />
//           </div>

//           {/* Sub Tabs (Conditional) */}
//           {activeTab === "3" && (
//             <div className="bg-white/50 backdrop-blur-sm rounded-b-xl shadow-sm mb-4">
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
//           {activeTab === "9" && (
//             <div className="bg-white/50 backdrop-blur-sm rounded-b-xl shadow-sm mb-4">
//               <Tabs
//                 activeKey={activeSubTab}
//                 onChange={setActiveSubTab}
//                 className="text-sm"
//                 items={[
//                   { key: "sox", label: "SOX" },
//                   {
//                     key: "financial",
//                     label: "Financial Statement Assertions",
//                   },
//                 ]}
//               />
//             </div>
//           )}
//           {activeTab === "10" && (
//             <div className="bg-white/50 backdrop-blur-sm rounded-b-xl shadow-sm mb-4">
//               <Tabs
//                 activeKey={activeSubTab}
//                 onChange={setActiveSubTab}
//                 className="text-sm"
//                 items={[
//                   { key: "audit", label: "Internal Audit Test" },
//                   {
//                     key: "grc",
//                     label: "GRC Exception Logs",
//                   },
//                 ]}
//               />
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Scrollable Content */}
//       <div className="flex-1 overflow-auto">
//         <div className="p-6 pt-4">
//           {loading ? (
//             <div className="flex justify-center items-center h-full">
//               <Spin size="large" />
//             </div>
//           ) : (
//             <>
//               <div className="mb-4">
//                 <Button type="primary" onClick={handleExport}>
//                   Export Data
//                 </Button>
//               </div>

//               <div className="relative">
//                 {/* Top scrollbar - synchronized with table */}
//                 <div
//                   ref={topScrollbarRef}
//                   className="sticky top-0 z-20 overflow-x-auto bg-white pb-2 mb-2"
//                   style={{
//                     scrollbarWidth: "thin",
//                     // scrollbarColor: "#374151 #1f2937",
//                     scrollbarColor: "#4b5563 #aeb4bf",
//                   }}
//                   onScroll={(e) => {
//                     const target = e.target as HTMLDivElement;
//                     const tableBody = tableWrapperRef.current?.querySelector(
//                       ".ant-table-body"
//                     ) as HTMLElement;
//                     if (tableBody) {
//                       tableBody.scrollLeft = target.scrollLeft;
//                     }
//                   }}
//                 >
//                   <div style={{ minWidth: "1300px", height: "1px" }}></div>
//                 </div>

//                 {/* Table */}
//                 <div
//                   ref={tableWrapperRef}
//                   className="bg-white shadow-md rounded-b-lg overflow-hidden"
//                   style={{
//                     maxHeight: "calc(100vh - 380px)",
//                   }}
//                 >
//                   <style>{`
//                     .ant-table-body {
//                       scrollbar-width: none; /* Firefox */
//                       -ms-overflow-style: none; /* IE and Edge */
//                     }
//                     .ant-table-body::-webkit-scrollbar {
//                       display: none; /* Chrome, Safari, Opera */
//                     }
//                   `}</style>
//                   <Table
//                     columns={getColumns(
//                       activeTab,
//                       activeSubTab,
//                       //@ts-ignore
//                       handlers,
//                       editingKeys
//                     )}
//                     dataSource={tableData}
//                     pagination={false}
//                     scroll={{ x: 1300, y: "calc(100vh - 380px)" }}
//                     bordered
//                     rowKey="key"
//                     onHeaderRow={() => ({
//                       onScroll: (e: React.UIEvent<HTMLDivElement>) => {
//                         const target = e.target as HTMLDivElement;
//                         if (topScrollbarRef.current) {
//                           topScrollbarRef.current.scrollLeft =
//                             target.scrollLeft;
//                         }
//                       },
//                     })}
//                   />
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// });

// AccountReceivable.displayName = "AccountReceivable";
// export default AccountReceivable;

// src\components\sections\AccountReceivable\index.tsx

"use client";
import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useCallback,
} from "react";
import { Table, Tabs, Spin, Button, Popconfirm } from "antd";
import {
  LeftOutlined,
  RightOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
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

export interface AccountReceivableRef {
  triggerImport: (file: File) => void;
}

const AccountReceivable = forwardRef<AccountReceivableRef>((_, ref) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const tableWrapperRef = useRef<HTMLDivElement>(null);
  const topScrollbarRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("1");
  const [activeSubTab, setActiveSubTab] = useState("coso");

  // Reset sub-tab when switching main tabs
  useEffect(() => {
    if (activeTab === "3") {
      setActiveSubTab("coso");
    } else if (activeTab === "9") {
      setActiveSubTab("sox");
    } else if (activeTab === "10") {
      setActiveSubTab("audit");
    }
  }, [activeTab]);
  const [tableData, setTableData] = useState<DataType[]>([]);
  const [editingKeys, setEditingKeys] = useState<string[]>([]);
  const tabKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  const [mainData, setMainData] = useState<DataType[]>(() =>
    readFromLocalStorage<DataType[]>("mainData", importedData)
  );
  const [controlData, setControlData] = useState<DataType[]>(() =>
    readFromLocalStorage<DataType[]>("controlData", controlAssessmentData)
  );
  const [financialData, setFinancialData] = useState<DataType[]>(() =>
    readFromLocalStorage<DataType[]>("financialData", financialAssertionsData)
  );
  const [auditData, setAuditData] = useState<DataType[]>(() =>
    readFromLocalStorage<DataType[]>("auditData", internalAuditData)
  );

  // Navigation state
  const currentTabIndex = tabKeys.indexOf(activeTab);
  const hasPrev = currentTabIndex > 0;
  const hasNext = currentTabIndex < tabKeys.length - 1;

  const goPrev = useCallback(() => {
    if (hasPrev) {
      setActiveTab(tabKeys[currentTabIndex - 1]);
    }
  }, [currentTabIndex, hasPrev]);

  const goNext = useCallback(() => {
    if (hasNext) {
      setActiveTab(tabKeys[currentTabIndex + 1]);
    }
  }, [currentTabIndex, hasNext]);

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

  // Sync scrollbars when table loads
  useEffect(() => {
    const syncScrollbars = () => {
      const tableBody = tableWrapperRef.current?.querySelector(
        ".ant-table-body"
      ) as HTMLElement;
      if (tableBody && topScrollbarRef.current) {
        // Sync top scrollbar with table body
        const handleTableScroll = () => {
          if (topScrollbarRef.current) {
            topScrollbarRef.current.scrollLeft = tableBody.scrollLeft;
          }
        };

        tableBody.addEventListener("scroll", handleTableScroll);

        // Set scrollbar width to match table scroll width
        const updateScrollbarWidth = () => {
          if (topScrollbarRef.current) {
            const scrollbarContent =
              topScrollbarRef.current.querySelector("div");
            if (scrollbarContent && tableBody.scrollWidth > 0) {
              scrollbarContent.style.minWidth = `${tableBody.scrollWidth}px`;
            }
          }
        };

        // Update width initially and after a short delay to ensure table is rendered
        updateScrollbarWidth();
        const widthTimer = setTimeout(updateScrollbarWidth, 300);

        return () => {
          tableBody.removeEventListener("scroll", handleTableScroll);
          clearTimeout(widthTimer);
        };
      }
    };

    const timer = setTimeout(syncScrollbars, 200);
    return () => clearTimeout(timer);
  }, [tableData, activeTab, activeSubTab]);

  const getCurrentSetter = () => {
    if (activeTab === "7") return setControlData;
    else if (activeTab === "9") return setFinancialData;
    else if (activeTab === "10") return setAuditData;
    else return setMainData;
  };

  const tabConfigs: { key: string; label: string; dataSource: string; subTabs?: string[] }[] = [
    { key: "1", label: "Processes", dataSource: "main" },
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
      label: "Compliance Management",
      dataSource: "financial",
      subTabs: ["sox", "financial"],
    },
    {
      key: "10",
      label: "Internal Audit Management",
      dataSource: "audit",
      subTabs: ["audit", "grc"],
    },
  ];

  const getSubLabel = (subTab: string) => {
    switch (subTab) {
      case "coso": return "COSO";
      case "intosai": return "INTOSAI";
      case "other": return "Other";
      case "sox": return "SOX";
      case "financial": return "Financial Statement Assertions";
      case "audit": return "Internal Audit Test";
      case "grc": return "GRC Exception Logs";
      default: return subTab;
    }
  };

  const getDataForSource = (dataSource: string): DataType[] => {
    if (dataSource === "main") return mainData;
    if (dataSource === "control") return controlData;
    if (dataSource === "financial") return financialData;
    if (dataSource === "audit") return auditData;
    return [];
  };

  const getSetterForSource = (dataSource: string) => {
    if (dataSource === "main") return setMainData;
    if (dataSource === "control") return setControlData;
    if (dataSource === "financial") return setFinancialData;
    if (dataSource === "audit") return setAuditData;
    return () => {};
  };

  const handleExport = () => {
    const wb = XLSX.utils.book_new();

    tabConfigs.forEach((config) => {
      if (config.subTabs) {
        config.subTabs.forEach((subTab) => {
          const subLabel = getSubLabel(subTab);
          const sheetName = `${config.label} - ${subLabel}`.slice(0, 31);
          const columns = getColumns(config.key, subTab, handlers, []);
          const fields = columns
            .map((col) => col.dataIndex as string)
            .filter((f) => f && f !== "actions");

          const dataSource = getDataForSource(config.dataSource);
          const exportData = dataSource.map((row) => {
            const expRow: Record<string, any> = {
              key: row.key,
              no: row.no,
              process: row.process,
            };
            fields.forEach((field) => {
              if (row.hasOwnProperty(field)) {
                expRow[field] = row[field];
              }
            });
            return expRow;
          });

          const ws = XLSX.utils.json_to_sheet(exportData);
          XLSX.utils.book_append_sheet(wb, ws, sheetName);
        });
      } else {
        const sheetName = config.label.slice(0, 31);
        const columns = getColumns(config.key, "", handlers, []);
        const fields = columns
          .map((col) => col.dataIndex as string)
          .filter((f) => f && f !== "actions");

        const dataSource = getDataForSource(config.dataSource);
        const exportData = dataSource.map((row) => {
          const expRow: Record<string, any> = {
            key: row.key,
            no: row.no,
            process: row.process,
          };
          fields.forEach((field) => {
            if (row.hasOwnProperty(field)) {
              expRow[field] = row[field];
            }
          });
          return expRow;
        });

        const ws = XLSX.utils.json_to_sheet(exportData);
        XLSX.utils.book_append_sheet(wb, ws, sheetName);
      }
    });

    XLSX.writeFile(wb, "AccountReceivable_Export.xlsx");
  };

  useImperativeHandle(ref, () => ({
    triggerImport: (file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        const wb = XLSX.read(data, { type: "binary" });
        const sheetNames = wb.SheetNames;

        sheetNames.forEach((sheetName) => {
          const [tabLabel, subLabel] = sheetName.split(" - ");
          const config = tabConfigs.find((c) => c.label === tabLabel);
          if (!config) return;

          const ws = wb.Sheets[sheetName];
          const importedData: DataType[] = XLSX.utils.sheet_to_json(ws, { defval: "" });

          const setter = getSetterForSource(config.dataSource);
          setter((prev: DataType[]) => {
            const updated = [...prev];
            importedData.forEach((impRow) => {
              const index = updated.findIndex((r) => r.key === impRow.key);
              if (index !== -1) {
                Object.keys(impRow).forEach((field) => {
                  if (field !== "key") {
                    updated[index][field] = impRow[field];
                  }
                });
              } else {
                updated.push(impRow);
              }
            });
            return updated;
          });
        });
      };
      reader.readAsBinaryString(file);
    },
  }));

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && hasPrev) {
        goPrev();
      } else if (e.key === "ArrowRight" && hasNext) {
        goNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goPrev, goNext, hasPrev, hasNext]);

  // Define table handlers
  const handlers = {
    onEdit: (key: string) => {
      setEditingKeys((prev) => [...prev, key]);
    },
    onDelete: (key: string) => {
      const setter = getCurrentSetter();
      setter((prev) => prev.filter((item) => item.key !== key));
    },
    onSave: (key: string) => {
      setEditingKeys((prev) => prev.filter((k) => k !== key));
    },
    onCancel: (key: string) => {
      setEditingKeys((prev) => prev.filter((k) => k !== key));
    },
    onCheckboxChange: (
      rowKey: string,
      field: keyof DataType,
      checked: boolean
    ) => {
      const setter = getCurrentSetter();
      setter((prev) =>
        prev.map((item) =>
          item.key === rowKey ? { ...item, [field]: checked } : item
        )
      );
    },
    onSelectGeneric: (key: string, rowKey: string, field?: string) => {
      if (!field) return;
      const setter = getCurrentSetter();
      setter((prev) =>
        prev.map((item) =>
          item.key === rowKey ? { ...item, [field]: key } : item
        )
      );
    },
    onTextChange: (rowKey: string, field: keyof DataType, value: string) => {
      const setter = getCurrentSetter();
      setter((prev) =>
        prev.map((item) =>
          item.key === rowKey ? { ...item, [field]: value } : item
        )
      );
    },
    onAddRow: () => {
      const setter = getCurrentSetter();
      const newKey = String(Date.now());
      const newRow: DataType = {
        key: newKey,
        no: "",
        process: "",
      };
      setter((prev) => [...prev, newRow]);
      setEditingKeys((prev) => [...prev, newKey]);
    },
    onEditRow: (key: string) => {
      setEditingKeys((prev) => [...prev, key]);
    },
    onSaveRow: (key: string) => {
      setEditingKeys((prev) => prev.filter((k) => k !== key));
    },
    onDeleteRow: (key: string) => {
      const setter = getCurrentSetter();
      setter((prev) => prev.filter((item) => item.key !== key));
    },
    onStageChange: (key: string, rowKey: string) => {
      const setter = getCurrentSetter();
      setter((prev) =>
        prev.map((item) =>
          item.key === rowKey ? { ...item, stage: key } : item
        )
      );
    },
  };

  return (
    <div className="flex flex-col h-screen bg-[#f8fafc]">
      {/* Fixed Header Section */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="p-6 pb-2">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-black">
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
              <div className="bg-black w-[2px] h-6 my-auto" />
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

          {/* Main Tabs */}
          <div className="bg-white/50 backdrop-blur-sm rounded-t-xl shadow-sm">
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

          {/* Sub Tabs (Conditional) */}
          {activeTab === "3" && (
            <div className="bg-white/50 backdrop-blur-sm rounded-b-xl shadow-sm mb-4">
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
          {activeTab === "9" && (
            <div className="bg-white/50 backdrop-blur-sm rounded-b-xl shadow-sm mb-4">
              <Tabs
                activeKey={activeSubTab}
                onChange={setActiveSubTab}
                className="text-sm"
                items={[
                  { key: "sox", label: "SOX" },
                  {
                    key: "financial",
                    label: "Financial Statement Assertions",
                  },
                ]}
              />
            </div>
          )}
          {activeTab === "10" && (
            <div className="bg-white/50 backdrop-blur-sm rounded-b-xl shadow-sm mb-4">
              <Tabs
                activeKey={activeSubTab}
                onChange={setActiveSubTab}
                className="text-sm"
                items={[
                  { key: "audit", label: "Internal Audit Test" },
                  {
                    key: "grc",
                    label: "GRC Exception Logs",
                  },
                ]}
              />
            </div>
          )}
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 pt-4">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <Spin size="large" />
            </div>
          ) : (
            <>
              <div className="mb-4">
                <Button type="primary" onClick={handleExport}>
                  Export Data
                </Button>
              </div>

              <div className="relative">
                {/* Top scrollbar - synchronized with table */}
                <div
                  ref={topScrollbarRef}
                  className="sticky top-0 z-20 overflow-x-auto bg-white pb-2 mb-2"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "#4b5563 #aeb4bf",
                  }}
                  onScroll={(e) => {
                    const target = e.target as HTMLDivElement;
                    const tableBody = tableWrapperRef.current?.querySelector(
                      ".ant-table-body"
                    ) as HTMLElement;
                    if (tableBody) {
                      tableBody.scrollLeft = target.scrollLeft;
                    }
                  }}
                >
                  <div style={{ minWidth: "1300px", height: "1px" }}></div>
                </div>

                {/* Table */}
                <div
                  ref={tableWrapperRef}
                  className="bg-white shadow-md rounded-b-lg overflow-hidden"
                  style={{
                    maxHeight: "calc(100vh - 380px)",
                  }}
                >
                  <style>{`
                    .ant-table-body {
                      scrollbar-width: none; /* Firefox */
                      -ms-overflow-style: none; /* IE and Edge */
                    }
                    .ant-table-body::-webkit-scrollbar {
                      display: none; /* Chrome, Safari, Opera */
                    }
                  `}</style>
                  <Table
                    columns={getColumns(
                      activeTab,
                      activeSubTab,
                      //@ts-ignore
                      handlers,
                      editingKeys
                    )}
                    dataSource={tableData}
                    pagination={false}
                    scroll={{ x: 1300, y: "calc(100vh - 380px)" }}
                    bordered
                    rowKey="key"
                    onHeaderRow={() => ({
                      onScroll: (e: React.UIEvent<HTMLDivElement>) => {
                        const target = e.target as HTMLDivElement;
                        if (topScrollbarRef.current) {
                          topScrollbarRef.current.scrollLeft =
                            target.scrollLeft;
                        }
                      },
                    })}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
});

AccountReceivable.displayName = "AccountReceivable";
export default AccountReceivable;
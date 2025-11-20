// "use client";
// import React, {
//   useEffect,
//   useState,
//   forwardRef,
//   useImperativeHandle,
//   useRef,
//   useCallback,
// } from "react";
// import { Table, Tabs, Spin, Button, Popconfirm, Input } from "antd";
// import {
//   LeftOutlined,
//   RightOutlined,
//   EditOutlined,
//   DeleteOutlined,
// } from "@ant-design/icons";
// import { getColumns } from "./columns";

// import { DataType } from "./types";
// import * as XLSX from "xlsx";
// import type { ColumnType, ColumnGroupType } from "antd/es/table";
// import { useDebouncedCallback } from "use-debounce";
// import ExcelApiPanel from "./ExcelApiPanel";

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

// // Helper: flatten columns to leaf ColumnType<DataType>[]
// const flattenColumns = (
//   cols: Array<ColumnType<DataType> | ColumnGroupType<DataType>>
// ): ColumnType<DataType>[] => {
//   const result: ColumnType<DataType>[] = [];
//   cols.forEach((col) => {
//     const maybeGroup = col as ColumnGroupType<DataType>;
//     if (
//       (maybeGroup as ColumnGroupType<DataType>).children &&
//       (maybeGroup as ColumnGroupType<DataType>).children!.length > 0
//     ) {
//       const children = (maybeGroup as ColumnGroupType<DataType>)
//         .children as Array<ColumnType<DataType> | ColumnGroupType<DataType>>;
//       result.push(...flattenColumns(children));
//     } else {
//       result.push(col as ColumnType<DataType>);
//     }
//   });
//   return result;
// };

// const AccountReceivable = forwardRef<AccountReceivableRef, {}>((props, ref) => {
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const tableWrapperRef = useRef<HTMLDivElement>(null);
//   const topScrollbarRef = useRef<HTMLDivElement>(null);

//   const [activeTab, setActiveTab] = useState("1");
//   const [activeSubTab, setActiveSubTab] = useState("coso");
//   const [tableData, setTableData] = useState<DataType[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [editingKeys, setEditingKeys] = useState<string[]>([]);

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

//   const tabKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

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
//   // === ADD THIS HOOK (once) ===
//   const debouncedResize = useDebouncedCallback(() => {
//     window.dispatchEvent(new Event("resize"));
//   }, 50);

//   // === REPLACE ALL YOUR SCROLL-FIXING useEffects WITH THIS ONE ===
//   useEffect(() => {
//     // Simple, clean, and enough for 99% of AntD dynamic height issues
//     debouncedResize();
//   }, [tableData, activeTab, activeSubTab, debouncedResize]);
//   useEffect(() => {
//     // Load data from localStorage on initial load if available
//     const savedData = localStorage.getItem("apiData");
//     if (savedData) {
//       try {
//         setTableData(JSON.parse(savedData));
//       } catch (e) {
//         console.error("Failed to parse saved data", e);
//       }
//     }
//   }, []);

//   // // Load table data based on active tab
//   // useEffect(() => {
//   //   const timer = setTimeout(() => {
//   //     let dataToSet: DataType[];
//   //     if (activeTab === "7") dataToSet = controlData;
//   //     else if (activeTab === "9") dataToSet = financialData;
//   //     else if (activeTab === "10") dataToSet = auditData;
//   //     else dataToSet = mainData;
//   //     setTableData(dataToSet);
//   //     setLoading(false);
//   //   }, 100);
//   //   return () => clearTimeout(timer);
//   // }, [activeTab, mainData, controlData, financialData, auditData]);

//   // ADD THIS useEffect — keeps top scrollbar in sync when tab changes
//   useEffect(() => {
//     const updateTopScrollbar = () => {
//       if (topScrollbarRef.current && tableWrapperRef.current) {
//         const tableContent =
//           tableWrapperRef.current.querySelector(".ant-table-content");
//         if (tableContent) {
//           const dummy = topScrollbarRef.current.querySelector("div");
//           if (dummy) {
//             dummy.style.width = `${tableContent.scrollWidth}px`;
//           }
//         }
//       }
//     };

//     updateTopScrollbar();
//     window.addEventListener("resize", updateTopScrollbar);
//     return () => window.removeEventListener("resize", updateTopScrollbar);
//   }, [activeTab, activeSubTab, tableData]);

//   const tabConfigs: {
//     key: string;
//     label: string;
//     dataSource: string;
//     subTabs?: string[];
//   }[] = [
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
//       subTabs: ["sox", "financial", "icfr"],
//     },
//     {
//       key: "10",
//       label: "Internal Audit Management",
//       dataSource: "audit",
//       subTabs: ["audit", "grc"],
//     },
//   ];

//   const getSubLabel = (subTab: string) => {
//     switch (subTab) {
//       case "coso":
//         return "COSO";
//       case "intosai":
//         return "INTOSAI";
//       case "other":
//         return "Other";
//       case "sox":
//         return "SOX";
//       case "financial":
//         return "Financial Statement Assertions";
//       case "icfr":
//         return "Internal Control Over Financial Reporting";
//       case "audit":
//         return "Internal Audit Test";
//       case "grc":
//         return "GRC Exception Logs";
//       default:
//         return subTab;
//     }
//   };
//   useEffect(() => {
//     console.log("Current table data:", tableData);
//   }, [tableData]);
//   // Update getDataForSource to only return tableData
//   const getDataForSource = (dataSource: string): DataType[] => {
//     // You can still use dataSource for different API endpoints if needed
//     return tableData;
//   };

//   const handleExport = () => {
//     const wb = XLSX.utils.book_new();
//     tabConfigs.forEach((config) => {
//       if (config.subTabs) {
//         config.subTabs.forEach((subTab) => {
//           const subLabel = getSubLabel(subTab);
//           const sheetName = `${config.label} - ${subLabel}`.slice(0, 31);
//           const columnsRaw = getColumns(config.key, subTab, handlers, []);
//           const flat = flattenColumns(
//             columnsRaw as Array<
//               ColumnType<DataType> | ColumnGroupType<DataType>
//             >
//           );
//           const fields = flat
//             .map((col) => col.dataIndex as string)
//             .filter((f) => f && f !== "actions");

//           const dataSource = getDataForSource(config.dataSource);
//           const exportData = dataSource.map((row) => {
//             const expRow: Record<string, any> = {
//               key: row.key,
//               no: row.no,
//               process: row.process,
//             };
//             fields.forEach((field) => {
//               if (Object.prototype.hasOwnProperty.call(row, field)) {
//                 let value = (row as any)[field];
//                 if (field === "internalControlFinancial") {
//                   value = value === true || value === "Yes" ? "Yes" : "No";
//                 }
//                 expRow[field] = value;
//               }
//             });
//             return expRow;
//           });
//           const ws = XLSX.utils.json_to_sheet(exportData);
//           XLSX.utils.book_append_sheet(wb, ws, sheetName);
//         });
//       } else {
//         const sheetName = config.label.slice(0, 31);
//         const columnsRaw = getColumns(config.key, "", handlers, []);
//         const flat = flattenColumns(
//           columnsRaw as Array<ColumnType<DataType> | ColumnGroupType<DataType>>
//         );
//         const fields = flat
//           .map((col) => col.dataIndex as string)
//           .filter((f) => f && f !== "actions");

//         const dataSource = getDataForSource(config.dataSource);
//         const exportData = dataSource.map((row) => {
//           const expRow: Record<string, any> = {
//             key: row.key,
//             no: row.no,
//             process: row.process,
//           };
//           fields.forEach((field) => {
//             if (Object.prototype.hasOwnProperty.call(row, field)) {
//               let value = (row as any)[field];
//               if (field === "internalControlFinancial") {
//                 value = value === true || value === "Yes" ? "Yes" : "No";
//               }
//               expRow[field] = value;
//             }
//           });
//           return expRow;
//         });
//         const ws = XLSX.utils.json_to_sheet(exportData);
//         XLSX.utils.book_append_sheet(wb, ws, sheetName);
//       }
//     });
//     XLSX.writeFile(wb, "AccountReceivable_Export.xlsx");
//   };

//   useImperativeHandle(ref, () => ({
//     triggerImport: (file: File) => {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const data = e.target?.result;
//         const wb = XLSX.read(data, { type: "binary" });
//         const sheetNames = wb.SheetNames;
//         sheetNames.forEach((sheetName) => {
//           const [tabLabel, subLabel] = sheetName.split(" - ");
//           const config = tabConfigs.find((c) => c.label === tabLabel);
//           if (!config) return;
//           const ws = wb.Sheets[sheetName];
//           const importedData: DataType[] = XLSX.utils.sheet_to_json(ws, {
//             defval: "",
//           });
//           const setter = getSetterForSource(config.dataSource);
//           setter((prev: DataType[]) => {
//             const updated = [...prev];
//             importedData.forEach((impRow) => {
//               const index = updated.findIndex((r) => r.key === impRow.key);
//               if (index !== -1) {
//                 Object.keys(impRow).forEach((field) => {
//                   if (field !== "key") {
//                     (updated[index] as any)[field] = (impRow as any)[field];
//                   }
//                 });
//               } else {
//                 updated.push(impRow as DataType);
//               }
//             });
//             return updated;
//           });
//         });
//       };
//       reader.readAsBinaryString(file);
//     },
//   }));

//   // Keyboard navigation
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "ArrowLeft" && hasPrev) goPrev();
//       else if (e.key === "ArrowRight" && hasNext) goNext();
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [goPrev, goNext, hasPrev, hasNext]);

//   // Handlers for table actions
//   const handlers = {
//     onEdit: (key: string) => setEditingKeys((prev) => [...prev, key]),
//     onDelete: (key: string) => {
//       const setter = getCurrentSetter();
//       setter((prev) => prev.filter((item) => item.key !== key));
//     },
//     onSave: (key: string) =>
//       setEditingKeys((prev) => prev.filter((k) => k !== key)),
//     onCancel: (key: string) =>
//       setEditingKeys((prev) => prev.filter((k) => k !== key)),
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

//       // Get current data to calculate next number
//       const currentData = getDataForSource(
//         tabConfigs[activeTab as any]?.dataSource || "mainData"
//       );

//       // Find the highest number in the 5.x series
//       let maxNumber = 0;
//       currentData.forEach((row) => {
//         if (row.no && typeof row.no === "string") {
//           const match = row.no.match(/^5\.(\d+)$/);
//           if (match) {
//             const num = parseInt(match[1], 10);
//             if (num > maxNumber) {
//               maxNumber = num;
//             }
//           }
//         }
//       });

//       // If no 5.x numbers found, start from 5.1, otherwise increment the highest found
//       const nextNumber = maxNumber > 0 ? maxNumber + 1 : 1;
//       const newNo = `5.${nextNumber.toString().padStart(2, "0")}`;

//       // Create and add the new row
//       const newRow: DataType = {
//         key: newKey,
//         no: newNo, // This will be "5.16" if the last was "5.15"
//         process: "",
//         isActive: true,
//       };

//       setter((prev) => [...prev, newRow]);
//       setEditingKeys((prev) => [...prev, newKey]);

//       // Scroll to the new row after a short delay to ensure it's rendered
//       setTimeout(() => {
//         const tableBody = tableWrapperRef.current?.querySelector(
//           ".ant-table-body"
//         ) as HTMLElement;
//         if (tableBody) {
//           tableBody.scrollTop = tableBody.scrollHeight;
//         }
//       }, 100);
//     },

//     onEditRow: (key: string) => setEditingKeys((prev) => [...prev, key]),
//     onSaveRow: (key: string) =>
//       setEditingKeys((prev) => prev.filter((k) => k !== key)),
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
//     onToggleStatus: (rowKey: string) => {
//       const setter = getCurrentSetter();
//       setter((prev) =>
//         prev.map((item) =>
//           item.key === rowKey
//             ? {
//                 ...item,
//                 isActive: !(item.isActive !== false), // flips correctly even if undefined
//               }
//             : item
//         )
//       );

//       // Auto-exit edit mode when deactivating
//       setEditingKeys((prev) => prev.filter((k) => k !== rowKey));
//     },
//   };

//   return (
//     <div className="flex flex-col h-screen bg-[#f8fafc]">
//       {/* Fixed Header */}
//       <div className="sticky top-0 z-50 bg-white shadow-sm">
//         <div className="p-6 pb-2">
//           {/* Heading + Export Button + Navigation */}
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center gap-4">
//               {/* Reduced heading size */}
//               <h1 className="text-xl font-bold text-black">
//                 RCM – Account Receivable
//               </h1>

//               {/* Export button next to heading */}
//               <Button type="primary" onClick={handleExport}>
//                 Export Data
//               </Button>
//             </div>

//             {/* Navigation arrows */}
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

//           {/* Sub Tabs */}
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
//                   { key: "financial", label: "Financial Statement Assertions" },
//                   {
//                     key: "icfr",
//                     label: "Internal Control Over Financial Reporting",
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
//                   { key: "grc", label: "GRC Exception Logs" },
//                 ]}
//               />
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Scrollable Content */}
//       <div className="flex-1 overflow-auto">
//         <div className="p-6 pt-4">
//           <div className="mb-4">
//             {/* <ExcelApiPanel /> */}
//             {/* <ExcelApiPanel onDataLoaded={(data) => setTableData(data)} /> */}
//             <ExcelApiPanel
//               onDataLoaded={(data) => {
//                 setTableData(data);
//                 // Optionally save to localStorage if you want to persist between page reloads
//                 localStorage.setItem("apiData", JSON.stringify(data));
//               }}
//             />
//           </div>
//           {loading ? (
//             <div className="flex justify-center items-center h-full">
//               <Spin size="large" />
//             </div>
//           ) : (
//             <div className="relative">
//               {/* Top Horizontal Scrollbar (fake scrollbar) */}
//               {/* TOP SCROLLBAR — FINAL PERFECT VERSION */}
//               <div
//                 ref={topScrollbarRef}
//                 className="sticky top-0 z-20 overflow-x-auto bg-white border-b border-gray-200 -mx-6 px-6 mb-3"
//                 style={{
//                   scrollbarWidth: "thin",
//                   scrollbarColor: "#787878 #121212",
//                 }}
//                 onScroll={(e) => {
//                   const target = e.target as HTMLDivElement;
//                   const tableBody = tableWrapperRef.current?.querySelector(
//                     ".ant-table-body"
//                   ) as HTMLElement;
//                   if (tableBody) tableBody.scrollLeft = target.scrollLeft;
//                 }}
//               >
//                 <div
//                   style={{
//                     width: tableWrapperRef.current?.querySelector(
//                       ".ant-table-content"
//                     )?.scrollWidth
//                       ? `${
//                           tableWrapperRef.current.querySelector(
//                             ".ant-table-content"
//                           )!.scrollWidth
//                         }px`
//                       : "3000px",
//                     height: "1px",
//                     background: "transparent",
//                   }}
//                 />
//               </div>
//               {/* Main Table */}
//               <div
//                 ref={tableWrapperRef}
//                 className="bg-white shadow-md rounded-b-lg overflow-hidden"
//                 style={{
//                   maxHeight: "calc(100vh - 280px)",
//                   minHeight: "500px",
//                 }}
//               >
//                 <style jsx>{`
//                   .ant-table-body {
//                     scrollbar-width: none;
//                     -ms-overflow-style: none;
//                   }
//                   .ant-table-body::-webkit-scrollbar {
//                     display: none;
//                   }
//                   .row-deactivated {
//                     background-color: #e5e7eb !important;
//                     color: #6b7280 !important;
//                     opacity: 0.7;
//                   }
//                 `}</style>

//                 <Table
//                   columns={getColumns(
//                     activeTab,
//                     activeSubTab,
//                     handlers as any,
//                     editingKeys
//                   )}
//                   dataSource={tableData}
//                   loading={loading}
//                   pagination={false}
//                   scroll={{ x: 1300, y: "calc(100vh - 340px)" }}
//                   bordered
//                   rowKey={(record) =>
//                     `${record.key}-${record.isActive?.toString()}`
//                   } // ← Fixes grey row instantly
//                   rowClassName={(record) =>
//                     record.isActive === false ? "row-deactivated" : ""
//                   }
//                   // Sync header scroll → top scrollbar
//                   onHeaderRow={() => ({
//                     onScroll: (e: React.UIEvent<HTMLDivElement>) => {
//                       const target = e.target as HTMLDivElement;
//                       if (topScrollbarRef.current) {
//                         topScrollbarRef.current.scrollLeft = target.scrollLeft;
//                       }
//                     },
//                   })}
//                   // Optional: slight performance boost + ensures row repaint
//                   components={{
//                     body: {
//                       row: ({ ...props }) => <tr {...props} />,
//                     },
//                   }}
//                 />
//               </div>
//               scrollbarColor
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// });

// AccountReceivable.displayName = "AccountReceivable";
// export default AccountReceivable;
"use client";
import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useCallback,
} from "react";
import { Table, Tabs, Spin, Button, Popconfirm, Input } from "antd";
import {
  LeftOutlined,
  RightOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { getColumns } from "./columns";
import { DataType } from "./types";
import * as XLSX from "xlsx";
import type { ColumnType } from "antd/es/table";
import { useDebouncedCallback } from "use-debounce";
import ExcelApiPanel from "./ExcelApiPanel";

const { TextArea } = Input;

export interface AccountReceivableRef {
  triggerImport: (file: File) => void;
}

const AccountReceivable = forwardRef<AccountReceivableRef, {}>((props, ref) => {
  const tableWrapperRef = useRef<HTMLDivElement>(null);
  const topScrollbarRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState("1");
  const [activeSubTab, setActiveSubTab] = useState("coso");
  const [tableData, setTableData] = useState<DataType[]>([]);
  const [editingKeys, setEditingKeys] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Reset sub-tab when switching main tabs
  useEffect(() => {
    if (activeTab === "3") setActiveSubTab("coso");
    else if (activeTab === "9") setActiveSubTab("sox");
    else if (activeTab === "10") setActiveSubTab("audit");
  }, [activeTab]);

  const tabKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const currentTabIndex = tabKeys.indexOf(activeTab);
  const hasPrev = currentTabIndex > 0;
  const hasNext = currentTabIndex < tabKeys.length - 1;

  const goPrev = useCallback(
    () => hasPrev && setActiveTab(tabKeys[currentTabIndex - 1]),
    [currentTabIndex, hasPrev]
  );
  const goNext = useCallback(
    () => hasNext && setActiveTab(tabKeys[currentTabIndex + 1]),
    [currentTabIndex, hasNext]
  );

  const debouncedResize = useDebouncedCallback(
    () => window.dispatchEvent(new Event("resize")),
    50
  );
  useEffect(
    //@ts-ignore
    () => debouncedResize(),
    [tableData, activeTab, activeSubTab, debouncedResize]
  );

  // Keep top scrollbar width in sync
  useEffect(() => {
    const updateWidth = () => {
      if (!topScrollbarRef.current || !tableWrapperRef.current) return;
      const table = tableWrapperRef.current.querySelector(
        ".ant-table"
      ) as HTMLElement;
      if (table) {
        const dummy = topScrollbarRef.current.querySelector("div");
        if (dummy) dummy.style.width = `${table.scrollWidth}px`;
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [activeTab, activeSubTab, tableData]);

  const tabConfigs = [
    { key: "1", label: "Processes" },
    { key: "2", label: "Ownership" },
    {
      key: "3",
      label: "Control Environment",
      subTabs: ["coso", "intosai", "other"],
    },
    { key: "4", label: "Risk Assessment (Inherent Risk)" },
    { key: "5", label: "Risk Responses" },
    { key: "6", label: "Control Activities" },
    { key: "7", label: "Control Assessment" },
    { key: "8", label: "Risk Assessment (Residual Risk)" },
    {
      key: "9",
      label: "Compliance Management",
      subTabs: ["sox", "financial", "icfr"],
    },
    {
      key: "10",
      label: "Internal Audit Management",
      subTabs: ["audit", "grc"],
    },
  ];

  const handleExport = () => {
    const wb = XLSX.utils.book_new();
    tabConfigs.forEach((config) => {
      const sheetName = config.label.slice(0, 31);
      const columnsRaw = getColumns(config.key, "", handlers, editingKeys);
      const fields = columnsRaw
        .filter(
          (c): c is ColumnType<DataType> =>
            "dataIndex" in c && c.dataIndex !== "actions"
        )
        .map((c) => c.dataIndex!);

      const exportData = tableData.map((row) => {
        const obj: any = {};
        fields.forEach((f) => (obj[f] = row[f as keyof DataType] ?? ""));
        return obj;
      });

      const ws = XLSX.utils.json_to_sheet(exportData);
      XLSX.utils.book_append_sheet(wb, ws, sheetName);
    });
    XLSX.writeFile(wb, "AccountReceivable_Export.xlsx");
  };

  // All mutations now happen on the single tableData
  const handlers = {
    onEdit: (key: string) => setEditingKeys((prev) => [...prev, key]),
    onDelete: (key: string) =>
      setTableData((prev) => prev.filter((r) => r.key !== key)),
    onSave: (key: string) =>
      setEditingKeys((prev) => prev.filter((k) => k !== key)),
    onCancel: (key: string) =>
      setEditingKeys((prev) => prev.filter((k) => k !== key)),
    onCheckboxChange: (
      rowKey: string,
      field: keyof DataType,
      checked: boolean
    ) =>
      setTableData((prev) =>
        prev.map((r) => (r.key === rowKey ? { ...r, [field]: checked } : r))
      ),
    onSelectGeneric: (value: string, rowKey: string, field?: string) => {
      if (!field) return;
      setTableData((prev) =>
        prev.map((r) => (r.key === rowKey ? { ...r, [field]: value } : r))
      );
    },
    onTextChange: (rowKey: string, field: keyof DataType, value: string) =>
      setTableData((prev) =>
        prev.map((r) => (r.key === rowKey ? { ...r, [field]: value } : r))
      ),
    onAddRow: () => {
      const newKey = String(Date.now());
      const maxNo = tableData.reduce((max, r) => {
        const num = parseFloat(r.no as string) || 0;
        return num > max ? num : max;
      }, 0);
      const newNo = (maxNo + 0.1).toFixed(1);

      const newRow: DataType = {
        key: newKey,
        no: newNo,
        process: "",
        isActive: true,
      };

      setTableData((prev) => [...prev, newRow]);
      setEditingKeys((prev) => [...prev, newKey]);
    },
    onEditRow: (key: string) => setEditingKeys((prev) => [...prev, key]),
    onDeleteRow: (key: string) =>
      setTableData((prev) => prev.filter((r) => r.key !== key)),
    onStageChange: (value: string, rowKey: string) =>
      setTableData((prev) =>
        prev.map((r) => (r.key === rowKey ? { ...r, stage: value } : r))
      ),
    onToggleStatus: (rowKey: string) => {
      setTableData((prev) =>
        prev.map((r) =>
          r.key === rowKey ? { ...r, isActive: !(r.isActive !== false) } : r
        )
      );
      setEditingKeys((prev) => prev.filter((k) => k !== rowKey));
    },
  };

  return (
    <div className="flex flex-col h-screen bg-[#f8fafc]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="p-6 pb-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-black">
                RCM – Account Receivable
              </h1>
              <Button type="primary" onClick={handleExport}>
                Export Data
              </Button>
            </div>
            <div className="flex space-x-3 bg-white border border-black shadow-sm">
              <button
                onClick={goPrev}
                disabled={!hasPrev}
                className={`p-2 rounded-md transition font-bold ${
                  hasPrev
                    ? "text-black hover:bg-gray-50 cursor-pointer"
                    : "text-gray-400 cursor-not-allowed"
                }`}
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
              >
                <RightOutlined />
              </button>
            </div>
          </div>

          <div className="bg-white/50 backdrop-blur-sm rounded-t-xl shadow-sm">
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              className="text-lg"
              items={tabConfigs.map((c) => ({ key: c.key, label: c.label }))}
            />
          </div>

          {/* Sub-tabs */}
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
                  { key: "financial", label: "Financial Statement Assertions" },
                  {
                    key: "icfr",
                    label: "Internal Control Over Financial Reporting",
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
                  { key: "grc", label: "GRC Exception Logs" },
                ]}
              />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 pt-4">
          <div className="mb-4">
            <ExcelApiPanel onDataLoaded={(data) => setTableData(data)} />
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-full">
              <Spin size="large" />
            </div>
          ) : (
            <div className="relative">
              {/* Top Scrollbar - Only when needed */}
              {(() => {
                if (!tableWrapperRef.current) return null;
                const table = tableWrapperRef.current.querySelector(
                  ".ant-table"
                ) as HTMLElement;
                if (!table || table.scrollWidth <= table.clientWidth + 10)
                  return null;

                return (
                  <div
                    ref={topScrollbarRef}
                    className="sticky top-0 z-20 overflow-x-auto bg-white border-b border-gray-200 -mx-6 px-6 mb-3"
                    style={{
                      scrollbarWidth: "thin",
                      scrollbarColor: "#787878 #121212",
                    }}
                    onScroll={(e) => {
                      const target = e.target as HTMLDivElement;
                      const body = tableWrapperRef.current?.querySelector(
                        ".ant-table-body"
                      ) as HTMLElement;
                      if (body) body.scrollLeft = target.scrollLeft;
                    }}
                  >
                    <div
                      style={{ width: `${table.scrollWidth}px`, height: "1px" }}
                    />
                  </div>
                );
              })()}

              <div
                ref={tableWrapperRef}
                className="bg-white shadow-md rounded-b-lg overflow-hidden"
                style={{ maxHeight: "calc(100vh - 280px)", minHeight: "500px" }}
              >
                <style jsx>{`
                  .ant-table-body {
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                  }
                  .ant-table-body::-webkit-scrollbar {
                    display: none;
                  }
                  .row-deactivated {
                    background-color: #e5e7eb !important;
                    color: #6b7280 !important;
                    opacity: 0.7;
                  }
                `}</style>

                <Table
                  columns={getColumns(
                    activeTab,
                    activeSubTab,
                    handlers,
                    editingKeys
                  )}
                  dataSource={tableData}
                  pagination={false}
                  scroll={{ x: 1300, y: "calc(100vh - 340px)" }}
                  bordered
                  rowKey={(r) => `${r.key}-${r.isActive?.toString()}`}
                  rowClassName={(r) =>
                    r.isActive === false ? "row-deactivated" : ""
                  }
                  onHeaderRow={() => ({
                    onScroll: (e: React.UIEvent<HTMLDivElement>) => {
                      const target = e.target as HTMLDivElement;
                      if (topScrollbarRef.current)
                        topScrollbarRef.current.scrollLeft = target.scrollLeft;
                    },
                  })}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

AccountReceivable.displayName = "AccountReceivable";
export default AccountReceivable;

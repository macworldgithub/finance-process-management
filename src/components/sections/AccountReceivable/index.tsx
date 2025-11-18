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
// import {
//   data as importedData,
//   controlAssessmentData,
//   financialAssertionsData,
//   internalAuditData,
// } from "./data";
// import { DataType } from "./types";
// import * as XLSX from "xlsx";
// import type { ColumnType, ColumnGroupType } from "antd/es/table";

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
//     // If it has children (group), recurse into children
//     const maybeGroup = col as ColumnGroupType<DataType>;
//     if (
//       (maybeGroup as ColumnGroupType<DataType>).children &&
//       (maybeGroup as ColumnGroupType<DataType>).children!.length > 0
//     ) {
//       // children can be ColumnType | ColumnGroupType
//       const children = (maybeGroup as ColumnGroupType<DataType>)
//         .children as Array<ColumnType<DataType> | ColumnGroupType<DataType>>;
//       result.push(...flattenColumns(children));
//     } else {
//       // it's a leaf column
//       result.push(col as ColumnType<DataType>);
//     }
//   });

//   return result;
// };

// const AccountReceivable = forwardRef<AccountReceivableRef, {}>((props, ref) => {
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const tableWrapperRef = useRef<HTMLDivElement>(null);
//   const topScrollbarRef = useRef<HTMLDivElement>(null);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("1");
//   const [activeSubTab, setActiveSubTab] = useState("coso");

//   // Reset sub-tab when switching main tabs
//   // Reset sub-tab when switching main tabs
//   useEffect(() => {
//     if (activeTab === "3") {
//       setActiveSubTab("coso");
//     } else if (activeTab === "9") {
//       setActiveSubTab("sox"); // default to SOX
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
//         return "Internal Control Over Financial Reporting"; // New
//       case "audit":
//         return "Internal Audit Test";
//       case "grc":
//         return "GRC Exception Logs";
//       default:
//         return subTab;
//     }
//   };

//   const getDataForSource = (dataSource: string): DataType[] => {
//     if (dataSource === "main") return mainData;
//     if (dataSource === "control") return controlData;
//     if (dataSource === "financial") return financialData;
//     if (dataSource === "audit") return auditData;
//     return [];
//   };

//   const getSetterForSource = (dataSource: string) => {
//     if (dataSource === "main") return setMainData;
//     if (dataSource === "control") return setControlData;
//     if (dataSource === "financial") return setFinancialData;
//     if (dataSource === "audit") return setAuditData;
//     return () => {};
//   };

//   // const handleExport = () => {
//   //   const wb = XLSX.utils.book_new();

//   //   tabConfigs.forEach((config) => {
//   //     if (config.subTabs) {
//   //       config.subTabs.forEach((subTab) => {
//   //         const subLabel = getSubLabel(subTab);
//   //         const sheetName = `${config.label} - ${subLabel}`.slice(0, 31);
//   //         // getColumns may return grouped columns; flatten to leaves
//   //         const columnsRaw = getColumns(config.key, subTab, handlers, []);
//   //         const flat = flattenColumns(
//   //           columnsRaw as Array<
//   //             ColumnType<DataType> | ColumnGroupType<DataType>
//   //           >
//   //         );
//   //         const fields = flat
//   //           .map((col) => col.dataIndex as string)
//   //           .filter((f) => f && f !== "actions");

//   //         const dataSource = getDataForSource(config.dataSource);
//   //         const exportData = dataSource.map((row) => {
//   //           const expRow: Record<string, any> = {
//   //             key: row.key,
//   //             no: row.no,
//   //             process: row.process,
//   //           };
//   //           fields.forEach((field) => {
//   //             if (Object.prototype.hasOwnProperty.call(row, field)) {
//   //               // @ts-ignore - row[field] dynamic access
//   //               expRow[field] = (row as any)[field];
//   //             }
//   //           });
//   //           return expRow;
//   //         });

//   //         const ws = XLSX.utils.json_to_sheet(exportData);
//   //         XLSX.utils.book_append_sheet(wb, ws, sheetName);
//   //       });
//   //     } else {
//   //       const sheetName = config.label.slice(0, 31);
//   //       const columnsRaw = getColumns(config.key, "", handlers, []);
//   //       const flat = flattenColumns(
//   //         columnsRaw as Array<ColumnType<DataType> | ColumnGroupType<DataType>>
//   //       );
//   //       const fields = flat
//   //         .map((col) => col.dataIndex as string)
//   //         .filter((f) => f && f !== "actions");

//   //       const dataSource = getDataForSource(config.dataSource);
//   //       const exportData = dataSource.map((row) => {
//   //         const expRow: Record<string, any> = {
//   //           key: row.key,
//   //           no: row.no,
//   //           process: row.process,
//   //         };
//   //         fields.forEach((field) => {
//   //           if (Object.prototype.hasOwnProperty.call(row, field)) {
//   //             // @ts-ignore
//   //             expRow[field] = (row as any)[field];
//   //           }
//   //         });
//   //         return expRow;
//   //       });

//   //       const ws = XLSX.utils.json_to_sheet(exportData);
//   //       XLSX.utils.book_append_sheet(wb, ws, sheetName);
//   //     }
//   //   });

//   //   XLSX.writeFile(wb, "AccountReceivable_Export.xlsx");
//   // };
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

//                 // Convert boolean to Yes/No only for this specific field
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

//               // Convert boolean to Yes/No only for this specific field
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
//                     // @ts-ignore dynamic assignment
//                     (updated[index] as any)[field] = (impRow as any)[field];
//                   }
//                 });
//               } else {
//                 // ensure proper typing for pushed row
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
import {
  data as importedData,
  controlAssessmentData,
  financialAssertionsData,
  internalAuditData,
} from "./data";
import { DataType } from "./types";
import * as XLSX from "xlsx";
import type { ColumnType, ColumnGroupType } from "antd/es/table";
import { useDebouncedCallback } from "use-debounce";

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

// Helper: flatten columns to leaf ColumnType<DataType>[]
const flattenColumns = (
  cols: Array<ColumnType<DataType> | ColumnGroupType<DataType>>
): ColumnType<DataType>[] => {
  const result: ColumnType<DataType>[] = [];
  cols.forEach((col) => {
    const maybeGroup = col as ColumnGroupType<DataType>;
    if (
      (maybeGroup as ColumnGroupType<DataType>).children &&
      (maybeGroup as ColumnGroupType<DataType>).children!.length > 0
    ) {
      const children = (maybeGroup as ColumnGroupType<DataType>)
        .children as Array<ColumnType<DataType> | ColumnGroupType<DataType>>;
      result.push(...flattenColumns(children));
    } else {
      result.push(col as ColumnType<DataType>);
    }
  });
  return result;
};

const AccountReceivable = forwardRef<AccountReceivableRef, {}>((props, ref) => {
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
  // === ADD THIS HOOK (once) ===
  const debouncedResize = useDebouncedCallback(() => {
    window.dispatchEvent(new Event("resize"));
  }, 50);

  // === REPLACE ALL YOUR SCROLL-FIXING useEffects WITH THIS ONE ===
  useEffect(() => {
    // Simple, clean, and enough for 99% of AntD dynamic height issues
    debouncedResize();
  }, [tableData, activeTab, activeSubTab, debouncedResize]);

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
    dataSource: string;
    subTabs?: string[];
  }[] = [
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
      subTabs: ["sox", "financial", "icfr"],
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
      case "coso":
        return "COSO";
      case "intosai":
        return "INTOSAI";
      case "other":
        return "Other";
      case "sox":
        return "SOX";
      case "financial":
        return "Financial Statement Assertions";
      case "icfr":
        return "Internal Control Over Financial Reporting";
      case "audit":
        return "Internal Audit Test";
      case "grc":
        return "GRC Exception Logs";
      default:
        return subTab;
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
          const columnsRaw = getColumns(config.key, subTab, handlers, []);
          const flat = flattenColumns(
            columnsRaw as Array<
              ColumnType<DataType> | ColumnGroupType<DataType>
            >
          );
          const fields = flat
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
              if (Object.prototype.hasOwnProperty.call(row, field)) {
                let value = (row as any)[field];
                if (field === "internalControlFinancial") {
                  value = value === true || value === "Yes" ? "Yes" : "No";
                }
                expRow[field] = value;
              }
            });
            return expRow;
          });
          const ws = XLSX.utils.json_to_sheet(exportData);
          XLSX.utils.book_append_sheet(wb, ws, sheetName);
        });
      } else {
        const sheetName = config.label.slice(0, 31);
        const columnsRaw = getColumns(config.key, "", handlers, []);
        const flat = flattenColumns(
          columnsRaw as Array<ColumnType<DataType> | ColumnGroupType<DataType>>
        );
        const fields = flat
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
            if (Object.prototype.hasOwnProperty.call(row, field)) {
              let value = (row as any)[field];
              if (field === "internalControlFinancial") {
                value = value === true || value === "Yes" ? "Yes" : "No";
              }
              expRow[field] = value;
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
          const importedData: DataType[] = XLSX.utils.sheet_to_json(ws, {
            defval: "",
          });
          const setter = getSetterForSource(config.dataSource);
          setter((prev: DataType[]) => {
            const updated = [...prev];
            importedData.forEach((impRow) => {
              const index = updated.findIndex((r) => r.key === impRow.key);
              if (index !== -1) {
                Object.keys(impRow).forEach((field) => {
                  if (field !== "key") {
                    (updated[index] as any)[field] = (impRow as any)[field];
                  }
                });
              } else {
                updated.push(impRow as DataType);
              }
            });
            return updated;
          });
        });
      };
      reader.readAsBinaryString(file);
    },
  }));

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && hasPrev) goPrev();
      else if (e.key === "ArrowRight" && hasNext) goNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goPrev, goNext, hasPrev, hasNext]);

  // Handlers for table actions
  const handlers = {
    onEdit: (key: string) => setEditingKeys((prev) => [...prev, key]),
    onDelete: (key: string) => {
      const setter = getCurrentSetter();
      setter((prev) => prev.filter((item) => item.key !== key));
    },
    onSave: (key: string) =>
      setEditingKeys((prev) => prev.filter((k) => k !== key)),
    onCancel: (key: string) =>
      setEditingKeys((prev) => prev.filter((k) => k !== key)),
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
    // onAddRow: () => {
    //   const setter = getCurrentSetter();
    //   const newKey = String(Date.now());
    //   const newRow: DataType = {
    //     key: newKey,
    //     no: "",
    //     process: "",
    //     isActive: true,
    //   };

    //   setter((prev) => [...prev, newRow]);
    //   setEditingKeys((prev) => [...prev, newKey]);

    //   // Force UI update and scroll to new row
    //   setTimeout(() => {
    //     const tableBody = tableWrapperRef.current?.querySelector(
    //       ".ant-table-body"
    //     ) as HTMLElement;
    //     if (tableBody) {
    //       tableBody.scrollTop = tableBody.scrollHeight;
    //     }
    //   }, 100);
    // },
    // 1. First, update the onAddRow function:
    onAddRow: () => {
      const setter = getCurrentSetter();
      const newKey = String(Date.now());

      // Get current data to calculate next number
      const currentData = getDataForSource(
        tabConfigs[activeTab as any]?.dataSource || "mainData"
      );

      // Calculate next number (e.g., if last number is 5.9, next is 5.10)
      let lastNumber = 0;
      if (currentData.length > 0) {
        const lastRow = currentData[currentData.length - 1];
        if (lastRow.no) {
          const parts = String(lastRow.no).split(".");
          if (parts.length === 2) {
            lastNumber = parseInt(parts[1], 10);
          }
        }
      }
      const nextNumber = lastNumber + 1;
      const baseNumber = activeTab; // or get the base number from somewhere appropriate
      const newNo = `${baseNumber}.${nextNumber}`;

      const newRow: DataType = {
        key: newKey,
        no: newNo, // Set the calculated number
        process: "",
        isActive: true,
      };

      setter((prev) => [...prev, newRow]);
      setEditingKeys((prev) => [...prev, newKey]);

      // Scroll to the new row after a short delay to ensure it's rendered
      setTimeout(() => {
        const tableBody = tableWrapperRef.current?.querySelector(
          ".ant-table-body"
        ) as HTMLElement;
        if (tableBody) {
          tableBody.scrollTop = tableBody.scrollHeight;
        }
      }, 100);
    },

    onEditRow: (key: string) => setEditingKeys((prev) => [...prev, key]),
    onSaveRow: (key: string) =>
      setEditingKeys((prev) => prev.filter((k) => k !== key)),
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
    onToggleStatus: (rowKey: string) => {
      const setter = getCurrentSetter();
      setter((prev) => {
        const updated = prev.map((item) => {
          if (item.key === rowKey) {
            const newActive = !(item.isActive === true);
            // if deactivating, remove edit mode for that row
            if (!newActive) {
              setEditingKeys((prevEd) => prevEd.filter((k) => k !== rowKey));
            }
            return { ...item, isActive: newActive };
          }
          return item;
        });
        return updated;
      });
    },
  };

  return (
    <div className="flex flex-col h-screen bg-[#f8fafc]">
      {/* Fixed Header */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="p-6 pb-2">
          {/* Heading + Export Button + Navigation */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              {/* Reduced heading size */}
              <h1 className="text-xl font-bold text-black">
                RCM – Account Receivable
              </h1>

              {/* Export button next to heading */}
              <Button type="primary" onClick={handleExport}>
                Export Data
              </Button>
            </div>

            {/* Navigation arrows */}
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

          {/* Sub Tabs */}
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

      {/* Scrollable Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 pt-4">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <Spin size="large" />
            </div>
          ) : (
            <div className="relative">
              {/* Top scrollbar */}
              {/* <div
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
                  if (tableBody) tableBody.scrollLeft = target.scrollLeft;
                }}
              >
                <div style={{ minWidth: "1300px", height: "1px" }}></div>
              </div> */}

              {/* Table */}
              {/* <div
                ref={tableWrapperRef}
                className="bg-white shadow-md rounded-b-lg overflow-hidden"
                style={{ maxHeight: "calc(100vh - 280px)" }} // ← was 380px
              > */}
              <div
                ref={tableWrapperRef}
                className="bg-white shadow-md rounded-b-lg overflow-hidden"
                style={{
                  maxHeight: "calc(100vh - 280px)", // keep this
                  minHeight: "500px", // ← increase a bit (was 400px)
                }}
              >
                <style>{`
                  .ant-table-body {
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                  }
                  .ant-table-body::-webkit-scrollbar {
                    display: none;
                  }
                   
  .row-deactivated {
    background-color: #e5e7eb !important;  /* light gray */
    color: #6b7280 !important;             /* gray-500 text */
    opacity: 0.7;
  }
                `}</style>
                <Table
                  columns={getColumns(
                    activeTab,
                    activeSubTab,
                    handlers as any,
                    editingKeys
                  )}
                  dataSource={tableData}
                  pagination={false}
                  scroll={{ x: 1300, y: "calc(100vh - 340px)" }}
                  bordered
                  rowKey="key"
                  onHeaderRow={() => ({
                    onScroll: (e: React.UIEvent<HTMLDivElement>) => {
                      const target = e.target as HTMLDivElement;
                      if (topScrollbarRef.current) {
                        topScrollbarRef.current.scrollLeft = target.scrollLeft;
                      }
                    },
                  })}
                  rowClassName={(record) =>
                    record.isActive === false ? "row-deactivated" : ""
                  }
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

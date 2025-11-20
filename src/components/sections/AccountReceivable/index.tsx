"use client";
import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useCallback,
  useMemo,
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
import ExcelUploadModal from "./ExcelUploadModal";

const { TextArea } = Input;

export interface AccountReceivableRef {
  triggerImport: (file: File) => void;
}
interface AccountReceivableProps {
  excelModalVisible?: boolean;
  onExcelModalClose?: () => void;
  onExcelModalOpen?: () => void;
}
const defaultNewRow = (maxNo: number): DataType => {
  const newKey = String(Date.now());
  const newNo = (maxNo + 0.1).toFixed(1);
  return {
    key: newKey,
    no: newNo,
    process: "",
    isActive: true,
  };
};
const AccountReceivable = forwardRef<
  AccountReceivableRef,
  AccountReceivableProps
>((props, ref) => {
  const tableWrapperRef = useRef<HTMLDivElement>(null);
  const topScrollbarRef = useRef<HTMLDivElement>(null);
  const scrollSyncRef = useRef<boolean>(true);

  const [activeTab, setActiveTab] = useState("1");
  const [activeSubTab, setActiveSubTab] = useState("coso");
  const [tableData, setTableData] = useState<DataType[]>([]);
  const [editingKeys, setEditingKeys] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  // Add this state to your component
  const [excelModalVisible, setExcelModalVisible] = useState(false);

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

  const goPrev = useCallback(() => {
    if (hasPrev) {
      setEditingKeys([]); // Clear editing state
      setActiveTab(tabKeys[currentTabIndex - 1]);
    }
  }, [currentTabIndex, hasPrev]);

  const goNext = useCallback(() => {
    if (hasNext) {
      setEditingKeys([]); // Clear editing state
      setActiveTab(tabKeys[currentTabIndex + 1]);
    }
  }, [currentTabIndex, hasNext]);

  const debouncedResize = useDebouncedCallback(() => {
    window.dispatchEvent(new Event("resize"));
  }, 50);

  // Fixed useEffect
  useEffect(() => {
    debouncedResize();
  }, [tableData, activeTab, activeSubTab, debouncedResize]);

  // Keep top scrollbar width in sync
  useEffect(() => {
    const updateWidth = () => {
      if (!topScrollbarRef.current || !tableWrapperRef.current) return;
      const table = tableWrapperRef.current.querySelector(
        ".ant-table"
      ) as HTMLElement;
      if (table) {
        const dummy = topScrollbarRef.current.querySelector("div");
        if (dummy) {
          dummy.style.width = `${table.scrollWidth}px`;
        }
      }
    };

    // Use timeout to ensure DOM is updated
    const timeoutId = setTimeout(updateWidth, 100);

    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
      clearTimeout(timeoutId);
    };
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
        //@ts-ignore
        fields.forEach((f) => (obj[f] = row[f as keyof DataType] ?? ""));
        return obj;
      });

      const ws = XLSX.utils.json_to_sheet(exportData);
      XLSX.utils.book_append_sheet(wb, ws, sheetName);
    });
    XLSX.writeFile(wb, "AccountReceivable_Export.xlsx");
  };

  // Handler functions
  const handleEdit = useCallback((key: string) => {
    setEditingKeys((prev) => [...prev, key]);
  }, []);

  const handleDelete = useCallback((key: string) => {
    setTableData((prev) => prev.filter((r) => r.key !== key));
  }, []);

  const handleSave = useCallback((key: string) => {
    setEditingKeys((prev) => prev.filter((k) => k !== key));
  }, []);

  const handleCancel = useCallback((key: string) => {
    setEditingKeys((prev) => prev.filter((k) => k !== key));
  }, []);

  const handleCheckboxChange = useCallback(
    (rowKey: string, field: keyof DataType, checked: boolean) => {
      setTableData((prev) =>
        prev.map((r) => (r.key === rowKey ? { ...r, [field]: checked } : r))
      );
    },
    []
  );

  const handleSelectGeneric = useCallback(
    (value: string, rowKey: string, field?: string) => {
      if (!field) return;
      setTableData((prev) =>
        prev.map((r) => (r.key === rowKey ? { ...r, [field]: value } : r))
      );
    },
    []
  );

  const handleTextChange = useCallback(
    (rowKey: string, field: keyof DataType, value: string) => {
      setTableData((prev) =>
        prev.map((r) => (r.key === rowKey ? { ...r, [field]: value } : r))
      );
    },
    []
  );

  const handleAddRow = useCallback(() => {
    const maxNo = tableData.reduce((max, r) => {
      const num = parseFloat(r.no as string) || 0;
      return num > max ? num : max;
    }, 0);

    const newRow = defaultNewRow(maxNo);
    setTableData((prev) => [...prev, newRow]);
    setEditingKeys((prev) => [...prev, newRow.key]);
  }, [tableData]);

  const handleEditRow = useCallback((key: string) => {
    setEditingKeys((prev) => [...prev, key]);
  }, []);

  const handleDeleteRow = useCallback((key: string) => {
    setTableData((prev) => prev.filter((r) => r.key !== key));
  }, []);

  const handleStageChange = useCallback((value: string, rowKey: string) => {
    setTableData((prev) =>
      prev.map((r) => (r.key === rowKey ? { ...r, stage: value } : r))
    );
  }, []);

  const handleToggleStatus = useCallback((rowKey: string) => {
    setTableData((prev) =>
      prev.map((r) =>
        r.key === rowKey ? { ...r, isActive: !(r.isActive !== false) } : r
      )
    );
    setEditingKeys((prev) => prev.filter((k) => k !== rowKey));
  }, []);

  // Memoized handlers object
  const handlers = useMemo(
    () => ({
      onEdit: handleEdit,
      onDelete: handleDelete,
      onSave: handleSave,
      onCancel: handleCancel,
      onCheckboxChange: handleCheckboxChange,
      onSelectGeneric: handleSelectGeneric,
      onTextChange: handleTextChange,
      onAddRow: handleAddRow,
      onEditRow: handleEditRow,
      onDeleteRow: handleDeleteRow,
      onStageChange: handleStageChange,
      onToggleStatus: handleToggleStatus,
    }),
    [
      handleEdit,
      handleDelete,
      handleSave,
      handleCancel,
      handleCheckboxChange,
      handleSelectGeneric,
      handleTextChange,
      handleAddRow,
      handleEditRow,
      handleDeleteRow,
      handleStageChange,
      handleToggleStatus,
    ]
  );

  // Improved columns memo with cleanup
  const columns = useMemo(() => {
    // Clear any pending edits when tab changes
    return getColumns(activeTab, activeSubTab, handlers, editingKeys);
  }, [activeTab, activeSubTab, editingKeys, handlers]);

  // Handle tab changes with cleanup
  const handleTabChange = useCallback((key: string) => {
    setEditingKeys([]); // Clear editing state
    setActiveTab(key);
  }, []);

  const handleSubTabChange = useCallback((key: string) => {
    setEditingKeys([]); // Clear editing state
    setActiveSubTab(key);
  }, []);

  // Scroll handler with cleanup
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    if (!scrollSyncRef.current) return;

    const target = e.target as HTMLDivElement;
    if (topScrollbarRef.current) {
      scrollSyncRef.current = false;
      topScrollbarRef.current.scrollLeft = target.scrollLeft;
      setTimeout(() => {
        scrollSyncRef.current = true;
      }, 50);
    }
  }, []);

  const handleTopScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    if (!scrollSyncRef.current) return;

    const target = e.target as HTMLDivElement;
    const body = tableWrapperRef.current?.querySelector(
      ".ant-table-body"
    ) as HTMLElement;
    if (body) {
      scrollSyncRef.current = false;
      body.scrollLeft = target.scrollLeft;
      setTimeout(() => {
        scrollSyncRef.current = true;
      }, 50);
    }
  }, []);

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
              onChange={handleTabChange}
              className="text-lg"
              items={tabConfigs.map((c) => ({ key: c.key, label: c.label }))}
              destroyInactiveTabPane={true} // Add this to properly clean up
            />
          </div>

          {/* Sub-tabs */}
          {activeTab === "3" && (
            <div className="bg-white/50 backdrop-blur-sm rounded-b-xl shadow-sm mb-4">
              <Tabs
                activeKey={activeSubTab}
                onChange={handleSubTabChange}
                className="text-sm"
                items={[
                  { key: "coso", label: "COSO" },
                  {
                    key: "intosai",
                    label: "INTOSAI, IFAC, and Government Audit Standards",
                  },
                  { key: "other", label: "Other" },
                ]}
                destroyInactiveTabPane={true}
              />
            </div>
          )}

          {activeTab === "9" && (
            <div className="bg-white/50 backdrop-blur-sm rounded-b-xl shadow-sm mb-4">
              <Tabs
                activeKey={activeSubTab}
                onChange={handleSubTabChange}
                className="text-sm"
                items={[
                  { key: "sox", label: "SOX" },
                  { key: "financial", label: "Financial Statement Assertions" },
                  {
                    key: "icfr",
                    label: "Internal Control Over Financial Reporting",
                  },
                ]}
                destroyInactiveTabPane={true}
              />
            </div>
          )}
          {activeTab === "10" && (
            <div className="bg-white/50 backdrop-blur-sm rounded-b-xl shadow-sm mb-4">
              <Tabs
                activeKey={activeSubTab}
                onChange={handleSubTabChange}
                className="text-sm"
                items={[
                  { key: "audit", label: "Internal Audit Test" },
                  { key: "grc", label: "GRC Exception Logs" },
                ]}
                destroyInactiveTabPane={true}
              />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 pt-4">
          {/* <div className="mb-4">
            <ExcelApiPanel onDataLoaded={(data) => setTableData(data)} />
          </div> */}

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
                    onScroll={handleTopScroll}
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
                  key={`table-${activeTab}-${activeSubTab}`} // Force re-render on tab change
                  columns={columns}
                  dataSource={tableData}
                  pagination={false}
                  scroll={{ x: 1300, y: "calc(100vh - 340px)" }}
                  bordered
                  rowKey={(r) => `${r.key}-${r.isActive?.toString()}`}
                  rowClassName={(r) =>
                    r.isActive === false ? "row-deactivated" : ""
                  }
                  onHeaderRow={() => ({
                    onScroll: handleScroll,
                  })}
                />
              </div>
            </div>
          )}
          <ExcelUploadModal
            visible={excelModalVisible}
            onClose={() => setExcelModalVisible(false)}
            onDataLoaded={(data) => setTableData(data)}
          />
        </div>
      </div>
    </div>
  );
});

AccountReceivable.displayName = "AccountReceivable";
export default AccountReceivable;

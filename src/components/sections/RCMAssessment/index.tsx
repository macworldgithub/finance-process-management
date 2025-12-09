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
import { useDebouncedCallback, useDebounce } from "use-debounce";
import ExcelUploadModal from "./ExcelUploadModal";
import { apiClientDotNet } from "@/config/apiClientDotNet";
import { importSectionData } from "@/utils/importSectionDataService";
import { SECTION_TO_BASE_ENDPOINT } from "@/utils/sectionMappings";
import ProcessFormModal from "./ProcessFormModal";
const { TextArea } = Input;

export interface RCMAssessmentRef {
  triggerImport: (file: File) => void;
}

interface RCMAssessmentProps {
  excelModalVisible?: boolean;
  onExcelModalClose?: () => void;
  onExcelModalOpen?: () => void;
  initialTabKey?: string;
  initialSubTabKey?: string;
  onBackToLanding?: () => void;
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

const RCMAssessment = forwardRef<RCMAssessmentRef, RCMAssessmentProps>(
  (props, ref) => {
    const tableWrapperRef = useRef<HTMLDivElement>(null);
    const topScrollbarRef = useRef<HTMLDivElement>(null);
    const scrollSyncRef = useRef<boolean>(true);
    const [activeTab, setActiveTab] = useState(props.initialTabKey ?? "11");
    const [activeSubTab, setActiveSubTab] = useState(
      props.initialSubTabKey ?? ""
    );
    const [dataBySection, setDataBySection] = useState<
      Record<string, DataType[]>
    >({});
    const [editingKeys, setEditingKeys] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState("");
    const debouncedSearchText = useDebounce(searchText, 500)[0];
    const [excelModalVisible, setExcelModalVisible] = useState(false);
    const [formModalVisible, setFormModalVisible] = useState(false);
    const [editingRecord, setEditingRecord] = useState<DataType | null>(null);
    const [startSectionKey, setStartSectionKey] = useState<string | null>(null);

    // Reset sub-tab when switching main tabs
    useEffect(() => {
      // RCM Assessment tabs don't have sub-tabs
    }, [activeTab]);

    // Sync with optional initial props when they change
    useEffect(() => {
      if (props.initialTabKey) {
        setActiveTab(props.initialTabKey);
      }
    }, [props.initialTabKey]);

    useEffect(() => {
      if (props.initialSubTabKey) {
        setActiveSubTab(props.initialSubTabKey);
      }
    }, [props.initialSubTabKey]);

    const getCurrentSection = useCallback((): string => {
      switch (activeTab) {
        case "11":
          return "Assessment of Adequacy";
        case "12":
          return "Assessment of Effectiveness";
        case "13":
          return "Assessment of Efficiency";
        case "14":
          return "Process Severity";
        default:
          return "Assessment of Adequacy";
      }
    }, [activeTab]);

    const fetchData = useCallback(async () => {
      setLoading(true);
      try {
        const section = getCurrentSection();
        const response = await apiClientDotNet.get(
          SECTION_TO_BASE_ENDPOINT[section] || "/api/accountreceivable"
        );
        const formattedData = response.data.map((item: any) => ({
          ...item,
          key: item.id || String(item.key || Date.now()),
          isActive: item.isActive !== false,
        }));
        setDataBySection((prev) => ({ ...prev, [section]: formattedData }));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }, [getCurrentSection]);

    useEffect(() => {
      fetchData();
    }, [fetchData]);

    const handleEditRow = useCallback((key: string) => {
      setEditingKeys((prev) => [...prev, key]);
    }, []);

    const handleSaveRow = useCallback(
      async (key: string) => {
        const section = getCurrentSection();
        const sectionData = dataBySection[section] || [];
        const recordToSave = sectionData.find((item) => item.key === key);

        if (recordToSave) {
          try {
            await apiClientDotNet.put(
              `${
                SECTION_TO_BASE_ENDPOINT[section] || "/api/accountreceivable"
              }/${key}`,
              recordToSave
            );
            setEditingKeys((prev) => prev.filter((k) => k !== key));
            fetchData();
          } catch (error) {
            console.error("Error saving record:", error);
          }
        }
      },
      [dataBySection, getCurrentSection, fetchData]
    );

    const handleDeleteRow = useCallback(
      async (key: string) => {
        const section = getCurrentSection();
        try {
          await apiClientDotNet.delete(
            `${
              SECTION_TO_BASE_ENDPOINT[section] || "/api/accountreceivable"
            }/${key}`
          );
          setDataBySection((prev) => ({
            ...prev,
            [section]: (prev[section] || []).filter((item) => item.key !== key),
          }));
        } catch (error) {
          console.error("Error deleting record:", error);
        }
      },
      [getCurrentSection]
    );

    const handleToggleStatus = useCallback(
      async (key: string) => {
        const section = getCurrentSection();
        const sectionData = dataBySection[section] || [];
        const record = sectionData.find((item) => item.key === key);

        if (record) {
          const updatedRecord = { ...record, isActive: !record.isActive };
          try {
            await apiClientDotNet.put(
              `${
                SECTION_TO_BASE_ENDPOINT[section] || "/api/accountreceivable"
              }/${key}`,
              updatedRecord
            );
            setDataBySection((prev) => ({
              ...prev,
              [section]: sectionData.map((item) =>
                item.key === key ? updatedRecord : item
              ),
            }));
          } catch (error) {
            console.error("Error toggling status:", error);
          }
        }
      },
      [dataBySection, getCurrentSection]
    );

    const handleAddRow = useCallback(() => {
      const section = getCurrentSection();
      const sectionData = dataBySection[section] || [];
      const maxNo = Math.max(
        ...sectionData.map((item) => parseFloat(item.no || "0")),
        0
      );
      const newRow = defaultNewRow(maxNo);
      setDataBySection((prev) => ({
        ...prev,
        [section]: [...sectionData, newRow],
      }));
      setEditingKeys((prev) => [...prev, newRow.key]);
    }, [getCurrentSection, dataBySection]);

    const handleTextChange = useCallback(
      (key: string, field: keyof DataType, value: string) => {
        const section = getCurrentSection();
        setDataBySection((prev) => ({
          ...prev,
          [section]: (prev[section] || []).map((item) =>
            item.key === key ? { ...item, [field]: value } : item
          ),
        }));
      },
      [getCurrentSection]
    );

    const handleSelectGeneric = useCallback(
      (key: string, rowKey: string, field?: string) => {
        const section = getCurrentSection();
        setDataBySection((prev) => ({
          ...prev,
          [section]: (prev[section] || []).map((item) =>
            item.key === rowKey && field ? { ...item, [field]: key } : item
          ),
        }));
      },
      [getCurrentSection]
    );

    const handleCheckboxChange = useCallback(
      (rowKey: string, field: keyof DataType, checked: boolean) => {
        const section = getCurrentSection();
        setDataBySection((prev) => ({
          ...prev,
          [section]: (prev[section] || []).map((item) =>
            item.key === rowKey ? { ...item, [field]: checked } : item
          ),
        }));
      },
      [getCurrentSection]
    );

    const handlers = useMemo(
      () => ({
        onEditRow: handleEditRow,
        onSaveRow: handleSaveRow,
        onDeleteRow: handleDeleteRow,
        onToggleStatus: handleToggleStatus,
        onAddRow: handleAddRow,
        onTextChange: handleTextChange,
        onSelectGeneric: handleSelectGeneric,
        onCheckboxChange: handleCheckboxChange,
      }),
      [
        handleEditRow,
        handleSaveRow,
        handleDeleteRow,
        handleToggleStatus,
        handleAddRow,
        handleTextChange,
        handleSelectGeneric,
        handleCheckboxChange,
      ]
    );

    const tabConfigs = [
      { key: "11", label: "Assessment of Adequacy" },
      { key: "12", label: "Assessment of Effectiveness" },
      { key: "13", label: "Assessment of Efficiency" },
      { key: "14", label: "Process Severity" },
    ];

    const columns = useMemo(
      () => getColumns(activeTab, activeSubTab, handlers, editingKeys),
      [activeTab, activeSubTab, handlers, editingKeys]
    );

    const currentSection = getCurrentSection();
    const tableData = dataBySection[currentSection] || [];

    const filteredData = useMemo(() => {
      if (!debouncedSearchText) return tableData;
      return tableData.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(debouncedSearchText.toLowerCase())
        )
      );
    }, [tableData, debouncedSearchText]);

    const debouncedResize = useDebouncedCallback(() => {
      window.dispatchEvent(new Event("resize"));
    }, 50);

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
      const timeoutId = setTimeout(updateWidth, 100);
      window.addEventListener("resize", updateWidth);
      return () => {
        window.removeEventListener("resize", updateWidth);
        clearTimeout(timeoutId);
      };
    }, [activeTab, activeSubTab, tableData]);

    const handleBodyScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
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

    const handleDataLoaded = async (data: DataType[]) => {
      await importSectionData(currentSection, data);
      fetchData();
    };

    useImperativeHandle(ref, () => ({
      triggerImport: (file: File) => {
        // Handle import logic
      },
    }));

    return (
      <div className="flex flex-col h-screen bg-[#f8fafc]">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center space-x-4">
              <Button
                icon={<LeftOutlined />}
                onClick={props.onBackToLanding}
                className="flex items-center"
              >
                Back to Landing
              </Button>
              <h1 className="text-xl font-bold text-gray-800">
                RCM Assessment
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Input.Search
                placeholder="Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: 250 }}
              />
              <Button onClick={() => setExcelModalVisible(true)}>
                Import Excel
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b">
          <div className="px-6">
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              items={tabConfigs.map((config) => ({
                key: config.key,
                label: config.label,
              }))}
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <Spin size="large" />
            </div>
          ) : (
            <div className="relative">
              {/* Top Scrollbar */}
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
                  key={`table-${activeTab}-${activeSubTab}`}
                  columns={columns}
                  dataSource={filteredData}
                  pagination={false}
                  scroll={{ x: 1300, y: "calc(100vh - 340px)" }}
                  bordered
                  rowKey={(r) => `${r.key}-${r.isActive?.toString()}`}
                  rowClassName={(r) =>
                    r.isActive === false ? "row-deactivated" : ""
                  }
                  onBodyScroll={handleBodyScroll}
                />
              </div>
            </div>
          )}
        </div>

        {/* Modals */}
        <ExcelUploadModal
          visible={excelModalVisible}
          onClose={() => setExcelModalVisible(false)}
          onDataLoaded={handleDataLoaded}
        />
      </div>
    );
  }
);

RCMAssessment.displayName = "RCMAssessment";

export default RCMAssessment;

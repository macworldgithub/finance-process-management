"use client";
import React, { useEffect, useState } from "react";
import { Table, Tabs, Spin } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { getColumns } from "./columns";
import { data as importedData, controlAssessmentData, financialAssertionsData , internalAuditData } from "./data";
import { DataType } from "./types";


const AccountReceivable: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("1");
  const [activeSubTab, setActiveSubTab] = useState("coso");
  const [tableData, setTableData] = useState<DataType[]>([]);

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

  // Handler examples - these are passed to columns so column actions can modify state
  const handlers = {
    onStageChange: (key: string, rowKey: string) => {
      console.log("stage changed", key, "for row", rowKey);
      // Optional: update the tableData state to reflect change
      setTableData((prev) =>
        prev.map((r) => (r.key === rowKey ? { ...r, stage: key } : r))
      );
    },
    onSelectGeneric: (key: string, rowKey: string, field?: string) => {
      console.log("selected", key, "for", field, "row", rowKey);
      if (!field) return;
      setTableData((prev) =>
        prev.map((r) => (r.key === rowKey ? { ...r, [field]: key } : r))
      );
    },
  };

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
            <div className="flex space-x-3 bg-white border border-black shadow-sm ">
              <button className="p-2 rounded-md  hover:bg-gray-50 transition text-black font-bold">
                <LeftOutlined />
              </button>
              <div className="bg-black w-[2px] h-6 my-auto"></div>
              <button className="p-2 rounded-md hover:bg-gray-50 transition text-black font-bold">
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
              columns={getColumns(activeTab, activeSubTab, handlers)}
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

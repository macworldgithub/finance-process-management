"use client";
import React, { useEffect, useRef } from "react";
import { Table, Tabs } from "antd";
import { DownOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

const AccountReceivable = () => {
  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      width: 80,
    },
    {
      title: "Process",
      dataIndex: "process",
      key: "process",
      width: 300,
    },
    {
      title: "Activity",
      dataIndex: "activity",
      key: "activity",
      width: 300,
    },
    {
      title: "Process",
      dataIndex: "process2",
      key: "process2",
      width: 300,
    },
    {
      title: "Process Stage",
      dataIndex: "stage",
      key: "stage",
      width: 200,
      render: (text: any) => (
        <div className="flex items-center">
          {text}
          <DownOutlined className="ml-1" />
        </div>
      ),
    },
    {
      title: "Functions",
      dataIndex: "functions",
      key: "functions",
      width: 200,
      render: (text: any) => (
        <div className="flex items-center">
          {text}
          <DownOutlined className="ml-1" />
        </div>
      ),
    },
  ];

  const leftColumns = columns.slice(0, 2); // No., Process (fixed left area)
  const rightColumns = columns.slice(2); // Activity, Process (process2), Process Stage, Functions

  const data = [
    {
      key: "1",
      no: "5.1",
      process: "Establishing Account Receivable",
      activity: "Account Receivable Processing",
      process2: "Cash Collection Process",
      stage: "Initiation",
      functions: "Finance",
    },
    {
      key: "2",
      no: "5.2",
      process: "Establishment of Account Receivable Control Devices",
      activity: "Accuracy of Invoice Processing",
      process2: "Voucher Processing",
      stage: "Processing",
      functions: "Finance",
    },
    {
      key: "3",
      no: "5.3",
      process: "Returns and allowances from customer",
      activity: "Sales Return",
      process2: "Voucher Processing",
      stage: "Processing",
      functions: "Finance",
    },
    {
      key: "4",
      no: "5.4",
      process: "Returns and allowances from customer",
      activity: "Offer Discount and allowance",
      process2: "Voucher Processing",
      stage: "Processing",
      functions: "Finance",
    },
    {
      key: "5",
      no: "5.5",
      process: "Offer Discount and allowance on Accounts Receivable collection",
      activity: "Account Receivable Aging",
      process2: "Journalizing Process",
      stage: "Processing",
      functions: "Finance",
    },
    {
      key: "6",
      no: "5.6",
      process: "Estimate the Accounts Receivable Aging Analysis",
      activity: "Allowance for Doubtful Accounts",
      process2: "Invoicing",
      stage: "Processing",
      functions: "Finance",
    },
    {
      key: "7",
      no: "5.7",
      process: "Assessing the Allowance for Doubtful Accounts",
      activity: "Statement of Account",
      process2: "Handling of Sales Return",
      stage: "Processing",
      functions: "Finance",
    },
    {
      key: "8",
      no: "5.8",
      process: "Assessing the Allowance for...",
      activity: "Account Receivable Processing",
      process2: "Allowing Sales discount",
      stage: "Processing",
      functions: "Finance",
    },
    {
      key: "9",
      no: "5.9",
      process: "Sending statement of account to the customers",
      activity: "Cash Collection from Customers",
      process2: "A/R Aging Analysis Process",
      stage: "Processing",
      functions: "Finance",
    },
    {
      key: "10",
      no: "5.10",
      process: "Cash Receipts from Customers",
      activity: "Vouching",
      process2: "A/R Aging Analysis Process",
      stage: "Processing",
      functions: "Finance",
    },
    {
      key: "11",
      no: "5.11",
      process: "Preparation of the Account Receivable Voucher Package",
      activity: "Vouching",
      process2: "A/R Aging Analysis Process",
      stage: "Processing",
      functions: "Finance",
    },
    {
      key: "12",
      no: "5.12",
      process: "Procedures Performed on Account Receivable Voucher Package",
      activity: "Perform Journal Entries",
      process2: "A/R Aging Analysis Process",
      stage: "Processing",
      functions: "Finance",
    },
  ];

  // refs to wrapper divs so we can sync vertical scroll between left and right tables
  const leftWrapperRef = useRef<HTMLDivElement | null>(null);
  const rightWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let leftBody: HTMLElement | null = null;
    let rightBody: HTMLElement | null = null;
    let syncing = false;

    const findBodies = () => {
      leftBody = leftWrapperRef.current?.querySelector(
        ".ant-table-body"
      ) as HTMLElement | null;
      rightBody = rightWrapperRef.current?.querySelector(
        ".ant-table-body"
      ) as HTMLElement | null;
    };

    const onLeftScroll = () => {
      if (!leftBody || !rightBody || syncing) return;
      syncing = true;
      rightBody.scrollTop = leftBody.scrollTop;
      setTimeout(() => (syncing = false), 0);
    };

    const onRightScroll = () => {
      if (!leftBody || !rightBody || syncing) return;
      syncing = true;
      leftBody.scrollTop = rightBody.scrollTop;
      setTimeout(() => (syncing = false), 0);
    };

    findBodies();
    // in case table renders later, try again after small delay
    const retry = setTimeout(findBodies, 100);

    if (leftBody) leftBody.addEventListener("scroll", onLeftScroll);
    if (rightBody) rightBody.addEventListener("scroll", onRightScroll);

    return () => {
      clearTimeout(retry);
      if (leftBody) leftBody.removeEventListener("scroll", onLeftScroll);
      if (rightBody) rightBody.removeEventListener("scroll", onRightScroll);
    };
  }, [data.length]);

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen overflow-y-auto">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">
        RCM – Account Receivable
      </h1>

      <div className="bg-white rounded-xl shadow-md">
        <Tabs
          defaultActiveKey="2"
          className="border-b px-6 pt-3"
          items={[
            { key: "1", label: "Process" },
            { key: "2", label: "Ownership" },
            { key: "3", label: "Control Environment" },
            { key: "4", label: "Risk Assessment (Inherent Risk)" },
            { key: "5", label: "Risk Responses" },
            { key: "6", label: "Control Activities" },
            { key: "7", label: "Control Assessment" },
            { key: "8", label: "Risk Assessment (Residual Risk)" },
          ]}
        />

        <div className="p-4">
          <div className="flex">
            {/* Left fixed area: No. + Process */}
            <div
              ref={leftWrapperRef}
              className="shrink-0"
              style={{ width: 380, overflowX: "hidden" }} // <-- added overflowX hidden to prevent horizontal scroll on left
            >
              <Table
                columns={leftColumns}
                dataSource={data}
                pagination={false}
                bordered
                // only vertical scroll to sync with right
                scroll={{ y: 450 }}
                rowKey="key"
              />
            </div>

            {/* Right scrollable area: remaining 4 columns */}
            <div
              ref={rightWrapperRef}
              className="flex-1 overflow-x-auto"
              style={{ minWidth: 0 }}
            >
              <div style={{ minWidth: 1000 }}>
                <Table
                  columns={rightColumns}
                  dataSource={data}
                  pagination={false}
                  bordered
                  // remove scroll.x so outer wrapper shows horizontal scrollbar
                  scroll={{ y: 450 }}
                  rowKey="key"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountReceivable;
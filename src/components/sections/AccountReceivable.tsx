"use client";
import React from "react";
import { Table, Tabs, Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

const AccountReceivable = () => {
  const stageOptions = [
    { label: "Initiation", key: "init" },
    { label: "Processing", key: "proc" },
    { label: "Completed", key: "comp" },
  ];

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      width: 80,
      fixed: "left",
    },
    {
      title: "Process",
      dataIndex: "process",
      key: "process",
      width: 300,
      fixed: "left",
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
      render: (text, record) => {
        const menu = (
          <Menu
            onClick={({ key }) => {
              // replace with your handler to update stage for the record
              console.log("selected stage", key, "for row", record.key);
            }}
            items={stageOptions}
          />
        );

        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <div className="flex items-center cursor-pointer">
              {text}
              <DownOutlined className="ml-1" />
            </div>
          </Dropdown>
        );
      },
    },
    {
      title: "Functions",
      dataIndex: "functions",
      key: "functions",
      width: 200,
      render: (text) => <div className="flex items-center">{text}</div>, // removed dropdown icon/button
    },
  ];

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

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen overflow-y-auto">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">
        RCM – Account Receivable
      </h1>
      <div>
        <Tabs
          defaultActiveKey="2"
          className=" px-6 pt-3 mx-auto"
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

        <div className="p-4 overflow-x-auto">
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            scroll={{ x: 1300, y: 450 }}
            bordered
          />
        </div>
      </div>
    </div>
  );
};

export default AccountReceivable;

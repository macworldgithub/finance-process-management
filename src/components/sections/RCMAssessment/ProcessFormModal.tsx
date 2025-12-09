"use client";
import React, { useEffect } from "react";
import { Modal, Form, Input, Button, Select } from "antd";
import { DataType } from "./types";

interface ProcessFormModalProps {
  visible: boolean;
  record: DataType | null;
  onCancel: () => void;
  onSubmit: (values: Partial<DataType>) => void;
  loading?: boolean;
}

const ProcessFormModal: React.FC<ProcessFormModalProps> = ({
  visible,
  record,
  onCancel,
  onSubmit,
  loading = false,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && record) {
      form.setFieldsValue(record);
    } else if (visible) {
      form.resetFields();
    }
  }, [visible, record, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      title={record ? "Edit Process" : "Add New Process"}
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleSubmit}
        >
          {record ? "Update" : "Create"}
        </Button>,
      ]}
      width={800}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          isActive: true,
        }}
      >
        <Form.Item
          label="Process Number"
          name="no"
          rules={[{ required: true, message: "Please enter process number" }]}
        >
          <Input placeholder="e.g., 1.1" />
        </Form.Item>

        <Form.Item
          label="Process Name"
          name="process"
          rules={[{ required: true, message: "Please enter process name" }]}
        >
          <Input placeholder="Enter process name" />
        </Form.Item>

        <Form.Item label="Design Adequacy Score" name="designAdequacyScore">
          <Input placeholder="Enter score (0-10)" />
        </Form.Item>

        <Form.Item label="Sustainability Score" name="sustainabilityScore">
          <Input placeholder="Enter score (0-10)" />
        </Form.Item>

        <Form.Item label="Scalability Score" name="scalabilityScore">
          <Input placeholder="Enter score (0-5)" />
        </Form.Item>

        <Form.Item label="Adequacy Score" name="adequacyScore">
          <Input placeholder="Enter score (0-25)" />
        </Form.Item>

        <Form.Item label="Total Score" name="totalScore">
          <Input placeholder="Enter total score (0-25)" />
        </Form.Item>

        <Form.Item label="Scale" name="scale">
          <Select placeholder="Select scale">
            <Select.Option value="1">1</Select.Option>
            <Select.Option value="2">2</Select.Option>
            <Select.Option value="3">3</Select.Option>
            <Select.Option value="4">4</Select.Option>
            <Select.Option value="5">5</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Rating" name="rating">
          <Select placeholder="Select rating">
            <Select.Option value="Excellent">Excellent</Select.Option>
            <Select.Option value="Good">Good</Select.Option>
            <Select.Option value="Average">Average</Select.Option>
            <Select.Option value="Poor">Poor</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProcessFormModal;

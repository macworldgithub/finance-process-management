// src/components/sections/AccountReceivable/ProcessFormModal.tsx
import React, { useState, useEffect } from 'react';
import { Form, Input, Modal, Steps, Select, message } from 'antd';
import { processService } from '@/services/processService';

const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;

interface ProcessFormModalProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  tabKey: string;
  initialValues?: any;
}

const ProcessFormModal: React.FC<ProcessFormModalProps> = ({ 
  visible, 
  onCancel, 
  onSuccess,
  tabKey,
  initialValues
}) => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);

  // Reset form when modal is opened/closed
  useEffect(() => {
    if (visible) {
      form.resetFields();
      if (initialValues) {
        form.setFieldsValue(initialValues);
      }
      setCurrentStep(0);
    }
  }, [visible, initialValues, form]);

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      // Remove Id and Date from the values
      const { Id, Date, ...submitValues } = values;
      
      // Call the appropriate service based on tabKey
      if (initialValues) {
        //@ts-ignore
        await processService.update(tabKey, { ...submitValues, Id: initialValues.Id });
      } else {
        //@ts-ignore
        await processService.create(tabKey, submitValues);
      }
      
      message.success(initialValues ? 'Record updated successfully' : 'Record created successfully');
      onSuccess();
      onCancel();
    } catch (error) {
      console.error('Error submitting form:', error);
      message.error('Failed to save record');
    } finally {
      setLoading(false);
    }
  };

  const commonFields = (
    <>
      <Form.Item
        name="No"
        label="No"
        rules={[{ required: true, message: 'Please enter the number' }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        name="Process"
        label="Process"
        rules={[{ required: true, message: 'Please enter the process' }]}
      >
        <Input />
      </Form.Item>
    </>
  );

  // Define dropdown options
  const probabilityOptions = ['Certain', 'Likely', 'Possible', 'Unlikely', 'Rare'];
  const severityOptions = ['Catastrophic', 'Major', 'Moderate', 'Minor', 'Insignificant'];
  const classificationOptions = ['Critical', 'High', 'Moderate', 'Low', 'Lowest'];
  const yesNoOptions = ['P', 'O']; // P for Yes, O for No

  // Tab-specific form fields
  //@ts-ignore
  const tabForms: { [key: string]: JSX.Element } = {
    'processes': (
      <>
        <Form.Item name="Process Description" label="Process Description">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item name="Process Objectives" label="Process Objectives">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item name="Process Severity Levels" label="Process Severity Levels">
          <Select>
            {severityOptions.map(option => (
              <Option key={option} value={option}>{option}</Option>
            ))}
          </Select>
        </Form.Item>
      </>
    ),
    'control-activities': (
      <>
        <Form.Item name="Control Objectives" label="Control Objectives">
          <TextArea rows={2} />
        </Form.Item>
        <Form.Item name="Control Ref" label="Control Ref">
          <Input />
        </Form.Item>
        <Form.Item name="Control Definition" label="Control Definition">
          <TextArea rows={2} />
        </Form.Item>
        {/* Add other fields for Control Activities */}
      </>
    ),
    'control-assessments': (
      <>
        <Form.Item name="Risk Description" label="Risk Description">
          <TextArea rows={2} />
        </Form.Item>
        <Form.Item name="Probability" label="Probability">
          <Select>
            {probabilityOptions.map(option => (
              <Option key={option} value={option}>{option}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="Severity" label="Severity">
          <Select>
            {severityOptions.map(option => (
              <Option key={option} value={option}>{option}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="Classification" label="Classification">
          <Select>
            {classificationOptions.map(option => (
              <Option key={option} value={option}>{option}</Option>
            ))}
          </Select>
        </Form.Item>
      </>
    ),
    'risk-assessments': (
      <>
        <Form.Item name="Risk Description" label="Risk Description">
          <TextArea rows={2} />
        </Form.Item>
        <Form.Item name="Inherent Risk" label="Inherent Risk">
          <Select>
            {classificationOptions.map(option => (
              <Option key={option} value={option}>{option}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="Residual Risk" label="Residual Risk">
          <Select>
            {classificationOptions.map(option => (
              <Option key={option} value={option}>{option}</Option>
            ))}
          </Select>
        </Form.Item>
      </>
    ),
    'risk-responses': (
      <>
        <Form.Item name="Risk Response" label="Risk Response">
          <Input />
        </Form.Item>
        <Form.Item name="Risk Response Description" label="Risk Response Description">
          <TextArea rows={2} />
        </Form.Item>
        <Form.Item name="Risk Response Type" label="Risk Response Type">
          <Select>
            <Option value="Accept">Accept</Option>
            <Option value="Avoid">Avoid</Option>
            <Option value="Transfer">Transfer</Option>
            <Option value="Mitigate">Mitigate</Option>
          </Select>
        </Form.Item>
      </>
    ),
    // Add more tab-specific forms as needed
    'ownership': (
      <>
        <Form.Item name="Owner" label="Owner">
          <Input />
        </Form.Item>
        <Form.Item name="Department" label="Department">
          <Input />
        </Form.Item>
        <Form.Item name="Role" label="Role">
          <Input />
        </Form.Item>
      </>
    ),
    'financial-statement-assertions': (
      <>
        <Form.Item name="Assertion" label="Assertion">
          <Input />
        </Form.Item>
        <Form.Item name="Description" label="Description">
          <TextArea rows={2} />
        </Form.Item>
        <Form.Item name="Relevant" label="Relevant">
          <Select>
            {yesNoOptions.map(option => (
              <Option key={option} value={option}>{option}</Option>
            ))}
          </Select>
        </Form.Item>
      </>
    ),
    'internal-audit-tests': (
      <>
        <Form.Item name="Test Procedure" label="Test Procedure">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item name="Sample Size" label="Sample Size">
          <Input type="number" />
        </Form.Item>
        <Form.Item name="Results" label="Results">
          <Select>
            <Option value="Pass">Pass</Option>
            <Option value="Fail">Fail</Option>
            <Option value="N/A">N/A</Option>
          </Select>
        </Form.Item>
      </>
    ),
    // Add other tab forms following the same pattern
  };

  const steps = [
    {
      title: 'Basic Information',
      content: commonFields,
    },
    {
      title: 'Additional Information',
      content: tabForms[tabKey] || <div>Form for this tab is not implemented yet</div>,
    },
  ];

  const next = () => {
    form
      .validateFields()
      .then(() => {
        setCurrentStep(currentStep + 1);
      })
      .catch(() => {});
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <Modal
      title={initialValues ? 'Edit Record' : 'Add New Record'}
      open={visible}
      onCancel={onCancel}
      width={800}
      footer={[
        <button key="cancel" onClick={onCancel} className="ant-btn ant-btn-default">
          Cancel
        </button>,
        currentStep > 0 && (
          <button key="prev" onClick={prev} className="ant-btn ant-btn-default">
            Previous
          </button>
        ),
        currentStep < steps.length - 1 ? (
          <button key="next" onClick={next} className="ant-btn ant-btn-primary">
            Next
          </button>
        ) : (
          <button
            key="submit"
            onClick={() => form.submit()}
            className="ant-btn ant-btn-primary"
            disabled={loading}
          >
            {initialValues ? 'Update' : 'Create'}
          </button>
        ),
      ]}
    >
      <Steps current={currentStep} style={{ marginBottom: 24 }}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={initialValues}
      >
        {steps[currentStep].content}
      </Form>
    </Modal>
  );
};

export default ProcessFormModal;
// src/components/sections/AccountReceivable/ProcessFormModal.tsx
import React, { useState, useEffect } from "react";
import { Form, Input, Modal, Steps, Select, message } from "antd";
import { processService } from "@/services/processService";

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
  initialValues,
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
      // Ensure basic fields (No, Process) are always included
      const noValue = form.getFieldValue("No");
      const processValue = form.getFieldValue("Process");

      const fullValues = {
        No: noValue,
        Process: processValue,
        ...values,
      };

      // Remove Id and Date from the values
      const { Id, Date, ...submitValues } = fullValues;

      // Call the appropriate service based on tabKey
      if (initialValues) {
        //@ts-ignore
        await processService.update(tabKey, {
          ...submitValues,
          Id: initialValues.Id,
        });
      } else {
        //@ts-ignore
        await processService.create(tabKey, submitValues);
      }

      message.success(
        initialValues
          ? "Record updated successfully"
          : "Record created successfully"
      );
      onSuccess();
      onCancel();
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("Failed to save record");
    } finally {
      setLoading(false);
    }
  };

  const commonFields = (
    <>
      <Form.Item
        name="No"
        label="No"
        rules={[{ required: true, message: "Please enter the number" }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        name="Process"
        label="Process"
        rules={[{ required: true, message: "Please enter the process" }]}
      >
        <Input />
      </Form.Item>
    </>
  );

  // Define dropdown options
  const probabilityOptions = [
    "Certain",
    "Likely",
    "Possible",
    "Unlikely",
    "Rare",
  ];
  const severityOptions = [
    "Catastrophic",
    "Major",
    "Moderate",
    "Minor",
    "Insignificant",
  ];
  const classificationOptions = [
    "Critical",
    "High",
    "Moderate",
    "Low",
    "Lowest",
  ];
  const yesNoOptions = ["P", "O"]; // P for Yes, O for No

  // Tab-specific form fields (match single-row API request bodies)
  //@ts-ignore
  const tabForms: { [key: string]: JSX.Element } = {
    // /Processes
    processes: (
      <>
        <Form.Item name="Process Description" label="Process Description">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item name="Process Objectives" label="Process Objectives">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="Process Severity Levels"
          label="Process Severity Levels"
        >
          <Select>
            {severityOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </>
    ),
    // /ControlActivities
    "control-activities": (
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
        <Form.Item name="Control Description" label="Control Description">
          <TextArea rows={2} />
        </Form.Item>
        <Form.Item name="Control Responsibility" label="Control Responsibility">
          <Input />
        </Form.Item>
        <Form.Item name="Key Control" label="Key Control">
          <Select>
            {yesNoOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="Zero Tolerance" label="Zero Tolerance">
          <Select>
            {yesNoOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </>
    ),
    // /ControlAssessments
    "control-assessments": (
      <>
        <Form.Item
          name="Level of Responsibility-Operating Level (Entity / Activity)"
          label="Level of Responsibility-Operating Level (Entity / Activity)"
        >
          <Input />
        </Form.Item>
        <Form.Item name="COSO Principle #" label="COSO Principle #">
          <Input />
        </Form.Item>
        <Form.Item
          name="Operational Approach (Automated / Manual)"
          label="Operational Approach (Automated / Manual)"
        >
          <Input />
        </Form.Item>
        <Form.Item name="Operational Frequency" label="Operational Frequency">
          <Input />
        </Form.Item>
        <Form.Item
          name="Control Classification (Preventive / Detective / Corrective)"
          label="Control Classification (Preventive / Detective / Corrective)"
        >
          <Input />
        </Form.Item>
      </>
    ),
    // /CosoControlEnvironments
    "coso-control-environments": (
      <>
        <Form.Item
          name="Integrity & Ethical Values"
          label="Integrity & Ethical Values"
        >
          <Select>
            {yesNoOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="Board Oversight" label="Board Oversight">
          <Select>
            {yesNoOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="Organizational Structure"
          label="Organizational Structure"
        >
          <Select>
            {yesNoOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="Commitment to Competence"
          label="Commitment to Competence"
        >
          <Select>
            {yesNoOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="Management Philosophy" label="Management Philosophy">
          <Select>
            {yesNoOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </>
    ),
    // /FinancialStatementAssertions
    "financial-statement-assertions": (
      <>
        <Form.Item
          name="Internal Control Over Financial Reporting?"
          label="Internal Control Over Financial Reporting?"
        >
          <Select>
            {yesNoOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="Occurrence" label="Occurrence">
          <Select>
            {yesNoOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="Completeness" label="Completeness">
          <Select>
            {yesNoOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="Accuracy" label="Accuracy">
          <Select>
            {yesNoOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="Authorization" label="Authorization">
          <Select>
            {yesNoOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="Cutoff" label="Cutoff">
          <Select>
            {yesNoOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="Classification and Understandability"
          label="Classification and Understandability"
        >
          <Select>
            {yesNoOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="Existence" label="Existence">
          <Select>
            {yesNoOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="Rights and Obligations" label="Rights and Obligations">
          <Select>
            {yesNoOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="Valuation and Allocation"
          label="Valuation and Allocation"
        >
          <Select>
            {yesNoOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="Presentation / Disclosure"
          label="Presentation / Disclosure"
        >
          <Select>
            {yesNoOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </>
    ),
    // /GrcExceptionLogs
    "grc-exception-logs": (
      <>
        <Form.Item name="GRC Adequacy" label="GRC Adequacy">
          <Input />
        </Form.Item>
        <Form.Item name="GRC Effectiveness" label="GRC Effectiveness">
          <Input />
        </Form.Item>
        <Form.Item name="Explanation" label="Explanation">
          <TextArea rows={3} />
        </Form.Item>
      </>
    ),
    // /InternalAuditTests
    "internal-audit-tests": (
      <>
        <Form.Item name="Check" label="Check">
          <Input />
        </Form.Item>
        <Form.Item name="Internal Audit Test" label="Internal Audit Test">
          <TextArea rows={3} />
        </Form.Item>
        <Form.Item name="Sample Size" label="Sample Size">
          <Input />
        </Form.Item>
      </>
    ),
    // /IntosaiIfacControlEnvironments
    "intosai-ifac-control-environments": (
      <>
        <Form.Item
          name="Integrity and Ethical Values"
          label="Integrity and Ethical Values"
        >
          <Select>
            {yesNoOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="Commitment to Competence"
          label="Commitment to Competence"
        >
          <Select>
            {yesNoOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="Management’s Philosophy and Operating Style"
          label="Management’s Philosophy and Operating Style"
        >
          <Select>
            {yesNoOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="Organizational Structure"
          label="Organizational Structure"
        >
          <Select>
            {yesNoOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="Assignment of Authority and Responsibility"
          label="Assignment of Authority and Responsibility"
        >
          <Select>
            {yesNoOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="Human Resource Policies and Practices"
          label="Human Resource Policies and Practices"
        >
          <Select>
            {yesNoOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="Board of Directors’ or Audit Committee’s Participation"
          label="Board of Directors’ or Audit Committee’s Participation"
        >
          <Select>
            {yesNoOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="Management Control Methods"
          label="Management Control Methods"
        >
          <Select>
            {yesNoOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="External Influences" label="External Influences">
          <Select>
            {yesNoOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="Management’s Commitment to Internal Control"
          label="Management’s Commitment to Internal Control"
        >
          <Select>
            {yesNoOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="Communication and Enforcement of Integrity and Ethical Values"
          label="Communication and Enforcement of Integrity and Ethical Values"
        >
          <Select>
            {yesNoOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="Employee Awareness and Understanding"
          label="Employee Awareness and Understanding"
        >
          <Select>
            {yesNoOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="Accountability and Performance Measurement"
          label="Accountability and Performance Measurement"
        >
          <Select>
            {yesNoOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="Commitment to Transparency and Openness"
          label="Commitment to Transparency and Openness"
        >
          <Select>
            {yesNoOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </>
    ),
    // /OtherControlEnvironments
    "other-control-environments": (
      <>
        <Form.Item
          name="Responsibility Delegation Matrix"
          label="Responsibility Delegation Matrix"
        >
          <Select>
            {yesNoOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="Segregation of duties" label="Segregation of duties">
          <Select>
            {yesNoOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="Reporting Lines" label="Reporting Lines">
          <Select>
            {yesNoOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="Mission" label="Mission">
          <Input />
        </Form.Item>
        <Form.Item name="Vision and Values" label="Vision and Values">
          <Input />
        </Form.Item>
        <Form.Item name="Goals and Objectives" label="Goals and Objectives">
          <Input />
        </Form.Item>
        <Form.Item name="Structures & Systems" label="Structures & Systems">
          <Input />
        </Form.Item>
        <Form.Item
          name="Policies and Procedures"
          label="Policies and Procedures"
        >
          <Input />
        </Form.Item>
        <Form.Item name="Processes" label="Processes">
          <Input />
        </Form.Item>
        <Form.Item
          name="Integrity and Ethical Values"
          label="Integrity and Ethical Values"
        >
          <Select>
            {yesNoOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="Oversight structure" label="Oversight structure">
          <Select>
            {yesNoOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="Standards" label="Standards">
          <Input />
        </Form.Item>
        <Form.Item name="Methodologies" label="Methodologies">
          <Input />
        </Form.Item>
        <Form.Item name="Rules and Regulations" label="Rules and Regulations">
          <Input />
        </Form.Item>
      </>
    ),
    // /Ownerships
    ownerships: (
      <>
        <Form.Item name="Main Process" label="Main Process">
          <Input />
        </Form.Item>
        <Form.Item name="Activity" label="Activity">
          <Input />
        </Form.Item>
        <Form.Item name="Process" label="Process">
          <Input />
        </Form.Item>
        <Form.Item name="Process Stage" label="Process Stage">
          <Input />
        </Form.Item>
        <Form.Item name="Functions" label="Functions">
          <Input />
        </Form.Item>
        <Form.Item
          name="Client Segment and/or Functional Segment"
          label="Client Segment and/or Functional Segment"
        >
          <Input />
        </Form.Item>
        <Form.Item name="Operational Unit" label="Operational Unit">
          <Input />
        </Form.Item>
        <Form.Item name="Division" label="Division">
          <Input />
        </Form.Item>
        <Form.Item name="Entity" label="Entity">
          <Input />
        </Form.Item>
        <Form.Item name="Unit / Department" label="Unit / Department">
          <Input />
        </Form.Item>
        <Form.Item name="Product Class" label="Product Class">
          <Input />
        </Form.Item>
        <Form.Item name="Product Name" label="Product Name">
          <Input />
        </Form.Item>
      </>
    ),
    // /RiskAssessmentInherentRisks
    "risk-assessment-inherent-risks": (
      <>
        <Form.Item name="Risk Type" label="Risk Type">
          <Input />
        </Form.Item>
        <Form.Item name="Risk Description" label="Risk Description">
          <TextArea rows={2} />
        </Form.Item>
        <Form.Item name="Severity/ Impact" label="Severity/ Impact">
          <Select>
            {severityOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="Probability/ Likelihood"
          label="Probability/ Likelihood"
        >
          <Select>
            {probabilityOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="Classification" label="Classification">
          <Select>
            {classificationOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </>
    ),
    // /RiskAssessmentResidualRisks
    "risk-assessment-residual-risks": (
      <>
        <Form.Item name="Risk Type" label="Risk Type">
          <Input />
        </Form.Item>
        <Form.Item name="Risk Description" label="Risk Description">
          <TextArea rows={2} />
        </Form.Item>
        <Form.Item name="Severity/ Impact" label="Severity/ Impact">
          <Select>
            {severityOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="Probability/ Likelihood"
          label="Probability/ Likelihood"
        >
          <Select>
            {probabilityOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="Classification" label="Classification">
          <Select>
            {classificationOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </>
    ),
    // /RiskResponses
    "risk-responses": (
      <>
        <Form.Item name="Type of Risk Response" label="Type of Risk Response">
          <Select>
            {["Mitigate", "Accept", "Transfer", "Avoid"].map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </>
    ),
    // /Sox
    sox: (
      <>
        <Form.Item name="SOX Control Activity" label="SOX Control Activity">
          <TextArea rows={3} />
        </Form.Item>
      </>
    ),
  };

  const steps = [
    {
      title: "Basic Information",
      content: commonFields,
    },
    {
      title: "Additional Information",
      content: tabForms[tabKey] || (
        <div>Form for this tab is not implemented yet</div>
      ),
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
      title={initialValues ? "Edit Record" : "Add New Record"}
      open={visible}
      onCancel={onCancel}
      width={800}
      footer={[
        <button
          key="cancel"
          onClick={onCancel}
          className="ant-btn ant-btn-default"
        >
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
            {initialValues ? "Update" : "Create"}
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

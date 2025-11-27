// src/utils/sectionMappings.ts

export const SECTION_TO_ENDPOINT: Record<string, string> = {
  Process: "Processes/bulk",
  Ownership: "Ownerships/bulk",
  "COSO-Control Environment": "CosoControlEnvironments/bulk",
  "INTOSAI, IFAC, and Government Audit Standards - Control Environment":
    "IntosaiIfacControlEnvironments/bulk",
  "Other- - Control Environment": "OtherControlEnvironments/bulk",
  "Risk Assessment  (Inherent Risk)": "RiskAssessmentInherentRisks/bulk",
  "Risk Responses": "RiskResponses/bulk",
  "Control Activities": "ControlActivities/bulk",
  "Control Assessment": "ControlAssessments/bulk",
  "Risk Assessment (Residual Risk)": "RiskAssessmentResidualRisks",
  SOX: "Sox",
  "Financial Statement Assertions": "FinancialStatementAssertions",
  "Internal Audit Test": "InternalAuditTests",
  "GRC Exception Log": "GrcExceptionLogs",
};

export const getEndpointForSection = (section: string): string | undefined => {
  return SECTION_TO_ENDPOINT[section];
};

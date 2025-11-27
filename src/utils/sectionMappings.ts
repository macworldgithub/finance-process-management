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
  "Risk Assessment (Residual Risk)": "RiskAssessmentResidualRisks/bulk",
  SOX: "Sox/bulk",
  "Financial Statement Assertions": "FinancialStatementAssertions/bulk",
  "Internal Audit Test": "InternalAuditTests/bulk",
  "GRC Exception Log": "GrcExceptionLogs/bulk",
};

export const getEndpointForSection = (section: string): string | undefined => {
  return SECTION_TO_ENDPOINT[section];
};

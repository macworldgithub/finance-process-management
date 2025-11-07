// import { DataType } from "./types";
// export const data: DataType[] = [
//   {
//     key: "1",
//     no: "5.1",
//     process: "Establishing Account Receivable",
//     processDescription:
//       "This Account Receivable recording policy establishes guidelines relating to receivable management, in particular how and when to reserve a receivable, write-off a receivable, and recover a receivable.",
//     processObjective:
//       "The objective of this Account Receivable recording policy is to ensure consistency in Company’s accounting treatment of receivables. Accurately record invoices on a timely basis for all accepted sales that have been authorized.",
//     processSeverityLevels: "Critical",
//     activity: "Account Receivable Processing",
//     process2: "Account Receivable Recording",
//     stage: "Initiation",
//     functions: "Finance",
//     clientSegment: "Account Receivable",
//     operationalUnit: "A",
//     division: "C",
//     entity: "XYZ",
//     unitDepartment: "Account Receivable",
//     productClass: "Non",
//     productName: "Others",
//     integrityEthical: true,
//     boardOversight: false,
//     orgStructure: true,
//     commitmentCompetence: true,
//     managementPhilosophy: false,
//     riskType: "Liquidity Risk",
//     riskDescription: "Inaccurately Recording Account Receivable",
//     severityImpact: "Catastrophic",
//     probabilityLikelihood: "Certain",
//     classification: "Critical",
//     riskResponseType: "Mitigate",
//     controlObjectives:
//       "The project and office managers must approve Accounts Receivable invoices before they are sent to the customers. With each invoice, the project and office managers should review a job cost report, where applicable, for reasonableness to ensure that the current invoice amount is appropriate in relation to job costs incurred to date.",
//     controlDefinition:
//       "All valid Account Receivable transactions and only those transactions, should be accurately.",
//     controlDescription:
//       "Company’s authorized office are responsible for processing Accounts Receivable invoices. When possible, invoicing should be done on a daily basis. At a minimum, invoicing should be done once a week.",
//     controlResponsibility: "Financial Controller",
//   },
//   {
//     key: "2",
//     no: "5.2",
//     process: "Establishment of Account Receivable Control Devices",
//     processDescription:
//       "Review the accuracy over sales invoice processing and receipt in order to prevent duplicate recording of cash collection.",
//     processObjective:
//       "Ensure accuracy in sales invoice processing and prevent duplicate recording of cash collections.",
//     processSeverityLevels: "High",
//     activity: "Accuracy of Invoice Processing",
//     process2: "Invoicing",
//     stage: "Processing",
//     functions: "Finance",
//     clientSegment: "Retail",
//     operationalUnit: "A",
//     division: "C",
//     entity: "XYZ",
//     unitDepartment: "Account Receivable",
//     productClass: "Non",
//     productName: "Others",
//     integrityEthical: false,
//     boardOversight: true,
//     orgStructure: false,
//     commitmentCompetence: true,
//     managementPhilosophy: true,
//     riskType: "Liquidity Risk",
//     riskDescription: "A misstatement in Account Receivable due to delay recording",
//     severityImpact: "Major",
//     probabilityLikelihood: "Likely",
//     classification: "High",
//     riskResponseType: "Mitigate",
//     controlObjectives:
//       "Accounts Receivable control are established and verifying the existence of Account Receivable.\n" +
//       "a) Use standard shipping or contract terms.\n" +
//       "b) Communicate nonstandard shipping or contract terms to accounts receivable.\n" +
//       "c) Verify shipping or contract terms before invoice processing.",
//     controlDefinition:
//       "Establish the validity and legitimacy of Account Receivable transactions by reaching to customers.",
//     controlDescription:
//       "Ensure the accuracy in Account Receivable process.",
//     controlResponsibility: "Financial Controller",
//   },
//   {
//     key: "3",
//     no: "5.3",
//     process: "Returns and allowances from customer",
//     processDescription:
//       "Accurately record all authorized sales returns and allowances and only such returns and allowances.",
//     processObjective:
//       "Returns of goods from customer should be adequately controlled, documented, and recorded.",
//     processSeverityLevels: "High",
//     activity: "Sales Return",
//     process2: "Handling of Sales Return",
//     stage: "Processing",
//     functions: "Finance",
//     clientSegment: "Account Receivable",
//     operationalUnit: "A",
//     division: "C",
//     entity: "XYZ",
//     unitDepartment: "Account Receivable",
//     productClass: "Non",
//     productName: "Others",
//     integrityEthical: true,
//     boardOversight: true,
//     orgStructure: true,
//     commitmentCompetence: false,
//     managementPhilosophy: false,
//     riskType: "Financial Risk",
//     riskDescription: "The customer will return goods more than expected.",
//     severityImpact: "Major",
//     probabilityLikelihood: "Likely",
//     classification: "High",
//     riskResponseType: "Mitigate",
//     controlObjectives:
//       "The return of goods from customer should include the authorization. Company make available a dedicated e-mail box where a request for a return authorization can be submitted. Requests for a Return Authorization (RA) Number may be sent to returns@companyx.com. The following information MUST be included in the message text:\n" +
//       "a) Product description and product quantity being returned. It requires company UPC number/SKU number;\n" +
//       "b) Reason for return;\n" +
//       "c) Name, address, phone/fax number and, if available, an e-mail address of the person to whom the RA is to be sent.",
//     controlDefinition:
//       "Accurately record returns and allowances for all authorized credits in Accounts Receivable.",
//     controlDescription:
//       "Review customers correspondence authorizing returns and allowances.",
//     controlResponsibility: "Financial Controller",
//   },
//   {
//     key: "4",
//     no: "5.4",
//     process: "Offer Discount and allowance on Accounts Receivable collection",
//     processDescription:
//       "Sales discount refers to reduction in the amount due as a result of early payment, hence pertaining to cash discounts.",
//     processObjective:
//       "Encourage timely payment by offering discounts while maintaining control over discount application.",
//     processSeverityLevels: "High",
//     activity: "Offer Discount and allowance to the customer",
//     process2: "Allowing Sales discount and allowance",
//     stage: "Processing",
//     functions: "Finance",
//     clientSegment: "Account Receivable",
//     operationalUnit: "A",
//     division: "C",
//     entity: "XYZ",
//     unitDepartment: "Account Receivable",
//     productClass: "Non",
//     productName: "Others",
//     integrityEthical: false,
//     boardOversight: false,
//     orgStructure: true,
//     commitmentCompetence: true,
//     managementPhilosophy: true,
//     riskType: "Liquidity Risk",
//     riskDescription: "Customers will not pay on time and company will face short of liquidity",
//     severityImpact: "Major",
//     probabilityLikelihood: "Likely",
//     classification: "High",
//     riskResponseType: "Mitigate",
//     controlObjectives:
//       "Develop the sales discount policy and credit sales terms by authorized person and approved by authorities to ensure that customer is paying on time.",
//     controlDefinition:
//       "A sales discount is a price reduction a company offers a customer as an incentive to pay an invoice within a certain time.",
//     controlDescription:
//       "The provision for discounts allowable is likely to be a balance sheet account that serves to reduce the asset account Accounts Receivable. The provision account's counterpart (remember double entry accounting) is an income statement account, such as Sales Discounts or Discounts for xxx.",
//     controlResponsibility: "Financial Controller",
//   },
//   {
//     key: "5",
//     no: "5.5",
//     process: "Estimate the Accounts Receivable Aging Analysis",
//     processDescription:
//       "An accounts receivable aging is a report that lists unpaid customer invoices and unused credit memos by date ranges.",
//     processObjective:
//       "Identify overdue invoices for urgent follow-up and assess collectability.",
//     processSeverityLevels: "High",
//     activity: "Account Receivable Aging Analysis",
//     process2: "A/R Aging Analysis Process",
//     stage: "Processing",
//     functions: "Finance",
//     clientSegment: "Account Receivable",
//     operationalUnit: "A",
//     division: "C",
//     entity: "XYZ",
//     unitDepartment: "Account Receivable",
//     productClass: "Non",
//     productName: "Others",
//     integrityEthical: true,
//     boardOversight: true,
//     orgStructure: false,
//     commitmentCompetence: false,
//     managementPhilosophy: true,
//     riskType: "Liquidity Risk",
//     riskDescription: "Performing of Incorrect Account Receivable Aging Analysis",
//     severityImpact: "Major",
//     probabilityLikelihood: "Likely",
//     classification: "High",
//     riskResponseType: "Mitigate",
//     controlObjectives:
//       "A month‐end Accounts Receivable (A/R) aging report is used to determine the month‐end allowance for doubtful account balance and that customer A/R activity is current and complete. The allowance for doubtful accounts is appropriately calculated and presented in compliance with company policy, procedures, and accounting guidance. The allowance is reviewed for compliance with and consistent application of company methodology. The VP Finance or corporate controller reviews, signs, and dates the detailed schedules and financial disclosures. It should be verified that system controls are designed into the programs and that they are executing as designed. System controls may include matching: the customer's A/R input to other company information such as invoices; returns accepted by the company must equal the amount of returns posted to customer A/R accounts; and cash application totals must equal cash applied to outstanding customer A/R balances.",
//     controlDefinition:
//       "The aging method usually refers to the technique for estimating the amount of a company's accounts receivable.",
//     controlDescription:
//       "Accounts receivable aging, sometimes called accounts receivable reconciliation, is the process of categorizing all the amounts owed by all customers, including the length of time the amounts have been outstanding and unpaid.",
//     controlResponsibility: "Financial Controller",
//   },
//   {
//     key: "6",
//     no: "5.6",
//     process: "Assessing the Allowance for Doubtful Accounts",
//     processDescription:
//       "The allowance for bad debt is an account that needs strong financial controls.",
//     processObjective:
//       "Accurately estimate uncollectible receivables and record appropriate provisions.",
//     processSeverityLevels: "High",
//     activity: "Allowance for Doubtful Accounts Recording",
//     process2: "Allowance for Doubtful Accounts Process",
//     stage: "Processing",
//     functions: "Finance",
//     clientSegment: "Account Receivable",
//     operationalUnit: "A",
//     division: "C",
//     entity: "XYZ",
//     unitDepartment: "Account Receivable",
//     productClass: "Non",
//     productName: "Others",
//     integrityEthical: true,
//     boardOversight: false,
//     orgStructure: true,
//     commitmentCompetence: true,
//     managementPhilosophy: false,
//     riskType: "Liquidity Risk",
//     riskDescription: "The organization will lose the money in case of customer default.",
//     severityImpact: "Major",
//     probabilityLikelihood: "Likely",
//     classification: "High",
//     riskResponseType: "Mitigate",
//     controlObjectives:
//       "Bad Debts – An allowance for doubtful accounts and a write-off policy should be established. Bad debt expense should be estimated based upon a documented method of calculation. An allowance for doubtful accounts should be recorded. Write-offs should be performed periodically to ensure that accounts receivable and allowance balances are not overstated. Efforts should be made to pursue the timely collection of delinquent accounts. Analyze the Account Receivable who has:\n" +
//       "1) long outstanding balance (generally overdue more than 60- 90 days) and\n" +
//       "2) the long outstanding balance is considered material for the purpose of control.\n" +
//       "a) Obtained trade debtor aging listing (by customer) as at the balance sheet date\n" +
//       "b) Pay attention to debtors who have outstanding debts overdue more than 60-90 days (the number of days could be changed according to the industry norm)\n" +
//       "c) Selected the debtors (with significant outstanding long outstanding debts according to the audit materiality of the engagement",
//     controlDefinition:
//       "Bad debt expense recorded in a specific year implies the necessity for write-offs during that year and subsequent years.",
//     controlDescription:
//       "Bad Debts – The allowance for doubtful accounts and a write-off policy should design and approved by appropriate authorities within organization.",
//     controlResponsibility: "Financial Controller",
//   },
//   {
//     key: "7",
//     no: "5.7",
//     process: "Sending statement of account to the customers",
//     processDescription:
//       "A statement of accounts provides customers with a recap of billed products/services and payments made.",
//     processObjective:
//       "Send accurate statements monthly to confirm balances and prompt payment.",
//     processSeverityLevels: "High",
//     activity: "Statement of Account to the Customers",
//     process2: "Statement of Account",
//     stage: "Processing",
//     functions: "Finance",
//     clientSegment: "Account Receivable",
//     operationalUnit: "A",
//     division: "C",
//     entity: "XYZ",
//     unitDepartment: "Account Receivable",
//     productClass: "Non",
//     productName: "Others",
//     integrityEthical: false,
//     boardOversight: true,
//     orgStructure: false,
//     commitmentCompetence: true,
//     managementPhilosophy: true,
//     riskType: "Liquidity Risk",
//     riskDescription: "Inaccurate Statement of Account issued to Customers",
//     severityImpact: "Major",
//     probabilityLikelihood: "Likely",
//     classification: "High",
//     riskResponseType: "Mitigate",
//     controlObjectives:
//       "The statement of accounts should be prepared by an authorized person and approved by designated officials and sent every moth to customers. The statement of accounts is consisting of:\n" +
//       "a) Sales invoices\n" +
//       "b) Sales Return and allowances\n" +
//       "c) Sales Discount and allowances\n" +
//       "d) Cash paid by customer\n" +
//       "e) Remaining balance due\n" +
//       "f) balance due date\n" +
//       "g) Terms of credit.",
//     controlDefinition:
//       "A statement of accounts is a document that reflects all transactions that took place between company and a particular customer for a given period of time.",
//     controlDescription:
//       "A statement of accounts reduces inconsistency in records, the summary report of the statement enables a business owner to check if the customer has paid his dues. This way they can detect the inconsistency in data. The statement can also help the business owner check whether the declared amount due includes the payments made by the customer so far. It can even help catch transactions that have accidentally been run twice.",
//     controlResponsibility: "Financial Controller",
//   },
//   {
//     key: "8",
//     no: "5.8",
//     process: "Cash Receipts from Customers",
//     processDescription:
//       "Recording cash receipts, preparing deposits, and approving adjustments/write-offs.",
//     processObjective:
//       "Separate accounts receivable and cash collection functions to prevent fraud.",
//     processSeverityLevels: "High",
//     activity: "Cash Collection from Customers",
//     process2: "Cash Collection Process",
//     stage: "Processing",
//     functions: "Finance",
//     clientSegment: "Account Receivable",
//     operationalUnit: "A",
//     division: "C",
//     entity: "XYZ",
//     unitDepartment: "Account Receivable",
//     productClass: "Non",
//     productName: "Others",
//     integrityEthical: true,
//     boardOversight: true,
//     orgStructure: true,
//     commitmentCompetence: false,
//     managementPhilosophy: false,
//     riskType: "Liquidity Risk",
//     riskDescription: "Unable to Collect Cash from Customers",
//     severityImpact: "Major",
//     probabilityLikelihood: "Likely",
//     classification: "High",
//     riskResponseType: "Mitigate",
//     controlObjectives:
//       "Once the cash application has been completed for the deposit, the deposit dollar amount is verified and each entry checked. The entry must not have a balance on any invoice where money was applied. Any unapplied cash must be approved by the proper account analyst via e-mail for that remit. Once this has been completed, the cash batch is then given to Credit Manager or someone assigned to check and log the batch, which is then posted.",
//     controlDefinition:
//       "Ensure physical controls over cash receipts are adequate (for example, prelist receipts, restrictive endorsements, daily deposits, reconciliation of book receipts with prelisted deposits, comparison of cash records with deposit slips and bank statements). The procedures that describe the responsibilities of every employee authorized to handle cash.",
//     controlDescription:
//       "To define policies and procedures for correctly dealing with and recording receipts of cash.",
//     controlResponsibility: "Financial Controller",
//   },
//   {
//     key: "9",
//     no: "5.9",
//     process: "Preparation of the Account Receivable Voucher Package",
//     processDescription:
//       "The Account Receivable Voucher Package verifies supporting documents: date, amount, transaction nature.",
//     processObjective:
//       "Ensure all receipts are authorized and supported by valid documents.",
//     processSeverityLevels: "High",
//     activity: "Vouching",
//     process2: "Voucher Processing",
//     stage: "Processing",
//     functions: "Finance",
//     clientSegment: "Account Receivable",
//     operationalUnit: "A",
//     division: "C",
//     entity: "XYZ",
//     unitDepartment: "Account Receivable",
//     productClass: "Non",
//     productName: "Others",
//     integrityEthical: false,
//     boardOversight: false,
//     orgStructure: true,
//     commitmentCompetence: true,
//     managementPhilosophy: true,
//     riskType: "Liquidity Risk",
//     riskDescription: "Unauthorized/unapproved/inaccurate voucher prepared",
//     severityImpact: "Major",
//     probabilityLikelihood: "Likely",
//     classification: "High",
//     riskResponseType: "Mitigate",
//     controlObjectives:
//       "The Account Receivable voucher sheet should be prepared and a package called the \"voucher package\" should be assembled with the following documents:\n" +
//       "a) Vendor invoices.\n" +
//       "b) Packing slip\n" +
//       "c) Sales order.\n" +
//       "d) Receiving report",
//     controlDefinition:
//       "The Accounts Receivable Voucher Package is prepared to ensures that every receipt is properly authorized and that the goods or services sold; cash are actually received.",
//     controlDescription:
//       "The Accounts Receivable Voucher Package is a document used by a company’s Accounts Receivable department to gather and file all of the supporting documents needed to approve the collection of receipts.",
//     controlResponsibility: "Financial Controller",
//   },
//   {
//     key: "10",
//     no: "5.10",
//     process: "Procedures Performed on Account Receivable Voucher Package",
//     processDescription:
//       "Record in Voucher Register, generate report of largest amounts received.",
//     processObjective:
//       "Each voucher relates to one invoice, debit/credit note issued to customer.",
//     processSeverityLevels: "High",
//     activity: "Vouching",
//     process2: "Voucher Processing",
//     stage: "Processing",
//     functions: "Finance",
//     clientSegment: "Account Receivable",
//     operationalUnit: "A",
//     division: "C",
//     entity: "XYZ",
//     unitDepartment: "Account Receivable",
//     productClass: "Non",
//     productName: "Others",
//     integrityEthical: true,
//     boardOversight: true,
//     orgStructure: false,
//     commitmentCompetence: false,
//     managementPhilosophy: true,
//     riskType: "Liquidity Risk",
//     riskDescription:
//       "Excessive price or insufficient quantities on voucher cause production delays.",
//     severityImpact: "Major",
//     probabilityLikelihood: "Likely",
//     classification: "High",
//     riskResponseType: "Mitigate",
//     controlObjectives:
//       "Account Receivable Voucher Register record the invoice in the Sales Journal. The project and office managers must approve Accounts Receivable invoices before they are sent to the customers. With each invoice, the project and office managers should review a job cost report, where applicable, for reasonableness to ensure that the current invoice amount is appropriate in relation to job costs incurred to date.",
//     controlDefinition:
//       "The voucher is essentially the backup documents for accounts payable, which are bills owed by companies to vendors and suppliers.",
//     controlDescription:
//       "To ensure that orders are placed and deliveries are scheduled in accordance with the organization’s ordering schedule in order to facilitate effective and efficient ordering and receiving processes.",
//     controlResponsibility: "Financial Controller",
//   },
//   {
//     key: "11",
//     no: "5.11",
//     process: "Review accounts receivable journal entries",
//     processDescription:
//       "Journal entries are properly approved and recorded completely and accurately.",
//     processObjective:
//       "Ensure data remains complete, accurate, and valid during processing and storage.",
//     processSeverityLevels: "High",
//     activity: "Perform Journal Entries",
//     process2: "Journalizing Process",
//     stage: "Processing",
//     functions: "Finance",
//     clientSegment: "Account Receivable",
//     operationalUnit: "A",
//     division: "C",
//     entity: "XYZ",
//     unitDepartment: "Account Receivable",
//     productClass: "Non",
//     productName: "Others",
//     integrityEthical: true,
//     boardOversight: false,
//     orgStructure: true,
//     commitmentCompetence: true,
//     managementPhilosophy: false,
//     riskType: "Liquidity Risk",
//     riskDescription:
//       "Recording unapproved and inaccurate Invoice without 3-way check.",
//     severityImpact: "Major",
//     probabilityLikelihood: "Likely",
//     classification: "High",
//     riskResponseType: "Mitigate",
//     controlObjectives:
//       "After the voucher package is complete, the customer invoice is ready for recording. The following information should be entered into the voucher register or Sales Journal. (Voucher register and Sales journals are similar type accounting records. The sales journal is more commonly used in manual systems.)\n" +
//       "a) Voucher number\n" +
//       "b) Vendor name\n" +
//       "c) customer invoice number\n" +
//       "d) Date of customer invoice\n" +
//       "e) Amount of invoice\n" +
//       "f) General ledger account\n" +
//       "g) Date invoice is to be received\n" +
//       "h) Discount, if applicable",
//     controlDefinition:
//       "A similar use of control totals can be accomplished by arithmetically proving that the ending amount of Account Receivable is equal to the sum of the beginning balance, plus posted sales invoice amounts, less cash received.",
//     controlDescription:
//       "Ensure accuracy over invoice processing and receipt in order to prevent duplication records.",
//     controlResponsibility: "Financial Controller",
//   },
//   {
//     key: "12",
//     no: "5.12",
//     process:
//       "Reconciliation of Account Receivable Sub-ledger to Account Receivable General Ledger",
//     processDescription:
//       "Match detailed unpaid billings to general ledger total.",
//     processObjective:
//       "Prove that the general ledger A/R balance is justified by sub-ledger details.",
//     processSeverityLevels: "High",
//     activity: "Reconciliation",
//     process2: "Comparison of A/R SL to GL",
//     stage: "Processing",
//     functions: "Finance",
//     clientSegment: "Account Receivable",
//     operationalUnit: "A",
//     division: "C",
//     entity: "XYZ",
//     unitDepartment: "Account Receivable",
//     productClass: "Non",
//     productName: "Others",
//     integrityEthical: false,
//     boardOversight: true,
//     orgStructure: false,
//     commitmentCompetence: true,
//     managementPhilosophy: true,
//     riskType: "Liquidity Risk",
//     riskDescription: "The risk of inaccurate financial reporting.",
//     severityImpact: "Major",
//     probabilityLikelihood: "Likely",
//     classification: "High",
//     riskResponseType: "Mitigate",
//     controlObjectives:
//       "Reconciliation of Account Receivable Sub-ledger to Account Receivable General Ledger should be performed by authorized person. Resolving the reconciliation following are considered.\n" +
//       "a) Pre-number and account for shipping documents and sales invoices.\n" +
//       "b) Match orders, shipping documents, and invoices, and follow through on missing or inconsistent information.\n" +
//       "c) Mail customer statements periodically, and investigate and resolve disputes or inquiries, by individuals independent of the invoicing function.\n" +
//       "d) Monitor number of customer complaints regarding improper invoices or statements (performance indicator).",
//     controlDefinition:
//       "Reconciliation of the general ledger to sub-ledgers is another type we will review. The general ledger (or simply \"ledger\" or \"G/L\") is a collection of all balance sheet and income statement accounts. The general ledger also includes all journal entries posted to accounts. In nowadays' computerized world, the ledger is maintained in an electronic form.",
//     controlDescription:
//       "A sub-ledger is a detailed record of transactions for an individual account. Usually, a sub-ledger contains detail of transactions for an account, which are summarized by day (or month) and the total is then posted to the general ledger. Therefore, sub-ledgers serve as support for amounts posted to the general ledger. Sub-ledgers are presented in an electronic form as well. For example, accounts receivable sub-ledger may contain detail for all issued invoices and cash receipts. At the end of a day, an accountant can summarize all invoices issued (sales) and cash receipts (cash collections) and post them to the general ledger in two separate journal entries. The general ledger would not contain detail for each individual transaction.",
//     controlResponsibility: "Financial Controller",
//   },
// ];
// export const controlAssessmentData = [
//   {
//      key: "1",
//     no: "5.1",
//     process: "Establishing Account Receivable",
//     levelResponsibility: "Activity Level",
//     cosoPrinciple: "10.  Selects and develops control activities",
//     operationalApproach: "Manual",
//     operationalFrequency: "Daily",
//     controlClassification: "Preventive"
//   },
//   {
//     key: "2",
//     no: "5.2",
//     process: "Establishment of Account Receivable Control Devices",
//     levelResponsibility: "Activity Level",
//     cosoPrinciple: "10.  Selects and develops control activities",
//     operationalApproach: "Manual",
//     operationalFrequency: "Daily",
//     controlClassification: "Preventive Control"
//   },
//   {
//     key: "3",
//     no: "5.3",
//     process: "Returns and allowances from customer",
//     levelResponsibility: "Activity Level",
//     cosoPrinciple: "10.  Selects and develops control activities",
//     operationalApproach: "Automated",
//     operationalFrequency: "Daily",
//     controlClassification: "Preventive Control"
//   },
//   {
//     key: "4",
//    no: "5.4",
//     process: "Offer Discount and allowance on Accounts Receivable collection",
//     levelResponsibility: "Activity Level",
//     cosoPrinciple: "10.  Selects and develops control activities",
//     operationalApproach: "Automated",
//     operationalFrequency: "Daily",
//     controlClassification: "Preventive Control"
//   },
//   {
//     key: "5",
//     no: "5.5",
//     process: "Estimate the Accounts Receivable Aging Analysis",
//     levelResponsibility: "Activity Level",
//     cosoPrinciple: "10.  Selects and develops control activities",
//     operationalApproach: "Automated",
//     operationalFrequency: "Daily",
//     controlClassification: "Preventive Control"
//   },
//   {
//     key: "6",
//     no: "5.6",
//     process: "Assessing the Allowance for Doubtful Accounts",
//     levelResponsibility: "Activity Level",
//     cosoPrinciple: "10.  Selects and develops control activities",
//     operationalApproach: "Automated",
//     operationalFrequency: "Daily",
//     controlClassification: "Preventive Control"
//   },
//   {
//     key: "7",
//     no: "5.7",
//     process: "Sending statement of account to the customers",
//     levelResponsibility: "Activity Level",
//     cosoPrinciple: "10.  Selects and develops control activities",
//     operationalApproach: "Automated",
//     operationalFrequency: "Daily",
//     controlClassification: "Preventive Control"
//   },
//   {
//     key: "8",
//    no: "5.8",
//     process: "Cash Receipts from Customers",
//     levelResponsibility: "",
//     cosoPrinciple: "10.  Selects and develops control activities",
//     operationalApproach: "Automated",
//     operationalFrequency: "Daily",
//     controlClassification: "Preventive Control"
//   },
//   {
//     key: "9",
//     no: "5.9",
//     process: "Preparation of the Account Receivable Voucher Package",
//     levelResponsibility: "Activity Level",
//     cosoPrinciple: "10.  Selects and develops control activities",
//     operationalApproach: "Manual",
//     operationalFrequency: "Daily",
//     controlClassification: "Preventive Control"
//   },
//   {
//     key: "10",
//    no: "5.10",
//     process: "Procedures Performed on Account Receivable Voucher Package",
//     levelResponsibility: "Activity Level",
//     cosoPrinciple: "10.  Selects and develops control activities",
//     operationalApproach: "Manual",
//     operationalFrequency: "Daily",
//     controlClassification: "Preventive Control"
//   },
//   {
//     key: "11",
//    no: "5.11",
//     process: "Review accounts receivable journal entries",
//     levelResponsibility: "Activity Level",
//     cosoPrinciple: "10.  Selects and develops control activities",
//     operationalApproach: "Automated",
//     operationalFrequency: "Daily",
//     controlClassification: "Preventive Control"
//   },
//   {
//     key: "12",
//    no: "5.12",
//     process:
//       "Reconciliation of Account Receivable Sub-ledger to Account Receivable General Ledger",
//     levelResponsibility: "Activity Level",
//     cosoPrinciple: "10.  Selects and develops control activities",
//     operationalApproach: "Manual",
//     operationalFrequency: "Monthly",
//     controlClassification: "Detective Control"
//   }
// ];
// export const financialAssertionsData = [
//   {
//     key: "1",
//     no: "5.1",
//     process: "Establishing Account Receivable",
//     soxControlActivity: "Financial Controller",
//     internalControlFinancial: true,
//     occurrence: true,
//     completeness: true,
//     accuracy: true,
//     authorization: true,
//     cutoff: true,
//     classificationSOX: true,
//     existence: true,
//     rightsObligations: true,
//     valuationAllocation: true,
//     presentationDisclosure: true
//   },
//   {
//     key: "2",
//     no: "5.2",
//     process: "Establishment of Account Receivable Control Devices",
//     soxControlActivity: "Financial Controller",
//     internalControlFinancial: true,
//     occurrence: true,
//     completeness: true,
//     accuracy: true,
//     authorization: true,
//     cutoff: true,
//     classificationSOX: true,
//     existence: true,
//     rightsObligations: true,
//     valuationAllocation: true,
//     presentationDisclosure: true
//   },
//   {
//     key: "3",
//     no: "5.3",
//     process: "Returns and allowances from customer",
//     soxControlActivity: "Financial Controller",
//     internalControlFinancial: true,
//     occurrence: true,
//     completeness: true,
//     accuracy: true,
//     authorization: true,
//     cutoff: true,
//     classificationSOX: true,
//     existence: true,
//     rightsObligations: true,
//     valuationAllocation: true,
//     presentationDisclosure: true
//   },
//   {
//     key: "4",
//     no: "5.4",
//     process: "Offer Discount and allowance on Accounts Receivable collection",
//     soxControlActivity: "Financial Controller",
//     internalControlFinancial: true,
//     occurrence: true,
//     completeness: true,
//     accuracy: true,
//     authorization: true,
//     cutoff: true,
//     classificationSOX: true,
//     existence: true,
//     rightsObligations: true,
//     valuationAllocation: true,
//     presentationDisclosure: true
//   },
//   {
//     key: "5",
//     no: "5.5",
//     process: "Estimate the Accounts Receivable Aging Analysis",
//     soxControlActivity: "Financial Controller",
//     internalControlFinancial: true,
//     occurrence: true,
//     completeness: true,
//     accuracy: true,
//     authorization: true,
//     cutoff: true,
//     classificationSOX: true,
//     existence: true,
//     rightsObligations: true,
//     valuationAllocation: true,
//     presentationDisclosure: true
//   },
//   {
//     key: "6",
//     no: "5.6",
//     process: "Assessing the Allowance for Doubtful Accounts",
//     soxControlActivity: "Financial Controller",
//     internalControlFinancial: true,
//     occurrence: true,
//     completeness: true,
//     accuracy: true,
//     authorization: true,
//     cutoff: true,
//     classificationSOX: true,
//     existence: true,
//     rightsObligations: true,
//     valuationAllocation: true,
//     presentationDisclosure: true
//   },
//   {
//     key: "7",
//     no: "5.7",
//     process: "Sending statement of account to the customers",
//     soxControlActivity: "Financial Controller",
//     internalControlFinancial: true,
//     occurrence: true,
//     completeness: true,
//     accuracy: true,
//     authorization: true,
//     cutoff: true,
//     classificationSOX: true,
//     existence: true,
//     rightsObligations: true,
//     valuationAllocation: true,
//     presentationDisclosure: true
//   },
//   {
//     key: "8",
//     no: "5.8",
//     process: "Cash Receipts from Customers",
//     soxControlActivity: "Financial Controller",
//     internalControlFinancial: true,
//     occurrence: true,
//     completeness: true,
//     accuracy: true,
//     authorization: true,
//     cutoff: true,
//     classificationSOX: true,
//     existence: true,
//     rightsObligations: true,
//     valuationAllocation: true,
//     presentationDisclosure: true
//   },
//   {
//     key: "9",
//     no: "5.9",
//     process: "Preparation of the Account Receivable Voucher Package",
//     soxControlActivity: "Financial Controller",
//     internalControlFinancial: true,
//     occurrence: true,
//     completeness: true,
//     accuracy: true,
//     authorization: true,
//     cutoff: true,
//     classificationSOX: true,
//     existence: true,
//     rightsObligations: true,
//     valuationAllocation: true,
//     presentationDisclosure: true
//   },
//   {
//     key: "10",
//     no: "5.10",
//     process: "Procedures Performed on Account Receivable Voucher Package",
//     soxControlActivity: "Financial Controller",
//     internalControlFinancial: true,
//     occurrence: true,
//     completeness: true,
//     accuracy: true,
//     authorization: true,
//     cutoff: true,
//     classificationSOX: true,
//     existence: true,
//     rightsObligations: true,
//     valuationAllocation: true,
//     presentationDisclosure: true
//   },
//   {
//     key: "11",
//     no: "5.11",
//     process: "Review accounts receivable journal entries",
//     soxControlActivity: "Financial Controller",
//     internalControlFinancial: true,
//     occurrence: true,
//     completeness: true,
//     accuracy: true,
//     authorization: true,
//     cutoff: true,
//     classificationSOX: true,
//     existence: true,
//     rightsObligations: true,
//     valuationAllocation: true,
//     presentationDisclosure: true
//   },
//   {
//     key: "12",
//     no: "5.12",
//     process: "Reconciliation of Account Receivable Sub-ledger to Account Receivable General Ledger",
//     soxControlActivity: "Financial Controller",
//     internalControlFinancial: true,
//     occurrence: true,
//     completeness: true,
//     accuracy: true,
//     authorization: true,
//     cutoff: true,
//     classificationSOX: true,
//     existence: true,
//     rightsObligations: true,
//     valuationAllocation: true,
//     presentationDisclosure: true
//   }
// ];
// // ...existing code...
// export const internalAuditData: DataType[] = [
//   { key: "1", no: "5.1", process: "Establishing Account Receivable", internalAuditTest: "To inquiry establishment of Account Receivable procedure is usually performed together with other procedures, such as inspecting the supporting documents or observing the client’s staff performing the controls, in order to ensure that the explanation given by the client’s staff or management is true.", check: false, sampleSize: "" },
//   { key: "2", no: "5.2", process: "Establishment of Account Receivable Control Devices", internalAuditTest: "Reviewed", check: false, sampleSize: "" },
//   { key: "3", no: "5.3", process: "Returns and allowances from customer", internalAuditTest: "Check the appropriate Returns Receiving Report to see if the invoice number is listed. If the entire invoice is being returned, there is no need to call on the invoice, as the customer will not be paying it. If only part of the invoice is returned, and call the customer to find out the payment status of the remaining balance.", check: false, sampleSize: "" },
//   { key: "4", no: "5.4", process: "Offer Discount and allowance on Accounts Receivable collection", internalAuditTest: "Review the sales discount report and match with company credit terms and company discount policy and obtain on the customer list, who availed the discount sample basis and perform analytical procedure to find inconsistency if any in the customer individual accounts. ", check: false, sampleSize: "" },
//   { key: "5", no: "5.5", process: "Estimate the Accounts Receivable Aging Analysis", internalAuditTest: "An auditor will use several techniques to determine whether the allowance for doubtful accounts appears reasonable. Most begin with the company’s aging schedule. The older a receivable is, the harder it will be to collect.", check: false, sampleSize: "" },
//   { key: "6", no: "5.6", process: "Assessing the Allowance for Doubtful Accounts", internalAuditTest: "Thoroughly review allowance computations to see if they are consistent with prior years; compare allowance percentages to industry averages; agree to supporting documentation (e.g., histories of uncollectible amounts); recompute the related numbers. ", check: false, sampleSize: "" },
//   { key: "7", no: "5.7", process: "Sending statement of account to the customers", internalAuditTest: "Obtain the statement of accounts and match with customer individual ledger account on sample basis and ensure the accuracy. ", check: false, sampleSize: "" },
//   { key: "8", no: "5.8", process: "Cash Receipts from Customers", internalAuditTest: "Periodically trace a selection of cash receipts to customer invoices to verify proper cash application.", check: false, sampleSize: "" },
//   { key: "9", no: "5.9", process: "Preparation of the Account Receivable Voucher Package", internalAuditTest: "Obtain the sample of Account Receivable and vouch them to the supporting documents, such as customer orders and sales invoices.", check: false, sampleSize: "" },
//   { key: "10", no: "5.10", process: "Procedures Performed on Account Receivable Voucher Package", internalAuditTest: "Check the authorized approval of Account Receivable voucher package and related general account distribution and Perform Account Receivable confirmation on a sample of customer", check: false, sampleSize: "" },
//   { key: "11", no: "5.11", process: "Review accounts receivable journal entries", internalAuditTest: "Review on sample basis whether Sales invoice is approved and recorded in Voucher Register or Sales Journal by the authorized person.", check: false, sampleSize: "" },
//   { key: "12", no: "5.12", process: "Reconciliation of Account Receivable Sub-ledger to Account Receivable General Ledger", internalAuditTest: "Assessment of accounts receivable reconciliation statement on a sample basis to verify agreement between accounts receivable subsidiary ledger and receivable general ledger account (control account). ", check: false, sampleSize: "" }
// ];
import { DataType } from "./types";
export const data: DataType[] = [
  {
    key: "1",
    no: "5.1",
    process: "Establishing Account Receivable",
    processDescription:
      "This Account Receivable recording policy establishes guidelines relating to receivable management, in particular how and when to reserve a receivable, write-off a receivable, and recover a receivable.",
    processObjective:
      "The objective of this Account Receivable recording policy is to ensure consistency in Company’s accounting treatment of receivables. Accurately record invoices on a timely basis for all accepted sales that have been authorized.",
    processSeverityLevels: "Critical",
    activity: "Account Receivable Processing",
    process2: "Account Receivable Recording",
    stage: "Initiation",
    functions: "Finance",
    clientSegment: "Account Receivable",
    operationalUnit: "A",
    division: "C",
    entity: "XYZ",
    unitDepartment: "Account Receivable",
    productClass: "Non",
    productName: "Others",
    integrityEthical: true,
    boardOversight: false,
    orgStructure: true,
    commitmentCompetence: true,
    managementPhilosophy: false,
    riskType: "Liquidity Risk",
    riskDescription: "Inaccurately Recording Account Receivable",
    severityImpact: "Catastrophic",
    probabilityLikelihood: "Certain",
    classification: "Critical",
    riskResponseType: "Mitigate",
    controlObjectives:
      "The project and office managers must approve Accounts Receivable invoices before they are sent to the customers. With each invoice, the project and office managers should review a job cost report, where applicable, for reasonableness to ensure that the current invoice amount is appropriate in relation to job costs incurred to date.",
    controlDefinition:
      "All valid Account Receivable transactions and only those transactions, should be accurately.",
    controlDescription:
      "Company’s authorized office are responsible for processing Accounts Receivable invoices. When possible, invoicing should be done on a daily basis. At a minimum, invoicing should be done once a week.",
    controlResponsibility: "Financial Controller",
  },
  {
    key: "2",
    no: "5.2",
    process: "Establishment of Account Receivable Control Devices",
    processDescription:
      "Review the accuracy over sales invoice processing and receipt in order to prevent duplicate recording of cash collection.",
    processObjective:
      "Ensure accuracy in sales invoice processing and prevent duplicate recording of cash collections.",
    processSeverityLevels: "High",
    activity: "Accuracy of Invoice Processing",
    process2: "Invoicing",
    stage: "Processing",
    functions: "Finance",
    clientSegment: "Retail",
    operationalUnit: "A",
    division: "C",
    entity: "XYZ",
    unitDepartment: "Account Receivable",
    productClass: "Non",
    productName: "Others",
    integrityEthical: false,
    boardOversight: true,
    orgStructure: false,
    commitmentCompetence: true,
    managementPhilosophy: true,
    riskType: "Liquidity Risk",
    riskDescription: "A misstatement in Account Receivable due to delay recording",
    severityImpact: "Major",
    probabilityLikelihood: "Likely",
    classification: "High",
    riskResponseType: "Mitigate",
    controlObjectives:
      "Accounts Receivable control are established and verifying the existence of Account Receivable.\n" +
      "a) Use standard shipping or contract terms.\n" +
      "b) Communicate nonstandard shipping or contract terms to accounts receivable.\n" +
      "c) Verify shipping or contract terms before invoice processing.",
    controlDefinition:
      "Establish the validity and legitimacy of Account Receivable transactions by reaching to customers.",
    controlDescription:
      "Ensure the accuracy in Account Receivable process.",
    controlResponsibility: "Financial Controller",
  },
  {
    key: "3",
    no: "5.3",
    process: "Returns and allowances from customer",
    processDescription:
      "Accurately record all authorized sales returns and allowances and only such returns and allowances.",
    processObjective:
      "Returns of goods from customer should be adequately controlled, documented, and recorded.",
    processSeverityLevels: "High",
    activity: "Sales Return",
    process2: "Handling of Sales Return",
    stage: "Processing",
    functions: "Finance",
    clientSegment: "Account Receivable",
    operationalUnit: "A",
    division: "C",
    entity: "XYZ",
    unitDepartment: "Account Receivable",
    productClass: "Non",
    productName: "Others",
    integrityEthical: true,
    boardOversight: true,
    orgStructure: true,
    commitmentCompetence: false,
    managementPhilosophy: false,
    riskType: "Financial Risk",
    riskDescription: "The customer will return goods more than expected.",
    severityImpact: "Major",
    probabilityLikelihood: "Likely",
    classification: "High",
    riskResponseType: "Mitigate",
    controlObjectives:
      "The return of goods from customer should include the authorization. Company make available a dedicated e-mail box where a request for a return authorization can be submitted. Requests for a Return Authorization (RA) Number may be sent to returns@companyx.com. The following information MUST be included in the message text:\n" +
      "a) Product description and product quantity being returned. It requires company UPC number/SKU number;\n" +
      "b) Reason for return;\n" +
      "c) Name, address, phone/fax number and, if available, an e-mail address of the person to whom the RA is to be sent.",
    controlDefinition:
      "Accurately record returns and allowances for all authorized credits in Accounts Receivable.",
    controlDescription:
      "Review customers correspondence authorizing returns and allowances.",
    controlResponsibility: "Financial Controller",
  },
  {
    key: "4",
    no: "5.4",
    process: "Offer Discount and allowance on Accounts Receivable collection",
    processDescription:
      "Sales discount refers to reduction in the amount due as a result of early payment, hence pertaining to cash discounts.",
    processObjective:
      "Encourage timely payment by offering discounts while maintaining control over discount application.",
    processSeverityLevels: "High",
    activity: "Offer Discount and allowance to the customer",
    process2: "Allowing Sales discount and allowance",
    stage: "Processing",
    functions: "Finance",
    clientSegment: "Account Receivable",
    operationalUnit: "A",
    division: "C",
    entity: "XYZ",
    unitDepartment: "Account Receivable",
    productClass: "Non",
    productName: "Others",
    integrityEthical: false,
    boardOversight: false,
    orgStructure: true,
    commitmentCompetence: true,
    managementPhilosophy: true,
    riskType: "Liquidity Risk",
    riskDescription: "Customers will not pay on time and company will face short of liquidity",
    severityImpact: "Major",
    probabilityLikelihood: "Likely",
    classification: "High",
    riskResponseType: "Mitigate",
    controlObjectives:
      "Develop the sales discount policy and credit sales terms by authorized person and approved by authorities to ensure that customer is paying on time.",
    controlDefinition:
      "A sales discount is a price reduction a company offers a customer as an incentive to pay an invoice within a certain time.",
    controlDescription:
      "The provision for discounts allowable is likely to be a balance sheet account that serves to reduce the asset account Accounts Receivable. The provision account's counterpart (remember double entry accounting) is an income statement account, such as Sales Discounts or Discounts for xxx.",
    controlResponsibility: "Financial Controller",
  },
  {
    key: "5",
    no: "5.5",
    process: "Estimate the Accounts Receivable Aging Analysis",
    processDescription:
      "An accounts receivable aging is a report that lists unpaid customer invoices and unused credit memos by date ranges.",
    processObjective:
      "Identify overdue invoices for urgent follow-up and assess collectability.",
    processSeverityLevels: "High",
    activity: "Account Receivable Aging Analysis",
    process2: "A/R Aging Analysis Process",
    stage: "Processing",
    functions: "Finance",
    clientSegment: "Account Receivable",
    operationalUnit: "A",
    division: "C",
    entity: "XYZ",
    unitDepartment: "Account Receivable",
    productClass: "Non",
    productName: "Others",
    integrityEthical: true,
    boardOversight: true,
    orgStructure: false,
    commitmentCompetence: false,
    managementPhilosophy: true,
    riskType: "Liquidity Risk",
    riskDescription: "Performing of Incorrect Account Receivable Aging Analysis",
    severityImpact: "Major",
    probabilityLikelihood: "Likely",
    classification: "High",
    riskResponseType: "Mitigate",
    controlObjectives:
      "A month‐end Accounts Receivable (A/R) aging report is used to determine the month‐end allowance for doubtful account balance and that customer A/R activity is current and complete. The allowance for doubtful accounts is appropriately calculated and presented in compliance with company policy, procedures, and accounting guidance. The allowance is reviewed for compliance with and consistent application of company methodology. The VP Finance or corporate controller reviews, signs, and dates the detailed schedules and financial disclosures. It should be verified that system controls are designed into the programs and that they are executing as designed. System controls may include matching: the customer's A/R input to other company information such as invoices; returns accepted by the company must equal the amount of returns posted to customer A/R accounts; and cash application totals must equal cash applied to outstanding customer A/R balances.",
    controlDefinition:
      "The aging method usually refers to the technique for estimating the amount of a company's accounts receivable.",
    controlDescription:
      "Accounts receivable aging, sometimes called accounts receivable reconciliation, is the process of categorizing all the amounts owed by all customers, including the length of time the amounts have been outstanding and unpaid.",
    controlResponsibility: "Financial Controller",
  },
  {
    key: "6",
    no: "5.6",
    process: "Assessing the Allowance for Doubtful Accounts",
    processDescription:
      "The allowance for bad debt is an account that needs strong financial controls.",
    processObjective:
      "Accurately estimate uncollectible receivables and record appropriate provisions.",
    processSeverityLevels: "High",
    activity: "Allowance for Doubtful Accounts Recording",
    process2: "Allowance for Doubtful Accounts Process",
    stage: "Processing",
    functions: "Finance",
    clientSegment: "Account Receivable",
    operationalUnit: "A",
    division: "C",
    entity: "XYZ",
    unitDepartment: "Account Receivable",
    productClass: "Non",
    productName: "Others",
    integrityEthical: true,
    boardOversight: false,
    orgStructure: true,
    commitmentCompetence: true,
    managementPhilosophy: false,
    riskType: "Liquidity Risk",
    riskDescription: "The organization will lose the money in case of customer default.",
    severityImpact: "Major",
    probabilityLikelihood: "Likely",
    classification: "High",
    riskResponseType: "Mitigate",
    controlObjectives:
      "Bad Debts – An allowance for doubtful accounts and a write-off policy should be established. Bad debt expense should be estimated based upon a documented method of calculation. An allowance for doubtful accounts should be recorded. Write-offs should be performed periodically to ensure that accounts receivable and allowance balances are not overstated. Efforts should be made to pursue the timely collection of delinquent accounts. Analyze the Account Receivable who has:\n" +
      "1) long outstanding balance (generally overdue more than 60- 90 days) and\n" +
      "2) the long outstanding balance is considered material for the purpose of control.\n" +
      "a) Obtained trade debtor aging listing (by customer) as at the balance sheet date\n" +
      "b) Pay attention to debtors who have outstanding debts overdue more than 60-90 days (the number of days could be changed according to the industry norm)\n" +
      "c) Selected the debtors (with significant outstanding long outstanding debts according to the audit materiality of the engagement",
    controlDefinition:
      "Bad debt expense recorded in a specific year implies the necessity for write-offs during that year and subsequent years.",
    controlDescription:
      "Bad Debts – The allowance for doubtful accounts and a write-off policy should design and approved by appropriate authorities within organization.",
    controlResponsibility: "Financial Controller",
  },
  {
    key: "7",
    no: "5.7",
    process: "Sending statement of account to the customers",
    processDescription:
      "A statement of accounts provides customers with a recap of billed products/services and payments made.",
    processObjective:
      "Send accurate statements monthly to confirm balances and prompt payment.",
    processSeverityLevels: "High",
    activity: "Statement of Account to the Customers",
    process2: "Statement of Account",
    stage: "Processing",
    functions: "Finance",
    clientSegment: "Account Receivable",
    operationalUnit: "A",
    division: "C",
    entity: "XYZ",
    unitDepartment: "Account Receivable",
    productClass: "Non",
    productName: "Others",
    integrityEthical: false,
    boardOversight: true,
    orgStructure: false,
    commitmentCompetence: true,
    managementPhilosophy: true,
    riskType: "Liquidity Risk",
    riskDescription: "Inaccurate Statement of Account issued to Customers",
    severityImpact: "Major",
    probabilityLikelihood: "Likely",
    classification: "High",
    riskResponseType: "Mitigate",
    controlObjectives:
      "The statement of accounts should be prepared by an authorized person and approved by designated officials and sent every moth to customers. The statement of accounts is consisting of:\n" +
      "a) Sales invoices\n" +
      "b) Sales Return and allowances\n" +
      "c) Sales Discount and allowances\n" +
      "d) Cash paid by customer\n" +
      "e) Remaining balance due\n" +
      "f) balance due date\n" +
      "g) Terms of credit.",
    controlDefinition:
      "A statement of accounts is a document that reflects all transactions that took place between company and a particular customer for a given period of time.",
    controlDescription:
      "A statement of accounts reduces inconsistency in records, the summary report of the statement enables a business owner to check if the customer has paid his dues. This way they can detect the inconsistency in data. The statement can also help the business owner check whether the declared amount due includes the payments made by the customer so far. It can even help catch transactions that have accidentally been run twice.",
    controlResponsibility: "Financial Controller",
  },
  {
    key: "8",
    no: "5.8",
    process: "Cash Receipts from Customers",
    processDescription:
      "Recording cash receipts, preparing deposits, and approving adjustments/write-offs.",
    processObjective:
      "Separate accounts receivable and cash collection functions to prevent fraud.",
    processSeverityLevels: "High",
    activity: "Cash Collection from Customers",
    process2: "Cash Collection Process",
    stage: "Processing",
    functions: "Finance",
    clientSegment: "Account Receivable",
    operationalUnit: "A",
    division: "C",
    entity: "XYZ",
    unitDepartment: "Account Receivable",
    productClass: "Non",
    productName: "Others",
    integrityEthical: true,
    boardOversight: true,
    orgStructure: true,
    commitmentCompetence: false,
    managementPhilosophy: false,
    riskType: "Liquidity Risk",
    riskDescription: "Unable to Collect Cash from Customers",
    severityImpact: "Major",
    probabilityLikelihood: "Likely",
    classification: "High",
    riskResponseType: "Mitigate",
    controlObjectives:
      "Once the cash application has been completed for the deposit, the deposit dollar amount is verified and each entry checked. The entry must not have a balance on any invoice where money was applied. Any unapplied cash must be approved by the proper account analyst via e-mail for that remit. Once this has been completed, the cash batch is then given to Credit Manager or someone assigned to check and log the batch, which is then posted.",
    controlDefinition:
      "Ensure physical controls over cash receipts are adequate (for example, prelist receipts, restrictive endorsements, daily deposits, reconciliation of book receipts with prelisted deposits, comparison of cash records with deposit slips and bank statements). The procedures that describe the responsibilities of every employee authorized to handle cash.",
    controlDescription:
      "To define policies and procedures for correctly dealing with and recording receipts of cash.",
    controlResponsibility: "Financial Controller",
  },
  {
    key: "9",
    no: "5.9",
    process: "Preparation of the Account Receivable Voucher Package",
    processDescription:
      "The Account Receivable Voucher Package verifies supporting documents: date, amount, transaction nature.",
    processObjective:
      "Ensure all receipts are authorized and supported by valid documents.",
    processSeverityLevels: "High",
    activity: "Vouching",
    process2: "Voucher Processing",
    stage: "Processing",
    functions: "Finance",
    clientSegment: "Account Receivable",
    operationalUnit: "A",
    division: "C",
    entity: "XYZ",
    unitDepartment: "Account Receivable",
    productClass: "Non",
    productName: "Others",
    integrityEthical: false,
    boardOversight: false,
    orgStructure: true,
    commitmentCompetence: true,
    managementPhilosophy: true,
    riskType: "Liquidity Risk",
    riskDescription: "Unauthorized/unapproved/inaccurate voucher prepared",
    severityImpact: "Major",
    probabilityLikelihood: "Likely",
    classification: "High",
    riskResponseType: "Mitigate",
    controlObjectives:
      "The Account Receivable voucher sheet should be prepared and a package called the \"voucher package\" should be assembled with the following documents:\n" +
      "a) Vendor invoices.\n" +
      "b) Packing slip\n" +
      "c) Sales order.\n" +
      "d) Receiving report",
    controlDefinition:
      "The Accounts Receivable Voucher Package is prepared to ensures that every receipt is properly authorized and that the goods or services sold; cash are actually received.",
    controlDescription:
      "The Accounts Receivable Voucher Package is a document used by a company’s Accounts Receivable department to gather and file all of the supporting documents needed to approve the collection of receipts.",
    controlResponsibility: "Financial Controller",
  },
  {
    key: "10",
    no: "5.10",
    process: "Procedures Performed on Account Receivable Voucher Package",
    processDescription:
      "Record in Voucher Register, generate report of largest amounts received.",
    processObjective:
      "Each voucher relates to one invoice, debit/credit note issued to customer.",
    processSeverityLevels: "High",
    activity: "Vouching",
    process2: "Voucher Processing",
    stage: "Processing",
    functions: "Finance",
    clientSegment: "Account Receivable",
    operationalUnit: "A",
    division: "C",
    entity: "XYZ",
    unitDepartment: "Account Receivable",
    productClass: "Non",
    productName: "Others",
    integrityEthical: true,
    boardOversight: true,
    orgStructure: false,
    commitmentCompetence: false,
    managementPhilosophy: true,
    riskType: "Liquidity Risk",
    riskDescription:
      "Excessive price or insufficient quantities on voucher cause production delays.",
    severityImpact: "Major",
    probabilityLikelihood: "Likely",
    classification: "High",
    riskResponseType: "Mitigate",
    controlObjectives:
      "Account Receivable Voucher Register record the invoice in the Sales Journal. The project and office managers must approve Accounts Receivable invoices before they are sent to the customers. With each invoice, the project and office managers should review a job cost report, where applicable, for reasonableness to ensure that the current invoice amount is appropriate in relation to job costs incurred to date.",
    controlDefinition:
      "The voucher is essentially the backup documents for accounts payable, which are bills owed by companies to vendors and suppliers.",
    controlDescription:
      "To ensure that orders are placed and deliveries are scheduled in accordance with the organization’s ordering schedule in order to facilitate effective and efficient ordering and receiving processes.",
    controlResponsibility: "Financial Controller",
  },
  {
    key: "11",
    no: "5.11",
    process: "Review accounts receivable journal entries",
    processDescription:
      "Journal entries are properly approved and recorded completely and accurately.",
    processObjective:
      "Ensure data remains complete, accurate, and valid during processing and storage.",
    processSeverityLevels: "High",
    activity: "Perform Journal Entries",
    process2: "Journalizing Process",
    stage: "Processing",
    functions: "Finance",
    clientSegment: "Account Receivable",
    operationalUnit: "A",
    division: "C",
    entity: "XYZ",
    unitDepartment: "Account Receivable",
    productClass: "Non",
    productName: "Others",
    integrityEthical: true,
    boardOversight: false,
    orgStructure: true,
    commitmentCompetence: true,
    managementPhilosophy: false,
    riskType: "Liquidity Risk",
    riskDescription:
      "Recording unapproved and inaccurate Invoice without 3-way check.",
    severityImpact: "Major",
    probabilityLikelihood: "Likely",
    classification: "High",
    riskResponseType: "Mitigate",
    controlObjectives:
      "After the voucher package is complete, the customer invoice is ready for recording. The following information should be entered into the voucher register or Sales Journal. (Voucher register and Sales journals are similar type accounting records. The sales journal is more commonly used in manual systems.)\n" +
      "a) Voucher number\n" +
      "b) Vendor name\n" +
      "c) customer invoice number\n" +
      "d) Date of customer invoice\n" +
      "e) Amount of invoice\n" +
      "f) General ledger account\n" +
      "g) Date invoice is to be received\n" +
      "h) Discount, if applicable",
    controlDefinition:
      "A similar use of control totals can be accomplished by arithmetically proving that the ending amount of Account Receivable is equal to the sum of the beginning balance, plus posted sales invoice amounts, less cash received.",
    controlDescription:
      "Ensure accuracy over invoice processing and receipt in order to prevent duplication records.",
    controlResponsibility: "Financial Controller",
  },
  {
    key: "12",
    no: "5.12",
    process:
      "Reconciliation of Account Receivable Sub-ledger to Account Receivable General Ledger",
    processDescription:
      "Match detailed unpaid billings to general ledger total.",
    processObjective:
      "Prove that the general ledger A/R balance is justified by sub-ledger details.",
    processSeverityLevels: "High",
    activity: "Reconciliation",
    process2: "Comparison of A/R SL to GL",
    stage: "Processing",
    functions: "Finance",
    clientSegment: "Account Receivable",
    operationalUnit: "A",
    division: "C",
    entity: "XYZ",
    unitDepartment: "Account Receivable",
    productClass: "Non",
    productName: "Others",
    integrityEthical: false,
    boardOversight: true,
    orgStructure: false,
    commitmentCompetence: true,
    managementPhilosophy: true,
    riskType: "Liquidity Risk",
    riskDescription: "The risk of inaccurate financial reporting.",
    severityImpact: "Major",
    probabilityLikelihood: "Likely",
    classification: "High",
    riskResponseType: "Mitigate",
    controlObjectives:
      "Reconciliation of Account Receivable Sub-ledger to Account Receivable General Ledger should be performed by authorized person. Resolving the reconciliation following are considered.\n" +
      "a) Pre-number and account for shipping documents and sales invoices.\n" +
      "b) Match orders, shipping documents, and invoices, and follow through on missing or inconsistent information.\n" +
      "c) Mail customer statements periodically, and investigate and resolve disputes or inquiries, by individuals independent of the invoicing function.\n" +
      "d) Monitor number of customer complaints regarding improper invoices or statements (performance indicator).",
    controlDefinition:
      "Reconciliation of the general ledger to sub-ledgers is another type we will review. The general ledger (or simply \"ledger\" or \"G/L\") is a collection of all balance sheet and income statement accounts. The general ledger also includes all journal entries posted to accounts. In nowadays' computerized world, the ledger is maintained in an electronic form.",
    controlDescription:
      "A sub-ledger is a detailed record of transactions for an individual account. Usually, a sub-ledger contains detail of transactions for an account, which are summarized by day (or month) and the total is then posted to the general ledger. Therefore, sub-ledgers serve as support for amounts posted to the general ledger. Sub-ledgers are presented in an electronic form as well. For example, accounts receivable sub-ledger may contain detail for all issued invoices and cash receipts. At the end of a day, an accountant can summarize all invoices issued (sales) and cash receipts (cash collections) and post them to the general ledger in two separate journal entries. The general ledger would not contain detail for each individual transaction.",
    controlResponsibility: "Financial Controller",
  },
];
export const controlAssessmentData = [
  {
     key: "1",
    no: "5.1",
    process: "Establishing Account Receivable",
    levelResponsibility: "Activity Level",
    cosoPrinciple: "10.  Selects and develops control activities",
    operationalApproach: "Manual",
    operationalFrequency: "Daily",
    controlClassification: "Preventive"
  },
  {
    key: "2",
    no: "5.2",
    process: "Establishment of Account Receivable Control Devices",
    levelResponsibility: "Activity Level",
    cosoPrinciple: "10.  Selects and develops control activities",
    operationalApproach: "Manual",
    operationalFrequency: "Daily",
    controlClassification: "Preventive Control"
  },
  {
    key: "3",
    no: "5.3",
    process: "Returns and allowances from customer",
    levelResponsibility: "Activity Level",
    cosoPrinciple: "10.  Selects and develops control activities",
    operationalApproach: "Automated",
    operationalFrequency: "Daily",
    controlClassification: "Preventive Control"
  },
  {
    key: "4",
   no: "5.4",
    process: "Offer Discount and allowance on Accounts Receivable collection",
    levelResponsibility: "Activity Level",
    cosoPrinciple: "10.  Selects and develops control activities",
    operationalApproach: "Automated",
    operationalFrequency: "Daily",
    controlClassification: "Preventive Control"
  },
  {
    key: "5",
    no: "5.5",
    process: "Estimate the Accounts Receivable Aging Analysis",
    levelResponsibility: "Activity Level",
    cosoPrinciple: "10.  Selects and develops control activities",
    operationalApproach: "Automated",
    operationalFrequency: "Daily",
    controlClassification: "Preventive Control"
  },
  {
    key: "6",
    no: "5.6",
    process: "Assessing the Allowance for Doubtful Accounts",
    levelResponsibility: "Activity Level",
    cosoPrinciple: "10.  Selects and develops control activities",
    operationalApproach: "Automated",
    operationalFrequency: "Daily",
    controlClassification: "Preventive Control"
  },
  {
    key: "7",
    no: "5.7",
    process: "Sending statement of account to the customers",
    levelResponsibility: "Activity Level",
    cosoPrinciple: "10.  Selects and develops control activities",
    operationalApproach: "Automated",
    operationalFrequency: "Daily",
    controlClassification: "Preventive Control"
  },
  {
    key: "8",
   no: "5.8",
    process: "Cash Receipts from Customers",
    levelResponsibility: "",
    cosoPrinciple: "10.  Selects and develops control activities",
    operationalApproach: "Automated",
    operationalFrequency: "Daily",
    controlClassification: "Preventive Control"
  },
  {
    key: "9",
    no: "5.9",
    process: "Preparation of the Account Receivable Voucher Package",
    levelResponsibility: "Activity Level",
    cosoPrinciple: "10.  Selects and develops control activities",
    operationalApproach: "Manual",
    operationalFrequency: "Daily",
    controlClassification: "Preventive Control"
  },
  {
    key: "10",
   no: "5.10",
    process: "Procedures Performed on Account Receivable Voucher Package",
    levelResponsibility: "Activity Level",
    cosoPrinciple: "10.  Selects and develops control activities",
    operationalApproach: "Manual",
    operationalFrequency: "Daily",
    controlClassification: "Preventive Control"
  },
  {
    key: "11",
   no: "5.11",
    process: "Review accounts receivable journal entries",
    levelResponsibility: "Activity Level",
    cosoPrinciple: "10.  Selects and develops control activities",
    operationalApproach: "Automated",
    operationalFrequency: "Daily",
    controlClassification: "Preventive Control"
  },
  {
    key: "12",
   no: "5.12",
    process:
      "Reconciliation of Account Receivable Sub-ledger to Account Receivable General Ledger",
    levelResponsibility: "Activity Level",
    cosoPrinciple: "10.  Selects and develops control activities",
    operationalApproach: "Manual",
    operationalFrequency: "Monthly",
    controlClassification: "Detective Control"
  }
];
export const financialAssertionsData = [
  {
    key: "1",
    no: "5.1",
    process: "Establishing Account Receivable",
    soxControlActivity: "Financial Controller",
    internalControlFinancial: true,
    occurrence: true,
    completeness: true,
    accuracy: true,
    authorization: true,
    cutoff: true,
    classificationSOX: true,
    existence: true,
    rightsObligations: true,
    valuationAllocation: true,
    presentationDisclosure: true
  },
  {
    key: "2",
    no: "5.2",
    process: "Establishment of Account Receivable Control Devices",
    soxControlActivity: "Financial Controller",
    internalControlFinancial: true,
    occurrence: true,
    completeness: true,
    accuracy: true,
    authorization: true,
    cutoff: true,
    classificationSOX: true,
    existence: true,
    rightsObligations: true,
    valuationAllocation: true,
    presentationDisclosure: true
  },
  {
    key: "3",
    no: "5.3",
    process: "Returns and allowances from customer",
    soxControlActivity: "Financial Controller",
    internalControlFinancial: true,
    occurrence: true,
    completeness: true,
    accuracy: true,
    authorization: true,
    cutoff: true,
    classificationSOX: true,
    existence: true,
    rightsObligations: true,
    valuationAllocation: true,
    presentationDisclosure: true
  },
  {
    key: "4",
    no: "5.4",
    process: "Offer Discount and allowance on Accounts Receivable collection",
    soxControlActivity: "Financial Controller",
    internalControlFinancial: true,
    occurrence: true,
    completeness: true,
    accuracy: true,
    authorization: true,
    cutoff: true,
    classificationSOX: true,
    existence: true,
    rightsObligations: true,
    valuationAllocation: true,
    presentationDisclosure: true
  },
  {
    key: "5",
    no: "5.5",
    process: "Estimate the Accounts Receivable Aging Analysis",
    soxControlActivity: "Financial Controller",
    internalControlFinancial: true,
    occurrence: true,
    completeness: true,
    accuracy: true,
    authorization: true,
    cutoff: true,
    classificationSOX: true,
    existence: true,
    rightsObligations: true,
    valuationAllocation: true,
    presentationDisclosure: true
  },
  {
    key: "6",
    no: "5.6",
    process: "Assessing the Allowance for Doubtful Accounts",
    soxControlActivity: "Financial Controller",
    internalControlFinancial: true,
    occurrence: true,
    completeness: true,
    accuracy: true,
    authorization: true,
    cutoff: true,
    classificationSOX: true,
    existence: true,
    rightsObligations: true,
    valuationAllocation: true,
    presentationDisclosure: true
  },
  {
    key: "7",
    no: "5.7",
    process: "Sending statement of account to the customers",
    soxControlActivity: "Financial Controller",
    internalControlFinancial: true,
    occurrence: true,
    completeness: true,
    accuracy: true,
    authorization: true,
    cutoff: true,
    classificationSOX: true,
    existence: true,
    rightsObligations: true,
    valuationAllocation: true,
    presentationDisclosure: true
  },
  {
    key: "8",
    no: "5.8",
    process: "Cash Receipts from Customers",
    soxControlActivity: "Financial Controller",
    internalControlFinancial: true,
    occurrence: true,
    completeness: true,
    accuracy: true,
    authorization: true,
    cutoff: true,
    classificationSOX: true,
    existence: true,
    rightsObligations: true,
    valuationAllocation: true,
    presentationDisclosure: true
  },
  {
    key: "9",
    no: "5.9",
    process: "Preparation of the Account Receivable Voucher Package",
    soxControlActivity: "Financial Controller",
    internalControlFinancial: true,
    occurrence: true,
    completeness: true,
    accuracy: true,
    authorization: true,
    cutoff: true,
    classificationSOX: true,
    existence: true,
    rightsObligations: true,
    valuationAllocation: true,
    presentationDisclosure: true
  },
  {
    key: "10",
    no: "5.10",
    process: "Procedures Performed on Account Receivable Voucher Package",
    soxControlActivity: "Financial Controller",
    internalControlFinancial: true,
    occurrence: true,
    completeness: true,
    accuracy: true,
    authorization: true,
    cutoff: true,
    classificationSOX: true,
    existence: true,
    rightsObligations: true,
    valuationAllocation: true,
    presentationDisclosure: true
  },
  {
    key: "11",
    no: "5.11",
    process: "Review accounts receivable journal entries",
    soxControlActivity: "Financial Controller",
    internalControlFinancial: true,
    occurrence: true,
    completeness: true,
    accuracy: true,
    authorization: true,
    cutoff: true,
    classificationSOX: true,
    existence: true,
    rightsObligations: true,
    valuationAllocation: true,
    presentationDisclosure: true
  },
  {
    key: "12",
    no: "5.12",
    process: "Reconciliation of Account Receivable Sub-ledger to Account Receivable General Ledger",
    soxControlActivity: "Financial Controller",
    internalControlFinancial: true,
    occurrence: true,
    completeness: true,
    accuracy: true,
    authorization: true,
    cutoff: true,
    classificationSOX: true,
    existence: true,
    rightsObligations: true,
    valuationAllocation: true,
    presentationDisclosure: true
  }
];
// ...existing code...
export const internalAuditData: DataType[] = [
  { key: "1", no: "5.1", process: "Establishing Account Receivable", internalAuditTest: "To inquiry establishment of Account Receivable procedure is usually performed together with other procedures, such as inspecting the supporting documents or observing the client’s staff performing the controls, in order to ensure that the explanation given by the client’s staff or management is true.", check: false, sampleSize: "" },
  { key: "2", no: "5.2", process: "Establishment of Account Receivable Control Devices", internalAuditTest: "Reviewed", check: false, sampleSize: "" },
  { key: "3", no: "5.3", process: "Returns and allowances from customer", internalAuditTest: "Check the appropriate Returns Receiving Report to see if the invoice number is listed. If the entire invoice is being returned, there is no need to call on the invoice, as the customer will not be paying it. If only part of the invoice is returned, and call the customer to find out the payment status of the remaining balance.", check: false, sampleSize: "" },
  { key: "4", no: "5.4", process: "Offer Discount and allowance on Accounts Receivable collection", internalAuditTest: "Review the sales discount report and match with company credit terms and company discount policy and obtain on the customer list, who availed the discount sample basis and perform analytical procedure to find inconsistency if any in the customer individual accounts. ", check: false, sampleSize: "" },
  { key: "5", no: "5.5", process: "Estimate the Accounts Receivable Aging Analysis", internalAuditTest: "An auditor will use several techniques to determine whether the allowance for doubtful accounts appears reasonable. Most begin with the company’s aging schedule. The older a receivable is, the harder it will be to collect.", check: false, sampleSize: "" },
  { key: "6", no: "5.6", process: "Assessing the Allowance for Doubtful Accounts", internalAuditTest: "Thoroughly review allowance computations to see if they are consistent with prior years; compare allowance percentages to industry averages; agree to supporting documentation (e.g., histories of uncollectible amounts); recompute the related numbers. ", check: false, sampleSize: "" },
  { key: "7", no: "5.7", process: "Sending statement of account to the customers", internalAuditTest: "Obtain the statement of accounts and match with customer individual ledger account on sample basis and ensure the accuracy. ", check: false, sampleSize: "" },
  { key: "8", no: "5.8", process: "Cash Receipts from Customers", internalAuditTest: "Periodically trace a selection of cash receipts to customer invoices to verify proper cash application.", check: false, sampleSize: "" },
  { key: "9", no: "5.9", process: "Preparation of the Account Receivable Voucher Package", internalAuditTest: "Obtain the sample of Account Receivable and vouch them to the supporting documents, such as customer orders and sales invoices.", check: false, sampleSize: "" },
  { key: "10", no: "5.10", process: "Procedures Performed on Account Receivable Voucher Package", internalAuditTest: "Check the authorized approval of Account Receivable voucher package and related general account distribution and Perform Account Receivable confirmation on a sample of customer", check: false, sampleSize: "" },
  { key: "11", no: "5.11", process: "Review accounts receivable journal entries", internalAuditTest: "Review on sample basis whether Sales invoice is approved and recorded in Voucher Register or Sales Journal by the authorized person.", check: false, sampleSize: "" },
  { key: "12", no: "5.12", process: "Reconciliation of Account Receivable Sub-ledger to Account Receivable General Ledger", internalAuditTest: "Assessment of accounts receivable reconciliation statement on a sample basis to verify agreement between accounts receivable subsidiary ledger and receivable general ledger account (control account). ", check: false, sampleSize: "" }
];
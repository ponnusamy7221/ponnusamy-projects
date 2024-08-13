export class loginCredentials {
  userLoginId = '';
  password = '';
}

export class user {
  companyName = '';
  pprotoUser = new protoUser();
  msg = new message();
}

export class protoUser {
  userId = 0;
  userRefNo = '';
  userLoginId = '';
  keyword = '';
  firstName = '';
  middleName = '';
  lastName = '';
  fatherName = '';
  motherName = '';
  dob = '';
  emailId = '';
  contactNumber = '';
  alternateNumber = '';
  genderId = 0;
  genderValue = '';
  keyToken = '';
  beginDate = '';
  endDate = '';
  statusId = 0;
  statusValue = '';
  designationId = 0;
  designationValue = '';
  branchId = 0;
  branchValue = '';
  departmentId = 0;
  departmentValue = '';
  teamId = 0;
  teamValue = '';
  enteredBy = '';
  enteredDate = '';
  changedBy = '';
  changedDate = '';
  changedByFullName = '';
  enteredByFullName = '';
  teamDescription = '';
}

export class subConfig {
  subConfigId = 0;
  mConfigId = 0;
  mConfigValue = '';
  mConfigDescription = '';
  enteredBy = '';
  enteredDate = '';
  changedBy = '';
  changedDate = '';
  changedByFullName = '';
  enteredByFullName = '';
}

export class message {
  infoMessage = new msgDetail();
  errorMessage: any = [];
  infoMsgList: any[] = [];
  hasError = false;
}

export class msgDetail {
  msgType = '';
  msgDescription = '';
}

export class searchParams {
  keyword = '';
  pageNumber = 0;
  rowPerPage = 0;
  customerType = '';
  regionValue = '';
  date = '';
}

export class orderSearch {
  orderDetailId = 0;
  orderRefNo = '';
  orderDateDateFrom = '';
  orderDateDateTo = '';
  customerId = '';
  warehouseId = '';
  isWithinChennai = '';
  isInvoice = '';
  statusValue = '';
  totalAmountFrom = '';
  totalAmountTo = '';
  enteredDate = '';
  changedBy = '';
  changedDate = '';
  orderByColumnName = '';
  pageSize = 0;
  pageNumber = 0;
  ascending = true;
  istrSortColumn = '';
  istrSortOrder = true;
}

export class orderSearchResult {
  plstprotoOrderDetailsResultSet: any = [];
  totalCount = 0;
  pageSize = 0;
  pageNumber = 0;
}

export class orderDetail {
  orderDetailId = 0;
  orderRefNo = '';
  orderDate = '';
  customerDetails = '';
  customerId = 0;
  warehouseId = 0;
  isWithinChennai = '';
  isInvoice = '';
  statusId = 0;
  statusValue = '';
  enteredBy = '';
  enteredDate = '';
  changedBy = '';
  changedDate = '';
  totalAmount = '';
  changedByFullName = '';
  enteredByFullName = '';
  statusDescription = '';
  wareHouseDetails = '';
  iprotoLRDetails = new LRDetail();
  iprotoInvoiceDetails = new invoiceDetail();
  iprotoOrderDeliverySlipDetailWithoutInvoice =
    new orderDeliveryWithoutInvoice();
  lstprotoOrderDeliverySlipDetail: any[] = [];
  preorderId = 0;
  toPayeeAmount = '';
}

export class LRDetail {
  lrDetailId = 0;
  orderDetailId = 0;
  lrNo = '';
  receivedDate = '';
  transportNameId = 0;
  transportNameValue = '';
  vendorId = 0;
  vendorDetails = '';
  consigneeName = '';
  packageTypeId = 0;
  packageTypeValue = '';
  modeOfPackingId = 0;
  modeOfPackingValue = '';
  netWeight = '';
  grossWeight = '';
  valueOfGoodsAsPerInvoice = '';
  toPayFreightCharges = '';
  lrPhotoCopy = '';
  enteredBy = '';
  enteredDate = '';
  changedBy = '';
  changedDate = '';
  changedByFullName = '';
  enteredByFullName = '';
  transportNameDescription = '';
  packageTypeDescription = '';
  modeOfPackingDescription = '';
}

export class invoiceDetail {
  invoiceDetailId = 0;
  orderDetailId = 0;
  invoiceNo = '';
  invoiceDate = '';
  deliveryNotes = '';
  modeOfPaymentId = 0;
  modeOfPaymentValue = '';
  dispatchedThroughId = 0;
  dispatchedThroughValue = '';
  modeOfPackingId = 0;
  modeOfPackingValue = '';
  destinationId = 0;
  destinationValue = '';
  referenceNo = '';
  referenceDate = '';
  otherReferences = '';
  buyersOrderNo = '';
  buyersDate = '';
  dispatchDocumetNo = '';
  deliveryNoteDate = '';
  termsOfDelivery = '';
  vendorId = 0;
  consigneeName = '';
  invoicePhotoCopy = '';
  totalQuantity = '';
  taxableValue = '';
  cgsTaxPercentage = '';
  sgsTaxPercentage = '';
  sgsTaxValue = '';
  cgsTaxValue = '';
  enteredBy = '';
  enteredDate = '';
  changedBy = '';
  changedDate = '';
  changedByFullName = '';
  enteredByFullName = '';
  modeOfPaymentDescription = '';
  dispatchedThroughDescription = '';
  modeOfPackingDescription = '';
  destinationDecscription = '';
  totalTaxAmount = '';
  invoiceTotal = '';
  vendorDetails = '';
  companyId = 0;
  vendorAddress = '';
  companyAddress = '';
  companyDetails = '';
  buyerId = 0;
  buyerDetails = '';
  consigneeDetails = '';
  consigneeId = 0;
  roundOff = '';
}

export class invoiceDetailItem {
  invoiceDetailItemId = 0;
  invoiceDetailId = 0;
  productId = 0;
  hsnOrSacNo = '';
  quantity = '';
  unitTypeId = 0;
  unitTypeValue = '';
  unitRate = '';
  amount = '';
  enteredBy = '';
  enteredDate = '';
  changedBy = '';
  changedDate = '';
  unitTypeDescription = '';
  changedByFullName = '';
  enteredByFullName = '';
}

export class sendInvoiceDetail {
  id = 0;
  orderId = 0;
  orderNo = '';
  orderDate = '';
  customerName = '';
  warehouseName = '';
  vendorName = '';
}

export class orderDeliveryWithoutInvoice {
  changedBy = '';
  changedByFullName = '';
  changedDate = '';
  consigneeDetails = '';
  consigneeId = 0;
  content = '';
  deliverySlipNumber = '';
  enteredBy = '';
  enteredByFullName = '';
  enteredDate = '';
  orderDeliverySlipWithoutId = 0;
  orderDetailId = 0;
  receivedDate = '';
  totalAmount = '';
  vendorDetails = '';
  vendorId = 0;
}

export class orderDeliverySlipDetail {
  orderDeliverySlipDetailId = 0;
  orderDetailId = 0;
  amount = '';
  rate = '';
  productId = 0;
  quantity = '';
  deliverySlipPhotoCopy = '';
  enteredBy = '';
  enteredDate = '';
  changedBy = '';
  changedDate = '';
  changedByFullName = '';
  enteredByFullName = '';
  unitTypeId = 0;
  unitTypeValue = '';
  unitDescription = '';
  productDetails = '';
  hsnno = '';
}

export class repackingDetailResult {
  plstprotoRepackingDetailResultSet: any = [];
  totalCount = 0;
  pageSize = 0;
  pageNumber = 0;
}

export class repacking {
  repackingDetailId = 0;
  orderId = 0;
  statusId = 0;
  statusValue = ' ';
  totalQuantity = ' ';
  enteredBy = ' ';
  changedBy = ' ';
  changedDate = ' ';
  enteredDate = ' ';
  msg = new message();
  statusDescription = ' ';
  changedByFullName = ' ';
  enteredByFullName = ' ';
  lstprotoRepackingListDetail: any[] = [];
  iprotoRepackingListDetail = new repackingListDetail();
  iprotoOrderDetails = new orderDetail();
  lstprotoOrderDetails: any[] = [];
}

export class repackingListDetail {
  repackingListDetailId = 0;
  repackingDetailId = 0;
  packageNo = ' ';
  productId = 0;
  packageTypeId = 0;
  packageTypeValue = ' ';
  quantity = ' ';
  unitTypeId = 0;
  unitTypeValue = ' ';
  unitDescription = '';
  netWeight = ' ';
  grossWeight = ' ';
  statusId = 0;
  statusValue = ' ';
  msg = new message();
}

export class finalPackingSearchResult {
  plstprotoFinalPackingDetailSearchResultSet: any[] = [];
  totalCount = 0;
  pageSize = 0;
  pageNumber = 0;
}

export class preOrderResult {
  plstprotoPreorderSearchResultSet: any[] = [];
  totalCount = 0;
  pageSize = 0;
  pageNumber = 0;
}

export class preOrder {
  preorderId = 0;
  orderId = 0;
  preorderRefNo = '';
  orderExpectedDate = '';
  customerId = 0;
  vendorCogniseeType = '';
  notes = '';
  statusId = 0;
  statusValue = '';
  enteredBy = '';
  enteredDate = '';
  changedBy = '';
  statusDescription = '';
  changedDate = '';
  msg = new message();
  regionId = 0;
  regionValue = '';
  regionDescription = '';
  iprotoCustomer = new customer();
}

export class customer {
  customerId = 0;
  customerName = '';
  customerRefNo = '';
  emailId = '';
  contactNo = '';
  addressLine1 = '';
  addressLine2 = '';
  addressLine3 = '';
  city = '';
  state = '';
  country = '';
  pincode = '';
  statusId = 0;
  statusValue = '';
  enteredBy = '';
  enteredDate = '';
  changedBy = '';
  changedDate = '';
  changedByFullName = '';
  enteredByFullName = '';
  statusDescription = '';
  customerTypeId = 0;
  customerTypeValue = '';
  msg = new msgDetail();
}

export class consignee {
  consigneeId = 0;
  consigneeName = '';
  consigneeRefNo = '';
  emailId = '';
  contactNo = '';
  addressLine1 = '';
  addressLine2 = '';
  addressLine3 = '';
  city = '';
  state = '';
  country = '';
  pincode = '';
  statusId = 0;
  statusValue = '';
  enteredBy = '';
  enteredDate = '';
  changedBy = '';
  changedDate = '';
  changedByFullName = '';
  enteredByFullName = '';
  statusDescription = '';
  gstnUinNumber = '';
  msg = new msgDetail();
}

export class vendor {
  vendorId = 0;
  vendorName = '';
  vendorRefNo = '';
  emailId = '';
  contactNo = '';
  addressLine1 = '';
  addressLine2 = '';
  addressLine3 = '';
  city = '';
  state = '';
  country = '';
  pincode = '';
  statusId = 0;
  statusValue = '';
  enteredBy = '';
  enteredDate = '';
  changedBy = '';
  changedDate = '';
  changedByFullName = '';
  enteredByFullName = '';
  statusDescription = '';
  gstnUinNumber = '';
  msg = new msgDetail();
}

export class exportInvoice {
  exportInvoiceId = 0;
  orderId = 0;
  invoiceNo = '';
  invoiceDate = '';
  vesselFlightNo = '';
  loadingPortValue = '';
  dischargePortValue = '';
  destination = '';
  preCarriageBy = '';
  placeOfReceiptOfPreCarrier = '';
  containerNo = '';
  countryOfOriginOfGoods = '';
  countryOfFinalDestination = '';
  buyersOrderNoDate = '';
  termsOfDeliveryPayment = '';
  exporterId = 0;
  partyId = 0;
  netWeight = '';
  grossWeight = '';
  cgstTaxPercentage = '';
  sgstTaxPercentage = '';
  totalTaxAmount = '';
  roundOff = '';
  invoiceTotal = '';
  signatureCopy = '';
  companyBankId = 0;
  msg = new message();
  changedByFullName = '';
  enteredByFullName = '';
  exportConsigneeId = 0;
  overAllTotal = 0;
  taxableValue = '';
  noAndKindOfPakage = 0;
  loadingPortId = 0;
  dischargePortId = 0;
  loadingPortDescription = '';
  dischargePortDescription = '';
  lstprotoExportInvoiceDetail: any[] = [];
  iprotoExporter = new exporter();
  iprotoParty = new party();
  iprotoExportConsignee = new exportConsignee();
  enteredBy = '';
  enteredDate = '';
  changedBy = '';
  changedDate = '';
  regionId = 0;
  regionValue = '';
  statusId = 0;
  statusValue = '';
  regionDescription = '';
  statusDescription = '';
  cgstValue = '';
  sgstValue = '';
}

export class exportInvoiceDetail {
  exportInvoiceDetailId = 0;
  exportInvoiceId = 0;
  finalPackingDetailId = 0;
  packageNo = '';
  quantity = '';
  unitTypeId = 0;
  unitTypeValue = '';
  rate = '';
  invoiceRate = '';
  amount = '';
  msg = new message();
  changedByFullName = '';
  enteredByFullName = '';
  unitTypeDescription = '';
  productId = 0;
  enteredBy = '';
  enteredDate = '';
  changedBy = '';
  changedDate = '';
}

export class exporter {
  exporterId = 0;
  exporterName = '';
  exporterRefNo = '';
  emailId = '';
  contactNo = '';
  addressLine1 = '';
  addressLine2 = '';
  addressLine3 = '';
  city = '';
  state = '';
  country = '';
  pincode = '';
  statusId = 0;
  statusValue = '';
  enteredBy = '';
  enteredDate = '';
  changedBy = '';
  changedDate = '';
  changedByFullName = '';
  enteredByFullName = '';
  statusDescription = '';
  gstnUinNumber = '';
  msg = new message();
}

export class party {
  partyId = 0;
  partyName = '';
  partyRefNo = '';
  emailId = '';
  contactNo = '';
  addressLine1 = '';
  addressLine2 = '';
  addressLine3 = '';
  city = '';
  state = '';
  country = '';
  pincode = '';
  statusId = 0;
  statusValue = '';
  enteredBy = '';
  enteredDate = '';
  changedBy = '';
  changedDate = '';
  changedByFullName = '';
  enteredByFullName = '';
  statusDescription = '';
  gstnUinNumber = '';
  msg = new message();
}

export class exportConsignee {
  exportConsigneeId = 0;
  exportConsigneeName = '';
  exportConsigneeRefNo = '';
  emailId = '';
  contactNo = '';
  addressLine1 = '';
  addressLine2 = '';
  addressLine3 = '';
  city = '';
  state = '';
  country = '';
  pincode = '';
  statusId = 0;
  statusValue = '';
  enteredBy = '';
  enteredDate = '';
  changedBy = '';
  changedDate = '';
  changedByFullName = '';
  enteredByFullName = '';
  statusDescription = '';
  gstnUinNumber = '';
  msg = new message();
}

export class exportInvoiceResult {
  plstprotoExportInvoiceSearchResultSet: any[] = [];
  totalCount = 0;
  pageSize = 0;
  pageNumber = 0;
}

export class wareHouse {
  warehouseId = 0;
  warehouseName = '';
  warehouseRefNo = '';
  contactPersonNo = '';
  addressLine1 = '';
  addressLine2 = '';
  addressLine3 = '';
  city = '';
  state = '';
  country = '';
  pincode = '';
  statusId = 0;
  statusValue = '';
  enteredBy = '';
  enteredDate = '';
  changedBy = '';
  changedDate = '';
  changedByFullName = '';
  enteredByFullName = '';
  statusDescription = '';
  msg = new message();
}

export class buyer {
  buyerId = 0;
  buyerName = ' ';
  buyerRefNo = ' ';
  emailId = ' ';
  contactNo = ' ';
  addressLine1 = ' ';
  addressLine2 = ' ';
  addressLine3 = ' ';
  city = ' ';
  state = ' ';
  country = ' ';
  pincode = ' ';
  statusId = 0;
  statusValue = ' ';
  enteredBy = ' ';
  enteredDate = ' ';
  changedBy = ' ';
  changedDate = ' ';
  changedByFullName = ' ';
  enteredByFullName = ' ';
  statusDescription = ' ';
  gstnUinNumber = ' ';
  msg = new message();
}

export class exporterConsignee {
  exportConsigneeId = 0;
  exportConsigneeName = '';
  exportConsigneeRefNo = '';
  emailId = '';
  contactNo = '';
  addressLine1 = '';
  addressLine2 = '';
  addressLine3 = '';
  city = '';
  state = '';
  country = '';
  pincode = '';
  statusId = 0;
  statusValue = '';
  enteredBy = '';
  enteredDate = '';
  changedBy = '';
  changedDate = '';
  changedByFullName = '';
  enteredByFullName = '';
  statusDescription = '';
  gstnUinNumber = '';
  msg = new message();
}

export class product {
  productId = 0;
  productName = '';
  productRefNo = '';
  statusId = 0;
  statusValue = '';
  enteredBy = '';
  enteredDate = '';
  changedBy = '';
  changedDate = '';
  changedByFullName = '';
  enteredByFullName = '';
  statusDescription = '';
  hsnSacNumber = '';
  msg = new message();
}

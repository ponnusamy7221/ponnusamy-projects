using CHEExportsDataAccessLayer;
using CHEExportsDataObjects;
using CHEExportsProto;
using Google.Protobuf.WellKnownTypes;
using Grpc.Core;
using System.Security.AccessControl;

namespace CHEExportsService
{
    public class ApplicationSerivce : CHEExportsProto.ApplicationService.ApplicationServiceBase
    {
        #region customer

        #region CreateNewCustomerSearch
        public override Task<protoCustomerSearch> CreateNewCustomerSearch(Empty request, ServerCallContext context)
        {

            protoCustomerSearch lprotoCustomerSearch = new protoCustomerSearch();
            try
            {
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return Task.FromResult(lprotoCustomerSearch);
        }
        #endregion

        #region SearchCustomer
        public override Task<protoCustomerSearchResult> SearchCustomer(protoCustomerSearch request, ServerCallContext context)
        {
            //CustomerSearch lCustomerSearch = new CustomerSearch();
            protoCustomerSearchResult lprotoCustomerSearchResult=new protoCustomerSearchResult();
            try
            {
                lprotoCustomerSearchResult.PlstprotoCustomerSearchResultSet.Add(new protoCustomerSearchResultSet());
                //lCustomerSearch.GetBus(request);
                //lbusCustomerSearch.IsAddInfoScreen = "AdditionalInfoScreen";
                //lCustomerSearch.date_of_birth = CommonUtility.SetFromDates(request.DateOfBirth);
                //lbusCustomerSearch.date_of_birth_to = CommonUtility.SetToDates(request.DateOfBirthTo);

                //lCustomerSearch.OrderByColumnName = "CR.CUSTOMER_ID";
                //lCustomerSearch.Ascending = false;
                
                //result = blBase.SearchResultSetByPage<busCustomerSearchResultSet, busCustomerSearch>(lbusCustomerSearch);
            }
            catch (Exception ex)
            {
                throw;
            }
            return Task.FromResult(lprotoCustomerSearchResult);
        }
        #endregion

        public override Task<entDDLData> GetInitialDataCustomerAndVendor(Empty request, ServerCallContext context)
        {
            entDDLData lentDDLData = new entDDLData();
            try
            {
                entDDL lentDDL = new entDDL();
                string config_ids = Constants.Application.Active_Iactive_Status_id + "";
                List<SubConfig> lstSubConfig = CommonDAL.GetAllSubConfigValueByConfigID(config_ids);
                lentDDL = new entDDL().GetSubConfigValuesfromlist("DDLStatus", Constants.Application.Active_Iactive_Status_id, lstSubConfig);
                lentDDLData.Data.Add(lentDDL);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return Task.FromResult(lentDDLData);
        }
        public override async Task<protoCustomer> CreateNewCustomer(Empty empty, ServerCallContext context)
        {
            Customer lCustomer = new Customer();
            try
            {
                string token = context.RequestHeaders.GetValue("authorization");
                lCustomer.iLoggedInUserDetails = CommonDAL.GetLoggedInDetailsFromToken(token);
                lCustomer.status_value = Constants.Application.Active;
                lCustomer.changed_date = DateTime.Now;
                lCustomer.entered_date = DateTime.Now;
                lCustomer.entered_by = lCustomer.iLoggedInUserDetails.user_login_id;
                lCustomer.changed_by = lCustomer.iLoggedInUserDetails.user_login_id;
                string config_ids = Constants.Application.Active_Iactive_Status_id + "";
                List<SubConfig> lstSubConfig = CommonDAL.GetAllSubConfigValueByConfigID(config_ids);
                lCustomer.status_description = lstSubConfig.Where(x => x.s_config_value == lCustomer.status_value).Select(x => x.s_config_description).FirstOrDefault();

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(lCustomer.GetProto());
        }

        public override async Task<protoCustomer> SaveCustomer(protoCustomer aprotoCustomer, ServerCallContext context)
        {
            Customer lCustomer = new Customer();
            try
            {
                string token = context.RequestHeaders.GetValue("authorization");
                lCustomer.GetData(aprotoCustomer);
                lCustomer.iLoggedInUserDetails = CommonDAL.GetLoggedInDetailsFromToken(token);
                lCustomer.changed_date = DateTime.Now;
                lCustomer.entered_date = DateTime.Now;
                DALCustomer lDALCustomer = new DALCustomer(lCustomer);
                lDALCustomer.SaveCustomer(token);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(lCustomer.GetProto());
        }

        public override async Task<protoCustomer> UpdateCustomer(protoCustomer aprotoCustomer, ServerCallContext context)
        {
            Customer lCustomer = new Customer();
            try
            {
                string token = context.RequestHeaders.GetValue("authorization");
                lCustomer.GetData(aprotoCustomer);
                lCustomer.iLoggedInUserDetails = CommonDAL.GetLoggedInDetailsFromToken(token);
                DALCustomer lDALCustomer = new DALCustomer(lCustomer);
                lCustomer.changed_date = DateTime.Now;
                lDALCustomer.UpdateCustomer(token);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(lCustomer.GetProto());
        }

        public override async Task<protoCustomer> OpenCustomer(protoLongData aprotoLongData, ServerCallContext context)
        {
            Customer Customer = new Customer();
            try
            {
                if (aprotoLongData != null && aprotoLongData.Data > 0)
                {
                    Customer.customer_id = aprotoLongData.Data;
                    DALCustomer lDALCustomer = new DALCustomer(Customer);
                    lDALCustomer.OpenCustomer("");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(Customer.GetProto());
        }

        public override async Task<protoCustomer> DeleteCustomer(protoLongData aprotoLongData, ServerCallContext context)
        {
            Customer Customer = new Customer();
            try
            {
                if (aprotoLongData != null && aprotoLongData.Data > 0)
                {
                    Customer.customer_id = aprotoLongData.Data;
                    DALCustomer lDALCustomer = new DALCustomer(Customer);
                    lDALCustomer.DeleteCustomer("");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(Customer.GetProto());
        }
        #endregion

        #region Vendor
        public override async Task<protoVendor> CreateNewVendor(Empty empty, ServerCallContext context)
        {
            protoVendor lprotoVendor = new protoVendor();
            try
            {

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(lprotoVendor);
        }

        public override async Task<protoVendor> SaveVendor(protoVendor aprotoVendor, ServerCallContext context)
        {
            Vendor Vendor = new Vendor();
            try
            {
                Vendor.GetData(aprotoVendor);
                DALVendor lDALVendor = new DALVendor(Vendor);
                lDALVendor.SaveVendor("");
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(Vendor.GetProto());
        }

        public override async Task<protoVendor> UpdateVendor(protoVendor aprotoVendor, ServerCallContext context)
        {
            Vendor Vendor = new Vendor();
            try
            {
                Vendor.GetData(aprotoVendor);
                DALVendor lDALVendor = new DALVendor(Vendor);
                lDALVendor.UpdateVendor("");
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(Vendor.GetProto());
        }

        public override async Task<protoVendor> OpenVendor(protoLongData aprotoLongData, ServerCallContext context)
        {
            Vendor Vendor = new Vendor();
            try
            {
                if (aprotoLongData != null && aprotoLongData.Data > 0)
                {
                    Vendor.vendor_id = aprotoLongData.Data;
                    DALVendor lDALVendor = new DALVendor(Vendor);
                    lDALVendor.OpenVendor("");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(Vendor.GetProto());
        }

        public override async Task<protoVendor> DeleteVendor(protoLongData aprotoLongData, ServerCallContext context)
        {
            Vendor Vendor = new Vendor();
            try
            {
                if (aprotoLongData != null && aprotoLongData.Data > 0)
                {
                    Vendor.vendor_id = aprotoLongData.Data;
                    DALVendor lDALVendor = new DALVendor(Vendor);
                    lDALVendor.DeleteVendor("");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(Vendor.GetProto());
        }
        #endregion

        #region Company
        public override async Task<protoCompany> CreateNewCompany(Empty empty, ServerCallContext context)
        {
            protoCompany lprotoCompany = new protoCompany();
            try
            {

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(lprotoCompany);
        }

        public override async Task<protoCompany> SaveCompany(protoCompany aprotoCompany, ServerCallContext context)
        {
            Company Company = new Company();
            try
            {
                Company.GetData(aprotoCompany);
                DALCompany lDALCompany = new DALCompany(Company);
                lDALCompany.SaveCompany("");
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(Company.GetProto());
        }

        public override async Task<protoCompany> UpdateCompany(protoCompany aprotoCompany, ServerCallContext context)
        {
            Company Company = new Company();
            try
            {
                Company.GetData(aprotoCompany);
                DALCompany lDALCompany = new DALCompany(Company);
                lDALCompany.UpdateCompany("");
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(Company.GetProto());
        }

        public override async Task<protoCompany> OpenCompany(protoLongData aprotoLongData, ServerCallContext context)
        {
            Company Company = new Company();
            try
            {
                if (aprotoLongData != null && aprotoLongData.Data > 0)
                {
                    Company.company_id = aprotoLongData.Data;
                    DALCompany lDALCompany = new DALCompany(Company);
                    lDALCompany.OpenCompany("");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(Company.GetProto());
        }

        public override async Task<protoCompany> DeleteCompany(protoLongData aprotoLongData, ServerCallContext context)
        {
            Company Company = new Company();
            try
            {
                if (aprotoLongData != null && aprotoLongData.Data > 0)
                {
                    Company.company_id = aprotoLongData.Data;
                    DALCompany lDALCompany = new DALCompany(Company);
                    lDALCompany.DeleteCompany("");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(Company.GetProto());
        }
        #endregion

        #region WareHouse
        public override async Task<protoWareHouse> CreateNewWareHouse(Empty empty, ServerCallContext context)
        {
            protoWareHouse lprotoWareHouse = new protoWareHouse();
            try
            {

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(lprotoWareHouse);
        }

        public override async Task<protoWareHouse> SaveWareHouse(protoWareHouse aprotoWareHouse, ServerCallContext context)
        {
            WareHouse WareHouse = new WareHouse();
            try
            {
                WareHouse.GetData(aprotoWareHouse);
                DALWareHouse lDALWareHouse = new DALWareHouse(WareHouse);
                lDALWareHouse.SaveWareHouse("");
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(WareHouse.GetProto());
        }

        public override async Task<protoWareHouse> UpdateWareHouse(protoWareHouse aprotoWareHouse, ServerCallContext context)
        {
            WareHouse WareHouse = new WareHouse();
            try
            {
                WareHouse.GetData(aprotoWareHouse);
                DALWareHouse lDALWareHouse = new DALWareHouse(WareHouse);
                lDALWareHouse.UpdateWareHouse("");
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(WareHouse.GetProto());
        }

        public override async Task<protoWareHouse> OpenWareHouse(protoLongData aprotoLongData, ServerCallContext context)
        {
            WareHouse WareHouse = new WareHouse();
            try
            {
                if (aprotoLongData != null && aprotoLongData.Data > 0)
                {
                    WareHouse.warehouse_id = aprotoLongData.Data;
                    DALWareHouse lDALWareHouse = new DALWareHouse(WareHouse);
                    lDALWareHouse.OpenWareHouse("");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(WareHouse.GetProto());
        }

        public override async Task<protoWareHouse> DeleteWareHouse(protoLongData aprotoLongData, ServerCallContext context)
        {
            WareHouse WareHouse = new WareHouse();
            try
            {
                if (aprotoLongData != null && aprotoLongData.Data > 0)
                {
                    WareHouse.warehouse_id = aprotoLongData.Data;
                    DALWareHouse lDALWareHouse = new DALWareHouse(WareHouse);
                    lDALWareHouse.DeleteWareHouse("");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(WareHouse.GetProto());
        }
        #endregion

        #region OrderDetails

        #region CreateNewCustomerSearch
        public override Task<protoOrderDetailsSearch> CreateNewOrderDetailsSearch(Empty request, ServerCallContext context)
        {

            protoOrderDetailsSearch lprotoOrderDetailsSearch = new protoOrderDetailsSearch();
            try
            {
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return Task.FromResult(lprotoOrderDetailsSearch);
        }
        #endregion

        #region SearchCustomer
        public override Task<protoOrderDetailsResult> SearchOrderDetails(protoOrderDetailsSearch request, ServerCallContext context)
        {
            //CustomerSearch lCustomerSearch = new CustomerSearch();
            protoOrderDetailsResult lprotoOrderDetailsResult = new protoOrderDetailsResult();
            try
            {
                lprotoOrderDetailsResult.PlstprotoOrderDetailsResultSet.Add(new protoOrderDetailsResultSet());
                //lCustomerSearch.GetBus(request);
                //lbusCustomerSearch.IsAddInfoScreen = "AdditionalInfoScreen";
                //lCustomerSearch.date_of_birth = CommonUtility.SetFromDates(request.DateOfBirth);
                //lbusCustomerSearch.date_of_birth_to = CommonUtility.SetToDates(request.DateOfBirthTo);

                //lCustomerSearch.OrderByColumnName = "CR.CUSTOMER_ID";
                //lCustomerSearch.Ascending = false;

                //result = blBase.SearchResultSetByPage<busCustomerSearchResultSet, busCustomerSearch>(lbusCustomerSearch);
            }
            catch (Exception ex)
            {
                throw;
            }
            return Task.FromResult(lprotoOrderDetailsResult);
        }
        #endregion

        #region GetInitialDataForApplication
        public override Task<entDDLData> GetInitialDataForOrder(Empty request, ServerCallContext context)
        {
            entDDLData lentDDLData = new entDDLData();
            try
            {
                entDDL lentDDL = new entDDL();
                string config_ids = Constants.Application.Status_id +","+Constants.Application.Unit_type_id;
                List<SubConfig> lstSubConfig = CommonDAL.GetAllSubConfigValueByConfigID(config_ids);
                //lentDDL = new entDDL().GetSubConfigValue("DDLStatus", Constants.Application.Status_id);
                //lentDDLData.Data.Add(lentDDL);
                lentDDL = new entDDL().GetSubConfigValuesfromlist("DDLStatus", Constants.Application.Status_id, lstSubConfig);
                lentDDLData.Data.Add(lentDDL);
                lentDDL = new entDDL().GetSubConfigValuesfromlist("DDLUnitType", Constants.Application.Unit_type_id, lstSubConfig);
                lentDDLData.Data.Add(lentDDL);
                lentDDL = new entDDL().GetAllCustomer("DDlAllCustomer", 0);
                lentDDLData.Data.Add(lentDDL);
                lentDDL = new entDDL().GetAllWareHouse("DDlAllWareHouse", 0);
                lentDDLData.Data.Add(lentDDL);
                lentDDL = new entDDL().GetAllProduct("DDlAllCustomer", 0);
                lentDDLData.Data.Add(lentDDL);
                lentDDL = new entDDL().GetAllVendor("DDlAllVendor", 0);
                lentDDLData.Data.Add(lentDDL);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return Task.FromResult(lentDDLData);
        }
        #endregion

        public override async Task<protoOrderDetails> CreateNewOrderDetails(Empty empty, ServerCallContext context)
        {
            OrderDetails lOrderDetails = new OrderDetails();
            try
            {
                string token = context.RequestHeaders.GetValue("authorization");
                lOrderDetails.iLoggedInUserDetails = CommonDAL.GetLoggedInDetailsFromToken(token);
                lOrderDetails.changed_date = DateTime.Now;
                lOrderDetails.entered_date = DateTime.Now;
                lOrderDetails.entered_by = lOrderDetails.iLoggedInUserDetails.user_login_id;
                lOrderDetails.changed_by = lOrderDetails.iLoggedInUserDetails.user_login_id;
                lOrderDetails.is_invoice=Constants.Application.Is_Yes;
                lOrderDetails.is_within_chennai = Constants.Application.Is_Yes;
                lOrderDetails.status_value = Constants.Application.pending_completion;
                string config_ids = Constants.Application.Status_id + "";
                List<SubConfig> lstSubConfig = CommonDAL.GetAllSubConfigValueByConfigID(config_ids);
                lOrderDetails.status_description=lstSubConfig.Where(x => x.s_config_value == lOrderDetails.status_value).Select(x=>x.s_config_description).FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(lOrderDetails.GetProto());
        }

        public override async Task<protoOrderDetails> SaveOrderDetails(protoOrderDetails aprotoOrderDetails, ServerCallContext context)
        {
            OrderDetails lOrderDetails = new OrderDetails();
            try
            {
                string token = context.RequestHeaders.GetValue("authorization");
                lOrderDetails.GetData(aprotoOrderDetails);
                lOrderDetails.iLoggedInUserDetails = CommonDAL.GetLoggedInDetailsFromToken(token);
                lOrderDetails.changed_date = DateTime.Now;
                lOrderDetails.entered_date = DateTime.Now;
                DALOrderDetails lDALOrderDetails = new DALOrderDetails(lOrderDetails);
                lDALOrderDetails.SaveOrderDetails(token);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(lOrderDetails.GetProto());
        }

        public override async Task<protoOrderDetails> UpdateOrderDetails(protoOrderDetails aprotoOrderDetails, ServerCallContext context)
        {
            OrderDetails OrderDetails = new OrderDetails();
            try
            {
                OrderDetails.GetData(aprotoOrderDetails);
                DALOrderDetails lDALOrderDetails = new DALOrderDetails(OrderDetails);
                lDALOrderDetails.UpdateOrderDetails("");
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(OrderDetails.GetProto());
        }

        public override async Task<protoOrderDetails> OpenOrderDetails(protoLongData aprotoLongData, ServerCallContext context)
        {
            OrderDetails OrderDetails = new OrderDetails();
            try
            {
                if (aprotoLongData != null && aprotoLongData.Data > 0)
                {
                    OrderDetails.order_detail_id = aprotoLongData.Data;
                    DALOrderDetails lDALOrderDetails = new DALOrderDetails(OrderDetails);
                    lDALOrderDetails.OpenOrderDetails("");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(OrderDetails.GetProto());
        }

        public override async Task<protoOrderDetails> DeleteOrderDetails(protoLongData aprotoLongData, ServerCallContext context)
        {
            OrderDetails OrderDetails = new OrderDetails();
            try
            {
                if (aprotoLongData != null && aprotoLongData.Data > 0)
                {
                    OrderDetails.order_detail_id = aprotoLongData.Data;
                    DALOrderDetails lDALOrderDetails = new DALOrderDetails(OrderDetails);
                    lDALOrderDetails.DeleteOrderDetails("");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(OrderDetails.GetProto());
        }
        #endregion

        #region InvoiceDetails
        public override async Task<protoInvoiceDetails> CreateNewInvoiceDetails(Empty empty, ServerCallContext context)
        {
            protoInvoiceDetails lprotoInvoiceDetails = new protoInvoiceDetails();
            try
            {

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(lprotoInvoiceDetails);
        }

        public override async Task<protoInvoiceDetails> SaveInvoiceDetails(protoInvoiceDetails aprotoInvoiceDetails, ServerCallContext context)
        {
            InvoiceDetails InvoiceDetails = new InvoiceDetails();
            try
            {
                InvoiceDetails.GetData(aprotoInvoiceDetails);
                DALInvoiceDetails lDALInvoiceDetails = new DALInvoiceDetails(InvoiceDetails);
                lDALInvoiceDetails.SaveInvoiceDetails("");
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(InvoiceDetails.GetProto());
        }

        public override async Task<protoInvoiceDetails> UpdateInvoiceDetails(protoInvoiceDetails aprotoInvoiceDetails, ServerCallContext context)
        {
            InvoiceDetails InvoiceDetails = new InvoiceDetails();
            try
            {
                InvoiceDetails.GetData(aprotoInvoiceDetails);
                DALInvoiceDetails lDALInvoiceDetails = new DALInvoiceDetails(InvoiceDetails);
                lDALInvoiceDetails.UpdateInvoiceDetails("");
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(InvoiceDetails.GetProto());
        }

        public override async Task<protoInvoiceDetails> OpenInvoiceDetails(protoLongData aprotoLongData, ServerCallContext context)
        {
            InvoiceDetails InvoiceDetails = new InvoiceDetails();
            try
            {
                if (aprotoLongData != null && aprotoLongData.Data > 0)
                {
                    InvoiceDetails.order_detail_id = aprotoLongData.Data;
                    DALInvoiceDetails lDALInvoiceDetails = new DALInvoiceDetails(InvoiceDetails);
                    lDALInvoiceDetails.OpenInvoiceDetails("");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(InvoiceDetails.GetProto());
        }

        public override async Task<protoInvoiceDetails> DeleteInvoiceDetails(protoLongData aprotoLongData, ServerCallContext context)
        {
            InvoiceDetails InvoiceDetails = new InvoiceDetails();
            try
            {
                if (aprotoLongData != null && aprotoLongData.Data > 0)
                {
                    InvoiceDetails.order_detail_id = aprotoLongData.Data;
                    DALInvoiceDetails lDALInvoiceDetails = new DALInvoiceDetails(InvoiceDetails);
                    lDALInvoiceDetails.DeleteInvoiceDetails("");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(InvoiceDetails.GetProto());
        }
        #endregion

        #region InvoiceDetailsItems
        public override async Task<protoInvoiceDetailsItems> CreateNewInvoiceDetailsItems(Empty empty, ServerCallContext context)
        {
            protoInvoiceDetailsItems lprotoInvoiceDetailsItems = new protoInvoiceDetailsItems();
            try
            {

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(lprotoInvoiceDetailsItems);
        }

        public override async Task<protoInvoiceDetailsItems> SaveInvoiceDetailsItems(protoInvoiceDetailsItems aprotoInvoiceDetailsItems, ServerCallContext context)
        {
            InvoiceDetailsItems InvoiceDetailsItems = new InvoiceDetailsItems();
            try
            {
                InvoiceDetailsItems.GetData(aprotoInvoiceDetailsItems);
                DALInvoiceDetailsItems lDALInvoiceDetailsItems = new DALInvoiceDetailsItems(InvoiceDetailsItems);
                lDALInvoiceDetailsItems.SaveInvoiceDetailsItems("");
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(InvoiceDetailsItems.GetProto());
        }

        public override async Task<protoInvoiceDetailsItems> UpdateInvoiceDetailsItems(protoInvoiceDetailsItems aprotoInvoiceDetailsItems, ServerCallContext context)
        {
            InvoiceDetailsItems InvoiceDetailsItems = new InvoiceDetailsItems();
            try
            {
                InvoiceDetailsItems.GetData(aprotoInvoiceDetailsItems);
                DALInvoiceDetailsItems lDALInvoiceDetailsItems = new DALInvoiceDetailsItems(InvoiceDetailsItems);
                lDALInvoiceDetailsItems.UpdateInvoiceDetailsItems("");
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(InvoiceDetailsItems.GetProto());
        }

        public override async Task<protoInvoiceDetailsItems> OpenInvoiceDetailsItems(protoLongData aprotoLongData, ServerCallContext context)
        {
            InvoiceDetailsItems InvoiceDetailsItems = new InvoiceDetailsItems();
            try
            {
                if (aprotoLongData != null && aprotoLongData.Data > 0)
                {
                    InvoiceDetailsItems.invoice_detail_item_id = aprotoLongData.Data;
                    DALInvoiceDetailsItems lDALInvoiceDetailsItems = new DALInvoiceDetailsItems(InvoiceDetailsItems);
                    lDALInvoiceDetailsItems.OpenInvoiceDetailsItems("");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(InvoiceDetailsItems.GetProto());
        }

        public override async Task<protoInvoiceDetailsItems> DeleteInvoiceDetailsItems(protoLongData aprotoLongData, ServerCallContext context)
        {
            InvoiceDetailsItems InvoiceDetailsItems = new InvoiceDetailsItems();
            try
            {
                if (aprotoLongData != null && aprotoLongData.Data > 0)
                {
                    InvoiceDetailsItems.invoice_detail_item_id = aprotoLongData.Data;
                    DALInvoiceDetailsItems lDALInvoiceDetailsItems = new DALInvoiceDetailsItems(InvoiceDetailsItems);
                    lDALInvoiceDetailsItems.DeleteInvoiceDetailsItems("");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(InvoiceDetailsItems.GetProto());
        }
        #endregion

        #region OrderDeliverySlipDetail
        public override async Task<protoOrderDeliverySlipDetail> CreateNewOrderDeliverySlipDetail(Empty empty, ServerCallContext context)
        {
            protoOrderDeliverySlipDetail lprotoOrderDeliverySlipDetail = new protoOrderDeliverySlipDetail();
            try
            {

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(lprotoOrderDeliverySlipDetail);
        }

        public override async Task<protoOrderDeliverySlipDetail> SaveOrderDeliverySlipDetail(protoOrderDeliverySlipDetail aprotoOrderDeliverySlipDetail, ServerCallContext context)
        {
            OrderDeliverySlipDetails lOrderDeliverySlipDetails = new OrderDeliverySlipDetails();
            try
            {
                lOrderDeliverySlipDetails.GetData(aprotoOrderDeliverySlipDetail);
                DALOrderDeliverySlipDetails lDALOrderDeliverySlipDetail = new DALOrderDeliverySlipDetails(lOrderDeliverySlipDetails);
                lDALOrderDeliverySlipDetail.SaveOrderDeliverySlipDetails("");
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(lOrderDeliverySlipDetails.GetProto());
        }

        public override async Task<protoOrderDeliverySlipDetail> UpdateOrderDeliverySlipDetail(protoOrderDeliverySlipDetail aprotoOrderDeliverySlipDetail, ServerCallContext context)
        {
            OrderDeliverySlipDetails lOrderDeliverySlipDetails = new OrderDeliverySlipDetails();
            try
            {
                lOrderDeliverySlipDetails.GetData(aprotoOrderDeliverySlipDetail);
                DALOrderDeliverySlipDetails lDALOrderDeliverySlipDetail = new DALOrderDeliverySlipDetails(lOrderDeliverySlipDetails);
                lDALOrderDeliverySlipDetail.UpdateOrderDeliverySlipDetails("");
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(lOrderDeliverySlipDetails.GetProto());
        }

        public override async Task<protoOrderDeliverySlipDetail> OpenOrderDeliverySlipDetail(protoLongData aprotoLongData, ServerCallContext context)
        {
            OrderDeliverySlipDetails lOrderDeliverySlipDetails = new OrderDeliverySlipDetails();
            try
            {
                if (aprotoLongData != null && aprotoLongData.Data > 0)
                {
                    lOrderDeliverySlipDetails.order_delivery_slip_detail_id = aprotoLongData.Data;
                    DALOrderDeliverySlipDetails lDALOrderDeliverySlipDetail = new DALOrderDeliverySlipDetails(lOrderDeliverySlipDetails);
                    lDALOrderDeliverySlipDetail.OpenOrderDeliverySlipDetails("");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(lOrderDeliverySlipDetails.GetProto());
        }

        public override async Task<protoOrderDeliverySlipDetail> DeleteOrderDeliverySlipDetail(protoLongData aprotoLongData, ServerCallContext context)
        {
            OrderDeliverySlipDetails lOrderDeliverySlipDetails = new OrderDeliverySlipDetails();
            try
            {
                if (aprotoLongData != null && aprotoLongData.Data > 0)
                {
                    lOrderDeliverySlipDetails.order_delivery_slip_detail_id = aprotoLongData.Data;
                    DALOrderDeliverySlipDetails lDALOrderDeliverySlipDetail = new DALOrderDeliverySlipDetails(lOrderDeliverySlipDetails);
                    lDALOrderDeliverySlipDetail.DeleteOrderDeliverySlipDetails("");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(lOrderDeliverySlipDetails.GetProto());
        }
        #endregion

        #region OrderDeliverySlipDetailsItems
        public override async Task<protoOrderDeliverySlipDetailsItems> CreateNewOrderDeliverySlipDetailsItems(Empty empty, ServerCallContext context)
        {
            protoOrderDeliverySlipDetailsItems lprotoOrderDeliverySlipDetailsItems = new protoOrderDeliverySlipDetailsItems();
            try
            {

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(lprotoOrderDeliverySlipDetailsItems);
        }

        public override async Task<protoOrderDeliverySlipDetailsItems> SaveOrderDeliverySlipDetailsItems(protoOrderDeliverySlipDetailsItems aprotoOrderDeliverySlipDetailsItems, ServerCallContext context)
        {
            OrderDeliverySlipDetailsItems lOrderDeliverySlipDetailsItems = new OrderDeliverySlipDetailsItems();
            try
            {
                lOrderDeliverySlipDetailsItems.GetData(aprotoOrderDeliverySlipDetailsItems);
                DALOrderDeliverySlipDetailsItems lDALOrderDeliverySlipDetailsItems = new DALOrderDeliverySlipDetailsItems(lOrderDeliverySlipDetailsItems);
                lDALOrderDeliverySlipDetailsItems.SaveOrderDeliverySlipDetailsItems("");
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(lOrderDeliverySlipDetailsItems.GetProto());
        }

        public override async Task<protoOrderDeliverySlipDetailsItems> UpdateOrderDeliverySlipDetailsItems(protoOrderDeliverySlipDetailsItems aprotoOrderDeliverySlipDetailsItems, ServerCallContext context)
        {
            OrderDeliverySlipDetailsItems lOrderDeliverySlipDetailsItems = new OrderDeliverySlipDetailsItems();
            try
            {
                lOrderDeliverySlipDetailsItems.GetData(aprotoOrderDeliverySlipDetailsItems);
                DALOrderDeliverySlipDetailsItems lDALOrderDeliverySlipDetailsItems = new DALOrderDeliverySlipDetailsItems(lOrderDeliverySlipDetailsItems);
                lDALOrderDeliverySlipDetailsItems.UpdateOrderDeliverySlipDetailsItems("");
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(lOrderDeliverySlipDetailsItems.GetProto());
        }

        public override async Task<protoOrderDeliverySlipDetailsItems> OpenOrderDeliverySlipDetailsItems(protoLongData aprotoLongData, ServerCallContext context)
        {
            OrderDeliverySlipDetailsItems lOrderDeliverySlipDetailsItems = new OrderDeliverySlipDetailsItems();
            try
            {
                if (aprotoLongData != null && aprotoLongData.Data > 0)
                {
                    lOrderDeliverySlipDetailsItems.order_delivery_slip_detail_items_id = aprotoLongData.Data;
                    DALOrderDeliverySlipDetailsItems lDALOrderDeliverySlipDetailsItems = new DALOrderDeliverySlipDetailsItems(lOrderDeliverySlipDetailsItems);
                    lDALOrderDeliverySlipDetailsItems.OpenOrderDeliverySlipDetailsItems("");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(lOrderDeliverySlipDetailsItems.GetProto());
        }

        public override async Task<protoOrderDeliverySlipDetailsItems> DeleteOrderDeliverySlipDetailsItems(protoLongData aprotoLongData, ServerCallContext context)
        {
            OrderDeliverySlipDetailsItems lOrderDeliverySlipDetailsItems = new OrderDeliverySlipDetailsItems();
            try
            {
                if (aprotoLongData != null && aprotoLongData.Data > 0)
                {
                    lOrderDeliverySlipDetailsItems.order_delivery_slip_detail_items_id = aprotoLongData.Data;
                    DALOrderDeliverySlipDetailsItems lDALOrderDeliverySlipDetailsItems = new DALOrderDeliverySlipDetailsItems(lOrderDeliverySlipDetailsItems);
                    lDALOrderDeliverySlipDetailsItems.DeleteOrderDeliverySlipDetailsItems("");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(lOrderDeliverySlipDetailsItems.GetProto());
        }
        #endregion

        #region Product
        public override async Task<protoProduct> CreateNewProduct(Empty empty, ServerCallContext context)
        {
            protoProduct lprotoProduct = new protoProduct();
            try
            {

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(lprotoProduct);
        }

        public override async Task<protoProduct> SaveProduct(protoProduct aprotoProduct, ServerCallContext context)
        {
            Product Product = new Product();
            try
            {
                Product.GetData(aprotoProduct);
                DALProduct lDALProduct = new DALProduct(Product);
                lDALProduct.SaveProduct("");
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(Product.GetProto());
        }

        public override async Task<protoProduct> UpdateProduct(protoProduct aprotoProduct, ServerCallContext context)
        {
            Product Product = new Product();
            try
            {
                Product.GetData(aprotoProduct);
                DALProduct lDALProduct = new DALProduct(Product);
                lDALProduct.UpdateProduct("");
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(Product.GetProto());
        }

        public override async Task<protoProduct> OpenProduct(protoLongData aprotoLongData, ServerCallContext context)
        {
            Product Product = new Product();
            try
            {
                if (aprotoLongData != null && aprotoLongData.Data > 0)
                {
                    Product.product_id = aprotoLongData.Data;
                    DALProduct lDALProduct = new DALProduct(Product);
                    lDALProduct.OpenProduct("");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(Product.GetProto());
        }

        public override async Task<protoProduct> DeleteProduct(protoLongData aprotoLongData, ServerCallContext context)
        {
            Product Product = new Product();
            try
            {
                if (aprotoLongData != null && aprotoLongData.Data > 0)
                {
                    Product.product_id = aprotoLongData.Data;
                    DALProduct lDALProduct = new DALProduct(Product);
                    lDALProduct.DeleteProduct("");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(Product.GetProto());
        }
        #endregion
    }
}

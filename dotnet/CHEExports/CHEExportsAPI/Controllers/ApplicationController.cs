using CHEExportsProto;
using Google.Protobuf.WellKnownTypes;
using Grpc.Core;
using Grpc.Net.Client;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace CHEExportsAPI
{
    [ApiController]
    public class ApplicationController : ControllerBase
    {
        private Metadata Metadata = new Metadata();
        private readonly string Token;
          public const string SERVICE_ENDPOINT = "http://localhost:5243";
        public ApplicationController(IHttpContextAccessor context)
        {
            Token = context.HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            if (!string.IsNullOrWhiteSpace(Token))
            {
                Metadata.Add("Authorization", Token);
            }
            else
            {
                Metadata.Add("Authorization", string.Empty);
            }
        }
        #region Company
        [HttpGet]
        [Route("CreateNewCompany")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "CreateNewCompany")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoCompany))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> CreateNewCompany()
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoCompany lprotoCompany = await client1.CreateNewCompanyAsync(empty,Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoCompany));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }

        [HttpPost]
        [Route("SaveCompany")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "SaveCompany")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoCompany))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> SaveCompany(protoCompany aprotoCompany)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoCompany lprotoCompany = await client1.SaveCompanyAsync(aprotoCompany, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoCompany));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }

        [HttpPost]
        [Route("UpdateCompany")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "UpdateCompany")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoCompany))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> UpdateCompany(protoCompany aprotoCompany)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoCompany lprotoCompany = await client1.UpdateCompanyAsync(aprotoCompany, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoCompany));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }


        [HttpPost]
        [Route("OpenCompany")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "OpenCompany")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoCompany))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> OpenCompany(protoLongData aprotoLongData)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoCompany lprotoCompany = await client1.OpenCompanyAsync(aprotoLongData, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoCompany));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }


        [HttpPost]
        [Route("DeleteCompany")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "DeleteCompany")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoCompany))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> DeleteCompany(protoLongData aprotoLongData)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoCompany lprotoCompany = await client1.DeleteCompanyAsync(aprotoLongData, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoCompany));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }
        #endregion

        #region Customer
        [HttpGet]
        [Route("GetInitialDataCustomerAndVendor")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "GetInitialDataCustomerAndVendor")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(entDDLData))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> GetInitialDataCustomerAndVendor()
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    entDDLData lentDDLData = await client1.GetInitialDataCustomerAndVendorAsync(empty);
                    return await Task.FromResult(this.GetResponse(lentDDLData));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }
        [HttpGet]
        [Route("CreateNewCustomerSearch")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "CreateNewCustomerSearch")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoCustomerSearch))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> CreateNewCustomerSearch()
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoCustomerSearch lprotoCustomerSearch = await client1.CreateNewCustomerSearchAsync(empty);
                    return await Task.FromResult(this.GetResponse(lprotoCustomerSearch));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }

        [HttpPost]
        [Route("SearchCustomer")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "SearchCustomer")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoCustomerSearchResult))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> SearchCustomer(protoCustomerSearch aprotoCustomerSearch)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoCustomerSearchResult lprotoCustomerSearchResult = await client1.SearchCustomerAsync(aprotoCustomerSearch);
                    return await Task.FromResult(this.GetResponse(lprotoCustomerSearchResult));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }
        [HttpGet]
        [Route("CreateNewCustomer")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "CreateNewCustomer")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoCustomer))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> CreateNewCustomer()
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoCustomer lprotoCustomer = await client1.CreateNewCustomerAsync(empty, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoCustomer));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }

        [HttpPost]
        [Route("SaveCustomer")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "SaveCustomer")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoCustomer))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> SaveCustomer(protoCustomer aprotoCustomer)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoCustomer lprotoCustomer = await client1.SaveCustomerAsync(aprotoCustomer, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoCustomer));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }

        [HttpPost]
        [Route("UpdateCustomer")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "UpdateCustomer")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoCustomer))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> UpdateCustomer(protoCustomer aprotoCustomer)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoCustomer lprotoCustomer = await client1.UpdateCustomerAsync(aprotoCustomer, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoCustomer));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }


        [HttpPost]
        [Route("OpenCustomer")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "OpenCustomer")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoCustomer))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> OpenCustomer(protoLongData aprotoLongData)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoCustomer lprotoCustomer = await client1.OpenCustomerAsync(aprotoLongData, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoCustomer));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }


        [HttpPost]
        [Route("DeleteCustomer")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "DeleteCustomer")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoCustomer))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> DeleteCustomer(protoLongData aprotoLongData)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoCustomer lprotoCustomer = await client1.DeleteCustomerAsync(aprotoLongData, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoCustomer));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }
        #endregion

        #region InvoiceDetails
        [HttpGet]
        [Route("CreateNewInvoiceDetails")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "CreateNewInvoiceDetails")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoInvoiceDetails))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> CreateNewInvoiceDetails()
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoInvoiceDetails lprotoInvoiceDetails = await client1.CreateNewInvoiceDetailsAsync(empty, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoInvoiceDetails));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }


        [HttpPost]
        [Route("SaveInvoiceDetails")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "SaveInvoiceDetails")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoInvoiceDetails))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> SaveInvoiceDetails(protoInvoiceDetails aprotoInvoiceDetails)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoInvoiceDetails lprotoInvoiceDetails = await client1.SaveInvoiceDetailsAsync(aprotoInvoiceDetails, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoInvoiceDetails));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }

        [HttpPost]
        [Route("UpdateInvoiceDetails")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "UpdateInvoiceDetails")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoInvoiceDetails))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> UpdateInvoiceDetails(protoInvoiceDetails aprotoInvoiceDetails)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoInvoiceDetails lprotoInvoiceDetails = await client1.UpdateInvoiceDetailsAsync(aprotoInvoiceDetails, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoInvoiceDetails));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }


        [HttpPost]
        [Route("OpenInvoiceDetails")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "OpenInvoiceDetails")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoInvoiceDetails))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> OpenInvoiceDetails(protoLongData aprotoLongData)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoInvoiceDetails lprotoInvoiceDetails = await client1.OpenInvoiceDetailsAsync(aprotoLongData, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoInvoiceDetails));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }


        [HttpPost]
        [Route("DeleteInvoiceDetails")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "DeleteInvoiceDetails")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoInvoiceDetails))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> DeleteInvoiceDetails(protoLongData aprotoLongData)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoInvoiceDetails lprotoInvoiceDetails = await client1.DeleteInvoiceDetailsAsync(aprotoLongData, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoInvoiceDetails));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }
        #endregion

        #region InvoiceDetailsItems
        [HttpGet]
        [Route("CreateNewInvoiceDetailsItems")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "CreateNewInvoiceDetailsItems")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoInvoiceDetailsItems))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> CreateNewInvoiceDetailsItems()
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoInvoiceDetailsItems lprotoInvoiceDetailsItems = await client1.CreateNewInvoiceDetailsItemsAsync(empty, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoInvoiceDetailsItems));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }


        [HttpPost]
        [Route("SaveInvoiceDetailsItems")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "SaveInvoiceDetailsItems")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoInvoiceDetailsItems))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> SaveInvoiceDetailsItems(protoInvoiceDetailsItems aprotoInvoiceDetailsItems)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoInvoiceDetailsItems lprotoInvoiceDetailsItems = await client1.SaveInvoiceDetailsItemsAsync(aprotoInvoiceDetailsItems, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoInvoiceDetailsItems));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }

        [HttpPost]
        [Route("UpdateInvoiceDetailsItems")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "UpdateInvoiceDetailsItems")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoInvoiceDetailsItems))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> UpdateInvoiceDetailsItems(protoInvoiceDetailsItems aprotoInvoiceDetailsItems)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoInvoiceDetailsItems lprotoInvoiceDetailsItems = await client1.UpdateInvoiceDetailsItemsAsync(aprotoInvoiceDetailsItems, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoInvoiceDetailsItems));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }


        [HttpPost]
        [Route("OpenInvoiceDetailsItems")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "OpenInvoiceDetailsItems")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoInvoiceDetailsItems))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> OpenInvoiceDetailsItems(protoLongData aprotoLongData)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoInvoiceDetailsItems lprotoInvoiceDetailsItems = await client1.OpenInvoiceDetailsItemsAsync(aprotoLongData, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoInvoiceDetailsItems));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }


        [HttpPost]
        [Route("DeleteInvoiceDetailsItems")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "DeleteInvoiceDetailsItems")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoInvoiceDetailsItems))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> DeleteInvoiceDetailsItems(protoLongData aprotoLongData)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoInvoiceDetailsItems lprotoInvoiceDetailsItems = await client1.DeleteInvoiceDetailsItemsAsync(aprotoLongData, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoInvoiceDetailsItems));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }
        #endregion

        #region LRDetails
        [HttpGet]
        [Route("CreateNewLRDetails")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "CreateNewLRDetails")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoLRDetails))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> CreateNewLRDetails()
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoLRDetails lprotoInvoiceDetails = await client1.CreateNewLRDetailsAsync(empty, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoInvoiceDetails));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }

        [HttpPost]
        [Route("SaveLRDetails")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "SaveLRDetails")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoLRDetails))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> SaveLRDetails(protoLRDetails aprotoLRDetails)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoLRDetails lprotoLRDetails = await client1.SaveLRDetailsAsync(aprotoLRDetails, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoLRDetails));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }

        [HttpPost]
        [Route("UpdateLRDetails")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "UpdateLRDetails")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoLRDetails))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> UpdateLRDetails(protoLRDetails aprotoLRDetails)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoLRDetails lprotoLRDetails = await client1.UpdateLRDetailsAsync(aprotoLRDetails, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoLRDetails));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }


        [HttpPost]
        [Route("OpenLRDetails")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "OpenLRDetails")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoLRDetails))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> OpenLRDetails(protoLongData aprotoLongData)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoLRDetails lprotoLRDetails = await client1.OpenLRDetailsAsync(aprotoLongData, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoLRDetails));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }


        [HttpPost]
        [Route("DeleteLRDetails")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "DeleteLRDetails")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoLRDetails))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> DeleteLRDetails(protoLongData aprotoLongData)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoLRDetails lprotoLRDetails = await client1.DeleteLRDetailsAsync(aprotoLongData, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoLRDetails));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }
        #endregion

        #region OrderDeliverySlipDetails

        [HttpGet]
        [Route("CreateNewOrderDeliverySlipDetail")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "CreateNewOrderDeliverySlipDetail")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoOrderDeliverySlipDetail))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> CreateNewOrderDeliverySlipDetail()
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoOrderDeliverySlipDetail lprotoInvoiceDetails = await client1.CreateNewOrderDeliverySlipDetailAsync(empty, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoInvoiceDetails));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }
        [HttpPost]
        [Route("SaveOrderDeliverySlipDetail")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "SaveOrderDeliverySlipDetail")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoOrderDeliverySlipDetail))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> SaveOrderDeliverySlipDetail(protoOrderDeliverySlipDetail aprotoOrderDeliverySlipDetails)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoOrderDeliverySlipDetail lprotoOrderDeliverySlipDetails = await client1.SaveOrderDeliverySlipDetailAsync(aprotoOrderDeliverySlipDetails, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoOrderDeliverySlipDetails));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }

        [HttpPost]
        [Route("UpdateOrderDeliverySlipDetail")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "UpdateOrderDeliverySlipDetail")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoOrderDeliverySlipDetail))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> UpdateOrderDeliverySlipDetail(protoOrderDeliverySlipDetail aprotoOrderDeliverySlipDetails)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoOrderDeliverySlipDetail lprotoOrderDeliverySlipDetails = await client1.UpdateOrderDeliverySlipDetailAsync(aprotoOrderDeliverySlipDetails, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoOrderDeliverySlipDetails));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }


        [HttpPost]
        [Route("OpenOrderDeliverySlipDetail")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "OpenOrderDeliverySlipDetail")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoOrderDeliverySlipDetail))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> OpenOrderDeliverySlipDetail(protoLongData aprotoLongData)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoOrderDeliverySlipDetail lprotoOrderDeliverySlipDetails = await client1.OpenOrderDeliverySlipDetailAsync(aprotoLongData, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoOrderDeliverySlipDetails));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }


        [HttpPost]
        [Route("DeleteOrderDeliverySlipDetail")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "DeleteOrderDeliverySlipDetail")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoOrderDeliverySlipDetail))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> DeleteOrderDeliverySlipDetail(protoLongData aprotoLongData)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoOrderDeliverySlipDetail lprotoOrderDeliverySlipDetails = await client1.DeleteOrderDeliverySlipDetailAsync(aprotoLongData   , Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoOrderDeliverySlipDetails));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }
        #endregion

        #region OrderDeliverySlipDetailsItems

        [HttpGet]
        [Route("CreateNewOrderDeliverySlipDetailsItems")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "CreateNewOrderDeliverySlipDetailsItems")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoOrderDeliverySlipDetailsItems))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> CreateNewOrderDeliverySlipDetailsItems()
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoOrderDeliverySlipDetailsItems lprotoInvoiceDetails = await client1.CreateNewOrderDeliverySlipDetailsItemsAsync(empty, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoInvoiceDetails));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }
        [HttpPost]
        [Route("SaveOrderDeliverySlipDetailsItems")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "SaveOrderDeliverySlipDetailsItems")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoOrderDeliverySlipDetailsItems))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> SaveOrderDeliverySlipDetailsItems(protoOrderDeliverySlipDetailsItems aprotoOrderDeliverySlipDetailsItemss)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoOrderDeliverySlipDetailsItems lprotoOrderDeliverySlipDetailsItemss = await client1.SaveOrderDeliverySlipDetailsItemsAsync(aprotoOrderDeliverySlipDetailsItemss, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoOrderDeliverySlipDetailsItemss));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }

        [HttpPost]
        [Route("UpdateOrderDeliverySlipDetailsItems")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "UpdateOrderDeliverySlipDetailsItems")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoOrderDeliverySlipDetailsItems))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> UpdateOrderDeliverySlipDetailsItems(protoOrderDeliverySlipDetailsItems aprotoOrderDeliverySlipDetailsItemss)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoOrderDeliverySlipDetailsItems lprotoOrderDeliverySlipDetailsItemss = await client1.UpdateOrderDeliverySlipDetailsItemsAsync(aprotoOrderDeliverySlipDetailsItemss, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoOrderDeliverySlipDetailsItemss));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }


        [HttpPost]
        [Route("OpenOrderDeliverySlipDetailsItems")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "OpenOrderDeliverySlipDetailsItems")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoOrderDeliverySlipDetailsItems))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> OpenOrderDeliverySlipDetailsItems(protoLongData aprotoLongData)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoOrderDeliverySlipDetailsItems lprotoOrderDeliverySlipDetailsItemss = await client1.OpenOrderDeliverySlipDetailsItemsAsync(aprotoLongData, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoOrderDeliverySlipDetailsItemss));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }


        [HttpPost]
        [Route("DeleteOrderDeliverySlipDetailsItems")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "DeleteOrderDeliverySlipDetailsItems")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoOrderDeliverySlipDetailsItems))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> DeleteOrderDeliverySlipDetailsItems(protoLongData aprotoLongData)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoOrderDeliverySlipDetailsItems lprotoOrderDeliverySlipDetailsItemss = await client1.DeleteOrderDeliverySlipDetailsItemsAsync(aprotoLongData   , Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoOrderDeliverySlipDetailsItemss));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }
        #endregion

        #region OrderDetails
        [HttpGet]
        [Route("CreateNewOrderDetailsSearch")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "CreateNewOrderDetailsSearch")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoOrderDetailsSearch))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> CreateNewOrderDetailsSearch()
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoOrderDetailsSearch lprotoOrderDetailsSearch = await client1.CreateNewOrderDetailsSearchAsync(empty);
                    return await Task.FromResult(this.GetResponse(lprotoOrderDetailsSearch));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }

        [HttpPost]
        [Route("SearchOrderDetails")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "SearchOrderDetails")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoOrderDetailsResult))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> SearchOrderDetails(protoOrderDetailsSearch aprotoOrderDetailsSearch)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoOrderDetailsResult lprotoOrderDetailsResult = await client1.SearchOrderDetailsAsync(aprotoOrderDetailsSearch);
                    return await Task.FromResult(this.GetResponse(lprotoOrderDetailsResult));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }
        [HttpGet]
        [Route("GetInitialDataForOrder")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "GetInitialDataForOrder")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(entDDLData))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> GetInitialDataForOrder()
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    entDDLData lentDDLData = await client1.GetInitialDataForOrderAsync(empty, Metadata);
                    return await Task.FromResult(this.GetResponse(lentDDLData));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }

        [HttpGet]
        [Route("CreateNewOrderDetails")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "CreateNewOrderDetails")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoOrderDetails))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> CreateNewOrderDetails()
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoOrderDetails lprotoOrderDetails = await client1.CreateNewOrderDetailsAsync(empty, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoOrderDetails));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }

        [HttpPost]
        [Route("SaveOrderDetails")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "SaveOrderDetails")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoOrderDetails))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> SaveOrderDetails(protoOrderDetails aprotoOrderDetails)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoOrderDetails lprotoOrderDetails = await client1.SaveOrderDetailsAsync(aprotoOrderDetails, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoOrderDetails));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }

        [HttpPost]
        [Route("UpdateOrderDetails")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "UpdateOrderDetails")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoOrderDetails))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> UpdateOrderDetails(protoOrderDetails aprotoOrderDetails)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoOrderDetails lprotoOrderDetails = await client1.UpdateOrderDetailsAsync(aprotoOrderDetails, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoOrderDetails));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }


        [HttpPost]
        [Route("OpenOrderDetails")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "OpenOrderDetails")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoOrderDetails))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> OpenOrderDetails(protoLongData aprotoLongData)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoOrderDetails lprotoOrderDetails = await client1.OpenOrderDetailsAsync(aprotoLongData, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoOrderDetails));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }


        [HttpPost]
        [Route("DeleteOrderDetails")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "DeleteOrderDetails")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoOrderDetails))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> DeleteOrderDetails(protoLongData aprotoLongData)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoOrderDetails lprotoOrderDetails = await client1.DeleteOrderDetailsAsync(aprotoLongData, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoOrderDetails));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }
        #endregion

        #region Product

        [HttpGet]
        [Route("CreateNewProduct")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "CreateNewProduct")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoProduct))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> CreateNewProduct()
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoProduct lprotoOrderDetails = await client1.CreateNewProductAsync(empty, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoOrderDetails));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }
        [HttpPost]
        [Route("SaveProduct")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "SaveProduct")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoProduct))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> SaveProduct(protoProduct aprotoProduct)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoProduct lprotoProduct = await client1.SaveProductAsync(aprotoProduct, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoProduct));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }

        [HttpPost]
        [Route("UpdateProduct")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "UpdateProduct")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoProduct))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> UpdateProduct(protoProduct aprotoProduct)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoProduct lprotoProduct = await client1.UpdateProductAsync(aprotoProduct, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoProduct));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }


        [HttpPost]
        [Route("OpenProduct")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "OpenProduct")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoProduct))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> OpenProduct(protoLongData aprotoLongData)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoProduct lprotoProduct = await client1.OpenProductAsync(aprotoLongData, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoProduct));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }


        [HttpPost]
        [Route("DeleteProduct")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "DeleteProduct")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoProduct))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> DeleteProduct(protoLongData aprotoLongData)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoProduct lprotoProduct = await client1.DeleteProductAsync(aprotoLongData, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoProduct));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }
        #endregion

        #region Vendor

        [HttpGet]
        [Route("CreateNewVendor")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "CreateNewVendor")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoVendor))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> CreateNewVendor()
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoVendor lprotoOrderDetails = await client1.CreateNewVendorAsync(empty, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoOrderDetails));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }
        [HttpPost]
        [Route("SaveVendor")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "SaveVendor")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoVendor))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> SaveVendor(protoVendor aprotoVendor)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoVendor lprotoVendor = await client1.SaveVendorAsync(aprotoVendor, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoVendor));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }

        [HttpPost]
        [Route("UpdateVendor")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "UpdateVendor")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoVendor))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> UpdateVendor(protoVendor aprotoVendor)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoVendor lprotoVendor = await client1.UpdateVendorAsync(aprotoVendor, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoVendor));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }


        [HttpPost]
        [Route("OpenVendor")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "OpenVendor")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoVendor))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> OpenVendor(protoLongData aprotoLongData)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoVendor lprotoVendor = await client1.OpenVendorAsync(aprotoLongData, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoVendor));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }


        [HttpPost]
        [Route("DeleteVendor")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "DeleteVendor")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoVendor))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> DeleteVendor(protoLongData aprotoLongData)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoVendor lprotoVendor = await client1.DeleteVendorAsync(aprotoLongData, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoVendor));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }
        #endregion

        #region WareHouse
        [HttpGet]
        [Route("CreateNewWareHouse")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "CreateNewWareHouse")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoWareHouse))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> CreateNewWareHouse()
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoWareHouse lprotoWareHouse = await client1.CreateNewWareHouseAsync(empty, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoWareHouse));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }

        [HttpPost]
        [Route("SaveWareHouse")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "SaveWareHouse")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoWareHouse))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> SaveWareHouse(protoWareHouse aprotoWareHouse)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoWareHouse lprotoWareHouse = await client1.SaveWareHouseAsync(aprotoWareHouse, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoWareHouse));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }

        [HttpPost]
        [Route("UpdateWareHouse")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "UpdateWareHouse")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoWareHouse))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> UpdateWareHouse(protoWareHouse aprotoWareHouse)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoWareHouse lprotoWareHouse = await client1.UpdateWareHouseAsync(aprotoWareHouse, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoWareHouse));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }


        [HttpPost]
        [Route("OpenWareHouse")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "OpenWareHouse")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoWareHouse))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> OpenWareHouse(protoLongData aprotoLongData)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoWareHouse lprotoWareHouse = await client1.OpenWareHouseAsync(aprotoLongData, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoWareHouse));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }


        [HttpPost]
        [Route("DeleteWareHouse")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "DeleteWareHouse")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoWareHouse))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> DeleteWareHouse(protoLongData aprotoLongData)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new ApplicationService.ApplicationServiceClient(channel1);
                    Empty empty = new Empty();
                    protoWareHouse lprotoWareHouse = await client1.DeleteWareHouseAsync(aprotoLongData, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoWareHouse));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }
        #endregion
    }
}

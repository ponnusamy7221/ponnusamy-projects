using CHEExportsProto;
using Google.Protobuf.WellKnownTypes;
using Grpc.Core;
using Grpc.Net.Client;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace CHEExportsAPI
{
    [ApiController]
    [Route("Admin")]
    public class AdminController : ControllerBase
    {
        private Metadata Metadata = new Metadata();
        private readonly string Token;
        public const string SERVICE_ENDPOINT = "http://localhost:5243";
        public AdminController(IHttpContextAccessor context)
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

        [HttpPost]
        [Route("AuthenticateUser")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "AuthenticateUser")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoStringData))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> AuthenticateUser(protoLoginCredentials aprotoLoginCredentials)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new AdminService.AdminServiceClient(channel1);
                    Empty empty = new Empty();
                    protoLoggedInDetails lprotoLoggedInDetails = await client1.AuthenticateUserAsync(aprotoLoginCredentials,Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoLoggedInDetails));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }


        [HttpPost]
        [Route("SaveUser")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "SaveUser")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoUser))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> SaveUser(protoUser aprotoUser)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new AdminService.AdminServiceClient(channel1);
                    Empty empty = new Empty();
                    protoUser lprotoUser = await client1.SaveUserAsync(aprotoUser);
                    return await Task.FromResult(this.GetResponse(lprotoUser));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }


        [HttpPost]
        [Route("UpdateUser")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "UpdateUser")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoUser))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> UpdateUser(protoUser aprotoUser)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new AdminService.AdminServiceClient(channel1);
                    Empty empty = new Empty();
                    protoUser lprotoUser = await client1.UpdateUserAsync(aprotoUser);
                    return await Task.FromResult(this.GetResponse(lprotoUser));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }


        [HttpPost]
        [Route("OpenUser")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "OpenUser")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoUser))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> OpenUser(protoLongData aprotoLongData)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new AdminService.AdminServiceClient(channel1);
                    Empty empty = new Empty();
                    protoUser lprotoUser = await client1.OpenUserAsync(aprotoLongData, Metadata);
                    return await Task.FromResult(this.GetResponse(lprotoUser));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }


        [HttpPost]
        [Route("DeleteUser")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "DeleteUser")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoUser))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> DeleteUser(protoLongData aprotoLongData)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new AdminService.AdminServiceClient(channel1);
                    Empty empty = new Empty();
                    protoUser lprotoUser = await client1.DeleteUserAsync(aprotoLongData);
                    return await Task.FromResult(this.GetResponse(lprotoUser));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }
#region MasterConfig
        [HttpGet]
        [Route("CreateNewMasterConfig")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "CreateNewMasterConfig")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoMasterConfig))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> CreateNewMasterConfig()
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new AdminService.AdminServiceClient(channel1);
                    Empty empty = new Empty();
                    protoMasterConfig lprotoMasterConfig = await client1.CreateNewMasterConfigAsync(empty);
                    return await Task.FromResult(this.GetResponse(lprotoMasterConfig));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }

        [HttpPost]
        [Route("SaveMasterConfig")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "SaveMasterConfig")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoMasterConfig))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> SaveMasterConfig(protoMasterConfig aprotoMasterConfig)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new AdminService.AdminServiceClient(channel1);
                    Empty empty = new Empty();
                    protoMasterConfig lprotoMasterConfig = await client1.SaveMasterConfigAsync(aprotoMasterConfig);
                    return await Task.FromResult(this.GetResponse(lprotoMasterConfig));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }

        [HttpPost]
        [Route("UpdateMasterConfig")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "UpdateMasterConfig")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoMasterConfig))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> UpdateMasterConfig(protoMasterConfig aprotoMasterConfig)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new AdminService.AdminServiceClient(channel1);
                    Empty empty = new Empty();
                    protoMasterConfig lprotoMasterConfig = await client1.UpdateMasterConfigAsync(aprotoMasterConfig);
                    return await Task.FromResult(this.GetResponse(lprotoMasterConfig));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }


        [HttpPost]
        [Route("OpenMasterConfig")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "OpenMasterConfig")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoMasterConfig))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> OpenMasterConfig(protoLongData aprotoLongData)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new AdminService.AdminServiceClient(channel1);
                    Empty empty = new Empty();
                    protoMasterConfig lprotoMasterConfig = await client1.OpenMasterConfigAsync(aprotoLongData);
                    return await Task.FromResult(this.GetResponse(lprotoMasterConfig));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }


        [HttpPost]
        [Route("DeleteMasterConfig")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "DeleteMasterConfig")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoMasterConfig))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> DeleteMasterConfig(protoLongData aprotoLongData)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new AdminService.AdminServiceClient(channel1);
                    Empty empty = new Empty();
                    protoMasterConfig lprotoMasterConfig = await client1.DeleteMasterConfigAsync(aprotoLongData);
                    return await Task.FromResult(this.GetResponse(lprotoMasterConfig));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }
        #endregion

        #region MessageConfig
        [HttpGet]
        [Route("CreateNewMessageConfig")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "CreateNewMessageConfig")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoMessageConfig))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> CreateNewMessageConfig()
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new AdminService.AdminServiceClient(channel1);
                    Empty empty = new Empty();
                    protoMessageConfig lprotoMessageConfig = await client1.CreateNewMessageConfigAsync(empty);
                    return await Task.FromResult(this.GetResponse(lprotoMessageConfig));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }

        [HttpPost]
        [Route("SaveMessageConfig")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "SaveMessageConfig")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoMessageConfig))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> SaveMessageConfig(protoMessageConfig aprotoMessageConfig)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new AdminService.AdminServiceClient(channel1);
                    Empty empty = new Empty();
                    protoMessageConfig lprotoMessageConfig = await client1.SaveMessageConfigAsync(aprotoMessageConfig);
                    return await Task.FromResult(this.GetResponse(lprotoMessageConfig));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }

        [HttpPost]
        [Route("UpdateMessageConfig")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "UpdateMessageConfig")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoMessageConfig))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> UpdateMessageConfig(protoMessageConfig aprotoMessageConfig)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new AdminService.AdminServiceClient(channel1);
                    Empty empty = new Empty();
                    protoMessageConfig lprotoMessageConfig = await client1.UpdateMessageConfigAsync(aprotoMessageConfig);
                    return await Task.FromResult(this.GetResponse(lprotoMessageConfig));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }


        [HttpPost]
        [Route("OpenMessageConfig")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "OpenMessageConfig")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoMessageConfig))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> OpenMessageConfig(protoLongData aprotoLongData)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new AdminService.AdminServiceClient(channel1);
                    Empty empty = new Empty();
                    protoMessageConfig lprotoMessageConfig = await client1.OpenMessageConfigAsync(aprotoLongData);
                    return await Task.FromResult(this.GetResponse(lprotoMessageConfig));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }


        [HttpPost]
        [Route("DeleteMessageConfig")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "DeleteMessageConfig")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoMessageConfig))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> DeleteMessageConfig(protoLongData aprotoLongData)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new AdminService.AdminServiceClient(channel1);
                    Empty empty = new Empty();
                    protoMessageConfig lprotoMessageConfig = await client1.DeleteMessageConfigAsync(aprotoLongData);
                    return await Task.FromResult(this.GetResponse(lprotoMessageConfig));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }
        #endregion

        #region SubConfig
        [HttpGet]
        [Route("CreateNewSubConfig")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "CreateNewSubConfig")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoSubConfig))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> CreateNewSubConfig()
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new AdminService.AdminServiceClient(channel1);
                    Empty empty = new Empty();
                    protoSubConfig lprotoSubConfig = await client1.CreateNewSubConfigAsync(empty);
                    return await Task.FromResult(this.GetResponse(lprotoSubConfig));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }

        [HttpPost]
        [Route("SaveSubConfig")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "SaveSubConfig")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoSubConfig))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> SaveSubConfig(protoSubConfig aprotoSubConfig)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new AdminService.AdminServiceClient(channel1);
                    Empty empty = new Empty();
                    protoSubConfig lprotoSubConfig = await client1.SaveSubConfigAsync(aprotoSubConfig);
                    return await Task.FromResult(this.GetResponse(lprotoSubConfig));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }

        [HttpPost]
        [Route("UpdateSubConfig")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "UpdateSubConfig")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoSubConfig))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> UpdateSubConfig(protoSubConfig aprotoSubConfig)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new AdminService.AdminServiceClient(channel1);
                    Empty empty = new Empty();
                    protoSubConfig lprotoSubConfig = await client1.UpdateSubConfigAsync(aprotoSubConfig);
                    return await Task.FromResult(this.GetResponse(lprotoSubConfig));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }


        [HttpPost]
        [Route("OpenSubConfig")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "OpenSubConfig")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoSubConfig))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> OpenSubConfig(protoLongData aprotoLongData)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new AdminService.AdminServiceClient(channel1);
                    Empty empty = new Empty();
                    protoSubConfig lprotoSubConfig = await client1.OpenSubConfigAsync(aprotoLongData);
                    return await Task.FromResult(this.GetResponse(lprotoSubConfig));
                }
            }
            catch (Exception ex)
            {
                return await Task.FromResult(this.GetErrorMessage(ex));
            }
        }


        [HttpPost]
        [Route("DeleteSubConfig")]
        [SwaggerOperation(Tags = new[] { "Admin" }, Summary = "DeleteSubConfig")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(protoSubConfig))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(protoMessage))]
        public async Task<IActionResult> DeleteSubConfig(protoLongData aprotoLongData)
        {
            try
            {
                using (var channel1 = GrpcChannel.ForAddress(SERVICE_ENDPOINT))
                {
                    var client1 = new AdminService.AdminServiceClient(channel1);
                    Empty empty = new Empty();
                    protoSubConfig lprotoSubConfig = await client1.DeleteSubConfigAsync(aprotoLongData);
                    return await Task.FromResult(this.GetResponse(lprotoSubConfig));
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

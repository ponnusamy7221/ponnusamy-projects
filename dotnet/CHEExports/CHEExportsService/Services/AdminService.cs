using CHEExportsDataAccessLayer;
using CHEExportsDataObjects;
using CHEExportsProto;
using Google.Protobuf.WellKnownTypes;
using Grpc.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;

namespace CHEExportsService
{
    public class AdminService : CHEExportsProto.AdminService.AdminServiceBase
    {
        private readonly string token = string.Empty;
        public AdminService()
        {

        }

        [AllowAnonymous]
        public override async Task<protoLoggedInDetails> AuthenticateUser(protoLoginCredentials aprotoLoginCredentials, ServerCallContext context)
        {
            protoLoggedInDetails lprotoLoggedInDetails = new protoLoggedInDetails();
            try
            {
                if (aprotoLoginCredentials != null && !string.IsNullOrEmpty(aprotoLoginCredentials.UserLoginId) && !string.IsNullOrEmpty(aprotoLoginCredentials.Password))
                {
                    User user = new User();
                    user.user_login_id = aprotoLoginCredentials.UserLoginId;
                    user.keyword = aprotoLoginCredentials.Password;
                    DALUser lDALUser = new DALUser(user);
                    lprotoLoggedInDetails = lDALUser.AuthenticateUser();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(lprotoLoggedInDetails);
        }

        public override async Task<protoUser> CreateNewUser(Empty empty, ServerCallContext context)
        {
            protoUser lprotoUser = new protoUser();
            try
            {

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(lprotoUser);
        }

        public override async Task<protoUser> SaveUser(protoUser aprotoUser, ServerCallContext context)
        {
            User user = new User();
            try
            {
                user.GetData(aprotoUser);
                DALUser lDALUser = new DALUser(user);
                lDALUser.SaveUser("");
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(user.GetProto());
        }

        public override async Task<protoUser> UpdateUser(protoUser aprotoUser, ServerCallContext context)
        {
            User user = new User();
            try
            {
                user.GetData(aprotoUser);
                DALUser lDALUser = new DALUser(user);
                lDALUser.UpdateUser("");
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(user.GetProto());
        }

        public override async Task<protoUser> OpenUser(protoLongData aprotoLongData, ServerCallContext context)
        {
            User user = new User();
            try
            {
                if (aprotoLongData != null && aprotoLongData.Data > 0)
                {
                    user.user_id = aprotoLongData.Data;
                    DALUser lDALUser = new DALUser(user);
                    lDALUser.OpenUser(context.RequestHeaders.GetValue("authorization"));
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(user.GetProto());
        }

        public override async Task<protoUser> DeleteUser(protoLongData aprotoLongData, ServerCallContext context)
        {
            User user = new User();
            try
            {
                if (aprotoLongData != null && aprotoLongData.Data > 0)
                {
                    user.user_id = aprotoLongData.Data;
                    DALUser lDALUser = new DALUser(user);
                    lDALUser.DeleteUser("");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(user.GetProto());
        }
        #region MessageConfig
        public override async Task<protoMessageConfig> CreateNewMessageConfig(Empty empty, ServerCallContext context)
        {
            protoMessageConfig lprotoMessageConfig = new protoMessageConfig();
            try
            {

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(lprotoMessageConfig);
        }

        public override async Task<protoMessageConfig> SaveMessageConfig(protoMessageConfig aprotoMessageConfig, ServerCallContext context)
        {
            MessageConfig MessageConfig = new MessageConfig();
            try
            {
                MessageConfig.GetData(aprotoMessageConfig);
                DALMessageConfig lDALMessageConfig = new DALMessageConfig(MessageConfig);
                lDALMessageConfig.SaveMessage("");
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(MessageConfig.GetProto());
        }

        public override async Task<protoMessageConfig> UpdateMessageConfig(protoMessageConfig aprotoMessageConfig, ServerCallContext context)
        {
            MessageConfig MessageConfig = new MessageConfig();
            try
            {
                MessageConfig.GetData(aprotoMessageConfig);
                DALMessageConfig lDALMessageConfig = new DALMessageConfig(MessageConfig);
                lDALMessageConfig.UpdateMessage("");
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(MessageConfig.GetProto());
        }

        public override async Task<protoMessageConfig> OpenMessageConfig(protoLongData aprotoLongData, ServerCallContext context)
        {
            MessageConfig MessageConfig = new MessageConfig();
            try
            {
                if (aprotoLongData != null && aprotoLongData.Data > 0)
                {
                    MessageConfig.message_id = aprotoLongData.Data;
                    DALMessageConfig lDALMessageConfig = new DALMessageConfig(MessageConfig);
                    lDALMessageConfig.OpenMessage("");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(MessageConfig.GetProto());
        }

        public override async Task<protoMessageConfig> DeleteMessageConfig(protoLongData aprotoLongData, ServerCallContext context)
        {
            MessageConfig MessageConfig = new MessageConfig();
            try
            {
                if (aprotoLongData != null && aprotoLongData.Data > 0)
                {
                    MessageConfig.message_id = aprotoLongData.Data;
                    DALMessageConfig lDALMessageConfig = new DALMessageConfig(MessageConfig);
                    lDALMessageConfig.DeleteMessage("");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(MessageConfig.GetProto());
        }
        #endregion

        #region SubConfig
        public override async Task<protoSubConfig> CreateNewSubConfig(Empty empty, ServerCallContext context)
        {
            protoSubConfig lprotoSubConfig = new protoSubConfig();
            try
            {

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(lprotoSubConfig);
        }

        public override async Task<protoSubConfig> SaveSubConfig(protoSubConfig aprotoSubConfig, ServerCallContext context)
        {
            SubConfig SubConfig = new SubConfig();
            try
            {
                SubConfig.GetData(aprotoSubConfig);
                DALSubConfig lDALSubConfig = new DALSubConfig(SubConfig);
                lDALSubConfig.SaveSubConfig("");
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(SubConfig.GetProto());
        }

        public override async Task<protoSubConfig> UpdateSubConfig(protoSubConfig aprotoSubConfig, ServerCallContext context)
        {
            SubConfig SubConfig = new SubConfig();
            try
            {
                SubConfig.GetData(aprotoSubConfig);
                DALSubConfig lDALSubConfig = new DALSubConfig(SubConfig);
                lDALSubConfig.UpdateSubConfig("");
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(SubConfig.GetProto());
        }

        public override async Task<protoSubConfig> OpenSubConfig(protoLongData aprotoLongData, ServerCallContext context)
        {
            SubConfig SubConfig = new SubConfig();
            try
            {
                if (aprotoLongData != null && aprotoLongData.Data > 0)
                {
                    SubConfig.sub_config_id = aprotoLongData.Data;
                    DALSubConfig lDALSubConfig = new DALSubConfig(SubConfig);
                    lDALSubConfig.OpenSubConfig("");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(SubConfig.GetProto());
        }

        public override async Task<protoSubConfig> DeleteSubConfig(protoLongData aprotoLongData, ServerCallContext context)
        {
            SubConfig SubConfig = new SubConfig();
            try
            {
                if (aprotoLongData != null && aprotoLongData.Data > 0)
                {
                    SubConfig.sub_config_id = aprotoLongData.Data;
                    DALSubConfig lDALSubConfig = new DALSubConfig(SubConfig);
                    lDALSubConfig.DeleteSubConfig("");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(SubConfig.GetProto());
        }
        #endregion

        #region MasterConfig
        public override async Task<protoMasterConfig> CreateNewMasterConfig(Empty empty, ServerCallContext context)
        {
            protoMasterConfig lprotoMasterConfig = new protoMasterConfig();
            try
            {

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(lprotoMasterConfig);
        }

        public override async Task<protoMasterConfig> SaveMasterConfig(protoMasterConfig aprotoMasterConfig, ServerCallContext context)
        {
            MasterConfig MasterConfig = new MasterConfig();
            try
            {
                MasterConfig.GetData(aprotoMasterConfig);
                DALMasterConfig lDALMasterConfig = new DALMasterConfig(MasterConfig);
                lDALMasterConfig.SaveMasterConfig("");
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(MasterConfig.GetProto());
        }

        public override async Task<protoMasterConfig> UpdateMasterConfig(protoMasterConfig aprotoMasterConfig, ServerCallContext context)
        {
            MasterConfig MasterConfig = new MasterConfig();
            try
            {
                MasterConfig.GetData(aprotoMasterConfig);
                DALMasterConfig lDALMasterConfig = new DALMasterConfig(MasterConfig);
                lDALMasterConfig.UpdateMasterConfig("");
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(MasterConfig.GetProto());
        }

        public override async Task<protoMasterConfig> OpenMasterConfig(protoLongData aprotoLongData, ServerCallContext context)
        {
            MasterConfig MasterConfig = new MasterConfig();
            try
            {
                if (aprotoLongData != null && aprotoLongData.Data > 0)
                {
                    MasterConfig.master_config_id = aprotoLongData.Data;
                    DALMasterConfig lDALMasterConfig = new DALMasterConfig(MasterConfig);
                    lDALMasterConfig.OpenMasterConfig("");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(MasterConfig.GetProto());
        }

        public override async Task<protoMasterConfig> DeleteMasterConfig(protoLongData aprotoLongData, ServerCallContext context)
        {
            MasterConfig MasterConfig = new MasterConfig();
            try
            {
                if (aprotoLongData != null && aprotoLongData.Data > 0)
                {
                    MasterConfig.master_config_id = aprotoLongData.Data;
                    DALMasterConfig lDALMasterConfig = new DALMasterConfig(MasterConfig);
                    lDALMasterConfig.DeleteMasterConfig("");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return await Task.FromResult(MasterConfig.GetProto());
        }
        #endregion
    }
}

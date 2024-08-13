using CHEExportsDataObjects;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace CHEExportsDataAccessLayer
{
    [Serializable]
    [DataContract]
    public class DALOrderDetails : DALBase
    {
        [DataMember]
        public OrderDetails iOrderDetails { get; private set; }

        public DALOrderDetails(OrderDetails aOrderDetails) : base(aOrderDetails)
        {
            iOrderDetails = aOrderDetails;
        }

        public void CreateNewOrderDetails()
        {
            try
            {

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw ex;
            }
        }
        public void GenerateRefNo()
        {
            if (string.IsNullOrEmpty(iOrderDetails.order_ref_no))
            {
                DataSet lDataSet = CommonDAL.GetDataSetbyExecuteSP("APP_SP_GenerateReferenceNumber", new string[] { "@Config_const" }, new string[] { "ORDR" });

                if (lDataSet != null && lDataSet.Tables.Count > 0 && lDataSet.Tables[0] != null && lDataSet.Tables[0].Rows.Count > 0)
                {
                    iOrderDetails.order_ref_no = lDataSet.Tables[0].Rows[0][0].ToString();
                }
            }
        }
        public void SaveOrderDetails(string token)
        {
            try
            {
                //ValidateOrderDetailsSave();
                if (iOrderDetails != null && (iOrderDetails.errorMsg_lsit == null || iOrderDetails.errorMsg_lsit.Count == 0))
                {
                    GenerateRefNo();
                    Save(token);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw ex;
            }
        }

        private void ValidateOrderDetailsSave()
        {
            throw new NotImplementedException();
        }

        public void UpdateOrderDetails(string token)
        {
            try
            {
                //ValidateOrderDetailsSave();
                if (iOrderDetails != null && (iOrderDetails.errorMsg_lsit == null || iOrderDetails.errorMsg_lsit.Count == 0))
                {
                    Update(token);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw ex;
            }
        }

        public void DeleteOrderDetails(string token)
        {
            try
            {
                //ValidateOrderDetailsDelete();
                if (iOrderDetails != null && (iOrderDetails.errorMsg_lsit == null || iOrderDetails.errorMsg_lsit.Count == 0) && iOrderDetails.order_detail_id > 0)
                {
                    Delete(token);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw ex;
            }
        }

        public void OpenOrderDetails(string token)
        {
            try
            {
                if (iOrderDetails != null && (iOrderDetails.errorMsg_lsit == null || iOrderDetails.errorMsg_lsit.Count == 0) && iOrderDetails.order_detail_id > 0)
                {
                    Open(token);
                    string config_ids = Constants.Application.Status_id + "";
                    List<SubConfig> lstSubConfig = CommonDAL.GetAllSubConfigValueByConfigID(config_ids);
                    iOrderDetails.status_description = lstSubConfig.Where(x => x.s_config_value == iOrderDetails.status_value).Select(x => x.s_config_description).FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw ex;
            }
        }
    }
}




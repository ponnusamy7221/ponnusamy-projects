

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
    public class DALCustomer : DALBase
    {
        [DataMember]
        public Customer iCustomer { get; private set; }

        public DALCustomer(Customer aCustomer) : base(aCustomer)
        {
            iCustomer = aCustomer;
        }

        public void CreateNewCustomer()
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

        public void SaveCustomer(string token)
        {
            try
            {
                //ValidateCustomerSave();
                if (iCustomer != null && (iCustomer.errorMsg_lsit == null || iCustomer.errorMsg_lsit.Count == 0))
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
        public void GenerateRefNo()
        {
            if (string.IsNullOrEmpty(iCustomer.customer_ref_no))
            {
                DataSet lDataSet = CommonDAL.GetDataSetbyExecuteSP("APP_SP_GenerateReferenceNumber", new string[] { "@Config_const" }, new string[] { "CUST" });

                if (lDataSet != null && lDataSet.Tables.Count > 0 && lDataSet.Tables[0] != null && lDataSet.Tables[0].Rows.Count > 0)
                {
                    iCustomer.customer_ref_no = lDataSet.Tables[0].Rows[0][0].ToString();
                }
            }
        }
        private void ValidateCustomerSave()
        {
            throw new NotImplementedException();
        }

        public void UpdateCustomer(string token)
        {
            try
            {
                //ValidateCustomerSave();
                if (iCustomer != null && (iCustomer.errorMsg_lsit == null || iCustomer.errorMsg_lsit.Count == 0))
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

        public void DeleteCustomer(string token)
        {
            try
            {
                //ValidateCustomerDelete();
                if (iCustomer != null && (iCustomer.errorMsg_lsit == null || iCustomer.errorMsg_lsit.Count == 0) && iCustomer.customer_id > 0)
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

        public void OpenCustomer(string token)
        {
            try
            {
                if (iCustomer != null && (iCustomer.errorMsg_lsit == null || iCustomer.errorMsg_lsit.Count == 0) && iCustomer.customer_id > 0)
                {
                    Open(token);
                    string config_ids = Constants.Application.Active_Iactive_Status_id + "";
                    List<SubConfig> lstSubConfig = CommonDAL.GetAllSubConfigValueByConfigID(config_ids);
                    iCustomer.status_description = lstSubConfig.Where(x => x.s_config_value == iCustomer.status_value).Select(x => x.s_config_description).FirstOrDefault();
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


  
    
    using CHEExportsDataObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace CHEExportsDataAccessLayer
    {
        [Serializable]
        [DataContract]
        public class DALLRDetails : DALBase
        {
            [DataMember]
            public LRDetails iLRDetails { get; private set; }

            public DALLRDetails(LRDetails aLRDetails) : base(aLRDetails)
            {
                iLRDetails = aLRDetails;
            }

            public void CreateNewLRDetails()
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

            public void SaveLRDetails(string token)
            {
                try
                {
                    //ValidateLRDetailsSave();
                    if (iLRDetails != null && (iLRDetails.errorMsg_lsit == null || iLRDetails.errorMsg_lsit.Count == 0))
                    {
                        Save(token);
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.ToString());
                    throw ex;
                }
            }

            private void ValidateLRDetailsSave()
            {
                throw new NotImplementedException();
            }

            public void UpdateLRDetails(string token)
            {
                try
                {
                    //ValidateLRDetailsSave();
                    if (iLRDetails != null && (iLRDetails.errorMsg_lsit == null || iLRDetails.errorMsg_lsit.Count == 0))
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

            public void DeleteLRDetails(string token)
            {
                try
                {
                    //ValidateLRDetailsDelete();
                    if (iLRDetails != null && (iLRDetails.errorMsg_lsit == null || iLRDetails.errorMsg_lsit.Count == 0) && iLRDetails.lr_detail_id > 0)
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

            public void OpenLRDetails(string token)
            {
                try
                {
                    if (iLRDetails != null && (iLRDetails.errorMsg_lsit == null || iLRDetails.errorMsg_lsit.Count == 0) && iLRDetails.lr_detail_id > 0)
                    {
                        Open(token);
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



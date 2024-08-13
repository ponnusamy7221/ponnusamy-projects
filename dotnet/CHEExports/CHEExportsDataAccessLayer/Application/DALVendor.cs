
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
        public class DALVendor : DALBase
        {
            [DataMember]
            public Vendor iVendor { get; private set; }

            public DALVendor(Vendor aVendor) : base(aVendor)
            {
                iVendor = aVendor;
            }

            public void CreateNewVendor()
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

            public void SaveVendor(string token)
            {
                try
                {
                    //ValidateVendorSave();
                    if (iVendor != null && (iVendor.errorMsg_lsit == null || iVendor.errorMsg_lsit.Count == 0))
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

            private void ValidateVendorSave()
            {
                throw new NotImplementedException();
            }

            public void UpdateVendor(string token)
            {
                try
                {
                    //ValidateVendorSave();
                    if (iVendor != null && (iVendor.errorMsg_lsit == null || iVendor.errorMsg_lsit.Count == 0))
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

            public void DeleteVendor(string token)
            {
                try
                {
                    //ValidateVendorDelete();
                    if (iVendor != null && (iVendor.errorMsg_lsit == null || iVendor.errorMsg_lsit.Count == 0) && iVendor.vendor_id > 0)
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

            public void OpenVendor(string token)
            {
                try
                {
                    if (iVendor != null && (iVendor.errorMsg_lsit == null || iVendor.errorMsg_lsit.Count == 0) && iVendor.vendor_id > 0)
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





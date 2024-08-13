
  
    
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
        public class DALInvoiceDetails : DALBase
        {
            [DataMember]
            public InvoiceDetails iInvoiceDetails { get; private set; }

            public DALInvoiceDetails(InvoiceDetails aInvoiceDetails) : base(aInvoiceDetails)
            {
                iInvoiceDetails = aInvoiceDetails;
            }

            public void CreateNewInvoiceDetails()
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

            public void SaveInvoiceDetails(string token)
            {
                try
                {
                    //ValidateInvoiceDetailsSave();
                    if (iInvoiceDetails != null && (iInvoiceDetails.errorMsg_lsit == null || iInvoiceDetails.errorMsg_lsit.Count == 0))
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

            private void ValidateInvoiceDetailsSave()
            {
                throw new NotImplementedException();
            }

            public void UpdateInvoiceDetails(string token)
            {
                try
                {
                    //ValidateInvoiceDetailsSave();
                    if (iInvoiceDetails != null && (iInvoiceDetails.errorMsg_lsit == null || iInvoiceDetails.errorMsg_lsit.Count == 0))
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

            public void DeleteInvoiceDetails(string token)
            {
                try
                {
                    //ValidateInvoiceDetailsDelete();
                    if (iInvoiceDetails != null && (iInvoiceDetails.errorMsg_lsit == null || iInvoiceDetails.errorMsg_lsit.Count == 0) && iInvoiceDetails.invoice_detail_id> 0)
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

            public void OpenInvoiceDetails(string token)
            {
                try
                {
                    if (iInvoiceDetails != null && (iInvoiceDetails.errorMsg_lsit == null || iInvoiceDetails.errorMsg_lsit.Count == 0) && iInvoiceDetails.invoice_detail_id > 0)
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


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
    public class DALInvoiceDetailsItems : DALBase
    {
        [DataMember]
        public InvoiceDetailsItems iInvoiceDetailsItems { get; private set; }

        public DALInvoiceDetailsItems(InvoiceDetailsItems aInvoiceDetailsItems) : base(aInvoiceDetailsItems)
        {
            iInvoiceDetailsItems = aInvoiceDetailsItems;
        }

        public void CreateNewInvoiceDetailsItems()
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

        public void SaveInvoiceDetailsItems(string token)
        {
            try
            {
                ValidateInvoiceDetailsItemsSave();
                if (iInvoiceDetailsItems != null && (iInvoiceDetailsItems.errorMsg_lsit == null || iInvoiceDetailsItems.errorMsg_lsit.Count == 0))
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

        private void ValidateInvoiceDetailsItemsSave()
        {
            throw new NotImplementedException();
        }

        public void UpdateInvoiceDetailsItems(string token)
        {
            try
            {
                //ValidateUserSave();
                if (iInvoiceDetailsItems != null && (iInvoiceDetailsItems.errorMsg_lsit == null || iInvoiceDetailsItems.errorMsg_lsit.Count == 0))
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

        public void DeleteInvoiceDetailsItems(string token)
        {
            try
            {
                // ValidateInvoiceDetailsItemsDelete();
                if (iInvoiceDetailsItems != null && (iInvoiceDetailsItems.errorMsg_lsit == null || iInvoiceDetailsItems.errorMsg_lsit.Count == 0) && iInvoiceDetailsItems.invoice_detail_item_id > 0)
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

        public void OpenInvoiceDetailsItems(string token)
        {
            try
            {
                if (iInvoiceDetailsItems != null && (iInvoiceDetailsItems.errorMsg_lsit == null || iInvoiceDetailsItems.errorMsg_lsit.Count == 0) && iInvoiceDetailsItems.invoice_detail_item_id > 0)
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

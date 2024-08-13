
  
    
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
        public class DALOrderDeliverySlipDetails : DALBase
        {
            [DataMember]
            public OrderDeliverySlipDetails iOrderDeliverySlipDetails { get; private set; }

            public DALOrderDeliverySlipDetails(OrderDeliverySlipDetails aOrderDeliverySlipDetails) : base(aOrderDeliverySlipDetails)
            {
                iOrderDeliverySlipDetails = aOrderDeliverySlipDetails;
            }

            public void CreateNewOrderDeliverySlipDetails()
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

            public void SaveOrderDeliverySlipDetails(string token)
            {
                try
                {
                    //ValidateOrderDeliverySlipDetailsSave();
                    if (iOrderDeliverySlipDetails != null && (iOrderDeliverySlipDetails.errorMsg_lsit == null || iOrderDeliverySlipDetails.errorMsg_lsit.Count == 0))
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

            private void ValidateOrderDeliverySlipDetailsSave()
            {
                throw new NotImplementedException();
            }

            public void UpdateOrderDeliverySlipDetails(string token)
            {
                try
                {
                    //ValidateOrderDeliverySlipDetailsSave();
                    if (iOrderDeliverySlipDetails != null && (iOrderDeliverySlipDetails.errorMsg_lsit == null || iOrderDeliverySlipDetails.errorMsg_lsit.Count == 0))
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

            public void DeleteOrderDeliverySlipDetails(string token)
            {
                try
                {
                    //ValidateOrderDeliverySlipDetailsDelete();
                    if (iOrderDeliverySlipDetails != null && (iOrderDeliverySlipDetails.errorMsg_lsit == null || iOrderDeliverySlipDetails.errorMsg_lsit.Count == 0) && iOrderDeliverySlipDetails.order_delivery_slip_detail_id > 0)
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

            public void OpenOrderDeliverySlipDetails(string token)
            {
                try
                {
                    if (iOrderDeliverySlipDetails != null && (iOrderDeliverySlipDetails.errorMsg_lsit == null || iOrderDeliverySlipDetails.errorMsg_lsit.Count == 0) && iOrderDeliverySlipDetails.order_delivery_slip_detail_id > 0)
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




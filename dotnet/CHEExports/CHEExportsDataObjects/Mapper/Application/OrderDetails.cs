

using CHEExportsProto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CHEExportsDataObjects
{
    public partial class OrderDetails
    {
        public void GetData(protoOrderDetails aprotoOrderDetails)
        {
            ProtoDataConverter.GetData(aprotoOrderDetails, this);
            if (aprotoOrderDetails.IprotoLRDetails != null)
            {
                this.iLRDetails.GetData(aprotoOrderDetails.IprotoLRDetails);
            }
            if (aprotoOrderDetails.IprotoInvoiceDetails != null)
            {
                this.iInvoiceDetails.GetData(aprotoOrderDetails.IprotoInvoiceDetails);
            }
            if (aprotoOrderDetails.IprotoOrderDeliverySlipDetail != null)
            {
                this.iOrderDeliverySlipDetails.GetData(aprotoOrderDetails.IprotoOrderDeliverySlipDetail);
            }
        }
        public protoOrderDetails GetProto()
        {
            protoOrderDetails lprotoOrderDetails = new protoOrderDetails();
            ProtoDataConverter.GetProto(this, lprotoOrderDetails);
            if (this.iLRDetails != null)
            {
                lprotoOrderDetails.IprotoLRDetails = this.iLRDetails.GetProto();
            }
            if (this.iOrderDeliverySlipDetails != null)
            {
                lprotoOrderDetails.IprotoOrderDeliverySlipDetail = this.iOrderDeliverySlipDetails.GetProto();
            }
            if (this.iInvoiceDetails != null)
            {
                lprotoOrderDetails.IprotoInvoiceDetails = this.iInvoiceDetails.GetProto();
            }
            ProtoDataConverter.SetMessages(this, lprotoOrderDetails);
            return lprotoOrderDetails;
        }
    }
}




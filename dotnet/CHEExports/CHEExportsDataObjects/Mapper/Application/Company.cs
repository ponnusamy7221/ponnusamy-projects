
    using CHEExportsProto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CHEExportsDataObjects
    {
        public partial class Company
    {
            public void GetData(protoCompany aprotoCompany)
            {
                ProtoDataConverter.GetData(aprotoCompany, this);
            }

            public protoCompany GetProto()
            {
                protoCompany lprotoCompany = new protoCompany();
                ProtoDataConverter.GetProto(this, lprotoCompany);
                ProtoDataConverter.SetMessages(this, lprotoCompany);
                return lprotoCompany;
            }
        }
    }


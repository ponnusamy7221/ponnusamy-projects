using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CHEExportsDataObjects
{
    public static class Constants
    {
        public static class Application
        {
            public const string Is_Yes = "Y";
            public const string Is_No = "N";

            public const int Status_id = 1;
            public const string pending_completion = "PEDCM";
            public const string complete = "COMTE";

            public const int Active_Iactive_Status_id = 2;
            public const string Active = "ACTIV";
            public const string Inactive = "INACT";

            public const int Unit_type_id = 3;
            public const string PCS = "PCS";
            public const string MTR = "MTR";
        }

    }
}

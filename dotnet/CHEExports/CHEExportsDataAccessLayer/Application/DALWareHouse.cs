
   
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
        public class DALWareHouse : DALBase
        {
            [DataMember]
            public WareHouse iWareHouse { get; private set; }

            public DALWareHouse(WareHouse aWareHouse) : base(aWareHouse)
            {
                iWareHouse = aWareHouse;
            }

            public void CreateNewWareHouse()
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

            public void SaveWareHouse(string token)
            {
                try
                {
                    //ValidateWareHouseSave();
                    if (iWareHouse != null && (iWareHouse.errorMsg_lsit == null || iWareHouse.errorMsg_lsit.Count == 0))
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

            private void ValidateWareHouseSave()
            {
                throw new NotImplementedException();
            }

            public void UpdateWareHouse(string token)
            {
                try
                {
                    //ValidateWareHouseSave();
                    if (iWareHouse != null && (iWareHouse.errorMsg_lsit == null || iWareHouse.errorMsg_lsit.Count == 0))
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

            public void DeleteWareHouse(string token)
            {
                try
                {
                    //ValidateWareHouseDelete();
                    if (iWareHouse != null && (iWareHouse.errorMsg_lsit == null || iWareHouse.errorMsg_lsit.Count == 0) && iWareHouse.warehouse_id > 0)
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

            public void OpenWareHouse(string token)
            {
                try
                {
                    if (iWareHouse != null && (iWareHouse.errorMsg_lsit == null || iWareHouse.errorMsg_lsit.Count == 0) && iWareHouse.warehouse_id > 0)
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





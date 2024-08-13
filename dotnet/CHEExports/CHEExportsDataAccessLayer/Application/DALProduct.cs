
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
        public class DALProduct : DALBase
        {
            [DataMember]
            public Product iProduct { get; private set; }

            public DALProduct(Product aProduct) : base(aProduct)
            {
                iProduct = aProduct;
            }

            public void CreateNewProduct()
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

            public void SaveProduct(string token)
            {
                try
                {
                    //ValidateProductSave();
                    if (iProduct != null && (iProduct.errorMsg_lsit == null || iProduct.errorMsg_lsit.Count == 0))
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

            private void ValidateProductSave()
            {
                throw new NotImplementedException();
            }

            public void UpdateProduct(string token)
            {
                try
                {
                    //ValidateProductSave();
                    if (iProduct != null && (iProduct.errorMsg_lsit == null || iProduct.errorMsg_lsit.Count == 0))
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

            public void DeleteProduct(string token)
            {
                try
                {
                    //ValidateProductDelete();
                    if (iProduct != null && (iProduct.errorMsg_lsit == null || iProduct.errorMsg_lsit.Count == 0) && iProduct.product_id > 0)
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

            public void OpenProduct(string token)
            {
                try
                {
                    if (iProduct != null && (iProduct.errorMsg_lsit == null || iProduct.errorMsg_lsit.Count == 0) && iProduct.product_id > 0)
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




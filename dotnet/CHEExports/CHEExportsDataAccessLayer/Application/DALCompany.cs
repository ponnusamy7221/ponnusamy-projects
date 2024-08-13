
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
        public class DALCompany : DALBase
        {
            [DataMember]
            public Company iCompany { get; private set; }

            public DALCompany(Company aCompany) : base(aCompany)
            {
                iCompany = aCompany;
            }

            public void CreateNewCompany()
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

            public void SaveCompany(string token)
            {
                try
                {
                    //ValidateCompanySave();
                    if (iCompany != null && (iCompany.errorMsg_lsit == null || iCompany.errorMsg_lsit.Count == 0))
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

            private void ValidateCompanySave()
            {
                throw new NotImplementedException();
            }

            public void UpdateCompany(string token)
            {
                try
                {
                    //ValidateCompanySave();
                    if (iCompany != null && (iCompany.errorMsg_lsit == null || iCompany.errorMsg_lsit.Count == 0))
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

            public void DeleteCompany(string token)
            {
                try
                {
                    //ValidateCompanyDelete();
                    if (iCompany != null && (iCompany.errorMsg_lsit == null || iCompany.errorMsg_lsit.Count == 0) && iCompany.company_id > 0)
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

            public void OpenCompany(string token)
            {
                try
                {
                    if (iCompany != null && (iCompany.errorMsg_lsit == null || iCompany.errorMsg_lsit.Count == 0) && iCompany.company_id > 0)
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

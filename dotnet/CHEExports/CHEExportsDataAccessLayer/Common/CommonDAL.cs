using CHEExportsDataObjects;
using Google.Protobuf.WellKnownTypes;
using CHEExportsProto;
using Grpc.Core;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Google.Protobuf.Collections;

namespace CHEExportsDataAccessLayer
{
    public static class CommonDAL
    {
        public static readonly string DBConnection = "server=localhost;database=chennaiexports;Integrated Security=true;TrustServerCertificate=true;";
        public static List<SubConfig> GetAllSubConfigValueByConfigID(string config_ids)
        {
            List<SubConfig> lstSubConfig = new List<SubConfig>();
            if (!string.IsNullOrWhiteSpace(config_ids))
            {
                string[] configIdsArray = config_ids.Split(',');
                string configIdsJson = JsonSerializer.Serialize(configIdsArray);
                DataSet lDataSet = CommonDAL.GetDataSetbyExecuteSP("ADM_SP_GetSubConfigValuesByConfigid", new string[] { "@M_CONFIG_IDs" }, new string[] { configIdsJson });

                if (lDataSet != null && lDataSet.Tables.Count > 0 && lDataSet.Tables[0] != null && lDataSet.Tables[0].Rows.Count > 0)
                {
                    lstSubConfig = SetListFromDataTable<SubConfig>(lDataSet.Tables[0]);
                }
            }
            return lstSubConfig;

        }

        public static List<T> SelectDataFromDataBase<T>(string[] columnnames, string[] operators, object[] values)
        {
            List<T> lst = new List<T>();
            try
            {
                T obj = Activator.CreateInstance<T>();
                if (obj != null && (columnnames.Length == operators.Length) && (operators.Length == values.Length))
                {
                    string TABLE_NAME = obj.GetType().GetProperty("TABLE_NAME").GetValue(obj).ToString();
                    if (!string.IsNullOrEmpty(TABLE_NAME))
                    {
                        string query = GenaerateSelectQuery(TABLE_NAME, columnnames, operators);
                        SqlConnection conn = new SqlConnection(DBConnection);
                        conn.Open();
                        SqlCommand command = new SqlCommand(query, conn);
                        for (int i = 0; i < values.Length; i++)
                        {
                            if (values[i] != null)
                            {
                                command.Parameters.AddWithValue("@" + columnnames[i], values[i]);
                            }
                            else
                            {
                                command.Parameters.AddWithValue("@" + columnnames[i], DBNull.Value);
                            }
                        }
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                obj = Activator.CreateInstance<T>();
                                foreach (var var in obj.GetType().GetFields())
                                {
                                    if (var.Name.Contains("column_name"))
                                    {
                                        foreach (var var1 in obj.GetType().GetProperties())
                                        {
                                            if (var1.Name.ToLower() == var.GetValue(obj).ToString().ToLower())
                                            {
                                                if (reader[var.GetValue(obj).ToString()] != DBNull.Value)
                                                {
                                                    obj.GetType().GetProperty(var1.Name).SetValue(obj, reader[var.GetValue(obj).ToString()]);
                                                }
                                                else
                                                {
                                                    obj.GetType().GetProperty(var1.Name).SetValue(obj, null);
                                                }
                                            }
                                        }
                                    }
                                }
                                lst.Add(obj);
                            }
                        }
                        conn.Close();
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw ex;
            }
            return lst;
        }

        private static string GenaerateSelectQuery(string TABLE_NAME, string[] columnnames, string[] operators)
        {
            string query = string.Empty;
            try
            {
                query = "select * from " + TABLE_NAME;
                if (columnnames.Length == operators.Length)
                {
                    if (operators.Length > 0)
                    {
                        query = query + " where ";
                        for (int i = 0; i < columnnames.Length; i++)
                        {
                            query += columnnames[i] + " " + operators[i] + " " + "@" + columnnames[i] + " and ";
                        }
                        query = query.Remove(query.Length - 4);
                    }
                    query = query + ";";
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw ex;
            }
            return query;
        }

        public static class Encryption
        {
            public static string Encrypt(string clearText)
            {
                string EncryptionKey = "MAKV2SPBNI99212";
                byte[] clearBytes = Encoding.Unicode.GetBytes(clearText);
                using (Aes encryptor = Aes.Create())
                {
                    Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                    encryptor.Key = pdb.GetBytes(32);
                    encryptor.IV = pdb.GetBytes(16);
                    using (MemoryStream ms = new MemoryStream())
                    {
                        using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
                        {
                            cs.Write(clearBytes, 0, clearBytes.Length);
                            cs.Close();
                        }
                        clearText = Convert.ToBase64String(ms.ToArray());
                    }
                }
                return clearText;
            }

            public static string Decrypt(string cipherText)
            {
                string EncryptionKey = "MAKV2SPBNI99212";
                byte[] cipherBytes = Convert.FromBase64String(cipherText);
                using (Aes encryptor = Aes.Create())
                {
                    Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                    encryptor.Key = pdb.GetBytes(32);
                    encryptor.IV = pdb.GetBytes(16);
                    using (MemoryStream ms = new MemoryStream())
                    {
                        using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write))
                        {
                            cs.Write(cipherBytes, 0, cipherBytes.Length);
                            cs.Close();
                        }
                        cipherText = Encoding.Unicode.GetString(ms.ToArray());
                    }
                }
                return cipherText;
            }
        }
        public static List<T> SetListFromDataTable<T>(DataTable dt)
        {
            List<T> list = new List<T>();
            try
            {
                T obj = Activator.CreateInstance<T>();
                if (dt != null && dt.Rows != null && dt.Rows.Count > 0)
                {
                    foreach (DataRow row in dt.Rows)
                    {
                        obj = Activator.CreateInstance<T>();
                        foreach (var var in obj.GetType().GetFields())
                        {
                            if (var.Name.Contains("column_name"))
                            {
                                foreach (var var1 in obj.GetType().GetProperties())
                                {
                                    if (var1.Name.ToLower() == var.GetValue(obj).ToString().ToLower())
                                    {
                                        if (row[var.GetValue(obj).ToString()] != DBNull.Value)
                                        {
                                            obj.GetType().GetProperty(var1.Name).SetValue(obj, row[var.GetValue(obj).ToString()]);
                                        }
                                        else
                                        {
                                            obj.GetType().GetProperty(var1.Name).SetValue(obj, null);
                                        }
                                    }
                                }
                            }
                        }
                        list.Add(obj);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw ex;
            }
            return list;
        }

        public static DataSet GetDataSetbyExecuteSP(string SP_NAME, string[] parameters, object[] values)
        {
            DataSet ds = new DataSet();
            try
            {
                if (parameters.Length == values.Length)
                {
                    SqlConnection conn = new SqlConnection(DBConnection);
                    conn.Open();
                    SqlCommand command = new SqlCommand(SP_NAME, conn);
                    command.CommandType = CommandType.StoredProcedure;
                    for (int i = 0; i < values.Length; i++)
                    {
                        if (values[i] != null)
                        {
                            command.Parameters.AddWithValue(parameters[i], values[i]);
                        }
                        else
                        {
                            command.Parameters.AddWithValue(parameters[i], DBNull.Value);
                        }
                    }
                    SqlDataAdapter adapter = new SqlDataAdapter(command);
                    adapter.Fill(ds);
                    conn.Close();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw ex;
            }
            return ds;
        }

        public static LoggedInUserDetails GetLoggedInDetailsFromToken(string token)
        {
            LoggedInUserDetails loggedInUserDetails = new LoggedInUserDetails();
            try
            {
                if (!string.IsNullOrEmpty(token))
                {
                    string json = Encryption.Decrypt(token);

                    loggedInUserDetails = JsonSerializer.Deserialize<LoggedInUserDetails>(token);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw ex;
            }
            return loggedInUserDetails;
        }
        public static entDDL GetSubConfigValues(this entDDL DDL, string Key, int ConfigId)
        {
            DDL.Key = Key;
            List<entDDLClass> ilstentDDLClass = GetSubConfigValues(ConfigId);
            foreach (entDDLClass lentDDLClass in ilstentDDLClass)
            {
                DDL.Value.Add(lentDDLClass);
            }
            return DDL;
        }
        public static List<entDDLClass> GetSubConfigValues(int ConfigId)
        {
            List<entDDLClass> ilst = new List<entDDLClass>();
            List<SubConfig> lSubConfig = new List<SubConfig>();
            lSubConfig = CommonDAL.SelectDataFromDataBase<SubConfig>(new string[] { "CUSTOMER_ID" }, new string[] { "=" },
                new object[] { ConfigId }).ToList();

            if (lSubConfig != null && lSubConfig.Count > 0)
            {
                foreach (SubConfig obj in lSubConfig)
                {
                    entDDLClass lDDLClass = new entDDLClass();
                    lDDLClass.Id = obj.m_config_id;
                    lDDLClass.Code = obj.s_config_value;
                    lDDLClass.Constant = obj.s_config_value;
                    lDDLClass.Description = obj.s_config_description;
                    ilst.Add(lDDLClass);
                }
            }
            return ilst;
        }
        public static entDDL GetAllCustomer(this entDDL DDL, string Key, int ConfigId)
        {
            DDL.Key = Key;
            List<entDDLClass> ilstentDDLClass = GetAllCustomer(ConfigId);
            foreach (entDDLClass lentDDLClass in ilstentDDLClass)
            {
                DDL.Value.Add(lentDDLClass);
            }
            return DDL;
        }
        public static List<entDDLClass> GetAllCustomer(int ConfigId)
        {
            List<entDDLClass> ilst = new List<entDDLClass>();
            List<Customer> lCustomer = new List<Customer>();
            lCustomer = CommonDAL.SelectDataFromDataBase<Customer>(new string[] { "CUSTOMER_ID" }, new string[] { ">" },
                new object[] { ConfigId }).ToList();

            if (lCustomer != null && lCustomer.Count > 0)
            {
                foreach (Customer obj in lCustomer)
                {
                    entDDLClass lDDLClass = new entDDLClass();
                    lDDLClass.Id = obj.customer_id;
                    lDDLClass.Code = obj.email_id;
                    lDDLClass.Constant = obj.contact_no;
                    lDDLClass.Description = obj.customer_name;
                    ilst.Add(lDDLClass);
                }
            }
            return ilst;
        }

        public static entDDL GetAllWareHouse(this entDDL DDL, string Key, int ConfigId)
        {
            DDL.Key = Key;
            List<entDDLClass> ilstentDDLClass = GetAllWareHouse(ConfigId);
            foreach (entDDLClass lentDDLClass in ilstentDDLClass)
            {
                DDL.Value.Add(lentDDLClass);
            }
            return DDL;
        }
        public static List<entDDLClass> GetAllWareHouse(int ConfigId)
        {
            List<entDDLClass> ilst = new List<entDDLClass>();
            List<WareHouse> lWareHouse = new List<WareHouse>();
            lWareHouse = CommonDAL.SelectDataFromDataBase<WareHouse>(new string[] { "WAREHOUSE_ID" }, new string[] { ">" },
                new object[] { ConfigId }).ToList();

            if (lWareHouse != null && lWareHouse.Count > 0)
            {
                foreach (WareHouse obj in lWareHouse)
                {
                    entDDLClass lDDLClass = new entDDLClass();
                    lDDLClass.Id = obj.warehouse_id;
                    lDDLClass.Code = obj.warehouse_name;
                    lDDLClass.Constant = obj.warehouse_ref_no;
                    lDDLClass.Description = obj.contact_person_no;
                    ilst.Add(lDDLClass);
                }
            }
            return ilst;
        }

        public static SearchResultBase<T> SearchResultSetByPage<T, Y>(Y aSearchBase) where T : SearchResultSet where Y : SearchBase
        {
            try
            {
                if (aSearchBase == null)
                {
                    return new SearchResultBase<T>();
                }

                DALBaseSearch obj = new DALBaseSearch(aSearchBase);
                int num = ((aSearchBase.page_number == 0) ? aSearchBase.page_number : (aSearchBase.page_number - 1));
                long totalCount = obj.GetTotalCount();
                //List<T> searchResult = dlBase.SelectResultSet<T>(obj.GetSearchByPageQuery(num * aSearchBase.page_size, aSearchBase.page_size, aSearchBase.order_by_column_name, aSearchBase.ascending), null, null);
                return new SearchResultBase<T>
                {
                    page_number = aSearchBase.page_number,
                    page_size = aSearchBase.page_size,
                    total_count = totalCount,
                    //SearchResultSet = searchResult
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw ex;
            }
        }
        public static entDDL GetSubConfigValuesfromlist(this entDDL lDDL, string Key, int sub_config_id, List<SubConfig> lstSubConfig)
        {
            lDDL.Key = Key;
            lDDL.Value.AddRange(GetSubConfigValuesfromlist(sub_config_id, lstSubConfig));
            return lDDL;
        }


        public static List<entDDLClass> GetSubConfigValuesfromlist(int sub_config_id, List<SubConfig> lstSubConfig)
        {
            List<SubConfig> lstSubConfig1 = new List<SubConfig>();
            lstSubConfig1.AddRange(lstSubConfig.Where(x => x.m_config_id == sub_config_id).ToList());
            try
            {
                if (lstSubConfig1 != null && lstSubConfig1.Count > 0)
                {
                    return ConvertentConfigValueToentDDLClass(lstSubConfig1);
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            return new List<entDDLClass>();
        }
        private static List<entDDLClass> ConvertentConfigValueToentDDLClass(List<SubConfig> lstSubConfig)
        {
            List<entDDLClass> llistentDDLClass = new List<entDDLClass>();
            try
            {
                if (lstSubConfig != null && lstSubConfig.Count > 0)
                {
                    foreach (SubConfig lSubConfig in lstSubConfig)
                    {
                        entDDLClass lentDDLClass = new entDDLClass();
                        lentDDLClass.Constant = lSubConfig.s_config_value;
                        lentDDLClass.Id = Convert.ToInt64(lSubConfig.sub_config_id);
                        lentDDLClass.Description = lSubConfig.s_config_description;
                        llistentDDLClass.Add(lentDDLClass);
                    }
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            return llistentDDLClass;
        }
        public static entDDL GetSubConfigValue(this entDDL DDL, string Key, int ConfigId)
        {
            DDL.Key = Key;
            List<entDDLClass> ilstentDDLClass = GetSubConfigValue(ConfigId);
            foreach (entDDLClass lentDDLClass in ilstentDDLClass)
            {
                DDL.Value.Add(lentDDLClass);
            }
            return DDL;
        }
        public static List<entDDLClass> GetSubConfigValue(int ConfigId)
        {
            List<entDDLClass> ilst = new List<entDDLClass>();
            List<SubConfig> lSubConfig = new List<SubConfig>();
            lSubConfig = CommonDAL.SelectDataFromDataBase<SubConfig>(new string[] { "M_CONFIG_ID" }, new string[] { "=" },
                new object[] { ConfigId }).ToList();

            if (lSubConfig != null && lSubConfig.Count > 0)
            {
                foreach (SubConfig obj in lSubConfig)
                {
                    entDDLClass lDDLClass = new entDDLClass();
                    lDDLClass.Id = obj.m_config_id;
                    lDDLClass.Code = obj.s_config_value;
                    lDDLClass.Description = obj.s_config_description;
                    ilst.Add(lDDLClass);
                }
            }
            return ilst;
        }

        public static entDDL GetAllProduct(this entDDL DDL, string Key, int ConfigId)
        {
            DDL.Key = Key;
            List<entDDLClass> ilstentDDLClass = GetAllProduct(ConfigId);
            foreach (entDDLClass lentDDLClass in ilstentDDLClass)
            {
                DDL.Value.Add(lentDDLClass);
            }
            return DDL;
        }
        public static List<entDDLClass> GetAllProduct(int ConfigId)
        {
            List<entDDLClass> ilst = new List<entDDLClass>();
            List<Product> lProduct = new List<Product>();
            lProduct = CommonDAL.SelectDataFromDataBase<Product>(new string[] { "PRODUCT_ID" }, new string[] { ">" },
                new object[] { ConfigId }).ToList();

            if (lProduct != null && lProduct.Count > 0)
            {
                foreach (Product obj in lProduct)
                {
                    entDDLClass lDDLClass = new entDDLClass();
                    lDDLClass.Id = obj.product_id;
                    lDDLClass.Code = obj.product_name;
                    lDDLClass.Constant = obj.product_ref_no;
                    lDDLClass.Description = obj.status_value;
                    ilst.Add(lDDLClass);
                }
            }
            return ilst;
        }

        public static entDDL GetAllVendor(this entDDL DDL, string Key, int ConfigId)
        {
            DDL.Key = Key;
            List<entDDLClass> ilstentDDLClass = GetAllVendor(ConfigId);
            foreach (entDDLClass lentDDLClass in ilstentDDLClass)
            {
                DDL.Value.Add(lentDDLClass);
            }
            return DDL;
        }
        public static List<entDDLClass> GetAllVendor(int ConfigId)
        {
            List<entDDLClass> ilst = new List<entDDLClass>();
            List<Vendor> lVendor = new List<Vendor>();
            lVendor = CommonDAL.SelectDataFromDataBase<Vendor>(new string[] { "VENDOR_ID" }, new string[] { ">" },
                new object[] { ConfigId }).ToList();

            if (lVendor != null && lVendor.Count > 0)
            {
                foreach (Vendor obj in lVendor)
                {
                    entDDLClass lDDLClass = new entDDLClass();
                    lDDLClass.Id = obj.vendor_id;
                    lDDLClass.Code = obj.vendor_name;
                    lDDLClass.Constant = obj.vendor_ref_no;
                    lDDLClass.Description = obj.status_value;
                    ilst.Add(lDDLClass);
                }
            }
            return ilst;
        }
    }
}

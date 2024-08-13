using Google.Protobuf.WellKnownTypes;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace CHEExportsDataObjects
{
    public class DALBaseSearch
    {
        private readonly string DBConnection = "Server=SG2NWPLS19SQL-v09.mssql.shr.prod.sin2.secureserver.net;Database=chennaiexports;uid=jjtraders;pwd=jChennaij19#;TrustServerCertificate=True;";

        private SearchBase iSearchBase;

        public DALBaseSearch(SearchBase abusBaseSr)
        {
            iSearchBase = abusBaseSr;
        }

        public string GetSearchQuery()
        {
            string text = iSearchBase.SearchQueryBase();
            string whereClause = GetWhereClause();
            if (!string.IsNullOrWhiteSpace(whereClause))
            {
                text = text + " WHERE " + whereClause;
            }

            return text;
        }

        public string GetSearchCountQuery()
        {
            string searchQuery = GetSearchQuery();
            return "SELECT COUNT(*) FROM ( " + searchQuery + " ) TB";
        }

        public string GetSearchByPageQuery(int offset, int pageSize, string OrderByColumnNames = "", bool ascending = true)
        {
            string searchQuery = GetSearchQuery();
            string text = string.Empty;
            if (pageSize > 0)
            {
                text = "   OFFSET {0} ROWS FETCH NEXT {1} ROWS ONLY ";
                text = string.Format(text, offset, pageSize);
            }

            string text2 = " ORDER BY 1  ASC" + text;
            if (!string.IsNullOrWhiteSpace(OrderByColumnNames))
            {
                text2 = " ORDER BY " + OrderByColumnNames + " " + ((!ascending) ? "DESC" : "ASC") + text;
            }

            return searchQuery + text2;
        }

        private string GetWhereClause()
        {
            StringBuilder stringBuilder = new StringBuilder();
            PropertyInfo[] properties = iSearchBase.GetType().GetProperties();
            FieldInfo[] Fields = iSearchBase.GetType().GetFields();
            foreach (PropertyInfo propertyInfo in properties)
            {
                if (propertyInfo.PropertyType == typeof(int) || propertyInfo.PropertyType == typeof(long) || propertyInfo.PropertyType == typeof(decimal))
                {
                    if (Convert.ToDecimal(propertyInfo.GetValue(iSearchBase)) > 0m)
                    {
                        if (stringBuilder.Length > 0)
                        {
                            stringBuilder.Append(" AND ");
                        }

                        stringBuilder.Append(GetWhereCondition(propertyInfo, Fields, isString: false));
                    }
                }
                else if (propertyInfo.PropertyType == typeof(DateTime?))
                {
                    DateTime? dateTime = (DateTime?)propertyInfo.GetValue(iSearchBase);
                    if (dateTime.HasValue && dateTime > DateTime.MinValue)
                    {
                        if (stringBuilder.Length > 0)
                        {
                            stringBuilder.Append(" AND ");
                        }

                        stringBuilder.Append(GetWhereCondition(propertyInfo, Fields, isString: true));
                    }
                }
                else if (propertyInfo.PropertyType == typeof(string) && !string.IsNullOrWhiteSpace((string)propertyInfo.GetValue(iSearchBase)))
                {
                    if (stringBuilder.Length > 0)
                    {
                        stringBuilder.Append(" AND ");
                    }

                    stringBuilder.Append(GetWhereCondition(propertyInfo, Fields, isString: true));
                }
            }

            return stringBuilder.ToString();
        }

        private string GetWhereCondition(PropertyInfo prop, FieldInfo[] scAttr, bool isString)
        {
            string query = string.Empty;
            string text = string.Empty;
            string operators = string.Empty;
            string columnname = string.Empty;
            if (prop.PropertyType == typeof(DateTime?))
            {
                DateTime? dateTime = (DateTime?)prop.GetValue(iSearchBase);
                if (dateTime.HasValue && dateTime > DateTime.MinValue)
                {
                    text = dateTime.Value.ToString();
                }
            }
            else
            {
                text = prop.GetValue(iSearchBase).ToString();
                text = text.Replace("'", "''");
            }
            foreach (FieldInfo field in scAttr)
            {
                if (field.Name.Contains(prop.Name))
                {
                    if (field.Name.Contains("column_name"))
                    {
                        columnname = field.GetValue(iSearchBase).ToString();
                    }
                    else if(field.Name.Contains("operaor"))
                    {
                        operators = field.GetValue(iSearchBase).ToString();
                    }
                }
                if (!string.IsNullOrEmpty(columnname) && !string.IsNullOrEmpty(operators))
                {
                    if (operators.ToLower() == "like")
                    {
                        query = columnname + " " + operators + (isString ? " '" : " ") + "%" + text + "%" + (isString ? "' " : "");
                    }

                    query = columnname + " " + operators + (isString ? " '" : " ") + text + (isString ? "' " : "");
                }
            }
            return query;
        }

        public int GetTotalCount()
        {
            string searchCountQuery = GetSearchCountQuery();
            if (!string.IsNullOrWhiteSpace(searchCountQuery))
            {
                SqlConnection conn = new SqlConnection(DBConnection);
                conn.Open();
                SqlCommand command = new SqlCommand(searchCountQuery, conn);
                SqlDataAdapter adapter = new SqlDataAdapter(command);
                DataSet dataSet = new DataSet();
                adapter.Fill(dataSet);
                conn.Close();
                if (dataSet != null && dataSet.Tables != null && dataSet.Tables[0] != null && dataSet.Tables[0].Rows != null && dataSet.Tables[0].Rows.Count > 0)
                {
                    DataRow dataRow = dataSet.Tables[0].Rows[0];
                    if (dataRow != null)
                    {
                        return Convert.ToInt32(dataRow[0]);
                    }
                }
            }

            return 0;
        }
    }
}

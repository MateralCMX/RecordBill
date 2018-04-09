using RecordBill.Model;
using System;
using System.Linq;

namespace RecordBill.DAL
{
    /// <summary>
    /// Token数据操作类
    /// </summary>
    public sealed class TokenDAL : BaseDAL<T_Token, V_Token>
    {
        /// <summary>
        /// 根据用户编号和Token类型获得Token信息
        /// </summary>
        /// <param name="userID">用户编号</param>
        /// <param name="types">Token类型</param>
        /// <returns>Token信息</returns>
        public V_Token GetTokenViewInfoByUserIDAndTokenTypes(Guid userID, TokenTypesEnum types)
        {
            return _DB.V_Token.Where(m => m.FK_User_ID == userID && m.Types == (byte)types).FirstOrDefault();
        }
        /// <summary>
        /// 根据用户编号和Token类型获得Token信息
        /// </summary>
        /// <param name="userID">用户编号</param>
        /// <param name="types">Token类型</param>
        /// <returns>Token信息</returns>
        public T_Token GetTokenInfoByUserIDAndTokenTypes(Guid userID, TokenTypesEnum types)
        {
            return _DB.T_Token.Where(m => m.FK_User_ID == userID && m.Types == (byte)types).FirstOrDefault();
        }
    }
}

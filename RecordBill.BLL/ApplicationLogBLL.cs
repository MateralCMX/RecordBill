using RecordBill.DAL;
using RecordBill.Model;
using System;
using System.Configuration;

namespace RecordBill.BLL
{
    /// <summary>
    /// 应用程序日志业务类
    /// </summary>
    public sealed class ApplicationLogBLL
    {
        /// <summary>
        /// 应用程序日志数据操作对象
        /// </summary>
        private readonly static ApplicationLogDAL _applicationLogDAL = new ApplicationLogDAL();
        /// <summary>
        /// 写入异常日志
        /// </summary>
        /// <param name="ex">异常对象</param>
        public static Guid WriteExceptionLog(Exception ex)
        {
            ApplicationLogExceptionDAL applicationLogExceptionDAL = new ApplicationLogExceptionDAL();
            string message = string.Empty;
            Guid? parentID = null;
            Guid? fistID = null;
            do
            {
                message = ex.Message;
                parentID = WriteLog("发生异常", message, ApplicationLogTypeEnum.Exception, parentID);
                applicationLogExceptionDAL.Insert(new T_ApplicationLog_Exception
                {
                    FK_Log_ID = parentID.Value,
                    StackTrace = ex.StackTrace,
                    Types = ex.GetType().Name
                });
                if (fistID == null)
                {
                    fistID = parentID;
                }
                ex = ex.InnerException;
            } while (ex != null);
            return fistID.Value;
        }
        /// <summary>
        /// 写入操作日志
        /// </summary>
        /// <param name="title">标题</param>
        /// <param name="message">消息</param>
        /// <param name="parentID">父级ID</param>
        public static Guid WriteOptionsLog(string title, string message, Guid? parentID = null)
        {
            return WriteLog(title, message, ApplicationLogTypeEnum.Options, parentID);
        }
        /// <summary>
        /// 写入调试日志
        /// </summary>
        /// <param name="title">标题</param>
        /// <param name="message">消息</param>
        /// <param name="parentID">父级ID</param>
        public static Guid WriteDebugLog(string title, string message, Guid? parentID = null)
        {
            return WriteLog(title, message, ApplicationLogTypeEnum.Debug, parentID);
        }
        /// <summary>
        /// 写入日志
        /// </summary>
        /// <param name="title">标题</param>
        /// <param name="message">消息</param>
        /// <param name="types">类型</param>
        /// <param name="parentID">父级ID</param>
        private static Guid WriteLog(string title, string message, ApplicationLogTypeEnum types, Guid? parentID = null)
        {
            bool isWrite = Convert.ToBoolean(ConfigurationManager.AppSettings[types.ToString() + "Log"]);
            if (isWrite)
            {
                T_ApplicationLog logM = new T_ApplicationLog
                {
                    Types = (byte)types,
                    CreateTime = DateTime.Now,
                    Title = title,
                    Message = message,
                    FK_Parent_ID = parentID
                };
                logM = _applicationLogDAL.Insert(logM);
                return logM.ID;
            }
            else
            {
                return Guid.Empty;
            }
        }
    }
}

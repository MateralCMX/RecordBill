using System;

namespace RecordBill.Model
{
    /// <summary>
    /// 小本本异常类
    /// </summary>
    public class RecordBillException : Exception
    {
        /// <summary>
        /// 构造方法
        /// </summary>
        public RecordBillException() : base() { }
        /// <summary>
        /// 构造方法
        /// </summary>
        /// <param name="message">消息</param>
        public RecordBillException(string message) : base(message) { }
        /// <summary>
        /// 构造方法
        /// </summary>
        /// <param name="message">消息</param>
        /// <param name="innerException">父级异常</param>
        public RecordBillException(string message, Exception innerException) : base(message, innerException) { }
    }
}
using System;

namespace RecordBill.Service.Model.User
{
    public class EditUserModel : AddUserModel
    {
        /// <summary>
        /// 唯一标识
        /// </summary>
        public Guid ID { get; set; }
    }
}

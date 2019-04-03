using System;

namespace User.Service.Model.User
{
    public class EditUserModel : AddUserModel
    {
        /// <summary>
        /// 唯一标识
        /// </summary>
        public Guid ID { get; set; }
    }
}

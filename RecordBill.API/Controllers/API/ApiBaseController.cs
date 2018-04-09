using MateralTools.MConvert;
using System.Web.Http;

namespace RecordBill.API.Controllers.API
{
    /// <summary>
    /// WEBAPI父控制器
    /// </summary>
    public class ApiBaseController : ApiController
    {
    }
    /// <summary>
    /// WEBAPI数据库父控制器
    /// </summary>
    /// <typeparam name="TBLL">业务层</typeparam>
    public class ApiDBBaseController<TBLL> : ApiBaseController
    {
        /// <summary>
        /// 业务对象
        /// </summary>
        protected TBLL _bll;
        /// <summary>
        /// 构造方法
        /// </summary>
        public ApiDBBaseController()
        {
            _bll = _bll.MGetDefultObject<TBLL>();
        }
    }
}

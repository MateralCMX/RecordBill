using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RecordBill.API.Controllers
{
    /// <summary>
    /// 账单类型控制器
    /// </summary>
    public class BillTypeController : Controller
    {
        /// <summary>
        /// 主页
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View();
        }
    }
}
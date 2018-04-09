using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RecordBill.API.Controllers
{
    /// <summary>
    /// 平台控制器
    /// </summary>
    public class PlatformController : Controller
    {
        /// <summary>
        /// 平台主页
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View();
        }
    }
}
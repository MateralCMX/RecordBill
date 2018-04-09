using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RecordBill.API.Controllers
{
    /// <summary>
    /// 主页控制器
    /// </summary>
    public class HomeController : Controller
    {
        /// <summary>
        /// 主页
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// 欢迎页
        /// </summary>
        /// <returns></returns>
        public ActionResult WelCome()
        {
            return View();
        }
    }
}

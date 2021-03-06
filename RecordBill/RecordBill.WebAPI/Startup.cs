﻿using BaseWebAPI;
using BaseWebAPI.Model;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.PlatformAbstractions;
using System.IO;

namespace RecordBill.WebAPI
{
    /// <summary>
    /// Startup
    /// </summary>
    public class Startup
    {
        /// <summary>
        /// 应用程序名称
        /// </summary>
        public const string AppName = "RecordBillWebAPI";
        /// <summary>
        /// 构造方法
        /// </summary>
        /// <param name="configuration"></param>
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        /// <summary>
        /// 配置对象
        /// </summary>
        public IConfiguration Configuration { get; }

        /// <summary>
        /// 配置服务
        /// </summary>
        /// <param name="services"></param>
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddWebAPIServices();
            string basePath = PlatformServices.Default.Application.ApplicationBasePath;
            string[] swaggerHelperXmlPathArray =
            {
                Path.Combine(basePath, "Model.xml"),
                Path.Combine(basePath, "RecordBill.WebAPI.xml"),
                Path.Combine(basePath, "RecordBill.DataTransmitModel.xml"),
                Path.Combine(basePath, "RecordBill.PresentationModel.xml")
            };
            WebAPIHelper.BaseConfigureServices(services, new BaseConfigureServiceModel
            {
                AppName = AppName,
                SwaggerHelperXmlPathArray = swaggerHelperXmlPathArray
            });
        }

        /// <summary>
        /// 配置
        /// </summary>
        /// <param name="app"></param>
        /// <param name="env"></param>
        /// <param name="loggerFactory"></param>
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            WebAPIHelper.BaseConfigure(app, env, loggerFactory, AppName);
        }
    }
}

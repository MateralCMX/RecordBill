// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.
using Common;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using NLog;
using NLog.Config;
using NLog.Web;
using RecordBill.PresentationModel;

namespace User.IdentityServer
{
    public class Startup
    {
        private readonly IHostingEnvironment _environment;

        public Startup(IHostingEnvironment environment)
        {
            _environment = environment;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc(options =>
                {
                    options.Filters.Add(typeof(ExceptionProcessFilter));
                });
            services.AddIdentityServerServices();
        }

        public void Configure(IApplicationBuilder app)
        {
            if (_environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseIdentityServer();
            #region 配置Nlog
            NLogBuilder.ConfigureNLog("NLog.config").GetCurrentClassLogger();
            LogManager.Configuration.Install(new InstallationContext());
            LogManager.Configuration.Variables["NlogConnectionString"] = ApplicationConfig.RecordBillDB.ConnectionString;
            LogManager.Configuration.Variables["AppName"] = "UserIdentityServer";
            #endregion
        }
    }
}
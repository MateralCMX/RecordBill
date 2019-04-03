using Common.Model;
using Microsoft.Extensions.Configuration;
using System;

namespace Common
{
    public static class ApplicationConfig
    {
        private static IConfiguration _configuration;
        /// <summary>
        /// 配置对象
        /// </summary>
        public static IConfiguration Configuration
        {
            get
            {
                if (_configuration != null) return _configuration;
                _configuration = ConfigurationBuilder();
                return _configuration;
            }
            set => _configuration = value;
        }
        #region 应用程序
        private static IdentityServerConfigModel _identityServerConfig;
        /// <summary>
        /// 认证服务器
        /// </summary>
        public static IdentityServerConfigModel IdentityServer => _identityServerConfig ?? (_identityServerConfig = new IdentityServerConfigModel
        {
            Url = Configuration["Application:IdentityServer:Url"],
            Scope = Configuration["Application:IdentityServer:Scope"],
            Secret = Configuration["Application:IdentityServer:Secret"]
        });
        #endregion
        #region SQLServer
        private static SqlServerConfigModel _recordBillDBConfig;
        /// <summary>
        /// User数据库
        /// </summary>
        public static SqlServerConfigModel RecordBillDB => _recordBillDBConfig ?? (_recordBillDBConfig = new SqlServerConfigModel
        {
            Address = Configuration["SQLServerDB:RecordBillDB:Address"],
            Port = Configuration["SQLServerDB:RecordBillDB:Port"],
            Name = Configuration["SQLServerDB:RecordBillDB:Name"],
            UserID = Configuration["SQLServerDB:RecordBillDB:UserID"],
            Password = Configuration["SQLServerDB:RecordBillDB:Password"],
        });
        #endregion
        #region 私有方法
        /// <summary>
        /// 配置生成
        /// </summary>
        /// <returns></returns>
        private static IConfiguration ConfigurationBuilder()
        {
            if (_configuration != null) return _configuration;

#if DEBUG
            const string appConfigFile = "appsettings.Development.json";
#else
            const string appConfigFile = "appsettings.json";
#endif
            IConfigurationBuilder builder = new ConfigurationBuilder()
                .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                .AddJsonFile(appConfigFile);
            _configuration = builder.Build();
            return _configuration;
        }
        #endregion
    }
}

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
        private static SqlServerConfigModel _uploadFileDB;
        private static SqlServerConfigModel _userDBConfig;
        private static SqlServerConfigModel _logDBConfig;
        private static SqlServerConfigModel _archiveDBConfig;
        private static SqlServerConfigModel _landTransferDBConfig;
        private static SqlServerConfigModel _ruralReformDBConfig;
        private static SqlServerConfigModel _questionAnswering;//问答数据库
        /// <summary>
        /// User数据库
        /// </summary>
        public static SqlServerConfigModel UserDB => _userDBConfig ?? (_userDBConfig = new SqlServerConfigModel
        {
            Address = Configuration["SQLServerDB:UserDB:Address"],
            Port = Configuration["SQLServerDB:UserDB:Port"],
            Name = Configuration["SQLServerDB:UserDB:Name"],
            UserID = Configuration["SQLServerDB:UserDB:UserID"],
            Password = Configuration["SQLServerDB:UserDB:Password"],
        });
        /// <summary>
        /// 文件上传数据库
        /// </summary>
        public static SqlServerConfigModel UploadFileDB => _uploadFileDB ?? (_uploadFileDB = new SqlServerConfigModel
        {
            Address = Configuration["SQLServerDB:UploadFileDB:Address"],
            Port = Configuration["SQLServerDB:UploadFileDB:Port"],
            Name = Configuration["SQLServerDB:UploadFileDB:Name"],
            UserID = Configuration["SQLServerDB:UploadFileDB:UserID"],
            Password = Configuration["SQLServerDB:UploadFileDB:Password"],
        });
        /// <summary>
        /// Archive数据库
        /// </summary>
        public static SqlServerConfigModel ArchiveDB => _archiveDBConfig ?? (_archiveDBConfig = new SqlServerConfigModel
        {
            Address = Configuration["SQLServerDB:ArchiveDB:Address"],
            Port = Configuration["SQLServerDB:ArchiveDB:Port"],
            Name = Configuration["SQLServerDB:ArchiveDB:Name"],
            UserID = Configuration["SQLServerDB:ArchiveDB:UserID"],
            Password = Configuration["SQLServerDB:ArchiveDB:Password"],
        });
        /// <summary>
        /// LandTransfer数据库
        /// </summary>
        public static SqlServerConfigModel LandTransferDB => _landTransferDBConfig ?? (_landTransferDBConfig = new SqlServerConfigModel
        {
            Address = Configuration["SQLServerDB:LandTransferDB:Address"],
            Port = Configuration["SQLServerDB:LandTransferDB:Port"],
            Name = Configuration["SQLServerDB:LandTransferDB:Name"],
            UserID = Configuration["SQLServerDB:LandTransferDB:UserID"],
            Password = Configuration["SQLServerDB:LandTransferDB:Password"],
        });
        /// <summary>
        /// RuralReform数据库
        /// </summary>
        public static SqlServerConfigModel RuralReformDB => _ruralReformDBConfig ?? (_ruralReformDBConfig = new SqlServerConfigModel
        {
            Address = Configuration["SQLServerDB:RuralReformDB:Address"],
            Port = Configuration["SQLServerDB:RuralReformDB:Port"],
            Name = Configuration["SQLServerDB:RuralReformDB:Name"],
            UserID = Configuration["SQLServerDB:RuralReformDB:UserID"],
            Password = Configuration["SQLServerDB:RuralReformDB:Password"],
        });
        /// <summary>
        /// 日志数据库
        /// </summary>
        public static SqlServerConfigModel LogDB => _logDBConfig ?? (_logDBConfig = new SqlServerConfigModel
        {
            Address = Configuration["SQLServerDB:LogDB:Address"],
            Port = Configuration["SQLServerDB:LogDB:Port"],
            Name = Configuration["SQLServerDB:LogDB:Name"],
            UserID = Configuration["SQLServerDB:LogDB:UserID"],
            Password = Configuration["SQLServerDB:LogDB:Password"],
        });
        /// <summary>
        /// QuestionAnswering数据库
        /// </summary>
        public static SqlServerConfigModel QuestionAnsweringDB => _questionAnswering ?? (_questionAnswering = new SqlServerConfigModel
        {
            Address = Configuration["SQLServerDB:QuestionAnsweringDB:Address"],
            Port = Configuration["SQLServerDB:QuestionAnsweringDB:Port"],
            Name = Configuration["SQLServerDB:QuestionAnsweringDB:Name"],
            UserID = Configuration["SQLServerDB:QuestionAnsweringDB:UserID"],
            Password = Configuration["SQLServerDB:QuestionAnsweringDB:Password"],
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

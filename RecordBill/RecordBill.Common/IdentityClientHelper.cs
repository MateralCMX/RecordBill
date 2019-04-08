using Common;
using IdentityModel.Client;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace RecordBill.Common
{
    public class IdentityClientHelper
    {
        /// <summary>
        /// 获取Token返回
        /// </summary>
        /// <param name="account"></param>
        /// <param name="password"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        public static async Task<TokenResponse> GetTokenResponseAsync(string account, string password, LoginCategory type = LoginCategory.Password)
        {
            var discoveryDocumentRequest = new DiscoveryDocumentRequest
            {
                Address = ApplicationConfig.IdentityServer.Url,
                Policy = new DiscoveryPolicy
                {
                    RequireHttps = false
                }
            };
            var client = new HttpClient();
            DiscoveryResponse discoveryResponse = await client.GetDiscoveryDocumentAsync(discoveryDocumentRequest);
            if (discoveryResponse.IsError) throw new InvalidOperationException("连接认证服务器失败");
            TokenResponse tokenResponse = await client.RequestPasswordTokenAsync(new PasswordTokenRequest
            {
                Address = discoveryResponse.TokenEndpoint,
                ClientId = "Web",
                ClientSecret = ApplicationConfig.IdentityServer.Secret,
                UserName = account,
                Password = password,
                Scope = ApplicationConfig.IdentityServer.Scope,
                Parameters =
                {
                    { "type", type.ToString() }
                }
            });
            return tokenResponse;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace SmartCodeApp.Models
{
    public class ProxyMiddleware
    {
        private readonly RequestDelegate _next;

        public ProxyMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            if (context.Request.Path == "/api/proxy")
            {
                string url = context.Request.Query["url"];
                string endpoint = context.Request.Query["endpoint"];

                using (var httpClient = new HttpClient())
                {
                    //httpClient.DefaultRequestHeaders.Add("X-API-Key", "API_KEY");

                    var response = await httpClient.GetAsync(url + endpoint);
                    if (response.IsSuccessStatusCode)
                    {
                        var content = await response.Content.ReadAsStringAsync();
                        context.Response.StatusCode = (int)response.StatusCode;
                        context.Response.ContentType = "text/html";
                        await context.Response.WriteAsync(content);
                    }
                    else
                    {
                        context.Response.StatusCode = (int)response.StatusCode;
                        await context.Response.WriteAsync("Failed to call API");
                    }
                }
            }
            else
            {
                await _next(context);
            }
        }
    }

}
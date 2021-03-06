﻿using Microsoft.EntityFrameworkCore;
using SqlContext;
using ApiManager;
using System.IO;
using Microsoft.Extensions.Configuration;
using DMG.Services;

namespace Testing
{
    public class Program
    {

        static void Main(string[] args)
        {

           // string path = Directory.GetCurrentDirectory().Replace("Testing", "DMG.Web.Api");
            var builder = new DbContextOptionsBuilder<DataContext>();
            //IConfigurationRoot configuration = new ConfigurationBuilder()
            //  .SetBasePath(@path)
            //  .AddJsonFile("appsettings.json")
            //  .Build();
            var connection = "Server=FREENET-1;Database=CityWallet;Integrated Security=true";
            builder.UseSqlServer(connection);

            var _db = new DataContext(builder.Options);
            var srv = new HangFireService(_db);
            var srv1 = new SettlementService(_db);
            srv1.CreateSettlementTypes();
            srv.InsertData();
            //srv.ExportData();



        }
    }

}

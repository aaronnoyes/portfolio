using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using BlogApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.Net;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Data;
using System.Data.SqlClient;

var builder = WebApplication.CreateBuilder(args);

var res = builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            IssuerSigningKeyResolver = (s, securityToken, identifier, parameters) =>
            {
                try {
                    var response = new HttpClient().GetAsync("https://cognito-idp.us-east-1.amazonaws.com/us-east-1_nXVElUX8w/.well-known/jwks.json");
                    var jsonString = response.Result.Content.ReadAsStringAsync().Result;
                    var jsonKeys = new JsonWebKeySet(jsonString);
                    return jsonKeys.GetSigningKeys();
                }
                catch (InvalidCastException e) {
                    Console.Write("Error getting keys\n");
                    Console.Write(e);
                    return null;
                }
                
            },
            ValidIssuer = "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_nXVElUX8w",
            ValidateIssuerSigningKey = true,
            ValidateIssuer = true,
            ValidateLifetime = true,
            ValidAudience = "3tcv0qucved7j1l1lhck1drgio",
            ValidateAudience = true
        };
    });


builder.Services.AddControllers();

SqlConnectionStringBuilder connectionStringBuilder = new SqlConnectionStringBuilder(builder.Configuration["ConnectionStringBase"]);
connectionStringBuilder.UserID = builder.Configuration["DBUSER"];
connectionStringBuilder.Password = builder.Configuration["DBPASS"];
connectionStringBuilder.ConnectRetryCount = 30;
builder.Services.AddDbContext<BlogContext>(opt => opt.UseSqlServer(connectionStringBuilder.ConnectionString));

builder.Services.AddCors(p => p.AddPolicy("corsapp", builder =>
    {
        builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
    }));

var app = builder.Build();

using(var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<BlogContext>();
    dbContext.Database.EnsureCreated();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseRouting();
app.UseCors("corsapp");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

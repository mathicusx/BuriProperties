
using System.Net;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using WebAPI.Data;
using WebAPI.Helpers;
using WebAPI.Interfaces;

namespace WebAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>(options =>
             options.UseSqlServer(Configuration.GetConnectionString("Default")));
            services.AddControllers().AddNewtonsoftJson();
            services.AddCors();
            // were adding cors so we can use our WebApi Domain Localhost:5000 to our Frontend Domain on Localhost:4200

            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPI", Version = "v1" });
            });

                       var secretKey = Configuration.GetSection("AppSettings:Key").Value;
            var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(secretKey));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            // services.AddAuthentication("Bearer")
                .AddJwtBearer(opt => {
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        IssuerSigningKey = key
                    };
                });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
              if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPI v1"));
            }
            else // if were in production mode
            {
                app.UseExceptionHandler(
                    options => {
                       options.Run(
                           async context =>
                           {
                               context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                               var ex = context.Features.Get<IExceptionHandlerFeature>();
                               if (ex != null)
                               {
                                   await context.Response.WriteAsync(ex.Error.Message);
                               }
                           }
                       );
                    }
                );
            }


            app.UseRouting();


            app.UseCors( m => m.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()); // this is  bad practice.

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}

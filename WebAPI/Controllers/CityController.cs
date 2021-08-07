using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Data;
//using WebAPI.Models;

namespace WebAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class CityController : ControllerBase
  {
    private readonly DataContext dataContext;
    public CityController(DataContext dataContext)
    {
      this.dataContext = dataContext;

    }

    [HttpGet]
    public IActionResult GetCities()
    {
      var cities = dataContext.Cities.ToList();
      return Ok(cities); // ok produces status code 200OK
    }

  }
}

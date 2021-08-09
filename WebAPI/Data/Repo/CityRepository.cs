using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Data.Repo
{
    public class CityRepository : ICityRepository
    {
        private readonly DataContext dataContext;

        public CityRepository(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }
        public void AddCity(City city)
        {
            dataContext.Cities.Add(city);
        }

        public void DeleteCity(int CityId)
        {
            var city = dataContext.Cities.Find(CityId);
            dataContext.Cities.Remove(city);
        }

        public async Task<City> FindCity(int id)
        {
            return await dataContext.Cities.FindAsync(id);
        }

        public async Task<IEnumerable<City>> GetCitiesAsync()
        {
            return await dataContext.Cities.ToListAsync();
        }
    }
}

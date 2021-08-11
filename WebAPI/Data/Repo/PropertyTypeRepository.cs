using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Data.Repo
{

    public class PropertyTypeRepository : IPropertyTypeRepository
    {
        private readonly DataContext dataContext;

        public PropertyTypeRepository(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }
        public async Task<IEnumerable<PropertyType>> GetPropertyTypesAsync()
        {
            return await dataContext.PropertyTypes.ToListAsync();
        }
    }
}

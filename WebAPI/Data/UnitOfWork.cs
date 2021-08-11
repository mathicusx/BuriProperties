using System.Threading.Tasks;
using WebAPI.Data.Repo;
using WebAPI.Interfaces;

namespace WebAPI.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext dataContext;

        public UnitOfWork(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }
        public ICityRepository CityRepository =>
            new CityRepository(dataContext);

        public IFurnishingTypeRepository FurnishingTypeRepository =>
            new FurnishingTypeRepository(dataContext);

        public IPropertyTypeRepository PropertyTypeRepository =>
            new PropertyTypeRepository(dataContext);

            public IUserRepository UserRepository =>
            new UserRepository(dataContext);

        public async Task<bool> SaveAsync()
        {
           return await dataContext.SaveChangesAsync() > 0; // any value > 0 mean that changes will be succefully Saved.
        }
    }
}

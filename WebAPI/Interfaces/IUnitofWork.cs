using System.Threading.Tasks;

namespace WebAPI.Interfaces
{
    public interface IUnitOfWork
    {
         ICityRepository CityRepository {get; }

         IFurnishingTypeRepository FurnishingTypeRepository {get; }

         IPropertyTypeRepository PropertyTypeRepository {get; }

         IUserRepository UserRepository {get; }
         Task<bool> SaveAsync();
    }
}

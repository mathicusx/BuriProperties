using System.Threading.Tasks;

namespace WebAPI.Interfaces
{
    public interface IUnitOfWork
    {
         ICityRepository CityRepository {get; }

         IFurnishingTypeRepository FurnishingTypeRepository {get; }

         IPropertyTypeRepository PropertyTypeRepository {get; }

         IPropertyRepository PropertyRepository {get; }

         IUserRepository UserRepository {get; }
         Task<bool> SaveAsync();
    }
}

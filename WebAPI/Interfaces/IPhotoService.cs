using System.Threading.Tasks;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;

namespace WebAPI.Interfaces
{
    public interface IPhotoService
    {
         Task<ImageUploadResult> UploadPhotoAsync(IFormFile photo);


         //TODO ADD DELETE Photo
    }
}

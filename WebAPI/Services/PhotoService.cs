using System.Threading.Tasks;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using WebAPI.Interfaces;

namespace WebAPI.Services
{
    public class PhotoService : IPhotoService
    {
        private readonly Cloudinary cloudinary;
        public PhotoService(IConfiguration config)
        {
            Account account = new Account(
                config.GetSection("CloudinarySettings:CloudName").Value,
                config.GetSection("CloudinarySettings:ApiKey").Value,
                config.GetSection("CloudinarySettings:ApiSecret").Value);

            cloudinary = new Cloudinary(account);
        }

        public async Task<ImageUploadResult> UploadPhotoAsync(IFormFile photo)
        {
            var uploadResult = new ImageUploadResult();
            if(photo.Length > 0) // if lenght is 0 the photo file doesn't have anything to upload or is Corrupted file.
            {

              // we are reading the photo using fileStream which can result in Memory Leak if we do not close it properly.
              // we have USING statement so the stream automatically closes after it finishes its task and it gets disposed of.
                using var stream = photo.OpenReadStream();
                var uploadParams = new ImageUploadParams // ImageUploadParams is a cloudinary method
                {
                  // FileDescription is a cloudinary method which takes our photo name and our fileStream
                    File = new FileDescription(photo.FileName, stream),
                    Transformation = new Transformation()
                        .Height(500).Width(800)
                };
                uploadResult = await cloudinary.UploadAsync(uploadParams);
            }
            return uploadResult;
        }
    }
}

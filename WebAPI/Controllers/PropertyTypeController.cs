using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Dtos;
using WebAPI.Interfaces;

namespace WebAPI.Controllers
{

    public class PropertyTypeController: BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;

        public PropertyTypeController(IUnitOfWork uow, IMapper mapper)
        {
            this.uow = uow;
            this.mapper = mapper;
        }

         // GET api/propertytype/list
        [HttpGet ("list")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPropertyTypes()
        {
            var PropertyTypes = await uow.PropertyTypeRepository.GetPropertyTypesAsync();

            //We have not mapped it to PropertyType Specific Dto, we are using A generic Type KVP Dto.
            // So we don't have to make multiple Dtos  for Types. -- Code Reusability by using KVPDto.
            var PropertyTypesDto = mapper.Map<IEnumerable<KeyValuePairDto>>(PropertyTypes);
            return Ok(PropertyTypesDto);
        }

    }
}

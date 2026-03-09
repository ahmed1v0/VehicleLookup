using Microsoft.AspNetCore.Mvc;
using VehicleLookup.Application.DTOs;
using VehicleLookup.Application.Interfaces;

namespace VehicleLookup.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VehiclesController : ControllerBase
    {
        private readonly IVehicleService _service;

        public VehiclesController(IVehicleService service) => _service = service;

        [HttpGet("makes")]
        public async Task<IActionResult> GetMakes()
            => Ok(await _service.GetAllMakesAsync());

        [HttpGet("makes/{makeId}/types")]
        public async Task<IActionResult> GetTypes(int makeId)
            => Ok(await _service.GetVehicleTypesByMakeIdAsync(makeId));

        [HttpGet("models")]
        public async Task<IActionResult> GetModels([FromQuery] ModelSearchRequest request)
            => Ok(await _service.GetModelsAsync(request));
    }
}
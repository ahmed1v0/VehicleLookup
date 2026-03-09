using VehicleLookup.Application.DTOs;
using VehicleLookup.Application.Interfaces;

namespace VehicleLookup.Application.Services
{
    public class VehicleAppService : IVehicleService
    {
        private readonly INhtsaClient _nhtsaClient;

        public VehicleAppService(INhtsaClient nhtsaClient)
        {
            _nhtsaClient = nhtsaClient;
        }

        public async Task<object> GetAllMakesAsync()
            => await _nhtsaClient.GetMakesAsync();

        public async Task<object> GetVehicleTypesByMakeIdAsync(int makeId)
            => await _nhtsaClient.GetVehicleTypesAsync(makeId);

        public async Task<object> GetModelsAsync(ModelSearchRequest request)
            => await _nhtsaClient.GetModelsAsync(request.MakeId, request.Year);
    }
}
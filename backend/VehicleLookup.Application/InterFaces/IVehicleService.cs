using VehicleLookup.Application.DTOs;

namespace VehicleLookup.Application.Interfaces
{
    public interface IVehicleService
    {
        Task<object?> GetAllMakesAsync();
        Task<object?> GetVehicleTypesByMakeIdAsync(int makeId);
        Task<object?> GetModelsAsync(ModelSearchRequest request);
    }
}

namespace VehicleLookup.Application.Interfaces
{
    public interface INhtsaClient
    {
        Task<object> GetMakesAsync();
        Task<object> GetVehicleTypesAsync(int makeId);
        Task<object> GetModelsAsync(int makeId, int year);
    }
}
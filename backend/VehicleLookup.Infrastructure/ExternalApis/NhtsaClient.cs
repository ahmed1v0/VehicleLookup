using System.Net.Http.Json;
using VehicleLookup.Application.Interfaces;
namespace VehicleLookup.Infrastructure.ExternalApis
{
    public class NhtsaClient : INhtsaClient
    {
        private readonly HttpClient _httpClient;

        public NhtsaClient(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<object> GetMakesAsync()
            => await _httpClient.GetFromJsonAsync<object>("vehicles/getallmakes?format=json");

        public async Task<object> GetVehicleTypesAsync(int makeId)
            => await _httpClient.GetFromJsonAsync<object>($"vehicles/GetVehicleTypesForMakeId/{makeId}?format=json");

        public async Task<object> GetModelsAsync(int makeId, int year)
            => await _httpClient.GetFromJsonAsync<object>($"vehicles/GetModelsForMakeIdYear/makeId/{makeId}/modelyear/{year}?format=json");
    }
}
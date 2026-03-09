using System.ComponentModel.DataAnnotations;

namespace VehicleLookup.Application.DTOs
{
    public class ModelSearchRequest
    {
        [Required]
        public int MakeId { get; set; }

        [Required]
        [Range(1900, 2100)]
        public int Year { get; set; }
    }
}

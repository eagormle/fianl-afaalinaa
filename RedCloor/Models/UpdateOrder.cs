using RedCloorAPI.Models;

namespace RedCloor.Models
{
    public class UpdateOrder
    {
        public OrderType OrderType { get; set; }
        public string CustomerName { get; set; }
        public string CreatedByUserName { get; set; }
    }
}

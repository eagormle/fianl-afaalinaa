using RedCloorAPI.Models;

namespace RedCloor.Models
{
    public class GetOrder
    {
        public int Id { get; set; }
        public OrderType OrderType { get; set; }
        public string CustomerName { get; set; }
        public DateTime Date { get; set; }
        public string CreatedbyUser { get; set; }
    }

    public class OrderFilter
    {
        public OrderType? OrderType { get; set; }
    }
}

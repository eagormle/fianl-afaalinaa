using System.Collections.Generic;

namespace RedCloorAPI.Models
{
    public class Order
    {
        public int Id { get; set; } 
        public OrderType OrderType { get; set; }
        public string CustomerName { get; set; }
        public DateTime Date  { get; set; }
        public string CreatedbyUser { get; set; }

    }
    public enum OrderType { 
        Standard,
        SaleOrder,
        PurchaseOrder,
        TransferOrder, 
        ReturnOrder
    } 
}

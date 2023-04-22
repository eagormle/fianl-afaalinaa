using RedCloor.Models;
using RedCloorAPI.Models;
using System.Net;

public interface IOrderRepository : IGenericRepository<Order>
{
    HttpStatusCode CreateOrder(CreateOrder createOrder);

    List<GetOrder> GetOrder(OrderFilter getOrder);

    void DeleteOrder(Guid Id);

    GetOrder UpdateOrder(Guid Id, UpdateOrder updateOrder);
}
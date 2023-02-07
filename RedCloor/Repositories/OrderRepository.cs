using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Identity.Client;
using RedCloor.Models;
using RedCloorAPI.Models;
using System.Net;

public class OrderRepository : GenericRepository<Order>, IOrderRepository
{
    public OrderRepository(ApplicationContext context) : base(context)
    {
    }
    public HttpStatusCode CreateOrder(CreateOrder createOrder)
    {
        var orderTotal = _context.Orders.Count();
        var order = new Order
        {
            //Id = orderTotal,
            OrderType = createOrder.OrderType,
            CustomerName = createOrder.CustomerName,
            CreatedbyUser = createOrder.CreatedByUserName,
            Date = DateTime.Now
        };
        Add(order);
        if (_context.SaveChanges() == 0) { 
            return HttpStatusCode.BadRequest;
        }
        return HttpStatusCode.OK;
    }
    public List<GetOrder> GetOrder(OrderFilter getOrder) 
    {
        var orders_query = _context.Set<Order>().AsQueryable();
        if (getOrder.OrderType.HasValue)
        {
            orders_query = orders_query.Where(o => o.OrderType == getOrder.OrderType.Value);
        }

        var result = orders_query.OrderByDescending(o => o.Id).Select(o => new GetOrder
        {
            Id = o.Id,
            OrderType = o.OrderType,
            CustomerName = o.CustomerName,
            Date = o.Date,
            CreatedbyUser = o.CreatedbyUser
        }).ToList();
        return result;
    }
    
    public void DeleteOrder(int Id)
    {
        Order existing = GetById(Id);
        if (existing == null)
        {
            throw new Exception("Error, order not foind");
        }

        _context.Remove(existing);

        if (_context.SaveChanges() == 0)
        {
            throw new Exception("Error, order not deleted");
        }

        
    }

    public GetOrder UpdateOrder(int Id, UpdateOrder updateOrder)
    {
        Order update = GetById(Id);

        if (update == null)
        {
            throw new Exception("Order does not exist");
        }

        update.OrderType = updateOrder.OrderType;
        update.CustomerName = updateOrder.CustomerName;
        update.Date = DateTime.Now;

        if (_context.SaveChanges() == 0)
        {
            throw new Exception("Failed to update order");
        }

        return new GetOrder
        {
            Id = update.Id,
            OrderType = update.OrderType,
            CustomerName = update.CustomerName,
            Date = update.Date,

        };
    }

}
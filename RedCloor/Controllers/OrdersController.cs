using Microsoft.AspNetCore.Mvc;
using RedCloor.Models;
using RedCloorAPI.Models;
using System.Net;

namespace RedCloor.Controllers
{
    [ApiController]
    [Route("[controller]")] 
    
    public class OrdersController : Controller
    {
        private readonly IOrderRepository _orderRepository;

        public OrdersController(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        [HttpPost]
        public HttpStatusCode CreateOrder([FromBody] CreateOrder createOrder) { 
           return _orderRepository.CreateOrder(createOrder);
        }

        [HttpPost]
        [Route("Filtered")]
        public List<GetOrder> GetOrders([FromBody] OrderFilter getOrder) {
            return _orderRepository.GetOrder(getOrder);
        }

        [HttpDelete("{Id}")]
        public IActionResult DeleteOrder([FromRoute] int Id)
        {
            _orderRepository.DeleteOrder(Id);
            return Ok();
        }

        [HttpPut("{Id}")]
        public GetOrder UpdateOrder([FromRoute] int Id, [FromBody] UpdateOrder updateOrder)
        {
            return _orderRepository.UpdateOrder(Id, updateOrder);
        }

    }
}

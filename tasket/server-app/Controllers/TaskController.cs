using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using server_app.Application.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace server_app.Controllers
{
    [AllowAnonymous]
    public class TasksController : BaseApiController
    {        
        [HttpGet("index")]
        public async Task<ActionResult> GetTasks()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("details/{id}")]
        public async Task<ActionResult> Details(long id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{id = id}));
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] Models.Task task){
            return HandleResult(await Mediator.Send(new Create.Command{ Task = task}));
        }
        

        [HttpPost("update/{id}")]
        public async Task<IActionResult> Update(long id, [FromBody] Models.Task task)
        {
            task.id = id;

            return HandleResult(await Mediator.Send(new Edit.Command{ Task = task}));
        }

        [HttpPost("delete/{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{id=id}));
        }


    }
}
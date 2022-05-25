using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using server_app.ApplicationCore;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using server_app.Data;
using server_app.Models;

namespace server_app.Application.Tasks
{
    public class Details
    {

        public class Query : IRequest<Result<Models.Task>>{
            public long ID {get; set;}
        }

        public class Handler : IRequestHandler<Query, Result<Models.Task>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Models.Task>> Handle(Query request, CancellationToken cancellationToken)
            {
                var task =  await _context.Tasks.FindAsync(request.ID);

                if(task==null) throw new Exception("Task not found");

                return Result<Models.Task>.Success(task);
            }
        }
    }
}
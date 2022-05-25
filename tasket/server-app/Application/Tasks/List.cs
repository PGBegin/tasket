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
    public class List
    {
        public class Query : IRequest<Result<List<server_app.Models.Task>>>{}

        public class Handler : IRequestHandler<Query, Result<List<server_app.Models.Task>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<server_app.Models.Task>>> Handle(Query request, CancellationToken cancellationToken)
            {

                
                return Result<List<server_app.Models.Task>>.Success(await _context.Tasks.ToListAsync(cancellationToken));
            }
        }
    }
}
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

namespace server_app.Application.Statuses
{
    public class List
    {
        public class Query : IRequest<Result<List<Status>>>{}

        public class Handler : IRequestHandler<Query, Result<List<Status>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Status>>> Handle(Query request, CancellationToken cancellationToken)
            {

                
                return Result<List<Status>>.Success(await _context.Statuses.ToListAsync(cancellationToken));
            }
        }
    }
}
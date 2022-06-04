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
    public class Details
    {

        public class Query : IRequest<Result<Status>>{
            public int id {get; set;}
        }

        public class Handler : IRequestHandler<Query, Result<Status>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Status>> Handle(Query request, CancellationToken cancellationToken)
            {
                var status =  await _context.Statuses.FindAsync(request.id);

                if(status==null) throw new Exception("Status not found");

                return Result<Status>.Success(status);
            }
        }
    }
}
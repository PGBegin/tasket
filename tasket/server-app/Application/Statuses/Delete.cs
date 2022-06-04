using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using server_app.ApplicationCore;
using MediatR;
using server_app.Data;
using server_app.Models;





namespace server_app.Application.Statuses
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public int id {get; set;}
        }
        public class Handler : IRequestHandler<Command,Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var status = await _context.Statuses.FindAsync(request.id);

                if(status == null) return null;

                _context.Remove(status);

                var result = await _context.SaveChangesAsync()>0;

                if(!result) return Result<Unit>.Failure("fail to delete status");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
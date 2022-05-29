using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using server_app.ApplicationCore;
using MediatR;
using server_app.Data;
using server_app.Models;





namespace server_app.Application.Tasks
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public long id {get; set;}
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
                var task = await _context.Tasks.FindAsync(request.id);

                if(task == null) return null;

                _context.Remove(task);

                var result = await _context.SaveChangesAsync()>0;

                if(!result) return Result<Unit>.Failure("fail to delete task");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
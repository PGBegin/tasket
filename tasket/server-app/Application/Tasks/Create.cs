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
using FluentValidation;

namespace server_app.Application.Tasks
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>{
            public Models.Task Task {get; set;}
        }


        public class CommandVelidator : AbstractValidator<Command>
        {
            public CommandVelidator()
            {
                RuleFor(x => x.Task).SetValidator(new TaskValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
        private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {

                
                long id = 1 + (await _context.Tasks
                                        .MaxAsync(t => (long?)t.id) ?? 0);

                request.Task.id = id;

                
                request.Task.createUser = "";
                request.Task.createDatetime = DateTime.Now;
                request.Task.latestUpdateUser = "";
                request.Task.latestUpdateDatetime = DateTime.Now;

                _context.Tasks.Add(request.Task);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to create task");

                return Result<Unit>.Success(Unit.Value);
            }
        }

    }

}
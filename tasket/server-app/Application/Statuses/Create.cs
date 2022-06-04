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

namespace server_app.Application.Statuses
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>{
            public Models.Status Status {get; set;}
        }


        public class CommandVelidator : AbstractValidator<Command>
        {
            public CommandVelidator()
            {
                RuleFor(x => x.Status).SetValidator(new StatusValidator());
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

                
                int id = 1 + (await _context.Statuses
                                        .MaxAsync(t => (int?)t.status) ?? 0);

                request.Status.status = id;

                

                _context.Statuses.Add(request.Status);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to create status");

                return Result<Unit>.Success(Unit.Value);
            }
        }

    }

}
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using server_app.ApplicationCore;
using FluentValidation;
using MediatR;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using server_app.Data;
using server_app.Models;

namespace server_app.Application.Statuses
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
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
        private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var status = await _context.Statuses.FindAsync(request.Status.status);

                if(status == null) return null;

                _mapper.Map(request.Status, status);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("failed to update status");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
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
using server_app.DTOs;
using System.Linq;

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
                //return Result<List<server_app.Models.Task>>.Success(await _context.Tasks.Include(x => x.StatusNavigation).ToListAsync(cancellationToken));
            }
        }
    }
    public class List2
    {
        public class Query : IRequest<Result<List<TaskListDto>>>{}

        public class Handler : IRequestHandler<Query, Result<List<TaskListDto>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<TaskListDto>>> Handle(Query request, CancellationToken cancellationToken)
            {

                
                return Result<List<TaskListDto>>
                    .Success(await _context.Tasks
                                .Select(x => new TaskListDto()
                                {
                                    id=x.id,
                                    title=x.title,
                                    startDatetimeScheduled=x.startDatetimeScheduled,
                                    startDatetimeActual=x.startDatetimeActual,
                                    endDatetimeScheduled=x.endDatetimeScheduled,
                                    endDatetimeActual=x.endDatetimeActual,
                                    status=x.status,
                                    status_title=x.StatusNavigation.title,
                                    shortDescription=x.shortDescription,
                                    longDescription=x.longDescription,
                                })
                                .ToListAsync(cancellationToken));
                //return Result<List<server_app.Models.Task>>.Success(await _context.Tasks.Include(x => x.StatusNavigation).ToListAsync(cancellationToken));
            }
        }
/*
        private static object object_from_t_light(t_light item) =>
            new
            {
                type = "light",
                model_name = "Model Name",


                id_article = item.id_article,
                id_light = item.id_light,
                light_type = item.light_type,
                title = item.title,
                short_description = item.short_description,
                color = item.color,
                intensity = item.intensity,
                px = item.px,
                py = item.py,
                pz = item.pz,
                distance = item.distance,
                decay = item.decay,
                power = item.power,
                shadow = item.shadow,
                tx = item.tx,
                ty = item.ty,
                tz = item.tz,
                skycolor = item.groundcolor,
                groundcolor = item.groundcolor,
                is_lensflare = item.is_lensflare,
                lfsize = item.lfsize,
                file_data = item.file_data

            };*/
    }
}


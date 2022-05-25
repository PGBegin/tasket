using AutoMapper;
using server_app.Models;
//using Domain;

namespace server_app.ApplicationCore
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Task, Task>();
        }
    }
}
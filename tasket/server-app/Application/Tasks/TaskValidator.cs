using FluentValidation;
using server_app.Models;

namespace server_app.Application.Tasks
{
    public class TaskValidator : AbstractValidator<Task>
    {
        public TaskValidator()
        {
            RuleFor(x => x.title).NotEmpty();
        }
    }
}
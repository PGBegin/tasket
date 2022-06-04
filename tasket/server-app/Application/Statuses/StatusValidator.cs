using FluentValidation;
using server_app.Models;

namespace server_app.Application.Statuses
{
    public class StatusValidator : AbstractValidator<Status>
    {
        public StatusValidator()
        {
            RuleFor(x => x.title).NotEmpty();
        }
    }
}
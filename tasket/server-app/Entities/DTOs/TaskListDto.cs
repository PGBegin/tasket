using System;
using System.Collections.Generic;

namespace server_app.DTOs
{
    public class TaskListDto
    {
        public long id { get; set; }
        public string title {get; set;}
        public Nullable<DateTime> startDatetimeScheduled { get; set; }
        public Nullable<DateTime> startDatetimeActual { get; set; }
        public Nullable<DateTime> endDatetimeScheduled { get; set; }
        public Nullable<DateTime> endDatetimeActual { get; set; }
        public int status { get; set; }
        public string status_title { get; set; }
        public string shortDescription { get; set; }
        public string longDescription { get; set; }
        public string createUser { get; set; }
        public DateTime createDatetime { get; set; }
        public string latestUpdateUser { get; set; }
        public DateTime latestUpdateDatetime { get; set; }
    }
}
using System;

namespace server_app.Models
{
    public class Task
    {
        public long id { get; set; }
        public string title {get; set;}
        public Nullable<DateTime> startDatetimeScheduled { get; set; }
        public Nullable<DateTime> startDatetimeActual { get; set; }
        public Nullable<DateTime> endDatetimeScheduled { get; set; }
        public Nullable<DateTime> endDatetimeActual { get; set; }
        public int status { get; set; }
        public string shortDescription { get; set; }
        public string longDescription { get; set; }
        public string createUser { get; set; }
        public DateTime createDatetime { get; set; }
        public string latestUpdateUser { get; set; }
        public DateTime latestUpdateDatetime { get; set; }

        //public Status Status { get; set; } // 追加分
    }
}
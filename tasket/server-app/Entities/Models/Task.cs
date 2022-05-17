using System;

namespace server_app.Models
{
    public class Task
    {
        public long Id { get; set; }
        public string Title {get; set;}
        public DateTime Date { get; set; }
        public string ShortDescription { get; set; }
        public string LongDescription { get; set; }
    }
}
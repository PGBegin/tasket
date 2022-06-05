using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace server_app.Models
{
    public class Status
    {
        public int status { get; set; }
        public string title {get; set;}
        public ICollection<Task> Tasks { get; set; } // 追加分
    }
}
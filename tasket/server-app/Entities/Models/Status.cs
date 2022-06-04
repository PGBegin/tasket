using System;
using System.ComponentModel.DataAnnotations;

namespace server_app.Models
{
    public class Status
    {
        [Key]
        public int status { get; set; }
        public string title {get; set;}
    }
}
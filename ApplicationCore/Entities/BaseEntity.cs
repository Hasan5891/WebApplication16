using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace WebApplication16.ApplicationCore.Entities
{
   public class BaseEntity
    {
        [Key]
        public int Id { get; set; }
    }
}

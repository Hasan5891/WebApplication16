using Microsoft.EntityFrameworkCore.Infrastructure;
using System;
using System.Collections.Generic;
using System.Text;

namespace WebApplication16.ApplicationCore.Entities
{
  public  class Student:BaseEntity
    {
        private ILazyLoader LazyLoader { get; set; }
        public string Name { get; set; }
        public string Phone_number { get; set; }
        public DateTime Hire_date { get; set; }
        public string Address { get; set; }
        private Group _group;
             public virtual Group Group
        {

            get => LazyLoader.Load(this, ref _group);
            set => _group = value;
        }


    }
}

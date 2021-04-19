using Microsoft.EntityFrameworkCore.Infrastructure;
using System;
using System.Collections.Generic;
using System.Text;

namespace WebApplication16.ApplicationCore.Entities
{
   public class Group:BaseEntity
    {
        private ILazyLoader LazyLoader { get; set; }
        public string GroupName { get; set; }
        private ICollection<Student> _students;
        public virtual ICollection<Student> Students
        {

            get => LazyLoader.Load(this, ref _students);
            set => _students = value;
        }

    }
}


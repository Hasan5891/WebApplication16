using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore.Query;
using System.Text;
using System.Linq;
using System.Threading.Tasks;
using WebApplication16.ApplicationCore.Entities;

namespace WebApplication16.ApplicationCore.Interfaces
{
    public interface IAsyncRepository<T> where T : BaseEntity
    {
        //  Task<T> GetByIdAsync(params Expression<Func<T, object>>[] including);
        Task<T> GetFirstOrDefault(Expression<Func<T, bool>> predicate = null,
                                         Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null,
                                         bool disableTracking = true);

        IQueryable<T> GetAll(Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null);
        IQueryable<T> GetAllFillter(Expression<Func<T, bool>> predicate = null, Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null);


            Task<List<T>> ListAllAsync();

        Task<T> AddAsync(T entity);
        Task<T> UpdateAsync(T entity);
        Task<T> DeleteAsync(T entity);
    }
}

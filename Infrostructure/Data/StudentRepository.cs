using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore.Query;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;
using System.Linq.Expressions;
using WebApplication16.ApplicationCore.Interfaces;
using WebApplication16.ApplicationCore.Entities;

namespace WebApplication16.Infrostructure.Data
{
    public class StudentRepository<T> : IAsyncRepository<T> where T : BaseEntity
    {
        protected readonly ApplicationDbContext _dbContext;

        public StudentRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }


        public virtual async Task<T> GetFirstOrDefault(
                                          Expression<Func<T, bool>> predicate = null,
                                            Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null,
                                          bool disableTracking = true)
        {
            var query = _dbContext.Set<T>().AsQueryable();


            if (include != null)
            {
                query = include(query);
            }

            if (predicate != null)
            {
                query = query.Where(predicate);
            }


            return await query.FirstOrDefaultAsync();

        }
        public virtual  IQueryable<T> GetAllFillter(Expression<Func<T, bool>> predicate = null,Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null)
        {
            var query = _dbContext.Set<T>().Where(predicate);


            if (include != null)
            {
                query = include(query);
            }


            return  query.AsQueryable();


        }
        public virtual  IQueryable<T> GetAll(Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null)
        {
            var query = _dbContext.Set<T>().AsQueryable();


            if (include != null)
            {
                query = include(query);
            }
           

            return  query.AsQueryable();


        }
        public async Task<List<T>> ListAllAsync()
        {
            return await _dbContext.Set<T>().ToListAsync();
        }





        public async Task<T> AddAsync(T entity)
        {
            _dbContext.Set<T>().Add(entity);
            await _dbContext.SaveChangesAsync();

            return entity;
        }


        public async Task<T> UpdateAsync(T entity)
        {
            _dbContext.Entry(entity).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return entity;
        }


        public async Task<T> DeleteAsync(T entity)
        {
            _dbContext.Set<T>().Remove(entity);
            await _dbContext.SaveChangesAsync();
            return entity;
        }
    }
}

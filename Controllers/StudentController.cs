
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WebApplication16.ApplicationCore.Entities;
using WebApplication16.ApplicationCore.Interfaces;
using WebApplication16.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication16.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly ApplicationCore.Interfaces.IAsyncRepository<Student> _studentRepository;
        public StudentController(IAsyncRepository<Student> StudentRepository)
        {
            _studentRepository = StudentRepository;
        }

        // GET: api/Companies
        [HttpGet]
        public IActionResult GettStudent()
        {
            var m = _studentRepository.GetAll();
            return Ok(m);
        }

        // GET: api/Companies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Student>> GetStudent(int id)
        {
            return Ok(await _studentRepository.GetFirstOrDefault(x => x.Id == id, source => source.Include(y => y.Group)));
        }

        // PUT: api/Companies/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut]
        public IActionResult PutStudent([FromBody] PagingRequest paging)
        {
            var pagingResponse = new PagingResponse()
            {
                Draw = paging.Draw
            };


            IQueryable<Student> query = null;

            if (!string.IsNullOrEmpty(paging.SearchCriteria.Filter))
            {
                query = _studentRepository.GetAll().Where(p => p.Name.Contains(paging.SearchCriteria.Filter));



            }
            else
            {
                query = _studentRepository.GetAll();
            }

            var recordsTotal = query.Count();

            var colOrder = paging.Order[0];

            switch (colOrder.Column)
            {
                case 0:
                    query = colOrder.Dir == "asc" ? query.OrderBy(st => st.Id) : query.OrderByDescending(st => st.Id);
                    break;
                case 1:
                    query = colOrder.Dir == "asc" ? query.OrderBy(st => st.Name) : query.OrderByDescending(st => st.Name);
                    break;
                case 2:
                    query = colOrder.Dir == "asc" ? query.OrderBy(st => st.Address) : query.OrderByDescending(st => st.Address);
                    break;
                case 3:
                    query = colOrder.Dir == "asc" ? query.OrderBy(st => st.Hire_date) : query.OrderByDescending(st => st.Hire_date);
                    break;
            }

            pagingResponse.Users = query.AsEnumerable().Skip(paging.Start).Take(paging.Length).ToArray();
            pagingResponse.RecordsTotal = recordsTotal;
            pagingResponse.RecordsFiltered = recordsTotal;


            return Ok(pagingResponse);
        }

        [Route("PostStudents")]
        [HttpPost]
        public async Task<IActionResult> PostStudents( Student st)
        {
          
                return BadRequest();
            
            await _studentRepository.UpdateAsync(st);


            return NoContent();
        }

        // POST: api/Companies
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Student>> PostStudent( Student st)
        {
            await _studentRepository.AddAsync(st);

            return Ok(st.Id);
        }

        // DELETE: api/Companies/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Student>> DeleteCompany(int id)
        {
            var st = await _studentRepository.GetFirstOrDefault(x => x.Id == id);


            if (st == null)
            {
                return NotFound();
            }

            

            return Ok(await _studentRepository.DeleteAsync(await _studentRepository.GetFirstOrDefault(x => x.Id == id)));
        }

    }
}

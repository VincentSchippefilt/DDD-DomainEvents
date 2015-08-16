using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using yo.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace yo.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
       
        // GET: api/values
        [HttpGet]
        public Entries[,] Get()
        {
            return new Entries[2,4]
            {
               new Entries[]{ new Entries(),new Entries(),new Entries(),new Entries() },
               new Entries[]{ new Entries(),new Entries(),new Entries(),new Entries() },
            };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            ApplicationDbContext c = Resolver.GetService(typeof(ApplicationDbContext)) as ApplicationDbContext;
            Debug.Assert(c != null);
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

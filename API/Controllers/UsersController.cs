using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;
        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<AppUser>>>GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return users;
        }

        //api/users/3
        [HttpGet("{id}")]
        public async Task<ActionResult <AppUser>> GetUser(int id)
        {
            var user =await _context.Users.FindAsync(id);
            return user;
        }
    }
}

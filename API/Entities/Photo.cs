﻿using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Photos")]
    public class Photo
    {
        
        public int Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public int PublicId { get; set; }
        public AppUser appUser { get; set; }
        public int AppUserId { get; set; }
    }
}
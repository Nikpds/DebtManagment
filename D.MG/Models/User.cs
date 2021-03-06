﻿using System.Collections.Generic;

namespace Models
{
    public class User : BaseEntity
    {
        public User()
        {
            Bills = new HashSet<Bill>();
            AddressInfo = new Address();
        }

        public string Name { get; set; }
        public string Lastname { get; set; }
        public string Vat { get; set; }
        public string Password { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public bool FirstLogin { get; set; }
        public string VerificationToken { get; set; }

        public virtual Address AddressInfo { get; set; }

        public virtual ICollection<Bill> Bills { get; set; }
    }

}

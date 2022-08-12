namespace BlogApi.Models {
    public class BlogPost {
        public long Id { get; set; }
        public string? Name { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public string? Contents { get; set; }
    }
    
    public class BlogPostDTO {
        public long Id { get; set; }
        public DateTime Created { get; set; }
        public string? Name { get; set; }
    }
}
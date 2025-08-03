import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  icon: string;
  readTime: string;
  category: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Top 5 Common Antibiotics and Their Uses",
    excerpt: "Learn about the most frequently prescribed antibiotics, when they're used, and important safety considerations to keep in mind.",
    icon: "💊",
    readTime: "5 min read",
    category: "Antibiotics"
  },
  {
    id: "2", 
    title: "Why You Shouldn't Self-Medicate",
    excerpt: "Understanding the risks of self-medication and why professional medical guidance is essential for your health and safety.",
    icon: "⚠️",
    readTime: "4 min read",
    category: "Safety"
  },
  {
    id: "3",
    title: "Understanding Drug Interactions",
    excerpt: "How different medications can interact with each other and what you need to know to stay safe when taking multiple drugs.",
    icon: "🔄",
    readTime: "6 min read",
    category: "Drug Safety"
  },
  {
    id: "4",
    title: "Reading Medicine Labels: A Complete Guide",
    excerpt: "Essential information on how to properly read and understand medication labels, dosing instructions, and warning signs.",
    icon: "📋",
    readTime: "7 min read",
    category: "Education"
  }
];

const InfoBlogCards = () => {
  const handleReadMore = (postId: string) => {
    // In a real app, this would navigate to the full blog post
    console.log(`Reading blog post: ${postId}`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-medical-dark mb-4 flex items-center justify-center gap-2">
          📚 Health Education Hub
        </h2>
        <p className="text-medical-dark/70 max-w-2xl mx-auto">
          Stay informed with our curated collection of articles about medication safety, 
          drug interactions, and healthcare best practices.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {BLOG_POSTS.map((post, index) => (
          <Card 
            key={post.id} 
            className={`border-medical-secondary shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="bg-gradient-to-r from-medical-light to-medical-accent">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{post.icon}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-medical-primary/20 text-medical-primary text-xs font-medium rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-medical-dark/60">{post.readTime}</span>
                    </div>
                    <CardTitle className="text-medical-dark text-lg leading-tight">
                      {post.title}
                    </CardTitle>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-medical-dark/80 text-sm leading-relaxed mb-4">
                {post.excerpt}
              </p>
              <Button 
                onClick={() => handleReadMore(post.id)}
                variant="outline"
                className="w-full border-medical-primary text-medical-primary hover:bg-medical-primary hover:text-white transition-all duration-200"
              >
                Read Full Article →
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Card className="border-medical-accent bg-gradient-to-r from-medical-light to-medical-accent/30">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-medical-dark mb-2 flex items-center justify-center gap-2">
              💡 Want More Health Tips?
            </h3>
            <p className="text-medical-dark/70 mb-4">
              Subscribe to our newsletter for weekly updates on medication safety and health education.
            </p>
            <Button className="bg-medical-primary hover:bg-medical-secondary text-white font-medium">
              Subscribe Now 📧
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InfoBlogCards;
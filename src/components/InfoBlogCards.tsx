import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  icon: string;
  readTime: string;
  category: string;
  gradient: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Top 5 Common Antibiotics and Their Uses",
    excerpt: "Learn about the most frequently prescribed antibiotics, when they're used, and important safety considerations to keep in mind.",
    icon: "💊",
    readTime: "5 min read",
    category: "Antibiotics",
    gradient: "from-blue-500/10 to-cyan-500/10"
  },
  {
    id: "2", 
    title: "Why You Shouldn't Self-Medicate",
    excerpt: "Understanding the risks of self-medication and why professional medical guidance is essential for your health and safety.",
    icon: "⚠️",
    readTime: "4 min read",
    category: "Safety",
    gradient: "from-red-500/10 to-orange-500/10"
  },
  {
    id: "3",
    title: "Understanding Drug Interactions",
    excerpt: "How different medications can interact with each other and what you need to know to stay safe when taking multiple drugs.",
    icon: "🔄",
    readTime: "6 min read",
    category: "Drug Safety",
    gradient: "from-purple-500/10 to-pink-500/10"
  },
  {
    id: "4",
    title: "Reading Medicine Labels: A Complete Guide",
    excerpt: "Essential information on how to properly read and understand medication labels, dosing instructions, and warning signs.",
    icon: "📋",
    readTime: "7 min read",
    category: "Education",
    gradient: "from-green-500/10 to-emerald-500/10"
  }
];

const InfoBlogCards = () => {
  const handleReadMore = (postId: string) => {
    // In a real app, this would navigate to the full blog post
    console.log(`Reading blog post: ${postId}`);
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        {BLOG_POSTS.map((post, index) => (
          <Card 
            key={post.id} 
            className={`group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] animate-fade-in bg-gradient-to-br ${post.gradient} backdrop-blur-sm`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className={`bg-gradient-to-r ${post.gradient} border-b border-white/20`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                    <span className="text-3xl">{post.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-medical-dark dark:text-white text-sm font-semibold rounded-full border border-white/30">
                        {post.category}
                      </span>
                      <span className="text-sm text-medical-dark/70 dark:text-gray-300 font-medium">{post.readTime}</span>
                    </div>
                    <CardTitle className="text-medical-dark dark:text-white text-xl leading-tight group-hover:text-medical-primary transition-colors duration-300">
                      {post.title}
                    </CardTitle>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <p className="text-medical-dark/80 dark:text-gray-300 leading-relaxed mb-6 text-base">
                {post.excerpt}
              </p>
              <Button 
                onClick={() => handleReadMore(post.id)}
                className="w-full h-12 bg-gradient-to-r from-medical-primary to-blue-500 hover:from-medical-primary/90 hover:to-blue-500/90 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              >
                Read Full Article
                <span className="ml-2">→</span>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Card className="border-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm shadow-xl">
          <CardContent className="p-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl">
                <span className="text-3xl">💡</span>
              </div>
              <h3 className="text-2xl font-bold text-medical-dark dark:text-white">
                Want More Health Tips?
              </h3>
            </div>
            <p className="text-medical-dark/70 dark:text-gray-300 mb-6 text-lg max-w-2xl mx-auto">
              Subscribe to our newsletter for weekly updates on medication safety, health education, and the latest medical insights.
            </p>
            <Button className="h-12 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg">
              <span className="mr-2">📧</span>
              Subscribe to Newsletter
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InfoBlogCards;
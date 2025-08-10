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
  tags: string[];
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Top 5 Common Antibiotics and Their Uses",
    excerpt: "Learn about the most frequently prescribed antibiotics, when they're used, and important safety considerations to keep in mind.",
    icon: "💊",
    readTime: "5 min read",
    category: "Antibiotics",
    gradient: "from-blue-500/10 to-cyan-500/10",
    tags: ["Antibiotics", "Safety", "Prescription"]
  },
  {
    id: "2", 
    title: "Why You Shouldn't Self-Medicate",
    excerpt: "Understanding the risks of self-medication and why professional medical guidance is essential for your health and safety.",
    icon: "⚠️",
    readTime: "4 min read",
    category: "Safety",
    gradient: "from-red-500/10 to-orange-500/10",
    tags: ["Safety", "Prevention", "Healthcare"]
  },
  {
    id: "3",
    title: "Understanding Drug Interactions",
    excerpt: "How different medications can interact with each other and what you need to know to stay safe when taking multiple drugs.",
    icon: "🔄",
    readTime: "6 min read",
    category: "Drug Safety",
    gradient: "from-purple-500/10 to-pink-500/10",
    tags: ["Interactions", "Safety", "Multiple Medications"]
  },
  {
    id: "4",
    title: "Reading Medicine Labels: A Complete Guide",
    excerpt: "Essential information on how to properly read and understand medication labels, dosing instructions, and warning signs.",
    icon: "📋",
    readTime: "7 min read",
    category: "Education",
    gradient: "from-green-500/10 to-emerald-500/10",
    tags: ["Labels", "Dosage", "Instructions"]
  },
  {
    id: "5",
    title: "Managing Chronic Medication Schedules",
    excerpt: "Best practices for organizing and maintaining complex medication routines for chronic conditions like diabetes and hypertension.",
    icon: "📅",
    readTime: "8 min read",
    category: "Chronic Care",
    gradient: "from-indigo-500/10 to-blue-500/10",
    tags: ["Chronic Care", "Organization", "Scheduling"]
  },
  {
    id: "6",
    title: "Emergency Medicine Kit Essentials",
    excerpt: "What every household should have in their medicine cabinet for common emergencies and first aid situations.",
    icon: "🚑",
    readTime: "5 min read",
    category: "Emergency",
    gradient: "from-red-500/10 to-pink-500/10",
    tags: ["Emergency", "First Aid", "Preparation"]
  },
  {
    id: "7",
    title: "Medication Storage and Expiration",
    excerpt: "Proper storage techniques to maintain medication effectiveness and understanding when medicines expire and become unsafe.",
    icon: "🏠",
    readTime: "6 min read",
    category: "Storage",
    gradient: "from-yellow-500/10 to-orange-500/10",
    tags: ["Storage", "Expiration", "Safety"]
  },
  {
    id: "8",
    title: "Children's Medication Safety Guide",
    excerpt: "Special considerations for administering medications to children, including dosage calculations and safety precautions.",
    icon: "👶",
    readTime: "9 min read",
    category: "Pediatric",
    gradient: "from-pink-500/10 to-rose-500/10",
    tags: ["Children", "Pediatric", "Dosage"]
  },
  {
    id: "9",
    title: "Herbal Supplements vs Prescription Drugs",
    excerpt: "Understanding the differences, potential interactions, and safety considerations when combining herbal supplements with medications.",
    icon: "🌿",
    readTime: "7 min read",
    category: "Supplements",
    gradient: "from-green-500/10 to-teal-500/10",
    tags: ["Herbal", "Supplements", "Natural Medicine"]
  },
  {
    id: "10",
    title: "Traveling with Medications",
    excerpt: "Essential tips for safely traveling with prescription medications, including international travel considerations and documentation.",
    icon: "✈️",
    readTime: "6 min read",
    category: "Travel",
    gradient: "from-sky-500/10 to-blue-500/10",
    tags: ["Travel", "International", "Documentation"]
  },
  {
    id: "11",
    title: "Senior Medication Management",
    excerpt: "Special considerations for elderly patients including polypharmacy risks, cognitive factors, and caregiver involvement.",
    icon: "👴",
    readTime: "8 min read",
    category: "Senior Care",
    gradient: "from-violet-500/10 to-purple-500/10",
    tags: ["Seniors", "Elderly", "Polypharmacy"]
  },
  {
    id: "12",
    title: "Mental Health Medications: What to Know",
    excerpt: "Understanding psychiatric medications, their effects, side effects, and the importance of consistent treatment adherence.",
    icon: "🧠",
    readTime: "10 min read",
    category: "Mental Health",
    gradient: "from-teal-500/10 to-cyan-500/10",
    tags: ["Mental Health", "Psychiatry", "Adherence"]
  }
];

const InfoBlogCards = () => {
  const handleReadMore = (postId: string) => {
    // In a real app, this would navigate to the full blog post
    console.log(`Reading blog post: ${postId}`);
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {BLOG_POSTS.map((post, index) => (
          <Card 
            key={post.id} 
            className={`group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] animate-fade-in bg-gradient-to-br ${post.gradient} backdrop-blur-sm`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className={`bg-gradient-to-r ${post.gradient} border-b border-white/20 pb-4`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                    <span className="text-2xl">{post.icon}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-medical-dark dark:text-white text-xs font-semibold rounded-full border border-white/30">
                        {post.category}
                      </span>
                      <span className="text-xs text-medical-dark/70 dark:text-gray-300 font-medium">{post.readTime}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-2 py-0.5 bg-white/10 text-xs text-medical-dark/80 dark:text-gray-200 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <CardTitle className="text-medical-dark dark:text-white text-lg leading-tight group-hover:text-medical-primary transition-colors duration-300">
                {post.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-medical-dark/80 dark:text-gray-300 leading-relaxed mb-6 text-sm">
                {post.excerpt}
              </p>
              <Button 
                onClick={() => handleReadMore(post.id)}
                className="w-full h-10 bg-gradient-to-r from-medical-primary to-blue-500 hover:from-medical-primary/90 hover:to-blue-500/90 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl text-sm"
              >
                Read Article
                <span className="ml-2">→</span>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InfoBlogCards;
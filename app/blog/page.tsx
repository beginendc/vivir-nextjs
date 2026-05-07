import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/supabase';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

export const metadata: Metadata = {
  title: 'Vivir Travel Blog | Luxury Travel Inspiration',
  description: 'Discover curated luxury travel experiences and insights for your next escape in Mexico.',
};

export default async function BlogPage() {
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching blog posts:', error);
  }

  const categories = ['All', 'Destinations', 'Honeymoons', 'Experiences', 'Planning Tips'];

  return (
    <div className="min-h-screen bg-brand-dark pt-32 pb-24">
      <div className="container mx-auto px-6">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-playfair mb-6 italic">
            Travel as a <span className="gold-gradient">Way of Living</span>
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto text-lg font-sans">
            Curated stories, expert guides, and luxury travel inspiration from across Mexico.
          </p>
        </header>

        {/* Categories Filter (Visual only for now) */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              className="px-6 py-2 rounded-full border border-white/10 text-white/60 hover:border-brand-gold hover:text-brand-gold transition-all text-sm uppercase tracking-widest"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts?.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
          {!posts || posts.length === 0 && (
            <div className="col-span-full text-center py-24 border border-dashed border-white/10 rounded-2xl">
              <p className="text-white/40 italic">New stories coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  // Simple read time calculation: ~200 words per minute
  const wordCount = post.content?.split(/\s+/).length || 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden mb-6 rounded-sm">
        {post.cover_image ? (
          <Image
            src={post.cover_image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-white/5 flex items-center justify-center italic text-white/20">
            Vivir Travel
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="bg-brand-dark/80 backdrop-blur-md text-brand-gold px-3 py-1 text-[10px] uppercase tracking-[0.2em] border border-brand-gold/20">
            {post.category}
          </span>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center space-x-4 text-[10px] uppercase tracking-[0.2em] text-white/40 font-sans">
          <span>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          <span className="w-1 h-1 bg-brand-gold rounded-full" />
          <span>{readTime} MIN READ</span>
        </div>
        <h2 className="text-2xl font-playfair group-hover:text-brand-gold transition-colors leading-snug">
          {post.title}
        </h2>
        <p className="text-white/60 line-clamp-2 text-sm leading-relaxed font-sans">
          {post.excerpt}
        </p>
      </div>
    </Link>
  );
}

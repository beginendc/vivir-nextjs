import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/supabase';
import { ChevronLeft } from 'lucide-react';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data: post } = await supabase
    .from('blog_posts')
    .select('title, excerpt')
    .eq('slug', params.slug)
    .single();

  if (!post) {
    return {
      title: 'Post Not Found | Vivir Travel',
    };
  }

  return {
    title: `${post.title} | Vivir Travel Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { data: post, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (error || !post) {
    notFound();
  }

  const wordCount = post.content?.split(/\s+/).length || 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <article className="min-h-screen bg-brand-dark pb-24">
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full">
        {post.cover_image ? (
          <Image
            src={post.cover_image}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-brand-dark flex items-center justify-center">
            <span className="text-brand-gold font-playfair text-4xl italic opacity-20">Vivir Travel</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto">
            <Link 
              href="/blog" 
              className="inline-flex items-center space-x-2 text-brand-gold hover:text-white transition-colors mb-8 text-sm uppercase tracking-widest"
            >
              <ChevronLeft size={16} />
              <span>Back to Blog</span>
            </Link>
            
            <div className="max-w-4xl">
              <span className="inline-block bg-brand-gold text-brand-dark px-4 py-1 text-xs uppercase tracking-[0.2em] font-bold mb-6">
                {post.category}
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair text-white mb-8 italic leading-tight">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm uppercase tracking-[0.15em] text-white/60 font-sans">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center">
                    <span className="text-brand-dark font-bold text-xs">V</span>
                  </div>
                  <span>Vivir Travel Team</span>
                </div>
                <span className="w-1.5 h-1.5 bg-brand-gold/40 rounded-full" />
                <span>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span className="w-1.5 h-1.5 bg-brand-gold/40 rounded-full" />
                <span>{readTime} MIN READ</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 mt-16">
        <div className="max-w-3xl mx-auto">
          <div 
            className="prose prose-invert prose-brand lg:prose-xl max-w-none
              prose-headings:font-playfair prose-headings:italic prose-headings:text-brand-gold
              prose-p:font-sans prose-p:text-white/80 prose-p:leading-relaxed
              prose-a:text-brand-gold prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white prose-blockquote:border-brand-gold prose-blockquote:italic
              prose-img:rounded-sm"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />
          
          <hr className="my-16 border-white/10" />
          
          <div className="bg-brand-dark border border-brand-gold/20 p-8 md:p-12 text-center rounded-sm">
            <h3 className="text-3xl font-playfair italic mb-6">Ready to Experience This?</h3>
            <p className="text-white/70 mb-8 max-w-lg mx-auto">
              Our travel specialists are ready to curate a bespoke journey tailored exactly to your preferences.
            </p>
            <Link 
              href="/plan-my-trip" 
              className="inline-block px-10 py-4 bg-brand-gold text-brand-dark uppercase tracking-widest font-bold hover:bg-white transition-all"
            >
              Start Planning Your Trip
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

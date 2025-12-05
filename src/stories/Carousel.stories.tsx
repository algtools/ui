import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star, Heart, Play, Calendar, MapPin, Quote } from 'lucide-react';

const meta = {
  title: 'Layout/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A carousel with motion and swipe built using Embla. Perfect for displaying a collection of items in a scrollable, navigable format.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Carousel orientation',
    },
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: (args) => (
    <div className="w-full max-w-xs mx-auto">
      <Carousel {...args}>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A basic horizontal carousel with navigation arrows, displaying a series of numbered cards.',
      },
    },
  },
};

export const MultipleItems: Story = {
  render: () => (
    <div className="w-full max-w-4xl mx-auto">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent>
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-2xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A carousel displaying multiple items per view with responsive breakpoints, showing 2 items on medium screens and 3 on large screens.',
      },
    },
  },
};

export const ProductCarousel: Story = {
  render: () => {
    const products = [
      { name: 'Wireless Headphones', price: '$129.99', rating: 4.5, image: '🎧' },
      { name: 'Smart Watch', price: '$299.99', rating: 4.8, image: '⌚' },
      { name: 'Laptop Stand', price: '$49.99', rating: 4.2, image: '💻' },
      { name: 'USB-C Cable', price: '$19.99', rating: 4.6, image: '🔌' },
      { name: 'Desk Lamp', price: '$89.99', rating: 4.4, image: '💡' },
    ];

    return (
      <div className="w-full max-w-4xl mx-auto">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
        >
          <CarouselContent>
            {products.map((product, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="p-0">
                      <div className="aspect-square bg-muted rounded-t-lg flex items-center justify-center text-6xl">
                        {product.image}
                      </div>
                    </CardContent>
                    <CardHeader>
                      <CardTitle className="text-base">{product.name}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`size-3 ${
                                  i < Math.floor(product.rating)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-muted-foreground'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs">{product.rating}</span>
                        </div>
                        <div className="text-lg font-semibold text-foreground mt-2">
                          {product.price}
                        </div>
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'An e-commerce product carousel showcasing products with images, ratings, and pricing in a scrollable layout.',
      },
    },
  },
};

export const TestimonialCarousel: Story = {
  render: () => {
    const testimonials = [
      {
        quote: 'This product has completely transformed our workflow. Highly recommended!',
        author: 'Sarah Johnson',
        role: 'Product Manager',
        company: 'TechCorp',
        avatar: 'SJ',
      },
      {
        quote: 'Outstanding customer service and an incredible user experience.',
        author: 'Mike Chen',
        role: 'CTO',
        company: 'StartupXYZ',
        avatar: 'MC',
      },
      {
        quote: "The best investment we've made for our team this year.",
        author: 'Emily Rodriguez',
        role: 'CEO',
        company: 'InnovateLab',
        avatar: 'ER',
      },
    ];

    return (
      <div className="w-full max-w-3xl mx-auto">
        <Carousel>
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Quote className="size-8 text-muted-foreground mx-auto mb-4" />
                      <blockquote className="text-lg italic mb-6">
                        &quot;{testimonial.quote}&quot;
                      </blockquote>
                      <div className="flex items-center justify-center gap-3">
                        <Avatar>
                          <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="text-left">
                          <div className="font-semibold">{testimonial.author}</div>
                          <div className="text-sm text-muted-foreground">
                            {testimonial.role} at {testimonial.company}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A testimonial carousel displaying customer reviews with quotes, author information, and avatars.',
      },
    },
  },
};

export const ImageGallery: Story = {
  render: () => {
    const images = [
      { title: 'Mountain Sunset', description: 'Beautiful sunset over the mountains' },
      { title: 'Ocean View', description: 'Peaceful ocean waves at dawn' },
      { title: 'Forest Path', description: 'Winding path through ancient trees' },
      { title: 'City Lights', description: 'Urban skyline at night' },
      { title: 'Desert Landscape', description: 'Vast sand dunes under clear sky' },
    ];

    return (
      <div className="w-full max-w-2xl mx-auto">
        <Carousel>
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="p-0">
                      <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-lg flex items-center justify-center relative">
                        <Play className="size-16 text-white opacity-80" />
                        <div className="absolute top-2 right-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="bg-black/20 hover:bg-black/40 text-white"
                          >
                            <Heart className="size-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                    <CardHeader>
                      <CardTitle>{image.title}</CardTitle>
                      <CardDescription>{image.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'An image gallery carousel with media previews, titles, descriptions, and interactive elements like favorite buttons.',
      },
    },
  },
};

export const EventCarousel: Story = {
  render: () => {
    const events = [
      {
        title: 'Design Conference 2024',
        date: 'Mar 15, 2024',
        location: 'San Francisco, CA',
        price: '$299',
        category: 'Conference',
      },
      {
        title: 'Web Dev Workshop',
        date: 'Mar 22, 2024',
        location: 'Online',
        price: 'Free',
        category: 'Workshop',
      },
      {
        title: 'UX Research Summit',
        date: 'Apr 5, 2024',
        location: 'New York, NY',
        price: '$199',
        category: 'Summit',
      },
    ];

    return (
      <div className="w-full max-w-4xl mx-auto">
        <Carousel
          opts={{
            align: 'start',
          }}
        >
          <CarouselContent>
            {events.map((event, index) => (
              <CarouselItem key={index} className="md:basis-1/2">
                <div className="p-1">
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{event.title}</CardTitle>
                          <CardDescription className="mt-2 space-y-1">
                            <div className="flex items-center gap-2">
                              <Calendar className="size-4" />
                              {event.date}
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="size-4" />
                              {event.location}
                            </div>
                          </CardDescription>
                        </div>
                        <Badge variant="secondary">{event.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">{event.price}</span>
                        <Button>Register</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'An event carousel displaying upcoming events with date, location, pricing, and registration buttons.',
      },
    },
  },
};

export const VerticalCarousel: Story = {
  render: () => (
    <div className="w-full max-w-xs mx-auto">
      <Carousel
        orientation="vertical"
        opts={{
          align: 'start',
        }}
        className="w-full max-w-xs"
      >
        <CarouselContent className="-mt-1 h-[400px]">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="pt-1 md:basis-1/2">
              <div className="p-1">
                <Card>
                  <CardContent className="flex items-center justify-center p-6">
                    <span className="text-3xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A vertical carousel that scrolls up and down, useful for mobile interfaces or vertical content layouts.',
      },
    },
  },
};

export const WithDotIndicators: Story = {
  render: () => {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!api) return;

      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);

      api.on('select', () => {
        setCurrent(api.selectedScrollSnap() + 1);
      });
    }, [api]);

    return (
      <div className="w-full max-w-xs mx-auto">
        <Carousel setApi={setApi}>
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-4xl font-semibold">{index + 1}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="flex justify-center mt-4 gap-1">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={`size-2 rounded-full transition-colors ${
                current === index + 1 ? 'bg-primary' : 'bg-muted'
              }`}
              onClick={() => api?.scrollTo(index)}
            />
          ))}
        </div>
        <div className="py-2 text-center text-sm text-muted-foreground">
          Slide {current} of {count}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A carousel with dot indicators showing the current slide position and allowing direct navigation to any slide.',
      },
    },
  },
};

export const AutoplayCarousel: Story = {
  render: () => {
    const [api, setApi] = useState<CarouselApi>();

    useEffect(() => {
      if (!api) return;

      const interval = setInterval(() => {
        if (api.canScrollNext()) {
          api.scrollNext();
        } else {
          api.scrollTo(0);
        }
      }, 3000);

      return () => clearInterval(interval);
    }, [api]);

    const features = [
      { icon: '🚀', title: 'Fast Performance', description: 'Lightning fast load times' },
      { icon: '🔒', title: 'Secure', description: 'Enterprise-grade security' },
      { icon: '📱', title: 'Responsive', description: 'Works on all devices' },
      { icon: '🎨', title: 'Customizable', description: 'Fully customizable design' },
    ];

    return (
      <div className="w-full max-w-md mx-auto">
        <Carousel setApi={setApi} opts={{ loop: true }}>
          <CarouselContent>
            {features.map((feature, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                      <div className="text-4xl mb-4">{feature.icon}</div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="text-center mt-4 text-sm text-muted-foreground">
          Auto-playing carousel (3s intervals)
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'An auto-playing carousel that automatically advances slides every 3 seconds, useful for feature showcases.',
      },
    },
  },
};

export const ResponsiveCarousel: Story = {
  render: () => (
    <div className="w-full max-w-6xl mx-auto">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent>
          {Array.from({ length: 12 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-2xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="text-center mt-4 text-sm text-muted-foreground">
        Responsive: 1 → 2 → 3 → 4 → 5 items per view
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A fully responsive carousel that adapts the number of visible items based on screen size, from 1 item on mobile to 5 on extra-large screens.',
      },
    },
  },
};

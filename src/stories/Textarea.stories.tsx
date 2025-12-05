import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  MessageSquare,
  Mail,
  Star,
  AlertCircle,
  CheckCircle,
  Send,
  Save,
  Edit,
  Eye,
  Clock,
  ThumbsUp,
  ThumbsDown,
  Flag,
  MoreHorizontal,
  Calendar,
  Paperclip,
  Smile,
  Bold,
  Italic,
  Underline,
  List,
  Quote,
  ImageIcon,
} from 'lucide-react';

const meta = {
  title: 'Forms/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A multi-line text input field for entering longer text content.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the textarea is disabled',
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the textarea is read-only',
    },
    rows: {
      control: { type: 'number', min: 1, max: 20 },
      description: 'Number of visible text lines',
    },
    maxLength: {
      control: { type: 'number', min: 0, max: 1000 },
      description: 'Maximum character limit',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: 'Type your message here...',
  },
  render: (args) => (
    <div className="space-y-2 w-[400px]">
      <Label htmlFor="message">Message</Label>
      <Textarea id="message" {...args} />
      <p className="text-sm text-muted-foreground">Enter your message above</p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default textarea component with a label and helper text, suitable for multi-line text input in forms.',
      },
    },
  },
};

export const WithRows: Story = {
  args: {},
  render: () => (
    <div className="space-y-6 w-[400px]">
      <div className="space-y-2">
        <Label htmlFor="small">Small (3 rows)</Label>
        <Textarea id="small" rows={3} placeholder="Small textarea..." />
      </div>
      <div className="space-y-2">
        <Label htmlFor="medium">Medium (5 rows)</Label>
        <Textarea id="medium" rows={5} placeholder="Medium textarea..." />
      </div>
      <div className="space-y-2">
        <Label htmlFor="large">Large (8 rows)</Label>
        <Textarea id="large" rows={8} placeholder="Large textarea..." />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Textarea components with different row sizes (small 3 rows, medium 5 rows, large 8 rows), demonstrating how to control the initial visible height.',
      },
    },
  },
};

export const WithCharacterCount: Story = {
  args: {},
  render: () => {
    const [value, setValue] = useState('');
    const maxLength = 280;

    return (
      <div className="space-y-2 w-[400px]">
        <Label htmlFor="tweet">Tweet</Label>
        <Textarea
          id="tweet"
          placeholder="What's happening?"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={maxLength}
          rows={4}
        />
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Share your thoughts...</span>
          <span
            className={`${value.length > maxLength * 0.9 ? 'text-red-500' : 'text-muted-foreground'}`}
          >
            {value.length}/{maxLength}
          </span>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Textarea with character count display and maxLength constraint, showing a warning color when approaching the limit (like Twitter character limits).',
      },
    },
  },
};

export const ValidationStates: Story = {
  args: {},
  render: () => (
    <div className="space-y-6 w-[400px]">
      <div className="space-y-2">
        <Label htmlFor="normal">Normal State</Label>
        <Textarea id="normal" placeholder="Enter your message..." />
        <p className="text-sm text-muted-foreground">This is a normal textarea</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="error">Error State</Label>
        <Textarea
          id="error"
          placeholder="Enter your message..."
          aria-invalid="true"
          className="border-destructive"
        />
        <p className="text-sm text-destructive flex items-center">
          <AlertCircle className="mr-1 h-3 w-3" />
          This field is required
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="success">Success State</Label>
        <Textarea
          id="success"
          placeholder="Enter your message..."
          defaultValue="This is a valid message that meets all requirements."
          className="border-green-500"
        />
        <p className="text-sm text-green-600 flex items-center">
          <CheckCircle className="mr-1 h-3 w-3" />
          Message is valid
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="disabled">Disabled State</Label>
        <Textarea
          id="disabled"
          placeholder="This is disabled..."
          disabled
          defaultValue="This textarea is disabled and cannot be edited."
        />
        <p className="text-sm text-muted-foreground">This field is disabled</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="readonly">Read-only State</Label>
        <Textarea
          id="readonly"
          readOnly
          defaultValue="This textarea is read-only. You can select and copy the text but cannot edit it."
        />
        <p className="text-sm text-muted-foreground">This field is read-only</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Textarea validation states: normal, error (with destructive styling), success (with green border), disabled, and read-only, demonstrating different form field states.',
      },
    },
  },
};

export const ContactForm: Story = {
  args: {},
  render: () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      subject: '',
      message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      console.log('Form submitted:', formData);
    };

    return (
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Contact Us
          </CardTitle>
          <CardDescription>Send us a message and we&apos;ll get back to you soon</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact-name">Name *</Label>
                <input
                  id="contact-name"
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Email *</Label>
                <input
                  id="contact-email"
                  type="email"
                  className="w-full p-2 border rounded"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-subject">Subject *</Label>
              <input
                id="contact-subject"
                type="text"
                className="w-full p-2 border rounded"
                placeholder="What is this about?"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-message">Message *</Label>
              <Textarea
                id="contact-message"
                placeholder="Tell us more about your inquiry..."
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
              <p className="text-sm text-muted-foreground">
                Please provide as much detail as possible
              </p>
            </div>
            <Button type="submit" className="w-full">
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Contact form with textarea for message input, demonstrating a complete form with name, email, subject, and message fields in a card layout.',
      },
    },
  },
};

export const ReviewForm: Story = {
  args: {},
  render: () => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');

    return (
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Write a Review
          </CardTitle>
          <CardDescription>Share your experience with other customers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Rating</Label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-6 w-6 cursor-pointer ${
                    star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                {rating > 0 ? `${rating} star${rating > 1 ? 's' : ''}` : 'Select rating'}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="review-text">Your Review</Label>
            <Textarea
              id="review-text"
              placeholder="Share your thoughts about this product..."
              rows={5}
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Help others by sharing your experience</span>
              <span className="text-muted-foreground">{review.length} characters</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Recommend to others?</Label>
            <div className="flex space-x-4">
              <Button variant="outline" className="flex-1">
                <ThumbsUp className="mr-2 h-4 w-4" />
                Yes
              </Button>
              <Button variant="outline" className="flex-1">
                <ThumbsDown className="mr-2 h-4 w-4" />
                No
              </Button>
            </div>
          </div>

          <Button className="w-full" disabled={rating === 0 || review.length < 10}>
            Submit Review
          </Button>
        </CardContent>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Product review form with star rating, textarea for review text with character count, recommendation buttons, and validation (minimum 10 characters).',
      },
    },
  },
};

export const BlogEditor: Story = {
  args: {},
  render: () => {
    const [post, setPost] = useState({
      title: '',
      content: '',
      tags: '',
      excerpt: '',
    });

    const [wordCount, setWordCount] = useState(0);

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const content = e.target.value;
      setPost({ ...post, content });
      setWordCount(
        content
          .trim()
          .split(/\s+/)
          .filter((word) => word.length > 0).length
      );
    };

    return (
      <Card className="w-[700px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5" />
            Create Blog Post
          </CardTitle>
          <CardDescription>Write and publish your blog post</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="post-title">Title</Label>
            <input
              id="post-title"
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Enter your blog post title..."
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="post-excerpt">Excerpt</Label>
            <Textarea
              id="post-excerpt"
              placeholder="Write a brief description of your post..."
              rows={2}
              value={post.excerpt}
              onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
            />
            <p className="text-sm text-muted-foreground">
              A short summary that will appear in post previews
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="post-content">Content</Label>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>{wordCount} words</span>
                <span>{post.content.length} characters</span>
              </div>
            </div>
            <div className="border rounded-md">
              <div className="flex items-center space-x-2 p-2 border-b bg-muted/30">
                <Button variant="ghost" size="sm">
                  <Bold className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Italic className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Underline className="h-4 w-4" />
                </Button>
                <div className="w-px h-4 bg-border" />
                <Button variant="ghost" size="sm">
                  <List className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Quote className="h-4 w-4" />
                </Button>
                <div className="w-px h-4 bg-border" />
                <Button variant="ghost" size="sm">
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Paperclip className="h-4 w-4" />
                </Button>
              </div>
              <Textarea
                id="post-content"
                placeholder="Start writing your blog post..."
                rows={10}
                value={post.content}
                onChange={handleContentChange}
                className="border-0 focus-visible:ring-0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="post-tags">Tags</Label>
            <Textarea
              id="post-tags"
              placeholder="Enter tags separated by commas (e.g., react, javascript, tutorial)"
              rows={1}
              value={post.tags}
              onChange={(e) => setPost({ ...post, tags: e.target.value })}
            />
          </div>

          <div className="flex justify-between">
            <div className="flex space-x-2">
              <Button variant="outline">
                <Save className="mr-2 h-4 w-4" />
                Save Draft
              </Button>
              <Button variant="outline">
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
            </div>
            <Button>
              <Send className="mr-2 h-4 w-4" />
              Publish
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Blog post editor with title, excerpt, main content textarea (with formatting toolbar and word/character count), and tags field, demonstrating a rich text editing interface.',
      },
    },
  },
};

export const SupportTicket: Story = {
  args: {},
  render: () => {
    const [ticket, setTicket] = useState({
      priority: 'medium',
      category: 'technical',
      description: '',
    });

    return (
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Create Support Ticket
          </CardTitle>
          <CardDescription>Describe your issue and we&apos;ll help you resolve it</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority Level</Label>
              <select
                id="priority"
                className="w-full p-2 border rounded"
                value={ticket.priority}
                onChange={(e) => setTicket({ ...ticket, priority: e.target.value })}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                className="w-full p-2 border rounded"
                value={ticket.category}
                onChange={(e) => setTicket({ ...ticket, category: e.target.value })}
              >
                <option value="technical">Technical Issue</option>
                <option value="billing">Billing Question</option>
                <option value="account">Account Access</option>
                <option value="feature">Feature Request</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ticket-description">Description</Label>
            <Textarea
              id="ticket-description"
              placeholder="Please describe your issue in detail. Include any error messages, steps to reproduce, and what you expected to happen..."
              rows={8}
              value={ticket.description}
              onChange={(e) => setTicket({ ...ticket, description: e.target.value })}
            />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                The more details you provide, the faster we can help
              </span>
              <span className="text-muted-foreground">{ticket.description.length} characters</span>
            </div>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              For urgent issues, please call our support line at 1-800-SUPPORT
            </AlertDescription>
          </Alert>

          <div className="flex space-x-2">
            <Button className="flex-1">
              <Send className="mr-2 h-4 w-4" />
              Submit Ticket
            </Button>
            <Button variant="outline">
              <Paperclip className="mr-2 h-4 w-4" />
              Attach File
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Support ticket form with priority and category selects, detailed description textarea with character count, alert message, and file attachment option.',
      },
    },
  },
};

export const CommentSystem: Story = {
  args: {},
  render: () => {
    const [newComment, setNewComment] = useState('');
    const [comments] = useState([
      {
        id: 1,
        author: 'Alice Johnson',
        content: 'This is really helpful! Thanks for sharing.',
        timestamp: '2 hours ago',
        likes: 5,
      },
      {
        id: 2,
        author: 'Bob Smith',
        content: 'I had a similar issue last week. The solution in step 3 really worked for me.',
        timestamp: '4 hours ago',
        likes: 2,
      },
      {
        id: 3,
        author: 'Carol Davis',
        content: 'Could you elaborate more on the database configuration part?',
        timestamp: '1 day ago',
        likes: 1,
      },
    ]);

    return (
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Comments ({comments.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Existing Comments */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="border-l-2 border-muted pl-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{comment.author}</span>
                    <Badge variant="outline" className="text-xs">
                      <Clock className="mr-1 h-3 w-3" />
                      {comment.timestamp}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <ThumbsUp className="h-3 w-3" />
                      {comment.likes}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Flag className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm">{comment.content}</p>
              </div>
            ))}
          </div>

          {/* Add New Comment */}
          <div className="space-y-4 pt-4 border-t">
            <h4 className="font-medium">Add a comment</h4>
            <div className="space-y-2">
              <Textarea
                placeholder="Share your thoughts..."
                rows={3}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Cancel
                  </Button>
                  <Button size="sm" disabled={newComment.trim().length === 0}>
                    <Send className="mr-1 h-3 w-3" />
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Comment system with existing comments display and a textarea for adding new comments, featuring emoji, attachment, and image buttons, with validation (non-empty required).',
      },
    },
  },
};

export const EventDescription: Story = {
  args: {},
  render: () => {
    const [eventData, setEventData] = useState({
      title: '',
      date: '',
      location: '',
      description: '',
    });

    return (
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Create Event
          </CardTitle>
          <CardDescription>Plan and organize your event</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="event-title">Event Title</Label>
              <input
                id="event-title"
                type="text"
                className="w-full p-2 border rounded"
                placeholder="What's the name of your event?"
                value={eventData.title}
                onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-date">Date & Time</Label>
              <input
                id="event-date"
                type="datetime-local"
                className="w-full p-2 border rounded"
                value={eventData.date}
                onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="event-location">Location</Label>
            <input
              id="event-location"
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Where will this event take place?"
              value={eventData.location}
              onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="event-description">Event Description</Label>
            <Textarea
              id="event-description"
              placeholder="Describe your event... What should attendees expect? What should they bring? Any special instructions?"
              rows={6}
              value={eventData.description}
              onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
            />
            <p className="text-sm text-muted-foreground">
              Provide a detailed description to help attendees understand what to expect
            </p>
          </div>

          <div className="flex space-x-2">
            <Button className="flex-1">
              <Calendar className="mr-2 h-4 w-4" />
              Create Event
            </Button>
            <Button variant="outline">
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Event creation form with title, date/time, location, and description textarea, demonstrating event planning and organization interfaces.',
      },
    },
  },
};

export const AutoResizing: Story = {
  args: {},
  render: () => {
    const [value, setValue] = useState('');

    return (
      <div className="space-y-4 w-[400px]">
        <div className="space-y-2">
          <Label htmlFor="auto-resize">Auto-resizing Textarea</Label>
          <Textarea
            id="auto-resize"
            placeholder="Start typing and watch this textarea grow..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="resize-none overflow-hidden"
            style={{ height: 'auto', minHeight: '80px' }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = target.scrollHeight + 'px';
            }}
          />
          <p className="text-sm text-muted-foreground">
            This textarea automatically adjusts its height based on content
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Auto-resizing textarea that dynamically adjusts its height as content is typed, providing a seamless editing experience without manual scrolling.',
      },
    },
  },
};

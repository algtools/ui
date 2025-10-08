import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React, { useState } from 'react';
import { WebPreview } from '@/components/ai/web-preview';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const meta = {
  title: 'AI Components/WebPreview',
  component: WebPreview,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'The URL to display in the preview',
    },
    html: {
      control: 'text',
      description: 'HTML content to display (alternative to src)',
    },
    title: {
      control: 'text',
      description: 'Title for accessibility and toolbar display',
    },
    loading: {
      control: 'boolean',
      description: 'Whether to show a loading state',
    },
    showToolbar: {
      control: 'boolean',
      description: 'Whether to show the toolbar with controls',
    },
    allowFullscreen: {
      control: 'boolean',
      description: 'Whether to allow fullscreen mode',
    },
    height: {
      control: 'text',
      description: 'Height of the preview (CSS value)',
    },
    width: {
      control: 'text',
      description: 'Width of the preview (CSS value)',
    },
  },
} satisfies Meta<typeof WebPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'https://ui.shadcn.com',
    title: 'shadcn/ui',
    showToolbar: true,
    allowFullscreen: true,
    height: '600px',
    width: '100%',
  },
};

export const WithHTMLContent: Story = {
  args: {
    html: `
      <div style="font-family: system-ui, sans-serif; padding: 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; min-height: 100vh; display: flex; align-items: center; justify-content: center;">
        <div style="text-align: center;">
          <h1 style="font-size: 3rem; margin-bottom: 1rem;">Welcome!</h1>
          <p style="font-size: 1.25rem; opacity: 0.9;">This is a preview of AI-generated HTML content</p>
          <button style="margin-top: 2rem; padding: 0.75rem 1.5rem; font-size: 1rem; background: white; color: #667eea; border: none; border-radius: 0.5rem; cursor: pointer; font-weight: 600;">
            Get Started
          </button>
        </div>
      </div>
    `,
    title: 'HTML Preview',
    showToolbar: true,
    allowFullscreen: true,
    height: '600px',
  },
};

export const LoadingState: Story = {
  args: {
    src: 'https://example.com',
    title: 'Loading Preview',
    loading: true,
    showToolbar: true,
    height: '600px',
  },
};

export const WithoutToolbar: Story = {
  args: {
    html: `
      <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #f3f4f6; font-family: system-ui;">
        <div style="background: white; padding: 3rem; border-radius: 1rem; box-shadow: 0 10px 30px rgba(0,0,0,0.1); text-align: center;">
          <h2 style="font-size: 2rem; margin-bottom: 0.5rem; color: #111827;">Clean Preview</h2>
          <p style="color: #6b7280;">No toolbar, just the content</p>
        </div>
      </div>
    `,
    title: 'No Toolbar Example',
    showToolbar: false,
    height: '500px',
  },
};

export const CustomDimensions: Story = {
  args: {
    html: `
      <div style="background: #fef3c7; padding: 2rem; font-family: system-ui;">
        <h1 style="color: #92400e;">Custom Size Preview</h1>
        <p style="color: #78350f; margin-top: 1rem;">This preview has custom width and height dimensions.</p>
        <div style="margin-top: 2rem; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
          <div style="background: white; padding: 1rem; border-radius: 0.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">Card 1</div>
          <div style="background: white; padding: 1rem; border-radius: 0.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">Card 2</div>
          <div style="background: white; padding: 1rem; border-radius: 0.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">Card 3</div>
        </div>
      </div>
    `,
    title: 'Custom Dimensions',
    width: '800px',
    height: '400px',
    showToolbar: true,
  },
};

export const AIGeneratedLandingPage: Story = {
  args: {
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AI Generated Landing Page</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; }
          .logo { font-size: 1.5rem; font-weight: bold; }
          .nav a { color: white; text-decoration: none; margin-left: 2rem; }
          .hero { padding: 6rem 2rem; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
          .hero h1 { font-size: 3.5rem; margin-bottom: 1rem; }
          .hero p { font-size: 1.5rem; opacity: 0.9; margin-bottom: 2rem; }
          .cta { background: white; color: #667eea; padding: 1rem 2.5rem; font-size: 1.25rem; border: none; border-radius: 0.5rem; cursor: pointer; font-weight: 600; }
          .features { padding: 4rem 2rem; max-width: 1200px; margin: 0 auto; }
          .features h2 { text-align: center; font-size: 2.5rem; margin-bottom: 3rem; }
          .feature-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
          .feature { text-align: center; padding: 2rem; }
          .feature-icon { width: 60px; height: 60px; background: #667eea; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; font-size: 1.5rem; }
          .feature h3 { margin-bottom: 0.5rem; }
          .feature p { color: #6b7280; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">AI Platform</div>
          <nav class="nav">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#about">About</a>
          </nav>
        </div>
        <div class="hero">
          <h1>Build Amazing Things with AI</h1>
          <p>The most powerful AI platform for developers</p>
          <button class="cta">Get Started Free</button>
        </div>
        <div class="features">
          <h2>Powerful Features</h2>
          <div class="feature-grid">
            <div class="feature">
              <div class="feature-icon">🚀</div>
              <h3>Fast Performance</h3>
              <p>Lightning-fast responses with optimized infrastructure</p>
            </div>
            <div class="feature">
              <div class="feature-icon">🔒</div>
              <h3>Secure & Private</h3>
              <p>Enterprise-grade security for your data</p>
            </div>
            <div class="feature">
              <div class="feature-icon">⚡</div>
              <h3>Easy Integration</h3>
              <p>Simple APIs that work with your stack</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
    title: 'AI Generated Landing Page',
    showToolbar: true,
    allowFullscreen: true,
    height: '700px',
  },
};

export const ResponsiveWebsite: Story = {
  args: {
    html: `
      <div style="font-family: system-ui, sans-serif; background: #f9fafb; min-height: 100vh; padding: 1rem;">
        <div style="max-width: 1200px; margin: 0 auto;">
          <header style="background: white; padding: 1.5rem; border-radius: 0.75rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 2rem;">
            <h1 style="font-size: 1.75rem; color: #111827; margin-bottom: 0.5rem;">Responsive Design</h1>
            <p style="color: #6b7280;">This layout adapts to different screen sizes</p>
          </header>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
            <div style="background: white; padding: 1.5rem; border-radius: 0.75rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              <div style="width: 100%; height: 150px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 0.5rem; margin-bottom: 1rem;"></div>
              <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem; color: #111827;">Feature Card 1</h3>
              <p style="color: #6b7280; line-height: 1.6;">This card automatically adjusts its width based on available space.</p>
            </div>
            <div style="background: white; padding: 1.5rem; border-radius: 0.75rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              <div style="width: 100%; height: 150px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 0.5rem; margin-bottom: 1rem;"></div>
              <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem; color: #111827;">Feature Card 2</h3>
              <p style="color: #6b7280; line-height: 1.6;">Responsive grid system ensures optimal viewing experience.</p>
            </div>
            <div style="background: white; padding: 1.5rem; border-radius: 0.75rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              <div style="width: 100%; height: 150px; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); border-radius: 0.5rem; margin-bottom: 1rem;"></div>
              <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem; color: #111827;">Feature Card 3</h3>
              <p style="color: #6b7280; line-height: 1.6;">Mobile-first design approach for modern web applications.</p>
            </div>
          </div>
        </div>
      </div>
    `,
    title: 'Responsive Website',
    showToolbar: true,
    height: '600px',
  },
};

export const InteractiveWithControls: Story = {
  render: () => {
    const [fullscreen, setFullscreen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleRefresh = () => {
      setLoading(true);
      setTimeout(() => setLoading(false), 2000);
    };

    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Interactive Preview Controls</CardTitle>
            <CardDescription>Control the preview state using the buttons below</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button onClick={() => setFullscreen(!fullscreen)} variant="outline">
                Toggle Fullscreen
              </Button>
              <Button onClick={handleRefresh} variant="outline">
                Simulate Refresh
              </Button>
            </div>
            <WebPreview
              html={`
                <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); font-family: system-ui; color: white; text-align: center;">
                  <div>
                    <h1 style="font-size: 3rem; margin-bottom: 1rem;">Interactive Preview</h1>
                    <p style="font-size: 1.25rem; opacity: 0.9;">Use the controls above to test different states</p>
                    <p style="margin-top: 2rem; font-size: 0.875rem; opacity: 0.7;">Fullscreen: ${fullscreen ? 'ON' : 'OFF'} | Loading: ${loading ? 'ON' : 'OFF'}</p>
                  </div>
                </div>
              `}
              title="Interactive Demo"
              fullscreen={fullscreen}
              loading={loading}
              onFullscreenChange={setFullscreen}
              showToolbar={true}
              allowFullscreen={true}
              height="500px"
            />
          </CardContent>
        </Card>
      </div>
    );
  },
};

export const MultiplePreviewsGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl">
      <WebPreview
        html={`<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: system-ui;"><div style="text-align: center;"><h1 style="font-size: 2rem;">Design 1</h1><p style="margin-top: 1rem; opacity: 0.9;">Purple Gradient</p></div></div>`}
        title="Design 1"
        height="400px"
        showToolbar={true}
        allowFullscreen={false}
      />
      <WebPreview
        html={`<div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: system-ui;"><div style="text-align: center;"><h1 style="font-size: 2rem;">Design 2</h1><p style="margin-top: 1rem; opacity: 0.9;">Pink Gradient</p></div></div>`}
        title="Design 2"
        height="400px"
        showToolbar={true}
        allowFullscreen={false}
      />
      <WebPreview
        html={`<div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: system-ui;"><div style="text-align: center;"><h1 style="font-size: 2rem;">Design 3</h1><p style="margin-top: 1rem; opacity: 0.9;">Blue Gradient</p></div></div>`}
        title="Design 3"
        height="400px"
        showToolbar={true}
        allowFullscreen={false}
      />
      <WebPreview
        html={`<div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: system-ui;"><div style="text-align: center;"><h1 style="font-size: 2rem;">Design 4</h1><p style="margin-top: 1rem; opacity: 0.9;">Green Gradient</p></div></div>`}
        title="Design 4"
        height="400px"
        showToolbar={true}
        allowFullscreen={false}
      />
    </div>
  ),
};

export const WithExternalURL: Story = {
  args: {
    src: 'https://react.dev',
    title: 'React Documentation',
    showToolbar: true,
    allowFullscreen: true,
    height: '700px',
  },
};

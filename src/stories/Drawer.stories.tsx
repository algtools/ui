/* eslint-disable @next/next/no-img-element */
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import {
  Menu,
  Settings,
  User,
  Bell,
  Search,
  Filter,
  ShoppingCart,
  Heart,
  Star,
  Download,
  Edit,
  X,
  Home,
  Grid,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Clock,
  FileText,
  Folder,
  HelpCircle,
  LogOut,
  ChevronRight,
} from 'lucide-react';

const meta = {
  title: 'Overlays/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A drawer component that slides in from the edge of the screen. Perfect for mobile interfaces and quick actions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'The direction from which the drawer slides in',
    },
    open: {
      control: 'boolean',
      description: 'Controls whether the drawer is open or closed',
    },
    onOpenChange: {
      action: 'onOpenChange',
      description: 'Callback fired when the drawer open state changes',
    },
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof Drawer>;

export const BottomDrawer: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Bottom Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Bottom Drawer</DrawerTitle>
          <DrawerDescription>
            This drawer slides up from the bottom of the screen. It&apos;s perfect for mobile
            interfaces and quick actions.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <p className="text-sm text-muted-foreground">Bottom drawers are commonly used for:</p>
          <ul className="mt-2 text-sm text-muted-foreground space-y-1">
            <li>• Action sheets and menus</li>
            <li>• Form inputs and settings</li>
            <li>• Quick access tools</li>
            <li>• Mobile navigation</li>
          </ul>
        </div>
        <DrawerFooter>
          <Button>Confirm</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A bottom drawer that slides up from the bottom of the screen, ideal for mobile interfaces, action sheets, and quick access tools.',
      },
    },
  },
};

export const LeftDrawer: Story = {
  render: () => (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant="outline">
          <Menu className="mr-2 h-4 w-4" />
          Open Left Drawer
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Navigation Menu</DrawerTitle>
          <DrawerDescription>Main navigation for your application</DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 p-4">
          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-3 p-2 rounded-md hover:bg-muted">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </a>
            <a href="#" className="flex items-center gap-3 p-2 rounded-md hover:bg-muted">
              <Grid className="h-4 w-4" />
              <span>Dashboard</span>
            </a>
            <a href="#" className="flex items-center gap-3 p-2 rounded-md hover:bg-muted">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </a>
            <a href="#" className="flex items-center gap-3 p-2 rounded-md hover:bg-muted">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </a>
            <Separator className="my-4" />
            <a href="#" className="flex items-center gap-3 p-2 rounded-md hover:bg-muted">
              <Calendar className="h-4 w-4" />
              <span>Calendar</span>
            </a>
            <a href="#" className="flex items-center gap-3 p-2 rounded-md hover:bg-muted">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
              <Badge variant="destructive" className="ml-auto">
                3
              </Badge>
            </a>
            <a href="#" className="flex items-center gap-3 p-2 rounded-md hover:bg-muted">
              <HelpCircle className="h-4 w-4" />
              <span>Help</span>
            </a>
          </nav>
        </div>
        <DrawerFooter>
          <Button variant="outline" className="justify-start">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A left drawer that slides in from the left side, commonly used for navigation menus and sidebars.',
      },
    },
  },
};

export const RightDrawer: Story = {
  render: () => (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline">
          <Settings className="mr-2 h-4 w-4" />
          Open Right Drawer
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Settings Panel</DrawerTitle>
          <DrawerDescription>Configure your preferences and account settings</DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 p-4 space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-3">Appearance</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode">Dark mode</Label>
                <Switch id="dark-mode" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="compact-view">Compact view</Label>
                <Switch id="compact-view" />
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-medium mb-3">Notifications</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications">Email notifications</Label>
                <Switch id="email-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="push-notifications">Push notifications</Label>
                <Switch id="push-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="sound-notifications">Sound notifications</Label>
                <Switch id="sound-notifications" />
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-medium mb-3">Privacy</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="analytics">Analytics</Label>
                <Switch id="analytics" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="location">Location services</Label>
                <Switch id="location" />
              </div>
            </div>
          </div>
        </div>
        <DrawerFooter>
          <Button>Save Changes</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A right drawer that slides in from the right side, ideal for settings panels, filters, and secondary content.',
      },
    },
  },
};

export const TopDrawer: Story = {
  render: () => (
    <Drawer direction="top">
      <DrawerTrigger asChild>
        <Button variant="outline">
          <Bell className="mr-2 h-4 w-4" />
          Open Top Drawer
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Notifications</DrawerTitle>
          <DrawerDescription>Stay updated with your latest notifications</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
          <div className="flex items-start gap-3 p-3 rounded-lg border">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium">John liked your post</p>
              <p className="text-xs text-muted-foreground">2 minutes ago</p>
            </div>
            <Badge variant="outline">New</Badge>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg border">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Mail className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">New message from Sarah</p>
              <p className="text-xs text-muted-foreground">10 minutes ago</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg border">
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
              <Calendar className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Meeting reminder</p>
              <p className="text-xs text-muted-foreground">Team standup in 30 minutes</p>
              <p className="text-xs text-muted-foreground">1 hour ago</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg border">
            <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
              <Download className="h-4 w-4 text-orange-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Download completed</p>
              <p className="text-xs text-muted-foreground">Project files are ready</p>
              <p className="text-xs text-muted-foreground">2 hours ago</p>
            </div>
          </div>
        </div>
        <DrawerFooter>
          <Button variant="outline">Mark All as Read</Button>
          <DrawerClose asChild>
            <Button>Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A top drawer that slides down from the top of the screen, useful for notifications, alerts, and quick messages.',
      },
    },
  },
};

export const ShoppingCartDrawer: Story = {
  render: () => {
    const [cartItems] = useState([
      {
        id: 1,
        name: 'Wireless Headphones',
        price: 99.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
      },
      {
        id: 2,
        name: 'Smart Watch',
        price: 299.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
      },
      {
        id: 3,
        name: 'Laptop Stand',
        price: 49.99,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop',
      },
    ]);

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <Button>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Cart ({cartItems.length})
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Shopping Cart</DrawerTitle>
            <DrawerDescription>{cartItems.length} items in your cart</DrawerDescription>
          </DrawerHeader>
          <div className="flex-1 p-4">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{item.name}</h4>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{`$${total.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>$9.99</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>${(total * 0.1).toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${(total + 9.99 + total * 0.1).toFixed(2)}</span>
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button className="w-full">Checkout</Button>
            <DrawerClose asChild>
              <Button variant="outline">Continue Shopping</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A shopping cart drawer displaying cart items with quantities, prices, and checkout functionality, demonstrating e-commerce use cases.',
      },
    },
  },
};

export const FilterDrawer: Story = {
  render: () => {
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

    const categories = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books'];
    const brands = ['Apple', 'Samsung', 'Nike', 'Adidas', 'Amazon'];

    const toggleCategory = (category: string) => {
      setSelectedCategories((prev) =>
        prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
      );
    };

    const toggleBrand = (brand: string) => {
      setSelectedBrands((prev) =>
        prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
      );
    };

    return (
      <Drawer direction="left">
        <DrawerTrigger asChild>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Filter Products</DrawerTitle>
            <DrawerDescription>Refine your search results</DrawerDescription>
          </DrawerHeader>
          <div className="flex-1 p-4 space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-3">Price Range</h3>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value) || 1000])
                    }
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  ${priceRange[0]} - ${priceRange[1]}
                </p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      className="rounded border border-input"
                    />
                    <span className="text-sm">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-medium mb-3">Brands</h3>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="rounded border border-input"
                    />
                    <span className="text-sm">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-medium mb-3">Rating</h3>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="rating" value={rating} className="rounded-full" />
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
                        />
                      ))}
                      <span className="text-sm ml-1">& up</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button>Apply Filters</Button>
            <Button variant="outline">Clear All</Button>
            <DrawerClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A filter drawer with various filter options including checkboxes, sliders, and dropdowns, demonstrating how to implement filtering interfaces.',
      },
    },
  },
};

export const ProfileDrawer: Story = {
  render: () => (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline">
          <User className="mr-2 h-4 w-4" />
          Profile
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <DrawerTitle>John Doe</DrawerTitle>
              <DrawerDescription>Product Designer at Acme Inc.</DrawerDescription>
            </div>
          </div>
        </DrawerHeader>
        <div className="flex-1 p-4 space-y-6">
          <div className="flex gap-2">
            <Badge variant="secondary">Pro Member</Badge>
            <Badge variant="outline">Verified</Badge>
            <Badge variant="outline">Premium</Badge>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">john.doe@example.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">San Francisco, CA</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Joined March 2023</span>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-medium mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Account Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Bell className="mr-2 h-4 w-4" />
                Notification Preferences
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <HelpCircle className="mr-2 h-4 w-4" />
                Help & Support
              </Button>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-medium mb-3">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span>Updated profile picture</span>
                <span className="text-muted-foreground ml-auto">2h ago</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <span>Changed password</span>
                <span className="text-muted-foreground ml-auto">1d ago</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="h-2 w-2 rounded-full bg-orange-500" />
                <span>Upgraded to Pro</span>
                <span className="text-muted-foreground ml-auto">3d ago</span>
              </div>
            </div>
          </div>
        </div>
        <DrawerFooter>
          <Button variant="outline" className="w-full">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
          <DrawerClose asChild>
            <Button variant="ghost">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A profile drawer displaying user information, settings, and account actions, demonstrating a comprehensive user profile interface.',
      },
    },
  },
};

export const SearchDrawer: Story = {
  render: () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [recentSearches] = useState([
      'React components',
      'TypeScript tutorial',
      'UI design patterns',
      'Accessibility guidelines',
    ]);

    const [quickActions] = useState([
      { icon: FileText, label: 'Create Document', shortcut: '⌘N' },
      { icon: Folder, label: 'New Folder', shortcut: '⌘⇧N' },
      { icon: User, label: 'Add Team Member', shortcut: '⌘I' },
      { icon: Settings, label: 'Open Settings', shortcut: '⌘,' },
    ]);

    return (
      <Drawer direction="top">
        <DrawerTrigger asChild>
          <Button variant="outline">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search anything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 text-base"
                autoFocus
              />
            </div>
          </DrawerHeader>
          <div className="p-4 space-y-6 max-h-[60vh] overflow-y-auto">
            {searchQuery === '' ? (
              <>
                <div>
                  <h3 className="text-sm font-medium mb-3">Quick Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {quickActions.map((action, index) => (
                      <button
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted text-left"
                      >
                        <action.icon className="h-4 w-4" />
                        <span className="flex-1 text-sm">{action.label}</span>
                        <span className="text-xs text-muted-foreground">{action.shortcut}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-3">Recent Searches</h3>
                  <div className="space-y-1">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        className="w-full text-left p-2 text-sm hover:bg-muted rounded-md flex items-center gap-2"
                        onClick={() => setSearchQuery(search)}
                      >
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div>
                <h3 className="text-sm font-medium mb-3">Search Results</h3>
                <div className="space-y-2">
                  <div className="p-3 border rounded-lg">
                    <p className="text-sm font-medium">No results found</p>
                    <p className="text-xs text-muted-foreground">
                      Try searching for something else
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A search drawer with a search input, recent searches, and quick actions, demonstrating how to implement search functionality in a drawer.',
      },
    },
  },
};

export const MobileMenuDrawer: Story = {
  render: () => (
    <div className="flex gap-4">
      <Drawer direction="left">
        <DrawerTrigger asChild>
          <Button variant="outline" size="sm">
            <Menu className="h-4 w-4" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Mobile Menu</DrawerTitle>
            <DrawerDescription>Navigation optimized for mobile devices</DrawerDescription>
          </DrawerHeader>
          <div className="flex-1 p-4">
            <nav className="space-y-1">
              <a
                href="#"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted"
              >
                <div className="flex items-center gap-3">
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </a>
              <a
                href="#"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted"
              >
                <div className="flex items-center gap-3">
                  <Search className="h-5 w-5" />
                  <span>Explore</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </a>
              <a
                href="#"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted"
              >
                <div className="flex items-center gap-3">
                  <Heart className="h-5 w-5" />
                  <span>Favorites</span>
                </div>
                <Badge variant="secondary">12</Badge>
              </a>
              <a
                href="#"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted"
              >
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </a>

              <Separator className="my-4" />

              <a
                href="#"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted"
              >
                <div className="flex items-center gap-3">
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </a>
              <a
                href="#"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-5 w-5" />
                  <span>Help</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </a>
            </nav>
          </div>
          <DrawerFooter>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">john@example.com</p>
              </div>
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <span className="text-sm text-muted-foreground">← Try the mobile menu</span>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A mobile menu drawer with navigation links, user profile, and settings, demonstrating a complete mobile navigation interface.',
      },
    },
  },
};

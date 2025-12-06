import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Menu,
  Settings,
  User,
  Bell,
  HelpCircle,
  LogOut,
  Plus,
  Minus,
  ShoppingCart,
  Filter,
  Upload,
  Trash2,
  Home,
  BarChart3,
  Users,
  FileText,
  Image as ImageIcon,
  CreditCard,
  Package,
  Save,
} from 'lucide-react';

const meta = {
  title: 'Overlays/Sheet',
  component: Sheet,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Extends the Dialog component to display content that complements the main content of the screen.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the sheet is open',
    },
  },
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof Sheet>;

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4 px-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" defaultValue="John Doe" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" defaultValue="@johndoe" className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A default sheet component with a form for editing profile information, demonstrating basic sheet functionality.',
      },
    },
  },
};

export const SideVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Left Side</Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Left Sheet</SheetTitle>
            <SheetDescription>This sheet slides in from the left side.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Right Side</Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Right Sheet</SheetTitle>
            <SheetDescription>This sheet slides in from the right side.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Top Side</Button>
        </SheetTrigger>
        <SheetContent side="top">
          <SheetHeader>
            <SheetTitle>Top Sheet</SheetTitle>
            <SheetDescription>This sheet slides in from the top.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Bottom Side</Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Bottom Sheet</SheetTitle>
            <SheetDescription>This sheet slides in from the bottom.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Sheet variants showing sheets from different sides (top, right, bottom, left), demonstrating directional sheet positioning.',
      },
    },
  },
};

export const NavigationMenu: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Access all sections of the application</SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-full py-4 px-4">
          <div className="space-y-2">
            <div className="py-2">
              <h2 className="mb-2 text-lg font-semibold">Main</h2>
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start">
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Analytics
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Team
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Documents
                </Button>
              </div>
            </div>
            <Separator />
            <div className="py-2">
              <h2 className="mb-2 text-lg font-semibold">Tools</h2>
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start">
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Media
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Package className="mr-2 h-4 w-4" />
                  Projects
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </div>
            </div>
            <Separator />
            <div className="py-2">
              <h2 className="mb-2 text-lg font-semibold">Account</h2>
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help
                </Button>
                <Button variant="ghost" className="w-full justify-start text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A navigation menu sheet displaying navigation links and menu items, demonstrating how to use sheets for navigation.',
      },
    },
  },
};

export const ContactForm: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Contact
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add New Contact</SheetTitle>
          <SheetDescription>
            Fill in the information below to add a new contact to your address book.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4 px-4">
          <div className="grid gap-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" placeholder="John" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" placeholder="Doe" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john.doe@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="company">Company</Label>
            <Input id="company" placeholder="Acme Corp" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" placeholder="Additional notes..." rows={3} />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <SheetClose asChild>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Save Contact
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A contact form sheet with input fields for name, email, and message, demonstrating form integration in sheets.',
      },
    },
  },
};

export const SettingsPanel: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>Manage your account settings and preferences.</SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-full py-4 px-4">
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-xs text-muted-foreground">
                      Receive emails about your account activity
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-xs text-muted-foreground">
                      Receive push notifications on your devices
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Appearance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <Select defaultValue="system">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Privacy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Public Profile</Label>
                    <p className="text-xs text-muted-foreground">
                      Make your profile visible to others
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Analytics</Label>
                    <p className="text-xs text-muted-foreground">
                      Help improve our service with usage data
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <SheetClose asChild>
            <Button>Save Changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A settings panel sheet with various configuration options and settings, demonstrating a comprehensive settings interface.',
      },
    },
  },
};

export const ShoppingCartSheet: Story = {
  render: () => {
    const [cartItems] = useState([
      { id: 1, name: 'Wireless Headphones', price: 99.99, quantity: 1 },
      { id: 2, name: 'Smartphone Case', price: 24.99, quantity: 2 },
      { id: 3, name: 'USB Cable', price: 12.99, quantity: 1 },
    ]);

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <ShoppingCart className="h-4 w-4" />
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs"
            >
              {cartItems.length}
            </Badge>
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Shopping Cart</SheetTitle>
            <SheetDescription>
              {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-full py-4 px-4">
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div key={item.id}>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-muted rounded-md"></div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{`$${item.price}`}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Button variant="outline" size="icon" className="h-6 w-6">
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm">{item.quantity}</span>
                        <Button variant="outline" size="icon" className="h-6 w-6">
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <Button variant="ghost" size="sm" className="mt-1 h-6 w-6 p-0">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  {index < cartItems.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          </ScrollArea>
          <SheetFooter className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{`$${total.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>$9.99</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${(total * 0.08).toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${(total + 9.99 + total * 0.08).toFixed(2)}</span>
              </div>
            </div>
            <SheetClose asChild>
              <Button className="w-full">
                <CreditCard className="mr-2 h-4 w-4" />
                Checkout
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A shopping cart sheet displaying cart items with quantities, prices, and checkout functionality, demonstrating e-commerce use cases.',
      },
    },
  },
};

export const UserProfile: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Profile</SheetTitle>
          <SheetDescription>View and edit your profile information</SheetDescription>
        </SheetHeader>
        <div className="py-4 px-4 space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-lg">JD</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">
              <Upload className="mr-2 h-4 w-4" />
              Change Photo
            </Button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input id="displayName" defaultValue="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                defaultValue="Software engineer passionate about creating great user experiences."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" defaultValue="San Francisco, CA" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input id="website" defaultValue="https://johndoe.dev" />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Contact Information</h3>
            <div className="space-y-2">
              <Label htmlFor="profileEmail">Email</Label>
              <Input id="profileEmail" defaultValue="john.doe@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profilePhone">Phone</Label>
              <Input id="profilePhone" defaultValue="+1 (555) 123-4567" />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Privacy Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Show email publicly</Label>
                  <p className="text-xs text-muted-foreground">
                    Your email will be visible on your profile
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Show activity status</Label>
                  <p className="text-xs text-muted-foreground">
                    Others can see when you&apos;re online
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <SheetClose asChild>
            <Button>Save Changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A user profile sheet displaying user information, avatar, and profile details, demonstrating profile display in sheets.',
      },
    },
  },
};

export const FilterPanel: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Filter Results</SheetTitle>
          <SheetDescription>Refine your search results using the filters below</SheetDescription>
        </SheetHeader>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-4 px-4">
          <div className="space-y-2">
            <Label>Category</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="books">Books</SelectItem>
                <SelectItem value="home">Home & Garden</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Price Range</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Any price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-25">$0 - $25</SelectItem>
                <SelectItem value="25-50">$25 - $50</SelectItem>
                <SelectItem value="50-100">$50 - $100</SelectItem>
                <SelectItem value="100+">$100+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Brand</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="All brands" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="samsung">Samsung</SelectItem>
                <SelectItem value="sony">Sony</SelectItem>
                <SelectItem value="nike">Nike</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Rating</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Any rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4+">4+ Stars</SelectItem>
                <SelectItem value="3+">3+ Stars</SelectItem>
                <SelectItem value="2+">2+ Stars</SelectItem>
                <SelectItem value="1+">1+ Stars</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <SheetFooter>
          <Button variant="outline">Clear All</Button>
          <SheetClose asChild>
            <Button>Apply Filters</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A filter panel sheet with various filter options including checkboxes, sliders, and dropdowns, demonstrating filtering interfaces.',
      },
    },
  },
};

export const ImageGallery: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <ImageIcon className="mr-2 h-4 w-4" />
          View Gallery
        </Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Image Gallery</SheetTitle>
          <SheetDescription>Browse through your uploaded images</SheetDescription>
        </SheetHeader>
        <div className="py-4 px-4">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-muted rounded-md cursor-pointer hover:bg-muted/80 transition-colors"
              ></div>
            ))}
          </div>
        </div>
        <SheetFooter>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Upload Images
          </Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'An image gallery sheet displaying a grid of images with navigation, demonstrating how to use sheets for media galleries.',
      },
    },
  },
};

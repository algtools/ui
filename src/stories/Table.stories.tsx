import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import {
  MoreHorizontal,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Edit,
  Trash2,
  Eye,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  User,
  Mail,
  Phone,
  MapPin,
  Package,
  ShoppingCart,
  CreditCard,
  FileText,
} from 'lucide-react';

const meta = {
  title: 'Data Display/Table',
  component: Table,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A responsive table component for displaying structured data.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  args: {},
  render: () => (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV002</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell>PayPal</TableCell>
          <TableCell className="text-right">$150.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV003</TableCell>
          <TableCell>Unpaid</TableCell>
          <TableCell>Bank Transfer</TableCell>
          <TableCell className="text-right">$350.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV004</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$450.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV005</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>PayPal</TableCell>
          <TableCell className="text-right">$550.00</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$1,750.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

export const WithBadges: Story = {
  args: {},
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">#3210</TableCell>
          <TableCell>John Doe</TableCell>
          <TableCell>
            <Badge variant="default">Completed</Badge>
          </TableCell>
          <TableCell>
            <Badge variant="destructive">High</Badge>
          </TableCell>
          <TableCell className="text-right">$89.99</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">#3209</TableCell>
          <TableCell>Jane Smith</TableCell>
          <TableCell>
            <Badge variant="secondary">Processing</Badge>
          </TableCell>
          <TableCell>
            <Badge variant="secondary">Medium</Badge>
          </TableCell>
          <TableCell className="text-right">$129.99</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">#3208</TableCell>
          <TableCell>Bob Johnson</TableCell>
          <TableCell>
            <Badge variant="outline">Pending</Badge>
          </TableCell>
          <TableCell>
            <Badge variant="secondary">Low</Badge>
          </TableCell>
          <TableCell className="text-right">$59.99</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">#3207</TableCell>
          <TableCell>Alice Brown</TableCell>
          <TableCell>
            <Badge variant="destructive">Cancelled</Badge>
          </TableCell>
          <TableCell>
            <Badge variant="destructive">High</Badge>
          </TableCell>
          <TableCell className="text-right">$199.99</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const SortableTable: Story = {
  args: {},
  render: () => {
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const data = [
      { name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
      { name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
      { name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Inactive' },
      { name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active' },
    ];

    const handleSort = (column: string) => {
      if (sortColumn === column) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        setSortColumn(column);
        setSortDirection('asc');
      }
    };

    const getSortIcon = (column: string) => {
      if (sortColumn !== column) return <ArrowUpDown className="ml-2 h-4 w-4" />;
      return sortDirection === 'asc' ? (
        <ArrowUp className="ml-2 h-4 w-4" />
      ) : (
        <ArrowDown className="ml-2 h-4 w-4" />
      );
    };

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort('name')}>
                Name
                {getSortIcon('name')}
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort('email')}>
                Email
                {getSortIcon('email')}
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort('role')}>
                Role
                {getSortIcon('role')}
              </Button>
            </TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.role}</TableCell>
              <TableCell>
                <Badge variant={item.status === 'Active' ? 'default' : 'secondary'}>
                  {item.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

export const WithActions: Story = {
  args: {},
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Wireless Headphones</TableCell>
          <TableCell>Electronics</TableCell>
          <TableCell>15</TableCell>
          <TableCell className="text-right">$99.99</TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="sm">
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Gaming Mouse</TableCell>
          <TableCell>Electronics</TableCell>
          <TableCell>8</TableCell>
          <TableCell className="text-right">$59.99</TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="sm">
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Mechanical Keyboard</TableCell>
          <TableCell>Electronics</TableCell>
          <TableCell>12</TableCell>
          <TableCell className="text-right">$149.99</TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="sm">
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const UserManagement: Story = {
  args: {},
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          User Management
        </CardTitle>
        <CardDescription>Manage your team members and their permissions</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">John Doe</div>
                    <div className="text-sm text-muted-foreground">@johndoe</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-3 w-3" />
                    john@example.com
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-3 w-3" />
                    +1 (555) 123-4567
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge>Administrator</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3" />2 hours ago
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">Online</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">Jane Smith</div>
                    <div className="text-sm text-muted-foreground">@janesmith</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-3 w-3" />
                    jane@example.com
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-3 w-3" />
                    +1 (555) 987-6543
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">Editor</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3" />1 day ago
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <XCircle className="h-3 w-3 text-red-500" />
                  <span className="text-red-500">Offline</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>BJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">Bob Johnson</div>
                    <div className="text-sm text-muted-foreground">@bobjohnson</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-3 w-3" />
                    bob@example.com
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-3 w-3" />
                    +1 (555) 456-7890
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">Viewer</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3" />5 minutes ago
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-3 w-3 text-yellow-500" />
                  <span className="text-yellow-500">Away</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  ),
};

export const FinancialData: Story = {
  args: {},
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Portfolio Performance
        </CardTitle>
        <CardDescription>Track your investment portfolio and returns</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset</TableHead>
              <TableHead>Symbol</TableHead>
              <TableHead className="text-right">Shares</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Market Value</TableHead>
              <TableHead className="text-right">Change</TableHead>
              <TableHead className="text-right">% Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Apple Inc.</TableCell>
              <TableCell>AAPL</TableCell>
              <TableCell className="text-right">50</TableCell>
              <TableCell className="text-right">$175.43</TableCell>
              <TableCell className="text-right">$8,771.50</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1 text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  +$2.15
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Badge variant="default" className="bg-green-100 text-green-800">
                  +1.24%
                </Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Microsoft Corp.</TableCell>
              <TableCell>MSFT</TableCell>
              <TableCell className="text-right">25</TableCell>
              <TableCell className="text-right">$378.85</TableCell>
              <TableCell className="text-right">$9,471.25</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1 text-red-600">
                  <TrendingDown className="h-3 w-3" />
                  -$1.42
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Badge variant="destructive" className="bg-red-100 text-red-800">
                  -0.37%
                </Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Tesla Inc.</TableCell>
              <TableCell>TSLA</TableCell>
              <TableCell className="text-right">15</TableCell>
              <TableCell className="text-right">$248.50</TableCell>
              <TableCell className="text-right">$3,727.50</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1 text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  +$12.30
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Badge variant="default" className="bg-green-100 text-green-800">
                  +5.21%
                </Badge>
              </TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4} className="font-medium">
                Total Portfolio
              </TableCell>
              <TableCell className="text-right font-medium">$21,970.25</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1 text-green-600 font-medium">
                  <TrendingUp className="h-3 w-3" />
                  +$13.03
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Badge variant="default" className="bg-green-100 text-green-800 font-medium">
                  +2.36%
                </Badge>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  ),
};

export const TaskManagement: Story = {
  args: {},
  render: () => {
    const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

    const tasks = [
      {
        id: '1',
        title: 'Update user authentication',
        priority: 'High',
        status: 'In Progress',
        assignee: 'John Doe',
        dueDate: '2024-01-15',
      },
      {
        id: '2',
        title: 'Fix mobile responsive layout',
        priority: 'Medium',
        status: 'To Do',
        assignee: 'Jane Smith',
        dueDate: '2024-01-20',
      },
      {
        id: '3',
        title: 'Implement dark mode',
        priority: 'Low',
        status: 'Done',
        assignee: 'Bob Johnson',
        dueDate: '2024-01-10',
      },
      {
        id: '4',
        title: 'Add payment integration',
        priority: 'High',
        status: 'In Review',
        assignee: 'Alice Brown',
        dueDate: '2024-01-18',
      },
    ];

    const handleSelectAll = (checked: boolean) => {
      if (checked) {
        setSelectedTasks(tasks.map((task) => task.id));
      } else {
        setSelectedTasks([]);
      }
    };

    const handleSelectTask = (taskId: string, checked: boolean) => {
      if (checked) {
        setSelectedTasks([...selectedTasks, taskId]);
      } else {
        setSelectedTasks(selectedTasks.filter((id) => id !== taskId));
      }
    };

    const getStatusBadge = (status: string) => {
      switch (status) {
        case 'Done':
          return <Badge className="bg-green-100 text-green-800">Done</Badge>;
        case 'In Progress':
          return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
        case 'In Review':
          return <Badge className="bg-yellow-100 text-yellow-800">In Review</Badge>;
        default:
          return <Badge variant="secondary">To Do</Badge>;
      }
    };

    const getPriorityBadge = (priority: string) => {
      switch (priority) {
        case 'High':
          return <Badge variant="destructive">High</Badge>;
        case 'Medium':
          return <Badge variant="secondary">Medium</Badge>;
        default:
          return <Badge variant="outline">Low</Badge>;
      }
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Task Management
          </CardTitle>
          <CardDescription>Manage and track project tasks and assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedTasks.length === tasks.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Task</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow
                  key={task.id}
                  data-state={selectedTasks.includes(task.id) ? 'selected' : ''}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedTasks.includes(task.id)}
                      onCheckedChange={(checked) => handleSelectTask(task.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                  <TableCell>{getStatusBadge(task.status)}</TableCell>
                  <TableCell>{task.assignee}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      {task.dueDate}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {selectedTasks.length > 0 && (
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <p className="text-sm">{selectedTasks.length} task(s) selected</p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  },
};

export const EmptyState: Story = {
  args: {},
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Product Inventory
        </CardTitle>
        <CardDescription>Manage your product inventory and stock levels</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="text-right">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Package className="h-8 w-8" />
                  <p>No products found</p>
                  <p className="text-sm">Add your first product to get started</p>
                  <Button className="mt-2">Add Product</Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  ),
};

export const LoadingState: Story = {
  args: {},
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Recent Orders
        </CardTitle>
        <CardDescription>Loading your recent order history...</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-16 rounded-full" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-4 w-16 ml-auto" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  ),
};

export const ECommerceOrders: Story = {
  args: {},
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Order Management
        </CardTitle>
        <CardDescription>Track and manage customer orders</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div>
                  <div className="font-medium">#ORD-001</div>
                  <div className="text-sm text-muted-foreground">Jan 15, 2024</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">John Doe</div>
                    <div className="text-sm text-muted-foreground">john@example.com</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="text-sm">Wireless Headphones × 1</div>
                  <div className="text-sm">Gaming Mouse × 2</div>
                  <div className="text-xs text-muted-foreground">+1 more item</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-3 w-3" />
                  <span className="text-sm">••••4242</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge className="bg-green-100 text-green-800">Delivered</Badge>
              </TableCell>
              <TableCell className="text-right font-medium">$219.97</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div>
                  <div className="font-medium">#ORD-002</div>
                  <div className="text-sm text-muted-foreground">Jan 14, 2024</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">Jane Smith</div>
                    <div className="text-sm text-muted-foreground">jane@example.com</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="text-sm">Mechanical Keyboard × 1</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-3 w-3" />
                  <span className="text-sm">••••8765</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge className="bg-blue-100 text-blue-800">Processing</Badge>
              </TableCell>
              <TableCell className="text-right font-medium">$149.99</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div>
                  <div className="font-medium">#ORD-003</div>
                  <div className="text-sm text-muted-foreground">Jan 13, 2024</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>BJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">Bob Johnson</div>
                    <div className="text-sm text-muted-foreground">bob@example.com</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="text-sm">Monitor Stand × 1</div>
                  <div className="text-sm">USB Cable × 3</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-3 w-3" />
                  <span className="text-sm">••••1234</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">Pending</Badge>
              </TableCell>
              <TableCell className="text-right font-medium">$89.97</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>Total Orders (3)</TableCell>
              <TableCell className="text-right font-medium">$459.93</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  ),
};

export const Responsive: Story = {
  args: {},
  render: () => (
    <div className="w-full">
      <Table>
        <TableCaption>Responsive table that adapts to different screen sizes</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="hidden md:table-cell">Email</TableHead>
            <TableHead className="hidden lg:table-cell">Department</TableHead>
            <TableHead className="hidden lg:table-cell">Location</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">#001</TableCell>
            <TableCell>
              <div>
                <div className="font-medium">John Doe</div>
                <div className="text-sm text-muted-foreground md:hidden">john@example.com</div>
              </div>
            </TableCell>
            <TableCell className="hidden md:table-cell">john@example.com</TableCell>
            <TableCell className="hidden lg:table-cell">Engineering</TableCell>
            <TableCell className="hidden lg:table-cell">
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                San Francisco
              </div>
            </TableCell>
            <TableCell className="text-right">
              <Badge>Active</Badge>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">#002</TableCell>
            <TableCell>
              <div>
                <div className="font-medium">Jane Smith</div>
                <div className="text-sm text-muted-foreground md:hidden">jane@example.com</div>
              </div>
            </TableCell>
            <TableCell className="hidden md:table-cell">jane@example.com</TableCell>
            <TableCell className="hidden lg:table-cell">Marketing</TableCell>
            <TableCell className="hidden lg:table-cell">
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                New York
              </div>
            </TableCell>
            <TableCell className="text-right">
              <Badge variant="secondary">Inactive</Badge>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
};

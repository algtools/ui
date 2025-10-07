import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarLabel,
} from '@/components/ui/menubar';
import {
  FileText,
  Download,
  Upload,
  Copy,
  Scissors,
  Clipboard,
  Undo,
  Redo,
  Search,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Settings,
  HelpCircle,
  User,
  LogOut,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  Video,
  Music,
  Folder,
  ImageIcon,
} from 'lucide-react';

const meta = {
  title: 'Navigation/Menubar',
  component: Menubar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A visually persistent menu common in desktop applications that provides access to a consistent set of commands.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Menubar>;

export default meta;
type Story = StoryObj<typeof Menubar>;

export const Default: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <FileText className="mr-2 h-4 w-4" />
            New File
            <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            <Download className="mr-2 h-4 w-4" />
            Open
            <MenubarShortcut>⌘O</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Save
            <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Save As...
            <MenubarShortcut>⇧⌘S</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Undo className="mr-2 h-4 w-4" />
            Undo
            <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            <Redo className="mr-2 h-4 w-4" />
            Redo
            <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <Scissors className="mr-2 h-4 w-4" />
            Cut
            <MenubarShortcut>⌘X</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            <Copy className="mr-2 h-4 w-4" />
            Copy
            <MenubarShortcut>⌘C</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            <Clipboard className="mr-2 h-4 w-4" />
            Paste
            <MenubarShortcut>⌘V</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <ZoomIn className="mr-2 h-4 w-4" />
            Zoom In
            <MenubarShortcut>⌘+</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            <ZoomOut className="mr-2 h-4 w-4" />
            Zoom Out
            <MenubarShortcut>⌘-</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset Zoom
            <MenubarShortcut>⌘0</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};

export const WithCheckboxes: Story = {
  render: () => {
    const [checked, setChecked] = useState({
      showSidebar: true,
      showStatusBar: false,
      showToolbar: true,
      showMinimap: false,
    });

    return (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem
              checked={checked.showSidebar}
              onCheckedChange={(value) => setChecked((prev) => ({ ...prev, showSidebar: !!value }))}
            >
              Show Sidebar
            </MenubarCheckboxItem>
            <MenubarCheckboxItem
              checked={checked.showStatusBar}
              onCheckedChange={(value) =>
                setChecked((prev) => ({ ...prev, showStatusBar: !!value }))
              }
            >
              Show Status Bar
            </MenubarCheckboxItem>
            <MenubarCheckboxItem
              checked={checked.showToolbar}
              onCheckedChange={(value) => setChecked((prev) => ({ ...prev, showToolbar: !!value }))}
            >
              Show Toolbar
            </MenubarCheckboxItem>
            <MenubarCheckboxItem
              checked={checked.showMinimap}
              onCheckedChange={(value) => setChecked((prev) => ({ ...prev, showMinimap: !!value }))}
            >
              Show Minimap
            </MenubarCheckboxItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Options</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Settings className="mr-2 h-4 w-4" />
              Preferences
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};

export const WithRadioGroups: Story = {
  render: () => {
    const [theme, setTheme] = useState('system');
    const [language, setLanguage] = useState('en');

    return (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Appearance</MenubarTrigger>
          <MenubarContent>
            <MenubarLabel>Theme</MenubarLabel>
            <MenubarRadioGroup value={theme} onValueChange={setTheme}>
              <MenubarRadioItem value="light">Light</MenubarRadioItem>
              <MenubarRadioItem value="dark">Dark</MenubarRadioItem>
              <MenubarRadioItem value="system">System</MenubarRadioItem>
            </MenubarRadioGroup>
            <MenubarSeparator />
            <MenubarLabel>Language</MenubarLabel>
            <MenubarRadioGroup value={language} onValueChange={setLanguage}>
              <MenubarRadioItem value="en">English</MenubarRadioItem>
              <MenubarRadioItem value="es">Español</MenubarRadioItem>
              <MenubarRadioItem value="fr">Français</MenubarRadioItem>
              <MenubarRadioItem value="de">Deutsch</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Tools</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Search className="mr-2 h-4 w-4" />
              Find
              <MenubarShortcut>⌘F</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};

export const WithSubmenus: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <FileText className="mr-2 h-4 w-4" />
            New File
            <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>
              <FileText className="mr-2 h-4 w-4" />
              New from Template
            </MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>React Component</MenubarItem>
              <MenubarItem>HTML Page</MenubarItem>
              <MenubarItem>TypeScript Interface</MenubarItem>
              <MenubarItem>CSS Module</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>
              <Upload className="mr-2 h-4 w-4" />
              Import
            </MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>
                <ImageIcon className="mr-2 h-4 w-4" />
                Images
              </MenubarItem>
              <MenubarItem>
                <Video className="mr-2 h-4 w-4" />
                Videos
              </MenubarItem>
              <MenubarItem>
                <Music className="mr-2 h-4 w-4" />
                Audio
              </MenubarItem>
              <MenubarItem>
                <Folder className="mr-2 h-4 w-4" />
                Archive
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>
              <Globe className="mr-2 h-4 w-4" />
              Preview As
            </MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>
                <Monitor className="mr-2 h-4 w-4" />
                Desktop
              </MenubarItem>
              <MenubarItem>
                <Tablet className="mr-2 h-4 w-4" />
                Tablet
              </MenubarItem>
              <MenubarItem>
                <Smartphone className="mr-2 h-4 w-4" />
                Mobile
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};

export const EditorMenubar: Story = {
  render: () => {
    const [showNumbers, setShowNumbers] = useState(true);
    const [wordWrap, setWordWrap] = useState(false);
    const [minimap, setMinimap] = useState(true);

    return (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <FileText className="mr-2 h-4 w-4" />
              New File
              <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              <Folder className="mr-2 h-4 w-4" />
              Open Folder
              <MenubarShortcut>⌘K ⌘O</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              Save
              <MenubarShortcut>⌘S</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Save All
              <MenubarShortcut>⌘K S</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem variant="destructive">
              Close Editor
              <MenubarShortcut>⌘W</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Undo className="mr-2 h-4 w-4" />
              Undo
              <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              <Redo className="mr-2 h-4 w-4" />
              Redo
              <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              <Search className="mr-2 h-4 w-4" />
              Find
              <MenubarShortcut>⌘F</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Find and Replace
              <MenubarShortcut>⌥⌘F</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem checked={showNumbers} onCheckedChange={setShowNumbers}>
              Line Numbers
            </MenubarCheckboxItem>
            <MenubarCheckboxItem checked={wordWrap} onCheckedChange={setWordWrap}>
              Word Wrap
              <MenubarShortcut>⌥Z</MenubarShortcut>
            </MenubarCheckboxItem>
            <MenubarCheckboxItem checked={minimap} onCheckedChange={setMinimap}>
              Minimap
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarItem>
              <ZoomIn className="mr-2 h-4 w-4" />
              Zoom In
              <MenubarShortcut>⌘+</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              <ZoomOut className="mr-2 h-4 w-4" />
              Zoom Out
              <MenubarShortcut>⌘-</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Help</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <HelpCircle className="mr-2 h-4 w-4" />
              Documentation
            </MenubarItem>
            <MenubarItem>
              Keyboard Shortcuts
              <MenubarShortcut>⌘K ⌘S</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>About</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};

export const ApplicationMenubar: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>MyApp</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>About MyApp</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              <Settings className="mr-2 h-4 w-4" />
              Preferences
              <MenubarShortcut>⌘,</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Hide MyApp</MenubarItem>
            <MenubarItem>Hide Others</MenubarItem>
            <MenubarItem>Show All</MenubarItem>
            <MenubarSeparator />
            <MenubarItem variant="destructive">
              Quit MyApp
              <MenubarShortcut>⌘Q</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <FileText className="mr-2 h-4 w-4" />
              New
              <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              <Download className="mr-2 h-4 w-4" />
              Open
              <MenubarShortcut>⌘O</MenubarShortcut>
            </MenubarItem>
            <MenubarSub>
              <MenubarSubTrigger>Open Recent</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Project Alpha</MenubarItem>
                <MenubarItem>Project Beta</MenubarItem>
                <MenubarItem>Project Gamma</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Clear Recent</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem>
              Save
              <MenubarShortcut>⌘S</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>Save As...</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              <Upload className="mr-2 h-4 w-4" />
              Export
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Undo className="mr-2 h-4 w-4" />
              Undo
              <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              <Redo className="mr-2 h-4 w-4" />
              Redo
              <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              <Scissors className="mr-2 h-4 w-4" />
              Cut
              <MenubarShortcut>⌘X</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              <Copy className="mr-2 h-4 w-4" />
              Copy
              <MenubarShortcut>⌘C</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              <Clipboard className="mr-2 h-4 w-4" />
              Paste
              <MenubarShortcut>⌘V</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Select All</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Window</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Minimize</MenubarItem>
            <MenubarItem>Zoom</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Bring All to Front</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Help</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <HelpCircle className="mr-2 h-4 w-4" />
              MyApp Help
            </MenubarItem>
            <MenubarItem>What&apos;s New</MenubarItem>
            <MenubarItem>Release Notes</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Contact Support</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  ),
};

export const BrowserMenubar: Story = {
  render: () => {
    const [incognito, setIncognito] = useState(false);
    const [javascript, setJavascript] = useState(true);
    const [images, setImages] = useState(true);

    return (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Chrome</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>About Chrome</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
              <MenubarShortcut>⌘,</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarCheckboxItem checked={incognito} onCheckedChange={setIncognito}>
              Incognito Mode
              <MenubarShortcut>⇧⌘N</MenubarShortcut>
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarItem variant="destructive">
              Quit Chrome
              <MenubarShortcut>⌘Q</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              New Tab
              <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              New Window
              <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              <Download className="mr-2 h-4 w-4" />
              Open File
              <MenubarShortcut>⌘O</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Open Location
              <MenubarShortcut>⌘L</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Close Tab</MenubarItem>
            <MenubarItem>Close Window</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Reload
              <MenubarShortcut>⌘R</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Force Reload
              <MenubarShortcut>⇧⌘R</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarCheckboxItem checked={javascript} onCheckedChange={setJavascript}>
              Enable JavaScript
            </MenubarCheckboxItem>
            <MenubarCheckboxItem checked={images} onCheckedChange={setImages}>
              Load Images
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarItem>
              Developer Tools
              <MenubarShortcut>⌥⌘I</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Bookmarks</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Bookmark This Page
              <MenubarShortcut>⌘D</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Bookmark All Tabs
              <MenubarShortcut>⇧⌘D</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Show Bookmarks Bar</MenubarItem>
            <MenubarItem>Bookmark Manager</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};

export const DisabledItems: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <FileText className="mr-2 h-4 w-4" />
            New File
            <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>
            <Download className="mr-2 h-4 w-4" />
            Open File
            <MenubarShortcut>⌘O</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Save
            <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>
            Save As...
            <MenubarShortcut>⇧⌘S</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem disabled variant="destructive">
            Delete File
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger disabled>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Undo</MenubarItem>
          <MenubarItem>Redo</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Account</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <User className="mr-2 h-4 w-4" />
            Profile
          </MenubarItem>
          <MenubarItem disabled>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem variant="destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};

export const MinimalMenubar: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Actions</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New</MenubarItem>
          <MenubarItem>Edit</MenubarItem>
          <MenubarItem>Delete</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Tools</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Settings</MenubarItem>
          <MenubarItem>Help</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};

import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Bell,
  BellOff,
  Moon,
  Sun,
  Wifi,
  WifiOff,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Shield,
  Bluetooth,
  BluetoothOff,
  Lock,
  Unlock,
  Zap,
  ZapOff,
  Locate,
  LocateOff,
} from 'lucide-react';

const meta = {
  title: 'Forms/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A control that allows the user to toggle between checked and not checked.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'The controlled checked state of the switch',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'The default checked state when uncontrolled',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the switch is disabled',
    },
    onCheckedChange: {
      action: 'checked changed',
      description: 'Callback fired when the checked state changes',
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="default" />
      <Label htmlFor="default">Default switch</Label>
    </div>
  ),
};

export const Checked: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="checked" defaultChecked />
      <Label htmlFor="checked">Checked by default</Label>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch id="disabled-off" disabled />
        <Label htmlFor="disabled-off" className="text-muted-foreground">
          Disabled (off)
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="disabled-on" disabled defaultChecked />
        <Label htmlFor="disabled-on" className="text-muted-foreground">
          Disabled (on)
        </Label>
      </div>
    </div>
  ),
};

export const WithLabels: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="notifications">Push Notifications</Label>
          <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
        </div>
        <Switch id="notifications" />
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="marketing">Marketing emails</Label>
          <p className="text-sm text-muted-foreground">
            Receive emails about new products and features
          </p>
        </div>
        <Switch id="marketing" />
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="security">Security emails</Label>
          <p className="text-sm text-muted-foreground">
            Receive emails about your account security
          </p>
        </div>
        <Switch id="security" defaultChecked />
      </div>
    </div>
  ),
};

export const ControlledState: Story = {
  render: () => {
    const [isChecked, setIsChecked] = useState(false);

    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch id="controlled" checked={isChecked} onCheckedChange={setIsChecked} />
          <Label htmlFor="controlled">Controlled switch ({isChecked ? 'On' : 'Off'})</Label>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => setIsChecked(true)} size="sm">
            Turn On
          </Button>
          <Button onClick={() => setIsChecked(false)} variant="outline" size="sm">
            Turn Off
          </Button>
        </div>
      </div>
    );
  },
};

export const NotificationSettings: Story = {
  render: () => {
    const [notifications, setNotifications] = useState({
      email: true,
      push: false,
      sms: false,
      inApp: true,
    });

    const updateNotification = (key: keyof typeof notifications) => {
      setNotifications((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    };

    return (
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>Choose how you want to be notified</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {notifications.email ? (
                <Bell className="h-4 w-4" />
              ) : (
                <BellOff className="h-4 w-4 text-muted-foreground" />
              )}
              <div>
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Get notified via email</p>
              </div>
            </div>
            <Switch
              id="email-notifications"
              checked={notifications.email}
              onCheckedChange={() => updateNotification('email')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {notifications.push ? (
                <Bell className="h-4 w-4" />
              ) : (
                <BellOff className="h-4 w-4 text-muted-foreground" />
              )}
              <div>
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Get push notifications on your device
                </p>
              </div>
            </div>
            <Switch
              id="push-notifications"
              checked={notifications.push}
              onCheckedChange={() => updateNotification('push')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {notifications.sms ? (
                <Bell className="h-4 w-4" />
              ) : (
                <BellOff className="h-4 w-4 text-muted-foreground" />
              )}
              <div>
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">Get notified via text message</p>
              </div>
            </div>
            <Switch
              id="sms-notifications"
              checked={notifications.sms}
              onCheckedChange={() => updateNotification('sms')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {notifications.inApp ? (
                <Bell className="h-4 w-4" />
              ) : (
                <BellOff className="h-4 w-4 text-muted-foreground" />
              )}
              <div>
                <Label htmlFor="inapp-notifications">In-App Notifications</Label>
                <p className="text-sm text-muted-foreground">Show notifications in the app</p>
              </div>
            </div>
            <Switch
              id="inapp-notifications"
              checked={notifications.inApp}
              onCheckedChange={() => updateNotification('inApp')}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Active notifications:</span>
            <Badge variant="secondary">
              {Object.values(notifications).filter(Boolean).length} of 4
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  },
};

export const SystemSettings: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      darkMode: false,
      wifi: true,
      bluetooth: false,
      locationServices: true,
    });

    const updateSetting = (key: keyof typeof settings) => {
      setSettings((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    };

    return (
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>System Settings</CardTitle>
          <CardDescription>Manage your device preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {settings.wifi ? (
                <Wifi className="h-4 w-4" />
              ) : (
                <WifiOff className="h-4 w-4 text-muted-foreground" />
              )}
              <div>
                <Label htmlFor="wifi">Wi-Fi</Label>
                <p className="text-sm text-muted-foreground">Connect to wireless networks</p>
              </div>
            </div>
            <Switch
              id="wifi"
              checked={settings.wifi}
              onCheckedChange={() => updateSetting('wifi')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {settings.bluetooth ? (
                <Bluetooth className="h-4 w-4" />
              ) : (
                <BluetoothOff className="h-4 w-4 text-muted-foreground" />
              )}
              <div>
                <Label htmlFor="bluetooth">Bluetooth</Label>
                <p className="text-sm text-muted-foreground">Connect to nearby devices</p>
              </div>
            </div>
            <Switch
              id="bluetooth"
              checked={settings.bluetooth}
              onCheckedChange={() => updateSetting('bluetooth')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {settings.locationServices ? (
                <Locate className="h-4 w-4" />
              ) : (
                <LocateOff className="h-4 w-4 text-muted-foreground" />
              )}
              <div>
                <Label htmlFor="location-services">Location Services</Label>
                <p className="text-sm text-muted-foreground">Allow apps to access your location</p>
              </div>
            </div>
            <Switch
              id="location-services"
              checked={settings.locationServices}
              onCheckedChange={() => updateSetting('locationServices')}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {settings.darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              <div>
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">Use dark theme</p>
              </div>
            </div>
            <Switch
              id="dark-mode"
              checked={settings.darkMode}
              onCheckedChange={() => updateSetting('darkMode')}
            />
          </div>
        </CardContent>
      </Card>
    );
  },
};

export const PrivacySettings: Story = {
  render: () => {
    const [privacy, setPrivacy] = useState({
      profileVisible: true,
      showEmail: false,
      showPhone: false,
      allowMessages: true,
      twoFactorAuth: true,
      dataCollection: false,
    });

    const updatePrivacy = (key: keyof typeof privacy) => {
      setPrivacy((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    };

    return (
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy Settings
          </CardTitle>
          <CardDescription>Control your privacy and security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {privacy.profileVisible ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              )}
              <div>
                <Label htmlFor="profile-visible">Public Profile</Label>
                <p className="text-sm text-muted-foreground">Make your profile visible to others</p>
              </div>
            </div>
            <Switch
              id="profile-visible"
              checked={privacy.profileVisible}
              onCheckedChange={() => updatePrivacy('profileVisible')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {privacy.showEmail ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              )}
              <div>
                <Label htmlFor="show-email">Show Email Address</Label>
                <p className="text-sm text-muted-foreground">Display email on your profile</p>
              </div>
            </div>
            <Switch
              id="show-email"
              checked={privacy.showEmail}
              onCheckedChange={() => updatePrivacy('showEmail')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {privacy.showPhone ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              )}
              <div>
                <Label htmlFor="show-phone">Show Phone Number</Label>
                <p className="text-sm text-muted-foreground">Display phone on your profile</p>
              </div>
            </div>
            <Switch
              id="show-phone"
              checked={privacy.showPhone}
              onCheckedChange={() => updatePrivacy('showPhone')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {privacy.allowMessages ? (
                <Bell className="h-4 w-4" />
              ) : (
                <BellOff className="h-4 w-4 text-muted-foreground" />
              )}
              <div>
                <Label htmlFor="allow-messages">Allow Messages</Label>
                <p className="text-sm text-muted-foreground">Let others send you messages</p>
              </div>
            </div>
            <Switch
              id="allow-messages"
              checked={privacy.allowMessages}
              onCheckedChange={() => updatePrivacy('allowMessages')}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {privacy.twoFactorAuth ? (
                <Lock className="h-4 w-4" />
              ) : (
                <Unlock className="h-4 w-4 text-muted-foreground" />
              )}
              <div>
                <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              </div>
            </div>
            <Switch
              id="two-factor"
              checked={privacy.twoFactorAuth}
              onCheckedChange={() => updatePrivacy('twoFactorAuth')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {privacy.dataCollection ? (
                <Zap className="h-4 w-4" />
              ) : (
                <ZapOff className="h-4 w-4 text-muted-foreground" />
              )}
              <div>
                <Label htmlFor="data-collection">Analytics & Data Collection</Label>
                <p className="text-sm text-muted-foreground">Help improve our service</p>
              </div>
            </div>
            <Switch
              id="data-collection"
              checked={privacy.dataCollection}
              onCheckedChange={() => updatePrivacy('dataCollection')}
            />
          </div>

          <div className="p-3 bg-muted rounded-lg">
            <div className="text-sm font-medium">Security Score</div>
            <div className="text-xs text-muted-foreground mt-1">
              {privacy.twoFactorAuth && !privacy.showEmail && !privacy.showPhone
                ? 'High'
                : privacy.twoFactorAuth
                  ? 'Medium'
                  : 'Low'}{' '}
              security level
            </div>
          </div>
        </CardContent>
      </Card>
    );
  },
};

export const MediaControls: Story = {
  render: () => {
    const [media, setMedia] = useState({
      autoplay: false,
      muted: true,
      captions: false,
      hdQuality: true,
      downloadable: false,
    });

    const updateMedia = (key: keyof typeof media) => {
      setMedia((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    };

    return (
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Media Preferences</CardTitle>
          <CardDescription>Configure your media playback settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {media.autoplay ? (
                <Zap className="h-4 w-4" />
              ) : (
                <ZapOff className="h-4 w-4 text-muted-foreground" />
              )}
              <div>
                <Label htmlFor="autoplay">Autoplay Videos</Label>
                <p className="text-sm text-muted-foreground">Automatically start video playback</p>
              </div>
            </div>
            <Switch
              id="autoplay"
              checked={media.autoplay}
              onCheckedChange={() => updateMedia('autoplay')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {media.muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              <div>
                <Label htmlFor="muted">Start Muted</Label>
                <p className="text-sm text-muted-foreground">Begin videos without sound</p>
              </div>
            </div>
            <Switch id="muted" checked={media.muted} onCheckedChange={() => updateMedia('muted')} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Badge variant={media.captions ? 'default' : 'secondary'} className="w-8 h-6 text-xs">
                CC
              </Badge>
              <div>
                <Label htmlFor="captions">Show Captions</Label>
                <p className="text-sm text-muted-foreground">
                  Display closed captions when available
                </p>
              </div>
            </div>
            <Switch
              id="captions"
              checked={media.captions}
              onCheckedChange={() => updateMedia('captions')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Badge
                variant={media.hdQuality ? 'default' : 'secondary'}
                className="w-8 h-6 text-xs"
              >
                HD
              </Badge>
              <div>
                <Label htmlFor="hd-quality">High Quality</Label>
                <p className="text-sm text-muted-foreground">Use higher quality when available</p>
              </div>
            </div>
            <Switch
              id="hd-quality"
              checked={media.hdQuality}
              onCheckedChange={() => updateMedia('hdQuality')}
            />
          </div>
        </CardContent>
      </Card>
    );
  },
};

export const SwitchStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">All States</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Switch id="state-unchecked" />
            <Label htmlFor="state-unchecked">Unchecked</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="state-checked" defaultChecked />
            <Label htmlFor="state-checked">Checked</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="state-disabled-unchecked" disabled />
            <Label htmlFor="state-disabled-unchecked" className="text-muted-foreground">
              Disabled Unchecked
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="state-disabled-checked" disabled defaultChecked />
            <Label htmlFor="state-disabled-checked" className="text-muted-foreground">
              Disabled Checked
            </Label>
          </div>
        </div>
      </div>
    </div>
  ),
};

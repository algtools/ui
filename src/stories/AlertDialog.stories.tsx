import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

const meta = {
  title: 'Feedback/AlertDialog',
  component: AlertDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultOpen: {
      control: 'boolean',
      description: 'The initial open state of the dialog',
    },
    open: {
      control: 'boolean',
      description: 'The controlled open state of the dialog',
    },
  },
  args: {
    onOpenChange: fn(),
  },
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const Destructive: Story = {
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Account</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete your account? This action is permanent and cannot be
            undone. All your data, including projects, settings, and personal information will be
            permanently removed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-destructive hover:bg-destructive/90">
            Delete Account
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const Confirmation: Story = {
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger asChild>
        <Button>Save Changes</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Save Changes?</AlertDialogTitle>
          <AlertDialogDescription>
            You have unsaved changes. Would you like to save them before leaving this page?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Don&apos;t Save</AlertDialogCancel>
          <AlertDialogAction>Save Changes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const Warning: Story = {
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">⚠️ Proceed with Caution</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>⚠️ Warning: Potential Data Loss</AlertDialogTitle>
          <AlertDialogDescription>
            This operation will modify your production database. Please ensure you have a recent
            backup before proceeding. This action may affect live users and system performance.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-orange-600 text-white hover:bg-orange-700">
            I Understand, Proceed
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const Information: Story = {
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger asChild>
        <Button variant="secondary">Show Info</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>ℹ️ Important Information</AlertDialogTitle>
          <AlertDialogDescription>
            Your subscription will expire in 3 days. To continue using all features, please update
            your payment method or renew your subscription.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Remind Me Later</AlertDialogCancel>
          <AlertDialogAction>Update Subscription</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const SingleAction: Story = {
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Notice</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Update Complete</AlertDialogTitle>
          <AlertDialogDescription>
            Your application has been successfully updated to version 2.1.0. New features and
            improvements are now available.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Got it</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const LongContent: Story = {
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">View Terms</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>Terms and Conditions</AlertDialogTitle>
          <AlertDialogDescription>
            Please read and accept our terms and conditions to continue.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="py-4 text-sm space-y-4">
          <div>
            <h4 className="font-semibold mb-2">1. Acceptance of Terms</h4>
            <p className="text-muted-foreground">
              By accessing and using this service, you accept and agree to be bound by the terms and
              provision of this agreement.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">2. Use License</h4>
            <p className="text-muted-foreground">
              Permission is granted to temporarily download one copy of the materials on our website
              for personal, non-commercial transitory viewing only.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">3. Disclaimer</h4>
            <p className="text-muted-foreground">
              The materials on our website are provided on an &apos;as is&apos; basis. We make no
              warranties, expressed or implied, and hereby disclaim and negate all other warranties.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">4. Limitations</h4>
            <p className="text-muted-foreground">
              In no event shall our company or its suppliers be liable for any damages arising out
              of the use or inability to use the materials on our website.
            </p>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Decline</AlertDialogCancel>
          <AlertDialogAction>Accept Terms</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const CustomStyling: Story = {
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger asChild>
        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          🎉 Celebrate
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="border-2 border-purple-200">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            🎉 Congratulations!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            You&apos;ve successfully completed all tasks! Your hard work has paid off. Ready to take
            on the next challenge?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Take a Break</AlertDialogCancel>
          <AlertDialogAction className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600">
            Next Challenge
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

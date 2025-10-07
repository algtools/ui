import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Banner, BannerIcon, BannerTitle, BannerAction, BannerClose } from '@/components/ui/banner';
import { XIcon } from 'lucide-react';

describe('Banner', () => {
  function renderUncontrolled(onClose?: () => void) {
    return render(
      <Banner data-testid="banner" onClose={onClose}>
        <BannerIcon icon={XIcon} />
        <BannerTitle>Important notice</BannerTitle>
        <BannerAction onClick={() => {}}>Action</BannerAction>
        <BannerClose aria-label="Close" />
      </Banner>
    );
  }

  it('renders its children content', () => {
    renderUncontrolled();
    expect(screen.getByText('Important notice')).toBeInTheDocument();
  });

  it('hides after clicking close in uncontrolled mode and calls onClose', async () => {
    const user = userEvent.setup();
    const handleClose = jest.fn();
    renderUncontrolled(handleClose);

    await user.click(screen.getByLabelText('Close'));

    expect(handleClose).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('Important notice')).not.toBeInTheDocument();
  });

  it('remains visible when controlled and still calls onClose', async () => {
    const user = userEvent.setup();
    const handleClose = jest.fn();

    render(
      <Banner visible onClose={handleClose}>
        <BannerTitle>Controlled banner</BannerTitle>
        <BannerClose aria-label="Close" />
      </Banner>
    );

    await user.click(screen.getByLabelText('Close'));

    expect(handleClose).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Controlled banner')).toBeInTheDocument();
  });

  it('supports the inset style', () => {
    render(
      <Banner data-testid="banner" inset>
        <BannerTitle>Inset</BannerTitle>
      </Banner>
    );

    expect(screen.getByTestId('banner').className).toMatch(/rounded-lg/);
  });

  it('renders an action button that can be clicked', async () => {
    const user = userEvent.setup();
    const onAction = jest.fn();

    render(
      <Banner>
        <BannerTitle>Action test</BannerTitle>
        <BannerAction onClick={onAction}>Do it</BannerAction>
        <BannerClose aria-label="Close" />
      </Banner>
    );

    await user.click(screen.getByRole('button', { name: 'Do it' }));
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('does not render when visible is false', () => {
    const { container } = render(
      <Banner visible={false}>
        <BannerTitle>Hidden</BannerTitle>
      </Banner>
    );
    expect(container).toBeEmptyDOMElement();
  });
});

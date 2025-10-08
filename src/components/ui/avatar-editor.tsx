'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Upload,
  RotateCw,
  RotateCcw,
  Save,
  Trash2,
  Loader2,
  ZoomIn,
  ZoomOut,
  ImageIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AvatarEditorProps {
  /** Current avatar URL or null */
  currentAvatar?: string | null;
  /** Async function to save the avatar - receives base64 data URL */
  onSave?: (avatarDataUrl: string) => Promise<void>;
  /** Function called when avatar is discarded */
  onDiscard: () => void;
  /** Function called when avatar is changed */
  onChange?: (avatarDataUrl: string) => void;
  /** Border radius for the avatar preview (0 = square, 50 = circle) */
  borderRadius?: number;
  /** Size of the editor canvas */
  size?: number;
  /** Quality of the output image (0-1) */
  quality?: number;
  /** CSS class name for the container */
  className?: string;
  /** Allowed image types */
  allowedTypes?: string[];
  /** Labels for the component */
  labels?: {
    uploadPrompt?: string;
    controlsPlaceholder?: string;
    allowedTypesLabel?: string;
    save?: string;
    discard?: string;
    zoomIn?: string;
    zoomOut?: string;
    rotateClockwise?: string;
    rotateCounterClockwise?: string;
  };
}

function AvatarEditor({
  currentAvatar,
  onSave,
  onChange,
  onDiscard,
  borderRadius = 50,
  size = 300,
  quality = 0.9,
  className,
  allowedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  labels = {
    uploadPrompt: 'Haz clic para subir imagen',
    controlsPlaceholder: 'Agrega una imagen para poder editarla',
    allowedTypesLabel: 'Tipos permitidos',
    save: 'Guardar',
    discard: 'Eliminar',
    zoomIn: 'Acercar',
    zoomOut: 'Alejar',
    rotateClockwise: 'Rotar a la derecha',
    rotateCounterClockwise: 'Rotar a la izquierda',
  },
}: AvatarEditorProps) {
  const [image, setImage] = React.useState<HTMLImageElement | null>(null);
  const [scale, setScale] = React.useState(1);
  const [rotation, setRotation] = React.useState(0);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = React.useState(false);

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const imageSourceRef = React.useRef<'prop' | 'user' | null>(null);
  const hasUserEditedRef = React.useRef(false);

  // Load current avatar on mount
  React.useEffect(() => {
    if (currentAvatar) {
      loadImageFromUrl(currentAvatar);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAvatar]);

  const loadImageFromUrl = (url: string) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageSourceRef.current = 'prop';
      hasUserEditedRef.current = false;
      setImage(img);
      const imgAspectRatio = img.width / img.height;
      const canvasAspectRatio = 1;

      let minScale;
      if (imgAspectRatio > canvasAspectRatio) {
        minScale = size / img.height;
      } else {
        minScale = size / img.width;
      }

      setScale(minScale);
      setRotation(0);
      setPosition({ x: 0, y: 0 });
    };
    img.src = url;
  };

  const resetTransforms = () => {
    const minScale = getMinScaleForImage();
    setScale(minScale);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  const getMinScaleForImage = () => {
    if (!image) return 1;

    const imgAspectRatio = image.width / image.height;
    const canvasAspectRatio = 1; // Canvas is square

    if (imgAspectRatio > canvasAspectRatio) {
      // Image is wider - scale so height covers canvas
      return size / image.height;
    } else {
      // Image is taller - scale so width covers canvas
      return size / image.width;
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      console.warn(
        `File type ${file.type} is not allowed. Allowed types: ${allowedTypes.join(', ')}`
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        imageSourceRef.current = 'user';
        setImage(img);
        const imgAspectRatio = img.width / img.height;
        const canvasAspectRatio = 1;

        let minScale;
        if (imgAspectRatio > canvasAspectRatio) {
          minScale = size / img.height;
        } else {
          minScale = size / img.width;
        }

        setScale(minScale);
        setRotation(0);
        setPosition({ x: 0, y: 0 });
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const drawCanvas = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, size, size);
    ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transformation matrix

    // Save context
    ctx.save();

    // Move to center
    ctx.translate(size / 2, size / 2);

    // Apply rotation
    ctx.rotate((rotation * Math.PI) / 180);

    // Apply scale and position
    ctx.scale(scale, scale);
    ctx.translate(position.x, position.y);

    // Draw image centered
    const imgWidth = image.width;
    const imgHeight = image.height;
    ctx.drawImage(image, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);

    // Restore context
    ctx.restore();

    if (image) {
      ctx.save();
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;
      ctx.lineCap = 'butt';
      ctx.lineJoin = 'miter';

      // Draw vertical lines
      for (let i = 1; i < 3; i++) {
        const x = (size / 3) * i;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, size);
        ctx.stroke();
      }

      // Draw horizontal lines
      for (let i = 1; i < 3; i++) {
        const y = (size / 3) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(size, y);
        ctx.stroke();
      }

      ctx.restore();
    }
  }, [image, scale, rotation, position, size]);

  React.useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  const getMinScale = React.useCallback(() => {
    if (!image) return 0.1;

    const imgAspectRatio = image.width / image.height;
    const canvasAspectRatio = 1; // Canvas is square

    if (imgAspectRatio > canvasAspectRatio) {
      // Image is wider - scale so height covers canvas
      return size / image.height;
    } else {
      // Image is taller - scale so width covers canvas
      return size / image.width;
    }
  }, [image, size]);

  const getPositionConstraints = React.useCallback(() => {
    if (!image) return { minX: 0, maxX: 0, minY: 0, maxY: 0 };

    const scaledWidth = image.width * scale;
    const scaledHeight = image.height * scale;

    // Maximum distance from center before borders show
    const maxX = Math.max(0, (scaledWidth - size) / (2 * scale));
    const maxY = Math.max(0, (scaledHeight - size) / (2 * scale));

    return {
      minX: -maxX,
      maxX: maxX,
      minY: -maxY,
      maxY: maxY,
    };
  }, [image, scale, size]);

  const constrainPosition = React.useCallback(
    (newPosition: { x: number; y: number }) => {
      const constraints = getPositionConstraints();
      return {
        x: Math.max(constraints.minX, Math.min(constraints.maxX, newPosition.x)),
        y: Math.max(constraints.minY, Math.min(constraints.maxY, newPosition.y)),
      };
    },
    [getPositionConstraints]
  );

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!image) return;
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(true);
    setDragStart({
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    });

    event.currentTarget.style.pointerEvents = 'auto';
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !image) return;

    const newPosition = {
      x: event.clientX - dragStart.x,
      y: event.clientY - dragStart.y,
    };

    setPosition(constrainPosition(newPosition));
    hasUserEditedRef.current = true;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSave = async () => {
    if (!image || !onSave) return;

    setIsLoading(true);
    try {
      const dataUrl = getEditedImage();
      if (dataUrl) {
        await onSave(dataUrl);
      }
    } catch (error) {
      console.error('Failed to save avatar:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDiscard = () => {
    setImage(null);
    resetTransforms();
    imageSourceRef.current = null;
    hasUserEditedRef.current = false;

    // Clear the canvas completely
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, size, size);
      }
    }

    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    onDiscard();
  };

  const handleRotateClockwise = () => {
    setRotation((prev) => (prev + 90) % 360);
    hasUserEditedRef.current = true;
  };

  const handleRotateCounterClockwise = () => {
    setRotation((prev) => (prev - 90 + 360) % 360);
    hasUserEditedRef.current = true;
  };

  const handleCircleClick = (event: React.MouseEvent) => {
    if (isDragging || image) return;
    event.preventDefault();
    fileInputRef.current?.click();
  };

  const handleScaleChange = (newScale: number) => {
    const minScale = getMinScale();
    const constrainedScale = Math.max(minScale, Math.min(3, newScale));

    setScale(constrainedScale);
    hasUserEditedRef.current = true;

    const scaledWidth = image!.width * constrainedScale;
    const scaledHeight = image!.height * constrainedScale;

    const maxX = Math.max(0, (scaledWidth - size) / (2 * constrainedScale));
    const maxY = Math.max(0, (scaledHeight - size) / (2 * constrainedScale));

    const constrainedPosition = {
      x: Math.max(-maxX, Math.min(maxX, position.x)),
      y: Math.max(-maxY, Math.min(maxY, position.y)),
    };

    setPosition(constrainedPosition);
  };

  const handleZoomIn = () => {
    const newScale = Math.min(3, scale + 0.2);
    handleScaleChange(newScale);
  };

  const handleZoomOut = () => {
    const minScale = getMinScale();
    const newScale = Math.max(minScale, scale - 0.2);
    handleScaleChange(newScale);
  };

  const getEditedImage = React.useCallback(() => {
    if (!image) return null;

    // Create a temporary canvas for the clean image without grid
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = size;
    tempCanvas.height = size;
    const tempCtx = tempCanvas.getContext('2d');

    if (!tempCtx) return null;

    // Clear and reset
    tempCtx.clearRect(0, 0, size, size);
    tempCtx.setTransform(1, 0, 0, 1, 0, 0);

    // Save context
    tempCtx.save();

    // Move to center
    tempCtx.translate(size / 2, size / 2);

    // Apply rotation
    tempCtx.rotate((rotation * Math.PI) / 180);

    // Apply scale and position
    tempCtx.scale(scale, scale);
    tempCtx.translate(position.x, position.y);

    // Draw image centered (without grid)
    const imgWidth = image.width;
    const imgHeight = image.height;
    tempCtx.drawImage(image, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);

    // Restore context
    tempCtx.restore();

    return tempCanvas.toDataURL('image/png', quality);
  }, [image, scale, rotation, position, size, quality]);

  // Notify parent when the edited image changes
  React.useEffect(() => {
    if (!onChange || !image) return;

    // Fire when: user uploaded an image OR user has edited a prop-loaded image
    const shouldNotify =
      imageSourceRef.current === 'user' ||
      (imageSourceRef.current === 'prop' && hasUserEditedRef.current);

    if (!shouldNotify) return;

    const dataUrl = getEditedImage();
    if (dataUrl) {
      onChange(dataUrl);
    }
  }, [getEditedImage, onChange, image]);

  return (
    <div className={cn('p-6 mx-auto', className)} style={{ width: size + 48 }}>
      <div className="space-y-4">
        {/* Canvas Preview */}
        <div className="flex justify-center">
          <div
            className="relative border-2 border-dashed border-border overflow-hidden transition-colors"
            style={{
              width: size,
              height: size,
              borderRadius: `${borderRadius}%`,
            }}
          >
            <canvas
              ref={canvasRef}
              width={size}
              height={size}
              className={image ? 'cursor-move' : 'cursor-pointer'}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onClick={!image ? handleCircleClick : undefined}
            />
            {!image && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-muted/50 cursor-pointer hover:bg-muted/70 transition-colors"
                onClick={handleCircleClick}
              >
                <div className="text-center text-muted-foreground">
                  <Upload className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">{labels.uploadPrompt}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept={allowedTypes.join(',')}
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="h-16 flex flex-col justify-center space-y-3">
          {image ? (
            <>
              {/* Scale slider spanning full width */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleZoomOut}
                  disabled={scale <= getMinScale()}
                  className="h-8 w-8 p-0 bg-transparent shrink-0"
                  title={labels.zoomOut}
                >
                  <ZoomOut className="w-3 h-3" />
                </Button>
                <Slider
                  value={[scale]}
                  onValueChange={(value) => handleScaleChange(value[0])}
                  min={getMinScale()}
                  max={3}
                  step={0.1}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleZoomIn}
                  disabled={scale >= 3}
                  className="h-8 w-8 p-0 shrink-0"
                  title={labels.zoomIn}
                >
                  <ZoomIn className="w-3 h-3" />
                </Button>
              </div>

              {/* Action buttons row */}
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRotateCounterClockwise}
                  className="h-8 w-8 p-0 bg-transparent"
                  title={labels.rotateCounterClockwise}
                >
                  <RotateCcw className="w-3 h-3" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRotateClockwise}
                  className="h-8 w-8 p-0 bg-transparent"
                  title={labels.rotateClockwise}
                >
                  <RotateCw className="w-3 h-3" />
                </Button>
                <div className="w-px h-6 bg-border mx-1" />
                {onSave && (
                  <Button
                    onClick={handleSave}
                    disabled={isLoading}
                    size="sm"
                    className="h-8 px-3"
                    title={labels.save}
                  >
                    {isLoading ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Save className="w-3 h-3" />
                    )}
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={handleDiscard}
                  disabled={isLoading}
                  size="sm"
                  className="h-8 w-8 p-0 bg-transparent"
                  title={labels.discard}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <ImageIcon className="w-4 h-4" />
                <p className="text-sm">{labels.controlsPlaceholder}</p>
              </div>
              <p className="text-xs text-muted-foreground/70">
                {labels.allowedTypesLabel}:{' '}
                {allowedTypes.map((type) => type.split('/')[1]).join(', ')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export { AvatarEditor };

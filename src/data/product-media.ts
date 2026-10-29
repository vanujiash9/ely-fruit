export type DesktopImageVariant = 'landscape' | 'portrait'

export interface ProductMedia {
  fallback: string
  desktop: string
  mobile: string
  isOptimized: boolean
  width: number
  height: number
}

const FALLBACK_DIMENSIONS = { width: 1200, height: 1500 }
const OPTIMIZED_DIRECTORY = '/products/optimized'

function getImageId(path: string): string {
  const filename = path.split('/').pop() ?? ''
  return filename.replace(/\.[^.]+$/, '')
}

export function getProductMedia(fallback: string, desktopVariant: DesktopImageVariant): ProductMedia {
  if (!fallback.startsWith('/products/')) {
    return {
      fallback,
      desktop: fallback,
      mobile: fallback,
      isOptimized: false,
      ...FALLBACK_DIMENSIONS,
    }
  }

  const id = getImageId(fallback)

  return {
    fallback,
    desktop: `${OPTIMIZED_DIRECTORY}/${id}-desktop-${desktopVariant}.webp`,
    mobile: `${OPTIMIZED_DIRECTORY}/${id}-mobile.webp`,
    isOptimized: true,
    ...FALLBACK_DIMENSIONS,
  }
}

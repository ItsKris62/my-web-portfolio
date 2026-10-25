export const LANYARD_VIEW_BOX = {
  width: 252,
  height: 164,
} as const

export const BADGE_SCENE_DESIGN_WIDTH = 318

export const joinAnchor = {
  x: 126,
  y: 140,
} as const

export const LANYARD_PATHS = {
  desktop: {
    left: `M -72 -560 C -54 -350, -10 -94, 20 5 C 31 53, 57 96, 112 128 C 120 134, 130 136, ${joinAnchor.x} ${joinAnchor.y}`,
    right: `M 340 -560 C 314 -348, 275 -88, 232 5 C 222 54, 196 96, 140 128 C 132 134, 122 136, ${joinAnchor.x} ${joinAnchor.y}`,
    rightText: `M ${joinAnchor.x} ${joinAnchor.y} C 122 136, 132 134, 140 128 C 196 96, 222 54, 232 5 C 275 -88, 314 -348, 340 -560`,
  },
  mobile: {
    left: `M -280 -560 C -282 -350, -280 -120, -278 -18 C -228 50, 4 108, 112 128 C 120 134, 130 136, ${joinAnchor.x} ${joinAnchor.y}`,
    right: `M 532 -560 C 534 -350, 532 -120, 530 -18 C 480 50, 248 108, 140 128 C 132 134, 122 136, ${joinAnchor.x} ${joinAnchor.y}`,
  },
} as const

export const LANYARD_LAYOUT = {
  widthPercent: (LANYARD_VIEW_BOX.width / BADGE_SCENE_DESIGN_WIDTH) * 100,
  joinXPercent: (joinAnchor.x / LANYARD_VIEW_BOX.width) * 100,
  joinYPercent: (joinAnchor.y / BADGE_SCENE_DESIGN_WIDTH) * 100,
} as const

export const HARDWARE_GEOMETRY = {
  viewBoxWidth: 76,
  ringContactY: 95.5,
  holderSlotYAtViewBoxScale: 19,
  renderedWidth: 70,
} as const

export const HARDWARE_TO_HOLDER_RATIO = (
  HARDWARE_GEOMETRY.ringContactY - HARDWARE_GEOMETRY.holderSlotYAtViewBoxScale
) / HARDWARE_GEOMETRY.viewBoxWidth

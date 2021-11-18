import type { Point } from "@ui-machines/point-utils"
import type { Rect, RectSide } from "./types"

export function closestSideToRect(ref: Rect, r: Rect): RectSide {
  if (r.maxX <= ref.minX) return "left"
  if (r.minX >= ref.maxX) return "right"
  if (r.maxY <= ref.minY) return "top"
  if (r.minY >= ref.maxY) return "bottom"
  return "left"
}

export function closestSideToPoint(ref: Rect, p: Point): RectSide {
  const { x, y } = p
  const dl = x - ref.x
  const dr = ref.maxX - x
  const dt = y - ref.y
  const db = ref.maxY - y
  let closest = dl
  let side: RectSide = "left"
  if (dr < closest) {
    closest = dr
    side = "right"
  }
  if (dt < closest) {
    closest = dt
    side = "top"
  }
  if (db < closest) {
    side = "bottom"
  }
  return side
}

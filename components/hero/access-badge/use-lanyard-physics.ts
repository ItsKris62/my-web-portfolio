'use client'

import { useCallback, useEffect, useRef } from 'react'

const MAX_DELTA_TIME = 1 / 30
const RESTING_HOLDER_POSE = {
  x: 0,
  rotateX: 1.4,
  rotateY: -3.2,
  rotateZ: -4.2,
  lightX: 31,
  lightY: 20,
} as const

// ── Gyroscope / device motion constants ────────────────────
/** Max tilt angle in degrees mapped to ±1 normalised coordinate */
const GYRO_TILT_RANGE = 25
/** Subtle gyro influence factor (0–1 scale; keeps movement natural and restrained) */
const GYRO_INFLUENCE = 0.42
/** Acceleration threshold to register a deliberate phone shake (m/s²) */
const SHAKE_THRESHOLD = 19
/** Minimum cooldown between shake impulses in milliseconds */
const SHAKE_COOLDOWN_MS = 800
/** Subtle impulse delivered on shake */
const SHAKE_IMPULSE = 1.8

interface SpringValue {
  value: number
  velocity: number
}

interface LanyardPhysicsState {
  strapX: SpringValue
  strapRotateZ: SpringValue
  strapLightPosition: SpringValue
  hardwareX: SpringValue
  hardwareRotateY: SpringValue
  hardwareRotateZ: SpringValue
  holderX: SpringValue
  holderRotateX: SpringValue
  holderRotateY: SpringValue
  holderRotateZ: SpringValue
  holderLightX: SpringValue
  holderLightY: SpringValue
}

interface PointerTarget {
  x: number
  y: number
  strapInfluence: number
}

export interface LanyardPhysicsFrame {
  strap: {
    x: number
    rotateZ: number
    lightPosition: number
  }
  hardware: {
    x: number
    rotateY: number
    rotateZ: number
  }
  holder: {
    x: number
    rotateX: number
    rotateY: number
    rotateZ: number
    lightX: number
    lightY: number
  }
}

interface UseLanyardPhysicsOptions {
  disabled?: boolean
  onFrame: (frame: LanyardPhysicsFrame) => void
}

function spring(value: number): SpringValue {
  return { value, velocity: 0 }
}

function createRestingState(): LanyardPhysicsState {
  return {
    strapX: spring(0),
    strapRotateZ: spring(0),
    strapLightPosition: spring(0),
    hardwareX: spring(0),
    hardwareRotateY: spring(0),
    hardwareRotateZ: spring(0),
    holderX: spring(RESTING_HOLDER_POSE.x),
    holderRotateX: spring(RESTING_HOLDER_POSE.rotateX),
    holderRotateY: spring(RESTING_HOLDER_POSE.rotateY),
    holderRotateZ: spring(RESTING_HOLDER_POSE.rotateZ),
    holderLightX: spring(RESTING_HOLDER_POSE.lightX),
    holderLightY: spring(RESTING_HOLDER_POSE.lightY),
  }
}

function integrateSpring(
  current: SpringValue,
  target: number,
  deltaTime: number,
  stiffness: number,
  damping: number,
) {
  const acceleration = (target - current.value) * stiffness - current.velocity * damping
  current.velocity += acceleration * deltaTime
  current.value += current.velocity * deltaTime
}

function springError(current: SpringValue, target: number) {
  return Math.max(Math.abs(target - current.value), Math.abs(current.velocity) * 0.02)
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function toFrame(state: LanyardPhysicsState): LanyardPhysicsFrame {
  return {
    strap: {
      x: state.strapX.value,
      rotateZ: state.strapRotateZ.value,
      lightPosition: state.strapLightPosition.value,
    },
    hardware: {
      x: state.hardwareX.value,
      rotateY: state.hardwareRotateY.value,
      rotateZ: state.hardwareRotateZ.value,
    },
    holder: {
      x: state.holderX.value,
      rotateX: state.holderRotateX.value,
      rotateY: state.holderRotateY.value,
      rotateZ: state.holderRotateZ.value,
      lightX: state.holderLightX.value,
      lightY: state.holderLightY.value,
    },
  }
}

export function useLanyardPhysics({ disabled = false, onFrame }: UseLanyardPhysicsOptions) {
  const stateRef = useRef(createRestingState())
  const targetRef = useRef<PointerTarget>({ x: 0, y: 0, strapInfluence: 1 })
  const frameRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number | null>(null)
  const onFrameRef = useRef(onFrame)

  // Gyroscope tracking refs
  const pointerActiveRef = useRef(false)
  const lastShakeRef = useRef(0)
  const smoothGyroRef = useRef({ x: 0, y: 0 })
  const orientationAttachedRef = useRef(false)

  useEffect(() => {
    onFrameRef.current = onFrame
  }, [onFrame])

  const stop = useCallback(() => {
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }
    lastTimeRef.current = null
  }, [])

  const animate = useCallback((time: number) => {
    const previousTime = lastTimeRef.current ?? time - 1000 / 60
    const deltaTime = Math.min(MAX_DELTA_TIME, Math.max(1 / 240, (time - previousTime) / 1000))
    lastTimeRef.current = time

    const state = stateRef.current
    const pointer = targetRef.current

    // Subtle, realistic swing multipliers
    const strapTarget = {
      x: pointer.x * 6.5 * pointer.strapInfluence,
      rotateZ: pointer.x * 2.3 * pointer.strapInfluence,
      lightPosition: (pointer.y * 3.2 + pointer.x * 1.2) * pointer.strapInfluence,
    }

    integrateSpring(state.strapX, strapTarget.x, deltaTime, 215, 27)
    integrateSpring(state.strapRotateZ, strapTarget.rotateZ, deltaTime, 205, 26)
    integrateSpring(state.strapLightPosition, strapTarget.lightPosition, deltaTime, 235, 28)

    const hardwareTarget = {
      x: state.strapX.value * 0.74,
      rotateY: pointer.x * 1.7,
      rotateZ: state.strapRotateZ.value * 0.78,
    }
    integrateSpring(state.hardwareX, hardwareTarget.x, deltaTime, 150, 22)
    integrateSpring(state.hardwareRotateY, hardwareTarget.rotateY, deltaTime, 145, 21)
    integrateSpring(state.hardwareRotateZ, hardwareTarget.rotateZ, deltaTime, 145, 21)

    const holderTarget = {
      x: state.hardwareX.value * 0.90,
      rotateX: RESTING_HOLDER_POSE.rotateX - pointer.y * 2.1,
      rotateY: RESTING_HOLDER_POSE.rotateY + pointer.x * 2.8 + state.hardwareRotateY.value * 0.19,
      rotateZ: RESTING_HOLDER_POSE.rotateZ + state.hardwareRotateZ.value * 0.86,
      lightX: RESTING_HOLDER_POSE.lightX + pointer.x * 15,
      lightY: RESTING_HOLDER_POSE.lightY + pointer.y * 10,
    }
    integrateSpring(state.holderX, holderTarget.x, deltaTime, 114, 19)
    integrateSpring(state.holderRotateX, holderTarget.rotateX, deltaTime, 110, 19)
    integrateSpring(state.holderRotateY, holderTarget.rotateY, deltaTime, 108, 19)
    integrateSpring(state.holderRotateZ, holderTarget.rotateZ, deltaTime, 105, 18.5)
    integrateSpring(state.holderLightX, holderTarget.lightX, deltaTime, 125, 21)
    integrateSpring(state.holderLightY, holderTarget.lightY, deltaTime, 125, 21)

    onFrameRef.current(toFrame(state))

    const remaining = Math.max(
      springError(state.strapX, strapTarget.x),
      springError(state.strapRotateZ, strapTarget.rotateZ),
      springError(state.strapLightPosition, strapTarget.lightPosition),
      springError(state.hardwareX, hardwareTarget.x),
      springError(state.hardwareRotateY, hardwareTarget.rotateY),
      springError(state.hardwareRotateZ, hardwareTarget.rotateZ),
      springError(state.holderX, holderTarget.x),
      springError(state.holderRotateX, holderTarget.rotateX),
      springError(state.holderRotateY, holderTarget.rotateY),
      springError(state.holderRotateZ, holderTarget.rotateZ),
      springError(state.holderLightX, holderTarget.lightX) / 4,
      springError(state.holderLightY, holderTarget.lightY) / 4,
    )

    if (remaining > 0.006) {
      frameRef.current = window.requestAnimationFrame(animate)
    } else {
      frameRef.current = null
      lastTimeRef.current = null
    }
  }, [])

  const start = useCallback(() => {
    if (disabled || frameRef.current !== null) return
    frameRef.current = window.requestAnimationFrame(animate)
  }, [animate, disabled])

  const setPointerTarget = useCallback((x: number, y: number, strapInfluence = 1) => {
    targetRef.current = {
      x: clamp(x, -1, 1),
      y: clamp(y, -1, 1),
      strapInfluence: clamp(strapInfluence, 0, 1),
    }
    start()
  }, [start])

  const release = useCallback((velocityX = 0, velocityY = 0) => {
    targetRef.current = { x: 0, y: 0, strapInfluence: 1 }
    if (disabled) return

    const state = stateRef.current
    // Clamped release impulse for natural settling
    const xVelocity = clamp(velocityX, -3, 3)
    const yVelocity = clamp(velocityY, -3, 3)
    state.strapX.velocity += xVelocity * 5.2
    state.strapRotateZ.velocity += xVelocity * 2.2
    state.strapLightPosition.velocity += (yVelocity * 3 + xVelocity) * 0.65
    state.hardwareX.velocity += xVelocity * 3.4
    state.hardwareRotateY.velocity += xVelocity * 1.2
    state.hardwareRotateZ.velocity += xVelocity * 1.6
    state.holderX.velocity += xVelocity * 2.4
    state.holderRotateX.velocity -= yVelocity * 1.5
    state.holderRotateY.velocity += xVelocity * 1.8
    state.holderRotateZ.velocity += xVelocity * 1.9
    start()
  }, [disabled, start])

  // Orientation listener implementation
  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    // If user is actively touching or dragging, prioritize touch
    if (pointerActiveRef.current) return

    const gamma = event.gamma ?? 0 // Left/right tilt in degrees [-90, 90]
    const beta = event.beta ?? 0   // Front/back tilt in degrees [-180, 180]

    // Normalise tilt values (45° is typical phone hold elevation angle)
    const nx = clamp(gamma / GYRO_TILT_RANGE, -1, 1)
    const ny = clamp((beta - 45) / GYRO_TILT_RANGE, -1, 1)

    // Smooth low-pass filter to reject noisy IMU jitter
    smoothGyroRef.current.x += (nx - smoothGyroRef.current.x) * 0.12
    smoothGyroRef.current.y += (ny - smoothGyroRef.current.y) * 0.12

    setPointerTarget(
      smoothGyroRef.current.x * GYRO_INFLUENCE,
      smoothGyroRef.current.y * GYRO_INFLUENCE,
      0.55,
    )
  }, [setPointerTarget])

  // User gesture handler for iOS 13+ permission requests
  const requestOrientationPermission = useCallback(async () => {
    if (disabled || typeof window === 'undefined') return
    const DOE = DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<string>
    }
    if (typeof DOE.requestPermission === 'function' && !orientationAttachedRef.current) {
      try {
        const response = await DOE.requestPermission()
        if (response === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation, { passive: true })
          orientationAttachedRef.current = true
        }
      } catch {
        // User dismissed or permission denied; gracefully continue
      }
    }
  }, [disabled, handleOrientation])

  // Gyroscope registration effect (standard devices without explicit prompt)
  useEffect(() => {
    if (disabled || typeof window === 'undefined') return

    const isTouchDevice = 'ontouchstart' in window || (navigator.maxTouchPoints ?? 0) > 0
    if (!isTouchDevice) return

    const DOE = DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<string>
    }

    // On standard Android / non-permission platforms, attach directly
    if (typeof DOE.requestPermission !== 'function') {
      window.addEventListener('deviceorientation', handleOrientation, { passive: true })
      orientationAttachedRef.current = true
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation)
      orientationAttachedRef.current = false
    }
  }, [disabled, handleOrientation])

  // Device motion shake detection effect
  useEffect(() => {
    if (disabled || typeof window === 'undefined') return

    const isTouchDevice = 'ontouchstart' in window || (navigator.maxTouchPoints ?? 0) > 0
    if (!isTouchDevice) return

    const handleMotion = (event: DeviceMotionEvent) => {
      if (pointerActiveRef.current) return

      const accel = event.accelerationIncludingGravity
      if (!accel) return

      const ax = accel.x ?? 0
      const ay = accel.y ?? 0
      const az = accel.z ?? 0
      const magnitude = Math.sqrt(ax * ax + ay * ay + az * az)

      if (magnitude > SHAKE_THRESHOLD) {
        const now = Date.now()
        if (now - lastShakeRef.current > SHAKE_COOLDOWN_MS) {
          lastShakeRef.current = now
          const kickDirection = (ax > 0 ? -1 : 1)
          release(kickDirection * SHAKE_IMPULSE, -0.4)
        }
      }
    }

    window.addEventListener('devicemotion', handleMotion, { passive: true })
    return () => {
      window.removeEventListener('devicemotion', handleMotion)
    }
  }, [disabled, release])

  useEffect(() => {
    if (!disabled) return
    stop()
    targetRef.current = { x: 0, y: 0, strapInfluence: 1 }
    stateRef.current = createRestingState()
    onFrameRef.current(toFrame(stateRef.current))
  }, [disabled, stop])

  useEffect(() => stop, [stop])

  return { release, setPointerTarget, pointerActiveRef, requestOrientationPermission }
}
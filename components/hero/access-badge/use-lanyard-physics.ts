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
    const strapTarget = {
      x: pointer.x * 10 * pointer.strapInfluence,
      rotateZ: pointer.x * 3.4 * pointer.strapInfluence,
      lightPosition: (pointer.y * 4.5 + pointer.x * 1.5) * pointer.strapInfluence,
    }

    integrateSpring(state.strapX, strapTarget.x, deltaTime, 215, 25)
    integrateSpring(state.strapRotateZ, strapTarget.rotateZ, deltaTime, 205, 24)
    integrateSpring(state.strapLightPosition, strapTarget.lightPosition, deltaTime, 235, 27)

    const hardwareTarget = {
      x: state.strapX.value * 0.78,
      rotateY: pointer.x * 2.3,
      rotateZ: state.strapRotateZ.value * 0.82,
    }
    integrateSpring(state.hardwareX, hardwareTarget.x, deltaTime, 150, 21)
    integrateSpring(state.hardwareRotateY, hardwareTarget.rotateY, deltaTime, 145, 20)
    integrateSpring(state.hardwareRotateZ, hardwareTarget.rotateZ, deltaTime, 145, 20)

    const holderTarget = {
      x: state.hardwareX.value * 0.92,
      rotateX: RESTING_HOLDER_POSE.rotateX - pointer.y * 2.7,
      rotateY: RESTING_HOLDER_POSE.rotateY + pointer.x * 3.6 + state.hardwareRotateY.value * 0.22,
      rotateZ: RESTING_HOLDER_POSE.rotateZ + state.hardwareRotateZ.value * 0.94,
      lightX: RESTING_HOLDER_POSE.lightX + pointer.x * 18,
      lightY: RESTING_HOLDER_POSE.lightY + pointer.y * 12,
    }
    integrateSpring(state.holderX, holderTarget.x, deltaTime, 112, 18)
    integrateSpring(state.holderRotateX, holderTarget.rotateX, deltaTime, 108, 18)
    integrateSpring(state.holderRotateY, holderTarget.rotateY, deltaTime, 106, 18)
    integrateSpring(state.holderRotateZ, holderTarget.rotateZ, deltaTime, 104, 17.5)
    integrateSpring(state.holderLightX, holderTarget.lightX, deltaTime, 125, 20)
    integrateSpring(state.holderLightY, holderTarget.lightY, deltaTime, 125, 20)

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
    const xVelocity = clamp(velocityX, -4, 4)
    const yVelocity = clamp(velocityY, -4, 4)
    state.strapX.velocity += xVelocity * 8
    state.strapRotateZ.velocity += xVelocity * 3.2
    state.strapLightPosition.velocity += (yVelocity * 4 + xVelocity) * 0.8
    state.hardwareX.velocity += xVelocity * 5
    state.hardwareRotateY.velocity += xVelocity * 1.6
    state.hardwareRotateZ.velocity += xVelocity * 2.3
    state.holderX.velocity += xVelocity * 3.5
    state.holderRotateX.velocity -= yVelocity * 2
    state.holderRotateY.velocity += xVelocity * 2.6
    state.holderRotateZ.velocity += xVelocity * 2.8
    start()
  }, [disabled, start])

  useEffect(() => {
    if (!disabled) return
    stop()
    targetRef.current = { x: 0, y: 0, strapInfluence: 1 }
    stateRef.current = createRestingState()
    onFrameRef.current(toFrame(stateRef.current))
  }, [disabled, stop])

  useEffect(() => stop, [stop])

  return { release, setPointerTarget }
}

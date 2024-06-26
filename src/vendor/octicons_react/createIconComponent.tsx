import React, { ForwardedRef, SVGProps } from "react"

const sizeMap = {
  small: 16,
  medium: 32,
  large: 64,
}

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: "small" | "medium" | "large" | number
  className?: string
  transform?: string
  verticalAlign?: string
  title?: string
}

interface SVGData {
  width: number
  path: React.ReactNode
}

type SVGDataByHeight = Record<string, SVGData>

export function createIconComponent(
  name: string,
  defaultClassName: string,
  getSVGData: () => SVGDataByHeight
) {
  const svgDataByHeight = getSVGData()
  const heights = Object.keys(svgDataByHeight)

  const Icon = React.forwardRef<SVGSVGElement, IconProps>(
    (
      {
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledBy,
        tabIndex,
        className = defaultClassName,
        fill = "currentColor",
        size = 16,
        verticalAlign = "text-bottom",
        id,
        title,
        transform = "rotate(0deg)",
        ...rest
      },
      forwardedRef: ForwardedRef<SVGSVGElement>
    ) => {
      const height = typeof size === "number" ? size : sizeMap[size] || size
      //@ts-ignore
      const naturalHeight = closestNaturalHeight(heights, height)
      const naturalWidth = svgDataByHeight[naturalHeight].width

      //@ts-ignore
      const width = height * (naturalWidth / naturalHeight)
      const path = svgDataByHeight[naturalHeight].path
      const labelled = ariaLabel || ariaLabelledBy
      const role = labelled ? "img" : undefined

      return (
        <svg
          ref={forwardedRef}
          aria-hidden={labelled ? undefined : "true"}
          tabIndex={tabIndex}
          focusable={tabIndex !== undefined && tabIndex >= 0 ? "true" : "false"}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          className={className}
          role={role}
          viewBox={`0 0 ${naturalWidth} ${naturalHeight}`}
          width={width}
          height={height}
          fill={fill}
          id={id}
          style={{
            display: "inline-block",
            userSelect: "none",
            verticalAlign,
            overflow: "visible",
            transform,
          }}
          {...rest}
        >
          {title ? <title>{title}</title> : null}
          {path}
        </svg>
      )
    }
  )

  Icon.displayName = name

  return Icon
}

function closestNaturalHeight(
  naturalHeights: string[],
  height: number
): string {
  return naturalHeights
    .map((naturalHeight) => parseInt(naturalHeight, 10))
    .reduce(
      (acc, naturalHeight) => (naturalHeight <= height ? naturalHeight : acc),
      parseInt(naturalHeights[0], 10)
    )
    .toString()
}

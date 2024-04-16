import React from "react"

type Props = {
  count: number
  title: string
}
export const CountInfoComponent: React.FC<Props> = ({ count, title }) => {
  return (
    <div className="flex flex-col items-center space-x-2">
      <span className="text-4xl font-semibold">{count}</span>
      <span>{title}</span>
    </div>
  )
}

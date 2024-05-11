import { RefreshControl } from "react-native"

import colors from "@constants/colors"
import { RefresherProps } from "./types"

export const Refresher = (props: RefresherProps) => {
  const { refresh, onRefresh } = props

  return (
    <RefreshControl
      colors={[
        colors.mainFirst,
        colors.mainSecond,
        colors.mainThird,
        colors.mainFourth,
        colors.mainFifith,
      ]}
      refreshing={refresh}
      onRefresh={onRefresh}
    />
  )
}

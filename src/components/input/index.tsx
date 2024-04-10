/* Dependencies */
import React from "react"
import {
  TextInput as NativeInput,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

/* Project */
import type { InputForwardedRef, InputProps, InputRef } from "./types"

const BaseInput = (props: InputProps, ref: React.ForwardedRef<InputRef>) => {
  /* Contexts */
  const {
    children,
    disabled = false,
    label,
    type = "text",
    onBlur,
    onFormat,
    onChangeText,
    value,
    visible = true,
    ...rest
  } = props

  /* States */
  const [focused, setFocused] = React.useState(false)
  const [show, setShow] = React.useState(false)

  /* Refs */
  const refNativeInput = React.useRef<NativeInput>(null)
  React.useImperativeHandle(ref, () => ({
    blur: () => {
      refNativeInput.current?.blur()
    },
    focus: () => {
      refNativeInput.current?.focus()
    },
  }))

  const Icon = () => {
    switch (type) {
      case "password":
        return (
          <MaterialCommunityIcons
            name={show ? "eye-off" : "eye"}
            onPress={() => setShow(!show)}
            size={24}
            color="#999"
          />
        )
      case "text":
        return (
          <MaterialCommunityIcons
            name={"close"}
            onPress={() => onChangeText("")}
            size={24}
          />
        )
    }
  }

  return (
    <View style={{ ...styles.container, display: !visible ? "none" : "flex" }}>
      <Pressable
        disabled={disabled}
        onPress={() => {
          setFocused(true)
          refNativeInput.current?.focus()
        }}
        style={styles.leftContainer}
      >
        <View style={styles.labelContainer}>
          <Text style={value || focused ? styles.focusedLabel : styles.label}>
            {label}
          </Text>
        </View>
        <View style={value || focused ? styles.inputContainer : { height: 1 }}>
          <NativeInput
            selectionColor={"#111"}
            onFocus={() => setFocused(true)}
            onBlur={(event) => {
              onBlur?.(event)
              setFocused(false)
            }}
            editable={!disabled}
            focusable={!disabled}
            textAlignVertical="top"
            ref={refNativeInput}
            style={styles.input}
            value={value}
            secureTextEntry={type === "password" && !show}
            onChangeText={(value) => onChangeText(value)}
            {...rest}
          />
        </View>
      </Pressable>
      {!disabled && (
        <View style={{ position: "absolute", right: 10 }}>
          <Icon />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 4,
    flexDirection: "column",
    maxHeight: 54,
    minHeight: 54,
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  labelContainer: {
    width: "auto",
    justifyContent: "center",
    flex: 1,
  },
  label: {
    color: "#999",
    fontSize: 16,
  },
  focusedLabel: {
    fontSize: 10,
  },
  input: {
    padding: 0,
    margin: 0,
  },
  inputContainer: {
    borderRadius: 6,
    flex: 1,
  },
  leftContainer: {
    flex: 1,
    width: "100%",
  },
  rightContainer: {
    flex: 0,
  },
})

export const Input = React.forwardRef(BaseInput) as InputForwardedRef

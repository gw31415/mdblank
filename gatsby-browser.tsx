import React, { useState, useEffect, useRef } from "react"
import { MDXProvider } from "@mdx-js/react"
import "./node_modules/simpledotcss/simple.min.css"

function BlankStrong(
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
) {
  const [color, setColor] = useState<any | undefined>(undefined)
  const ref = useRef<JSX.IntrinsicElements>()
  const main = (
    <strong
      ref={ref as any}
      {...props}
      style={{
        backgroundColor: color,
      }}
      onClick={() => setColor(undefined)}
    />
  )
  let style: CSSStyleDeclaration
  useEffect(() => {
    style = window.getComputedStyle(ref.current as any)
    setColor(style.color)
  }, [])
  return main
}

export function wrapPageElement({ element }) {
  const [quizmode, setQuizmode] = useState(false)
  return (
    <>
      <div
        style={{
          position: "fixed",
          height: "3rem",
          width: "3rem",
          borderRadius: "1.5rem",
          backgroundColor: quizmode ? "#7986CB" : "#3D5AFE",
          bottom: "1.5rem",
          right: "1.5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={() => setQuizmode(!quizmode)}
      >
        <span
          style={{
            verticalAlign: "bottom",
          }}
        >
          {quizmode ? "×" : "Q"}
        </span>
      </div>
      <MDXProvider
        components={
          quizmode
            ? {
                strong: BlankStrong,
                blockquote: props => (
                  <blockquote {...props} style={{ visibility: "hidden" }} />
                ),
              }
            : {}
        }
      >
        {element}
      </MDXProvider>
    </>
  )
}

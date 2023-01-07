import React, { useState, useEffect, useRef } from "react"
import { MDXProvider } from "@mdx-js/react"
import type { Components as MDXComponents } from "@mdx-js/react/lib"
// import { Header } from "./src/components/header"

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

const baseComponents: MDXComponents = {
  // h1: props => <h2 {...props} />,
  // h2: props => <h3 {...props} />,
  // h3: props => <h4 {...props} />,
  // h4: props => <h5 {...props} />,
  // h5: props => <h6 {...props} />,
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
          color: "#dcdcdc",
          bottom: "1.5rem",
          right: "1.5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          filter: "drop-shadow(.5ex .5ex 10px rgba(0,0,0,50%))",
        }}
        onClick={() => setQuizmode(!quizmode)}
      >
        {quizmode ? "×" : "Q"}
      </div>
      <main>
        <MDXProvider
          components={
            quizmode
              ? {
                  strong: BlankStrong,
                  blockquote: props => (
                    <blockquote {...props} style={{ visibility: "hidden" }} />
                  ),
                  ...baseComponents,
                }
              : baseComponents
          }
        >
          {element}
        </MDXProvider>
      </main>
    </>
  )
}

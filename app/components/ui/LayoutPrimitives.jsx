"use client";

import React from "react";

export function Box({ children, className = "", style, sx, ...props }) {
  const combinedStyle = {
    ...(sx?.fontFamily ? { fontFamily: sx.fontFamily } : {}),
    ...(sx?.display ? { display: sx.display } : {}),
    ...(sx?.backgroundColor ? { backgroundColor: sx.backgroundColor } : {}),
    ...(sx?.color ? { color: sx.color } : {}),
    ...(sx?.maxWidth ? { maxWidth: sx.maxWidth } : {}),
    ...style,
  };

  return (
    <div className={className} style={combinedStyle} {...props}>
      {children}
    </div>
  );
}

export function Container({ children, className = "", style, sx, ...props }) {
  const combinedStyle = {
    ...(sx?.maxWidth ? { maxWidth: sx.maxWidth } : {}),
    ...style,
  };

  return (
    <div className={`mx-auto px-4 sm:px-6 w-full ${className}`} style={combinedStyle} {...props}>
      {children}
    </div>
  );
}

export function Grid({ children, className = "", style, sx, ...props }) {
  const combinedStyle = {
    ...(sx?.display ? { display: sx.display } : {}),
    ...(sx?.justifyContent ? { justifyContent: sx.justifyContent } : {}),
    ...(sx?.alignItems ? { alignItems: sx.alignItems } : {}),
    ...(sx?.marginBottom ? { marginBottom: sx.marginBottom } : {}),
    ...(sx?.mt ? { marginTop: typeof sx.mt === "number" ? `${sx.mt * 0.25}rem` : sx.mt } : {}),
    ...(props.marginRight ? { marginRight: props.marginRight } : {}),
    ...style,
  };

  return (
    <div className={className} style={combinedStyle} {...props}>
      {children}
    </div>
  );
}

export function Typography({ children, className = "", style, sx, component: Component = "p", ...props }) {
  const combinedStyle = {
    ...(sx?.color ? { color: sx.color } : {}),
    ...(sx?.fontSize ? { fontSize: sx.fontSize } : {}),
    ...(sx?.fontWeight ? { fontWeight: sx.fontWeight } : {}),
    ...(sx?.marginBottom ? { marginBottom: sx.marginBottom } : {}),
    ...(sx?.textTransform ? { textTransform: sx.textTransform } : {}),
    ...(sx?.textDecoration ? { textDecoration: sx.textDecoration } : {}),
    ...style,
  };

  return (
    <Component className={className} style={combinedStyle} {...props}>
      {children}
    </Component>
  );
}

export function Button({ children, onClick, className = "", style, sx, ...props }) {
  const combinedStyle = {
    backgroundColor: sx?.backgroundColor || "#1A73E8",
    color: sx?.color || "#fff",
    borderRadius: sx?.borderRadius || "6px",
    textTransform: sx?.textTransform || "none",
    ...style,
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`font-medium transition-colors ${className}`}
      style={combinedStyle}
      {...props}
    >
      {children}
    </button>
  );
}

export function Tooltip({ title, children }) {
  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      title: title || children.props.title,
    });
  }
  return <span title={title}>{children}</span>;
}


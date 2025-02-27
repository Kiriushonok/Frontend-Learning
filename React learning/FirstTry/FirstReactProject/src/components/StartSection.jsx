import React from "react"

export default function SrartSection() {
    const e = React.createElement
    return e("section" , null, [
        e("h1", {className: "centered", key: 1}, "Тут будет про музыку"),
        e("h3", {className: "centered", style: {color : '#666', marginBottom:"30px"}, key: 2}, "Песни, авторы, описание")
    ])
}
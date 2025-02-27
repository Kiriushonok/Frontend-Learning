import "./Song.css"

export default function Song({author, name}) {
    return (
        <div className="song-container">
            <strong>{author}</strong>
            <span>&nbsp;- {name}</span>
        </div>
    )
}
// sudo apt-get remove libhpmud0 libsane-hpaio printer-driver-postscript-hp

export default function Region({regionId, children}) {
    return (
        <article id={regionId}>{children}</article>
    )
}
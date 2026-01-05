import { useState, useRef, useEffect } from "react";
import AspireReel from './assets/Videos/AspireReel1.mp4';
import AspireReel1 from './assets/Videos/AspireReel2.mp4';
import AspireReel2 from './assets/Videos/AspireReel5.mp4';
import AspireReel5 from './assets/Videos/AspireReel3.mp4';
import AspireReel4 from './assets/Videos/AspireReel6.mp4';


import "./VideoReels.css";

const videos = [

    { type: "mp4", src: AspireReel },
    { type: "mp4", src: AspireReel1 },
    { type: "mp4", src: AspireReel2 },
    { type: "mp4", src: AspireReel5 },
    { type: "mp4", src: AspireReel4 },

];

export default function VideoReels() {
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const popupVideoRef = useRef(null);

    const nextVideo = () => setIndex((i) => (i + 1) % videos.length);
    const prevVideo = () => setIndex((i) => (i - 1 + videos.length) % videos.length);

    // ✅ When popup opens → unmute + autoplay
    useEffect(() => {
        if (open && popupVideoRef.current) {
            popupVideoRef.current.muted = false;
            popupVideoRef.current.play();
        }
    }, [open, index]);

    return (
        <>
            {/* ✅ AUTO PLAY GRID (MUTED) */}
            <div className="video-grid">
                {videos.map((item, i) => (
                    <video
                        key={i}
                        src={item.src}
                        muted
                        autoPlay
                        loop
                        playsInline
                        preload="metadata"
                        className="grid-video"
                        onClick={() => {
                            setIndex(i);
                            setOpen(true);
                        }}
                    />
                ))}
            </div>

            {/* ✅ POPUP REEL VIEW */}
            {open && (
                <div className="video-overlay">
                    <span className="video-close" onClick={() => setOpen(false)}>×</span>
                    <span className="video-nav left" onClick={prevVideo}>❮</span>

                    <video
                        ref={popupVideoRef}
                        src={videos[index].src}
                        autoPlay
                        playsInline
                        loop
                        className="reel-video"
                    />

                    <span className="video-nav right" onClick={nextVideo}>❯</span>
                </div>
            )}
        </>
    );
}

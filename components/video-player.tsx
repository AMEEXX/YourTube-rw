"use client"

import { useRef } from "react"
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"

export function VideoPlayer() {
  // In a real app, you'd get the video ID from URL params
  const videoId = "dQw4w9WgXcQ" // Example YouTube video ID
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Video player specific shortcuts
  const videoShortcuts = [
    {
      key: " ", // Spacebar
      description: "Play/pause video",
      action: () => {
        // Send message to YouTube iframe to toggle play/pause
        if (iframeRef.current) {
          iframeRef.current.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*")
        }
      },
    },
    {
      key: "k",
      description: "Play/pause video",
      action: () => {
        if (iframeRef.current) {
          iframeRef.current.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*")
        }
      },
    },
    {
      key: "ArrowLeft",
      description: "Seek backward 5 seconds",
      action: () => {
        if (iframeRef.current) {
          iframeRef.current.contentWindow?.postMessage('{"event":"command","func":"seekBy","args":[-5]}', "*")
        }
      },
    },
    {
      key: "ArrowRight",
      description: "Seek forward 5 seconds",
      action: () => {
        if (iframeRef.current) {
          iframeRef.current.contentWindow?.postMessage('{"event":"command","func":"seekBy","args":[5]}', "*")
        }
      },
    },
    {
      key: "j",
      description: "Seek backward 10 seconds",
      action: () => {
        if (iframeRef.current) {
          iframeRef.current.contentWindow?.postMessage('{"event":"command","func":"seekBy","args":[-10]}', "*")
        }
      },
    },
    {
      key: "l",
      description: "Seek forward 10 seconds",
      action: () => {
        if (iframeRef.current) {
          iframeRef.current.contentWindow?.postMessage('{"event":"command","func":"seekBy","args":[10]}', "*")
        }
      },
    },
    {
      key: "ArrowUp",
      description: "Volume up",
      action: () => {
        if (iframeRef.current) {
          iframeRef.current.contentWindow?.postMessage('{"event":"command","func":"setVolume","args":["+10"]}', "*")
        }
      },
    },
    {
      key: "ArrowDown",
      description: "Volume down",
      action: () => {
        if (iframeRef.current) {
          iframeRef.current.contentWindow?.postMessage('{"event":"command","func":"setVolume","args":["-10"]}', "*")
        }
      },
    },
    {
      key: "m",
      description: "Mute/unmute",
      action: () => {
        if (iframeRef.current) {
          iframeRef.current.contentWindow?.postMessage('{"event":"command","func":"mute","args":""}', "*")
        }
      },
    },
    {
      key: "f",
      description: "Toggle fullscreen",
      action: () => {
        if (iframeRef.current) {
          if (document.fullscreenElement) {
            document.exitFullscreen()
          } else {
            iframeRef.current.requestFullscreen()
          }
        }
      },
    },
  ]

  // Add number key shortcuts for seeking to specific positions
  for (let i = 0; i <= 9; i++) {
    videoShortcuts.push({
      key: i.toString(),
      description: `Jump to ${i * 10}% of video`,
      action: () => {
        if (iframeRef.current) {
          iframeRef.current.contentWindow?.postMessage(
            `{"event":"command","func":"seekTo","args":[${i * 10}, true]}`,
            "*",
          )
        }
      },
    })
  }

  useKeyboardShortcuts(videoShortcuts)

  return (
    <div className="w-full mb-4">
      <div className="relative w-full">
        <div className="aspect-video bg-black rounded-xl overflow-hidden">
          <iframe
            ref={iframeRef}
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1&enablejsapi=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full min-h-[200px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[500px]"
          />
        </div>
      </div>
    </div>
  )
}

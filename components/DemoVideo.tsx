import React, { useRef, useState } from 'react';

interface DemoVideoProps {
  videoPath: string; // Define the prop to receive the video path
}

const DemoVideo: React.FC<DemoVideoProps> = ({ videoPath }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true); // Track if video is muted

  // Function to unmute video on button click
  const handleUnmute = () => {
    if (videoRef.current) {
      videoRef.current.muted = false; // Unmute the video
      videoRef.current.play(); // Ensure it continues playing after unmuting
      setIsMuted(false); // Update state to indicate it's unmuted
    }
  };

  return (
    <div style={{ position: 'relative', width: '150px' }}> {/* Set the container size */}
      <video
        ref={videoRef} // Reference to the video element
        width="100%" // Make the video responsive
        autoPlay // Autoplay the video
        muted={isMuted} // Mute by default based on state
        controls // Show video controls
      >
        <source src={videoPath} type="video/mp4" /> {/* Use the prop here */}
        Your browser does not support the video tag.
      </video>

      {/* Unmute Button */}
      {isMuted && (
        <button
          onClick={handleUnmute} // Unmute on button click
          style={{
            position: 'absolute',
            top: '50%', // Center vertically
            left: '50%', // Center horizontally
            transform: 'translate(-50%, -50%)', // Center the button
            padding: '15px 30px', // Increase button size
            fontSize: '16px', // Larger text
            backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent background
            color: 'white', // White text
            border: 'none', // Remove border
            borderRadius: '5px', // Rounded corners
            cursor: 'pointer', // Pointer cursor on hover
          }}
        >
          Unmute
        </button>
      )}
    </div>
  );
};

// Parent component to hold the title and video demos
const VideoApp: React.FC = () => {
  return (
    <div>
      <h1 className='flex justify-center text-gray-700 text-2xl mt-8'>Demo video For the App</h1>
      <div className="flex overflow-x-auto space-x-4 py-8"> {/* Horizontal scrolling */}
        <div className='min-w-[150px] px-2'>
          <DemoVideo videoPath="/videosDemo/demo1.mp4" /> {/* Pass the video path */}
        </div>
        <div className='min-w-[150px] px-2'>
          <DemoVideo videoPath="/videosDemo/demo2.mp4" /> {/* Pass the video path */}
        </div>
        <div className='min-w-[150px] px-2'>
          <DemoVideo videoPath="/videosDemo/demo3.mp4" /> {/* New video */}
        </div>
        <div className='min-w-[150px] px-2'>
          <DemoVideo videoPath="/videosDemo/demo4.mp4" /> {/* New video */}
        </div>
        <div className='min-w-[150px] px-2'>
          <DemoVideo videoPath="/videosDemo/demo5.mp4" /> {/* New video */}
        </div>
        <div className='min-w-[150px] px-2'>
          <DemoVideo videoPath="/videosDemo/demo6.mp4" /> {/* New video */}
        </div>
      </div>
    </div>
  );
};

export default VideoApp;

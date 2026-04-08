import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gauge, Zap, Music, Volume2, Volume1, VolumeX, ChevronLeft, ChevronRight, Wind, LayoutGrid, X } from 'lucide-react';

interface Vehicle {
  id: string;
  name: string;
  type: 'car' | 'bike';
  image: string;
  soundUrl: string;
  color: string;
  maxSpeed: number;
  angles: string[]; // Array of image URLs for different angles
}

const VEHICLES: Vehicle[] = [
  {
    id: 'bugatti-chiron',
    name: 'BUGATTI CHIRON',
    type: 'car',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=1000',
    angles: [
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=1000'
    ],
    soundUrl: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
    color: '#3b82f6',
    maxSpeed: 420
  },
  {
    id: 'ferrari-sf90',
    name: 'FERRARI SF90',
    type: 'car',
    image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=1000',
    angles: [
      'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000'
    ],
    soundUrl: 'https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3',
    color: '#ff3333',
    maxSpeed: 340
  },
  {
    id: 'lamborghini-aventador',
    name: 'LAMBO AVENTADOR',
    type: 'car',
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=1000',
    angles: [
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1000'
    ],
    soundUrl: 'https://assets.mixkit.co/active_storage/sfx/2573/2573-preview.mp3',
    color: '#facc15',
    maxSpeed: 350
  },
  {
    id: 'mclaren-720s',
    name: 'MCLAREN 720S',
    type: 'car',
    image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&q=80&w=1000',
    angles: [
      'https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=1000'
    ],
    soundUrl: 'https://assets.mixkit.co/active_storage/sfx/2574/2574-preview.mp3',
    color: '#fb923c',
    maxSpeed: 341
  },
  {
    id: 'porsche-911',
    name: 'PORSCHE 911 GT3',
    type: 'car',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000',
    angles: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=1000'
    ],
    soundUrl: 'https://assets.mixkit.co/active_storage/sfx/2575/2575-preview.mp3',
    color: '#ff3333',
    maxSpeed: 318
  },
  {
    id: 'ninja-h2r',
    name: 'KAWASAKI H2R',
    type: 'bike',
    image: 'https://images.unsplash.com/photo-1449491073997-90ce396ff661?auto=format&fit=crop&q=80&w=1000',
    angles: [
      'https://images.unsplash.com/photo-1449491073997-90ce396ff661?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1000'
    ],
    soundUrl: 'https://assets.mixkit.co/active_storage/sfx/2576/2576-preview.mp3',
    color: '#22c55e',
    maxSpeed: 400
  },
  {
    id: 'bmw-s1000rr',
    name: 'BMW S1000RR',
    type: 'bike',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1000',
    angles: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1449491073997-90ce396ff661?auto=format&fit=crop&q=80&w=1000'
    ],
    soundUrl: 'https://assets.mixkit.co/active_storage/sfx/2577/2577-preview.mp3',
    color: '#3b82f6',
    maxSpeed: 303
  },
  {
    id: 'yamaha-r1',
    name: 'YAMAHA R1',
    type: 'bike',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1000',
    angles: [
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1449491073997-90ce396ff661?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1000'
    ],
    soundUrl: 'https://assets.mixkit.co/active_storage/sfx/2578/2578-preview.mp3',
    color: '#3b82f6',
    maxSpeed: 299
  },
  {
    id: 'hayabusa',
    name: 'SUZUKI HAYABUSA',
    type: 'bike',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=1000',
    angles: [
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1449491073997-90ce396ff661?auto=format&fit=crop&q=80&w=1000'
    ],
    soundUrl: 'https://assets.mixkit.co/active_storage/sfx/2579/2579-preview.mp3',
    color: '#fb923c',
    maxSpeed: 312
  },
  {
    id: 'cbr1000rr',
    name: 'HONDA CBR1000RR',
    type: 'bike',
    image: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=1000',
    angles: [
      'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1000'
    ],
    soundUrl: 'https://assets.mixkit.co/active_storage/sfx/2580/2580-preview.mp3',
    color: '#ff3333',
    maxSpeed: 299
  }
];

export const VehicleSection: React.FC<{ alarmMusicSrc?: string | null, isAlarmPlaying?: boolean }> = ({ alarmMusicSrc, isAlarmPlaying }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isThrottling, setIsThrottling] = useState(false);
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [throttleValue, setThrottleValue] = useState(0); // 0 to 1
  const [speed, setSpeed] = useState(0);
  const [fuel, setFuel] = useState(100); // 0 to 100
  const [temperature, setTemperature] = useState(40); // 40 to 120
  const [gear, setGear] = useState<1 | 2 | 3 | 'N' | 'R'>('N');
  const [angleIndex, setAngleIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [isIgnitionFlash, setIsIgnitionFlash] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const musicAudioRef = useRef<HTMLAudioElement>(null);
  const ambientAudioRef = useRef<HTMLAudioElement>(null);
  
  const currentVehicle = VEHICLES[currentIndex];

  // Alarm Triggered Revving
  useEffect(() => {
    if (isAlarmPlaying) {
      // Start engine if not already playing
      if (!isSoundPlaying) {
        toggleSound();
      }
      // Start throttling
      setIsThrottling(true);
      
      // Stop throttling after 3 seconds for a "revving" effect
      const timer = setTimeout(() => {
        setIsThrottling(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isAlarmPlaying]);

  useEffect(() => {
    let interval: number;
    if (isThrottling) {
      interval = window.setInterval(() => {
        setThrottleValue(v => Math.min(v + 0.05, 1));
      }, 50);
    } else {
      interval = window.setInterval(() => {
        setThrottleValue(v => Math.max(v - 0.03, 0));
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isThrottling]);

  // Speed Logic
  useEffect(() => {
    const interval = window.setInterval(() => {
      setSpeed(prev => {
        let targetSpeed = 0;
        let acceleration = 0;

        if (gear === 'N') {
          targetSpeed = 0;
          acceleration = 1.0; // Natural decay
        } else if (gear === 'R') {
          targetSpeed = throttleValue * -30;
          acceleration = 1.5;
        } else if (gear === 1) {
          targetSpeed = throttleValue * 80;
          acceleration = 3.0; // High torque
        } else if (gear === 2) {
          targetSpeed = throttleValue * 180;
          acceleration = 2.0;
        } else if (gear === 3) {
          targetSpeed = throttleValue * currentVehicle.maxSpeed;
          acceleration = 1.2; // High speed, low torque
        }

        const diff = targetSpeed - prev;
        const step = diff > 0 ? acceleration : 1.5;
        
        if (Math.abs(diff) < step) return targetSpeed;
        return prev + (diff > 0 ? step : -step);
      });
    }, 30);
    return () => clearInterval(interval);
  }, [throttleValue, currentVehicle.maxSpeed, gear]);

  // Fuel & Temperature Logic
  useEffect(() => {
    const interval = window.setInterval(() => {
      // Fuel Logic
      if (isSoundPlaying) {
        setFuel(prev => {
          // Consumption based on gear and throttle
          // Lower gears at high throttle consume more
          const gearFactor = gear === 1 ? 1.5 : gear === 2 ? 1.2 : 1.0;
          const consumption = 0.01 + (throttleValue * 0.05 * gearFactor) + (Math.abs(speed) / currentVehicle.maxSpeed * 0.05);
          const nextFuel = Math.max(0, prev - consumption);
          if (nextFuel === 0 && isSoundPlaying) {
            toggleSound(); // Auto-stall when out of fuel
          }
          return nextFuel;
        });
      }

      // Temperature Logic
      setTemperature(prev => {
        if (isSoundPlaying) {
          const heating = throttleValue * 0.2;
          const cooling = 0.05;
          const targetTemp = 40 + (throttleValue * 60) + (speed / currentVehicle.maxSpeed * 20);
          if (prev < targetTemp) return Math.min(120, prev + heating);
          return Math.max(40, prev - cooling);
        } else {
          return Math.max(40, prev - 0.1); // Cool down when off
        }
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isSoundPlaying, throttleValue, speed, currentVehicle.maxSpeed]);

  useEffect(() => {
    if (audioRef.current) {
      // Adjust playback rate or volume based on throttle and gear
      const gearPitch = gear === 1 ? 1.2 : gear === 2 ? 1.0 : gear === 3 ? 0.8 : 1.0;
      const baseRate = 1.0 * gearPitch;
      const maxRate = 2.5 * gearPitch;
      audioRef.current.playbackRate = baseRate + (throttleValue * (maxRate - baseRate));
      audioRef.current.volume = (0.3 + (throttleValue * 0.7)) * volume;
    }
    if (musicAudioRef.current) {
      musicAudioRef.current.volume = volume;
    }
    if (ambientAudioRef.current) {
      ambientAudioRef.current.volume = volume * 0.3;
    }
  }, [throttleValue, volume, gear]);

  // Ambient Sound Logic
  useEffect(() => {
    if (ambientAudioRef.current) {
      if (!isSoundPlaying && !isMusicPlaying) {
        ambientAudioRef.current.play().catch(console.error);
        // Fade in
        ambientAudioRef.current.volume = 0;
        const fadeInterval = setInterval(() => {
          if (ambientAudioRef.current && ambientAudioRef.current.volume < volume * 0.3) {
            ambientAudioRef.current.volume = Math.min(volume * 0.3, ambientAudioRef.current.volume + 0.05);
          } else {
            clearInterval(fadeInterval);
          }
        }, 100);
      } else {
        // Fade out
        const fadeInterval = setInterval(() => {
          if (ambientAudioRef.current && ambientAudioRef.current.volume > 0.01) {
            ambientAudioRef.current.volume = Math.max(0, ambientAudioRef.current.volume - 0.05);
          } else {
            if (ambientAudioRef.current) ambientAudioRef.current.pause();
            clearInterval(fadeInterval);
          }
        }, 100);
      }
    }
  }, [isSoundPlaying, isMusicPlaying, volume]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % VEHICLES.length);
    setThrottleValue(0);
    setFuel(100);
    setTemperature(40);
    setGear('N');
    setAngleIndex(0);
    setIsThrottling(false);
    setIsSoundPlaying(false);
    if (audioRef.current) audioRef.current.pause();
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + VEHICLES.length) % VEHICLES.length);
    setThrottleValue(0);
    setFuel(100);
    setTemperature(40);
    setGear('N');
    setAngleIndex(0);
    setIsThrottling(false);
    setIsSoundPlaying(false);
    if (audioRef.current) audioRef.current.pause();
  };

  const toggleSound = () => {
    if (audioRef.current) {
      // Trigger ignition animation
      setIsIgnitionFlash(true);
      setIsShaking(true);
      setTimeout(() => {
        setIsIgnitionFlash(false);
        setIsShaking(false);
      }, 300);

      if (audioRef.current.paused) {
        audioRef.current.play().catch(console.error);
        setIsSoundPlaying(true);
        // Pause music if engine starts
        if (isMusicPlaying) toggleMusic();
      } else {
        audioRef.current.pause();
        setIsSoundPlaying(false);
      }
    }
  };

  const toggleMusic = () => {
    if (musicAudioRef.current && alarmMusicSrc) {
      if (musicAudioRef.current.paused) {
        musicAudioRef.current.play().catch(console.error);
        setIsMusicPlaying(true);
        // Pause engine if music starts
        if (isSoundPlaying) toggleSound();
      } else {
        musicAudioRef.current.pause();
        setIsMusicPlaying(false);
      }
    }
  };

  return (
    <motion.div 
      animate={isShaking ? {
        x: [-2, 2, -2, 2, 0],
        y: [-1, 1, -1, 1, 0]
      } : {}}
      transition={{ duration: 0.2 }}
      className="mt-8 bg-radio-face border-4 border-radio-dim rounded-lg overflow-hidden shadow-inset-screen relative"
    >
      {/* Header */}
      <div className="bg-radio-dim/50 p-3 border-b border-radio-dim flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Gauge className="w-4 h-4 text-radio-lit" />
          <span className="text-[10px] font-mono text-radio-lit uppercase tracking-[0.2em]">Performance Mode</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowGallery(!showGallery)}
            className={`text-gray-500 hover:text-radio-lit transition-colors ${showGallery ? 'text-radio-lit' : ''}`}
            title="Vehicle Gallery"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <div className="relative flex items-center gap-2">
            <button 
              onClick={() => setShowVolumeSlider(!showVolumeSlider)}
              className="text-gray-500 hover:text-radio-lit transition-colors"
            >
              {volume === 0 ? <VolumeX className="w-4 h-4" /> : volume < 0.5 ? <Volume1 className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <AnimatePresence>
              {showVolumeSlider && (
                <motion.div 
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 60 }}
                  exit={{ opacity: 0, width: 0 }}
                  className="overflow-hidden flex items-center"
                >
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.1" 
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-full h-1 bg-radio-dim rounded-lg appearance-none cursor-pointer accent-radio-lit"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button onClick={handlePrev} className="text-gray-500 hover:text-radio-lit transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-[12px] font-digital text-radio-lit min-w-[120px] text-center tracking-widest">
            {currentVehicle.name}
          </span>
          <button onClick={handleNext} className="text-gray-500 hover:text-radio-lit transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row flex-grow">
        {/* Image Display */}
        <div className="flex-1 relative overflow-hidden bg-black">
          <AnimatePresence mode="wait">
            <motion.div
              key={`indicator-${currentVehicle.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none z-20 border-4"
              style={{ borderColor: currentVehicle.color, boxShadow: `inset 0 0 20px ${currentVehicle.color}44` }}
            />
            <motion.img
              key={`${currentVehicle.id}-${angleIndex}`}
              src={currentVehicle.angles[angleIndex]}
              alt={currentVehicle.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>

          {/* 360 Rotation Controls */}
          <div className="absolute bottom-4 left-4 flex gap-2 z-30">
            <button 
              onClick={() => setAngleIndex(prev => (prev - 1 + currentVehicle.angles.length) % currentVehicle.angles.length)}
              className="p-2 bg-black/50 border border-white/20 rounded-full text-white hover:bg-radio-lit/50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="px-3 py-1 bg-black/50 border border-white/20 rounded-full text-[8px] font-mono text-white flex items-center">
              360 VIEW
            </div>
            <button 
              onClick={() => setAngleIndex(prev => (prev + 1) % currentVehicle.angles.length)}
              className="p-2 bg-black/50 border border-white/20 rounded-full text-white hover:bg-radio-lit/50 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Ignition Flash */}
          <AnimatePresence>
            {isIgnitionFlash && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white z-40 pointer-events-none"
              />
            )}
          </AnimatePresence>
          
          {/* Fire Animation */}
          {throttleValue > 0.9 && (
            <div className="absolute bottom-4 right-10 flex gap-2 z-30 pointer-events-none">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 0, scale: 0.5 }}
                  animate={{ 
                    opacity: [0, 1, 0], 
                    y: [-10, -40, -60], 
                    scale: [0.5, 1.5, 0.8],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 0.4, 
                    repeat: Infinity, 
                    delay: i * 0.1,
                    ease: "easeOut"
                  }}
                  className="w-4 h-8 bg-gradient-to-t from-orange-600 via-yellow-400 to-transparent rounded-full blur-[2px]"
                />
              ))}
              <motion.div 
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 0.1, repeat: Infinity }}
                className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full"
              />
            </div>
          )}
          
          {/* Scanline Overlay */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
          
          {/* HUD Overlay */}
          <div className="absolute top-4 left-4 flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-radio-lit animate-pulse shadow-led"></div>
              <span className="text-[8px] font-mono text-radio-lit uppercase tracking-widest">Live Telemetry</span>
            </div>
            <div className="text-[10px] font-mono text-gray-400">
              RPM: <span className="text-radio-lit font-digital">{(throttleValue * 8000 + 800).toFixed(0)}</span>
            </div>
            <div className="text-[10px] font-mono text-gray-400 mt-1">
              SPD: <span className="text-radio-lit font-digital">{Math.abs(speed).toFixed(0)}</span> <span className="text-[8px]">KM/H</span>
            </div>
            <div className="text-[10px] font-mono text-gray-400 mt-1">
              GEAR: <span className="text-radio-lit font-digital">{gear}</span>
            </div>
            <div className="text-[8px] font-mono text-gray-500 mt-2 flex items-center gap-1">
              <div className={`w-1.5 h-1.5 rounded-full ${isSoundPlaying ? 'bg-green-500 shadow-led' : 'bg-gray-600'}`}></div>
              AUDIO: {isSoundPlaying ? 'ACTIVE' : 'IDLE'}
            </div>
            <div className="flex gap-4 mt-2">
              <div className="flex flex-col">
                <span className="text-[7px] font-mono text-gray-500 uppercase tracking-widest">Fuel</span>
                <div className="w-16 h-1 bg-radio-dim rounded-full overflow-hidden mt-0.5">
                  <motion.div 
                    className={`h-full ${fuel < 20 ? 'bg-radio-lit animate-pulse' : 'bg-green-500'}`}
                    animate={{ width: `${fuel}%` }}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[7px] font-mono text-gray-500 uppercase tracking-widest">Temp</span>
                <div className="w-16 h-1 bg-radio-dim rounded-full overflow-hidden mt-0.5">
                  <motion.div 
                    className={`h-full ${temperature > 100 ? 'bg-radio-lit animate-pulse' : 'bg-orange-500'}`}
                    animate={{ width: `${((temperature - 40) / 80) * 100}%` }}
                  />
                </div>
              </div>
            </div>
            {fuel <= 0 && (
              <div className="mt-2 bg-radio-lit/20 border border-radio-lit px-2 py-0.5 rounded">
                <span className="text-[8px] font-mono text-radio-lit uppercase animate-pulse">Out of Fuel</span>
              </div>
            )}
            {temperature > 105 && (
              <div className="mt-1 bg-orange-500/20 border border-orange-500 px-2 py-0.5 rounded">
                <span className="text-[8px] font-mono text-orange-500 uppercase animate-pulse">Engine Overheating</span>
              </div>
            )}
            {throttleValue >= 1 && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="mt-2 bg-radio-lit/20 border border-radio-lit px-2 py-0.5 rounded"
              >
                <span className="text-[8px] font-mono text-radio-lit uppercase animate-pulse">Governor Engaged</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Controls Panel */}
        <div className="w-full md:w-64 bg-radio-face border-l border-radio-dim p-6 flex flex-col justify-between">
          <div className="space-y-6">
            {/* RPM Gauge */}
            <div className="relative h-32 flex items-center justify-center">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                  className="text-radio-dim"
                />
                <motion.circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                  strokeDasharray="251.2"
                  animate={{ strokeDashoffset: 251.2 - (throttleValue * 251.2) }}
                  className="text-radio-lit"
                  style={{ strokeLinecap: 'round' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-digital text-radio-lit">{(throttleValue * 100).toFixed(0)}</span>
                <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">% THR</span>
              </div>
            </div>

            {/* Speedometer Gauge */}
            <div className="relative h-32 flex items-center justify-center">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="transparent"
                  className="text-radio-dim"
                />
                <motion.circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="transparent"
                  strokeDasharray="251.2"
                  animate={{ strokeDashoffset: 251.2 - ((Math.abs(speed) / currentVehicle.maxSpeed) * 251.2) }}
                  className="text-radio-lit opacity-60"
                  style={{ strokeLinecap: 'round' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-digital text-radio-lit">{Math.abs(speed).toFixed(0)}</span>
                <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">KM/H</span>
              </div>
            </div>

            {/* Gear Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-[8px] font-mono text-gray-500 uppercase tracking-widest text-center">Gearbox</label>
              <div className="grid grid-cols-5 gap-1">
                {['R', 'N', 1, 2, 3].map((g) => (
                  <button
                    key={g}
                    onClick={() => setGear(g as any)}
                    className={`py-1.5 rounded text-[10px] font-digital transition-all ${gear === g ? 'bg-radio-lit text-white shadow-led' : 'bg-radio-btn text-gray-500 border border-white/5 hover:text-gray-300'}`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Sound Toggle */}
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={toggleSound}
                  disabled={fuel <= 0}
                  className={`py-2 bg-radio-btn border rounded flex flex-col items-center justify-center gap-1 transition-all group ${isSoundPlaying ? 'border-radio-lit shadow-led' : 'border-white/10 hover:bg-neutral-800'} ${fuel <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <Volume2 className={`w-4 h-4 transition-colors ${isSoundPlaying ? 'text-radio-lit' : 'text-gray-400 group-hover:text-radio-lit'}`} />
                  <span className={`text-[8px] font-mono uppercase tracking-widest transition-colors ${isSoundPlaying ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                    {isSoundPlaying ? 'Engine On' : 'Ignition'}
                  </span>
                </button>

                <button 
                  onClick={toggleMusic}
                  disabled={!alarmMusicSrc}
                  className={`py-2 bg-radio-btn border rounded flex flex-col items-center justify-center gap-1 transition-all group ${isMusicPlaying ? 'border-radio-lit shadow-led' : 'border-white/10 hover:bg-neutral-800'} ${!alarmMusicSrc ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <Music className={`w-4 h-4 transition-colors ${isMusicPlaying ? 'text-radio-lit' : 'text-gray-400 group-hover:text-radio-lit'}`} />
                  <span className={`text-[8px] font-mono uppercase tracking-widest transition-colors ${isMusicPlaying ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                    {isMusicPlaying ? 'Music On' : 'Music'}
                  </span>
                </button>
              </div>
              
              {fuel < 100 && speed === 0 && !isSoundPlaying && (
                <button 
                  onClick={() => setFuel(100)}
                  className="w-full py-1 bg-green-900/20 border border-green-500/30 rounded text-[8px] font-mono text-green-500 uppercase tracking-widest hover:bg-green-900/40 transition-colors"
                >
                  Refuel Tank
                </button>
              )}
            </div>
          </div>

          {/* Throttle Pedal */}
          <div className="mt-auto">
            <label className="text-[8px] font-mono text-gray-500 uppercase tracking-widest mb-2 block text-center">Throttle Pedal</label>
            <button
              onMouseDown={() => setIsThrottling(true)}
              onMouseUp={() => setIsThrottling(false)}
              onMouseLeave={() => setIsThrottling(false)}
              onTouchStart={() => setIsThrottling(true)}
              onTouchEnd={() => setIsThrottling(false)}
              className="w-full h-24 bg-radio-btn rounded-lg border-2 border-radio-dim relative overflow-hidden shadow-btn active:shadow-btn-pressed transition-all"
            >
              <motion.div 
                className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-radio-lit/40 to-transparent"
                animate={{ height: `${throttleValue * 100}%` }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={isThrottling ? {
                    scale: [1, 1.15, 1],
                    filter: [`drop-shadow(0 0 2px ${currentVehicle.color})`, `drop-shadow(0 0 12px ${currentVehicle.color})`, `drop-shadow(0 0 2px ${currentVehicle.color})`]
                  } : {
                    scale: 1,
                    filter: `drop-shadow(0 0 0px transparent)`
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: isThrottling ? Infinity : 0,
                    ease: "easeInOut"
                  }}
                  className="relative"
                >
                  <Zap className={`w-8 h-8 transition-colors ${isThrottling ? 'text-radio-lit' : 'text-radio-dim'}`} />
                  
                  {/* Sparks/Rays Effect */}
                  <AnimatePresence>
                    {isThrottling && (
                      <>
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                            animate={{ 
                              opacity: [0, 1, 0], 
                              scale: [0, 1.5, 0],
                              x: Math.cos((i * 60) * Math.PI / 180) * 30,
                              y: Math.sin((i * 60) * Math.PI / 180) * 30
                            }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ 
                              duration: 0.5, 
                              repeat: Infinity, 
                              delay: i * 0.05,
                              ease: "easeOut"
                            }}
                            className="absolute top-1/2 left-1/2 w-1 h-4 -mt-2 -ml-0.5 rounded-full blur-[1px]"
                            style={{ 
                              backgroundColor: currentVehicle.color,
                              transform: `rotate(${i * 60}deg)`,
                              boxShadow: `0 0 10px ${currentVehicle.color}`
                            }}
                          />
                        ))}
                        {/* Central Glow */}
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.5, 1] }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                          className="absolute inset-0 rounded-full blur-xl"
                          style={{ backgroundColor: currentVehicle.color }}
                        />
                      </>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
              {/* Pedal Texture */}
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,rgba(255,255,255,0.1)_5px,rgba(255,255,255,0.1)_10px)]"></div>
            </button>
          </div>
        </div>
      </div>

      <audio 
        ref={audioRef} 
        src={currentVehicle.soundUrl || undefined} 
        loop 
        preload="auto"
        onError={() => {
          console.error("Audio failed to load:", currentVehicle.soundUrl);
          setIsSoundPlaying(false);
        }}
      />
      <audio 
        ref={musicAudioRef} 
        src={alarmMusicSrc || undefined} 
        loop 
        preload="auto"
        onError={() => {
          console.error("Music failed to load:", alarmMusicSrc);
          setIsMusicPlaying(false);
        }}
      />
      <audio 
        ref={ambientAudioRef} 
        src="https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3" 
        loop 
        preload="auto"
      />

      {/* Gallery Overlay */}
      <AnimatePresence>
        {showGallery && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute inset-0 z-50 bg-radio-face flex flex-col"
          >
            <div className="p-4 border-b border-radio-dim flex justify-between items-center bg-radio-dim/30">
              <span className="text-xs font-mono text-radio-lit uppercase tracking-widest">Vehicle Gallery</span>
              <button onClick={() => setShowGallery(false)} className="text-gray-500 hover:text-radio-lit">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {VEHICLES.map((v, idx) => (
                <button
                  key={v.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setShowGallery(false);
                    // Reset state for new vehicle
                    setThrottleValue(0);
                    setFuel(100);
                    setTemperature(40);
                    setIsThrottling(false);
                    setIsSoundPlaying(false);
                    if (audioRef.current) audioRef.current.pause();
                  }}
                  className={`group relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${currentIndex === idx ? 'border-radio-lit' : 'border-radio-dim hover:border-radio-lit/50'}`}
                >
                  <img src={v.image} alt={v.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-2">
                    <span className="text-[8px] font-mono text-white uppercase truncate">{v.name}</span>
                    <span className="text-[6px] font-mono text-gray-400 uppercase">{v.type}</span>
                  </div>
                  {currentIndex === idx && (
                    <div className="absolute top-1 right-1">
                      <div className="w-2 h-2 rounded-full bg-radio-lit shadow-led"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

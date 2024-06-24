import {
  Device,
  MIN_DESKTOP_WIDTH,
  MIN_TABLET_WIDTH,
} from '@/constants/device';
import { useEffect, useState } from 'react';

function getDeviceState() {
  const width = window.innerWidth;

  if (width < MIN_TABLET_WIDTH) return Device.MOBILE;
  if (width < MIN_DESKTOP_WIDTH) return Device.TABLET;
  return Device.PC;
}

export default function useDeviceState() {
  const [deviceState, setDeviceState] = useState<Device>(Device.MOBILE);

  useEffect(() => {
    function handleResize() {
      window.requestAnimationFrame(() => {
        setDeviceState(getDeviceState());
      });
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return deviceState;
}

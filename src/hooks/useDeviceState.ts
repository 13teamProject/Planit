import { useEffect, useState } from 'react';

type Device = 'mobile' | 'tablet' | 'desktop';

const useDeviceState = (): Device => {
  const [device, setDevice] = useState<Device>('desktop');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 744) {
        setDevice('mobile');
      } else if (window.innerWidth < 1200) {
        setDevice('tablet');
      } else {
        setDevice('desktop');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return device;
};

export default useDeviceState;

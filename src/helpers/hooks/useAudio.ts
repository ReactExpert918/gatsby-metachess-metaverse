import { useMemo, useEffect, useState } from "react";

const useAudio = (url: string) => {
  const audio = useMemo(() => new Audio(url), []);
  const [playing, setPlaying] = useState<Boolean>(false);
  const play = () => {
    setPlaying(true);
  };

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    const func = () => setPlaying(false);
    audio.addEventListener("ended", func);
    return () => {
      audio.removeEventListener("ended", func);
    };
  }, []);

  return [playing, play];
};

export default useAudio;

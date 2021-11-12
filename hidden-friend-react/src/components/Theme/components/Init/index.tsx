import Lottie from 'react-lottie';
import animationData from '../../../../assets/gift-box.json'
export const Init = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  return (
    <Lottie options={defaultOptions}
      height={200}
      width="100%"
    />
  )
}

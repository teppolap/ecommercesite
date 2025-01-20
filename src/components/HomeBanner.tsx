import BannerImg from '@/assets/banner5.png'
import Image from 'next/image'

const HomeBanner = () => {
  return (
    <div>
      <Image src={BannerImg} alt='banner image' className='w-full h-[full] object-cover'/>
    </div>
  )
}

export default HomeBanner

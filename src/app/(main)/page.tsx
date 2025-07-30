import HomeBanner from '@/components/main/home-components/HomeBanner'
import Promotion from '@/components/main/home-components/Promotion';
import ShopLocationAndCategory from '@/components/main/home-components/ShopLocationAndCategory';
import ScrollableButtonGroups from '@/components/main/home-components/ScrollableButtonGroups';

const Home = () => {
 

  return (
    <div className="min-h-screen mt-16 pt-[32px]">
      <div className='max-w-[1288px] mx-auto px-4 lg:px-0'>
        <HomeBanner />
      </div>

      {/* Full-width container for buttons only */}
      <div className="relative pl-4 md:pl-[calc((100vw-1288px)/2)]">
       <ScrollableButtonGroups />
      </div>

      {/* Rest of your content */}
      <div className="max-w-[1288px] mx-auto px-4 lg:px-0 mt-4">
        <div className='flex flex-col md:flex-row gap-4 justify-between mb-8 md:mb-[80px]'>
          <Promotion />
          <ShopLocationAndCategory />
        </div>
      </div>
    </div>
  )
}

export default Home
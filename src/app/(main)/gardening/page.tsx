import TopCategory from "@/components/main/best-comparison/TopCategory";
import GardeningCards from "@/components/main/gardening-cards/GardeningCards";
import GardeningFilter from "@/components/main/gardening-cards/GardeningFilter";


const Gardening = () => {
    return (
        <div className="mt-16 lg:pt-[95px] max-w-[1280px] mx-auto mb-10 lg:mb-[93px]">
            <GardeningFilter />
            <div className="lg:flex justify-between">
            <TopCategory />
            <GardeningCards />
            </div>
        </div>
    );
};

export default Gardening;
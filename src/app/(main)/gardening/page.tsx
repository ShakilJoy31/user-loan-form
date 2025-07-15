import TopCategory from "@/components/main/best-comparison/TopCategory";
import GardeningFilter from "@/components/main/gardening-cards/GardeningFilter";


const Gardening = () => {
    return (
        <div className="mt-16 lg:pt-[95px] max-w-[1280px] mx-auto ">
            <GardeningFilter />
            <div className="lg:flex justify-between">
            <TopCategory />
            </div>
        </div>
    );
};

export default Gardening;
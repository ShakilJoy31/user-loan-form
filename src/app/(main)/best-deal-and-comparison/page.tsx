import CameraComperison from "@/components/main/best-comparison/CameraComperison";
import TopCategory from "@/components/main/best-comparison/TopCategory";

const BestDealAndComparison = () => {
    return (
        <div className="mt-16 lg:pt-[40px] max-w-[1280px] mx-auto mb-10 lg:mb-[80px] lg:flex justify-between">
            <CameraComperison />
            <TopCategory />
        </div>
    );
};

export default BestDealAndComparison;
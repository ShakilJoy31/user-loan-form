import React from 'react';
import bannerBackgroundImage from '../../assets/Home/Hero back.png';
import knot from '../../assets/Home/knot2 1.png';
import Image from 'next/image';

const Banner = () => {
    return (
        <section
            className="min-h-screen"
            style={{
                backgroundImage: `url(${bannerBackgroundImage})`,  // Use the imported image
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        >
            <div>
                <div>
                    <h1>Crafting Digital Experiencxes That Inspire & Convert</h1>
                    <p>Experience excellence in digital craftsmanship with our team of skilled professionals dedicated to delivering exceptional results.</p>
                </div>
                {/* <Image
                    src={knot}
                    alt="Main banner rotating image"
                    width={180}
                    height={70}
                    className="object-contain w-full h-auto"
                /> */}
            </div>
        </section>
    )
}

export default Banner;
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import { getImageUrl } from "../../utils/getImageUrl";

const PostImage = ({ images }) => {

    const [current, setCurrent] = useState(0);

    const next = () => {

        if (current < images.length - 1) {
            setCurrent(current + 1);
        }

    };

    const prev = () => {

        if (current > 0) {
            setCurrent(current - 1);
        }

    };

    return (

        <div className="relative bg-black flex items-center justify-center h-full">
            <img
                src={getImageUrl(images[current])}
                className="max-w-full max-h-full object-cover"
                alt=""
            />
            {
                images.length > 1 && (

                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full bg-black/30 backdrop-blur-md">

                        {
                            images.map((_, index) => (

                                <button
                                    key={index}
                                    onClick={() => setCurrent(index)}
                                    className={`transition-all duration-300 rounded-full ${current === index
                                            ? "w-6 h-2 bg-white"
                                            : "w-2 h-2 bg-white/50 hover:bg-white"
                                        }`}
                                />

                            ))
                        }

                    </div>

                )
            }

            {

                images.length > 1 && (

                    <>

                        <button
                            onClick={prev}
                            className="absolute left-4 bg-black/50 text-white rounded-full p-2"
                        >

                            <ChevronLeft />

                        </button>

                        <button
                            onClick={next}
                            className="absolute right-4 bg-black/50 text-white rounded-full p-2"
                        >

                            <ChevronRight />

                        </button>

                    </>

                )

            }

        </div>

    );

};

export default PostImage;
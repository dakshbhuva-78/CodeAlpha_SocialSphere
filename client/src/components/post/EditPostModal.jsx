import { X } from "lucide-react";
import { useState } from "react";

const EditPostModal = ({
    post,
    close,
    onSave,
}) => {

    const [caption, setCaption] = useState(post.caption);

    return (

        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

            <div className="bg-white dark:bg-gray-900 rounded-3xl w-[600px] shadow-2xl overflow-hidden">

                {/* Header */}

                <div className="flex justify-between items-center px-6 py-5 border-b dark:border-gray-700">

                    <h2 className="text-2xl font-bold">
                        Edit Post
                    </h2>

                    <button onClick={close}>
                        <X />
                    </button>

                </div>

                {/* Body */}

                <div className="p-6">

                    <label className="font-semibold">
                        Caption
                    </label>

                    <textarea
                        rows={6}
                        value={caption}
                        onChange={(e) =>
                            setCaption(e.target.value)
                        }
                        className="w-full mt-3 border rounded-xl p-4 outline-none dark:bg-gray-800 dark:border-gray-700 resize-none"
                    />

                </div>

                {/* Footer */}

                <div className="flex justify-end gap-3 px-6 py-5 border-t dark:border-gray-700">

                    <button
                        onClick={close}
                        className="px-6 py-3 rounded-xl border"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => onSave(caption)}
                        className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        Save Changes
                    </button>

                </div>

            </div>

        </div>

    );

};

export default EditPostModal;